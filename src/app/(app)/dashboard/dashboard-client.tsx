"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Plus, Calendar, Users, ChevronRight } from "lucide-react";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { differenceInDays } from "@/lib/date-utils";

interface Task { completed: boolean }
interface Phase { tasks: Task[] }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Plan = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Guest = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Party = any

function calcProgress(plan: Plan | null | undefined): number {
  if (!plan) return 0;
  const phases = plan.checklist as Phase[];
  if (!phases?.length) return 0;
  const all = phases.flatMap(p => p.tasks);
  if (!all.length) return 0;
  return Math.round((all.filter(t => t.completed).length / all.length) * 100);
}

export function DashboardClient({ parties, userName }: { parties: Party[]; userName: string }) {
  return (
    <div className="p-8 max-w-[960px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Your Parties
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Hey {userName} 👋</p>
        </div>
        <Link
          href="/onboarding"
          className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-white transition-all hover:scale-[1.01]"
          style={{ background: "var(--accent)", boxShadow: "0 4px 12px rgba(255,107,74,0.24)" }}
        >
          <Plus size={16} />
          Plan New Party
        </Link>
      </motion.div>

      {/* Empty state */}
      {parties.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-24 text-center">
          <Image src="/images/hero-illustration.png" alt="Plan your first party" width={240} height={160} className="rounded-xl mb-6 opacity-80" />
          <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Your first party is waiting</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>Answer 10 questions and get a complete plan in 2 minutes.</p>
          <Link href="/onboarding"
            className="px-6 py-3 rounded-md text-sm font-semibold text-white"
            style={{ background: "var(--accent)", boxShadow: "0 4px 12px rgba(255,107,74,0.32)" }}>
            Plan My First Party Free
          </Link>
        </motion.div>
      )}

      {/* Party cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {parties.map((party, i) => {
          const progress = calcProgress(party.plan);
          const daysUntil = party.date ? differenceInDays(new Date(party.date), new Date()) : null;
          const confirmed = party.guests.filter((g: { rsvpStatus: string }) => g.rsvpStatus === "confirmed").length;

          return (
            <motion.div
              key={party.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ boxShadow: "0 4px 16px rgba(255,107,74,0.12), 0 8px 32px rgba(45,27,14,0.08)", y: -2 }}
              className="rounded-lg border p-6 transition-all"
              style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "0 1px 3px rgba(45,27,14,0.06)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display text-lg font-bold" style={{ color: "var(--text-primary)" }}>{party.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mt-1"
                    style={{ background: "var(--accent-amber-light)", color: "#92400E" }}>
                    🎉 {party.theme}
                  </span>
                </div>
                <ProgressRing progress={progress} />
              </div>

              <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
                {party.date && (
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {daysUntil !== null && daysUntil >= 0 ? `${daysUntil} days away` : "Party passed"}
                  </span>
                )}
                {party.guests.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {confirmed}/{party.guests.length} confirmed
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/party/${party.id}`}
                  className="flex-1 text-center py-2 rounded-md text-xs font-semibold text-white"
                  style={{ background: "var(--accent)" }}>
                  View Plan
                </Link>
                <Link href={`/party/${party.id}/guests`}
                  className="px-3 py-2 rounded-md text-xs font-medium border transition-colors hover:bg-gray-50"
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                  Guests
                </Link>
                <ChevronRight size={16} style={{ color: "var(--text-muted)" }} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
