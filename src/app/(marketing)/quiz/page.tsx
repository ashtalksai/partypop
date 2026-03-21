"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface VibeOption { label: string; desc: string; icon: string }
interface QuizQuestion {
  q: string; type: string; key: string;
  options?: (string | VibeOption)[];
  min?: number; max?: number;
}

const QUESTIONS: QuizQuestion[] = [
  { q: "How old is the birthday star?", type: "select", options: ["1–2", "3–5", "6–8", "9–12", "13+"], key: "age" },
  { q: "What are they obsessed with right now?", type: "multi", options: ["🦕 Dinosaurs", "🦄 Unicorns", "🚀 Space", "⚽ Sports", "🎮 Gaming", "🦸 Superheroes", "🐾 Animals", "🎨 Arts & Crafts", "🎵 Music", "🎬 Movies", "🌲 Outdoors", "✨ Other"], key: "interests" },
  { q: "What's your venue?", type: "grid", options: ["🏠 Home", "🌿 Backyard", "🌳 Park", "🏛️ Rented Venue"], key: "venue" },
  { q: "How many kids are coming?", type: "slider", key: "count", min: 1, max: 30 },
  {
    q: "What's your party vibe?", type: "vibe",
    options: [
      { label: "Chill & Simple", desc: "Low-key, intimate, relaxed", icon: "🌿" },
      { label: "Fun & Colorful", desc: "Games, laughter, lots of energy", icon: "🎉" },
      { label: "Full Production", desc: "All the stops, maximum celebration", icon: "🎆" },
    ],
    key: "vibe",
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[] | number>>({});

  const q = QUESTIONS[step];
  const answer = answers[q.key];

  const next = () => {
    if (step < QUESTIONS.length - 1) setStep(s => s + 1);
    else router.push(`/quiz/results?data=${encodeURIComponent(JSON.stringify(answers))}`);
  };

  const back = () => setStep(s => Math.max(0, s - 1));

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-16" style={{ background: "var(--background)" }}>
      <div className="w-full max-w-lg px-6">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Question {step + 1} of {QUESTIONS.length}</span>
            <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>Free — No Account Required</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <motion.div className="h-full rounded-full" style={{ background: "var(--accent)" }}
              animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} transition={{ duration: 0.3 }} />
          </div>
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
          className="rounded-xl p-8 border mb-6"
          style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "0 4px 24px rgba(45,27,14,0.08)" }}>
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>{q.q}</h2>

          {q.type === "select" && (
            <div className="flex flex-wrap gap-2">
              {(q.options as string[]).map(o => (
                <button key={o} onClick={() => setAnswers(a => ({ ...a, [q.key]: o }))}
                  className="px-4 py-2 rounded-full border text-sm font-medium transition-all"
                  style={{
                    borderColor: answer === o ? "var(--accent)" : "var(--border)",
                    background: answer === o ? "rgba(255,107,74,0.1)" : "transparent",
                    color: answer === o ? "var(--accent)" : "var(--text-secondary)",
                  }}>{o}</button>
              ))}
            </div>
          )}

          {q.type === "multi" && (
            <div className="grid grid-cols-3 gap-2">
              {(q.options as string[]).map(o => {
                const selected = Array.isArray(answer) && answer.includes(o);
                return (
                  <button key={o} onClick={() => {
                    const cur = (Array.isArray(answer) ? answer : []) as string[];
                    setAnswers(a => ({ ...a, [q.key]: selected ? cur.filter(x => x !== o) : [...cur, o] }));
                  }}
                    className="p-3 rounded-lg border text-xs font-medium transition-all text-center"
                    style={{
                      borderColor: selected ? "var(--accent)" : "var(--border)",
                      background: selected ? "rgba(255,107,74,0.1)" : "transparent",
                      color: selected ? "var(--accent)" : "var(--text-secondary)",
                    }}>{o}</button>
                );
              })}
            </div>
          )}

          {q.type === "grid" && (
            <div className="grid grid-cols-2 gap-3">
              {(q.options as string[]).map(o => (
                <button key={o} onClick={() => setAnswers(a => ({ ...a, [q.key]: o }))}
                  className="p-4 rounded-lg border text-sm font-medium transition-all"
                  style={{
                    borderColor: answer === o ? "var(--accent)" : "var(--border)",
                    background: answer === o ? "rgba(255,107,74,0.1)" : "transparent",
                    color: answer === o ? "var(--accent)" : "var(--text-secondary)",
                  }}>{o}</button>
              ))}
            </div>
          )}

          {q.type === "slider" && (
            <div>
              <div className="text-center mb-4">
                <span className="text-4xl font-bold" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                  {(answer as number) || q.min}
                </span>
                <span className="text-lg ml-2" style={{ color: "var(--text-muted)" }}>kids</span>
              </div>
              <input type="range" min={q.min} max={q.max} value={(answer as number) || q.min}
                onChange={e => setAnswers(a => ({ ...a, [q.key]: Number(e.target.value) }))}
                className="w-full" />
              <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                <span>{q.min}</span><span>{q.max}+</span>
              </div>
            </div>
          )}

          {q.type === "vibe" && (
            <div className="flex flex-col gap-3">
              {(q.options as VibeOption[]).map((o) => (
                <button key={o.label} onClick={() => setAnswers(a => ({ ...a, [q.key]: o.label }))}
                  className="flex items-center gap-4 p-4 rounded-lg border text-left transition-all"
                  style={{
                    borderColor: answer === o.label ? "var(--accent)" : "var(--border)",
                    background: answer === o.label ? "rgba(255,107,74,0.08)" : "var(--surface)",
                  }}>
                  <span className="text-3xl">{o.icon}</span>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: answer === o.label ? "var(--accent)" : "var(--text-primary)" }}>{o.label}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{o.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <div className="flex items-center justify-between">
          <button onClick={back} disabled={step === 0}
            className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium disabled:opacity-30"
            style={{ color: "var(--text-secondary)" }}>
            <ChevronLeft size={16} /> Back
          </button>
          <button onClick={next}
            className="flex items-center gap-1 px-6 py-2.5 rounded-md text-sm font-semibold text-white"
            style={{ background: "var(--accent)", boxShadow: "0 4px 12px rgba(255,107,74,0.32)" }}>
            {step === QUESTIONS.length - 1 ? "See My Themes →" : "Next"} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
