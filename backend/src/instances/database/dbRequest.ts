import sql from 'mssql';
import { getPool } from './pool';

/**
 * @enum ExpectedReturn
 * @description Expected return type from database operation
 */
export enum ExpectedReturn {
  Single = 'Single',
  Multi = 'Multi',
  None = 'None',
}

/**
 * @interface IRecordSet
 * @description Generic record set interface
 *
 * @property {T[]} recordset - Array of records
 */
export interface IRecordSet<T = any> {
  recordset: T[];
}

/**
 * @summary
 * Executes database stored procedure with parameters
 *
 * @function dbRequest
 * @module instances
 *
 * @param {string} routine - Stored procedure name
 * @param {object} parameters - Procedure parameters
 * @param {ExpectedReturn} expectedReturn - Expected return type
 * @param {sql.Transaction} [transaction] - Optional transaction
 * @param {string[]} [resultSetNames] - Optional result set names
 *
 * @returns {Promise<any>} Database operation result
 *
 * @throws {Error} When database operation fails
 */
export async function dbRequest(
  routine: string,
  parameters: any,
  expectedReturn: ExpectedReturn,
  transaction?: sql.Transaction,
  resultSetNames?: string[]
): Promise<any> {
  const pool = await getPool();
  const request = transaction ? new sql.Request(transaction) : pool.request();

  for (const [key, value] of Object.entries(parameters)) {
    request.input(key, value);
  }

  const result = await request.execute(routine);

  if (expectedReturn === ExpectedReturn.None) {
    return null;
  }

  if (expectedReturn === ExpectedReturn.Single) {
    return result.recordset[0];
  }

  if (expectedReturn === ExpectedReturn.Multi) {
    if (resultSetNames && resultSetNames.length > 0) {
      const namedResults: any = {};
      resultSetNames.forEach((name, index) => {
        namedResults[name] = result.recordsets[index];
      });
      return namedResults;
    }
    return result.recordsets;
  }

  return result;
}
