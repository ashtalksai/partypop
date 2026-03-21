"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    icon: "/images/feature-ai-plan.png",
    title: "AI Party Plan in 2 Minutes",
    body: "Answer 10 questions — theme, budget, zip, headcount, date. Partypop generates a full plan instantly. No templates. No copy-paste. Real output.",
    large: true,
    accent: true,
  },
  {
    icon: "/images/feature-checklist.png",
    title: "Smart Checklist by Timeline",
    body: "Tasks organized by when you need to do them — 4 weeks out, 2 weeks out, day of. Check things off as you go.",
  },
  {
    icon: "/images/feature-shopping.png",
    title: "Shopping List + Budget Tracker",
    body: "Every item you need, grouped by category, with estimated costs. Watch your total vs. budget in real time.",
  },
  {
    icon: "/images/feature-vendors.png",
    title: "Local Vendor Recommendations",
    body: "Vendors ranked by actual booking data. See who's available, what they charge, and who shows up on time.",
  },
  {
    icon: "👥",
    title: "Guest Tracker + RSVP Manager",
    body: "Add guests, track RSVP status, note dietary needs, count heads. No more 'who confirmed again?' texts.",
    emoji: true,
  },
  {
    icon: "🔗",
    title: "Shareable Plans",
    body: "Share a read-only link with your partner or helpers. Everyone sees the same plan. Nobody's out of the loop.",
    emoji: true,
  },
];

export function Features() {
  return (
    <section className="py-24" style={{ background: "var(--background)" }}>
      <div className="max-w-container mx-auto px-6">
        <motion.div
          initial={{ opacity: 1, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-4xl" style={{ color: "var(--text-primary)" }}>
            Everything you need. Nothing you don&apos;t.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 1, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ boxShadow: "0 4px 16px rgba(255,107,74,0.12), 0 8px 32px rgba(45,27,14,0.08)", y: -2 }}
              className={`rounded-lg border p-6 transition-all cursor-default ${f.large ? "md:col-span-2" : ""}`}
              style={{
                background: f.accent ? "var(--accent)" : "var(--surface)",
                borderColor: f.accent ? "var(--accent)" : "var(--border)",
                boxShadow: "0 1px 3px rgba(45,27,14,0.06), 0 4px 16px rgba(45,27,14,0.06)",
              }}
            >
              <div className="mb-4">
                {f.emoji ? (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: f.accent ? "rgba(255,255,255,0.2)" : "var(--accent-amber-light)" }}
                  >
                    {f.icon}
                  </div>
                ) : (
                  <Image src={f.icon} alt={f.title} width={48} height={48} className="rounded-lg object-cover" />
                )}
              </div>
              <h3
                className="font-display text-xl font-semibold mb-2"
                style={{ color: f.accent ? "white" : "var(--text-primary)" }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: f.accent ? "rgba(255,255,255,0.85)" : "var(--text-secondary)" }}
              >
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
