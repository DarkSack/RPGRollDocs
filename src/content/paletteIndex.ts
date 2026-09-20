import { searchIndex, type SearchEntry } from "./search";
import { commands } from "./commands";
import { permissions } from "./permissions";
import { configFiles } from "./config";

/**
 * Índice unificado del command palette.
 *
 * El buscador anterior solo conocía páginas y secciones. Acá se suman las tres
 * tablas de referencia que ya existían como datos tipados (comandos, permisos,
 * claves de configuración), así que buscar `rpgroll.admin`, `/rpg allocate` o
 * `max-level` cae directo en la fila correcta en vez de obligar a abrir la
 * página de referencia y hacer Ctrl+F.
 *
 * Las acciones (cambiar tema, idioma, abrir GitHub) no viven acá: dependen de
 * handlers de React y las arma el propio CommandPalette.
 */

export type ResultKind = "page" | "section" | "command" | "permission" | "config";

export interface PaletteEntry {
  kind: ResultKind;
  /** Clave única y estable para React y para el aria-activedescendant. */
  id: string;
  /** Texto principal del resultado. */
  title: string;
  /** Línea secundaria: descripción, permiso, tipo… */
  subtitle?: string;
  /** Metadata corta a la derecha (monospace): página de destino, default, tipo. */
  meta?: string;
  /** Página a la que navega. */
  slug: string;
  /** Ancla dentro de la página, si aplica. */
  heading?: string;
  /** Texto adicional que participa del match pero no se muestra. */
  keywords?: string;
}

function fromDocs(entry: SearchEntry): PaletteEntry {
  return entry.heading
    ? {
        kind: "section",
        id: `section:${entry.slug}#${entry.heading}`,
        title: entry.headingLabel ?? entry.heading,
        subtitle: entry.pageTitle,
        slug: entry.slug,
        heading: entry.heading,
      }
    : {
        kind: "page",
        id: `page:${entry.slug}`,
        title: entry.pageTitle,
        meta: entry.slug,
        slug: entry.slug,
      };
}

const commandEntries: PaletteEntry[] = commands.map((c) => ({
  kind: "command",
  id: `command:${c.name}`,
  title: c.usage,
  subtitle: c.description,
  meta: c.permission ?? undefined,
  slug: "comandos",
  heading: c.category === "admin" ? "admin" : "jugador",
  keywords: [c.name, ...c.aliases, c.permission ?? ""].join(" "),
}));

const permissionEntries: PaletteEntry[] = permissions.map((p) => ({
  kind: "permission",
  id: `permission:${p.node}`,
  title: p.node,
  subtitle: p.description,
  meta: `default: ${p.default}`,
  slug: "permisos",
}));

const configEntries: PaletteEntry[] = configFiles.flatMap((file) =>
  file.keys.map((k) => ({
    kind: "config" as const,
    id: `config:${file.filename}:${k.key}`,
    title: k.key,
    subtitle: k.description,
    meta: `${file.filename} · ${k.type}`,
    slug: "configuracion",
    keywords: `${file.filename} ${file.path} ${k.type}`,
  })),
);

export const paletteIndex: PaletteEntry[] = [
  ...searchIndex.map(fromDocs),
  ...commandEntries,
  ...permissionEntries,
  ...configEntries,
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/** Prioridad base por tipo — con el mismo match textual, una página pesa más que una clave de config. */
const KIND_WEIGHT: Record<ResultKind, number> = {
  page: 6,
  command: 5,
  section: 4,
  permission: 3,
  config: 2,
};

/**
 * Ranking por substring: coincidencia exacta > por prefijo > contenida, más el
 * peso del tipo como desempate. Sin fuzzy matching a propósito — con ~400
 * entradas el substring es exacto, predecible y no necesita librería.
 */
export function searchPalette(query: string, limit = 24): PaletteEntry[] {
  const q = normalize(query.trim());
  if (!q) return [];

  return paletteIndex
    .map((entry) => {
      const title = normalize(entry.title);
      const subtitle = entry.subtitle ? normalize(entry.subtitle) : "";
      const keywords = entry.keywords ? normalize(entry.keywords) : "";

      let score = -1;
      if (title === q) score = 100;
      else if (title.startsWith(q)) score = 80;
      else if (keywords.split(/\s+/).some((w) => w === q)) score = 75;
      else if (title.includes(q)) score = 60;
      else if (keywords.includes(q)) score = 45;
      else if (subtitle.includes(q)) score = 30;
      else if (entry.meta && normalize(entry.meta).includes(q)) score = 20;

      return { entry, score: score < 0 ? score : score + KIND_WEIGHT[entry.kind] };
    })
    .filter((r) => r.score >= 0)
    .sort((a, b) => b.score - a.score || a.entry.title.length - b.entry.title.length)
    .slice(0, limit)
    .map((r) => r.entry);
}
