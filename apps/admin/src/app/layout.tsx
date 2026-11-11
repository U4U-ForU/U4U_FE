import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "../components/Header";
import "./global.css";

export const metadata: Metadata = {
  title: "U4U Admin",
  description: "U4U 어드민",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
