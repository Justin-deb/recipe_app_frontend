Repository Backend: https://github.com/Freddy-Baldizon/RecipeApp
# RecipeApp Frontend

- Fabian Alfaro Sandi
- Justin Estrada Cruz
- Mairon Barquero Salazar
- Carlos Rodriguez Delgado
- Freddy Baldizon Paladino

Frontend de RecipeApp, una aplicación web para descubrir, publicar y guardar recetas de cocina. Construido con React, TypeScript y Vite, y consume la [API de RecipeApp](https://github.com/Freddy-Baldizon/RecipeApp).

## Características

- Explorar y buscar recetas publicadas por la comunidad.
- Ver el detalle de una receta con sus ingredientes y comentarios.
- Registro e inicio de sesión de usuarios.
- Crear nuevas recetas (usuarios autenticados).
- Marcar y quitar recetas de favoritos.
- Perfil de usuario con sus propias recetas.
- Interfaz responsive con navegación adaptada a escritorio y mobile.

## Stack técnico

- **React 19** + **TypeScript**
- **Vite** como bundler y servidor de desarrollo
- **React Router 7** para el ruteo
- **Tailwind CSS 4** para estilos
- **shadcn/ui** + **Radix (Base UI)** para componentes de interfaz
- **React Hook Form** + **Zod** para formularios y validación
- **Cypress** para pruebas end-to-end

## Requisitos previos

- Node.js 18 o superior
- pnpm (recomendado, hay `pnpm-lock.yaml` en el repo) o npm

## Instalación

```bash
git clone git@github.com:Justin-deb/recipe_app_frontend.git
cd recipe_app_frontend
pnpm install
```

## Configuración

La URL de la API se define en `src/lib/constants.ts`:

```ts
export const API_URL: string = 'https://recipe-backend-v9.onrender.com/api';
```

Para apuntar a un backend local, descomentá/ajustá esa constante, por ejemplo:

```ts
export const API_URL: string = 'http://127.0.0.1:3001/api';
```

> Actualmente no se usan variables de entorno; el valor está hardcodeado en ese archivo.

## Scripts disponibles

| Comando         | Descripción                                              |
|-----------------|-----------------------------------------------------------|
| `pnpm dev`      | Levanta el servidor de desarrollo con hot reload          |
| `pnpm build`    | Compila TypeScript y genera el build de producción en `dist/` |
| `pnpm preview`  | Sirve localmente el build de producción                   |
| `pnpm lint`     | Corre ESLint sobre el proyecto                             |

## Pruebas end-to-end

El proyecto usa Cypress para pruebas e2e (carpeta `cypress/`):

```bash
pnpm dlx cypress open   # modo interactivo
pnpm dlx cypress run    # modo headless / CI
```

## Estructura del proyecto

```
src/
├── components/      # Componentes reutilizables (forms, navbar, ui de shadcn, etc.)
├── layouts/          # Layouts de la app (general, autenticación pública/privada)
├── lib/              # Constantes y utilidades
├── pages/            # Páginas/vistas de la aplicación
├── routes/           # Definición de rutas (React Router)
├── services/         # Funciones de acceso a la API (recipe, favorite, user, comment, etc.)
├── types/            # Tipos e interfaces de TypeScript
└── main.tsx          # Punto de entrada de la aplicación
```

## Rutas principales

| Ruta                  | Página            | Acceso              |
|------------------------|--------------------|----------------------|
| `/`                    | Home               | Público              |
| `/recetas`             | Listado de recetas | Público              |
| `/recetas/:id`         | Detalle de receta  | Público              |
| `/login`                | Iniciar sesión     | Solo no autenticados |
| `/register`             | Registro           | Solo no autenticados |
| `/crear`                | Crear receta       | Autenticado          |
| `/favoritos`            | Recetas favoritas  | Autenticado          |
| `/cuenta`               | Perfil de usuario  | Autenticado          |

## Backend

Este frontend consume la API REST de RecipeApp (ASP.NET Core). El repositorio del backend está en: https://github.com/Freddy-Baldizon/RecipeApp
