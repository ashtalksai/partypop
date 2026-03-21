import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Partypop — AI Party Planner for Busy Parents",
  description: "Your kid's party, planned in 2 minutes. AI-powered checklists, shopping lists, local vendors, and day-of timelines.",
  openGraph: {
    title: "Partypop — AI Party Planner",
    description: "Plan your kid's party in 2 minutes with AI.",
    url: "https://partypopai.ashketing.com",
    siteName: "Partypop",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
