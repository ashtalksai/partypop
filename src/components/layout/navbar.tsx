"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/quiz", label: "Quiz" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="h-8 flex items-center justify-center text-xs font-medium text-[var(--text-secondary)] relative" style={{ background: "var(--accent-amber-light)" }}>
        🎉 Free for your first party — no credit card required
      </div>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="sticky top-0 z-50 h-16 flex items-center transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div className="max-w-container mx-auto px-6 w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              Party<span style={{ color: "var(--accent)" }}>pop</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--text-secondary)" }}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 rounded-md text-sm font-semibold text-white transition-all hover:scale-[1.01]"
              style={{ background: "var(--accent)", boxShadow: "0 4px 12px rgba(255,107,74,0.32)" }}
            >
              Plan My Party Free
            </Link>
          </div>

          {/* Mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden p-2">
              <Menu size={22} style={{ color: "var(--text-primary)" }} />
            </SheetTrigger>
            <SheetContent side="right" className="w-72" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="flex flex-col gap-6 mt-8">
                <span className="font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  Party<span style={{ color: "var(--accent)" }}>pop</span>
                </span>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr style={{ borderColor: "var(--border)" }} />
                <Link href="/login" onClick={() => setOpen(false)} className="text-base font-medium" style={{ color: "var(--text-secondary)" }}>
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="px-5 py-3 rounded-md text-sm font-semibold text-white text-center"
                  style={{ background: "var(--accent)" }}
                >
                  Plan My Party Free
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.header>
    </>
  );
}
