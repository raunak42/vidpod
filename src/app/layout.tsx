import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Provider } from "./_trpc/Provider";
import { RecoiProvider } from "./_providers/RecoilProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vidpod",
  icons:["/brandmark-white.svg"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Provider>
          <RecoiProvider>{children}</RecoiProvider>
        </Provider>
      </body>
    </html>
  );
}

