const LEGACY_ACCESS_TOKEN_KEY = "accessToken";
const LEGACY_ROLE_KEY = "role";
const REFRESH_TOKEN_KEY = "refreshToken";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  role: string;
}

const TOKEN_CHANGE_EVENT = "tokenchange";

const isBrowser = () => typeof window !== "undefined";

let accessToken: string | null = null;
let role: string | null = null;
let refreshToken: string | null = null;

const readStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};

const clearStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch {}
};

const removeLegacyKeys = () => {
  clearStorage(LEGACY_ACCESS_TOKEN_KEY);
  clearStorage(LEGACY_ROLE_KEY);
};

if (isBrowser()) removeLegacyKeys();

const notifyTokenChange = () => {
  window.dispatchEvent(new Event(TOKEN_CHANGE_EVENT));
};

export const subscribeTokenChange = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  window.addEventListener(TOKEN_CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(TOKEN_CHANGE_EVENT, onChange);
  };
};

export const saveTokens = (tokens: Tokens) => {
  accessToken = tokens.accessToken;
  role = tokens.role;
  refreshToken = tokens.refreshToken;

  if (!isBrowser()) return;

  removeLegacyKeys();
  writeStorage(REFRESH_TOKEN_KEY, tokens.refreshToken);

  notifyTokenChange();
};

export const getAccessToken = () => accessToken;

export const getRefreshToken = () => {
  if (!isBrowser()) return null;

  const stored = readStorage(REFRESH_TOKEN_KEY);

  return stored ?? refreshToken;
};

export const hasSession = () => getRefreshToken() !== null;

export const getRole = () => role;

export const removeTokens = () => {
  accessToken = null;
  role = null;
  refreshToken = null;

  if (!isBrowser()) return;

  removeLegacyKeys();
  clearStorage(REFRESH_TOKEN_KEY);

  notifyTokenChange();
};
