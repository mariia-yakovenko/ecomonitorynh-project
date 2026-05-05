import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  // Аналіз вмикається лише коли ANALYZE=true (npm run analyze)
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // ─── Оптимізація зображень ────────────────────────────────────────────────
  images: {
    // Сучасні формати: AVIF стискає краще за WebP (~20%), але повільніше кодується.
    // Next.js автоматично обирає формат залежно від Accept заголовку браузера.
    formats: ["image/avif", "image/webp"],
    // Дозволені зовнішні домени (якщо використовуються <Image src="https://...">)
    // remotePatterns: [{ protocol: "https", hostname: "example.com" }],
  },

  // ─── HTTP-кешування статичних файлів ─────────────────────────────────────
  // Next.js автоматично додає хеш до імен файлів у /_next/static/,
  // тому їх можна кешувати "назавжди" (immutable).
  async headers() {
    return [
      {
        // JS/CSS/шрифти/зображення зі статичної папки Next.js
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            // max-age=1 рік + immutable → браузер ніколи не робить revalidation
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Власні статичні файли з /public (шрифти, svg, тощо)
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Зображення з /public
        source: "/:path*.{jpg,jpeg,png,webp,avif,svg,ico}",
        headers: [
          {
            key: "Cache-Control",
            // Зображення можуть змінюватись — stale-while-revalidate дозволяє
            // показати кешовану версію, поки фоново оновлюється нова.
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },

  // ─── Мінімізація бандлу ───────────────────────────────────────────────────
  compiler: {
    // Видаляє всі console.log у production-збірці
    removeConsole: process.env.NODE_ENV === "production",
  },

  // SWC-мінімізатор увімкнений за замовчуванням у Next.js 13+ — окрема опція не потрібна.
};

export default withBundleAnalyzer(nextConfig);
