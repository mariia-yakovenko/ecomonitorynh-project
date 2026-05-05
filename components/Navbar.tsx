"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "головна" },
  { href: "/map", label: "мапа" },
  { href: "/about", label: "про проєкт" },
  { href: "/guide", label: "довідник" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="navbar-ep">
      <div className="container d-flex align-items-center justify-content-between">
        <Link href="/" className="brand">
          є<span style={{ color: "var(--color-navy-mid)" }}>повітря</span>
        </Link>
        <div className="d-flex gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link-ep${pathname === l.href ? " active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
