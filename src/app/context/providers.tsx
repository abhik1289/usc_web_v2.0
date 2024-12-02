// app/providers.tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// ("use client");

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
export function NextThemeProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <NextThemesProvider defaultTheme="dark" attribute={"class"}>{children}</NextThemesProvider>;
}
