"use client";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";
export function NextThemeProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setTheme("dark");
  }, []);
  console.log(theme)
  if (!mounted) return null;
  return <NextThemesProvider
    defaultTheme="dark"
    // enableSystem={true}
    attribute={"class"}
    >
    {children}
  </NextThemesProvider>;
}
