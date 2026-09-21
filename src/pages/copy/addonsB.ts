import type { Locale } from "../../i18n";

/** Texto de los addons, segunda tanda: RPGRoll-FX y Guilds. */

const es = {
  fx: {
    title: "RPGRoll-FX",
    intro:
      "Librería de efectos audiovisuales reusable — formas de partículas, sonidos, títulos/actionbar/bossbar y efectos de poción, todo secuenciable con delays. Independiente de RPGRollAPI a propósito, similar en espíritu a SCore de Ssomar: pensada para que cualquier addon (de RPGRoll o no) la use como su motor de “cómo se ve/suena esto”, sin acoplarse a ningún otro sistema.",
    confuseTitle: "No confundir con RPGRoll-Effects",
    confuseBody1: "RPGRoll-FX es la capa de {render} (partículas/sonidos/pantalla) — no tiene noción de duración, stacking, condiciones ni buffs/debuffs. Para eso está",
    confuseRender: "renderizado",
    confuseBody2: ", el motor de efectos de estado, que de hecho usa RPGRoll-FX por debajo para sus componentes visuales y de sonido.",

    reqTitle: "Requisitos",
    reqBody:
      "La dependencia con RPGRoll es solo para reusar el framework de contenido ({cm}) y de GUIs compartido — la lógica de partículas/sonidos en sí no toca ningún dato de RPGRollAPI.",

    modelTitle: "Un efecto es una secuencia de pasos",
    modelBody:
      "Un {def} (id, nombre, descripción) tiene una lista de {step} — cada uno con un {type}, un {delay} (en ticks, contado desde que se dispara toda la secuencia, no desde el paso anterior) y params libres. {engine} agenda cada paso con {scheduler} y los ejecuta de forma independiente — un error en un paso (partícula/sonido inválido) solo loguea un warning, no cancela el resto.",

    stepsTitle: "Tipos de paso",
    thType: "Tipo",
    thWhat: "Qué hace",
    sParticle: "Spawnea una {particle} vanilla siguiendo una forma geométrica (ver abajo).",
    sSound: "Reproduce un {sound} vanilla — personal (solo el jugador la escucha) o de mundo, según el {target}.",
    sTitle: "Título/subtítulo con fade-in/stay/fade-out configurables.",
    sActionbar: "Texto en la barra de acción.",
    sBossbar: "Bossbar temporal (color/estilo/progreso/duración), se remueve sola al vencer.",
    sPotion: "Aplica un {potion} vanilla real.",

    shapesTitle: "Formas de partícula",
    shapesBody:
      "El {shape} de un paso {particle} decide la geometría — pura matemática en {shapes}, sin ningún efecto colateral, así es fácil de razonar por separado del motor de ejecución.",
    thShape: "Forma",
    thParams: "Params relevantes",
    thDescription: "Descripción",
    shPoint: "Un solo punto (default si no se especifica shape).",
    shCircle: "Anillo plano horizontal.",
    shSphere: "Distribución pareja sobre una esfera (espiral áurea/Fibonacci).",
    shLine: "Recta entre dos puntos — única forma que usa un segundo target.",
    shHelix: "Espiral ascendente.",
    shCone: "Sale en la dirección hacia donde mira el origen (yaw/pitch), ensanchándose.",
    shCube: "Las 12 aristas de un cubo centrado en el origen.",
    shBurst: "Puntos aleatorios dentro de una esfera — explosión difusa.",
    pHalfSide: "radius (mitad del lado), points",
    pFromTo: "points, from/to (target)",

    targetsTitle: "A quién/dónde apunta cada paso",
    targetsBody: "{target} resuelve la ubicación/destinatario de cada paso a partir del {context} (quién lo disparó y, opcionalmente, un objetivo):",
    thTarget: "Target",
    thResolves: "Resuelve a",
    tSelf: "El jugador que disparó el efecto ({caster}).",
    tTarget: "La entidad/ubicación objetivo, si el contexto tiene una — si no, cae a SELF.",
    tLocation: "Todavía cae a la ubicación del caster (no tiene coordenadas propias configurables desde acá).",
    tNearby: "Solo para SOUND/TITLE/ACTIONBAR/BOSSBAR — todos los jugadores dentro de {radius} alrededor de {around}.",

    yamlTitle: "Ejemplos de archivo YAML",
    refBody:
      "cubre todos los tipos de paso, las 8 formas de partícula (incluyendo {shapes}, que los ejemplos de arriba no muestran) y los 4 targets, incluyendo {target}.",

    builderTitle: "Constructor visual: identidad del efecto",
    builderDesc:
      "id/nombre/descripción. La lista de steps es demasiado variada para un formulario lineal (cada tipo tiene sus propios params) — copia y adaptá uno de los ejemplos de arriba, o usá /rpgfx browser para armarlo paso a paso desde el chat en el juego.",
    fId: "Id",
    fDisplayName: "Nombre visible",
    fDescription: "Descripción",

    guiTitle: "GUI: Effect Studio de RPGRoll-FX",
    guiBody:
      "{browser} abre un navegador con botón “Crear nueva”. El editor muestra la lista de steps (tipo, delay, params resumidos) con soporte para quitarlos (shift-click) y agregar nuevos escribiendo en el chat con la sintaxis {syntax}, por ejemplo:",
    guiAfter:
      "El botón “▶ Probar” dispara el efecto completo sobre ti mismo, ahí mismo, para ver/escuchar el resultado sin salir de la GUI.",

    apiTitle: "API para addons — EffectsAPI y EffectBuilder",
    apiBody: "Cualquier addon que declare {soft} puede disparar un efecto ya definido por su id:",
    apiBuilder:
      "O armar uno de una sola vez, sin declarar nada en YAML, con el constructor fluido {builder} (mismo motor de ejecución por debajo, comportamiento idéntico):",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    cBrowser: "Abre el navegador gráfico.",
    cReload: "Recarga las definiciones desde disco.",
    cTest: "Dispara un efecto sobre ti mismo o sobre otro jugador.",
    cmdNote: "Todos requieren {perm} (default: op).",
  },

  guilds: {
    title: "Guilds (RPGRoll-Guilds)",
    intro1: "Sistema social con dos capas:",
    introTeams: "Teams",
    introTeamsDesc: "(equipos temporales para una sesión de juego) y",
    introGuilds: "Guilds",
    introGuildsDesc: "(organizaciones permanentes con banco, territorio, árbol de mejoras, diplomacia, misiones, logros, calendario y ranking).",

    reqTitle: "Requisitos",
    reqBody:
      "Sin Vault, el banco de la guild y el costo en dinero de crear una guild simplemente no cobran/pagan nada real. Sin RPGRoll-Quests, {winWar} y {completeDungeon} igual funcionan si el addon correspondiente (RPGRoll-Dungeons) está presente — la dependencia declarada es informativa, no estricta.",

    compareTitle: "Teams vs. Guilds",
    thTeam: "Team",
    thGuild: "Guild",
    rDuration: "Duración",
    rDurationTeam: "Temporal — se disuelve solo",
    rDurationGuild: "Permanente hasta {cmd}",
    rPersistence: "Persistencia",
    rPersistenceTeam: "Solo en memoria",
    rPersistenceGuild: "Guardada en disco ({store})",
    rRoles: "Roles",
    rRolesTeam: "{role} (líder/miembro)",
    rRolesGuild: "{role}: LEADER, OFFICER, MEMBER, RECRUIT",
    rSystems: "Sistemas propios",
    rSystemsTeam: "Buffs, ping, waypoint, cola de matchmaking",
    rSystemsGuild: "Banco, capital, territorio, árbol de mejoras, diplomacia, misiones, logros, calendario, ranking",

    noTemplateTitle: "No hay una “plantilla” de Guild en YAML",
    runtimeTitle: "Guild es 100% runtime, no contenido cargado",
    runtimeBody:
      "A diferencia de todos los demás addons de esta documentación, {guild} no implementa {content} ni se carga desde un {cm} — se crea en memoria con {ctor} cuando un jugador ejecuta {cmd}, y cada instancia se persiste como su propio archivo por {store}. No existe una carpeta de “guilds de ejemplo” para copiar, y el navegador gráfico ({browser}) muestra guilds reales ya creadas, no plantillas.",
    onlyYaml:
      "Lo único que sí es contenido YAML autoreable en este addon es {def} — las misiones de guild que cualquier guild puede activar (según su nivel) para ganar dinero y XP de guild.",
    creationNote:
      "Estos requisitos de creación ({file}, no un content-type) sí se pueden ajustar sin recompilar: costo en dinero (Vault), nivel mínimo de personaje, un permiso, una quest completada (RPGRoll-Quests) y/o un ítem con cantidad mínima.",

    questsTitle: "Misiones de guild (GuildQuestDefinition)",
    questsBody:
      "Cada misión define un {type}, una referencia de objetivo (material para {gather}, id de mob/dungeon para {defeat}), una cantidad, recompensas y un nivel mínimo de guild para poder activarla.",
    builderTitle: "Constructor visual: Guild Quest",
    refTitle: "Referencia completa: todos los campos en un solo archivo",
    refBody:
      "{file} (incluido en el jar) usa todos los campos de una misión de guild (esta es una de las estructuras más simples del ecosistema — el formulario de arriba ya la cubre al 100%).",
    fId: "Id",
    fDisplayName: "Nombre visible",
    fDescription: "Descripción",
    fType: "Tipo",
    fTargetRef: "Referencia del objetivo",
    fTargetRefPlaceholder: "OAK_LOG (material/mob/dungeon según el tipo)",
    fTargetAmount: "Cantidad objetivo",
    fRewardMoney: "Recompensa: dinero",
    fRewardXp: "Recompensa: XP de guild",
    fMinLevel: "Nivel mínimo de guild",

    rolesTitle: "Roles y permisos dentro de una guild",
    thRole: "Rol",
    thInvite: "Invitar",
    thKick: "Expulsar",
    thBank: "Gestionar banco",
    thSettings: "Gestionar ajustes",
    yes: "sí",
    no: "no",
    rolesNote:
      "“Gestionar ajustes” cubre territorio, capital, árbol de mejoras, diplomacia, calendario y personalización. Depositar en el banco siempre está permitido a cualquier miembro, sin importar el rol.",

    guiTitle: "GUI: hub de guild + navegador/editor de misiones",
    guiBody:
      "{info} (o el ítem correspondiente) abre {hub}, que enlaza a sub-pantallas propias: miembros, banco ({vault}), territorio, árbol de mejoras, diplomacia, calendario, logros y personalización. Para el {contentStrong} de esta página, {browser} (por defecto {guilds}) abre el navegador de guilds reales o el navegador/editor de {def} con botón “Crear nueva”.",
    contentStrong: "contenido YAML",

    teamCmdTitle: "Comandos de jugador — /team",
    guildCmdTitle: "Comandos de jugador — /guild",
    adminCmdTitle: "Comandos de administrador — /guildadmin",
    thCommand: "Comando",
    thWhat: "Qué hace",
    tInvite: "Invita a un jugador (crea el equipo si todavía no existe).",
    tAccept: "Acepta o rechaza la invitación pendiente.",
    tLeave: "Sale del equipo, o expulsa a alguien.",
    tInfo: "Abren el hub del equipo (miembros, buffs, configuración).",
    tPing: "Pings de mapa, waypoints compartidos, chat de equipo, cola de matchmaking.",
    gCreate: "Crea una guild si cumples los requisitos de {key}.",
    gDisband: "Disuelve tu guild (solo LEADER).",
    gAccept: "Gestión de membresía (unirte a una invitación, salir).",
    gInfo: "Abren cada sub-sistema (la mayoría como GUI).",
    gBrowser: "Abre el navegador de guilds reales (mismo GUI que {cmd}).",
    aBrowser: "Navegador de guilds reales, o de {def}.",
    aDelete: "Disuelve una guild por id (sin pasar por su LEADER).",
    aReload: "Recarga las misiones de guild desde disco (no hay nada más que recargar — las guilds son runtime).",
    permNote: "Requiere {perm} (default: op).",

    phTitle: "Placeholders (PlaceholderAPI)",
    phLead: "Expansión {badge}.",
    thPlaceholder: "Placeholder",
    thValue: "Valor",
  },
};

export type AddonsBCopy = typeof es;

const en: AddonsBCopy = {
  fx: {
    title: "RPGRoll-FX",
    intro:
      "Reusable audiovisual effects library — particle shapes, sounds, titles/actionbar/bossbar and potion effects, all sequenceable with delays. Deliberately independent from RPGRollAPI, similar in spirit to Ssomar's SCore: meant for any addon (RPGRoll or not) to use as its “how does this look/sound” engine, without coupling to any other system.",
    confuseTitle: "Do not confuse it with RPGRoll-Effects",
    confuseBody1: "RPGRoll-FX is the {render} layer (particles/sounds/screen) — it has no notion of duration, stacking, conditions or buffs/debuffs. That is what",
    confuseRender: "rendering",
    confuseBody2: " is for, the status effect engine, which in fact uses RPGRoll-FX underneath for its visual and sound components.",

    reqTitle: "Requirements",
    reqBody:
      "The dependency on RPGRoll is only to reuse the shared content ({cm}) and GUI framework — the particle/sound logic itself never touches any RPGRollAPI data.",

    modelTitle: "An effect is a sequence of steps",
    modelBody:
      "An {def} (id, name, description) has a list of {step} — each with a {type}, a {delay} (in ticks, counted from when the whole sequence fires, not from the previous step) and free-form params. {engine} schedules each step with {scheduler} and runs them independently — an error in one step (invalid particle/sound) only logs a warning, it does not cancel the rest.",

    stepsTitle: "Step types",
    thType: "Type",
    thWhat: "What it does",
    sParticle: "Spawns a vanilla {particle} following a geometric shape (see below).",
    sSound: "Plays a vanilla {sound} — personal (only the player hears it) or world-wide, depending on the {target}.",
    sTitle: "Title/subtitle with configurable fade-in/stay/fade-out.",
    sActionbar: "Text in the action bar.",
    sBossbar: "Temporary bossbar (colour/style/progress/duration), removes itself when it expires.",
    sPotion: "Applies a real vanilla {potion}.",

    shapesTitle: "Particle shapes",
    shapesBody:
      "The {shape} of a {particle} step decides the geometry — pure maths in {shapes}, with no side effects, so it is easy to reason about separately from the execution engine.",
    thShape: "Shape",
    thParams: "Relevant params",
    thDescription: "Description",
    shPoint: "A single point (the default when no shape is given).",
    shCircle: "Flat horizontal ring.",
    shSphere: "Even distribution over a sphere (golden/Fibonacci spiral).",
    shLine: "Straight line between two points — the only shape that uses a second target.",
    shHelix: "Ascending spiral.",
    shCone: "Comes out in the direction the origin is facing (yaw/pitch), widening as it goes.",
    shCube: "The 12 edges of a cube centred on the origin.",
    shBurst: "Random points inside a sphere — a diffuse explosion.",
    pHalfSide: "radius (half the side), points",
    pFromTo: "points, from/to (target)",

    targetsTitle: "Who/where each step points at",
    targetsBody: "{target} resolves each step's location/recipient from the {context} (who fired it and, optionally, a target):",
    thTarget: "Target",
    thResolves: "Resolves to",
    tSelf: "The player who fired the effect ({caster}).",
    tTarget: "The target entity/location, if the context has one — otherwise it falls back to SELF.",
    tLocation: "Still falls back to the caster's location (it has no configurable coordinates of its own from here).",
    tNearby: "Only for SOUND/TITLE/ACTIONBAR/BOSSBAR — every player within {radius} around {around}.",

    yamlTitle: "YAML file examples",
    refBody:
      "covers every step type, all 8 particle shapes (including {shapes}, which the examples above do not show) and the 4 targets, including {target}.",

    builderTitle: "Visual builder: effect identity",
    builderDesc:
      "id/name/description. The step list is too varied for a linear form (each type has its own params) — copy and adapt one of the examples above, or use /rpgfx browser to build it step by step from chat in game.",
    fId: "Id",
    fDisplayName: "Display name",
    fDescription: "Description",

    guiTitle: "GUI: RPGRoll-FX Effect Studio",
    guiBody:
      "{browser} opens a browser with a “Create new” button. The editor shows the step list (type, delay, summarised params) with support for removing them (shift-click) and adding new ones by typing in chat with the syntax {syntax}, for example:",
    guiAfter:
      "The “▶ Test” button fires the whole effect on yourself, right there, to see/hear the result without leaving the GUI.",

    apiTitle: "Addon API — EffectsAPI and EffectBuilder",
    apiBody: "Any addon that declares {soft} can fire an already-defined effect by its id:",
    apiBuilder:
      "Or build one on the spot, with nothing declared in YAML, using the fluent {builder} (same execution engine underneath, identical behaviour):",

    cmdTitle: "Commands",
    thCommand: "Command",
    cBrowser: "Opens the graphical browser.",
    cReload: "Reloads the definitions from disk.",
    cTest: "Fires an effect on yourself or on another player.",
    cmdNote: "They all require {perm} (default: op).",
  },

  guilds: {
    title: "Guilds (RPGRoll-Guilds)",
    intro1: "A social system with two layers:",
    introTeams: "Teams",
    introTeamsDesc: "(temporary squads for one play session) and",
    introGuilds: "Guilds",
    introGuildsDesc: "(permanent organisations with a bank, territory, upgrade tree, diplomacy, quests, achievements, calendar and ranking).",

    reqTitle: "Requirements",
    reqBody:
      "Without Vault, the guild bank and the money cost of creating a guild simply do not charge/pay anything real. Without RPGRoll-Quests, {winWar} and {completeDungeon} still work if the matching addon (RPGRoll-Dungeons) is present — the declared dependency is informational, not strict.",

    compareTitle: "Teams vs. Guilds",
    thTeam: "Team",
    thGuild: "Guild",
    rDuration: "Duration",
    rDurationTeam: "Temporary — dissolves on its own",
    rDurationGuild: "Permanent until {cmd}",
    rPersistence: "Persistence",
    rPersistenceTeam: "In memory only",
    rPersistenceGuild: "Saved to disk ({store})",
    rRoles: "Roles",
    rRolesTeam: "{role} (leader/member)",
    rRolesGuild: "{role}: LEADER, OFFICER, MEMBER, RECRUIT",
    rSystems: "Own systems",
    rSystemsTeam: "Buffs, ping, waypoint, matchmaking queue",
    rSystemsGuild: "Bank, capital, territory, upgrade tree, diplomacy, quests, achievements, calendar, ranking",

    noTemplateTitle: "There is no Guild “template” in YAML",
    runtimeTitle: "Guild is 100% runtime, not loaded content",
    runtimeBody:
      "Unlike every other addon in this documentation, {guild} does not implement {content} nor load from a {cm} — it is created in memory with {ctor} when a player runs {cmd}, and each instance is persisted as its own file by {store}. There is no “example guilds” folder to copy, and the graphical browser ({browser}) shows real, already-created guilds, not templates.",
    onlyYaml:
      "The only authorable YAML content in this addon is {def} — the guild quests any guild can activate (depending on its level) to earn money and guild XP.",
    creationNote:
      "These creation requirements ({file}, not a content type) can be adjusted without recompiling: money cost (Vault), minimum character level, a permission, a completed quest (RPGRoll-Quests) and/or an item with a minimum amount.",

    questsTitle: "Guild quests (GuildQuestDefinition)",
    questsBody:
      "Each quest defines a {type}, a target reference (material for {gather}, mob/dungeon id for {defeat}), an amount, rewards and a minimum guild level to be able to activate it.",
    builderTitle: "Visual builder: Guild Quest",
    refTitle: "Full reference: every field in a single file",
    refBody:
      "{file} (shipped in the jar) uses every field of a guild quest (this is one of the simplest structures in the ecosystem — the form above already covers it 100%).",
    fId: "Id",
    fDisplayName: "Display name",
    fDescription: "Description",
    fType: "Type",
    fTargetRef: "Target reference",
    fTargetRefPlaceholder: "OAK_LOG (material/mob/dungeon depending on the type)",
    fTargetAmount: "Target amount",
    fRewardMoney: "Reward: money",
    fRewardXp: "Reward: guild XP",
    fMinLevel: "Minimum guild level",

    rolesTitle: "Roles and permissions inside a guild",
    thRole: "Role",
    thInvite: "Invite",
    thKick: "Kick",
    thBank: "Manage bank",
    thSettings: "Manage settings",
    yes: "yes",
    no: "no",
    rolesNote:
      "“Manage settings” covers territory, capital, upgrade tree, diplomacy, calendar and customisation. Depositing into the bank is always allowed for any member, regardless of role.",

    guiTitle: "GUI: guild hub + quest browser/editor",
    guiBody:
      "{info} (or the matching item) opens {hub}, which links to its own sub-screens: members, bank ({vault}), territory, upgrade tree, diplomacy, calendar, achievements and customisation. For this page's {contentStrong}, {browser} (defaults to {guilds}) opens the real-guild browser or the {def} browser/editor with a “Create new” button.",
    contentStrong: "YAML content",

    teamCmdTitle: "Player commands — /team",
    guildCmdTitle: "Player commands — /guild",
    adminCmdTitle: "Admin commands — /guildadmin",
    thCommand: "Command",
    thWhat: "What it does",
    tInvite: "Invites a player (creates the team if it does not exist yet).",
    tAccept: "Accepts or declines the pending invitation.",
    tLeave: "Leaves the team, or kicks someone.",
    tInfo: "Open the team hub (members, buffs, settings).",
    tPing: "Map pings, shared waypoints, team chat, matchmaking queue.",
    gCreate: "Creates a guild if you meet the {key} requirements.",
    gDisband: "Disbands your guild (LEADER only).",
    gAccept: "Membership management (joining an invitation, leaving).",
    gInfo: "Open each sub-system (most of them as a GUI).",
    gBrowser: "Opens the real-guild browser (same GUI as {cmd}).",
    aBrowser: "Real-guild browser, or {def} browser.",
    aDelete: "Disbands a guild by id (without going through its LEADER).",
    aReload: "Reloads the guild quests from disk (there is nothing else to reload — guilds are runtime).",
    permNote: "Requires {perm} (default: op).",

    phTitle: "Placeholders (PlaceholderAPI)",
    phLead: "{badge} expansion.",
    thPlaceholder: "Placeholder",
    thValue: "Value",
  },
};

const pt: AddonsBCopy = {
  fx: {
    title: "RPGRoll-FX",
    intro:
      "Biblioteca de efeitos audiovisuais reutilizável — formas de partículas, sons, títulos/actionbar/bossbar e efeitos de poção, tudo sequenciável com delays. Independente da RPGRollAPI de propósito, similar em espírito ao SCore do Ssomar: pensada para que qualquer addon (do RPGRoll ou não) a use como o seu motor de “como isto se vê/soa”, sem se acoplar a nenhum outro sistema.",
    confuseTitle: "Não confundir com o RPGRoll-Effects",
    confuseBody1: "O RPGRoll-FX é a camada de {render} (partículas/sons/tela) — não tem noção de duração, stacking, condições nem buffs/debuffs. Para isso existe o",
    confuseRender: "renderização",
    confuseBody2: ", o motor de efeitos de estado, que aliás usa o RPGRoll-FX por baixo para os seus componentes visuais e de som.",

    reqTitle: "Requisitos",
    reqBody:
      "A dependência com o RPGRoll é só para reutilizar o framework de conteúdo ({cm}) e de GUIs compartilhado — a lógica de partículas/sons em si não toca nenhum dado da RPGRollAPI.",

    modelTitle: "Um efeito é uma sequência de passos",
    modelBody:
      "Um {def} (id, nome, descrição) tem uma lista de {step} — cada um com um {type}, um {delay} (em ticks, contado a partir de quando toda a sequência dispara, não do passo anterior) e params livres. O {engine} agenda cada passo com {scheduler} e os executa de forma independente — um erro num passo (partícula/som inválido) só registra um warning, não cancela o resto.",

    stepsTitle: "Tipos de passo",
    thType: "Tipo",
    thWhat: "O que faz",
    sParticle: "Spawna uma {particle} vanilla seguindo uma forma geométrica (veja abaixo).",
    sSound: "Toca um {sound} vanilla — pessoal (só o jogador ouve) ou de mundo, conforme o {target}.",
    sTitle: "Título/subtítulo com fade-in/stay/fade-out configuráveis.",
    sActionbar: "Texto na barra de ação.",
    sBossbar: "Bossbar temporária (cor/estilo/progresso/duração), remove-se sozinha ao vencer.",
    sPotion: "Aplica um {potion} vanilla real.",

    shapesTitle: "Formas de partícula",
    shapesBody:
      "O {shape} de um passo {particle} decide a geometria — pura matemática em {shapes}, sem nenhum efeito colateral, assim é fácil de raciocinar separadamente do motor de execução.",
    thShape: "Forma",
    thParams: "Params relevantes",
    thDescription: "Descrição",
    shPoint: "Um único ponto (default se não se especificar shape).",
    shCircle: "Anel plano horizontal.",
    shSphere: "Distribuição uniforme sobre uma esfera (espiral áurea/Fibonacci).",
    shLine: "Reta entre dois pontos — única forma que usa um segundo target.",
    shHelix: "Espiral ascendente.",
    shCone: "Sai na direção para onde a origem olha (yaw/pitch), alargando-se.",
    shCube: "As 12 arestas de um cubo centrado na origem.",
    shBurst: "Pontos aleatórios dentro de uma esfera — explosão difusa.",
    pHalfSide: "radius (metade do lado), points",
    pFromTo: "points, from/to (target)",

    targetsTitle: "Para quem/onde cada passo aponta",
    targetsBody: "{target} resolve a localização/destinatário de cada passo a partir do {context} (quem o disparou e, opcionalmente, um alvo):",
    thTarget: "Target",
    thResolves: "Resolve para",
    tSelf: "O jogador que disparou o efeito ({caster}).",
    tTarget: "A entidade/localização alvo, se o contexto tiver uma — se não, cai para SELF.",
    tLocation: "Ainda cai para a localização do caster (não tem coordenadas próprias configuráveis daqui).",
    tNearby: "Só para SOUND/TITLE/ACTIONBAR/BOSSBAR — todos os jogadores dentro de {radius} ao redor de {around}.",

    yamlTitle: "Exemplos de arquivo YAML",
    refBody:
      "cobre todos os tipos de passo, as 8 formas de partícula (incluindo {shapes}, que os exemplos acima não mostram) e os 4 targets, incluindo {target}.",

    builderTitle: "Construtor visual: identidade do efeito",
    builderDesc:
      "id/nome/descrição. A lista de steps é variada demais para um formulário linear (cada tipo tem os seus próprios params) — copie e adapte um dos exemplos acima, ou use /rpgfx browser para montá-lo passo a passo pelo chat no jogo.",
    fId: "Id",
    fDisplayName: "Nome visível",
    fDescription: "Descrição",

    guiTitle: "GUI: Effect Studio do RPGRoll-FX",
    guiBody:
      "{browser} abre um navegador com botão “Criar nova”. O editor mostra a lista de steps (tipo, delay, params resumidos) com suporte para removê-los (shift-clique) e adicionar novos digitando no chat com a sintaxe {syntax}, por exemplo:",
    guiAfter:
      "O botão “▶ Testar” dispara o efeito completo sobre você mesmo, ali mesmo, para ver/ouvir o resultado sem sair da GUI.",

    apiTitle: "API para addons — EffectsAPI e EffectBuilder",
    apiBody: "Qualquer addon que declare {soft} pode disparar um efeito já definido pelo seu id:",
    apiBuilder:
      "Ou montar um de uma vez, sem declarar nada em YAML, com o construtor fluente {builder} (mesmo motor de execução por baixo, comportamento idêntico):",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    cBrowser: "Abre o navegador gráfico.",
    cReload: "Recarrega as definições do disco.",
    cTest: "Dispara um efeito sobre você mesmo ou sobre outro jogador.",
    cmdNote: "Todos exigem {perm} (default: op).",
  },

  guilds: {
    title: "Guilds (RPGRoll-Guilds)",
    intro1: "Sistema social com duas camadas:",
    introTeams: "Teams",
    introTeamsDesc: "(times temporários para uma sessão de jogo) e",
    introGuilds: "Guilds",
    introGuildsDesc: "(organizações permanentes com banco, território, árvore de melhorias, diplomacia, missões, conquistas, calendário e ranking).",

    reqTitle: "Requisitos",
    reqBody:
      "Sem o Vault, o banco da guilda e o custo em dinheiro de criar uma guilda simplesmente não cobram/pagam nada real. Sem o RPGRoll-Quests, {winWar} e {completeDungeon} funcionam igual se o addon correspondente (RPGRoll-Dungeons) estiver presente — a dependência declarada é informativa, não estrita.",

    compareTitle: "Teams vs. Guilds",
    thTeam: "Team",
    thGuild: "Guild",
    rDuration: "Duração",
    rDurationTeam: "Temporário — dissolve-se sozinho",
    rDurationGuild: "Permanente até {cmd}",
    rPersistence: "Persistência",
    rPersistenceTeam: "Só em memória",
    rPersistenceGuild: "Salva em disco ({store})",
    rRoles: "Papéis",
    rRolesTeam: "{role} (líder/membro)",
    rRolesGuild: "{role}: LEADER, OFFICER, MEMBER, RECRUIT",
    rSystems: "Sistemas próprios",
    rSystemsTeam: "Buffs, ping, waypoint, fila de matchmaking",
    rSystemsGuild: "Banco, capital, território, árvore de melhorias, diplomacia, missões, conquistas, calendário, ranking",

    noTemplateTitle: "Não há um “modelo” de Guild em YAML",
    runtimeTitle: "Guild é 100% runtime, não conteúdo carregado",
    runtimeBody:
      "Ao contrário de todos os outros addons desta documentação, {guild} não implementa {content} nem é carregada de um {cm} — é criada em memória com {ctor} quando um jogador executa {cmd}, e cada instância é persistida como o seu próprio arquivo pelo {store}. Não existe uma pasta de “guildas de exemplo” para copiar, e o navegador gráfico ({browser}) mostra guildas reais já criadas, não modelos.",
    onlyYaml:
      "A única coisa que é conteúdo YAML autorável neste addon é {def} — as missões de guilda que qualquer guilda pode ativar (conforme o seu nível) para ganhar dinheiro e XP de guilda.",
    creationNote:
      "Estes requisitos de criação ({file}, não um content-type) podem ser ajustados sem recompilar: custo em dinheiro (Vault), nível mínimo de personagem, uma permissão, uma quest concluída (RPGRoll-Quests) e/ou um item com quantidade mínima.",

    questsTitle: "Missões de guilda (GuildQuestDefinition)",
    questsBody:
      "Cada missão define um {type}, uma referência de alvo (material para {gather}, id de mob/masmorra para {defeat}), uma quantidade, recompensas e um nível mínimo de guilda para poder ativá-la.",
    builderTitle: "Construtor visual: Guild Quest",
    refTitle: "Referência completa: todos os campos num só arquivo",
    refBody:
      "{file} (incluído no jar) usa todos os campos de uma missão de guilda (esta é uma das estruturas mais simples do ecossistema — o formulário acima já a cobre 100%).",
    fId: "Id",
    fDisplayName: "Nome visível",
    fDescription: "Descrição",
    fType: "Tipo",
    fTargetRef: "Referência do alvo",
    fTargetRefPlaceholder: "OAK_LOG (material/mob/masmorra conforme o tipo)",
    fTargetAmount: "Quantidade alvo",
    fRewardMoney: "Recompensa: dinheiro",
    fRewardXp: "Recompensa: XP de guilda",
    fMinLevel: "Nível mínimo de guilda",

    rolesTitle: "Papéis e permissões dentro de uma guilda",
    thRole: "Papel",
    thInvite: "Convidar",
    thKick: "Expulsar",
    thBank: "Gerenciar banco",
    thSettings: "Gerenciar ajustes",
    yes: "sim",
    no: "não",
    rolesNote:
      "“Gerenciar ajustes” cobre território, capital, árvore de melhorias, diplomacia, calendário e personalização. Depositar no banco é sempre permitido a qualquer membro, independente do papel.",

    guiTitle: "GUI: hub de guilda + navegador/editor de missões",
    guiBody:
      "{info} (ou o item correspondente) abre o {hub}, que liga a sub-telas próprias: membros, banco ({vault}), território, árvore de melhorias, diplomacia, calendário, conquistas e personalização. Para o {contentStrong} desta página, {browser} (por padrão {guilds}) abre o navegador de guildas reais ou o navegador/editor de {def} com botão “Criar nova”.",
    contentStrong: "conteúdo YAML",

    teamCmdTitle: "Comandos de jogador — /team",
    guildCmdTitle: "Comandos de jogador — /guild",
    adminCmdTitle: "Comandos de administrador — /guildadmin",
    thCommand: "Comando",
    thWhat: "O que faz",
    tInvite: "Convida um jogador (cria o time se ainda não existir).",
    tAccept: "Aceita ou recusa o convite pendente.",
    tLeave: "Sai do time, ou expulsa alguém.",
    tInfo: "Abrem o hub do time (membros, buffs, configuração).",
    tPing: "Pings de mapa, waypoints compartilhados, chat de time, fila de matchmaking.",
    gCreate: "Cria uma guilda se você cumprir os requisitos de {key}.",
    gDisband: "Dissolve a sua guilda (só LEADER).",
    gAccept: "Gestão de membresia (entrar num convite, sair).",
    gInfo: "Abrem cada subsistema (a maioria como GUI).",
    gBrowser: "Abre o navegador de guildas reais (mesma GUI que {cmd}).",
    aBrowser: "Navegador de guildas reais, ou de {def}.",
    aDelete: "Dissolve uma guilda por id (sem passar pelo seu LEADER).",
    aReload: "Recarrega as missões de guilda do disco (não há mais nada para recarregar — as guildas são runtime).",
    permNote: "Exige {perm} (default: op).",

    phTitle: "Placeholders (PlaceholderAPI)",
    phLead: "Expansão {badge}.",
    thPlaceholder: "Placeholder",
    thValue: "Valor",
  },
};

export const ADDONS_B_COPY: Record<Locale, AddonsBCopy> = { es, en, pt };
