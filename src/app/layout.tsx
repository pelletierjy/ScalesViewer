import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Providers } from "./Providers";
import type { Metadata } from "next";
import { defaultLocale, isLocale } from "@/lib/i18n/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'Scales viewer by Jean-Yves Pelletier',
  description: 'Visualize scales on your favorite instrument!',
}

export default function RootLayout({
  children,
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  searchParams?: { lang?: string };
}>) {
  const locale = searchParams?.lang && isLocale(searchParams.lang)
    ? searchParams.lang
    : defaultLocale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <Suspense fallback={null}>
            <ClientLayout locale={locale}>{children}</ClientLayout>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
