import axios, { isAxiosError } from "axios";
import { isAdminRole } from "../lib/role";
import {
  getAccessToken,
  getRefreshToken,
  getSessionGeneration,
  removeTokens,
  saveTokens,
  type Tokens,
} from "../lib/tokenStorage";
import {
  FORBIDDEN_SESSION_MESSAGE,
  ForbiddenRoleError,
  isForbiddenRoleError,
} from "./forbiddenRole";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const skipUrls = ["/api/auth/login", "/api/auth/signup", "/api/auth/refresh"];

const EXPIRED_TOKEN_STATUS = 401;

const SESSION_INVALID_STATUSES = [400, 401, 404];

const REQUEST_TIMEOUT_MS = 15000;

const isSkipUrl = (url?: string) =>
  !!url && skipUrls.some((skipUrl) => url.includes(skipUrl));

const isExpiredTokenStatus = (status?: number) =>
  status === EXPIRED_TOKEN_STATUS;

const isSessionInvalidStatus = (status?: number) =>
  status !== undefined && SESSION_INVALID_STATUSES.includes(status);

export class StaleSessionError extends Error {
  constructor() {
    super("재발급 중에 세션이 변경되었습니다.");
    this.name = "StaleSessionError";
  }
}

export const isSessionInvalidError = (error: unknown) =>
  isForbiddenRoleError(error) ||
  (isAxiosError(error) && isSessionInvalidStatus(error.response?.status));

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

let currentRefreshPromise: Promise<string> | null = null;

const refreshTokens = async () => {
  const run = async () => {
    const generationAtStart = getSessionGeneration();
    const refreshToken = getRefreshToken();

    if (!refreshToken) throw new Error("저장된 refreshToken이 없습니다.");

    const response = await axios.post<Tokens>(
      `${BASE_URL}/api/auth/refresh`,
      { refreshToken },
      {
        headers: { "Content-Type": "application/json" },
        timeout: REQUEST_TIMEOUT_MS,
      },
    );

    if (getSessionGeneration() !== generationAtStart) {
      throw new StaleSessionError();
    }

    if (!isAdminRole(response.data.role)) {
      removeTokens();
      throw new ForbiddenRoleError(FORBIDDEN_SESSION_MESSAGE);
    }

    saveTokens(response.data);

    return response.data.accessToken;
  };

  if (typeof navigator === "undefined" || !("locks" in navigator)) return run();

  return await navigator.locks.request("token-refresh", run);
};

export const refreshSession = () => {
  if (!currentRefreshPromise) {
    currentRefreshPromise = refreshTokens().finally(() => {
      currentRefreshPromise = null;
    });
  }

  return currentRefreshPromise;
};

api.interceptors.request.use((config) => {
  if (isSkipUrl(config.url)) return config;

  const accessToken = getAccessToken();

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    const status = error.response?.status;

    if (!config || isSkipUrl(config.url) || !isExpiredTokenStatus(status)) {
      return Promise.reject(error);
    }

    if (config._retry) {
      removeTokens();

      return Promise.reject(error);
    }

    if (!getRefreshToken()) return Promise.reject(error);

    config._retry = true;

    try {
      const newAccessToken = await refreshSession();

      config.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(config);
    } catch (refreshError) {
      const refreshStatus = isAxiosError(refreshError)
        ? refreshError.response?.status
        : undefined;

      if (isSessionInvalidStatus(refreshStatus)) removeTokens();

      return Promise.reject(refreshError);
    }
  },
);
