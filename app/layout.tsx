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
      <head />
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
