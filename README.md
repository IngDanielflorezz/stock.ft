# Stock.FT

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma" alt="Prisma 7" />
  <img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite" alt="SQLite" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/shadcn/ui-latest-000000?style=flat-square" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License" />
</p>

<p align="center">
  <strong>Sistema de control de inventario inteligente para pequeños negocios.</strong>
  <br />
  Moderno, rápido y fácil de usar. Diseñado para crecer contigo.
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#arquitectura">Arquitectura</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#empezar">Empezar</a> ·
  <a href="#roadmap">Roadmap</a>
</p>

---

## ✨ Features

| Feature | Descripción |
|---------|-------------|
| **Gestión de productos** | CRUD completo con SKU, código de barras, precios y stock |
| **Control de movimientos** | Registro de entradas y salidas con trazabilidad |
| **Alertas de stock bajo** | Notificaciones visuales cuando el stock está por debajo del mínimo |
| **Dashboard** | Métricas clave: total productos, movimientos, stock bajo |
| **Multi-usuario** | Cada negocio con su propia cuenta segura |
| **Autenticación** | Login/Register con NextAuth + credenciales |
| **Responsive** | Funciona en PC, tablet y celular |
| **PWA-ready** | Instalable como app en el celular |

## 🏗️ Arquitectura

```
stock.ft/
├── src/
│   ├── modules/              ← Microservicios lógicos (Clean Architecture)
│   │   ├── auth/             ← Autenticación y usuarios
│   │   │   ├── domain/       ←   Entidades, interfaces
│   │   │   ├── application/  ←   Casos de uso
│   │   │   └── infrastructure/←  Implementaciones (Prisma)
│   │   ├── product/          ← Gestión de inventario
│   │   ├── movement/         ← Movimientos de stock
│   │   └── dashboard/        ← Métricas del negocio
│   ├── shared/               ← Kernel compartido
│   │   ├── domain/           ←   BaseEntity, Result<T>, errores
│   │   └── infrastructure/   ←   Prisma adapter, session
│   ├── app/                  ← Next.js App Router (solo orquestación)
│   ├── components/           ← UI components (shadcn/ui)
│   └── lib/                  ← Config (NextAuth)
├── prisma/                   ← Schema + migraciones SQLite
└── proxy.ts                  ← Middleware (Next.js 16)
```

### Patrones de diseño implementados

| Patrón | Uso | Beneficio |
|--------|-----|-----------|
| **Repository** | `IProductRepository` → `PrismaProductRepository` | Desacopla BD de la lógica de negocio |
| **Service Layer** | `ProductService`, `MovementService` | Centraliza reglas de negocio |
| **Result Pattern** | `Result<T>.ok() / .fail()` | Evita excepciones, tipado seguro |
| **Use Case** | `RegisterUseCase` | Cada operación es un objeto |
| **Dependency Injection** | Módulos exportan servicios ya instanciados | Fácil de testear y reemplazar |

## 🛠️ Tech Stack

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 16 | Framework full-stack con App Router |
| **TypeScript** | 5 | Tipado estático |
| **Prisma** | 7 | ORM con driver adapter para SQLite |
| **SQLite** | — | Base de datos embebida (sin setup) |
| **NextAuth** | Beta | Autenticación con JWT |
| **Tailwind CSS** | 4 | Estilos utility-first |
| **shadcn/ui** | Latest | Componentes accesibles y modernos |
| **Lucide** | Latest | Iconos SVG |

## 🚀 Empezar

### Prerrequisitos

- Node.js 20+
- npm 10+

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/IngDanielflorezz/stock.ft.git
cd stock.ft

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar migraciones de la base de datos
npx prisma migrate dev

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y crea tu cuenta.

### Comandos útiles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm start          # Servidor de producción
npx prisma studio  # Editor visual de BD
npm run lint       # Linter
```

## 📈 Roadmap

- [x] CRUD de productos
- [x] Control de movimientos (entradas/salidas)
- [x] Dashboard con métricas
- [x] Autenticación multi-usuario
- [ ] Escáner de código de barras (cámara)
- [ ] Importar/Exportar Excel
- [ ] Planes de suscripción (Stripe)
- [ ] Notificaciones vía WhatsApp
- [ ] Versión PWA instalable
- [ ] App mobile nativa (React Native)

## 🤝 Contribuir

Este proyecto está en fase activa de desarrollo. Si tienes ideas o sugerencias, abre un issue o PR.

## 📄 Licencia

MIT © [IngDanielflorezz](https://github.com/IngDanielflorezz)

---

<p align="center">
  <sub>Built with ❤️ by <a href="https://github.com/IngDanielflorezz">@IngDanielflorezz</a></sub>
</p>
