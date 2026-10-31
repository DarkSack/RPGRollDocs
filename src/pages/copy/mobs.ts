import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Mobs. */

const es = {
  title: "Mobs y jefes (RPGRoll-Mobs)",
  intro:
    "Motor de criaturas personalizadas: mobs normales, mini-jefes y jefes con fases, IA propia, resistencias, loot con probabilidad y bossbar/diálogos — todo definido en YAML, con editor gráfico incluido.",

  scopeTitle: "Alcance de esta primera versión: núcleo PvE a fondo",
  scopeBody:
    "RPGRoll-Mobs prioriza profundidad real en definición de mob, motor de combate, comportamiento y fases de jefe. Para verse distinto tiene dos caminos: modelos 3D animados con FreeMinecraftModels (gratis, opcional — ver {models3d}) o skins estáticas sin ninguna dependencia con {skins}. No integra con ModelEngine/BetterModel ni WorldGuard/WorldEdit.",
  models3dLink: "Modelos 3D",

  reqTitle: "Requisitos",
  reqBody1:
    "Sin RPGRoll-Items ni RPGRoll-Quests instalados, todo sigue funcionando: el equipo de un mob cae a {material} vanilla directo, el loot de tipo {item} también, y el loot de tipo {quest} simplemente no hace nada. Sin",
  reqBody2:
    ", las {skins} de un mob simplemente no aparecen configuradas como opción (no rompe nada — el mob se ve vanilla normal).",
  skinsLink: "skins visuales",

  philTitle: "Un mob es una composición de sistemas independientes",
  philBody:
    "Cada {def} es un registro ({record}) que junta 21 componentes: identidad, modelo, stats, resistencias, debilidades, IA, skills, triggers, fases, loot, bossbar, diálogos, reglas de spawn y datos custom. Ningún componente es obligatorio salvo {id} y {baseType} — todo lo demás tiene un valor por defecto razonable.",
  recordWord: "record",

  aiTitle: "IA simulada, no vanilla",
  aiBody:
    "Bukkit/Paper no expone el sistema real de {pathfindingGoals} de Minecraft (es interno de NMS). En vez de usar reflection, cada mob RPGRoll arranca con {setAware} — apaga {all} la IA vanilla — y una tarea propia ({task}) corre cada 10 ticks evaluando sus {goals} en orden de prioridad, moviéndolo con {moveTo} y {setTarget}.",
  pathfindingGoals: "pathfinding-goals",
  allWord: "toda",
  thGoal: "Goal",
  thWhat: "Qué hace",
  gAttack:
    "Busca al jugador survival/adventure más cercano dentro del rango de aggro, lo persigue y ataca cuerpo a cuerpo.",
  gFlee: "Si la vida cae debajo de {pct}, huye en dirección opuesta a su objetivo actual.",
  gPatrol: "Recorre {points} (lista de coordenadas {xyz}) en orden, ciclando.",
  gGuard: "Si sale de la región indicada en {region}, vuelve caminando a su centro.",
  gDefend: "Si un mob de la misma definición cerca tiene target, ese mob también ataca a ese jugador.",
  gFollow: "Sigue al mob más cercano de la misma definición.",
  gStay:
    "No hace nada — útil como último goal de la lista, o para mobs puramente decorativos/comerciantes.",
  goalTip:
    "Los goals se evalúan {inOrder} en {goals} — el primero que aplica ese tick gana. Un mob con {example} prioriza huir sobre pelear en cuanto cruza el umbral de vida.",
  inOrderWord: "en el orden en que aparecen",

  combatTitle: "Motor de combate",
  combatIntro: "Los stats se aplican de verdad, no son solo cosmética:",
  liAttrs: "{names} — se mapean a atributos vanilla reales ({attrs}) al spawnear.",
  attrNames: "health / speed / armor / knockback_resistance",
  liDamage:
    "{names} — se resuelven en el propio ataque cuerpo a cuerpo del mob: {accuracy} es la chance de no fallar el golpe, {crit} aplican un multiplicador extra.",
  damageNames: "damage / accuracy / critical_chance / critical_damage",
  liDodge:
    "{name} — chance de anular por completo cualquier daño entrante (propio o de otro jugador/mob), evaluado antes de aplicar resistencias.",
  dodgeName: "dodge",
  liDefense: "{names} — reducción plana de daño, aplicada después del multiplicador elemental.",
  defenseNames: "defense / resistance",
  liRes:
    "{names} — % de reducción o de daño extra según el {cause} de Bukkit mapeado a un elemento (fire, water, ice, electric, poison, dark, magic, explosion, arrow).",
  resNames: "resistances / weaknesses",
  tickTitle: "El daño se resuelve un tick después",
  tickBody:
    "Cuando un mob recibe daño, el listener ajusta el daño del evento en el momento (esquive/resistencias), pero el chequeo de transición de fase y el trigger {damaged} se agendan para el próximo tick — recién ahí {getHealth} refleja la vida ya restada por Bukkit.",

  m3dTitle: "Modelos 3D animados (FreeMinecraftModels)",
  m3dBody:
    "{field} es el id de un modelo de {fmm} (FMM, de MagmaGuy, gratis y GPLv3): el nombre de su {bbmodel} en {dir}. Con FMM instalado, el mob se vuelve invisible y el modelo lo sigue y se anima; la entidad vanilla sigue siendo la que pelea (hitbox, IA, vida). Sin FMM el campo se ignora y el mob se ve vanilla: la integración es blanda.",
  fmmName: "FreeMinecraftModels",
  thAnimation: "Animación",
  thWho: "Quién la lanza",
  anSpawn: "FMM, solo (al aparecer, quieto, caminando).",
  anAttack:
    "RPGRoll-Mobs, cuando el mob golpea — salvo que una skill acabe de lanzar otra animación (1,5 s de margen, para no pisarla).",
  anDeath: "RPGRoll-Mobs, al morir; el modelo se retira al acabarla.",
  anOtherLabel: "cualquier otra",
  anOther: "La acción {animation} de una skill o trigger ({value}: el nombre; {loop} la repite).",
  m3dFile: "un jefe con modelo 3D (fragmento)",
  scaleTitle: "El modelo se diseña al tamaño del mob base",
  scaleBody:
    "FMM multiplica el modelo por el atributo {scale} de la entidad, igual que Minecraft hace con su caja de golpes. Si el modelo mide lo mismo que el mob vanilla a escala 1, con cualquier {modelScale} seguirán encajando. El nombre del mob se muestra en el hueso {tag} del modelo, no sobre la entidad invisible. Para los jugadores de Bedrock, FMM genera también un pack que reparte ResourcePackManager a Geyser.",

  reskinTitle: "Skins visuales (sin ModelEngine/BetterModel)",
  reskinBody:
    "Minecraft no tiene ningún equivalente a {cmd} para entidades vivas — no hay forma de re-texturizar un mob vanilla solo con un resource pack. RPGRoll-Mobs implementa el mismo truco que usan plugins como ModelEngine, pero desde cero y sin esa dependencia: la entidad vanilla real sigue siendo la que pelea/camina (hitbox, IA, pathfinding intactos), pero se le monta una entidad {display} como pasajero real, portando un ítem con {cmdLower}. Combinado con {invisible}, el jugador solo ve el modelo custom, nunca la entidad vanilla debajo.",
  reskinBody2:
    "{skins} es una {list}, no un valor único: al spawnear el mob se sortea una skin por peso ({weight}, mayor = más probable) y esa elección queda persistida en la entidad — un reinicio del server o una recarga de chunk nunca le cambia la apariencia a un mob ya vivo (no vuelve a sortear). Lista vacía (o sin la sección) = sin reskin, mob vanilla normal.",
  listWord: "lista",
  reskinFile: "mobs/bosses/reference_full.yml (fragmento)",
  reskinBody3:
    "Con este ejemplo, un mob nuevo tiene 2/3 de chance de nacer “molten” y 1/3 “obsidian”. El material y el número de {cmd} los define un resource pack real — el mismo pipeline que ya usa RPGRoll-Items: pon el modelo/textura en {path} y, si SackResourcePack está instalado, se sincroniza solo al arrancar el plugin.",
  editorBody:
    "Desde {cmd} → Modelo → Skins se administra la lista sin tocar el YAML a mano: agregar pide {fmt} por chat, shift-click sobre una entrada existente la quita.",
  untestedTitle: "Solo verificado por compilación, no probado en juego",
  untestedBody:
    "Esta primera versión de las skins no fue probada visualmente contra un cliente real de Minecraft (sin servidor Paper disponible en el entorno de desarrollo) — la lógica de sorteo/montaje/persistencia/limpieza está completa, pero conviene probarla en un server de pruebas antes de usarla en producción.",

  phasesTitle: "Fases de jefe",
  phasesBody:
    "Cada {phase} tiene un {threshold}: al cruzar ese % de vida hacia abajo, se activa la fase con umbral más bajo entre las ya cruzadas (la más profunda en el combate). Las fases son {additive}: las skills de una fase se suman a las que el mob ya tenía, no las reemplazan. Además puede sobreescribir color/título de la bossbar, disparar una línea de diálogo, y cambiar la partícula de aura.",
  additiveWord: "aditivas",

  lootTitle: "Loot",
  lootBody:
    "Cada entrada tiene {type} ({badges}), cantidad mín/máx, probabilidad, nivel mínimo requerido, y {scope}:",
  liShared: "{name} — se sortea una sola vez, entregado a quien dio el golpe final.",
  sharedName: "SHARED",
  liPerPlayer:
    "{name} — se sortea una vez {perEach} que contribuyó daño (trackeado en memoria mientras el mob está vivo — no persiste a través de un reinicio del server).",
  perPlayerName: "PER_PLAYER",
  perEachPlayer: "por cada jugador",

  yamlTitle: "Formato del archivo YAML",
  yamlIntro:
    "Se cargan recursivamente desde {path} (admite subcarpetas por categoría). Ejemplo de un mob normal:",
  bossIntro: "Un mini-jefe agrega {fields} (acciones directas por evento, sin pasar por el sistema de skills):",
  bossFile: "mobs/bosses/ash_colossus.yml (fragmento)",
  refTitle: "Referencia completa: todos los campos en un solo archivo",
  refBody:
    "{file} (incluido en el jar) usa absolutamente todos los campos de un mob: modelo, stats, resistencias, debilidades, IA, skills, los 12 triggers, fases, los 5 tipos de loot, bossbar, diálogos y reglas de spawn.",

  skillsTitle: "Skills, triggers y condiciones",
  skillsBody:
    "Una skill tiene {trigger} (o ninguno, si es pasiva), {cooldown}, {chance} de disparar, una lista de {conditions} (expresiones simples tipo {exprs}) y una lista de {actions}.",
  thTrigger: "Trigger",
  thWhen: "Cuándo dispara",
  tSpawn: "Al crear/morir el mob.",
  tDamaged: "Al recibir daño / al golpear cuerpo a cuerpo.",
  tPhase: "Al entrar a una nueva fase.",
  tLoseTarget: "Cuando pierde de vista a su objetivo actual.",
  tEnterRange: "La primera vez que un jugador entra a su rango de aggro.",
  tPeriodic: "Cada pocos segundos, mientras esté vivo.",
  actionsBody: "Acciones incorporadas: {list} — cada una con sus propios parámetros por {kv}.",

  bMob: "Constructor visual: Mob",
  bMobDesc:
    "Identidad, modelo, stats/resistencias e IA básica. Skins, skills, triggers, phases, loot, bossbar, diálogos y spawn-rules son demasiado anidados para este formulario — usa /mobadmin editor o copia uno de los ejemplos de arriba.",

  spawnTitle: "Reglas de spawn natural",
  spawnBody:
    "Con {flag}, el addon intercepta el {event} vanilla: si el tipo de entidad y el contexto (bioma, mundo, región, altura, rango horario, clima, distancia mínima a jugadores) calzan con alguna definición, cancela el spawn vanilla y crea el mob RPGRoll en su lugar — eligiendo por peso ({weight}) si varias definiciones compiten por el mismo tipo de entidad.",

  regionsTitle: "Regiones de mob (MobRegion)",
  regionsBody:
    "Un cuboide propio (sin WorldGuard), igual que en RPGRoll-Quests: sirve como {guardRegion} para el goal {goal} y como filtro de {filter}.",
  regionsNote: "{dir} incluye archivos de ejemplo ({files}) listos para usar o copiar como base.",
  bRegion: "Constructor visual: Mob Region",

  sizeTitle: "Tamaño aleatorio de los mobs",
  sizeBody:
    "Con {flag} en el {config}, cada mob que aparece sale con un tamaño distinto (atributo {scale}): vacas un poco más grandes o más pequeñas, algún zombi enorme. Vale para los mobs {vanilla} y para los de {rpgroll}. El tamaño se guarda con la entidad como modificador de atributo, así que sobrevive a reinicios y no se vuelve a tirar al recargar el chunk.",
  vanillaWord: "vanilla",
  rpgrollWord: "RPGRoll",
  liDist:
    "El tamaño sale de una distribución triangular dentro del rango de su categoría (pasivo, neutral u hostil): los tamaños del medio son los más comunes. Con {chance} % sale un mini o un gigante fuera del rango.",
  liStats:
    "La vida, el daño, la velocidad, la experiencia y el botín siguen al tamaño según su peso en {stats}: {formula}. Con {speed} los grandes son algo más lentos. El botín solo multiplica lo apilable, nunca el equipo puesto.",
  sizeFormula: "1 + (tamaño − 1) × peso",
  liHeight:
    "Un hostil alto (zombi, esqueleto…) nunca baja de {min} bloques, para que no se cuele por huecos de un bloque que antes le cerraban el paso. Las arañas y los slimes sí pueden encoger.",
  liExcluded:
    "No cambian: mobs vanilla con nombre, mascotas domadas, los tipos de {exclude}, los que aparecen por un motivo fuera de {reasons} (por ejemplo {summon}, que es {command}) y los mundos de {worlds}.",
  liRpgroll:
    "Mobs de RPGRoll: el tamaño se multiplica sobre su {modelScale} y su vida; su ataque propio (stat {damage}) también sigue al peso de daño. Los jefes nunca cambian, ni los que llevan modelo 3D salvo {modeled} (el modelo no sigue al tamaño). Un mob concreto se queda fuera con {customData} o tiene rango propio en {types} como {typeId}.",
  configNote:
    "{cmd} relee también el {config}: el cambio vale para los mobs que aparezcan desde ese momento; los que ya existían conservan su tamaño.",

  guiTitle: "GUI: navegador y editor",
  guiBody:
    "{browser} abre un navegador paginado con búsqueda y filtro por categoría. Click sobre un mob abre el editor completo, con un botón por componente:",
  liGuiIdentity:
    "Identidad, Modelo, Stats, Resistencias/Debilidades — edición directa con clicks (+1/+10, alternar, ciclar) y prompts de chat para texto.",
  liGuiAi:
    "IA — activar/desactivar goals, ajustar rango/huida/velocidad, gestionar puntos de patrulla y región a proteger.",
  liGuiSkills: "Skills y Triggers — lista de acciones por evento, alta rápida con sintaxis {fmt} por chat.",
  liGuiPhases: "Fases — umbral de vida, multiplicadores de stat, y qué skills ya existentes se suman en esa fase.",
  liGuiLoot: "Loot, BossBar, Diálogos, Reglas de spawn, Datos custom.",
  noHistoryTitle: "Sin historial, versionado ni import/export",
  noHistoryBody:
    "A diferencia de lo que se planteó originalmente, este editor no guarda versiones anteriores ni permite importar/exportar definiciones — cada “Guardar” sobreescribe el YAML en disco directamente.",

  cmdTitle: "Comandos",
  thCommand: "Comando",
  xSpawn: "Invoca un mob en la ubicación del jugador indicado (o la tuya).",
  xList: "Lista definiciones cargadas, opcionalmente filtradas.",
  xInfo: "Muestra stats y componentes resumidos de una definición.",
  xReload: "Recarga el config.yml y todas las definiciones desde disco.",
  xKillall: "Elimina todos los mobs activos, opcionalmente de una sola definición.",
  xCreate: "Crea un mob base y abre el editor directo.",
  xBrowser: "Abre el navegador gráfico.",
  xEditor: "Abre el editor gráfico directo sobre una definición.",
  permNote: "Todos requieren {perm} (default: op).",

  phTitle: "Placeholders (PlaceholderAPI)",
  phIntro:
    "Expansión {exp} — a diferencia de los demás addons, la mayoría son globales al servidor (conteos), no por jugador. La excepción es {nearest}, que busca el mob RPGRoll vivo más cercano al jugador (hasta 64 bloques) en su mismo mundo.",
  thPlaceholder: "Placeholder",
  thValue: "Valor",
  pActive: "Mobs RPGRoll vivos ahora mismo, en todos los mundos.",
  pActiveCat: "Igual, filtrado por categoría (NORMAL, MINI_BOSS, etc.).",
  pDefs: "Cantidad de definiciones de mob cargadas.",
  pNearestName: "Nombre del mob RPGRoll más cercano al jugador.",
  pNearestHealth: "Su vida actual/máxima.",
  pNearestDistance: "Distancia en bloques.",

  mfId: "Id",
  mfCategory: "Categoría",
  mfDisplayName: "Nombre visible",
  mfBaseEntity: "Tipo de entidad base (Bukkit)",
  mfLevel: "Nivel",
  mfRarity: "Rareza (id)",
  mfTags: "Tags",
  mfDescription: "Descripción",
  mfModel: "Modelo",
  mfScale: "Escala",
  mfGlow: "Brillo",
  mfInvisible: "Invisible",
  mfStats: "Stats",
  mfResistances: "Resistencias",
  mfAi: "IA",
  mfGoals: "Goals (orden de prioridad)",
  mfAggro: "Rango de aggro",
  mfFlee: "% de vida para huir",
  mfMoveSpeed: "Velocidad de movimiento",

  rfId: "Id",
  rfWorld: "Mundo",
  rfMin: "Esquina mínima",
  rfMax: "Esquina máxima",
};

export type MobsCopy = typeof es;

const en: MobsCopy = {
  title: "Mobs and bosses (RPGRoll-Mobs)",
  intro:
    "A custom creature engine: normal mobs, mini-bosses and bosses with phases, its own AI, resistances, loot with chance rolls and bossbar/dialogue — all defined in YAML, with a graphical editor included.",

  scopeTitle: "Scope of this first version: the PvE core, in depth",
  scopeBody:
    "RPGRoll-Mobs prioritizes real depth in mob definition, the combat engine, behavior and boss phases. To look different it has two paths: animated 3D models with FreeMinecraftModels (free, optional — see {models3d}) or static skins with no dependency at all via {skins}. It does not integrate with ModelEngine/BetterModel or WorldGuard/WorldEdit.",
  models3dLink: "3D models",

  reqTitle: "Requirements",
  reqBody1:
    "Without RPGRoll-Items or RPGRoll-Quests installed, everything still works: a mob's equipment falls back to a plain vanilla {material}, {item} loot does too, and {quest} loot simply does nothing. Without",
  reqBody2:
    ", a mob's {skins} simply do not appear as a configurable option (nothing breaks — the mob looks normally vanilla).",
  skinsLink: "visual skins",

  philTitle: "A mob is a composition of independent systems",
  philBody:
    "Each {def} is a {record} that brings together 21 components: identity, model, stats, resistances, weaknesses, AI, skills, triggers, phases, loot, bossbar, dialogue, spawn rules and custom data. No component is required except {id} and {baseType} — everything else has a reasonable default.",
  recordWord: "record",

  aiTitle: "Simulated AI, not vanilla",
  aiBody:
    "Bukkit/Paper does not expose Minecraft's real {pathfindingGoals} system (it is internal to NMS). Instead of using reflection, every RPGRoll mob starts with {setAware} — turning off {all} vanilla AI — and a task of its own ({task}) runs every 10 ticks evaluating its {goals} in priority order, moving it with {moveTo} and {setTarget}.",
  pathfindingGoals: "pathfinding goals",
  allWord: "all",
  thGoal: "Goal",
  thWhat: "What it does",
  gAttack:
    "Finds the nearest survival/adventure player within aggro range, chases them and attacks in melee.",
  gFlee: "If health drops below {pct}, it flees in the opposite direction from its current target.",
  gPatrol: "Walks {points} (a list of {xyz} coordinates) in order, cycling.",
  gGuard: "If it leaves the region named in {region}, it walks back to its center.",
  gDefend: "If a nearby mob of the same definition has a target, this mob attacks that player too.",
  gFollow: "Follows the nearest mob of the same definition.",
  gStay:
    "Does nothing — useful as the last goal in the list, or for purely decorative/merchant mobs.",
  goalTip:
    "Goals are evaluated {inOrder} in {goals} — the first one that applies that tick wins. A mob with {example} prioritizes fleeing over fighting as soon as it crosses the health threshold.",
  inOrderWord: "in the order they appear",

  combatTitle: "Combat engine",
  combatIntro: "The stats really apply, they are not just cosmetic:",
  liAttrs: "{names} — mapped to real vanilla attributes ({attrs}) on spawn.",
  attrNames: "health / speed / armor / knockback_resistance",
  liDamage:
    "{names} — resolved in the mob's own melee attack: {accuracy} is the chance not to miss, {crit} apply an extra multiplier.",
  damageNames: "damage / accuracy / critical_chance / critical_damage",
  liDodge:
    "{name} — the chance to completely negate any incoming damage (its own or from another player/mob), evaluated before resistances are applied.",
  dodgeName: "dodge",
  liDefense: "{names} — flat damage reduction, applied after the elemental multiplier.",
  defenseNames: "defense / resistance",
  liRes:
    "{names} — % reduction or extra damage based on Bukkit's {cause} mapped to an element (fire, water, ice, electric, poison, dark, magic, explosion, arrow).",
  resNames: "resistances / weaknesses",
  tickTitle: "Damage resolves one tick later",
  tickBody:
    "When a mob takes damage, the listener adjusts the event's damage right then (dodge/resistances), but the phase-transition check and the {damaged} trigger are scheduled for the next tick — only then does {getHealth} reflect the health Bukkit already subtracted.",

  m3dTitle: "Animated 3D models (FreeMinecraftModels)",
  m3dBody:
    "{field} is the id of a {fmm} model (FMM, by MagmaGuy, free and GPLv3): the name of its {bbmodel} in {dir}. With FMM installed, the mob turns invisible and the model follows and animates it; the vanilla entity is still the one that fights (hitbox, AI, health). Without FMM the field is ignored and the mob looks vanilla: the integration is soft.",
  fmmName: "FreeMinecraftModels",
  thAnimation: "Animation",
  thWho: "Who plays it",
  anSpawn: "FMM, on its own (on appearing, standing still, walking).",
  anAttack:
    "RPGRoll-Mobs, when the mob hits — unless a skill just played another animation (a 1.5 s margin, so as not to clobber it).",
  anDeath: "RPGRoll-Mobs, on death; the model is removed when it finishes.",
  anOtherLabel: "any other",
  anOther: "A skill's or trigger's {animation} action ({value}: the name; {loop} repeats it).",
  m3dFile: "a boss with a 3D model (excerpt)",
  scaleTitle: "The model is designed at the base mob's size",
  scaleBody:
    "FMM multiplies the model by the entity's {scale} attribute, the same way Minecraft does with its hitbox. If the model is the same size as the vanilla mob at scale 1, they will keep matching at any {modelScale}. The mob's name is shown on the model's {tag} bone, not above the invisible entity. For Bedrock players, FMM also generates a pack that ResourcePackManager hands to Geyser.",

  reskinTitle: "Visual skins (no ModelEngine/BetterModel)",
  reskinBody:
    "Minecraft has no equivalent of {cmd} for living entities — there is no way to re-texture a vanilla mob with a resource pack alone. RPGRoll-Mobs implements the same trick plugins like ModelEngine use, but from scratch and without that dependency: the real vanilla entity is still the one that fights/walks (hitbox, AI, pathfinding untouched), but an {display} entity is mounted on it as a real passenger, carrying an item with {cmdLower}. Combined with {invisible}, the player only sees the custom model, never the vanilla entity underneath.",
  reskinBody2:
    "{skins} is a {list}, not a single value: when the mob spawns a skin is rolled by weight ({weight}, higher = more likely) and that choice is persisted on the entity — a server restart or a chunk reload never changes the appearance of an already-living mob (it does not re-roll). An empty list (or no section at all) = no reskin, a normal vanilla mob.",
  listWord: "list",
  reskinFile: "mobs/bosses/reference_full.yml (excerpt)",
  reskinBody3:
    "With this example, a new mob has a 2/3 chance of being born “molten” and 1/3 “obsidian”. The material and the {cmd} number are defined by a real resource pack — the same pipeline RPGRoll-Items already uses: put the model/texture in {path} and, if SackResourcePack is installed, it syncs itself when the plugin starts.",
  editorBody:
    "From {cmd} → Model → Skins the list is managed without touching the YAML by hand: adding asks for {fmt} via chat, shift-clicking an existing entry removes it.",
  untestedTitle: "Only verified by compiling, not tested in game",
  untestedBody:
    "This first version of the skins was not visually tested against a real Minecraft client (no Paper server available in the development environment) — the roll/mount/persist/cleanup logic is complete, but it is worth testing on a staging server before using it in production.",

  phasesTitle: "Boss phases",
  phasesBody:
    "Each {phase} has a {threshold}: on crossing that health % downward, the phase with the lowest threshold among those already crossed activates (the deepest one in the fight). Phases are {additive}: a phase's skills are added to the ones the mob already had, they do not replace them. It can also override the bossbar's color/title, fire a line of dialogue, and change the aura particle.",
  additiveWord: "additive",

  lootTitle: "Loot",
  lootBody:
    "Each entry has a {type} ({badges}), min/max amount, chance, minimum required level, and a {scope}:",
  liShared: "{name} — rolled once, given to whoever landed the final blow.",
  sharedName: "SHARED",
  liPerPlayer:
    "{name} — rolled once {perEach} who contributed damage (tracked in memory while the mob is alive — it does not persist across a server restart).",
  perPlayerName: "PER_PLAYER",
  perEachPlayer: "for each player",

  yamlTitle: "YAML file format",
  yamlIntro:
    "They are loaded recursively from {path} (subfolders per category are allowed). Example of a normal mob:",
  bossIntro: "A mini-boss adds {fields} (direct per-event actions, without going through the skill system):",
  bossFile: "mobs/bosses/ash_colossus.yml (excerpt)",
  refTitle: "Full reference: every field in a single file",
  refBody:
    "{file} (shipped in the jar) uses absolutely every field of a mob: model, stats, resistances, weaknesses, AI, skills, the 12 triggers, phases, the 5 loot types, bossbar, dialogue and spawn rules.",

  skillsTitle: "Skills, triggers and conditions",
  skillsBody:
    "A skill has a {trigger} (or none, if it is passive), a {cooldown}, a {chance} to fire, a list of {conditions} (simple expressions like {exprs}) and a list of {actions}.",
  thTrigger: "Trigger",
  thWhen: "When it fires",
  tSpawn: "On creating/killing the mob.",
  tDamaged: "On taking damage / on hitting in melee.",
  tPhase: "On entering a new phase.",
  tLoseTarget: "When it loses sight of its current target.",
  tEnterRange: "The first time a player enters its aggro range.",
  tPeriodic: "Every few seconds, while it is alive.",
  actionsBody: "Built-in actions: {list} — each with its own parameters via {kv}.",

  bMob: "Visual builder: Mob",
  bMobDesc:
    "Identity, model, stats/resistances and basic AI. Skins, skills, triggers, phases, loot, bossbar, dialogue and spawn-rules are too deeply nested for this form — use /mobadmin editor or copy one of the examples above.",

  spawnTitle: "Natural spawn rules",
  spawnBody:
    "With {flag}, the addon intercepts the vanilla {event}: if the entity type and the context (biome, world, region, height, time range, weather, minimum distance to players) match a definition, it cancels the vanilla spawn and creates the RPGRoll mob in its place — choosing by weight ({weight}) if several definitions compete for the same entity type.",

  regionsTitle: "Mob regions (MobRegion)",
  regionsBody:
    "A cuboid of its own (no WorldGuard), same as in RPGRoll-Quests: it serves as the {guardRegion} for the {goal} goal and as a {filter} filter.",
  regionsNote: "{dir} ships example files ({files}) ready to use or copy as a base.",
  bRegion: "Visual builder: Mob Region",

  sizeTitle: "Random mob size",
  sizeBody:
    "With {flag} in the {config}, every mob that appears comes out at a different size (the {scale} attribute): cows a bit bigger or smaller, the odd enormous zombie. It applies to {vanilla} mobs and to {rpgroll} ones. The size is stored with the entity as an attribute modifier, so it survives restarts and is not re-rolled when the chunk reloads.",
  vanillaWord: "vanilla",
  rpgrollWord: "RPGRoll",
  liDist:
    "The size comes from a triangular distribution within its category's range (passive, neutral or hostile): mid sizes are the most common. With {chance} % a mini or a giant comes out beyond the range.",
  liStats:
    "Health, damage, speed, experience and loot follow the size according to their weight in {stats}: {formula}. With {speed} the big ones are somewhat slower. Loot only multiplies stackables, never worn equipment.",
  sizeFormula: "1 + (size − 1) × weight",
  liHeight:
    "A tall hostile (zombie, skeleton…) never drops below {min} blocks, so it cannot slip through one-block gaps that used to block it. Spiders and slimes can shrink.",
  liExcluded:
    "Unchanged: named vanilla mobs, tamed pets, the types in {exclude}, those spawning for a reason outside {reasons} (for example {summon}, which is {command}) and the worlds in {worlds}.",
  liRpgroll:
    "RPGRoll mobs: the size multiplies over their {modelScale} and their health; their own attack (the {damage} stat) also follows the damage weight. Bosses never change, nor do those with a 3D model unless {modeled} (the model does not follow the size). A specific mob opts out with {customData} or has its own range in {types} like {typeId}.",
  configNote:
    "{cmd} also re-reads the {config}: the change applies to mobs appearing from that moment on; those already alive keep their size.",

  guiTitle: "GUI: browser and editor",
  guiBody:
    "{browser} opens a paginated browser with search and a category filter. Clicking a mob opens the full editor, with one button per component:",
  liGuiIdentity:
    "Identity, Model, Stats, Resistances/Weaknesses — direct editing with clicks (+1/+10, toggle, cycle) and chat prompts for text.",
  liGuiAi:
    "AI — enable/disable goals, tune range/flee/speed, manage patrol points and the region to guard.",
  liGuiSkills: "Skills and Triggers — a per-event action list, with quick entry using {fmt} syntax via chat.",
  liGuiPhases: "Phases — health threshold, stat multipliers, and which existing skills are added in that phase.",
  liGuiLoot: "Loot, BossBar, Dialogue, Spawn rules, Custom data.",
  noHistoryTitle: "No history, versioning or import/export",
  noHistoryBody:
    "Unlike what was originally proposed, this editor does not keep previous versions nor allow importing/exporting definitions — every “Save” overwrites the YAML on disk directly.",

  cmdTitle: "Commands",
  thCommand: "Command",
  xSpawn: "Summons a mob at the given player's location (or yours).",
  xList: "Lists loaded definitions, optionally filtered.",
  xInfo: "Shows a definition's stats and a summary of its components.",
  xReload: "Reloads config.yml and every definition from disk.",
  xKillall: "Removes every active mob, optionally from a single definition.",
  xCreate: "Creates a base mob and opens the editor directly.",
  xBrowser: "Opens the graphical browser.",
  xEditor: "Opens the graphical editor directly on a definition.",
  permNote: "All of them require {perm} (default: op).",

  phTitle: "Placeholders (PlaceholderAPI)",
  phIntro:
    "The {exp} expansion — unlike the other addons, most are server-global (counts), not per player. The exception is {nearest}, which finds the closest living RPGRoll mob to the player (up to 64 blocks) in their own world.",
  thPlaceholder: "Placeholder",
  thValue: "Value",
  pActive: "RPGRoll mobs alive right now, across all worlds.",
  pActiveCat: "Same, filtered by category (NORMAL, MINI_BOSS, etc.).",
  pDefs: "How many mob definitions are loaded.",
  pNearestName: "The name of the RPGRoll mob closest to the player.",
  pNearestHealth: "Its current/max health.",
  pNearestDistance: "Distance in blocks.",

  mfId: "Id",
  mfCategory: "Category",
  mfDisplayName: "Display name",
  mfBaseEntity: "Base entity type (Bukkit)",
  mfLevel: "Level",
  mfRarity: "Rarity (id)",
  mfTags: "Tags",
  mfDescription: "Description",
  mfModel: "Model",
  mfScale: "Scale",
  mfGlow: "Glow",
  mfInvisible: "Invisible",
  mfStats: "Stats",
  mfResistances: "Resistances",
  mfAi: "AI",
  mfGoals: "Goals (priority order)",
  mfAggro: "Aggro range",
  mfFlee: "Health % to flee",
  mfMoveSpeed: "Movement speed",

  rfId: "Id",
  rfWorld: "World",
  rfMin: "Minimum corner",
  rfMax: "Maximum corner",
};

const pt: MobsCopy = {
  title: "Mobs e chefes (RPGRoll-Mobs)",
  intro:
    "Motor de criaturas personalizadas: mobs normais, minichefes e chefes com fases, IA própria, resistências, loot com probabilidade e bossbar/diálogos — tudo definido em YAML, com editor gráfico incluído.",

  scopeTitle: "Escopo desta primeira versão: núcleo PvE a fundo",
  scopeBody:
    "O RPGRoll-Mobs prioriza profundidade real na definição de mob, motor de combate, comportamento e fases de chefe. Para parecer diferente tem dois caminhos: modelos 3D animados com FreeMinecraftModels (grátis, opcional — ver {models3d}) ou skins estáticas sem nenhuma dependência com {skins}. Não integra com ModelEngine/BetterModel nem WorldGuard/WorldEdit.",
  models3dLink: "Modelos 3D",

  reqTitle: "Requisitos",
  reqBody1:
    "Sem RPGRoll-Items nem RPGRoll-Quests instalados, tudo continua funcionando: o equipamento de um mob cai para {material} vanilla direto, o loot do tipo {item} também, e o loot do tipo {quest} simplesmente não faz nada. Sem",
  reqBody2:
    ", as {skins} de um mob simplesmente não aparecem configuradas como opção (não quebra nada — o mob fica com aparência vanilla normal).",
  skinsLink: "skins visuais",

  philTitle: "Um mob é uma composição de sistemas independentes",
  philBody:
    "Cada {def} é um registro ({record}) que junta 21 componentes: identidade, modelo, stats, resistências, fraquezas, IA, skills, triggers, fases, loot, bossbar, diálogos, regras de spawn e dados customizados. Nenhum componente é obrigatório salvo {id} e {baseType} — todo o resto tem um valor padrão razoável.",
  recordWord: "record",

  aiTitle: "IA simulada, não vanilla",
  aiBody:
    "O Bukkit/Paper não expõe o sistema real de {pathfindingGoals} do Minecraft (é interno do NMS). Em vez de usar reflection, cada mob RPGRoll começa com {setAware} — desliga {all} a IA vanilla — e uma tarefa própria ({task}) roda a cada 10 ticks avaliando os seus {goals} em ordem de prioridade, movendo-o com {moveTo} e {setTarget}.",
  pathfindingGoals: "pathfinding-goals",
  allWord: "toda",
  thGoal: "Goal",
  thWhat: "O que faz",
  gAttack:
    "Busca o jogador survival/adventure mais próximo dentro do alcance de aggro, o persegue e ataca corpo a corpo.",
  gFlee: "Se a vida cair abaixo de {pct}, foge na direção oposta ao seu alvo atual.",
  gPatrol: "Percorre {points} (lista de coordenadas {xyz}) em ordem, ciclando.",
  gGuard: "Se sair da região indicada em {region}, volta caminhando ao centro dela.",
  gDefend: "Se um mob da mesma definição por perto tiver alvo, esse mob também ataca aquele jogador.",
  gFollow: "Segue o mob mais próximo da mesma definição.",
  gStay:
    "Não faz nada — útil como último goal da lista, ou para mobs puramente decorativos/comerciantes.",
  goalTip:
    "Os goals são avaliados {inOrder} em {goals} — o primeiro que se aplica naquele tick ganha. Um mob com {example} prioriza fugir em vez de lutar assim que cruza o limite de vida.",
  inOrderWord: "na ordem em que aparecem",

  combatTitle: "Motor de combate",
  combatIntro: "Os stats se aplicam de verdade, não são só cosmética:",
  liAttrs: "{names} — são mapeados para atributos vanilla reais ({attrs}) ao spawnar.",
  attrNames: "health / speed / armor / knockback_resistance",
  liDamage:
    "{names} — são resolvidos no próprio ataque corpo a corpo do mob: {accuracy} é a chance de não errar o golpe, {crit} aplicam um multiplicador extra.",
  damageNames: "damage / accuracy / critical_chance / critical_damage",
  liDodge:
    "{name} — chance de anular por completo qualquer dano recebido (próprio ou de outro jogador/mob), avaliado antes de aplicar resistências.",
  dodgeName: "dodge",
  liDefense: "{names} — redução plana de dano, aplicada depois do multiplicador elemental.",
  defenseNames: "defense / resistance",
  liRes:
    "{names} — % de redução ou de dano extra conforme o {cause} do Bukkit mapeado para um elemento (fire, water, ice, electric, poison, dark, magic, explosion, arrow).",
  resNames: "resistances / weaknesses",
  tickTitle: "O dano é resolvido um tick depois",
  tickBody:
    "Quando um mob recebe dano, o listener ajusta o dano do evento na hora (esquiva/resistências), mas a checagem de transição de fase e o trigger {damaged} são agendados para o próximo tick — só aí {getHealth} reflete a vida já subtraída pelo Bukkit.",

  m3dTitle: "Modelos 3D animados (FreeMinecraftModels)",
  m3dBody:
    "{field} é o id de um modelo do {fmm} (FMM, do MagmaGuy, grátis e GPLv3): o nome do seu {bbmodel} em {dir}. Com o FMM instalado, o mob fica invisível e o modelo o segue e se anima; a entidade vanilla continua sendo a que luta (hitbox, IA, vida). Sem o FMM o campo é ignorado e o mob fica vanilla: a integração é branda.",
  fmmName: "FreeMinecraftModels",
  thAnimation: "Animação",
  thWho: "Quem a dispara",
  anSpawn: "FMM, sozinho (ao aparecer, parado, caminhando).",
  anAttack:
    "RPGRoll-Mobs, quando o mob golpeia — salvo se uma skill acabou de disparar outra animação (1,5 s de margem, para não atropelá-la).",
  anDeath: "RPGRoll-Mobs, ao morrer; o modelo é retirado ao terminá-la.",
  anOtherLabel: "qualquer outra",
  anOther: "A ação {animation} de uma skill ou trigger ({value}: o nome; {loop} a repete).",
  m3dFile: "um chefe com modelo 3D (fragmento)",
  scaleTitle: "O modelo é desenhado no tamanho do mob base",
  scaleBody:
    "O FMM multiplica o modelo pelo atributo {scale} da entidade, igual ao que o Minecraft faz com a caixa de golpes. Se o modelo tiver o mesmo tamanho do mob vanilla na escala 1, com qualquer {modelScale} continuarão encaixando. O nome do mob é mostrado no osso {tag} do modelo, não sobre a entidade invisível. Para os jogadores de Bedrock, o FMM gera também um pack que o ResourcePackManager entrega ao Geyser.",

  reskinTitle: "Skins visuais (sem ModelEngine/BetterModel)",
  reskinBody:
    "O Minecraft não tem nenhum equivalente a {cmd} para entidades vivas — não há como re-texturizar um mob vanilla só com um resource pack. O RPGRoll-Mobs implementa o mesmo truque que plugins como o ModelEngine usam, mas do zero e sem essa dependência: a entidade vanilla real continua sendo a que luta/caminha (hitbox, IA, pathfinding intactos), mas uma entidade {display} é montada nela como passageiro real, portando um item com {cmdLower}. Combinado com {invisible}, o jogador só vê o modelo customizado, nunca a entidade vanilla por baixo.",
  reskinBody2:
    "{skins} é uma {list}, não um valor único: ao spawnar o mob, uma skin é sorteada por peso ({weight}, maior = mais provável) e essa escolha fica persistida na entidade — um reinício do servidor ou um recarregamento de chunk nunca muda a aparência de um mob já vivo (não sorteia de novo). Lista vazia (ou sem a seção) = sem reskin, mob vanilla normal.",
  listWord: "lista",
  reskinFile: "mobs/bosses/reference_full.yml (fragmento)",
  reskinBody3:
    "Com este exemplo, um mob novo tem 2/3 de chance de nascer “molten” e 1/3 “obsidian”. O material e o número de {cmd} são definidos por um resource pack real — o mesmo pipeline que o RPGRoll-Items já usa: coloque o modelo/textura em {path} e, se o SackResourcePack estiver instalado, ele se sincroniza sozinho ao iniciar o plugin.",
  editorBody:
    "Por {cmd} → Modelo → Skins a lista é administrada sem mexer no YAML à mão: adicionar pede {fmt} pelo chat, shift-clique sobre uma entrada existente a remove.",
  untestedTitle: "Verificado só por compilação, não testado no jogo",
  untestedBody:
    "Esta primeira versão das skins não foi testada visualmente contra um cliente real de Minecraft (sem servidor Paper disponível no ambiente de desenvolvimento) — a lógica de sorteio/montagem/persistência/limpeza está completa, mas convém testá-la num servidor de testes antes de usá-la em produção.",

  phasesTitle: "Fases de chefe",
  phasesBody:
    "Cada {phase} tem um {threshold}: ao cruzar essa % de vida para baixo, ativa-se a fase com o limite mais baixo entre as já cruzadas (a mais profunda no combate). As fases são {additive}: as skills de uma fase se somam às que o mob já tinha, não as substituem. Além disso pode sobrescrever cor/título da bossbar, disparar uma linha de diálogo, e mudar a partícula de aura.",
  additiveWord: "aditivas",

  lootTitle: "Loot",
  lootBody:
    "Cada entrada tem {type} ({badges}), quantidade mín/máx, probabilidade, nível mínimo exigido, e {scope}:",
  liShared: "{name} — é sorteado uma única vez, entregue a quem deu o golpe final.",
  sharedName: "SHARED",
  liPerPlayer:
    "{name} — é sorteado uma vez {perEach} que contribuiu com dano (rastreado em memória enquanto o mob está vivo — não persiste através de um reinício do servidor).",
  perPlayerName: "PER_PLAYER",
  perEachPlayer: "por cada jogador",

  yamlTitle: "Formato do arquivo YAML",
  yamlIntro:
    "São carregados recursivamente de {path} (aceita subpastas por categoria). Exemplo de um mob normal:",
  bossIntro: "Um minichefe adiciona {fields} (ações diretas por evento, sem passar pelo sistema de skills):",
  bossFile: "mobs/bosses/ash_colossus.yml (fragmento)",
  refTitle: "Referência completa: todos os campos num único arquivo",
  refBody:
    "{file} (incluído no jar) usa absolutamente todos os campos de um mob: modelo, stats, resistências, fraquezas, IA, skills, os 12 triggers, fases, os 5 tipos de loot, bossbar, diálogos e regras de spawn.",

  skillsTitle: "Skills, triggers e condições",
  skillsBody:
    "Uma skill tem {trigger} (ou nenhum, se for passiva), {cooldown}, {chance} de disparar, uma lista de {conditions} (expressões simples do tipo {exprs}) e uma lista de {actions}.",
  thTrigger: "Trigger",
  thWhen: "Quando dispara",
  tSpawn: "Ao criar/matar o mob.",
  tDamaged: "Ao receber dano / ao golpear corpo a corpo.",
  tPhase: "Ao entrar numa nova fase.",
  tLoseTarget: "Quando perde de vista o seu alvo atual.",
  tEnterRange: "A primeira vez que um jogador entra no seu alcance de aggro.",
  tPeriodic: "A cada poucos segundos, enquanto estiver vivo.",
  actionsBody: "Ações incorporadas: {list} — cada uma com os seus próprios parâmetros por {kv}.",

  bMob: "Construtor visual: Mob",
  bMobDesc:
    "Identidade, modelo, stats/resistências e IA básica. Skins, skills, triggers, phases, loot, bossbar, diálogos e spawn-rules são aninhados demais para este formulário — use /mobadmin editor ou copie um dos exemplos acima.",

  spawnTitle: "Regras de spawn natural",
  spawnBody:
    "Com {flag}, o addon intercepta o {event} vanilla: se o tipo de entidade e o contexto (bioma, mundo, região, altura, faixa horária, clima, distância mínima a jogadores) baterem com alguma definição, cancela o spawn vanilla e cria o mob RPGRoll no lugar — escolhendo por peso ({weight}) se várias definições competirem pelo mesmo tipo de entidade.",

  regionsTitle: "Regiões de mob (MobRegion)",
  regionsBody:
    "Um cuboide próprio (sem WorldGuard), igual ao RPGRoll-Quests: serve como {guardRegion} para o goal {goal} e como filtro de {filter}.",
  regionsNote: "{dir} inclui arquivos de exemplo ({files}) prontos para usar ou copiar como base.",
  bRegion: "Construtor visual: Mob Region",

  sizeTitle: "Tamanho aleatório dos mobs",
  sizeBody:
    "Com {flag} no {config}, cada mob que aparece sai com um tamanho diferente (atributo {scale}): vacas um pouco maiores ou menores, algum zumbi enorme. Vale para os mobs {vanilla} e para os do {rpgroll}. O tamanho é salvo com a entidade como modificador de atributo, então sobrevive a reinícios e não é sorteado de novo ao recarregar o chunk.",
  vanillaWord: "vanilla",
  rpgrollWord: "RPGRoll",
  liDist:
    "O tamanho sai de uma distribuição triangular dentro da faixa da sua categoria (passivo, neutro ou hostil): os tamanhos do meio são os mais comuns. Com {chance} % sai um mini ou um gigante fora da faixa.",
  liStats:
    "A vida, o dano, a velocidade, a experiência e o espólio seguem o tamanho conforme o seu peso em {stats}: {formula}. Com {speed} os grandes são um pouco mais lentos. O espólio só multiplica o que é empilhável, nunca o equipamento vestido.",
  sizeFormula: "1 + (tamanho − 1) × peso",
  liHeight:
    "Um hostil alto (zumbi, esqueleto…) nunca baixa de {min} blocos, para que não passe por vãos de um bloco que antes o barravam. As aranhas e os slimes podem encolher.",
  liExcluded:
    "Não mudam: mobs vanilla com nome, mascotes domados, os tipos de {exclude}, os que aparecem por um motivo fora de {reasons} (por exemplo {summon}, que é {command}) e os mundos de {worlds}.",
  liRpgroll:
    "Mobs do RPGRoll: o tamanho é multiplicado sobre o seu {modelScale} e a sua vida; o ataque próprio (stat {damage}) também segue o peso de dano. Os chefes nunca mudam, nem os que levam modelo 3D salvo {modeled} (o modelo não segue o tamanho). Um mob específico fica de fora com {customData} ou tem faixa própria em {types} como {typeId}.",
  configNote:
    "{cmd} relê também o {config}: a mudança vale para os mobs que aparecerem a partir daquele momento; os que já existiam conservam o seu tamanho.",

  guiTitle: "GUI: navegador e editor",
  guiBody:
    "{browser} abre um navegador paginado com busca e filtro por categoria. Clique sobre um mob abre o editor completo, com um botão por componente:",
  liGuiIdentity:
    "Identidade, Modelo, Stats, Resistências/Fraquezas — edição direta com cliques (+1/+10, alternar, ciclar) e prompts de chat para texto.",
  liGuiAi:
    "IA — ativar/desativar goals, ajustar alcance/fuga/velocidade, gerir pontos de patrulha e região a proteger.",
  liGuiSkills: "Skills e Triggers — lista de ações por evento, cadastro rápido com sintaxe {fmt} pelo chat.",
  liGuiPhases: "Fases — limite de vida, multiplicadores de stat, e quais skills já existentes se somam nessa fase.",
  liGuiLoot: "Loot, BossBar, Diálogos, Regras de spawn, Dados customizados.",
  noHistoryTitle: "Sem histórico, versionamento nem import/export",
  noHistoryBody:
    "Diferente do que foi proposto originalmente, este editor não guarda versões anteriores nem permite importar/exportar definições — cada “Salvar” sobrescreve o YAML em disco diretamente.",

  cmdTitle: "Comandos",
  thCommand: "Comando",
  xSpawn: "Invoca um mob na localização do jogador indicado (ou na sua).",
  xList: "Lista as definições carregadas, opcionalmente filtradas.",
  xInfo: "Mostra stats e componentes resumidos de uma definição.",
  xReload: "Recarrega o config.yml e todas as definições do disco.",
  xKillall: "Elimina todos os mobs ativos, opcionalmente de uma única definição.",
  xCreate: "Cria um mob base e abre o editor direto.",
  xBrowser: "Abre o navegador gráfico.",
  xEditor: "Abre o editor gráfico direto sobre uma definição.",
  permNote: "Todos exigem {perm} (padrão: op).",

  phTitle: "Placeholders (PlaceholderAPI)",
  phIntro:
    "Expansão {exp} — diferente dos outros addons, a maioria é global ao servidor (contagens), não por jogador. A exceção é {nearest}, que busca o mob RPGRoll vivo mais próximo do jogador (até 64 blocos) no mesmo mundo dele.",
  thPlaceholder: "Placeholder",
  thValue: "Valor",
  pActive: "Mobs RPGRoll vivos agora mesmo, em todos os mundos.",
  pActiveCat: "Igual, filtrado por categoria (NORMAL, MINI_BOSS, etc.).",
  pDefs: "Quantidade de definições de mob carregadas.",
  pNearestName: "Nome do mob RPGRoll mais próximo do jogador.",
  pNearestHealth: "A sua vida atual/máxima.",
  pNearestDistance: "Distância em blocos.",

  mfId: "Id",
  mfCategory: "Categoria",
  mfDisplayName: "Nome visível",
  mfBaseEntity: "Tipo de entidade base (Bukkit)",
  mfLevel: "Nível",
  mfRarity: "Raridade (id)",
  mfTags: "Tags",
  mfDescription: "Descrição",
  mfModel: "Modelo",
  mfScale: "Escala",
  mfGlow: "Brilho",
  mfInvisible: "Invisível",
  mfStats: "Stats",
  mfResistances: "Resistências",
  mfAi: "IA",
  mfGoals: "Goals (ordem de prioridade)",
  mfAggro: "Alcance de aggro",
  mfFlee: "% de vida para fugir",
  mfMoveSpeed: "Velocidade de movimento",

  rfId: "Id",
  rfWorld: "Mundo",
  rfMin: "Canto mínimo",
  rfMax: "Canto máximo",
};

export const MOBS_COPY: Record<Locale, MobsCopy> = { es, en, pt };
