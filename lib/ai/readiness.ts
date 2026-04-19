import { createClient } from "@/lib/supabase/server";
import type { ReadinessResult } from "@/lib/types";

export async function calculateReadiness(
  userId: string
): Promise<ReadinessResult> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("readiness_logs")
    .select("score")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    // Default to moderate readiness if no data
    return { score: 65, isLowReadiness: false };
  }

  return {
    score: data.score,
    isLowReadiness: data.score < 50,
  };
}
