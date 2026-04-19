"use client";

interface AuraRingProps {
  streak: number;
  size?: number;
}

function getStreakColor(streak: number): string {
  if (streak >= 15) return "#a855f7";
  if (streak >= 8) return "#22c55e";
  if (streak >= 4) return "#eab308";
  return "#ef4444";
}

function getStreakLabel(streak: number): string {
  if (streak >= 15) return "Legendary";
  if (streak >= 8) return "On Fire";
  if (streak >= 4) return "Building";
  return "Starting";
}

export function AuraRing({ streak, size = 140 }: AuraRingProps) {
  const color = getStreakColor(streak);
  const progress = Math.min(streak / 15, 1);
  const label = getStreakLabel(streak);
  const circumference = 2 * Math.PI * 56;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full animate-aura-pulse"
        style={{
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
        }}
      />

      {/* SVG ring */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0 -rotate-90"
        viewBox="0 0 128 128"
      >
        {/* Track */}
        <circle
          cx="64"
          cy="64"
          r="56"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="6"
        />
        {/* Progress */}
        <circle
          cx="64"
          cy="64"
          r="56"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 14px ${color}50)`,
            transition: "stroke-dashoffset 1s ease-out",
          }}
        />
      </svg>

      {/* Center content */}
      <div className="relative flex flex-col items-center">
        <span className="text-3xl font-bold text-foreground animate-count-up">
          {streak}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color }}>
          {label}
        </span>
      </div>
    </div>
  );
}
