/**
 * @summary
 * Global test environment setup
 *
 * @module tests
 */

export function setupTestEnvironment(): void {
  process.env.NODE_ENV = 'test';
  process.env.DB_SERVER = 'localhost';
  process.env.DB_PORT = '1433';
  process.env.DB_NAME = 'stockbox_test';
  process.env.DB_USER = 'sa';
  process.env.DB_PASSWORD = 'test_password';
}
