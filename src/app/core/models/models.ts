export type Stage = 'child' | 'junior' | 'teen';
export type Area = 'attention' | 'memory' | 'reading';
export interface Profile {
  id: string;
  name: string;
  age: number;
}
export interface VisualPreference {
  motion: boolean;
}
export interface Activity {
  id: Area;
  name: string;
  area: string;
  description: string;
  difficulty: string;
  minutes: number;
  available: boolean;
  icon: string;
  tag: string;
}
export interface Result {
  id: string;
  profileId: string;
  activityId: Area;
  completedAt: string;
  matches: number;
  errors: number;
  seconds: number;
  level: string;
}
export interface Progress {
  sessions: number;
  matches: number;
  errors: number;
  seconds: number;
}
export interface Professional {
  id: string;
  name: string;
  specialty: string;
  profileIds: string[];
}
export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  questions: string[];
}
export interface MemoryCard {
  id: number;
  symbol: string;
  label: string;
  matched: boolean;
}
