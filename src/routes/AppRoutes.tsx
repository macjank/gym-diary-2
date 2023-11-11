import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import AddExercisePage from '../pages/addExercise/AddExercisePage';
import AddTrainingPage from '../pages/addTraining/AddTrainingPage';
import AllExercisesPage from '../pages/allExercises/AllExercisesPage';
import AllTrainingsPage from '../pages/allTrainings/AllTrainingsPage';
import EditTrainingPage from '../pages/editTraining/EditTrainingPage';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';
import TrainingDetailsPage from '../pages/trainingDetails/TrainingDetailsPage';
import ProtectedRoute from './ProtectedRoute';
import { paths, routes } from './routes';

const withLayout = (Component: React.ReactNode) => <MainLayout>{Component}</MainLayout>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.login} element={<LoginPage />} />
      <Route path={paths.register} element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path={paths.home} element={withLayout(<HomePage />)} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={paths.addTraining} element={withLayout(<AddTrainingPage />)} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={paths.editTraining} element={withLayout(<EditTrainingPage />)} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={paths.allTrainings} element={withLayout(<AllTrainingsPage />)} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={paths.trainingDetails} element={withLayout(<TrainingDetailsPage />)} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={paths.allExercises} element={withLayout(<AllExercisesPage />)} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={paths.addExercise} element={withLayout(<AddExercisePage />)} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={'*'} element={withLayout(<Navigate to={routes.home} />)} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
