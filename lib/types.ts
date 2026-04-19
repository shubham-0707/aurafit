export interface Profile {
  id: string;
  display_name: string | null;
  streak: number;
  longest_streak: number;
  created_at: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number | null;
  completed: boolean;
}

export interface Workout {
  id: string;
  user_id: string;
  date: string;
  exercises: Exercise[];
  is_mvd: boolean;
  completed_at: string | null;
  created_at: string;
}

export interface ReadinessLog {
  id: string;
  user_id: string;
  date: string;
  sleep_hours: number;
  hrv: number;
  resting_hr: number;
  soreness: number;
  score: number;
  created_at: string;
}

export interface ReadinessResult {
  score: number;
  isLowReadiness: boolean;
}
