import type { Metadata, Viewport } from "next";
import "./global.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "U4U",
  description: "U4U 웹 애플리케이션",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
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
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
