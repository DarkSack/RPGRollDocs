import type { Locale } from "../../i18n";

/** Texto de los addons, cuarta tanda: Extras y Fishing. */

const es = {
  extras: {
    title: "Extras (RPGRoll-Extras)",
    intro:
      "Motor genérico de necesidades y estados de supervivencia: sed, stamina, fatiga, oxígeno, estrés, temperatura corporal y cualquier condition custom (sangrado, envenenado, congelamiento...) — un administrador puede inventar un need o un estado nuevo enteramente por YAML, sin tocar Java.",

    reqTitle: "Requisitos",
    reqBody1: "Solo {depend} es obligatorio (raza/clase/jobs vía {pm} real).",
    reqBody2:
      "habilita placeholders si está instalado; sin él, los stats siguen funcionando pero no hay forma de mostrarlos en tablist/scoreboard sin el HUD propio. RPGRoll-Seasons/PlaceholderAPI/Vault no se referencian desde ningún código de este addon en esta pasada — quedan como softdepend reservado, no integración real.",

    statsTitle: "Motor genérico de Stats",
    statsBody:
      "Un único {engine} atiende sed, stamina, fatiga, oxígeno, estrés o cualquier need custom — el comportamiento completo (decay/regeneración/consumo/umbrales) viene del YAML, no de código específico por stat. Decay y regeneración corren en tareas programadas al intervalo que cada stat declara (no un tick global compartido); ajustes puntuales (consumo por acción, llamadas de otro addon) son siempre por evento.",
    thField: "Campo",
    thWhat: "Qué hace",
    fDecay: "{obj} — baja pasivamente cada {interval} ticks.",
    fRegen: "Lista de reglas {obj} — se suman todas las que matcheen (condición vacía = siempre).",
    fConsumption: "Mapa acción→cantidad ({actions}/cualquier acción custom reportada por otro addon).",
    fThresholds: "Lista de {obj} evaluada contra el valor actual cada 20 ticks.",
    thresholdBody:
      "Dentro de un threshold: {potions} se reaplica mientras la condición se mantenga verdadera (como un potion effect vanilla refrescado en cada chequeo); {actions} se ejecuta UNA sola vez, al cruzar hacia ese umbral; {applyConditions} son ids de {def} que se aplican mientras el umbral se mantiene y se remueven al salir — así un stat en 0 (ej. sed) puede disparar daño periódico reusando el motor de Conditions en vez de reinventarlo.",

    bStat: "Constructor visual: stat",
    bStatDesc:
      "Identidad y límites de un stat. decay/regeneration/consumption/thresholds son demasiado anidados para este formulario — copia y adaptá el ejemplo de arriba para esos bloques.",
    sfId: "Id",
    sfEnabled: "Habilitado",
    sfMax: "Máximo",
    sfStart: "Valor inicial",

    afkTitle: "Jugadores AFK",
    afkBody:
      "Tras {idle} segundos sin tocar nada —moverse, girar la cámara, chatear, golpear— los stats del jugador se congelan: la sed no baja, la fatiga no sube y tampoco regeneran, hasta que vuelva a hacer algo. Los umbrales ya alcanzados siguen aplicando sus efectos. Se desactiva con {pause}; tras cambiarlo, {reload}.",
    activityTitle: "Activity State Resolver",
    activityBody:
      "Las reglas de {regen} pueden condicionar por actividad del jugador: {states}. El resolver NO chequea esto por tick — se apoya en timestamps de eventos reales (último movimiento, último daño recibido o infligido) para clasificar barato en cada evaluación. También acepta condiciones ambientales con prefijo: {prefixes}, y la palabra clave especial {underwater} (jugador sumergido en líquido).",

    menuTitle:
      "Menú del servidor (brújula)",
    menuBody:
      "Un ítem —una brújula por defecto— que abre el menú del servidor con cualquier clic: en el aire, sobre un bloque o una entidad, o sobre él en el inventario. Se configura en {section} de {config} y viene apagado ({enabled}). Con {locked} no se puede tirar, guardar en cofres ni cambiar de mano; con {keep} no cae al morir y vuelve al reaparecer; con {join} se entrega al entrar en su casilla de la barra.",
    menuFilesBody:
      "Los menús son YAML en {dir}, con el mismo formato que los de RPGRoll-NPCs: el motor vive en RPGRoll-Lib, así que Extras no depende de NPCs. {main} abre el principal, {item} devuelve la brújula y {any} abre cualquier menú por su id (solo con {perm}, porque un menú puede llevar comandos de consola). Los botones de un módulo que no tengas instalado dan \"comando desconocido\": bórralos o cámbialos.",

    consumeTitle: "Consumption hooks",
    consumeBody:
      "Sprint (al empezar a correr, no continuo), salto, ataque y minado se detectan automáticamente vía eventos vanilla. Pesca, farming y habilidades de otros addons NO se detectan acá a propósito — le corresponde a cada addon reportar su propia acción llamando a {call} (o el nombre de acción que corresponda), la misma superficie pública que usa el hook interno de minado.",

    condTitle: "Conditions: estados custom",
    condBody1:
      "Una {def} (sangrado, envenenado, congelamiento, o cualquier estado custom) es daño periódico + potion effects + acciones on-apply/on-tick/on-expire, con duración fija o indefinida ({duration}, se remueve solo por API/comando o por otro sistema como un threshold de stat). Deliberadamente NO reusa",
    condBody2:
      "— se mantiene como un motor de estados simple y standalone en vez de acoplarse al sistema de efectos completo (stacking, inmunidades, componentes de aura...), que resuelve un problema más grande del que Extras necesita.",
    bCondition: "Constructor visual: condition",
    bConditionDesc:
      "Duración, daño y potion effects de un estado. on-apply/on-tick/on-expire (acciones) son demasiado anidados para este formulario — copia y adaptá el ejemplo de arriba.",
    cfDuration: "Duración en ticks (-1 = indefinida)",
    cfDamage: "Daño periódico",
    cfInterval: "Intervalo en ticks",
    cfEffects: "Potion effects (TYPE o TYPE:AMPLIFICADOR)",

    tempTitle: "Temperatura: ambiental y corporal",
    tempBody:
      "{calc} parte de {vanilla} vanilla (cubre cualquier bioma sin mantener una tabla propia) y suma modificadores por hora del día, clima, altitud, dimensión (Nether +25°C, End -10°C) y bloques cercanos (lava/fuego calientan, hielo/nieve enfrían, radio de 3 bloques). {engine} converge gradualmente hacia la ambiental según {rate} (fracción de la diferencia que se cierra en cada actualización) y mapea el resultado a un estado con nombre (hipotermia severa → hipotermia → frío → normal → sobrecalentamiento → hipertermia), cada uno con sus propios potion effects opcionales.",

    thermalTitle: "Protección térmica de ítems",
    thermalBody1:
      "{service} suma la protección de las 4 piezas de armadura equipadas. Si un ítem trae {keys} en el custom-data genérico de",
    thermalBody2:
      "se usa eso; si no, cae a una tabla de materiales vanilla razonable (cuero abriga, netherite protege de ambos extremos, etc.). La lectura del custom-data reconstruye manualmente la {nsKey} — cero dependencia de compilación con el módulo Items.",

    modTitle: "Modificadores desde raza/clase/job",
    modBody:
      "Un {set} (id + tipo RACE/CLASS/JOB + mapa de valores) aporta bonos a los sistemas de Extras sin que RPGRoll-Core sepa que este addon existe: {resolver} lee la raza/clase/jobs ACTIVOS del jugador vía la API pública de Core y busca acá un set con ese mismo id. Las claves {keys} son multiplicadores — {strong}, así que un valor de {v1} da 130% y un valor de {v2} da 80%. Cualquier otra clave es un bono aditivo simple, a interpretar por quien la lea (hoy, ningún sistema además de stats consume claves arbitrarias).",
    modStrong: "el motor calcula {formula}",
    bModifier: "Constructor visual: modifier",
    bModifierDesc:
      "Id y tipo de fuente. Las claves de 'values' (ej. stamina_max, thirst_rate) son libres — copia y adaptá el ejemplo de arriba.",
    mfId: "Id (debe coincidir con el id en RPGRoll-Core)",
    mfType: "Tipo",

    reusableTitle: "Condiciones/expresiones reusables",
    reusableBody:
      "El mismo {evaluator} que resuelve {regen} se usa en cualquier lugar del addon que necesite evaluar una condición de texto: palabras clave de actividad sin prefijo, o {prefixes} con prefijo. Los umbrales numéricos de {thresholds} ({examples}) usan un evaluador aparte ({numeric}), específico para comparar contra el valor actual del stat.",

    actionsTitle: "Sistema de Actions",
    thType: "Tipo",
    aMessage: "Le envía un mensaje al jugador (colores {amp} traducidos).",
    aSound: "{fmt} reproducido en la ubicación del jugador.",
    aParticle: "{fmt} spawneado en la ubicación del jugador.",
    aDamage: "Daño directo ({api}) — usado internamente por conditions y thresholds.",
    aCommand: "Ejecuta un comando de consola con {var} reemplazado.",

    hudTitle: "HUD configurable",
    hudBody1:
      "Un actionbar opcional (deshabilitado por defecto) que renderiza una o más líneas con formato libre, incluyendo una barra de progreso ASCII ({bar}) con caracteres lleno/vacío configurables. Pensado como fallback simple para servidores sin",
    hudBody2:
      "instalado — con TAB, mostrar los mismos valores en tablist/scoreboard vía placeholders suele ser preferible.",

    tabTitle: "Integración con RPGRoll-TAB",
    tabBody:
      "Si RPGRoll-TAB está instalado, Extras registra un placeholder {p1} y {p2} por cada stat cargado, más {p3}, {p4} y {p5} (lista separada por comas de las conditions activas). El registro vive aislado en {bridge} — la JVM nunca resuelve clases de TAB si el plugin no está presente.",

    apiTitle: "API para addons — ExtrasAPI",
    cmdTitle: "Comandos",
    thCommand: "Comando",
    cReload: "Recarga stats/conditions/modifiers desde disco.",
    cList: "Lista todos los stats y conditions cargados.",
    cGet: "Muestra el valor actual de un stat.",
    cSet: "Fija el valor de un stat (clampeado a [0, máximo efectivo]).",
    cAdd: "Suma/resta una cantidad al valor actual.",
    cApply: "Aplica una condition.",
    cRemove: "Remueve una condition activa.",
    cMenu: "Abre el menú del servidor, sin necesidad de la brújula.",
    cMenuItem: "Devuelve la brújula si la perdiste (con el menú activado).",
    cMenuAny: "Abre cualquier menú de menus/ por su id.",
    permNote:
      "/extrasadmin requiere {perm} (default: op). /menu y /menu item requieren {menu} (default: true); /menu <id>, {any} (default: op). Los stats se consultan vía placeholders (con TAB) o el HUD.",
  },

  fishing: {
    title: "Fishing (RPGRoll-Fishing)",
    intro:
      "Pesca como profesión completa — especies configurables con docenas de condiciones de captura, cañas y carnadas que modifican la tirada, un minijuego de forcejeo opcional, tesoros y basura, peces legendarios con requisitos extremos, y una enciclopedia de capturas por jugador.",
    vanillaTitle: "No reimplementa el cast/espera/mordida de la pesca",
    vanillaBody:
      "RPGRoll-Fishing se apoya por completo en {event} de Bukkit — Minecraft decide cuándo y dónde muerde el anzuelo (vanilla), y este addon solo intercepta el estado {state} para sustituir lo que iba a soltar por su propia tirada ponderada. Esto simplifica muchísimo el addon, pero trae una consecuencia real: {strong}, porque vanilla nunca genera una mordida con el anzuelo flotando en lava.",
    vanillaStrong: "una especie con {lava} sería imposible de pescar",

    reqTitle: "Requisitos",
    reqBody1: "Sin",
    reqBody2:
      ", el campo {seasons} de una especie simplemente no filtra nada (siempre elegible por estación) y el clima usa una tabla de temperatura aproximada propia en vez de la de Seasons. Sin RPGRoll-FX/RPGRoll-Effects, {effects} no hacen nada — el resto de la captura funciona igual. Sin",
    reqBody3:
      ", {cmd} se guarda igual en la especie pero no se sincroniza ninguna textura — el ítem se ve con el {icon} vanilla normal, sin errores ni advertencias.",

    speciesTitle: "Especies de peces",
    speciesBody:
      "Una {species} combina identidad (nombre, ícono, {cmd}), clasificación (categoría/rareza), condiciones de captura y rango de peso/largo/precio/experiencia. {strong} — un {waterTypes} vacío permite cualquier agua, no ninguna.",
    speciesStrong: "Todo campo de tipo lista vacío significa “sin restricción”",
    texTitle: "Texturas custom: la carpeta resourcepack/ se sincroniza sola",
    texBody:
      "{cmd} solo define el número — el material/textura reales los pone un resource pack. Dejá el modelo/textura en {path} y, si SackResourcePack está instalado, se sincroniza solo al arrancar el plugin (mismo mecanismo que ya usa RPGRoll-Items). Sin ese resource pack armado, el pez se ve con su {icon} vanilla normal.",
    thCondition: "Condición",
    thHow: "Cómo se resuelve",
    cWater: "Bioma/bloque del anzuelo → RIVER/LAKE/SWAMP/OCEAN/DEEP_OCEAN, o forzado por una {region} para MAGIC_WATER/CORRUPTED_WATER.",
    cBiomes: "Nombre de bioma vanilla en minúsculas (ej. {ex}).",
    cDepths: "Escaneo simple de la columna de agua: SURFACE/MID_WATER/BOTTOM, o UNDERWATER_CAVE si hay techo sólido sobre la superficie.",
    cWeather: "SUNNY/RAIN/SNOW (según temperatura)/STORM, leído de {api}.",
    cTimes: "DAY/NIGHT/DAWN/DUSK/NOON/MIDNIGHT — varios pueden estar activos a la vez, según {api}.",
    cSeasons: "Compara contra la estación efectiva de RPGRoll-Seasons (si está instalado).",

    legendaryTitle: "Peces legendarios",
    legendaryBody:
      "{flag} activa hasta 3 condiciones extra, evaluadas {besides} de las normales: {reqLevel} (vía RPGRollAPI, si no está instalado un nivel mínimo > 0 hace la especie imposible), {fullMoon} (una fase lunar propia calculada como {formula}, no una luna llena “real” de Minecraft), y {reqBait} (exige esa carnada exacta, no solo un tag). El Leviatán del contenido de ejemplo usa las tres a la vez.",
    legendaryBesides: "además",

    rodsTitle: "Cañas y carnadas",
    rodsTipTitle: "Una caña unifica Caña/Carrete/Sedal/Anzuelo del diseño original",
    rodsTipBody:
      "Los cuatro son, en la práctica, multiplicadores sobre la misma tirada de captura — {rod} los junta en un solo tipo de contenido (mismo criterio que {catalyst} en Magic). Lo que los diferenciaría (modelo, lore, nombre) sigue siendo libre por caña.",
    thRodField: "Campo de la caña",
    thEffect: "Efecto",
    rReelSpeed: "Achica la zona de tensión del minijuego RPG (más difícil) o la agranda si es >1 (más fácil).",
    rPrecision: "Bono directo a la tirada de calidad de la captura.",
    rResistance: "Aumenta los fallos permitidos antes de que el pez escape.",
    rLuck: "Multiplica el peso de tirada de especies no-COMMON.",
    rPreferred: "+50% de peso extra a especies de esas categorías.",
    rCastPower: "Cosmético por ahora — reservado para una futura mecánica de distancia real.",
    baitBody:
      "Una carnada se sostiene en la mano secundaria y se consume 1 por cada lanzamiento (aunque no muerda nada). {quality} suma directo a la tirada de calidad; {legWeight} es la “Carnada Legendaria” del diseño original — solo importa contra especies {legendary}.",

    treasureTitle: "Tesoros y basura",
    treasureBody:
      "Antes de sortear una especie, cada picada tira contra {chances} (config global) — si sale tesoro o basura, ni siquiera se evalúan las especies elegibles. Ambos entregan hoy un {stack} vanilla puro (material + cantidad); referenciar un ítem custom de RPGRoll-Items queda para una integración futura.",

    regionsTitle: "Regiones de pesca",
    regionsBody:
      "Una {region} es una caja simple (AABB, sin WorldGuard — mismo estilo que {seasonRegion}) que fuerza un {waterType}. Es la única forma de conseguir {magic} o {corrupted}, ya que ningún bioma vanilla las implica.",

    miniTitle: "Minijuego de forcejeo (modo RPG)",
    miniBody:
      "Con {rpgMode} (config global), cada picada de pez abre una barra de tensión: un indicador oscila con una onda seno y el jugador tiene que golpear con {strong} — a propósito, no click derecho, porque con una caña en mano ese botón ya recoge el sedal en vanilla. {behavior} de la especie decide velocidad de oscilación y ancho de zona; {jumper} re-centra la zona cada 40 ticks para simular un pez errático. Con {rpgModeOff} la captura se resuelve al instante, sin minijuego (modo vanilla clásico).",
    miniStrong: "click izquierdo (swing de brazo)",

    yamlTitle: "Ejemplos de archivo YAML",
    refTitle: "Referencia completa: todos los campos en un solo archivo",
    refBody:
      "{file} (incluido en el jar) agrega {fields} — los tres campos que ninguno de los dos ejemplos de arriba muestra, junto con todos los demás.",

    bSpecies: "Constructor visual: especie de pez",
    bSpeciesDesc:
      "Identidad, clasificación y condiciones básicas de captura. Campos de listas van separados por comas; dejalos vacíos para 'sin restricción'.",
    bRod: "Constructor visual: caña de pescar",
    fId: "Id",
    fDisplayName: "Nombre visible",
    fIcon: "Ícono (Material)",
    fCmd: "CustomModelData",
    fDescription: "Descripción",
    fCategory: "Categoría",
    fRarity: "Rareza",
    fWaterTypes: "Tipos de agua (vacío = cualquiera)",
    fBiomes: "Biomas (vacío = cualquiera)",
    fMinWeight: "Peso mín. (kg)",
    fMaxWeight: "Peso máx. (kg)",
    fMinLength: "Largo mín. (cm)",
    fMaxLength: "Largo máx. (cm)",
    fBasePrice: "Precio base",
    fBaseXp: "Experiencia base",
    fBehavior: "Comportamiento (dificultad del minijuego)",
    fBaitTags: "Tags de carnada que atraen (bono de peso)",
    fCatchEffect: "Efecto RPGRoll-FX al capturar",
    fCatchStatus: "Efecto de estado (RPGRoll-Effects) al capturar",
    fMaterial: "Material",
    fDurability: "Durabilidad",
    fCastPower: "Poder de lanzamiento (cosmético)",
    fReelSpeed: "Velocidad de reeleo (ancho de zona)",
    fPrecision: "Precisión (bono a calidad)",
    fResistance: "Resistencia (fallos permitidos)",
    fLuck: "Suerte (peso de especies raras+)",
    fPreferred: "Categorías preferidas",

    guiTitle: "GUI: Fishing Studio",
    guiBody:
      "{browser} abre un hub que enlaza a 6 navegadores — Especies, Cañas, Carnadas, Tesoros, Basura y Regiones. {enc} abre la enciclopedia personal del jugador: qué especies conoce y su mejor captura (peso/largo/calidad) de cada una.",

    apiTitle: "API para addons — FishingAPI",
    apiTipTitle: "hasCaught/getCaughtCount no saben nada de misiones ni recetas",
    apiTipBody:
      "Son atajos genéricos sobre la enciclopedia del jugador — un futuro RPGRoll-Quests definiría su propio objetivo de captura y llamaría a estos métodos; Fishing no necesita saber que “eso” es una misión.",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    thWhat: "Qué hace",
    cBrowser: "Abre el Fishing Studio.",
    cReload: "Recarga todas las definiciones desde disco.",
    cGiveRod: "Entrega una caña al jugador.",
    cGiveBait: "Entrega carnada al jugador.",
    cEncyclopedia: "Abre la enciclopedia de capturas personal.",
    cStats: "Resumen: peces capturados, especies descubiertas, tesoros y basura.",
    permNote: "{admin} requiere {p1} (default: op); {use} requiere {p2} (default: true).",
  },
};

export type AddonsDCopy = typeof es;

const en: AddonsDCopy = {
  extras: {
    title: "Extras (RPGRoll-Extras)",
    intro:
      "Generic engine for survival needs and states: thirst, stamina, fatigue, oxygen, stress, body temperature and any custom condition (bleeding, poisoned, frostbite...) — an admin can invent a whole new need or state entirely in YAML, without touching Java.",

    reqTitle: "Requirements",
    reqBody1: "Only {depend} is mandatory (race/class/jobs through the real {pm}).",
    reqBody2:
      "enables placeholders if installed; without it, stats still work but there is no way to show them in tablist/scoreboard other than the built-in HUD. RPGRoll-Seasons/PlaceholderAPI/Vault are not referenced from any code in this addon in this pass — they remain reserved softdepends, not real integrations.",

    statsTitle: "Generic Stats engine",
    statsBody:
      "A single {engine} handles thirst, stamina, fatigue, oxygen, stress or any custom need — the full behaviour (decay/regeneration/consumption/thresholds) comes from YAML, not from per-stat code. Decay and regeneration run on scheduled tasks at whatever interval each stat declares (not one shared global tick); one-off adjustments (consumption per action, calls from another addon) are always event-driven.",
    thField: "Field",
    thWhat: "What it does",
    fDecay: "{obj} — drops passively every {interval} ticks.",
    fRegen: "A list of {obj} rules — every matching one is added up (an empty condition = always).",
    fConsumption: "An action→amount map ({actions}/any custom action reported by another addon).",
    fThresholds: "A list of {obj} evaluated against the current value every 20 ticks.",
    thresholdBody:
      "Inside a threshold: {potions} is reapplied while the condition stays true (like a vanilla potion effect refreshed on every check); {actions} runs ONCE, on crossing into that threshold; {applyConditions} are {def} ids applied while the threshold holds and removed on leaving it — that way a stat at 0 (e.g. thirst) can trigger periodic damage by reusing the Conditions engine instead of reinventing it.",

    bStat: "Visual builder: stat",
    bStatDesc:
      "A stat's identity and limits. decay/regeneration/consumption/thresholds are too deeply nested for this form — copy and adapt the example above for those blocks.",
    sfId: "Id",
    sfEnabled: "Enabled",
    sfMax: "Maximum",
    sfStart: "Starting value",

    afkTitle: "AFK players",
    afkBody:
      "After {idle} seconds without touching anything — moving, turning the camera, chatting, hitting — the player's stats freeze: thirst does not drop, fatigue does not rise and they do not regenerate either, until the player does something again. Thresholds already reached keep applying their effects. Turn it off with {pause}; after changing it, {reload}.",
    activityTitle: "Activity State Resolver",
    activityBody:
      "{regen} rules can be conditioned on player activity: {states}. The resolver does NOT check this per tick — it leans on timestamps from real events (last movement, last damage taken or dealt) to classify cheaply on each evaluation. It also accepts prefixed environmental conditions: {prefixes}, and the special keyword {underwater} (player submerged in a liquid).",

    menuTitle:
      "Server menu (compass)",
    menuBody:
      "An item — a compass by default — that opens the server menu on any click: in the air, on a block or an entity, or on the item itself in the inventory. It is configured in {section} of {config} and ships off ({enabled}). With {locked} it cannot be dropped, stored in chests or swapped between hands; with {keep} it does not drop on death and comes back on respawn; with {join} it is handed out on join in its hotbar slot.",
    menuFilesBody:
      "Menus are YAML files in {dir}, with the same format as RPGRoll-NPCs menus: the engine lives in RPGRoll-Lib, so Extras does not depend on NPCs. {main} opens the main one, {item} gives the compass back and {any} opens any menu by id (only with {perm}, because a menu can run console commands). Buttons for a module you do not have installed give \"unknown command\": remove or change them.",

    consumeTitle: "Consumption hooks",
    consumeBody:
      "Sprint (on starting to run, not continuously), jumping, attacking and mining are detected automatically through vanilla events. Fishing, farming and other addons' skills are deliberately NOT detected here — it is up to each addon to report its own action by calling {call} (or whatever action name fits), the same public surface the internal mining hook uses.",

    condTitle: "Conditions: custom states",
    condBody1:
      "A {def} (bleeding, poisoned, frostbite, or any custom state) is periodic damage + potion effects + on-apply/on-tick/on-expire actions, with a fixed or indefinite duration ({duration}, removed only through the API/a command or by another system such as a stat threshold). It deliberately does NOT reuse",
    condBody2:
      "— it stays a simple, standalone state engine instead of coupling to the full effects system (stacking, immunities, aura components...), which solves a bigger problem than Extras needs.",
    bCondition: "Visual builder: condition",
    bConditionDesc:
      "A state's duration, damage and potion effects. on-apply/on-tick/on-expire (actions) are too deeply nested for this form — copy and adapt the example above.",
    cfDuration: "Duration in ticks (-1 = indefinite)",
    cfDamage: "Periodic damage",
    cfInterval: "Interval in ticks",
    cfEffects: "Potion effects (TYPE or TYPE:AMPLIFIER)",

    tempTitle: "Temperature: ambient and body",
    tempBody:
      "{calc} starts from vanilla {vanilla} (covering any biome without maintaining a table of its own) and adds modifiers for time of day, weather, altitude, dimension (Nether +25°C, End -10°C) and nearby blocks (lava/fire warm, ice/snow cool, 3-block radius). {engine} converges gradually towards the ambient one according to {rate} (the fraction of the difference closed on each update) and maps the result to a named state (severe hypothermia → hypothermia → cold → normal → overheating → hyperthermia), each with its own optional potion effects.",

    thermalTitle: "Thermal protection from items",
    thermalBody1:
      "{service} adds up the protection of the 4 equipped armour pieces. If an item carries {keys} in the generic custom-data of",
    thermalBody2:
      "that is used; otherwise it falls back to a reasonable vanilla material table (leather insulates, netherite protects from both extremes, etc.). Reading the custom-data rebuilds the {nsKey} by hand — zero compile-time dependency on the Items module.",

    modTitle: "Modifiers from race/class/job",
    modBody:
      "A {set} (id + RACE/CLASS/JOB type + value map) contributes bonuses to Extras' systems without RPGRoll-Core knowing this addon exists: {resolver} reads the player's ACTIVE race/class/jobs through Core's public API and looks up a set with that same id here. The {keys} keys are multipliers — {strong}, so a value of {v1} gives 130% and a value of {v2} gives 80%. Any other key is a simple additive bonus, to be interpreted by whoever reads it (today, no system besides stats consumes arbitrary keys).",
    modStrong: "the engine computes {formula}",
    bModifier: "Visual builder: modifier",
    bModifierDesc:
      "Id and source type. The 'values' keys (e.g. stamina_max, thirst_rate) are free-form — copy and adapt the example above.",
    mfId: "Id (must match the id in RPGRoll-Core)",
    mfType: "Type",

    reusableTitle: "Reusable conditions/expressions",
    reusableBody:
      "The same {evaluator} that resolves {regen} is used anywhere in the addon that needs to evaluate a text condition: unprefixed activity keywords, or prefixed {prefixes}. The numeric thresholds in {thresholds} ({examples}) use a separate evaluator ({numeric}), specific to comparing against the stat's current value.",

    actionsTitle: "Actions system",
    thType: "Type",
    aMessage: "Sends the player a message ({amp} colours translated).",
    aSound: "{fmt} played at the player's location.",
    aParticle: "{fmt} spawned at the player's location.",
    aDamage: "Direct damage ({api}) — used internally by conditions and thresholds.",
    aCommand: "Runs a console command with {var} substituted.",

    hudTitle: "Configurable HUD",
    hudBody1:
      "An optional actionbar (disabled by default) that renders one or more free-format lines, including an ASCII progress bar ({bar}) with configurable filled/empty characters. Meant as a simple fallback for servers without",
    hudBody2:
      "installed — with TAB, showing the same values in tablist/scoreboard through placeholders is usually preferable.",

    tabTitle: "RPGRoll-TAB integration",
    tabBody:
      "If RPGRoll-TAB is installed, Extras registers a {p1} and {p2} placeholder for every loaded stat, plus {p3}, {p4} and {p5} (a comma-separated list of the active conditions). The registration lives isolated in {bridge} — the JVM never resolves TAB classes if the plugin is absent.",

    apiTitle: "Addon API — ExtrasAPI",
    cmdTitle: "Commands",
    thCommand: "Command",
    cReload: "Reloads stats/conditions/modifiers from disk.",
    cList: "Lists every loaded stat and condition.",
    cGet: "Shows a stat's current value.",
    cSet: "Sets a stat's value (clamped to [0, effective maximum]).",
    cAdd: "Adds/subtracts an amount from the current value.",
    cApply: "Applies a condition.",
    cRemove: "Removes an active condition.",
    cMenu: "Opens the server menu, no compass needed.",
    cMenuItem: "Gives the compass back if you lost it (with the menu enabled).",
    cMenuAny: "Opens any menu in menus/ by id.",
    permNote:
      "/extrasadmin requires {perm} (default: op). /menu and /menu item require {menu} (default: true); /menu <id>, {any} (default: op). Stats are read through placeholders (with TAB) or the HUD.",
  },

  fishing: {
    title: "Fishing (RPGRoll-Fishing)",
    intro:
      "Fishing as a full profession — configurable species with dozens of catch conditions, rods and baits that modify the roll, an optional struggle minigame, treasure and junk, legendary fish with extreme requirements, and a per-player catch encyclopedia.",
    vanillaTitle: "It does not reimplement casting/waiting/biting",
    vanillaBody:
      "RPGRoll-Fishing leans entirely on Bukkit's {event} — Minecraft decides when and where the hook bites (vanilla), and this addon only intercepts the {state} state to replace whatever it was about to drop with its own weighted roll. That simplifies the addon enormously, but has a real consequence: {strong}, because vanilla never generates a bite with the hook floating in lava.",
    vanillaStrong: "a species with {lava} would be impossible to fish",

    reqTitle: "Requirements",
    reqBody1: "Without",
    reqBody2:
      ", a species' {seasons} field simply filters nothing (always season-eligible) and the weather uses an approximate temperature table of its own instead of Seasons'. Without RPGRoll-FX/RPGRoll-Effects, {effects} do nothing — the rest of the catch works the same. Without",
    reqBody3:
      ", {cmd} is still stored on the species but no texture gets synced — the item shows with its normal vanilla {icon}, with no errors or warnings.",

    speciesTitle: "Fish species",
    speciesBody:
      "A {species} combines identity (name, icon, {cmd}), classification (category/rarity), catch conditions and weight/length/price/experience ranges. {strong} — an empty {waterTypes} allows any water, not none.",
    speciesStrong: "Every empty list field means “no restriction”",
    texTitle: "Custom textures: the resourcepack/ folder syncs itself",
    texBody:
      "{cmd} only defines the number — the actual material/texture comes from a resource pack. Drop the model/texture in {path} and, if SackResourcePack is installed, it syncs by itself when the plugin starts (the same mechanism RPGRoll-Items already uses). Without that resource pack built, the fish shows with its normal vanilla {icon}.",
    thCondition: "Condition",
    thHow: "How it resolves",
    cWater: "Biome/block at the hook → RIVER/LAKE/SWAMP/OCEAN/DEEP_OCEAN, or forced by a {region} for MAGIC_WATER/CORRUPTED_WATER.",
    cBiomes: "Vanilla biome name in lowercase (e.g. {ex}).",
    cDepths: "A simple scan of the water column: SURFACE/MID_WATER/BOTTOM, or UNDERWATER_CAVE if there is a solid ceiling above the surface.",
    cWeather: "SUNNY/RAIN/SNOW (by temperature)/STORM, read from {api}.",
    cTimes: "DAY/NIGHT/DAWN/DUSK/NOON/MIDNIGHT — several can be active at once, according to {api}.",
    cSeasons: "Compared against RPGRoll-Seasons' effective season (if installed).",

    legendaryTitle: "Legendary fish",
    legendaryBody:
      "{flag} enables up to 3 extra conditions, evaluated {besides} the normal ones: {reqLevel} (through RPGRollAPI; if it is not installed, a minimum level > 0 makes the species impossible), {fullMoon} (a moon phase of its own computed as {formula}, not a “real” Minecraft full moon), and {reqBait} (requires that exact bait, not just a tag). The Leviathan in the example content uses all three at once.",
    legendaryBesides: "on top of",

    rodsTitle: "Rods and baits",
    rodsTipTitle: "One rod unifies Rod/Reel/Line/Hook from the original design",
    rodsTipBody:
      "All four are, in practice, multipliers on the same catch roll — {rod} merges them into a single content type (the same criterion as {catalyst} in Magic). What would distinguish them (model, lore, name) stays free per rod.",
    thRodField: "Rod field",
    thEffect: "Effect",
    rReelSpeed: "Shrinks the RPG minigame's tension zone (harder) or widens it if >1 (easier).",
    rPrecision: "A direct bonus to the catch's quality roll.",
    rResistance: "Raises the number of misses allowed before the fish escapes.",
    rLuck: "Multiplies the roll weight of non-COMMON species.",
    rPreferred: "+50% extra weight for species in those categories.",
    rCastPower: "Cosmetic for now — reserved for a future real distance mechanic.",
    baitBody:
      "A bait is held in the off hand and 1 is consumed per cast (even if nothing bites). {quality} adds directly to the quality roll; {legWeight} is the original design's “Legendary Bait” — it only matters against {legendary} species.",

    treasureTitle: "Treasure and junk",
    treasureBody:
      "Before rolling a species, every bite rolls against {chances} (global config) — if treasure or junk comes up, eligible species are not even evaluated. Both currently hand out a pure vanilla {stack} (material + amount); referencing a custom RPGRoll-Items item is left for a future integration.",

    regionsTitle: "Fishing regions",
    regionsBody:
      "A {region} is a simple box (AABB, no WorldGuard — the same style as {seasonRegion}) that forces a {waterType}. It is the only way to get {magic} or {corrupted}, since no vanilla biome implies them.",

    miniTitle: "Struggle minigame (RPG mode)",
    miniBody:
      "With {rpgMode} (global config), every bite opens a tension bar: an indicator oscillates on a sine wave and the player has to strike with {strong} — deliberately not right click, because with a rod in hand that button already reels the line in vanilla. The species' {behavior} decides oscillation speed and zone width; {jumper} re-centres the zone every 40 ticks to simulate an erratic fish. With {rpgModeOff} the catch resolves instantly, with no minigame (classic vanilla mode).",
    miniStrong: "left click (arm swing)",

    yamlTitle: "YAML file examples",
    refTitle: "Full reference: every field in a single file",
    refBody:
      "{file} (shipped in the jar) adds {fields} — the three fields neither example above shows, along with all the rest.",

    bSpecies: "Visual builder: fish species",
    bSpeciesDesc:
      "Identity, classification and basic catch conditions. List fields are comma-separated; leave them empty for 'no restriction'.",
    bRod: "Visual builder: fishing rod",
    fId: "Id",
    fDisplayName: "Display name",
    fIcon: "Icon (Material)",
    fCmd: "CustomModelData",
    fDescription: "Description",
    fCategory: "Category",
    fRarity: "Rarity",
    fWaterTypes: "Water types (empty = any)",
    fBiomes: "Biomes (empty = any)",
    fMinWeight: "Min. weight (kg)",
    fMaxWeight: "Max. weight (kg)",
    fMinLength: "Min. length (cm)",
    fMaxLength: "Max. length (cm)",
    fBasePrice: "Base price",
    fBaseXp: "Base experience",
    fBehavior: "Behaviour (minigame difficulty)",
    fBaitTags: "Attracting bait tags (weight bonus)",
    fCatchEffect: "RPGRoll-FX effect on catch",
    fCatchStatus: "Status effect (RPGRoll-Effects) on catch",
    fMaterial: "Material",
    fDurability: "Durability",
    fCastPower: "Cast power (cosmetic)",
    fReelSpeed: "Reel speed (zone width)",
    fPrecision: "Precision (quality bonus)",
    fResistance: "Resistance (misses allowed)",
    fLuck: "Luck (weight of rare+ species)",
    fPreferred: "Preferred categories",

    guiTitle: "GUI: Fishing Studio",
    guiBody:
      "{browser} opens a hub linking to 6 browsers — Species, Rods, Baits, Treasure, Junk and Regions. {enc} opens the player's personal encyclopedia: which species they know and their best catch (weight/length/quality) of each.",

    apiTitle: "Addon API — FishingAPI",
    apiTipTitle: "hasCaught/getCaughtCount know nothing about quests or recipes",
    apiTipBody:
      "They are generic shortcuts over the player's encyclopedia — a future RPGRoll-Quests would define its own catch objective and call these methods; Fishing does not need to know that “that” is a quest.",

    cmdTitle: "Commands",
    thCommand: "Command",
    thWhat: "What it does",
    cBrowser: "Opens the Fishing Studio.",
    cReload: "Reloads every definition from disk.",
    cGiveRod: "Gives a rod to the player.",
    cGiveBait: "Gives bait to the player.",
    cEncyclopedia: "Opens the personal catch encyclopedia.",
    cStats: "Summary: fish caught, species discovered, treasure and junk.",
    permNote: "{admin} requires {p1} (default: op); {use} requires {p2} (default: true).",
  },
};

const pt: AddonsDCopy = {
  extras: {
    title: "Extras (RPGRoll-Extras)",
    intro:
      "Motor genérico de necessidades e estados de sobrevivência: sede, stamina, fadiga, oxigênio, estresse, temperatura corporal e qualquer condition customizada (sangramento, envenenado, congelamento...) — um administrador pode inventar um need ou um estado novo inteiramente por YAML, sem tocar em Java.",

    reqTitle: "Requisitos",
    reqBody1: "Só {depend} é obrigatório (raça/classe/jobs via {pm} real).",
    reqBody2:
      "habilita placeholders se estiver instalado; sem ele, os stats continuam funcionando mas não há como exibi-los em tablist/scoreboard sem o HUD próprio. RPGRoll-Seasons/PlaceholderAPI/Vault não são referenciados por nenhum código deste addon nesta passada — ficam como softdepend reservado, não integração real.",

    statsTitle: "Motor genérico de Stats",
    statsBody:
      "Um único {engine} atende sede, stamina, fadiga, oxigênio, estresse ou qualquer need customizado — o comportamento completo (decay/regeneração/consumo/limiares) vem do YAML, não de código específico por stat. Decay e regeneração rodam em tarefas agendadas no intervalo que cada stat declara (não um tick global compartilhado); ajustes pontuais (consumo por ação, chamadas de outro addon) são sempre por evento.",
    thField: "Campo",
    thWhat: "O que faz",
    fDecay: "{obj} — cai passivamente a cada {interval} ticks.",
    fRegen: "Lista de regras {obj} — somam-se todas as que combinarem (condição vazia = sempre).",
    fConsumption: "Mapa ação→quantidade ({actions}/qualquer ação customizada reportada por outro addon).",
    fThresholds: "Lista de {obj} avaliada contra o valor atual a cada 20 ticks.",
    thresholdBody:
      "Dentro de um threshold: {potions} é reaplicado enquanto a condição se mantiver verdadeira (como um potion effect vanilla renovado a cada checagem); {actions} executa UMA só vez, ao cruzar para aquele limiar; {applyConditions} são ids de {def} aplicados enquanto o limiar se mantém e removidos ao sair — assim um stat em 0 (ex. sede) pode disparar dano periódico reutilizando o motor de Conditions em vez de reinventá-lo.",

    bStat: "Construtor visual: stat",
    bStatDesc:
      "Identidade e limites de um stat. decay/regeneration/consumption/thresholds são aninhados demais para este formulário — copie e adapte o exemplo acima para esses blocos.",
    sfId: "Id",
    sfEnabled: "Habilitado",
    sfMax: "Máximo",
    sfStart: "Valor inicial",

    afkTitle: "Jogadores AFK",
    afkBody:
      "Depois de {idle} segundos sem tocar em nada — mover-se, girar a câmera, conversar, bater — os stats do jogador congelam: a sede não cai, a fadiga não sobe e também não regeneram, até ele voltar a fazer algo. Os limites já alcançados continuam aplicando os seus efeitos. Desativa-se com {pause}; depois de mudar, {reload}.",
    activityTitle: "Activity State Resolver",
    activityBody:
      "As regras de {regen} podem condicionar por atividade do jogador: {states}. O resolver NÃO verifica isso por tick — apoia-se em timestamps de eventos reais (último movimento, último dano recebido ou causado) para classificar barato a cada avaliação. Também aceita condições ambientais com prefixo: {prefixes}, e a palavra-chave especial {underwater} (jogador submerso em líquido).",

    menuTitle:
      "Menu do servidor (bússola)",
    menuBody:
      "Um item — uma bússola por padrão — que abre o menu do servidor com qualquer clique: no ar, num bloco ou numa entidade, ou sobre ele no inventário. Configura-se em {section} do {config} e vem desligado ({enabled}). Com {locked} não dá para jogar fora, guardar em baús nem trocar de mão; com {keep} não cai ao morrer e volta ao renascer; com {join} é entregue ao entrar no seu espaço da barra.",
    menuFilesBody:
      "Os menus são YAML em {dir}, com o mesmo formato dos do RPGRoll-NPCs: o motor vive no RPGRoll-Lib, então o Extras não depende do NPCs. {main} abre o principal, {item} devolve a bússola e {any} abre qualquer menu pelo id (só com {perm}, porque um menu pode rodar comandos de console). Botões de um módulo que você não tem instalado dão \"comando desconhecido\": apague-os ou troque-os.",

    consumeTitle: "Consumption hooks",
    consumeBody:
      "Sprint (ao começar a correr, não contínuo), pulo, ataque e mineração são detectados automaticamente via eventos vanilla. Pesca, farming e habilidades de outros addons NÃO são detectados aqui de propósito — cabe a cada addon reportar a sua própria ação chamando {call} (ou o nome de ação que couber), a mesma superfície pública que o hook interno de mineração usa.",

    condTitle: "Conditions: estados customizados",
    condBody1:
      "Uma {def} (sangramento, envenenado, congelamento, ou qualquer estado customizado) é dano periódico + potion effects + ações on-apply/on-tick/on-expire, com duração fixa ou indefinida ({duration}, removida só por API/comando ou por outro sistema como um threshold de stat). Deliberadamente NÃO reutiliza o",
    condBody2:
      "— mantém-se como um motor de estados simples e standalone em vez de se acoplar ao sistema de efeitos completo (stacking, imunidades, componentes de aura...), que resolve um problema maior do que o Extras precisa.",
    bCondition: "Construtor visual: condition",
    bConditionDesc:
      "Duração, dano e potion effects de um estado. on-apply/on-tick/on-expire (ações) são aninhados demais para este formulário — copie e adapte o exemplo acima.",
    cfDuration: "Duração em ticks (-1 = indefinida)",
    cfDamage: "Dano periódico",
    cfInterval: "Intervalo em ticks",
    cfEffects: "Potion effects (TYPE ou TYPE:AMPLIFICADOR)",

    tempTitle: "Temperatura: ambiental e corporal",
    tempBody:
      "{calc} parte de {vanilla} vanilla (cobre qualquer bioma sem manter uma tabela própria) e soma modificadores por hora do dia, clima, altitude, dimensão (Nether +25°C, End -10°C) e blocos próximos (lava/fogo aquecem, gelo/neve esfriam, raio de 3 blocos). {engine} converge gradualmente para a ambiental conforme {rate} (fração da diferença que se fecha a cada atualização) e mapeia o resultado para um estado nomeado (hipotermia severa → hipotermia → frio → normal → superaquecimento → hipertermia), cada um com os seus próprios potion effects opcionais.",

    thermalTitle: "Proteção térmica de itens",
    thermalBody1:
      "{service} soma a proteção das 4 peças de armadura equipadas. Se um item trouxer {keys} no custom-data genérico do",
    thermalBody2:
      "isso é usado; se não, cai para uma tabela de materiais vanilla razoável (couro agasalha, netherite protege dos dois extremos, etc.). A leitura do custom-data reconstrói manualmente a {nsKey} — zero dependência de compilação com o módulo Items.",

    modTitle: "Modificadores a partir de raça/classe/job",
    modBody:
      "Um {set} (id + tipo RACE/CLASS/JOB + mapa de valores) contribui bônus aos sistemas do Extras sem que o RPGRoll-Core saiba que este addon existe: {resolver} lê a raça/classe/jobs ATIVOS do jogador via a API pública do Core e procura aqui um set com esse mesmo id. As chaves {keys} são multiplicadores — {strong}, então um valor de {v1} dá 130% e um valor de {v2} dá 80%. Qualquer outra chave é um bônus aditivo simples, a ser interpretado por quem a ler (hoje, nenhum sistema além de stats consome chaves arbitrárias).",
    modStrong: "o motor calcula {formula}",
    bModifier: "Construtor visual: modifier",
    bModifierDesc:
      "Id e tipo de origem. As chaves de 'values' (ex. stamina_max, thirst_rate) são livres — copie e adapte o exemplo acima.",
    mfId: "Id (deve coincidir com o id no RPGRoll-Core)",
    mfType: "Tipo",

    reusableTitle: "Condições/expressões reutilizáveis",
    reusableBody:
      "O mesmo {evaluator} que resolve {regen} é usado em qualquer lugar do addon que precise avaliar uma condição de texto: palavras-chave de atividade sem prefixo, ou {prefixes} com prefixo. Os limiares numéricos de {thresholds} ({examples}) usam um avaliador à parte ({numeric}), específico para comparar contra o valor atual do stat.",

    actionsTitle: "Sistema de Actions",
    thType: "Tipo",
    aMessage: "Envia uma mensagem ao jogador (cores {amp} traduzidas).",
    aSound: "{fmt} reproduzido na localização do jogador.",
    aParticle: "{fmt} spawnado na localização do jogador.",
    aDamage: "Dano direto ({api}) — usado internamente por conditions e thresholds.",
    aCommand: "Executa um comando de console com {var} substituído.",

    hudTitle: "HUD configurável",
    hudBody1:
      "Uma actionbar opcional (desabilitada por padrão) que renderiza uma ou mais linhas com formato livre, incluindo uma barra de progresso ASCII ({bar}) com caracteres cheio/vazio configuráveis. Pensada como fallback simples para servidores sem o",
    hudBody2:
      "instalado — com o TAB, mostrar os mesmos valores em tablist/scoreboard via placeholders costuma ser preferível.",

    tabTitle: "Integração com o RPGRoll-TAB",
    tabBody:
      "Se o RPGRoll-TAB estiver instalado, o Extras registra um placeholder {p1} e {p2} por cada stat carregado, mais {p3}, {p4} e {p5} (lista separada por vírgulas das conditions ativas). O registro vive isolado em {bridge} — a JVM nunca resolve classes do TAB se o plugin não estiver presente.",

    apiTitle: "API para addons — ExtrasAPI",
    cmdTitle: "Comandos",
    thCommand: "Comando",
    cReload: "Recarrega stats/conditions/modifiers do disco.",
    cList: "Lista todos os stats e conditions carregados.",
    cGet: "Mostra o valor atual de um stat.",
    cSet: "Fixa o valor de um stat (limitado a [0, máximo efetivo]).",
    cAdd: "Soma/subtrai uma quantidade do valor atual.",
    cApply: "Aplica uma condition.",
    cRemove: "Remove uma condition ativa.",
    cMenu: "Abre o menu do servidor, sem precisar da bússola.",
    cMenuItem: "Devolve a bússola se você a perdeu (com o menu ativado).",
    cMenuAny: "Abre qualquer menu de menus/ pelo id.",
    permNote:
      "/extrasadmin exige {perm} (default: op). /menu e /menu item exigem {menu} (default: true); /menu <id>, {any} (default: op). Os stats são consultados via placeholders (com TAB) ou o HUD.",
  },

  fishing: {
    title: "Fishing (RPGRoll-Fishing)",
    intro:
      "Pesca como profissão completa — espécies configuráveis com dezenas de condições de captura, varas e iscas que modificam a rolagem, um minijogo de luta opcional, tesouros e lixo, peixes lendários com requisitos extremos, e uma enciclopédia de capturas por jogador.",
    vanillaTitle: "Não reimplementa o lançamento/espera/mordida da pesca",
    vanillaBody:
      "O RPGRoll-Fishing se apoia inteiramente no {event} do Bukkit — o Minecraft decide quando e onde o anzol morde (vanilla), e este addon só intercepta o estado {state} para substituir o que ia soltar pela sua própria rolagem ponderada. Isso simplifica muito o addon, mas traz uma consequência real: {strong}, porque o vanilla nunca gera uma mordida com o anzol flutuando em lava.",
    vanillaStrong: "uma espécie com {lava} seria impossível de pescar",

    reqTitle: "Requisitos",
    reqBody1: "Sem o",
    reqBody2:
      ", o campo {seasons} de uma espécie simplesmente não filtra nada (sempre elegível por estação) e o clima usa uma tabela de temperatura aproximada própria em vez da do Seasons. Sem RPGRoll-FX/RPGRoll-Effects, {effects} não fazem nada — o resto da captura funciona igual. Sem o",
    reqBody3:
      ", {cmd} é salvo na espécie do mesmo jeito mas nenhuma textura é sincronizada — o item aparece com o {icon} vanilla normal, sem erros nem avisos.",

    speciesTitle: "Espécies de peixes",
    speciesBody:
      "Uma {species} combina identidade (nome, ícone, {cmd}), classificação (categoria/raridade), condições de captura e faixa de peso/comprimento/preço/experiência. {strong} — um {waterTypes} vazio permite qualquer água, não nenhuma.",
    speciesStrong: "Todo campo de lista vazio significa “sem restrição”",
    texTitle: "Texturas customizadas: a pasta resourcepack/ se sincroniza sozinha",
    texBody:
      "{cmd} só define o número — o material/textura reais vêm de um resource pack. Deixe o modelo/textura em {path} e, se o SackResourcePack estiver instalado, sincroniza sozinho ao iniciar o plugin (mesmo mecanismo que o RPGRoll-Items já usa). Sem esse resource pack montado, o peixe aparece com o seu {icon} vanilla normal.",
    thCondition: "Condição",
    thHow: "Como se resolve",
    cWater: "Bioma/bloco do anzol → RIVER/LAKE/SWAMP/OCEAN/DEEP_OCEAN, ou forçado por uma {region} para MAGIC_WATER/CORRUPTED_WATER.",
    cBiomes: "Nome de bioma vanilla em minúsculas (ex. {ex}).",
    cDepths: "Varredura simples da coluna de água: SURFACE/MID_WATER/BOTTOM, ou UNDERWATER_CAVE se houver teto sólido acima da superfície.",
    cWeather: "SUNNY/RAIN/SNOW (conforme a temperatura)/STORM, lido de {api}.",
    cTimes: "DAY/NIGHT/DAWN/DUSK/NOON/MIDNIGHT — vários podem estar ativos ao mesmo tempo, conforme {api}.",
    cSeasons: "Compara contra a estação efetiva do RPGRoll-Seasons (se estiver instalado).",

    legendaryTitle: "Peixes lendários",
    legendaryBody:
      "{flag} ativa até 3 condições extras, avaliadas {besides} das normais: {reqLevel} (via RPGRollAPI; se não estiver instalado, um nível mínimo > 0 torna a espécie impossível), {fullMoon} (uma fase lunar própria calculada como {formula}, não uma lua cheia “real” do Minecraft), e {reqBait} (exige aquela isca exata, não só uma tag). O Leviatã do conteúdo de exemplo usa as três ao mesmo tempo.",
    legendaryBesides: "além",

    rodsTitle: "Varas e iscas",
    rodsTipTitle: "Uma vara unifica Vara/Molinete/Linha/Anzol do design original",
    rodsTipBody:
      "Os quatro são, na prática, multiplicadores sobre a mesma rolagem de captura — {rod} os junta num único tipo de conteúdo (mesmo critério que {catalyst} no Magic). O que os diferenciaria (modelo, lore, nome) continua livre por vara.",
    thRodField: "Campo da vara",
    thEffect: "Efeito",
    rReelSpeed: "Diminui a zona de tensão do minijogo RPG (mais difícil) ou a aumenta se for >1 (mais fácil).",
    rPrecision: "Bônus direto à rolagem de qualidade da captura.",
    rResistance: "Aumenta as falhas permitidas antes de o peixe escapar.",
    rLuck: "Multiplica o peso de rolagem de espécies não-COMMON.",
    rPreferred: "+50% de peso extra a espécies dessas categorias.",
    rCastPower: "Cosmético por enquanto — reservado para uma futura mecânica de distância real.",
    baitBody:
      "Uma isca é segurada na mão secundária e 1 é consumida por lançamento (mesmo que nada morda). {quality} soma direto à rolagem de qualidade; {legWeight} é a “Isca Lendária” do design original — só importa contra espécies {legendary}.",

    treasureTitle: "Tesouros e lixo",
    treasureBody:
      "Antes de sortear uma espécie, cada mordida rola contra {chances} (config global) — se sair tesouro ou lixo, as espécies elegíveis nem são avaliadas. Ambos entregam hoje um {stack} vanilla puro (material + quantidade); referenciar um item customizado do RPGRoll-Items fica para uma integração futura.",

    regionsTitle: "Regiões de pesca",
    regionsBody:
      "Uma {region} é uma caixa simples (AABB, sem WorldGuard — mesmo estilo que {seasonRegion}) que força um {waterType}. É a única forma de conseguir {magic} ou {corrupted}, já que nenhum bioma vanilla as implica.",

    miniTitle: "Minijogo de luta (modo RPG)",
    miniBody:
      "Com {rpgMode} (config global), cada mordida abre uma barra de tensão: um indicador oscila numa onda senoidal e o jogador tem de golpear com {strong} — de propósito, não clique direito, porque com uma vara na mão esse botão já recolhe a linha no vanilla. O {behavior} da espécie decide a velocidade de oscilação e a largura da zona; {jumper} recentraliza a zona a cada 40 ticks para simular um peixe errático. Com {rpgModeOff} a captura se resolve na hora, sem minijogo (modo vanilla clássico).",
    miniStrong: "clique esquerdo (swing de braço)",

    yamlTitle: "Exemplos de arquivo YAML",
    refTitle: "Referência completa: todos os campos num só arquivo",
    refBody:
      "{file} (incluído no jar) adiciona {fields} — os três campos que nenhum dos dois exemplos acima mostra, junto com todos os demais.",

    bSpecies: "Construtor visual: espécie de peixe",
    bSpeciesDesc:
      "Identidade, classificação e condições básicas de captura. Campos de lista vão separados por vírgulas; deixe-os vazios para 'sem restrição'.",
    bRod: "Construtor visual: vara de pesca",
    fId: "Id",
    fDisplayName: "Nome visível",
    fIcon: "Ícone (Material)",
    fCmd: "CustomModelData",
    fDescription: "Descrição",
    fCategory: "Categoria",
    fRarity: "Raridade",
    fWaterTypes: "Tipos de água (vazio = qualquer)",
    fBiomes: "Biomas (vazio = qualquer)",
    fMinWeight: "Peso mín. (kg)",
    fMaxWeight: "Peso máx. (kg)",
    fMinLength: "Comprimento mín. (cm)",
    fMaxLength: "Comprimento máx. (cm)",
    fBasePrice: "Preço base",
    fBaseXp: "Experiência base",
    fBehavior: "Comportamento (dificuldade do minijogo)",
    fBaitTags: "Tags de isca que atraem (bônus de peso)",
    fCatchEffect: "Efeito RPGRoll-FX ao capturar",
    fCatchStatus: "Efeito de estado (RPGRoll-Effects) ao capturar",
    fMaterial: "Material",
    fDurability: "Durabilidade",
    fCastPower: "Poder de lançamento (cosmético)",
    fReelSpeed: "Velocidade de recolhimento (largura da zona)",
    fPrecision: "Precisão (bônus à qualidade)",
    fResistance: "Resistência (falhas permitidas)",
    fLuck: "Sorte (peso de espécies raras+)",
    fPreferred: "Categorias preferidas",

    guiTitle: "GUI: Fishing Studio",
    guiBody:
      "{browser} abre um hub que liga a 6 navegadores — Espécies, Varas, Iscas, Tesouros, Lixo e Regiões. {enc} abre a enciclopédia pessoal do jogador: quais espécies ele conhece e a sua melhor captura (peso/comprimento/qualidade) de cada uma.",

    apiTitle: "API para addons — FishingAPI",
    apiTipTitle: "hasCaught/getCaughtCount não sabem nada de missões nem receitas",
    apiTipBody:
      "São atalhos genéricos sobre a enciclopédia do jogador — um futuro RPGRoll-Quests definiria o seu próprio objetivo de captura e chamaria estes métodos; o Fishing não precisa saber que “aquilo” é uma missão.",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    thWhat: "O que faz",
    cBrowser: "Abre o Fishing Studio.",
    cReload: "Recarrega todas as definições do disco.",
    cGiveRod: "Entrega uma vara ao jogador.",
    cGiveBait: "Entrega isca ao jogador.",
    cEncyclopedia: "Abre a enciclopédia de capturas pessoal.",
    cStats: "Resumo: peixes capturados, espécies descobertas, tesouros e lixo.",
    permNote: "{admin} exige {p1} (default: op); {use} exige {p2} (default: true).",
  },
};

export const ADDONS_D_COPY: Record<Locale, AddonsDCopy> = { es, en, pt };
