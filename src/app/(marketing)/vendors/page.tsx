import Link from "next/link";

const categories = [
  { icon: "🎪", name: "Entertainment", desc: "Bounce houses, magicians, face painters, DJs" },
  { icon: "🎂", name: "Cakes & Bakery", desc: "Custom cakes, cupcakes, dessert tables" },
  { icon: "📸", name: "Photography & Video", desc: "Party photographers and videographers" },
  { icon: "🍕", name: "Catering & Food", desc: "Full catering, food trucks, snack stations" },
  { icon: "🎈", name: "Decorations & Rentals", desc: "Balloon artists, tablescaping, tent rentals" },
  { icon: "🎮", name: "Activities & Games", desc: "Game rentals, craft stations, activity hosts" },
  { icon: "🎁", name: "Party Favors", desc: "Custom favors, goody bags, personalized gifts" },
];

export default function VendorsPage() {
  return (
    <div style={{ background: "var(--background)" }}>
      <section className="py-16 text-center" style={{ background: "var(--surface-warm)" }}>
        <h1 className="font-display font-bold text-5xl mb-4" style={{ color: "var(--text-primary)" }}>Find local party vendors you can actually count on.</h1>
        <p className="text-lg max-w-xl mx-auto px-6" style={{ color: "var(--text-secondary)" }}>Browse by category. See who's been booked for parties like yours.</p>
      </section>

      <section className="py-20">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map(c => (
              <div key={c.name} className="rounded-lg border p-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-display text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>{c.name}</h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>{c.desc}</p>
                <div className="p-3 rounded-md text-sm" style={{ background: "var(--surface-warm)" }}>
                  <p className="font-medium mb-1" style={{ color: "var(--text-secondary)" }}>🔒 Vendor contact info</p>
                  <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>Available on Party Pro and Family plans</p>
                  <Link href="/pricing" className="text-xs font-semibold hover:underline" style={{ color: "var(--accent)" }}>Unlock with Party Pro →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
