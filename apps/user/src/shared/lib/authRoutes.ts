const LOGIN_PATH = "/login";
const HOME_PATH = "/main";

const PUBLIC_ROUTES = ["/", "/splash"];

const GUEST_ONLY_ROUTES = ["/login", "/signup"];

const BACK_BLOCKED_ROUTES = [...PUBLIC_ROUTES, ...GUEST_ONLY_ROUTES];

export const BACK_FALLBACK_PATH = HOME_PATH;

const includes = (routes: string[], pathname: string) =>
  routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

export const isBackBlocked = (pathname: string) =>
  includes(BACK_BLOCKED_ROUTES, pathname);

export const isGuestOnly = (pathname: string) =>
  includes(GUEST_ONLY_ROUTES, pathname);

export function resolveAuthRedirect(
  pathname: string,
  isLoggedIn: boolean,
): string | null {
  if (includes(PUBLIC_ROUTES, pathname)) return null;

  if (includes(GUEST_ONLY_ROUTES, pathname)) {
    return isLoggedIn ? HOME_PATH : null;
  }

  return isLoggedIn ? null : LOGIN_PATH;
}
