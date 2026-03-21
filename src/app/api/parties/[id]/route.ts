import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const party = await prisma.party.findFirst({
    where: { id, userId: session.user.id },
    include: { plan: true, guests: true },
  });
  if (!party) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(party);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();

  // Update checklist in plan
  if (body.checklist !== undefined) {
    await prisma.partyPlan.update({
      where: { partyId: id },
      data: { checklist: body.checklist },
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
