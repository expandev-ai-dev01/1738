import { authenticatedClient } from '@/core/lib/api';
import type { Product, ProductListParams, CreateProductDto, UpdateProductDto } from '../types';
import type { ApiResponse, PaginatedResponse } from '@/core/types';

/**
 * @service productService
 * @summary Product management service for authenticated endpoints
 * @domain product
 * @type rest-service
 * @apiContext internal
 */
export const productService = {
  /**
   * @endpoint GET /api/v1/internal/product
   * @summary Fetches list of products with filters
   */
  async list(params?: ProductListParams): Promise<PaginatedResponse<Product>> {
    const response = await authenticatedClient.get<ApiResponse<PaginatedResponse<Product>>>(
      '/product',
      { params }
    );
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/product/:id
   * @summary Fetches single product by ID
   */
  async getById(id: number): Promise<Product> {
    const response = await authenticatedClient.get<ApiResponse<Product>>(`/product/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/internal/product
   * @summary Creates new product
   */
  async create(data: CreateProductDto): Promise<{ idProduct: number }> {
    const response = await authenticatedClient.post<ApiResponse<{ idProduct: number }>>(
      '/product',
      data
    );
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/product/:id
   * @summary Updates existing product
   */
  async update(id: number, data: UpdateProductDto): Promise<{ idProduct: number }> {
    const response = await authenticatedClient.put<ApiResponse<{ idProduct: number }>>(
      `/product/${id}`,
      data
    );
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/product/:id
   * @summary Deletes product (soft delete)
   */
  async delete(id: number): Promise<{ idProduct: number }> {
    const response = await authenticatedClient.delete<ApiResponse<{ idProduct: number }>>(
      `/product/${id}`
    );
    return response.data.data;
  },
};
