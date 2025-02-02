export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface Weather {
  temperature: number;
  description: string;
  icon: string;
}

export type Mood = 'focused' | 'chill' | 'energized';

export type TimeOfDay = 'morning' | 'afternoon' | 'night';

export interface Soundscape {
  id: string;
  name: string;
  icon: string;
  description: string;
  audioUrl: string;
  color: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
}