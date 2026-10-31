import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Items. */

const es = {
  title: "Ítems (RPGRoll-Items)",
  intro:
    "Motor de ítems completamente personalizados: rareza, stats propios + atributos vanilla reales, sockets con gemas, skins, mejoras (+1, +2…), durabilidad propia, encantamientos, habilidades activas/pasivas y recetas — todo con editor gráfico completo.",

  reqTitle: "Requisitos",

  rarityTitle: "Rareza",
  rarityBody:
    "No es un enum cerrado — es un contenido más, cargado desde {dir}. Cada rareza define color, si brilla, y opcionalmente un sonido/partícula. El brillo se implementa con el truco clásico: agrega el encantamiento vanilla {ench} nivel 1 (si el ítem no tiene ya otros encantamientos) más el flag {flag} para que no se vea en el tooltip.",
  thColor: "Color",
  thGlow: "Brillo",
  cWhite: "blanco",
  cGreen: "verde",
  cAqua: "aqua",
  cPurple: "violeta",
  cGold: "dorado",
  cRed: "rojo",
  cYellow: "amarillo",
  yes: "sí",
  no: "no",
  builderRarity: "Constructor visual: Rarity",

  statsTitle: "Dos sistemas de números: stats propios vs. atributos vanilla",
  statsBody:
    "{attributes} son atributos {real} de Bukkit ({dmg}, {armor}, etc.) — se ven en el tooltip nativo salvo que ocultes con {hide}. {stats} son números propios de RPGRoll sin significado nativo para Minecraft — solo importan porque el motor de stats y los listeners de combate los leen por nombre.",
  realWord: "reales",
  statsCalloutTitle: "Solo 2 stats propios tienen efecto automático",
  statsCalloutBody:
    "{health} se suma a {maxHealth} y {speed} a {moveSpeed} (÷100) en cuanto el ítem se equipa. El resto ({others}, etc.) los lee directamente el listener de combate al calcular el golpe — no son atributos vanilla, así que no aparecen en ningún tooltip nativo.",
  pollingBody:
    "La detección de equipar/desequipar es {polling}, cada 10 ticks, sobre las 6 ranuras relevantes (mano, offhand, casco, pechera, piernas, botas) — Bukkit no tiene un solo evento que cubra todos los casos (comandos, dispensadores, clics de inventario…).",
  pollingWord: "por polling",
  statsListBody: "18 stats conocidos de fábrica: {list} — otros addons pueden sumar más.",

  socketsTitle: "Sockets y gemas",
  socketsBody:
    "Un ítem declara ranuras ({sockets}, con {id} y tipos aceptados opcionales) y una gema se inserta con {cmd}, tomando la gema de tu {offhand} y consumiéndola si encaja. El bono de stats de cada gema insertada se suma al de la definición base + mejoras.",
  gemsBody:
    "La gema es un {emerald} con lore salvo que su YAML diga otra cosa: {material} cambia el ítem base e {itemModel} le da su propio modelo del resource pack (ver {link}). Para repartirlas, cualquier sitio que acepte un id de ítem acepta también {gemRef}: {cmd}, o {ref} en el botín de RPGRoll-Mobs y RPGRoll-Dungeons.",
  texturesLink: "Texturas propias",
  builderGem: "Constructor visual: Gem",

  skinsTitle: "Skins, mejoras y durabilidad",
  skinsItem: "{skins} ({cmd}) — cicla entre apariencias alternativas (material/nombre/CMD distintos), 100 % cosmético, nunca toca stats.",
  skinsWord: "Skins",
  upgradesItem:
    "{upgrades} ({cmd}) — niveles {levels} definidos en YAML, cada uno con su propio bono de stats aditivo y costo (dinero vía Vault y/o un material del inventario). Puede fallar por {e1}, {e2} (hueco en la lista de niveles), {e3} o {e4}.",
  upgradesWord: "Mejoras",
  durabilityItem:
    "{dur} — sistema propio, independiente del daño vanilla del ítem (se crea sin daño real; el contador vive aparte). Se degrada en golpes/romper bloques, se puede reparar manualmente o automáticamente (cada minuto, si {auto}); al llegar a 0 el ítem se consume.",
  durabilityWord: "Durabilidad",

  texturesTitle: "Texturas propias: item-model",
  texturesBody:
    "{example} pone el componente {component} (1.21.4+) en el ítem: el cliente dibuja ese modelo en lugar del del material base. Vale en la definición y en cada skin. Si no se pone el namespace se asume {mc}.",
  texturesPackBody:
    "El resource pack tiene que traer {path} (la definición del ítem), su modelo y su textura; con SackResourcePack basta con un módulo de contenido que los incluya. Quien rechace el pack ve el material base, así que conviene que el material tenga sentido por sí solo.",
  bedrockTitle: "El mismo identificador sirve para Bedrock",
  bedrockBody:
    "Los mappings de ítems de Geyser (formato 2) reconocen un ítem por su material de Java y su {component}. Una definición con {model} bajo {ironSword} en {dir}, más un {mcpack} con la textura en {packs}, hace que los jugadores de Bedrock vean lo mismo.",
  equipmentBody:
    "{example} hace lo mismo con cómo se ve una armadura {worn}: apunta a {path}, que a su vez nombra las capas {layer1} y {layer2} (64x32, el mapa de siempre). Solo cuenta en materiales que se equipan en la cabeza, el pecho, las piernas o los pies; en Bedrock hace falta además un {attachable} en el {mcpack}.",
  wornWord: "puesta",
  equipmentNoneBody:
    "{none} deja la pieza sin aspecto de armadura. En la cabeza, el cliente pinta entonces el {itemModel} con su transformación {display}: así se lleva un casco con modelo 3D propio (cuernos, crestas, visores), igual que una calabaza tallada.",
  itemModelWord: "modelo del ítem",

  oresTitle: "Menas propias",
  oresBody:
    "Minecraft no deja añadir bloques desde un plugin, así que una mena es un estado de bloque vanilla que el resource pack dibuja como otra cosa. Cada archivo de {dir} dice qué estado usa, qué suelta, cuánto cuesta picarla y dónde aparece:",
  oDisguise: "{label}: bloques musicales con instrumento de cabeza ({zombie}, {skeleton}…), 25 notas cada uno. Con {setting} en {file} un bloque musical colocado a mano se queda siempre en arpa y nadie puede fabricar una mena; el plugin lo comprueba igualmente al colocar. Los bloques musicales normales dejan de cambiar de instrumento según el bloque de abajo.",
  oDisguiseLabel: "El disfraz",
  oMine:
    "{label}: el cliente cree que pica un bloque musical, así que mientras se pica una mena se ajusta el atributo {attr} del jugador para que tarde lo que dice {hardness} con el pico que lleve. Sin pico, o con uno de nivel menor que {tier}, tarda más de tres veces y no suelta nada. Fortuna multiplica el drop como en vanilla; Toque de seda no cambia nada (suelta el mineral igual).",
  oMineLabel: "Picarla",
  oTier:
    "{label}: madera y oro 0, piedra y cobre 1, hierro 2, diamante 3, netherita 4. Un pico de RPGRoll puede declarar otro con {data}; {speed} es su velocidad contra las menas (la del diamante es 8).",
  oTierLabel: "Nivel de pico",
  oGen:
    "{label}: al cargar un chunk nuevo en los mundos de {worlds}, cada veta sustituye los bloques de {replace} por la variante que diga. En los mundos de {retrogen} ({config}) también se siembran los chunks que ya existían, una sola vez por mena: pensado para un mundo de recursos, nunca para uno con construcciones.",
  oGenLabel: "Generación",
  oMisc:
    "No suena ni se afina, no arde, y una explosión la rompe soltando su mineral. {cmd} lista las menas y cuántos bloques se han sembrado desde el arranque.",
  oreWarnTitle: "No cambies el estado de una mena que ya está en el mundo",
  oreWarnBody:
    "El mundo guarda el estado del bloque, no el id de la mena. Si le das a una mena otro estado, las ya generadas se quedan como bloques musicales sueltos (o pasan a ser otra mena).",
  oreBedrockTitle: "Para Bedrock",
  oreBedrockBody:
    "Geyser dibuja esos estados con un mapeo de bloques en {dir} ({noteblock} con {override} y un {states} por estado, cada uno con su textura de {texture}) y el tiempo de picado de {mining}.",

  behaviorTitle: "Triggers, habilidades y condiciones",
  behaviorBody:
    "Un ítem tiene dos formas de reaccionar a eventos: {triggers} (acciones directas, sin condición extra) y {abilities} (con cooldown propio y condiciones, activas o pasivas).",
  triggersBody: "21 triggers disponibles: {list}.",
  actionsBody:
    "Acciones incorporadas: {list} — cinemáticas, abrir GUIs y scripts quedan como punto de extensión para otros addons.",
  placeholdersBody:
    "{message} y {command} reemplazan {player} por el jugador, {target} por el objetivo si es un jugador y {targetUuid} por el UUID del objetivo sea lo que sea. Este último es el que sirve contra mobs: {example}.",
  conditionsBody:
    "Las condiciones de una {ability} son expresiones simples ({e1}, {e2}, {e3}) resueltas contra {v1}, {v2}, {v3}, {v4} — extensible vía registro de variables para otros addons.",

  shootTitle: "Armas de fuego: SHOOT",
  shootBody:
    "{shoot} dispara desde el cañón del arma, no desde los ojos. Sin {speed} el disparo es instantáneo (un rayo con su estela). Con {speed2} sale un proyectil con modelo que vuela tic a tic, cae con {gravity} y explota o hace daño donde pegue. El daño y la explosión van a nombre del tirador: no se hace daño a sí mismo y las protecciones (GriefPrevention, WorldGuard) deciden qué bloques se rompen.",
  thParam: "Parámetro",
  thDefault: "Por defecto",
  thWhat: "Qué hace",
  sAmount: "Daño a la criatura alcanzada.",
  sRange: "Alcance en bloques.",
  sSpeed: "Bloques por tic. 0 = instantáneo.",
  sGravity: "Caída por tic del proyectil.",
  sModel: "Modelo del proyectil ({component}, p. ej. {example}).",
  sParticle: "Núcleo de la estela. {color} y {size} valen para DUST.",
  sParticle2: "Segunda partícula de la estela.",
  sSpiral: "Radio con el que la segunda partícula se enrosca alrededor del núcleo.",
  sDensity: "Puntos de estela por bloque.",
  sExplosion: "Potencia de la explosión al impactar (0 = ninguna; TNT es 4).",
  sBreak: "Si la explosión rompe bloques.",
  sFire: "Si la explosión prende fuego.",
  sMuzzle: "Efecto de RPGRoll-FX en el cañón al disparar.",
  sHit: "Efecto de RPGRoll-FX donde pega.",
  sSustain: "Láser sostenido: tics que el rayo sigue encendido tras cada disparo (solo sin {speed}). Ver abajo.",
  sSound: "Sonido del disparo (nombre de {sound}, p. ej. {example}).",
  sAmmo:
    "Munición que gasta cada disparo: id de un ítem de RPGRoll-Items ({cell}) o {mc}. Sin ella no dispara. En creativo hace falta llevarla, pero no se gasta.",
  sAmmoAmount: "Cuántas gasta cada disparo.",
  sNoAmmoSound: "Sonido al apretar el gatillo sin munición (vacío = ninguno).",
  sNoAmmoMessage: "Aviso en la barra de acción sin munición (MiniMessage y placeholders).",
  ammoTitle: "Munición (1.1.8)",
  ammoBody:
    "Con {ammo}, un disparo sin munición no hace nada más que su sonido de vacío. Pon el sonido del disparo en {sound} de la propia acción SHOOT y no en una acción SOUND aparte: las acciones de la lista se ejecutan todas, así que una SOUND suelta sonaría aunque el arma esté vacía. Una munición vanilla ({paper}) no cuenta los ítems de RPGRoll hechos sobre ese material.",

  laserTitle: "Láser sostenido",
  laserBody:
    "Con {sustain} el rayo no es un fogonazo: se queda encendido y sigue la mira cada tic mientras mantienes el clic derecho. Java repite el clic mantenido cada 4 tics, y cada repetición es un disparo completo: gasta {ammo}, hace {amount} de daño y renueva el rayo. Son 5 pulsos por segundo, así que {example} son 10 de daño por segundo. Al soltar, el rayo dura {sustain2} tics más y se apaga (6 tapa el hueco entre pulsos). La invulnerabilidad tras un golpe no frena los pulsos del rayo.",
  laserBedrockTitle: "En Bedrock",
  laserBedrockBody:
    "Las texturas animadas de los modelos 3D se ven quietas (el primer fotograma): Bedrock no anima las texturas de los ítems en la mano.",

  useReqTitle: "Requisitos de uso",
  useReqBody: "Un ítem puede pedir nivel, raza, clase, profesión, skill, trait, permiso, o dinero mínimo.",
  useReqWarnTitle: "Bloquean las habilidades, no el equipo",
  useReqWarnBody:
    "Desde la 1.1.7, las {abilities} activas de un ítem no se disparan si no cumples sus requisitos: el chat te dice qué te falta. Equiparlo sigue permitido (solo avisa), y los {triggers} directos y las habilidades pasivas no miran los requisitos. El campo {field} ni siquiera se evalúa todavía (se parsea del YAML pero ningún código lo consulta).",

  recipesTitle: "Recetas",
  recipesBody:
    "{types} se registran como recetas reales de Bukkit al arrancar. {smithing} usa la plantilla de netherite (con try/catch para versiones de servidor más viejas). {dataOnly} son solo datos — no se registran como receta de crafteo; quedan disponibles vía {sourceId} para que otro addon (una tienda de NPC, un sistema de trabajos, misiones) decida cuándo entregar el ítem.",
  ingredientsBody:
    "Un ingrediente puede ser otro ítem de RPGRoll-Items con {itemRef}, en el {key} de una {shaped} o en {ingredients}. {amount} dice cuántos da la receta (por defecto 1, hasta 64). En {furnace} y {stonecutter} la entrada es el primer ingrediente o, si no hay, {baseMaterial}.",
  protectBody:
    "Bukkit solo compara materiales, así que la receta se registra con el material del ítem y el plugin comprueba al preparar el resultado que de verdad sea ese ítem. Con {setting} (por defecto, en {config}) además un ítem de RPGRoll no sirve como su material en recetas vanilla ni en las que piden el material pelado, y no se quema como combustible: un lingote de mitrilo hecho sobre un fragmento de prismarina no fabrica prismarina, y un bastón hecho de palo no es leña.",
  clashTitle: "Dos recetas con la misma forma y los mismos materiales chocan",
  clashBody:
    "Si una receta tuya coincide en forma y materiales con una vanilla (un lingote sobre {ingot} en forma de espada) o con otra tuya, el servidor elige una de las dos y la otra no sale nunca. Da a cada ítem que uses como ingrediente un material base que no aparezca en esa forma.",

  guiTitle: "GUI: navegador y editor",
  guiBody:
    "{cmd} abre un grid paginado con la apariencia real de cada ítem como ícono, filtro por categoría, y búsqueda. Clic izquierdo te da el ítem; clic derecho abre el editor completo — un botón por componente:",
  gui1: "Apariencia, Stats y Atributos, Reglas (requisitos+durabilidad+economía)",
  gui2: "Encantamientos (vanilla + RPGRoll-Enchantments), Efectos, Sockets, Skins",
  gui3: "Mejoras, Comportamiento (triggers), Habilidades, Recetas, Datos custom",
  guiSessionBody:
    "Todos los sub-editores comparten la misma sesión de edición — los cambios se acumulan hasta apretar Guardar, sin importar cuánto navegues entre pantallas.",

  yamlTitle: "Ejemplos de archivo YAML",
  refTitle: "Referencia completa: todos los campos en un solo archivo",
  refBody:
    "{file} (incluido en el jar) usa absolutamente todos los campos que soporta un ítem — pensado para copiar/pegar secciones, no para dar in-game tal cual.",
  builderItem: "Constructor visual: Item",
  builderItemDesc:
    "Identidad, lore, rareza, stats/atributos, requisitos, durabilidad y economía. Encantamientos, triggers, abilities, sockets, skins, upgrades y recipes son demasiado anidados para este formulario — usa /itemadmin editor o copia uno de los ejemplos de arriba.",

  cmdsTitle: "Comandos",
  thCommand: "Comando",
  a1: "Entrega un ítem o una gema de engaste, con overflow al piso.",
  a2: "Lista las menas, su nivel de pico y cuántos bloques se han sembrado desde el arranque.",
  a3: "Lista todos los ítems con su pack y rareza.",
  a4: "Recarga todas las definiciones.",
  a5: "Crea un ítem base y abre el editor directo (sin [pack], eliges/creas uno desde un menú).",
  a6: "Abre el navegador gráfico.",
  a7: "Abre el editor gráfico directo.",
  adminPermBody: "Requiere {perm} (por defecto: op).",
  u1: "Nombre, pack, rareza, nivel de mejora y durabilidad del ítem en tu mano.",
  u2: "Sube un nivel de mejora si puedes pagarlo.",
  u3: "Cicla su skin.",
  u4: "Inserta la gema de tu offhand en esa ranura.",
  noPermBody: "{cmd} no tiene permiso declarado — cualquier jugador puede usarlo sobre el ítem que tenga en la mano.",

  phTitle: "Placeholders (PlaceholderAPI)",
  phBody: "Expansión {exp}. {stat} lee el motor de stats agregados del jugador; {held} lee solo la mano principal.",
  thPlaceholder: "Placeholder",
  thValue: "Valor",
  ph1: "Total de ese stat sumando armadura + mano principal/secundaria + gemas.",
  ph2: "Nombre del ítem en mano, o {dash} si no es un ítem de RPGRoll.",
  ph3: "Id de rareza del ítem en mano.",
  ph4: "Nivel de mejora actual.",
  ph5: "Durabilidad propia (no la barra vanilla).",

  // YamlBuilder
  fId: "Id",
  fCategory: "Categoría",
  fMaterial: "Material (Bukkit)",
  fDisplayName: "Nombre visible",
  fLore: "Lore",
  fRarity: "Rareza (id)",
  fGlow: "Brillo forzado",
  fStats: "Stats propios",
  fAttributes: "Atributos vanilla",
  fRequirements: "Requisitos",
  fLevel: "Nivel",
  fClass: "Clase",
  fDurability: "Durabilidad",
  fMax: "Máxima",
  fRepairable: "Reparable",
  fDegrade: "Degradación por uso",
  fEconomy: "Economía",
  fSell: "Precio de venta",
  fBuy: "Precio de compra",
  fColor: "Color",
  fGlowPlain: "Brillo",
  fSound: "Sonido al obtenerlo",
  fParticle: "Partícula",
  fSocketType: "Tipo de socket aceptado",
  fBaseItem: "Ítem base",
  fItemModel: "Modelo del resource pack",
  fStatBonus: "Bono de stats",
  phNewItem: "nuevo_item",
  phLore: "Forjada para matar dragones.",
  phNewRarity: "nueva_rareza",
  phEpic: "Épica",
  phNewGem: "nueva_gema",
  phRuby: "&cRubí",
};

export type ItemsCopy = typeof es;

const en: ItemsCopy = {
  title: "Items (RPGRoll-Items)",
  intro:
    "A fully custom item engine: rarity, custom stats + real vanilla attributes, sockets with gems, skins, upgrades (+1, +2…), custom durability, enchantments, active/passive abilities and recipes — all with a complete graphical editor.",

  reqTitle: "Requirements",

  rarityTitle: "Rarity",
  rarityBody:
    "It is not a closed enum — it is one more content type, loaded from {dir}. Each rarity defines a color, whether it glows, and optionally a sound/particle. The glow is implemented with the classic trick: it adds the vanilla {ench} enchantment at level 1 (if the item does not already have other enchantments) plus the {flag} flag so it is not shown in the tooltip.",
  thColor: "Color",
  thGlow: "Glow",
  cWhite: "white",
  cGreen: "green",
  cAqua: "aqua",
  cPurple: "purple",
  cGold: "gold",
  cRed: "red",
  cYellow: "yellow",
  yes: "yes",
  no: "no",
  builderRarity: "Visual builder: Rarity",

  statsTitle: "Two number systems: custom stats vs. vanilla attributes",
  statsBody:
    "{attributes} are {real} Bukkit attributes ({dmg}, {armor}, etc.) — they show in the native tooltip unless you hide them with {hide}. {stats} are RPGRoll's own numbers with no native meaning for Minecraft — they only matter because the stat engine and the combat listeners read them by name.",
  realWord: "real",
  statsCalloutTitle: "Only 2 custom stats have an automatic effect",
  statsCalloutBody:
    "{health} is added to {maxHealth} and {speed} to {moveSpeed} (÷100) as soon as the item is equipped. The rest ({others}, etc.) are read directly by the combat listener when calculating the hit — they are not vanilla attributes, so they do not appear in any native tooltip.",
  pollingBody:
    "Equip/unequip detection is {polling}, every 10 ticks, over the 6 relevant slots (hand, offhand, helmet, chestplate, leggings, boots) — Bukkit has no single event covering every case (commands, dispensers, inventory clicks…).",
  pollingWord: "by polling",
  statsListBody: "18 stats known out of the box: {list} — other addons can add more.",

  socketsTitle: "Sockets and gems",
  socketsBody:
    "An item declares slots ({sockets}, with an {id} and optional accepted types) and a gem is inserted with {cmd}, taking the gem from your {offhand} and consuming it if it fits. The stat bonus of each inserted gem adds to that of the base definition + upgrades.",
  gemsBody:
    "The gem is an {emerald} with lore unless its YAML says otherwise: {material} changes the base item and {itemModel} gives it its own resource-pack model (see {link}). To hand them out, anywhere that accepts an item id also accepts {gemRef}: {cmd}, or {ref} in RPGRoll-Mobs and RPGRoll-Dungeons loot.",
  texturesLink: "Custom textures",
  builderGem: "Visual builder: Gem",

  skinsTitle: "Skins, upgrades and durability",
  skinsItem: "{skins} ({cmd}) — cycles through alternative appearances (different material/name/CMD), 100% cosmetic, it never touches stats.",
  skinsWord: "Skins",
  upgradesItem:
    "{upgrades} ({cmd}) — {levels} levels defined in YAML, each with its own additive stat bonus and cost (money via Vault and/or a material from the inventory). It can fail with {e1}, {e2} (a gap in the level list), {e3} or {e4}.",
  upgradesWord: "Upgrades",
  durabilityItem:
    "{dur} — a system of its own, independent from the item's vanilla damage (it is created undamaged; the counter lives apart). It degrades on hits/breaking blocks, it can be repaired manually or automatically (every minute, if {auto}); on reaching 0 the item is consumed.",
  durabilityWord: "Durability",

  texturesTitle: "Custom textures: item-model",
  texturesBody:
    "{example} sets the {component} component (1.21.4+) on the item: the client draws that model instead of the base material's. It works in the definition and in each skin. If the namespace is omitted, {mc} is assumed.",
  texturesPackBody:
    "The resource pack has to ship {path} (the item's definition), its model and its texture; with SackResourcePack a content module that includes them is enough. Anyone who declines the pack sees the base material, so it is a good idea for the material to make sense on its own.",
  bedrockTitle: "The same identifier works for Bedrock",
  bedrockBody:
    "Geyser's item mappings (format 2) recognize an item by its Java material and its {component}. A definition with {model} under {ironSword} in {dir}, plus an {mcpack} with the texture in {packs}, makes Bedrock players see the same thing.",
  equipmentBody:
    "{example} does the same for how armor looks when {worn}: it points at {path}, which in turn names the layers {layer1} and {layer2} (64x32, the usual map). It only counts on materials equipped on the head, chest, legs or feet; on Bedrock an {attachable} in the {mcpack} is also needed.",
  wornWord: "worn",
  equipmentNoneBody:
    "{none} leaves the piece with no armor look. On the head, the client then draws the {itemModel} with its {display} transform: that is how you wear a helmet with its own 3D model (horns, crests, visors), just like a carved pumpkin.",
  itemModelWord: "item's model",

  oresTitle: "Custom ores",
  oresBody:
    "Minecraft does not allow adding blocks from a plugin, so an ore is a vanilla block state the resource pack draws as something else. Each file in {dir} says which state it uses, what it drops, how long it takes to mine and where it appears:",
  oDisguise: "{label}: note blocks with a head instrument ({zombie}, {skeleton}…), 25 notes each. With {setting} in {file} a note block placed by hand always stays on harp and nobody can craft an ore; the plugin checks it on placement anyway. Normal note blocks stop changing instrument based on the block beneath.",
  oDisguiseLabel: "The disguise",
  oMine:
    "{label}: the client thinks it is mining a note block, so while an ore is being mined the player's {attr} attribute is adjusted so it takes as long as {hardness} says with the pickaxe they carry. With no pickaxe, or with one of a lower tier than {tier}, it takes over three times as long and drops nothing. Fortune multiplies the drop as in vanilla; Silk Touch changes nothing (it drops the ore all the same).",
  oMineLabel: "Mining it",
  oTier:
    "{label}: wood and gold 0, stone and copper 1, iron 2, diamond 3, netherite 4. An RPGRoll pickaxe can declare another with {data}; {speed} is its speed against ores (diamond's is 8).",
  oTierLabel: "Pickaxe tier",
  oGen:
    "{label}: on loading a new chunk in the {worlds} worlds, each vein replaces the {replace} blocks with the stated variant. In the {retrogen} worlds ({config}) the already-existing chunks are seeded too, once per ore: meant for a resource world, never for one with builds.",
  oGenLabel: "Generation",
  oMisc:
    "It makes no sound and cannot be tuned, it does not burn, and an explosion breaks it dropping its ore. {cmd} lists the ores and how many blocks have been seeded since startup.",
  oreWarnTitle: "Do not change the state of an ore that is already in the world",
  oreWarnBody:
    "The world stores the block state, not the ore's id. If you give an ore another state, the already-generated ones are left as loose note blocks (or become another ore).",
  oreBedrockTitle: "For Bedrock",
  oreBedrockBody:
    "Geyser draws those states with a block mapping in {dir} ({noteblock} with {override} and one {states} per state, each with its texture from {texture}) and the mining time from {mining}.",

  behaviorTitle: "Triggers, abilities and conditions",
  behaviorBody:
    "An item has two ways of reacting to events: {triggers} (direct actions, with no extra condition) and {abilities} (with their own cooldown and conditions, active or passive).",
  triggersBody: "21 triggers available: {list}.",
  actionsBody:
    "Built-in actions: {list} — cinematics, opening GUIs and scripts are left as an extension point for other addons.",
  placeholdersBody:
    "{message} and {command} replace {player} with the player, {target} with the target if it is a player and {targetUuid} with the target's UUID whatever it is. The latter is the one that works against mobs: {example}.",
  conditionsBody:
    "An {ability}'s conditions are simple expressions ({e1}, {e2}, {e3}) resolved against {v1}, {v2}, {v3}, {v4} — extensible through a variable registry for other addons.",

  shootTitle: "Firearms: SHOOT",
  shootBody:
    "{shoot} fires from the weapon's barrel, not from the eyes. Without {speed} the shot is instant (a beam with its trail). With {speed2} a modeled projectile flies tick by tick, falls with {gravity} and explodes or deals damage where it hits. The damage and the explosion are credited to the shooter: they do not hurt themselves and the protections (GriefPrevention, WorldGuard) decide which blocks break.",
  thParam: "Parameter",
  thDefault: "Default",
  thWhat: "What it does",
  sAmount: "Damage to the creature hit.",
  sRange: "Range in blocks.",
  sSpeed: "Blocks per tick. 0 = instant.",
  sGravity: "The projectile's drop per tick.",
  sModel: "The projectile's model ({component}, e.g. {example}).",
  sParticle: "The trail's core. {color} and {size} apply to DUST.",
  sParticle2: "The trail's second particle.",
  sSpiral: "The radius with which the second particle coils around the core.",
  sDensity: "Trail points per block.",
  sExplosion: "The explosion's power on impact (0 = none; TNT is 4).",
  sBreak: "Whether the explosion breaks blocks.",
  sFire: "Whether the explosion sets fire.",
  sMuzzle: "An RPGRoll-FX effect at the barrel when firing.",
  sHit: "An RPGRoll-FX effect where it hits.",
  sSustain: "Sustained laser: ticks the beam stays lit after each shot (only without {speed}). See below.",
  sSound: "The shot's sound (a {sound} name, e.g. {example}).",
  sAmmo:
    "The ammunition each shot spends: the id of an RPGRoll-Items item ({cell}) or {mc}. Without it, it does not fire. In creative you still need to carry it, but it is not spent.",
  sAmmoAmount: "How many each shot spends.",
  sNoAmmoSound: "The sound on pulling the trigger with no ammo (empty = none).",
  sNoAmmoMessage: "The action-bar notice with no ammo (MiniMessage and placeholders).",
  ammoTitle: "Ammunition (1.1.8)",
  ammoBody:
    "With {ammo}, a shot with no ammunition does nothing but its empty sound. Put the shot's sound in the SHOOT action's own {sound} and not in a separate SOUND action: every action in the list runs, so a loose SOUND would play even with the weapon empty. Vanilla ammunition ({paper}) does not count RPGRoll items made on that material.",

  laserTitle: "Sustained laser",
  laserBody:
    "With {sustain} the beam is not a flash: it stays lit and follows the crosshair every tick while you hold right click. Java repeats the held click every 4 ticks, and each repetition is a full shot: it spends {ammo}, deals {amount} damage and renews the beam. That is 5 pulses per second, so {example} is 10 damage per second. On release, the beam lasts {sustain2} more ticks and goes out (6 covers the gap between pulses). The invulnerability after a hit does not slow the beam's pulses.",
  laserBedrockTitle: "On Bedrock",
  laserBedrockBody:
    "Animated textures on 3D models look still (the first frame): Bedrock does not animate the textures of items in the hand.",

  useReqTitle: "Use requirements",
  useReqBody: "An item can require a level, race, class, profession, skill, trait, permission, or a minimum amount of money.",
  useReqWarnTitle: "They block the abilities, not equipping",
  useReqWarnBody:
    "Since 1.1.7, an item's active {abilities} do not fire if you do not meet its requirements: the chat tells you what you are missing. Equipping it is still allowed (it only warns), and direct {triggers} and passive abilities do not look at the requirements. The {field} field is not even evaluated yet (it is parsed from the YAML but no code queries it).",

  recipesTitle: "Recipes",
  recipesBody:
    "{types} are registered as real Bukkit recipes at startup. {smithing} uses the netherite template (with a try/catch for older server versions). {dataOnly} are data only — they are not registered as a crafting recipe; they remain available through {sourceId} so another addon (an NPC shop, a jobs system, quests) can decide when to hand the item over.",
  ingredientsBody:
    "An ingredient can be another RPGRoll-Items item with {itemRef}, in a {shaped}'s {key} or in {ingredients}. {amount} says how many the recipe yields (1 by default, up to 64). In {furnace} and {stonecutter} the input is the first ingredient or, failing that, {baseMaterial}.",
  protectBody:
    "Bukkit only compares materials, so the recipe is registered with the item's material and the plugin checks when preparing the result that it really is that item. With {setting} (the default, in {config}) an RPGRoll item additionally does not work as its material in vanilla recipes nor in those asking for the bare material, and it does not burn as fuel: a mithril ingot made on a prismarine shard does not craft prismarine, and a staff made of a stick is not firewood.",
  clashTitle: "Two recipes with the same shape and the same materials clash",
  clashBody:
    "If one of your recipes matches a vanilla one in shape and materials (an ingot on {ingot} in a sword shape) or another of yours, the server picks one of the two and the other never comes out. Give each item you use as an ingredient a base material that does not appear in that shape.",

  guiTitle: "GUI: browser and editor",
  guiBody:
    "{cmd} opens a paginated grid with each item's real appearance as its icon, a category filter, and search. Left click gives you the item; right click opens the full editor — one button per component:",
  gui1: "Appearance, Stats and Attributes, Rules (requirements+durability+economy)",
  gui2: "Enchantments (vanilla + RPGRoll-Enchantments), Effects, Sockets, Skins",
  gui3: "Upgrades, Behavior (triggers), Abilities, Recipes, Custom data",
  guiSessionBody:
    "Every sub-editor shares the same editing session — the changes pile up until you press Save, no matter how much you move between screens.",

  yamlTitle: "YAML file examples",
  refTitle: "Full reference: every field in a single file",
  refBody:
    "{file} (included in the jar) uses absolutely every field an item supports — meant for copy/pasting sections, not for handing out in-game as it is.",
  builderItem: "Visual builder: Item",
  builderItemDesc:
    "Identity, lore, rarity, stats/attributes, requirements, durability and economy. Enchantments, triggers, abilities, sockets, skins, upgrades and recipes are too nested for this form — use /itemadmin editor or copy one of the examples above.",

  cmdsTitle: "Commands",
  thCommand: "Command",
  a1: "Hands over an item or a socket gem, with overflow onto the floor.",
  a2: "Lists the ores, their pickaxe tier and how many blocks have been seeded since startup.",
  a3: "Lists every item with its pack and rarity.",
  a4: "Reloads every definition.",
  a5: "Creates a base item and opens the editor directly (without [pack], you pick/create one from a menu).",
  a6: "Opens the graphical browser.",
  a7: "Opens the graphical editor directly.",
  adminPermBody: "Requires {perm} (default: op).",
  u1: "The name, pack, rarity, upgrade level and durability of the item in your hand.",
  u2: "Raises one upgrade level if you can afford it.",
  u3: "Cycles its skin.",
  u4: "Inserts the gem from your offhand into that slot.",
  noPermBody: "{cmd} has no declared permission — any player can use it on the item they are holding.",

  phTitle: "Placeholders (PlaceholderAPI)",
  phBody: "The {exp} expansion. {stat} reads the player's aggregated stat engine; {held} reads only the main hand.",
  thPlaceholder: "Placeholder",
  thValue: "Value",
  ph1: "The total of that stat adding armor + main/off hand + gems.",
  ph2: "The name of the item in hand, or {dash} if it is not an RPGRoll item.",
  ph3: "The rarity id of the item in hand.",
  ph4: "The current upgrade level.",
  ph5: "Custom durability (not the vanilla bar).",

  fId: "Id",
  fCategory: "Category",
  fMaterial: "Material (Bukkit)",
  fDisplayName: "Display name",
  fLore: "Lore",
  fRarity: "Rarity (id)",
  fGlow: "Forced glow",
  fStats: "Custom stats",
  fAttributes: "Vanilla attributes",
  fRequirements: "Requirements",
  fLevel: "Level",
  fClass: "Class",
  fDurability: "Durability",
  fMax: "Maximum",
  fRepairable: "Repairable",
  fDegrade: "Degradation per use",
  fEconomy: "Economy",
  fSell: "Sell price",
  fBuy: "Buy price",
  fColor: "Color",
  fGlowPlain: "Glow",
  fSound: "Sound on obtaining it",
  fParticle: "Particle",
  fSocketType: "Accepted socket type",
  fBaseItem: "Base item",
  fItemModel: "Resource-pack model",
  fStatBonus: "Stat bonus",
  phNewItem: "new_item",
  phLore: "Forged to slay dragons.",
  phNewRarity: "new_rarity",
  phEpic: "Epic",
  phNewGem: "new_gem",
  phRuby: "&cRuby",
};

const pt: ItemsCopy = {
  title: "Itens (RPGRoll-Items)",
  intro:
    "Motor de itens completamente personalizados: raridade, stats próprios + atributos vanilla reais, sockets com gemas, skins, melhorias (+1, +2…), durabilidade própria, encantamentos, habilidades ativas/passivas e receitas — tudo com editor gráfico completo.",

  reqTitle: "Requisitos",

  rarityTitle: "Raridade",
  rarityBody:
    "Não é um enum fechado — é mais um conteúdo, carregado de {dir}. Cada raridade define cor, se brilha, e opcionalmente um som/partícula. O brilho é implementado com o truque clássico: adiciona o encantamento vanilla {ench} nível 1 (se o item ainda não tem outros encantamentos) mais a flag {flag} para que não apareça no tooltip.",
  thColor: "Cor",
  thGlow: "Brilho",
  cWhite: "branco",
  cGreen: "verde",
  cAqua: "aqua",
  cPurple: "roxo",
  cGold: "dourado",
  cRed: "vermelho",
  cYellow: "amarelo",
  yes: "sim",
  no: "não",
  builderRarity: "Construtor visual: Rarity",

  statsTitle: "Dois sistemas de números: stats próprios vs. atributos vanilla",
  statsBody:
    "{attributes} são atributos {real} do Bukkit ({dmg}, {armor}, etc.) — aparecem no tooltip nativo a menos que você oculte com {hide}. {stats} são números próprios do RPGRoll sem significado nativo para o Minecraft — só importam porque o motor de stats e os listeners de combate os leem por nome.",
  realWord: "reais",
  statsCalloutTitle: "Só 2 stats próprios têm efeito automático",
  statsCalloutBody:
    "{health} é somado a {maxHealth} e {speed} a {moveSpeed} (÷100) assim que o item é equipado. O resto ({others}, etc.) é lido diretamente pelo listener de combate ao calcular o golpe — não são atributos vanilla, então não aparecem em nenhum tooltip nativo.",
  pollingBody:
    "A detecção de equipar/desequipar é {polling}, a cada 10 ticks, sobre as 6 ranhuras relevantes (mão, offhand, capacete, peitoral, calças, botas) — o Bukkit não tem um só evento que cubra todos os casos (comandos, dispensers, cliques de inventário…).",
  pollingWord: "por polling",
  statsListBody: "18 stats conhecidos de fábrica: {list} — outros addons podem somar mais.",

  socketsTitle: "Sockets e gemas",
  socketsBody:
    "Um item declara ranhuras ({sockets}, com {id} e tipos aceitos opcionais) e uma gema é inserida com {cmd}, tomando a gema da sua {offhand} e consumindo-a se encaixar. O bônus de stats de cada gema inserida é somado ao da definição base + melhorias.",
  gemsBody:
    "A gema é um {emerald} com lore a menos que o YAML dela diga outra coisa: {material} muda o item base e {itemModel} lhe dá o seu próprio modelo do resource pack (ver {link}). Para distribuí-las, qualquer lugar que aceite um id de item aceita também {gemRef}: {cmd}, ou {ref} no loot do RPGRoll-Mobs e do RPGRoll-Dungeons.",
  texturesLink: "Texturas próprias",
  builderGem: "Construtor visual: Gem",

  skinsTitle: "Skins, melhorias e durabilidade",
  skinsItem: "{skins} ({cmd}) — alterna entre aparências alternativas (material/nome/CMD diferentes), 100 % cosmético, nunca toca em stats.",
  skinsWord: "Skins",
  upgradesItem:
    "{upgrades} ({cmd}) — níveis {levels} definidos em YAML, cada um com o seu próprio bônus de stats aditivo e custo (dinheiro via Vault e/ou um material do inventário). Pode falhar por {e1}, {e2} (buraco na lista de níveis), {e3} ou {e4}.",
  upgradesWord: "Melhorias",
  durabilityItem:
    "{dur} — sistema próprio, independente do dano vanilla do item (é criado sem dano real; o contador vive à parte). Degrada em golpes/quebrar blocos, pode ser reparada manual ou automaticamente (a cada minuto, se {auto}); ao chegar a 0 o item é consumido.",
  durabilityWord: "Durabilidade",

  texturesTitle: "Texturas próprias: item-model",
  texturesBody:
    "{example} coloca o componente {component} (1.21.4+) no item: o cliente desenha esse modelo em vez do do material base. Vale na definição e em cada skin. Se o namespace não é colocado, assume-se {mc}.",
  texturesPackBody:
    "O resource pack tem que trazer {path} (a definição do item), o seu modelo e a sua textura; com o SackResourcePack basta um módulo de conteúdo que os inclua. Quem recusar o pack vê o material base, então convém que o material faça sentido por si só.",
  bedrockTitle: "O mesmo identificador serve para Bedrock",
  bedrockBody:
    "Os mappings de itens do Geyser (formato 2) reconhecem um item pelo seu material de Java e pelo seu {component}. Uma definição com {model} sob {ironSword} em {dir}, mais um {mcpack} com a textura em {packs}, faz com que os jogadores de Bedrock vejam a mesma coisa.",
  equipmentBody:
    "{example} faz o mesmo com a aparência de uma armadura {worn}: aponta para {path}, que por sua vez nomeia as camadas {layer1} e {layer2} (64x32, o mapa de sempre). Só conta em materiais que se equipam na cabeça, no peito, nas pernas ou nos pés; no Bedrock é preciso além disso um {attachable} no {mcpack}.",
  wornWord: "vestida",
  equipmentNoneBody:
    "{none} deixa a peça sem aspecto de armadura. Na cabeça, o cliente pinta então o {itemModel} com a sua transformação {display}: é assim que se usa um capacete com modelo 3D próprio (chifres, cristas, visores), igual a uma abóbora entalhada.",
  itemModelWord: "modelo do item",

  oresTitle: "Minérios próprios",
  oresBody:
    "O Minecraft não deixa adicionar blocos de um plugin, então um minério é um estado de bloco vanilla que o resource pack desenha como outra coisa. Cada arquivo de {dir} diz qual estado usa, o que solta, quanto custa minerá-lo e onde aparece:",
  oDisguise: "{label}: note blocks com instrumento de cabeça ({zombie}, {skeleton}…), 25 notas cada um. Com {setting} em {file} um note block colocado à mão fica sempre em harpa e ninguém pode fabricar um minério; o plugin verifica de qualquer forma ao colocar. Os note blocks normais deixam de mudar de instrumento conforme o bloco de baixo.",
  oDisguiseLabel: "O disfarce",
  oMine:
    "{label}: o cliente acha que está minerando um note block, então enquanto um minério é minerado o atributo {attr} do jogador é ajustado para que demore o que diz {hardness} com a picareta que levar. Sem picareta, ou com uma de nível menor que {tier}, demora mais de três vezes e não solta nada. Fortuna multiplica o drop como no vanilla; Toque suave não muda nada (solta o minério igual).",
  oMineLabel: "Minerá-lo",
  oTier:
    "{label}: madeira e ouro 0, pedra e cobre 1, ferro 2, diamante 3, netherita 4. Uma picareta do RPGRoll pode declarar outro com {data}; {speed} é a velocidade dela contra os minérios (a do diamante é 8).",
  oTierLabel: "Nível de picareta",
  oGen:
    "{label}: ao carregar um chunk novo nos mundos de {worlds}, cada veio substitui os blocos de {replace} pela variante que disser. Nos mundos de {retrogen} ({config}) também são semeados os chunks que já existiam, uma só vez por minério: pensado para um mundo de recursos, nunca para um com construções.",
  oGenLabel: "Geração",
  oMisc:
    "Não toca nem se afina, não queima, e uma explosão o quebra soltando o seu minério. {cmd} lista os minérios e quantos blocos foram semeados desde o início.",
  oreWarnTitle: "Não mude o estado de um minério que já está no mundo",
  oreWarnBody:
    "O mundo guarda o estado do bloco, não o id do minério. Se você der outro estado a um minério, os já gerados ficam como note blocks soltos (ou passam a ser outro minério).",
  oreBedrockTitle: "Para Bedrock",
  oreBedrockBody:
    "O Geyser desenha esses estados com um mapeamento de blocos em {dir} ({noteblock} com {override} e um {states} por estado, cada um com a sua textura de {texture}) e o tempo de mineração de {mining}.",

  behaviorTitle: "Triggers, habilidades e condições",
  behaviorBody:
    "Um item tem duas formas de reagir a eventos: {triggers} (ações diretas, sem condição extra) e {abilities} (com cooldown próprio e condições, ativas ou passivas).",
  triggersBody: "21 triggers disponíveis: {list}.",
  actionsBody:
    "Ações incorporadas: {list} — cinemáticas, abrir GUIs e scripts ficam como ponto de extensão para outros addons.",
  placeholdersBody:
    "{message} e {command} substituem {player} pelo jogador, {target} pelo alvo se for um jogador e {targetUuid} pelo UUID do alvo seja o que for. Este último é o que serve contra mobs: {example}.",
  conditionsBody:
    "As condições de uma {ability} são expressões simples ({e1}, {e2}, {e3}) resolvidas contra {v1}, {v2}, {v3}, {v4} — extensível via registro de variáveis para outros addons.",

  shootTitle: "Armas de fogo: SHOOT",
  shootBody:
    "{shoot} atira do cano da arma, não dos olhos. Sem {speed} o tiro é instantâneo (um raio com o seu rastro). Com {speed2} sai um projétil com modelo que voa tick a tick, cai com {gravity} e explode ou dá dano onde bater. O dano e a explosão vão em nome do atirador: ele não se machuca e as proteções (GriefPrevention, WorldGuard) decidem quais blocos quebram.",
  thParam: "Parâmetro",
  thDefault: "Por padrão",
  thWhat: "O que faz",
  sAmount: "Dano à criatura atingida.",
  sRange: "Alcance em blocos.",
  sSpeed: "Blocos por tick. 0 = instantâneo.",
  sGravity: "Queda por tick do projétil.",
  sModel: "Modelo do projétil ({component}, p. ex. {example}).",
  sParticle: "Núcleo do rastro. {color} e {size} valem para DUST.",
  sParticle2: "Segunda partícula do rastro.",
  sSpiral: "Raio com o qual a segunda partícula se enrola em volta do núcleo.",
  sDensity: "Pontos de rastro por bloco.",
  sExplosion: "Potência da explosão ao impactar (0 = nenhuma; TNT é 4).",
  sBreak: "Se a explosão quebra blocos.",
  sFire: "Se a explosão põe fogo.",
  sMuzzle: "Efeito do RPGRoll-FX no cano ao atirar.",
  sHit: "Efeito do RPGRoll-FX onde bate.",
  sSustain: "Laser sustentado: ticks que o raio segue aceso após cada tiro (só sem {speed}). Ver abaixo.",
  sSound: "Som do tiro (nome de {sound}, p. ex. {example}).",
  sAmmo:
    "Munição que cada tiro gasta: id de um item do RPGRoll-Items ({cell}) ou {mc}. Sem ela não atira. No criativo é preciso levá-la, mas ela não é gasta.",
  sAmmoAmount: "Quantas cada tiro gasta.",
  sNoAmmoSound: "Som ao apertar o gatilho sem munição (vazio = nenhum).",
  sNoAmmoMessage: "Aviso na barra de ação sem munição (MiniMessage e placeholders).",
  ammoTitle: "Munição (1.1.8)",
  ammoBody:
    "Com {ammo}, um tiro sem munição não faz nada além do seu som de vazio. Coloque o som do tiro no {sound} da própria ação SHOOT e não numa ação SOUND à parte: as ações da lista são executadas todas, então uma SOUND solta tocaria mesmo com a arma vazia. Uma munição vanilla ({paper}) não conta os itens do RPGRoll feitos sobre esse material.",

  laserTitle: "Laser sustentado",
  laserBody:
    "Com {sustain} o raio não é um clarão: fica aceso e segue a mira a cada tick enquanto você mantém o clique direito. O Java repete o clique mantido a cada 4 ticks, e cada repetição é um tiro completo: gasta {ammo}, faz {amount} de dano e renova o raio. São 5 pulsos por segundo, então {example} são 10 de dano por segundo. Ao soltar, o raio dura {sustain2} ticks a mais e se apaga (6 tapa o buraco entre pulsos). A invulnerabilidade depois de um golpe não freia os pulsos do raio.",
  laserBedrockTitle: "No Bedrock",
  laserBedrockBody:
    "As texturas animadas dos modelos 3D aparecem paradas (o primeiro quadro): o Bedrock não anima as texturas dos itens na mão.",

  useReqTitle: "Requisitos de uso",
  useReqBody: "Um item pode pedir nível, raça, classe, profissão, skill, trait, permissão, ou dinheiro mínimo.",
  useReqWarnTitle: "Bloqueiam as habilidades, não o equipamento",
  useReqWarnBody:
    "Desde a 1.1.7, as {abilities} ativas de um item não disparam se você não cumprir os requisitos dele: o chat diz o que falta. Equipá-lo continua permitido (só avisa), e os {triggers} diretos e as habilidades passivas não olham os requisitos. O campo {field} nem sequer é avaliado ainda (é parseado do YAML mas nenhum código o consulta).",

  recipesTitle: "Receitas",
  recipesBody:
    "{types} são registrados como receitas reais do Bukkit ao iniciar. {smithing} usa o template de netherita (com try/catch para versões de servidor mais antigas). {dataOnly} são só dados — não são registrados como receita de crafting; ficam disponíveis via {sourceId} para que outro addon (uma loja de NPC, um sistema de trabalhos, missões) decida quando entregar o item.",
  ingredientsBody:
    "Um ingrediente pode ser outro item do RPGRoll-Items com {itemRef}, na {key} de uma {shaped} ou em {ingredients}. {amount} diz quantos a receita dá (por padrão 1, até 64). Em {furnace} e {stonecutter} a entrada é o primeiro ingrediente ou, se não houver, {baseMaterial}.",
  protectBody:
    "O Bukkit só compara materiais, então a receita é registrada com o material do item e o plugin verifica ao preparar o resultado que de verdade seja esse item. Com {setting} (por padrão, no {config}) além disso um item do RPGRoll não serve como o seu material em receitas vanilla nem nas que pedem o material puro, e não queima como combustível: uma barra de mithril feita sobre um fragmento de prismarinho não fabrica prismarinho, e um cajado feito de graveto não é lenha.",
  clashTitle: "Duas receitas com a mesma forma e os mesmos materiais colidem",
  clashBody:
    "Se uma receita sua coincide em forma e materiais com uma vanilla (uma barra sobre {ingot} em forma de espada) ou com outra sua, o servidor escolhe uma das duas e a outra nunca sai. Dê a cada item que você usar como ingrediente um material base que não apareça nessa forma.",

  guiTitle: "GUI: navegador e editor",
  guiBody:
    "{cmd} abre um grid paginado com a aparência real de cada item como ícone, filtro por categoria, e busca. Clique esquerdo te dá o item; clique direito abre o editor completo — um botão por componente:",
  gui1: "Aparência, Stats e Atributos, Regras (requisitos+durabilidade+economia)",
  gui2: "Encantamentos (vanilla + RPGRoll-Enchantments), Efeitos, Sockets, Skins",
  gui3: "Melhorias, Comportamento (triggers), Habilidades, Receitas, Dados custom",
  guiSessionBody:
    "Todos os sub-editores compartilham a mesma sessão de edição — as mudanças se acumulam até apertar Salvar, não importa o quanto você navegue entre telas.",

  yamlTitle: "Exemplos de arquivo YAML",
  refTitle: "Referência completa: todos os campos num só arquivo",
  refBody:
    "{file} (incluído no jar) usa absolutamente todos os campos que um item suporta — pensado para copiar/colar seções, não para dar in-game tal como está.",
  builderItem: "Construtor visual: Item",
  builderItemDesc:
    "Identidade, lore, raridade, stats/atributos, requisitos, durabilidade e economia. Encantamentos, triggers, abilities, sockets, skins, upgrades e recipes são aninhados demais para este formulário — use /itemadmin editor ou copie um dos exemplos acima.",

  cmdsTitle: "Comandos",
  thCommand: "Comando",
  a1: "Entrega um item ou uma gema de engaste, com overflow no chão.",
  a2: "Lista os minérios, o nível de picareta deles e quantos blocos foram semeados desde o início.",
  a3: "Lista todos os itens com o seu pack e raridade.",
  a4: "Recarrega todas as definições.",
  a5: "Cria um item base e abre o editor direto (sem [pack], você escolhe/cria um por um menu).",
  a6: "Abre o navegador gráfico.",
  a7: "Abre o editor gráfico direto.",
  adminPermBody: "Requer {perm} (padrão: op).",
  u1: "Nome, pack, raridade, nível de melhoria e durabilidade do item na sua mão.",
  u2: "Sobe um nível de melhoria se você puder pagar.",
  u3: "Alterna a skin dele.",
  u4: "Insere a gema da sua offhand nessa ranhura.",
  noPermBody: "{cmd} não tem permissão declarada — qualquer jogador pode usá-lo sobre o item que tiver na mão.",

  phTitle: "Placeholders (PlaceholderAPI)",
  phBody: "Expansão {exp}. {stat} lê o motor de stats agregados do jogador; {held} lê só a mão principal.",
  thPlaceholder: "Placeholder",
  thValue: "Valor",
  ph1: "Total desse stat somando armadura + mão principal/secundária + gemas.",
  ph2: "Nome do item na mão, ou {dash} se não for um item do RPGRoll.",
  ph3: "Id de raridade do item na mão.",
  ph4: "Nível de melhoria atual.",
  ph5: "Durabilidade própria (não a barra vanilla).",

  fId: "Id",
  fCategory: "Categoria",
  fMaterial: "Material (Bukkit)",
  fDisplayName: "Nome visível",
  fLore: "Lore",
  fRarity: "Raridade (id)",
  fGlow: "Brilho forçado",
  fStats: "Stats próprios",
  fAttributes: "Atributos vanilla",
  fRequirements: "Requisitos",
  fLevel: "Nível",
  fClass: "Classe",
  fDurability: "Durabilidade",
  fMax: "Máxima",
  fRepairable: "Reparável",
  fDegrade: "Degradação por uso",
  fEconomy: "Economia",
  fSell: "Preço de venda",
  fBuy: "Preço de compra",
  fColor: "Cor",
  fGlowPlain: "Brilho",
  fSound: "Som ao obtê-lo",
  fParticle: "Partícula",
  fSocketType: "Tipo de socket aceito",
  fBaseItem: "Item base",
  fItemModel: "Modelo do resource pack",
  fStatBonus: "Bônus de stats",
  phNewItem: "novo_item",
  phLore: "Forjada para matar dragões.",
  phNewRarity: "nova_raridade",
  phEpic: "Épica",
  phNewGem: "nova_gema",
  phRuby: "&cRubi",
};

export const ITEMS_COPY: Record<Locale, ItemsCopy> = { es, en, pt };
