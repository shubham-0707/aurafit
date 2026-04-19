"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Dumbbell, Activity, LogOut } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/dashboard/readiness", label: "Readiness", icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/10 bg-black/40 px-4 py-6">
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-foreground">
          <span className="text-purple-400">Aura</span>Fit
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/10 text-foreground"
                  : "text-foreground/50 hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/50 transition-colors hover:bg-white/5 hover:text-foreground">
        <LogOut className="h-4 w-4" />
        Sign Out
      </button>
    </aside>
  );
}
