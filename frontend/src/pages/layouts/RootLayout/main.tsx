import { Outlet, Link, useLocation } from 'react-router-dom';

/**
 * @component RootLayout
 * @summary Root layout component for the application
 * @domain core
 * @type layout-component
 * @category layout
 */
export const RootLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              StockBox
            </Link>
            <nav className="flex gap-4">
              <Link
                to="/"
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  location.pathname === '/'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  location.pathname.startsWith('/products')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Produtos
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600">
            © 2024 StockBox - Sistema de Controle de Estoque
          </p>
        </div>
      </footer>
    </div>
  );
};
