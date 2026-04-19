"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Dumbbell,
  Activity,
  LogOut,
  Sparkles,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/dashboard/readiness", label: "Readiness", icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="flex h-full w-[260px] flex-col border-r border-white/[0.06] bg-[#08080c]/80 backdrop-blur-xl px-3 py-5">
      {/* Logo */}
      <Link href="/dashboard" className="mb-8 flex items-center gap-2.5 px-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/20">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-semibold tracking-tight">
          <span className="text-purple-400">Aura</span>
          <span className="text-foreground">Fit</span>
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5">
        <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-muted">
          Menu
        </p>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-150 ${
                isActive
                  ? "bg-white/[0.08] text-foreground shadow-sm"
                  : "text-muted hover:bg-white/[0.04] hover:text-foreground"
              }`}
            >
              <item.icon
                className={`h-[18px] w-[18px] transition-colors ${
                  isActive
                    ? "text-purple-400"
                    : "text-muted group-hover:text-foreground/70"
                }`}
              />
              {item.label}
              {isActive && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto space-y-1 border-t border-white/[0.06] pt-3">
        <button
          onClick={() => router.push("/login")}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-muted transition-all duration-150 hover:bg-white/[0.04] hover:text-foreground"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
