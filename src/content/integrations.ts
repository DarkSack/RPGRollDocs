/**
 * Catálogo de integraciones con plugins de terceros.
 *
 * Cada entrada está verificada contra el `plugin.yml` real de cada módulo en
 * el repositorio del proyecto Java (`depend` vs `softdepend`), más lo que la
 * página del addon documenta sobre qué deja de funcionar si el plugin falta.
 * No se lista nada "porque suele integrarse": si no está en el código, no
 * está acá.
 *
 * `nonIntegrations` es igual de importante: responde de una la pregunta
 * "¿anda con WorldGuard?" sin que haya que leer cinco páginas.
 */

export type Requirement = "required" | "optional" | "provided";

export interface IntegrationUse {
  /** Página del addon que lo usa. */
  slug: string;
  requirement: Requirement;
  /** Qué aporta, y qué pasa si el plugin no está instalado. */
  note: string;
}

export interface Integration {
  id: string;
  name: string;
  /** Requisito más fuerte entre todos los addons que lo usan. */
  requirement: Requirement;
  summary: string;
  usedBy: IntegrationUse[];
}

export const integrations: Integration[] = [
  {
    id: "placeholderapi",
    name: "PlaceholderAPI",
    requirement: "optional",
    summary:
      "Diez expansiones registran 57 placeholders del ecosistema. Sin PlaceholderAPI todo sigue funcionando: simplemente no hay placeholders para otros plugins.",
    usedBy: [
      { slug: "jugadores", requirement: "optional", note: "Expansión rpgroll: nivel, raza, clase, stats, salud/maná, XP." },
      { slug: "items", requirement: "optional", note: "Expansión rpgrollitems: stats agregados y datos del ítem en mano." },
      { slug: "encantamientos", requirement: "optional", note: "Expansión rpgrollenchantments." },
      { slug: "quests", requirement: "optional", note: "Expansión rpgrollquests." },
      { slug: "ascension", requirement: "optional", note: "Expansión rpgrollascension." },
      { slug: "mobs", requirement: "optional", note: "Expansión rpgrollmobs." },
      { slug: "chat", requirement: "optional", note: "Expansión rpgrollchat." },
      { slug: "guilds", requirement: "optional", note: "Expansión rpgrollguilds." },
      { slug: "dungeons", requirement: "optional", note: "Expansión rpgrolldungeons." },
      { slug: "economy", requirement: "optional", note: "Expansión rpgeconomy." },
      { slug: "tab", requirement: "optional", note: "Resuelve placeholders de terceros dentro de las plantillas de TAB." },
      { slug: "extras", requirement: "optional", note: "Expone las barras de supervivencia como placeholders." },
      { slug: "traps", requirement: "optional", note: "Condiciones de trampa basadas en placeholders." },
    ],
  },
  {
    id: "vault",
    name: "Vault",
    requirement: "provided",
    summary:
      "RPGRoll-Economy no consume Vault: se registra como proveedor del servicio Economy. En cuanto está instalado, todo lo que ya sabía hablar Vault (Jobs, Guilds, Items, Workers) queda funcional sin configuración extra.",
    usedBy: [
      { slug: "economy", requirement: "provided", note: "Se registra como proveedor del servicio Economy de Vault — lo implementa, no lo consume." },
      { slug: "items", requirement: "optional", note: "Costos monetarios de mejora y reparación." },
      { slug: "guilds", requirement: "optional", note: "Balance de guild y costos de operaciones." },
      { slug: "workers", requirement: "optional", note: "Salario de los NPCs trabajadores." },
      { slug: "extras", requirement: "optional", note: "Costos asociados a las condiciones de supervivencia." },
      { slug: "crafting", requirement: "optional", note: "Costo monetario opcional de una receta (vía RPGRoll-Economy)." },
    ],
  },
  {
    id: "protocollib",
    name: "ProtocolLib",
    requirement: "required",
    summary:
      "Único plugin de terceros que es dependencia dura en algún addon: RPGRoll-NPCs no carga sin él, porque los NPCs son entidades simuladas por paquetes. En TAB, en cambio, es opcional.",
    usedBy: [
      { slug: "npcs", requirement: "required", note: "depend real: los NPCs se construyen con paquetes de ProtocolLib. Sin él el addon no carga." },
      { slug: "tab", requirement: "optional", note: "TAB funciona completo sin ProtocolLib (header/footer, sorting, teams, nametags, sidebar, bossbars vía API nativa de Paper/Adventure); con él se suma control a nivel de paquete." },
    ],
  },
  {
    id: "worldedit",
    name: "WorldEdit / FastAsyncWorldEdit",
    requirement: "optional",
    summary:
      "Origen alternativo de salas en Dungeons: importar un .schem en vez de usar Structure Blocks vanilla. Usa la API de WorldEdit (ClipboardHolder + EditSession) para resolver rotación y espejo.",
    usedBy: [
      {
        slug: "dungeons",
        requirement: "optional",
        note: "Importar schematics a la Biblioteca. Declarado en softdepend del plugin.yml de RPGRoll-Dungeons. Sin WorldEdit, el comando de importación avisa y el resto de Dungeons sigue funcionando igual.",
      },
    ],
  },
  {
    id: "decentholograms",
    name: "DecentHolograms",
    requirement: "optional",
    summary: "Líneas de holograma sobre los crates físicos.",
    usedBy: [
      {
        slug: "crates",
        requirement: "optional",
        note: "Sin DecentHolograms los crates funcionan igual (click derecho, ruleta, recompensas): solo se ignoran las líneas de holograma.",
      },
    ],
  },
];

/**
 * Plugins que suelen darse por supuestos y que RPGRoll NO integra.
 *
 * En todos estos casos la funcionalidad existe, pero implementada desde cero
 * dentro del ecosistema — por eso no hace falta instalarlos, y por eso
 * tampoco van a interoperar.
 */
export const nonIntegrations: { name: string; reason: string; slugs: string[] }[] = [
  {
    name: "WorldGuard",
    reason:
      "Las regiones de Quests, Mobs, Seasons, Fishing y Economy son cuboides propios (AABB), no regiones de WorldGuard. No se leen ni se escriben regiones de WorldGuard.",
    slugs: ["quests", "mobs", "seasons", "fishing", "economy"],
  },
  {
    name: "ModelEngine / BetterModel",
    reason:
      "Los reskins visuales de Mobs, Ranching y Workers están implementados desde cero sobre la entidad vanilla real, sin esa dependencia.",
    slugs: ["mobs", "ranching", "workers"],
  },
];

export interface AddonDependencies {
  slug: string;
  /** `depend` en el plugin.yml: sin esto el addon no carga. */
  hard: string[];
  /** `softdepend`: mejora o habilita funciones, pero no bloquea la carga. */
  soft: string[];
}

/**
 * Grafo de dependencias declarado por cada addon.
 *
 * Transcripto de `<modulo>/src/main/resources/plugin.yml` en el repositorio
 * del proyecto Java, no de los bloques de ejemplo de cada página: varios de
 * esos bloques estaban desactualizados (ver el commit que agregó esta nota).
 * Si cambiás un plugin.yml, actualizá también esta tabla.
 */
export const addonDependencies: AddonDependencies[] = [
  { slug: "npcs", hard: ["RPGRoll", "ProtocolLib"], soft: [] },
  { slug: "items", hard: ["RPGRoll"], soft: ["RPGRoll-FX", "RPGRoll-Enchantments", "Vault", "PlaceholderAPI", "SackResourcePack"] },
  { slug: "encantamientos", hard: ["RPGRoll"], soft: ["RPGRoll-FX", "PlaceholderAPI"] },
  { slug: "quests", hard: ["RPGRoll"], soft: ["PlaceholderAPI"] },
  { slug: "ascension", hard: ["RPGRoll"], soft: ["RPGRoll-Enchantments", "RPGRoll-Quests", "PlaceholderAPI"] },
  { slug: "mobs", hard: ["RPGRoll"], soft: ["RPGRoll-Items", "RPGRoll-Quests", "PlaceholderAPI", "SackResourcePack"] },
  { slug: "chat", hard: ["RPGRoll"], soft: ["RPGRoll-Guilds", "PlaceholderAPI"] },
  { slug: "guilds", hard: ["RPGRoll"], soft: ["RPGRoll-Items", "RPGRoll-Quests", "Vault", "PlaceholderAPI"] },
  { slug: "crates", hard: ["RPGRoll"], soft: ["DecentHolograms"] },
  { slug: "dungeons", hard: ["RPGRoll", "RPGRoll-Mobs", "RPGRoll-Guilds"], soft: ["RPGRoll-Items", "RPGRoll-Quests", "PlaceholderAPI", "WorldEdit"] },
  { slug: "rpgroll-particles", hard: ["RPGRoll"], soft: [] },
  { slug: "rpgroll-effects", hard: ["RPGRoll"], soft: ["RPGRoll-FX", "RPGRoll-Guilds"] },
  { slug: "magic", hard: ["RPGRoll"], soft: ["RPGRoll-FX", "RPGRoll-Effects"] },
  { slug: "seasons", hard: ["RPGRoll"], soft: ["RPGRoll-FX", "RPGRoll-Effects", "RPGRoll-Mobs"] },
  { slug: "fishing", hard: ["RPGRoll"], soft: ["RPGRoll-FX", "RPGRoll-Effects", "RPGRoll-Seasons", "SackResourcePack"] },
  { slug: "ranching", hard: ["RPGRoll"], soft: ["RPGRoll-FX", "RPGRoll-Effects", "RPGRoll-Seasons", "SackResourcePack"] },
  {
    slug: "workers",
    hard: ["RPGRoll"],
    soft: ["RPGRoll-FX", "RPGRoll-Effects", "RPGRoll-Seasons", "RPGRoll-Ranching", "RPGRoll-Fishing", "RPGRoll-Guilds", "Vault", "SackResourcePack"],
  },
  { slug: "economy", hard: ["RPGRoll"], soft: ["Vault", "PlaceholderAPI", "RPGRoll-Guilds", "RPGRoll-Seasons"] },
  { slug: "crafting", hard: ["RPGRoll"], soft: ["RPGRoll-Items", "RPGRoll-Economy", "RPGRoll-Guilds", "RPGRoll-Seasons"] },
  { slug: "tab", hard: ["RPGRoll"], soft: ["ProtocolLib", "PlaceholderAPI"] },
  { slug: "extras", hard: ["RPGRoll"], soft: ["RPGRoll-TAB", "RPGRoll-Seasons", "PlaceholderAPI", "Vault"] },
  { slug: "traps", hard: ["RPGRoll"], soft: ["RPGRoll-Items", "RPGRoll-Effects", "RPGRoll-Mobs", "RPGRoll-FX", "PlaceholderAPI"] },
  // SackResourcePack es un pipeline independiente: su plugin.yml no declara
  // depend ni softdepend en RPGRoll.
  { slug: "sackresourcepack", hard: [], soft: [] },
];
