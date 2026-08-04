# RPGRoll — Documentación (UI)

Sitio de documentación de RPGRoll, hecho con React + Vite + TypeScript + Tailwind CSS v4, componentizado con
componentes propios (sin librerías de UI de terceros). Pensado para ser autocontenido y fácil de mover a otro
repositorio o hostearlo donde sea.

## Desarrollo

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
```

Genera un `dist/` estático (HTML/CSS/JS, sin backend) que se puede servir desde cualquier lado — Nginx, GitHub
Pages, Netlify, Vercel, o simplemente abriendo `dist/index.html` directamente (el build usa rutas relativas,
`base: "./"` en `vite.config.ts`).

```bash
npm run preview   # sirve el build de dist/ localmente para verificarlo
```

## Estructura

```
src/
├── content/          Datos de la documentación (comandos, permisos, config, navegación) — editar acá
├── components/
│   ├── ui/             Componentes base reutilizables (CodeBlock, Badge, Callout, Table, Card, ...)
│   └── layout/          Sidebar, Topbar, Layout
├── hooks/             useHashRoute (enrutador propio sin dependencias), useTheme (modo oscuro/claro)
├── pages/             Una página por sección de la documentación
└── App.tsx            Enruta cada slug del sidebar a su página
```

## Actualizar contenido

La mayoría de los datos "tabulares" (comandos, permisos, claves de configuración) viven en `src/content/*.ts`
como arrays tipados — no hace falta tocar JSX para agregar o corregir una fila. El texto explicativo de cada
página vive directamente en `src/pages/*.tsx`.

## Navegación

No usa React Router — es un enrutador por hash hecho a mano (`src/hooks/useHashRoute.ts`) con el formato
`#page/<slug>` (para no chocar con los anchors de sección `#id` de cada página). Agregar una página nueva:

1. Agregar la entrada en `src/content/nav.ts`.
2. Crear el componente en `src/pages/`.
3. Agregar el `case` correspondiente en el `switch` de `App.tsx`.
"# RPGRollDocs" 
