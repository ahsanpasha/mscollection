import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { SiteShell } from "@/components/site-shell";
import { SmoothScroll } from "@/components/smooth-scroll";

const instrumentSans = localFont({
  src: [
    {
      path: "../public/Fonts/InstrumentSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Fonts/InstrumentSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Fonts/InstrumentSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/Fonts/InstrumentSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
});

// Alias so that font-display also uses Instrument Sans everywhere
const instrumentSansDisplay = localFont({
  src: [
    { path: "../public/Fonts/InstrumentSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/Fonts/InstrumentSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/Fonts/InstrumentSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/Fonts/InstrumentSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "MS Collection",
  description:
    "Thoughtfully crafted Pakistani silhouettes, refined fabrics and timeless style for every occasion.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "MS Collection",
    description:
      "Thoughtfully crafted Pakistani silhouettes, refined fabrics and timeless style for every occasion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${instrumentSansDisplay.variable}`}>
      <body className="antialiased">
        <StoreProvider>
          <SmoothScroll>
            <SiteShell>{children}</SiteShell>
          </SmoothScroll>
        </StoreProvider>
      </body>
    </html>
  );
}
