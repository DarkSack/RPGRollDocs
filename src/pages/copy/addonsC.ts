import type { Locale } from "../../i18n";

/** Texto de los addons, tercera tanda: Quests y Seasons. */

const es = {
  quests: {
    title: "Misiones (RPGRoll-Quests)",
    intro:
      "Motor de misiones por etapas: objetivos, condiciones, diálogos con ramas, recompensas encadenables y regiones propias (sin WorldGuard) — sin GUI, todo por comando y chat.",
    selfTitle: "Autocontenido — su propio guardado en YAML por jugador",
    selfBody: "No usa la base de datos SQLite de {core} ni PDC: el progreso de cada jugador vive en {path}.",

    reqTitle: "Requisitos",
    reqBody:
      "No depende de RPGRoll-Items (las recompensas de ítem usan {material} vanilla directo) ni de RPGRoll-NPCs (la integración es por un evento propio, ver más abajo).",

    structTitle: "Una misión es una lista de etapas",
    structBody:
      "Cada {stage} tiene objetivos, condiciones y, opcionalmente, un diálogo. Por defecto avanza linealmente a la siguiente etapa de la lista cuando se cumplen todos sus objetivos {and} condiciones — pero si el diálogo de la etapa tiene opciones, la etapa {notAuto}: se le muestran al jugador como botones de chat clickeables, cada uno saltando a la etapa que quieras (para adelante, para atrás, o a cualquier id) — así es como se arma un árbol de decisiones real sobre una lista que en el archivo es plana.",
    structAnd: "y",
    structNotAuto: "no avanza sola",
    branchFile: "quests/tutorial.yml (fragmento con ramas)",

    objTitle: "Objetivos",
    objLead: "10 tipos incorporados, la mitad reactivos a eventos y la otra mitad chequeados por un polling cada 20 ticks:",
    thType: "Tipo",
    thHow: "Cómo progresa",
    oKill: "EntityDeathEvent, si mató un jugador.",
    oBlock: "BlockBreakEvent / BlockPlaceEvent.",
    oCollect: "EntityPickupItemEvent del jugador.",
    oDeliver: "Al hablar con el NPC correcto, consume los ítems del inventario del jugador si tiene suficientes.",
    oTalk: "Evento propio {event} (ver integración con NPCs).",
    oCommand: "PlayerCommandPreprocessEvent — dispara con cualquier comando que empiece igual.",
    oWait: "Polling: tiempo transcurrido desde que entraste a la etapa.",
    oReach: "Polling: distancia a un punto fijo, con radio configurable.",
    oDiscover: "Polling: estar dentro de una región propia del addon.",
    objTip:
      "El progreso de objetivos se resetea al cambiar de etapa — cada objetivo cuenta desde 0 dentro de su propia etapa, no acumula entre etapas.",

    condTitle: "Condiciones",
    condBody:
      "Mismo patrón liviano que Items/Mobs: comparaciones ({cmp}) o una única función soportada ({fn}), resueltas contra {vars} — extensible por otros addons.",

    regionTitle: "Regiones (sin WorldGuard)",
    regionLead: "Cuboides simples propias, exactamente como en RPGRoll-Mobs — sin dependencia externa:",
    bRegion: "Constructor visual: Region",
    fId: "Id",
    fWorld: "Mundo",
    fMin: "Esquina mínima",
    fMax: "Esquina máxima",

    rewardTitle: "Recompensas y encadenado",
    rewardBody:
      "Dinero (Vault), experiencia, ítems ({material} vanilla, sin integración con RPGRoll-Items), comandos, y una lista de {strong} al completar esta — permitiendo encadenar una campaña completa.",
    rewardStrong: "otras misiones para iniciar automáticamente",

    npcTitle: "Integración con RPGRoll-NPCs",
    guiTitle: "GUI: navegador y editor para Quest y Region",
    guiBody:
      "{browser} (por defecto {quests}) abre un navegador con botón “Crear nueva”. El editor de {quest} cubre nombre, categoría, dificultad, repetible, cooldown, nivel requerido y recompensas de dinero/experiencia, más alta/baja rápida de ids de etapa; el de {region} tiene botones “Fijar esquina mínima/máxima acá” que usan tu ubicación actual.",

    yamlTitle: "Ejemplo de archivo YAML",
    refTitle: "Referencia completa: todos los campos en un solo archivo",
    refBody:
      "{file} (incluido en el jar) usa los 9 tipos de objetivo, los 6 eventos ({events}), diálogo con opciones y todos los campos de {reqs} y {rewards} en un solo archivo.",

    bQuest: "Constructor visual: Quest",
    bQuestDesc:
      "Identidad, categoría/dificultad, cooldown, requisito de nivel y recompensas simples. Las etapas (stages) con objetivos/diálogo/ramas son demasiado anidadas para este formulario — usá uno de los ejemplos de arriba como base y editalo a mano, o construilas directamente en el editor in-game.",
    fDisplayName: "Nombre visible",
    fCategory: "Categoría",
    fDifficulty: "Dificultad",
    fRepeatable: "Repetible",
    fCooldown: "Cooldown (si es repetible)",
    fRequirements: "Requisitos",
    fMinLevel: "Nivel mínimo",
    fRewards: "Recompensas",
    fMoney: "Dinero",
    fExperience: "Experiencia",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    thWhat: "Qué hace",
    cList: "Lista todas las misiones definidas.",
    cInfo: "Categoría, dificultad, cantidad de etapas, si es repetible.",
    cStart: "La inicia si cumples requisitos, no está en cooldown y no la tienes activa.",
    cAbandon: "La abandona (sin penalidad ni recompensa).",
    cActive: "Lista tus misiones activas y en qué etapa vas.",
    cCompleted: "Cuántas y cuáles completaste.",
    aGive: "Inicio forzado — ignora requisitos, cooldown y repetibilidad.",
    aComplete: "Completa una misión activa al instante, con recompensas completas.",
    aFail: "La marca como fallida (sin recompensa).",
    aReset: "Borra todo rastro de esa misión para el jugador — permite reiniciar incluso una no repetible.",
    aBrowser: "Abre el navegador gráfico de misiones o regiones.",
    aReload: "Recarga misiones (no regiones).",
    permNote: "Requiere {perm} (default: op).",

    phTitle: "Placeholders (PlaceholderAPI)",
    phLead: "Expansión {badge}.",
    thPlaceholder: "Placeholder",
    thValue: "Valor",
  },

  seasons: {
    title: "Seasons (RPGRoll-Seasons)",
    intro:
      "Calendario y estaciones 100% personalizables — no atado al reloj día/noche de Minecraft. Clima dinámico por bioma, reacciones de vegetación, mobs y un jefe exclusivo por estación, eventos mundiales, y regiones con su propio calendario o estación fija.",
    calTitle: "No depende del calendario de Minecraft",
    calBody:
      "Un {cal} (se llama así, no simplemente “Calendar”, para no colisionar con {javaCal}) es un ciclo ordenado de ids de estación que se repite para siempre. Cada estación mide su duración en horas reales, días reales, semanas reales o días de Minecraft — la que elijas, independiente entre estaciones del mismo calendario.",

    reqTitle: "Requisitos",
    reqBody1:
      "Sin RPGRoll-Mobs, los {mobMods} de una estación simplemente no hacen nada (el resto — calendario, clima, vegetación, eventos mundiales de partículas/sonido — funciona igual). Sin",
    reqBody2: ", los componentes {applyEffect} de un evento mundial tampoco.",

    calendarsTitle: "Calendarios y estaciones",
    calendarsBody:
      "Un calendario no tiene por qué llamarse {classic} — puede ser cualquier ciclo temático ({example}). Cada mundo tiene su propio reloj ({clock}), independiente del de otros mundos, aunque compartan el mismo calendario.",

    subTitle: "Subestaciones",
    subBody:
      "Cualquier estación puede dividirse en subestaciones (ej. Primavera Temprana/Media/Tardía), cada una con su propia duración y, opcionalmente, una temperatura fija que {replaces} (no suma) la temperatura calculada del bioma mientras esté activa.",
    subReplaces: "reemplaza",

    climateTitle: "Sistema climático y temperatura",
    climateBody:
      "Cada estación define un {profile}: chances (0.0-1.0) de lluvia, tormenta, nieve, niebla, ola de calor y tormenta eléctrica, más una temperatura base y su variación. Un {task} re-sortea el clima de cada mundo con jugadores online cada 5 minutos y lo aplica con {api} — la nieve es 100% vanilla: si está lloviendo y el bioma es frío, Minecraft ya la dibuja solo.",

    vegTitle: "Vegetación dinámica",
    vegBody:
      "Un {task} aplica los efectos de la estación activa cerca de cada jugador online, con muestreo al azar y probabilidad baja por intento — un efecto ambiental gradual, no un “photoshop” instantáneo del radio entero.",
    thEffect: "Efecto",
    thWhat: "Qué hace",
    vSnow: "Capas de nieve sobre pasto/tierra/piedra en puntos con temperatura < 0°C.",
    vIce: "Congela agua expuesta en puntos fríos.",
    vDry: "Reduce la humedad de tierra de cultivo cercana — sequía mecánica real, no solo visual.",
    vLeaves: "Partículas de hojas cayendo cerca de árboles.",
    vFlower: "Florece pasto cercano con flores al azar.",

    mobsTitle: "Mobs y jefe exclusivo de temporada",
    mobsBody:
      "{mobMods} es una lista de (id de mob de RPGRoll-Mobs, chance extra de spawn) evaluada cerca de cada jugador online. {boss} es, como mucho, un mob por estación con una chance fija del 15% de aparecer una vez por día de Minecraft (según {fullTime}, sin relación con la unidad de duración que configuraste para la estación) cerca de un jugador al azar del mundo, con anuncio a todos.",

    eventsTitle: "Eventos mundiales",
    eventsBody:
      "Un {event} corre sobre {all} los jugadores online del mundo donde se dispara — no hay noción de “target” individual como en Magic/Effects. Cada estación sortea, una vez por día de Minecraft, si dispara uno de sus {worldEvents} elegibles según {chance}.",
    eventsAll: "todos",
    thComponent: "Tipo de componente",
    thScope: "Alcance",
    ePerPlayer: "Por jugador (VISUAL delega en Particles).",
    eEffect: "Por jugador, vía RPGRoll-Effects.",
    eSpawn: "Por jugador, con su propia {chance} — vía RPGRoll-Mobs.",
    eMessage: "Una vez, a todo el mundo.",
    eCommand: "Una vez por mundo (no por jugador).",

    regionsTitle: "Regiones",
    regionsBody: "Una {region} es una simple caja (AABB, sin depender de WorldGuard) con un modo de override:",
    thMode: "Modo",
    thBehaviour: "Comportamiento",
    mFollow: "Usa el reloj normal del mundo (default — casi ninguna región lo necesita explícitamente).",
    mPinnedSeason: "Siempre la misma estación fija, sin ningún reloj (ej. “Desierto: siempre verano”).",
    mPinnedCal: "Corre su propio calendario con un reloj completamente independiente al del mundo (ej. “Reino mágico: su propio ciclo”).",

    yamlTitle: "Ejemplos de archivo YAML",
    refTitle: "Referencia completa: todos los campos en un solo archivo",
    refBody: "{file} (incluido en el jar) agrega {fields}, los dos campos que ninguno de los dos ejemplos de arriba muestra, junto con todos los demás.",

    bSeason: "Constructor visual: identidad y duración de la estación",
    bSeasonDesc:
      "Clima, subestaciones, modificadores de bioma, vegetación y mobs de temporada son demasiado variados para un formulario lineal — todos viven en pantallas propias dentro del editor in-game. Copia y adaptá uno de los ejemplos de arriba para esos campos.",
    fId: "Id",
    fDisplayName: "Nombre visible",
    fIcon: "Ícono (Material)",
    fColor: "Color",
    fDescription: "Descripción",
    fDuration: "Duración",
    fDurationUnit: "Unidad de duración",
    fBoss: "Jefe exclusivo (id de mob)",
    fEventChance: "Chance diaria de evento mundial (0-1)",
    fTags: "Tags",

    guiTitle: "GUI: Season Studio",
    guiBody:
      "{browser} abre un hub que enlaza a 4 navegadores — Calendarios, Estaciones, Eventos Mundiales y Regiones. El editor de una estación agrupa identidad/duración/clima/tags/modificadores de bioma/vegetación/eventos elegibles en un solo hub vía chat, y separa subestaciones y mobs de temporada en sus propias pantallas (listas con alta/baja).",

    apiTitle: "API para addons — SeasonsAPI",
    apiTipTitle: "isSeasonAllowed no sabe nada de cultivos ni peces",
    apiTipBody:
      "Es un atajo genérico: compara la estación efectiva en una ubicación contra un conjunto de ids permitidos. Un futuro RPGRoll-Farming definiría, en su propio YAML de cultivo, algo como {example} y llamaría a este método — Seasons no necesita saber que “eso” es trigo.",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    cBrowser: "Abre el Season Studio.",
    cReload: "Recarga todas las definiciones desde disco.",
    cSetSeason: "Fuerza la estación de un mundo.",
    cAdvance: "Avanza a la siguiente estación del calendario de ese mundo.",
    cTrigger: "Dispara un evento mundial a mano.",
    cInfo: "Estación actual y, si sos jugador, la temperatura donde estás.",
    permNote: "Los comandos {admin} requieren {p1} (default: op); {use} requiere {p2} (default: true).",
  },
};

export type AddonsCCopy = typeof es;

const en: AddonsCCopy = {
  quests: {
    title: "Quests (RPGRoll-Quests)",
    intro:
      "Stage-based quest engine: objectives, conditions, branching dialogue, chainable rewards and its own regions (no WorldGuard) — no GUI, everything through commands and chat.",
    selfTitle: "Self-contained — its own per-player YAML save",
    selfBody: "It uses neither {core}'s SQLite database nor PDC: each player's progress lives in {path}.",

    reqTitle: "Requirements",
    reqBody:
      "It does not depend on RPGRoll-Items (item rewards use vanilla {material} directly) nor on RPGRoll-NPCs (the integration goes through its own event, see below).",

    structTitle: "A quest is a list of stages",
    structBody:
      "Each {stage} has objectives, conditions and, optionally, dialogue. By default it advances linearly to the next stage in the list once all of its objectives {and} conditions are met — but if the stage's dialogue has options, the stage {notAuto}: they are shown to the player as clickable chat buttons, each jumping to whichever stage you want (forward, backward, or to any id) — that is how you build a real decision tree on top of a list that is flat in the file.",
    structAnd: "and",
    structNotAuto: "does not advance on its own",
    branchFile: "quests/tutorial.yml (branching excerpt)",

    objTitle: "Objectives",
    objLead: "10 built-in types, half reactive to events and half checked by polling every 20 ticks:",
    thType: "Type",
    thHow: "How it progresses",
    oKill: "EntityDeathEvent, if a player did the killing.",
    oBlock: "BlockBreakEvent / BlockPlaceEvent.",
    oCollect: "The player's EntityPickupItemEvent.",
    oDeliver: "On talking to the right NPC, consumes the items from the player's inventory if they have enough.",
    oTalk: "Its own {event} event (see the NPC integration).",
    oCommand: "PlayerCommandPreprocessEvent — fires on any command that starts the same way.",
    oWait: "Polling: time elapsed since you entered the stage.",
    oReach: "Polling: distance to a fixed point, with a configurable radius.",
    oDiscover: "Polling: being inside one of the addon's own regions.",
    objTip:
      "Objective progress resets when the stage changes — each objective counts from 0 within its own stage, it does not accumulate across stages.",

    condTitle: "Conditions",
    condBody:
      "Same lightweight pattern as Items/Mobs: comparisons ({cmp}) or a single supported function ({fn}), resolved against {vars} — extensible by other addons.",

    regionTitle: "Regions (no WorldGuard)",
    regionLead: "Simple cuboids of its own, exactly as in RPGRoll-Mobs — no external dependency:",
    bRegion: "Visual builder: Region",
    fId: "Id",
    fWorld: "World",
    fMin: "Minimum corner",
    fMax: "Maximum corner",

    rewardTitle: "Rewards and chaining",
    rewardBody:
      "Money (Vault), experience, items (vanilla {material}, no RPGRoll-Items integration), commands, and a list of {strong} on completing this one — letting you chain a whole campaign.",
    rewardStrong: "other quests to start automatically",

    npcTitle: "RPGRoll-NPCs integration",
    guiTitle: "GUI: browser and editor for Quest and Region",
    guiBody:
      "{browser} (defaults to {quests}) opens a browser with a “Create new” button. The {quest} editor covers name, category, difficulty, repeatable, cooldown, required level and money/experience rewards, plus quick add/remove of stage ids; the {region} one has “Set minimum/maximum corner here” buttons that use your current location.",

    yamlTitle: "YAML file example",
    refTitle: "Full reference: every field in a single file",
    refBody:
      "{file} (shipped in the jar) uses all 9 objective types, the 6 events ({events}), dialogue with options and every field of {reqs} and {rewards} in a single file.",

    bQuest: "Visual builder: Quest",
    bQuestDesc:
      "Identity, category/difficulty, cooldown, level requirement and simple rewards. Stages with objectives/dialogue/branches are too deeply nested for this form — use one of the examples above as a base and edit it by hand, or build them directly in the in-game editor.",
    fDisplayName: "Display name",
    fCategory: "Category",
    fDifficulty: "Difficulty",
    fRepeatable: "Repeatable",
    fCooldown: "Cooldown (if repeatable)",
    fRequirements: "Requirements",
    fMinLevel: "Minimum level",
    fRewards: "Rewards",
    fMoney: "Money",
    fExperience: "Experience",

    cmdTitle: "Commands",
    thCommand: "Command",
    thWhat: "What it does",
    cList: "Lists every defined quest.",
    cInfo: "Category, difficulty, number of stages, whether it is repeatable.",
    cStart: "Starts it if you meet the requirements, it is not on cooldown and you do not have it active.",
    cAbandon: "Abandons it (no penalty, no reward).",
    cActive: "Lists your active quests and which stage you are on.",
    cCompleted: "How many and which ones you completed.",
    aGive: "Forced start — ignores requirements, cooldown and repeatability.",
    aComplete: "Completes an active quest instantly, with full rewards.",
    aFail: "Marks it as failed (no reward).",
    aReset: "Erases every trace of that quest for the player — lets you restart even a non-repeatable one.",
    aBrowser: "Opens the graphical browser for quests or regions.",
    aReload: "Reloads quests (not regions).",
    permNote: "Requires {perm} (default: op).",

    phTitle: "Placeholders (PlaceholderAPI)",
    phLead: "{badge} expansion.",
    thPlaceholder: "Placeholder",
    thValue: "Value",
  },

  seasons: {
    title: "Seasons (RPGRoll-Seasons)",
    intro:
      "Fully customisable calendar and seasons — not tied to Minecraft's day/night clock. Dynamic per-biome weather, vegetation reactions, mobs and one exclusive boss per season, world events, and regions with their own calendar or a pinned season.",
    calTitle: "It does not depend on Minecraft's calendar",
    calBody:
      "A {cal} (named that way, not simply “Calendar”, to avoid colliding with {javaCal}) is an ordered cycle of season ids that repeats forever. Each season measures its duration in real hours, real days, real weeks or Minecraft days — whichever you pick, independently per season within the same calendar.",

    reqTitle: "Requirements",
    reqBody1:
      "Without RPGRoll-Mobs, a season's {mobMods} simply do nothing (everything else — calendar, weather, vegetation, particle/sound world events — works the same). Without",
    reqBody2: ", a world event's {applyEffect} components do not either.",

    calendarsTitle: "Calendars and seasons",
    calendarsBody:
      "A calendar does not have to be called {classic} — it can be any themed cycle ({example}). Each world has its own clock ({clock}), independent from other worlds', even when they share the same calendar.",

    subTitle: "Sub-seasons",
    subBody:
      "Any season can be split into sub-seasons (e.g. Early/Mid/Late Spring), each with its own duration and, optionally, a fixed temperature that {replaces} (does not add to) the biome's computed temperature while it is active.",
    subReplaces: "replaces",

    climateTitle: "Weather system and temperature",
    climateBody:
      "Each season defines a {profile}: chances (0.0-1.0) of rain, storm, snow, fog, heatwave and thunderstorm, plus a base temperature and its variation. A {task} re-rolls the weather of every world with online players every 5 minutes and applies it with {api} — snow is 100% vanilla: if it is raining and the biome is cold, Minecraft already draws it by itself.",

    vegTitle: "Dynamic vegetation",
    vegBody:
      "A {task} applies the active season's effects near every online player, with random sampling and a low chance per attempt — a gradual ambient effect, not an instant “photoshop” of the whole radius.",
    thEffect: "Effect",
    thWhat: "What it does",
    vSnow: "Snow layers over grass/dirt/stone at points below 0°C.",
    vIce: "Freezes exposed water at cold points.",
    vDry: "Reduces nearby farmland moisture — a real mechanical drought, not just visual.",
    vLeaves: "Falling leaf particles near trees.",
    vFlower: "Blooms nearby grass with random flowers.",

    mobsTitle: "Mobs and the seasonal exclusive boss",
    mobsBody:
      "{mobMods} is a list of (RPGRoll-Mobs mob id, extra spawn chance) evaluated near every online player. {boss} is at most one mob per season with a fixed 15% chance of appearing once per Minecraft day (based on {fullTime}, unrelated to the duration unit you configured for the season) near a random player in the world, announced to everyone.",

    eventsTitle: "World events",
    eventsBody:
      "A {event} runs on {all} the online players of the world where it fires — there is no individual “target” notion as in Magic/Effects. Each season rolls, once per Minecraft day, whether to fire one of its eligible {worldEvents} according to {chance}.",
    eventsAll: "all",
    thComponent: "Component type",
    thScope: "Scope",
    ePerPlayer: "Per player (VISUAL delegates to Particles).",
    eEffect: "Per player, through RPGRoll-Effects.",
    eSpawn: "Per player, with its own {chance} — through RPGRoll-Mobs.",
    eMessage: "Once, to the whole world.",
    eCommand: "Once per world (not per player).",

    regionsTitle: "Regions",
    regionsBody: "A {region} is a simple box (AABB, with no WorldGuard dependency) with an override mode:",
    thMode: "Mode",
    thBehaviour: "Behaviour",
    mFollow: "Uses the world's normal clock (default — almost no region needs it explicitly).",
    mPinnedSeason: "Always the same pinned season, with no clock at all (e.g. “Desert: always summer”).",
    mPinnedCal: "Runs its own calendar on a clock completely independent from the world's (e.g. “Magic kingdom: its own cycle”).",

    yamlTitle: "YAML file examples",
    refTitle: "Full reference: every field in a single file",
    refBody: "{file} (shipped in the jar) adds {fields}, the two fields neither example above shows, along with all the rest.",

    bSeason: "Visual builder: season identity and duration",
    bSeasonDesc:
      "Weather, sub-seasons, biome modifiers, vegetation and seasonal mobs are too varied for a linear form — they all live on their own screens inside the in-game editor. Copy and adapt one of the examples above for those fields.",
    fId: "Id",
    fDisplayName: "Display name",
    fIcon: "Icon (Material)",
    fColor: "Colour",
    fDescription: "Description",
    fDuration: "Duration",
    fDurationUnit: "Duration unit",
    fBoss: "Exclusive boss (mob id)",
    fEventChance: "Daily world event chance (0-1)",
    fTags: "Tags",

    guiTitle: "GUI: Season Studio",
    guiBody:
      "{browser} opens a hub linking to 4 browsers — Calendars, Seasons, World Events and Regions. A season's editor groups identity/duration/weather/tags/biome modifiers/vegetation/eligible events into a single chat-driven hub, and splits sub-seasons and seasonal mobs into their own screens (lists with add/remove).",

    apiTitle: "Addon API — SeasonsAPI",
    apiTipTitle: "isSeasonAllowed knows nothing about crops or fish",
    apiTipBody:
      "It is a generic shortcut: it compares the effective season at a location against a set of allowed ids. A future RPGRoll-Farming would define, in its own crop YAML, something like {example} and call this method — Seasons does not need to know that “that” is wheat.",

    cmdTitle: "Commands",
    thCommand: "Command",
    cBrowser: "Opens the Season Studio.",
    cReload: "Reloads every definition from disk.",
    cSetSeason: "Forces a world's season.",
    cAdvance: "Advances to the next season in that world's calendar.",
    cTrigger: "Fires a world event by hand.",
    cInfo: "Current season and, if you are a player, the temperature where you stand.",
    permNote: "The {admin} commands require {p1} (default: op); {use} requires {p2} (default: true).",
  },
};

const pt: AddonsCCopy = {
  quests: {
    title: "Missões (RPGRoll-Quests)",
    intro:
      "Motor de missões por etapas: objetivos, condições, diálogos com ramificações, recompensas encadeáveis e regiões próprias (sem WorldGuard) — sem GUI, tudo por comando e chat.",
    selfTitle: "Autocontido — o seu próprio salvamento em YAML por jogador",
    selfBody: "Não usa o banco SQLite do {core} nem PDC: o progresso de cada jogador vive em {path}.",

    reqTitle: "Requisitos",
    reqBody:
      "Não depende do RPGRoll-Items (as recompensas de item usam {material} vanilla direto) nem do RPGRoll-NPCs (a integração é por um evento próprio, veja abaixo).",

    structTitle: "Uma missão é uma lista de etapas",
    structBody:
      "Cada {stage} tem objetivos, condições e, opcionalmente, um diálogo. Por padrão avança linearmente para a próxima etapa da lista quando todos os seus objetivos {and} condições são cumpridos — mas se o diálogo da etapa tiver opções, a etapa {notAuto}: elas são mostradas ao jogador como botões de chat clicáveis, cada um pulando para a etapa que você quiser (para frente, para trás, ou para qualquer id) — é assim que se monta uma árvore de decisões real sobre uma lista que no arquivo é plana.",
    structAnd: "e",
    structNotAuto: "não avança sozinha",
    branchFile: "quests/tutorial.yml (trecho com ramificações)",

    objTitle: "Objetivos",
    objLead: "10 tipos incorporados, metade reativos a eventos e a outra metade verificados por polling a cada 20 ticks:",
    thType: "Tipo",
    thHow: "Como progride",
    oKill: "EntityDeathEvent, se quem matou foi um jogador.",
    oBlock: "BlockBreakEvent / BlockPlaceEvent.",
    oCollect: "EntityPickupItemEvent do jogador.",
    oDeliver: "Ao falar com o NPC correto, consome os itens do inventário do jogador se ele tiver o suficiente.",
    oTalk: "Evento próprio {event} (veja a integração com NPCs).",
    oCommand: "PlayerCommandPreprocessEvent — dispara com qualquer comando que comece igual.",
    oWait: "Polling: tempo decorrido desde que você entrou na etapa.",
    oReach: "Polling: distância até um ponto fixo, com raio configurável.",
    oDiscover: "Polling: estar dentro de uma região própria do addon.",
    objTip:
      "O progresso de objetivos é zerado ao mudar de etapa — cada objetivo conta a partir de 0 dentro da sua própria etapa, não acumula entre etapas.",

    condTitle: "Condições",
    condBody:
      "Mesmo padrão leve de Items/Mobs: comparações ({cmp}) ou uma única função suportada ({fn}), resolvidas contra {vars} — extensível por outros addons.",

    regionTitle: "Regiões (sem WorldGuard)",
    regionLead: "Cuboides simples próprios, exatamente como no RPGRoll-Mobs — sem dependência externa:",
    bRegion: "Construtor visual: Region",
    fId: "Id",
    fWorld: "Mundo",
    fMin: "Canto mínimo",
    fMax: "Canto máximo",

    rewardTitle: "Recompensas e encadeamento",
    rewardBody:
      "Dinheiro (Vault), experiência, itens ({material} vanilla, sem integração com o RPGRoll-Items), comandos, e uma lista de {strong} ao concluir esta — permitindo encadear uma campanha completa.",
    rewardStrong: "outras missões para iniciar automaticamente",

    npcTitle: "Integração com o RPGRoll-NPCs",
    guiTitle: "GUI: navegador e editor para Quest e Region",
    guiBody:
      "{browser} (por padrão {quests}) abre um navegador com botão “Criar nova”. O editor de {quest} cobre nome, categoria, dificuldade, repetível, cooldown, nível exigido e recompensas de dinheiro/experiência, mais inclusão/remoção rápida de ids de etapa; o de {region} tem botões “Fixar canto mínimo/máximo aqui” que usam a sua localização atual.",

    yamlTitle: "Exemplo de arquivo YAML",
    refTitle: "Referência completa: todos os campos num só arquivo",
    refBody:
      "{file} (incluído no jar) usa os 9 tipos de objetivo, os 6 eventos ({events}), diálogo com opções e todos os campos de {reqs} e {rewards} num único arquivo.",

    bQuest: "Construtor visual: Quest",
    bQuestDesc:
      "Identidade, categoria/dificuldade, cooldown, requisito de nível e recompensas simples. As etapas (stages) com objetivos/diálogo/ramificações são aninhadas demais para este formulário — use um dos exemplos acima como base e edite à mão, ou construa-as diretamente no editor in-game.",
    fDisplayName: "Nome visível",
    fCategory: "Categoria",
    fDifficulty: "Dificuldade",
    fRepeatable: "Repetível",
    fCooldown: "Cooldown (se for repetível)",
    fRequirements: "Requisitos",
    fMinLevel: "Nível mínimo",
    fRewards: "Recompensas",
    fMoney: "Dinheiro",
    fExperience: "Experiência",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    thWhat: "O que faz",
    cList: "Lista todas as missões definidas.",
    cInfo: "Categoria, dificuldade, quantidade de etapas, se é repetível.",
    cStart: "Inicia se você cumprir os requisitos, não estiver em cooldown e não a tiver ativa.",
    cAbandon: "Abandona (sem penalidade nem recompensa).",
    cActive: "Lista as suas missões ativas e em que etapa você está.",
    cCompleted: "Quantas e quais você concluiu.",
    aGive: "Início forçado — ignora requisitos, cooldown e repetibilidade.",
    aComplete: "Conclui uma missão ativa na hora, com recompensas completas.",
    aFail: "Marca como falhada (sem recompensa).",
    aReset: "Apaga todo rastro dessa missão para o jogador — permite reiniciar até uma não repetível.",
    aBrowser: "Abre o navegador gráfico de missões ou regiões.",
    aReload: "Recarrega missões (não regiões).",
    permNote: "Exige {perm} (default: op).",

    phTitle: "Placeholders (PlaceholderAPI)",
    phLead: "Expansão {badge}.",
    thPlaceholder: "Placeholder",
    thValue: "Valor",
  },

  seasons: {
    title: "Seasons (RPGRoll-Seasons)",
    intro:
      "Calendário e estações 100% personalizáveis — não atrelados ao relógio dia/noite do Minecraft. Clima dinâmico por bioma, reações de vegetação, mobs e um chefe exclusivo por estação, eventos mundiais, e regiões com o seu próprio calendário ou estação fixa.",
    calTitle: "Não depende do calendário do Minecraft",
    calBody:
      "Um {cal} (chama-se assim, e não simplesmente “Calendar”, para não colidir com {javaCal}) é um ciclo ordenado de ids de estação que se repete para sempre. Cada estação mede a sua duração em horas reais, dias reais, semanas reais ou dias de Minecraft — a que você escolher, independente entre estações do mesmo calendário.",

    reqTitle: "Requisitos",
    reqBody1:
      "Sem o RPGRoll-Mobs, os {mobMods} de uma estação simplesmente não fazem nada (o resto — calendário, clima, vegetação, eventos mundiais de partículas/som — funciona igual). Sem o",
    reqBody2: ", os componentes {applyEffect} de um evento mundial também não.",

    calendarsTitle: "Calendários e estações",
    calendarsBody:
      "Um calendário não precisa se chamar {classic} — pode ser qualquer ciclo temático ({example}). Cada mundo tem o seu próprio relógio ({clock}), independente do de outros mundos, mesmo que compartilhem o mesmo calendário.",

    subTitle: "Subestações",
    subBody:
      "Qualquer estação pode se dividir em subestações (ex. Primavera Inicial/Média/Tardia), cada uma com a sua própria duração e, opcionalmente, uma temperatura fixa que {replaces} (não soma) a temperatura calculada do bioma enquanto estiver ativa.",
    subReplaces: "substitui",

    climateTitle: "Sistema climático e temperatura",
    climateBody:
      "Cada estação define um {profile}: chances (0.0-1.0) de chuva, tempestade, neve, névoa, onda de calor e tempestade elétrica, mais uma temperatura base e a sua variação. Uma {task} re-sorteia o clima de cada mundo com jogadores online a cada 5 minutos e o aplica com {api} — a neve é 100% vanilla: se estiver chovendo e o bioma for frio, o Minecraft já a desenha sozinho.",

    vegTitle: "Vegetação dinâmica",
    vegBody:
      "Uma {task} aplica os efeitos da estação ativa perto de cada jogador online, com amostragem aleatória e probabilidade baixa por tentativa — um efeito ambiental gradual, não um “photoshop” instantâneo do raio inteiro.",
    thEffect: "Efeito",
    thWhat: "O que faz",
    vSnow: "Camadas de neve sobre grama/terra/pedra em pontos com temperatura < 0°C.",
    vIce: "Congela água exposta em pontos frios.",
    vDry: "Reduz a umidade de terra arada próxima — seca mecânica real, não só visual.",
    vLeaves: "Partículas de folhas caindo perto de árvores.",
    vFlower: "Faz florescer a grama próxima com flores aleatórias.",

    mobsTitle: "Mobs e chefe exclusivo de temporada",
    mobsBody:
      "{mobMods} é uma lista de (id de mob do RPGRoll-Mobs, chance extra de spawn) avaliada perto de cada jogador online. {boss} é, no máximo, um mob por estação com uma chance fixa de 15% de aparecer uma vez por dia de Minecraft (conforme {fullTime}, sem relação com a unidade de duração que você configurou para a estação) perto de um jogador aleatório do mundo, com anúncio para todos.",

    eventsTitle: "Eventos mundiais",
    eventsBody:
      "Um {event} roda sobre {all} os jogadores online do mundo onde dispara — não há noção de “target” individual como em Magic/Effects. Cada estação sorteia, uma vez por dia de Minecraft, se dispara um dos seus {worldEvents} elegíveis conforme {chance}.",
    eventsAll: "todos",
    thComponent: "Tipo de componente",
    thScope: "Alcance",
    ePerPlayer: "Por jogador (VISUAL delega ao Particles).",
    eEffect: "Por jogador, via RPGRoll-Effects.",
    eSpawn: "Por jogador, com a sua própria {chance} — via RPGRoll-Mobs.",
    eMessage: "Uma vez, para todo o mundo.",
    eCommand: "Uma vez por mundo (não por jogador).",

    regionsTitle: "Regiões",
    regionsBody: "Uma {region} é uma caixa simples (AABB, sem depender do WorldGuard) com um modo de override:",
    thMode: "Modo",
    thBehaviour: "Comportamento",
    mFollow: "Usa o relógio normal do mundo (padrão — quase nenhuma região precisa disso explicitamente).",
    mPinnedSeason: "Sempre a mesma estação fixa, sem relógio nenhum (ex. “Deserto: sempre verão”).",
    mPinnedCal: "Roda o seu próprio calendário com um relógio completamente independente do mundo (ex. “Reino mágico: o seu próprio ciclo”).",

    yamlTitle: "Exemplos de arquivo YAML",
    refTitle: "Referência completa: todos os campos num só arquivo",
    refBody: "{file} (incluído no jar) adiciona {fields}, os dois campos que nenhum dos dois exemplos acima mostra, junto com todos os demais.",

    bSeason: "Construtor visual: identidade e duração da estação",
    bSeasonDesc:
      "Clima, subestações, modificadores de bioma, vegetação e mobs de temporada são variados demais para um formulário linear — todos vivem em telas próprias dentro do editor in-game. Copie e adapte um dos exemplos acima para esses campos.",
    fId: "Id",
    fDisplayName: "Nome visível",
    fIcon: "Ícone (Material)",
    fColor: "Cor",
    fDescription: "Descrição",
    fDuration: "Duração",
    fDurationUnit: "Unidade de duração",
    fBoss: "Chefe exclusivo (id de mob)",
    fEventChance: "Chance diária de evento mundial (0-1)",
    fTags: "Tags",

    guiTitle: "GUI: Season Studio",
    guiBody:
      "{browser} abre um hub que liga a 4 navegadores — Calendários, Estações, Eventos Mundiais e Regiões. O editor de uma estação agrupa identidade/duração/clima/tags/modificadores de bioma/vegetação/eventos elegíveis num só hub via chat, e separa subestações e mobs de temporada nas suas próprias telas (listas com inclusão/remoção).",

    apiTitle: "API para addons — SeasonsAPI",
    apiTipTitle: "isSeasonAllowed não sabe nada de plantações nem peixes",
    apiTipBody:
      "É um atalho genérico: compara a estação efetiva numa localização contra um conjunto de ids permitidos. Um futuro RPGRoll-Farming definiria, no seu próprio YAML de plantação, algo como {example} e chamaria este método — o Seasons não precisa saber que “aquilo” é trigo.",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    cBrowser: "Abre o Season Studio.",
    cReload: "Recarrega todas as definições do disco.",
    cSetSeason: "Força a estação de um mundo.",
    cAdvance: "Avança para a próxima estação do calendário desse mundo.",
    cTrigger: "Dispara um evento mundial manualmente.",
    cInfo: "Estação atual e, se você for jogador, a temperatura onde está.",
    permNote: "Os comandos {admin} exigem {p1} (default: op); {use} exige {p2} (default: true).",
  },
};

export const ADDONS_C_COPY: Record<Locale, AddonsCCopy> = { es, en, pt };
