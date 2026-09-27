import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Furniture. Ver copy/quickStart.ts para el patrón. */

const es = {
  title: "Muebles y decoración (RPGRoll-Furniture)",
  intro:
    "Muebles colocables con modelo 3D: sillas y sofás en los que sentarse, armarios que guardan cosas, lámparas que dan luz, mesas de trabajo, estantes, versiones por madera y color… Trae 47 muebles de fábrica en 9 categorías, y cada uno es un YAML que se puede copiar y cambiar.",

  reqTitle: "Requisitos",
  reqBody:
    "{srp} registra el pack de modelos de fábrica al arrancar (sin él, hay que servir el pack por otro lado). {vault} solo hace falta para las recetas del carpintero que cobran dinero. Para que se vean en Bedrock hace falta la extensión {gde} de Geyser (ver más abajo).",

  howTitle: "Cómo funciona",
  howBody1:
    "Un mueble colocado es un {display} con el modelo del mueble, más lo que hace falta para chocar con él y hacerle clic: bloques de {barrier} en las casillas que ocupa (se choca y se puede poner cosas encima) o una entidad {interaction} (se atraviesa: lámparas, plantas, alfombras). Todo su estado (qué mueble, versión, dueño, contenido del almacén) va guardado en la propia entidad, así que se guarda y se carga con el mundo.",
  howBody2:
    "Sin base de datos ni ficheros por mueble: copiar la carpeta del mundo o restaurar una copia de seguridad se lleva los muebles tal cual.",

  controlsTitle: "Colocar y usar",
  thAction: "Acción",
  thEffect: "Qué hace",
  ctPlace: "Clic derecho con el mueble en la mano sobre un bloque",
  ctPlaceDo:
    "Lo coloca mirando hacia quien lo pone, en el suelo, la pared o el techo según el mueble. Contra un cofre o una puerta hay que ir agachado, como con un bloque.",
  ctUse: "Clic derecho sobre el mueble",
  ctUseDo:
    "Lo usa: se sienta, abre el almacén o la mesa de trabajo, enciende la lámpara… Hace lo primero que tenga, en este orden: tinte, estante, asiento, almacén, papelera, estación, estados, acciones.",
  ctDye: "Clic derecho con un tinte",
  ctDyeDo: "Cambia a la versión de ese color, si el mueble la tiene. Gasta el tinte (configurable).",
  ctShelf: "Clic derecho con un objeto / con la mano vacía (estantes)",
  ctShelfDo: "Pone el objeto a la vista encima del mueble / lo recoge.",
  ctRotate: "Agachado + clic derecho con la mano vacía",
  ctRotateDo: "Lo gira un paso (90°, 45° o 22,5° según el mueble).",
  ctBreak: "Clic izquierdo",
  ctBreakDo: "Lo retira: devuelve el mueble y suelta lo que tuviera guardado. En creativo, igual.",

  protectTitle: "Protección y límites",
  protectBody:
    "Con {ownerOnly} solo el dueño puede retirar, girar o abrir el almacén de un mueble; los demás sí pueden sentarse y usar las mesas de trabajo. Con {regions} colocar y retirar preguntan a los plugins de protección (WorldGuard, GriefPrevention, parcelas…) como si fuera un bloque. {perChunk} limita los muebles por chunk, y cada mueble puede tener su propio límite. {bypass} se salta el dueño y las regiones.",

  catalogTitle: "Los muebles de fábrica",
  catalogLead:
    "47 muebles, 419 modelos contando versiones y estados. Casi todos se fabrican en el carpintero; el trono no (es de recompensa).",
  thCategory: "Categoría",
  thPieces: "Muebles",
  catSeating: "Asientos",
  catSeatingP: "silla, taburete, banco, sillón, sofá, puf, trono",
  catTables: "Mesas",
  catTablesP: "mesa, mesa larga, mesa baja, mesa redonda, mesita de noche, escritorio",
  catStorage: "Almacenaje",
  catStorageP: "armario, cómoda, estantería, baúl, repisa de pared",
  catBedroom: "Dormitorio",
  catBedroomP: "cama, alfombra, cortina, espejo",
  catKitchen: "Cocina",
  catKitchenP: "encimera, fregadero, fogón, nevera, alacena",
  catLighting: "Iluminación",
  catLightingP: "lámpara de pie, lámpara de mesa, candelabro, farol de pared, velas, chimenea",
  catDecoration: "Decoración",
  catDecorationP: "planta, planta grande, cuadro, reloj de pared, globo terráqueo, jarrón, papelera",
  catGarden: "Jardín",
  catGardenP: "farola, fuente, sombrilla",
  catWorkshop: "Taller",
  catWorkshopP: "mesa de carpintero, banco de trabajo (crafteo), telar, mesa de cartografía",
  catalogVersions:
    "Los de madera vienen en las 12 maderas (roble, abeto, abedul, jungla, acacia, roble oscuro, mangle, cerezo, bambú, carmesí, distorsionada y roble pálido); los de tela, en los 16 colores de tinte. Los modelos y texturas están hechos por código, sin partir de texturas de Mojang.",

  carpenterTitle: "El carpintero",
  carpenterBody1:
    "Un mueble con {workstation} (la mesa de carpintero de fábrica) abre el menú de fabricar: categoría → mueble → versión. Clic fabrica uno y shift+clic hasta 10. Cobra los materiales del inventario (solo ítems sin nombre ni encantamientos) y, si la receta lo pide, dinero por Vault.",
  carpenterBody2:
    "Una receta puede ir a otra estación ({station}): así un herrero o un sastre fabrican sus propios muebles. Para abrirlo sin mesa, desde un NPC o un menú: {cmd}. {anywhere} deja abrirlo desde cualquier sitio con {muebles}.",

  obtainTitle: "Otras formas de conseguirlos",
  obtainGive:
    "{cmd} da un mueble (y su versión con {ref}) a un jugador: sirve para cajas, el pase de temporada, votos o misiones.",
  obtainShop: "En la tienda del servidor de RPGRoll-Economy, una línea {line} en una sección de {dir}.",
  obtainApi: "Otros plugins: {api} devuelve el ítem de un mueble.",

  yamlTitle: "Formato de un mueble",
  yamlLead:
    "Cada {file} de {dir} (y sus subcarpetas) puede tener varios muebles: cada clave de primer nivel es uno. Los ficheros que empiezan por {underscore} no se cargan; {ref} documenta todos los campos. Después de editar, {reload}.",
  yamlOffsets:
    "Los desplazamientos ({example}) se escriben con el mueble mirando al sur, con su frente hacia quien lo coloca: x negativo es su izquierda, y es hacia arriba, z positivo es hacia delante. Al girar el mueble se giran con él.",

  functionsTitle: "Funciones",
  thKey: "Clave",
  fnSeat: "Plazas para sentarse, a una altura dada.",
  fnStorage: "Almacén de 1 a 6 filas, compartido entre quienes lo abren; lo guardado va dentro del mueble.",
  fnTrash: "Papelera: lo que queda dentro se borra al cerrar.",
  fnLight: "Un bloque de luz invisible en la casilla que digas; se apaga y se enciende con los estados.",
  fnStates: "Modelos que se alternan con clic (abierto/cerrado, encendido/apagado), cada uno con su luz y su sonido.",
  fnWorkstation: "Abre una mesa vanilla (CRAFTING, LOOM, STONECUTTER, SMITHING, CARTOGRAPHY_TABLE…) o el carpintero.",
  fnShelf: "Huecos donde exhibir objetos encima del mueble.",
  fnAmbient: "Partículas mientras haya alguien cerca (humo de la chimenea, llama de las velas).",
  fnActions: "Sonidos, mensajes o comandos al hacer clic o clic agachado.",
  fnVariants: "Versiones con otro modelo y otra receta; con {dye}, un tinte cambia a esa versión.",

  bedrockTitle: "Bedrock (Geyser)",
  bedrockBody:
    "Geyser no enseña los ItemDisplay por sí mismo. Con la extensión {gde} sí, y el plugin trae en {dir} lo que le falta: el pack de Bedrock con los modelos y los mapeos de ítems. Va en el servidor donde corre Geyser (el proxy, si está ahí):",
  bedrockStep1: "El jar de GeyserDisplayEntity en {dir}, y su {pack} en {packs}.",
  bedrockStep2: "{ourPack} en {packs} y {mappings} en {mappingsDir}.",
  bedrockStep3: "Reiniciar Geyser. Los jugadores de Bedrock descargan los packs al entrar.",
  bedrockNote:
    "Asientos, almacenes, luz y estaciones funcionan igual en Bedrock, porque los hace el servidor. Los objetos de los estantes son ítems vanilla y, con {hide} activado en la extensión, no se ven en Bedrock.",

  packTitle: "Resource pack",
  packBody:
    "El pack de Java va dentro del jar y, con SackResourcePack instalado, se registra solo al arrancar: aplícalo con {cmd}. Cada modelo se llama {model}. Para un mueble propio basta con tu propio modelo en tu pack y ponerlo en {key}.",

  untestedTitle: "Probado con bots, pendiente con cliente real",
  untestedBody:
    "Colocar, girar, sentarse, almacén, luz, carpintero, protección y persistencia tras reiniciar están probados contra un servidor Paper 26.1 con jugadores simulados. Lo que solo se ve con un cliente de verdad —la orientación exacta de cada modelo, la altura al sentarse y cómo se ve todo en Bedrock— está pendiente de revisar.",

  commandsTitle: "Comandos",
  thCommand: "Comando",
  thDoes: "Qué hace",
  thAliases: "Alias",
  cMuebles: "Catálogo de todos los muebles (los admins pueden sacar los que quieran).",
  cFabricar: "Abre el carpintero desde cualquier sitio (necesita el permiso).",
  cGive: "Da un mueble a un jugador.",
  cCarpenter: "Abre el carpintero a un jugador (para NPCs y menús).",
  cList: "Lista los muebles cargados por categoría.",
  cInfo: "Datos del mueble que miras: versión, estado, dueño, giro.",
  cNearby: "Lista los muebles colocados cerca.",
  cRemove: "Retira los muebles colocados cerca (sin soltar nada).",
  cReload: "Recarga config, idiomas y muebles.",

  permsTitle: "Permisos",
  thPermission: "Permiso",
  thDefault: "Por defecto",
  pUse: "Colocar, usar y retirar muebles.",
  pCatalog: "Abrir el catálogo con /muebles.",
  pAnywhere: "Abrir el carpintero desde cualquier sitio.",
  pBypass: "Saltarse el dueño y la protección de regiones.",
  pAdmin: "/furnitureadmin (incluye bypass).",
  pPiece: "Un mueble puede pedir su propio permiso para colocarlo ({key}).",

  configTitle: "Configuración",
  thMeaning: "Para qué",
  kLanguage: "Idioma de los mensajes: es, en o pt_BR.",
  kCategories: "Las categorías del catálogo, en orden, con su nombre e icono.",
  kPerChunk: "Máximo de muebles por chunk.",
  kOwnerOnly: "Solo el dueño retira, gira y abre el almacén.",
  kRegions: "Preguntar a los plugins de protección al colocar y retirar.",
  kRotate: "Agachado + clic con la mano vacía gira el mueble.",
  kDye: "Teñir un mueble gasta el tinte.",
  kSeat: "Ajuste de altura de todos los asientos, en bloques.",
  kAmbient: "Distancia a la que se ven las partículas de ambiente.",
  kPack: "Registrar el pack de fábrica en SackResourcePack.",

  filesTitle: "Archivos",
  thFile: "Archivo",
  thContains: "Qué contiene",
  fConfig: "Ajustes generales (tabla de arriba).",
  fFurniture: "Los muebles, un YAML por categoría (y los que añadas).",
  fReference: "Mueble de referencia con todos los campos comentados; no se carga.",
  fBedrock: "Pack y mapeos para Geyser, e instrucciones.",
  fLang: "Mensajes (es, en, pt_BR).",
};

export type FurnitureCopy = typeof es;

const en: FurnitureCopy = {
  title: "Furniture and decoration (RPGRoll-Furniture)",
  intro:
    "Placeable furniture with 3D models: chairs and sofas to sit on, wardrobes that store items, lamps that give light, workstations, shelves, wood and colour versions… It ships 47 pieces in 9 categories, and each one is a YAML you can copy and change.",

  reqTitle: "Requirements",
  reqBody:
    "{srp} registers the bundled model pack on startup (without it, you serve the pack some other way). {vault} is only needed for carpenter recipes that cost money. For Bedrock players to see them you need the {gde} Geyser extension (see below).",

  howTitle: "How it works",
  howBody1:
    "A placed piece is an {display} with the piece's model, plus what it takes to collide with it and click it: {barrier} blocks in the cells it takes up (solid, you can put things on top) or an {interaction} entity (you walk through it: lamps, plants, rugs). All its state (which piece, version, owner, storage contents) is stored on the entity itself, so it saves and loads with the world.",
  howBody2:
    "No database and no per-piece files: copying the world folder or restoring a backup takes the furniture along as it is.",

  controlsTitle: "Placing and using",
  thAction: "Action",
  thEffect: "What it does",
  ctPlace: "Right-click a block with the piece in hand",
  ctPlaceDo:
    "Places it facing whoever places it, on the floor, wall or ceiling depending on the piece. Against a chest or a door you need to sneak, as with a block.",
  ctUse: "Right-click the piece",
  ctUseDo:
    "Uses it: sits down, opens the storage or the workstation, turns the lamp on… It does the first thing it has, in this order: dye, shelf, seat, storage, trash, workstation, states, actions.",
  ctDye: "Right-click with a dye",
  ctDyeDo: "Switches to that colour's version, if the piece has one. Uses up the dye (configurable).",
  ctShelf: "Right-click with an item / with an empty hand (shelves)",
  ctShelfDo: "Puts the item on display on top of the piece / takes it back.",
  ctRotate: "Sneak + right-click with an empty hand",
  ctRotateDo: "Rotates it one step (90°, 45° or 22.5° depending on the piece).",
  ctBreak: "Left-click",
  ctBreakDo: "Removes it: gives the piece back and drops whatever it stored. Same in creative.",

  protectTitle: "Protection and limits",
  protectBody:
    "With {ownerOnly} only the owner can remove, rotate or open the storage of a piece; others can still sit and use workstations. With {regions} placing and removing ask protection plugins (WorldGuard, GriefPrevention, plots…) as if it were a block. {perChunk} caps furniture per chunk, and each piece can have its own limit. {bypass} skips the owner and region checks.",

  catalogTitle: "Bundled furniture",
  catalogLead:
    "47 pieces, 419 models counting versions and states. Almost all are made at the carpenter; the throne is not (it is a reward).",
  thCategory: "Category",
  thPieces: "Pieces",
  catSeating: "Seating",
  catSeatingP: "chair, stool, bench, armchair, sofa, pouf, throne",
  catTables: "Tables",
  catTablesP: "table, long table, coffee table, round table, nightstand, desk",
  catStorage: "Storage",
  catStorageP: "wardrobe, dresser, bookcase, trunk, wall shelf",
  catBedroom: "Bedroom",
  catBedroomP: "bed, rug, curtain, mirror",
  catKitchen: "Kitchen",
  catKitchenP: "counter, sink, stove, fridge, wall cabinet",
  catLighting: "Lighting",
  catLightingP: "floor lamp, table lamp, chandelier, wall lantern, candles, fireplace",
  catDecoration: "Decoration",
  catDecorationP: "potted plant, big plant, painting, wall clock, globe, vase, trash can",
  catGarden: "Garden",
  catGardenP: "street lamp, fountain, parasol",
  catWorkshop: "Workshop",
  catWorkshopP: "carpenter table, workbench (crafting), loom frame, map table",
  catalogVersions:
    "Wooden pieces come in all 12 woods (oak, spruce, birch, jungle, acacia, dark oak, mangrove, cherry, bamboo, crimson, warped and pale oak); fabric ones in the 16 dye colours. Models and textures are generated by code, not based on Mojang's textures.",

  carpenterTitle: "The carpenter",
  carpenterBody1:
    "A piece with {workstation} (the bundled carpenter table) opens the crafting menu: category → piece → version. Click makes one and shift-click up to 10. It takes the materials from the inventory (plain items only, no names or enchantments) and, if the recipe asks for it, money through Vault.",
  carpenterBody2:
    "A recipe can belong to another station ({station}): that way a blacksmith or a tailor makes their own furniture. To open it without a table, from an NPC or a menu: {cmd}. {anywhere} lets players open it anywhere with {muebles}.",

  obtainTitle: "Other ways to get them",
  obtainGive:
    "{cmd} gives a piece (and its version with {ref}) to a player: use it for crates, the season pass, votes or quests.",
  obtainShop: "In RPGRoll-Economy's server shop, a {line} line in a section under {dir}.",
  obtainApi: "Other plugins: {api} returns a piece's item.",

  yamlTitle: "Piece format",
  yamlLead:
    "Each {file} in {dir} (and its subfolders) can hold several pieces: each top-level key is one. Files starting with {underscore} are not loaded; {ref} documents every field. After editing, {reload}.",
  yamlOffsets:
    "Offsets ({example}) are written with the piece facing south, its front towards whoever places it: negative x is its left, y is up, positive z is forward. They rotate with the piece.",

  functionsTitle: "Functions",
  thKey: "Key",
  fnSeat: "Places to sit, at a given height.",
  fnStorage: "Storage of 1 to 6 rows, shared between whoever opens it; contents are kept inside the piece.",
  fnTrash: "Trash can: whatever is left inside is deleted on close.",
  fnLight: "An invisible light block in the cell you choose; states turn it on and off.",
  fnStates: "Models toggled by clicking (open/closed, on/off), each with its own light and sound.",
  fnWorkstation: "Opens a vanilla station (CRAFTING, LOOM, STONECUTTER, SMITHING, CARTOGRAPHY_TABLE…) or the carpenter.",
  fnShelf: "Slots to display items on top of the piece.",
  fnAmbient: "Particles while someone is nearby (fireplace smoke, candle flames).",
  fnActions: "Sounds, messages or commands on click or sneak-click.",
  fnVariants: "Versions with a different model and recipe; with {dye}, a dye switches to that version.",

  bedrockTitle: "Bedrock (Geyser)",
  bedrockBody:
    "Geyser does not show ItemDisplays on its own. With the {gde} extension it does, and the plugin ships what is missing in {dir}: the Bedrock pack with the models and the item mappings. It goes on the server where Geyser runs (the proxy, if it is there):",
  bedrockStep1: "The GeyserDisplayEntity jar in {dir}, and its {pack} in {packs}.",
  bedrockStep2: "{ourPack} in {packs} and {mappings} in {mappingsDir}.",
  bedrockStep3: "Restart Geyser. Bedrock players download the packs when they join.",
  bedrockNote:
    "Seats, storage, light and workstations work the same on Bedrock, because the server does them. Shelf items are vanilla items and, with {hide} enabled in the extension, they are not shown on Bedrock.",

  packTitle: "Resource pack",
  packBody:
    "The Java pack ships inside the jar and, with SackResourcePack installed, registers itself on startup: apply it with {cmd}. Each model is named {model}. For your own piece, just put your own model in your pack and reference it in {key}.",

  untestedTitle: "Tested with bots, pending with a real client",
  untestedBody:
    "Placing, rotating, sitting, storage, light, carpenter, protection and persistence across restarts are tested against a Paper 26.1 server with simulated players. What only shows with a real client — each model's exact orientation, the sitting height and how everything looks on Bedrock — is still to be reviewed.",

  commandsTitle: "Commands",
  thCommand: "Command",
  thDoes: "What it does",
  thAliases: "Aliases",
  cMuebles: "Catalogue of every piece (admins can take any of them).",
  cFabricar: "Opens the carpenter anywhere (needs the permission).",
  cGive: "Gives a piece to a player.",
  cCarpenter: "Opens the carpenter for a player (for NPCs and menus).",
  cList: "Lists the loaded pieces by category.",
  cInfo: "Data of the piece you are looking at: version, state, owner, rotation.",
  cNearby: "Lists placed pieces nearby.",
  cRemove: "Removes placed pieces nearby (drops nothing).",
  cReload: "Reloads config, languages and furniture.",

  permsTitle: "Permissions",
  thPermission: "Permission",
  thDefault: "Default",
  pUse: "Place, use and remove furniture.",
  pCatalog: "Open the catalogue with /muebles.",
  pAnywhere: "Open the carpenter anywhere.",
  pBypass: "Skip owner and region protection.",
  pAdmin: "/furnitureadmin (includes bypass).",
  pPiece: "A piece can require its own permission to be placed ({key}).",

  configTitle: "Configuration",
  thMeaning: "Purpose",
  kLanguage: "Message language: es, en or pt_BR.",
  kCategories: "Catalogue categories, in order, with name and icon.",
  kPerChunk: "Maximum furniture per chunk.",
  kOwnerOnly: "Only the owner removes, rotates and opens storage.",
  kRegions: "Ask protection plugins when placing and removing.",
  kRotate: "Sneak + empty-hand click rotates the piece.",
  kDye: "Dyeing a piece uses up the dye.",
  kSeat: "Height adjustment for every seat, in blocks.",
  kAmbient: "Distance at which ambient particles are shown.",
  kPack: "Register the bundled pack in SackResourcePack.",

  filesTitle: "Files",
  thFile: "File",
  thContains: "Contents",
  fConfig: "General settings (table above).",
  fFurniture: "The furniture, one YAML per category (plus any you add).",
  fReference: "Reference piece with every field commented; not loaded.",
  fBedrock: "Pack and mappings for Geyser, plus instructions.",
  fLang: "Messages (es, en, pt_BR).",
};

const pt: FurnitureCopy = {
  title: "Móveis e decoração (RPGRoll-Furniture)",
  intro:
    "Móveis colocáveis com modelo 3D: cadeiras e sofás para sentar, armários que guardam itens, luminárias que iluminam, mesas de trabalho, prateleiras, versões por madeira e cor… Vem com 47 móveis em 9 categorias, e cada um é um YAML que pode ser copiado e alterado.",

  reqTitle: "Requisitos",
  reqBody:
    "{srp} registra o pack de modelos de fábrica ao iniciar (sem ele, é preciso servir o pack de outra forma). {vault} só é necessário para receitas do carpinteiro que cobram dinheiro. Para aparecerem no Bedrock é preciso a extensão {gde} do Geyser (veja abaixo).",

  howTitle: "Como funciona",
  howBody1:
    "Um móvel colocado é um {display} com o modelo do móvel, mais o necessário para colidir e clicar nele: blocos de {barrier} nas casas que ocupa (sólido, dá para pôr coisas em cima) ou uma entidade {interaction} (atravessável: luminárias, plantas, tapetes). Todo o seu estado (qual móvel, versão, dono, conteúdo do armazenamento) fica guardado na própria entidade, então é salvo e carregado com o mundo.",
  howBody2:
    "Sem banco de dados nem arquivos por móvel: copiar a pasta do mundo ou restaurar um backup leva os móveis como estão.",

  controlsTitle: "Colocar e usar",
  thAction: "Ação",
  thEffect: "O que faz",
  ctPlace: "Clique direito num bloco com o móvel na mão",
  ctPlaceDo:
    "Coloca-o virado para quem o coloca, no chão, na parede ou no teto conforme o móvel. Contra um baú ou uma porta é preciso estar agachado, como com um bloco.",
  ctUse: "Clique direito no móvel",
  ctUseDo:
    "Usa-o: senta, abre o armazenamento ou a mesa de trabalho, acende a luminária… Faz a primeira coisa que tiver, nesta ordem: tinta, prateleira, assento, armazenamento, lixeira, estação, estados, ações.",
  ctDye: "Clique direito com um corante",
  ctDyeDo: "Muda para a versão dessa cor, se o móvel tiver. Gasta o corante (configurável).",
  ctShelf: "Clique direito com um item / com a mão vazia (prateleiras)",
  ctShelfDo: "Expõe o item em cima do móvel / recolhe-o.",
  ctRotate: "Agachado + clique direito com a mão vazia",
  ctRotateDo: "Gira um passo (90°, 45° ou 22,5° conforme o móvel).",
  ctBreak: "Clique esquerdo",
  ctBreakDo: "Retira-o: devolve o móvel e solta o que estivesse guardado. No criativo, igual.",

  protectTitle: "Proteção e limites",
  protectBody:
    "Com {ownerOnly} só o dono pode retirar, girar ou abrir o armazenamento de um móvel; os outros podem sentar e usar as mesas de trabalho. Com {regions} colocar e retirar consultam os plugins de proteção (WorldGuard, GriefPrevention, lotes…) como se fosse um bloco. {perChunk} limita os móveis por chunk, e cada móvel pode ter seu próprio limite. {bypass} ignora o dono e as regiões.",

  catalogTitle: "Os móveis de fábrica",
  catalogLead:
    "47 móveis, 419 modelos contando versões e estados. Quase todos são fabricados no carpinteiro; o trono não (é recompensa).",
  thCategory: "Categoria",
  thPieces: "Móveis",
  catSeating: "Assentos",
  catSeatingP: "cadeira, banqueta, banco, poltrona, sofá, pufe, trono",
  catTables: "Mesas",
  catTablesP: "mesa, mesa longa, mesa de centro, mesa redonda, criado-mudo, escrivaninha",
  catStorage: "Armazenamento",
  catStorageP: "guarda-roupa, cômoda, estante, baú, prateleira de parede",
  catBedroom: "Quarto",
  catBedroomP: "cama, tapete, cortina, espelho",
  catKitchen: "Cozinha",
  catKitchenP: "bancada, pia, fogão, geladeira, armário de parede",
  catLighting: "Iluminação",
  catLightingP: "luminária de pé, luminária de mesa, lustre, lanterna de parede, velas, lareira",
  catDecoration: "Decoração",
  catDecorationP: "planta, planta grande, quadro, relógio de parede, globo, vaso, lixeira",
  catGarden: "Jardim",
  catGardenP: "poste de luz, fonte, guarda-sol",
  catWorkshop: "Oficina",
  catWorkshopP: "mesa de carpinteiro, bancada de trabalho (crafting), tear, mesa de cartografia",
  catalogVersions:
    "Os de madeira vêm nas 12 madeiras (carvalho, pinheiro, bétula, selva, acácia, carvalho escuro, mangue, cerejeira, bambu, carmesim, distorcida e carvalho pálido); os de tecido, nas 16 cores de corante. Modelos e texturas são gerados por código, sem partir das texturas da Mojang.",

  carpenterTitle: "O carpinteiro",
  carpenterBody1:
    "Um móvel com {workstation} (a mesa de carpinteiro de fábrica) abre o menu de fabricar: categoria → móvel → versão. Clique fabrica um e shift+clique até 10. Cobra os materiais do inventário (só itens sem nome nem encantamentos) e, se a receita pedir, dinheiro via Vault.",
  carpenterBody2:
    "Uma receita pode pertencer a outra estação ({station}): assim um ferreiro ou um alfaiate fabricam seus próprios móveis. Para abri-lo sem mesa, a partir de um NPC ou um menu: {cmd}. {anywhere} permite abri-lo de qualquer lugar com {muebles}.",

  obtainTitle: "Outras formas de obtê-los",
  obtainGive:
    "{cmd} dá um móvel (e sua versão com {ref}) a um jogador: serve para caixas, o passe de temporada, votos ou missões.",
  obtainShop: "Na loja do servidor do RPGRoll-Economy, uma linha {line} numa seção de {dir}.",
  obtainApi: "Outros plugins: {api} devolve o item de um móvel.",

  yamlTitle: "Formato de um móvel",
  yamlLead:
    "Cada {file} de {dir} (e suas subpastas) pode ter vários móveis: cada chave de primeiro nível é um. Arquivos que começam com {underscore} não são carregados; {ref} documenta todos os campos. Depois de editar, {reload}.",
  yamlOffsets:
    "Os deslocamentos ({example}) são escritos com o móvel virado para o sul, com a frente para quem o coloca: x negativo é a esquerda dele, y é para cima, z positivo é para a frente. Giram junto com o móvel.",

  functionsTitle: "Funções",
  thKey: "Chave",
  fnSeat: "Lugares para sentar, a uma altura dada.",
  fnStorage: "Armazenamento de 1 a 6 linhas, compartilhado entre quem o abre; o conteúdo fica dentro do móvel.",
  fnTrash: "Lixeira: o que ficar dentro é apagado ao fechar.",
  fnLight: "Um bloco de luz invisível na casa que você indicar; os estados o ligam e desligam.",
  fnStates: "Modelos alternados com clique (aberto/fechado, ligado/desligado), cada um com sua luz e seu som.",
  fnWorkstation: "Abre uma estação vanilla (CRAFTING, LOOM, STONECUTTER, SMITHING, CARTOGRAPHY_TABLE…) ou o carpinteiro.",
  fnShelf: "Espaços para expor itens em cima do móvel.",
  fnAmbient: "Partículas enquanto houver alguém perto (fumaça da lareira, chama das velas).",
  fnActions: "Sons, mensagens ou comandos ao clicar ou clicar agachado.",
  fnVariants: "Versões com outro modelo e outra receita; com {dye}, um corante muda para essa versão.",

  bedrockTitle: "Bedrock (Geyser)",
  bedrockBody:
    "O Geyser não mostra ItemDisplays sozinho. Com a extensão {gde} sim, e o plugin traz em {dir} o que falta: o pack de Bedrock com os modelos e os mapeamentos de itens. Vai no servidor onde o Geyser roda (o proxy, se estiver lá):",
  bedrockStep1: "O jar do GeyserDisplayEntity em {dir}, e seu {pack} em {packs}.",
  bedrockStep2: "{ourPack} em {packs} e {mappings} em {mappingsDir}.",
  bedrockStep3: "Reiniciar o Geyser. Os jogadores de Bedrock baixam os packs ao entrar.",
  bedrockNote:
    "Assentos, armazenamento, luz e estações funcionam igual no Bedrock, porque é o servidor que os faz. Os itens das prateleiras são itens vanilla e, com {hide} ativado na extensão, não aparecem no Bedrock.",

  packTitle: "Resource pack",
  packBody:
    "O pack de Java vai dentro do jar e, com o SackResourcePack instalado, é registrado sozinho ao iniciar: aplique-o com {cmd}. Cada modelo se chama {model}. Para um móvel próprio basta pôr seu próprio modelo no seu pack e indicá-lo em {key}.",

  untestedTitle: "Testado com bots, pendente com cliente real",
  untestedBody:
    "Colocar, girar, sentar, armazenamento, luz, carpinteiro, proteção e persistência após reiniciar estão testados contra um servidor Paper 26.1 com jogadores simulados. O que só aparece com um cliente de verdade — a orientação exata de cada modelo, a altura ao sentar e como tudo fica no Bedrock — ainda está para revisar.",

  commandsTitle: "Comandos",
  thCommand: "Comando",
  thDoes: "O que faz",
  thAliases: "Alias",
  cMuebles: "Catálogo de todos os móveis (admins podem pegar qualquer um).",
  cFabricar: "Abre o carpinteiro de qualquer lugar (precisa da permissão).",
  cGive: "Dá um móvel a um jogador.",
  cCarpenter: "Abre o carpinteiro para um jogador (para NPCs e menus).",
  cList: "Lista os móveis carregados por categoria.",
  cInfo: "Dados do móvel que você está olhando: versão, estado, dono, giro.",
  cNearby: "Lista os móveis colocados por perto.",
  cRemove: "Retira os móveis colocados por perto (sem soltar nada).",
  cReload: "Recarrega config, idiomas e móveis.",

  permsTitle: "Permissões",
  thPermission: "Permissão",
  thDefault: "Padrão",
  pUse: "Colocar, usar e retirar móveis.",
  pCatalog: "Abrir o catálogo com /muebles.",
  pAnywhere: "Abrir o carpinteiro de qualquer lugar.",
  pBypass: "Ignorar o dono e a proteção de regiões.",
  pAdmin: "/furnitureadmin (inclui bypass).",
  pPiece: "Um móvel pode exigir sua própria permissão para ser colocado ({key}).",

  configTitle: "Configuração",
  thMeaning: "Para quê",
  kLanguage: "Idioma das mensagens: es, en ou pt_BR.",
  kCategories: "As categorias do catálogo, em ordem, com nome e ícone.",
  kPerChunk: "Máximo de móveis por chunk.",
  kOwnerOnly: "Só o dono retira, gira e abre o armazenamento.",
  kRegions: "Consultar os plugins de proteção ao colocar e retirar.",
  kRotate: "Agachado + clique com a mão vazia gira o móvel.",
  kDye: "Tingir um móvel gasta o corante.",
  kSeat: "Ajuste de altura de todos os assentos, em blocos.",
  kAmbient: "Distância em que as partículas de ambiente aparecem.",
  kPack: "Registrar o pack de fábrica no SackResourcePack.",

  filesTitle: "Arquivos",
  thFile: "Arquivo",
  thContains: "O que contém",
  fConfig: "Ajustes gerais (tabela acima).",
  fFurniture: "Os móveis, um YAML por categoria (e os que você adicionar).",
  fReference: "Móvel de referência com todos os campos comentados; não é carregado.",
  fBedrock: "Pack e mapeamentos para o Geyser, e instruções.",
  fLang: "Mensagens (es, en, pt_BR).",
};

export const FURNITURE_COPY: Record<Locale, FurnitureCopy> = { es, en, pt };
