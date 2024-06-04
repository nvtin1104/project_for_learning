import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import NotFoundView from '../views/error/not-found-view';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/error')));

// utilities routing

// sample page routing

// ==============================|| MAIN ROUTING ||============================== //

const ErrorRoutes = {
  path: '*',
  element: <NotFoundView />
};

export default ErrorRoutes;
