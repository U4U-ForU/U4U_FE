"use client";

import type { ReactNode } from "react";
import AuthGuard from "@/src/shared/ui/AuthGuard";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard requireAuth redirectTo="/login">
      {children}
    </AuthGuard>
  );
}
