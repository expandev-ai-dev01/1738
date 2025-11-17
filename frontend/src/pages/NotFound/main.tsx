import { useNavigate } from 'react-router-dom';

/**
 * @page NotFoundPage
 * @summary 404 error page for non-existent routes
 * @domain core
 * @type error-page
 * @category public
 */
export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-8 text-gray-400">
        <svg className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
      <h2 className="mb-4 text-2xl font-semibold text-gray-700">Página não encontrada</h2>
      <p className="mb-8 text-gray-600">
        A página que você está procurando não existe ou foi movida.
      </p>
      <button
        onClick={() => navigate('/')}
        className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Voltar para Home
      </button>
    </div>
  );
};

export default NotFoundPage;
