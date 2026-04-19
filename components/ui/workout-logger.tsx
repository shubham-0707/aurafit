"use client";

import { useState } from "react";
import type { Exercise } from "@/lib/types";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

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

// Demo version — no server action needed
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
  const progress =
    exercises.length > 0 ? (completedCount / exercises.length) * 100 : 0;

  function toggle(index: number) {
    const updated = exercises.map((ex, i) =>
      i === index ? { ...ex, completed: !ex.completed } : ex
    );
    setExercises(updated);
    onToggle(updated);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Log Progress</h3>
        <span className="text-xs text-foreground/50">
          {completedCount}/{exercises.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-2">
        {exercises.map((exercise, index) => (
          <label
            key={index}
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-white/5"
          >
            <Checkbox.Root
              checked={exercise.completed}
              onCheckedChange={() => toggle(index)}
              className="flex h-5 w-5 items-center justify-center rounded border border-white/20 bg-white/5 data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500"
            >
              <Checkbox.Indicator>
                <Check className="h-3 w-3 text-white" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <span
              className={`text-sm ${
                exercise.completed
                  ? "text-foreground/40 line-through"
                  : "text-foreground"
              }`}
            >
              {exercise.name} — {exercise.sets}&times;{exercise.reps}
              {exercise.weight ? ` @ ${exercise.weight}kg` : ""}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
