export interface CommandInfo {
  name: string;
  usage: string;
  description: string;
  permission: string | null;
  aliases: string[];
  category: "jugador" | "admin";
  consoleAllowed?: boolean;
}

export const commands: CommandInfo[] = [
  {
    name: "create",
    usage: "/rpg create",
    description: "Inicia el flujo de creación de personaje (elegir raza y clase) si aún no lo tienes.",
    permission: "rpgroll.player.create",
    aliases: ["crear", "nuevo"],
    category: "jugador",
  },
  {
    name: "stats",
    usage: "/rpg stats",
    description: "Muestra tus 6 atributos D&D (fuerza, destreza, constitución, inteligencia, sabiduría, carisma).",
    permission: "rpgroll.player.stats",
    aliases: ["estadisticas", "est"],
    category: "jugador",
  },
  {
    name: "mystats",
    usage: "/rpg mystats",
    description:
      "Estadísticas detalladas: atributos, puntos sin gastar, salud/maná actuales, armadura, evasión y crítico.",
    permission: "rpgroll.player.mystats",
    aliases: ["detailed", "detalles"],
    category: "jugador",
  },
  {
    name: "allocate",
    usage: "/rpg allocate <fuerza|destreza|constitucion|inteligencia|sabiduria|carisma> <cantidad>",
    description:
      "Gasta puntos de estadística disponibles (ganados al subir de nivel). Ajusta salud/maná/evasión/crítico automáticamente si corresponde.",
    permission: "rpgroll.player.allocate",
    aliases: ["asignar", "gastar"],
    category: "jugador",
  },
  {
    name: "level",
    usage: "/rpg level",
    description: "Muestra tu nivel actual y experiencia acumulada.",
    permission: "rpgroll.player.level",
    aliases: ["nivel", "lvl", "exp"],
    category: "jugador",
  },
  {
    name: "race",
    usage: "/rpg race [nombre|list]",
    description: "Muestra tu raza actual, o lista las razas disponibles.",
    permission: "rpgroll.player.race",
    aliases: ["raza", "r"],
    category: "jugador",
  },
  {
    name: "class",
    usage: "/rpg class [nombre|list]",
    description: "Muestra tu clase actual, o lista las clases disponibles.",
    permission: "rpgroll.player.class",
    aliases: ["clase", "c"],
    category: "jugador",
  },
  {
    name: "skills",
    usage: "/rpg skills",
    description:
      "Lista tus habilidades aprendidas junto con su costo de maná, cooldown y el comando exacto para usarlas.",
    permission: "rpgroll.player.skills",
    aliases: ["habilidades", "hab"],
    category: "jugador",
  },
  {
    name: "use",
    usage: "/rpg use <skillId>",
    description:
      "Usa una habilidad aprendida: descuenta maná, respeta cooldowns y aplica daño mágico al objetivo apuntado.",
    permission: "rpgroll.player.useskill",
    aliases: ["usar", "cast"],
    category: "jugador",
  },
  {
    name: "traits",
    usage: "/rpg traits",
    description: "Muestra los traits (rasgos) que has adquirido.",
    permission: "rpgroll.player.traits",
    aliases: ["rasgos", "trt"],
    category: "jugador",
  },
  {
    name: "jobs",
    usage: "/rpg jobs",
    description:
      "Abre la GUI de trabajos: catálogo completo y estado de cada uno (activo con nivel/XP, o disponible para unirte).",
    permission: "rpgroll.player.jobs",
    aliases: ["trabajos", "trabajo"],
    category: "jugador",
  },
  {
    name: "reload",
    usage: "/rpg reload",
    description: "Recarga la configuración y todo el contenido YAML (razas, clases, jobs, skills, traits) sin reiniciar.",
    permission: "rpgroll.admin.reload",
    aliases: [],
    category: "admin",
    consoleAllowed: true,
  },
  {
    name: "addxp",
    usage: "/rpg addxp <jugador> <cantidad>",
    description: "Agrega experiencia a un jugador conectado.",
    permission: "rpgroll.admin.addxp",
    aliases: ["dxp"],
    category: "admin",
  },
  {
    name: "levelup",
    usage: "/rpg levelup",
    description: "Fuerza un intento de level up sobre ti mismo — útil para probar recompensas de nivel.",
    permission: "rpgroll.admin.levelup",
    aliases: ["lvlup", "testlvl"],
    category: "admin",
  },
  {
    name: "admingui",
    usage: "/rpg admingui <race|class>",
    description: "Abre las GUIs de selección de raza/clase en modo preview, sin afectar tu personaje real.",
    permission: "rpgroll.admin.gui",
    aliases: ["agui"],
    category: "admin",
  },
  {
    name: "setrace",
    usage: "/rpg setrace <jugador> <razaId> [--recalc]",
    description:
      "Cambia la raza de un jugador. Sin --recalc conserva sus stats actuales; con --recalc los recalcula desde cero (raza + clase), perdiendo asignaciones manuales.",
    permission: "rpgroll.admin.setrace",
    aliases: [],
    category: "admin",
  },
  {
    name: "setclass",
    usage: "/rpg setclass <jugador> <claseId> [--recalc]",
    description: "Igual que setrace, pero para la clase del jugador.",
    permission: "rpgroll.admin.setclass",
    aliases: [],
    category: "admin",
  },
  {
    name: "resetstats",
    usage: "/rpg resetstats <jugador>",
    description:
      "Reinicia los 6 atributos de un jugador a su valor base y le devuelve, como puntos sin gastar, el total que debería tener acumulado según su nivel (respec completo).",
    permission: "rpgroll.admin.resetstats",
    aliases: [],
    category: "admin",
  },
  {
    name: "job",
    usage: "/rpg job <give|remove|setlevel> <jugador> <jobId> [nivel]",
    description: "Administra los trabajos activos de un jugador: asignar, quitar o fijar su nivel.",
    permission: "rpgroll.admin.job",
    aliases: [],
    category: "admin",
  },
];
