import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ background: "var(--background)" }}>
      {/* Hero */}
      <section className="py-24 text-center" style={{ background: "var(--surface-warm)" }}>
        <div className="max-w-prose mx-auto px-6">
          <h1 className="font-display font-bold text-5xl mb-6" style={{ color: "var(--text-primary)" }}>
            We planned enough parties to know something was broken.
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Partypop exists because party planning is a ridiculous amount of work for something that should be joyful. Three notes apps, six browser tabs, vendor calls during lunch breaks, and still something gets forgotten on the day.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display font-bold text-4xl mb-5" style={{ color: "var(--text-primary)" }}>Our Mission</h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
              Partypop makes party planning fast, organized, and actually enjoyable. Every parent deserves to show up to their kid's party as a host — not a project manager.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              We built the tool we wish existed. One that gives you a complete operational plan — checklist, shopping list, guests, vendors, timeline — so you have nothing left to figure out.
            </p>
          </div>
          <div>
            <Image src="/images/about-visual.png" alt="About Partypop" width={560} height={400}
              className="rounded-xl w-full h-auto" style={{ boxShadow: "0 8px 32px rgba(45,27,14,0.08)" }} />
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20" style={{ background: "var(--surface-warm)" }}>
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display font-bold text-4xl mb-12 text-center" style={{ color: "var(--text-primary)" }}>
            What makes us different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "✅", title: "Full plan, not just inspiration", body: "Checklist, shopping list, vendors, and timeline in one tool. After using us, you have nothing left to figure out." },
              { icon: "📍", title: "Local vendor data", body: "Recommendations based on real booking outcomes, not just review scores. Find vendors who actually show up." },
              { icon: "💡", title: "Built for the actual planner", body: "Warm, clear, no learning curve. If you can fill out a form, you can use Partypop." },
            ].map(d => (
              <div key={d.title} className="rounded-lg p-6 border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="text-3xl mb-4">{d.icon}</div>
                <h3 className="font-display text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{d.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 text-center">
        <div className="max-w-prose mx-auto px-6">
          <h2 className="font-display font-bold text-3xl mb-4" style={{ color: "var(--text-primary)" }}>Built by ChimeStream</h2>
          <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
            A small team obsessed with building tools that make real life less complicated. Based in the Netherlands, building for parents everywhere.
          </p>
          <Link href="/signup"
            className="inline-flex px-8 py-4 rounded-md text-base font-semibold text-white transition-all hover:scale-[1.02]"
            style={{ background: "var(--accent)", boxShadow: "0 4px 12px rgba(255,107,74,0.32)" }}>
            Ready to plan your next party? Start Free →
          </Link>
        </div>
      </section>
    </div>
  );
}
