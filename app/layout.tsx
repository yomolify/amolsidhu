import type { Metadata } from "next";
import "./globals.css";
import { Source_Sans_3 } from "next/font/google";
import { ClientThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  weight: ["300", "400", "500", "600", "700"], // light → bold
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amolsidhu.com"),
  title: "Amol Sidhu — Engineer & Builder",
  description:
    "Frontend-only, beautifully animated personal site for Amol Sidhu.",
  openGraph: {
    title: "Amol Sidhu — Engineer & Builder",
    description:
      "Frontend-only, beautifully animated personal site for Amol Sidhu.",
    url: "https://amolsidhu.com",
    siteName: "amolsidhu.com",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Amol Sidhu — Engineer & Builder",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amol Sidhu — Engineer & Builder",
    description:
      "Frontend-only, beautifully animated personal site for Amol Sidhu.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sourceSans.variable} bg-noise`}>
        <ClientThemeProvider>
          <Navbar />
          <div
            aria-hidden
            className="fixed inset-0 -z-10 pointer-events-none
             bg-[radial-gradient(1200px_600px_at_10%_10%,rgba(124,58,237,0.25),transparent_50%),radial-gradient(800px_400px_at_90%_20%,rgba(16,185,129,0.15),transparent_50%),radial-gradient(900px_500px_at_50%_110%,rgba(14,165,233,0.20),transparent_60%)]"
          />
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
