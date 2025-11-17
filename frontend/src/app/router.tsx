import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { RootLayout } from '@/pages/layouts/RootLayout';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';

const HomePage = lazy(() => import('@/pages/Home'));
const ProductsPage = lazy(() => import('@/pages/Products'));
const ProductCreatePage = lazy(() => import('@/pages/ProductCreate'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetail'));
const ProductEditPage = lazy(() => import('@/pages/ProductEdit'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

/**
 * @router AppRouter
 * @summary Main application routing configuration with lazy loading
 * @type router-configuration
 * @category navigation
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <ProductsPage />
              </Suspense>
            ),
          },
          {
            path: 'new',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <ProductCreatePage />
              </Suspense>
            ),
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <ProductDetailPage />
              </Suspense>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <ProductEditPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

/**
 * @component AppRouter
 * @summary Router provider component that wraps the entire application
 */
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
