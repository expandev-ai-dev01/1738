export interface UseProductDeleteReturn {
  deleteProduct: (id: number) => Promise<{ idProduct: number }>;
  isDeleting: boolean;
  error: Error | null;
}
