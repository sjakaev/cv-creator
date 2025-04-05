import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CV Editor App",
  description: "Modern CV editor with PDF export",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="https://fonts.cdnfonts.com/s/29154/helvetica.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.cdnfonts.com/s/29154/helvetica-light.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.cdnfonts.com/s/29154/helvetica-bold.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
