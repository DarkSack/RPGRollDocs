import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Machines. Ver copy/quickStart.ts para el patrón. */

const es = {
  title: "Máquinas (RPGRoll-Machines)",
  intro:
    "Hornos, altos hornos y ahumadores que se mejoran por niveles, spawners con mejoras y que se apilan, y canteras que excavan un área y lo dejan en un cofre. Todo con menús, costes en dinero e ítems, y topes para que el servidor no lo note. Funciona sin RPGRoll.",

  reqTitle: "Requisitos",
  reqBody:
    "Solo {lib}. {vault} hace falta para cobrar dinero (sin él, una mejora que cuesta dinero no se puede pagar); {gp}, para que las canteras solo trabajen dentro de un claim de su dueño. RPGRoll-Items y RPGRoll-Crates van en {soft} para el orden de carga: sus menas y lucky blocks ya saben qué hacer cuando una cantera los encuentra.",

  furnTitle: "Hornos por niveles",
  furnLead:
    "Siguen siendo el horno vanilla: su interfaz, sus tolvas y sus recetas. {sneak} con la mano vacía abre las mejoras; cada nivel se compra encima del anterior. El nivel se guarda en el bloque: un horno mejorado sale con su nivel al romperlo, con lo que tuviera dentro, y aguanta las explosiones.",
  thTier: "Nivel",
  thSpeed: "Velocidad",
  thFuel: "Combustible",
  thDouble: "Doble",
  thCost: "Coste",
  furnNotes:
    "{speed}: cuánto más rápido cuece (2 = la mitad de tiempo). {fuel}: cuántos ítems más rinde cada combustible. La velocidad no cambia lo que rinde el combustible: un horno más rápido también lo quema más rápido. {double}: probabilidad de sacar el doble, si cabe en la casilla.",
  furnKinds:
    "{kinds} dice cuáles se pueden mejorar (los tres, por defecto). Los niveles son libres: puedes tener tres o diez, con el nombre y los números que quieras.",

  spawnTitle: "Spawners",
  spawnLead:
    "{sneak} con la mano vacía abre las mejoras. Cada una es una lista de niveles; el primero es el spawner sin mejorar (lo vanilla) y no cuesta nada:",
  thUpgrade: "Mejora",
  thLevels: "Niveles por defecto",
  sSpeed: "Velocidad",
  sSpeedLv: "Retardo entre tandas: 200–800 → 160–640 → 120–480 → 80–320 ticks.",
  sCount: "Cantidad",
  sCountLv: "Mobs por tanda y tope cerca: 4/6 → 5/8 → 6/10 → 8/12.",
  sRange: "Alcance",
  sRangeLv: "Distancia a la que se activa: 16 → 24 → 32 bloques.",
  spawnStack:
    "Clic derecho con un spawner del mismo mob en la mano lo apila (hasta {max}, configurable): cada uno suma una tanda. Un spawner mejorado o apilado lleva un holograma con el mob, los niveles y la pila, y aguanta las explosiones.",
  spawnMine:
    "Recogerlos: con toque de seda y el permiso {perm} (por defecto, solo los op) sale el spawner con sus niveles y su pila, sin soltar experiencia. Sin el permiso se rompe como en vanilla. Los niveles se aplican al colocarlo, así que funcionan también para quien no es op.",

  quarryTitle: "Canteras",
  quarryLead:
    "Se fabrica en la mesa de crafteo (o se da con {give}) y se coloca con un cofre, barril, tolva o caja de shulker pegado. Excava un cuadrado centrado en ella, capa a capa, desde el bloque de debajo hasta el fondo del mundo, y lo deja en ese contenedor. Clic derecho: su estado, sus mejoras y el interruptor.",
  quarryRules:
    "Rompe cada bloque en nombre de su dueño, así que las protecciones y CoreProtect lo ven como suyo, y solo trabaja con el dueño conectado. Nunca carga chunks: espera a que estén cargados. Con el contenedor lleno se para. Se salta lo irrompible, los líquidos y todo bloque con inventario o datos (cofres, hornos, spawners…), además de los lucky blocks, los muebles y las torretas de RPGRoll.",
  quarryClaims:
    "Con GriefPrevention y {claim}, el área entera tiene que estar dentro de un claim de su dueño, al ponerla y al ampliarla. {max} limita cuántas tiene cada jugador (2 por defecto).",
  thQDoes: "Qué hace",
  thQDefault: "Por defecto",
  qSpeed: "Velocidad",
  qSpeedD: "Bloques por segundo.",
  qArea: "Área",
  qAreaD: "Lado del cuadrado. Al ampliarlo vuelve a empezar desde arriba.",
  qFortune: "Fortuna",
  qFortuneD: "La fortuna del pico (no con toque de seda encendido).",
  qTier: "Potencia",
  qTierD:
    "Nivel de picado para las menas de RPGRoll-Items: las que no puede picar se las salta sin romperlas, y al subirlo vuelve a empezar para recogerlas. Con un solo nivel no sale en el menú.",
  qTierV: "-1 (pico de netherita)",
  qSilk: "Toque de seda",
  qSilkD: "Se compra una vez y luego se enciende y apaga.",
  qSmelt: "Autofundido",
  qSmeltD: "Pasa lo que saca por las recetas de horno del servidor.",
  qFilter: "Filtro de basura",
  qFilterD: "Tira lo que está en {junk}: por defecto piedras, tierra, grava, arena y netherrack. Solo el material tal cual, nunca un ítem con datos.",
  qOnce: "una vez",
  quarryPerf:
    "Topes del servidor: {bpt} bloques picados por tick entre todas las canteras y {spt} bloques mirados por cantera y tick. {skip} añade bloques que no se pican nunca.",

  costTitle: "Costes",
  costBody:
    "Cada nivel lleva un {cost} con {money} (Vault) y/o {items}. Un ítem es {vanilla}, o {custom} para un ítem de RPGRoll-Items. El menú enseña lo que falta en rojo y no cobra nada hasta que se tiene todo.",

  modelTitle: "Modelos",
  modelBody:
    "Sin resource pack todo es vanilla: el ítem de un horno mejorado es el horno de siempre con su nombre y su nivel, y la cantera es el bloque de {block}. Con un pack (SackResourcePack, por ejemplo) se le da modelo al ítem con {itemModel} y se pone un marco encima del bloque con {frame}: un item_display del tamaño del bloque, pensado para un modelo con huecos que deje ver el horno y su frente encendido.",

  commandsTitle: "Comandos",
  thCommand: "Comando",
  thDesc: "Descripción",
  thAliases: "Alias",
  cGiveFurnace: "Da un horno, alto horno o ahumador de un nivel.",
  cGiveSpawner: "Da un spawner de ese mob.",
  cGiveQuarry: "Da una cantera.",
  cQuarries: "Lista las canteras (de todos o de un jugador): dónde están, su estado y por qué capa van.",
  cInfo: "Lo que tiene el bloque que miras: nivel, mejoras, pila, dueño.",
  cReload: "Relee la configuración y los idiomas.",

  permissionsTitle: "Permisos",
  thPerm: "Permiso",
  thDefault: "Por defecto",
  pFurnace: "Mejorar hornos, altos hornos y ahumadores.",
  pSpawner: "Mejorar y apilar spawners.",
  pMine: "Recoger spawners con toque de seda.",
  pQuarry: "Colocar y usar canteras.",
  pBypass: "Abrir y mejorar las máquinas de otros e ignorar el tope de canteras.",
  pAdmin: "/machines. Incluye bypass.",

  filesTitle: "Archivos",
  thFile: "Archivo",
  thContains: "Qué tiene",
  fConfig: "El idioma de los mensajes.",
  fFurnaces: "Niveles de horno, modelos y mundos.",
  fSpawners: "Mejoras, pila, recogida y holograma.",
  fQuarries: "Bloque, mejoras, topes, filtro y receta.",
  fLang: "Mensajes y textos de los menús.",
  fData: "Las canteras puestas (no se edita a mano).",
};

export type MachinesCopy = typeof es;

const en: MachinesCopy = {
  title: "Machines (RPGRoll-Machines)",
  intro:
    "Furnaces, blast furnaces and smokers upgraded by tiers, spawners with upgrades that stack, and quarries that dig an area into a chest. All with menus, costs in money and items, and caps so the server doesn't feel it. Works without RPGRoll.",

  reqTitle: "Requirements",
  reqBody:
    "Only {lib}. {vault} is needed to charge money (without it, an upgrade that costs money can't be paid); {gp}, so quarries only work inside their owner's claim. RPGRoll-Items and RPGRoll-Crates are in {soft} for load order: their ores and lucky blocks already know what to do when a quarry finds them.",

  furnTitle: "Tiered furnaces",
  furnLead:
    "They're still the vanilla furnace: its interface, its hoppers and its recipes. {sneak} with an empty hand opens the upgrades; each tier is bought on top of the previous one. The tier is stored in the block: an upgraded furnace drops with its tier when broken, along with whatever was inside, and survives explosions.",
  thTier: "Tier",
  thSpeed: "Speed",
  thFuel: "Fuel",
  thDouble: "Double",
  thCost: "Cost",
  furnNotes:
    "{speed}: how much faster it cooks (2 = half the time). {fuel}: how many more items each fuel yields. Speed doesn't change what fuel yields: a faster furnace also burns it faster. {double}: chance of doubling the output, if it fits in the slot.",
  furnKinds:
    "{kinds} sets which ones can be upgraded (all three by default). Tiers are free-form: three or ten, with any names and numbers you like.",

  spawnTitle: "Spawners",
  spawnLead:
    "{sneak} with an empty hand opens the upgrades. Each one is a list of levels; the first is the unupgraded spawner (vanilla) and costs nothing:",
  thUpgrade: "Upgrade",
  thLevels: "Default levels",
  sSpeed: "Speed",
  sSpeedLv: "Delay between waves: 200–800 → 160–640 → 120–480 → 80–320 ticks.",
  sCount: "Count",
  sCountLv: "Mobs per wave and nearby cap: 4/6 → 5/8 → 6/10 → 8/12.",
  sRange: "Range",
  sRangeLv: "Activation distance: 16 → 24 → 32 blocks.",
  spawnStack:
    "Right-clicking with a spawner of the same mob in hand stacks it (up to {max}, configurable): each one adds a wave. An upgraded or stacked spawner shows a hologram with the mob, levels and stack, and survives explosions.",
  spawnMine:
    "Picking them up: with silk touch and the {perm} permission (ops only by default) the spawner drops with its levels and stack, and no experience. Without the permission it breaks as in vanilla. Levels are applied on placement, so they work for non-ops too.",

  quarryTitle: "Quarries",
  quarryLead:
    "Crafted at the crafting table (or given with {give}) and placed with a chest, barrel, hopper or shulker box touching it. It digs a square centred on itself, layer by layer, from the block below down to the bottom of the world, into that container. Right-click: its status, its upgrades and the on/off switch.",
  quarryRules:
    "It breaks every block on behalf of its owner, so protections and CoreProtect see it as theirs, and it only works while the owner is online. It never loads chunks: it waits for them to be loaded. With the container full it stops. It skips unbreakable blocks, liquids and any block with an inventory or data (chests, furnaces, spawners…), plus RPGRoll lucky blocks, furniture and turrets.",
  quarryClaims:
    "With GriefPrevention and {claim}, the whole area must be inside a claim of its owner, when placed and when enlarged. {max} limits how many each player can have (2 by default).",
  thQDoes: "What it does",
  thQDefault: "Default",
  qSpeed: "Speed",
  qSpeedD: "Blocks per second.",
  qArea: "Area",
  qAreaD: "Side of the square. Enlarging it starts over from the top.",
  qFortune: "Fortune",
  qFortuneD: "The pickaxe's fortune (not with silk touch on).",
  qTier: "Power",
  qTierD:
    "Mining tier for RPGRoll-Items ores: those it can't mine are skipped without breaking them, and raising it starts over to collect them. With a single level it doesn't show in the menu.",
  qTierV: "-1 (netherite pickaxe)",
  qSilk: "Silk touch",
  qSilkD: "Bought once, then switched on and off.",
  qSmelt: "Auto-smelt",
  qSmeltD: "Runs what it digs through the server's furnace recipes.",
  qFilter: "Junk filter",
  qFilterD: "Voids whatever is in {junk}: stones, dirt, gravel, sand and netherrack by default. Only the plain material, never an item with data.",
  qOnce: "once",
  quarryPerf:
    "Server caps: {bpt} blocks mined per tick across all quarries and {spt} blocks checked per quarry per tick. {skip} adds blocks that are never mined.",

  costTitle: "Costs",
  costBody:
    "Each level has a {cost} with {money} (Vault) and/or {items}. An item is {vanilla}, or {custom} for an RPGRoll-Items item. The menu shows what's missing in red and charges nothing until you have it all.",

  modelTitle: "Models",
  modelBody:
    "Without a resource pack everything is vanilla: an upgraded furnace item is the usual furnace with its name and tier, and the quarry is the {block} block. With a pack (SackResourcePack, for example) the item gets a model through {itemModel} and a frame is placed over the block with {frame}: a block-sized item_display, meant for a model with gaps that lets the furnace and its lit front show through.",

  commandsTitle: "Commands",
  thCommand: "Command",
  thDesc: "Description",
  thAliases: "Aliases",
  cGiveFurnace: "Gives a furnace, blast furnace or smoker of a tier.",
  cGiveSpawner: "Gives a spawner of that mob.",
  cGiveQuarry: "Gives a quarry.",
  cQuarries: "Lists quarries (everyone's or one player's): where they are, their status and which layer they're on.",
  cInfo: "What the block you're looking at has: tier, upgrades, stack, owner.",
  cReload: "Reloads the configuration and languages.",

  permissionsTitle: "Permissions",
  thPerm: "Permission",
  thDefault: "Default",
  pFurnace: "Upgrade furnaces, blast furnaces and smokers.",
  pSpawner: "Upgrade and stack spawners.",
  pMine: "Pick up spawners with silk touch.",
  pQuarry: "Place and use quarries.",
  pBypass: "Open and upgrade other players' machines and ignore the quarry cap.",
  pAdmin: "/machines. Includes bypass.",

  filesTitle: "Files",
  thFile: "File",
  thContains: "Contents",
  fConfig: "Message language.",
  fFurnaces: "Furnace tiers, models and worlds.",
  fSpawners: "Upgrades, stacking, pickup and hologram.",
  fQuarries: "Block, upgrades, caps, filter and recipe.",
  fLang: "Messages and menu texts.",
  fData: "Placed quarries (not edited by hand).",
};

const pt: MachinesCopy = {
  title: "Máquinas (RPGRoll-Machines)",
  intro:
    "Fornalhas, altos-fornos e defumadores que melhoram por níveis, spawners com melhorias que se empilham, e pedreiras que escavam uma área e guardam tudo num baú. Tudo com menus, custos em dinheiro e itens, e limites para o servidor nem perceber. Funciona sem o RPGRoll.",

  reqTitle: "Requisitos",
  reqBody:
    "Só {lib}. {vault} é necessário para cobrar dinheiro (sem ele, uma melhoria que custa dinheiro não pode ser paga); {gp}, para as pedreiras só trabalharem dentro de um claim do dono. RPGRoll-Items e RPGRoll-Crates estão em {soft} pela ordem de carga: seus minérios e lucky blocks já sabem o que fazer quando uma pedreira os encontra.",

  furnTitle: "Fornalhas por níveis",
  furnLead:
    "Continuam sendo a fornalha vanilla: sua interface, seus funis e suas receitas. {sneak} com a mão vazia abre as melhorias; cada nível é comprado sobre o anterior. O nível fica guardado no bloco: uma fornalha melhorada sai com seu nível ao ser quebrada, com o que tinha dentro, e aguenta explosões.",
  thTier: "Nível",
  thSpeed: "Velocidade",
  thFuel: "Combustível",
  thDouble: "Dobro",
  thCost: "Custo",
  furnNotes:
    "{speed}: quanto mais rápido cozinha (2 = metade do tempo). {fuel}: quantos itens a mais rende cada combustível. A velocidade não muda o que o combustível rende: uma fornalha mais rápida também o queima mais rápido. {double}: chance de render o dobro, se couber no espaço.",
  furnKinds:
    "{kinds} define quais podem ser melhoradas (as três, por padrão). Os níveis são livres: três ou dez, com os nomes e números que quiser.",

  spawnTitle: "Spawners",
  spawnLead:
    "{sneak} com a mão vazia abre as melhorias. Cada uma é uma lista de níveis; o primeiro é o spawner sem melhoria (o vanilla) e não custa nada:",
  thUpgrade: "Melhoria",
  thLevels: "Níveis padrão",
  sSpeed: "Velocidade",
  sSpeedLv: "Intervalo entre levas: 200–800 → 160–640 → 120–480 → 80–320 ticks.",
  sCount: "Quantidade",
  sCountLv: "Mobs por leva e limite por perto: 4/6 → 5/8 → 6/10 → 8/12.",
  sRange: "Alcance",
  sRangeLv: "Distância de ativação: 16 → 24 → 32 blocos.",
  spawnStack:
    "Clique direito com um spawner do mesmo mob na mão o empilha (até {max}, configurável): cada um soma uma leva. Um spawner melhorado ou empilhado mostra um holograma com o mob, os níveis e a pilha, e aguenta explosões.",
  spawnMine:
    "Recolher: com toque de seda e a permissão {perm} (por padrão, só os op) o spawner sai com seus níveis e sua pilha, sem soltar experiência. Sem a permissão quebra como no vanilla. Os níveis são aplicados ao colocar, então funcionam também para quem não é op.",

  quarryTitle: "Pedreiras",
  quarryLead:
    "É fabricada na mesa de trabalho (ou dada com {give}) e colocada com um baú, barril, funil ou caixa de shulker encostado. Escava um quadrado centrado nela, camada por camada, do bloco de baixo até o fundo do mundo, e guarda tudo nesse recipiente. Clique direito: seu estado, suas melhorias e o interruptor.",
  quarryRules:
    "Quebra cada bloco em nome do dono, então as proteções e o CoreProtect veem como dele, e só trabalha com o dono conectado. Nunca carrega chunks: espera que estejam carregados. Com o recipiente cheio, para. Pula o inquebrável, os líquidos e todo bloco com inventário ou dados (baús, fornalhas, spawners…), além dos lucky blocks, móveis e torretas do RPGRoll.",
  quarryClaims:
    "Com GriefPrevention e {claim}, a área inteira tem que estar dentro de um claim do dono, ao colocar e ao ampliar. {max} limita quantas cada jogador pode ter (2 por padrão).",
  thQDoes: "O que faz",
  thQDefault: "Padrão",
  qSpeed: "Velocidade",
  qSpeedD: "Blocos por segundo.",
  qArea: "Área",
  qAreaD: "Lado do quadrado. Ao ampliar, recomeça do topo.",
  qFortune: "Fortuna",
  qFortuneD: "A fortuna da picareta (não com toque de seda ligado).",
  qTier: "Potência",
  qTierD:
    "Nível de mineração para os minérios do RPGRoll-Items: os que não consegue minerar são pulados sem quebrar, e ao subi-lo recomeça para recolhê-los. Com um só nível não aparece no menu.",
  qTierV: "-1 (picareta de netherita)",
  qSilk: "Toque de seda",
  qSilkD: "Comprado uma vez, depois liga e desliga.",
  qSmelt: "Autofundição",
  qSmeltD: "Passa o que extrai pelas receitas de fornalha do servidor.",
  qFilter: "Filtro de lixo",
  qFilterD: "Descarta o que estiver em {junk}: por padrão pedras, terra, cascalho, areia e netherrack. Só o material puro, nunca um item com dados.",
  qOnce: "uma vez",
  quarryPerf:
    "Limites do servidor: {bpt} blocos minerados por tick entre todas as pedreiras e {spt} blocos verificados por pedreira e tick. {skip} adiciona blocos que nunca são minerados.",

  costTitle: "Custos",
  costBody:
    "Cada nível tem um {cost} com {money} (Vault) e/ou {items}. Um item é {vanilla}, ou {custom} para um item do RPGRoll-Items. O menu mostra em vermelho o que falta e não cobra nada até ter tudo.",

  modelTitle: "Modelos",
  modelBody:
    "Sem resource pack tudo é vanilla: o item de uma fornalha melhorada é a fornalha de sempre com seu nome e nível, e a pedreira é o bloco de {block}. Com um pack (o SackResourcePack, por exemplo) o item ganha modelo com {itemModel} e um quadro vai em cima do bloco com {frame}: um item_display do tamanho do bloco, pensado para um modelo com vãos que deixe ver a fornalha e sua frente acesa.",

  commandsTitle: "Comandos",
  thCommand: "Comando",
  thDesc: "Descrição",
  thAliases: "Aliases",
  cGiveFurnace: "Dá uma fornalha, alto-forno ou defumador de um nível.",
  cGiveSpawner: "Dá um spawner desse mob.",
  cGiveQuarry: "Dá uma pedreira.",
  cQuarries: "Lista as pedreiras (de todos ou de um jogador): onde estão, seu estado e em que camada estão.",
  cInfo: "O que tem o bloco que você está olhando: nível, melhorias, pilha, dono.",
  cReload: "Recarrega a configuração e os idiomas.",

  permissionsTitle: "Permissões",
  thPerm: "Permissão",
  thDefault: "Padrão",
  pFurnace: "Melhorar fornalhas, altos-fornos e defumadores.",
  pSpawner: "Melhorar e empilhar spawners.",
  pMine: "Recolher spawners com toque de seda.",
  pQuarry: "Colocar e usar pedreiras.",
  pBypass: "Abrir e melhorar as máquinas dos outros e ignorar o limite de pedreiras.",
  pAdmin: "/machines. Inclui bypass.",

  filesTitle: "Arquivos",
  thFile: "Arquivo",
  thContains: "O que tem",
  fConfig: "O idioma das mensagens.",
  fFurnaces: "Níveis de fornalha, modelos e mundos.",
  fSpawners: "Melhorias, pilha, recolha e holograma.",
  fQuarries: "Bloco, melhorias, limites, filtro e receita.",
  fLang: "Mensagens e textos dos menus.",
  fData: "As pedreiras colocadas (não se edita à mão).",
};

export const MACHINES_COPY: Record<Locale, MachinesCopy> = { es, en, pt };
