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
    langTitle: "Comandos en tu idioma",
    langBody:
      "Los comandos de jugador de todos los módulos aceptan su nombre y su primer subcomando en español, inglés y portugués, y Tab te sugiere los de tu idioma de Minecraft (otros idiomas ven el inglés; la consola, el español). Lo que escribas en otra lengua también vale y se sigue sugiriendo. Solo se traduce la primera palabra tras el comando; los comandos de administración siguen en inglés.",
    thEs: "Español",
    thEn: "Inglés",
    thPt: "Portugués",
    langDevTitle: "Para módulos propios",
    langDevBody:
      "Cada módulo trae un {file} con {cmd}: los nombres van como alias y cada palabra llega al comando en su forma de siempre, así que el código no cambia. Lo lee el puente de comandos de la Lib ({bridge}).",
    quickTitle: "Atajos: /dar, /invocar y /abrir",
    quickBody:
      "Tres comandos de RPGRoll-Lib que sirven para cualquier módulo instalado. {thing} es {typed} o solo el id si ningún otro tipo lo tiene; con Tab salen primero los tipos y, al escribir, los ids de todos.",
    qDar: "Da una cosa. Sin jugador, a ti. Lo que no cabe cae a sus pies.",
    qInvocar: "Invoca criaturas donde estás tú o el jugador indicado (máx. 50).",
    qAbrir: "Abre un menú como si el jugador escribiera su comando, con sus permisos. Solo salen los menús de los módulos instalados; la lista está en {cfg}. Para abrírselo a otro hace falta {perm}.",
    thType: "Tipo",
    thModule: "Módulo",
    thExample: "Ejemplo",
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
    consoleTitle: "Antes que nada, mira la consola del arranque",
    consoleBody:
      "Cuando falta una dependencia dura, Bukkit nombra exactamente cuál al cargar los plugins. Eso resuelve la mayoría de los casos de “el addon no aparece” sin tener que revisar configuración.",
    behavioursTitle: "Comportamientos documentados",
    behavioursLead:
      "No son fallas: son decisiones de diseño o limitaciones conocidas que ya están explicadas en la página de cada sistema, reunidas aquí para poder revisarlas de una. Cada una enlaza a su página de origen.",
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
    langTitle: "Commands in your language",
    langBody:
      "Player commands in every module accept their name and first subcommand in Spanish, English and Portuguese, and Tab suggests the ones in your Minecraft language (other languages see English; the console, Spanish). Whatever you type in another language works too and is still suggested. Only the first word after the command is translated; admin commands stay in English.",
    thEs: "Spanish",
    thEn: "English",
    thPt: "Portuguese",
    langDevTitle: "For your own modules",
    langDevBody:
      "Each module ships a {file} with {cmd}: names become aliases and each word reaches the command in its usual form, so the code doesn't change. The Lib's command bridge ({bridge}) reads it.",
    quickTitle: "Shortcuts: /dar, /invocar and /abrir",
    quickBody:
      "Three RPGRoll-Lib commands that work for every installed module. {thing} is {typed}, or just the id if no other type has it; Tab shows the types first and, as you type, ids from all of them.",
    qDar: "Gives a thing. Without a player, to you. What doesn't fit drops at their feet.",
    qInvocar: "Summons creatures where you or the given player stand (max 50).",
    qAbrir: "Opens a menu as if the player typed its command, with their permissions. Only installed modules' menus are listed; the list lives in {cfg}. Opening it for someone else needs {perm}.",
    thType: "Type",
    thModule: "Module",
    thExample: "Example",
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
    langTitle: "Comandos no seu idioma",
    langBody:
      "Os comandos de jogador de todos os módulos aceitam o nome e o primeiro subcomando em espanhol, inglês e português, e o Tab sugere os do seu idioma do Minecraft (outros idiomas veem o inglês; o console, o espanhol). O que você escrever em outra língua também vale e continua sendo sugerido. Só se traduz a primeira palavra depois do comando; os comandos de administração continuam em inglês.",
    thEs: "Espanhol",
    thEn: "Inglês",
    thPt: "Português",
    langDevTitle: "Para módulos próprios",
    langDevBody:
      "Cada módulo traz um {file} com {cmd}: os nomes viram aliases e cada palavra chega ao comando na sua forma de sempre, então o código não muda. Quem o lê é a ponte de comandos da Lib ({bridge}).",
    quickTitle: "Atalhos: /dar, /invocar e /abrir",
    quickBody:
      "Três comandos do RPGRoll-Lib que servem para qualquer módulo instalado. {thing} é {typed} ou só o id se nenhum outro tipo o tiver; com Tab aparecem primeiro os tipos e, ao escrever, os ids de todos.",
    qDar: "Dá uma coisa. Sem jogador, para você. O que não cabe cai aos pés dele.",
    qInvocar: "Invoca criaturas onde você ou o jogador indicado estão (máx. 50).",
    qAbrir: "Abre um menu como se o jogador escrevesse o comando, com as permissões dele. Só aparecem os menus dos módulos instalados; a lista fica em {cfg}. Para abrir para outro é preciso {perm}.",
    thType: "Tipo",
    thModule: "Módulo",
    thExample: "Exemplo",
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
