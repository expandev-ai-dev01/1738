import type { UpdateProductDto } from '../../types';

export interface UseProductUpdateReturn {
  update: (id: number, data: UpdateProductDto) => Promise<{ idProduct: number }>;
  isUpdating: boolean;
  error: Error | null;
}
