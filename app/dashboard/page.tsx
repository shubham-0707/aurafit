import { Suspense } from "react";
import { AuraRing } from "@/components/ui/aura-ring";
import { StreakCounter } from "@/components/ui/streak-counter";
import { WorkoutCard } from "@/components/ui/workout-card";
import { WorkoutLogger } from "@/components/ui/workout-logger";
import { MvdBanner } from "@/components/ui/mvd-banner";
import { createClient } from "@/lib/supabase/server";
import { scaleWorkout } from "@/lib/ai/scale-workout";
import { calculateReadiness } from "@/lib/ai/readiness";
import type { Exercise } from "@/lib/types";

async function updateWorkoutExercises(
  workoutId: string,
  exercises: Exercise[]
) {
  "use server";
  const supabase = await createClient();
  const allCompleted = exercises.every((e) => e.completed);

  await supabase
    .from("workouts")
    .update({
      exercises,
      completed_at: allCompleted ? new Date().toISOString() : null,
    })
    .eq("id", workoutId);
}

// Static shell: streak + aura ring
async function DashboardShell() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("streak, longest_streak, display_name")
    .eq("id", user.id)
    .single();

  const streak = profile?.streak ?? 0;
  const longestStreak = profile?.longest_streak ?? 0;
  const displayName = profile?.display_name ?? "Athlete";

  return (
    <div className="mb-8">
      <h1 className="mb-6 text-2xl font-bold">
        Welcome back, {displayName}
      </h1>
      <div className="flex items-center gap-6">
        <AuraRing streak={streak} />
        <StreakCounter streak={streak} longestStreak={longestStreak} />
      </div>
    </div>
  );
}

// Streamed: AI-generated workout
async function AdaptiveWorkout() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="text-foreground/50">Please log in to see your workout.</p>;
  }

  const readiness = await calculateReadiness(user.id);

  // Check for existing workout today
  const { data: existingWorkout } = await supabase
    .from("workouts")
    .select("id, exercises, is_mvd")
    .eq("user_id", user.id)
    .eq("date", new Date().toISOString().split("T")[0])
    .single();

  let workoutId: string;
  let exercises: Exercise[];
  let isMvd: boolean;
  let summary: string;

  if (existingWorkout) {
    workoutId = existingWorkout.id;
    exercises = existingWorkout.exercises as Exercise[];
    isMvd = existingWorkout.is_mvd;
    summary = isMvd
      ? "MVD workout — light session to keep the streak alive."
      : "Your workout for today.";
  } else {
    const generated = await scaleWorkout(user.id);
    exercises = generated.exercises;
    isMvd = generated.isMvd;
    summary = generated.summary;

    const { data: inserted } = await supabase
      .from("workouts")
      .insert({
        user_id: user.id,
        exercises,
        is_mvd: isMvd,
      })
      .select("id")
      .single();

    workoutId = inserted!.id;
  }

  return (
    <div className="space-y-6">
      {isMvd && <MvdBanner />}
      <WorkoutCard exercises={exercises} isMvd={isMvd} summary={summary} />
      <WorkoutLogger
        workoutId={workoutId}
        initialExercises={exercises}
        onUpdate={updateWorkoutExercises}
      />
      <p className="text-xs text-foreground/30">
        Readiness score: {readiness.score}/100
      </p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <DashboardShell />
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
