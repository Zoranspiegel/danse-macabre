# Design: MVP Product Catalog

## Technical Approach

Minimal MVP con stack Next.js + Nest.js + PostgreSQL + Prisma. El diseño sigue una arquitectura monorepo con `/api` y `/client` separados que se comunican via HTTP.

## Architecture Decisions

### Decision: Prisma Schema Location

**Choice**: Schema Prisma ubicado en `/api/prisma/schema.prisma`
**Alternatives considered**: Schema único compartido, schema en `/client`
**Rationale**: Nest.js usa Prisma natively con `@prisma/client`. El schema vive en el backend donde está la DB.

### Decision: API Communication

**Choice**: Frontend usa fetch a localhost:3001 (API)
**Alternatives considered**: Next.js API routes, tRPC, GraphQL
**Rationale**: Mantiene separación clara de responsabilidades. Nest.js en puerto 3001, Next.js en puerto 3000. Simple y efectivo para MVP.

### Decision: Project Structure

**Choice**: `/api` con estructura Nest.js modular, `/client` con Next.js App Router
**Alternatives considered**: Monorepo con Turbo, workspaces npm
**Rationale**: Dos carpetas independientes permite deployment separado a Vercel (client) y cualquier host Node.js (API). Más simple para empezar.

### Decision: Environment Configuration

**Choice**: Variables de entorno en `.env` tanto en `/api` como `/client`
**Alternatives considered**: Un solo `.env` en root
**Rationale**: Mantiene independencia de configuración. API usa `DATABASE_URL`, Client usa `NEXT_PUBLIC_API_URL`.

### Decision: Data Fetching

**Choice**: TanStack Query (Pure Client) para aprender
**Alternatives considered**: Native fetch + Server Components, SWR
**Rationale**: El usuario quiere aprender TanStack Query. Pure Client es más simple para empezar. Hydration viene después cuando necesitemos SEO.

### Decision: State Management

**Choice**: Zustand desde el día 1
**Alternatives considered**: React State only, Context API
**Rationale**: E-commerce necesita global state para carrito, auth, filtros. Zustand es pequeño (~1kb), simple de aprender, y tiene persist middleware built-in.

### Decision: Styling

**Choice**: Tailwind CSS
**Alternatives considered**: CSS Modules, Styled Components, Vanilla CSS
**Rationale**: Popular, utility-first, facilita desarrollo rápido. Requiere setup pero vale la pena para e-commerce.

### Decision: CORS

**Choice**: Variable de entorno `ALLOWED_ORIGIN`
**Alternatives considered**: Wildcard (*)
**Rationale**: Seguro. Dev: `http://localhost:3000`, Prod: dominio específico. Nunca usar wildcard en producción.

### Decision: API URL Production

**Choice**: Dejar abierto con variable de entorno
**Alternatives considered**: Hardcodear subdomain o subpath ahora
**Rationale**: Depende del hosting (Vercel, Railway, etc). Se decide cuando sepamos dónde deployamos.

## Data Flow

```
┌─────────────────┐     HTTP      ┌─────────────────┐     Prisma     ┌────────────┐
│                 │ ───────────→ │                 │ ───────────→ │            │
│   Next.js       │              │   Nest.js       │               │ PostgreSQL │
│   Client        │ ←─────────── │   API           │ ←─────────── │            │
│   (:3000)       │    JSON      │   (:3001)       │    SQL       │            │
└─────────────────┘              └─────────────────┘              └────────────┘
```

## File Changes

### API (/api)

| File | Action | Description |
|------|--------|-------------|
| `package.json` | Create | Nest.js + Prisma dependencies |
| `prisma/schema.prisma` | Create | Category + Product models |
| `src/app.module.ts` | Create | Root module |
| `src/main.ts` | Create | Entry point |
| `src/prisma/prisma.service.ts` | Create | Prisma client singleton |
| `src/categories/categories.module.ts` | Create | Categories module |
| `src/categories/categories.controller.ts` | Create | GET endpoints |
| `src/categories/categories.service.ts` | Create | Business logic |
| `src/products/products.module.ts` | Create | Products module |
| `src/products/products.controller.ts` | Create | GET endpoints |
| `src/products/products.service.ts` | Create | Business logic |
| `prisma/seed.ts` | Create | Seed script con datos esoterismo |
| `.env` | Create | DATABASE_URL |

### Client (/client)

| File | Action | Description |
|------|--------|-------------|
| `package.json` | Create | Next.js dependencies |
| `src/app/page.tsx` | Create | Homepage con catálogo |
| `src/app/product/[slug]/page.tsx` | Create | Product detail page |
| `src/components/ProductCard.tsx` | Create | Product card component |
| `src/components/CategoryFilter.tsx` | Create | Category filter component |
| `src/lib/api.ts` | Create | API fetch utilities |
| `src/types/index.ts` | Create | TypeScript types |
| `.env.local` | Create | NEXT_PUBLIC_API_URL |

## Interfaces / Contracts

### API Response Types

```typescript
// GET /api/products
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

// GET /api/categories
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

// GET /api/categories/:slug?includeProducts=true
interface CategoryWithProducts extends Category {
  products: Product[];
}
```

### Prisma Schema

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

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| **Unit** | CategoriesService, ProductsService | Jest + Prisma mock |
| **Integration** | API endpoints | Jest + supertest |
| **E2E** | Full flow: view catalog, filter, view detail | Playwright (future) |

Para MVP, nos enfocamos en:
- Tests unitarios de servicios (TDD Strict Mode)
- Tests de integración de endpoints

## Migration / Rollout

No migration requerida para MVP — schema nuevo, DB vacía.

Steps:
1. `cd api && pnpm install && pnpm prisma generate`
2. `cd api && pnpm prisma db push` — crea tablas
3. `cd api && pnpm prisma db seed` — pobla datos
4. `cd api && pnpm start:dev` — corre API en :3001
5. `cd client && pnpm install && pnpm dev` — corre Next.js en :3000

## Open Questions

- [ ] ¿Necesitamos CORS configurado para producción?
- [ ] ¿El API va en el mismo dominio (subpath) o subdomain en producción?
- [ ] ¿Vamos a usar TypeScript strict mode en ambos proyectos?

**Recomendación**: Resolver CORS antes de deploy, los otros pueden esperarse.
