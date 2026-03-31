# Danse Macabre

E-Commerce para tienda de esoterismo.

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Backend**: Nest.js
- **Base de Datos**: PostgreSQL + Prisma
- **Hosting**: Vercel

## Estructura

```
/client    → Next.js frontend
/api       → Nest.js backend
```

## Git Workflow

- `main` ← producción
- `develop` ← integración
- `feature/*` ← desarrollo (PRs via GitHub)

## Getting Started

### Requisitos Previos

- Node.js 20+
- PostgreSQL (local o cloud)
- pnpm / npm / yarn

### Setup

```bash
# Instalar dependencias del cliente
cd client && pnpm install

# Instalar dependencias del API
cd api && pnpm install
```

### Variables de Entorno

Crear archivos `.env` en `/client` y `/api` según corresponda.

---

## SDD - Spec Driven Development

Este proyecto usa SDD para gestión de cambios.

### Fases SDD

1. **Explore** - Investigar dominio y approaches
2. **Propose** - Proposal inicial
3. **Spec** - Especificaciones detalladas
4. **Design** - Diseño técnico
5. **Tasks** - Breakdown de tareas
6. **Apply** - Implementación
7. **Verify** - Validación contra specs
8. **Archive** - Cerrar change

### Persistence

- **Engram**: Memoria persistente
- **Openspec**: Archivos de spec en `openspec/`

---

## Estado del Proyecto

- **Proyecto**: Danse Macabre (danse-macabre)
- **MVP**: Catálogo de productos + categorías
- **Strict TDD**: ✅ Habilitado

---

*Last updated: 2026-03-31*
