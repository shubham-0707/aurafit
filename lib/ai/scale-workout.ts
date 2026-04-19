"use server";

import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { calculateReadiness } from "./readiness";
import type { Exercise } from "@/lib/types";

const exerciseSchema = z.object({
  name: z.string(),
  sets: z.number().int().min(1),
  reps: z.number().int().min(1),
  weight: z.number().nullable(),
  completed: z.boolean().default(false),
});

const workoutSchema = z.object({
  exercises: z.array(exerciseSchema),
  isMvd: z.boolean(),
  summary: z.string(),
});

export async function scaleWorkout(userId: string): Promise<{
  exercises: Exercise[];
  isMvd: boolean;
  summary: string;
}> {
  const supabase = await createClient();
  const readiness = await calculateReadiness(userId);

  // Fetch recent workout history
  const { data: recentWorkouts } = await supabase
    .from("workouts")
    .select("exercises, date, is_mvd")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(3);

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, streak")
    .eq("id", userId)
    .single();

  const mvdInstruction =
    readiness.isLowReadiness
      ? `The user's readiness score is LOW (${readiness.score}/100). Generate a Minimum Viable Day (MVD) workout: reduced volume (2-3 exercises), lower intensity, focus on movement quality over load. Mark isMvd as true.`
      : `The user's readiness score is ${readiness.score}/100. Generate a full workout appropriate for their level.`;

  const { object } = await generateObject({
    model: anthropic("claude-sonnet-4-20250514"),
    schema: workoutSchema,
    prompt: `You are an adaptive fitness coach for AuraFit.

${mvdInstruction}

User: ${profile?.display_name ?? "Athlete"}
Current streak: ${profile?.streak ?? 0} days

Recent workouts:
${JSON.stringify(recentWorkouts ?? [], null, 2)}

Generate a workout for today. Vary exercises from recent history. Include compound movements.
For each exercise, suggest realistic sets, reps, and weight (null if bodyweight).
Provide a brief motivational summary.`,
  });

  return object;
}
