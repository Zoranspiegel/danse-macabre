# API Backend Specification

## Requirements

### Requirement: GET /products endpoint

The system MUST provide an endpoint to retrieve all products.

The API endpoint `GET /api/products` SHALL:
- Return HTTP 200 on success
- Return JSON array of products
- Each product MUST include: id, name, slug, description, price, imageUrl, categoryId, category (nested object with id, name, slug)
- Support optional query parameter `categorySlug` to filter by category
- Return empty array if no products exist

#### Scenario: Get all products

- GIVEN products exist in database
- WHEN calling GET /api/products
- THEN returns array of all products with category data

#### Scenario: Filter by category

- GIVEN products exist in database
- WHEN calling GET /api/products?categorySlug=tarot
- THEN returns only products from "tarot" category

#### Scenario: No products exist

- GIVEN database has no products
- WHEN calling GET /api/products
- THEN returns empty array []

### Requirement: GET /products/:slug endpoint

The system MUST provide an endpoint to retrieve a single product by slug.

The API endpoint `GET /api/products/:slug` SHALL:
- Return HTTP 200 with product object if found
- Return HTTP 404 with error message if not found
- Include full category data in response

#### Scenario: Get existing product

- GIVEN product with slug "tarot-egycio" exists
- WHEN calling GET /api/products/tarot-egycio
- THEN returns product object with category

#### Scenario: Product not found

- GIVEN product with slug "nonexistent" does not exist
- WHEN calling GET /api/products/nonexistent
- THEN returns HTTP 404 with "Product not found"

### Requirement: GET /categories endpoint

The system MUST provide an endpoint to retrieve all categories.

The API endpoint `GET /api/categories` SHALL:
- Return HTTP 200 on success
- Return JSON array of categories
- Each category MUST include: id, name, slug, description
- Return empty array if no categories exist

#### Scenario: Get all categories

- GIVEN categories exist in database
- WHEN calling GET /api/categories
- THEN returns array of all categories sorted by name

### Requirement: GET /categories/:slug endpoint

The system MUST provide an endpoint to retrieve a single category by slug, optionally with its products.

The API endpoint `GET /api/categories/:slug` SHALL:
- Return HTTP 200 with category object if found
- Return HTTP 404 with error message if not found
- Support optional query parameter `includeProducts=true`
- When includeProducts is true, include products array in response

#### Scenario: Get category without products

- GIVEN category with slug "cristales" exists
- WHEN calling GET /api/categories/cristales
- THEN returns category object without products

#### Scenario: Get category with products

- GIVEN category "cristales" with products exists
- WHEN calling GET /api/categories/cristales?includeProducts=true
- THEN returns category object with products array

### Requirement: POST endpoints (Future)

NOTE: POST endpoints for creating categories and products are OUT OF SCOPE for this MVP.

However, when POST endpoints are implemented in the future, they MUST handle duplicate slugs:
- When creating a category with an existing slug: return HTTP 400 "Slug already exists"
- When creating a product with an existing slug: return HTTP 400 "Slug already exists"

The database will enforce uniqueness at the constraint level.
