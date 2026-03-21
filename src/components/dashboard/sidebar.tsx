"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sparkles, MapPin, Settings, LogOut, Zap } from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/quiz", icon: Sparkles, label: "Theme Quiz" },
  { href: "/vendors", icon: MapPin, label: "Vendors" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex flex-col w-60 border-r h-full"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="px-5 py-5 border-b" style={{ borderColor: "var(--border)" }}>
        <Link href="/dashboard" className="font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
          Party<span style={{ color: "var(--accent)" }}>pop</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all"
              style={{
                background: isActive ? "rgba(255,107,74,0.1)" : "transparent",
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
              }}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade badge */}
      <div className="px-4 py-4 border-t" style={{ borderColor: "var(--border)" }}>
        <Link
          href="/pricing"
          className="flex items-center gap-2 px-4 py-3 rounded-md mb-3"
          style={{ background: "var(--accent-amber-light)" }}
        >
          <Zap size={16} style={{ color: "var(--accent)" }} />
          <div>
            <div className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Upgrade to Pro</div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>Unlock vendors + sharing</div>
          </div>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 px-4 py-2 text-sm w-full rounded-md transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </aside>
  );
}
