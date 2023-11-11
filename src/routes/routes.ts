export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  addTraining: '/trainings/add',
  allTrainings: '/trainings',
  trainingDetails: (id: string) => `/trainings/${id}`,
  editTraining: (id: string) => `/trainings/${id}/edit`,
  allExercises: '/exercises',
  addExercise: '/exercises/add',
};

export const paths = {
  home: '/',
  login: '/login',
  register: '/register',
  addTraining: '/trainings/add',
  allTrainings: '/trainings',
  trainingDetails: '/trainings/:id',
  editTraining: '/trainings/:id/edit',
  allExercises: '/exercises',
  addExercise: '/exercises/add',
};
