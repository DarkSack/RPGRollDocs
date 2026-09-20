import type { Locale } from "../strings";

/**
 * Traducción de las descripciones de una línea de cada addon (la grilla de la
 * home y las tarjetas de navegación).
 *
 * Va aparte de content/addons.ts a propósito: ese archivo es la fuente de
 * verdad en español y no queremos reestructurarlo cada vez que se agrega un
 * idioma. Acá solo viven las traducciones, indexadas por el mismo slug, y lo
 * que falte cae al español.
 */
type BlurbMap = Record<string, string>;

const en: BlurbMap = {
  npcs: "NPCs with dialogue, shops and conditional actions.",
  items: "Custom items: rarity, sockets, stats, skins and recipes.",
  encantamientos: "Enchantments with their own levels, triggers and conditions.",
  quests: "Multi-stage quests with objectives, regions and rewards.",
  ascension: "Race evolution, prestige, affinities and post-max-level legacy.",
  mobs: "Mobs and bosses with simulated AI, phases and their own combat engine.",
  chat: "Channels, languages, chat roles and emotes.",
  guilds: "Guilds and teams with roles, permissions and group quests.",
  crates: "Crates with weighted rewards and an animated roulette.",
  dungeons: "Room-based dungeons, difficulties and checkpoints.",
  "rpgroll-particles": "Particle and sound library reusable by other addons.",
  "rpgroll-effects": "Status effect engine: stacking, immunities and components.",
  magic: "Spells built from a component pipeline, runes and grimoires.",
  seasons: "Calendar, weather, temperature and dynamic vegetation.",
  fishing: "Species, rods, baits and a struggle minigame.",
  sackresourcepack: "Resource pack pipeline: merge, build, distribution.",
  ranching: "Genetics, lineage, breeding and animal welfare.",
  workers: "Autonomous worker NPCs with rule-based AI and wages.",
  economy: "Wallets, banks, dynamic market, auctions and companies.",
  crafting: "Custom recipes and stations plus a bridge to vanilla stations.",
  tab: "TabList, scoreboard, nametags and bossbars driven by placeholders.",
  extras: "Thirst, stamina, temperature and survival conditions.",
  traps: "Configurable traps, turrets and mechanisms: triggers, conditions, chains and protected blocks.",
};

const pt: BlurbMap = {
  npcs: "NPCs com diálogo, lojas e ações condicionais.",
  items: "Itens personalizados: raridade, sockets, stats, skins e receitas.",
  encantamientos: "Encantamentos com níveis, triggers e condições próprios.",
  quests: "Missões de várias etapas com objetivos, regiões e recompensas.",
  ascension: "Evolução de raça, prestígio, afinidades e legado pós-nível máximo.",
  mobs: "Mobs e chefes com IA simulada, fases e motor de combate próprio.",
  chat: "Canais, idiomas, papéis de chat e emotes.",
  guilds: "Guildas e times com papéis, permissões e missões em grupo.",
  crates: "Caixas com recompensas ponderadas e roleta animada.",
  dungeons: "Masmorras por salas, dificuldades e checkpoints.",
  "rpgroll-particles": "Biblioteca de partículas e som reutilizável por outros addons.",
  "rpgroll-effects": "Motor de efeitos de estado: stacking, imunidades e componentes.",
  magic: "Feitiços por pipeline de componentes, runas e grimórios.",
  seasons: "Calendário, clima, temperatura e vegetação dinâmica.",
  fishing: "Espécies, varas, iscas e minijogo de luta.",
  sackresourcepack: "Pipeline de resource pack: fusão, build, distribuição.",
  ranching: "Genética, linhagem, reprodução e bem-estar animal.",
  workers: "NPCs trabalhadores autônomos com IA por regras e salário.",
  economy: "Carteiras, bancos, mercado dinâmico, leilões e empresas.",
  crafting: "Receitas e estações personalizadas + ponte com estações vanilla.",
  tab: "TabList, scoreboard, nametags e bossbars por placeholders.",
  extras: "Sede, stamina, temperatura e condições de sobrevivência.",
  traps: "Armadilhas, torres e mecanismos configuráveis: triggers, condições, cadeias e blocos protegidos.",
};

const BLURBS: Partial<Record<Locale, BlurbMap>> = { en, pt };

/** Descripción del addon en el idioma activo, con el español como respaldo. */
export function localizedBlurb(slug: string, fallback: string, locale: Locale): string {
  return BLURBS[locale]?.[slug] ?? fallback;
}
