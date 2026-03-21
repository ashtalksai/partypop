"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section
      className="py-24"
      style={{
        background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-amber) 100%)",
      }}
    >
      <div className="max-w-prose mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-display font-bold text-4xl text-white mb-4">
            Your next party starts here.
          </h2>
          <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.85)" }}>
            Stop juggling three apps, a spreadsheet, and your group chat. Let Partypop handle the planning so you can actually enjoy the party.
          </p>
          <Link
            href="/signup"
            className="inline-flex px-8 py-4 rounded-md text-base font-semibold transition-all hover:scale-[1.02] border-2 border-white text-white hover:bg-white"
            style={{ color: "white" }}
          >
            Plan My First Party Free →
          </Link>
          <p className="text-sm mt-4" style={{ color: "rgba(255,255,255,0.7)" }}>
            No credit card. 2 minutes. Your first party is on us.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
