import localFont from "next/font/local";
import { Suspense } from "react";

import "./globals.scss";

const azFont = localFont({
  src: [
    {
      path: "../fonts/AvenirNextLTPro-Bold.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../fonts/AvenirNextLTPro-Demi.otf",
      weight: "600",
      style: "demi",
    },
    {
      path: "../fonts/AvenirNextLTPro-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/AvenirNextLTPro-Regular.otf",
      weight: "400",
      style: "regular",
    },
  ],
});

export const metadata = {
  title: "Muatrans - BO",
  description: "Back Office for Muatrans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${azFont.className} bg-white`}>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
