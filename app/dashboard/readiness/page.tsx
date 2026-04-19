"use client";

import { useState } from "react";
import {
  Activity,
  Moon,
  Heart,
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
} from "lucide-react";

interface ReadinessDay {
  date: string;
  dayLabel: string;
  sleepHours: number;
  hrv: number;
  restingHr: number;
  soreness: number;
  score: number;
}

const READINESS_HISTORY: ReadinessDay[] = [
  { date: "2026-04-19", dayLabel: "Today", sleepHours: 7.5, hrv: 62, restingHr: 58, soreness: 2, score: 74 },
  { date: "2026-04-18", dayLabel: "Fri", sleepHours: 6.0, hrv: 45, restingHr: 65, soreness: 4, score: 38 },
  { date: "2026-04-17", dayLabel: "Thu", sleepHours: 8.0, hrv: 78, restingHr: 54, soreness: 2, score: 82 },
  { date: "2026-04-16", dayLabel: "Wed", sleepHours: 7.0, hrv: 55, restingHr: 60, soreness: 3, score: 60 },
  { date: "2026-04-15", dayLabel: "Tue", sleepHours: 8.5, hrv: 85, restingHr: 52, soreness: 1, score: 91 },
  { date: "2026-04-14", dayLabel: "Mon", sleepHours: 6.5, hrv: 50, restingHr: 62, soreness: 3, score: 50 },
  { date: "2026-04-13", dayLabel: "Sun", sleepHours: 9.0, hrv: 92, restingHr: 50, soreness: 1, score: 95 },
];

function getScoreColor(score: number): string {
  if (score >= 70) return "#22c55e";
  if (score >= 40) return "#eab308";
  return "#ef4444";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Moderate";
  if (score >= 40) return "Low";
  return "Very Low";
}

function getTrend(current: number, previous: number) {
  const diff = current - previous;
  if (diff > 5)
    return { icon: TrendingUp, label: `+${diff}`, color: "text-green-400" };
  if (diff < -5)
    return { icon: TrendingDown, label: `${diff}`, color: "text-red-400" };
  return { icon: Minus, label: `${diff > 0 ? "+" : ""}${diff}`, color: "text-muted" };
}

function ScoreBar({ score, maxWidth = 100 }: { score: number; maxWidth?: number }) {
  const color = getScoreColor(score);
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-2 rounded-full"
        style={{
          width: `${(score / 100) * maxWidth}px`,
          background: color,
          boxShadow: `0 0 8px ${color}40`,
        }}
      />
    </div>
  );
}

function SorenessIndicator({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`h-1.5 w-3 rounded-full ${
            i <= level ? "bg-red-400" : "bg-white/[0.06]"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReadinessPage() {
  const [selectedDay, setSelectedDay] = useState<ReadinessDay>(READINESS_HISTORY[0]);
  const today = READINESS_HISTORY[0];
  const yesterday = READINESS_HISTORY[1];
  const trend = getTrend(today.score, yesterday.score);
  const TrendIcon = trend.icon;

  const avgScore = Math.round(
    READINESS_HISTORY.reduce((s, d) => s + d.score, 0) / READINESS_HISTORY.length
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Activity className="h-6 w-6 text-purple-400" />
          Readiness
        </h1>
        <p className="mt-1 text-sm text-muted">
          Track your recovery metrics to optimize training intensity
        </p>
      </div>

      {/* Current readiness hero */}
      <div className="glass-card overflow-hidden">
        <div
          className="h-1"
          style={{
            background: `linear-gradient(90deg, ${getScoreColor(today.score)}, ${getScoreColor(today.score)}80)`,
          }}
        />
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                Today&apos;s Readiness
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span
                  className="text-5xl font-bold"
                  style={{ color: getScoreColor(today.score) }}
                >
                  {today.score}
                </span>
                <span className="text-lg text-muted">/100</span>
              </div>
              <p
                className="mt-1 text-sm font-medium"
                style={{ color: getScoreColor(today.score) }}
              >
                {getScoreLabel(today.score)}
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-white/[0.04] px-3 py-1.5">
              <TrendIcon className={`h-4 w-4 ${trend.color}`} />
              <span className={`text-sm font-medium ${trend.color}`}>
                {trend.label}
              </span>
            </div>
          </div>

          {/* Metric breakdown */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-white/[0.03] p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Moon className="h-3.5 w-3.5 text-indigo-400" />
                Sleep
              </div>
              <p className="mt-1.5 text-lg font-bold text-foreground">
                {today.sleepHours}h
              </p>
            </div>
            <div className="rounded-xl bg-white/[0.03] p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Heart className="h-3.5 w-3.5 text-red-400" />
                HRV
              </div>
              <p className="mt-1.5 text-lg font-bold text-foreground">
                {today.hrv}ms
              </p>
            </div>
            <div className="rounded-xl bg-white/[0.03] p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Activity className="h-3.5 w-3.5 text-pink-400" />
                Resting HR
              </div>
              <p className="mt-1.5 text-lg font-bold text-foreground">
                {today.restingHr}bpm
              </p>
            </div>
            <div className="rounded-xl bg-white/[0.03] p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Brain className="h-3.5 w-3.5 text-amber-400" />
                Soreness
              </div>
              <div className="mt-2">
                <SorenessIndicator level={today.soreness} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly average */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted">7-Day Average</span>
          <div className="flex items-center gap-2">
            <ScoreBar score={avgScore} maxWidth={80} />
            <span className="text-sm font-bold text-foreground">{avgScore}</span>
          </div>
        </div>
      </div>

      {/* History */}
      <div>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">History</h2>
        <div className="space-y-1.5 stagger-children">
          {READINESS_HISTORY.map((day) => (
            <button
              key={day.date}
              onClick={() => setSelectedDay(day)}
              className={`glass-card glass-card-hover flex w-full items-center gap-4 p-4 text-left transition-all ${
                selectedDay.date === day.date ? "!border-purple-500/30" : ""
              }`}
            >
              {/* Score circle */}
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: getScoreColor(day.score),
                  background: `${getScoreColor(day.score)}10`,
                }}
              >
                <span
                  className="text-sm font-bold"
                  style={{ color: getScoreColor(day.score) }}
                >
                  {day.score}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {day.dayLabel === "Today" ? "Today" : day.date.slice(5).replace("-", "/")}
                  </span>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: getScoreColor(day.score) }}
                  >
                    {getScoreLabel(day.score)}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-[11px] text-muted">
                  <span>{day.sleepHours}h sleep</span>
                  <span>HRV {day.hrv}</span>
                  <span>HR {day.restingHr}</span>
                </div>
              </div>

              <ScoreBar score={day.score} maxWidth={60} />
              <ChevronRight className="h-4 w-4 text-muted" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
