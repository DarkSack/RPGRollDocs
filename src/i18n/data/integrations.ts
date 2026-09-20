import type { Locale } from "../strings";

/**
 * Traducción del catálogo de integraciones: el resumen de cada una, la nota
 * por addon, y el motivo de las no-integraciones.
 *
 * Las notas se indexan por `<id de integración>:<slug del addon>`, que es la
 * única clave estable — un mismo addon aparece bajo varias integraciones con
 * notas distintas.
 */
type Map_ = Record<string, string>;

const summariesEn: Map_ = {
  placeholderapi:
    "Ten expansions register 57 placeholders across the ecosystem. Without PlaceholderAPI everything still works: there are simply no placeholders for other plugins.",
  vault:
    "RPGRoll-Economy does not consume Vault: it registers as the provider of the Economy service. Once installed, everything that already spoke Vault (Jobs, Guilds, Items, Workers) works with no extra configuration.",
  protocollib:
    "The only third-party plugin that is a hard dependency anywhere: RPGRoll-NPCs will not load without it, because NPCs are packet-simulated entities. In TAB, by contrast, it is optional.",
  worldedit:
    "An alternative source of dungeon rooms: importing a .schem instead of using vanilla Structure Blocks. It uses the WorldEdit API (ClipboardHolder + EditSession) to resolve rotation and mirroring.",
  decentholograms: "Hologram lines above physical crates.",
};

const notesEn: Map_ = {
  "placeholderapi:jugadores": "rpgroll expansion: level, race, class, stats, health/mana, XP.",
  "placeholderapi:items": "rpgrollitems expansion: aggregated stats and held-item data.",
  "placeholderapi:encantamientos": "rpgrollenchantments expansion.",
  "placeholderapi:quests": "rpgrollquests expansion.",
  "placeholderapi:ascension": "rpgrollascension expansion.",
  "placeholderapi:mobs": "rpgrollmobs expansion.",
  "placeholderapi:chat": "rpgrollchat expansion.",
  "placeholderapi:guilds": "rpgrollguilds expansion.",
  "placeholderapi:dungeons": "rpgrolldungeons expansion.",
  "placeholderapi:economy": "rpgeconomy expansion.",
  "placeholderapi:tab": "Resolves third-party placeholders inside TAB templates.",
  "placeholderapi:extras": "Exposes the survival bars as placeholders.",
  "placeholderapi:traps": "Placeholder-based trap conditions.",

  "vault:economy": "Registers as the provider of Vault's Economy service — it implements it, it does not consume it.",
  "vault:items": "Money costs for upgrading and repairing.",
  "vault:guilds": "Guild balance and operation costs.",
  "vault:workers": "Wages for worker NPCs.",
  "vault:extras": "Costs tied to the survival conditions.",
  "vault:crafting": "Optional money cost of a recipe (via RPGRoll-Economy).",

  "protocollib:npcs": "Real depend: NPCs are built from ProtocolLib packets. Without it the addon does not load.",
  "protocollib:tab":
    "TAB works fully without ProtocolLib (header/footer, sorting, teams, nametags, sidebar, bossbars through the native Paper/Adventure API); with it you also get packet-level control.",

  "worldedit:dungeons":
    "Importing schematics into the Library. Declared in the softdepend of RPGRoll-Dungeons' plugin.yml. Without WorldEdit the import command warns you and the rest of Dungeons keeps working the same.",

  "decentholograms:crates":
    "Without DecentHolograms crates work the same (right click, roulette, rewards): only the hologram lines are ignored.",
};

const nonEn: Map_ = {
  WorldGuard:
    "The regions in Quests, Mobs, Seasons, Fishing and Economy are their own cuboids (AABB), not WorldGuard regions. WorldGuard regions are neither read nor written.",
  "ModelEngine / BetterModel":
    "The visual reskins in Mobs, Ranching and Workers are implemented from scratch on top of the real vanilla entity, without that dependency.",
};

const summariesPt: Map_ = {
  placeholderapi:
    "Dez expansões registram 57 placeholders do ecossistema. Sem o PlaceholderAPI tudo continua funcionando: simplesmente não há placeholders para outros plugins.",
  vault:
    "O RPGRoll-Economy não consome o Vault: ele se registra como provedor do serviço Economy. Assim que instalado, tudo o que já falava Vault (Jobs, Guilds, Items, Workers) fica funcional sem configuração extra.",
  protocollib:
    "Único plugin de terceiros que é dependência dura em algum addon: o RPGRoll-NPCs não carrega sem ele, porque os NPCs são entidades simuladas por pacotes. No TAB, por outro lado, é opcional.",
  worldedit:
    "Origem alternativa de salas em Dungeons: importar um .schem em vez de usar Structure Blocks vanilla. Usa a API do WorldEdit (ClipboardHolder + EditSession) para resolver rotação e espelhamento.",
  decentholograms: "Linhas de holograma sobre os crates físicos.",
};

const notesPt: Map_ = {
  "placeholderapi:jugadores": "Expansão rpgroll: nível, raça, classe, stats, vida/mana, XP.",
  "placeholderapi:items": "Expansão rpgrollitems: stats agregados e dados do item na mão.",
  "placeholderapi:encantamientos": "Expansão rpgrollenchantments.",
  "placeholderapi:quests": "Expansão rpgrollquests.",
  "placeholderapi:ascension": "Expansão rpgrollascension.",
  "placeholderapi:mobs": "Expansão rpgrollmobs.",
  "placeholderapi:chat": "Expansão rpgrollchat.",
  "placeholderapi:guilds": "Expansão rpgrollguilds.",
  "placeholderapi:dungeons": "Expansão rpgrolldungeons.",
  "placeholderapi:economy": "Expansão rpgeconomy.",
  "placeholderapi:tab": "Resolve placeholders de terceiros dentro dos templates do TAB.",
  "placeholderapi:extras": "Expõe as barras de sobrevivência como placeholders.",
  "placeholderapi:traps": "Condições de armadilha baseadas em placeholders.",

  "vault:economy": "Registra-se como provedor do serviço Economy do Vault — implementa-o, não o consome.",
  "vault:items": "Custos monetários de melhoria e reparo.",
  "vault:guilds": "Saldo da guilda e custos de operações.",
  "vault:workers": "Salário dos NPCs trabalhadores.",
  "vault:extras": "Custos associados às condições de sobrevivência.",
  "vault:crafting": "Custo monetário opcional de uma receita (via RPGRoll-Economy).",

  "protocollib:npcs": "Depend real: os NPCs são construídos com pacotes do ProtocolLib. Sem ele o addon não carrega.",
  "protocollib:tab":
    "O TAB funciona completo sem o ProtocolLib (header/footer, sorting, teams, nametags, sidebar, bossbars via API nativa do Paper/Adventure); com ele soma-se o controle a nível de pacote.",

  "worldedit:dungeons":
    "Importar schematics para a Biblioteca. Declarado no softdepend do plugin.yml do RPGRoll-Dungeons. Sem o WorldEdit o comando de importação avisa e o resto do Dungeons continua funcionando igual.",

  "decentholograms:crates":
    "Sem o DecentHolograms os crates funcionam igual (clique direito, roleta, recompensas): só as linhas de holograma são ignoradas.",
};

const nonPt: Map_ = {
  WorldGuard:
    "As regiões de Quests, Mobs, Seasons, Fishing e Economy são cuboides próprios (AABB), não regiões do WorldGuard. Regiões do WorldGuard não são lidas nem escritas.",
  "ModelEngine / BetterModel":
    "Os reskins visuais de Mobs, Ranching e Workers estão implementados do zero sobre a entidade vanilla real, sem essa dependência.",
};

const SUMMARIES: Partial<Record<Locale, Map_>> = { en: summariesEn, pt: summariesPt };
const NOTES: Partial<Record<Locale, Map_>> = { en: notesEn, pt: notesPt };
const NON: Partial<Record<Locale, Map_>> = { en: nonEn, pt: nonPt };

export function localizedIntegrationSummary(id: string, fallback: string, locale: Locale): string {
  return SUMMARIES[locale]?.[id] ?? fallback;
}

export function localizedIntegrationNote(id: string, slug: string, fallback: string, locale: Locale): string {
  return NOTES[locale]?.[`${id}:${slug}`] ?? fallback;
}

export function localizedNonIntegration(name: string, fallback: string, locale: Locale): string {
  return NON[locale]?.[name] ?? fallback;
}
