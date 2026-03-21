"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Tell us about your party",
    description: "Theme, date, budget, zip code, and headcount. Takes 2 minutes. The more you tell us, the smarter your plan.",
    image: "/images/hero-illustration.png",
  },
  {
    number: "02",
    title: "Get your complete plan",
    description: "Partypop generates a full checklist, shopping list, vendor shortlist, and day-of timeline — tailored to your exact party.",
    image: "/images/feature-checklist.png",
  },
  {
    number: "03",
    title: "Check things off. Host your party.",
    description: "Work through the list on your own timeline. Invite a co-planner. Watch the chaos transform into a plan that just works.",
    image: "/images/feature-ai-plan.png",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24" style={{ background: "var(--surface)" }}>
      <div className="max-w-container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl" style={{ color: "var(--text-primary)" }}>
            Go from overwhelmed to organized in 3 steps.
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem", position: "relative" }}>
          {/* Vertical timeline line */}
          <div
            style={{ position: "absolute", left: "calc(50% - 1px)", top: "2rem", bottom: "2rem", width: "2px", background: "var(--border)", display: "none" }}
            className="md:block"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="how-it-works-step"
              data-reverse={i % 2 === 1 ? "true" : "false"}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{ fontSize: "5rem", fontWeight: 700, lineHeight: 1, userSelect: "none", color: "var(--border)", fontFamily: "var(--font-mono)" }}
                >
                  {step.number}
                </div>
                <div
                  style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem", marginTop: "-0.5rem", color: "var(--accent)" }}
                >
                  Step {step.number}
                </div>
                <h3 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>
                  {step.description}
                </p>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    boxShadow: "0 4px 24px rgba(45,27,14,0.08)",
                    maxHeight: "280px",
                  }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={480}
                    height={280}
                    style={{ width: "100%", height: "280px", objectFit: "cover", display: "block" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
