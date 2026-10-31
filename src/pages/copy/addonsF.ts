import type { Locale } from "../../i18n";

/** Texto de los addons, sexta tanda: Traps y Workers. */

const es = {
  traps: {
    title: "Traps & Defenses (RPGRoll-Traps)",
    intro:
      "Motor genérico de trampas/mecanismos configurable por YAML: bloques reforzados con llave, minas, pinchos, explosiones custom, puertas secretas/paredes falsas, runas mágicas, teletransporte, cadenas de mecanismos e integración con redstone — con un state machine propio (IDLE→ARMED→TRIGGERED→COOLDOWN→DEPLETED) para que cada instancia colocada en el mundo se comporte de forma consistente y persistente entre reinicios.",

    reqTitle: "Requisitos",
    reqBody:
      "RPGRoll-Items es opcional: si está instalado, {reqItem} reconoce ítems custom por id (vía {iis}); si no, cae a un {material} vanilla directo en la mano. RPGRoll-Effects también es opcional: sin él, la acción {effect} simplemente no hace nada (con un warning en consola) en vez de crashear. SackResourcePack también es opcional: si está instalado, los modelos de fábrica de torretas, munición y trampas se registran en el pack (aplica con {srp}); sin él cada ítem se ve con su material vanilla.",

    modelTitle: "Definición vs. instancia colocada",
    modelBody:
      "Igual que en Crates o Dungeons: un {def} (YAML en {dir}) es un {type} de trampa reusable (comportamiento), y un {placed} es una {instance} física en el mundo (persistida en {locations}, recreada al reiniciar). Varias instancias pueden compartir la misma definición.",
    typeWord: "tipo",
    instanceWord: "instancia",

    noPlayerTitle: "Sin comando de jugador",
    noPlayerBody:
      "Todo el addon es admin-configurado vía {trapadmin} — no hay un comando {trap} de jugador en esta versión. Los jugadores solo interactúan con las trampas ya puestas en el mundo.",

    triggersTitle: "Triggers",
    triggersBody:
      "Los primeros ocho son dirigidos por evento vanilla (un listener los detecta al instante). {proximity}, {los} y {timer} no tienen evento equivalente, así que el motor los re-evalúa en un tick periódico propio ({tick}, 20 por defecto). {command} y {customEvent} nunca se disparan solos — solo vía {force} o la acción {triggerTrap} de otra trampa.",
    thTrigger: "Trigger",
    thDetects: "Qué detecta",
    tPressure: "Un jugador pisa el bloque exacto de la trampa.",
    tMovement: "Un jugador se mueve dentro del radio configurado (sin exigir que esté parado encima).",
    tProximity: "Hay un jugador dentro del radio — re-evaluado en el tick periódico.",
    tLos: "Un jugador tiene visión directa hacia la trampa — también por tick.",
    tInteraction: "Click derecho sobre el bloque (la base de puertas secretas con llave).",
    tBlock: "Alguien rompe o coloca el bloque de la trampa.",
    tProjectile: "Un proyectil impacta el bloque ({ev}).",
    tEntity: "Cualquier {le} no-jugador entra en la zona (mobs, animales).",
    tRedstone: "El bloque recibe señal de redstone (flanco de subida).",
    tTimer: "Se dispara sola cada tanto, sin necesitar un jugador cerca.",
    tCommand: "Solo por API/comando — nunca automático.",

    actionsTitle: "Acciones",
    actionsBody:
      "Cada trampa tiene una lista de {actions} (se ejecutan todas, en orden, cuando el motor decide disparar). Formato YAML: {fmt}.",
    thAction: "Acción",
    thWhat: "Qué hace",
    aMessage: "Mensaje al jugador que disparó (soporta {ph} y color/formato {amp}).",
    aSound: "Sonido o partícula vanilla en la ubicación de la trampa.",
    aDamage: "Daño directo al objetivo — jugador {orMob} (torretas apuntando a hostiles).",
    orMob: "o mob",
    aHeal: "Restaura vida al objetivo ({amount}) — la base de una torreta “de sanación” apuntada solo a jugadores.",
    aExplosion:
      "Explosión custom ({params}) — no usa TNT real, así que puedes dañar sin romper estructuras.",
    aFire: "Prende fuego al jugador por N ticks.",
    aTeleport:
      "Teletransporta al jugador a coordenadas fijas (o a su mundo actual si no especificas {world}).",
    aEffect:
      "Aplica un efecto de estado de RPGRoll-Effects por id (veneno, sangrado, quemadura...) al objetivo — jugador {orMob}. No hace nada si el addon no está instalado.",
    aProjectile:
      "Ráfaga fija de N flechas hacia el jugador que disparó ({params}) — pensada para trampas (“le llueven flechas al pisar la placa”).",
    aCustomProjectile:
      "Un solo disparo instantáneo hacia el objetivo — {ptype} elige entre {types} (una poción arrojadiza real: no hace daño de impacto, solo aplica los efectos de {effects} — formato {fmt}, ej. {ex}). Es la acción por defecto de una torreta.",
    aSonicBoom:
      "Aproximación del ataque a distancia del Warden: daño instantáneo ({damage}) + partícula/sonido interpolados entre el origen y el objetivo. No reimplementa el hitbox-piercing real del Warden (vive en código de servidor no expuesto por la API pública).",
    aCommand:
      "Ejecuta un comando por consola o como el jugador (necesario para comandos propios de RPGRoll que exigen un jugador real).",
    aTriggerTrap:
      "Fuerza el disparo de otra instancia colocada por su {placementId} — la base de las cadenas de mecanismos. Sin efecto si se usa desde una torreta (no hay cadena de trampas que forzar).",
    aRedstonePulse:
      "Coloca un {rb} temporal en una posición relativa y lo revierte tras N ticks (Trap → Redstone).",
    aToggleBlocks:
      "Alterna una lista de bloques reales entre material “cerrado”/“abierto” — la base de puertas secretas y paredes falsas, con animación {instant} o {slide} (progresiva, bloque por bloque).",

    sameActionsTitle: "Las mismas acciones sirven para trampas Y torretas",
    sameActionsBody:
      "Torretas y trampas ejecutan acciones a través del mismo {registry} — cualquier acción nueva que se agregue queda disponible para ambas sin cableado aparte. Una trampa custom puede usar {cp} en su propia lista de {actions} igual que una torreta las usa como su {impact}.",

    noCamoTitle: "Sin camuflaje por-jugador",
    noCamoBody:
      "El “camuflaje” de este addon es {swap} ({toggle}), visible igual para todos los jugadores — no hay un sistema de bloques falsos por-paquete (requeriría ProtocolLib + block-change packets, sin precedente en el repo). Igual sirve para la mayoría de los casos: una pared falsa se ve como pared normal hasta que se activa el mecanismo.",
    blockSwap: "swap de bloque real",

    condTitle: "Condiciones",
    condBody:
      "Mismo mini-lenguaje que {evaluator} (Mobs) y otros evaluadores del ecosistema: {syntax}, con {ops}. Si la trampa se dispara sin un jugador en contexto (ej. por TIMER/REDSTONE lejos de cualquiera), cualquier condición {playerStar} se evalúa como no cumplida.",
    thPath: "Ruta",
    thValue: "Valor",
    cLevel: "Nivel del jugador.",
    cHealth: "Vida actual — acepta {pct} (ej. {ex}) para comparar contra el máximo.",
    cSneaking: "{tf}.",
    cFood: "Nivel de hambre (0-20).",
    cWorld: "Nombre del mundo del jugador.",
    cWeather: "{vals}.",
    cNight: "{tf} según la hora del mundo.",
    condTip:
      "{registry} queda abierto para que código Java sume sus propias rutas (ej. otro addon registrando {guildRank}) — no hay una API pública todavía porque en v1 ningún otro addon depende de RPGRoll-Traps.",

    blocksTitle: "Bloques protegidos y llaves",
    blocksBody:
      "La sección opcional {block} de una definición convierte su bloque colocado en {protectedWord}: {breakable} cancela cualquier intento de romperlo, {reqItem} exige tener ese ítem en la mano (custom de RPGRoll-Items o Material vanilla) para poder romperlo, y {immune} lo excluyen de {events}/pistones por completo — sin este sistema, TNT/creepers/pistones tratarían el bloque como cualquier otro.",
    protectedWord: "protegido",

    chainsTitle: "Cadenas de mecanismos",
    chainsBody:
      "El campo {chain} de una definición dispara (vía {force}) otras instancias colocadas apenas esta se activa — pero cada trampa encadenada sigue respetando sus {own} condiciones, cooldown y cargas, no las salta. Lo mismo logra la acción {triggerTrap} dentro de {actions}, para encadenar desde un punto específico de la secuencia en vez de solo al final.",
    ownWord: "propias",

    statesTitle: "Estados (state machine)",
    statesBody: "Cada {placed} tiene su propio estado, persistido junto a su posición:",
    statesAfter:
      "Con {cooldown} vuelve a {armed} cuando expira (revisado en el tick periódico del motor); con {charges} agotadas cae en {depleted} y no vuelve a dispararse. {infinite} (default) es infinito.",

    turretsTitle: "Torretas",
    turretsBody:
      "Un subsistema paralelo a las trampas, en vez de una variante — una torreta no reacciona a un evento puntual como una {def}: reevalúa objetivo {continuously} en su propio tick ({tick}, 5 por defecto — más frecuente que el de trampas para que el apuntado se sienta fluido), apunta un cañón visual (un {display} real, sin animación por-paquete) hacia el objetivo más cercano dentro de su radio, y ejecuta su {impact} — la MISMA acción configurable que usan las trampas (ver la tabla de Acciones más arriba) — mientras haya alguien en rango.",
    continuouslyWord: "continuamente",
    thField: "Campo",
    thControls: "Qué controla",
    uRadius: "Radio de detección en bloques.",
    uTarget:
      "Si apunta a jugadores (en SURVIVAL/ADVENTURE) y/o a mobs hostiles ({monster} vanilla o cualquier mob custom de RPGRoll-Mobs, si está instalado).",
    uConditions:
      "Mismo evaluador que las trampas — solo se aplican a objetivos jugador (un mob no tiene {playerStar}).",
    uFireInterval: "Cada cuántos ticks vuelve a ejecutar {impact} mientras haya objetivo.",
    uImpact:
      "La acción que dispara contra el objetivo — {fmt}, igual formato que una entrada de {actions} de trampa. Default: {default} con {ptype}.",
    uModel: "Apariencia del cañón (el {display}).",
    impactBody:
      "Cambiar el comportamiento de disparo de una torreta es solo cambiar su {impact}, sin tocar nada más de la definición — 3 ejemplos incluidos que lo muestran:",
    thFile: "Archivo",
    tSentry: "Flecha simple ({cp} + {ptype}) contra jugadores y mobs hostiles.",
    tWarden: "Sonic boom instantáneo ({sb}) en vez de un proyectil que viaja.",
    tHealing: "Cura en vez de dañar ({heal}) — {flag}, apuntada solo a jugadores.",
    tAlchemist:
      "Pociones arrojadizas reales ({cp} + {ptype}) que no dañan al impactar, solo ralentizan y debilitan.",
    aimTitle: "Estado de apuntado no persistido",
    aimBody:
      "El objetivo actual y el cooldown de disparo de una torreta viven en memoria (no en {yml}) — al reiniciar el server simplemente vuelve a adquirir objetivo en el próximo tick. El {display} visual sí es una entidad real y persiste solo, como cualquier entidad del mundo.",
    turretCmds:
      "{cmds} siguen exactamente el mismo patrón que los comandos de trampa — ver la tabla de comandos más abajo.",

    examplesTitle: "Ejemplos de archivo YAML",
    examplesBody:
      "El addon incluye 5 trampas de ejemplo en {dir} (copiadas a disco al primer arranque): {landmine} (PRESSURE + EXPLOSION + EFFECT), {spike} (PROXIMITY + DAMAGE), {vault} (bloque protegido + llave + TOGGLE_BLOCKS), {arrow} (INTERACTION + PROJECTILE) y {gas} (TIMER + EFFECT).",

    cmdTitle: "Comandos — /trapadmin",
    cmdIntro: "Único comando de v1, todo bajo el permiso {perm}.",
    thCommand: "Comando",
    xCreate: "Crea una definición vacía (trigger PRESSURE por defecto) y la guarda.",
    xEdit: "Abre el editor GUI de esa definición.",
    xBrowser: "Navegador de todas las definiciones, con acceso directo a crear/editar.",
    xReload: "Recarga definiciones desde disco (las instancias colocadas no se pierden).",
    xPlace:
      "Coloca una instancia en el bloque que estás mirando — {zone} abre el editor de 2 esquinas para una trampa de área.",
    xRemove: "Elimina una instancia colocada.",
    xList: "Lista todas las instancias colocadas con su estado actual.",
    xInfo: "Detalle: estado, cargas restantes, posición.",
    xForce:
      "Fuerza el disparo saltando la detección de evento (sigue respetando condiciones/cooldown/cargas).",
    xTCreate: "Crea una definición de torreta vacía.",
    xTEdit: "Abre el editor GUI de esa torreta.",
    xTBrowser: "Navegador de todas las torretas.",
    xTPlace: "Coloca una instancia en el bloque que estás mirando.",
    xTRemove: "Elimina una instancia colocada (y su ItemDisplay visual).",
    xTList: "Lista todas las torretas colocadas.",

    bTitle: "Constructor visual: Trap (campos simples)",
    bDesc:
      "Trigger básico + metadata. actions/conditions/chain/block/disguise son demasiado anidados para este formulario — copia y adapta uno de los 5 ejemplos incluidos.",

    fId: "Id",
    fDisplayName: "Nombre visible",
    fDescription: "Descripción",
    fIcon: "Ícono (Material)",
    fTrigger: "Trigger",
    fType: "Tipo",
    fRadius: "Radio (bloques)",
    fCooldown: "Cooldown (ms)",
    fCharges: "Cargas (-1 = infinitas)",
    fragFile: "traps/reinforced_vault_door.yml (fragmento)",
  },

  workers: {
    title: "Workers (RPGRoll-Workers)",
    intro:
      "Trabajadores autónomos con profesión, habilidades, inventario, necesidades, personalidad, horario y una IA por reglas configurable — habitantes del mundo que trabajan incluso cuando ningún jugador los está mirando, no minions que generan recursos por arte de magia.",

    treeTitle: "El ‘árbol de comportamiento’ es una lista de reglas ordenadas, no nodos visuales",
    treeBody:
      "Un editor de nodos de verdad no es viable en una GUI de inventario de Bukkit. En su lugar, cada {profession} tiene una lista de {aiRule} (condición→acción→prioridad) — la primera regla cuya condición matchea gana. Si ninguna matchea, cae al horario de la profesión, y si tampoco tiene uno, a {work} por defecto.",

    reqTitle: "Requisitos",
    reqBody1:
      "De todos los addons que el diseño original nombraba como integración (Ranching/Fishing/Mining/Blacksmith/Housing/Magic/Quests/Guilds/Teams), solo",
    reqBody2:
      ", RPGRoll-Fishing, RPGRoll-Seasons, RPGRoll-Quests, RPGRoll-Guilds y RPGRoll-Magic existen en este proyecto — RPGRoll-Mining, RPGRoll-Blacksmith y “Housing” como addon separado no existen. Sin Vault + un plugin de economía real, los salarios simplemente no se cobran (el resto de la simulación sigue igual). Sin",
    reqBody3:
      ", el {reskin} de una profesión simplemente no aparece configurado (no rompe nada — el worker se ve con su {entityType} vanilla normal).",
    reskinLink: "reskin visual",

    reskinTitle: "Reskin visual por profesión (sin ModelEngine/BetterModel)",
    reskinBody:
      "Minecraft no tiene ningún equivalente a {cmd} para entidades vivas — no hay forma de re-texturizar un worker vanilla solo con un resource pack. RPGRoll-Workers usa el mismo mecanismo que RPGRoll-Ranching (y, con listas, RPGRoll-Mobs): la entidad vanilla real sigue siendo la que trabaja/camina (comportamiento intacto), pero se le monta una entidad {display} como pasajero real, portando un ítem con {cmdLower}.",
    reskinBody2:
      "Es un único reskin fijo por profesión (no una lista sorteada, a diferencia de Mobs). El material y el número de {cmd} los define un resource pack real — el mismo pipeline que ya usa RPGRoll-Items: pon el modelo/textura en {path} y, si SackResourcePack está instalado, se sincroniza solo al arrancar el plugin.",
    untestedTitle: "Solo verificado por compilación, no probado en juego",
    untestedBody:
      "Igual que en Mobs/Ranching, esta primera versión del reskin no fue probada visualmente contra un cliente real de Minecraft (sin servidor Paper disponible en el entorno de desarrollo).",

    aiTitle: "IA por reglas",
    thCondition: "Condición",
    thActivates: "Se activa cuando...",
    iNeeds: "Alguna necesidad cruza un umbral (hambre/energía/sueño bajos, o estrés alto).",
    iInvFull: "El inventario cargado del worker llega a su capacidad.",
    iWeather: "Clima/hora real del mundo ({api}).",
    iHappiness: "Felicidad por debajo de un umbral.",
    iAlways: "Siempre — pensada como regla de respaldo al final de la lista.",
    eatBody:
      "La acción {eat} es autosuficiente: si el worker tiene un hogar asignado y todavía no llegó, camina hacia él; al llegar (o si no tiene hogar), come. Una sola regla {rule} alcanza para todo el flujo “buscar comida → comer → volver al trabajo” del diseño original, sin necesitar un rastreador de estado de varios pasos.",

    needsTitle: "Necesidades y personalidad",
    needsBody:
      "Cada worker tiene 7 necesidades (0-100): hambre, energía, sueño, estrés (invertido — alto es malo), motivación, salud y felicidad. Decaen solas cada chequeo periódico salvo mientras el worker está durmiendo, que las restaura. Felicidad/motivación se arrastran hacia el promedio de las demás — ignorar las necesidades básicas las termina bajando solas, sin un chequeo aparte.",
    traitBody:
      "Cada worker tiene UN rasgo de personalidad dominante (no una combinación), que modula velocidad de trabajo, resistencia al estrés, y chance de error:",
    thTrait: "Rasgo",
    thEffect: "Efecto",
    pLazy: "x0.7 velocidad, menos estrés.",
    pFast: "x1.3 velocidad.",
    pResponsible: "x1.1-1.15 velocidad.",
    pClumsy: "x2.0 chance de error (desperdicia el intento de trabajo).",
    pSmart: "x0.5 chance de error.",
    pOther:
      "Resto de rasgos (SMART, SOCIAL, LONER, BRAVE, COWARD) — flavor sin modificador mecánico propio en esta pasada.",

    profTitle: "Profesiones y habilidades",
    profBody:
      "Una {profession} define identidad, qué entidad vanilla la representa, sus reglas de IA, su horario, su salario, y opcionalmente una herramienta requerida. El comportamiento físico real de “trabajar” NO vive en la profesión — lo resuelve un {behavior} registrado por id.",
    thProfession: "Profesión de ejemplo",
    thBehavior: "Comportamiento real",
    bMiner:
      "Busca la veta más cercana, evita bloques adyacentes a lava, rompe y carga el mineral (sin durabilidad de herramienta ni tiempo de rotura real).",
    bFarmer: "Cosecha el cultivo maduro más cercano y resetea su edad a 0 (replantado instantáneo).",
    bLumberjack:
      "Corta el tronco más cercano — no reforesta de verdad (plantar un árbol completo excede el alcance de esta pasada).",
    bRancher: "{real} — busca un animal de Ranching cercano y lo alimenta vía {api}.",
    realIntegration: "Integración real",
    bFisherman: "Busca agua cercana y saca un pez vanilla genérico — ver el aviso de abajo.",
    fishTitle: "El pescador NO usa FishingAPI de verdad",
    fishBody1:
      "{forceCatch} exige un {player} real (lo necesita para chequear el nivel de personaje en peces legendarios), y un worker no es un jugador. Simularlo con un jugador falso sería frágil y engañoso, así que {behavior} se queda con una captura vanilla simple en vez de la genética/calidad rica de",
    fishBody2:
      ". Una profesión sin ningún behavior registrado sigue “trabajando” a efectos de horario/salario/experiencia, solo que sin ninguna interacción física real (fallback silencioso, no un error).",

    invTitle: "Inventario y logística",
    invBody:
      "El inventario cargado de un worker es un mapa (material → cantidad), no un {inventory} real de 27 slots — no necesita preservar metadata de ítems individuales, solo saber cuánto lleva de qué. Un almacén no es contenido admin-creado como una especie o un gen: es un cofre/baúl real marcado en el mundo con el Designador de Almacén ({designator}). Todos los almacenes designados viven en un único {warehouses} — no tiene sentido “reusar” la ubicación de un cofre puntual como contenido reusable.",

    houseTitle: "Vivienda",
    houseBody:
      "Fijar el hogar de un worker es un botón en su ficha (“Fijar hogar en mi ubicación”), no una herramienta de marcar camas — simplemente guarda la ubicación del jugador que lo gestiona. Dormir ahí (o en cualquier lado, mientras la acción sea {sleep}) restaura energía/sueño en vez de decaerlos.",

    ecoTitle: "Economía: salarios, contratos y moral",
    ecoBody:
      "El worker en sí no tiene cuenta — “cobrar” es, en la práctica, un costo de mantenimiento que el empleador paga con su saldo real de Vault (vía {vault} de RPGRoll-Lib, sea cual sea el proveedor — no se inventó una economía propia). {hourly} se cobra en un tick periódico; {perTask} se cobra en el momento exacto de entregar en un almacén.",
    moralBody:
      "La moral general (promedio de las 7 necesidades) modula la velocidad de trabajo y, si está muy baja durante mucho tiempo, una chance periódica de que el worker renuncie a su contrato solo.",

    eventsTitle: "Eventos de worker",
    thType: "Tipo",
    thWhen: "Cuándo se sortea",
    eIllness:
      "Solo con moral baja — aplican un estado activo con duración y multiplicador de velocidad de trabajo (0% en huelga = no trabaja nada).",
    eVacation: "En cualquier momento, si está empleado.",
    ePromotion:
      "Solo con moral alta — a diferencia de los demás, aplica sus bonos al instante, sin un estado temporal.",

    yamlTitle: "Ejemplo de archivo YAML",
    refTitle: "Referencia completa: todos los campos en un solo archivo",
    refBody:
      "{file} (incluido en el jar) usa las 10 condiciones y las 9 acciones de IA — el ejemplo de arriba solo usa 4 de cada una.",

    bTitle: "Constructor visual: profesión",
    bDesc:
      "Identidad, horario y salario de una profesión. Las reglas de IA (ai-rules) son demasiado estructuradas para este formulario — copia y adapta el ejemplo de arriba para esas.",

    skinsTitle: "Skins de jugador",
    skinsBody:
      "Un worker puede llevar skin de jugador, como los NPCs. Como tiene que seguir siendo un mob para caminar (usa el pathfinder), el mob se vuelve invisible y callado y un maniquí con la skin lo sigue a cada tick: se coloca en su sitio, mira hacia donde mira él, lleva la herramienta de su profesión y la balancea al trabajar. Pegarle al maniquí es pegarle al worker, y el maniquí acusa los golpes. No se guarda con el mundo: se vuelve a crear al cargar el chunk, y al quitar la skin (o el plugin) el mob vuelve a verse.",
    skinSrcTitle: "De dónde sale la skin",
    skinSrcBody:
      "Un enlace de MineSkin ({link}), {id} o el uuid de una skin de MineSkin; o el nombre de un jugador de Minecraft, cuya skin se copia tal como la lleva hoy. Se guarda en {path} ({fields}).",

    guiTitle: "GUI: Worker Studio",
    guiBody:
      "{browser} abre un hub que enlaza a 4 navegadores (Profesiones, Habilidades, Horarios, Eventos) más el Explorador de Workers. La ficha de un worker muestra necesidades/habilidades/contrato en texto (mismo criterio de “sin preview visual real” que otros módulos de este proyecto) y expone Renombrar, Contratar, Despedir y Fijar hogar.",

    apiTitle: "API para addons — WorkersAPI",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    thWhat: "Qué hace",
    wBrowser: "Abre el Worker Studio.",
    wReload: "Recarga todas las definiciones desde disco.",
    wSpawn: "Spawnea un worker en tu ubicación.",
    wDesignator: "Te da el Designador de Almacén.",
    wSkin:
      "Pone al worker que miras la skin de un enlace o id de MineSkin, o la de un jugador; {remove} le devuelve el aspecto de su profesión. También desde su ficha (botón Skin, solo staff).",
    wInspect: "Abre la ficha del worker al que estás mirando.",
    wHire: "Contrata al worker al que estás mirando (salario por defecto de su profesión).",
    wFire: "Despide al worker al que estás mirando (si es tuyo, o de tu gremio).",
    wList: "Lista tus trabajadores contratados.",
    permNote:
      "{admin} requiere {p1} (default: op); {use} requiere {p2} (default: true). Con RPGRoll-Guilds instalado, cualquier miembro del mismo gremio que el empleador también puede despedir su worker — “los gremios pueden compartir trabajadores” del diseño original, resuelto como gestión compartida. Nadie más puede renombrar ni despedir un worker ajeno sin {p1b}, y mover su hogar requiere {p3} (default: op).",
    regionsBody:
      "Un worker trabaja alrededor de su hogar —el sitio donde se creó— y solo en chunks cargados. Antes de cambiar un bloque lanza el mismo evento que un aldeano al cosechar, así que WorldGuard puede impedirlo y CoreProtect lo registra; en el territorio protegido de un gremio solo trabajan los workers de sus miembros. El leñador solo tala troncos coronados por hojas naturales: la madera de una casa no la toca. GriefPrevention no frena a los mobs dentro de sus claims, por eso mover el hogar es de admin.",

    fId: "Id",
    fDisplayName: "Nombre visible",
    fIcon: "Ícono (Material)",
    fDescription: "Descripción",
    fEntityType: "EntityType vanilla",
    fSkills: "Habilidades",
    fSchedule: "Id de horario (vacío = ninguno)",
    fWage: "Salario",
    fWageType: "Tipo de pago",
    fTool: "Herramienta requerida (vacío = ninguna)",
    fReskin: "Reskin visual (opcional)",
    fMaterial: "Material base",
    fCmd: "Custom model data",
    fScale: "Escala del display",
    reskinFragFile: "professions/reference_full.yml (fragmento)",
    aiFragFile: "professions/miner.yml (fragmento ai-rules)",
  },
};

export type AddonsFCopy = typeof es;

const en: AddonsFCopy = {
  traps: {
    title: "Traps & Defenses (RPGRoll-Traps)",
    intro:
      "A generic YAML-configurable trap/mechanism engine: reinforced blocks with keys, mines, spikes, custom explosions, secret doors/fake walls, magic runes, teleports, mechanism chains and redstone integration — with a state machine of its own (IDLE→ARMED→TRIGGERED→COOLDOWN→DEPLETED) so every instance placed in the world behaves consistently and survives restarts.",

    reqTitle: "Requirements",
    reqBody:
      "RPGRoll-Items is optional: when installed, {reqItem} recognizes custom items by id (via {iis}); otherwise it falls back to a plain vanilla {material} held in hand. RPGRoll-Effects is optional too: without it the {effect} action simply does nothing (with a console warning) instead of crashing. SackResourcePack is also optional: when installed, the stock turret, ammo and trap models are registered into the pack (apply with {srp}); without it each item shows with its vanilla material.",

    modelTitle: "Definition vs. placed instance",
    modelBody:
      "Same as in Crates or Dungeons: a {def} (YAML in {dir}) is a reusable trap {type} (behavior), and a {placed} is a physical {instance} in the world (persisted in {locations}, recreated on restart). Several instances can share the same definition.",
    typeWord: "type",
    instanceWord: "instance",

    noPlayerTitle: "No player command",
    noPlayerBody:
      "The whole addon is admin-configured via {trapadmin} — there is no player-facing {trap} command in this version. Players only interact with traps already placed in the world.",

    triggersTitle: "Triggers",
    triggersBody:
      "The first eight are driven by vanilla events (a listener detects them instantly). {proximity}, {los} and {timer} have no equivalent event, so the engine re-evaluates them on a periodic tick of its own ({tick}, 20 by default). {command} and {customEvent} never fire on their own — only via {force} or another trap's {triggerTrap} action.",
    thTrigger: "Trigger",
    thDetects: "What it detects",
    tPressure: "A player steps on the trap's exact block.",
    tMovement: "A player moves inside the configured radius (without having to stand on top of it).",
    tProximity: "There is a player inside the radius — re-evaluated on the periodic tick.",
    tLos: "A player has direct line of sight to the trap — also per tick.",
    tInteraction: "Right click on the block (the basis of key-locked secret doors).",
    tBlock: "Someone breaks or places the trap's block.",
    tProjectile: "A projectile hits the block ({ev}).",
    tEntity: "Any non-player {le} enters the zone (mobs, animals).",
    tRedstone: "The block receives a redstone signal (rising edge).",
    tTimer: "It fires by itself every so often, with no player needed nearby.",
    tCommand: "Only via API/command — never automatic.",

    actionsTitle: "Actions",
    actionsBody:
      "Each trap has a list of {actions} (all of them run, in order, when the engine decides to fire). YAML format: {fmt}.",
    thAction: "Action",
    thWhat: "What it does",
    aMessage: "Message to the player who triggered it (supports {ph} and {amp} color/format).",
    aSound: "Vanilla sound or particle at the trap's location.",
    aDamage: "Direct damage to the target — player {orMob} (turrets aimed at hostiles).",
    orMob: "or mob",
    aHeal: "Restores the target's health ({amount}) — the basis of a “healing” turret aimed only at players.",
    aExplosion:
      "Custom explosion ({params}) — it does not use real TNT, so you can deal damage without breaking structures.",
    aFire: "Sets the player on fire for N ticks.",
    aTeleport:
      "Teleports the player to fixed coordinates (or to their current world if you do not specify {world}).",
    aEffect:
      "Applies an RPGRoll-Effects status effect by id (poison, bleed, burn...) to the target — player {orMob}. Does nothing if the addon is not installed.",
    aProjectile:
      "A fixed burst of N arrows toward the player who triggered it ({params}) — meant for traps (“arrows rain down when you step on the plate”).",
    aCustomProjectile:
      "A single instant shot at the target — {ptype} picks between {types} (a real thrown potion: no impact damage, it only applies the effects listed in {effects} — format {fmt}, e.g. {ex}). It is a turret's default action.",
    aSonicBoom:
      "An approximation of the Warden's ranged attack: instant damage ({damage}) + particle/sound interpolated between origin and target. It does not reimplement the Warden's real hitbox piercing (that lives in server code the public API does not expose).",
    aCommand:
      "Runs a command from the console or as the player (needed for RPGRoll's own commands, which demand a real player).",
    aTriggerTrap:
      "Forces another placed instance to fire by its {placementId} — the basis of mechanism chains. No effect when used from a turret (there is no trap chain to force).",
    aRedstonePulse:
      "Places a temporary {rb} at a relative position and reverts it after N ticks (Trap → Redstone).",
    aToggleBlocks:
      "Toggles a list of real blocks between a “closed”/“open” material — the basis of secret doors and fake walls, with {instant} or {slide} animation (progressive, block by block).",

    sameActionsTitle: "The same actions serve traps AND turrets",
    sameActionsBody:
      "Turrets and traps run actions through the same {registry} — any new action added is available to both with no separate wiring. A custom trap can use {cp} in its own {actions} list just as a turret uses them as its {impact}.",

    noCamoTitle: "No per-player camouflage",
    noCamoBody:
      "This addon's “camouflage” is a {swap} ({toggle}), visible the same way to every player — there is no per-packet fake block system (it would need ProtocolLib + block-change packets, with no precedent in the repo). It still covers most cases: a fake wall looks like a normal wall until the mechanism fires.",
    blockSwap: "real block swap",

    condTitle: "Conditions",
    condBody:
      "The same mini-language as {evaluator} (Mobs) and the ecosystem's other evaluators: {syntax}, with {ops}. If the trap fires with no player in context (e.g. via TIMER/REDSTONE far from anyone), any {playerStar} condition evaluates as unmet.",
    thPath: "Path",
    thValue: "Value",
    cLevel: "The player's level.",
    cHealth: "Current health — accepts {pct} (e.g. {ex}) to compare against the maximum.",
    cSneaking: "{tf}.",
    cFood: "Hunger level (0-20).",
    cWorld: "The player's world name.",
    cWeather: "{vals}.",
    cNight: "{tf} based on the world's time.",
    condTip:
      "{registry} is left open for Java code to add its own paths (e.g. another addon registering {guildRank}) — there is no public API yet because in v1 no other addon depends on RPGRoll-Traps.",

    blocksTitle: "Protected blocks and keys",
    blocksBody:
      "A definition's optional {block} section turns its placed block into a {protectedWord} one: {breakable} cancels any attempt to break it, {reqItem} requires holding that item (an RPGRoll-Items custom item or a vanilla Material) in order to break it, and {immune} exclude it from {events}/pistons entirely — without this system, TNT/creepers/pistons would treat the block like any other.",
    protectedWord: "protected",

    chainsTitle: "Mechanism chains",
    chainsBody:
      "A definition's {chain} field fires (via {force}) other placed instances as soon as this one activates — but every chained trap still respects its {own} conditions, cooldown and charges, it does not skip them. The {triggerTrap} action inside {actions} achieves the same, for chaining from a specific point in the sequence instead of only at the end.",
    ownWord: "own",

    statesTitle: "States (state machine)",
    statesBody: "Each {placed} has its own state, persisted alongside its position:",
    statesAfter:
      "With {cooldown} it returns to {armed} when it expires (checked on the engine's periodic tick); with {charges} exhausted it falls to {depleted} and never fires again. {infinite} (default) means unlimited.",

    turretsTitle: "Turrets",
    turretsBody:
      "A subsystem parallel to traps rather than a variant — a turret does not react to a one-off event like a {def} does: it re-evaluates its target {continuously} on its own tick ({tick}, 5 by default — more frequent than the trap one so aiming feels fluid), points a visual barrel (a real {display}, with no per-packet animation) at the nearest target inside its radius, and runs its {impact} — the SAME configurable action traps use (see the Actions table above) — for as long as someone is in range.",
    continuouslyWord: "continuously",
    thField: "Field",
    thControls: "What it controls",
    uRadius: "Detection radius in blocks.",
    uTarget:
      "Whether it aims at players (in SURVIVAL/ADVENTURE) and/or hostile mobs (a vanilla {monster} or any RPGRoll-Mobs custom mob, if installed).",
    uConditions:
      "The same evaluator as traps — they only apply to player targets (a mob has no {playerStar}).",
    uFireInterval: "How many ticks before it runs {impact} again while a target is present.",
    uImpact:
      "The action it fires at the target — {fmt}, the same format as a trap {actions} entry. Default: {default} with {ptype}.",
    uModel: "The barrel's appearance (the {display}).",
    impactBody:
      "Changing a turret's firing behavior is just changing its {impact}, without touching anything else in the definition — 3 bundled examples show it:",
    thFile: "File",
    tSentry: "A plain arrow ({cp} + {ptype}) against players and hostile mobs.",
    tWarden: "An instant sonic boom ({sb}) instead of a travelling projectile.",
    tHealing: "Heals instead of damaging ({heal}) — {flag}, aimed only at players.",
    tAlchemist:
      "Real thrown potions ({cp} + {ptype}) that do no impact damage, they only slow and weaken.",
    aimTitle: "Aiming state is not persisted",
    aimBody:
      "A turret's current target and firing cooldown live in memory (not in {yml}) — on a server restart it simply re-acquires a target on the next tick. The visual {display} is a real entity and does persist on its own, like any world entity.",
    turretCmds:
      "{cmds} follow exactly the same pattern as the trap commands — see the command table below.",

    examplesTitle: "YAML file examples",
    examplesBody:
      "The addon ships 5 example traps in {dir} (copied to disk on first startup): {landmine} (PRESSURE + EXPLOSION + EFFECT), {spike} (PROXIMITY + DAMAGE), {vault} (protected block + key + TOGGLE_BLOCKS), {arrow} (INTERACTION + PROJECTILE) and {gas} (TIMER + EFFECT).",

    cmdTitle: "Commands — /trapadmin",
    cmdIntro: "The only command in v1, all of it under the {perm} permission.",
    thCommand: "Command",
    xCreate: "Creates an empty definition (PRESSURE trigger by default) and saves it.",
    xEdit: "Opens that definition's GUI editor.",
    xBrowser: "A browser of every definition, with direct access to create/edit.",
    xReload: "Reloads definitions from disk (placed instances are not lost).",
    xPlace:
      "Places an instance at the block you are looking at — {zone} opens the 2-corner editor for an area trap.",
    xRemove: "Removes a placed instance.",
    xList: "Lists every placed instance with its current state.",
    xInfo: "Detail: state, remaining charges, position.",
    xForce:
      "Forces a fire, skipping event detection (still respecting conditions/cooldown/charges).",
    xTCreate: "Creates an empty turret definition.",
    xTEdit: "Opens that turret's GUI editor.",
    xTBrowser: "A browser of every turret.",
    xTPlace: "Places an instance at the block you are looking at.",
    xTRemove: "Removes a placed instance (and its visual ItemDisplay).",
    xTList: "Lists every placed turret.",

    bTitle: "Visual builder: Trap (simple fields)",
    bDesc:
      "Basic trigger + metadata. actions/conditions/chain/block/disguise are too deeply nested for this form — copy and adapt one of the 5 bundled examples.",

    fId: "Id",
    fDisplayName: "Display name",
    fDescription: "Description",
    fIcon: "Icon (Material)",
    fTrigger: "Trigger",
    fType: "Type",
    fRadius: "Radius (blocks)",
    fCooldown: "Cooldown (ms)",
    fCharges: "Charges (-1 = unlimited)",
    fragFile: "traps/reinforced_vault_door.yml (excerpt)",
  },

  workers: {
    title: "Workers (RPGRoll-Workers)",
    intro:
      "Autonomous workers with a profession, skills, inventory, needs, personality, a schedule and a configurable rule-based AI — world inhabitants who work even when no player is watching, not minions that conjure resources out of thin air.",

    treeTitle: "The ‘behavior tree’ is an ordered rule list, not visual nodes",
    treeBody:
      "A real node editor is not viable inside a Bukkit inventory GUI. Instead, each {profession} has a list of {aiRule} (condition→action→priority) — the first rule whose condition matches wins. If none match, it falls back to the profession's schedule, and if it has none either, to {work} by default.",

    reqTitle: "Requirements",
    reqBody1:
      "Of all the addons the original design named as integrations (Ranching/Fishing/Mining/Blacksmith/Housing/Magic/Quests/Guilds/Teams), only",
    reqBody2:
      ", RPGRoll-Fishing, RPGRoll-Seasons, RPGRoll-Quests, RPGRoll-Guilds and RPGRoll-Magic exist in this project — RPGRoll-Mining, RPGRoll-Blacksmith and “Housing” as a separate addon do not exist. Without Vault + a real economy plugin, wages simply are not charged (the rest of the simulation works the same). Without",
    reqBody3:
      ", a profession's {reskin} simply does not get configured (nothing breaks — the worker shows with its normal vanilla {entityType}).",
    reskinLink: "visual reskin",

    reskinTitle: "Per-profession visual reskin (no ModelEngine/BetterModel)",
    reskinBody:
      "Minecraft has no equivalent of {cmd} for living entities — there is no way to re-texture a vanilla worker with a resource pack alone. RPGRoll-Workers uses the same mechanism as RPGRoll-Ranching (and, with lists, RPGRoll-Mobs): the real vanilla entity is still the one that works/walks (behavior untouched), but an {display} entity is mounted on it as a real passenger, carrying an item with {cmdLower}.",
    reskinBody2:
      "It is a single fixed reskin per profession (not a randomized list, unlike Mobs). The material and the {cmd} number are defined by a real resource pack — the same pipeline RPGRoll-Items already uses: put the model/texture in {path} and, if SackResourcePack is installed, it syncs itself when the plugin starts.",
    untestedTitle: "Only verified by compiling, not tested in game",
    untestedBody:
      "As in Mobs/Ranching, this first version of the reskin was not visually tested against a real Minecraft client (no Paper server available in the development environment).",

    aiTitle: "Rule-based AI",
    thCondition: "Condition",
    thActivates: "Activates when...",
    iNeeds: "Some need crosses a threshold (low hunger/energy/sleep, or high stress).",
    iInvFull: "The worker's carried inventory reaches its capacity.",
    iWeather: "The world's real weather/time ({api}).",
    iHappiness: "Happiness below a threshold.",
    iAlways: "Always — meant as a fallback rule at the end of the list.",
    eatBody:
      "The {eat} action is self-sufficient: if the worker has a home assigned and has not arrived yet, it walks there; on arrival (or with no home), it eats. A single {rule} rule covers the whole “find food → eat → go back to work” flow of the original design, with no multi-step state tracker needed.",

    needsTitle: "Needs and personality",
    needsBody:
      "Each worker has 7 needs (0-100): hunger, energy, sleep, stress (inverted — high is bad), motivation, health and happiness. They decay on their own at each periodic check except while the worker sleeps, which restores them. Happiness/motivation drift toward the average of the others — ignoring basic needs ends up dragging them down by itself, with no separate check.",
    traitBody:
      "Each worker has ONE dominant personality trait (not a combination), which modulates work speed, stress resistance, and error chance:",
    thTrait: "Trait",
    thEffect: "Effect",
    pLazy: "x0.7 speed, less stress.",
    pFast: "x1.3 speed.",
    pResponsible: "x1.1-1.15 speed.",
    pClumsy: "x2.0 error chance (wastes the work attempt).",
    pSmart: "x0.5 error chance.",
    pOther:
      "The remaining traits (SMART, SOCIAL, LONER, BRAVE, COWARD) — flavor with no mechanical modifier of their own in this pass.",

    profTitle: "Professions and skills",
    profBody:
      "A {profession} defines identity, which vanilla entity represents it, its AI rules, its schedule, its wage, and optionally a required tool. The real physical behavior of “working” does NOT live in the profession — a {behavior} registered by id resolves it.",
    thProfession: "Example profession",
    thBehavior: "Actual behavior",
    bMiner:
      "Finds the nearest vein, avoids blocks adjacent to lava, breaks it and carries the ore (no tool durability or real break time).",
    bFarmer: "Harvests the nearest mature crop and resets its age to 0 (instant replanting).",
    bLumberjack:
      "Cuts the nearest log — it does not truly reforest (planting a whole tree is beyond this pass's scope).",
    bRancher: "{real} — finds a nearby Ranching animal and feeds it via {api}.",
    realIntegration: "A real integration",
    bFisherman: "Finds nearby water and pulls out a generic vanilla fish — see the warning below.",
    fishTitle: "The fisherman does NOT really use FishingAPI",
    fishBody1:
      "{forceCatch} demands a real {player} (it needs one to check character level on legendary fish), and a worker is not a player. Faking one would be fragile and misleading, so {behavior} settles for a simple vanilla catch instead of the rich genetics/quality of",
    fishBody2:
      ". A profession with no behavior registered still “works” for schedule/wage/experience purposes, just with no real physical interaction (a silent fallback, not an error).",

    invTitle: "Inventory and logistics",
    invBody:
      "A worker's carried inventory is a map (material → amount), not a real 27-slot {inventory} — it does not need to preserve per-item metadata, only how much of what it carries. A warehouse is not admin-authored content like a species or a gene: it is a real chest marked in the world with the Warehouse Designator ({designator}). Every designated warehouse lives in a single {warehouses} — there is no point in “reusing” one specific chest's location as reusable content.",

    houseTitle: "Housing",
    houseBody:
      "Setting a worker's home is a button on its sheet (“Set home at my location”), not a bed-marking tool — it simply stores the location of the player managing it. Sleeping there (or anywhere, as long as the action is {sleep}) restores energy/sleep instead of decaying them.",

    ecoTitle: "Economy: wages, contracts and morale",
    ecoBody:
      "The worker itself has no account — “getting paid” is, in practice, an upkeep cost the employer pays from their real Vault balance (via RPGRoll-Lib's {vault}, whatever the provider — no custom economy was invented). {hourly} is charged on a periodic tick; {perTask} is charged at the exact moment of delivering to a warehouse.",
    moralBody:
      "Overall morale (the average of the 7 needs) modulates work speed and, if it stays very low for a long time, a periodic chance that the worker quits its contract on its own.",

    eventsTitle: "Worker events",
    thType: "Type",
    thWhen: "When it is rolled",
    eIllness:
      "Only with low morale — they apply an active state with a duration and a work-speed multiplier (0% on strike = does no work at all).",
    eVacation: "At any moment, if employed.",
    ePromotion:
      "Only with high morale — unlike the others, it applies its bonuses instantly, with no temporary state.",

    yamlTitle: "YAML file example",
    refTitle: "Full reference: every field in a single file",
    refBody:
      "{file} (shipped in the jar) uses all 10 AI conditions and all 9 AI actions — the example above only uses 4 of each.",

    bTitle: "Visual builder: profession",
    bDesc:
      "A profession's identity, schedule and wage. The AI rules (ai-rules) are too structured for this form — copy and adapt the example above for those.",

    skinsTitle: "Player skins",
    skinsBody:
      "A worker can wear a player skin, like NPCs do. Since it has to stay a mob in order to walk (it uses the pathfinder), the mob turns invisible and silent and a mannequin wearing the skin follows it every tick: it stands in its place, looks where it looks, carries its profession's tool and swings it while working. Hitting the mannequin is hitting the worker, and the mannequin shows the hits. It is not saved with the world: it is recreated when the chunk loads, and removing the skin (or the plugin) makes the mob visible again.",
    skinSrcTitle: "Where the skin comes from",
    skinSrcBody:
      "A MineSkin link ({link}), {id} or the uuid of a MineSkin skin; or a Minecraft player's name, whose skin is copied exactly as they wear it today. It is stored in {path} ({fields}).",

    guiTitle: "GUI: Worker Studio",
    guiBody:
      "{browser} opens a hub linking to 4 browsers (Professions, Skills, Schedules, Events) plus the Worker Explorer. A worker's sheet shows needs/skills/contract as text (the same “no real visual preview” stance as other modules in this project) and exposes Rename, Hire, Fire and Set home.",

    apiTitle: "API for addons — WorkersAPI",

    cmdTitle: "Commands",
    thCommand: "Command",
    thWhat: "What it does",
    wBrowser: "Opens the Worker Studio.",
    wReload: "Reloads every definition from disk.",
    wSpawn: "Spawns a worker at your location.",
    wDesignator: "Gives you the Warehouse Designator.",
    wSkin:
      "Gives the worker you are looking at the skin from a MineSkin link or id, or a player's; {remove} restores its profession's appearance. Also available from its sheet (Skin button, staff only).",
    wInspect: "Opens the sheet of the worker you are looking at.",
    wHire: "Hires the worker you are looking at (its profession's default wage).",
    wFire: "Fires the worker you are looking at (if it is yours, or your guild's).",
    wList: "Lists your hired workers.",
    permNote:
      "{admin} requires {p1} (default: op); {use} requires {p2} (default: true). With RPGRoll-Guilds installed, any member of the employer's guild can also fire their worker — “guilds can share workers” from the original design, resolved as shared management. Nobody else can rename or fire someone else's worker without {p1b}, and moving its home requires {p3} (default: op).",
    regionsBody:
      "A worker works around its home —the spot where it was created— and only in loaded chunks. Before changing a block it fires the same event a villager does when harvesting, so WorldGuard can prevent it and CoreProtect logs it; inside a guild's protected territory only its members' workers work. The lumberjack only fells logs topped by natural leaves: it will not touch a house's wood. GriefPrevention does not stop mobs inside its claims, which is why moving the home is admin-only.",

    fId: "Id",
    fDisplayName: "Display name",
    fIcon: "Icon (Material)",
    fDescription: "Description",
    fEntityType: "Vanilla EntityType",
    fSkills: "Skills",
    fSchedule: "Schedule id (empty = none)",
    fWage: "Wage",
    fWageType: "Payment type",
    fTool: "Required tool (empty = none)",
    fReskin: "Visual reskin (optional)",
    fMaterial: "Base material",
    fCmd: "Custom model data",
    fScale: "Display scale",
    reskinFragFile: "professions/reference_full.yml (excerpt)",
    aiFragFile: "professions/miner.yml (ai-rules excerpt)",
  },
};

const pt: AddonsFCopy = {
  traps: {
    title: "Traps & Defenses (RPGRoll-Traps)",
    intro:
      "Motor genérico de armadilhas/mecanismos configurável por YAML: blocos reforçados com chave, minas, espinhos, explosões customizadas, portas secretas/paredes falsas, runas mágicas, teleporte, cadeias de mecanismos e integração com redstone — com uma state machine própria (IDLE→ARMED→TRIGGERED→COOLDOWN→DEPLETED) para que cada instância colocada no mundo se comporte de forma consistente e persistente entre reinícios.",

    reqTitle: "Requisitos",
    reqBody:
      "RPGRoll-Items é opcional: se estiver instalado, {reqItem} reconhece itens customizados por id (via {iis}); se não, cai para um {material} vanilla direto na mão. RPGRoll-Effects também é opcional: sem ele, a ação {effect} simplesmente não faz nada (com um aviso no console) em vez de quebrar. SackResourcePack também é opcional: se estiver instalado, os modelos de fábrica de torres, munição e armadilhas são registrados no pack (aplica com {srp}); sem ele cada item aparece com o seu material vanilla.",

    modelTitle: "Definição vs. instância colocada",
    modelBody:
      "Igual ao Crates ou Dungeons: uma {def} (YAML em {dir}) é um {type} de armadilha reutilizável (comportamento), e uma {placed} é uma {instance} física no mundo (persistida em {locations}, recriada ao reiniciar). Várias instâncias podem compartilhar a mesma definição.",
    typeWord: "tipo",
    instanceWord: "instância",

    noPlayerTitle: "Sem comando de jogador",
    noPlayerBody:
      "Todo o addon é configurado por admin via {trapadmin} — não há um comando {trap} de jogador nesta versão. Os jogadores só interagem com as armadilhas já colocadas no mundo.",

    triggersTitle: "Triggers",
    triggersBody:
      "Os primeiros oito são dirigidos por evento vanilla (um listener os detecta na hora). {proximity}, {los} e {timer} não têm evento equivalente, então o motor os reavalia num tick periódico próprio ({tick}, 20 por padrão). {command} e {customEvent} nunca disparam sozinhos — só via {force} ou a ação {triggerTrap} de outra armadilha.",
    thTrigger: "Trigger",
    thDetects: "O que detecta",
    tPressure: "Um jogador pisa no bloco exato da armadilha.",
    tMovement: "Um jogador se move dentro do raio configurado (sem exigir estar parado em cima).",
    tProximity: "Há um jogador dentro do raio — reavaliado no tick periódico.",
    tLos: "Um jogador tem linha de visão direta até a armadilha — também por tick.",
    tInteraction: "Clique direito sobre o bloco (a base das portas secretas com chave).",
    tBlock: "Alguém quebra ou coloca o bloco da armadilha.",
    tProjectile: "Um projétil acerta o bloco ({ev}).",
    tEntity: "Qualquer {le} não-jogador entra na zona (mobs, animais).",
    tRedstone: "O bloco recebe sinal de redstone (borda de subida).",
    tTimer: "Dispara sozinha de vez em quando, sem precisar de um jogador por perto.",
    tCommand: "Só por API/comando — nunca automático.",

    actionsTitle: "Ações",
    actionsBody:
      "Cada armadilha tem uma lista de {actions} (todas são executadas, em ordem, quando o motor decide disparar). Formato YAML: {fmt}.",
    thAction: "Ação",
    thWhat: "O que faz",
    aMessage: "Mensagem ao jogador que disparou (suporta {ph} e cor/formatação {amp}).",
    aSound: "Som ou partícula vanilla na localização da armadilha.",
    aDamage: "Dano direto ao alvo — jogador {orMob} (torres apontadas para hostis).",
    orMob: "ou mob",
    aHeal: "Restaura a vida do alvo ({amount}) — a base de uma torre “de cura” apontada só para jogadores.",
    aExplosion:
      "Explosão customizada ({params}) — não usa TNT real, então você pode causar dano sem quebrar estruturas.",
    aFire: "Põe fogo no jogador por N ticks.",
    aTeleport:
      "Teleporta o jogador para coordenadas fixas (ou para o mundo atual dele se você não especificar {world}).",
    aEffect:
      "Aplica um efeito de estado do RPGRoll-Effects por id (veneno, sangramento, queimadura...) ao alvo — jogador {orMob}. Não faz nada se o addon não estiver instalado.",
    aProjectile:
      "Rajada fixa de N flechas em direção ao jogador que disparou ({params}) — pensada para armadilhas (“chovem flechas ao pisar na placa”).",
    aCustomProjectile:
      "Um único disparo instantâneo em direção ao alvo — {ptype} escolhe entre {types} (uma poção arremessável real: não causa dano de impacto, só aplica os efeitos de {effects} — formato {fmt}, ex. {ex}). É a ação padrão de uma torre.",
    aSonicBoom:
      "Aproximação do ataque à distância do Warden: dano instantâneo ({damage}) + partícula/som interpolados entre a origem e o alvo. Não reimplementa o hitbox-piercing real do Warden (vive em código de servidor não exposto pela API pública).",
    aCommand:
      "Executa um comando pelo console ou como o jogador (necessário para comandos próprios do RPGRoll que exigem um jogador real).",
    aTriggerTrap:
      "Força o disparo de outra instância colocada pelo seu {placementId} — a base das cadeias de mecanismos. Sem efeito se usado de uma torre (não há cadeia de armadilhas para forçar).",
    aRedstonePulse:
      "Coloca um {rb} temporário numa posição relativa e o reverte depois de N ticks (Trap → Redstone).",
    aToggleBlocks:
      "Alterna uma lista de blocos reais entre material “fechado”/“aberto” — a base de portas secretas e paredes falsas, com animação {instant} ou {slide} (progressiva, bloco por bloco).",

    sameActionsTitle: "As mesmas ações servem para armadilhas E torres",
    sameActionsBody:
      "Torres e armadilhas executam ações pelo mesmo {registry} — qualquer ação nova que se adicione fica disponível para ambas sem fiação separada. Uma armadilha customizada pode usar {cp} na sua própria lista de {actions} igual a uma torre as usa como o seu {impact}.",

    noCamoTitle: "Sem camuflagem por jogador",
    noCamoBody:
      "A “camuflagem” deste addon é {swap} ({toggle}), visível igual para todos os jogadores — não há um sistema de blocos falsos por pacote (exigiria ProtocolLib + block-change packets, sem precedente no repositório). Ainda assim resolve a maioria dos casos: uma parede falsa parece uma parede normal até o mecanismo ativar.",
    blockSwap: "troca de bloco real",

    condTitle: "Condições",
    condBody:
      "Mesma minilinguagem que {evaluator} (Mobs) e os outros avaliadores do ecossistema: {syntax}, com {ops}. Se a armadilha disparar sem um jogador em contexto (ex. por TIMER/REDSTONE longe de qualquer um), qualquer condição {playerStar} é avaliada como não cumprida.",
    thPath: "Caminho",
    thValue: "Valor",
    cLevel: "Nível do jogador.",
    cHealth: "Vida atual — aceita {pct} (ex. {ex}) para comparar contra o máximo.",
    cSneaking: "{tf}.",
    cFood: "Nível de fome (0-20).",
    cWorld: "Nome do mundo do jogador.",
    cWeather: "{vals}.",
    cNight: "{tf} conforme a hora do mundo.",
    condTip:
      "{registry} fica aberto para que código Java some os seus próprios caminhos (ex. outro addon registrando {guildRank}) — ainda não há uma API pública porque na v1 nenhum outro addon depende do RPGRoll-Traps.",

    blocksTitle: "Blocos protegidos e chaves",
    blocksBody:
      "A seção opcional {block} de uma definição transforma o seu bloco colocado em {protectedWord}: {breakable} cancela qualquer tentativa de quebrá-lo, {reqItem} exige ter aquele item na mão (customizado do RPGRoll-Items ou Material vanilla) para poder quebrá-lo, e {immune} o excluem de {events}/pistões por completo — sem esse sistema, TNT/creepers/pistões tratariam o bloco como qualquer outro.",
    protectedWord: "protegido",

    chainsTitle: "Cadeias de mecanismos",
    chainsBody:
      "O campo {chain} de uma definição dispara (via {force}) outras instâncias colocadas assim que esta se ativa — mas cada armadilha encadeada continua respeitando as suas {own} condições, cooldown e cargas, não as pula. A ação {triggerTrap} dentro de {actions} consegue o mesmo, para encadear a partir de um ponto específico da sequência em vez de só no final.",
    ownWord: "próprias",

    statesTitle: "Estados (state machine)",
    statesBody: "Cada {placed} tem o seu próprio estado, persistido junto com a sua posição:",
    statesAfter:
      "Com {cooldown} volta a {armed} quando expira (revisado no tick periódico do motor); com {charges} esgotadas cai em {depleted} e não dispara mais. {infinite} (padrão) é infinito.",

    turretsTitle: "Torres",
    turretsBody:
      "Um subsistema paralelo às armadilhas, em vez de uma variante — uma torre não reage a um evento pontual como uma {def}: reavalia o alvo {continuously} no seu próprio tick ({tick}, 5 por padrão — mais frequente que o das armadilhas para que a mira pareça fluida), aponta um cano visual (um {display} real, sem animação por pacote) para o alvo mais próximo dentro do seu raio, e executa o seu {impact} — a MESMA ação configurável que as armadilhas usam (ver a tabela de Ações acima) — enquanto houver alguém no alcance.",
    continuouslyWord: "continuamente",
    thField: "Campo",
    thControls: "O que controla",
    uRadius: "Raio de detecção em blocos.",
    uTarget:
      "Se aponta para jogadores (em SURVIVAL/ADVENTURE) e/ou para mobs hostis ({monster} vanilla ou qualquer mob customizado do RPGRoll-Mobs, se estiver instalado).",
    uConditions:
      "Mesmo avaliador que as armadilhas — só se aplicam a alvos jogador (um mob não tem {playerStar}).",
    uFireInterval: "A cada quantos ticks volta a executar {impact} enquanto houver alvo.",
    uImpact:
      "A ação que dispara contra o alvo — {fmt}, mesmo formato que uma entrada de {actions} de armadilha. Padrão: {default} com {ptype}.",
    uModel: "Aparência do cano (o {display}).",
    impactBody:
      "Mudar o comportamento de disparo de uma torre é só mudar o seu {impact}, sem tocar em nada mais da definição — 3 exemplos incluídos que mostram isso:",
    thFile: "Arquivo",
    tSentry: "Flecha simples ({cp} + {ptype}) contra jogadores e mobs hostis.",
    tWarden: "Sonic boom instantâneo ({sb}) em vez de um projétil que viaja.",
    tHealing: "Cura em vez de causar dano ({heal}) — {flag}, apontada só para jogadores.",
    tAlchemist:
      "Poções arremessáveis reais ({cp} + {ptype}) que não causam dano ao impactar, só desaceleram e enfraquecem.",
    aimTitle: "Estado de mira não persistido",
    aimBody:
      "O alvo atual e o cooldown de disparo de uma torre vivem na memória (não em {yml}) — ao reiniciar o servidor ela simplesmente volta a adquirir alvo no próximo tick. O {display} visual é uma entidade real e persiste sozinho, como qualquer entidade do mundo.",
    turretCmds:
      "{cmds} seguem exatamente o mesmo padrão dos comandos de armadilha — ver a tabela de comandos mais abaixo.",

    examplesTitle: "Exemplos de arquivo YAML",
    examplesBody:
      "O addon inclui 5 armadilhas de exemplo em {dir} (copiadas para o disco no primeiro arranque): {landmine} (PRESSURE + EXPLOSION + EFFECT), {spike} (PROXIMITY + DAMAGE), {vault} (bloco protegido + chave + TOGGLE_BLOCKS), {arrow} (INTERACTION + PROJECTILE) e {gas} (TIMER + EFFECT).",

    cmdTitle: "Comandos — /trapadmin",
    cmdIntro: "Único comando da v1, tudo sob a permissão {perm}.",
    thCommand: "Comando",
    xCreate: "Cria uma definição vazia (trigger PRESSURE por padrão) e a salva.",
    xEdit: "Abre o editor GUI dessa definição.",
    xBrowser: "Navegador de todas as definições, com acesso direto a criar/editar.",
    xReload: "Recarrega definições do disco (as instâncias colocadas não se perdem).",
    xPlace:
      "Coloca uma instância no bloco que você está olhando — {zone} abre o editor de 2 cantos para uma armadilha de área.",
    xRemove: "Remove uma instância colocada.",
    xList: "Lista todas as instâncias colocadas com o seu estado atual.",
    xInfo: "Detalhe: estado, cargas restantes, posição.",
    xForce:
      "Força o disparo pulando a detecção de evento (continua respeitando condições/cooldown/cargas).",
    xTCreate: "Cria uma definição de torre vazia.",
    xTEdit: "Abre o editor GUI dessa torre.",
    xTBrowser: "Navegador de todas as torres.",
    xTPlace: "Coloca uma instância no bloco que você está olhando.",
    xTRemove: "Remove uma instância colocada (e o seu ItemDisplay visual).",
    xTList: "Lista todas as torres colocadas.",

    bTitle: "Construtor visual: Trap (campos simples)",
    bDesc:
      "Trigger básico + metadata. actions/conditions/chain/block/disguise são aninhados demais para este formulário — copie e adapte um dos 5 exemplos incluídos.",

    fId: "Id",
    fDisplayName: "Nome visível",
    fDescription: "Descrição",
    fIcon: "Ícone (Material)",
    fTrigger: "Trigger",
    fType: "Tipo",
    fRadius: "Raio (blocos)",
    fCooldown: "Cooldown (ms)",
    fCharges: "Cargas (-1 = infinitas)",
    fragFile: "traps/reinforced_vault_door.yml (fragmento)",
  },

  workers: {
    title: "Workers (RPGRoll-Workers)",
    intro:
      "Trabalhadores autônomos com profissão, habilidades, inventário, necessidades, personalidade, horário e uma IA por regras configurável — habitantes do mundo que trabalham mesmo quando nenhum jogador está olhando, não minions que geram recursos por mágica.",

    treeTitle: "A ‘árvore de comportamento’ é uma lista de regras ordenadas, não nós visuais",
    treeBody:
      "Um editor de nós de verdade não é viável numa GUI de inventário do Bukkit. Em vez disso, cada {profession} tem uma lista de {aiRule} (condição→ação→prioridade) — a primeira regra cuja condição casa ganha. Se nenhuma casar, cai no horário da profissão, e se também não tiver um, em {work} por padrão.",

    reqTitle: "Requisitos",
    reqBody1:
      "De todos os addons que o desenho original citava como integração (Ranching/Fishing/Mining/Blacksmith/Housing/Magic/Quests/Guilds/Teams), só",
    reqBody2:
      ", RPGRoll-Fishing, RPGRoll-Seasons, RPGRoll-Quests, RPGRoll-Guilds e RPGRoll-Magic existem neste projeto — RPGRoll-Mining, RPGRoll-Blacksmith e “Housing” como addon separado não existem. Sem Vault + um plugin de economia real, os salários simplesmente não são cobrados (o resto da simulação continua igual). Sem",
    reqBody3:
      ", o {reskin} de uma profissão simplesmente não aparece configurado (não quebra nada — o worker aparece com o seu {entityType} vanilla normal).",
    reskinLink: "reskin visual",

    reskinTitle: "Reskin visual por profissão (sem ModelEngine/BetterModel)",
    reskinBody:
      "O Minecraft não tem nenhum equivalente a {cmd} para entidades vivas — não há como re-texturizar um worker vanilla só com um resource pack. O RPGRoll-Workers usa o mesmo mecanismo do RPGRoll-Ranching (e, com listas, do RPGRoll-Mobs): a entidade vanilla real continua sendo a que trabalha/caminha (comportamento intacto), mas uma entidade {display} é montada nela como passageiro real, portando um item com {cmdLower}.",
    reskinBody2:
      "É um único reskin fixo por profissão (não uma lista sorteada, diferente do Mobs). O material e o número de {cmd} são definidos por um resource pack real — o mesmo pipeline que o RPGRoll-Items já usa: coloque o modelo/textura em {path} e, se o SackResourcePack estiver instalado, ele se sincroniza sozinho ao iniciar o plugin.",
    untestedTitle: "Verificado só por compilação, não testado no jogo",
    untestedBody:
      "Igual ao Mobs/Ranching, esta primeira versão do reskin não foi testada visualmente contra um cliente real de Minecraft (sem servidor Paper disponível no ambiente de desenvolvimento).",

    aiTitle: "IA por regras",
    thCondition: "Condição",
    thActivates: "Ativa quando...",
    iNeeds: "Alguma necessidade cruza um limite (fome/energia/sono baixos, ou estresse alto).",
    iInvFull: "O inventário carregado do worker chega à sua capacidade.",
    iWeather: "Clima/hora real do mundo ({api}).",
    iHappiness: "Felicidade abaixo de um limite.",
    iAlways: "Sempre — pensada como regra de reserva no fim da lista.",
    eatBody:
      "A ação {eat} é autossuficiente: se o worker tem um lar atribuído e ainda não chegou, caminha até ele; ao chegar (ou se não tiver lar), come. Uma única regra {rule} cobre todo o fluxo “buscar comida → comer → voltar ao trabalho” do desenho original, sem precisar de um rastreador de estado de vários passos.",

    needsTitle: "Necessidades e personalidade",
    needsBody:
      "Cada worker tem 7 necessidades (0-100): fome, energia, sono, estresse (invertido — alto é ruim), motivação, saúde e felicidade. Decaem sozinhas a cada checagem periódica, salvo enquanto o worker dorme, o que as restaura. Felicidade/motivação são puxadas para a média das demais — ignorar as necessidades básicas acaba baixando-as sozinho, sem uma checagem separada.",
    traitBody:
      "Cada worker tem UM traço de personalidade dominante (não uma combinação), que modula a velocidade de trabalho, a resistência ao estresse e a chance de erro:",
    thTrait: "Traço",
    thEffect: "Efeito",
    pLazy: "x0.7 velocidade, menos estresse.",
    pFast: "x1.3 velocidade.",
    pResponsible: "x1.1-1.15 velocidade.",
    pClumsy: "x2.0 chance de erro (desperdiça a tentativa de trabalho).",
    pSmart: "x0.5 chance de erro.",
    pOther:
      "Resto dos traços (SMART, SOCIAL, LONER, BRAVE, COWARD) — flavor sem modificador mecânico próprio nesta passada.",

    profTitle: "Profissões e habilidades",
    profBody:
      "Uma {profession} define identidade, qual entidade vanilla a representa, as suas regras de IA, o seu horário, o seu salário e, opcionalmente, uma ferramenta exigida. O comportamento físico real de “trabalhar” NÃO vive na profissão — um {behavior} registrado por id o resolve.",
    thProfession: "Profissão de exemplo",
    thBehavior: "Comportamento real",
    bMiner:
      "Busca o veio mais próximo, evita blocos adjacentes a lava, quebra e carrega o minério (sem durabilidade de ferramenta nem tempo de quebra real).",
    bFarmer: "Colhe a plantação madura mais próxima e reseta a sua idade para 0 (replantio instantâneo).",
    bLumberjack:
      "Corta o tronco mais próximo — não reflorestа de verdade (plantar uma árvore completa excede o escopo desta passada).",
    bRancher: "{real} — busca um animal do Ranching por perto e o alimenta via {api}.",
    realIntegration: "Integração real",
    bFisherman: "Busca água por perto e tira um peixe vanilla genérico — ver o aviso abaixo.",
    fishTitle: "O pescador NÃO usa a FishingAPI de verdade",
    fishBody1:
      "{forceCatch} exige um {player} real (precisa dele para checar o nível de personagem em peixes lendários), e um worker não é um jogador. Simulá-lo com um jogador falso seria frágil e enganoso, então {behavior} fica com uma captura vanilla simples em vez da genética/qualidade rica do",
    fishBody2:
      ". Uma profissão sem nenhum behavior registrado continua “trabalhando” para efeitos de horário/salário/experiência, só sem nenhuma interação física real (fallback silencioso, não um erro).",

    invTitle: "Inventário e logística",
    invBody:
      "O inventário carregado de um worker é um mapa (material → quantidade), não um {inventory} real de 27 slots — não precisa preservar metadata de itens individuais, só saber quanto leva de quê. Um armazém não é conteúdo criado por admin como uma espécie ou um gene: é um baú real marcado no mundo com o Designador de Armazém ({designator}). Todos os armazéns designados vivem num único {warehouses} — não faz sentido “reutilizar” a localização de um baú pontual como conteúdo reutilizável.",

    houseTitle: "Moradia",
    houseBody:
      "Fixar o lar de um worker é um botão na sua ficha (“Fixar lar na minha localização”), não uma ferramenta de marcar camas — simplesmente salva a localização do jogador que o gerencia. Dormir ali (ou em qualquer lugar, desde que a ação seja {sleep}) restaura energia/sono em vez de decaí-los.",

    ecoTitle: "Economia: salários, contratos e moral",
    ecoBody:
      "O worker em si não tem conta — “receber” é, na prática, um custo de manutenção que o empregador paga com o seu saldo real de Vault (via {vault} do RPGRoll-Lib, qualquer que seja o provedor — não se inventou uma economia própria). {hourly} é cobrado num tick periódico; {perTask} é cobrado no momento exato da entrega num armazém.",
    moralBody:
      "A moral geral (média das 7 necessidades) modula a velocidade de trabalho e, se ficar muito baixa por muito tempo, uma chance periódica de o worker pedir demissão do seu contrato sozinho.",

    eventsTitle: "Eventos de worker",
    thType: "Tipo",
    thWhen: "Quando é sorteado",
    eIllness:
      "Só com moral baixa — aplicam um estado ativo com duração e multiplicador de velocidade de trabalho (0% em greve = não trabalha nada).",
    eVacation: "Em qualquer momento, se estiver empregado.",
    ePromotion:
      "Só com moral alta — diferente dos demais, aplica os seus bônus na hora, sem um estado temporário.",

    yamlTitle: "Exemplo de arquivo YAML",
    refTitle: "Referência completa: todos os campos num único arquivo",
    refBody:
      "{file} (incluído no jar) usa as 10 condições e as 9 ações de IA — o exemplo acima só usa 4 de cada.",

    bTitle: "Construtor visual: profissão",
    bDesc:
      "Identidade, horário e salário de uma profissão. As regras de IA (ai-rules) são estruturadas demais para este formulário — copie e adapte o exemplo acima para essas.",

    skinsTitle: "Skins de jogador",
    skinsBody:
      "Um worker pode usar skin de jogador, como os NPCs. Como ele tem que continuar sendo um mob para caminhar (usa o pathfinder), o mob fica invisível e calado e um manequim com a skin o segue a cada tick: fica no lugar dele, olha para onde ele olha, carrega a ferramenta da sua profissão e a balança ao trabalhar. Bater no manequim é bater no worker, e o manequim acusa os golpes. Não é salvo com o mundo: é recriado ao carregar o chunk, e ao remover a skin (ou o plugin) o mob volta a aparecer.",
    skinSrcTitle: "De onde sai a skin",
    skinSrcBody:
      "Um link do MineSkin ({link}), {id} ou o uuid de uma skin do MineSkin; ou o nome de um jogador de Minecraft, cuja skin é copiada do jeito que ele a usa hoje. É salva em {path} ({fields}).",

    guiTitle: "GUI: Worker Studio",
    guiBody:
      "{browser} abre um hub que liga a 4 navegadores (Profissões, Habilidades, Horários, Eventos) mais o Explorador de Workers. A ficha de um worker mostra necessidades/habilidades/contrato em texto (mesmo critério de “sem preview visual real” dos outros módulos deste projeto) e expõe Renomear, Contratar, Demitir e Fixar lar.",

    apiTitle: "API para addons — WorkersAPI",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    thWhat: "O que faz",
    wBrowser: "Abre o Worker Studio.",
    wReload: "Recarrega todas as definições do disco.",
    wSpawn: "Spawna um worker na sua localização.",
    wDesignator: "Te dá o Designador de Armazém.",
    wSkin:
      "Dá ao worker que você está olhando a skin de um link ou id do MineSkin, ou a de um jogador; {remove} devolve a aparência da sua profissão. Também pela sua ficha (botão Skin, só staff).",
    wInspect: "Abre a ficha do worker que você está olhando.",
    wHire: "Contrata o worker que você está olhando (salário padrão da sua profissão).",
    wFire: "Demite o worker que você está olhando (se for seu, ou da sua guilda).",
    wList: "Lista os seus trabalhadores contratados.",
    permNote:
      "{admin} exige {p1} (padrão: op); {use} exige {p2} (padrão: true). Com o RPGRoll-Guilds instalado, qualquer membro da mesma guilda do empregador também pode demitir o worker dele — “as guildas podem compartilhar trabalhadores” do desenho original, resolvido como gestão compartilhada. Ninguém mais pode renomear nem demitir um worker alheio sem {p1b}, e mover o lar dele exige {p3} (padrão: op).",
    regionsBody:
      "Um worker trabalha em volta do seu lar —o lugar onde foi criado— e só em chunks carregados. Antes de mudar um bloco ele lança o mesmo evento que um aldeão ao colher, então o WorldGuard pode impedir e o CoreProtect registra; no território protegido de uma guilda só trabalham os workers dos seus membros. O lenhador só derruba troncos coroados por folhas naturais: a madeira de uma casa ele não toca. O GriefPrevention não barra mobs dentro das suas claims, por isso mover o lar é de admin.",

    fId: "Id",
    fDisplayName: "Nome visível",
    fIcon: "Ícone (Material)",
    fDescription: "Descrição",
    fEntityType: "EntityType vanilla",
    fSkills: "Habilidades",
    fSchedule: "Id de horário (vazio = nenhum)",
    fWage: "Salário",
    fWageType: "Tipo de pagamento",
    fTool: "Ferramenta exigida (vazio = nenhuma)",
    fReskin: "Reskin visual (opcional)",
    fMaterial: "Material base",
    fCmd: "Custom model data",
    fScale: "Escala do display",
    reskinFragFile: "professions/reference_full.yml (fragmento)",
    aiFragFile: "professions/miner.yml (fragmento ai-rules)",
  },
};

export const ADDONS_F_COPY: Record<Locale, AddonsFCopy> = { es, en, pt };
