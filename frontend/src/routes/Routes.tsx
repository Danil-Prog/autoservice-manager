import ErrorPage from '../pages/ErrorPage';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/CarMainPage';
import AuthPage from '~/pages/AuthPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
    children: [{ path: '/login', element: <HomePage /> }],
    errorElement: <ErrorPage />
  }
]);
