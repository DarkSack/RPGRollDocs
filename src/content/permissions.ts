export interface PermissionInfo {
  node: string;
  description: string;
  default: "true" | "op" | "false";
  children?: string[];
}

export const permissions: PermissionInfo[] = [
  {
    node: "rpgroll.*",
    description: "Acceso completo a todos los comandos de RPGRoll.",
    default: "op",
    children: ["rpgroll.player.*", "rpgroll.admin.*"],
  },
  {
    node: "rpgroll.player.*",
    description: "Acceso a todos los comandos de jugador.",
    default: "true",
    children: [
      "rpgroll.player.stats",
      "rpgroll.player.level",
      "rpgroll.player.class",
      "rpgroll.player.race",
      "rpgroll.player.create",
      "rpgroll.player.skills",
      "rpgroll.player.traits",
      "rpgroll.player.mystats",
      "rpgroll.player.allocate",
      "rpgroll.player.useskill",
      "rpgroll.player.jobs",
    ],
  },
  { node: "rpgroll.player.stats", description: "Ver estadísticas.", default: "true" },
  { node: "rpgroll.player.level", description: "Ver nivel y experiencia.", default: "true" },
  { node: "rpgroll.player.class", description: "Ver y cambiar clase.", default: "true" },
  { node: "rpgroll.player.race", description: "Ver y cambiar raza.", default: "true" },
  { node: "rpgroll.player.create", description: "Crear personaje.", default: "true" },
  { node: "rpgroll.player.skills", description: "Ver habilidades.", default: "true" },
  { node: "rpgroll.player.traits", description: "Ver traits.", default: "true" },
  { node: "rpgroll.player.mystats", description: "Ver estadísticas detalladas.", default: "true" },
  { node: "rpgroll.player.allocate", description: "Gastar puntos de estadística disponibles.", default: "true" },
  { node: "rpgroll.player.useskill", description: "Usar habilidades aprendidas.", default: "true" },
  { node: "rpgroll.player.jobs", description: "Ver y gestionar trabajos.", default: "true" },
  {
    node: "rpgroll.admin.*",
    description: "Acceso a todos los comandos de administrador.",
    default: "op",
    children: [
      "rpgroll.admin.reload",
      "rpgroll.admin.addxp",
      "rpgroll.admin.levelup",
      "rpgroll.admin.gui",
      "rpgroll.admin.setrace",
      "rpgroll.admin.setclass",
      "rpgroll.admin.resetstats",
      "rpgroll.admin.job",
    ],
  },
  { node: "rpgroll.admin.reload", description: "Recargar configuración del plugin.", default: "op" },
  { node: "rpgroll.admin.addxp", description: "Agregar experiencia a jugadores.", default: "op" },
  { node: "rpgroll.admin.levelup", description: "Subir de nivel (debug).", default: "op" },
  { node: "rpgroll.admin.gui", description: "Abrir interfaces de selección en modo preview.", default: "op" },
  { node: "rpgroll.admin.setrace", description: "Cambiar la raza de un jugador.", default: "op" },
  { node: "rpgroll.admin.setclass", description: "Cambiar la clase de un jugador.", default: "op" },
  {
    node: "rpgroll.admin.resetstats",
    description: "Reiniciar y reembolsar los puntos de atributo de un jugador.",
    default: "op",
  },
  { node: "rpgroll.admin.job", description: "Gestionar trabajos de jugadores.", default: "op" },
];
