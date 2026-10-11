export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  description: string;
};

export type WorkoutCategory = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  exercises: Exercise[];
};

export type LogEntry = {
  id: string;
  exerciseName: string;
  categoryName: string;
  sets: number;
  reps: string;
  weight: string;
  unit: 'kg' | 'lbs';
  date: string;
};

// Navigation param types
export type RootStackParamList = {
  DrawerRoot: undefined;
  WorkoutDetail: { category: WorkoutCategory };
  LogWorkout: { exercise: Exercise; categoryName: string };
};

export type DrawerParamList = {
  MainTabs: undefined;
  About: undefined;
};

export type TabParamList = {
  Workouts: undefined;
  Progress: undefined;
  Settings: undefined;
};
