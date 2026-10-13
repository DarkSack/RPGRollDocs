#!/usr/bin/env node
/**
 * Escribe un HTML por página después de `vite build`, más sitemap y robots.
 *
 * El sitio es una SPA: sin esto, cada URL (`/npcs`, `/comandos`) devolvería el
 * mismo `index.html` con el título y la descripción de la portada. Google
 * ejecuta el JS y acabaría viendo el título correcto, pero Discord, WhatsApp,
 * X y LinkedIn no ejecutan nada: la vista previa al compartir saldría siempre
 * con la portada. Aquí cada página recibe su propio `dist/<slug>/index.html`
 * con su título, descripción, canónica y Open Graph ya escritos.
 *
 * No es un prerender del contenido (eso exigiría renderizar React en Node):
 * el cuerpo lo sigue pintando la app. Es lo justo para que cada URL sea una
 * página distinta para quien no ejecuta JavaScript.
 *
 * Uso: lo llama `npm run build`. Lee nav.ts y seo.ts con el type stripping
 * nativo de Node, como scripts/check-plugin-deps.mjs.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { nav } from "../src/content/nav.ts";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL, pageDescriptions, pagePath } from "../src/content/seo.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

/**
 * Los `blurb` de addons.ts, sacados con una expresión regular: ese archivo
 * importa iconos `.tsx` y Node no puede cargarlo. Si cambia el formato de una
 * entrada y deja de casar, la página usa la descripción general y el build
 * avisa (ver abajo), en vez de publicar en silencio una descripción vacía.
 */
async function addonBlurbs() {
  const source = await readFile(join(root, "src/content/addons.ts"), "utf8");
  const blurbs = new Map();
  for (const match of source.matchAll(/slug:\s*"([^"]+)"[^}]*?blurb:\s*"((?:[^"\\]|\\.)*)"/g)) {
    blurbs.set(match[1], match[2]);
  }
  return blurbs;
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

/** Sustituye el atributo de la primera etiqueta que case. Falla si no hay ninguna. */
function setAttr(html, tagPattern, attribute, value) {
  const re = new RegExp(`(<${tagPattern}[^>]*?\\s${attribute}=")[^"]*(")`, "s");
  if (!re.test(html)) throw new Error(`index.html no tiene <${tagPattern}>: no se puede escribir ${attribute}`);
  return html.replace(re, `$1${escapeHtml(value)}$2`);
}

function pageHtml(template, { title, description, url, robots }) {
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = setAttr(html, 'meta\\s+name="description"', "content", description);
  html = setAttr(html, 'meta\\s+name="robots"', "content", robots);
  html = setAttr(html, 'link\\s+rel="canonical"', "href", url);
  html = setAttr(html, 'meta\\s+property="og:url"', "content", url);
  html = setAttr(html, 'meta\\s+property="og:title"', "content", title);
  html = setAttr(html, 'meta\\s+property="og:description"', "content", description);
  return html;
}

const template = await readFile(join(dist, "index.html"), "utf8");
const blurbs = await addonBlurbs();
const pages = nav.flatMap((section) => section.items);
const sinDescripcion = [];

for (const { slug, label } of pages) {
  const description = pageDescriptions[slug] ?? blurbs.get(slug);
  if (!description) sinDescripcion.push(slug);

  const html = pageHtml(template, {
    title: slug === "inicio" ? "RPGRoll — Docs" : `${label} — ${SITE_NAME}`,
    description: description ?? DEFAULT_DESCRIPTION,
    url: SITE_URL + pagePath(slug),
    robots: "index, follow",
  });

  const file = slug === "inicio" ? join(dist, "index.html") : join(dist, slug, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

// Vercel sirve dist/404.html con estado 404 para cualquier ruta que no exista.
// La app lo pinta como "página no encontrada"; el noindex evita que una errata
// en un enlace externo acabe en el índice.
await writeFile(
  join(dist, "404.html"),
  pageHtml(template, {
    title: `Página no encontrada — ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
    url: `${SITE_URL}/`,
    robots: "noindex",
  }),
);

const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map(
    ({ slug }) =>
      `  <url><loc>${SITE_URL}${pagePath(slug)}</loc><lastmod>${today}</lastmod><priority>${slug === "inicio" ? "1.0" : "0.7"}</priority></url>`,
  ),
  "</urlset>",
  "",
].join("\n");
await writeFile(join(dist, "sitemap.xml"), sitemap);

await writeFile(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`prerender: ${pages.length} páginas, 404.html, sitemap.xml y robots.txt`);
if (sinDescripcion.length > 0) {
  console.warn(`prerender: sin descripción propia (usan la general): ${sinDescripcion.join(", ")}`);
}
