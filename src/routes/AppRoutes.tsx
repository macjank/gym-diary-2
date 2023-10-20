import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import AddTraining from '../pages/addTraining/AddTraining';
import AllTrainings from '../pages/allTrainings/AllTrainings';
import Home from '../pages/home/HomePage';
import Login from '../pages/login/LoginPage';
import Register from '../pages/register/RegisterPage';
import ProtectedRoute from './ProtectedRoute';
import { paths, routes } from './routes';

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
        <Route path={paths.addTraining} element={withLayout(<AddTraining />)} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={paths.allTrainings} element={withLayout(<AllTrainings />)} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={'*'} element={withLayout(<Navigate to={routes.home} />)} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
