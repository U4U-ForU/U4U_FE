"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { markReplace } from "@/src/shared/lib/navStack";

export function useBackTo(path: string) {
  const router = useRouter();

  return useCallback(() => {
    markReplace();
    router.replace(path);
  }, [router, path]);
}
