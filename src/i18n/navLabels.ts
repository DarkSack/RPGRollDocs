import type { Locale } from "./strings";

/**
 * Traducción de las etiquetas de navegación.
 *
 * Solo se listan las que realmente cambian entre idiomas: la mayoría de los
 * addons son nombres propios (Crates, Dungeons, Guilds, TAB…) y se dejan tal
 * cual. Lo que no esté acá cae al `label` en español de content/nav.ts, así
 * que la sidebar nunca queda con una clave cruda a la vista.
 */

export const SECTION_LABELS: Record<string, Record<Locale, string>> = {
  "getting-started": { es: "Empezando", en: "Getting started", pt: "Começando" },
  core: { es: "Sistemas de juego", en: "Game systems", pt: "Sistemas de jogo" },
  addons: { es: "Addons oficiales", en: "Official addons", pt: "Addons oficiais" },
  tools: { es: "Herramientas", en: "Tools", pt: "Ferramentas" },
  reference: { es: "Referencia", en: "Reference", pt: "Referência" },
  developers: { es: "Para desarrolladores", en: "For developers", pt: "Para desenvolvedores" },
};

type PartialLabels = Partial<Record<Locale, string>>;

export const PAGE_LABELS: Record<string, PartialLabels> = {
  inicio: { en: "Introduction", pt: "Introdução" },
  arquitectura: { en: "Architecture", pt: "Arquitetura" },
  "primeros-pasos": { en: "Quick start", pt: "Primeiros passos" },
  requisitos: { en: "Requirements", pt: "Requisitos" },

  jugadores: { en: "Players", pt: "Jogadores" },
  "razas-clases": { en: "Races & classes", pt: "Raças e classes" },
  "stats-combate": { es: "Stats, salud y maná", en: "Stats, health & mana", pt: "Stats, vida e mana" },
  "habilidades-traits": { en: "Skills & traits", pt: "Habilidades e traits" },
  trabajos: { es: "Trabajos (Jobs)", en: "Jobs", pt: "Trabalhos (Jobs)" },
  progresion: { en: "Progression & levels", pt: "Progressão e nível" },

  npcs: { en: "NPCs", pt: "NPCs" },
  items: { es: "Ítems", en: "Items", pt: "Itens" },
  encantamientos: { en: "Enchantments", pt: "Encantamentos" },
  quests: { es: "Misiones (Quests)", en: "Quests", pt: "Missões (Quests)" },
  mobs: { es: "Mobs y jefes", en: "Mobs & bosses", pt: "Mobs e chefes" },
  traps: { es: "Traps & Defenses", en: "Traps & defenses", pt: "Traps e defesas" },
  pass: { en: "Season pass", pt: "Passe de temporada" },

  "room-designer": { es: "Diseñador de Salas", en: "Room designer", pt: "Designer de salas" },
  "tab-designer": { es: "Diseñador de TAB", en: "TAB designer", pt: "Designer de TAB" },

  comandos: { en: "Commands", pt: "Comandos" },
  permisos: { en: "Permissions", pt: "Permissões" },
  configuracion: { es: "Configuración", en: "Configuration", pt: "Configuração" },
  "base-de-datos": { es: "Base de datos", en: "Database", pt: "Banco de dados" },
  placeholders: { en: "Placeholders", pt: "Placeholders" },
  integraciones: { en: "Integrations", pt: "Integrações" },
  troubleshooting: { en: "Troubleshooting", pt: "Solução de problemas" },

  api: { es: "API para addons", en: "Addon API", pt: "API para addons" },
};

export function localizedPageLabel(slug: string, fallback: string, locale: Locale): string {
  return PAGE_LABELS[slug]?.[locale] ?? fallback;
}

export function localizedSectionLabel(id: string, fallback: string, locale: Locale): string {
  return SECTION_LABELS[id]?.[locale] ?? fallback;
}
