import type { Locale } from "../../i18n";

/**
 * Texto de las páginas de sistemas del core.
 *
 * Un solo archivo para las seis porque comparten vocabulario (atributos,
 * salud/maná, nivel) y conviene traducirlo de forma consistente: si "puntos de
 * estadística" se traduce distinto en dos páginas, el lector cree que son dos
 * cosas.
 */

const es = {
  players: {
    title: "Jugadores",
    intro: "El modelo de datos central: {rpgPlayer}, un objeto inmutable que agrupa toda la información de rol de un jugador.",
    immutableLead:
      "{rpgPlayer} es inmutable: cada método que “modifica” algo ({methods}) devuelve una {newInstance} en vez de mutar la existente. Agrupa:",
    newInstance: "nueva instancia",
    thComponent: "Componente",
    thContains: "Contiene",
    identity: "UUID, username, raza, clase",
    stats: "Los 6 atributos D&D",
    progression: "Nivel, experiencia, timestamps, puntos de stat sin gastar",
    skills: "Habilidades aprendidas y su nivel",
    traits: "Traits adquiridos",
    combat: "Salud/maná actuales y máximos, armadura, evasión, crítico",
    jobs: "Trabajos activos (máx. 3) y su progreso",

    managerTitle: "PlayerManager",
    managerLead: "Punto de entrada único para operaciones de jugador. Coordina dos piezas:",
    cacheItem: "mapa en memoria ({map}) de jugadores conectados, para no golpear la base de datos en cada operación.",
    repoItem: "persistencia real en SQLite ({methods}).",
    flowFile: "flujo de PlayerManager.getPlayer(uuid)",
    flow1: "¿Está en PlayerCache?  → devolverlo (sin tocar la BD)",
    flow2: "¿Existe en la BD?      → cargarlo, guardarlo en caché, devolverlo",
    flow3: "No existe en ningún lado → Optional.empty()",

    lifecycleTitle: "Ciclo de vida: join / quit",
    lifecycleLead: "Todo pasa por {listener}:",
    life1: "{event} → {call} (crea el jugador si es su primera vez).",
    life2: "20 ticks después (1 segundo, para dar tiempo a que el cliente cargue): se reaplican los modificadores físicos de su raza, se muestra el boss bar de salud/maná, y si el personaje no está completo (sin raza/clase) se lanza el flujo de creación de personaje.",
    life3: "{event} → se oculta el boss bar y se descarga del caché (guardando en BD).",

    completeTitle: "¿Cuándo está “completo” un personaje?",
    completeBody:
      "{method} (delegado a {identity}) es simplemente: tiene raza {and} clase asignadas, ambas no vacías. Mientras no lo esté, el jugador es forzado al flujo de {create} en cada login.",
    and: "y",

    phTitle: "Placeholders (PlaceholderAPI)",
    phLead:
      "Softdepend — si {papi} está instalado, el core registra la expansión {badge} automáticamente al arrancar. Todos leen el {rpgPlayer} ya cargado: un jugador sin personaje creado devuelve cadena vacía o {dash}, nunca crea uno ni falla.",
    thPlaceholder: "Placeholder",
    thValue: "Valor",
  },

  races: {
    title: "Razas y clases",
    intro: "Contenido cargado dinámicamente desde YAML — agregar una raza o clase nueva es tan simple como agregar un archivo.",
    whereTitle: "Dónde viven los archivos",
    thFolder: "Carpeta",
    thDefaults: "Registradas por defecto",
    loadedBy:
      "Se cargan con {managers}, ambos sobre el framework genérico de {common} ({contentManager}). Un archivo inválido se descarta con un warning en consola — no tumba el resto de la carga.",
    raceFormatTitle: "Formato de un archivo de raza",
    classFormatTitle: "Formato de un archivo de clase",
    classFormatLead: "Igual, pero sin la sección {physical} (las clases no modifican el cuerpo del jugador):",
    fieldsTitle: "Referencia de campos",
    thField: "Campo",
    thType: "Tipo",
    thRequired: "Obligatorio",
    thDescription: "Descripción",
    yes: "Sí",
    no: "No",
    noUsesId: "No (usa id)",
    fId: "Identificador único. Si falta o está vacío, el archivo se rechaza.",
    fDisplayName: "Nombre mostrado al jugador.",
    fDescription: "Descripción corta.",
    fBaseAttributes: "Bonos/penalizaciones sumados a los stats base (10) al crear personaje.",
    fPassiveTraits: "IDs de traits — se cargan pero {strong} (ver nota abajo).",
    fPassiveTraitsStrong: "no se otorgan automáticamente todavía",
    fIcon: "Textura de cabeza de jugador para las GUIs de selección.",
    fLore: "Líneas de lore mostradas en la GUI.",
    fPhysical: "scale, movement-speed-percent, extra-health, knockback-resistance.",
    tMap: "mapa stat→int",
    tStringList: "lista de string",
    tString: "string",
    tBase64: "string (base64)",
    tObjectRaces: "objeto (solo razas)",

    physicalTitle: "Modificadores físicos (solo razas)",
    physicalBody:
      "{applier} traduce {physical} en {modifier} reales de Bukkit sobre el jugador (escala, velocidad, vida extra, resistencia a knockback). Como Bukkit no persiste estos modificadores entre reinicios del servidor, se reaplican automáticamente en cada login. Usa claves ({key}) fijas por atributo, así que cambiar de raza limpia primero los modificadores de la raza anterior antes de aplicar los nuevos — no se acumulan.",

    bonusTitle: "Cómo se aplican los bonos de atributo",
    bonusBody:
      "Al terminar {create}, {flow} parte de {default} (10 en todo), suma {baseAttributes} de la raza elegida, después los de la clase, y recorta cada valor a [1, 20]. La salud/maná inicial también se deriva de esos stats finales (Constitución → salud, Inteligencia → maná) — ver",

    changeTitle: "Cambiar de raza o clase después de creado",
    changeBody:
      "Por defecto los jugadores {not} pueden cambiar de raza/clase ellos mismos ({file}: {keys}, ambos en {false} — aunque estas banderas son informativas, ningún comando de jugador las consulta todavía). Solo un admin puede hacerlo, con",
    changeAfter: ", con la opción {recalc} para recalcular stats y salud/maná desde cero.",
    notWord: "no",
  },

  stats: {
    title: "Stats, salud y maná",
    intro: "Los 6 atributos D&D, y un sistema de salud/maná propio de RPGRoll — independiente de los corazones de Minecraft.",
    attrTitle: "Los 6 atributos",
    attrBody:
      "{playerStats} guarda Fuerza, Destreza, Constitución, Inteligencia, Sabiduría y Carisma, cada uno entre 1 y 20 (10 por defecto). El modificador estilo D&D se calcula como {formula} (división entera) y es lo que realmente afecta salud, maná, armadura, evasión y crítico — no el valor crudo.",

    combatTitle: "CombatStats: el recurso de salud/maná",
    notHeartsTitle: "No es la barra de corazones",
    notHeartsBody:
      "RPGRoll trackea {health} y {mana} como un recurso propio (escala base 100, no 20), separado de la vida vanilla de Minecraft. Es una decisión de diseño deliberada: evita reescribir el sistema de muerte/respawn de Bukkit, pero significa que la salud “RPG” no es literalmente lo mismo que las vidas del jugador.",
    thField: "Campo",
    thDerived: "Se deriva de",
    dMaxHealth: "100 + (modificador de Constitución × 5), + bonos acumulados de level up",
    dMaxMana: "100 + (modificador de Inteligencia × 5), + bonos acumulados de level up",
    dArmor: "5.0 + (nivel × 0.5) — se recalcula siempre, no acumula",
    dEvasion: "0.10 + (modificador de Destreza × 0.02)",
    dCrit: "0.05 + (modificador de Destreza × 0.01)",
    dCritMult: "1.5 (fijo)",

    pointsTitle: "Puntos de estadística",
    pointsBody:
      "Cada nivel otorga puntos de estadística (configurable en {file}, 2 por defecto) que quedan guardados como {field} en {progression} hasta que el jugador los gasta con:",
    pointsAfter:
      "Internamente usa {allocator} para validar (puntos suficientes, no pasarse de 20), y si el punto sube el modificador de Constitución o Inteligencia, ajusta {health} en el momento; si sube Destreza, refresca evasión/crítico.",

    respecTitle: "Reiniciar atributos (admin)",
    respecBody:
      "{command} vuelve los 6 atributos a su valor base (10) y le devuelve al jugador, como puntos sin gastar, la suma de todo lo que debería haber ganado según su nivel actual — un respec completo. No toca salud/maná máximos acumulados, porque esos crecen con el nivel, no con los puntos de atributo invertidos.",

    realTitle: "Consecuencias reales en combate",
    realLead: "{listener} conecta estos números con el combate de verdad:",
    r1: "{strong} se tira primero — si esquivas, el evento de daño se cancela por completo.",
    r1s: "Evasión",
    r2: "{strong} reduce el daño real con una fórmula de retornos decrecientes: {formula}.",
    r2s: "Armadura",
    r3: "{strong} (si sos el atacante) multiplica tu daño por {mult} antes de que se aplique la armadura del defensor.",
    r3s: "Crítico",
    r4: "El daño final (post-armadura) se descuenta de tu {health} RPG. Si llega a 0: recibes Lentitud + Debilidad por 5 segundos y te recuperas al 25% de tu máximo — un estado “derribado” propio, no la muerte vanilla (esa sigue funcionando en paralelo, gobernada por tus corazones reales).",

    regenTitle: "Regeneración pasiva",
    regenBody:
      "{task} corre cada {interval} (config, 5s por defecto) y suma un % del máximo a salud/maná ({percents}). Si {flag} es {false} (default), no regenera mientras el jugador esté en combate reciente (ventana definida por {duration}).",

    hudTitle: "Indicador en pantalla",
    hudBody:
      "{bar} muestra un boss bar persistente: la barra de progreso refleja el % de salud, y el maná se muestra como texto en el título ({example}). Se actualiza en cada golpe, cada uso de habilidad, y cada tick de regeneración.",
  },

  skills: {
    title: "Habilidades y traits",
    intro: "Habilidades activas con costo de maná y cooldown, y traits pasivos que se otorgan por nivel.",
    skillsTitle: "Habilidades (Skills)",
    skillsLead: "Se cargan desde {dir} (por defecto solo trae {fireball}). Cada skill define:",
    useTitle: "Usar una habilidad",
    useLead: "Un jugador que ya la aprendió (ver {link}) la usa con:",
    useLink: "desbloqueo automático por nivel",
    u1: "Verifica que la tengas aprendida, nivel suficiente y maná suficiente.",
    u2: "Verifica el cooldown propio de la skill Y el cooldown global entre habilidades ({key}).",
    u3: "Descuenta el maná.",
    u4: "Busca la entidad que estás mirando ({raytrace}, hasta 20 bloques) y le aplica daño = {formula}.",
    u5: "Si no hay objetivo en rango, igual se gasta el maná y se activa el cooldown — el hechizo “se disipa”.",
    memoryNote:
      "Los cooldowns y el estado de combate son {strong} — se reinician si el jugador se desconecta o el servidor reinicia. Es intencional.",
    memoryStrong: "en memoria, no persistidos",
    listTitle: "Ver tus habilidades",
    listBody: "{cmd} lista cada habilidad aprendida junto con su costo de maná, cooldown, y el comando exacto para usarla.",
    traitsTitle: "Traits",
    traitsLead:
      "Se cargan desde {dir} (por defecto solo {night}). Un trait tiene un {effect} con bonos a los 6 atributos, salud, maná, daño y defensa:",
    thField: "Campo de TraitEffect",
    thEffect: "Efecto",
    eAttrs: "Bono plano a cada atributo",
    eHealth: "Bono plano a salud/maná máximos",
    eDamage: "Multiplicadores de combate",
    traitsList: "{cmd} lista los traits adquiridos.",
  },

  jobs: {
    title: "Trabajos (Jobs)",
    intro: "Un sistema paralelo de progresión: hasta 3 trabajos activos por jugador, cada uno con su propio nivel y XP.",
    listTitle: "Los 6 trabajos",
    thId: "ID",
    thName: "Nombre",
    thAntiFarm: "Protección anti-farm",
    nMiner: "Minero",
    nFisher: "Pescador",
    nHunter: "Cazador",
    nFarmer: "Granjero",
    nAlchemist: "Alquimista",
    nExplorer: "Explorador",
    aMiner: "No paga por bloques colocados por el propio jugador",
    aHunter: "No paga por mobs nacidos de spawner",
    aFarmer: "Comparte la marca “de spawner” con Cazador para granjas automáticas de animales",
    aExplorer: "Recompensa por bioma nuevo visitado y distancia recorrida, no por acciones repetibles",
    listAfter:
      "Se cargan desde {dir}, cada uno con recompensas por {target} (nombre de {material} o {entity}) y, para Explorador, recompensas especiales por distancia/bioma.",

    joinTitle: "Unirse y abandonar",
    joinBody:
      "{cmd} abre una GUI con el catálogo completo y tu estado en cada uno. Click en uno inactivo te une; click en uno activo lo abandona. El límite es {strong} — si ya estás en el máximo e intentas unirte a otro, se abre una GUI para elegir cuál abandonar primero.",
    joinStrong: "3 trabajos activos",

    rewardTitle: "Cómo funciona una recompensa",
    rewardLead: "Todos los listeners de trabajo (uno por trabajo) delegan en {service}, que centraliza:",
    w1: "Verifica que el jugador tenga ese trabajo activo.",
    w2: "Busca la recompensa configurada para ese target — si no hay, no pasa nada.",
    w3: "Paga dinero vía Vault, si hay economía activa y la recompensa incluye monto.",
    w4: "Suma experiencia {em} (independiente de tu XP de personaje) y sube de nivel si corresponde.",
    w4em: "del trabajo",
    w5: "Muestra feedback en la action bar (XP y dinero ganado).",
    curve: "Curva de nivel de trabajo: expBase × (nivel - 1) ^ expMultiplier   (igual patrón que el XP de personaje)",

    explorerTitle: "Explorador: un caso especial",
    explorerBody:
      "No se dispara por romper/matar algo, sino por moverse: paga por cada bioma nuevo visitado y por tramos de distancia recorrida. Su progreso (biomas ya visitados, distancia acumulada) se guarda en su propia tabla ({table}), separado de {other}.",

    adminTitle: "Administración",
    adminBody: "{cmd} — asignar, quitar, o fijar el nivel de un trabajo de cualquier jugador conectado.",
  },

  progression: {
    title: "Progresión y nivel",
    intro: "Cómo se gana experiencia, la fórmula de nivel, y qué pasa exactamente cuando subes de nivel.",
    gainTitle: "Ganar experiencia",
    gainBody:
      "{listener} otorga XP al matar un mob, con montos configurables por tipo de entidad en {key} (10 por defecto si el tipo no está listado explícitamente).",
    maxLevel: "Nivel máximo: 100 ({key}).",
    bonusTitle: "Bonos de experiencia",
    bonusBody:
      "La XP que se gana jugando —al matar mobs, en las recompensas de RPGRoll-Quests y en las recetas de RPGRoll-Crafting— recibe un bono en porcentaje. Los comandos de admin, como {addxp}, dan la cantidad exacta.",
    bonusPerm:
      "El bono base sale de los permisos {perm}: {example} da +10 %. Si el jugador tiene varios gana el mayor, no se suman, así un rango que hereda de otro no cobra los dos. Encima se suma lo que registren los addons: RPGRoll-Ascension aporta el bono de prestigio y el permanente de legado.",
    formulaTitle: "Fórmula de experiencia requerida",
    formula: "XP requerida para nivel N = base_exp × N ^ exp_multiplier   (100 × N^1.5 por defecto)",

    whatTitle: "Qué se aplica exactamente al subir de nivel",
    whatLead:
      "Cada nivel puede definir recompensas en {file}; si un nivel no tiene entrada explícita, se usan los valores de {defaults}. {handler} aplica, en orden:",
    p1: "Incrementa el nivel del jugador.",
    p2: "{key} se suman a su pool de puntos sin gastar (ver {link}).",
    p3: "{key} aumentan su salud/maná máximos (y curan/restauran esa misma cantidad).",
    p4: "{key} se aprenden/adquieren automáticamente — sin pisar el nivel de una skill que el jugador ya hubiera subido manualmente.",
    p5: "Se dispara el evento {event} (para que otros plugins/listeners puedan reaccionar).",
    p6: "Se guarda el jugador y se le muestra un mensaje resumen.",

    tableTitle: "Recompensas configuradas por defecto",
    thLevel: "Nivel",
    thXp: "XP requerida",
    thPoints: "Puntos stat",
    thHealth: "+Salud",
    thMana: "+Maná",
    thUnlocks: "Desbloquea",
    tableNote: "Cualquier otro nivel usa los {defaults}: 2 puntos de stat, +5 salud/nivel, +3 maná/nivel.",

    cmdTitle: "Comandos relacionados",
    c1: "nivel y experiencia actuales.",
    c2: "admin, agrega XP.",
    c3: "admin/debug, fuerza un intento de subir de nivel sobre ti mismo.",
  },
};

export type CoreCopy = typeof es;

const en: CoreCopy = {
  players: {
    title: "Players",
    intro: "The central data model: {rpgPlayer}, an immutable object holding all of a player's role-playing data.",
    immutableLead:
      "{rpgPlayer} is immutable: every method that “modifies” something ({methods}) returns a {newInstance} instead of mutating the existing one. It groups:",
    newInstance: "new instance",
    thComponent: "Component",
    thContains: "Contains",
    identity: "UUID, username, race, class",
    stats: "The 6 D&D attributes",
    progression: "Level, experience, timestamps, unspent stat points",
    skills: "Learned skills and their level",
    traits: "Acquired traits",
    combat: "Current and maximum health/mana, armor, evasion, crit",
    jobs: "Active jobs (max. 3) and their progress",

    managerTitle: "PlayerManager",
    managerLead: "The single entry point for player operations. It coordinates two pieces:",
    cacheItem: "in-memory map ({map}) of online players, to avoid hitting the database on every operation.",
    repoItem: "actual persistence in SQLite ({methods}).",
    flowFile: "PlayerManager.getPlayer(uuid) flow",
    flow1: "In PlayerCache?        → return it (no DB access)",
    flow2: "Exists in the DB?      → load it, cache it, return it",
    flow3: "Nowhere to be found    → Optional.empty()",

    lifecycleTitle: "Lifecycle: join / quit",
    lifecycleLead: "Everything goes through {listener}:",
    life1: "{event} → {call} (creates the player if this is their first time).",
    life2: "20 ticks later (1 second, to give the client time to load): the race's physical modifiers are reapplied, the health/mana boss bar is shown, and if the character is incomplete (no race/class) the character creation flow starts.",
    life3: "{event} → the boss bar is hidden and the player is unloaded from the cache (saving to the DB).",

    completeTitle: "When is a character “complete”?",
    completeBody:
      "{method} (delegated to {identity}) is simply: it has a race {and} a class assigned, both non-empty. Until then, the player is pushed into the {create} flow on every login.",
    and: "and",

    phTitle: "Placeholders (PlaceholderAPI)",
    phLead:
      "Softdepend — if {papi} is installed, the core registers the {badge} expansion automatically at startup. They all read the already-loaded {rpgPlayer}: a player with no character created returns an empty string or {dash}, never creates one and never fails.",
    thPlaceholder: "Placeholder",
    thValue: "Value",
  },

  races: {
    title: "Races & classes",
    intro: "Content loaded dynamically from YAML — adding a new race or class is as simple as adding a file.",
    whereTitle: "Where the files live",
    thFolder: "Folder",
    thDefaults: "Registered by default",
    loadedBy:
      "They are loaded with {managers}, both on top of the generic framework in {common} ({contentManager}). An invalid file is discarded with a console warning — it does not take down the rest of the load.",
    raceFormatTitle: "Format of a race file",
    classFormatTitle: "Format of a class file",
    classFormatLead: "The same, but without the {physical} section (classes do not modify the player's body):",
    fieldsTitle: "Field reference",
    thField: "Field",
    thType: "Type",
    thRequired: "Required",
    thDescription: "Description",
    yes: "Yes",
    no: "No",
    noUsesId: "No (uses id)",
    fId: "Unique identifier. If missing or empty, the file is rejected.",
    fDisplayName: "Name shown to the player.",
    fDescription: "Short description.",
    fBaseAttributes: "Bonuses/penalties added to the base stats (10) at character creation.",
    fPassiveTraits: "Trait IDs — they are loaded but {strong} (see the note below).",
    fPassiveTraitsStrong: "not granted automatically yet",
    fIcon: "Player head texture for the selection GUIs.",
    fLore: "Lore lines shown in the GUI.",
    fPhysical: "scale, movement-speed-percent, extra-health, knockback-resistance.",
    tMap: "map stat→int",
    tStringList: "list of string",
    tString: "string",
    tBase64: "string (base64)",
    tObjectRaces: "object (races only)",

    physicalTitle: "Physical modifiers (races only)",
    physicalBody:
      "{applier} translates {physical} into real Bukkit {modifier}s on the player (scale, speed, extra health, knockback resistance). Since Bukkit does not persist these modifiers across server restarts, they are reapplied automatically on every login. It uses fixed keys ({key}) per attribute, so changing race clears the previous race's modifiers first before applying the new ones — they do not stack.",

    bonusTitle: "How attribute bonuses are applied",
    bonusBody:
      "When {create} finishes, {flow} starts from {default} (10 across the board), adds the chosen race's {baseAttributes}, then the class's, and clamps each value to [1, 20]. Starting health/mana also derives from those final stats (Constitution → health, Intelligence → mana) — see",

    changeTitle: "Changing race or class after creation",
    changeBody:
      "By default players can{not} change their own race/class ({file}: {keys}, both {false} — although these flags are informational, no player command reads them yet). Only an admin can, with",
    changeAfter: ", with the {recalc} option to recalculate stats and health/mana from scratch.",
    notWord: "not",
  },

  stats: {
    title: "Stats, health & mana",
    intro: "The 6 D&D attributes, and RPGRoll's own health/mana system — independent from Minecraft hearts.",
    attrTitle: "The 6 attributes",
    attrBody:
      "{playerStats} stores Strength, Dexterity, Constitution, Intelligence, Wisdom and Charisma, each between 1 and 20 (10 by default). The D&D-style modifier is computed as {formula} (integer division) and it is what actually affects health, mana, armor, evasion and crit — not the raw value.",

    combatTitle: "CombatStats: the health/mana resource",
    notHeartsTitle: "It is not the heart bar",
    notHeartsBody:
      "RPGRoll tracks {health} and {mana} as its own resource (base scale 100, not 20), separate from Minecraft's vanilla health. It is a deliberate design decision: it avoids rewriting Bukkit's death/respawn system, but it means “RPG” health is not literally the same as the player's lives.",
    thField: "Field",
    thDerived: "Derived from",
    dMaxHealth: "100 + (Constitution modifier × 5), + bonuses accumulated from level ups",
    dMaxMana: "100 + (Intelligence modifier × 5), + bonuses accumulated from level ups",
    dArmor: "5.0 + (level × 0.5) — always recalculated, does not accumulate",
    dEvasion: "0.10 + (Dexterity modifier × 0.02)",
    dCrit: "0.05 + (Dexterity modifier × 0.01)",
    dCritMult: "1.5 (fixed)",

    pointsTitle: "Stat points",
    pointsBody:
      "Each level grants stat points (configurable in {file}, 2 by default) stored as {field} on {progression} until the player spends them with:",
    pointsAfter:
      "Internally it uses {allocator} to validate (enough points, not going over 20), and if the point raises the Constitution or Intelligence modifier it adjusts {health} right away; if it raises Dexterity, it refreshes evasion/crit.",

    respecTitle: "Reset attributes (admin)",
    respecBody:
      "{command} returns the 6 attributes to their base value (10) and gives the player back, as unspent points, the sum of everything they should have earned at their current level — a full respec. It does not touch accumulated max health/mana, because those grow with level, not with invested attribute points.",

    realTitle: "Real consequences in combat",
    realLead: "{listener} wires these numbers into actual combat:",
    r1: "{strong} is rolled first — if you dodge, the damage event is cancelled entirely.",
    r1s: "Evasion",
    r2: "{strong} reduces the real damage with a diminishing-returns formula: {formula}.",
    r2s: "Armor",
    r3: "{strong} (if you are the attacker) multiplies your damage by {mult} before the defender's armor is applied.",
    r3s: "Crit",
    r4: "The final damage (post-armor) is subtracted from your RPG {health}. If it reaches 0: you get Slowness + Weakness for 5 seconds and recover to 25% of your maximum — a custom “downed” state, not vanilla death (which keeps running in parallel, governed by your real hearts).",

    regenTitle: "Passive regeneration",
    regenBody:
      "{task} runs every {interval} (config, 5s by default) and adds a % of the maximum to health/mana ({percents}). If {flag} is {false} (default), it does not regenerate while the player is in recent combat (window defined by {duration}).",

    hudTitle: "On-screen indicator",
    hudBody:
      "{bar} shows a persistent boss bar: the progress bar reflects health %, and mana is shown as text in the title ({example}). It updates on every hit, every skill use, and every regeneration tick.",
  },

  skills: {
    title: "Skills & traits",
    intro: "Active skills with mana cost and cooldown, and passive traits granted by level.",
    skillsTitle: "Skills",
    skillsLead: "They load from {dir} (by default it only ships {fireball}). Each skill defines:",
    useTitle: "Using a skill",
    useLead: "A player who has already learned it (see {link}) uses it with:",
    useLink: "automatic unlock by level",
    u1: "Checks that you have learned it, have enough level and enough mana.",
    u2: "Checks the skill's own cooldown AND the global cooldown between skills ({key}).",
    u3: "Deducts the mana.",
    u4: "Finds the entity you are looking at ({raytrace}, up to 20 blocks) and deals damage = {formula}.",
    u5: "If there is no target in range, the mana is still spent and the cooldown still starts — the spell “fizzles”.",
    memoryNote:
      "Cooldowns and combat state are {strong} — they reset if the player disconnects or the server restarts. That is intentional.",
    memoryStrong: "in memory, not persisted",
    listTitle: "Viewing your skills",
    listBody: "{cmd} lists every learned skill with its mana cost, cooldown, and the exact command to use it.",
    traitsTitle: "Traits",
    traitsLead:
      "They load from {dir} (by default only {night}). A trait has a {effect} with bonuses to the 6 attributes, health, mana, damage and defense:",
    thField: "TraitEffect field",
    thEffect: "Effect",
    eAttrs: "Flat bonus to each attribute",
    eHealth: "Flat bonus to max health/mana",
    eDamage: "Combat multipliers",
    traitsList: "{cmd} lists the acquired traits.",
  },

  jobs: {
    title: "Jobs",
    intro: "A parallel progression system: up to 3 active jobs per player, each with its own level and XP.",
    listTitle: "The 6 jobs",
    thId: "ID",
    thName: "Name",
    thAntiFarm: "Anti-farm protection",
    nMiner: "Miner",
    nFisher: "Fisherman",
    nHunter: "Hunter",
    nFarmer: "Farmer",
    nAlchemist: "Alchemist",
    nExplorer: "Explorer",
    aMiner: "Does not pay for blocks placed by the player themselves",
    aHunter: "Does not pay for mobs born from a spawner",
    aFarmer: "Shares the “from spawner” mark with Hunter for automatic animal farms",
    aExplorer: "Rewards new biomes visited and distance travelled, not repeatable actions",
    listAfter:
      "They load from {dir}, each with rewards per {target} ({material} or {entity} name) and, for Explorer, special rewards for distance/biome.",

    joinTitle: "Joining and leaving",
    joinBody:
      "{cmd} opens a GUI with the full catalogue and your status in each. Clicking an inactive one joins it; clicking an active one leaves it. The limit is {strong} — if you are already at the maximum and try to join another, a GUI opens to pick which one to leave first.",
    joinStrong: "3 active jobs",

    rewardTitle: "How a reward works",
    rewardLead: "Every job listener (one per job) delegates to {service}, which centralises:",
    w1: "Checks that the player has that job active.",
    w2: "Looks up the reward configured for that target — if there is none, nothing happens.",
    w3: "Pays money through Vault, if there is an active economy and the reward includes an amount.",
    w4: "Adds {em} experience (independent from your character XP) and levels up if applicable.",
    w4em: "job",
    w5: "Shows feedback in the action bar (XP and money earned).",
    curve: "Job level curve: expBase × (level - 1) ^ expMultiplier   (same pattern as character XP)",

    explorerTitle: "Explorer: a special case",
    explorerBody:
      "It does not trigger on breaking/killing something, but on moving: it pays for every new biome visited and for stretches of distance travelled. Its progress (biomes already visited, accumulated distance) is stored in its own table ({table}), separate from {other}.",

    adminTitle: "Administration",
    adminBody: "{cmd} — assign, remove, or set the level of a job for any online player.",
  },

  progression: {
    title: "Progression & levels",
    intro: "How experience is earned, the level formula, and exactly what happens when you level up.",
    gainTitle: "Earning experience",
    gainBody:
      "{listener} grants XP on killing a mob, with amounts configurable per entity type in {key} (10 by default if the type is not listed explicitly).",
    maxLevel: "Maximum level: 100 ({key}).",
    bonusTitle: "Experience bonuses",
    bonusBody:
      "XP earned by playing — killing mobs, RPGRoll-Quests rewards and RPGRoll-Crafting recipes — gets a percentage bonus. Admin commands, such as {addxp}, give the exact amount.",
    bonusPerm:
      "The base bonus comes from {perm} permissions: {example} gives +10%. If the player has several, the highest wins — they do not add up — so a rank inheriting from another does not collect both. On top of that comes whatever addons register: RPGRoll-Ascension contributes the prestige bonus and the permanent legacy bonus.",
    formulaTitle: "Required experience formula",
    formula: "XP required for level N = base_exp × N ^ exp_multiplier   (100 × N^1.5 by default)",

    whatTitle: "What exactly is applied on level up",
    whatLead:
      "Each level can define rewards in {file}; if a level has no explicit entry, the {defaults} values are used. {handler} applies, in order:",
    p1: "Increments the player's level.",
    p2: "{key} are added to their unspent point pool (see {link}).",
    p3: "{key} increase their max health/mana (and heal/restore that same amount).",
    p4: "{key} are learned/acquired automatically — without overwriting the level of a skill the player had already raised manually.",
    p5: "The {event} event is fired (so other plugins/listeners can react).",
    p6: "The player is saved and shown a summary message.",

    tableTitle: "Rewards configured by default",
    thLevel: "Level",
    thXp: "XP required",
    thPoints: "Stat points",
    thHealth: "+Health",
    thMana: "+Mana",
    thUnlocks: "Unlocks",
    tableNote: "Any other level uses the {defaults}: 2 stat points, +5 health/level, +3 mana/level.",

    cmdTitle: "Related commands",
    c1: "current level and experience.",
    c2: "admin, grants XP.",
    c3: "admin/debug, forces a level-up attempt on yourself.",
  },
};

const pt: CoreCopy = {
  players: {
    title: "Jogadores",
    intro: "O modelo de dados central: {rpgPlayer}, um objeto imutável que agrupa toda a informação de RPG de um jogador.",
    immutableLead:
      "{rpgPlayer} é imutável: cada método que “modifica” algo ({methods}) devolve uma {newInstance} em vez de mutar a existente. Agrupa:",
    newInstance: "nova instância",
    thComponent: "Componente",
    thContains: "Contém",
    identity: "UUID, username, raça, classe",
    stats: "Os 6 atributos D&D",
    progression: "Nível, experiência, timestamps, pontos de stat não gastos",
    skills: "Habilidades aprendidas e o seu nível",
    traits: "Traits adquiridos",
    combat: "Vida/mana atuais e máximas, armadura, evasão, crítico",
    jobs: "Trabalhos ativos (máx. 3) e o seu progresso",

    managerTitle: "PlayerManager",
    managerLead: "Ponto de entrada único para operações de jogador. Coordena duas peças:",
    cacheItem: "mapa em memória ({map}) de jogadores conectados, para não bater no banco de dados a cada operação.",
    repoItem: "persistência real em SQLite ({methods}).",
    flowFile: "fluxo de PlayerManager.getPlayer(uuid)",
    flow1: "Está no PlayerCache?   → devolvê-lo (sem tocar no banco)",
    flow2: "Existe no banco?       → carregar, colocar em cache, devolver",
    flow3: "Não existe em lugar nenhum → Optional.empty()",

    lifecycleTitle: "Ciclo de vida: join / quit",
    lifecycleLead: "Tudo passa por {listener}:",
    life1: "{event} → {call} (cria o jogador se for a primeira vez dele).",
    life2: "20 ticks depois (1 segundo, para dar tempo ao cliente carregar): os modificadores físicos da raça são reaplicados, a boss bar de vida/mana é exibida, e se o personagem não estiver completo (sem raça/classe) o fluxo de criação de personagem é iniciado.",
    life3: "{event} → a boss bar é ocultada e o jogador é descarregado do cache (salvando no banco).",

    completeTitle: "Quando um personagem está “completo”?",
    completeBody:
      "{method} (delegado a {identity}) é simplesmente: tem raça {and} classe atribuídas, ambas não vazias. Enquanto não estiver, o jogador é forçado ao fluxo de {create} a cada login.",
    and: "e",

    phTitle: "Placeholders (PlaceholderAPI)",
    phLead:
      "Softdepend — se o {papi} estiver instalado, o núcleo registra a expansão {badge} automaticamente ao iniciar. Todos leem o {rpgPlayer} já carregado: um jogador sem personagem criado devolve string vazia ou {dash}, nunca cria um nem falha.",
    thPlaceholder: "Placeholder",
    thValue: "Valor",
  },

  races: {
    title: "Raças e classes",
    intro: "Conteúdo carregado dinamicamente de YAML — adicionar uma raça ou classe nova é tão simples quanto adicionar um arquivo.",
    whereTitle: "Onde ficam os arquivos",
    thFolder: "Pasta",
    thDefaults: "Registradas por padrão",
    loadedBy:
      "São carregadas com {managers}, ambos sobre o framework genérico de {common} ({contentManager}). Um arquivo inválido é descartado com um aviso no console — não derruba o resto do carregamento.",
    raceFormatTitle: "Formato de um arquivo de raça",
    classFormatTitle: "Formato de um arquivo de classe",
    classFormatLead: "Igual, mas sem a seção {physical} (as classes não modificam o corpo do jogador):",
    fieldsTitle: "Referência de campos",
    thField: "Campo",
    thType: "Tipo",
    thRequired: "Obrigatório",
    thDescription: "Descrição",
    yes: "Sim",
    no: "Não",
    noUsesId: "Não (usa id)",
    fId: "Identificador único. Se faltar ou estiver vazio, o arquivo é rejeitado.",
    fDisplayName: "Nome mostrado ao jogador.",
    fDescription: "Descrição curta.",
    fBaseAttributes: "Bônus/penalidades somados aos stats base (10) ao criar o personagem.",
    fPassiveTraits: "IDs de traits — são carregados mas {strong} (veja a nota abaixo).",
    fPassiveTraitsStrong: "ainda não são concedidos automaticamente",
    fIcon: "Textura de cabeça de jogador para as GUIs de seleção.",
    fLore: "Linhas de lore mostradas na GUI.",
    fPhysical: "scale, movement-speed-percent, extra-health, knockback-resistance.",
    tMap: "mapa stat→int",
    tStringList: "lista de string",
    tString: "string",
    tBase64: "string (base64)",
    tObjectRaces: "objeto (só raças)",

    physicalTitle: "Modificadores físicos (só raças)",
    physicalBody:
      "{applier} traduz {physical} em {modifier}s reais do Bukkit sobre o jogador (escala, velocidade, vida extra, resistência a knockback). Como o Bukkit não persiste esses modificadores entre reinícios do servidor, eles são reaplicados automaticamente a cada login. Usa chaves ({key}) fixas por atributo, então trocar de raça limpa primeiro os modificadores da raça anterior antes de aplicar os novos — não se acumulam.",

    bonusTitle: "Como os bônus de atributo são aplicados",
    bonusBody:
      "Ao terminar {create}, {flow} parte de {default} (10 em tudo), soma os {baseAttributes} da raça escolhida, depois os da classe, e limita cada valor a [1, 20]. A vida/mana inicial também deriva desses stats finais (Constituição → vida, Inteligência → mana) — veja",

    changeTitle: "Trocar de raça ou classe depois de criado",
    changeBody:
      "Por padrão os jogadores {not} podem trocar de raça/classe por conta própria ({file}: {keys}, ambos em {false} — embora essas flags sejam informativas, nenhum comando de jogador as consulta ainda). Só um admin pode fazê-lo, com",
    changeAfter: ", com a opção {recalc} para recalcular stats e vida/mana do zero.",
    notWord: "não",
  },

  stats: {
    title: "Stats, vida e mana",
    intro: "Os 6 atributos D&D, e um sistema de vida/mana próprio do RPGRoll — independente dos corações do Minecraft.",
    attrTitle: "Os 6 atributos",
    attrBody:
      "{playerStats} guarda Força, Destreza, Constituição, Inteligência, Sabedoria e Carisma, cada um entre 1 e 20 (10 por padrão). O modificador no estilo D&D é calculado como {formula} (divisão inteira) e é o que realmente afeta vida, mana, armadura, evasão e crítico — não o valor bruto.",

    combatTitle: "CombatStats: o recurso de vida/mana",
    notHeartsTitle: "Não é a barra de corações",
    notHeartsBody:
      "O RPGRoll rastreia {health} e {mana} como um recurso próprio (escala base 100, não 20), separado da vida vanilla do Minecraft. É uma decisão de design deliberada: evita reescrever o sistema de morte/respawn do Bukkit, mas significa que a vida “RPG” não é literalmente a mesma coisa que as vidas do jogador.",
    thField: "Campo",
    thDerived: "Deriva de",
    dMaxHealth: "100 + (modificador de Constituição × 5), + bônus acumulados de level up",
    dMaxMana: "100 + (modificador de Inteligência × 5), + bônus acumulados de level up",
    dArmor: "5.0 + (nível × 0.5) — é sempre recalculado, não acumula",
    dEvasion: "0.10 + (modificador de Destreza × 0.02)",
    dCrit: "0.05 + (modificador de Destreza × 0.01)",
    dCritMult: "1.5 (fixo)",

    pointsTitle: "Pontos de atributo",
    pointsBody:
      "Cada nível concede pontos de atributo (configurável em {file}, 2 por padrão) que ficam guardados como {field} em {progression} até o jogador gastá-los com:",
    pointsAfter:
      "Internamente usa o {allocator} para validar (pontos suficientes, não passar de 20), e se o ponto sobe o modificador de Constituição ou Inteligência, ajusta {health} na hora; se sobe Destreza, atualiza evasão/crítico.",

    respecTitle: "Reiniciar atributos (admin)",
    respecBody:
      "{command} devolve os 6 atributos ao valor base (10) e devolve ao jogador, como pontos não gastos, a soma de tudo o que ele deveria ter ganhado conforme o nível atual — um respec completo. Não mexe na vida/mana máximas acumuladas, porque essas crescem com o nível, não com os pontos de atributo investidos.",

    realTitle: "Consequências reais em combate",
    realLead: "{listener} conecta esses números ao combate de verdade:",
    r1: "{strong} é rolada primeiro — se você desviar, o evento de dano é cancelado por completo.",
    r1s: "Evasão",
    r2: "{strong} reduz o dano real com uma fórmula de retornos decrescentes: {formula}.",
    r2s: "Armadura",
    r3: "{strong} (se você é o atacante) multiplica o seu dano por {mult} antes de a armadura do defensor ser aplicada.",
    r3s: "Crítico",
    r4: "O dano final (pós-armadura) é descontado da sua {health} de RPG. Se chegar a 0: você recebe Lentidão + Fraqueza por 5 segundos e se recupera a 25% do seu máximo — um estado “derrubado” próprio, não a morte vanilla (essa continua funcionando em paralelo, governada pelos seus corações reais).",

    regenTitle: "Regeneração passiva",
    regenBody:
      "{task} roda a cada {interval} (config, 5s por padrão) e soma uma % do máximo à vida/mana ({percents}). Se {flag} for {false} (padrão), não regenera enquanto o jogador estiver em combate recente (janela definida por {duration}).",

    hudTitle: "Indicador na tela",
    hudBody:
      "{bar} mostra uma boss bar persistente: a barra de progresso reflete a % de vida, e a mana aparece como texto no título ({example}). Atualiza a cada golpe, a cada uso de habilidade, e a cada tick de regeneração.",
  },

  skills: {
    title: "Habilidades e traits",
    intro: "Habilidades ativas com custo de mana e cooldown, e traits passivos concedidos por nível.",
    skillsTitle: "Habilidades (Skills)",
    skillsLead: "São carregadas de {dir} (por padrão só vem {fireball}). Cada skill define:",
    useTitle: "Usar uma habilidade",
    useLead: "Um jogador que já a aprendeu (veja {link}) a usa com:",
    useLink: "desbloqueio automático por nível",
    u1: "Verifica se você a aprendeu, se tem nível suficiente e mana suficiente.",
    u2: "Verifica o cooldown próprio da skill E o cooldown global entre habilidades ({key}).",
    u3: "Desconta a mana.",
    u4: "Procura a entidade que você está olhando ({raytrace}, até 20 blocos) e aplica dano = {formula}.",
    u5: "Se não houver alvo no alcance, a mana é gasta e o cooldown é ativado mesmo assim — o feitiço “se dissipa”.",
    memoryNote:
      "Os cooldowns e o estado de combate são {strong} — reiniciam se o jogador desconectar ou o servidor reiniciar. É intencional.",
    memoryStrong: "em memória, não persistidos",
    listTitle: "Ver as suas habilidades",
    listBody: "{cmd} lista cada habilidade aprendida com o seu custo de mana, cooldown, e o comando exato para usá-la.",
    traitsTitle: "Traits",
    traitsLead:
      "São carregados de {dir} (por padrão só {night}). Um trait tem um {effect} com bônus aos 6 atributos, vida, mana, dano e defesa:",
    thField: "Campo do TraitEffect",
    thEffect: "Efeito",
    eAttrs: "Bônus fixo a cada atributo",
    eHealth: "Bônus fixo à vida/mana máximas",
    eDamage: "Multiplicadores de combate",
    traitsList: "{cmd} lista os traits adquiridos.",
  },

  jobs: {
    title: "Trabalhos (Jobs)",
    intro: "Um sistema paralelo de progressão: até 3 trabalhos ativos por jogador, cada um com nível e XP próprios.",
    listTitle: "Os 6 trabalhos",
    thId: "ID",
    thName: "Nome",
    thAntiFarm: "Proteção anti-farm",
    nMiner: "Minerador",
    nFisher: "Pescador",
    nHunter: "Caçador",
    nFarmer: "Fazendeiro",
    nAlchemist: "Alquimista",
    nExplorer: "Explorador",
    aMiner: "Não paga por blocos colocados pelo próprio jogador",
    aHunter: "Não paga por mobs nascidos de spawner",
    aFarmer: "Compartilha a marca “de spawner” com o Caçador para fazendas automáticas de animais",
    aExplorer: "Recompensa por bioma novo visitado e distância percorrida, não por ações repetíveis",
    listAfter:
      "São carregados de {dir}, cada um com recompensas por {target} (nome de {material} ou {entity}) e, para o Explorador, recompensas especiais por distância/bioma.",

    joinTitle: "Entrar e sair",
    joinBody:
      "{cmd} abre uma GUI com o catálogo completo e o seu estado em cada um. Clicar num inativo entra; clicar num ativo sai. O limite é de {strong} — se você já estiver no máximo e tentar entrar em outro, abre uma GUI para escolher qual abandonar primeiro.",
    joinStrong: "3 trabalhos ativos",

    rewardTitle: "Como funciona uma recompensa",
    rewardLead: "Todos os listeners de trabalho (um por trabalho) delegam ao {service}, que centraliza:",
    w1: "Verifica se o jogador tem aquele trabalho ativo.",
    w2: "Procura a recompensa configurada para aquele target — se não houver, nada acontece.",
    w3: "Paga dinheiro via Vault, se houver economia ativa e a recompensa incluir valor.",
    w4: "Soma experiência {em} (independente do XP do personagem) e sobe de nível se for o caso.",
    w4em: "do trabalho",
    w5: "Mostra feedback na action bar (XP e dinheiro ganhos).",
    curve: "Curva de nível de trabalho: expBase × (nível - 1) ^ expMultiplier   (mesmo padrão do XP de personagem)",

    explorerTitle: "Explorador: um caso especial",
    explorerBody:
      "Não dispara ao quebrar/matar algo, e sim ao se mover: paga por cada bioma novo visitado e por trechos de distância percorrida. O seu progresso (biomas já visitados, distância acumulada) é salvo na sua própria tabela ({table}), separado de {other}.",

    adminTitle: "Administração",
    adminBody: "{cmd} — atribuir, remover, ou fixar o nível de um trabalho de qualquer jogador conectado.",
  },

  progression: {
    title: "Progressão e nível",
    intro: "Como se ganha experiência, a fórmula de nível, e o que exatamente acontece ao subir de nível.",
    gainTitle: "Ganhar experiência",
    gainBody:
      "{listener} concede XP ao matar um mob, com valores configuráveis por tipo de entidade em {key} (10 por padrão se o tipo não estiver listado explicitamente).",
    maxLevel: "Nível máximo: 100 ({key}).",
    bonusTitle: "Bônus de experiência",
    bonusBody:
      "A XP ganha jogando — ao matar mobs, nas recompensas do RPGRoll-Quests e nas receitas do RPGRoll-Crafting — recebe um bônus em porcentagem. Os comandos de admin, como {addxp}, dão a quantidade exata.",
    bonusPerm:
      "O bônus base vem das permissões {perm}: {example} dá +10%. Se o jogador tiver várias, vale a maior — não se somam —, então um rank que herda de outro não recebe as duas. Por cima soma-se o que os addons registrarem: o RPGRoll-Ascension contribui com o bônus de prestígio e o permanente de legado.",
    formulaTitle: "Fórmula de experiência necessária",
    formula: "XP necessária para o nível N = base_exp × N ^ exp_multiplier   (100 × N^1.5 por padrão)",

    whatTitle: "O que exatamente é aplicado ao subir de nível",
    whatLead:
      "Cada nível pode definir recompensas em {file}; se um nível não tiver entrada explícita, usam-se os valores de {defaults}. {handler} aplica, em ordem:",
    p1: "Incrementa o nível do jogador.",
    p2: "{key} são somados ao seu pool de pontos não gastos (veja {link}).",
    p3: "{key} aumentam a vida/mana máximas (e curam/restauram essa mesma quantidade).",
    p4: "{key} são aprendidos/adquiridos automaticamente — sem sobrescrever o nível de uma skill que o jogador já tivesse subido manualmente.",
    p5: "O evento {event} é disparado (para que outros plugins/listeners possam reagir).",
    p6: "O jogador é salvo e recebe uma mensagem de resumo.",

    tableTitle: "Recompensas configuradas por padrão",
    thLevel: "Nível",
    thXp: "XP necessária",
    thPoints: "Pontos stat",
    thHealth: "+Vida",
    thMana: "+Mana",
    thUnlocks: "Desbloqueia",
    tableNote: "Qualquer outro nível usa os {defaults}: 2 pontos de stat, +5 vida/nível, +3 mana/nível.",

    cmdTitle: "Comandos relacionados",
    c1: "nível e experiência atuais.",
    c2: "admin, adiciona XP.",
    c3: "admin/debug, força uma tentativa de subir de nível em você mesmo.",
  },
};

export const CORE_COPY: Record<Locale, CoreCopy> = { es, en, pt };
