import type { Metadata, Viewport } from "next";
import "./global.css";
import QueryProvider from "./providers";
import AuthGuard from "@/src/shared/ui/AuthGuard";
import NavStackTracker from "@/src/shared/ui/NavStackTracker";

export const metadata: Metadata = {
  title: "U4U",
  description: "U4U 웹 애플리케이션",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/icons/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "U4U",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffe4e4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <div className="app-background" />
        <main className="app-content">
          <QueryProvider>
            <NavStackTracker />
            {children}
            {/* <AuthGuard>{children}</AuthGuard> */}
          </QueryProvider>
        </main>
      </body>
    </html>
  );
}
