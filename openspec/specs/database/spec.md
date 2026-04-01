# Database Schema Specification

## Requirements

### Requirement: Category Model

The system MUST store categories with name, slug (unique), description, and timestamps.

The database MUST contain a `Category` table with the following fields:
- `id`: UUID primary key
- `name`: String, required
- `slug`: String, unique, required
- `description`: String, optional
- `createdAt`: DateTime, auto-managed
- `updatedAt`: DateTime, auto-managed

#### Scenario: Create category

- GIVEN a valid category input (name, slug)
- WHEN creating a new category
- THEN the category is stored with generated id and timestamps

#### Scenario: Query categories

- GIVEN categories exist in database
- WHEN requesting all categories
- THEN returns list ordered by name ascending

### Requirement: Product Model

The system MUST store products with name, slug (unique), description, price, imageUrl, and relation to category.

The database MUST contain a `Product` table with the following fields:
- `id`: UUID primary key
- `name`: String, required
- `slug`: String, unique, required
- `description`: String, optional
- `price`: Decimal, required, positive
- `imageUrl`: String, optional
- `categoryId`: UUID foreign key to Category
- `createdAt`: DateTime, auto-managed
- `updatedAt`: DateTime, auto-managed

#### Scenario: Create product

- GIVEN a valid product input with categoryId
- WHEN creating a new product
- THEN the product is stored linked to the category

#### Scenario: Query products by category

- GIVEN products exist in database with categories
- WHEN requesting products filtered by categoryId
- THEN returns only products belonging to that category

### Requirement: Slug Uniqueness Constraint

The system MUST enforce unique slugs for both categories and products.

The database MUST reject duplicate slugs with a clear constraint violation.

#### Scenario: Create category with duplicate slug

- GIVEN category with slug "tarot" already exists
- WHEN attempting to create another category with slug "tarot"
- THEN database rejects the operation with a unique constraint violation
- AND the API returns HTTP 400 with error message "Slug already exists"

#### Scenario: Create product with duplicate slug

- GIVEN product with slug "tarot-egycio" already exists
- WHEN attempting to create another product with slug "tarot-egycio"
- THEN database rejects the operation with a unique constraint violation
- AND the API returns HTTP 400 with error message "Slug already exists"

### Requirement: Seed Data

The system MUST populate the database with initial categories and products related to esotericism.

The seed script MUST create at least 5 categories:
- Veladoras y Sahumerios
- Tarot y Adivinación
- Cristales y Piedras
- Amuletos y Talismanes
- Libros y Manuales

The seed script MUST create at least 20 products distributed across categories.

#### Scenario: Run seed script

- GIVEN database is empty
- WHEN running the seed script
- THEN database contains 5 categories and 20+ products

#### Scenario: Seed is idempotent

- GIVEN database already has data
- WHEN running the seed script again
- THEN data is upserted (no duplicates)
