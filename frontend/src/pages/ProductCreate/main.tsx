import { useNavigate } from 'react-router-dom';
import { useProductCreate } from '@/domain/product/hooks/useProductCreate';
import { ProductForm } from '@/domain/product/components/ProductForm';
import type { ProductFormData } from '@/domain/product/types';

/**
 * @page ProductCreatePage
 * @summary Page for creating new products
 * @domain product
 * @type form-page
 * @category product-management
 */
export const ProductCreatePage = () => {
  const navigate = useNavigate();
  const { create, isCreating } = useProductCreate();

  const handleSubmit = async (data: ProductFormData) => {
    try {
      await create({
        code: data.code,
        description: data.description,
        idCategory: parseInt(data.idCategory),
        idUnitOfMeasure: parseInt(data.idUnitOfMeasure),
      });
      navigate('/products');
    } catch (error: unknown) {
      console.error('Erro ao criar produto:', error);
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Novo Produto</h1>
        <p className="mt-2 text-sm text-gray-600">
          Preencha os campos abaixo para cadastrar um novo produto
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isCreating} />
      </div>
    </div>
  );
};

export default ProductCreatePage;
