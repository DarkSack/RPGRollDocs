import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Structures. Ver copy/quickStart.ts para el patrón. */

const es = {
  title: "Estructuras (RPGRoll-Structures)",
  intro:
    "Mesas de construcción para tus jugadores: una mesa con tres niveles (Constructor, Ingeniero y Arquitecto) que se fabrica, se coloca, se mejora en el sitio y se comparte con jugadores de confianza. Esta primera versión, en acceso anticipado, trae la mesa y sus menús; el catálogo de estructuras llega después.",

  soonTitle: "Acceso anticipado: qué hay hoy y qué viene",
  soonBody:
    "Hoy: la mesa, sus tres niveles, la receta, los menús de Centro, Mejoras, Acceso y Ayuda, la protección y el almacenamiento. En el Centro, los botones de catálogo de estructuras, construcciones, materiales y obra salen marcados como «Próximamente»: aún no hacen nada. No hay fecha para ellos; las versiones que los traigan van incluidas en la compra.",
  storeBody: "Se compra en la tienda por 6 USD (120 MXN), pago único: {link}.",

  reqTitle: "Requisitos",
  reqBody:
    "Paper 26.1.1 y {lib}. Los demás son opcionales ({soft}). Hoy solo se usan dos: Vault, para cobrar dinero al mejorar la mesa, y SackResourcePack, para un modelo propio de la mesa (opcional) y los fondos dibujados de los menús. WorldEdit, FastAsyncWorldEdit, WorldGuard, GriefPrevention y floodgate están declarados para las funciones que vienen y ahora no cambian nada.",

  tiersTitle: "Los tres niveles",
  tiersLead:
    "La mesa nace en el nivel 1 y sube de nivel sin moverla. El tamaño máximo (ancho × alto × largo) es el de las obras que podrá levantar ese nivel; el coste es lo que se paga para llegar a él.",
  thTier: "Nivel",
  thSize: "Tamaño máximo",
  thBlock: "Bloque sin modelo",
  thCost: "Coste de llegar a él",
  tConstructor: "1 · Constructor",
  tIngeniero: "2 · Ingeniero",
  tArquitecto: "3 · Arquitecto",
  costNone: "— (es el de partida)",
  costIngeniero: "16 lingotes de hierro, 8 de redstone y 4 lámparas de redstone",
  costArquitecto: "8 diamantes, 16 cristales de prismarina y 1 estrella del Nether",
  tiersNote: "Tamaños, costes, dinero y bloque son configurables por nivel en {file}.",

  craftTitle: "Fabricarla",
  craftBody:
    "La mesa de nivel 1 se fabrica en la mesa de crafteo. Cada mesa lleva un número de serie y una firma: una copia hecha con comandos de otro plugin no se puede colocar («esa mesa no es auténtica»). La forma y los materiales se cambian en {file}; si la receta no es válida, el plugin avisa en la consola y no la registra.",
  craftShape: "Forma",
  craftKeys: "P = tablones de roble, C = lingote de cobre, T = mesa de crafteo, L = tronco de roble.",

  useTitle: "Colocarla, usarla y romperla",
  useRows: [
    ["Colocarla", "Quien la coloca es su dueño. La mesa queda registrada con su nivel y su serie. Necesita el permiso de colocar."],
    ["Abrirla", "Clic derecho abre el Centro de construcción. Con el jugador agachado no se abre. Pueden abrirla el dueño y los jugadores de confianza."],
    ["Romperla", "Solo la rompe su dueño (o quien tenga {bypass}). Suelta el ítem de la mesa con el mismo nivel y la misma serie, así que colocarla en otro sitio la deja tal cual estaba. En supervivencia se rompe con el clic izquierdo, aunque el bloque sea una barrera."],
    ["Mejorarla", "Desde el menú Mejoras: el bloque o el modelo cambia en el sitio, sin recolocar nada."],
  ] as [string, string][],
  breakPolicy:
    "{key} decide qué pasa si la mesa tiene una obra activa: {block} (no se deja romper), {pause} o {cancel}. Aún no hay obras, así que hoy no cambia nada; el ajuste ya se lee para cuando lleguen.",

  protectTitle: "Protección",
  protectBody:
    "Una mesa no se pierde por accidente. Las explosiones (TNT, creepers, camas, cristales del End…) no la destruyen, los pistones no la mueven y el Wither o los devastadores no la cambian. Nadie que no sea el dueño puede romperla: ni siquiera un jugador de confianza. Si el servidor guarda una mesa cuyo bloque ya no existe, la marca como huérfana y avisa en la consola.",

  menusTitle: "Los menús",
  menusLead: "Todos se abren desde la mesa, y todos tienen botón para volver.",
  thMenu: "Menú",
  thWhat: "Qué hace",
  mCenter: "Centro de construcción",
  mCenterP:
    "El menú principal (6 filas): el nivel de la mesa, y los botones a Mejoras, Acceso y Ayuda. Mejoras y Acceso solo los abre el dueño; a un jugador de confianza le dice que son del dueño. Catálogo, construcciones, materiales y obra salen como «Próximamente».",
  mUpgrade: "Mejoras",
  mUpgradeP:
    "Enseña el nivel siguiente y cada requisito en verde (✔, lo tienes) o rojo (✘, y cuántos te faltan). Si ya lo tienes todo, el botón Mejorar pide confirmación y cobra los materiales (y el dinero, si el coste lo lleva). En el nivel máximo solo avisa de que ya no hay más.",
  mConfirm: "Confirmar",
  mConfirmP: "Una pantalla de Confirmar / Cancelar antes de gastar nada. Cancelar vuelve a Mejoras sin cobrar.",
  mAccess: "Acceso",
  mAccessP:
    "La lista de jugadores de confianza, con su cabeza, de 45 en 45. Clic en una cabeza para quitarle el acceso. Añadir jugador te pide el nombre en el chat (escribe «cancelar» para salir); solo vale un jugador que el servidor ya conozca. Un jugador de confianza puede abrir y usar la mesa, pero no mejorarla, ni dar acceso, ni romperla.",
  mHelp: "Ayuda",
  mHelpP: "Tres páginas con lo básico de la mesa, dentro del juego.",
  menusPackNote:
    "Con {pack} puesto, cada menú se dibuja sobre un fondo propio, uno por menú y por nivel (taller, ingenio y arcano). Vacío, son menús de cofre normales y todo funciona igual.",

  shotsTitle: "Capturas",
  shotCenter: "Centro de construcción, el menú principal de la mesa.",
  shotUpgrade: "Mejoras, con los requisitos del nivel siguiente marcados ✔ o ✘.",
  shotConfirm: "Confirmar la mejora antes de gastar los materiales.",
  shotAccess: "Acceso: los jugadores de confianza de la mesa.",
  shotHelp: "Ayuda dentro del juego.",
  shotTiers: "Las mesas de los tres niveles colocadas en el mundo.",
  altCenter: "Menú Centro de construcción de una mesa",
  altUpgrade: "Menú Mejoras con requisitos marcados con ✔ y ✘",
  altConfirm: "Pantalla para confirmar la mejora de la mesa",
  altAccess: "Menú Acceso con las cabezas de los jugadores de confianza",
  altHelp: "Menú Ayuda de la mesa",
  altTiers: "Las mesas Constructor, Ingeniero y Arquitecto colocadas en el mundo",
  shotMax: "Mejoras en el nivel máximo: ya no hay más niveles.",
  altMax: "Menú Mejoras de una mesa Arquitecto, en el nivel máximo",
  shotFamilies: "Con el pack de menús de Sackito (menus.pack: \"sackito:menus\") cada nivel tiene su propio fondo dibujado:",
  shotTaller: "Constructor: taller de madera.",
  shotIngenio: "Ingeniero: pizarra y redstone.",
  shotArcano: "Arquitecto: runas arcanas.",
  altTaller: "Centro de construcción con el fondo de taller de madera",
  altIngenio: "Centro de construcción con el fondo de pizarra y redstone",
  altArcano: "Centro de construcción con el fondo de runas arcanas",
  shotTips: "Con el ratón encima, cada botón explica qué hace y cada material dice si ya lo tienes.",
  shotCatalog: "Cada botón trae su descripción; lo que aún no está listo dice «Próximamente».",
  altCatalog: "Tooltip del botón Catálogo de estructuras en el Centro de construcción",
  shotMissing: "Material que falta: ✘ en rojo y cuántos te faltan.",
  altMissing: "Tooltip de un material de mejora que falta: 4x Lámpara, te faltan 3",
  shotHave: "Material completo: ✔ en verde.",
  altHave: "Tooltip de un material de mejora completo: 16x Lingote de hierro",
  shotHelpText: "La Ayuda se lee pasando el ratón por sus páginas.",
  altHelpText: "Tooltip de la primera página de la Ayuda de la mesa",

  storageTitle: "Dónde se guardan las mesas",
  storageBody:
    "En una base de datos propia del plugin, {sqlite} por defecto (un archivo, {file}, sin configurar nada) o MySQL/MariaDB si rellenas la sección {mysql} y pones {type}. Se guarda el dueño, el sitio, el nivel, la serie y los jugadores de confianza. Si una mesa está en un mundo que aún no cargó, se indexa cuando cargue. No comparte base con el resto de RPGRoll.",

  modelTitle: "Aspecto: bloque o modelo",
  modelBody:
    "Sin modelo, cada nivel se ve como un bloque de vanilla ({fallback}); si el material que pongas no es un bloque, se usa una mesa de crafteo. Con {model} en un nivel y SackResourcePack instalado, la mesa es una barrera con el modelo encima.",

  commandsTitle: "Comandos",
  thCommand: "Comando",
  thDesc: "Qué hace",
  thAliases: "Nombres por idioma",
  cHelp: "Abre la ayuda (tres páginas). {open} hace lo mismo.",
  cGive:
    "Da mesas a un jugador conectado: nivel y cantidad de 1 a 64 (1 si no se indica). Si no caben en el inventario, caen al suelo. Cada una sale con su serie.",
  cReload: "Recarga la configuración, la receta y los textos.",
  commandsNote:
    "{admin} solo existe con ese nombre. Los nombres de {player} y de sus subcomandos cambian con el idioma del servidor; se editan en {file}.",

  permissionsTitle: "Permisos",
  thPerm: "Permiso",
  thDefault: "Por defecto",
  pUse: "Usar los comandos de /structures.",
  pPlace: "Colocar mesas.",
  pBreak: "Romper las mesas propias.",
  pTierAll: "Usar mesas de cualquier nivel (incluye los tres siguientes).",
  pTier1: "Nivel 1, Constructor.",
  pTier2: "Nivel 2, Ingeniero. Es el que hace falta para mejorar la mesa a ese nivel.",
  pTier3: "Nivel 3, Arquitecto. Es el que hace falta para mejorar la mesa a ese nivel.",
  pBypass: "Saltarse las restricciones: abrir, mejorar, dar acceso y romper mesas ajenas.",
  pGive: "Usar /structuresadmin give.",
  pReload: "Usar /structuresadmin reload.",
  pAdmin: "Administrar el plugin (incluye bypass, give y reload).",

  configTitle: "Configuración",
  thKey: "Clave",
  kLanguage: "Idioma de los mensajes (es, en, pt_BR).",
  kBreak: "Qué pasa al romper una mesa con una obra activa: block, pause o cancel. Un valor no válido avisa y usa block.",
  kPack: "Menús dibujados del resource pack. En Sackito: sackito:menus. Vacío: menús de cofre normales.",
  kRecipe: "La forma y los materiales de la receta de la mesa de nivel 1 (en workbench.yml).",
  kSize: "Tamaño máximo de obra de cada nivel: ancho, alto y largo (en workbench.yml).",
  kCost: "Materiales para mejorar a ese nivel: una lista de ítem y cantidad (en workbench.yml).",
  kMoney: "Dinero que se cobra además de los materiales. Necesita Vault con una economía; sin ella no se cobra y avisa.",
  kModel: "Modelo del nivel. Vacío = el bloque de fallback-block.",
  kFallback: "Bloque con el que se ve el nivel sin modelo.",
  configNote: "Los cambios de {file} se aplican con {reload}.",

  filesTitle: "Archivos",
  thFile: "Archivo",
  thContains: "Qué tiene",
  fConfig: "Idioma, política de romper y menús dibujados.",
  fWorkbench: "La receta de la mesa y, por nivel, tamaño, coste de mejora, dinero, modelo y bloque.",
  fStorage: "La base de datos: SQLite o MySQL.",
  fGui: "Los títulos de los menús (una clave del idioma o un texto con colores &).",
  fLang: "Todos los textos, en es, en y pt_BR.",
  fWords: "Los nombres de los comandos y sus subcomandos en cada idioma.",
};

export type StructuresCopy = typeof es;

const en: StructuresCopy = {
  title: "Structures (RPGRoll-Structures)",
  intro:
    "Building tables for your players: one table with three levels (Builder, Engineer and Architect) that is crafted, placed, upgraded in place and shared with trusted players. This first version, in early access, ships the table and its menus; the structure catalog comes later.",

  soonTitle: "Early access: what there is today and what is coming",
  soonBody:
    "Today: the table, its three levels, the recipe, the Center, Upgrades, Access and Help menus, protection and storage. In the Center, the buttons for the structure catalog, builds, materials and project are marked “Coming soon”: they do nothing yet. There is no date for them; the versions that bring them are included in the purchase.",
  storeBody: "Buy it in the store for 6 USD (120 MXN), one-time payment: {link}.",

  reqTitle: "Requirements",
  reqBody:
    "Paper 26.1.1 and {lib}. Everything else is optional ({soft}). Only two are used today: Vault, to charge money when upgrading the table, and SackResourcePack, for an optional custom table model and the drawn menu backgrounds. WorldEdit, FastAsyncWorldEdit, WorldGuard, GriefPrevention and floodgate are declared for the features to come and change nothing now.",

  tiersTitle: "The three levels",
  tiersLead:
    "The table starts at level 1 and goes up without being moved. The maximum size (width × height × length) is that of the builds the level will be able to raise; the cost is what you pay to reach it.",
  thTier: "Level",
  thSize: "Maximum size",
  thBlock: "Block without a model",
  thCost: "Cost to reach it",
  tConstructor: "1 · Builder",
  tIngeniero: "2 · Engineer",
  tArquitecto: "3 · Architect",
  costNone: "— (the starting level)",
  costIngeniero: "16 iron ingots, 8 redstone and 4 redstone lamps",
  costArquitecto: "8 diamonds, 16 prismarine crystals and 1 nether star",
  tiersNote: "Sizes, costs, money and block are configurable per level in {file}.",

  craftTitle: "Crafting it",
  craftBody:
    "The level 1 table is crafted at a crafting table. Every table carries a serial number and a signature: a copy made with another plugin's commands cannot be placed (“that table is not genuine”). The shape and materials change in {file}; if the recipe is not valid, the plugin warns in the console and does not register it.",
  craftShape: "Shape",
  craftKeys: "P = oak planks, C = copper ingot, T = crafting table, L = oak log.",

  useTitle: "Placing, using and breaking it",
  useRows: [
    ["Placing", "Whoever places it is its owner. The table is registered with its level and serial. It needs the place permission."],
    ["Opening", "Right click opens the Building Center. It does not open while sneaking. The owner and trusted players can open it."],
    ["Breaking", "Only its owner (or anyone with {bypass}) can break it. It drops the table item with the same level and the same serial, so placing it elsewhere leaves it just as it was. In survival it breaks with left click, even though the block is a barrier."],
    ["Upgrading", "From the Upgrades menu: the block or model changes in place, nothing to move."],
  ] as [string, string][],
  breakPolicy:
    "{key} decides what happens if the table has an active project: {block} (it cannot be broken), {pause} or {cancel}. There are no projects yet, so today it changes nothing; the setting is already read for when they arrive.",

  protectTitle: "Protection",
  protectBody:
    "A table is not lost by accident. Explosions (TNT, creepers, beds, End crystals…) do not destroy it, pistons do not move it and the Wither or ravagers do not change it. Nobody but the owner can break it, not even a trusted player. If the server holds a table whose block no longer exists, it marks it as orphaned and warns in the console.",

  menusTitle: "The menus",
  menusLead: "All of them open from the table, and all have a back button.",
  thMenu: "Menu",
  thWhat: "What it does",
  mCenter: "Building Center",
  mCenterP:
    "The main menu (6 rows): the table's level, and the buttons to Upgrades, Access and Help. Only the owner opens Upgrades and Access; a trusted player is told they belong to the owner. Catalog, builds, materials and project show as “Coming soon”.",
  mUpgrade: "Upgrades",
  mUpgradeP:
    "Shows the next level and each requirement in green (✔, you have it) or red (✘, and how many you are missing). With everything in hand, the Upgrade button asks for confirmation and takes the materials (and the money, if the cost has any). At the top level it only says there is nothing further.",
  mConfirm: "Confirm",
  mConfirmP: "A Confirm / Cancel screen before anything is spent. Cancel goes back to Upgrades without charging.",
  mAccess: "Access",
  mAccessP:
    "The list of trusted players, with their heads, 45 per page. Click a head to remove their access. Add player asks for the name in chat (type “cancel” to leave); only a player the server already knows is accepted. A trusted player can open and use the table, but cannot upgrade it, give access or break it.",
  mHelp: "Help",
  mHelpP: "Three pages with the basics of the table, in game.",
  menusPackNote:
    "With {pack} set, each menu is drawn over its own background, one per menu and per level (taller, ingenio and arcano). Empty, they are normal chest menus and everything works the same.",

  shotsTitle: "Screenshots",
  shotCenter: "Building Center, the table's main menu.",
  shotUpgrade: "Upgrades, with the next level's requirements marked ✔ or ✘.",
  shotConfirm: "Confirming the upgrade before the materials are spent.",
  shotAccess: "Access: the table's trusted players.",
  shotHelp: "Help inside the game.",
  shotTiers: "The tables of the three levels placed in the world.",
  altCenter: "A table's Building Center menu",
  altUpgrade: "Upgrades menu with requirements marked ✔ and ✘",
  altConfirm: "Screen to confirm the table upgrade",
  altAccess: "Access menu with the heads of the trusted players",
  altHelp: "The table's Help menu",
  altTiers: "The Builder, Engineer and Architect tables placed in the world",
  shotMax: "Upgrades at the maximum level: there are no more levels.",
  altMax: "Upgrades menu of an Architect table at the maximum level",
  shotFamilies: "With Sackito's menu pack (menus.pack: \"sackito:menus\") each level has its own drawn background:",
  shotTaller: "Builder: wooden workshop.",
  shotIngenio: "Engineer: deepslate and redstone.",
  shotArcano: "Architect: arcane runes.",
  altTaller: "Building Center with the wooden workshop background",
  altIngenio: "Building Center with the deepslate and redstone background",
  altArcano: "Building Center with the arcane runes background",
  shotTips: "Hover over a button to see what it does, and over a material to see whether you already have it.",
  shotCatalog: "Every button has a description; anything not ready yet says “Coming soon”.",
  altCatalog: "Tooltip of the Structure Catalog button in the Building Center",
  shotMissing: "Missing material: a red ✘ and how many you still need.",
  altMissing: "Tooltip of a missing upgrade material: 4x Lamp, 3 still needed",
  shotHave: "Material you have: a green ✔.",
  altHave: "Tooltip of a complete upgrade material: 16x Iron Ingot",
  shotHelpText: "Read the Help by hovering over its pages.",
  altHelpText: "Tooltip of the first page of the table's Help",

  storageTitle: "Where tables are stored",
  storageBody:
    "In the plugin's own database: {sqlite} by default (one file, {file}, nothing to set up) or MySQL/MariaDB if you fill in the {mysql} section and set {type}. It stores the owner, the location, the level, the serial and the trusted players. If a table is in a world that has not loaded yet, it is indexed when it loads. It does not share a database with the rest of RPGRoll.",

  modelTitle: "Look: block or model",
  modelBody:
    "Without a model, each level looks like a vanilla block ({fallback}); if the material you set is not a block, a crafting table is used. With {model} on a level and SackResourcePack installed, the table is a barrier with the model on top.",

  commandsTitle: "Commands",
  thCommand: "Command",
  thDesc: "What it does",
  thAliases: "Names per language",
  cHelp: "Opens the help (three pages). {open} does the same.",
  cGive:
    "Gives tables to an online player: level and an amount from 1 to 64 (1 if omitted). What does not fit in the inventory drops on the ground. Each one comes with its own serial.",
  cReload: "Reloads the configuration, the recipe and the texts.",
  commandsNote:
    "{admin} only exists under that name. The names of {player} and its subcommands change with the server's language; they are edited in {file}.",

  permissionsTitle: "Permissions",
  thPerm: "Permission",
  thDefault: "Default",
  pUse: "Use the /structures commands.",
  pPlace: "Place tables.",
  pBreak: "Break your own tables.",
  pTierAll: "Use tables of any level (includes the next three).",
  pTier1: "Level 1, Builder.",
  pTier2: "Level 2, Engineer. Needed to upgrade a table to that level.",
  pTier3: "Level 3, Architect. Needed to upgrade a table to that level.",
  pBypass: "Skip the restrictions: open, upgrade, give access to and break other players' tables.",
  pGive: "Use /structuresadmin give.",
  pReload: "Use /structuresadmin reload.",
  pAdmin: "Administer the plugin (includes bypass, give and reload).",

  configTitle: "Configuration",
  thKey: "Key",
  kLanguage: "Language of the messages (es, en, pt_BR).",
  kBreak: "What happens when a table with an active project is broken: block, pause or cancel. An invalid value warns and uses block.",
  kPack: "Drawn menus from the resource pack. On Sackito: sackito:menus. Empty: normal chest menus.",
  kRecipe: "The shape and materials of the level 1 table recipe (in workbench.yml).",
  kSize: "Maximum build size of each level: width, height and length (in workbench.yml).",
  kCost: "Materials to upgrade to that level: a list of item and amount (in workbench.yml).",
  kMoney: "Money charged on top of the materials. Needs Vault with an economy; without one nothing is charged and it warns.",
  kModel: "The level's model. Empty = the fallback-block block.",
  kFallback: "Block the level looks like without a model.",
  configNote: "Changes to {file} are applied with {reload}.",

  filesTitle: "Files",
  thFile: "File",
  thContains: "What it has",
  fConfig: "Language, break policy and drawn menus.",
  fWorkbench: "The table recipe and, per level, size, upgrade cost, money, model and block.",
  fStorage: "The database: SQLite or MySQL.",
  fGui: "The menu titles (a language key or text with & colors).",
  fLang: "All the texts, in es, en and pt_BR.",
  fWords: "The command and subcommand names in each language.",
};

const pt: StructuresCopy = {
  title: "Estruturas (RPGRoll-Structures)",
  intro:
    "Mesas de construção para os seus jogadores: uma mesa com três níveis (Construtor, Engenheiro e Arquiteto) que se fabrica, se coloca, se melhora no lugar e se compartilha com jogadores de confiança. Esta primeira versão, em acesso antecipado, traz a mesa e os menus; o catálogo de estruturas vem depois.",

  soonTitle: "Acesso antecipado: o que há hoje e o que vem",
  soonBody:
    "Hoje: a mesa, os três níveis, a receita, os menus de Centro, Melhorias, Acesso e Ajuda, a proteção e o armazenamento. No Centro, os botões de catálogo de estruturas, construções, materiais e obra aparecem como «Em breve»: ainda não fazem nada. Não há data para eles; as versões que os trouxerem estão incluídas na compra.",
  storeBody: "Compre na loja por 6 USD (120 MXN), pagamento único: {link}.",

  reqTitle: "Requisitos",
  reqBody:
    "Paper 26.1.1 e {lib}. Os demais são opcionais ({soft}). Hoje só dois são usados: Vault, para cobrar dinheiro ao melhorar a mesa, e SackResourcePack, para um modelo próprio da mesa (opcional) e os fundos desenhados dos menus. WorldEdit, FastAsyncWorldEdit, WorldGuard, GriefPrevention e floodgate estão declarados para as funções que vêm e agora não mudam nada.",

  tiersTitle: "Os três níveis",
  tiersLead:
    "A mesa nasce no nível 1 e sobe de nível sem ser movida. O tamanho máximo (largura × altura × comprimento) é o das obras que esse nível poderá levantar; o custo é o que se paga para chegar a ele.",
  thTier: "Nível",
  thSize: "Tamanho máximo",
  thBlock: "Bloco sem modelo",
  thCost: "Custo para chegar a ele",
  tConstructor: "1 · Construtor",
  tIngeniero: "2 · Engenheiro",
  tArquitecto: "3 · Arquiteto",
  costNone: "— (é o inicial)",
  costIngeniero: "16 barras de ferro, 8 de redstone e 4 lâmpadas de redstone",
  costArquitecto: "8 diamantes, 16 cristais de prismarinho e 1 estrela do Nether",
  tiersNote: "Tamanhos, custos, dinheiro e bloco são configuráveis por nível em {file}.",

  craftTitle: "Fabricá-la",
  craftBody:
    "A mesa de nível 1 se fabrica na bancada de trabalho. Cada mesa leva um número de série e uma assinatura: uma cópia feita com comandos de outro plugin não pode ser colocada («essa mesa não é autêntica»). A forma e os materiais mudam em {file}; se a receita não for válida, o plugin avisa no console e não a registra.",
  craftShape: "Forma",
  craftKeys: "P = tábuas de carvalho, C = barra de cobre, T = bancada de trabalho, L = tronco de carvalho.",

  useTitle: "Colocá-la, usá-la e quebrá-la",
  useRows: [
    ["Colocá-la", "Quem a coloca é o dono. A mesa fica registrada com o seu nível e a sua série. Precisa da permissão de colocar."],
    ["Abri-la", "Clique direito abre o Centro de construção. Agachado não abre. O dono e os jogadores de confiança podem abri-la."],
    ["Quebrá-la", "Só o dono (ou quem tem {bypass}) a quebra. Solta o item da mesa com o mesmo nível e a mesma série, então colocá-la em outro lugar a deixa como estava. No survival se quebra com o clique esquerdo, mesmo que o bloco seja uma barreira."],
    ["Melhorá-la", "Pelo menu Melhorias: o bloco ou o modelo muda no lugar, sem recolocar nada."],
  ] as [string, string][],
  breakPolicy:
    "{key} decide o que acontece se a mesa tiver uma obra ativa: {block} (não deixa quebrar), {pause} ou {cancel}. Ainda não há obras, então hoje não muda nada; o ajuste já é lido para quando chegarem.",

  protectTitle: "Proteção",
  protectBody:
    "Uma mesa não se perde por acidente. As explosões (TNT, creepers, camas, cristais do End…) não a destroem, os pistões não a movem e o Wither ou os devastadores não a alteram. Ninguém além do dono pode quebrá-la, nem mesmo um jogador de confiança. Se o servidor guardar uma mesa cujo bloco já não existe, a marca como órfã e avisa no console.",

  menusTitle: "Os menus",
  menusLead: "Todos abrem a partir da mesa, e todos têm botão para voltar.",
  thMenu: "Menu",
  thWhat: "O que faz",
  mCenter: "Centro de construção",
  mCenterP:
    "O menu principal (6 fileiras): o nível da mesa e os botões para Melhorias, Acesso e Ajuda. Melhorias e Acesso só o dono abre; a um jogador de confiança diz que são do dono. Catálogo, construções, materiais e obra aparecem como «Em breve».",
  mUpgrade: "Melhorias",
  mUpgradeP:
    "Mostra o nível seguinte e cada requisito em verde (✔, você tem) ou vermelho (✘, e quantos faltam). Com tudo em mãos, o botão Melhorar pede confirmação e cobra os materiais (e o dinheiro, se o custo tiver). No nível máximo só avisa que não há mais.",
  mConfirm: "Confirmar",
  mConfirmP: "Uma tela de Confirmar / Cancelar antes de gastar algo. Cancelar volta a Melhorias sem cobrar.",
  mAccess: "Acesso",
  mAccessP:
    "A lista de jogadores de confiança, com a cabeça, de 45 em 45. Clique numa cabeça para tirar o acesso. Adicionar jogador pede o nome no chat (escreva «cancelar» para sair); só vale um jogador que o servidor já conheça. Um jogador de confiança pode abrir e usar a mesa, mas não melhorá-la, nem dar acesso, nem quebrá-la.",
  mHelp: "Ajuda",
  mHelpP: "Três páginas com o básico da mesa, dentro do jogo.",
  menusPackNote:
    "Com {pack} definido, cada menu é desenhado sobre um fundo próprio, um por menu e por nível (taller, ingenio e arcano). Vazio, são menus de baú normais e tudo funciona igual.",

  shotsTitle: "Capturas de tela",
  shotCenter: "Centro de construção, o menu principal da mesa.",
  shotUpgrade: "Melhorias, com os requisitos do nível seguinte marcados ✔ ou ✘.",
  shotConfirm: "Confirmar a melhoria antes de gastar os materiais.",
  shotAccess: "Acesso: os jogadores de confiança da mesa.",
  shotHelp: "Ajuda dentro do jogo.",
  shotTiers: "As mesas dos três níveis colocadas no mundo.",
  altCenter: "Menu Centro de construção de uma mesa",
  altUpgrade: "Menu Melhorias com requisitos marcados com ✔ e ✘",
  altConfirm: "Tela para confirmar a melhoria da mesa",
  altAccess: "Menu Acesso com as cabeças dos jogadores de confiança",
  altHelp: "Menu Ajuda da mesa",
  altTiers: "As mesas Construtor, Engenheiro e Arquiteto colocadas no mundo",
  shotMax: "Melhorias no nível máximo: não há mais níveis.",
  altMax: "Menu Melhorias de uma mesa Arquiteto no nível máximo",
  shotFamilies: "Com o pacote de menus do Sackito (menus.pack: \"sackito:menus\") cada nível tem seu próprio fundo desenhado:",
  shotTaller: "Construtor: oficina de madeira.",
  shotIngenio: "Engenheiro: ardósia e redstone.",
  shotArcano: "Arquiteto: runas arcanas.",
  altTaller: "Centro de construção com o fundo de oficina de madeira",
  altIngenio: "Centro de construção com o fundo de ardósia e redstone",
  altArcano: "Centro de construção com o fundo de runas arcanas",
  shotTips: "Com o mouse em cima, cada botão explica o que faz e cada material mostra se você já o tem.",
  shotCatalog: "Cada botão tem sua descrição; o que ainda não está pronto diz “Em breve”.",
  altCatalog: "Tooltip do botão Catálogo de estruturas no Centro de construção",
  shotMissing: "Material que falta: ✘ em vermelho e quantos ainda faltam.",
  altMissing: "Tooltip de um material de melhoria que falta: 4x Lâmpada, faltam 3",
  shotHave: "Material completo: ✔ em verde.",
  altHave: "Tooltip de um material de melhoria completo: 16x Barra de ferro",
  shotHelpText: "A Ajuda é lida passando o mouse pelas páginas.",
  altHelpText: "Tooltip da primeira página da Ajuda da mesa",

  storageTitle: "Onde as mesas são guardadas",
  storageBody:
    "Num banco de dados próprio do plugin, {sqlite} por padrão (um arquivo, {file}, sem configurar nada) ou MySQL/MariaDB se preencher a seção {mysql} e definir {type}. Guarda o dono, o lugar, o nível, a série e os jogadores de confiança. Se uma mesa estiver num mundo que ainda não carregou, é indexada quando carregar. Não compartilha banco com o resto do RPGRoll.",

  modelTitle: "Aparência: bloco ou modelo",
  modelBody:
    "Sem modelo, cada nível aparece como um bloco vanilla ({fallback}); se o material definido não for um bloco, usa-se uma bancada de trabalho. Com {model} num nível e o SackResourcePack instalado, a mesa é uma barreira com o modelo por cima.",

  commandsTitle: "Comandos",
  thCommand: "Comando",
  thDesc: "O que faz",
  thAliases: "Nomes por idioma",
  cHelp: "Abre a ajuda (três páginas). {open} faz o mesmo.",
  cGive:
    "Dá mesas a um jogador conectado: nível e quantidade de 1 a 64 (1 se não indicar). O que não couber no inventário cai no chão. Cada uma sai com a sua série.",
  cReload: "Recarrega a configuração, a receita e os textos.",
  commandsNote:
    "{admin} só existe com esse nome. Os nomes de {player} e dos seus subcomandos mudam com o idioma do servidor; são editados em {file}.",

  permissionsTitle: "Permissões",
  thPerm: "Permissão",
  thDefault: "Padrão",
  pUse: "Usar os comandos de /structures.",
  pPlace: "Colocar mesas.",
  pBreak: "Quebrar as próprias mesas.",
  pTierAll: "Usar mesas de qualquer nível (inclui as três seguintes).",
  pTier1: "Nível 1, Construtor.",
  pTier2: "Nível 2, Engenheiro. É a necessária para melhorar a mesa a esse nível.",
  pTier3: "Nível 3, Arquiteto. É a necessária para melhorar a mesa a esse nível.",
  pBypass: "Ignorar as restrições: abrir, melhorar, dar acesso e quebrar mesas alheias.",
  pGive: "Usar /structuresadmin give.",
  pReload: "Usar /structuresadmin reload.",
  pAdmin: "Administrar o plugin (inclui bypass, give e reload).",

  configTitle: "Configuração",
  thKey: "Chave",
  kLanguage: "Idioma das mensagens (es, en, pt_BR).",
  kBreak: "O que acontece ao quebrar uma mesa com obra ativa: block, pause ou cancel. Um valor inválido avisa e usa block.",
  kPack: "Menus desenhados do resource pack. No Sackito: sackito:menus. Vazio: menus de baú normais.",
  kRecipe: "A forma e os materiais da receita da mesa de nível 1 (em workbench.yml).",
  kSize: "Tamanho máximo de obra de cada nível: largura, altura e comprimento (em workbench.yml).",
  kCost: "Materiais para melhorar a esse nível: uma lista de item e quantidade (em workbench.yml).",
  kMoney: "Dinheiro cobrado além dos materiais. Precisa do Vault com uma economia; sem ela não se cobra e avisa.",
  kModel: "Modelo do nível. Vazio = o bloco de fallback-block.",
  kFallback: "Bloco com que o nível aparece sem modelo.",
  configNote: "As mudanças em {file} se aplicam com {reload}.",

  filesTitle: "Arquivos",
  thFile: "Arquivo",
  thContains: "O que tem",
  fConfig: "Idioma, política de quebrar e menus desenhados.",
  fWorkbench: "A receita da mesa e, por nível, tamanho, custo de melhoria, dinheiro, modelo e bloco.",
  fStorage: "O banco de dados: SQLite ou MySQL.",
  fGui: "Os títulos dos menus (uma chave do idioma ou um texto com cores &).",
  fLang: "Todos os textos, em es, en e pt_BR.",
  fWords: "Os nomes dos comandos e subcomandos em cada idioma.",
};

export const STRUCTURES_COPY: Record<Locale, StructuresCopy> = { es, en, pt };
