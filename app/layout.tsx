import type { Metadata } from "next";
import { Bebas_Neue, Bungee, Inter } from "next/font/google";

import "./globals.css";

export const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const bungeeFont = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: ["400"],
});

export const bebasNeueFont = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
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
      <body className={`${interFont.variable} antialiased w-screen h-screen`}>
        {children}
      </body>
    </html>
  );
}
