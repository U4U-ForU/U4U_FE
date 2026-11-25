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
let generation = 0;
let isStorageAvailable = true;

const readStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    isStorageAvailable = false;
    return null;
  }
};

const writeStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    isStorageAvailable = false;
  }
};

const clearStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch {
    isStorageAvailable = false;
  }
};

const removeLegacyKeys = () => {
  clearStorage(LEGACY_ACCESS_TOKEN_KEY);
  clearStorage(LEGACY_ROLE_KEY);
};

const clearMemoryTokens = () => {
  accessToken = null;
  role = null;
  refreshToken = null;
  generation += 1;
};

const handleExternalStorageChange = (event: StorageEvent) => {
  if (event.storageArea !== localStorage) return;
  if (event.key !== null && event.key !== REFRESH_TOKEN_KEY) return;

  clearMemoryTokens();
};

if (isBrowser()) {
  removeLegacyKeys();
  window.addEventListener("storage", handleExternalStorageChange);
}

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
  generation += 1;

  if (!isBrowser()) return;

  removeLegacyKeys();
  writeStorage(REFRESH_TOKEN_KEY, tokens.refreshToken);

  notifyTokenChange();
};

export const getAccessToken = () => accessToken;

export const getRefreshToken = () => {
  if (!isBrowser()) return null;

  const stored = readStorage(REFRESH_TOKEN_KEY);

  return isStorageAvailable ? stored : refreshToken;
};

export const hasSession = () => getRefreshToken() !== null;

export const getRole = () => role;

export const getSessionGeneration = () => generation;

export const removeTokens = () => {
  clearMemoryTokens();

  if (!isBrowser()) return;

  removeLegacyKeys();
  clearStorage(REFRESH_TOKEN_KEY);

  notifyTokenChange();
};
