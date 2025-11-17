import type { CreateProductDto } from '../../types';

export interface UseProductCreateReturn {
  create: (data: CreateProductDto) => Promise<{ idProduct: number }>;
  isCreating: boolean;
  error: Error | null;
}
