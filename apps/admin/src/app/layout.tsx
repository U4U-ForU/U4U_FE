import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./global.css";
import QueryProvider from "./providers";

export const metadata: Metadata = {
  title: "U4U Admin",
  description: "U4U 어드민",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
