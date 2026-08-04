export interface ConfigKeyDoc {
  key: string;
  type: string;
  default: string;
  description: string;
}

export interface ConfigFileDoc {
  filename: string;
  path: string;
  description: string;
  keys: ConfigKeyDoc[];
}

export const configFiles: ConfigFileDoc[] = [
  {
    filename: "config.yml",
    path: "plugins/RPGRoll/config.yml",
    description: "Configuración general del plugin.",
    keys: [
      { key: "config-version", type: "int", default: "1", description: "Versión del esquema de este archivo." },
      { key: "language", type: "string", default: "es_MX", description: "Idioma de los mensajes (archivo en lang/)." },
      { key: "debug", type: "boolean", default: "false", description: "Activa logging adicional para diagnóstico." },
    ],
  },
  {
    filename: "database.yml",
    path: "plugins/RPGRoll/config/database.yml",
    description: "Conexión a la base de datos. Actualmente solo SQLite está soportado.",
    keys: [
      { key: "database.type", type: "string", default: "sqlite", description: "Motor de base de datos." },
      {
        key: "database.filename",
        type: "string",
        default: "rpgroll.db",
        description: "Nombre del archivo, dentro de plugins/RPGRoll/database/.",
      },
      {
        key: "database.connection.foreign_keys",
        type: "boolean",
        default: "true",
        description: "Habilita claves foráneas (recomendado, no desactivar).",
      },
      {
        key: "database.connection.journal_mode",
        type: "string",
        default: "WAL",
        description: "Modo de journal SQLite. WAL es más rápido para lecturas/escrituras concurrentes.",
      },
      {
        key: "database.connection.busy_timeout",
        type: "int (ms)",
        default: "5000",
        description: "Tiempo de espera cuando la BD está bloqueada por otra conexión.",
      },
    ],
  },
  {
    filename: "gameplay.yml",
    path: "plugins/RPGRoll/config/gameplay.yml",
    description: "El archivo más grande: experiencia, atributos, clases/razas, habilidades, trabajos y combate.",
    keys: [
      { key: "experience.base_exp", type: "int", default: "100", description: "XP base para la fórmula de nivel." },
      {
        key: "experience.exp_multiplier",
        type: "double",
        default: "1.5",
        description: "Exponente de la fórmula: base_exp * (nivel ^ exp_multiplier).",
      },
      { key: "experience.max_level", type: "int", default: "100", description: "Nivel máximo alcanzable." },
      {
        key: "experience.mob_exp.<entidad>",
        type: "int",
        default: "10 (zombie)",
        description: "XP otorgada al matar ese tipo de mob (zombie, skeleton, creeper, spider, enderman, boss, …).",
      },
      { key: "stats.base_value", type: "int", default: "10", description: "Valor de cada atributo al crear personaje." },
      { key: "stats.min_value", type: "int", default: "1", description: "Valor mínimo permitido por atributo." },
      { key: "stats.max_value", type: "int", default: "20", description: "Valor máximo permitido por atributo." },
      {
        key: "stats.points_per_level",
        type: "int",
        default: "2",
        description: "Referencia informativa — el valor real por nivel se define en levelup-rewards.yml.",
      },
      {
        key: "classes.allow_class_change",
        type: "boolean",
        default: "false",
        description: "Si los jugadores pueden cambiar de clase ellos mismos.",
      },
      {
        key: "races.allow_race_change",
        type: "boolean",
        default: "false",
        description: "Si los jugadores pueden cambiar de raza ellos mismos.",
      },
      {
        key: "skills.global_cooldown",
        type: "double (s)",
        default: "1.0",
        description: "Cooldown compartido entre CUALQUIER par de usos de habilidad, además del cooldown propio de cada una.",
      },
      {
        key: "skills.allow_in_combat",
        type: "boolean",
        default: "true",
        description: "Si se pueden usar habilidades mientras el jugador está en combate reciente.",
      },
      {
        key: "professions.max_per_player",
        type: "int",
        default: "2",
        description: "⚠ No usado por el sistema de Jobs actual (que permite 3, fijo en código). Config heredada de un diseño anterior.",
      },
      {
        key: "combat.combat_duration",
        type: "int (s)",
        default: "10",
        description: "Ventana de tiempo tras el último golpe durante la cual el jugador cuenta como \"en combate\".",
      },
      {
        key: "combat.natural_regen_in_combat",
        type: "boolean",
        default: "false",
        description: "Si la regeneración pasiva de salud/maná sigue activa mientras estás en combate.",
      },
      {
        key: "combat.health_regen_percent",
        type: "double (%)",
        default: "2.0",
        description: "Porcentaje del máximo de salud regenerado por intervalo.",
      },
      {
        key: "combat.mana_regen_percent",
        type: "double (%)",
        default: "5.0",
        description: "Porcentaje del máximo de maná regenerado por intervalo.",
      },
      {
        key: "combat.regen_interval_seconds",
        type: "int (s)",
        default: "5",
        description: "Cada cuánto se aplica un tick de regeneración pasiva.",
      },
      {
        key: "combat.critical.base_chance",
        type: "double (%)",
        default: "5.0",
        description: "⚠ Informativo — el crítico real por jugador se calcula en CombatStats (5% + destreza), este valor no se lee en código.",
      },
      {
        key: "combat.critical.damage_multiplier",
        type: "double",
        default: "2.0",
        description: "⚠ Informativo — el multiplicador real usado es 1.5x, fijo en CombatStats. Ver advertencia arriba.",
      },
    ],
  },
  {
    filename: "levelup-rewards.yml",
    path: "plugins/RPGRoll/config/levelup-rewards.yml",
    description:
      "Recompensas por nivel: puntos de estadística, bonos de salud/maná, y habilidades/traits desbloqueados. Los niveles sin entrada explícita usan los valores de 'defaults'.",
    keys: [
      { key: "rewards.<nivel>.exp_required", type: "int", default: "fórmula", description: "XP total necesaria para alcanzar ese nivel." },
      { key: "rewards.<nivel>.stat_points", type: "int", default: "2", description: "Puntos de atributo otorgados al llegar a ese nivel." },
      { key: "rewards.<nivel>.health_bonus", type: "int", default: "5 × nivel", description: "Cuánto crece la salud máxima." },
      { key: "rewards.<nivel>.mana_bonus", type: "int", default: "3 × nivel", description: "Cuánto crece el maná máximo." },
      {
        key: "rewards.<nivel>.unlocked_skills",
        type: "string[]",
        default: "[]",
        description: "IDs de skills aprendidas automáticamente al llegar a ese nivel.",
      },
      {
        key: "rewards.<nivel>.unlocked_traits",
        type: "string[]",
        default: "[]",
        description: "IDs de traits adquiridos automáticamente al llegar a ese nivel.",
      },
      {
        key: "defaults.*",
        type: "—",
        default: "—",
        description: "Valores usados cuando un nivel específico no tiene entrada propia bajo 'rewards'.",
      },
    ],
  },
];
