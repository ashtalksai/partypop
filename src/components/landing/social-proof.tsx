"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "I used to spend three weeks planning my daughter's birthday. Partypop gave me a complete plan in the time it took to finish my coffee. The vendor recommendations alone saved me four phone calls.",
    name: "Sarah M.",
    role: "Mom of 2, Chicago",
    initials: "SM",
  },
  {
    quote: "My partner and I were both 'tracking' different things and still forgot half of what we needed. Now we share the same plan and I actually enjoy the week before the party instead of dreading it.",
    name: "Marcus T.",
    role: "Dad of 3, Austin",
    initials: "MT",
  },
  {
    quote: "The day-of timeline is what got me. I always felt like I was improvising on party day. Having a minute-by-minute plan made me feel like a professional event planner.",
    name: "Jenny K.",
    role: "Mom of 1, Seattle",
    initials: "JK",
  },
];

const stats = [
  { value: "500+", label: "Parties planned" },
  { value: "4.9/5", label: "Parent rating" },
  { value: "2 min", label: "To a complete plan" },
  { value: "100%", label: "Stress-free parties" },
];

export function SocialProof() {
  return (
    <section className="py-16 md:py-24" style={{ background: "var(--surface-warm)" }}>
      <div className="max-w-container mx-auto px-6">
        <motion.div
          initial={{ opacity: 1, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-4xl" style={{ color: "var(--text-primary)" }}>
            From spreadsheet chaos to party confidence.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 1, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-lg p-7 border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "0 1px 3px rgba(45,27,14,0.06), 0 4px 16px rgba(45,27,14,0.06)",
              }}
            >
              <p className="italic text-base mb-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: "var(--accent-amber)" }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 1, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-lg px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ background: "var(--accent)" }}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                {s.value}
              </div>
              <div className="text-xs text-white/80 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
