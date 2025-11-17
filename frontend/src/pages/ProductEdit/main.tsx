import { useParams, useNavigate } from 'react-router-dom';
import { useProductDetail } from '@/domain/product/hooks/useProductDetail';
import { useProductUpdate } from '@/domain/product/hooks/useProductUpdate';
import { ProductUpdateForm } from '@/domain/product/components/ProductUpdateForm';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import type { ProductUpdateFormData } from '@/domain/product/types';

/**
 * @page ProductEditPage
 * @summary Page for editing existing products
 * @domain product
 * @type form-page
 * @category product-management
 */
export const ProductEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = parseInt(id || '0');

  const { product, isLoading, error } = useProductDetail({ productId });
  const { update, isUpdating } = useProductUpdate();

  const handleSubmit = async (data: ProductUpdateFormData) => {
    try {
      await update(productId, {
        description: data.description,
        idCategory: parseInt(data.idCategory),
        idUnitOfMeasure: parseInt(data.idUnitOfMeasure),
        status: parseInt(data.status),
      });
      navigate(`/products/${productId}`);
    } catch (error: unknown) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/products/${productId}`);
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (error || !product) {
    return (
      <ErrorMessage
        title="Produto não encontrado"
        message="O produto solicitado não foi encontrado ou você não tem permissão para editá-lo."
        onBack={() => navigate('/products')}
      />
    );
  }

  const initialData: ProductUpdateFormData = {
    description: product.description,
    idCategory: product.idCategory.toString(),
    idUnitOfMeasure: product.idUnitOfMeasure.toString(),
    status: product.status.toString(),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Editar Produto</h1>
        <p className="mt-2 text-sm text-gray-600">Código: {product.code}</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <ProductUpdateForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isUpdating}
        />
      </div>
    </div>
  );
};

export default ProductEditPage;
