"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    subline: "Your first party, completely free",
    features: [
      { text: "1 party plan", included: true },
      { text: "Full AI-generated checklist", included: true },
      { text: "Shopping list with budget tracker", included: true },
      { text: "Guest tracker (up to 15 guests)", included: true },
      { text: "Vendor recommendations", included: false },
      { text: "Shareable plan links", included: false },
      { text: "Day-of timeline", included: false },
    ],
    cta: "Start Free",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Party Pro",
    price: "$9",
    period: "/month",
    subline: "For parents who party regularly",
    badge: "Most Popular",
    features: [
      { text: "5 party plans/month", included: true },
      { text: "Full AI-generated checklist", included: true },
      { text: "Shopping list + budget tracker", included: true },
      { text: "Guest tracker (unlimited)", included: true },
      { text: "Local vendor recommendations", included: true },
      { text: "Shareable plan links", included: true },
      { text: "Day-of timeline", included: true },
    ],
    cta: "Get Party Pro",
    href: "/signup?plan=pro",
    highlighted: true,
  },
  {
    name: "Family",
    price: "$19",
    period: "/month",
    subline: "For the parents who go all out",
    features: [
      { text: "Unlimited party plans", included: true },
      { text: "Everything in Party Pro", included: true },
      { text: "Premium vendor network (verified)", included: true },
      { text: "Priority support", included: true },
      { text: "Early access to new features", included: true },
    ],
    cta: "Get Family",
    href: "/signup?plan=family",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24" style={{ background: "var(--surface)" }}>
      <div className="max-w-container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            Start free. Upgrade when you need more.
          </h2>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            No contracts. Cancel anytime. 14-day money-back guarantee.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative rounded-lg border p-7"
              style={{
                background: "var(--surface)",
                borderColor: plan.highlighted ? "var(--accent)" : "var(--border)",
                borderWidth: plan.highlighted ? "2px" : "1px",
                transform: plan.highlighted ? "scale(1.02)" : "scale(1)",
                boxShadow: plan.highlighted
                  ? "0 16px 48px rgba(45,27,14,0.16)"
                  : "0 1px 3px rgba(45,27,14,0.06)",
                zIndex: plan.highlighted ? 10 : 0,
              }}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: "var(--accent)" }}
                >
                  {plan.badge}
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-display text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
                    {plan.price}
                  </span>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>{plan.period}</span>
                </div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{plan.subline}</p>
              </div>

              <div className="flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <div key={f.text} className="flex items-center gap-2.5">
                    {f.included ? (
                      <Check size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
                    ) : (
                      <X size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                    )}
                    <span className="text-sm" style={{ color: f.included ? "var(--text-secondary)" : "var(--text-muted)" }}>
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.href}
                className="block text-center py-3 rounded-md text-sm font-semibold transition-all hover:scale-[1.01]"
                style={
                  plan.highlighted
                    ? { background: "var(--accent)", color: "white", boxShadow: "0 4px 12px rgba(255,107,74,0.32)" }
                    : { border: "2px solid var(--border)", color: "var(--text-secondary)" }
                }
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm mt-8" style={{ color: "var(--text-muted)" }}>
          🔒 All plans include 14-day money-back guarantee. Cancel anytime. No contracts.
        </p>
      </div>
    </section>
  );
}
