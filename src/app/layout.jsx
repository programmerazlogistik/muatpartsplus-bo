import localFont from "next/font/local";

import "./globals.scss";
import { Providers } from "./providers";

export const metadata = {
  title: "Muatparts Plus - BO",
  description: "Back Office for Muatparts Plus",
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
