/**
 * Registro consolidado de placeholders de PlaceholderAPI.
 *
 * Generado a partir de las tablas que ya existían en la sección
 * `#placeholders` de la página de cada addon, no escrito a mano: esa página
 * sigue siendo la fuente de verdad y esta lista existe para poder buscar un
 * placeholder sin saber de antemano qué addon lo expone.
 *
 * Si agregás un placeholder a la página de un addon, agregalo también acá.
 */

export interface PlaceholderInfo {
  /** Token tal cual se escribe, incluidos los argumentos entre <>. */
  name: string;
  description: string;
  /** Expansión de PlaceholderAPI que lo registra (derivada del prefijo). */
  expansion: string;
  /** Página del addon que lo documenta en detalle. */
  slug: string;
}

export const placeholders: PlaceholderInfo[] = [
  { name: "%rpgroll_level%", description: "Nivel actual.", expansion: "rpgroll", slug: "jugadores" },
  { name: "%rpgroll_xp% / %rpgroll_xp_next%", description: "Experiencia actual / requerida para el próximo nivel.", expansion: "rpgroll", slug: "jugadores" },
  { name: "%rpgroll_xp_percent%", description: "Progreso hacia el próximo nivel, en %.", expansion: "rpgroll", slug: "jugadores" },
  { name: "%rpgroll_race% / %rpgroll_class%", description: "Raza/clase actual, o - si no tiene.", expansion: "rpgroll", slug: "jugadores" },
  { name: "%rpgroll_health% / %rpgroll_health_max%", description: "Salud del pool propio de RPGRoll (no los corazones vanilla).", expansion: "rpgroll", slug: "jugadores" },
  { name: "%rpgroll_mana% / %rpgroll_mana_max%", description: "Maná actual/máximo.", expansion: "rpgroll", slug: "jugadores" },
  { name: "%rpgroll_armor% / %rpgroll_evasion% / %rpgroll_critical_chance%", description: "Stats de combate derivados.", expansion: "rpgroll", slug: "jugadores" },
  { name: "%rpgroll_strength% ... %rpgroll_charisma%", description: "Los 6 atributos D&D.", expansion: "rpgroll", slug: "jugadores" },
  { name: "%rpgroll_stat_points%", description: "Puntos de atributo sin gastar.", expansion: "rpgroll", slug: "jugadores" },
  { name: "%rpgroll_job_<id>_level%", description: "Nivel en ese trabajo (0 si no lo tiene).", expansion: "rpgroll", slug: "jugadores" },
  { name: "%rpgroll_has_skill_<id>% / %rpgroll_has_trait_<id>%", description: "si/no.", expansion: "rpgroll", slug: "jugadores" },
  { name: "%rpgrollitems_stat_<nombre>%", description: "Total de ese stat sumando armadura + mano principal/secundaria + gemas.", expansion: "rpgrollitems", slug: "items" },
  { name: "%rpgrollitems_helditem_name%", description: "Nombre del ítem en mano, o - si no es un ítem de RPGRoll.", expansion: "rpgrollitems", slug: "items" },
  { name: "%rpgrollitems_helditem_rarity%", description: "Id de rareza del ítem en mano.", expansion: "rpgrollitems", slug: "items" },
  { name: "%rpgrollitems_helditem_upgrade_level%", description: "Nivel de mejora actual.", expansion: "rpgrollitems", slug: "items" },
  { name: "%rpgrollitems_helditem_durability% / _durability_max", description: "Durabilidad propia (no la barra vanilla).", expansion: "rpgrollitems", slug: "items" },
  { name: "%rpgrollenchantments_helditem_count%", description: "Cantidad de encantamientos custom en el ítem.", expansion: "rpgrollenchantments", slug: "encantamientos" },
  { name: "%rpgrollenchantments_helditem_<id>_level%", description: "Nivel de ese encantamiento en el ítem (0 si no lo tiene).", expansion: "rpgrollenchantments", slug: "encantamientos" },
  { name: "%rpgrollenchantments_helditem_has_<id>%", description: "si/no.", expansion: "rpgrollenchantments", slug: "encantamientos" },
  { name: "%rpgrollquests_active_count%", description: "Cantidad de misiones activas.", expansion: "rpgrollquests", slug: "quests" },
  { name: "%rpgrollquests_completed_count%", description: "Cantidad de misiones completadas en total.", expansion: "rpgrollquests", slug: "quests" },
  { name: "%rpgrollquests_is_active_<id>% / %rpgrollquests_has_completed_<id>%", description: "si/no.", expansion: "rpgrollquests", slug: "quests" },
  { name: "%rpgrollquests_active_<id>_stage%", description: "Id de la etapa actual de esa misión, o - si no está activa.", expansion: "rpgrollquests", slug: "quests" },
  { name: "%rpgrollascension_evolution% / _specialization", description: "Id actual, o - si no eligió ninguna.", expansion: "rpgrollascension", slug: "ascension" },
  { name: "%rpgrollascension_prestige% / _legacy", description: "Rangos de prestigio/legado alcanzados.", expansion: "rpgrollascension", slug: "ascension" },
  { name: "%rpgrollascension_exp_bonus%", description: "% de bono de experiencia total (prestigio + legado).", expansion: "rpgrollascension", slug: "ascension" },
  { name: "%rpgrollascension_talent_points%", description: "Puntos de talento sin gastar.", expansion: "rpgrollascension", slug: "ascension" },
  { name: "%rpgrollascension_affinity_<id>_level%", description: "Nivel de esa afinidad (0-100).", expansion: "rpgrollascension", slug: "ascension" },
  { name: "%rpgrollascension_reputation_%", description: "Reputación acumulada con esa facción.", expansion: "rpgrollascension", slug: "ascension" },
  { name: "%rpgrollascension_title%", description: "Título activo, o -.", expansion: "rpgrollascension", slug: "ascension" },
  { name: "%rpgrollmobs_active_count%", description: "Mobs RPGRoll vivos ahora mismo, en todos los mundos.", expansion: "rpgrollmobs", slug: "mobs" },
  { name: "%rpgrollmobs_active_count_%", description: "Igual, filtrado por categoría (NORMAL, MINI_BOSS, etc.).", expansion: "rpgrollmobs", slug: "mobs" },
  { name: "%rpgrollmobs_definitions_count%", description: "Cantidad de definiciones de mob cargadas.", expansion: "rpgrollmobs", slug: "mobs" },
  { name: "%rpgrollmobs_nearest_name%", description: "Nombre del mob RPGRoll más cercano al jugador.", expansion: "rpgrollmobs", slug: "mobs" },
  { name: "%rpgrollmobs_nearest_health% / _health_max", description: "Su vida actual/máxima.", expansion: "rpgrollmobs", slug: "mobs" },
  { name: "%rpgrollmobs_nearest_distance%", description: "Distancia en bloques.", expansion: "rpgrollmobs", slug: "mobs" },
  { name: "%rpgrollchat_channels_count%", description: "Cantidad de canales definidos (único placeholder que no necesita un jugador).", expansion: "rpgrollchat", slug: "chat" },
  { name: "%rpgrollchat_active_channel%", description: "Nombre del canal activo del jugador, o -.", expansion: "rpgrollchat", slug: "chat" },
  { name: "%rpgrollchat_speaking_language%", description: "Idioma en el que está hablando actualmente.", expansion: "rpgrollchat", slug: "chat" },
  { name: "%rpgrollchat_known_languages_count%", description: "Cantidad de idiomas que conoce.", expansion: "rpgrollchat", slug: "chat" },
  { name: "%rpgrollchat_ignored_players_count%", description: "Cantidad de jugadores que tiene ignorados.", expansion: "rpgrollchat", slug: "chat" },
  { name: "%rpgrollguilds_guilds_count%", description: "Cantidad total de guilds (único que no necesita jugador).", expansion: "rpgrollguilds", slug: "guilds" },
  { name: "%rpgrollguilds_in_team% / _in_guild", description: "si/no.", expansion: "rpgrollguilds", slug: "guilds" },
  { name: "%rpgrollguilds_team_name% / _team_size / _team_role", description: "Datos de tu equipo actual, o -/0.", expansion: "rpgrollguilds", slug: "guilds" },
  { name: "%rpgrollguilds_guild_name% / _guild_id / _guild_level / _guild_role / _guild_members", description: "Datos de tu guild actual, o -/0.", expansion: "rpgrollguilds", slug: "guilds" },
  { name: "%rpgrolldungeons_active_count% / _definitions_count", description: "Instancias activas / mazmorras definidas (globales al servidor).", expansion: "rpgrolldungeons", slug: "dungeons" },
  { name: "%rpgrolldungeons_occupied_<id>%", description: "si/no — si esa mazmorra tiene una instancia corriendo ahora.", expansion: "rpgrolldungeons", slug: "dungeons" },
  { name: "%rpgrolldungeons_in_dungeon%", description: "si/no para el jugador.", expansion: "rpgrolldungeons", slug: "dungeons" },
  { name: "%rpgrolldungeons_current_dungeon% / _current_room", description: "Mazmorra y número de sala actual del jugador, o -.", expansion: "rpgrolldungeons", slug: "dungeons" },
  { name: "%rpgrolldungeons_cooldown_<id>%", description: "Segundos restantes de cooldown para esa mazmorra.", expansion: "rpgrolldungeons", slug: "dungeons" },
  { name: "%rpgeconomy_balance%", description: "Saldo del jugador en la moneda por defecto.", expansion: "rpgeconomy", slug: "economy" },
  { name: "%rpgeconomy_balance_<moneda>%", description: "Saldo en una moneda específica.", expansion: "rpgeconomy", slug: "economy" },
  { name: "%rpgeconomy_bank%", description: "Suma de todas sus cuentas bancarias (moneda por defecto).", expansion: "rpgeconomy", slug: "economy" },
  { name: "%rpgeconomy_currency%", description: "Nombre de la moneda por defecto.", expansion: "rpgeconomy", slug: "economy" },
  { name: "%rpgeconomy_inflation%", description: "% de inflación de la moneda por defecto.", expansion: "rpgeconomy", slug: "economy" },
  { name: "%rpgeconomy_market_price_<producto>%", description: "Precio actual de mercado.", expansion: "rpgeconomy", slug: "economy" },
  { name: "%rpgeconomy_tax_rate_<tipo>%", description: "% total configurado para ese tipo de impuesto.", expansion: "rpgeconomy", slug: "economy" },
];

/** Expansiones presentes, ordenadas alfabéticamente. */
export const placeholderExpansions: string[] = [
  ...new Set(placeholders.map((p) => p.expansion)),
].sort();
