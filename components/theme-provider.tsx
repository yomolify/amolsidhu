'use client';
import * as React from "react";
import { ThemeProvider } from "next-themes";
export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProvider>;
}
