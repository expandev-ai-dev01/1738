/**
 * @module ProductTypes
 * @summary Type definitions for product domain
 * @domain product
 * @category types
 */

export interface Product {
  idProduct: number;
  code: string;
  description: string;
  idCategory: number;
  categoryName?: string;
  idUnitOfMeasure: number;
  unitOfMeasureName?: string;
  status: number;
  dateCreated: string;
  dateUpdated?: string;
  currentQuantity?: number;
}

export interface ProductListParams {
  filterCode?: string;
  filterDescription?: string;
  filterIdCategory?: number;
  filterStatus?: number;
  sortBy?: 'code' | 'description' | 'category' | 'dateCreated';
  sortDirection?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface CreateProductDto {
  code: string;
  description: string;
  idCategory: number;
  idUnitOfMeasure: number;
}

export interface UpdateProductDto {
  description: string;
  idCategory: number;
  idUnitOfMeasure: number;
  status: number;
}

export interface ProductFormData {
  code: string;
  description: string;
  idCategory: string;
  idUnitOfMeasure: string;
}

export interface ProductUpdateFormData {
  description: string;
  idCategory: string;
  idUnitOfMeasure: string;
  status: string;
}
