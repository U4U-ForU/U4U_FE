"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  hasSession,
  subscribeTokenChange,
} from "@/src/shared/lib/tokenStorage";
import { isGuestOnly, resolveAuthRedirect } from "@/src/shared/lib/authRoutes";
import { markReplace } from "@/src/shared/lib/navStack";

const getSnapshot = () => hasSession();

const getServerSnapshot = () => false;

const subscribeNever = () => () => {};

const getHydratedSnapshot = () => true;

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = useSyncExternalStore(
    subscribeTokenChange,
    getSnapshot,
    getServerSnapshot,
  );
  const isHydrated = useSyncExternalStore(
    subscribeNever,
    getHydratedSnapshot,
    getServerSnapshot,
  );
  const redirectTo = resolveAuthRedirect(pathname, isLoggedIn);

  useEffect(() => {
    const target = resolveAuthRedirect(pathname, getSnapshot());

    if (target === null) return;

    markReplace();
    router.replace(target);
  }, [pathname, isLoggedIn, router]);

  if (!isHydrated && isGuestOnly(pathname)) return null;

  return redirectTo === null ? children : null;
}
