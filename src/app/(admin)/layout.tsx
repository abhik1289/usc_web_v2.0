import type { Metadata } from "next";

import "@/app/globals.css";
import { NextThemeProviders } from "../context/providers";
import DashBoard from "./dashboard/page";
import DashBoardLayout from "../context/dashBoardLayout";
import toast, { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NextThemeProviders>
          <DashBoardLayout>
            {children}
            <Toaster />
          </DashBoardLayout>
        </NextThemeProviders>
      </body>
    </html>
  );
}
