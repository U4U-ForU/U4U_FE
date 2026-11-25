"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordEntry } from "@/src/shared/lib/navStack";

export default function NavStackTracker() {
  const pathname = usePathname();

  useEffect(() => {
    recordEntry(pathname);
  }, [pathname]);

  return null;
}
