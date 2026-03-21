"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const brand = {
  coral: "#FF6B4A",
  coralDark: "#E85535",
  amber: "#FFB347",
  cream: "#FFF8F4",
  surface: "#FFFFFF",
  warmBrown: "#2D1B0E",
  medBrown: "#6B4336",
  border: "#F0D9CC",
};

// ─── Slide components ─────────────────────────────────────────────────────────

function Slide1Title() {
  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center text-center relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${brand.coral} 0%, ${brand.amber} 100%)` }}
    >
      {/* Animated background confetti dots */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 12 + 4,
            height: Math.random() * 12 + 4,
            background: i % 2 === 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-7xl font-bold text-white mb-6"
          style={{ fontFamily: "Fraunces, Georgia, serif" }}
        >
          Partypop
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-2xl text-white/90 mb-4"
          style={{ fontFamily: "Plus Jakarta Sans, system-ui" }}
        >
          Your kid&apos;s party, planned in 2 minutes.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-base text-white/60 mb-10"
        >
          AI Party Planner for Busy Parents
        </motion.p>
        <motion.a
          href="https://partypopai.ashketing.com"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white/90 border-2 border-white/40 hover:bg-white/10 transition-all"
        >
          Try it free → partypopai.ashketing.com
          <ExternalLink size={16} />
        </motion.a>
      </div>
    </div>
  );
}

function Slide2Problem() {
  const pains = [
    {
      icon: "🗂️",
      title: "The Spreadsheet Monster",
      body: "\"I have a Google Sheet, 3 Pinterest boards, a notes app, and a group chat — and I still forgot the cake.\"",
    },
    {
      icon: "🎯",
      title: "Vendor Roulette",
      body: "\"I called 8 bounce house companies. Half don't answer. Two were already booked.\"",
    },
    {
      icon: "😰",
      title: "Day-Of Chaos",
      body: "\"I thought I had it handled. I didn't.\"",
    },
  ];

  return (
    <div
      className="h-full w-full flex flex-col justify-center px-12 py-10"
      style={{ background: brand.warmBrown }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: brand.coral }}>
            The Problem
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-white mb-10"
          style={{ fontFamily: "Fraunces, Georgia, serif" }}
        >
          Planning a birthday party is secretly a project management nightmare.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {pains.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{p.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-3 px-6 py-4 rounded-xl"
          style={{ background: `${brand.coral}15`, border: `1px solid ${brand.coral}30` }}
        >
          <span className="text-2xl">📊</span>
          <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
            <span style={{ color: brand.amber, fontWeight: 700 }}>73%</span> of parents describe party planning as &quot;more stressful than work.&quot;
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Slide3Solution() {
  const steps = [
    "Answer 10 questions (2 min)",
    "AI generates complete party plan",
    "Vendor suggestions for your zip code",
    "Shopping list with budget tracker",
    "Guest RSVP management",
    "🎉 Confetti when every task is checked",
  ];

  return (
    <div
      className="h-full w-full flex flex-col justify-center px-12 py-10"
      style={{ background: brand.cream }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xs uppercase tracking-widest font-semibold"
          style={{ color: brand.coral }}
        >
          The Solution
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mt-3 mb-3"
          style={{ fontFamily: "Fraunces, Georgia, serif", color: brand.warmBrown }}
        >
          One place. Full plan. Actually done.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl mb-8"
          style={{ color: brand.medBrown }}
        >
          10 questions → complete party plan. In 2 minutes.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-3 rounded-xl p-4"
              style={{
                background: i === 5 ? `linear-gradient(135deg, ${brand.coral}, ${brand.amber})` : "rgba(255,107,74,0.06)",
                border: i === 5 ? "none" : `1px solid ${brand.border}`,
              }}
            >
              <span
                className="text-sm font-bold mt-0.5 shrink-0"
                style={{ color: i === 5 ? "white" : brand.coral }}
              >
                {i === 5 ? "✓" : `${i + 1}.`}
              </span>
              <span
                className="text-sm font-medium leading-snug"
                style={{ color: i === 5 ? "white" : brand.warmBrown }}
              >
                {step}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-base italic"
          style={{ color: brand.medBrown }}
        >
          &quot;When Partypop says you&apos;re done — you&apos;re done.&quot;
        </motion.p>
      </div>
    </div>
  );
}

function Slide4Market() {
  const metrics = [
    { value: "$13.2B", label: "Kids' party planning market (US)", big: true },
    { value: "4M", label: "Parties/year with $200+ budgets" },
    { value: "+340%", label: "YoY growth in event planning keywords" },
    { value: "14.8K", label: "\"Party planner\" searches/month — LOW competition" },
  ];

  const competitors = [
    { name: "PartyPilotAI", gap: "Decor only" },
    { name: "Pinterest", gap: "Inspiration only" },
    { name: "Evite", gap: "Invitations only" },
    { name: "ChatGPT", gap: "Generic, no vendor data" },
  ];

  return (
    <div
      className="h-full w-full flex flex-col justify-center px-12 py-10"
      style={{ background: `linear-gradient(135deg, ${brand.coral}ee 0%, ${brand.coralDark} 100%)` }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xs uppercase tracking-widest font-semibold text-white/60"
        >
          Market Opportunity
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-white mt-3 mb-8"
          style={{ fontFamily: "Fraunces, Georgia, serif" }}
        >
          $13.2B market. Nobody owns it.
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Metric grid */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <div
                  className="text-2xl font-bold text-white mb-1"
                  style={{ fontFamily: "DM Mono, monospace" }}
                >
                  {m.value}
                </div>
                <div className="text-xs text-white/70 leading-tight">{m.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Competitor table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <div
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white/60"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              Competitors — all have gaps
            </div>
            {competitors.map((c, i) => (
              <div
                key={c.name}
                className="flex items-center justify-between px-4 py-2.5 text-sm"
                style={{ borderBottom: i < competitors.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
              >
                <span className="text-white font-medium">{c.name}</span>
                <span className="text-white/50 text-xs">{c.gap}</span>
              </div>
            ))}
            <div
              className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold"
              style={{ background: `${brand.amber}30` }}
            >
              <span style={{ color: brand.amber }}>✨ Partypop</span>
              <span className="text-white/80 text-xs">Complete plan</span>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-white/70 text-sm"
        >
          <span className="text-white font-semibold">Our angle:</span> Completion. Every other tool makes you do more work after using it.
        </motion.p>
      </div>
    </div>
  );
}

function Slide5Business() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "",
      desc: "1 party",
      features: ["1 AI party plan", "Basic checklist", "Guest RSVP (up to 10)"],
      bg: brand.border,
      text: brand.warmBrown,
      featured: false,
    },
    {
      name: "Party Pro",
      price: "$9",
      period: "/mo",
      desc: "Most popular",
      features: ["Unlimited parties", "Vendor directory", "Budget tracker", "Shareable plans"],
      bg: brand.coral,
      text: "#fff",
      featured: true,
    },
    {
      name: "Family",
      price: "$19",
      period: "/mo",
      desc: "5 members",
      features: ["Everything in Pro", "5 family members", "Priority support", "Early access"],
      bg: brand.warmBrown,
      text: "#fff",
      featured: false,
    },
  ];

  const streams = [
    { icon: "💳", label: "Subscriptions", detail: "$9–$19/month per user" },
    { icon: "🤝", label: "Vendor Commissions", detail: "10–15% on bookings (Phase 2)" },
    { icon: "📍", label: "Local Partnerships", detail: "Party City, Michael's co-marketing" },
  ];

  return (
    <div
      className="h-full w-full flex flex-col justify-center px-12 py-10"
      style={{ background: brand.cream }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xs uppercase tracking-widest font-semibold"
          style={{ color: brand.coral }}
        >
          Business Model
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mt-3 mb-8"
          style={{ fontFamily: "Fraunces, Georgia, serif", color: brand.warmBrown }}
        >
          Free to plan. Pro to scale.
        </motion.h2>

        <div className="grid grid-cols-3 gap-5 mb-6">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12 }}
              className="rounded-2xl p-5 relative"
              style={{ background: t.bg }}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold bg-white text-[#FF6B4A]">
                  Most Popular
                </div>
              )}
              <div className="font-semibold mb-1" style={{ color: t.text, opacity: 0.8 }}>{t.name}</div>
              <div className="text-3xl font-bold mb-3" style={{ color: t.text, fontFamily: "DM Mono, monospace" }}>
                {t.price}<span className="text-base font-normal" style={{ opacity: 0.6 }}>{t.period}</span>
              </div>
              <ul className="space-y-1.5">
                {t.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: t.text, opacity: 0.85 }}>
                    <span style={{ color: t.featured ? brand.amber : brand.coral }}>•</span> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {streams.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: "rgba(255,107,74,0.06)", border: `1px solid ${brand.border}` }}
            >
              <span className="text-xl">{s.icon}</span>
              <div>
                <div className="text-sm font-semibold" style={{ color: brand.warmBrown }}>{s.label}</div>
                <div className="text-xs" style={{ color: brand.medBrown }}>{s.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-4 text-xs"
          style={{ color: brand.medBrown }}
        >
          90-day target: 200 Pro subscribers = <span style={{ color: brand.coral, fontWeight: 700 }}>$1,800 MRR</span>
        </motion.p>
      </div>
    </div>
  );
}

function Slide6Vision() {
  const live = [
    "17-page full product at partypopai.ashketing.com",
    "AI-powered party plan generator",
    "Auth, dashboard, party management",
    "Quiz lead funnel",
    "Health endpoint, shared Postgres, 256MB deploy",
  ];

  const next = [
    "Vendor directory with real local data",
    "Mobile app (React Native, 90 days)",
    "White-label for event planning businesses",
  ];

  return (
    <div
      className="h-full w-full flex flex-col justify-center px-12 py-10"
      style={{ background: `linear-gradient(135deg, ${brand.warmBrown} 0%, #4a1a08 100%)` }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xs uppercase tracking-widest font-semibold"
          style={{ color: brand.amber }}
        >
          Built, live, and growing
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-white mt-3 mb-8"
          style={{ fontFamily: "Fraunces, Georgia, serif" }}
        >
          The Ask + Vision
        </motion.h2>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* What's live */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-400 text-lg">●</span>
              <h3 className="font-semibold text-white text-sm uppercase tracking-wide">What&apos;s Live Today</h3>
            </div>
            <ul className="space-y-2">
              {live.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                  <span className="text-green-400 mt-0.5 shrink-0">✅</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* What's next */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl p-6"
            style={{ background: `${brand.amber}18`, border: `1px solid ${brand.amber}30` }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span style={{ color: brand.amber }} className="text-lg">→</span>
              <h3 className="font-semibold text-white text-sm uppercase tracking-wide">What&apos;s Next</h3>
            </div>
            <ul className="space-y-2">
              {next.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                  <span style={{ color: brand.amber }} className="mt-0.5 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,179,71,0.2)" }}>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                Partypop becomes the <span style={{ color: brand.amber, fontWeight: 600 }}>operating system for family celebrations</span> — every birthday, holiday, graduation, and milestone. Parents trust it like they trust Notion for work.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <a
            href="https://partypopai.ashketing.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${brand.coral}, ${brand.amber})` }}
          >
            🎉 partypopai.ashketing.com
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Slide registry ───────────────────────────────────────────────────────────
const SLIDES = [
  { id: "title", component: <Slide1Title />, label: "Title" },
  { id: "problem", component: <Slide2Problem />, label: "Problem" },
  { id: "solution", component: <Slide3Solution />, label: "Solution" },
  { id: "market", component: <Slide4Market />, label: "Market" },
  { id: "business", component: <Slide5Business />, label: "Business Model" },
  { id: "vision", component: <Slide6Vision />, label: "Vision" },
];

// ─── Main pitch deck ─────────────────────────────────────────────────────────
export default function PitchPage() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(SLIDES.length - 1, c + 1)), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ background: "#1a0f08" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Link
          href="/"
          className="font-bold text-lg hover:opacity-80 transition-opacity"
          style={{ fontFamily: "Fraunces, Georgia, serif", color: "white" }}
        >
          Party<span style={{ color: brand.coral }}>pop</span>
        </Link>
        <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "DM Mono, monospace" }}>
          {SLIDES[current].label}
        </div>
        <div className="text-sm" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "DM Mono, monospace" }}>
          {current + 1} / {SLIDES.length}
        </div>
      </div>

      {/* Slide area */}
      <div className="flex-1 relative min-h-0 mx-4 my-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 rounded-2xl overflow-hidden"
          >
            {SLIDES[current].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="flex items-center justify-center gap-4 py-4 shrink-0">
        <button
          onClick={prev}
          disabled={current === 0}
          className="p-2.5 rounded-full border transition-all"
          style={{
            borderColor: "rgba(255,255,255,0.2)",
            color: "white",
            opacity: current === 0 ? 0.25 : 0.7,
            cursor: current === 0 ? "not-allowed" : "pointer",
          }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              title={s.label}
              className="transition-all"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === current ? brand.coral : "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === SLIDES.length - 1}
          className="p-2.5 rounded-full border transition-all"
          style={{
            borderColor: "rgba(255,255,255,0.2)",
            color: "white",
            opacity: current === SLIDES.length - 1 ? 0.25 : 0.7,
            cursor: current === SLIDES.length - 1 ? "not-allowed" : "pointer",
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
