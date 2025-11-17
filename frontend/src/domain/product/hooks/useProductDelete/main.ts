import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseProductDeleteReturn } from './types';

/**
 * @hook useProductDelete
 * @summary Manages product deletion (soft delete)
 * @domain product
 * @type domain-hook
 * @category data
 */
export const useProductDelete = (): UseProductDeleteReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    deleteProduct: mutateAsync,
    isDeleting: isPending,
    error: error as Error | null,
  };
};
