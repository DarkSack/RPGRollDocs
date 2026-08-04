export interface NavItem {
  slug: string;
  label: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const nav: NavSection[] = [
  {
    title: "Empezando",
    items: [
      { slug: "inicio", label: "Introducción" },
      { slug: "arquitectura", label: "Arquitectura" },
    ],
  },
  {
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
      { slug: "sackeffects", label: "SackEffects" },
      { slug: "rpgroll-effects", label: "Effects" },
      { slug: "magic", label: "Magic" },
      { slug: "seasons", label: "Seasons" },
      { slug: "fishing", label: "Fishing" },
      { slug: "sackresourcepack", label: "SackResourcePack" },
      { slug: "ranching", label: "Ranching" },
    ],
  },
  {
    title: "Referencia",
    items: [
      { slug: "comandos", label: "Comandos" },
      { slug: "permisos", label: "Permisos" },
      { slug: "configuracion", label: "Configuración" },
      { slug: "base-de-datos", label: "Base de datos" },
    ],
  },
  {
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
