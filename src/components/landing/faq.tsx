"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is it really free to start?",
    a: "Yes. Your first party plan is completely free — no credit card required. You get the full checklist, shopping list, and guest tracker at no charge. Vendor recommendations and shareable links unlock on paid plans.",
  },
  {
    q: "How does the AI know what vendors to recommend?",
    a: "We seed vendor data by region and category. As the platform grows, vendor rankings reflect actual booking outcomes — which caterers showed up on time, which venues had no-show complaints. Think of it as word-of-mouth, systematized.",
  },
  {
    q: "Can I plan parties for different ages and themes?",
    a: "Yes. The wizard adapts to any theme, age, budget, and headcount. Planning a princess party for a 4-year-old is different from a game night for 10-year-olds — Partypop knows the difference.",
  },
  {
    q: "What if my budget is tight?",
    a: "Tell us your real budget during setup. Partypop tailors every recommendation — shopping list items, vendor choices, and checklist activities — to what you can actually spend. No shame, just planning.",
  },
  {
    q: "Can I share the plan with my partner?",
    a: "Yes, on Party Pro and Family plans. Generate a read-only link anyone can access. They'll see the full plan, checklist progress, and guest list — no account required on their end.",
  },
  {
    q: "What if I change my theme or date after generating the plan?",
    a: "You can update party details and regenerate the AI plan. Your manual changes (added guests, checked-off tasks) are preserved. It's your plan — not a locked PDF.",
  },
  {
    q: "Do you sell my data to vendors?",
    a: "No. Your party details are used to generate recommendations and improve suggestions. We don't sell personal data. See our Privacy Policy for full details.",
  },
];

export function FAQ() {
  return (
    <section className="py-24" style={{ background: "var(--background)" }}>
      <div className="max-w-[760px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-4xl" style={{ color: "var(--text-primary)" }}>
            Questions parents ask us
          </h2>
        </motion.div>

        <Accordion className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <AccordionItem
                value={`item-${i}`}
                className="border rounded-lg px-5"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <AccordionTrigger className="text-left font-semibold text-base py-4 hover:no-underline" style={{ color: "var(--text-primary)" }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm pb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
