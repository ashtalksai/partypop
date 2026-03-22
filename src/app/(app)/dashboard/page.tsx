import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  const userId = session.user.id;
  const parties = await prisma.party.findMany({
    where: { userId },
    include: { plan: true, guests: true },
    orderBy: { createdAt: "desc" },
  });

  const serialized = parties.map(p => ({
    ...p,
    date: p.date?.toISOString() ?? null,
  }));
  return <DashboardClient parties={serialized} userName={session.user?.name || "there"} />;
}
