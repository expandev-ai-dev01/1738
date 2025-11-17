import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { ProductUpdateFormProps } from './types';
import type { ProductUpdateFormData } from '../../types';

const productUpdateSchema = z.object({
  description: z
    .string()
    .min(5, 'Descrição deve ter no mínimo 5 caracteres')
    .max(200, 'Descrição deve ter no máximo 200 caracteres'),
  idCategory: z.string().min(1, 'Selecione uma categoria'),
  idUnitOfMeasure: z.string().min(1, 'Selecione uma unidade de medida'),
  status: z.string().min(1, 'Selecione um status'),
});

/**
 * @component ProductUpdateForm
 * @summary Form for updating existing products
 * @domain product
 * @type domain-component
 * @category form
 */
export const ProductUpdateForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: ProductUpdateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductUpdateFormData>({
    resolver: zodResolver(productUpdateSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descrição *
        </label>
        <textarea
          {...register('description')}
          id="description"
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="idCategory" className="block text-sm font-medium text-gray-700">
          Categoria *
        </label>
        <select
          {...register('idCategory')}
          id="idCategory"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        >
          <option value="">Selecione uma categoria</option>
          <option value="1">Eletrônicos</option>
          <option value="2">Alimentos</option>
          <option value="3">Vestuário</option>
        </select>
        {errors.idCategory && (
          <p className="mt-1 text-sm text-red-600">{errors.idCategory.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="idUnitOfMeasure" className="block text-sm font-medium text-gray-700">
          Unidade de Medida *
        </label>
        <select
          {...register('idUnitOfMeasure')}
          id="idUnitOfMeasure"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        >
          <option value="">Selecione uma unidade</option>
          <option value="1">Unidade</option>
          <option value="2">Kg</option>
          <option value="3">Litro</option>
          <option value="4">Metro</option>
        </select>
        {errors.idUnitOfMeasure && (
          <p className="mt-1 text-sm text-red-600">{errors.idUnitOfMeasure.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status *
        </label>
        <select
          {...register('status')}
          id="status"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        >
          <option value="">Selecione um status</option>
          <option value="1">Ativo</option>
          <option value="0">Inativo</option>
        </select>
        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};
