export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  addTraining: '/add-training',
  allTrainings: '/trainings',
  trainingDetails: (id: string) => `/trainings/${id}`,
  editTraining: (id: string) => `/trainings/${id}/edit`,
};

export const paths = {
  home: '/',
  login: '/login',
  register: '/register',
  addTraining: '/add-training',
  allTrainings: '/trainings',
  trainingDetails: '/trainings/:id',
  editTraining: '/trainings/:id/edit',
};
