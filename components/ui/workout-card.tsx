import type { Exercise } from "@/lib/types";
import { Dumbbell, Zap } from "lucide-react";

interface WorkoutCardProps {
  exercises: Exercise[];
  isMvd: boolean;
  summary: string;
}

export function WorkoutCard({ exercises, isMvd, summary }: WorkoutCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Dumbbell className="h-5 w-5" />
          Today&apos;s Workout
        </h2>
        {isMvd && (
          <span className="flex items-center gap-1 rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400">
            <Zap className="h-3 w-3" />
            MVD Mode
          </span>
        )}
      </div>
      <p className="mb-4 text-sm text-foreground/60">{summary}</p>
      <div className="space-y-2">
        {exercises.map((exercise, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3"
          >
            <span className="text-sm font-medium text-foreground">
              {exercise.name}
            </span>
            <span className="text-xs text-foreground/50">
              {exercise.sets} &times; {exercise.reps}
              {exercise.weight ? ` @ ${exercise.weight}kg` : " BW"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
