"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ background: "var(--background)" }}>
      <section className="py-16 text-center" style={{ background: "var(--surface-warm)" }}>
        <h1 className="font-display font-bold text-5xl mb-4" style={{ color: "var(--text-primary)" }}>We'd love to hear from you.</h1>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>Questions, feedback, party emergencies — we read everything.</p>
      </section>

      <section className="py-20">
        <div className="max-w-xl mx-auto px-6">
          {sent ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Message sent!</h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-5">
              <div>
                <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--text-secondary)" }}>Name</label>
                <input type="text" required placeholder="Your name" className="w-full px-4 py-3 rounded-md border outline-none text-base"
                  style={{ borderColor: "var(--border)", background: "white" }}
                  onFocus={e => e.target.style.borderColor = "var(--accent)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"} />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--text-secondary)" }}>Email</label>
                <input type="email" required placeholder="you@example.com" className="w-full px-4 py-3 rounded-md border outline-none text-base"
                  style={{ borderColor: "var(--border)", background: "white" }}
                  onFocus={e => e.target.style.borderColor = "var(--accent)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"} />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--text-secondary)" }}>Subject</label>
                <select className="w-full px-4 py-3 rounded-md border outline-none text-base" style={{ borderColor: "var(--border)", background: "white" }}>
                  {["General Question", "Vendor Partnership", "Bug Report", "Feature Request", "Other"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--text-secondary)" }}>Message</label>
                <textarea required rows={5} placeholder="Tell us how we can help..." className="w-full px-4 py-3 rounded-md border outline-none text-base resize-none"
                  style={{ borderColor: "var(--border)", background: "white" }}
                  onFocus={e => e.target.style.borderColor = "var(--accent)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"} />
              </div>
              <button type="submit" className="py-3 rounded-md text-sm font-semibold text-white" style={{ background: "var(--accent)" }}>Send Message</button>
              <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>We respond within 24 hours. Usually much faster. Email: hello@partypopai.com</p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
