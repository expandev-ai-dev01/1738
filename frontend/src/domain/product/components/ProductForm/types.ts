import type { ProductFormData } from '../../types';

export interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}
