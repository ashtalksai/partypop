import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parties = await prisma.party.findMany({
    where: { userId: session.user.id },
    include: { plan: true, guests: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(parties);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, childName, childAge, theme, headcountKids, headcountAdults, budget, date, venueType, zipCode, dietaryNotes } = body;

  const party = await prisma.party.create({
    data: {
      userId: session.user.id,
      name: name || `${childName}'s Party`,
      childName,
      childAge: childAge || 0,
      theme: theme || "General",
      headcountKids: headcountKids || 0,
      headcountAdults: headcountAdults || 0,
      budget: budget || 500,
      date: date ? new Date(date) : null,
      venueType,
      zipCode,
      dietaryNotes,
    },
  });

  // Generate AI plan (seeded for MVP)
  const plan = await prisma.partyPlan.create({
    data: {
      partyId: party.id,
      aiOverview: generateOverview(party),
      checklist: generateChecklist(party),
      shoppingList: generateShoppingList(party),
      timeline: generateTimeline(party),
    },
  });

  return NextResponse.json({ ...party, plan });
}

function generateOverview(party: { theme: string; childName: string; childAge: number; budget: number }) {
  return `A magical ${party.theme} party for ${party.childName}'s ${party.childAge}${getOrdinal(party.childAge)} birthday! With a $${party.budget} budget, you'll create a memorable celebration with a thoughtfully curated checklist, shopping list, and local vendor recommendations. Let's make this the party ${party.childName} talks about for years.`;
}

function getOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function generateChecklist(party: { theme: string }) {
  return [
    {
      phase: "4+ weeks out",
      tasks: [
        { id: "1", text: "Book the venue", completed: false, notes: "" },
        { id: "2", text: `Research ${party.theme} decorations`, completed: false, notes: "" },
        { id: "3", text: "Send digital invitations", completed: false, notes: "" },
        { id: "4", text: "Book key vendors (caterer, entertainment)", completed: false, notes: "" },
      ],
    },
    {
      phase: "2–3 weeks out",
      tasks: [
        { id: "5", text: "Order the birthday cake", completed: false, notes: "" },
        { id: "6", text: "Confirm vendor bookings", completed: false, notes: "" },
        { id: "7", text: `Order ${party.theme} themed decorations`, completed: false, notes: "" },
        { id: "8", text: "Plan party activities and games", completed: false, notes: "" },
      ],
    },
    {
      phase: "1 week out",
      tasks: [
        { id: "9", text: "Finalize headcount with RSVPs", completed: false, notes: "" },
        { id: "10", text: "Confirm dietary needs", completed: false, notes: "" },
        { id: "11", text: "Prepare party favor bags", completed: false, notes: "" },
        { id: "12", text: "Do a final shopping run", completed: false, notes: "" },
      ],
    },
    {
      phase: "Day of",
      tasks: [
        { id: "13", text: "Set up decorations 2 hours early", completed: false, notes: "" },
        { id: "14", text: "Inflate balloons", completed: false, notes: "" },
        { id: "15", text: "Prepare activity station", completed: false, notes: "" },
        { id: "16", text: "Set up the food and drinks table", completed: false, notes: "" },
        { id: "17", text: "Have the camera ready for memorable moments", completed: false, notes: "" },
      ],
    },
  ];
}

function generateShoppingList(party: { budget: number; theme: string }) {
  const b = party.budget;
  return [
    {
      category: "Decorations",
      items: [
        { id: "d1", name: `${party.theme} banner`, cost: Math.round(b * 0.02), completed: false },
        { id: "d2", name: "Balloons (themed + plain)", cost: Math.round(b * 0.03), completed: false },
        { id: "d3", name: "Tablecloth", cost: Math.round(b * 0.015), completed: false },
        { id: "d4", name: "Streamers and confetti", cost: Math.round(b * 0.01), completed: false },
      ],
    },
    {
      category: "Food & Drinks",
      items: [
        { id: "f1", name: "Birthday cake", cost: Math.round(b * 0.08), completed: false },
        { id: "f2", name: "Pizza / main food", cost: Math.round(b * 0.15), completed: false },
        { id: "f3", name: "Juice boxes and water", cost: Math.round(b * 0.04), completed: false },
        { id: "f4", name: "Snacks and candy", cost: Math.round(b * 0.04), completed: false },
      ],
    },
    {
      category: "Party Favors",
      items: [
        { id: "pf1", name: "Favor bags", cost: Math.round(b * 0.03), completed: false },
        { id: "pf2", name: "Small toys and treats", cost: Math.round(b * 0.06), completed: false },
      ],
    },
    {
      category: "Supplies",
      items: [
        { id: "s1", name: "Plates and napkins", cost: Math.round(b * 0.02), completed: false },
        { id: "s2", name: "Cups and utensils", cost: Math.round(b * 0.015), completed: false },
        { id: "s3", name: "Candles", cost: Math.round(b * 0.005), completed: false },
      ],
    },
  ];
}

function generateTimeline(party: { theme: string }) {
  return [
    { time: "12:00 PM", activity: "Guests start arriving, welcome music playing" },
    { time: "12:15 PM", activity: "Free play / arrival activity" },
    { time: "12:45 PM", activity: "Main party activity / games begin" },
    { time: "1:15 PM", activity: "Lunch / food served" },
    { time: "1:45 PM", activity: "Birthday cake and singing" },
    { time: "2:00 PM", activity: "Open presents" },
    { time: "2:30 PM", activity: "Final activity / free play" },
    { time: "3:00 PM", activity: "Party favor bags, goodbye!" },
  ];
}
