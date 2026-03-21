import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function SettingsPage() {
  const session = await auth();
  return (
    <div className="p-8 max-w-[600px]">
      <h1 className="font-display text-3xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>Account Settings</h1>
      <div className="rounded-lg border p-6 mb-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <h2 className="font-semibold text-base mb-4" style={{ color: "var(--text-primary)" }}>Profile</h2>
        <div className="flex flex-col gap-3">
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
            <span className="font-medium">Name:</span> {session?.user?.name || "—"}
          </div>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
            <span className="font-medium">Email:</span> {session?.user?.email || "—"}
          </div>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
            <span className="font-medium">Plan:</span> Free
          </div>
        </div>
      </div>
      <div className="rounded-lg border p-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <h2 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>Upgrade Your Plan</h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>Get vendor recommendations, shareable plans, and day-of timelines with Party Pro.</p>
        <Link href="/pricing" className="px-5 py-2.5 rounded-md text-sm font-semibold text-white inline-flex"
          style={{ background: "var(--accent)" }}>Upgrade to Party Pro →</Link>
      </div>
    </div>
  );
}
