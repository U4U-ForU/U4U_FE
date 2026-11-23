"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { BACK_FALLBACK_PATH, isBackBlocked } from "@/src/shared/lib/authRoutes";
import { markReplace, previousPath } from "@/src/shared/lib/navStack";

export function useSafeBack(fallback: string = BACK_FALLBACK_PATH) {
  const router = useRouter();

  return useCallback(() => {
    const previous = previousPath();

    if (previous !== null && !isBackBlocked(previous)) {
      router.back();
      return;
    }

    markReplace();
    router.replace(fallback);
  }, [router, fallback]);
}
