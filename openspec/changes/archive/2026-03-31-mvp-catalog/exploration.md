## Exploration: MVP Product Catalog for Esotericism Shop

### Current State
El proyecto está vacío — acabamos de inicializar SDD con Next.js + Nest.js + PostgreSQL + Prisma. No hay código aún.

### Affected Areas
- `/api` — Backend Nest.js: necesita modelos Prisma, controllers, services
- `/client` — Frontend Next.js: necesita páginas para catálogo y categorías
- Base de datos PostgreSQL: schema con Products y Categories

### Approaches

1. **Minimal MVP (Recomendado)** — Solo catálogo con datos hardcodeados inicialmente
   - Prisma schema básico: `Product` y `Category`
   - API REST simple en Nest.js
   - UI básica en Next.js
   - Pros: Rápido de implementar, validamos el dominio
   - Cons: Sin datos dinámicos al principio
   - Effort: Low

2. **Full Data MVP** — Desde el día 1 con seed de datos reales
   - Schema completo con todos los campos necesarios
   - Seed script con productos de ejemplo (esoterismo)
   - Pros: Más realista, permite testing completo
   - Cons: Más tiempo inicial
   - Effort: Medium

3. **Backend-First** — Empezar por la API sin frontend
   - Crear API completa primero
   - Frontend después consume la API
   - Pros: API testeable independientemente
   - Cons: Sin UI para validar hasta después
   - Effort: Medium

### Recommendation
**Approach #1 (Minimal MVP)** — Empezar liviano:
- Schema Prisma básico: `id`, `name`, `description`, `price`, `imageUrl`, `categoryId`
- Una ruta API `/products` y `/categories`
- Página principal con grid de productos
- Categorías como filtro lateral

### Data Model Proposal (Prisma)

```prisma
model Category {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  description String?
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Product {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  description String?
  price       Decimal
  imageUrl    String?
  category    Category  @relation(fields: [categoryId], references: [id])
  categoryId  String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### API Endpoints Proposal
- `GET /api/products` — List all products
- `GET /api/products/:slug` — Get single product
- `GET /api/categories` — List all categories
- `GET /api/categories/:slug` — Get category with products

### Frontend Pages Proposal
- `/` — Home con catálogo completo
- `/category/:slug` — Productos por categoría

### Risks
- Ninguno identificado por ahora — es un MVP simple
- PostgreSQL necesita estar disponible (URL de conexión)

### Ready for Proposal
**YES** — La exploración está lista. El siguiente paso es crear el `proposal` para el primer change: "MVP Product Catalog".
