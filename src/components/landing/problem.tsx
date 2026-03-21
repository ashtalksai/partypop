"use client";

import { motion } from "framer-motion";

const problems = [
  {
    icon: "📋",
    title: "The spreadsheet monster",
    body: "Guest list in one note. Shopping list in another. Vendor contacts in your DMs. Budget on a napkin. You're coordinating three apps and a group chat just to pull off a birthday party.",
  },
  {
    icon: "📞",
    title: "Vendor Russian roulette",
    body: "The bounce house company with 4.5 stars ghosted you. The caterer with the most reviews was already booked. You're calling your fourth option at 10pm on a Tuesday.",
  },
  {
    icon: "😰",
    title: "The day-of chaos",
    body: "You forgot to pick up the cake. The games start in 15 minutes. Your co-planner doesn't know where anything is. Somehow you have to look calm in front of 14 five-year-olds.",
  },
];

export function Problem() {
  return (
    <section className="py-24" style={{ background: "var(--surface-warm)" }}>
      <div className="max-w-container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            Party planning shouldn&apos;t be a second job.
          </h2>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>But somehow it always is.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-lg p-6 border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4"
                style={{ background: "var(--accent-amber-light)" }}
              >
                {p.icon}
              </div>
              <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
