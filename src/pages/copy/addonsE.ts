import type { Locale } from "../../i18n";

/** Texto de los addons, quinta tanda: Magic y NPCs. */

const es = {
  magic: {
    title: "Magic (RPGRoll-Magic)",
    intro:
      "Framework de magia modular — escuelas con afinidades, hechizos construidos por componentes (nunca “programados”), maná/vida/experiencia/reactivos como costo, catalizadores, grimorios, runas y árboles de progresión. Profundamente integrado con RPGRoll-FX (visuales) y RPGRoll-Effects (aplicar maldiciones/curses reales).",

    noProgTitle: "No existen hechizos programados",
    noProgBody:
      "Todos los hechizos, sin excepción, se arman encadenando los mismos ~23 tipos de componente en el orden que quieras — igual que {comp} en RPGRoll-Effects o {step} en RPGRoll-FX. No hay ninguna clase Java especial para “Fireball” o “Meteoro”: ambos son la misma {spell}, solo con distintos componentes.",

    reqTitle: "Requisitos",
    reqBody:
      "Sin {fx}, los componentes {visual} no hacen nada. Sin {effects}, los componentes {applyEffect} tampoco — el resto del motor (daño, movimiento, maná, cooldowns, runas) funciona igual.",

    schoolsTitle: "Escuelas y afinidades",
    schoolsBody:
      "Una {school} agrupa hechizos con identidad visual compartida (color, ícono, sonido/efecto al lanzar) y {affinities} — bonos/maleficios multiplicativos de daño/curación según la raza o clase del jugador (ej. Elfo +25% en Nature, Demonio +30% en Fire y -40% en Holy). No hay jerarquía real entre escuelas (“Elemental” como padre de “Fire”/“Water”) — es puramente organizativo vía {tags}, no se modela como estructura.",
    affinities: "afinidades",

    spellTitle: "Anatomía de un hechizo",
    spellBody:
      "Un {spell} combina identidad (nombre/ícono/color/escuela/rareza/nivel) con un {cost} (maná/vida/experiencia/reactivo — ninguno usa “almas”/“energía” todavía, esas quedan para un futuro addon de economía propio), tiempos de cast/cooldown, un {trigger} de click, su lugar en el árbol de progresión de su escuela ({tree}, sin entidad de “árbol” separada — el árbol es simplemente el grafo implícito de qué hechizo requiere a cuál), y el pipeline de componentes que define qué hace.",

    triggersTitle: "Triggers de cast",
    thTrigger: "Trigger",
    thHowCast: "Cómo lanza",
    tLeft: "Click izquierdo con el catalizador en mano.",
    tRight: "Click derecho — instantáneo.",
    tHold:
      "Canaliza {castTime} ticks quieto y sin recibir daño tras el click derecho — se cancela si te mueves o te golpean.",

    holdTitle: "HOLD es una simulación, no un click-sostenido real",
    holdBody:
      "Bukkit no expone un evento de “sigues apretando click derecho” sin escuchar paquetes de cliente — en vez de eso, al iniciarse la canalización tienes {castTime} ticks para completarla quieto y sin recibir daño. Es la misma simplificación que usan la mayoría de los plugins de RPG/magia sobre Bukkit puro.",

    compTitle: "Componentes del pipeline (Spell Engine)",
    compBody:
      "Solo {projectile} y {delay} pausan el pipeline (colisión sobre varios ticks / espera agendada) — todo lo demás corre sincrónico dentro del mismo tick. Los componentes de daño escalan por {power} (afinidad de escuela × catalizador).",
    thCategory: "Categoría",
    thTypes: "Tipos",
    catMovement: "Movimiento",
    catDamage: "Daño",
    catVisual: "Visual",
    catWorld: "Mundo",
    catEntities: "Entidades",
    catControl: "Control",
    visualTypes: "PARTICLE, SOUND, VISUAL (delega en Particles)",
    projBody:
      "{projectile} es el único componente con colisión real: avanza por tick spawneando una partícula de estela, se detiene al chocar con un bloque sólido o la primera entidad viva (salvo que una runa {piercing} esté activa), y deja el punto/entidad golpeada en el contexto para que el siguiente componente (típicamente {damage}) lo use. {summon} invoca un mob {vanilla} por {entityType}.",
    vanilla: "vanilla",

    runesTitle: "Runas",
    runesBody:
      "Una runa se socketea a un hechizo ya {learned} (vía el Spellbook del jugador, tope 3 por hechizo) — no son ítems físicos que se consuman, se adjuntan desde la GUI. Modifican el pipeline solo en el momento del cast, nunca la definición guardada del hechizo.",
    learned: "aprendido",
    thType: "Tipo",
    thEffect: "Efecto",
    rExtra:
      "“Split” — proyectiles extra con un pequeño desvío de ángulo, cada uno corre el resto del pipeline de forma independiente.",
    rPiercing: "El proyectil no se detiene en el primer enemigo — atraviesa hasta {maxPierces}.",
    rExplosive: "Agrega una explosión (daño de área + partícula) justo en el punto de colisión.",
    rApplyEffect: "Aplica un efecto extra de RPGRoll-Effects junto con el daño normal del hechizo.",
    rCost: "Multiplica el costo de maná.",
    rCooldown: "Multiplica el cooldown.",

    catalystTitle: "Catalizadores",
    catalystBody:
      "Varitas, báculos, libros, cristales, amuletos, orbes y reliquias son, mecánicamente, {same}: un {catalyst} — un ítem que hace falta sostener para poder lanzar el hechizo seleccionado, con 3 multiplicadores opcionales ({mults}). Lo que los diferencia es puramente material/nombre/lore, no un sistema separado. “Modificar elementos” (que un báculo cambie la escuela de un hechizo) queda fuera de esta pasada.",
    same: "lo mismo",

    grimTitle: "Grimorios",
    grimBody:
      "Un {grimoire} es un libro que, al usarse (click derecho), se consume 1 del stack e intenta enseñar {all} sus hechizos al jugador — los que ya sabe, o para los que no cumple el nivel o el árbol de progresión ({treeParent} no aprendido todavía), se saltean con un mensaje propio, sin cancelar el resto del lote.",
    all: "todos",

    yamlTitle: "Ejemplos de archivo YAML",
    meteorFile: "spells/meteor.yml (canalizado, con árbol de progresión)",

    refTitle: "Referencia completa: todos los campos en un solo archivo",
    refBody:
      "{file} (incluido en el jar) encadena los 26 tipos de componente del Spell Engine, uno detrás del otro, junto con todos los campos de costo (maná, vida, XP, reactivo) y de árbol de progresión.",

    bTitle: "Constructor visual: identidad, costo básico y progresión del hechizo",
    bDesc:
      "El pipeline de componentes es demasiado variado para un formulario lineal (cada tipo tiene sus propios params) — copia y adapta uno de los ejemplos de arriba, o usa /magicadmin browser para armarlo paso a paso desde el chat en el juego.",

    guiTitle: "GUI: Magic Studio",
    guiBody:
      "{browser} abre un hub que enlaza a 5 navegadores — Escuelas, Hechizos, Grimorios, Runas y Catalizadores. El editor de un hechizo separa identidad/costo/cast/cooldown/árbol en un hub y el pipeline de componentes en su propia pantalla (agregar con {add}, shift-click para quitar). La vista del jugador, {spellbook}, lista los hechizos aprendidos, permite seleccionar cuál lanzar, ver cooldowns activos, y socketear runas (shift-click sobre un hechizo).",

    apiTitle: "API para addons — MagicAPI",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    thWhat: "Qué hace",
    cBrowser: "Abre el Magic Studio.",
    cReload: "Recarga todas las definiciones desde disco.",
    cGiveCatalyst: "Te da un catalizador.",
    cGiveGrimoire: "Te da un grimorio.",
    cSpellbook: "Abre tu grimorio — seleccionar hechizo, ver cooldowns, socketear runas.",
    cSelect: "Selecciona qué hechizo aprendido se lanza al usar tu catalizador.",
    cCast: "Lanza un hechizo directo (sin catalizador), respetando costo/cooldown.",
    cCooldowns: "Lista tus cooldowns activos.",
    permNote: "Los comandos {admin} requieren {p1} (default: op); {use} requiere {p2} (default: true).",

    scopeTitle: "Alcance: núcleo y progresión",
    scopeCallout: "Completo y estable",
    scopeBody:
      "El motor de componentes, escuelas/afinidades, maná/costos/cooldowns, catalizadores, grimorios, runas, árboles de progresión, la API pública, el Magic Studio, y contenido de ejemplo listo para usar o copiar (2 escuelas, 5 hechizos, 1 grimorio, 3 runas, 2 catalizadores).",

    fId: "Id",
    fDisplayName: "Nombre visible",
    fIcon: "Ícono (Material)",
    fColor: "Color",
    fSchool: "Escuela (id)",
    fRarity: "Rareza",
    fLevel: "Nivel requerido",
    fTrigger: "Trigger",
    fCastTime: "Tiempo de canalización (ticks, solo HOLD)",
    fCooldown: "Cooldown (ticks)",
    fTreeParent: "Requiere antes (id de otro hechizo)",
    fTreeTier: "Nivel del árbol",
    fTags: "Tags",
    fDescription: "Descripción",
  },

  npcs: {
    title: "NPCs (RPGRoll-NPCs)",
    intro:
      "Un addon {separate} de RPGRoll: NPCs interactuables con forma de jugador (Mannequins nativos del servidor), con acciones y condiciones que se enganchan a los personajes de RPGRoll cuando el core está instalado.",
    separate: "separado",

    sepTitle: "Es un plugin distinto, con su propio jar",
    sepBody:
      "{plugin} no vive dentro del jar de {core} — es su propio plugin ({dir}, módulo Gradle separado). Solo necesita {lib}; el core es opcional y, si está, las condiciones de nivel, raza, clase y oficio leen el personaje del jugador.",

    reqTitle: "Requisitos",
    reqDeclared: "Declarado en su {pluginYml}:",
    liLib: "framework de GUIs ({gui}) y el acceso a los personajes.",
    liCore:
      "(opcional) — sin el core, las condiciones {conds} no se cumplen; {hasItem} y todas las acciones funcionan igual.",
    liQuests: "(opcional) — acciones y condiciones de misión.",
    buildTip:
      "Compila con {cmd} — el jar queda en {jar} (no el {plain}). Igual que {core}, usa Shadow para empaquetar OkHttp (necesario para hablar con la API de MineSkin); Gson queda afuera porque Paper ya lo trae. Ya no hace falta ProtocolLib.",

    howTitle: "Cómo funcionan los NPCs",
    howBody:
      "Cada NPC es un {mannequin}: la entidad con forma de jugador que trae el propio servidor. Lleva nombre con formato, skin, pose y rotación, lo ven todos los jugadores (también los de Bedrock vía Geyser) y los clics llegan como eventos normales de Bukkit. Antes se dibujaban jugadores falsos con paquetes de ProtocolLib, lo que se rompía con cada versión nueva del protocolo.",
    liYamlTitle: "El YAML es la única fuente de verdad:",
    liYaml:
      "las entidades no se guardan con el chunk. Se crean al cargar el plugin o el chunk y desaparecen al descargarse, así no quedan duplicados tras un cierre brusco.",
    liNoAiTitle: "Sin IA, daño ni colisión:",
    liNoAi:
      "el Mannequin se crea inmóvil, sin IA, invulnerable, silencioso y sin colisión — no camina ni interactúa con el mundo por sí mismo.",
    liInteractTitle: "Interacción:",
    liInteract:
      "click derecho sobre la entidad, con un cooldown de 300ms para evitar que un solo click dispare la acción varias veces.",
    liRegionsTitle: "Regiones protegidas:",
    liRegions:
      "WorldGuard ({deny} con {blockSpawning}) y otros anti-mobs cancelan las criaturas creadas por plugins. El addon deshace esa cancelación solo para sus propios NPCs; si otro plugin la vuelve a cancelar, la consola lo avisa con {msg}.",

    createTitle: "Crear y editar un NPC",
    createIntro: "Todo el flujo de creación es una GUI de inventario, no un formulario de texto:",
    s1: "— usa tu ubicación y posición actuales, abre el editor.",
    s2: "Click en {name} → te pide el nombre por chat.",
    sName: "Nombre",
    s3: "Click en {skin} → pegas un link o ID de {link} por chat; el addon consulta la API de MineSkin y resuelve el {value} reales automáticamente (no hace falta pegar el texto largo de la textura a mano).",
    sSkin: "Skin",
    s4: "Click en {pose} → eliges entre STANDING, SITTING, SNEAKING, SWIMMING, SLEEPING.",
    sPose: "Pose",
    s5: "Click en {pos} → reasigna la ubicación a donde estés parado.",
    sPos: "Posición",
    s6: "Click en {actions} → agrega/quita acciones (formato {fmt} por chat).",
    sActions: "Acciones",
    s7: "Guardar (deshabilitado hasta tener nombre y posición).",
    editNote:
      "{cmd} reabre el mismo editor sobre un NPC existente. Nada se escribe a disco hasta tocar “Guardar”.",

    yamlTitle: "Formato del archivo YAML",
    yamlIntro: "Se genera solo al guardar desde la GUI, en {path}:",

    bNpc: "Constructor visual: NPC",
    bNpcDesc:
      "El id, nombre, pose y ubicación de un NPC. La lista de actions (mensajes, sonidos, condicionales, abrir menú...) es demasiado variada para un formulario — agrégala luego con /npc edit o copiando un ejemplo de arriba.",

    actionsTitle: "Acciones (MenuAction)",
    actionsIntro:
      "Se ejecutan en orden, todas, cada vez que un jugador hace click en el NPC. {player} se reemplaza por el nombre del jugador.",
    thType: "Tipo",
    thValueFmt: "Formato de value",
    thWhat: "Qué hace",
    vFree: "texto libre",
    vCommand: "comando",
    vMaterial: "MATERIAL[,cantidad]",
    vSound: "SONIDO[,volumen[,pitch]]",
    vWorldXyz: "mundo,x,y,z",
    vCondFmt: "condición;accSiTrue[;accSiFalse]",
    vMenuId: "menuId",
    vEmpty: "(vacío)",
    aMessage: "Envía un mensaje al jugador (soporta color legacy {amp}).",
    aCommand:
      "Ejecuta el comando como {console} — para comandos tipo {give} o LuckPerms que no necesitan que el sender sea el jugador.",
    console: "consola",
    aCommandAsPlayer:
      "Ejecuta el comando {asPlayer} — necesario para comandos propios de RPGRoll (ej. {quest}), que exigen {sender} y fallan en silencio si se disparan por consola.",
    asPlayer: "como el jugador que clickeó",
    aGiveItem: "Da un ítem; lo que no entra en el inventario se dropea a los pies.",
    aTakeItem:
      "Quita un ítem del inventario (sin volver a chequear si hay suficiente — pensado para usarse junto a un CONDITIONAL con HAS_ITEM).",
    aSound: "Reproduce un sonido en la ubicación del jugador.",
    aTeleport: "Teletransporta al jugador.",
    aConditional: "Evalúa una condición y ejecuta una sub-acción distinta según el resultado.",
    aOpenGui: "Abre un menú definido en {menus} (ver abajo).",
    aClose: "Cierra el inventario que tenga abierto el jugador.",
    aOpenInventory: "Abre un contenedor vanilla vacío (sin ítems ni acciones propias).",

    condTitle: "CONDITIONAL: sub-acciones y condiciones",
    condIntro:
      "El formato es {fmt}, y cada sub-acción usa {sub} (con dos puntos, no {pipe} como en la GUI de acciones):",
    thCondition: "Condición",
    thParam: "Parámetro",
    pJobId: "jobId",
    pJobLevel: "jobId,nivel",
    pLevel: "nivel (de personaje)",
    pRaceId: "razaId",
    pClassId: "claseId",
    pMaterial: "MATERIAL[,cantidad mínima]",
    pPermission: "permiso",
    combineBody:
      "Se pueden combinar condiciones con {and} (todas deben cumplirse) o {or} (al menos una) — pero no ambos en la misma expresión, ya que no hay parser de precedencia/paréntesis: si aparecen los dos operadores, solo se evalúa el primero que aparece de izquierda a derecha.",

    menusTitle: "Menús (tiendas)",
    menusBody:
      "Un menú es una GUI de inventario configurable, abierta desde una acción {openGui}. Vive en {path}. El motor (acciones, condiciones y GUI) está en RPGRoll-Lib, así que el mismo formato sirve para los menús de la brújula de {extras} sin depender de este módulo. Además de los campos del ejemplo, un menú acepta {filler} (rellena los huecos) y cada ítem {permission} (solo lo ve quien lo tenga); en {nameLore}, {player} es el jugador, y una {head} muestra su cabeza:",

    refTitle: "Referencia completa: todos los campos en dos archivos",
    refBody:
      "{files} (incluidos en el jar) usan absolutamente todos los tipos de acción, todas las condiciones de {conditional} (incluyendo {andOr}) y todos los campos de un ítem de menú — pensados para copiar/pegar, no para dar en partidas reales tal cual.",

    bMenu: "Constructor visual: NPC Menu",
    bMenuDesc:
      "Identidad de la GUI de tienda/menú. Los ítems del menú (slot/material/nombre/lore/acciones) se editan mejor con /npc menus, o copiando/adaptando uno de los ejemplos de arriba.",

    orderTitle: "El orden de GIVE_ITEM y TAKE_ITEM importa",
    orderBody:
      "Para que una “compra” funcione de verdad hacen falta {two} condicionales con la misma condición: primero el que entrega el ítem, después el que cobra. Si el cobro fuera primero, el segundo condicional volvería a evaluar {hasItem} ya sin el oro recién descontado y nunca llegaría a entregar la espada. No hay una acción de “transacción atómica” — son dos chequeos independientes en secuencia.",
    two: "dos",
    listNote: "(lista)",
    itemNote:
      "Cada ítem del menú tiene: {fields}, y su propia lista de {actions} (mismo sistema que las acciones de NPC).",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    cCreate: "Crea un NPC en tu ubicación y abre el editor.",
    cEdit: "Reabre el editor sobre un NPC existente.",
    cList: "Lista todos los NPCs existentes.",
    cDelete: "Borra un NPC y lo despawnea para todos.",
    cMenus: "Abre el navegador gráfico de menús (crear/editar menús).",
    cReload: "Recarga NPCs y menús desde disco, sin reiniciar el servidor.",
    permNote:
      "Todos requieren el permiso {perm} (default: op) — declarado tanto en el comando ({pluginYml}) como chequeado explícitamente en el código.",

    fId: "Id",
    fDisplayName: "Nombre visible",
    fPose: "Pose",
    fLocation: "Ubicación",
    fWorld: "Mundo",
    fSkin: "Skin (opcional)",
    fTexture: "Textura (base64)",
    fTextureHelp:
      "En el editor in-game se resuelve solo pegando un link/id de mineskin.org — aquí hay que pegarla a mano.",
    fSignature: "Firma (base64)",
    mId: "Id",
    mTitle: "Título",
    mRows: "Filas (1-6)",
  },
};

export type AddonsECopy = typeof es;

const en: AddonsECopy = {
  magic: {
    title: "Magic (RPGRoll-Magic)",
    intro:
      "A modular magic framework — schools with affinities, spells built out of components (never “hardcoded”), mana/health/experience/reagents as cost, catalysts, grimoires, runes and progression trees. Deeply integrated with RPGRoll-FX (visuals) and RPGRoll-Effects (applying real curses).",

    noProgTitle: "There are no hardcoded spells",
    noProgBody:
      "Every spell, without exception, is assembled by chaining the same ~23 component types in whatever order you want — just like {comp} in RPGRoll-Effects or {step} in RPGRoll-FX. There is no special Java class for “Fireball” or “Meteor”: both are the same {spell}, only with different components.",

    reqTitle: "Requirements",
    reqBody:
      "Without {fx}, {visual} components do nothing. Without {effects}, {applyEffect} components do nothing either — the rest of the engine (damage, movement, mana, cooldowns, runes) works the same.",

    schoolsTitle: "Schools and affinities",
    schoolsBody:
      "A {school} groups spells that share a visual identity (color, icon, cast sound/effect) and {affinities} — multiplicative damage/healing bonuses or penalties based on the player's race or class (e.g. Elf +25% in Nature, Demon +30% in Fire and -40% in Holy). There is no real hierarchy between schools (“Elemental” as the parent of “Fire”/“Water”) — it is purely organizational via {tags}, not modeled as a structure.",
    affinities: "affinities",

    spellTitle: "Anatomy of a spell",
    spellBody:
      "A {spell} combines identity (name/icon/color/school/rarity/level) with a {cost} (mana/health/experience/reagent — none of them uses “souls”/“energy” yet, those are left for a future economy addon of its own), cast/cooldown timings, a click {trigger}, its place in its school's progression tree ({tree}, with no separate “tree” entity — the tree is simply the implicit graph of which spell requires which), and the component pipeline that defines what it does.",

    triggersTitle: "Cast triggers",
    thTrigger: "Trigger",
    thHowCast: "How it casts",
    tLeft: "Left click while holding the catalyst.",
    tRight: "Right click — instant.",
    tHold:
      "Channels for {castTime} ticks standing still and taking no damage after the right click — cancelled if you move or get hit.",

    holdTitle: "HOLD is a simulation, not a real held click",
    holdBody:
      "Bukkit does not expose a “you are still holding right click” event without listening to client packets — instead, once channeling starts you have {castTime} ticks to finish it standing still and taking no damage. It is the same simplification most RPG/magic plugins on plain Bukkit use.",

    compTitle: "Pipeline components (Spell Engine)",
    compBody:
      "Only {projectile} and {delay} pause the pipeline (collision across several ticks / scheduled wait) — everything else runs synchronously inside the same tick. Damage components scale by {power} (school affinity × catalyst).",
    thCategory: "Category",
    thTypes: "Types",
    catMovement: "Movement",
    catDamage: "Damage",
    catVisual: "Visual",
    catWorld: "World",
    catEntities: "Entities",
    catControl: "Control",
    visualTypes: "PARTICLE, SOUND, VISUAL (delegates to Particles)",
    projBody:
      "{projectile} is the only component with real collision: it advances each tick spawning a trail particle, stops when it hits a solid block or the first living entity (unless a {piercing} rune is active), and leaves the hit point/entity in the context so the next component (typically {damage}) can use it. {summon} spawns a {vanilla} mob by {entityType}.",
    vanilla: "vanilla",

    runesTitle: "Runes",
    runesBody:
      "A rune is socketed into a spell that has already been {learned} (via the player's Spellbook, capped at 3 per spell) — they are not physical items that get consumed, they are attached from the GUI. They modify the pipeline only at cast time, never the stored spell definition.",
    learned: "learned",
    thType: "Type",
    thEffect: "Effect",
    rExtra:
      "“Split” — extra projectiles with a small angle offset, each one running the rest of the pipeline independently.",
    rPiercing: "The projectile does not stop at the first enemy — it pierces up to {maxPierces}.",
    rExplosive: "Adds an explosion (area damage + particle) right at the collision point.",
    rApplyEffect: "Applies an extra RPGRoll-Effects effect along with the spell's normal damage.",
    rCost: "Multiplies the mana cost.",
    rCooldown: "Multiplies the cooldown.",

    catalystTitle: "Catalysts",
    catalystBody:
      "Wands, staves, books, crystals, amulets, orbs and relics are, mechanically, {same}: a {catalyst} — an item you need to hold in order to cast the selected spell, with 3 optional multipliers ({mults}). What sets them apart is purely material/name/lore, not a separate system. “Element modification” (a staff changing a spell's school) is out of scope for this pass.",
    same: "the same thing",

    grimTitle: "Grimoires",
    grimBody:
      "A {grimoire} is a book that, when used (right click), consumes 1 from the stack and tries to teach {all} of its spells to the player — the ones already known, or those whose level or progression tree is not met ({treeParent} not learned yet), are skipped with their own message, without cancelling the rest of the batch.",
    all: "all",

    yamlTitle: "YAML file examples",
    meteorFile: "spells/meteor.yml (channeled, with a progression tree)",

    refTitle: "Full reference: every field in a single file",
    refBody:
      "{file} (shipped in the jar) chains all 26 Spell Engine component types one after another, together with every cost field (mana, health, XP, reagent) and every progression-tree field.",

    bTitle: "Visual builder: spell identity, basic cost and progression",
    bDesc:
      "The component pipeline is too varied for a linear form (each type has its own params) — copy and adapt one of the examples above, or use /magicadmin browser to build it step by step from chat in-game.",

    guiTitle: "GUI: Magic Studio",
    guiBody:
      "{browser} opens a hub linking to 5 browsers — Schools, Spells, Grimoires, Runes and Catalysts. The spell editor splits identity/cost/cast/cooldown/tree into a hub and the component pipeline into its own screen (add with {add}, shift-click to remove). The player view, {spellbook}, lists learned spells, lets you pick which one to cast, see active cooldowns, and socket runes (shift-click a spell).",

    apiTitle: "API for addons — MagicAPI",

    cmdTitle: "Commands",
    thCommand: "Command",
    thWhat: "What it does",
    cBrowser: "Opens the Magic Studio.",
    cReload: "Reloads every definition from disk.",
    cGiveCatalyst: "Gives you a catalyst.",
    cGiveGrimoire: "Gives you a grimoire.",
    cSpellbook: "Opens your spellbook — pick a spell, see cooldowns, socket runes.",
    cSelect: "Picks which learned spell gets cast when you use your catalyst.",
    cCast: "Casts a spell directly (no catalyst), still respecting cost/cooldown.",
    cCooldowns: "Lists your active cooldowns.",
    permNote: "{admin} commands require {p1} (default: op); {use} requires {p2} (default: true).",

    scopeTitle: "Scope: core and progression",
    scopeCallout: "Complete and stable",
    scopeBody:
      "The component engine, schools/affinities, mana/costs/cooldowns, catalysts, grimoires, runes, progression trees, the public API, the Magic Studio, and example content ready to use or copy (2 schools, 5 spells, 1 grimoire, 3 runes, 2 catalysts).",

    fId: "Id",
    fDisplayName: "Display name",
    fIcon: "Icon (Material)",
    fColor: "Color",
    fSchool: "School (id)",
    fRarity: "Rarity",
    fLevel: "Required level",
    fTrigger: "Trigger",
    fCastTime: "Channeling time (ticks, HOLD only)",
    fCooldown: "Cooldown (ticks)",
    fTreeParent: "Requires first (another spell's id)",
    fTreeTier: "Tree tier",
    fTags: "Tags",
    fDescription: "Description",
  },

  npcs: {
    title: "NPCs (RPGRoll-NPCs)",
    intro:
      "An addon {separate} from RPGRoll: interactable player-shaped NPCs (the server's native Mannequins), with actions and conditions that hook into RPGRoll characters when the core is installed.",
    separate: "separate",

    sepTitle: "It is a different plugin, with its own jar",
    sepBody:
      "{plugin} does not live inside the {core} jar — it is its own plugin ({dir}, a separate Gradle module). It only needs {lib}; the core is optional and, when present, the level, race, class and job conditions read the player's character.",

    reqTitle: "Requirements",
    reqDeclared: "Declared in its {pluginYml}:",
    liLib: "the GUI framework ({gui}) and access to characters.",
    liCore:
      "(optional) — without the core, the {conds} conditions are never met; {hasItem} and every action work the same.",
    liQuests: "(optional) — quest actions and conditions.",
    buildTip:
      "Build it with {cmd} — the jar lands in {jar} (not the {plain}). Like {core}, it uses Shadow to bundle OkHttp (needed to talk to the MineSkin API); Gson is left out because Paper already ships it. ProtocolLib is no longer needed.",

    howTitle: "How NPCs work",
    howBody:
      "Each NPC is a {mannequin}: the player-shaped entity the server itself provides. It carries a formatted name, skin, pose and rotation, every player sees it (Bedrock players via Geyser too) and clicks arrive as normal Bukkit events. Previously fake players were drawn with ProtocolLib packets, which broke with every new protocol version.",
    liYamlTitle: "The YAML is the only source of truth:",
    liYaml:
      "entities are not saved with the chunk. They are created when the plugin or the chunk loads and disappear on unload, so no duplicates are left behind after an abrupt shutdown.",
    liNoAiTitle: "No AI, damage or collision:",
    liNoAi:
      "the Mannequin is created motionless, with no AI, invulnerable, silent and without collision — it does not walk or interact with the world on its own.",
    liInteractTitle: "Interaction:",
    liInteract:
      "right click on the entity, with a 300ms cooldown so a single click does not fire the action several times.",
    liRegionsTitle: "Protected regions:",
    liRegions:
      "WorldGuard ({deny} with {blockSpawning}) and other anti-mob plugins cancel creatures created by plugins. The addon undoes that cancellation only for its own NPCs; if another plugin cancels it again, the console says so with {msg}.",

    createTitle: "Creating and editing an NPC",
    createIntro: "The whole creation flow is an inventory GUI, not a text form:",
    s1: "— uses your current location and facing, opens the editor.",
    s2: "Click {name} → it asks you for the name in chat.",
    sName: "Name",
    s3: "Click {skin} → you paste a {link} link or ID in chat; the addon queries the MineSkin API and resolves the real {value} automatically (no need to paste the long texture string by hand).",
    sSkin: "Skin",
    s4: "Click {pose} → pick between STANDING, SITTING, SNEAKING, SWIMMING, SLEEPING.",
    sPose: "Pose",
    s5: "Click {pos} → reassigns the location to wherever you are standing.",
    sPos: "Position",
    s6: "Click {actions} → add/remove actions ({fmt} format, via chat).",
    sActions: "Actions",
    s7: "Save (disabled until there is a name and a position).",
    editNote:
      "{cmd} reopens the same editor on an existing NPC. Nothing is written to disk until you hit “Save”.",

    yamlTitle: "YAML file format",
    yamlIntro: "It is generated only when you save from the GUI, at {path}:",

    bNpc: "Visual builder: NPC",
    bNpcDesc:
      "An NPC's id, name, pose and location. The actions list (messages, sounds, conditionals, opening a menu...) is too varied for a form — add it later with /npc edit or by copying one of the examples above.",

    actionsTitle: "Actions (MenuAction)",
    actionsIntro:
      "They all run, in order, every time a player clicks the NPC. {player} is replaced with the player's name.",
    thType: "Type",
    thValueFmt: "value format",
    thWhat: "What it does",
    vFree: "free text",
    vCommand: "command",
    vMaterial: "MATERIAL[,amount]",
    vSound: "SOUND[,volume[,pitch]]",
    vWorldXyz: "world,x,y,z",
    vCondFmt: "condition;actIfTrue[;actIfFalse]",
    vMenuId: "menuId",
    vEmpty: "(empty)",
    aMessage: "Sends a message to the player (supports legacy {amp} colors).",
    aCommand:
      "Runs the command as {console} — for commands like {give} or LuckPerms that do not need the sender to be the player.",
    console: "console",
    aCommandAsPlayer:
      "Runs the command {asPlayer} — required for RPGRoll's own commands (e.g. {quest}), which demand {sender} and fail silently when fired from the console.",
    asPlayer: "as the player who clicked",
    aGiveItem: "Gives an item; whatever does not fit in the inventory drops at their feet.",
    aTakeItem:
      "Removes an item from the inventory (without re-checking whether there is enough — meant to be used alongside a CONDITIONAL with HAS_ITEM).",
    aSound: "Plays a sound at the player's location.",
    aTeleport: "Teleports the player.",
    aConditional: "Evaluates a condition and runs a different sub-action depending on the result.",
    aOpenGui: "Opens a menu defined in {menus} (see below).",
    aClose: "Closes whatever inventory the player has open.",
    aOpenInventory: "Opens an empty vanilla container (no items or actions of its own).",

    condTitle: "CONDITIONAL: sub-actions and conditions",
    condIntro:
      "The format is {fmt}, and each sub-action uses {sub} (with a colon, not {pipe} like in the actions GUI):",
    thCondition: "Condition",
    thParam: "Parameter",
    pJobId: "jobId",
    pJobLevel: "jobId,level",
    pLevel: "level (character)",
    pRaceId: "raceId",
    pClassId: "classId",
    pMaterial: "MATERIAL[,minimum amount]",
    pPermission: "permission",
    combineBody:
      "Conditions can be combined with {and} (all must be met) or {or} (at least one) — but not both in the same expression, since there is no precedence/parenthesis parser: if both operators appear, only the first one from left to right is evaluated.",

    menusTitle: "Menus (shops)",
    menusBody:
      "A menu is a configurable inventory GUI, opened from an {openGui} action. It lives at {path}. The engine (actions, conditions and GUI) sits in RPGRoll-Lib, so the same format serves the compass menus of {extras} without depending on this module. Besides the fields in the example, a menu accepts {filler} (fills the gaps) and each item a {permission} (only whoever has it sees the item); in {nameLore}, {player} is the player, and a {head} shows their head:",

    refTitle: "Full reference: every field across two files",
    refBody:
      "{files} (shipped in the jar) use absolutely every action type, every {conditional} condition (including {andOr}) and every field of a menu item — meant for copy/paste, not to be handed out as-is in real games.",

    bMenu: "Visual builder: NPC Menu",
    bMenuDesc:
      "The identity of the shop/menu GUI. The menu items (slot/material/name/lore/actions) are better edited with /npc menus, or by copying and adapting one of the examples above.",

    orderTitle: "The order of GIVE_ITEM and TAKE_ITEM matters",
    orderBody:
      "For a “purchase” to actually work you need {two} conditionals with the same condition: first the one that hands over the item, then the one that charges. If the charge came first, the second conditional would re-evaluate {hasItem} without the gold that was just deducted and would never get to hand over the sword. There is no “atomic transaction” action — they are two independent checks in sequence.",
    two: "two",
    listNote: "(list)",
    itemNote:
      "Each menu item has: {fields}, and its own list of {actions} (the same system as NPC actions).",

    cmdTitle: "Commands",
    thCommand: "Command",
    cCreate: "Creates an NPC at your location and opens the editor.",
    cEdit: "Reopens the editor on an existing NPC.",
    cList: "Lists every existing NPC.",
    cDelete: "Deletes an NPC and despawns it for everyone.",
    cMenus: "Opens the graphical menu browser (create/edit menus).",
    cReload: "Reloads NPCs and menus from disk, without restarting the server.",
    permNote:
      "All of them require the {perm} permission (default: op) — declared both on the command ({pluginYml}) and checked explicitly in code.",

    fId: "Id",
    fDisplayName: "Display name",
    fPose: "Pose",
    fLocation: "Location",
    fWorld: "World",
    fSkin: "Skin (optional)",
    fTexture: "Texture (base64)",
    fTextureHelp:
      "In the in-game editor it resolves itself from a mineskin.org link/id — here you have to paste it by hand.",
    fSignature: "Signature (base64)",
    mId: "Id",
    mTitle: "Title",
    mRows: "Rows (1-6)",
  },
};

const pt: AddonsECopy = {
  magic: {
    title: "Magic (RPGRoll-Magic)",
    intro:
      "Framework de magia modular — escolas com afinidades, feitiços construídos por componentes (nunca “programados”), mana/vida/experiência/reagentes como custo, catalisadores, grimórios, runas e árvores de progressão. Profundamente integrado com RPGRoll-FX (visuais) e RPGRoll-Effects (aplicar maldições reais).",

    noProgTitle: "Não existem feitiços programados",
    noProgBody:
      "Todos os feitiços, sem exceção, são montados encadeando os mesmos ~23 tipos de componente na ordem que você quiser — igual a {comp} no RPGRoll-Effects ou {step} no RPGRoll-FX. Não há nenhuma classe Java especial para “Fireball” ou “Meteoro”: ambos são o mesmo {spell}, só com componentes diferentes.",

    reqTitle: "Requisitos",
    reqBody:
      "Sem {fx}, os componentes {visual} não fazem nada. Sem {effects}, os componentes {applyEffect} também não — o resto do motor (dano, movimento, mana, cooldowns, runas) funciona igual.",

    schoolsTitle: "Escolas e afinidades",
    schoolsBody:
      "Uma {school} agrupa feitiços com identidade visual compartilhada (cor, ícone, som/efeito ao lançar) e {affinities} — bônus/penalidades multiplicativos de dano/cura conforme a raça ou classe do jogador (ex. Elfo +25% em Nature, Demônio +30% em Fire e -40% em Holy). Não há hierarquia real entre escolas (“Elemental” como pai de “Fire”/“Water”) — é puramente organizativo via {tags}, não é modelado como estrutura.",
    affinities: "afinidades",

    spellTitle: "Anatomia de um feitiço",
    spellBody:
      "Um {spell} combina identidade (nome/ícone/cor/escola/raridade/nível) com um {cost} (mana/vida/experiência/reagente — nenhum usa “almas”/“energia” ainda, essas ficam para um futuro addon de economia próprio), tempos de cast/cooldown, um {trigger} de clique, seu lugar na árvore de progressão da escola ({tree}, sem entidade de “árvore” separada — a árvore é simplesmente o grafo implícito de qual feitiço exige qual), e o pipeline de componentes que define o que ele faz.",

    triggersTitle: "Triggers de cast",
    thTrigger: "Trigger",
    thHowCast: "Como lança",
    tLeft: "Clique esquerdo com o catalisador na mão.",
    tRight: "Clique direito — instantâneo.",
    tHold:
      "Canaliza {castTime} ticks parado e sem receber dano depois do clique direito — é cancelado se você se mover ou for atingido.",

    holdTitle: "HOLD é uma simulação, não um clique sustentado real",
    holdBody:
      "O Bukkit não expõe um evento de “você continua apertando o clique direito” sem escutar pacotes do cliente — em vez disso, ao iniciar a canalização você tem {castTime} ticks para completá-la parado e sem receber dano. É a mesma simplificação que a maioria dos plugins de RPG/magia sobre Bukkit puro usa.",

    compTitle: "Componentes do pipeline (Spell Engine)",
    compBody:
      "Só {projectile} e {delay} pausam o pipeline (colisão ao longo de vários ticks / espera agendada) — todo o resto roda sincronamente dentro do mesmo tick. Os componentes de dano escalam por {power} (afinidade de escola × catalisador).",
    thCategory: "Categoria",
    thTypes: "Tipos",
    catMovement: "Movimento",
    catDamage: "Dano",
    catVisual: "Visual",
    catWorld: "Mundo",
    catEntities: "Entidades",
    catControl: "Controle",
    visualTypes: "PARTICLE, SOUND, VISUAL (delega ao Particles)",
    projBody:
      "{projectile} é o único componente com colisão real: avança por tick spawnando uma partícula de rastro, para ao bater num bloco sólido ou na primeira entidade viva (a menos que uma runa {piercing} esteja ativa), e deixa o ponto/entidade atingida no contexto para o componente seguinte (tipicamente {damage}) usar. {summon} invoca um mob {vanilla} por {entityType}.",
    vanilla: "vanilla",

    runesTitle: "Runas",
    runesBody:
      "Uma runa é encaixada num feitiço já {learned} (via o Spellbook do jogador, limite de 3 por feitiço) — não são itens físicos que se consomem, são anexadas pela GUI. Modificam o pipeline apenas no momento do cast, nunca a definição salva do feitiço.",
    learned: "aprendido",
    thType: "Tipo",
    thEffect: "Efeito",
    rExtra:
      "“Split” — projéteis extra com um pequeno desvio de ângulo, cada um rodando o resto do pipeline de forma independente.",
    rPiercing: "O projétil não para no primeiro inimigo — atravessa até {maxPierces}.",
    rExplosive: "Adiciona uma explosão (dano em área + partícula) exatamente no ponto de colisão.",
    rApplyEffect: "Aplica um efeito extra do RPGRoll-Effects junto com o dano normal do feitiço.",
    rCost: "Multiplica o custo de mana.",
    rCooldown: "Multiplica o cooldown.",

    catalystTitle: "Catalisadores",
    catalystBody:
      "Varinhas, cajados, livros, cristais, amuletos, orbes e relíquias são, mecanicamente, {same}: um {catalyst} — um item que precisa estar na mão para lançar o feitiço selecionado, com 3 multiplicadores opcionais ({mults}). O que os diferencia é puramente material/nome/lore, não um sistema separado. “Modificar elementos” (um cajado mudar a escola de um feitiço) fica fora desta passada.",
    same: "a mesma coisa",

    grimTitle: "Grimórios",
    grimBody:
      "Um {grimoire} é um livro que, ao ser usado (clique direito), consome 1 do stack e tenta ensinar {all} os seus feitiços ao jogador — os que ele já sabe, ou aqueles cujo nível ou árvore de progressão não é cumprido ({treeParent} ainda não aprendido), são pulados com uma mensagem própria, sem cancelar o resto do lote.",
    all: "todos",

    yamlTitle: "Exemplos de arquivo YAML",
    meteorFile: "spells/meteor.yml (canalizado, com árvore de progressão)",

    refTitle: "Referência completa: todos os campos num único arquivo",
    refBody:
      "{file} (incluído no jar) encadeia os 26 tipos de componente do Spell Engine, um atrás do outro, junto com todos os campos de custo (mana, vida, XP, reagente) e de árvore de progressão.",

    bTitle: "Construtor visual: identidade, custo básico e progressão do feitiço",
    bDesc:
      "O pipeline de componentes é variado demais para um formulário linear (cada tipo tem seus próprios params) — copie e adapte um dos exemplos acima, ou use /magicadmin browser para montá-lo passo a passo pelo chat no jogo.",

    guiTitle: "GUI: Magic Studio",
    guiBody:
      "{browser} abre um hub que liga a 5 navegadores — Escolas, Feitiços, Grimórios, Runas e Catalisadores. O editor de um feitiço separa identidade/custo/cast/cooldown/árvore num hub e o pipeline de componentes na própria tela (adicionar com {add}, shift-clique para remover). A visão do jogador, {spellbook}, lista os feitiços aprendidos, permite escolher qual lançar, ver cooldowns ativos e encaixar runas (shift-clique sobre um feitiço).",

    apiTitle: "API para addons — MagicAPI",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    thWhat: "O que faz",
    cBrowser: "Abre o Magic Studio.",
    cReload: "Recarrega todas as definições do disco.",
    cGiveCatalyst: "Te dá um catalisador.",
    cGiveGrimoire: "Te dá um grimório.",
    cSpellbook: "Abre o seu grimório — escolher feitiço, ver cooldowns, encaixar runas.",
    cSelect: "Escolhe qual feitiço aprendido é lançado ao usar o seu catalisador.",
    cCast: "Lança um feitiço direto (sem catalisador), respeitando custo/cooldown.",
    cCooldowns: "Lista os seus cooldowns ativos.",
    permNote: "Os comandos {admin} exigem {p1} (padrão: op); {use} exige {p2} (padrão: true).",

    scopeTitle: "Escopo: núcleo e progressão",
    scopeCallout: "Completo e estável",
    scopeBody:
      "O motor de componentes, escolas/afinidades, mana/custos/cooldowns, catalisadores, grimórios, runas, árvores de progressão, a API pública, o Magic Studio e conteúdo de exemplo pronto para usar ou copiar (2 escolas, 5 feitiços, 1 grimório, 3 runas, 2 catalisadores).",

    fId: "Id",
    fDisplayName: "Nome visível",
    fIcon: "Ícone (Material)",
    fColor: "Cor",
    fSchool: "Escola (id)",
    fRarity: "Raridade",
    fLevel: "Nível exigido",
    fTrigger: "Trigger",
    fCastTime: "Tempo de canalização (ticks, só HOLD)",
    fCooldown: "Cooldown (ticks)",
    fTreeParent: "Exige antes (id de outro feitiço)",
    fTreeTier: "Nível da árvore",
    fTags: "Tags",
    fDescription: "Descrição",
  },

  npcs: {
    title: "NPCs (RPGRoll-NPCs)",
    intro:
      "Um addon {separate} do RPGRoll: NPCs interagíveis com forma de jogador (Mannequins nativos do servidor), com ações e condições que se conectam aos personagens do RPGRoll quando o core está instalado.",
    separate: "separado",

    sepTitle: "É um plugin distinto, com o seu próprio jar",
    sepBody:
      "{plugin} não vive dentro do jar do {core} — é o seu próprio plugin ({dir}, módulo Gradle separado). Só precisa do {lib}; o core é opcional e, se estiver presente, as condições de nível, raça, classe e ofício leem o personagem do jogador.",

    reqTitle: "Requisitos",
    reqDeclared: "Declarado no seu {pluginYml}:",
    liLib: "framework de GUIs ({gui}) e o acesso aos personagens.",
    liCore:
      "(opcional) — sem o core, as condições {conds} nunca são cumpridas; {hasItem} e todas as ações funcionam igual.",
    liQuests: "(opcional) — ações e condições de missão.",
    buildTip:
      "Compile com {cmd} — o jar fica em {jar} (não o {plain}). Igual ao {core}, usa Shadow para empacotar o OkHttp (necessário para falar com a API do MineSkin); o Gson fica de fora porque o Paper já o traz. O ProtocolLib não é mais necessário.",

    howTitle: "Como funcionam os NPCs",
    howBody:
      "Cada NPC é um {mannequin}: a entidade com forma de jogador que o próprio servidor traz. Leva nome com formatação, skin, pose e rotação, todos os jogadores a veem (inclusive os de Bedrock via Geyser) e os cliques chegam como eventos normais do Bukkit. Antes eram desenhados jogadores falsos com pacotes do ProtocolLib, o que quebrava com cada versão nova do protocolo.",
    liYamlTitle: "O YAML é a única fonte de verdade:",
    liYaml:
      "as entidades não são salvas com o chunk. São criadas ao carregar o plugin ou o chunk e desaparecem ao descarregar, então não ficam duplicados depois de um fechamento brusco.",
    liNoAiTitle: "Sem IA, dano nem colisão:",
    liNoAi:
      "o Mannequin é criado imóvel, sem IA, invulnerável, silencioso e sem colisão — não caminha nem interage com o mundo por conta própria.",
    liInteractTitle: "Interação:",
    liInteract:
      "clique direito sobre a entidade, com um cooldown de 300ms para evitar que um único clique disparare a ação várias vezes.",
    liRegionsTitle: "Regiões protegidas:",
    liRegions:
      "WorldGuard ({deny} com {blockSpawning}) e outros anti-mobs cancelam as criaturas criadas por plugins. O addon desfaz esse cancelamento apenas para os seus próprios NPCs; se outro plugin cancelar de novo, o console avisa com {msg}.",

    createTitle: "Criar e editar um NPC",
    createIntro: "Todo o fluxo de criação é uma GUI de inventário, não um formulário de texto:",
    s1: "— usa a sua localização e posição atuais, abre o editor.",
    s2: "Clique em {name} → pede o nome pelo chat.",
    sName: "Nome",
    s3: "Clique em {skin} → você cola um link ou ID de {link} pelo chat; o addon consulta a API do MineSkin e resolve o {value} reais automaticamente (não precisa colar o texto longo da textura à mão).",
    sSkin: "Skin",
    s4: "Clique em {pose} → escolha entre STANDING, SITTING, SNEAKING, SWIMMING, SLEEPING.",
    sPose: "Pose",
    s5: "Clique em {pos} → reatribui a localização para onde você estiver parado.",
    sPos: "Posição",
    s6: "Clique em {actions} → adicione/remova ações (formato {fmt} pelo chat).",
    sActions: "Ações",
    s7: "Salvar (desabilitado até ter nome e posição).",
    editNote:
      "{cmd} reabre o mesmo editor sobre um NPC existente. Nada é escrito em disco até tocar em “Salvar”.",

    yamlTitle: "Formato do arquivo YAML",
    yamlIntro: "É gerado apenas ao salvar pela GUI, em {path}:",

    bNpc: "Construtor visual: NPC",
    bNpcDesc:
      "O id, nome, pose e localização de um NPC. A lista de actions (mensagens, sons, condicionais, abrir menu...) é variada demais para um formulário — adicione depois com /npc edit ou copiando um exemplo acima.",

    actionsTitle: "Ações (MenuAction)",
    actionsIntro:
      "São executadas em ordem, todas, cada vez que um jogador clica no NPC. {player} é substituído pelo nome do jogador.",
    thType: "Tipo",
    thValueFmt: "Formato de value",
    thWhat: "O que faz",
    vFree: "texto livre",
    vCommand: "comando",
    vMaterial: "MATERIAL[,quantidade]",
    vSound: "SOM[,volume[,pitch]]",
    vWorldXyz: "mundo,x,y,z",
    vCondFmt: "condição;açãoSeTrue[;açãoSeFalse]",
    vMenuId: "menuId",
    vEmpty: "(vazio)",
    aMessage: "Envia uma mensagem ao jogador (suporta cor legacy {amp}).",
    aCommand:
      "Executa o comando como {console} — para comandos tipo {give} ou LuckPerms que não precisam que o sender seja o jogador.",
    console: "console",
    aCommandAsPlayer:
      "Executa o comando {asPlayer} — necessário para comandos próprios do RPGRoll (ex. {quest}), que exigem {sender} e falham em silêncio se disparados pelo console.",
    asPlayer: "como o jogador que clicou",
    aGiveItem: "Dá um item; o que não entra no inventário cai aos pés.",
    aTakeItem:
      "Remove um item do inventário (sem checar de novo se há o suficiente — pensado para usar junto a um CONDITIONAL com HAS_ITEM).",
    aSound: "Toca um som na localização do jogador.",
    aTeleport: "Teleporta o jogador.",
    aConditional: "Avalia uma condição e executa uma sub-ação diferente conforme o resultado.",
    aOpenGui: "Abre um menu definido em {menus} (ver abaixo).",
    aClose: "Fecha o inventário que o jogador tiver aberto.",
    aOpenInventory: "Abre um contêiner vanilla vazio (sem itens nem ações próprias).",

    condTitle: "CONDITIONAL: sub-ações e condições",
    condIntro:
      "O formato é {fmt}, e cada sub-ação usa {sub} (com dois pontos, não {pipe} como na GUI de ações):",
    thCondition: "Condição",
    thParam: "Parâmetro",
    pJobId: "jobId",
    pJobLevel: "jobId,nível",
    pLevel: "nível (de personagem)",
    pRaceId: "raçaId",
    pClassId: "classeId",
    pMaterial: "MATERIAL[,quantidade mínima]",
    pPermission: "permissão",
    combineBody:
      "É possível combinar condições com {and} (todas devem ser cumpridas) ou {or} (ao menos uma) — mas não ambos na mesma expressão, já que não há parser de precedência/parênteses: se os dois operadores aparecerem, só o primeiro da esquerda para a direita é avaliado.",

    menusTitle: "Menus (lojas)",
    menusBody:
      "Um menu é uma GUI de inventário configurável, aberta por uma ação {openGui}. Vive em {path}. O motor (ações, condições e GUI) está no RPGRoll-Lib, então o mesmo formato serve para os menus da bússola do {extras} sem depender deste módulo. Além dos campos do exemplo, um menu aceita {filler} (preenche os buracos) e cada item {permission} (só vê quem tiver); em {nameLore}, {player} é o jogador, e uma {head} mostra a cabeça dele:",

    refTitle: "Referência completa: todos os campos em dois arquivos",
    refBody:
      "{files} (incluídos no jar) usam absolutamente todos os tipos de ação, todas as condições de {conditional} (incluindo {andOr}) e todos os campos de um item de menu — pensados para copiar/colar, não para dar em partidas reais do jeito que estão.",

    bMenu: "Construtor visual: NPC Menu",
    bMenuDesc:
      "Identidade da GUI de loja/menu. Os itens do menu (slot/material/nome/lore/ações) são melhor editados com /npc menus, ou copiando/adaptando um dos exemplos acima.",

    orderTitle: "A ordem de GIVE_ITEM e TAKE_ITEM importa",
    orderBody:
      "Para que uma “compra” funcione de verdade são necessários {two} condicionais com a mesma condição: primeiro o que entrega o item, depois o que cobra. Se a cobrança viesse primeiro, o segundo condicional avaliaria {hasItem} de novo já sem o ouro recém-descontado e nunca chegaria a entregar a espada. Não existe uma ação de “transação atômica” — são duas checagens independentes em sequência.",
    two: "dois",
    listNote: "(lista)",
    itemNote:
      "Cada item do menu tem: {fields}, e a sua própria lista de {actions} (mesmo sistema das ações de NPC).",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    cCreate: "Cria um NPC na sua localização e abre o editor.",
    cEdit: "Reabre o editor sobre um NPC existente.",
    cList: "Lista todos os NPCs existentes.",
    cDelete: "Apaga um NPC e o remove para todos.",
    cMenus: "Abre o navegador gráfico de menus (criar/editar menus).",
    cReload: "Recarrega NPCs e menus do disco, sem reiniciar o servidor.",
    permNote:
      "Todos exigem a permissão {perm} (padrão: op) — declarada tanto no comando ({pluginYml}) quanto checada explicitamente no código.",

    fId: "Id",
    fDisplayName: "Nome visível",
    fPose: "Pose",
    fLocation: "Localização",
    fWorld: "Mundo",
    fSkin: "Skin (opcional)",
    fTexture: "Textura (base64)",
    fTextureHelp:
      "No editor in-game ele se resolve só colando um link/id do mineskin.org — aqui tem que colar à mão.",
    fSignature: "Assinatura (base64)",
    mId: "Id",
    mTitle: "Título",
    mRows: "Linhas (1-6)",
  },
};

export const ADDONS_E_COPY: Record<Locale, AddonsECopy> = { es, en, pt };
