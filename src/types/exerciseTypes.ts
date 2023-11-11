import { Translation } from './globalTypes';

export interface ApiBaseExerciseCategory {
  id: string;
  name: {
    [language: string]: string;
  };
}

export interface IExercise {
  id: string;
  createdAt: Date;
  name: Translation[];
}
