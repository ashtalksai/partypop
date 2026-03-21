"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: "title",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="text-5xl mb-6">🎉</div>
        <h1 className="font-display text-6xl font-bold text-white mb-4">Partypop</h1>
        <p className="text-xl text-white/80">Your kid's party, planned in 2 minutes.</p>
        <p className="text-sm text-white/50 mt-6">AI Party Planner for Busy Parents</p>
      </div>
    ),
    bg: "linear-gradient(135deg, #FF6B4A 0%, #FFB347 100%)",
  },
  {
    id: "problem",
    content: (
      <div className="flex flex-col justify-center h-full">
        <h2 className="font-display text-5xl font-bold text-white mb-8">The Problem</h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: "📋", title: "Fragmented tools", body: "Spreadsheet + notes + DMs + group chat for one party" },
            { icon: "📞", title: "Vendor chaos", body: "4.5 stars means nothing when they ghost you at 10pm" },
            { icon: "😰", title: "Day-of disaster", body: "Still improvising 15 minutes before guests arrive" },
          ].map(p => (
            <div key={p.title} className="bg-white/10 backdrop-blur rounded-xl p-5">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-white/70">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    bg: "#2D1B0E",
  },
  {
    id: "solution",
    content: (
      <div className="flex flex-col justify-center h-full">
        <h2 className="font-display text-5xl font-bold mb-6" style={{ color: "#2D1B0E" }}>The Solution</h2>
        <p className="text-xl mb-8" style={{ color: "#6B4336" }}>10 questions → complete party plan. In 2 minutes.</p>
        <div className="grid grid-cols-2 gap-4">
          {["AI-generated checklist by timeline", "Shopping list + budget tracker", "Local vendor recommendations", "Day-of minute-by-minute timeline"].map(f => (
            <div key={f} className="flex items-center gap-3 rounded-lg p-4" style={{ background: "rgba(255,107,74,0.08)" }}>
              <span style={{ color: "#FF6B4A" }}>✓</span>
              <span className="text-base font-medium" style={{ color: "#2D1B0E" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    bg: "#FFF8F4",
  },
  {
    id: "market",
    content: (
      <div className="flex flex-col justify-center h-full">
        <h2 className="font-display text-5xl font-bold text-white mb-8">Market Opportunity</h2>
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { value: "$20B", label: "Kids' party market (US)" },
            { value: "4.3M", label: "Birthday parties/month in US" },
            { value: "$450", label: "Average spend per party" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "DM Mono, monospace" }}>{s.value}</div>
              <div className="text-sm text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="text-white/70 text-base">Target: parents 28–45 with kids 2–12. Primary channel: Pinterest, Instagram, SEO. Viral loop: shareable party plans.</p>
      </div>
    ),
    bg: "linear-gradient(135deg, #FF6B4A 0%, #E85535 100%)",
  },
  {
    id: "traction",
    content: (
      <div className="flex flex-col justify-center h-full">
        <h2 className="font-display text-5xl font-bold mb-8" style={{ color: "#2D1B0E" }}>Business Model</h2>
        <div className="grid grid-cols-3 gap-5">
          {[
            { plan: "Free", price: "$0", color: "#F0D9CC", text: "#2D1B0E" },
            { plan: "Party Pro", price: "$9/mo", color: "#FF6B4A", text: "white", badge: "Most Popular" },
            { plan: "Family", price: "$19/mo", color: "#2D1B0E", text: "white" },
          ].map(p => (
            <div key={p.plan} className="rounded-xl p-5 relative" style={{ background: p.color }}>
              {p.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold bg-white text-[#FF6B4A]">{p.badge}</div>}
              <div className="font-semibold mb-1" style={{ color: p.text }}>{p.plan}</div>
              <div className="text-3xl font-bold" style={{ color: p.text, fontFamily: "DM Mono, monospace" }}>{p.price}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm" style={{ color: "#6B4336" }}>Revenue path: Subscription SaaS + 3% vendor booking commission. Path to $100K ARR: 1,000 Pro subscribers.</p>
      </div>
    ),
    bg: "#FFF8F4",
  },
  {
    id: "team",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="font-display text-5xl font-bold text-white mb-6">Built by ChimeStream</h2>
        <p className="text-xl text-white/80 mb-8 max-w-lg">A small team obsessed with building tools that make real life less complicated.</p>
        <div className="mt-6">
          <div className="text-white/50 text-sm mb-4">Get early access</div>
          <div className="text-2xl font-bold text-white">partypopai.ashketing.com</div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #2D1B0E 0%, #FF6B4A 100%)",
  },
];

export default function DeckPage() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="flex flex-col" style={{ background: "#1a0f08", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-bold text-white">
          Party<span style={{ color: "#FF6B4A" }}>pop</span>
        </Link>
        <div className="text-sm text-white/40">{current + 1} / {slides.length}</div>
      </div>

      {/* Slide */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 mx-8 my-4 rounded-2xl p-12"
            style={{ background: slides[current].bg }}
          >
            {slides[current].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 py-4">
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
          className="p-2.5 rounded-full border border-white/20 disabled:opacity-30 text-white/70 hover:text-white transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{ background: i === current ? "#FF6B4A" : "rgba(255,255,255,0.3)" }} />
          ))}
        </div>
        <button onClick={() => setCurrent(c => Math.min(slides.length - 1, c + 1))} disabled={current === slides.length - 1}
          className="p-2.5 rounded-full border border-white/20 disabled:opacity-30 text-white/70 hover:text-white transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
