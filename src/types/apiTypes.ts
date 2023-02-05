export interface Muscle {
  id: string;
  name: string;
  isDeleted: boolean;
}

export interface BaseExercise {
  id: string;
  name: string;
  muscleId: string;
  isDeleted: boolean;
}

export interface TrainingSet {
  id: string;
  repetitions: number | null;
  weight: number | null;
}

export interface TrainingExercise {
  id: string;
  muscleId: string;
  baseExerciseId: string;
  sets: TrainingSet[];
}

export interface Training {
  id: string;
  date: string;
  gym: string;
  exercises: TrainingExercise[];
}
