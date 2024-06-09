import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));
const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication3/ForgotPassword')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin3 />
    },
    {
      path: '/home',
      element: <>Home</>
    },
    {
      path: '/register',
      element: <AuthRegister3 />
    },
    {
      path: '/reset-password',
      element: <AuthForgotPassword />
    }
  ]
};

export default AuthenticationRoutes;
