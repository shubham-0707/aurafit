import { Suspense } from "react";
import { AuraRing } from "@/components/ui/aura-ring";
import { StreakCounter } from "@/components/ui/streak-counter";
import { WorkoutCard } from "@/components/ui/workout-card";
import { WorkoutLoggerDemo } from "@/components/ui/workout-logger";
import { MvdBanner } from "@/components/ui/mvd-banner";
import type { Exercise } from "@/lib/types";
import { Calendar, TrendingUp, Timer } from "lucide-react";

const DEMO_EXERCISES: Exercise[] = [
  { name: "Barbell Back Squat", sets: 4, reps: 6, weight: 100, completed: false },
  { name: "Romanian Deadlift", sets: 3, reps: 10, weight: 70, completed: false },
  { name: "Bulgarian Split Squat", sets: 3, reps: 8, weight: 20, completed: false },
  { name: "Hanging Leg Raise", sets: 3, reps: 12, weight: null, completed: false },
  { name: "Calf Raises", sets: 4, reps: 15, weight: 60, completed: false },
];

const MVD_EXERCISES: Exercise[] = [
  { name: "Goblet Squat", sets: 2, reps: 10, weight: 16, completed: false },
  { name: "Band Pull-Apart", sets: 2, reps: 15, weight: null, completed: false },
  { name: "Walk (10 min)", sets: 1, reps: 1, weight: null, completed: false },
];

async function AdaptiveWorkout() {
  await new Promise((r) => setTimeout(r, 1200));
  const readinessScore = Math.floor(Math.random() * 100);
  const isMvd = readinessScore < 35;
  const exercises = isMvd ? MVD_EXERCISES : DEMO_EXERCISES;
  const summary = isMvd
    ? "Low readiness detected. Light movement session to keep the streak alive."
    : "Full session today — compound lower body focus with core finisher. Let's crush it!";

  return (
    <div className="space-y-5 animate-fade-in-up">
      {isMvd && <MvdBanner />}
      <WorkoutCard exercises={exercises} isMvd={isMvd} summary={summary} />
      <WorkoutLoggerDemo initialExercises={exercises} />
      <div className="glass-card px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted">Readiness Score</span>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${readinessScore}%`,
                  background:
                    readinessScore >= 70
                      ? "#22c55e"
                      : readinessScore >= 40
                        ? "#eab308"
                        : "#ef4444",
                }}
              />
            </div>
            <span className="text-xs font-mono font-medium text-foreground">
              {readinessScore}/100
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, <span className="text-purple-400">Athlete</span>
        </h1>
        <p className="mt-1 text-sm text-muted">
          Here&apos;s your training overview for today
        </p>
      </div>

      {/* Top stats row */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Aura Ring */}
        <div className="glass-card flex items-center justify-center p-6 md:row-span-2">
          <AuraRing streak={12} size={160} />
        </div>

        {/* Streak + Stats */}
        <div className="md:col-span-2">
          <StreakCounter streak={12} longestStreak={21} />
        </div>

        {/* Quick stats row */}
        <div className="flex gap-3 md:col-span-2">
          <div className="glass-card flex flex-1 items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
              <Calendar className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">47</p>
              <p className="text-[11px] text-muted">Total Workouts</p>
            </div>
          </div>
          <div className="glass-card flex flex-1 items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">+12%</p>
              <p className="text-[11px] text-muted">Volume This Week</p>
            </div>
          </div>
          <div className="glass-card flex flex-1 items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
              <Timer className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">38m</p>
              <p className="text-[11px] text-muted">Avg Duration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Workout section */}
      <div>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Today&apos;s Session</h2>
        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="shimmer h-52 rounded-2xl" />
              <div className="shimmer h-72 rounded-2xl" />
            </div>
          }
        >
          <AdaptiveWorkout />
        </Suspense>
      </div>
    </div>
  );
}
