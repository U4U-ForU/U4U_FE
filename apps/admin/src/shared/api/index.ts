import axios, { isAxiosError } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  saveTokens,
  type Tokens,
} from "../lib/tokenStorage";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const skipUrls = ["/api/auth/login", "/api/auth/signup", "/api/auth/refresh"];

const isSkipUrl = (url?: string) =>
  !!url && skipUrls.some((skipUrl) => url.includes(skipUrl));

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let currentRefreshPromise: Promise<string> | null = null;

const refreshTokens = async () => {
  const run = async () => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) throw new Error("저장된 refreshToken이 없습니다.");

    const response = await axios.post<Tokens>(
      `${BASE_URL}/api/auth/refresh`,
      { refreshToken },
      { headers: { "Content-Type": "application/json" } },
    );

    saveTokens(response.data);

    return response.data.accessToken;
  };

  if (typeof navigator === "undefined" || !("locks" in navigator)) return run();

  return await navigator.locks.request("token-refresh", run);
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

    if (!config || isSkipUrl(config.url) || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (config._retry) {
      console.log("토큰을 삭제합니다.");
      removeTokens();

      return Promise.reject(error);
    }

    if (!getRefreshToken()) return Promise.reject(error);

    config._retry = true;

    try {
      if (!currentRefreshPromise) {
        currentRefreshPromise = refreshTokens().finally(() => {
          currentRefreshPromise = null;
        });
      }

      const newAccessToken = await currentRefreshPromise;

      config.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(config);
    } catch (refreshError) {
      const status = isAxiosError(refreshError)
        ? refreshError.response?.status
        : undefined;

      if (status !== undefined && status < 500) {
        console.log("토큰을 삭제합니다.");
        removeTokens();
      }

      return Promise.reject(refreshError);
    }
  },
);
