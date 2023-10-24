export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  addTraining: '/add-training',
  allTrainings: '/trainings',
  trainingDetails: (id: string) => `/trainings/${id}`,
  // exercisesBase: '/exercises-base',
};

export const paths = {
  home: '/',
  login: '/login',
  register: '/register',
  addTraining: '/add-training',
  allTrainings: '/trainings',
  trainingDetails: '/trainings/:id',
  // exercisesBase: '/exercises-base',
};
