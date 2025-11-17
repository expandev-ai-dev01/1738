import type { ProductListParams, Product } from '../../types';

export interface UseProductListOptions {
  filters?: ProductListParams;
  enabled?: boolean;
}

export interface UseProductListReturn {
  products: Product[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
