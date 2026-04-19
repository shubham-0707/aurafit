"use client";

import { useOptimistic, useTransition } from "react";
import type { Exercise } from "@/lib/types";

export function useOptimisticLog(initialExercises: Exercise[]) {
  const [optimisticExercises, setOptimisticExercises] =
    useOptimistic(initialExercises);
  const [isPending, startTransition] = useTransition();

  function toggleExercise(
    index: number,
    serverAction: (exercises: Exercise[]) => Promise<void>
  ) {
    const updated = optimisticExercises.map((ex, i) =>
      i === index ? { ...ex, completed: !ex.completed } : ex
    );

    startTransition(async () => {
      setOptimisticExercises(updated);
      await serverAction(updated);
    });
  }

  return {
    exercises: optimisticExercises,
    toggleExercise,
    isPending,
  };
}
