import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/lenis-provider";
import BackgroundEngine from "@/components/background-engine";
import Navbar from "@/components/navbar";
import { BRAND } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `Demergers | ${BRAND.full}`,
    template: `%s | ${BRAND.full}`,
  },
  description:
    "A cinematic, first-principles investigation of corporate demergers: why splitting a company unlocks value, how spin-offs work, and where the next opportunity hides.",
  keywords: [
    "demergers",
    "spin-offs",
    "value investing",
    "special situations",
    "conglomerate discount",
    "First Principles Research",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-space-black text-white antialiased">
        <LenisProvider>
          <BackgroundEngine />
          <Navbar />
          <main className="relative z-10">{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
