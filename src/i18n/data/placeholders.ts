import type { Locale } from "../strings";

/**
 * Traducción de lo que devuelve cada placeholder, indexado por el token.
 *
 * Los tokens no se traducen: son identificadores que PlaceholderAPI resuelve
 * literalmente.
 */
type Map_ = Record<string, string>;

const en: Map_ = {
  "%rpgroll_level%": "Current level.",
  "%rpgroll_xp% / %rpgroll_xp_next%": "Current experience / experience required for the next level.",
  "%rpgroll_xp_percent%": "Progress towards the next level, as a %.",
  "%rpgroll_race% / %rpgroll_class%": "Current race/class, or - if they have none.",
  "%rpgroll_health% / %rpgroll_health_max%": "Health from RPGRoll's own pool (not vanilla hearts).",
  "%rpgroll_mana% / %rpgroll_mana_max%": "Current/maximum mana.",
  "%rpgroll_armor% / %rpgroll_evasion% / %rpgroll_critical_chance%": "Derived combat stats.",
  "%rpgroll_strength% ... %rpgroll_charisma%": "The 6 D&D attributes.",
  "%rpgroll_stat_points%": "Unspent attribute points.",
  "%rpgroll_job_<id>_level%": "Level in that job (0 if they don't have it).",
  "%rpgroll_has_skill_<id>% / %rpgroll_has_trait_<id>%": "yes/no.",

  "%rpgrollitems_stat_<nombre>%": "Total of that stat across armor + main/off hand + gems.",
  "%rpgrollitems_helditem_name%": "Name of the held item, or - if it is not an RPGRoll item.",
  "%rpgrollitems_helditem_rarity%": "Rarity id of the held item.",
  "%rpgrollitems_helditem_upgrade_level%": "Current upgrade level.",
  "%rpgrollitems_helditem_durability% / _durability_max": "Its own durability (not the vanilla bar).",

  "%rpgrollenchantments_helditem_count%": "Number of custom enchantments on the item.",
  "%rpgrollenchantments_helditem_<id>_level%": "Level of that enchantment on the item (0 if absent).",
  "%rpgrollenchantments_helditem_has_<id>%": "yes/no.",

  "%rpgrollquests_active_count%": "Number of active quests.",
  "%rpgrollquests_completed_count%": "Number of quests completed in total.",
  "%rpgrollquests_is_active_<id>% / %rpgrollquests_has_completed_<id>%": "yes/no.",
  "%rpgrollquests_active_<id>_stage%": "Id of that quest's current stage, or - if it is not active.",

  "%rpgrollascension_evolution% / _specialization": "Current id, or - if none was chosen.",
  "%rpgrollascension_prestige% / _legacy": "Prestige/legacy ranks reached.",
  "%rpgrollascension_exp_bonus%": "Total experience bonus % (prestige + legacy).",
  "%rpgrollascension_talent_points%": "Unspent talent points.",
  "%rpgrollascension_affinity_<id>_level%": "Level of that affinity (0-100).",
  "%rpgrollascension_reputation_%": "Reputation accumulated with that faction.",
  "%rpgrollascension_title%": "Active title, or -.",

  "%rpgrollmobs_active_count%": "RPGRoll mobs alive right now, across every world.",
  "%rpgrollmobs_active_count_%": "Same, filtered by category (NORMAL, MINI_BOSS, etc.).",
  "%rpgrollmobs_definitions_count%": "Number of loaded mob definitions.",
  "%rpgrollmobs_nearest_name%": "Name of the RPGRoll mob closest to the player.",
  "%rpgrollmobs_nearest_health% / _health_max": "Its current/maximum health.",
  "%rpgrollmobs_nearest_distance%": "Distance in blocks.",

  "%rpgrollchat_channels_count%": "Number of defined channels (the only placeholder that needs no player).",
  "%rpgrollchat_active_channel%": "Name of the player's active channel, or -.",
  "%rpgrollchat_speaking_language%": "Language they are currently speaking.",
  "%rpgrollchat_known_languages_count%": "Number of languages they know.",
  "%rpgrollchat_ignored_players_count%": "Number of players they have ignored.",

  "%rpgrollguilds_guilds_count%": "Total number of guilds (the only one that needs no player).",
  "%rpgrollguilds_in_team% / _in_guild": "yes/no.",
  "%rpgrollguilds_team_name% / _team_size / _team_role": "Data about your current team, or -/0.",
  "%rpgrollguilds_guild_name% / _guild_id / _guild_level / _guild_role / _guild_members":
    "Data about your current guild, or -/0.",

  "%rpgrolldungeons_active_count% / _definitions_count":
    "Active instances / defined dungeons (server-wide).",
  "%rpgrolldungeons_occupied_<id>%": "yes/no — whether that dungeon has an instance running right now.",
  "%rpgrolldungeons_in_dungeon%": "yes/no for the player.",
  "%rpgrolldungeons_current_dungeon% / _current_room": "The player's current dungeon and room number, or -.",
  "%rpgrolldungeons_cooldown_<id>%": "Seconds of cooldown left for that dungeon.",

  "%rpgeconomy_balance%": "The player's balance in the default currency.",
  "%rpgeconomy_balance_<moneda>%": "Balance in a specific currency.",
  "%rpgeconomy_bank%": "Sum of all their bank accounts (default currency).",
  "%rpgeconomy_currency%": "Name of the default currency.",
  "%rpgeconomy_inflation%": "Inflation % of the default currency.",
  "%rpgeconomy_market_price_<producto>%": "Current market price.",
  "%rpgeconomy_tax_rate_<tipo>%": "Total % configured for that tax type.",
};

const pt: Map_ = {
  "%rpgroll_level%": "Nível atual.",
  "%rpgroll_xp% / %rpgroll_xp_next%": "Experiência atual / necessária para o próximo nível.",
  "%rpgroll_xp_percent%": "Progresso rumo ao próximo nível, em %.",
  "%rpgroll_race% / %rpgroll_class%": "Raça/classe atual, ou - se não tiver.",
  "%rpgroll_health% / %rpgroll_health_max%": "Vida do pool próprio do RPGRoll (não os corações vanilla).",
  "%rpgroll_mana% / %rpgroll_mana_max%": "Mana atual/máxima.",
  "%rpgroll_armor% / %rpgroll_evasion% / %rpgroll_critical_chance%": "Stats de combate derivados.",
  "%rpgroll_strength% ... %rpgroll_charisma%": "Os 6 atributos D&D.",
  "%rpgroll_stat_points%": "Pontos de atributo não gastos.",
  "%rpgroll_job_<id>_level%": "Nível nesse trabalho (0 se não o tiver).",
  "%rpgroll_has_skill_<id>% / %rpgroll_has_trait_<id>%": "sim/não.",

  "%rpgrollitems_stat_<nombre>%": "Total desse stat somando armadura + mão principal/secundária + gemas.",
  "%rpgrollitems_helditem_name%": "Nome do item na mão, ou - se não for um item do RPGRoll.",
  "%rpgrollitems_helditem_rarity%": "Id de raridade do item na mão.",
  "%rpgrollitems_helditem_upgrade_level%": "Nível de melhoria atual.",
  "%rpgrollitems_helditem_durability% / _durability_max": "Durabilidade própria (não a barra vanilla).",

  "%rpgrollenchantments_helditem_count%": "Quantidade de encantamentos customizados no item.",
  "%rpgrollenchantments_helditem_<id>_level%": "Nível desse encantamento no item (0 se não tiver).",
  "%rpgrollenchantments_helditem_has_<id>%": "sim/não.",

  "%rpgrollquests_active_count%": "Quantidade de missões ativas.",
  "%rpgrollquests_completed_count%": "Quantidade de missões concluídas no total.",
  "%rpgrollquests_is_active_<id>% / %rpgrollquests_has_completed_<id>%": "sim/não.",
  "%rpgrollquests_active_<id>_stage%": "Id da etapa atual dessa missão, ou - se não estiver ativa.",

  "%rpgrollascension_evolution% / _specialization": "Id atual, ou - se não escolheu nenhuma.",
  "%rpgrollascension_prestige% / _legacy": "Ranques de prestígio/legado alcançados.",
  "%rpgrollascension_exp_bonus%": "% de bônus de experiência total (prestígio + legado).",
  "%rpgrollascension_talent_points%": "Pontos de talento não gastos.",
  "%rpgrollascension_affinity_<id>_level%": "Nível dessa afinidade (0-100).",
  "%rpgrollascension_reputation_%": "Reputação acumulada com essa facção.",
  "%rpgrollascension_title%": "Título ativo, ou -.",

  "%rpgrollmobs_active_count%": "Mobs do RPGRoll vivos agora, em todos os mundos.",
  "%rpgrollmobs_active_count_%": "O mesmo, filtrado por categoria (NORMAL, MINI_BOSS, etc.).",
  "%rpgrollmobs_definitions_count%": "Quantidade de definições de mob carregadas.",
  "%rpgrollmobs_nearest_name%": "Nome do mob do RPGRoll mais próximo do jogador.",
  "%rpgrollmobs_nearest_health% / _health_max": "A sua vida atual/máxima.",
  "%rpgrollmobs_nearest_distance%": "Distância em blocos.",

  "%rpgrollchat_channels_count%": "Quantidade de canais definidos (único placeholder que não precisa de jogador).",
  "%rpgrollchat_active_channel%": "Nome do canal ativo do jogador, ou -.",
  "%rpgrollchat_speaking_language%": "Idioma em que está falando atualmente.",
  "%rpgrollchat_known_languages_count%": "Quantidade de idiomas que conhece.",
  "%rpgrollchat_ignored_players_count%": "Quantidade de jogadores que tem ignorados.",

  "%rpgrollguilds_guilds_count%": "Quantidade total de guildas (único que não precisa de jogador).",
  "%rpgrollguilds_in_team% / _in_guild": "sim/não.",
  "%rpgrollguilds_team_name% / _team_size / _team_role": "Dados do seu time atual, ou -/0.",
  "%rpgrollguilds_guild_name% / _guild_id / _guild_level / _guild_role / _guild_members":
    "Dados da sua guilda atual, ou -/0.",

  "%rpgrolldungeons_active_count% / _definitions_count":
    "Instâncias ativas / masmorras definidas (globais no servidor).",
  "%rpgrolldungeons_occupied_<id>%": "sim/não — se essa masmorra tem uma instância rodando agora.",
  "%rpgrolldungeons_in_dungeon%": "sim/não para o jogador.",
  "%rpgrolldungeons_current_dungeon% / _current_room": "Masmorra e número de sala atual do jogador, ou -.",
  "%rpgrolldungeons_cooldown_<id>%": "Segundos restantes de cooldown para essa masmorra.",

  "%rpgeconomy_balance%": "Saldo do jogador na moeda padrão.",
  "%rpgeconomy_balance_<moneda>%": "Saldo numa moeda específica.",
  "%rpgeconomy_bank%": "Soma de todas as suas contas bancárias (moeda padrão).",
  "%rpgeconomy_currency%": "Nome da moeda padrão.",
  "%rpgeconomy_inflation%": "% de inflação da moeda padrão.",
  "%rpgeconomy_market_price_<producto>%": "Preço atual de mercado.",
  "%rpgeconomy_tax_rate_<tipo>%": "% total configurado para esse tipo de imposto.",
};

const MAP: Partial<Record<Locale, Map_>> = { en, pt };

export function localizedPlaceholder(name: string, fallback: string, locale: Locale): string {
  return MAP[locale]?.[name] ?? fallback;
}
