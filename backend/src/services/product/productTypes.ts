/**
 * @interface ProductCreateParams
 * @description Parameters for creating a new product
 *
 * @property {number} idAccount - Account identifier
 * @property {number} idUser - User identifier
 * @property {string} code - Product code (3-20 alphanumeric characters)
 * @property {string} description - Product description (5-200 characters)
 * @property {number} idCategory - Category identifier
 * @property {number} idUnitOfMeasure - Unit of measure identifier
 */
export interface ProductCreateParams {
  idAccount: number;
  idUser: number;
  code: string;
  description: string;
  idCategory: number;
  idUnitOfMeasure: number;
}

/**
 * @interface ProductListParams
 * @description Parameters for listing products with filters and pagination
 *
 * @property {number} idAccount - Account identifier
 * @property {string} [filterCode] - Filter by product code (partial match)
 * @property {string} [filterDescription] - Filter by description (partial match)
 * @property {number} [filterIdCategory] - Filter by category identifier
 * @property {number} [filterStatus] - Filter by status (0 = inactive, 1 = active)
 * @property {string} [sortBy] - Sort field (code, description, category, dateCreated)
 * @property {string} [sortDirection] - Sort direction (asc, desc)
 * @property {number} [page] - Page number (default 1)
 * @property {number} [pageSize] - Items per page (default 10)
 */
export interface ProductListParams {
  idAccount: number;
  filterCode?: string;
  filterDescription?: string;
  filterIdCategory?: number;
  filterStatus?: number;
  sortBy?: string;
  sortDirection?: string;
  page?: number;
  pageSize?: number;
}

/**
 * @interface ProductGetParams
 * @description Parameters for retrieving a specific product
 *
 * @property {number} idAccount - Account identifier
 * @property {number} idProduct - Product identifier
 */
export interface ProductGetParams {
  idAccount: number;
  idProduct: number;
}

/**
 * @interface ProductUpdateParams
 * @description Parameters for updating an existing product
 *
 * @property {number} idAccount - Account identifier
 * @property {number} idUser - User identifier
 * @property {number} idProduct - Product identifier
 * @property {string} description - Product description (5-200 characters)
 * @property {number} idCategory - Category identifier
 * @property {number} idUnitOfMeasure - Unit of measure identifier
 * @property {number} status - Product status (0 = inactive, 1 = active)
 */
export interface ProductUpdateParams {
  idAccount: number;
  idUser: number;
  idProduct: number;
  description: string;
  idCategory: number;
  idUnitOfMeasure: number;
  status: number;
}

/**
 * @interface ProductDeleteParams
 * @description Parameters for deleting a product (soft delete)
 *
 * @property {number} idAccount - Account identifier
 * @property {number} idUser - User identifier
 * @property {number} idProduct - Product identifier
 */
export interface ProductDeleteParams {
  idAccount: number;
  idUser: number;
  idProduct: number;
}

/**
 * @interface ProductEntity
 * @description Represents a product entity in the system
 *
 * @property {number} idProduct - Unique product identifier
 * @property {number} idAccount - Associated account identifier
 * @property {number} idCategory - Category identifier
 * @property {number} idUnitOfMeasure - Unit of measure identifier
 * @property {string} code - Product code
 * @property {string} description - Product description
 * @property {number} status - Product status (0 = inactive, 1 = active)
 * @property {Date} dateCreated - Creation timestamp
 * @property {Date} dateModified - Last modification timestamp
 * @property {boolean} deleted - Soft delete flag
 */
export interface ProductEntity {
  idProduct: number;
  idAccount: number;
  idCategory: number;
  idUnitOfMeasure: number;
  code: string;
  description: string;
  status: number;
  dateCreated: Date;
  dateModified: Date;
  deleted: boolean;
}
