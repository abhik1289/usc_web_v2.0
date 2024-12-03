import type { Metadata } from "next";
// import localFont from "next/font/local";
import "@/app/globals.css";
import { NextThemeProviders } from "../context/providers";
import toast, { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <NextThemeProviders>{children}<Toaster /></NextThemeProviders>
      </body>
    </html>
  );
}
