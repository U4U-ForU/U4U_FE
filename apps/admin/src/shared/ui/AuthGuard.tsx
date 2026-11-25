"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { refreshSession } from "@/src/shared/api";
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

const getSnapshot = (): SessionState => {
  if (!hasSession()) return "guest";
  if (isAdminRole(getRole())) return "admin";

  return getRole() === null ? "verifying" : "guest";
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

    refreshSession().catch(() => {
      if (isActive) setIsVerifyFailed(true);
    });

    return () => {
      isActive = false;
    };
  }, [pathname, session, isVerifyFailed]);

  useEffect(() => {
    if (state === "verifying") return;

    const target = resolveAuthRedirect(pathname, state === "admin");

    if (target === null) return;

    markReplace();
    router.replace(target);
  }, [pathname, state, router]);

  if (!isHydrated) return null;

  if (state === "verifying") return <Loading />;

  const redirectTo = resolveAuthRedirect(pathname, state === "admin");

  return redirectTo === null ? children : <Loading />;
}
