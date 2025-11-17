import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseProductUpdateReturn } from './types';

/**
 * @hook useProductUpdate
 * @summary Manages product updates
 * @domain product
 * @type domain-hook
 * @category data
 */
export const useProductUpdate = (): UseProductUpdateReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => productService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });

  return {
    update: (id, data) => mutateAsync({ id, data }),
    isUpdating: isPending,
    error: error as Error | null,
  };
};
