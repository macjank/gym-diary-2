export interface ITrainingSet {
  id: string;
  repetitions: number;
  weight: number;
}

export interface ITrainingExercise {
  id: string;
  exerciseId: string;
  sets: ITrainingSet[];
}

export interface ITraining {
  id: string;
  createdAt: Date;
  date: Date;
  exercises: ITrainingExercise[];
}
