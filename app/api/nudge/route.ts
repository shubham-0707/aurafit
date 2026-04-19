import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Find users who haven't logged a workout in 2+ days
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const { data: activeUsers } = await supabase
    .from("profiles")
    .select("id, display_name, streak");

  if (!activeUsers) {
    return NextResponse.json({ nudged: 0 });
  }

  const nudgeTargets: { id: string; display_name: string | null; streak: number }[] = [];

  for (const user of activeUsers) {
    const { data: recentWorkout } = await supabase
      .from("workouts")
      .select("date")
      .eq("user_id", user.id)
      .gte("date", twoDaysAgo.toISOString().split("T")[0])
      .limit(1)
      .single();

    if (!recentWorkout) {
      nudgeTargets.push(user);
    }
  }

  // Return nudge payload (integrate with push notification service)
  return NextResponse.json({
    nudged: nudgeTargets.length,
    targets: nudgeTargets.map((u) => ({
      userId: u.id,
      message:
        u.streak > 0
          ? `Don't lose your ${u.streak}-day streak, ${u.display_name ?? "champ"}! Even a quick MVD counts.`
          : `Hey ${u.display_name ?? "there"}! Time to get moving. Start a streak today.`,
    })),
  });
}
