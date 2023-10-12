import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import TrainingForm from '../pages/addTraining/TrainingForm';
import Home from '../pages/home/HomePage';
import Login from '../pages/login/LoginPage';
import Register from '../pages/register/RegisterPage';
import ProtectedRoute from './ProtectedRoute';
import { paths } from './routes';

const withLayout = (Component: React.ReactNode) => <MainLayout>{Component}</MainLayout>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.register} element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path={paths.home} element={withLayout(<Home />)} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={paths.addTraining} element={withLayout(<TrainingForm />)} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
