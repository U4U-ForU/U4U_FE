const LEGACY_ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const ROLE_KEY = "role";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  role: string;
}

const TOKEN_CHANGE_EVENT = "tokenchange";

const isBrowser = () => typeof window !== "undefined";

let accessToken: string | null = null;

const removeLegacyAccessToken = () => {
  localStorage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
};

if (isBrowser()) removeLegacyAccessToken();

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

  if (!isBrowser()) return;

  removeLegacyAccessToken();
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  localStorage.setItem(ROLE_KEY, tokens.role);

  notifyTokenChange();
};

export const getAccessToken = () => accessToken;

export const getRefreshToken = () =>
  isBrowser() ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;

export const hasSession = () => getRefreshToken() !== null;

export const getRole = () =>
  isBrowser() ? localStorage.getItem(ROLE_KEY) : null;

export const removeTokens = () => {
  accessToken = null;

  if (!isBrowser()) return;

  removeLegacyAccessToken();
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);

  notifyTokenChange();
};
