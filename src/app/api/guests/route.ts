import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { partyId, name, email, rsvpStatus, dietary, notes } = await req.json();

  // Verify party belongs to user
  const party = await prisma.party.findFirst({ where: { id: partyId, userId: session.user.id } });
  if (!party) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const guest = await prisma.guest.create({ data: { partyId, name, email, rsvpStatus: rsvpStatus || "invited", dietary, notes } });
  return NextResponse.json(guest);
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { guestId, rsvpStatus, dietary, notes } = await req.json();

  const guest = await prisma.guest.update({ where: { id: guestId }, data: { rsvpStatus, dietary, notes } });
  return NextResponse.json(guest);
}
