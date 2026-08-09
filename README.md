# RPGRoll — Documentación (UI)

Sitio de documentación de todo el ecosistema RPGRoll (core + los 18 addons), hecho con React + Vite + TypeScript +
Tailwind CSS v4, componentizado con componentes propios (sin librerías de UI de terceros). Pensado para ser
autocontenido y fácil de mover a otro repositorio o hostearlo donde sea — no tiene backend ni dependencias del
resto del proyecto Java. Publicado en [rpg-roll-docs.vercel.app](https://rpg-roll-docs.vercel.app/).

## Desarrollo

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
```

Corre `tsc -b` (typecheck) y después `vite build`. Genera un `dist/` estático (HTML/CSS/JS, sin backend) que se
puede servir desde cualquier lado — Vercel, Nginx, GitHub Pages, Netlify, o simplemente abriendo
`dist/index.html` directamente (el build usa rutas relativas, `base: "./"` en `vite.config.ts`).

```bash
npm run preview   # sirve el build de dist/ localmente para verificarlo
```

## Estructura

```
src/
├── content/            Datos de la documentación (comandos, permisos, config, navegación, índice de búsqueda)
├── components/
│   ├── ui/                Componentes base reutilizables (CodeBlock, Badge, Callout, Table, Card, YamlBuilder, ...)
│   └── layout/             Layout, Sidebar, Topbar, SearchBar
├── hooks/               useHashRoute (enrutador propio sin dependencias), useTheme (modo oscuro/claro)
├── pages/               Una página por sección de la documentación (31 páginas: introducción, arquitectura,
│                        sistemas del core, y una por cada uno de los 18 addons)
└── App.tsx              Enruta cada slug del sidebar a su página
```

## Navegación

No usa React Router — es un enrutador por hash hecho a mano (`src/hooks/useHashRoute.ts`) con el formato
`#page/<slug>` (para no chocar con los anchors de sección `#id` de cada página, generados por
`SectionHeading`). Agregar una página nueva:

1. Agregar la entrada en `src/content/nav.ts` (aparece en la sidebar automáticamente).
2. Crear el componente en `src/pages/`, recibiendo `{ onNavigate }: { onNavigate: (slug: string) => void }` como
   prop para poder linkear a otras páginas.
3. Agregar el `case` correspondiente en el `switch` de `App.tsx`.

## Buscador global (Ctrl/Cmd+K)

`src/components/layout/SearchBar.tsx` es un buscador tipo "command palette": busca por substring contra
`src/content/search.ts`, que indexa dos niveles por página —el título (desde `nav.ts`) y cada `SectionHeading`
dentro de esa página (id + texto)— y navega directo a la sección elegida. Si agregás una `SectionHeading` nueva
en cualquier página, agregá también su entrada en `search.ts` (llamando al helper `h(slug, headingLabel, id)`)
para que sea buscable; si no, la página sigue siendo buscable por título, pero esa sección puntual no aparecerá
en los resultados.

La navegación por hash es asincrónica (depende del evento `hashchange` del navegador), así que el scroll a la
sección elegida usa un poll con reintentos (`scrollToHeadingWhenReady`) en vez de un solo `setTimeout` — la
sección puede no existir todavía en el DOM en el instante en que se hace click en un resultado.

## Actualizar contenido

La mayoría de los datos "tabulares" (comandos, permisos, claves de configuración) viven en `src/content/*.ts`
como arrays tipados — no hace falta tocar JSX para agregar o corregir una fila. El texto explicativo de cada
página, y los bloques de código YAML de ejemplo, viven directamente en `src/pages/*.tsx`.

Cada addon con contenido YAML configurable (ítems, encantamientos, mobs, hechizos, etc.) tiene, además de los
ejemplos "curados" en su página, un bloque `reference_full.yml` que documenta **todos** los campos disponibles
de un solo tipo de contenido — ese archivo existe también de verdad en `<addon>/src/main/resources/` del
proyecto Java; si agregás un campo nuevo a un parser, actualizá los dos lados.

## Componentes de UI (`src/components/ui`)

| Componente | Para qué |
| --- | --- |
| `PageHeader` | Título + intro de cada página |
| `SectionHeading` | Encabezado de sección con anchor `#id` (usado por el buscador y por links cruzados) |
| `Callout` | Recuadro de aviso (`tone`: `info` / `tip` / `warning`) |
| `CodeBlock` | Bloque de código con resaltado simple + botón de copiar |
| `CopyButton` | Botón de copiar reutilizable (usado dentro de `CodeBlock` y `YamlBuilder`) |
| `Table` / `Thead` / `Th` / `Tr` / `Td` | Tabla básica con el estilo del sitio |
| `Card` / `CardGrid` | Tarjetas para listados (ej. addons en Home) |
| `Badge` | Etiqueta pequeña (permisos, tags) |
| `Kbd` | Estilo de tecla/comando inline |
| `PrevNext` | Navegación anterior/siguiente al pie de cada página |
| `YamlBuilder` | Formulario visual que genera YAML en vivo para los campos "planos" de un tipo de contenido |

## Tema claro/oscuro

`useTheme` persiste la preferencia en `localStorage` y aplica la clase `dark` en `<html>`; todos los componentes
usan las variantes `dark:` de Tailwind, no un sistema de temas separado.
