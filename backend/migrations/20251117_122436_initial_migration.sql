/**
 * Database Migration
 * Generated: 2025-11-17T12:24:36.248Z
 * Timestamp: 20251117_122436
 *
 * This migration includes:
 * - Schema structures (tables, indexes, constraints)
 * - Initial data
 * - Stored procedures
 *
 * Note: This file is automatically executed by the migration runner
 * on application startup in Azure App Service.
 */

-- Set options for better SQL Server compatibility
SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
SET ANSI_PADDING ON;
SET CONCAT_NULL_YIELDS_NULL ON;
SET ANSI_WARNINGS ON;
SET NUMERIC_ROUNDABORT OFF;
GO

PRINT 'Starting database migration...';
PRINT 'Timestamp: 20251117_122436';
GO


-- ============================================
-- STRUCTURE
-- Database schemas, tables, indexes, and constraints
-- ============================================

-- File: subscription/_structure.sql
/**
 * @schema subscription
 * Subscription schema - account management and tenant operations
 */
CREATE SCHEMA [subscription];
GO

/**
 * @table account Tenant accounts for multi-tenancy
 * @multitenancy false
 * @softDelete false
 * @alias acc
 */
CREATE TABLE [subscription].[account] (
  [idAccount] INTEGER IDENTITY(1, 1) NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [description] NVARCHAR(500) NOT NULL DEFAULT (''),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [deleted] BIT NOT NULL DEFAULT (0)
);

/**
 * @primaryKey pkAccount
 * @keyType Object
 */
ALTER TABLE [subscription].[account]
ADD CONSTRAINT [pkAccount] PRIMARY KEY CLUSTERED ([idAccount]);

/**
 * @index ixAccount_Name
 * @type Search
 * @filter Active accounts only
 */
CREATE NONCLUSTERED INDEX [ixAccount_Name]
ON [subscription].[account]([name])
WHERE [deleted] = 0;
GO

-- File: config/_structure.sql
/**
 * @schema config
 * Configuration schema - system-wide settings and reference data
 */
CREATE SCHEMA [config];
GO

/**
 * @table category Product categories for classification
 * @multitenancy false
 * @softDelete false
 * @alias cat
 */
CREATE TABLE [config].[category] (
  [idCategory] INTEGER IDENTITY(1, 1) NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [description] NVARCHAR(500) NOT NULL DEFAULT (''),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [deleted] BIT NOT NULL DEFAULT (0)
);

/**
 * @primaryKey pkCategory
 * @keyType Object
 */
ALTER TABLE [config].[category]
ADD CONSTRAINT [pkCategory] PRIMARY KEY CLUSTERED ([idCategory]);

/**
 * @index ixCategory_Name
 * @type Search
 * @filter Active categories only
 */
CREATE UNIQUE NONCLUSTERED INDEX [ixCategory_Name]
ON [config].[category]([name])
WHERE [deleted] = 0;

/**
 * @table unitOfMeasure Units of measure for products
 * @multitenancy false
 * @softDelete false
 * @alias uom
 */
CREATE TABLE [config].[unitOfMeasure] (
  [idUnitOfMeasure] INTEGER IDENTITY(1, 1) NOT NULL,
  [code] VARCHAR(10) NOT NULL,
  [name] NVARCHAR(50) NOT NULL,
  [description] NVARCHAR(200) NOT NULL DEFAULT (''),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [deleted] BIT NOT NULL DEFAULT (0)
);

/**
 * @primaryKey pkUnitOfMeasure
 * @keyType Object
 */
ALTER TABLE [config].[unitOfMeasure]
ADD CONSTRAINT [pkUnitOfMeasure] PRIMARY KEY CLUSTERED ([idUnitOfMeasure]);

/**
 * @index uqUnitOfMeasure_Code
 * @type Search
 * @unique true
 * @filter Active units only
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqUnitOfMeasure_Code]
ON [config].[unitOfMeasure]([code])
WHERE [deleted] = 0;

/**
 * @index ixUnitOfMeasure_Name
 * @type Search
 * @filter Active units only
 */
CREATE NONCLUSTERED INDEX [ixUnitOfMeasure_Name]
ON [config].[unitOfMeasure]([name])
WHERE [deleted] = 0;
GO

-- File: functional/_structure.sql
/**
 * @schema functional
 * Functional schema - business logic and operational data
 */
CREATE SCHEMA [functional];
GO

/**
 * @table product Products in inventory
 * @multitenancy true
 * @softDelete true
 * @alias prd
 */
CREATE TABLE [functional].[product] (
  [idProduct] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [idCategory] INTEGER NOT NULL,
  [idUnitOfMeasure] INTEGER NOT NULL,
  [code] VARCHAR(20) NOT NULL,
  [description] NVARCHAR(200) NOT NULL,
  [status] BIT NOT NULL DEFAULT (1),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [deleted] BIT NOT NULL DEFAULT (0)
);

/**
 * @primaryKey pkProduct
 * @keyType Object
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [pkProduct] PRIMARY KEY CLUSTERED ([idProduct]);

/**
 * @foreignKey fkProduct_Account
 * @target subscription.account
 * @tenancy true
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [fkProduct_Account] FOREIGN KEY ([idAccount])
REFERENCES [subscription].[account]([idAccount]);

/**
 * @foreignKey fkProduct_Category
 * @target config.category
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [fkProduct_Category] FOREIGN KEY ([idCategory])
REFERENCES [config].[category]([idCategory]);

/**
 * @foreignKey fkProduct_UnitOfMeasure
 * @target config.unitOfMeasure
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [fkProduct_UnitOfMeasure] FOREIGN KEY ([idUnitOfMeasure])
REFERENCES [config].[unitOfMeasure]([idUnitOfMeasure]);

/**
 * @check chkProduct_Status
 * @enum {0} Inactive
 * @enum {1} Active
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [chkProduct_Status] CHECK ([status] BETWEEN 0 AND 1);

/**
 * @index ixProduct_Account
 * @type ForeignKey
 * @filter Active products only
 */
CREATE NONCLUSTERED INDEX [ixProduct_Account]
ON [functional].[product]([idAccount])
WHERE [deleted] = 0;

/**
 * @index uqProduct_Account_Code
 * @type Search
 * @unique true
 * @filter Active products only
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqProduct_Account_Code]
ON [functional].[product]([idAccount], [code])
WHERE [deleted] = 0;

/**
 * @index ixProduct_Account_Category
 * @type ForeignKey
 * @filter Active products only
 */
CREATE NONCLUSTERED INDEX [ixProduct_Account_Category]
ON [functional].[product]([idAccount], [idCategory])
WHERE [deleted] = 0;

/**
 * @index ixProduct_Account_Status
 * @type Search
 * @filter Active products only
 */
CREATE NONCLUSTERED INDEX [ixProduct_Account_Status]
ON [functional].[product]([idAccount], [status])
WHERE [deleted] = 0;

/**
 * @index ixProduct_Account_Description
 * @type Search
 * @filter Active products only
 */
CREATE NONCLUSTERED INDEX [ixProduct_Account_Description]
ON [functional].[product]([idAccount], [description])
WHERE [deleted] = 0;
GO


-- ============================================
-- DATA
-- Initial data and configuration
-- ============================================

-- File: subscription/_data.sql
/**
 * @load account
 */
INSERT INTO [subscription].[account]
([name], [description])
VALUES
('Default Account', 'Default system account for StockBox');
GO

-- File: config/_data.sql
/**
 * @load category
 */
INSERT INTO [config].[category]
([name], [description])
VALUES
('Electronics', 'Electronic devices and components'),
('Food', 'Food and beverage products'),
('Clothing', 'Apparel and accessories'),
('Tools', 'Hardware and tools'),
('Office Supplies', 'Office and stationery items'),
('Cleaning', 'Cleaning products and supplies'),
('Automotive', 'Automotive parts and accessories'),
('Health', 'Health and personal care products'),
('Sports', 'Sports and fitness equipment'),
('Other', 'Miscellaneous products');

/**
 * @load unitOfMeasure
 */
INSERT INTO [config].[unitOfMeasure]
([code], [name], [description])
VALUES
('UN', 'Unit', 'Individual unit'),
('KG', 'Kilogram', 'Weight in kilograms'),
('L', 'Liter', 'Volume in liters'),
('M', 'Meter', 'Length in meters'),
('M2', 'Square Meter', 'Area in square meters'),
('M3', 'Cubic Meter', 'Volume in cubic meters'),
('BOX', 'Box', 'Box or package'),
('PACK', 'Pack', 'Pack or bundle'),
('DOZEN', 'Dozen', 'Set of 12 units'),
('PAIR', 'Pair', 'Set of 2 units');
GO


-- ============================================
-- STORED PROCEDURES
-- Database stored procedures and functions
-- ============================================

-- File: functional/product/spProductCreate.sql
/**
 * @summary
 * Creates a new product with validation of code uniqueness and required fields
 *
 * @procedure spProductCreate
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - POST /api/v1/internal/product
 *
 * @parameters
 * @param {INT} idAccount
 *   - Required: Yes
 *   - Description: Account identifier
 *
 * @param {INT} idUser
 *   - Required: Yes
 *   - Description: User identifier for audit
 *
 * @param {VARCHAR(20)} code
 *   - Required: Yes
 *   - Description: Product code (3-20 alphanumeric characters)
 *
 * @param {NVARCHAR(200)} description
 *   - Required: Yes
 *   - Description: Product description (5-200 characters)
 *
 * @param {INT} idCategory
 *   - Required: Yes
 *   - Description: Category identifier
 *
 * @param {INT} idUnitOfMeasure
 *   - Required: Yes
 *   - Description: Unit of measure identifier
 *
 * @returns {INT} idProduct - Created product identifier
 *
 * @testScenarios
 * - Valid creation with all required parameters
 * - Duplicate code validation
 * - Invalid category validation
 * - Invalid unit of measure validation
 * - Code format validation
 * - Description length validation
 */
CREATE OR ALTER PROCEDURE [functional].[spProductCreate]
  @idAccount INT,
  @idUser INT,
  @code VARCHAR(20),
  @description NVARCHAR(200),
  @idCategory INT,
  @idUnitOfMeasure INT
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Required parameter validation
   * @throw {parameterRequired}
   */
  IF (@idAccount IS NULL)
  BEGIN
    ;THROW 51000, 'idAccountRequired', 1;
  END;

  IF (@idUser IS NULL)
  BEGIN
    ;THROW 51000, 'idUserRequired', 1;
  END;

  IF (@code IS NULL OR LTRIM(RTRIM(@code)) = '')
  BEGIN
    ;THROW 51000, 'codeRequired', 1;
  END;

  IF (@description IS NULL OR LTRIM(RTRIM(@description)) = '')
  BEGIN
    ;THROW 51000, 'descriptionRequired', 1;
  END;

  IF (@idCategory IS NULL)
  BEGIN
    ;THROW 51000, 'idCategoryRequired', 1;
  END;

  IF (@idUnitOfMeasure IS NULL)
  BEGIN
    ;THROW 51000, 'idUnitOfMeasureRequired', 1;
  END;

  /**
   * @validation Code format validation
   * @throw {codeInvalidFormat}
   */
  IF (LEN(@code) < 3 OR LEN(@code) > 20)
  BEGIN
    ;THROW 51000, 'codeInvalidLength', 1;
  END;

  IF (@code NOT LIKE '%[A-Za-z0-9_-]%' OR @code LIKE '%[^A-Za-z0-9_-]%')
  BEGIN
    ;THROW 51000, 'codeInvalidFormat', 1;
  END;

  /**
   * @validation Description length validation
   * @throw {descriptionInvalidLength}
   */
  IF (LEN(@description) < 5 OR LEN(@description) > 200)
  BEGIN
    ;THROW 51000, 'descriptionInvalidLength', 1;
  END;

  /**
   * @validation Description cannot be only numbers
   * @throw {descriptionOnlyNumbers}
   */
  IF (@description NOT LIKE '%[^0-9]%')
  BEGIN
    ;THROW 51000, 'descriptionOnlyNumbers', 1;
  END;

  /**
   * @validation Category existence validation
   * @throw {categoryDoesntExist}
   */
  IF NOT EXISTS (
    SELECT *
    FROM [config].[category] [cat]
    WHERE [cat].[idCategory] = @idCategory
      AND [cat].[deleted] = 0
  )
  BEGIN
    ;THROW 51000, 'categoryDoesntExist', 1;
  END;

  /**
   * @validation Unit of measure existence validation
   * @throw {unitOfMeasureDoesntExist}
   */
  IF NOT EXISTS (
    SELECT *
    FROM [config].[unitOfMeasure] [uom]
    WHERE [uom].[idUnitOfMeasure] = @idUnitOfMeasure
      AND [uom].[deleted] = 0
  )
  BEGIN
    ;THROW 51000, 'unitOfMeasureDoesntExist', 1;
  END;

  /**
   * @validation Code uniqueness validation
   * @throw {codeAlreadyExists}
   */
  IF EXISTS (
    SELECT *
    FROM [functional].[product] [prd]
    WHERE [prd].[idAccount] = @idAccount
      AND [prd].[code] = @code
      AND [prd].[deleted] = 0
  )
  BEGIN
    ;THROW 51000, 'codeAlreadyExists', 1;
  END;

  BEGIN TRY
    /**
     * @rule {db-multi-tenancy-pattern} Insert with account isolation
     */
    BEGIN TRAN;

      INSERT INTO [functional].[product] (
        [idAccount],
        [idCategory],
        [idUnitOfMeasure],
        [code],
        [description],
        [status],
        [dateCreated],
        [dateModified]
      )
      VALUES (
        @idAccount,
        @idCategory,
        @idUnitOfMeasure,
        @code,
        @description,
        1,
        GETUTCDATE(),
        GETUTCDATE()
      );

      DECLARE @idProduct INT = SCOPE_IDENTITY();

      /**
       * @output {ProductCreated, 1, 1}
       * @column {INT} idProduct - Created product identifier
       */
      SELECT @idProduct AS [idProduct];

    COMMIT TRAN;
  END TRY
  BEGIN CATCH
    ROLLBACK TRAN;
    THROW;
  END CATCH;
END;
GO

-- File: functional/product/spProductDelete.sql
/**
 * @summary
 * Performs soft delete of a product with validation
 *
 * @procedure spProductDelete
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - DELETE /api/v1/internal/product/:id
 *
 * @parameters
 * @param {INT} idAccount
 *   - Required: Yes
 *   - Description: Account identifier
 *
 * @param {INT} idUser
 *   - Required: Yes
 *   - Description: User identifier for audit
 *
 * @param {INT} idProduct
 *   - Required: Yes
 *   - Description: Product identifier
 *
 * @testScenarios
 * - Valid soft delete
 * - Product not found validation
 * - Account isolation validation
 */
CREATE OR ALTER PROCEDURE [functional].[spProductDelete]
  @idAccount INT,
  @idUser INT,
  @idProduct INT
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Required parameter validation
   * @throw {parameterRequired}
   */
  IF (@idAccount IS NULL)
  BEGIN
    ;THROW 51000, 'idAccountRequired', 1;
  END;

  IF (@idUser IS NULL)
  BEGIN
    ;THROW 51000, 'idUserRequired', 1;
  END;

  IF (@idProduct IS NULL)
  BEGIN
    ;THROW 51000, 'idProductRequired', 1;
  END;

  /**
   * @validation Product existence validation
   * @throw {productDoesntExist}
   */
  IF NOT EXISTS (
    SELECT *
    FROM [functional].[product] [prd]
    WHERE [prd].[idProduct] = @idProduct
      AND [prd].[idAccount] = @idAccount
      AND [prd].[deleted] = 0
  )
  BEGIN
    ;THROW 51000, 'productDoesntExist', 1;
  END;

  BEGIN TRY
    /**
     * @rule {db-soft-delete-pattern} Soft delete with account isolation
     */
    BEGIN TRAN;

      UPDATE [functional].[product]
      SET
        [deleted] = 1,
        [dateModified] = GETUTCDATE()
      WHERE [idProduct] = @idProduct
        AND [idAccount] = @idAccount
        AND [deleted] = 0;

      /**
       * @output {ProductDeleted, 1, 1}
       * @column {INT} idProduct - Deleted product identifier
       */
      SELECT @idProduct AS [idProduct];

    COMMIT TRAN;
  END TRY
  BEGIN CATCH
    ROLLBACK TRAN;
    THROW;
  END CATCH;
END;
GO

-- File: functional/product/spProductGet.sql
/**
 * @summary
 * Retrieves detailed information for a specific product
 *
 * @procedure spProductGet
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/internal/product/:id
 *
 * @parameters
 * @param {INT} idAccount
 *   - Required: Yes
 *   - Description: Account identifier
 *
 * @param {INT} idProduct
 *   - Required: Yes
 *   - Description: Product identifier
 *
 * @testScenarios
 * - Valid product retrieval
 * - Product not found validation
 * - Account isolation validation
 */
CREATE OR ALTER PROCEDURE [functional].[spProductGet]
  @idAccount INT,
  @idProduct INT
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Required parameter validation
   * @throw {parameterRequired}
   */
  IF (@idAccount IS NULL)
  BEGIN
    ;THROW 51000, 'idAccountRequired', 1;
  END;

  IF (@idProduct IS NULL)
  BEGIN
    ;THROW 51000, 'idProductRequired', 1;
  END;

  /**
   * @validation Product existence validation
   * @throw {productDoesntExist}
   */
  IF NOT EXISTS (
    SELECT *
    FROM [functional].[product] [prd]
    WHERE [prd].[idProduct] = @idProduct
      AND [prd].[idAccount] = @idAccount
      AND [prd].[deleted] = 0
  )
  BEGIN
    ;THROW 51000, 'productDoesntExist', 1;
  END;

  /**
   * @rule {db-multi-tenancy-pattern} Query with account isolation
   */
  /**
   * @output {ProductDetail, 1, n}
   * @column {INT} idProduct - Product identifier
   * @column {VARCHAR} code - Product code
   * @column {NVARCHAR} description - Product description
   * @column {BIT} status - Product status
   * @column {DATETIME2} dateCreated - Creation date
   * @column {DATETIME2} dateModified - Last modification date
   * @column {INT} idCategory - Category identifier
   * @column {NVARCHAR} categoryName - Category name
   * @column {INT} idUnitOfMeasure - Unit of measure identifier
   * @column {VARCHAR} unitOfMeasureCode - Unit of measure code
   * @column {NVARCHAR} unitOfMeasureName - Unit of measure name
   */
  SELECT
    [prd].[idProduct],
    [prd].[code],
    [prd].[description],
    [prd].[status],
    [prd].[dateCreated],
    [prd].[dateModified],
    [cat].[idCategory],
    [cat].[name] AS [categoryName],
    [uom].[idUnitOfMeasure],
    [uom].[code] AS [unitOfMeasureCode],
    [uom].[name] AS [unitOfMeasureName]
  FROM [functional].[product] [prd]
    JOIN [config].[category] [cat] ON ([cat].[idCategory] = [prd].[idCategory])
    JOIN [config].[unitOfMeasure] [uom] ON ([uom].[idUnitOfMeasure] = [prd].[idUnitOfMeasure])
  WHERE [prd].[idProduct] = @idProduct
    AND [prd].[idAccount] = @idAccount
    AND [prd].[deleted] = 0;
END;
GO

-- File: functional/product/spProductList.sql
/**
 * @summary
 * Lists products with filtering, sorting, and pagination support
 *
 * @procedure spProductList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/internal/product
 *
 * @parameters
 * @param {INT} idAccount
 *   - Required: Yes
 *   - Description: Account identifier
 *
 * @param {VARCHAR(20)} filterCode
 *   - Required: No
 *   - Description: Filter by product code (partial match)
 *
 * @param {NVARCHAR(200)} filterDescription
 *   - Required: No
 *   - Description: Filter by description (partial match)
 *
 * @param {INT} filterIdCategory
 *   - Required: No
 *   - Description: Filter by category identifier
 *
 * @param {BIT} filterStatus
 *   - Required: No
 *   - Description: Filter by status (null = all, 0 = inactive, 1 = active)
 *
 * @param {VARCHAR(50)} sortBy
 *   - Required: No
 *   - Description: Sort field (code, description, category, dateCreated)
 *
 * @param {VARCHAR(4)} sortDirection
 *   - Required: No
 *   - Description: Sort direction (asc, desc)
 *
 * @param {INT} page
 *   - Required: No
 *   - Description: Page number (default 1)
 *
 * @param {INT} pageSize
 *   - Required: No
 *   - Description: Items per page (default 10)
 *
 * @testScenarios
 * - List all products without filters
 * - Filter by code partial match
 * - Filter by description partial match
 * - Filter by category
 * - Filter by status
 * - Multiple filters combined
 * - Sort by different fields
 * - Pagination navigation
 */
CREATE OR ALTER PROCEDURE [functional].[spProductList]
  @idAccount INT,
  @filterCode VARCHAR(20) = NULL,
  @filterDescription NVARCHAR(200) = NULL,
  @filterIdCategory INT = NULL,
  @filterStatus BIT = NULL,
  @sortBy VARCHAR(50) = 'code',
  @sortDirection VARCHAR(4) = 'asc',
  @page INT = 1,
  @pageSize INT = 10
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Required parameter validation
   * @throw {parameterRequired}
   */
  IF (@idAccount IS NULL)
  BEGIN
    ;THROW 51000, 'idAccountRequired', 1;
  END;

  /**
   * @validation Pagination validation
   * @throw {invalidPagination}
   */
  IF (@page < 1)
  BEGIN
    ;THROW 51000, 'pageNumberMustBeGreaterThanZero', 1;
  END;

  IF (@pageSize NOT IN (10, 25, 50, 100))
  BEGIN
    ;THROW 51000, 'invalidPageSize', 1;
  END;

  /**
   * @validation Sort direction validation
   * @throw {invalidSortDirection}
   */
  IF (@sortDirection NOT IN ('asc', 'desc'))
  BEGIN
    SET @sortDirection = 'asc';
  END;

  /**
   * @validation Sort field validation
   * @throw {invalidSortField}
   */
  IF (@sortBy NOT IN ('code', 'description', 'category', 'dateCreated'))
  BEGIN
    SET @sortBy = 'code';
  END;

  DECLARE @offset INT = (@page - 1) * @pageSize;

  /**
   * @rule {db-multi-tenancy-pattern} Query with account isolation and filtering
   */
  WITH [FilteredProducts] AS (
    SELECT
      [prd].[idProduct],
      [prd].[code],
      [prd].[description],
      [prd].[status],
      [prd].[dateCreated],
      [prd].[dateModified],
      [cat].[idCategory],
      [cat].[name] AS [categoryName],
      [uom].[idUnitOfMeasure],
      [uom].[code] AS [unitOfMeasureCode],
      [uom].[name] AS [unitOfMeasureName]
    FROM [functional].[product] [prd]
      JOIN [config].[category] [cat] ON ([cat].[idCategory] = [prd].[idCategory])
      JOIN [config].[unitOfMeasure] [uom] ON ([uom].[idUnitOfMeasure] = [prd].[idUnitOfMeasure])
    WHERE [prd].[idAccount] = @idAccount
      AND [prd].[deleted] = 0
      AND (@filterCode IS NULL OR [prd].[code] LIKE '%' + @filterCode + '%')
      AND (@filterDescription IS NULL OR [prd].[description] LIKE '%' + @filterDescription + '%')
      AND (@filterIdCategory IS NULL OR [prd].[idCategory] = @filterIdCategory)
      AND (@filterStatus IS NULL OR [prd].[status] = @filterStatus)
  )
  /**
   * @output {ProductList, n, n}
   * @column {INT} idProduct - Product identifier
   * @column {VARCHAR} code - Product code
   * @column {NVARCHAR} description - Product description
   * @column {BIT} status - Product status
   * @column {DATETIME2} dateCreated - Creation date
   * @column {DATETIME2} dateModified - Last modification date
   * @column {INT} idCategory - Category identifier
   * @column {NVARCHAR} categoryName - Category name
   * @column {INT} idUnitOfMeasure - Unit of measure identifier
   * @column {VARCHAR} unitOfMeasureCode - Unit of measure code
   * @column {NVARCHAR} unitOfMeasureName - Unit of measure name
   */
  SELECT
    [idProduct],
    [code],
    [description],
    [status],
    [dateCreated],
    [dateModified],
    [idCategory],
    [categoryName],
    [idUnitOfMeasure],
    [unitOfMeasureCode],
    [unitOfMeasureName]
  FROM [FilteredProducts]
  ORDER BY
    CASE WHEN @sortBy = 'code' AND @sortDirection = 'asc' THEN [code] END ASC,
    CASE WHEN @sortBy = 'code' AND @sortDirection = 'desc' THEN [code] END DESC,
    CASE WHEN @sortBy = 'description' AND @sortDirection = 'asc' THEN [description] END ASC,
    CASE WHEN @sortBy = 'description' AND @sortDirection = 'desc' THEN [description] END DESC,
    CASE WHEN @sortBy = 'category' AND @sortDirection = 'asc' THEN [categoryName] END ASC,
    CASE WHEN @sortBy = 'category' AND @sortDirection = 'desc' THEN [categoryName] END DESC,
    CASE WHEN @sortBy = 'dateCreated' AND @sortDirection = 'asc' THEN [dateCreated] END ASC,
    CASE WHEN @sortBy = 'dateCreated' AND @sortDirection = 'desc' THEN [dateCreated] END DESC
  OFFSET @offset ROWS
  FETCH NEXT @pageSize ROWS ONLY;

  /**
   * @output {TotalCount, 1, 1}
   * @column {INT} total - Total number of products matching filters
   */
  SELECT COUNT(*) AS [total]
  FROM [functional].[product] [prd]
  WHERE [prd].[idAccount] = @idAccount
    AND [prd].[deleted] = 0
    AND (@filterCode IS NULL OR [prd].[code] LIKE '%' + @filterCode + '%')
    AND (@filterDescription IS NULL OR [prd].[description] LIKE '%' + @filterDescription + '%')
    AND (@filterIdCategory IS NULL OR [prd].[idCategory] = @filterIdCategory)
    AND (@filterStatus IS NULL OR [prd].[status] = @filterStatus);
END;
GO

-- File: functional/product/spProductUpdate.sql
/**
 * @summary
 * Updates an existing product with validation
 *
 * @procedure spProductUpdate
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - PUT /api/v1/internal/product/:id
 *
 * @parameters
 * @param {INT} idAccount
 *   - Required: Yes
 *   - Description: Account identifier
 *
 * @param {INT} idUser
 *   - Required: Yes
 *   - Description: User identifier for audit
 *
 * @param {INT} idProduct
 *   - Required: Yes
 *   - Description: Product identifier
 *
 * @param {NVARCHAR(200)} description
 *   - Required: Yes
 *   - Description: Product description (5-200 characters)
 *
 * @param {INT} idCategory
 *   - Required: Yes
 *   - Description: Category identifier
 *
 * @param {INT} idUnitOfMeasure
 *   - Required: Yes
 *   - Description: Unit of measure identifier
 *
 * @param {BIT} status
 *   - Required: Yes
 *   - Description: Product status (0 = inactive, 1 = active)
 *
 * @testScenarios
 * - Valid update with all parameters
 * - Product not found validation
 * - Invalid category validation
 * - Invalid unit of measure validation
 * - Description length validation
 * - Status validation
 */
CREATE OR ALTER PROCEDURE [functional].[spProductUpdate]
  @idAccount INT,
  @idUser INT,
  @idProduct INT,
  @description NVARCHAR(200),
  @idCategory INT,
  @idUnitOfMeasure INT,
  @status BIT
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Required parameter validation
   * @throw {parameterRequired}
   */
  IF (@idAccount IS NULL)
  BEGIN
    ;THROW 51000, 'idAccountRequired', 1;
  END;

  IF (@idUser IS NULL)
  BEGIN
    ;THROW 51000, 'idUserRequired', 1;
  END;

  IF (@idProduct IS NULL)
  BEGIN
    ;THROW 51000, 'idProductRequired', 1;
  END;

  IF (@description IS NULL OR LTRIM(RTRIM(@description)) = '')
  BEGIN
    ;THROW 51000, 'descriptionRequired', 1;
  END;

  IF (@idCategory IS NULL)
  BEGIN
    ;THROW 51000, 'idCategoryRequired', 1;
  END;

  IF (@idUnitOfMeasure IS NULL)
  BEGIN
    ;THROW 51000, 'idUnitOfMeasureRequired', 1;
  END;

  IF (@status IS NULL)
  BEGIN
    ;THROW 51000, 'statusRequired', 1;
  END;

  /**
   * @validation Description length validation
   * @throw {descriptionInvalidLength}
   */
  IF (LEN(@description) < 5 OR LEN(@description) > 200)
  BEGIN
    ;THROW 51000, 'descriptionInvalidLength', 1;
  END;

  /**
   * @validation Description cannot be only numbers
   * @throw {descriptionOnlyNumbers}
   */
  IF (@description NOT LIKE '%[^0-9]%')
  BEGIN
    ;THROW 51000, 'descriptionOnlyNumbers', 1;
  END;

  /**
   * @validation Product existence validation
   * @throw {productDoesntExist}
   */
  IF NOT EXISTS (
    SELECT *
    FROM [functional].[product] [prd]
    WHERE [prd].[idProduct] = @idProduct
      AND [prd].[idAccount] = @idAccount
      AND [prd].[deleted] = 0
  )
  BEGIN
    ;THROW 51000, 'productDoesntExist', 1;
  END;

  /**
   * @validation Category existence validation
   * @throw {categoryDoesntExist}
   */
  IF NOT EXISTS (
    SELECT *
    FROM [config].[category] [cat]
    WHERE [cat].[idCategory] = @idCategory
      AND [cat].[deleted] = 0
  )
  BEGIN
    ;THROW 51000, 'categoryDoesntExist', 1;
  END;

  /**
   * @validation Unit of measure existence validation
   * @throw {unitOfMeasureDoesntExist}
   */
  IF NOT EXISTS (
    SELECT *
    FROM [config].[unitOfMeasure] [uom]
    WHERE [uom].[idUnitOfMeasure] = @idUnitOfMeasure
      AND [uom].[deleted] = 0
  )
  BEGIN
    ;THROW 51000, 'unitOfMeasureDoesntExist', 1;
  END;

  BEGIN TRY
    /**
     * @rule {db-multi-tenancy-pattern} Update with account isolation
     */
    BEGIN TRAN;

      UPDATE [functional].[product]
      SET
        [description] = @description,
        [idCategory] = @idCategory,
        [idUnitOfMeasure] = @idUnitOfMeasure,
        [status] = @status,
        [dateModified] = GETUTCDATE()
      WHERE [idProduct] = @idProduct
        AND [idAccount] = @idAccount
        AND [deleted] = 0;

      /**
       * @output {ProductUpdated, 1, 1}
       * @column {INT} idProduct - Updated product identifier
       */
      SELECT @idProduct AS [idProduct];

    COMMIT TRAN;
  END TRY
  BEGIN CATCH
    ROLLBACK TRAN;
    THROW;
  END CATCH;
END;
GO


-- ============================================
-- Migration completed successfully
-- ============================================

PRINT 'Migration completed successfully!';
GO
