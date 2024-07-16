import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Provider } from "./_trpc/Provider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vidpod",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
