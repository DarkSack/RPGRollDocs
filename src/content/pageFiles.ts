/**
 * Slug de ruta → archivo fuente de esa página, para el enlace "Editar esta
 * página". Se mantiene junto al switch de App.tsx: si agregás una página,
 * agregá también su archivo acá (si falta, el pie simplemente no muestra el
 * enlace en vez de apuntar a un 404).
 */
export const PAGE_FILES: Record<string, string> = {
  "inicio": "Home.tsx",
  "arquitectura": "Architecture.tsx",
  "jugadores": "PlayerSystem.tsx",
  "razas-clases": "RacesClasses.tsx",
  "stats-combate": "StatsCombat.tsx",
  "habilidades-traits": "SkillsTraits.tsx",
  "trabajos": "Jobs.tsx",
  "progresion": "Progression.tsx",
  "npcs": "Npcs.tsx",
  "items": "Items.tsx",
  "encantamientos": "Enchantments.tsx",
  "quests": "Quests.tsx",
  "ascension": "Ascension.tsx",
  "mobs": "Mobs.tsx",
  "chat": "Chat.tsx",
  "guilds": "Guilds.tsx",
  "crates": "Crates.tsx",
  "dungeons": "Dungeons.tsx",
  "traps": "Traps.tsx",
  "rpgroll-particles": "Particles.tsx",
  "rpgroll-effects": "Effects.tsx",
  "magic": "Magic.tsx",
  "seasons": "Seasons.tsx",
  "fishing": "Fishing.tsx",
  "sackresourcepack": "SackResourcePack.tsx",
  "ranching": "Ranching.tsx",
  "workers": "Workers.tsx",
  "economy": "Economy.tsx",
  "crafting": "Crafting.tsx",
  "tab": "Tab.tsx",
  "extras": "Extras.tsx",
  "room-designer": "RoomDesigner.tsx",
  "tab-designer": "TabDesigner.tsx",
  "comandos": "Commands.tsx",
  "permisos": "Permissions.tsx",
  "configuracion": "Configuration.tsx",
  "base-de-datos": "Database.tsx",
  "api": "Api.tsx",
  "requisitos": "Requirements.tsx",
  "integraciones": "Integrations.tsx",
  "placeholders": "Placeholders.tsx",
  "troubleshooting": "Troubleshooting.tsx",
};

export function pageFile(slug: string): string | undefined {
  return PAGE_FILES[slug];
}
