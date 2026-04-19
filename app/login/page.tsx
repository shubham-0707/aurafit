import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/20">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-purple-400">Aura</span>
            <span className="text-foreground">Fit</span>
          </h1>
          <p className="mt-1 text-sm text-muted">
            AI-adaptive workouts, built for you
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-6">
          <form className="space-y-4" action="/dashboard">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-muted mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-muted mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-colors"
                placeholder="••••••••"
              />
            </div>
            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/30 hover:brightness-110"
            >
              Sign In
            </Link>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted">
              Demo mode — click Sign In to explore
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
