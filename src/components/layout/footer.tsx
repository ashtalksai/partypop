import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-16" style={{ background: "#2D1B0E" }}>
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl font-bold text-white mb-3">
              Party<span style={{ color: "var(--accent)" }}>pop</span>
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Your AI party planner for busy parents.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Product</h4>
            <div className="flex flex-col gap-3">
              {[
                { href: "/#how-it-works", label: "How It Works" },
                { href: "/pricing", label: "Pricing" },
                { href: "/quiz", label: "Theme Quiz" },
                { href: "/vendors", label: "Find Vendors" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors hover:text-[var(--accent-amber)]"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
            <div className="flex flex-col gap-3">
              {[
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors hover:text-[var(--accent-amber)]"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} className="mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} Partypop. All rights reserved. Made with 🎉 by ChimeStream.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-[var(--accent-amber)]" style={{ color: "rgba(255,255,255,0.4)" }}>
              <Instagram size={18} />
            </a>
            <a href="#" className="transition-colors hover:text-[var(--accent-amber)]" style={{ color: "rgba(255,255,255,0.4)" }}>
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
