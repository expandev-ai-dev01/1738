import { dbRequest, ExpectedReturn } from '@/instances/database';
import {
  ProductCreateParams,
  ProductListParams,
  ProductGetParams,
  ProductUpdateParams,
  ProductDeleteParams,
} from './productTypes';

/**
 * @summary
 * Creates a new product in the database
 *
 * @function productCreate
 * @module product
 *
 * @param {ProductCreateParams} params - Product creation parameters
 * @param {number} params.idAccount - Account identifier
 * @param {number} params.idUser - User identifier
 * @param {string} params.code - Product code
 * @param {string} params.description - Product description
 * @param {number} params.idCategory - Category identifier
 * @param {number} params.idUnitOfMeasure - Unit of measure identifier
 *
 * @returns {Promise<any>} Created product data
 *
 * @throws {ValidationError} When parameters fail validation
 * @throws {BusinessRuleError} When business rules are violated
 * @throws {DatabaseError} When database operation fails
 */
export async function productCreate(params: ProductCreateParams): Promise<any> {
  const result = await dbRequest('[functional].[spProductCreate]', params, ExpectedReturn.Single);

  return result;
}

/**
 * @summary
 * Lists products with filtering, sorting, and pagination
 *
 * @function productList
 * @module product
 *
 * @param {ProductListParams} params - Product list parameters
 * @param {number} params.idAccount - Account identifier
 * @param {string} [params.filterCode] - Filter by code
 * @param {string} [params.filterDescription] - Filter by description
 * @param {number} [params.filterIdCategory] - Filter by category
 * @param {number} [params.filterStatus] - Filter by status
 * @param {string} [params.sortBy] - Sort field
 * @param {string} [params.sortDirection] - Sort direction
 * @param {number} [params.page] - Page number
 * @param {number} [params.pageSize] - Items per page
 *
 * @returns {Promise<any>} Product list with pagination data
 *
 * @throws {ValidationError} When parameters fail validation
 * @throws {DatabaseError} When database operation fails
 */
export async function productList(params: ProductListParams): Promise<any> {
  const results = await dbRequest(
    '[functional].[spProductList]',
    params,
    ExpectedReturn.Multi,
    undefined,
    ['products', 'total']
  );

  return {
    data: results.products,
    total: results.total[0].total,
    page: params.page || 1,
    pageSize: params.pageSize || 10,
  };
}

/**
 * @summary
 * Retrieves detailed information for a specific product
 *
 * @function productGet
 * @module product
 *
 * @param {ProductGetParams} params - Product get parameters
 * @param {number} params.idAccount - Account identifier
 * @param {number} params.idProduct - Product identifier
 *
 * @returns {Promise<any>} Product details
 *
 * @throws {ValidationError} When parameters fail validation
 * @throws {BusinessRuleError} When product not found
 * @throws {DatabaseError} When database operation fails
 */
export async function productGet(params: ProductGetParams): Promise<any> {
  const result = await dbRequest('[functional].[spProductGet]', params, ExpectedReturn.Single);

  return result;
}

/**
 * @summary
 * Updates an existing product
 *
 * @function productUpdate
 * @module product
 *
 * @param {ProductUpdateParams} params - Product update parameters
 * @param {number} params.idAccount - Account identifier
 * @param {number} params.idUser - User identifier
 * @param {number} params.idProduct - Product identifier
 * @param {string} params.description - Product description
 * @param {number} params.idCategory - Category identifier
 * @param {number} params.idUnitOfMeasure - Unit of measure identifier
 * @param {number} params.status - Product status
 *
 * @returns {Promise<any>} Updated product data
 *
 * @throws {ValidationError} When parameters fail validation
 * @throws {BusinessRuleError} When business rules are violated
 * @throws {DatabaseError} When database operation fails
 */
export async function productUpdate(params: ProductUpdateParams): Promise<any> {
  const result = await dbRequest('[functional].[spProductUpdate]', params, ExpectedReturn.Single);

  return result;
}

/**
 * @summary
 * Performs soft delete of a product
 *
 * @function productDelete
 * @module product
 *
 * @param {ProductDeleteParams} params - Product delete parameters
 * @param {number} params.idAccount - Account identifier
 * @param {number} params.idUser - User identifier
 * @param {number} params.idProduct - Product identifier
 *
 * @returns {Promise<any>} Deleted product data
 *
 * @throws {ValidationError} When parameters fail validation
 * @throws {BusinessRuleError} When product not found
 * @throws {DatabaseError} When database operation fails
 */
export async function productDelete(params: ProductDeleteParams): Promise<any> {
  const result = await dbRequest('[functional].[spProductDelete]', params, ExpectedReturn.Single);

  return result;
}
