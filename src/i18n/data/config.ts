import type { Locale } from "../strings";

/**
 * Traducción de los archivos de configuración: la descripción de cada archivo
 * y la de cada clave, indexadas por nombre de archivo y por clave.
 *
 * Las claves (`experience.base_exp`), los tipos y los valores por defecto no
 * se traducen: van literales en el YAML.
 */
type Map_ = Record<string, string>;

const filesEn: Map_ = {
  "config.yml": "General plugin configuration.",
  "database.yml": "Database connection. Only SQLite is supported right now.",
  "gameplay.yml": "The biggest file: experience, attributes, classes/races, skills, jobs and combat.",
  "levelup-rewards.yml":
    "Per-level rewards: stat points, health/mana bonuses, and unlocked skills/traits. Levels with no explicit entry fall back to 'defaults'.",
};

const keysEn: Map_ = {
  "config-version": "Schema version of this file.",
  language: "Message language (file under lang/).",
  debug: "Enables extra logging for diagnostics.",

  "database.type": "Database engine.",
  "database.filename": "File name, inside plugins/RPGRoll/database/.",
  "database.connection.foreign_keys": "Enables foreign keys (recommended, do not turn off).",
  "database.connection.journal_mode":
    "SQLite journal mode. WAL is faster for concurrent reads/writes.",
  "database.connection.busy_timeout": "How long to wait when the DB is locked by another connection.",

  "experience.base_exp": "Base XP for the level formula.",
  "experience.exp_multiplier": "Formula exponent: base_exp * (level ^ exp_multiplier).",
  "experience.max_level": "Highest reachable level.",
  "experience.mob_exp.<entidad>":
    "XP granted for killing that mob type (zombie, skeleton, creeper, spider, enderman, boss, …).",
  "stats.base_value": "Value of each attribute at character creation.",
  "stats.min_value": "Lowest allowed value per attribute.",
  "stats.max_value": "Highest allowed value per attribute.",
  "stats.points_per_level":
    "Informational reference — the real per-level value is defined in levelup-rewards.yml.",
  "classes.allow_class_change": "Whether players can change class themselves.",
  "races.allow_race_change": "Whether players can change race themselves.",
  "skills.global_cooldown":
    "Cooldown shared between ANY two skill uses, on top of each skill's own cooldown.",
  "skills.allow_in_combat": "Whether skills can be used while the player is in recent combat.",
  "professions.max_per_player":
    "⚠ Unused by the current Jobs system (which allows 3, hardcoded). Legacy config from an earlier design.",
  "combat.combat_duration":
    "Time window after the last hit during which the player counts as \"in combat\".",
  "combat.natural_regen_in_combat":
    "Whether passive health/mana regeneration stays active while in combat.",
  "combat.health_regen_percent": "Percentage of max health regenerated per interval.",
  "combat.mana_regen_percent": "Percentage of max mana regenerated per interval.",
  "combat.regen_interval_seconds": "How often a passive regeneration tick is applied.",
  "combat.critical.base_chance":
    "⚠ Informational — the real per-player crit is computed in CombatStats (5% + dexterity); this value is not read by the code.",
  "combat.critical.damage_multiplier":
    "⚠ Informational — the multiplier actually used is 1.5x, hardcoded in CombatStats. See the warning above.",

  "rewards.<nivel>.exp_required": "Total XP needed to reach that level.",
  "rewards.<nivel>.stat_points": "Attribute points granted on reaching that level.",
  "rewards.<nivel>.health_bonus": "How much max health grows.",
  "rewards.<nivel>.mana_bonus": "How much max mana grows.",
  "rewards.<nivel>.unlocked_skills": "IDs of skills learned automatically on reaching that level.",
  "rewards.<nivel>.unlocked_traits": "IDs of traits acquired automatically on reaching that level.",
  "defaults.*": "Values used when a specific level has no entry of its own under 'rewards'.",
};

const filesPt: Map_ = {
  "config.yml": "Configuração geral do plugin.",
  "database.yml": "Conexão com o banco de dados. No momento só SQLite é suportado.",
  "gameplay.yml": "O arquivo maior: experiência, atributos, classes/raças, habilidades, trabalhos e combate.",
  "levelup-rewards.yml":
    "Recompensas por nível: pontos de atributo, bônus de vida/mana e habilidades/traits desbloqueados. Níveis sem entrada explícita usam os valores de 'defaults'.",
};

const keysPt: Map_ = {
  "config-version": "Versão do esquema deste arquivo.",
  language: "Idioma das mensagens (arquivo em lang/).",
  debug: "Ativa logging adicional para diagnóstico.",

  "database.type": "Motor do banco de dados.",
  "database.filename": "Nome do arquivo, dentro de plugins/RPGRoll/database/.",
  "database.connection.foreign_keys": "Habilita chaves estrangeiras (recomendado, não desative).",
  "database.connection.journal_mode":
    "Modo de journal do SQLite. WAL é mais rápido para leituras/escritas concorrentes.",
  "database.connection.busy_timeout":
    "Tempo de espera quando o banco está bloqueado por outra conexão.",

  "experience.base_exp": "XP base para a fórmula de nível.",
  "experience.exp_multiplier": "Expoente da fórmula: base_exp * (nível ^ exp_multiplier).",
  "experience.max_level": "Nível máximo alcançável.",
  "experience.mob_exp.<entidad>":
    "XP concedida ao matar esse tipo de mob (zombie, skeleton, creeper, spider, enderman, boss, …).",
  "stats.base_value": "Valor de cada atributo ao criar o personagem.",
  "stats.min_value": "Valor mínimo permitido por atributo.",
  "stats.max_value": "Valor máximo permitido por atributo.",
  "stats.points_per_level":
    "Referência informativa — o valor real por nível é definido em levelup-rewards.yml.",
  "classes.allow_class_change": "Se os jogadores podem mudar de classe por conta própria.",
  "races.allow_race_change": "Se os jogadores podem mudar de raça por conta própria.",
  "skills.global_cooldown":
    "Cooldown compartilhado entre QUALQUER par de usos de habilidade, além do cooldown próprio de cada uma.",
  "skills.allow_in_combat":
    "Se as habilidades podem ser usadas enquanto o jogador está em combate recente.",
  "professions.max_per_player":
    "⚠ Não usado pelo sistema de Jobs atual (que permite 3, fixo no código). Configuração herdada de um design anterior.",
  "combat.combat_duration":
    "Janela de tempo após o último golpe durante a qual o jogador conta como \"em combate\".",
  "combat.natural_regen_in_combat":
    "Se a regeneração passiva de vida/mana continua ativa durante o combate.",
  "combat.health_regen_percent": "Porcentagem da vida máxima regenerada por intervalo.",
  "combat.mana_regen_percent": "Porcentagem da mana máxima regenerada por intervalo.",
  "combat.regen_interval_seconds": "A cada quanto tempo se aplica um tick de regeneração passiva.",
  "combat.critical.base_chance":
    "⚠ Informativo — o crítico real por jogador é calculado em CombatStats (5% + destreza); este valor não é lido pelo código.",
  "combat.critical.damage_multiplier":
    "⚠ Informativo — o multiplicador realmente usado é 1.5x, fixo em CombatStats. Veja o aviso acima.",

  "rewards.<nivel>.exp_required": "XP total necessária para alcançar esse nível.",
  "rewards.<nivel>.stat_points": "Pontos de atributo concedidos ao chegar a esse nível.",
  "rewards.<nivel>.health_bonus": "Quanto a vida máxima cresce.",
  "rewards.<nivel>.mana_bonus": "Quanto a mana máxima cresce.",
  "rewards.<nivel>.unlocked_skills": "IDs de habilidades aprendidas automaticamente ao chegar a esse nível.",
  "rewards.<nivel>.unlocked_traits": "IDs de traits adquiridos automaticamente ao chegar a esse nível.",
  "defaults.*": "Valores usados quando um nível específico não tem entrada própria em 'rewards'.",
};

const FILES: Partial<Record<Locale, Map_>> = { en: filesEn, pt: filesPt };
const KEYS: Partial<Record<Locale, Map_>> = { en: keysEn, pt: keysPt };

export function localizedConfigFile(filename: string, fallback: string, locale: Locale): string {
  return FILES[locale]?.[filename] ?? fallback;
}

export function localizedConfigKey(key: string, fallback: string, locale: Locale): string {
  return KEYS[locale]?.[key] ?? fallback;
}
