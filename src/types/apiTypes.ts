export interface ApiExerciseCategory {
  id: string;
  name: {
    [language: string]: string;
  };
}

export interface ApiExercise {
  id: string;
  name: {
    [language: string]: string;
  };
  categories: ApiExerciseCategory[];
}

export interface ApiPasswordLoginRequest {
  email: string;
  password: string;
}

export interface ApiPasswordRegisterRequest {
  email: string;
  password: string;
}
