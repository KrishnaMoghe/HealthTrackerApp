export type ActivityType = 'water' | 'steps' | 'sleep';

export interface Activity {
  id: string;
  type: ActivityType;
  value: number;
  timestamp: string; // ISO string
  notes?: string;
}

export interface DailySummary {
  water: number;
  steps: number;
  sleep: number;
  date: string;
}

export interface GroupedActivities {
  date: string;
  activities: Activity[];
}
