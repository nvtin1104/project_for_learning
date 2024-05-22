/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-duplicates
import { Outlet } from 'react-router-dom';
import { lazy, Suspense, useContext } from 'react';
// eslint-disable-next-line import/no-duplicates
import { Navigate, useRoutes } from 'react-router-dom';

import WebsitePage from 'src/pages/website';
import AuthLayout from 'src/auth/authLayout';
import CartPage from 'src/pages/website/cart';
import DashboardLayout from 'src/layouts/dashboard';
import { UserContext } from 'src/context/user.context';
import WebsiteProductsPage from 'src/pages/website/products';

import WebsiteLayout from '../layouts/website/index';
import CheckoutPage from 'src/pages/website/checkout';
import ProfilePage from 'src/pages/website/profile';
import RegisterPage from 'src/pages/register';
import OrderPage from 'src/pages/order';
import ProductsAddPage from 'src/pages/product-add';
import TagsPage from 'src/pages/tags';
import ProductsDetailPage from 'src/pages/product-detail';
import ForgotPasswordPage from 'src/pages/forgot-password';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
// eslint-disable-next-line import/no-unresolved
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const { login } = useContext(UserContext);
  const routes = useRoutes([
    {
      path: '/admin',
      element: (
        <DashboardLayout>
          <Suspense>
            <AuthLayout authenticated={login} />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products/add', element: <ProductsAddPage /> },
        { path: 'products/:id', element: <ProductsDetailPage /> },
        { path: 'order', element: <OrderPage /> },
        { path: 'tags', element: <TagsPage /> },
      ],
    },
    {
      path: '/',
      element: (
        <WebsiteLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </WebsiteLayout>
      ),
      children: [
        { element: <WebsitePage />, index: true },
        { path: 'products', element: <WebsiteProductsPage /> },
        { path: 'cart', element: <CartPage /> },
        { path: 'checkout', element: <CheckoutPage /> },
        { path: 'profile', element: <ProfilePage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: 'forgot-password',
      element: <ForgotPasswordPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
