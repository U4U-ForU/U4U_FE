"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  getAccessToken,
  subscribeTokenChange,
} from "@/src/shared/lib/tokenStorage";
import { resolveAuthRedirect } from "@/src/shared/lib/authRoutes";

const getSnapshot = () => getAccessToken() !== null;

const getServerSnapshot = () => false;

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = useSyncExternalStore(
    subscribeTokenChange,
    getSnapshot,
    getServerSnapshot,
  );
  const redirectTo = resolveAuthRedirect(pathname, isLoggedIn);

  useEffect(() => {
    const target = resolveAuthRedirect(pathname, getSnapshot());

    if (target === null) return;

    router.replace(target);
  }, [pathname, isLoggedIn, router]);

  return redirectTo === null ? children : null;
}
