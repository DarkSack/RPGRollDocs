import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { nav } from "../src/content/nav.ts";
import { SITE_URL, pagePath } from "../src/content/seo.ts";

const contents = new Set();
for (const { slug } of nav.flatMap((section) => section.items)) {
  const file = new URL(`../dist/${slug === "inicio" ? "" : `${slug}/`}index.html`, import.meta.url);
  const html = await readFile(file, "utf8");
  assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1, slug);
  assert.ok(html.includes(`data-route="${slug}"`), slug);
  assert.ok(html.includes(`href="${SITE_URL}${pagePath(slug)}"`), slug);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(main, slug);
  assert.match(main, /href="\/(?!\/)[^"]*"/, slug);
  assert.ok(main.replace(/<[^>]*>/g, "").length > 300, slug);
  assert.ok(!contents.has(main), `${slug}: contenido repetido`);
  contents.add(main);
  if (slug === "primeros-pasos") assert.match(main, /RPGRoll-Lib/);
  if (slug === "npcs") assert.match(main, /Mannequin/);
}
const notFound = await readFile(new URL("../dist/404.html", import.meta.url), "utf8");
assert.match(notFound, /name="robots" content="noindex"/);
assert.match(notFound, /Esta página no existe/);
console.log(`check:prerender: ${contents.size} páginas con H1, contenido y enlaces; 404 noindex`);
