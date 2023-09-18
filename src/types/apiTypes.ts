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
