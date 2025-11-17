import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseProductCreateReturn } from './types';

/**
 * @hook useProductCreate
 * @summary Manages product creation
 * @domain product
 * @type domain-hook
 * @category data
 */
export const useProductCreate = (): UseProductCreateReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    create: mutateAsync,
    isCreating: isPending,
    error: error as Error | null,
  };
};
