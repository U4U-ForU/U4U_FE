const LOGIN_PATH = "/login";
const HOME_PATH = "/main";

const PUBLIC_ROUTES = ["/", "/splash"];

const GUEST_ONLY_ROUTES = ["/login", "/signup"];

const includes = (routes: string[], pathname: string) =>
  routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

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
