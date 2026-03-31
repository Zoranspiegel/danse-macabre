# Proposal: MVP Product Catalog

## Intent

Crear el primer MVP del e-commerce "Danse Macabre" con un catálogo de productos funcionales y datos reales en base de datos. El objetivo es validar el dominio (esoterismo) y la arquitectura técnica (Next.js + Nest.js + Prisma) antes de agregar features de e-commerce.

## Scope

### In Scope
- Schema Prisma con modelos `Category` y `Product`
- API REST en Nest.js para listar productos y categorías
- Seed script con 20+ productos de esoterismo
- Frontend Next.js con página de catálogo
- Página de detalle de producto

### Out of Scope
- Carrito de compras
- Checkout/pago
- Autenticación de usuarios
- Admin panel
- Búsqueda avanzada

## Approach

Minimal MVP con datos en DB:
1. Schema Prisma básico con relaciones
2. API REST simple (GET endpoints)
3. Seed script populate DB con productos de esoterismo
4. UI básica con grid de productos

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `/api` | New | Nest.js backend con Prisma |
| `/client` | New | Next.js frontend |
| Database | New | PostgreSQL con Products y Categories |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| PostgreSQL no disponible | Medium | Usar variable DATABASE_URL, fallback a SQLite para dev local |
| Seed data insuficiente | Low | Crear variety de categorías y productos |

## Rollback Plan

1. Revertir commits del feature branch
2. Eliminar tablas `Product` y `Category` de la DB
3. Eliminar seed script
4. Código queda en branch, se puede discardear

## Dependencies

- PostgreSQL database URL configurada
- Node.js 20+

## Success Criteria

- [ ] `/api/products` devuelve lista de productos desde DB
- [ ] `/api/categories` devuelve lista de categorías
- [ ] Frontend muestra grid de productos
- [ ] Seed script pobló la DB con datos de esoterismo
- [ ] Tests unitarios pasando (TDD Strict Mode)
