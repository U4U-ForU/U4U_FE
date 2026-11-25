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

const removeLegacyKeys = () => {
  localStorage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LEGACY_ROLE_KEY);
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

  if (!isBrowser()) return;

  removeLegacyKeys();
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);

  notifyTokenChange();
};

export const getAccessToken = () => accessToken;

export const getRefreshToken = () =>
  isBrowser() ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;

export const hasSession = () => getRefreshToken() !== null;

export const getRole = () => role;

export const removeTokens = () => {
  accessToken = null;
  role = null;

  if (!isBrowser()) return;

  removeLegacyKeys();
  localStorage.removeItem(REFRESH_TOKEN_KEY);

  notifyTokenChange();
};
