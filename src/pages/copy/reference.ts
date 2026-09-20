import type { Locale } from "../../i18n";

/** Texto de las páginas de referencia cortas (Comandos y Permisos). */

const es = {
  commands: {
    title: "Comandos",
    intro:
      "Todo pasa por un único comando raíz: {root} (alias {a1}, {a2}). Sin argumentos muestra la ayuda con los comandos que el que ejecuta tiene permiso de ver.",
    playerTitle: "Comandos de jugador",
    adminTitle: "Comandos de administrador",
    thCommand: "Comando",
    thAliases: "Alias",
    thPermission: "Permiso",
    thDescription: "Descripción",
    none: "ninguno",
    fromConsole: "Ejecutable desde consola.",
    consoleTitle: "La mayoría requiere ser jugador, salvo los comandos que reciben un jugador objetivo",
    consoleBody:
      "{list} pueden ejecutarse también desde la consola del servidor — el resto de comandos de administrador ({rest}) y todos los de jugador exigen ser un jugador en el mundo.",
    tabTitle: "Autocompletado real, no solo la lista de subcomandos",
    tabBody:
      "Además de sugerir el subcomando, {root} (y el de cada addon) sugiere desde el manager de contenido real en varios subcomandos: {ex1} lista razas de verdad desde el {manager}, {ex2} lista trabajos reales, etc. ({ex3} y {ex4} siguen usando una lista placeholder, no el manager real). Ver el detalle técnico en",
    tabLink: "Arquitectura → Tab-completion",
    seePerms: "Ver el árbol completo de permisos en",
  },
  permissions: {
    title: "Permisos",
    intro: "Árbol completo de permisos declarado en {file}.",
    wildcardTitle: "Nodos generales",
    wildcardLead:
      "{all} agrupa todo. {player} (default: todos) agrupa los comandos de jugador. {admin} (default: op) agrupa los comandos de administración.",
    thNode: "Nodo",
    thDefault: "Default",
    thIncludes: "Incluye",
    thDescription: "Descripción",
    leavesTitle: "Permisos individuales",
    legendTitle: "Leyenda",
    legendTrue: "= todos los jugadores lo tienen por defecto.",
    legendOp: "= solo operadores del servidor.",
    seeCommands: "Ver qué comando corresponde a cada permiso en",
  },
  troubleshooting: {
    title: "Troubleshooting",
    intro:
      "Qué revisar cuando algo no arranca o no hace lo esperado, y la lista de comportamientos documentados que suelen confundirse con errores.",
    metaSymptoms: "Síntomas",
    metaBehaviours: "Comportamientos",
    symptomsTitle: "Diagnóstico por síntoma",
    symptomsLead:
      "Cada entrada sale del grafo de dependencias declarado por los plugins y de las integraciones documentadas — no de errores hipotéticos.",
    causes: "Causas posibles",
    fix: "Solución",
    see: "Ver",
    consoleTitle: "Antes que nada, mirá la consola del arranque",
    consoleBody:
      "Cuando falta una dependencia dura, Bukkit nombra exactamente cuál al cargar los plugins. Eso resuelve la mayoría de los casos de “el addon no aparece” sin tener que revisar configuración.",
    behavioursTitle: "Comportamientos documentados",
    behavioursLead:
      "No son fallas: son decisiones de diseño o limitaciones conocidas que ya están explicadas en la página de cada sistema, reunidas acá para poder revisarlas de una. Cada una enlaza a su página de origen.",
    filter: "Filtrar",
    all: "Todos",
  },
};

export type ReferenceCopy = typeof es;

const en: ReferenceCopy = {
  commands: {
    title: "Commands",
    intro:
      "Everything goes through a single root command: {root} (aliases {a1}, {a2}). With no arguments it shows the help listing the commands the caller is allowed to see.",
    playerTitle: "Player commands",
    adminTitle: "Admin commands",
    thCommand: "Command",
    thAliases: "Aliases",
    thPermission: "Permission",
    thDescription: "Description",
    none: "none",
    fromConsole: "Can run from the console.",
    consoleTitle: "Most require being a player, except the commands that take a target player",
    consoleBody:
      "{list} can also run from the server console — the rest of the admin commands ({rest}) and every player command require being a player in the world.",
    tabTitle: "Real tab-completion, not just the subcommand list",
    tabBody:
      "Beyond suggesting the subcommand, {root} (and each addon's) suggests from the real content manager in several subcommands: {ex1} lists actual races from the {manager}, {ex2} lists real jobs, and so on. ({ex3} and {ex4} still use a placeholder list, not the real manager.) The technical detail is in",
    tabLink: "Architecture → Tab-completion",
    seePerms: "See the full permission tree in",
  },
  permissions: {
    title: "Permissions",
    intro: "Full permission tree as declared in {file}.",
    wildcardTitle: "Wildcard nodes",
    wildcardLead:
      "{all} groups everything. {player} (default: everyone) groups the player commands. {admin} (default: op) groups the admin commands.",
    thNode: "Node",
    thDefault: "Default",
    thIncludes: "Includes",
    thDescription: "Description",
    leavesTitle: "Individual permissions",
    legendTitle: "Legend",
    legendTrue: "= every player has it by default.",
    legendOp: "= server operators only.",
    seeCommands: "See which command maps to each permission in",
  },
  troubleshooting: {
    title: "Troubleshooting",
    intro:
      "What to check when something will not start or does not behave as expected, plus the list of documented behaviours that are often mistaken for bugs.",
    metaSymptoms: "Symptoms",
    metaBehaviours: "Behaviours",
    symptomsTitle: "Diagnosis by symptom",
    symptomsLead:
      "Every entry comes from the dependency graph the plugins declare and from the documented integrations — not from hypothetical errors.",
    causes: "Possible causes",
    fix: "Fix",
    see: "See",
    consoleTitle: "First of all, look at the startup console",
    consoleBody:
      "When a hard dependency is missing, Bukkit names exactly which one while loading the plugins. That resolves most “the addon does not show up” cases without touching any configuration.",
    behavioursTitle: "Documented behaviours",
    behavioursLead:
      "These are not failures: they are design decisions or known limitations already explained on each system's page, gathered here so you can scan them in one go. Each links back to its source page.",
    filter: "Filter",
    all: "All",
  },
};

const pt: ReferenceCopy = {
  commands: {
    title: "Comandos",
    intro:
      "Tudo passa por um único comando raiz: {root} (aliases {a1}, {a2}). Sem argumentos mostra a ajuda com os comandos que quem executa tem permissão de ver.",
    playerTitle: "Comandos de jogador",
    adminTitle: "Comandos de administrador",
    thCommand: "Comando",
    thAliases: "Aliases",
    thPermission: "Permissão",
    thDescription: "Descrição",
    none: "nenhuma",
    fromConsole: "Executável pelo console.",
    consoleTitle: "A maioria exige ser jogador, exceto os comandos que recebem um jogador alvo",
    consoleBody:
      "{list} também podem ser executados pelo console do servidor — os demais comandos de administrador ({rest}) e todos os de jogador exigem ser um jogador no mundo.",
    tabTitle: "Autocompletar real, não só a lista de subcomandos",
    tabBody:
      "Além de sugerir o subcomando, {root} (e o de cada addon) sugere a partir do gerenciador de conteúdo real em vários subcomandos: {ex1} lista raças de verdade a partir do {manager}, {ex2} lista trabalhos reais, etc. ({ex3} e {ex4} ainda usam uma lista placeholder, não o gerenciador real). Veja o detalhe técnico em",
    tabLink: "Arquitetura → Tab-completion",
    seePerms: "Veja a árvore completa de permissões em",
  },
  permissions: {
    title: "Permissões",
    intro: "Árvore completa de permissões declarada em {file}.",
    wildcardTitle: "Nós gerais",
    wildcardLead:
      "{all} agrupa tudo. {player} (default: todos) agrupa os comandos de jogador. {admin} (default: op) agrupa os comandos de administração.",
    thNode: "Nó",
    thDefault: "Default",
    thIncludes: "Inclui",
    thDescription: "Descrição",
    leavesTitle: "Permissões individuais",
    legendTitle: "Legenda",
    legendTrue: "= todos os jogadores têm por padrão.",
    legendOp: "= apenas operadores do servidor.",
    seeCommands: "Veja qual comando corresponde a cada permissão em",
  },
  troubleshooting: {
    title: "Solução de problemas",
    intro:
      "O que verificar quando algo não inicia ou não faz o esperado, e a lista de comportamentos documentados que costumam ser confundidos com erros.",
    metaSymptoms: "Sintomas",
    metaBehaviours: "Comportamentos",
    symptomsTitle: "Diagnóstico por sintoma",
    symptomsLead:
      "Cada entrada vem do grafo de dependências declarado pelos plugins e das integrações documentadas — não de erros hipotéticos.",
    causes: "Causas possíveis",
    fix: "Solução",
    see: "Ver",
    consoleTitle: "Antes de tudo, olhe o console da inicialização",
    consoleBody:
      "Quando falta uma dependência dura, o Bukkit nomeia exatamente qual ao carregar os plugins. Isso resolve a maioria dos casos de “o addon não aparece” sem precisar revisar configuração.",
    behavioursTitle: "Comportamentos documentados",
    behavioursLead:
      "Não são falhas: são decisões de design ou limitações conhecidas já explicadas na página de cada sistema, reunidas aqui para você revisá-las de uma vez. Cada uma leva à sua página de origem.",
    filter: "Filtrar",
    all: "Todos",
  },
};

export const REFERENCE_COPY: Record<Locale, ReferenceCopy> = { es, en, pt };
