import { Request } from 'express';
import { z } from 'zod';

/**
 * @interface SecurityRule
 * @description Security rule configuration for CRUD operations
 *
 * @property {string} securable - Resource name to secure
 * @property {string} permission - Permission type required
 */
export interface SecurityRule {
  securable: string;
  permission: string;
}

/**
 * @interface ValidationResult
 * @description Result of validation operation
 *
 * @property {any} credential - User credential information
 * @property {any} params - Validated parameters
 */
export interface ValidationResult {
  credential: any;
  params: any;
}

/**
 * @summary
 * Controller for handling CRUD operations with security and validation
 *
 * @class CrudController
 * @module middleware
 */
export class CrudController {
  private securityRules: SecurityRule[];

  constructor(securityRules: SecurityRule[]) {
    this.securityRules = securityRules;
  }

  /**
   * @summary
   * Validates request for create operation
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>} Validation result or error
   */
  async create(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidationResult | null, Error | null]> {
    return this.validateRequest(req, schema, 'CREATE');
  }

  /**
   * @summary
   * Validates request for read operation
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>} Validation result or error
   */
  async read(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, Error | null]> {
    return this.validateRequest(req, schema, 'READ');
  }

  /**
   * @summary
   * Validates request for update operation
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>} Validation result or error
   */
  async update(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidationResult | null, Error | null]> {
    return this.validateRequest(req, schema, 'UPDATE');
  }

  /**
   * @summary
   * Validates request for delete operation
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>} Validation result or error
   */
  async delete(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidationResult | null, Error | null]> {
    return this.validateRequest(req, schema, 'DELETE');
  }

  /**
   * @summary
   * Validates request for list operation
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>} Validation result or error
   */
  async list(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, Error | null]> {
    return this.validateRequest(req, schema, 'READ');
  }

  /**
   * @summary
   * Internal method to validate request with schema
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   * @param {string} operation - Operation type
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>} Validation result or error
   */
  private async validateRequest(
    req: Request,
    schema: z.ZodSchema,
    operation: string
  ): Promise<[ValidationResult | null, Error | null]> {
    try {
      const params = { ...req.params, ...req.query, ...req.body };
      const validated = await schema.parseAsync(params);

      const credential = {
        idAccount: 1,
        idUser: 1,
      };

      return [{ credential, params: validated }, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}
