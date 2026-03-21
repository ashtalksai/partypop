"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart2, Rocket, Megaphone, Palette, Presentation, ArrowLeft, Menu } from "lucide-react";

const sections = [
  { id: "research", icon: BarChart2, label: "Research", desc: "Market research, IdeaBrowser analysis, competitor landscape" },
  { id: "gtm", icon: Rocket, label: "GTM", desc: "Go-to-market strategy, channel selection, launch plan" },
  { id: "marketing", icon: Megaphone, label: "Marketing", desc: "Content calendar, copy, campaign briefs" },
  { id: "brand", icon: Palette, label: "Brand", desc: "Brand spec, color palette, typography, component guide" },
  { id: "pitch", icon: Presentation, label: "Pitch", desc: "Investor pitch deck, key metrics, narrative" },
];

const docs: Record<string, { title: string; summary: string; url: string; updated: string; external?: boolean }[]> = {
  research: [
    {
      title: "Research Brief — Partypop",
      summary: "IdeaBrowser analysis, market opportunity ($13.2B), competitor landscape (PartyPilotAI, Pinterest, Evite), validation signals from Reddit + Facebook + YouTube, and GO/SKIP recommendation.",
      url: "https://docs.google.com/document/d/1Ciapkp9sRuCC1Wp1Z9ueK9sYgJV1MxRQ21hb7t2USLk/edit",
      updated: "Mar 21, 2026",
      external: true,
    },
  ],
  gtm: [
    {
      title: "GTM Plan — Partypop",
      summary: "3-phase go-to-market strategy: Phase 1 organic (Reddit, Pinterest, Facebook Groups, TikTok, SEO), Phase 2 paid + partnerships, Phase 3 vendor marketplace. 90-day milestones and channel stack.",
      url: "https://docs.google.com/document/d/1D8Qq2gftOhV1gz6XSZBzMN9P1d9bDLBFQlsz3Hz9amc/edit",
      updated: "Mar 21, 2026",
      external: true,
    },
  ],
  marketing: [
    {
      title: "Marketing Plan — Partypop",
      summary: "Brand voice, content calendar, blog strategy (10 priority posts), email welcome sequence (5-day drip), Pinterest + TikTok + Instagram playbook, KPIs and tracking.",
      url: "https://docs.google.com/document/d/1XHnjdw5K68JYKI5q8TZa4x30dUCyklRjDU51Fkjv80Q/edit",
      updated: "Mar 21, 2026",
      external: true,
    },
  ],
  brand: [
    {
      title: "Brand & Design Spec — Partypop",
      summary: "Complete brand tokens: coral #FF6B4A + amber #FFB347 + cream #FFF8F4. Typography (Fraunces + Plus Jakarta Sans + DM Mono), spacing scale, shadows, component specs, and full UI mockups for every page.",
      url: "https://docs.google.com/document/d/1tXLtaOt0inqPHD36bosb3dkm48OEhiTyKHUqLXco4mE/edit",
      updated: "Mar 21, 2026",
      external: true,
    },
  ],
  pitch: [
    {
      title: "Interactive Pitch Deck — Partypop",
      summary: "6-slide animated pitch deck: Title, Problem, Solution, Market ($13.2B), Business Model (Free / $9 / $19), and Vision. Built with Framer Motion, full-screen navigation, keyboard shortcuts.",
      url: "/pitch",
      updated: "Mar 21, 2026",
      external: false,
    },
    {
      title: "Pitch Deck Content (Google Doc)",
      summary: "Source content for the pitch deck: all 6 slides with headlines, copy, stats, and CTAs. Written by @marketer for the Partypop investor pitch.",
      url: "https://docs.google.com/document/d/1QfH2kZLzzc6981xbLcf2_LlnxyDsJsNUOyXru6d4BBQ/edit",
      updated: "Mar 21, 2026",
      external: true,
    },
  ],
};

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("research");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const current = sections.find(s => s.id === activeSection)!;
  const currentDocs = docs[activeSection] || [];

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-40 w-60 h-screen border-r flex flex-col transition-transform duration-200`}
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="px-5 py-5 border-b" style={{ borderColor: "var(--border)" }}>
          <h3 className="font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>Documentation</h3>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => { setActiveSection(s.id); setSidebarOpen(false); }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all text-left"
              style={{
                background: activeSection === s.id ? "rgba(255,107,74,0.1)" : "transparent",
                color: activeSection === s.id ? "var(--accent)" : "var(--text-secondary)",
              }}
            >
              <s.icon size={16} />
              {s.label}
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t" style={{ borderColor: "var(--border)" }}>
          <Link href="/dashboard" className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-[960px] mx-auto">
          {/* Mobile menu */}
          <button className="md:hidden mb-4 flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}
            onClick={() => setSidebarOpen(true)}>
            <Menu size={16} /> Menu
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-8" style={{ color: "var(--text-muted)" }}>
            <span>Docs</span><span>/</span><span style={{ color: "var(--accent)" }}>{current.label}</span>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{current.label}</h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{current.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentDocs.map(doc => (
              <a
                key={doc.title}
                href={doc.url}
                target={doc.external ? "_blank" : "_self"}
                rel={doc.external ? "noreferrer" : undefined}
                className="rounded-lg border p-5 block hover:shadow-card-hover transition-all group"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <h3 className="font-semibold text-base mb-1" style={{ color: "var(--text-primary)" }}>{doc.title}</h3>
                <p className="text-sm mb-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{doc.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium flex items-center gap-1" style={{ color: "var(--accent)" }}>
                    {doc.external ? "Open in Google Docs →" : "View →"}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>Updated {doc.updated}</span>
                </div>
              </a>
            ))}
            {currentDocs.length === 0 && (
              <div className="col-span-2 text-center py-16 text-sm" style={{ color: "var(--text-muted)" }}>
                Documents for this section will appear here once the marketing stage is complete.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
