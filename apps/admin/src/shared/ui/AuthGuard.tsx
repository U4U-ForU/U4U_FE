"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { isSessionInvalidError, refreshSession } from "@/src/shared/api";
import {
  getRole,
  hasSession,
  removeTokens,
  subscribeTokenChange,
} from "@/src/shared/lib/tokenStorage";
import { isLoginPath, resolveAuthRedirect } from "@/src/shared/lib/authRoutes";
import { isAdminRole } from "@/src/shared/lib/role";
import { markReplace } from "@/src/shared/lib/navStack";
import Loading from "./Loading";

type SessionState = "guest" | "verifying" | "admin";

const RETRY_BASE_MS = 1000;
const RETRY_MAX_MS = 10000;

const retryDelay = (attempt: number) =>
  Math.min(RETRY_BASE_MS * 2 ** attempt, RETRY_MAX_MS);

const getSnapshot = (): SessionState => {
  if (!hasSession()) return "guest";
  if (isAdminRole(getRole())) return "admin";

  return getRole() === null ? "verifying" : "guest";
};

const resolveState = (pathname: string, isVerifyFailed: boolean): SessionState => {
  const live = getSnapshot();

  return live === "verifying" && (isVerifyFailed || isLoginPath(pathname))
    ? "guest"
    : live;
};

const getServerSnapshot = (): SessionState => "guest";

const subscribeNever = () => () => {};

const getHydratedSnapshot = () => true;

const getHydratedServerSnapshot = () => false;

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isVerifyFailed, setIsVerifyFailed] = useState(false);
  const session = useSyncExternalStore(
    subscribeTokenChange,
    getSnapshot,
    getServerSnapshot,
  );
  const isHydrated = useSyncExternalStore(
    subscribeNever,
    getHydratedSnapshot,
    getHydratedServerSnapshot,
  );

  const isLogin = isLoginPath(pathname);

  const state: SessionState =
    session === "verifying" && (isVerifyFailed || isLogin) ? "guest" : session;

  useEffect(() => {
    if (!isLoginPath(pathname) || !hasSession()) return;

    removeTokens();
  }, [pathname]);

  useEffect(() => {
    if (isLoginPath(pathname)) return;
    if (getSnapshot() !== "verifying" || isVerifyFailed) return;

    let isActive = true;
    let attempt = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const verify = () => {
      refreshSession().catch((error: unknown) => {
        if (!isActive) return;

        if (isSessionInvalidError(error)) {
          setIsVerifyFailed(true);
          return;
        }

        timer = setTimeout(verify, retryDelay(attempt));
        attempt += 1;
      });
    };

    verify();

    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [pathname, session, isVerifyFailed]);

  useEffect(() => {
    if (!isHydrated) return;

    const live = resolveState(pathname, isVerifyFailed);

    if (live === "verifying") return;

    const target = resolveAuthRedirect(pathname, live === "admin");

    if (target === null) return;

    markReplace();
    router.replace(target);
  }, [pathname, state, isVerifyFailed, isHydrated, router]);

  if (!isHydrated) return null;

  if (state === "verifying") return <Loading />;

  const redirectTo = resolveAuthRedirect(pathname, state === "admin");

  return redirectTo === null ? children : <Loading />;
}
