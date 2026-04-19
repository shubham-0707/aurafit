import { Flame } from "lucide-react";

interface StreakCounterProps {
  streak: number;
  longestStreak: number;
}

export function StreakCounter({ streak, longestStreak }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
      <Flame className="h-5 w-5 text-orange-400" />
      <div>
        <p className="text-sm font-medium text-foreground">
          {streak} day streak
        </p>
        <p className="text-xs text-foreground/50">Best: {longestStreak}</p>
      </div>
    </div>
  );
}
