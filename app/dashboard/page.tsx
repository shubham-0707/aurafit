import { Suspense } from "react";
import { AuraRing } from "@/components/ui/aura-ring";
import { StreakCounter } from "@/components/ui/streak-counter";
import { WorkoutCard } from "@/components/ui/workout-card";
import { WorkoutLoggerDemo } from "@/components/ui/workout-logger";
import { MvdBanner } from "@/components/ui/mvd-banner";
import type { Exercise } from "@/lib/types";

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

// Simulate a delay for the streamed section to show PPR in action
async function AdaptiveWorkout() {
  await new Promise((r) => setTimeout(r, 1500));

  // Randomly show MVD mode ~20% of the time for demo purposes
  const readinessScore = Math.floor(Math.random() * 100);
  const isMvd = readinessScore < 40;
  const exercises = isMvd ? MVD_EXERCISES : DEMO_EXERCISES;
  const summary = isMvd
    ? "Low readiness detected — light movement session to keep the streak alive."
    : "Full session today — compound lower body focus with core finisher. Let's go!";

  return (
    <div className="space-y-6">
      {isMvd && <MvdBanner />}
      <WorkoutCard exercises={exercises} isMvd={isMvd} summary={summary} />
      <WorkoutLoggerDemo initialExercises={exercises} />
      <p className="text-xs text-foreground/30">
        Readiness score: {readinessScore}/100
      </p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-2xl">
      {/* Static shell — rendered instantly via PPR */}
      <div className="mb-8">
        <h1 className="mb-6 text-2xl font-bold">Welcome back, Athlete</h1>
        <div className="flex items-center gap-6">
          <AuraRing streak={12} />
          <StreakCounter streak={12} longestStreak={21} />
        </div>
      </div>

      {/* Dynamic section — streamed in via Suspense */}
      <Suspense
        fallback={
          <div className="space-y-4">
            <div className="h-48 animate-pulse rounded-2xl bg-white/5" />
            <div className="h-64 animate-pulse rounded-2xl bg-white/5" />
          </div>
        }
      >
        <AdaptiveWorkout />
      </Suspense>
    </div>
  );
}
