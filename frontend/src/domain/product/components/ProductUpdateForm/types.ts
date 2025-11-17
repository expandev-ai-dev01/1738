import type { ProductUpdateFormData } from '../../types';

export interface ProductUpdateFormProps {
  initialData: ProductUpdateFormData;
  onSubmit: (data: ProductUpdateFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}
