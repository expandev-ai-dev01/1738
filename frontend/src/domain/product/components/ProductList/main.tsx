import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { ProductListProps } from './types';

/**
 * @component ProductList
 * @summary Displays list of products in a table
 * @domain product
 * @type domain-component
 * @category display
 */
export const ProductList = ({
  products,
  isLoading,
  onView,
  onEdit,
  onDelete,
}: ProductListProps) => {
  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <p className="text-gray-600">Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Código
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Descrição
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Categoria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {products.map((product) => (
            <tr key={product.idProduct} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                {product.code}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{product.description}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {product.categoryName || '-'}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    product.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.status === 1 ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                  onClick={() => onView(product.idProduct)}
                  className="mr-3 text-blue-600 hover:text-blue-900"
                >
                  Ver
                </button>
                <button
                  onClick={() => onEdit(product.idProduct)}
                  className="mr-3 text-indigo-600 hover:text-indigo-900"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(product.idProduct)}
                  className="text-red-600 hover:text-red-900"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
