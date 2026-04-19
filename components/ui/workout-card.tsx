import type { Exercise } from "@/lib/types";
import { Dumbbell, Zap, Clock, Weight } from "lucide-react";

interface WorkoutCardProps {
  exercises: Exercise[];
  isMvd: boolean;
  summary: string;
}

export function WorkoutCard({ exercises, isMvd, summary }: WorkoutCardProps) {
  const totalSets = exercises.reduce((s, e) => s + e.sets, 0);
  const estMinutes = totalSets * 2.5;

  return (
    <div className="glass-card overflow-hidden">
      {/* Header gradient bar */}
      <div
        className="h-1"
        style={{
          background: isMvd
            ? "linear-gradient(90deg, #eab308, #f59e0b)"
            : "linear-gradient(90deg, #a855f7, #6366f1, #8b5cf6)",
        }}
      />

      <div className="p-5">
        {/* Title row */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-purple-400" />
            Today&apos;s Workout
          </h2>
          {isMvd && (
            <span className="flex items-center gap-1 rounded-full bg-yellow-500/15 px-2.5 py-1 text-[11px] font-semibold text-yellow-400 border border-yellow-500/20">
              <Zap className="h-3 w-3" />
              MVD
            </span>
          )}
        </div>

        <p className="mb-4 text-[13px] leading-relaxed text-muted">{summary}</p>

        {/* Quick stats */}
        <div className="mb-4 flex gap-4">
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Weight className="h-3.5 w-3.5" />
            <span>{exercises.length} exercises</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Clock className="h-3.5 w-3.5" />
            <span>~{Math.round(estMinutes)} min</span>
          </div>
        </div>

        {/* Exercise list */}
        <div className="space-y-1.5 stagger-children">
          {exercises.map((exercise, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.05]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.06] text-[11px] font-medium text-muted">
                  {i + 1}
                </span>
                <span className="text-[13px] font-medium text-foreground">
                  {exercise.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[11px] font-mono text-muted">
                  {exercise.sets}&times;{exercise.reps}
                </span>
                {exercise.weight && (
                  <span className="rounded-md bg-purple-500/10 px-2 py-0.5 text-[11px] font-mono text-purple-400">
                    {exercise.weight}kg
                  </span>
                )}
                {!exercise.weight && (
                  <span className="rounded-md bg-green-500/10 px-2 py-0.5 text-[11px] font-mono text-green-400">
                    BW
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
