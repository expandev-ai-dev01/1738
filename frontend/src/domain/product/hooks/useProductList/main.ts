import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseProductListOptions, UseProductListReturn } from './types';

/**
 * @hook useProductList
 * @summary Manages product list with filtering and pagination
 * @domain product
 * @type domain-hook
 * @category data
 */
export const useProductList = (options: UseProductListOptions = {}): UseProductListReturn => {
  const { filters = {}, enabled = true } = options;

  const queryKey = ['products', filters];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => productService.list(filters),
    enabled,
    staleTime: 2 * 60 * 1000,
  });

  return {
    products: data?.data || [],
    total: data?.total || 0,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
