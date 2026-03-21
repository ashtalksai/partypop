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

const docs: Record<string, { title: string; summary: string; url: string; updated: string }[]> = {
  research: [
    { title: "Partypop Research — IdeaBrowser", summary: "Market opportunity, competitor analysis, target audience insights for AI party planning", url: "#", updated: "2 days ago" },
    { title: "Competitor Landscape", summary: "PartyPilotAI, Pinterest, Evite, and ChatGPT analysis — positioning gaps", url: "#", updated: "2 days ago" },
  ],
  gtm: [
    { title: "GTM Plan — Partypop", summary: "Phase 1-3 launch strategy, channel priorities, first 90 days", url: "#", updated: "1 day ago" },
  ],
  marketing: [
    { title: "Marketing Plan — Partypop", summary: "Content strategy, SEO keywords, Pinterest/Instagram playbook, email flows", url: "#", updated: "1 day ago" },
  ],
  brand: [
    { title: "Brand & Design Spec — Partypop", summary: "Complete brand tokens, color palette, typography, component specifications", url: "https://docs.google.com/document/d/1tXLtaOt0inqPHD36bosb3dkm48OEhiTyKHUqLXco4mE/edit", updated: "Today" },
    { title: "Product Enrichment — Partypop", summary: "Full product spec, page content briefs, core workflows, data model", url: "https://docs.google.com/document/d/1vt0uCOGHqIxYW1jnfMH8uaDh3pCCk2pIAsqjzJ5lb-k/edit", updated: "Today" },
  ],
  pitch: [
    { title: "Pitch Deck — Partypop", summary: "Investor presentation: problem, solution, market, business model, team", url: "/deck", updated: "Today" },
  ],
};

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("brand");
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
                target={doc.url.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                className="rounded-lg border p-5 block hover:shadow-card-hover transition-all"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <h3 className="font-semibold text-base mb-1" style={{ color: "var(--text-primary)" }}>{doc.title}</h3>
                <p className="text-sm mb-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{doc.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>Open →</span>
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
