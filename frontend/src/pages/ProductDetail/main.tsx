import { useParams, useNavigate } from 'react-router-dom';
import { useProductDetail } from '@/domain/product/hooks/useProductDetail';
import { useProductDelete } from '@/domain/product/hooks/useProductDelete';
import { ProductDetail } from '@/domain/product/components/ProductDetail';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';

/**
 * @page ProductDetailPage
 * @summary Page displaying detailed product information
 * @domain product
 * @type detail-page
 * @category product-management
 */
export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = parseInt(id || '0');

  const { product, isLoading, error } = useProductDetail({ productId });
  const { deleteProduct } = useProductDelete();

  const handleEdit = () => {
    navigate(`/products/${productId}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteProduct(productId);
        navigate('/products');
      } catch (error: unknown) {
        console.error('Erro ao excluir produto:', error);
      }
    }
  };

  const handleBack = () => {
    navigate('/products');
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (error || !product) {
    return (
      <ErrorMessage
        title="Produto não encontrado"
        message="O produto solicitado não foi encontrado ou você não tem permissão para visualizá-lo."
        onBack={handleBack}
      />
    );
  }

  return (
    <ProductDetail
      product={product}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onBack={handleBack}
    />
  );
};

export default ProductDetailPage;
