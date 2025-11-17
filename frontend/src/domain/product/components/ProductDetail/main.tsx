import { format } from 'date-fns';
import type { ProductDetailProps } from './types';

/**
 * @component ProductDetail
 * @summary Displays detailed product information
 * @domain product
 * @type domain-component
 * @category display
 */
export const ProductDetail = ({ product, onEdit, onDelete, onBack }: ProductDetailProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar
        </button>
        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Editar
          </button>
          <button
            onClick={onDelete}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Excluir
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Detalhes do Produto</h2>

        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Código</dt>
            <dd className="mt-1 text-sm text-gray-900">{product.code}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  product.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {product.status === 1 ? 'Ativo' : 'Inativo'}
              </span>
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Descrição</dt>
            <dd className="mt-1 text-sm text-gray-900">{product.description}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Categoria</dt>
            <dd className="mt-1 text-sm text-gray-900">{product.categoryName || '-'}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Unidade de Medida</dt>
            <dd className="mt-1 text-sm text-gray-900">{product.unitOfMeasureName || '-'}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Data de Cadastro</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {format(new Date(product.dateCreated), 'dd/MM/yyyy HH:mm')}
            </dd>
          </div>

          {product.dateUpdated && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Última Atualização</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {format(new Date(product.dateUpdated), 'dd/MM/yyyy HH:mm')}
              </dd>
            </div>
          )}

          {product.currentQuantity !== undefined && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Quantidade em Estoque</dt>
              <dd className="mt-1 text-sm text-gray-900">{product.currentQuantity}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};
