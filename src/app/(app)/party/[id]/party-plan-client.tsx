"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Users, Lock, Share2, ShoppingCart, Clock, CheckSquare } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { differenceInDays } from "@/lib/date-utils";

interface Task { id: string; text: string; completed: boolean; notes?: string }
interface Phase { phase: string; tasks: Task[] }
interface ShoppingItem { id: string; name: string; cost: number; completed: boolean }
interface ShoppingCategory { category: string; items: ShoppingItem[] }
interface TimelineItem { time: string; activity: string }
interface Guest { id: string; name: string; email?: string; rsvpStatus: string; dietary?: string; notes?: string }
interface PartyPlan { checklist: Phase[]; shoppingList: ShoppingCategory[]; timeline: TimelineItem[]; aiOverview: string }
interface Party { id: string; name: string; childName: string; theme: string; date?: string | null; budget: number; plan?: PartyPlan | null; guests: Guest[] }

const TABS = [
  { id: "plan", label: "Plan", icon: CheckSquare },
  { id: "shopping", label: "Shopping", icon: ShoppingCart },
  { id: "vendors", label: "Vendors", icon: Users, gated: true },
  { id: "timeline", label: "Timeline", icon: Clock, gated: true },
  { id: "guests", label: "Guests", icon: Users },
  { id: "share", label: "Share", icon: Share2, gated: true },
];

export function PartyPlanClient({ party }: { party: Party }) {
  const [tab, setTab] = useState("plan");
  const [checklist, setChecklist] = useState<Phase[]>((party.plan?.checklist as Phase[]) || []);
  const [shoppingList, setShoppingList] = useState<ShoppingCategory[]>((party.plan?.shoppingList as ShoppingCategory[]) || []);
  const [guests, setGuests] = useState<Guest[]>(party.guests || []);
  const [confettiFired, setConfettiFired] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", email: "", rsvpStatus: "invited" });

  const totalTasks = checklist.flatMap(p => p.tasks).length;
  const completedTasks = checklist.flatMap(p => p.tasks).filter(t => t.completed).length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const daysUntil = party.date ? differenceInDays(new Date(party.date), new Date()) : null;

  const totalBudget = shoppingList.flatMap(c => c.items).reduce((sum, i) => sum + i.cost, 0);
  const spentBudget = shoppingList.flatMap(c => c.items).filter(i => i.completed).reduce((sum, i) => sum + i.cost, 0);

  const fireConfetti = useCallback(() => {
    if (confettiFired) return;
    setConfettiFired(true);
    setAllDone(true);
    confetti({ particleCount: 150, spread: 360, colors: ["#FF6B4A", "#FFB347", "#FFFFFF", "#2D1B0E"], origin: { x: 0.5, y: 0.5 } });
    setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#FF6B4A", "#FFB347"] }), 300);
    setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#FF6B4A", "#FFB347"] }), 600);
  }, [confettiFired]);

  const toggleTask = async (phaseIdx: number, taskIdx: number) => {
    const updated = checklist.map((p, pi) => ({
      ...p,
      tasks: p.tasks.map((t, ti) =>
        pi === phaseIdx && ti === taskIdx ? { ...t, completed: !t.completed } : t
      ),
    }));
    setChecklist(updated);

    const allComplete = updated.flatMap(p => p.tasks).every(t => t.completed);
    if (allComplete && !confettiFired) fireConfetti();

    await fetch(`/api/parties/${party.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checklist: updated }),
    });
  };

  const toggleShoppingItem = (catIdx: number, itemIdx: number) => {
    setShoppingList(list => list.map((c, ci) => ({
      ...c,
      items: c.items.map((item, ii) =>
        ci === catIdx && ii === itemIdx ? { ...item, completed: !item.completed } : item
      ),
    })));
  };

  const addGuest = async () => {
    if (!newGuest.name) return;
    try {
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partyId: party.id, ...newGuest }),
      });
      const g = await res.json();
      setGuests(gs => [...gs, g]);
      setNewGuest({ name: "", email: "", rsvpStatus: "invited" });
    } catch {}
  };

  const updateGuestRSVP = async (guestId: string, rsvpStatus: string) => {
    setGuests(gs => gs.map(g => g.id === guestId ? { ...g, rsvpStatus } : g));
    await fetch("/api/guests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guestId, rsvpStatus }),
    });
  };

  const rsvpBadgeStyle = (status: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      invited: { bg: "rgba(160,112,96,0.1)", color: "var(--text-muted)" },
      confirmed: { bg: "rgba(22,163,74,0.1)", color: "var(--success)" },
      declined: { bg: "rgba(220,38,38,0.1)", color: "var(--destructive)" },
      waitlist: { bg: "rgba(245,158,11,0.1)", color: "var(--warning)" },
    };
    return map[status] || map.invited;
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div className="border-b px-6 py-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="max-w-[960px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/dashboard" className="p-1.5 rounded-md transition-colors hover:bg-gray-100">
              <ArrowLeft size={18} style={{ color: "var(--text-muted)" }} />
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{party.name}</h1>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "var(--accent-amber-light)", color: "#92400E" }}>
                  🎉 {party.theme}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                {party.date && <span className="flex items-center gap-1"><Calendar size={12} />{daysUntil !== null ? `${daysUntil} days away` : ""}</span>}
                <span className="flex items-center gap-1"><Users size={12} />{guests.length} guests</span>
              </div>
            </div>
            <ProgressRing progress={progress} size={52} />
          </div>

          {/* Tab bar */}
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => !t.gated && setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${t.gated ? "opacity-50 cursor-not-allowed" : ""}`}
                style={{
                  borderColor: tab === t.id ? "var(--accent)" : "transparent",
                  color: tab === t.id ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                {t.label}
                {t.gated && <Lock size={12} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[960px] mx-auto p-6">
        {/* All done celebration */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl p-5 mb-6 border-2 text-center"
              style={{ background: "rgba(255,107,74,0.06)", borderColor: "var(--accent)" }}
            >
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="font-display text-xl font-bold mb-1" style={{ color: "var(--accent)" }}>You're ready to party!</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Every task is complete. Go have an amazing party!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PLAN TAB */}
        {tab === "plan" && (
          <div className="flex flex-col gap-6">
            {/* AI Overview */}
            <div className="rounded-lg p-5 border" style={{ background: "var(--accent-amber-light)", borderColor: "rgba(255,179,71,0.3)" }}>
              <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#92400E" }}>AI Party Overview</div>
              <p className="text-sm italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {party.plan?.aiOverview}
              </p>
            </div>

            {/* Checklist phases */}
            <div>
              <h2 className="font-display text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                Your Checklist ({completedTasks}/{totalTasks} tasks)
              </h2>
              <div className="flex flex-col gap-4">
                {checklist.map((phase, pi) => {
                  const phaseComplete = phase.tasks.every(t => t.completed);
                  return (
                    <motion.div
                      key={phase.phase}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: pi * 0.05 }}
                      className="rounded-lg border overflow-hidden"
                      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                    >
                      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "var(--border)", background: phaseComplete ? "rgba(22,163,74,0.05)" : "var(--surface-warm)" }}>
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: phaseComplete ? "var(--success)" : "var(--text-muted)" }}>
                          {phase.phase}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: phaseComplete ? "rgba(22,163,74,0.1)" : "var(--border)", color: phaseComplete ? "var(--success)" : "var(--text-muted)" }}>
                          {phase.tasks.filter(t => t.completed).length}/{phase.tasks.length}
                        </span>
                      </div>
                      <div className="px-5 py-3 flex flex-col gap-3">
                        {phase.tasks.map((task, ti) => (
                          <div key={task.id} className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleTask(pi, ti)}
                              className="party-checkbox"
                            />
                            <span
                              className="text-sm flex-1 transition-all"
                              style={{ color: task.completed ? "var(--text-muted)" : "var(--text-primary)", textDecoration: task.completed ? "line-through" : "none" }}
                            >
                              {task.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* SHOPPING TAB */}
        {tab === "shopping" && (
          <div>
            {/* Budget tracker */}
            <div className="rounded-lg p-5 border mb-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-lg font-bold" style={{ color: "var(--text-primary)" }}>Budget Tracker</h3>
                <span className="text-sm font-semibold" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                  ${spentBudget} / ${party.budget}
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min((spentBudget / party.budget) * 100, 100)}%`,
                    background: spentBudget > party.budget * 0.8 ? "#F59E0B" : spentBudget > party.budget ? "#DC2626" : "var(--accent)",
                  }}
                />
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>Estimated total: ${totalBudget}</p>
            </div>

            <div className="flex flex-col gap-6">
              {shoppingList.map((cat, ci) => (
                <div key={cat.category}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>{cat.category}</h3>
                  <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                    {cat.items.map((item, ii) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 px-5 py-3 border-b last:border-0"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <input type="checkbox" checked={item.completed} onChange={() => toggleShoppingItem(ci, ii)} className="party-checkbox" />
                        <span className="flex-1 text-sm" style={{ color: item.completed ? "var(--text-muted)" : "var(--text-primary)", textDecoration: item.completed ? "line-through" : "none" }}>
                          {item.name}
                        </span>
                        <span className="text-sm font-medium" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>${item.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GUESTS TAB */}
        {tab === "guests" && (
          <div>
            {/* Summary */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total", value: guests.length, color: "var(--text-primary)" },
                { label: "Confirmed", value: guests.filter(g => g.rsvpStatus === "confirmed").length, color: "var(--success)" },
                { label: "Pending", value: guests.filter(g => g.rsvpStatus === "invited").length, color: "var(--warning)" },
                { label: "Declined", value: guests.filter(g => g.rsvpStatus === "declined").length, color: "var(--destructive)" },
              ].map(s => (
                <div key={s.label} className="rounded-lg p-4 border text-center" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="text-2xl font-bold mb-1" style={{ color: s.color, fontFamily: "var(--font-mono)" }}>{s.value}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Add guest */}
            <div className="rounded-lg border p-5 mb-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <h3 className="font-display text-base font-bold mb-4" style={{ color: "var(--text-primary)" }}>Add Guest</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="text" placeholder="Name *" value={newGuest.name} onChange={e => setNewGuest(g => ({ ...g, name: e.target.value }))}
                  className="px-4 py-2.5 rounded-md border text-sm outline-none" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }} />
                <input type="email" placeholder="Email (optional)" value={newGuest.email} onChange={e => setNewGuest(g => ({ ...g, email: e.target.value }))}
                  className="px-4 py-2.5 rounded-md border text-sm outline-none" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }} />
                <select value={newGuest.rsvpStatus} onChange={e => setNewGuest(g => ({ ...g, rsvpStatus: e.target.value }))}
                  className="px-4 py-2.5 rounded-md border text-sm outline-none" style={{ borderColor: "var(--border)", color: "var(--text-primary)", background: "white" }}>
                  <option value="invited">Invited</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="declined">Declined</option>
                  <option value="waitlist">Waitlist</option>
                </select>
              </div>
              <button onClick={addGuest} disabled={!newGuest.name}
                className="mt-3 px-5 py-2 rounded-md text-sm font-semibold text-white disabled:opacity-50"
                style={{ background: "var(--accent)" }}>
                Add Guest
              </button>
            </div>

            {/* Guest list */}
            {guests.length > 0 && (
              <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <div className="grid grid-cols-12 gap-3 px-5 py-3 text-xs font-semibold uppercase tracking-wide border-b"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "var(--surface-warm)" }}>
                  <span className="col-span-4">Name</span>
                  <span className="col-span-4">Email</span>
                  <span className="col-span-4">RSVP</span>
                </div>
                {guests.map(g => (
                  <div key={g.id} className="grid grid-cols-12 gap-3 px-5 py-3 border-b last:border-0 items-center" style={{ borderColor: "var(--border)" }}>
                    <span className="col-span-4 text-sm font-medium" style={{ color: "var(--text-primary)" }}>{g.name}</span>
                    <span className="col-span-4 text-sm" style={{ color: "var(--text-muted)" }}>{g.email || "—"}</span>
                    <div className="col-span-4">
                      <select
                        value={g.rsvpStatus}
                        onChange={e => updateGuestRSVP(g.id, e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-full text-xs font-medium border-0 outline-none"
                        style={{ ...rsvpBadgeStyle(g.rsvpStatus), cursor: "pointer" }}
                      >
                        <option value="invited">Invited</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="declined">Declined</option>
                        <option value="waitlist">Waitlist</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* GATED TABS */}
        {(tab === "vendors" || tab === "timeline" || tab === "share") && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: "var(--accent-amber-light)" }}>
              <Lock size={24} style={{ color: "var(--accent)" }} />
            </div>
            <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              Unlock {tab === "vendors" ? "Vendor Recommendations" : tab === "timeline" ? "Day-of Timeline" : "Sharing"}
            </h3>
            <p className="text-sm mb-6 max-w-sm" style={{ color: "var(--text-secondary)" }}>
              {tab === "vendors" && "Get 3 local vendor options per category, ranked by actual booking data."}
              {tab === "timeline" && "Get a minute-by-minute day-of schedule so you can relax and enjoy the party."}
              {tab === "share" && "Share a read-only link with your partner or co-planner. No account required."}
            </p>
            <Link href="/pricing"
              className="px-6 py-3 rounded-md text-sm font-semibold text-white"
              style={{ background: "var(--accent)", boxShadow: "0 4px 12px rgba(255,107,74,0.32)" }}>
              Upgrade to Party Pro →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
