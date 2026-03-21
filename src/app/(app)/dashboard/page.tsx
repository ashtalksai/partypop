import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const session = await auth();
  const parties = await prisma.party.findMany({
    where: { userId: session!.user!.id! },
    include: { plan: true, guests: true },
    orderBy: { createdAt: "desc" },
  });

  const serialized = parties.map(p => ({
    ...p,
    date: p.date?.toISOString() ?? null,
  }));
  return <DashboardClient parties={serialized} userName={session!.user?.name || "there"} />;
}
