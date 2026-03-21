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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl" style={{ color: "var(--text-primary)" }}>
            Go from overwhelmed to organized in 3 steps.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-20 relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-[calc(50%-1px)] top-8 bottom-8 w-0.5 hidden md:block"
            style={{ background: "var(--border)" }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="flex-1">
                <div
                  className="text-8xl font-bold mb-0 leading-none select-none"
                  style={{ color: "var(--border)", fontFamily: "var(--font-mono)" }}
                >
                  {step.number}
                </div>
                <div
                  className="text-sm font-bold uppercase tracking-widest mb-3 -mt-2"
                  style={{ color: "var(--accent)" }}
                >
                  Step {step.number}
                </div>
                <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {step.description}
                </p>
              </div>
              <div className="flex-1">
                <div
                  className="rounded-xl overflow-hidden border"
                  style={{
                    borderColor: "var(--border)",
                    boxShadow: "0 4px 24px rgba(45,27,14,0.08)",
                  }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={480}
                    height={320}
                    className="w-full h-auto object-cover"
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
