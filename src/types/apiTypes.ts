import { ITrainingAdd } from './trainingTypes';

export interface ApiBaseExerciseCategory {
  id: string;
  name: {
    [language: string]: string;
  };
}

export interface ApiBaseExercise {
  id: string;
  name: {
    [language: string]: string;
  };
  categories: ApiBaseExerciseCategory[];
}

export interface ApiPasswordLoginRequest {
  email: string;
  password: string;
}

export interface ApiPasswordRegisterRequest {
  email: string;
  password: string;
}

export interface ApiAddTrainingRequest extends ITrainingAdd {
  createdAt: Date;
}
