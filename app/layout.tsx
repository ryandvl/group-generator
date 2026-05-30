import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

export const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerador de Grupos",
  description: "Gerador de Grupos aleatórios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${interFont.variable} antialiased w-screen h-screen p-6`}
      >
        {children}
      </body>
    </html>
  );
}
