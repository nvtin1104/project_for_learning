import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/default')));

// utilities routing
const LessonsList = Loadable(lazy(() => import('views/client/lessons/view/ListView')));
const LessonRecording = Loadable(lazy(() => import('views/client/lessons/detail/RecordingCard')));
const LessonTest = Loadable(lazy(() => import('views/client/lessons/detail/TestCard')));
const LessonDetail = Loadable(lazy(() => import('views/client/lessons/detail/DetailView')));
const ProfilePage = Loadable(lazy(() => import('views/client/profile/view/ProfileView')));
// sample page routing
const LessonsView = Loadable(lazy(() => import('views/dashboard/lessons/view/ListView')));
const LessonsAdd = Loadable(lazy(() => import('views/dashboard/lessons/add/LessonAdd')));
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
        },
        {
          path: 'lessons',
          element: <LessonsView />
        },
        {
          path: 'lessons/add',
          element: <LessonsAdd />
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
      path: 'lessons/:id/recording',
      element: <LessonRecording />
    },
    {
      path: 'lessons/:id/test',
      element: <LessonTest />
    },
    {
      path: 'profile',
      element: <ProfilePage />
    }
  ]
};
export default MainRoutes;
