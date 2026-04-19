"use client";

import { useState } from "react";
import type { Exercise } from "@/lib/types";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, PartyPopper } from "lucide-react";

interface WorkoutLoggerProps {
  workoutId: string;
  initialExercises: Exercise[];
  onUpdate: (workoutId: string, exercises: Exercise[]) => Promise<void>;
}

export function WorkoutLogger({
  workoutId,
  initialExercises,
  onUpdate,
}: WorkoutLoggerProps) {
  return (
    <WorkoutLoggerInner
      initialExercises={initialExercises}
      onToggle={(updated) => onUpdate(workoutId, updated)}
    />
  );
}

export function WorkoutLoggerDemo({
  initialExercises,
}: {
  initialExercises: Exercise[];
}) {
  return (
    <WorkoutLoggerInner
      initialExercises={initialExercises}
      onToggle={async () => {}}
    />
  );
}

function WorkoutLoggerInner({
  initialExercises,
  onToggle,
}: {
  initialExercises: Exercise[];
  onToggle: (exercises: Exercise[]) => Promise<void>;
}) {
  const [exercises, setExercises] = useState(initialExercises);

  const completedCount = exercises.filter((e) => e.completed).length;
  const total = exercises.length;
  const progress = total > 0 ? (completedCount / total) * 100 : 0;
  const allDone = completedCount === total && total > 0;

  function toggle(index: number) {
    const updated = exercises.map((ex, i) =>
      i === index ? { ...ex, completed: !ex.completed } : ex
    );
    setExercises(updated);
    onToggle(updated);
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Log Progress</h3>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold ${
                allDone ? "text-green-400" : "text-muted"
              }`}
            >
              {completedCount}/{total}
            </span>
            {allDone && (
              <span className="flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-0.5 text-[11px] font-semibold text-green-400 border border-green-500/20">
                <PartyPopper className="h-3 w-3" />
                Done!
              </span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              allDone ? "progress-glow" : ""
            }`}
            style={{
              width: `${progress}%`,
              background: allDone
                ? "linear-gradient(90deg, #22c55e, #4ade80)"
                : `linear-gradient(90deg, #a855f7, #6366f1)`,
            }}
          />
        </div>

        <div className="space-y-1">
          {exercises.map((exercise, index) => (
            <label
              key={index}
              className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 ${
                exercise.completed
                  ? "bg-green-500/[0.04]"
                  : "hover:bg-white/[0.03]"
              }`}
            >
              <Checkbox.Root
                checked={exercise.completed}
                onCheckedChange={() => toggle(index)}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-150 ${
                  exercise.completed
                    ? "border-green-500 bg-green-500 shadow-sm shadow-green-500/20"
                    : "border-white/15 bg-white/[0.03] hover:border-white/25"
                }`}
              >
                <Checkbox.Indicator>
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <span
                className={`flex-1 text-[13px] transition-all duration-150 ${
                  exercise.completed
                    ? "text-muted line-through"
                    : "text-foreground font-medium"
                }`}
              >
                {exercise.name}
              </span>
              <span className="text-[11px] font-mono text-muted">
                {exercise.sets}&times;{exercise.reps}
                {exercise.weight ? ` @ ${exercise.weight}kg` : ""}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
