import localFont from "next/font/local";
import { Suspense } from "react";

import "./globals.scss";

export const metadata = {
  title: "Muatrans - BO",
  description: "Back Office for Muatrans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-white`}>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
