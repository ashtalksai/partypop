"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const OCCASIONS = ["🎂 Birthday", "🎓 Graduation", "🎄 Holiday", "🎊 Other"];
const THEMES = ["🦄 Unicorn", "🦕 Dinosaur", "🚀 Space", "🦸 Superhero", "🌊 Ocean", "🎮 Gaming", "🌸 Garden", "🎨 Art & Crafts", "⚽ Sports", "🐾 Animals", "🧁 Bakery", "✨ Glam", "🤖 AI/Robots", "🏰 Royalty", "🌈 Rainbow", "🎯 Surprise me!"];
const VENUES = ["🏠 Home", "🌿 Backyard", "🏛️ Rented Venue", "🌳 Park"];

const STEPS = [
  "Occasion", "Star of the show", "Theme", "Kids count",
  "Adults count", "Budget", "Date", "Venue", "Location", "Dietary needs"
];

interface WizardData {
  occasion: string; childName: string; childAge: number;
  theme: string; headcountKids: number; headcountAdults: number;
  budget: number; date: string; venueType: string; zipCode: string; dietaryNotes: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WizardData>({
    occasion: "", childName: "", childAge: 5, theme: "",
    headcountKids: 10, headcountAdults: 5, budget: 500,
    date: "", venueType: "", zipCode: "", dietaryNotes: ""
  });

  const update = (key: keyof WizardData, val: string | number) => setData(d => ({ ...d, [key]: val }));

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const submit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/parties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${data.childName}'s ${data.occasion.replace(/^.+\s/, "")} Party`,
          childName: data.childName,
          childAge: data.childAge,
          theme: data.theme.replace(/^.+\s/, ""),
          headcountKids: data.headcountKids,
          headcountAdults: data.headcountAdults,
          budget: data.budget,
          date: data.date || null,
          venueType: data.venueType.replace(/^.+\s/, ""),
          zipCode: data.zipCode,
          dietaryNotes: data.dietaryNotes,
        }),
      });
      const party = await res.json();
      router.push(`/party/${party.id}`);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 w-full" style={{ background: "var(--background)" }}>
      {loading ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-full border-4 border-t-transparent mx-auto mb-6"
            style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
          />
          <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            Partypop is building your plan...
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            Generating checklist, shopping list & vendors
          </p>
        </motion.div>
      ) : (
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                Step {step + 1} of {STEPS.length}
              </span>
              <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>{STEPS[step]}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--accent)" }}
                initial={{ width: "0%" }}
                animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Card */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="rounded-xl p-8 border"
            style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "0 4px 24px rgba(45,27,14,0.08)" }}
          >
            <StepContent step={step} data={data} update={update} />
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button onClick={back} disabled={step === 0}
              className="flex items-center gap-1 px-4 py-3 min-h-[44px] rounded-md text-sm font-medium disabled:opacity-30 transition-all"
              style={{ color: "var(--text-secondary)" }}>
              <ChevronLeft size={16} /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button onClick={next}
                className="flex items-center gap-1 px-6 py-3 min-h-[44px] rounded-md text-sm font-semibold text-white transition-all hover:scale-[1.01]"
                style={{ background: "var(--accent)", boxShadow: "0 4px 12px rgba(255,107,74,0.32)" }}>
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={submit}
                className="flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-md text-sm font-semibold text-white transition-all hover:scale-[1.01]"
                style={{ background: "var(--accent)", boxShadow: "0 4px 12px rgba(255,107,74,0.32)" }}>
                <Sparkles size={16} /> Build My Party Plan →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StepContent({ step, data, update }: { step: number; data: WizardData; update: (k: keyof WizardData, v: string | number) => void }) {
  switch (step) {
    case 0:
      return (
        <div>
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>What's the occasion?</h2>
          <div className="grid grid-cols-2 gap-3">
            {OCCASIONS.map(o => (
              <button key={o} onClick={() => update("occasion", o)}
                className="p-4 rounded-lg border text-sm font-medium transition-all"
                style={{
                  borderColor: data.occasion === o ? "var(--accent)" : "var(--border)",
                  background: data.occasion === o ? "rgba(255,107,74,0.08)" : "var(--surface)",
                  color: data.occasion === o ? "var(--accent)" : "var(--text-secondary)",
                }}>
                {o}
              </button>
            ))}
          </div>
        </div>
      );
    case 1:
      return (
        <div>
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Who's the star? 🌟</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--text-secondary)" }}>Child's name</label>
              <input type="text" value={data.childName} onChange={e => update("childName", e.target.value)}
                placeholder="Emma" className="w-full px-4 py-3 rounded-md border outline-none text-base"
                style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                onFocus={e => e.target.style.borderColor = "var(--accent)"}
                onBlur={e => e.target.style.borderColor = "var(--border)"} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-3" style={{ color: "var(--text-secondary)" }}>
                Age: <span style={{ color: "var(--accent)" }}>{data.childAge}</span>
              </label>
              <div className="flex items-center gap-4">
                <button onClick={() => update("childAge", Math.max(1, data.childAge - 1))}
                  className="w-10 h-10 rounded-full border flex items-center justify-center text-lg font-bold transition-colors hover:border-accent"
                  style={{ borderColor: "var(--border)" }}>−</button>
                <span className="text-3xl font-bold w-12 text-center" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>{data.childAge}</span>
                <button onClick={() => update("childAge", data.childAge + 1)}
                  className="w-10 h-10 rounded-full border flex items-center justify-center text-lg font-bold transition-colors hover:border-accent"
                  style={{ borderColor: "var(--border)", color: "var(--accent)" }}>+</button>
              </div>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Pick a theme 🎨</h2>
          <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
            {THEMES.map(t => (
              <button key={t} onClick={() => update("theme", t)}
                className="p-3 rounded-lg border text-xs font-medium transition-all text-center"
                style={{
                  borderColor: data.theme === t ? "var(--accent)" : "var(--border)",
                  background: data.theme === t ? "rgba(255,107,74,0.08)" : "var(--surface)",
                  color: data.theme === t ? "var(--accent)" : "var(--text-secondary)",
                }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      );
    case 3:
      return (
        <div>
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>How many kids? 👦👧</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Including the birthday child</p>
          <div className="flex items-center justify-center gap-6">
            <button onClick={() => update("headcountKids", Math.max(1, data.headcountKids - 1))}
              className="w-12 h-12 rounded-full border flex items-center justify-center text-xl font-bold"
              style={{ borderColor: "var(--border)" }}>−</button>
            <span className="text-5xl font-bold" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>{data.headcountKids}</span>
            <button onClick={() => update("headcountKids", data.headcountKids + 1)}
              className="w-12 h-12 rounded-full border flex items-center justify-center text-xl font-bold"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>+</button>
          </div>
        </div>
      );
    case 4:
      return (
        <div>
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Adults attending? 👨‍👩‍👧</h2>
          <div className="flex items-center justify-center gap-6">
            <button onClick={() => update("headcountAdults", Math.max(0, data.headcountAdults - 1))}
              className="w-12 h-12 rounded-full border flex items-center justify-center text-xl font-bold"
              style={{ borderColor: "var(--border)" }}>−</button>
            <span className="text-5xl font-bold" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>{data.headcountAdults}</span>
            <button onClick={() => update("headcountAdults", data.headcountAdults + 1)}
              className="w-12 h-12 rounded-full border flex items-center justify-center text-xl font-bold"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>+</button>
          </div>
        </div>
      );
    case 5:
      return (
        <div>
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>What's your budget? 💰</h2>
          <div className="text-center mb-6">
            <span className="text-4xl font-bold" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>${data.budget}</span>
          </div>
          <input type="range" min={100} max={2000} step={50} value={data.budget} onChange={e => update("budget", Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <div className="flex justify-between mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
            <span>$100 Simple</span><span>$500 Fun</span><span>$2000+ Epic</span>
          </div>
        </div>
      );
    case 6:
      return (
        <div>
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>When's the party? 📅</h2>
          <input type="date" value={data.date} onChange={e => update("date", e.target.value)}
            className="w-full px-4 py-3 rounded-md border outline-none text-base"
            style={{ borderColor: "var(--border)", color: "var(--text-primary)", accentColor: "var(--accent)" }}
            min={new Date().toISOString().split("T")[0]} />
          {data.date && new Date(data.date) < new Date(Date.now() + 14 * 86400000) && (
            <p className="text-xs mt-2" style={{ color: "var(--warning)" }}>⚠️ Tight timeline — we'll prioritize urgent tasks</p>
          )}
        </div>
      );
    case 7:
      return (
        <div>
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Where are you hosting? 📍</h2>
          <div className="grid grid-cols-2 gap-3">
            {VENUES.map(v => (
              <button key={v} onClick={() => update("venueType", v)}
                className="p-4 rounded-lg border text-sm font-medium transition-all"
                style={{
                  borderColor: data.venueType === v ? "var(--accent)" : "var(--border)",
                  background: data.venueType === v ? "rgba(255,107,74,0.08)" : "var(--surface)",
                  color: data.venueType === v ? "var(--accent)" : "var(--text-secondary)",
                }}>
                {v}
              </button>
            ))}
          </div>
        </div>
      );
    case 8:
      return (
        <div>
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Your zip code? 🗺️</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>We use this to find vendors near you</p>
          <input type="text" value={data.zipCode} onChange={e => update("zipCode", e.target.value)}
            placeholder="e.g. 10001" maxLength={10}
            className="w-full px-4 py-3 rounded-md border outline-none text-base"
            style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            onFocus={e => e.target.style.borderColor = "var(--accent)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"} />
        </div>
      );
    case 9:
      return (
        <div>
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Any dietary needs? 🥗</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Allergies, preferences, restrictions</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {["Gluten-free", "Nut-free", "Dairy-free", "Vegan", "Kosher", "Halal"].map(d => {
              const selected = data.dietaryNotes.includes(d);
              return (
                <button key={d} onClick={() => {
                  const current = data.dietaryNotes ? data.dietaryNotes.split(", ").filter(Boolean) : [];
                  if (selected) update("dietaryNotes", current.filter(x => x !== d).join(", "));
                  else update("dietaryNotes", [...current, d].join(", "));
                }}
                  className="px-3 py-1.5 rounded-full border text-xs font-medium transition-all"
                  style={{
                    borderColor: selected ? "var(--accent)" : "var(--border)",
                    background: selected ? "rgba(255,107,74,0.1)" : "transparent",
                    color: selected ? "var(--accent)" : "var(--text-secondary)",
                  }}>
                  {d}
                </button>
              );
            })}
          </div>
          <textarea value={data.dietaryNotes} onChange={e => update("dietaryNotes", e.target.value)}
            placeholder="Any other notes..."
            rows={3}
            className="w-full px-4 py-3 rounded-md border outline-none text-sm resize-none"
            style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            onFocus={e => e.target.style.borderColor = "var(--accent)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"} />
        </div>
      );
    default: return null;
  }
}
