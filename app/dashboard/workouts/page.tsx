"use client";

import { useState } from "react";
import type { Exercise } from "@/lib/types";
import {
  Dumbbell,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Zap,
  Flame,
} from "lucide-react";

interface WorkoutDay {
  id: string;
  date: string;
  dayLabel: string;
  exercises: Exercise[];
  isMvd: boolean;
  completedAt: string | null;
  duration: number; // minutes
}

const WORKOUT_HISTORY: WorkoutDay[] = [
  {
    id: "1",
    date: "2026-04-19",
    dayLabel: "Today",
    exercises: [
      { name: "Barbell Back Squat", sets: 4, reps: 6, weight: 100, completed: false },
      { name: "Romanian Deadlift", sets: 3, reps: 10, weight: 70, completed: false },
      { name: "Bulgarian Split Squat", sets: 3, reps: 8, weight: 20, completed: false },
      { name: "Hanging Leg Raise", sets: 3, reps: 12, weight: null, completed: false },
    ],
    isMvd: false,
    completedAt: null,
    duration: 0,
  },
  {
    id: "2",
    date: "2026-04-18",
    dayLabel: "Yesterday",
    exercises: [
      { name: "Bench Press", sets: 4, reps: 8, weight: 80, completed: true },
      { name: "Incline DB Press", sets: 3, reps: 10, weight: 30, completed: true },
      { name: "Cable Fly", sets: 3, reps: 12, weight: 15, completed: true },
      { name: "Tricep Pushdown", sets: 3, reps: 15, weight: 25, completed: true },
      { name: "Lateral Raise", sets: 3, reps: 15, weight: 10, completed: true },
    ],
    isMvd: false,
    completedAt: "2026-04-18T18:45:00Z",
    duration: 42,
  },
  {
    id: "3",
    date: "2026-04-17",
    dayLabel: "Thu",
    exercises: [
      { name: "Goblet Squat", sets: 2, reps: 10, weight: 16, completed: true },
      { name: "Band Pull-Apart", sets: 2, reps: 15, weight: null, completed: true },
      { name: "Walking (15 min)", sets: 1, reps: 1, weight: null, completed: true },
    ],
    isMvd: true,
    completedAt: "2026-04-17T07:30:00Z",
    duration: 22,
  },
  {
    id: "4",
    date: "2026-04-16",
    dayLabel: "Wed",
    exercises: [
      { name: "Deadlift", sets: 5, reps: 5, weight: 140, completed: true },
      { name: "Barbell Row", sets: 4, reps: 8, weight: 70, completed: true },
      { name: "Pull-ups", sets: 3, reps: 10, weight: null, completed: true },
      { name: "Face Pulls", sets: 3, reps: 15, weight: 15, completed: true },
      { name: "Barbell Curl", sets: 3, reps: 12, weight: 25, completed: true },
    ],
    isMvd: false,
    completedAt: "2026-04-16T19:10:00Z",
    duration: 48,
  },
  {
    id: "5",
    date: "2026-04-15",
    dayLabel: "Tue",
    exercises: [
      { name: "Overhead Press", sets: 4, reps: 6, weight: 50, completed: true },
      { name: "Weighted Dips", sets: 3, reps: 8, weight: 15, completed: true },
      { name: "DB Shoulder Press", sets: 3, reps: 10, weight: 22, completed: true },
      { name: "Cable Crunch", sets: 3, reps: 15, weight: 40, completed: true },
    ],
    isMvd: false,
    completedAt: "2026-04-15T18:00:00Z",
    duration: 35,
  },
  {
    id: "6",
    date: "2026-04-14",
    dayLabel: "Mon",
    exercises: [
      { name: "Front Squat", sets: 4, reps: 6, weight: 80, completed: true },
      { name: "Leg Press", sets: 3, reps: 12, weight: 180, completed: true },
      { name: "Walking Lunges", sets: 3, reps: 10, weight: 20, completed: true },
      { name: "Leg Curl", sets: 3, reps: 12, weight: 45, completed: true },
      { name: "Plank", sets: 3, reps: 60, weight: null, completed: true },
    ],
    isMvd: false,
    completedAt: "2026-04-14T17:30:00Z",
    duration: 50,
  },
];

function WorkoutDayCard({ workout }: { workout: WorkoutDay }) {
  const [expanded, setExpanded] = useState(false);
  const isComplete = workout.completedAt !== null;
  const completedCount = workout.exercises.filter((e) => e.completed).length;
  const totalVolume = workout.exercises.reduce(
    (sum, e) => sum + e.sets * e.reps * (e.weight ?? 0),
    0
  );

  return (
    <div className="glass-card glass-card-hover overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        {/* Date badge */}
        <div
          className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl text-center ${
            workout.dayLabel === "Today"
              ? "bg-purple-500/15 text-purple-400"
              : isComplete
                ? "bg-green-500/10 text-green-400"
                : "bg-white/[0.04] text-muted"
          }`}
        >
          <span className="text-[10px] font-medium uppercase">
            {workout.dayLabel === "Today" || workout.dayLabel === "Yesterday"
              ? workout.date.slice(5, 7) + "/" + workout.date.slice(8, 10)
              : workout.date.slice(8, 10)}
          </span>
          <span className="text-xs font-bold">{workout.dayLabel}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              {workout.isMvd ? "MVD Recovery" : `${workout.exercises.length} Exercises`}
            </span>
            {workout.isMvd && (
              <span className="flex items-center gap-0.5 rounded-full bg-yellow-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-yellow-400">
                <Zap className="h-2.5 w-2.5" />
                MVD
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-3 text-xs text-muted">
            {isComplete && (
              <>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {workout.duration}m
                </span>
                {totalVolume > 0 && (
                  <span className="flex items-center gap-1">
                    <Dumbbell className="h-3 w-3" />
                    {(totalVolume / 1000).toFixed(1)}t volume
                  </span>
                )}
              </>
            )}
            {!isComplete && <span>In progress</span>}
          </div>
        </div>

        {/* Status + expand */}
        <div className="flex items-center gap-2">
          {isComplete ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <span className="rounded-full bg-purple-500/15 px-2.5 py-1 text-[11px] font-medium text-purple-400">
              {completedCount}/{workout.exercises.length}
            </span>
          )}
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-muted" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted" />
          )}
        </div>
      </button>

      {/* Expanded exercises */}
      {expanded && (
        <div className="border-t border-white/[0.04] px-4 pb-4 pt-3">
          <div className="space-y-1.5">
            {workout.exercises.map((ex, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-medium ${
                      ex.completed
                        ? "bg-green-500/15 text-green-400"
                        : "bg-white/[0.06] text-muted"
                    }`}
                  >
                    {ex.completed ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
                  </span>
                  <span
                    className={`text-[13px] ${
                      ex.completed ? "text-muted" : "text-foreground font-medium"
                    }`}
                  >
                    {ex.name}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-muted">
                  {ex.sets}&times;{ex.reps}
                  {ex.weight ? ` @ ${ex.weight}kg` : " BW"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function WorkoutsPage() {
  const totalWorkouts = WORKOUT_HISTORY.filter((w) => w.completedAt).length;
  const totalDuration = WORKOUT_HISTORY.reduce((s, w) => s + w.duration, 0);
  const mvdCount = WORKOUT_HISTORY.filter((w) => w.isMvd).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-purple-400" />
          Workouts
        </h1>
        <p className="mt-1 text-sm text-muted">
          Your training history and upcoming sessions
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card p-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
              <Calendar className="h-4 w-4 text-purple-400" />
            </div>
          </div>
          <p className="text-xl font-bold text-foreground">{totalWorkouts}</p>
          <p className="text-[11px] text-muted">This Week</p>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
              <Clock className="h-4 w-4 text-blue-400" />
            </div>
          </div>
          <p className="text-xl font-bold text-foreground">{totalDuration}m</p>
          <p className="text-[11px] text-muted">Total Time</p>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/10">
              <Flame className="h-4 w-4 text-yellow-400" />
            </div>
          </div>
          <p className="text-xl font-bold text-foreground">{mvdCount}</p>
          <p className="text-[11px] text-muted">MVD Days</p>
        </div>
      </div>

      {/* Workout list */}
      <div className="space-y-2 stagger-children">
        {WORKOUT_HISTORY.map((workout) => (
          <WorkoutDayCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}
