import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Сторінку не знайдено" };

export default function NotFound() {
  return (
    <section style={{ padding: "6rem 0", textAlign: "center" }}>
      <div className="container">
        <div
          style={{
            fontSize: "4rem",
            fontWeight: 800,
            color: "var(--color-primary)",
            lineHeight: 1,
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: "1.5rem", margin: "1rem 0 0.5rem" }}>
          Сторінку не знайдено
        </h1>
        <Link
          href="/"
          style={{
            display: "inline-block",
            background: "var(--color-primary)",
            color: "#fff",
            padding: "0.6rem 1.5rem",
            borderRadius: "var(--radius-sm)",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          На головну
        </Link>
      </div>
    </section>
  );
}
