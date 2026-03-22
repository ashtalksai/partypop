import { PricingSection } from "@/components/landing/pricing-section";
import { FAQ } from "@/components/landing/faq";
import { Check, X } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div style={{ background: "var(--background)" }}>
      <div className="py-16 text-center" style={{ background: "var(--surface-warm)" }}>
        <h1 className="font-display font-bold text-5xl mb-4" style={{ color: "var(--text-primary)" }}>Pricing</h1>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>Simple, transparent. Start free. Upgrade when you need more.</p>
      </div>

      <PricingSection />

      {/* Comparison table */}
      <section className="py-20" style={{ background: "var(--surface-warm)" }}>
        <div className="max-w-container mx-auto px-6 overflow-x-auto">
          <h2 className="font-display font-bold text-3xl mb-10 text-center" style={{ color: "var(--text-primary)" }}>Feature Comparison</h2>
          <table className="w-full text-sm" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr>
                <th className="text-left py-3 px-5 text-base font-display" style={{ color: "var(--text-primary)" }}>Feature</th>
                {["Free", "Party Pro", "Family"].map(p => (
                  <th key={p} className="py-3 px-5 text-center font-semibold" style={{ color: p === "Party Pro" ? "var(--accent)" : "var(--text-primary)" }}>{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Party plans", "1", "5/month", "Unlimited"],
                ["AI checklist", "✓", "✓", "✓"],
                ["Shopping list + budget", "✓", "✓", "✓"],
                ["Guest tracker", "Up to 15", "Unlimited", "Unlimited"],
                ["Vendor recommendations", "—", "✓", "✓ (Premium)"],
                ["Shareable plan links", "—", "✓", "✓"],
                ["Day-of timeline", "—", "✓", "✓"],
                ["Priority support", "—", "—", "✓"],
                ["Early feature access", "—", "—", "✓"],
              ].map(([feature, ...values]) => (
                <tr key={feature} className="border-t" style={{ borderColor: "var(--border)" }}>
                  <td className="py-3 px-5" style={{ color: "var(--text-secondary)" }}>{feature}</td>
                  {values.map((v, i) => (
                    <td key={i} className="py-3 px-5 text-center" style={{ color: v === "—" ? "var(--text-muted)" : v === "✓" ? "var(--success)" : "var(--text-secondary)" }}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-20">
        <div className="max-w-[760px] mx-auto px-6">
          <h2 className="font-display font-bold text-3xl mb-10 text-center" style={{ color: "var(--text-primary)" }}>Pricing FAQs</h2>
          <div className="flex flex-col gap-6">
            {[
              ["Can I upgrade or downgrade at any time?", "Yes. Changes take effect at next billing cycle. No penalties."],
              ["What happens to my parties if I downgrade to Free?", "Your existing party plans stay accessible. You just can't create new ones beyond the free tier limit."],
              ["Do you offer refunds?", "Yes — 14-day money-back guarantee, no questions asked."],
              ["What payment methods do you accept?", "All major credit cards via Stripe. Apple Pay and Google Pay coming soon."],
            ].map(([q, a]) => (
              <div key={q} className="rounded-lg p-5 border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>{q}</h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-12 text-center">
        <Link href="/signup"
          className="inline-flex px-8 py-4 min-h-[44px] rounded-md text-base font-semibold text-white transition-all hover:scale-[1.02]"
          style={{ background: "var(--accent)", boxShadow: "0 4px 12px rgba(255,107,74,0.32)" }}>
          Start Free — No Credit Card Required →
        </Link>
      </div>
    </div>
  );
}
