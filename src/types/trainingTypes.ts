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

export interface ITrainingAdd {
  date: Date;
  exercises: ITrainingExercise[];
}

export interface ITraining extends ITrainingAdd {
  id: string;
  createdAt: Date;
}
