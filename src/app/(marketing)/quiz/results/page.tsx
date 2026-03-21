"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

const THEME_RESULTS = [
  {
    theme: "🦄 Enchanted Unicorn",
    desc: "A magical rainbow-filled celebration with pastel decorations, fairy wings, and a sparkling unicorn cake.",
    ideas: ["DIY unicorn headbands craft station", "Rainbow fruit skewers", "Glitter slime activity"],
    bestFor: "Ages 4–8, home or backyard",
  },
  {
    theme: "🚀 Space Explorer",
    desc: "Blast off to an out-of-this-world party with galaxy decorations, astronaut costumes, and planet-themed games.",
    ideas: ["'Pin the tail on the rocket' game", "Galaxy cupcakes with edible glitter", "DIY telescope take-home favors"],
    bestFor: "Ages 5–10, any venue",
    recommended: true,
  },
  {
    theme: "🎨 Art Studio Party",
    desc: "Unleash creativity with a hands-on art party featuring canvas painting, tie-dye, and colorful decor.",
    ideas: ["Each guest paints their own canvas", "Color-splash balloon pop game", "Tie-dye t-shirt take-home"],
    bestFor: "Ages 5–12, indoor venue recommended",
  },
];

function ResultsContent() {
  const params = useSearchParams();
  const [showCapture, setShowCapture] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCapture(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ background: "var(--background)" }}>
      <section className="py-16 text-center" style={{ background: "var(--surface-warm)" }}>
        <h1 className="font-display font-bold text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
          Your Top 3 Party Themes
        </h1>
        <p className="text-base" style={{ color: "var(--text-secondary)" }}>Based on your answers, here are your best matches.</p>
      </section>

      <section className="py-16">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {THEME_RESULTS.map((t, i) => (
              <motion.div
                key={t.theme}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border p-6 relative"
                style={{
                  background: "var(--surface)",
                  borderColor: t.recommended ? "var(--accent-amber)" : "var(--border)",
                  borderWidth: t.recommended ? "2px" : "1px",
                  boxShadow: t.recommended ? "0 8px 32px rgba(45,27,14,0.1)" : "0 1px 3px rgba(45,27,14,0.06)",
                }}
              >
                {t.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: "var(--accent-amber)", color: "#92400E" }}>
                    ⭐ Best Match
                  </div>
                )}
                <h3 className="font-display text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{t.theme}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{t.desc}</p>
                <div className="mb-4">
                  <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>Starter Ideas</div>
                  <ul className="flex flex-col gap-1">
                    {t.ideas.map(idea => <li key={idea} className="text-sm flex items-start gap-1.5"><span style={{ color: "var(--accent)" }}>•</span><span style={{ color: "var(--text-secondary)" }}>{idea}</span></li>)}
                  </ul>
                </div>
                <div className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>Best for: {t.bestFor}</div>
                <Link
                  href={`/signup?theme=${encodeURIComponent(t.theme)}`}
                  className="block text-center py-2.5 rounded-md text-sm font-semibold text-white"
                  style={{ background: "var(--accent)" }}>
                  Plan This Party →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead capture bottom sheet */}
      <AnimatePresence>
        {showCapture && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="fixed bottom-0 left-0 right-0 z-50 p-6 border-t"
            style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "0 -8px 32px rgba(45,27,14,0.1)" }}
          >
            <button onClick={() => setShowCapture(false)} className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-100">
              <X size={16} style={{ color: "var(--text-muted)" }} />
            </button>
            <div className="max-w-md mx-auto text-center">
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                Want the full plan for Space Explorer?
              </h3>
              <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                Create a free account and we'll generate the complete checklist, shopping list, and vendors.
              </p>
              <Link href="/signup?theme=Space+Explorer"
                className="inline-block px-6 py-3 rounded-md text-sm font-semibold text-white"
                style={{ background: "var(--accent)", boxShadow: "0 4px 12px rgba(255,107,74,0.32)" }}>
                Get My Free Plan →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function QuizResultsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="text-sm" style={{ color: "var(--text-muted)" }}>Loading results...</div></div>}>
      <ResultsContent />
    </Suspense>
  );
}
