# Tasks: MVP Product Catalog

## Phase 1: Infrastructure

- [ ] 1.1 Crear `/api` con Nest.js + Prisma: `cd api && nest new . --package-manager pnpm`
- [ ] 1.2 Instalar Prisma en `/api`: `pnpm add prisma @prisma/client`
- [ ] 1.3 Inicializar Prisma: `pnpm prisma init`
- [ ] 1.4 Crear `/client` con Next.js: `npx create-next-app@latest client --typescript --tailwind --eslint --app --src-dir --no-import-alias`
- [ ] 1.5 Instalar TanStack Query en `/client`: `pnpm add @tanstack/react-query`
- [ ] 1.6 Instalar Zustand en `/client`: `pnpm add zustand`
- [ ] 1.7 Configurar DATABASE_URL en `/api/.env`
- [ ] 1.8 Configurar NEXT_PUBLIC_API_URL en `/client/.env.local`

## Phase 2: Backend API

- [ ] 2.1 Crear schema Prisma: `/api/prisma/schema.prisma` con modelos Category y Product
- [ ] 2.2 Generar Prisma client: `cd api && pnpm prisma generate`
- [ ] 2.3 Crear PrismaService: `/api/src/prisma/prisma.service.ts`
- [ ] 2.4 Crear CategoriesModule: `/api/src/categories/categories.module.ts`
- [ ] 2.5 Crear CategoriesService: `/api/src/categories/categories.service.ts` con findAll y findOne
- [ ] 2.6 Crear CategoriesController: `/api/src/categories/categories.controller.ts` con GET /:slug
- [ ] 2.7 Crear ProductsModule: `/api/src/products/products.module.ts`
- [ ] 2.8 Crear ProductsService: `/api/src/products/products.service.ts` con findAll y findOne
- [ ] 2.9 Crear ProductsController: `/api/src/products/products.controller.ts` con GET /:slug
- [ ] 2.10 Configurar CORS en `/api/src/main.ts` con ALLOWED_ORIGIN env var
- [ ] 2.11 Probar API endpoints con curl/postman
- [ ] 2.12 Crear seed script: `/api/prisma/seed.ts` con 5 categorías y 20+ productos de esoterismo

## Phase 3: Frontend

- [ ] 3.1 Crear tipos TypeScript: `/client/src/types/index.ts` (Product, Category)
- [ ] 3.2 Crear api client: `/client/src/lib/api.ts` con fetch functions
- [ ] 3.3 Configurar QueryClientProvider: `/client/src/providers/QueryProvider.tsx`
- [ ] 3.4 Wrap app con QueryProvider: `/client/src/app/layout.tsx`
- [ ] 3.5 Crear store Zustand: `/client/src/store/index.ts`
- [ ] 3.6 Crear componente ProductCard: `/client/src/components/ProductCard.tsx`
- [ ] 3.7 Crear componente CategoryFilter: `/client/src/components/CategoryFilter.tsx`
- [ ] 3.8 Crear página home: `/client/src/app/page.tsx` con grid de productos
- [ ] 3.9 Crear página producto: `/client/src/app/product/[slug]/page.tsx`
- [ ] 3.10 Conectar con TanStack Query (useQuery)
- [ ] 3.11 Agregar Tailwind styles básicos

## Phase 4: Testing

- [ ] 4.1 Tests unitarios CategoriesService
- [ ] 4.2 Tests unitarios ProductsService
- [ ] 4.3 Tests integración CategoriesController (GET /categories)
- [ ] 4.4 Tests integración ProductsController (GET /products)
- [ ] 4.5 Verificar escenarios de spec: empty state, 404, filter by category

## Phase 5: Cleanup

- [ ] 5.1 Run `pnpm prisma db push` para crear tablas
- [ ] 5.2 Run seed script para populate DB
- [ ] 5.3 Verificar que `/api/products` devuelve datos
- [ ] 5.4 Verificar que frontend muestra productos
- [ ] 5.5 Commitear con conventional commits

## Implementation Order

1. **Phase 1** debe completarse antes que todo (dependencias instaladas)
2. **Phase 2** es independiente del Phase 3 (API puede testearse por separado)
3. **Phase 3** depende de Phase 2 (necesita API corriendo)
4. **Phase 4** puede empezar cuando Phase 2 esté listo
5. **Phase 5** es el último paso antes de considerarlo completo

## Recommended Flow

```
Semana 1: Phase 1 + Phase 2 (API completa)
Semana 2: Phase 3 (Frontend)
Semana 3: Phase 4 + Phase 5 (Testing + Verify)
```
