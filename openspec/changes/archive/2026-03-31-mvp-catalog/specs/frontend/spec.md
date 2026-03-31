# Delta for Frontend

## ADDED Requirements

### Requirement: Product Catalog Page

The system MUST display a product catalog page at the root URL (`/`).

The catalog page SHALL:
- Show a grid of all products
- Each product card MUST display: image, name, price, category name
- Products without image MUST show a placeholder
- Page MUST handle loading state
- Page MUST handle empty state (no products)

#### Scenario: Display product grid

- GIVEN products exist in database
- WHEN visiting the home page
- THEN displays grid of product cards

#### Scenario: Empty catalog

- GIVEN no products in database
- WHEN visiting the home page
- THEN displays "No products available" message

#### Scenario: Loading state

- GIVEN products are being fetched
- WHEN page is loading
- THEN displays loading indicator

### Requirement: Product Detail Page

The system MUST display product details on a dedicated page.

The product detail page at `/product/:slug` SHALL:
- Display product image (or placeholder)
- Display product name, description, price
- Display category name as clickable link
- Show "Product not found" for non-existent products

#### Scenario: View product detail

- GIVEN product "tarot-egycio" exists
- WHEN visiting /product/tarot-egycio
- THEN displays full product information

#### Scenario: Non-existent product

- GIVEN product "nonexistent" does not exist
- WHEN visiting /product/nonexistent
- THEN displays "Product not found" message

### Requirement: Category Filter

The system MUST allow filtering products by category.

The category filter SHALL:
- Display category list in sidebar or header
- Clicking a category filters the product grid
- Show all products when "All" is selected
- Update URL with category slug

#### Scenario: Filter by category

- GIVEN multiple categories with products exist
- WHEN clicking "Tarot y Adivinación" category
- THEN displays only products from that category

#### Scenario: Clear filter

- GIVEN products are filtered by category
- WHEN clicking "All" or clearing filter
- THEN displays all products again
