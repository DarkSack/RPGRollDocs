export interface NavItem {
  slug: string;
  label: string;
}

export interface NavSection {
  /** Id estable para traducir el título y para clasificar la página (ver `sectionOf`). */
  id: string;
  title: string;
  items: NavItem[];
}

export const nav: NavSection[] = [
  {
    id: "getting-started",
    title: "Empezando",
    items: [
      { slug: "inicio", label: "Introducción" },
      { slug: "primeros-pasos", label: "Primeros pasos" },
      { slug: "requisitos", label: "Requisitos" },
      { slug: "arquitectura", label: "Arquitectura" },
    ],
  },
  {
    id: "core",
    title: "Sistemas de juego",
    items: [
      { slug: "jugadores", label: "Jugadores" },
      { slug: "razas-clases", label: "Razas y clases" },
      { slug: "stats-combate", label: "Stats, salud y maná" },
      { slug: "habilidades-traits", label: "Habilidades y traits" },
      { slug: "trabajos", label: "Trabajos (Jobs)" },
      { slug: "progresion", label: "Progresión y nivel" },
    ],
  },
  {
    id: "addons",
    title: "Addons oficiales",
    items: [
      { slug: "npcs", label: "NPCs" },
      { slug: "items", label: "Ítems" },
      { slug: "encantamientos", label: "Encantamientos" },
      { slug: "quests", label: "Misiones (Quests)" },
      { slug: "ascension", label: "Ascension" },
      { slug: "mobs", label: "Mobs y jefes" },
      { slug: "chat", label: "Chat" },
      { slug: "guilds", label: "Guilds" },
      { slug: "crates", label: "Crates" },
      { slug: "dungeons", label: "Dungeons" },
      { slug: "rpgroll-particles", label: "RPGRoll-FX" },
      { slug: "rpgroll-effects", label: "Effects" },
      { slug: "magic", label: "Magic" },
      { slug: "seasons", label: "Seasons" },
      { slug: "fishing", label: "Fishing" },
      { slug: "sackresourcepack", label: "SackResourcePack" },
      { slug: "ranching", label: "Ranching" },
      { slug: "workers", label: "Workers" },
      { slug: "economy", label: "Economy" },
      { slug: "crafting", label: "Crafting" },
      { slug: "tab", label: "TAB" },
      { slug: "extras", label: "Extras" },
      { slug: "traps", label: "Traps & Defenses" },
    ],
  },
  {
    id: "tools",
    title: "Herramientas",
    items: [
      { slug: "room-designer", label: "Diseñador de Salas" },
      { slug: "tab-designer", label: "Diseñador de TAB" },
    ],
  },
  {
    id: "reference",
    title: "Referencia",
    items: [
      { slug: "comandos", label: "Comandos" },
      { slug: "permisos", label: "Permisos" },
      { slug: "configuracion", label: "Configuración" },
      { slug: "placeholders", label: "Placeholders" },
      { slug: "integraciones", label: "Integraciones" },
      { slug: "base-de-datos", label: "Base de datos" },
      { slug: "troubleshooting", label: "Troubleshooting" },
    ],
  },
  {
    id: "developers",
    title: "Para desarrolladores",
    items: [{ slug: "api", label: "API para addons" }],
  },
];

export const allSlugs = nav.flatMap((section) => section.items.map((item) => item.slug));

export function pageTitle(slug: string): string {
  for (const section of nav) {
    const item = section.items.find((i) => i.slug === slug);
    if (item) return item.label;
  }
  return "RPGRoll";
}

/** Sección a la que pertenece un slug — la usa el HUD para clasificar la página. */
export function sectionOf(slug: string): NavSection | undefined {
  return nav.find((section) => section.items.some((item) => item.slug === slug));
}
