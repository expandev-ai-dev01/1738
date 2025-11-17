import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductList } from '@/domain/product/hooks/useProductList';
import { ProductList } from '@/domain/product/components/ProductList';
import { ErrorMessage } from '@/core/components/ErrorMessage';

/**
 * @page ProductsPage
 * @summary Product listing page with filters and actions
 * @domain product
 * @type list-page
 * @category product-management
 */
export const ProductsPage = () => {
  const navigate = useNavigate();
  const [filters] = useState({});

  const { products, isLoading, error, refetch } = useProductList({ filters });

  const handleView = (id: number) => {
    navigate(`/products/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/products/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      navigate(`/products/${id}/delete`);
    }
  };

  const handleCreate = () => {
    navigate('/products/new');
  };

  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar produtos"
        message={error.message}
        onRetry={refetch}
        onBack={() => navigate('/')}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
        <button
          onClick={handleCreate}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Novo Produto
        </button>
      </div>

      <ProductList
        products={products}
        isLoading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ProductsPage;
