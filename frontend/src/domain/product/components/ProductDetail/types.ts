import type { Product } from '../../types';

export interface ProductDetailProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}
