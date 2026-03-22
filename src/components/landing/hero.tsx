"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-24 pb-16 md:pb-24 flex flex-col items-center text-center" style={{ background: "var(--background)" }}>
      <div className="max-w-[960px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{ background: "var(--accent-amber-light)", color: "#92400E" }}
          >
            ⚡ 2 MIN
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display font-bold leading-tight mb-6"
          style={{ fontSize: "clamp(32px,7vw,72px)", color: "var(--text-primary)" }}
        >
          Your kid&apos;s party,{" "}
          <span className="hidden sm:inline"><br /></span>
          planned in 2&nbsp;minutes.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-lg mb-8 max-w-[560px] mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          Tell us the theme, budget, and zip code. Partypop builds the full plan — checklist, shopping list, vendors who show up, and a day-of timeline. You just host.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Link
            href="/signup"
            className="px-8 py-4 min-h-[44px] rounded-md text-base font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.99]"
            style={{ background: "var(--accent)", boxShadow: "0 4px 12px rgba(255,107,74,0.32)" }}
          >
            Plan My Party Free
          </Link>
          <Link
            href="/#how-it-works"
            className="text-base font-medium transition-colors hover:text-[var(--accent)] min-h-[44px] flex items-center"
            style={{ color: "var(--text-secondary)" }}
          >
            See how it works →
          </Link>
        </motion.div>

        {/* Product screenshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mx-auto max-w-[800px]"
          style={{ transform: "rotate(-1deg)" }}
        >
          <div
            className="rounded-xl overflow-hidden"
            style={{ boxShadow: "0 8px 40px rgba(255,107,74,0.18), 0 2px 8px rgba(45,27,14,0.08)" }}
          >
            <Image
              src="/images/hero-illustration.png"
              alt="Partypop party plan dashboard"
              width={800}
              height={500}
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
