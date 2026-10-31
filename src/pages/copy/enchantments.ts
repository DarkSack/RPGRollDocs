import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Enchantments. */

const es = {
  title: "Encantamientos (RPGRoll-Enchantments)",
  intro:
    "Sistema de encantamientos 100% personalizado — no son {ench} reales, sino datos propios guardados en el PDC del ítem, con triggers, condiciones y efectos configurables en YAML.",

  noVanillaTitle: "No pasa por la mesa de encantar, el yunque, ni el grindstone",
  noVanillaBody:
    "No hay ningún listener para {events}. Un encantamiento propio solo se aplica de dos formas: con {cmd}, o programáticamente desde otro addon (así lo hace RPGRoll-Items).",

  reqTitle: "Requisitos",
  reqBody:
    "La relación con RPGRoll-Items es al revés: es {items} quien opcionalmente depende de este addon ({soft} en su {pluginYml}), nunca al contrario — Encantamientos no sabe que Items existe.",
  itemsWord: "Items",

  modelTitle: "Cómo se guarda un encantamiento en el ítem",
  modelBody:
    "{enchItem} escribe los datos directamente en el {pdc} del {stack}, bajo una clave propia ({key} separados por {sep} para varios encantamientos en el mismo ítem) más un contador de cuántas líneas de lore ocupa el bloque de encantamientos — así puede reescribirlo sin pisar lore agregado por otro sistema (RPGRoll-Items, una crate, etc).",

  catTitle: "Categorías y restricción de ítem",
  catBody:
    "Cada definición puede restringir en qué ítems es válida vía {categories} (una o más de {list}, cada una con su propia lógica de qué {material} matchea) o, si necesitas algo más específico, una lista explícita de {allowed} que tiene prioridad sobre las categorías.",

  levelsTitle: "Niveles: tabla de overrides, no fórmula",
  levelsBody:
    "No hay ninguna fórmula de escalado — cada nivel define su propio bloque {block} con pares {pairs} libres, y los efectos referencian esos valores con {ph}. Si un nivel no tiene bloque propio, cada placeholder cae a su valor por defecto hardcodeado en el efecto (no hay interpolación entre niveles vecinos).",

  triggersTitle: "Triggers",
  triggersIntro: "Fijos en un enum — no hay forma de sumar triggers custom sin tocar el código del addon:",
  thTrigger: "Trigger",
  thEvent: "Evento de Bukkit/Paper",
  ePlayerAttack: "EntityDamageByEntityEvent (el jugador es quien pega)",
  eEntityDamage: "EntityDamageEvent (el jugador es quien recibe)",
  eBlockBreak: "BlockBreakEvent",
  ePlayerJump: "PlayerJumpEvent (Paper)",
  ePlayerMove: "PlayerMoveEvent, filtrado a cambios de bloque real (ignora solo mirar alrededor)",
  ePlayerDeath: "PlayerDeathEvent (objetivo = quien mató)",
  eEntityKill: "EntityDeathEvent, si el asesino es un jugador",
  eBlockInteract: "PlayerInteractEvent: clic derecho a un bloque con la mano principal",
  eShieldBlock:
    "EntityDamageEvent cuando el escudo del jugador para el golpe (objetivo = el atacante, o quien disparó el proyectil)",
  eShieldDisable: "PlayerShieldDisableEvent (Paper): un hacha le desactiva el escudo",
  eExpPickup: "PlayerExpChangeEvent al recoger experiencia (lo que sobra tras la Reparación vanilla)",
  scanBody:
    "En cada uno de estos eventos, el addon revisa mano principal, offhand, casco, pechera, piernas y botas del jugador en busca de encantamientos propios, y por cada uno: tira {chance}, evalúa {conditions}, y si todo pasa ejecuta sus {effects}. Los efectos reciben además el evento, el ítem encantado y su ranura: los de herramienta solo actúan si el ítem está en la mano principal.",

  condTitle: "Condiciones",
  condBody:
    "No es un lenguaje de expresiones completo — solo dos formas soportadas: una llamada a función (en la práctica, solo existe {fn}), o una comparación {cmp} contra una tabla fija de variables:",
  thVariable: "Variable",
  thType: "Tipo",
  tNumber: "número",
  tLevel: "número (nivel de RPGRoll, igual que en Quests e Items)",
  tXpLevel: "número (nivel de XP vanilla)",
  tSneaking: "texto (true / false)",
  tShieldTicks: "número: ticks que lleva el escudo levantado (sin escudo, la condición falla)",
  tWorld: "texto (nombre del mundo)",
  tWeather: "texto (STORM / RAIN / CLEAR)",
  tTargetType: "texto (tipo de entidad del objetivo)",
  cmpBody:
    "Comparaciones numéricas admiten {num}; las de texto solo {txt} (sin distinguir mayúsculas). Todas las condiciones de la lista se combinan con Y (todas deben cumplirse) — una lista vacía siempre pasa, y cualquier variable no reconocida hace fallar la condición en silencio (sin log de error).",

  effectsTitle: "Efectos",
  thWhat: "Qué hace",
  fDamage: "Daña al objetivo (no hace nada sin objetivo).",
  fHeal: "Cura al jugador, sin pasar su vida máxima.",
  fLightning: "Rayo real (daña) o solo visual, según {damage}.",
  fPotion:
    "Aplica un efecto de poción al jugador o al objetivo ({applyTo}), con duración/amplificador por nivel.",
  fFire: "Prende fuego al jugador o al objetivo por N ticks.",
  fExplosion: "Explosión con potencia configurable (nunca rompe bloques con fuego).",
  fTeleport: "Al objetivo, o al spawn del mundo.",
  fCommand: "Ejecutado como consola — soporta {ph}.",
  fMessage: "Mensaje al jugador con color legacy ({amp}).",
  fParticle: "Partícula en la ubicación del objetivo o del jugador.",
  fSound: "Sonido reproducido al jugador.",
  fPickupItems: "Absorbe ítems dropeados en un radio cúbico hacia el inventario del jugador.",
  fParticles: "Efecto completo de RPGRoll-FX por id ({effectId}).",
  fVeinMine:
    "Rompe la veta entera de la mena golpeada, hasta {max} bloques (también las menas de RPGRoll-Items).",
  fTreeFell:
    "Tala los troncos conectados hacia arriba ({max}) y, con {leaves}, deshace sus hojas. Solo si el tronco toca hojas naturales: no se come casas de madera.",
  fAreaMine:
    "Martillo: rompe un cuadrado de lado {side} de cara al jugador. Nada más duro que lo golpeado ni bloques con contenido.",
  fAutoSmelt:
    "Lo que suelta el bloque sale fundido (recetas de horno del servidor) con su experiencia. Respeta Fortuna. Un ítem propio solo se funde con una receta exacta para él.",
  fTillArea:
    "Con BLOCK_INTERACT labra un cuadrado de {radius}; con BLOCK_BREAK sobre un cultivo maduro cosecha los de alrededor y, con {replant}, replanta con semillas del inventario o de lo que cayó.",
  fRepair:
    "Con EXP_PICKUP: repara {ratio} de durabilidad por punto de experiencia y gasta solo lo usado; {equipment} reparte por todo el equipo puesto.",
  fDamageBonus: "Suma {amount} (y multiplica por {multiplier}) el daño del golpe, escalado por la carga del ataque.",
  fKnockback: "Empuja al objetivo lejos del jugador ({params}).",
  fReflect:
    "Con SHIELD_BLOCK: devuelve flechas y bolas de fuego a quien las disparó, con el mismo daño ({chance} en %, {speed}).",
  fShieldCooldown:
    "Con SHIELD_DISABLE: multiplica el tiempo que el hacha deja el escudo desactivado por {factor}; 0 lo evita.",
  breakBody:
    "Los efectos que rompen varios bloques lo hacen como si los rompiera el jugador, uno a uno: cada bloque lanza su BlockBreakEvent, así que lo respetan GriefPrevention y WorldGuard, lo registra CoreProtect, gasta la herramienta (nunca hasta romperla: siempre le deja 2 usos) y aplica Fortuna.",
  paramsBody:
    "Los parámetros numéricos aceptan tanto un número literal como {ph} para leerlo del bloque {levels} del nivel actual.",

  includedTitle: "Encantamientos incluidos",
  thId: "Id",
  thFor: "Para",
  wPickaxe: "pico",
  wAxe: "hacha",
  wShovel: "pala",
  wHoe: "azada",
  wSword: "espada",
  wShield: "escudo",
  wAny: "cualquiera",
  iVeinminer: "Minero de vetas I–III (12/24/48 bloques). Agachado no se activa.",
  iTimber: "Leñador I–III (24/64/160 troncos), deshace las hojas. Agachado no se activa.",
  iAutosmelt: "Autofundición.",
  iHammer: "Martillo I–II (3x3 y 5x5). Choca con el minero de vetas.",
  iTiller: "Azada amplia I–II (3x3 y 5x5): labra, cosecha y replanta.",
  iMending:
    "Reparación avanzada I–III (3, 4 y 4 de durabilidad por punto; el III repara todo el equipo).",
  iSharpness: "Filo avanzado I–V: +1 a +5 de daño encima del Filo vanilla.",
  iReflect: "Reflejo I–III (25/50/80 %).",
  iParry: "Parada I–III: un golpe en el primer medio segundo de bloqueo aturde y empuja al atacante.",
  iBash: "Embestida I–II: cada golpe parado empuja al atacante.",
  iTemper: "Temple I–III: el hacha desactiva el escudo un 60 %, un 30 % o nada del tiempo.",
  iAegis: "Égida I–III: un 30 % de las veces, parar un golpe da corazones de absorción.",
  extraBody: "Además vienen {ids}. Todos funcionan igual en Java y en Bedrock: viven en el servidor.",

  yamlTitle: "Ejemplos de archivo YAML",
  shortFormTip:
    "{effects} admite tanto la forma corta {short} (sin parámetros) como la forma detallada {long} — se pueden mezclar en la misma lista, como en el ejemplo de arriba.",
  refTitle: "Referencia completa: todos los campos en un solo archivo",
  refBody: "{file} (incluido en el jar) usa absolutamente todos los campos disponibles.",

  bTitle: "Constructor visual: Custom Enchantment",
  bDesc:
    "Identidad, rareza, categorías, triggers y condiciones. Effects y levels quedan afuera del formulario — son listas de objetos anidados, copia uno de los ejemplos de arriba y edítalo a mano (es exactamente lo que hace el editor in-game también).",

  itemsTitle: "Integración con RPGRoll-Items",
  itemsBody:
    "{def} tiene dos mapas separados: {vanilla} (encantamientos reales de Bukkit, aplicados directamente por Items sin pasar por este addon) y {custom} ({idLevel}, resueltos contra este addon). Al crear el ítem, Items comprueba en runtime si {plugin} está instalado — si no lo está, esa parte simplemente no hace nada; si lo está, busca cada definición por id y llama al mismo {apply} que usa {cmd}.",

  guiTitle: "GUI: navegador y editor",
  guiBody:
    "{browser} abre un navegador con todos los encantamientos definidos y un botón “Crear nuevo”. El editor cubre identidad, rareza, una grilla de 9 categorías y otra de 9 triggers (toggle por click), y la lista de efectos con alta rápida por chat ({fmt}).",
  guiNote:
    "Además, la GUI de Items ({gui}) tiene su {own} editor, pero solo permite asignar {idLevel} a un ítem existente — no crea definiciones nuevas. Para eso siempre hace falta {cmd}.",
  ownWord: "propio",

  cmdTitle: "Comandos",
  thCommand: "Comando",
  xApply: "Aplica el encantamiento al ítem en tu mano principal.",
  xRemove: "Lo quita del ítem en tu mano.",
  xGive: "Se lo aplica a otro jugador (funciona desde consola).",
  xList: "Lista todos los encantamientos definidos.",
  xInfo: "Muestra rareza, nivel máximo, triggers, probabilidad y conflictos.",
  xBrowser: "Abre el navegador gráfico (crear/editar definiciones).",
  xReload: "Recarga las definiciones desde disco.",
  permNote:
    "Todos requieren {perm} (default: op) — chequeado una sola vez al principio del comando, no por subcomando.",

  failTitle: "apply/remove no pueden fallar por conflicto silenciosamente",
  failBody:
    "Si el encantamiento excede su nivel máximo, choca con uno ya presente en el ítem (vía {conflicts}), o el ítem no pertenece a una categoría permitida, {apply} responde con el motivo exacto en vez de aplicarlo a medias.",

  phTitle: "Placeholders (PlaceholderAPI)",
  phIntro: "Expansión {exp} — todos leen el ítem en la mano principal.",
  thPlaceholder: "Placeholder",
  thValue: "Valor",
  pCount: "Cantidad de encantamientos custom en el ítem.",
  pLevel: "Nivel de ese encantamiento en el ítem (0 si no lo tiene).",
  pHas: "{yesno}.",

  fId: "Id",
  fDisplayName: "Nombre visible",
  fRarity: "Rareza",
  fMaxLevel: "Nivel máximo",
  fCategories: "Categorías permitidas",
  fTrigger: "Triggers",
  fConditions: "Condiciones",
  fConflicts: "Conflictos (ids)",
  fChance: "Probabilidad",
  fChancePh: "100% (opcional, ej. 15%)",
};

export type EnchantmentsCopy = typeof es;

const en: EnchantmentsCopy = {
  title: "Enchantments (RPGRoll-Enchantments)",
  intro:
    "A 100% custom enchantment system — these are not real {ench}, but the addon's own data stored in the item's PDC, with triggers, conditions and effects configurable in YAML.",

  noVanillaTitle: "It does not go through the enchanting table, the anvil, or the grindstone",
  noVanillaBody:
    "There is no listener for {events}. A custom enchantment is applied in only two ways: with {cmd}, or programmatically from another addon (which is what RPGRoll-Items does).",

  reqTitle: "Requirements",
  reqBody:
    "The relationship with RPGRoll-Items runs the other way: it is {items} that optionally depends on this addon ({soft} in its {pluginYml}), never the reverse — Enchantments does not know Items exists.",
  itemsWord: "Items",

  modelTitle: "How an enchantment is stored on the item",
  modelBody:
    "{enchItem} writes the data straight into the {stack}'s {pdc}, under a key of its own ({key} separated by {sep} for several enchantments on the same item) plus a counter of how many lore lines the enchantment block takes up — so it can rewrite it without clobbering lore added by another system (RPGRoll-Items, a crate, etc).",

  catTitle: "Categories and item restriction",
  catBody:
    "Each definition can restrict which items it is valid on via {categories} (one or more of {list}, each with its own logic for which {material} matches) or, if you need something more specific, an explicit {allowed} list that takes precedence over the categories.",

  levelsTitle: "Levels: an override table, not a formula",
  levelsBody:
    "There is no scaling formula — each level defines its own {block} block with free {pairs} pairs, and effects reference those values with {ph}. If a level has no block of its own, each placeholder falls back to its default hardcoded in the effect (there is no interpolation between neighboring levels).",

  triggersTitle: "Triggers",
  triggersIntro: "Fixed in an enum — there is no way to add custom triggers without touching the addon's code:",
  thTrigger: "Trigger",
  thEvent: "Bukkit/Paper event",
  ePlayerAttack: "EntityDamageByEntityEvent (the player is the one hitting)",
  eEntityDamage: "EntityDamageEvent (the player is the one taking the hit)",
  eBlockBreak: "BlockBreakEvent",
  ePlayerJump: "PlayerJumpEvent (Paper)",
  ePlayerMove: "PlayerMoveEvent, filtered to real block changes (ignores just looking around)",
  ePlayerDeath: "PlayerDeathEvent (target = the killer)",
  eEntityKill: "EntityDeathEvent, if the killer is a player",
  eBlockInteract: "PlayerInteractEvent: right click on a block with the main hand",
  eShieldBlock:
    "EntityDamageEvent when the player's shield stops the hit (target = the attacker, or whoever shot the projectile)",
  eShieldDisable: "PlayerShieldDisableEvent (Paper): an axe disables their shield",
  eExpPickup: "PlayerExpChangeEvent on picking up experience (whatever is left after vanilla Mending)",
  scanBody:
    "On each of these events, the addon scans the player's main hand, offhand, helmet, chestplate, leggings and boots for its own enchantments, and for each one: rolls {chance}, evaluates {conditions}, and if everything passes runs its {effects}. Effects also receive the event, the enchanted item and its slot: tool effects only act if the item is in the main hand.",

  condTitle: "Conditions",
  condBody:
    "It is not a full expression language — only two forms are supported: a function call (in practice, only {fn} exists), or a {cmp} comparison against a fixed table of variables:",
  thVariable: "Variable",
  thType: "Type",
  tNumber: "number",
  tLevel: "number (RPGRoll level, same as in Quests and Items)",
  tXpLevel: "number (vanilla XP level)",
  tSneaking: "text (true / false)",
  tShieldTicks: "number: ticks the shield has been raised (with no shield, the condition fails)",
  tWorld: "text (world name)",
  tWeather: "text (STORM / RAIN / CLEAR)",
  tTargetType: "text (the target's entity type)",
  cmpBody:
    "Numeric comparisons accept {num}; text ones only {txt} (case-insensitive). Every condition in the list is combined with AND (all must be met) — an empty list always passes, and any unrecognized variable makes the condition fail silently (with no error log).",

  effectsTitle: "Effects",
  thWhat: "What it does",
  fDamage: "Damages the target (does nothing with no target).",
  fHeal: "Heals the player, without exceeding their max health.",
  fLightning: "A real lightning bolt (damages) or visual only, depending on {damage}.",
  fPotion:
    "Applies a potion effect to the player or the target ({applyTo}), with per-level duration/amplifier.",
  fFire: "Sets the player or the target on fire for N ticks.",
  fExplosion: "An explosion with configurable power (it never breaks blocks with fire).",
  fTeleport: "To the target, or to the world spawn.",
  fCommand: "Run as the console — supports {ph}.",
  fMessage: "A message to the player with legacy color ({amp}).",
  fParticle: "A particle at the target's or the player's location.",
  fSound: "A sound played to the player.",
  fPickupItems: "Absorbs dropped items within a cubic radius into the player's inventory.",
  fParticles: "A full RPGRoll-FX effect by id ({effectId}).",
  fVeinMine:
    "Breaks the whole vein of the ore that was hit, up to {max} blocks (RPGRoll-Items ores too).",
  fTreeFell:
    "Fells the logs connected upward ({max}) and, with {leaves}, clears their leaves. Only if the log touches natural leaves: it will not eat wooden houses.",
  fAreaMine:
    "Hammer: breaks a square of side {side} facing the player. Nothing harder than what was hit, and no blocks with contents.",
  fAutoSmelt:
    "Whatever the block drops comes out smelted (the server's furnace recipes) with its experience. Respects Fortune. A custom item only smelts with a recipe made exactly for it.",
  fTillArea:
    "With BLOCK_INTERACT it tills a square of {radius}; with BLOCK_BREAK on a mature crop it harvests the surrounding ones and, with {replant}, replants using seeds from the inventory or from the drops.",
  fRepair:
    "With EXP_PICKUP: repairs {ratio} durability per experience point and spends only what it used; {equipment} spreads it across all worn equipment.",
  fDamageBonus: "Adds {amount} (and multiplies by {multiplier}) to the hit's damage, scaled by attack charge.",
  fKnockback: "Pushes the target away from the player ({params}).",
  fReflect:
    "With SHIELD_BLOCK: returns arrows and fireballs to whoever shot them, with the same damage ({chance} in %, {speed}).",
  fShieldCooldown:
    "With SHIELD_DISABLE: multiplies how long the axe keeps the shield disabled by {factor}; 0 prevents it.",
  breakBody:
    "Effects that break several blocks do it as if the player broke them, one by one: each block fires its BlockBreakEvent, so GriefPrevention and WorldGuard are respected, CoreProtect logs it, the tool wears down (never to the point of breaking: it always leaves 2 uses) and Fortune applies.",
  paramsBody:
    "Numeric parameters accept either a literal number or {ph} to read it from the current level's {levels} block.",

  includedTitle: "Bundled enchantments",
  thId: "Id",
  thFor: "For",
  wPickaxe: "pickaxe",
  wAxe: "axe",
  wShovel: "shovel",
  wHoe: "hoe",
  wSword: "sword",
  wShield: "shield",
  wAny: "any",
  iVeinminer: "Vein Miner I–III (12/24/48 blocks). Sneaking does not trigger it.",
  iTimber: "Timber I–III (24/64/160 logs), clears the leaves. Sneaking does not trigger it.",
  iAutosmelt: "Auto-smelting.",
  iHammer: "Hammer I–II (3x3 and 5x5). Conflicts with Vein Miner.",
  iTiller: "Wide Hoe I–II (3x3 and 5x5): tills, harvests and replants.",
  iMending:
    "Advanced Mending I–III (3, 4 and 4 durability per point; III repairs all equipment).",
  iSharpness: "Advanced Sharpness I–V: +1 to +5 damage on top of vanilla Sharpness.",
  iReflect: "Reflect I–III (25/50/80%).",
  iParry: "Parry I–III: a hit in the first half second of blocking stuns and pushes the attacker.",
  iBash: "Bash I–II: every blocked hit pushes the attacker.",
  iTemper: "Temper I–III: the axe disables the shield 60%, 30% or none of the time.",
  iAegis: "Aegis I–III: 30% of the time, blocking a hit grants absorption hearts.",
  extraBody: "It also ships {ids}. They all work the same on Java and Bedrock: they live on the server.",

  yamlTitle: "YAML file examples",
  shortFormTip:
    "{effects} accepts both the short form {short} (no parameters) and the detailed form {long} — they can be mixed in the same list, as in the example above.",
  refTitle: "Full reference: every field in a single file",
  refBody: "{file} (shipped in the jar) uses absolutely every available field.",

  bTitle: "Visual builder: Custom Enchantment",
  bDesc:
    "Identity, rarity, categories, triggers and conditions. Effects and levels are left out of the form — they are lists of nested objects, so copy one of the examples above and edit it by hand (which is exactly what the in-game editor does too).",

  itemsTitle: "Integration with RPGRoll-Items",
  itemsBody:
    "{def} has two separate maps: {vanilla} (real Bukkit enchantments, applied directly by Items without going through this addon) and {custom} ({idLevel}, resolved against this addon). When creating the item, Items checks at runtime whether {plugin} is installed — if it is not, that part simply does nothing; if it is, it looks up each definition by id and calls the same {apply} that {cmd} uses.",

  guiTitle: "GUI: browser and editor",
  guiBody:
    "{browser} opens a browser with every defined enchantment and a “Create new” button. The editor covers identity, rarity, a grid of 9 categories and another of 9 triggers (click to toggle), and the effects list with quick entry via chat ({fmt}).",
  guiNote:
    "The Items GUI ({gui}) also has its {own} editor, but it only lets you assign {idLevel} to an existing item — it does not create new definitions. That always needs {cmd}.",
  ownWord: "own",

  cmdTitle: "Commands",
  thCommand: "Command",
  xApply: "Applies the enchantment to the item in your main hand.",
  xRemove: "Removes it from the item in your hand.",
  xGive: "Applies it to another player (works from the console).",
  xList: "Lists every defined enchantment.",
  xInfo: "Shows rarity, max level, triggers, chance and conflicts.",
  xBrowser: "Opens the graphical browser (create/edit definitions).",
  xReload: "Reloads the definitions from disk.",
  permNote:
    "All of them require {perm} (default: op) — checked once at the start of the command, not per subcommand.",

  failTitle: "apply/remove cannot fail on a conflict silently",
  failBody:
    "If the enchantment exceeds its max level, clashes with one already on the item (via {conflicts}), or the item does not belong to an allowed category, {apply} answers with the exact reason instead of applying it halfway.",

  phTitle: "Placeholders (PlaceholderAPI)",
  phIntro: "The {exp} expansion — they all read the item in the main hand.",
  thPlaceholder: "Placeholder",
  thValue: "Value",
  pCount: "How many custom enchantments the item has.",
  pLevel: "That enchantment's level on the item (0 if it does not have it).",
  pHas: "{yesno}.",

  fId: "Id",
  fDisplayName: "Display name",
  fRarity: "Rarity",
  fMaxLevel: "Max level",
  fCategories: "Allowed categories",
  fTrigger: "Triggers",
  fConditions: "Conditions",
  fConflicts: "Conflicts (ids)",
  fChance: "Chance",
  fChancePh: "100% (optional, e.g. 15%)",
};

const pt: EnchantmentsCopy = {
  title: "Encantamentos (RPGRoll-Enchantments)",
  intro:
    "Sistema de encantamentos 100% personalizado — não são {ench} reais, e sim dados próprios guardados no PDC do item, com triggers, condições e efeitos configuráveis em YAML.",

  noVanillaTitle: "Não passa pela mesa de encantamento, pela bigorna nem pelo esmeril",
  noVanillaBody:
    "Não há nenhum listener para {events}. Um encantamento próprio é aplicado de apenas duas formas: com {cmd}, ou programaticamente de outro addon (é assim que o RPGRoll-Items faz).",

  reqTitle: "Requisitos",
  reqBody:
    "A relação com o RPGRoll-Items é ao contrário: é o {items} que opcionalmente depende deste addon ({soft} no seu {pluginYml}), nunca o inverso — o Enchantments não sabe que o Items existe.",
  itemsWord: "Items",

  modelTitle: "Como um encantamento é guardado no item",
  modelBody:
    "{enchItem} escreve os dados diretamente no {pdc} do {stack}, sob uma chave própria ({key} separados por {sep} para vários encantamentos no mesmo item) mais um contador de quantas linhas de lore o bloco de encantamentos ocupa — assim pode reescrevê-lo sem atropelar lore adicionado por outro sistema (RPGRoll-Items, uma crate, etc).",

  catTitle: "Categorias e restrição de item",
  catBody:
    "Cada definição pode restringir em quais itens é válida via {categories} (uma ou mais de {list}, cada uma com a sua própria lógica de qual {material} casa) ou, se você precisar de algo mais específico, uma lista explícita de {allowed} que tem prioridade sobre as categorias.",

  levelsTitle: "Níveis: tabela de overrides, não fórmula",
  levelsBody:
    "Não há nenhuma fórmula de escalonamento — cada nível define o seu próprio bloco {block} com pares {pairs} livres, e os efeitos referenciam esses valores com {ph}. Se um nível não tiver bloco próprio, cada placeholder cai no seu valor padrão fixado no efeito (não há interpolação entre níveis vizinhos).",

  triggersTitle: "Triggers",
  triggersIntro: "Fixos num enum — não há como somar triggers customizados sem mexer no código do addon:",
  thTrigger: "Trigger",
  thEvent: "Evento do Bukkit/Paper",
  ePlayerAttack: "EntityDamageByEntityEvent (o jogador é quem bate)",
  eEntityDamage: "EntityDamageEvent (o jogador é quem recebe)",
  eBlockBreak: "BlockBreakEvent",
  ePlayerJump: "PlayerJumpEvent (Paper)",
  ePlayerMove: "PlayerMoveEvent, filtrado para mudanças de bloco real (ignora só olhar em volta)",
  ePlayerDeath: "PlayerDeathEvent (alvo = quem matou)",
  eEntityKill: "EntityDeathEvent, se o assassino for um jogador",
  eBlockInteract: "PlayerInteractEvent: clique direito num bloco com a mão principal",
  eShieldBlock:
    "EntityDamageEvent quando o escudo do jogador para o golpe (alvo = o atacante, ou quem disparou o projétil)",
  eShieldDisable: "PlayerShieldDisableEvent (Paper): um machado desativa o escudo dele",
  eExpPickup: "PlayerExpChangeEvent ao recolher experiência (o que sobra depois do Reparo vanilla)",
  scanBody:
    "Em cada um desses eventos, o addon revisa mão principal, offhand, capacete, peitoral, calças e botas do jogador em busca de encantamentos próprios, e para cada um: tira {chance}, avalia {conditions}, e se tudo passar executa os seus {effects}. Os efeitos recebem também o evento, o item encantado e o seu slot: os de ferramenta só agem se o item estiver na mão principal.",

  condTitle: "Condições",
  condBody:
    "Não é uma linguagem de expressões completa — só duas formas são suportadas: uma chamada de função (na prática, só existe {fn}), ou uma comparação {cmp} contra uma tabela fixa de variáveis:",
  thVariable: "Variável",
  thType: "Tipo",
  tNumber: "número",
  tLevel: "número (nível do RPGRoll, igual ao Quests e ao Items)",
  tXpLevel: "número (nível de XP vanilla)",
  tSneaking: "texto (true / false)",
  tShieldTicks: "número: ticks que o escudo está levantado (sem escudo, a condição falha)",
  tWorld: "texto (nome do mundo)",
  tWeather: "texto (STORM / RAIN / CLEAR)",
  tTargetType: "texto (tipo de entidade do alvo)",
  cmpBody:
    "Comparações numéricas aceitam {num}; as de texto só {txt} (sem distinguir maiúsculas). Todas as condições da lista são combinadas com E (todas devem ser cumpridas) — uma lista vazia sempre passa, e qualquer variável não reconhecida faz a condição falhar em silêncio (sem log de erro).",

  effectsTitle: "Efeitos",
  thWhat: "O que faz",
  fDamage: "Causa dano ao alvo (não faz nada sem alvo).",
  fHeal: "Cura o jogador, sem passar da vida máxima dele.",
  fLightning: "Raio real (causa dano) ou só visual, conforme {damage}.",
  fPotion:
    "Aplica um efeito de poção ao jogador ou ao alvo ({applyTo}), com duração/amplificador por nível.",
  fFire: "Põe fogo no jogador ou no alvo por N ticks.",
  fExplosion: "Explosão com potência configurável (nunca quebra blocos com fogo).",
  fTeleport: "Para o alvo, ou para o spawn do mundo.",
  fCommand: "Executado como console — suporta {ph}.",
  fMessage: "Mensagem ao jogador com cor legacy ({amp}).",
  fParticle: "Partícula na localização do alvo ou do jogador.",
  fSound: "Som tocado ao jogador.",
  fPickupItems: "Absorve itens dropados num raio cúbico para o inventário do jogador.",
  fParticles: "Efeito completo do RPGRoll-FX por id ({effectId}).",
  fVeinMine:
    "Quebra o veio inteiro do minério atingido, até {max} blocos (também os minérios do RPGRoll-Items).",
  fTreeFell:
    "Derruba os troncos conectados para cima ({max}) e, com {leaves}, desfaz as folhas deles. Só se o tronco tocar folhas naturais: não come casas de madeira.",
  fAreaMine:
    "Martelo: quebra um quadrado de lado {side} de frente para o jogador. Nada mais duro que o atingido nem blocos com conteúdo.",
  fAutoSmelt:
    "O que o bloco solta sai fundido (receitas de fornalha do servidor) com a sua experiência. Respeita Fortuna. Um item próprio só funde com uma receita exata para ele.",
  fTillArea:
    "Com BLOCK_INTERACT ara um quadrado de {radius}; com BLOCK_BREAK sobre uma plantação madura colhe as de volta e, com {replant}, replanta com sementes do inventário ou do que caiu.",
  fRepair:
    "Com EXP_PICKUP: repara {ratio} de durabilidade por ponto de experiência e gasta só o usado; {equipment} distribui por todo o equipamento vestido.",
  fDamageBonus: "Soma {amount} (e multiplica por {multiplier}) ao dano do golpe, escalado pela carga do ataque.",
  fKnockback: "Empurra o alvo longe do jogador ({params}).",
  fReflect:
    "Com SHIELD_BLOCK: devolve flechas e bolas de fogo a quem as disparou, com o mesmo dano ({chance} em %, {speed}).",
  fShieldCooldown:
    "Com SHIELD_DISABLE: multiplica o tempo que o machado deixa o escudo desativado por {factor}; 0 evita.",
  breakBody:
    "Os efeitos que quebram vários blocos fazem isso como se o jogador os quebrasse, um a um: cada bloco lança o seu BlockBreakEvent, então GriefPrevention e WorldGuard são respeitados, o CoreProtect registra, a ferramenta se gasta (nunca até quebrar: sempre deixa 2 usos) e a Fortuna se aplica.",
  paramsBody:
    "Os parâmetros numéricos aceitam tanto um número literal como {ph} para lê-lo do bloco {levels} do nível atual.",

  includedTitle: "Encantamentos incluídos",
  thId: "Id",
  thFor: "Para",
  wPickaxe: "picareta",
  wAxe: "machado",
  wShovel: "pá",
  wHoe: "enxada",
  wSword: "espada",
  wShield: "escudo",
  wAny: "qualquer",
  iVeinminer: "Minerador de veios I–III (12/24/48 blocos). Agachado não ativa.",
  iTimber: "Lenhador I–III (24/64/160 troncos), desfaz as folhas. Agachado não ativa.",
  iAutosmelt: "Autofundição.",
  iHammer: "Martelo I–II (3x3 e 5x5). Conflita com o minerador de veios.",
  iTiller: "Enxada ampla I–II (3x3 e 5x5): ara, colhe e replanta.",
  iMending:
    "Reparo avançado I–III (3, 4 e 4 de durabilidade por ponto; o III repara todo o equipamento).",
  iSharpness: "Afiação avançada I–V: +1 a +5 de dano acima da Afiação vanilla.",
  iReflect: "Reflexo I–III (25/50/80 %).",
  iParry: "Aparar I–III: um golpe no primeiro meio segundo de bloqueio atordoa e empurra o atacante.",
  iBash: "Investida I–II: cada golpe aparado empurra o atacante.",
  iTemper: "Têmpera I–III: o machado desativa o escudo 60 %, 30 % ou nada do tempo.",
  iAegis: "Égide I–III: 30 % das vezes, aparar um golpe dá corações de absorção.",
  extraBody: "Além disso vêm {ids}. Todos funcionam igual no Java e no Bedrock: vivem no servidor.",

  yamlTitle: "Exemplos de arquivo YAML",
  shortFormTip:
    "{effects} aceita tanto a forma curta {short} (sem parâmetros) como a forma detalhada {long} — podem ser misturadas na mesma lista, como no exemplo acima.",
  refTitle: "Referência completa: todos os campos num único arquivo",
  refBody: "{file} (incluído no jar) usa absolutamente todos os campos disponíveis.",

  bTitle: "Construtor visual: Custom Enchantment",
  bDesc:
    "Identidade, raridade, categorias, triggers e condições. Effects e levels ficam fora do formulário — são listas de objetos aninhados, copie um dos exemplos acima e edite à mão (é exatamente o que o editor in-game faz também).",

  itemsTitle: "Integração com o RPGRoll-Items",
  itemsBody:
    "{def} tem dois mapas separados: {vanilla} (encantamentos reais do Bukkit, aplicados diretamente pelo Items sem passar por este addon) e {custom} ({idLevel}, resolvidos contra este addon). Ao criar o item, o Items verifica em runtime se o {plugin} está instalado — se não estiver, essa parte simplesmente não faz nada; se estiver, busca cada definição por id e chama o mesmo {apply} que o {cmd} usa.",

  guiTitle: "GUI: navegador e editor",
  guiBody:
    "{browser} abre um navegador com todos os encantamentos definidos e um botão “Criar novo”. O editor cobre identidade, raridade, uma grade de 9 categorias e outra de 9 triggers (toggle por clique), e a lista de efeitos com cadastro rápido pelo chat ({fmt}).",
  guiNote:
    "Além disso, a GUI do Items ({gui}) tem o seu {own} editor, mas só permite atribuir {idLevel} a um item existente — não cria definições novas. Para isso sempre é preciso {cmd}.",
  ownWord: "próprio",

  cmdTitle: "Comandos",
  thCommand: "Comando",
  xApply: "Aplica o encantamento ao item na sua mão principal.",
  xRemove: "Remove do item na sua mão.",
  xGive: "Aplica em outro jogador (funciona pelo console).",
  xList: "Lista todos os encantamentos definidos.",
  xInfo: "Mostra raridade, nível máximo, triggers, probabilidade e conflitos.",
  xBrowser: "Abre o navegador gráfico (criar/editar definições).",
  xReload: "Recarrega as definições do disco.",
  permNote:
    "Todos exigem {perm} (padrão: op) — checado uma única vez no começo do comando, não por subcomando.",

  failTitle: "apply/remove não podem falhar por conflito silenciosamente",
  failBody:
    "Se o encantamento exceder o seu nível máximo, conflitar com um já presente no item (via {conflicts}), ou o item não pertencer a uma categoria permitida, {apply} responde com o motivo exato em vez de aplicá-lo pela metade.",

  phTitle: "Placeholders (PlaceholderAPI)",
  phIntro: "Expansão {exp} — todos leem o item na mão principal.",
  thPlaceholder: "Placeholder",
  thValue: "Valor",
  pCount: "Quantidade de encantamentos customizados no item.",
  pLevel: "Nível desse encantamento no item (0 se não tiver).",
  pHas: "{yesno}.",

  fId: "Id",
  fDisplayName: "Nome visível",
  fRarity: "Raridade",
  fMaxLevel: "Nível máximo",
  fCategories: "Categorias permitidas",
  fTrigger: "Triggers",
  fConditions: "Condições",
  fConflicts: "Conflitos (ids)",
  fChance: "Probabilidade",
  fChancePh: "100% (opcional, ex. 15%)",
};

export const ENCHANTMENTS_COPY: Record<Locale, EnchantmentsCopy> = { es, en, pt };
