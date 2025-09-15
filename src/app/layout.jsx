import localFont from "next/font/local";

import "./globals.scss";
import { Providers } from "./providers";

export const metadata = {
  title: "Muatrans - BO",
  description: "Back Office for Muatrans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
