#!/usr/bin/env node
/**
 * Verifica que las dependencias documentadas coincidan con los plugin.yml
 * reales del proyecto Java.
 *
 * Existe porque los ejemplos de `plugin.yml` están copiados a mano en el JSX
 * de cada página y se desincronizan sin que nada lo note. Cuando eso pasa el
 * síntoma es silencioso: Bukkit ignora un `softdepend` a un plugin que no
 * existe sin avisar, así que un ejemplo con el nombre equivocado se copia,
 * "funciona", y rompe el orden de carga de forma intermitente más adelante.
 *
 * Revisa dos cosas contra la misma fuente de verdad:
 *   1. La tabla `addonDependencies` de src/content/integrations.ts.
 *   2. Cada bloque `depend:`/`softdepend:` escrito dentro de src/pages/*.tsx.
 *
 * Compara como conjuntos, no como listas: reordenar una línea en el
 * plugin.yml no es un error de documentación.
 *
 * Uso:
 *   node scripts/check-plugin-deps.mjs
 *   node scripts/check-plugin-deps.mjs --json
 *   node scripts/check-plugin-deps.mjs --local ../RPGRoll   (clon local, sin red:
 *     sirve para documentar un cambio antes de que llegue a main)
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { addonDependencies } from "../src/content/integrations.ts";
import { PAGE_FILES } from "../src/content/pageFiles.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const SOURCE_REPO = "DarkSack/RPGRollSack";
const SOURCE_BRANCH = "main";

/** slug de la documentación → carpeta del módulo Gradle en el repo Java. */
const MODULES = {
  npcs: "npcs",
  items: "items",
  encantamientos: "enchantments",
  quests: "quests",
  ascension: "ascension",
  mobs: "mobs",
  chat: "chat",
  guilds: "guilds",
  crates: "crates",
  dungeons: "dungeons",
  "rpgroll-particles": "fx",
  "rpgroll-effects": "effects",
  magic: "magic",
  seasons: "seasons",
  fishing: "fishing",
  ranching: "ranching",
  workers: "workers",
  economy: "economy",
  crafting: "crafting",
  tab: "tab",
  extras: "extras",
  traps: "traps",
  sackresourcepack: "sackresourcepack",
  pass: "pass",
};

const localIndex = process.argv.indexOf("--local");
const LOCAL_REPO = localIndex === -1 ? null : process.argv[localIndex + 1];
const SOURCE_LABEL = LOCAL_REPO ? LOCAL_REPO : `${SOURCE_REPO}@${SOURCE_BRANCH}`;

/** El plugin.yml de un módulo, del clon local si se pasó --local, si no de GitHub. */
async function readPluginYml(module) {
  if (!LOCAL_REPO) return fetchWithRetry(rawUrl(module));
  try {
    return await readFile(join(LOCAL_REPO, module, "src/main/resources/plugin.yml"), "utf8");
  } catch {
    return null;
  }
}

const rawUrl = (module) =>
  `https://raw.githubusercontent.com/${SOURCE_REPO}/${SOURCE_BRANCH}/${module}/src/main/resources/plugin.yml`;

async function fetchWithRetry(url, attempts = 3) {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url);
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      lastError = error;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 400 * (i + 1)));
    }
  }
  throw new Error(`No se pudo leer ${url}: ${lastError.message}`);
}

/** Lee una secuencia YAML en formato flow: `depend: [A, B, "C"]`. */
function parseList(yaml, key) {
  const match = yaml.match(new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]\\s*$`, "m"));
  if (!match) return [];
  return match[1]
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

const sameSet = (a, b) => a.length === b.length && [...a].sort().join("|") === [...b].sort().join("|");
const missing = (expected, actual) => expected.filter((x) => !actual.includes(x));

const splitItems = (raw) =>
  raw
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);

/**
 * Encuentra el bloque plugin.yml embebido en el JSX de una página.
 *
 * Solo cuenta un par `depend`/`softdepend` que viva en el MISMO literal de
 * cadena, que es como las páginas escriben el ejemplo real:
 * `code={"depend: [RPGRoll]\nsoftdepend: [...]"}`. Las menciones sueltas en
 * Desde RPGRoll-Lib, el bloque de un addon oficial lleva `RPGRoll-Lib` (o, en
 * los dos módulos atados al core, `RPGRoll`) en depend: eso lo distingue del
 * ejemplo de un addon de terceros.
 *
 * prosa (por ejemplo `<Kbd>softdepend: [RPGRoll-FX]</Kbd>`, que explica cómo
 * un tercero dependería de este addon) quedan afuera a propósito: no
 * describen el plugin.yml de la página.
 */
function extractDocBlock(source) {
  // La "\\n" busca la secuencia de escape literal tal como está escrita en el
  // código fuente, no un salto de línea real.
  const re = /(?<!soft)depend:\s*\[([^\]]*)\](?:\\n\s*softdepend:\s*\[([^\]]*)\])?/g;
  let match;
  while ((match = re.exec(source)) !== null) {
    const hard = splitItems(match[1]);
    if (!hard.includes("RPGRoll-Lib") && !hard.includes("RPGRoll")) continue; // ejemplo de un addon de terceros
    return { hard, soft: match[2] === undefined ? [] : splitItems(match[2]) };
  }
  return null;
}

async function main() {
  const asJson = process.argv.includes("--json");
  const problems = [];
  const checked = [];

  for (const [slug, module] of Object.entries(MODULES)) {
    const yaml = await readPluginYml(module);
    if (yaml === null) {
      problems.push({
        slug,
        kind: "sin-plugin-yml",
        detail: `No existe ${module}/src/main/resources/plugin.yml en ${SOURCE_LABEL}. ¿Se renombró el módulo?`,
      });
      continue;
    }

    const real = { hard: parseList(yaml, "depend"), soft: parseList(yaml, "softdepend") };
    checked.push(slug);

    // 1) La tabla canónica de integrations.ts.
    const documented = addonDependencies.find((entry) => entry.slug === slug);
    if (!documented) {
      problems.push({ slug, kind: "tabla-incompleta", detail: "Falta en addonDependencies (src/content/integrations.ts)." });
    } else {
      for (const field of ["hard", "soft"]) {
        const key = field === "hard" ? "depend" : "softdepend";
        if (!sameSet(documented[field], real[field])) {
          problems.push({
            slug,
            kind: "tabla-desactualizada",
            detail:
              `addonDependencies.${field} no coincide con ${key} de ${module}/…/plugin.yml\n` +
              `      real:        [${real[field].join(", ")}]\n` +
              `      documentado: [${documented[field].join(", ")}]\n` +
              `      faltan:      [${missing(real[field], documented[field]).join(", ") || "—"}]\n` +
              `      sobran:      [${missing(documented[field], real[field]).join(", ") || "—"}]`,
          });
        }
      }
    }

    // 2) Los bloques de ejemplo dentro de la página del addon.
    const file = PAGE_FILES[slug];
    if (!file) continue;

    let source;
    try {
      source = await readFile(join(ROOT, "src/pages", file), "utf8");
    } catch {
      continue;
    }

    const block = extractDocBlock(source);
    if (!block) continue; // la página documenta sus requisitos en una tabla, no en un bloque

    if (!sameSet(block.hard, real.hard)) {
      problems.push({
        slug,
        kind: "ejemplo-desactualizado",
        detail:
          `src/pages/${file} — el bloque depend no coincide con el plugin.yml real\n` +
          `      real:        [${real.hard.join(", ")}]\n` +
          `      en la página: [${block.hard.join(", ")}]`,
      });
    }

    const docSoft = block.soft;
    if (!sameSet(docSoft, real.soft)) {
      problems.push({
        slug,
        kind: "ejemplo-desactualizado",
        detail:
          `src/pages/${file} — el bloque softdepend no coincide con el plugin.yml real\n` +
          `      real:        [${real.soft.join(", ")}]\n` +
          `      en la página: [${docSoft.join(", ") || "—"}]\n` +
          `      faltan:      [${missing(real.soft, docSoft).join(", ") || "—"}]\n` +
          `      sobran:      [${missing(docSoft, real.soft).join(", ") || "—"}]`,
      });
    }
  }

  if (asJson) {
    console.log(JSON.stringify({ checked: checked.length, problems }, null, 2));
  } else if (problems.length === 0) {
    console.log(`OK — ${checked.length} plugin.yml verificados contra ${SOURCE_LABEL}.`);
  } else {
    console.error(`\n${problems.length} desviación(es) respecto de ${SOURCE_LABEL}:\n`);
    for (const problem of problems) {
      console.error(`  [${problem.slug}] ${problem.kind}`);
      console.error(`      ${problem.detail}\n`);
    }
    console.error("La fuente de verdad es el plugin.yml del proyecto Java: actualizá la documentación,");
    console.error("no al revés.\n");
  }

  process.exit(problems.length === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(`\nNo se pudo completar la verificación: ${error.message}`);
  console.error("Si es un problema de red, volvé a correr el job.\n");
  process.exit(2);
});
