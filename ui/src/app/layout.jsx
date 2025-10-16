import { Inter } from "next/font/google";

import { RootProvider } from "fumadocs-ui/provider";
import "fumadocs-ui/style.css";

import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Muatrans Shipper UI Documentation",
  description: "Component library and documentation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
