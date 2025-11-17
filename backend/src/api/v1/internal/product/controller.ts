import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  CrudController,
  errorResponse,
  StatusGeneralError,
  successResponse,
} from '@/middleware/crud';
import {
  productCreate,
  productList,
  productGet,
  productUpdate,
  productDelete,
} from '@/services/product';

const securable = 'PRODUCT';

/**
 * @api {post} /api/v1/internal/product Create Product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new product with validation
 *
 * @apiParam {String} code Product code (3-20 alphanumeric characters)
 * @apiParam {String} description Product description (5-200 characters)
 * @apiParam {Number} idCategory Category identifier
 * @apiParam {Number} idUnitOfMeasure Unit of measure identifier
 *
 * @apiSuccess {Number} idProduct Created product identifier
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} UnauthorizedError User lacks permission
 * @apiError {String} ServerError Internal server error
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'CREATE' }]);

  const bodySchema = z.object({
    code: z.string().min(3).max(20),
    description: z.string().min(5).max(200),
    idCategory: z.coerce.number().int().positive(),
    idUnitOfMeasure: z.coerce.number().int().positive(),
  });

  const [validated, error] = await operation.create(req, bodySchema);

  if (!validated) {
    return next(error);
  }

  try {
    const data = await productCreate({
      ...validated.credential,
      ...validated.params,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.number === 51000) {
      res.status(400).json(errorResponse(error.message));
    } else {
      next(StatusGeneralError);
    }
  }
}

/**
 * @api {get} /api/v1/internal/product List Products
 * @apiName ListProducts
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists products with filtering, sorting, and pagination
 *
 * @apiParam {String} [filterCode] Filter by product code (partial match)
 * @apiParam {String} [filterDescription] Filter by description (partial match)
 * @apiParam {Number} [filterIdCategory] Filter by category identifier
 * @apiParam {Number} [filterStatus] Filter by status (0 = inactive, 1 = active)
 * @apiParam {String} [sortBy=code] Sort field (code, description, category, dateCreated)
 * @apiParam {String} [sortDirection=asc] Sort direction (asc, desc)
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [pageSize=10] Items per page (10, 25, 50, 100)
 *
 * @apiSuccess {Array} data Product list
 * @apiSuccess {Number} total Total number of products
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} UnauthorizedError User lacks permission
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'READ' }]);

  const querySchema = z.object({
    filterCode: z.string().max(20).optional(),
    filterDescription: z.string().max(200).optional(),
    filterIdCategory: z.coerce.number().int().positive().optional(),
    filterStatus: z.coerce.number().int().min(0).max(1).optional(),
    sortBy: z.enum(['code', 'description', 'category', 'dateCreated']).optional(),
    sortDirection: z.enum(['asc', 'desc']).optional(),
    page: z.coerce.number().int().min(1).optional(),
    pageSize: z.coerce
      .number()
      .int()
      .refine((val) => [10, 25, 50, 100].includes(val))
      .optional(),
  });

  const [validated, error] = await operation.list(req, querySchema);

  if (!validated) {
    return next(error);
  }

  try {
    const data = await productList({
      ...validated.credential,
      ...validated.params,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.number === 51000) {
      res.status(400).json(errorResponse(error.message));
    } else {
      next(StatusGeneralError);
    }
  }
}
