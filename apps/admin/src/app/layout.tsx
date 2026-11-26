import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./global.css";
import QueryProvider from "./providers";
import AuthGuard from "@/src/shared/ui/AuthGuard";
import NavStackTracker from "@/src/shared/ui/NavStackTracker";

export const metadata: Metadata = {
  title: "U4U Admin",
  description: "U4U 어드민",
  icons: {
    icon: "/img/u4u.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <NavStackTracker />
          <AuthGuard>{children}</AuthGuard>
        </QueryProvider>
      </body>
    </html>
  );
}
