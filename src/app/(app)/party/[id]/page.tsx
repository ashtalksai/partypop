import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { PartyPlanClient } from "./party-plan-client";

export default async function PartyPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  const userId = session.user.id;
  const { id } = await params;

  const party = await prisma.party.findFirst({
    where: { id, userId },
    include: { plan: true, guests: true },
  });

  if (!party) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PartyPlanClient party={{ ...party, date: party.date?.toISOString() ?? null } as any} />;
}
