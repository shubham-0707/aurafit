import { Flame, Trophy, TrendingUp } from "lucide-react";

interface StreakCounterProps {
  streak: number;
  longestStreak: number;
}

export function StreakCounter({ streak, longestStreak }: StreakCounterProps) {
  const percentage = longestStreak > 0 ? Math.round((streak / longestStreak) * 100) : 0;

  return (
    <div className="flex flex-1 flex-col gap-3">
      {/* Main streak stat */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10">
              <Flame className="h-4 w-4 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{streak}</p>
              <p className="text-xs text-muted">Day Streak</p>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-1">
            <TrendingUp className="h-3 w-3 text-green-400" />
            <span className="text-[11px] font-medium text-green-400">Active</span>
          </div>
        </div>
      </div>

      {/* Best streak */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
            <Trophy className="h-4 w-4 text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted">Personal Best</p>
              <p className="text-xs font-medium text-foreground">{longestStreak} days</p>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
