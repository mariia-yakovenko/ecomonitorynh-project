import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { WebVitals } from "@/components/WebVitals";

export const metadata: Metadata = {
  title: { default: "єПовітря", template: "%s | єПовітря" },
  description: "Моніторинг якості повітря в містах України в реальному часі.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        {/* Preload critical font weights so they arrive before first paint,
            eliminating FOUT-driven layout shifts (CLS). */}
        <link
          rel="preload"
          href="/fonts/e-Ukraine-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/e-Ukraine-Bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <WebVitals />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <GoogleAnalytics gaId="G-136T1EDWVN" />
      </body>
    </html>
  );
}
