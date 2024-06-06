import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const LessonsList = Loadable(lazy(() => import('views/client/lessons/view/ListView')));
const LessonDetail = Loadable(lazy(() => import('views/client/lessons/detail/DetailView')));
const ProfilePage = Loadable(lazy(() => import('views/client/profile/view/ProfileView')));
// sample page routing

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  errorElement: <>error</>,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'lessons',
      element: <LessonsList />
    },
    {
      path: 'lessons/:id',
      element: <LessonDetail />
    },
    {
      path: 'profile',
      element: <ProfilePage />
    }
  ]
};
export default MainRoutes;
