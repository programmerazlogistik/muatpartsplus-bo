import "./globals.scss";

export const metadata = {
  title: "Muatparts Plus - BO",
  description: "Back Office for Muatparts Plus",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-white`}>{children}</body>
    </html>
  );
}
