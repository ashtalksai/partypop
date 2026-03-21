"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Solution() {
  return (
    <section className="py-24" style={{ background: "var(--surface)" }}>
      <div className="max-w-prose mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-display font-bold text-4xl mb-6" style={{ color: "var(--text-primary)" }}>
            Answer 10 questions. Get a complete party plan.
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--text-secondary)" }}>
            Partypop uses AI to turn your theme, budget, and zip code into a complete plan — every task, every item to buy, vendors who&apos;ve actually delivered for parties like yours, and a minute-by-minute day-of timeline. The chaos becomes a checklist. You become the parent who had it together.
          </p>
          <Link
            href="/signup"
            className="inline-flex px-8 py-4 rounded-md text-base font-semibold text-white transition-all hover:scale-[1.02]"
            style={{ background: "var(--accent)", boxShadow: "0 4px 12px rgba(255,107,74,0.32)" }}
          >
            Get My Free Plan
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
