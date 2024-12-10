import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@/app/globals.css";
import { NextThemeProviders } from "../context/providers";
// import DashBoard from "./dashboard/page";
import DashBoardLayout from "../context/dashBoardLayout";
import toast, { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if(!token){
    redirect("/sign-in");
  }
  const queryClient = new QueryClient()
  return (
    <html lang="en">
      <body className={`antialiased`}>
          <NextThemeProviders>
            <DashBoardLayout>
              <NextTopLoader
                template='<div class="bar" role="bar"><div class="peg"></div></div>'
                showSpinner={false}
              />
              {children}
              <Toaster />
            </DashBoardLayout>
          </NextThemeProviders>
      </body>
    </html>
  );
}
