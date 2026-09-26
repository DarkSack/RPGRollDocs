import type { Locale } from "../../i18n";

/** Texto de las páginas para desarrolladores: Arquitectura y API. */

const es = {
  architecture: {
    title: "Arquitectura",
    intro: "RPGRoll está dividido en módulos Gradle con una regla simple: sin dependencias circulares.",

    modulesTitle: "Los módulos del núcleo",
    modulesLead:
      "El proyecto se separó de un único módulo monolítico a tres módulos Gradle independientes, cada uno con una responsabilidad clara (más un cuarto módulo de addon opcional, ver más abajo):",
    apiCard:
      "Contrato público para addons: {types}, y los eventos que no exponen tipos internos. Sin dependencias — módulo hoja puro.",
    commonCard:
      "Framework genérico de carga de contenido YAML ({managers}) y {loader}, más menús, idiomas y comandos. Solo usa la API de Paper, y se distribuye como el plugin RPGRoll-Lib.",
    coreCard: "La implementación completa: jugadores, base de datos, comandos, GUIs, combate, trabajos. Depende de {deps}.",

    graphTitle: "Grafo de dependencias",
    graphNote: "(solo para que Race/PlayerClass implementen RPGContent)",
    graphNothing: "(nada)",
    graphCallout:
      "La clave para que esto no sea circular: la fachada pública {facade} y los 3 eventos que exponen el {rpgPlayer} concreto ({events}) viven físicamente en el módulo {core}, aunque conservan el paquete {pkg} por compatibilidad de nombres. Así {api} queda 100% desacoplado de {core}.",

    packagesTitle: "Estructura de paquetes (dentro de core)",
    pkgCommand: "comandos de /rpg y su registro (CommandManager)",
    pkgConfig: "carga y copia de los YAML de configuración",
    pkgCore: "Bootstrap (arranque) y ServiceRegistry (DI simple)",
    pkgDatabase: "conexión SQLite y sistema de migraciones",
    pkgGui: "GUIs de inventario (creación de personaje, trabajos)",
    pkgPlayer: "RPGPlayer, PlayerManager, repositorio y caché",
    pkgIntegration: "VaultEconomyProvider",

    bootstrapTitle: "Arranque (Bootstrap)",
    bootstrapBody:
      "{onEnable} delega todo a {bootstrap}, que inicializa los servicios en un orden fijo (config → base de datos → jugadores → contenido YAML → economía → trabajos → combate/HUD), los registra en un {registry} simple (un {map}), registra los subcomandos, y por último registra los event listeners.",
    bootstrapWarn:
      "No hay un contenedor de inyección de dependencias real — {get} lanza {exception} si el servicio no fue registrado todavía. El orden de {register} importa.",

    shadowTitle: "Empaquetado (Shadow)",
    shadowBody:
      "Solo {file} aplica el plugin {shadow}. El jar final ({jar}) bundlea las clases de {modules} + el driver {driver} (con sus binarios nativos para todas las plataformas), y reubica el paquete de sqlite-jdbc a {relocated} para evitar choques con otros plugins que también lo empaqueten. {common} ya no va adentro: en runtime lo aporta el plugin RPGRoll-Lib.",
    shadowJar: "este es el que va a plugins/ (shadow jar, todo bundleado)",
    shadowPlain: "solo las clases de core, sin dependencias (no usar directamente)",

    addonsTitle: "Módulos de addon (ej. npcs)",
    addonsBody1: "Un addon como",
    addonsBody2:
      "es su propio módulo Gradle (propio {build}, propio {pluginYml}, propio jar) que aplica {addonConv} en vez de {pluginConv} directamente. Esa convención agrega Paper API + {compileApi} + {compileCommon} y embebe el módulo de licencias en el jar — nada del core. Un addon que necesite clases que viven físicamente en {core} (como {classes}) tiene que agregar {compileCore} él mismo: hoy solo Ascension y Magic lo hacen. El resto lee el personaje a través de RPGRoll-Lib (ver la sección siguiente).",
    addonsTipTitle: "Cada addon decide su propio empaquetado",
    addonsTipBody:
      "{npcs} tiene su propio {shadow} configurado por separado del de {core}, porque necesita bundlear y reubicar sus propias dependencias externas (OkHttp, en su caso) sin tocar el jar principal del plugin.",

    libTitle: "RPGRoll-Lib: la librería compartida",
    libBody:
      "{common} se distribuye como un plugin propio, {lib}: gratis, sin licencia, y en el {depend} de todos los módulos. Paper deja que un plugin vea las clases de los que declara en depend/softdepend, así que en runtime todo el ecosistema usa la misma copia — un solo {listener} y un solo registro de menús abiertos.",
    libModules:
      "Gracias a eso los módulos ya no compilan contra el core. Lo que necesitan del personaje lo leen con {characters}, que queda vacío si el core no está; la economía la toman de Vault con {vault}; y las subidas de nivel las escuchan como {event}. Solo Ascension y Magic, que trabajan sobre el personaje en sí (prestigio, maná y stats de combate), siguen con el core en depend.",
    libWithoutCore:
      "Sin el core no hay personajes. Cada módulo decide qué hacer con sus requisitos de personaje —Quests, Items y Fishing los ignoran; las condiciones de Crafting y NPCs no se cumplen— y la EXP de personaje simplemente no se entrega. Todo lo demás funciona igual.",
    libLicenseTitle: "La licencia no vive en la librería",
    libLicenseBody:
      "{licensing} va embebido en el jar de cada módulo. Si viviera en RPGRoll-Lib, que es gratis y va aparte, reemplazar ese único jar por uno modificado desbloquearía todos los módulos a la vez.",

    textTitle: "Colores y formato de texto — ComponentUtils",
    textBody:
      "Todo texto que viene de un YAML de contenido (nombres de ítems, mensajes de misión, diálogos de mob, recompensas de crate, etc.) pasa por {parse} antes de convertirse en un {component} de Adventure. Es la única fuente de verdad para esto — ningún addon debería instanciar su propio {serializer} suelto.",
    thFormat: "Formato",
    thExample: "Ejemplo",
    thEngine: "Motor",
    fLegacy: "Legacy clásico",
    fHexChar: "Hex por carácter",
    fHexBungee: "Hex estilo BungeeCord",
    fMiniMessage: "MiniMessage / gradient",
    eMiniMessage: "MiniMessage (autodetectado por la presencia de {tag})",
    exceptionsStrong: "Excepciones deliberadas",
    exceptionsBody:
      ": {srp} (standalone, sin dependencia de {core}) tiene su propia copia local idéntica en {engine}. El canal de chat ({chat}) deja elegir {legacy} vs {mini} explícitamente por canal en su YAML — ahí no se usa la auto-detección de {utils}, porque la elección ya es explícita.",

    tabTitle: "Tab-completion — TabCompleteUtil",
    tabBody:
      "Todos los comandos de todos los addons (y de {rpg} en core) implementan {completer} además de {executor}, y sugieren desde el manager real de contenido correspondiente en vez de texto fijo: ids de encantamientos, mobs, quests, efectos, especies, profesiones, etc., más nombres de jugadores y mundos online donde corresponde. La lógica de filtrado compartida (coincidencia de prefijo, sin importar mayúsculas) vive en {util}.",
    tabFile: "Patrón usado en cada XxxCommand.java",
    tabTipTitle: "SackResourcePack también, con una copia local",
    tabTipBody:
      "Igual que con los colores: como es standalone, {cmd} trae su propio filtro de coincidencia de prefijo en vez de depender de {util}.",

    guiTitle: "GUIs: volver al navegador anterior",
    guiBody:
      "Todas las GUIs de inventario extienden {base}. Abrir una nueva ({open}) hace tres cosas: reconstruye el inventario ({build}), se registra como la GUI activa del jugador en {listener}, y se la muestra ({show}). Un editor que vuelve a su navegador (botón “Volver”) recibe un {runnable} en el constructor — casi siempre {reopen}.",
  },

  api: {
    title: "API para addons",
    intro: "Punto de entrada único: {get}. Superficie estable: paquete {pkg1} y {pkg2}.",

    setupTitle: "Configurar tu addon",
    s1: "Declará {depend} en tu {pluginYml}, para garantizar que RPGRoll cargue antes que tu addon.",
    s2: "Agregá RPGRoll como dependencia {compileOnly} (vía {gradle} desde el proyecto de RPGRoll, o referenciando el jar compilado directamente).",
    s3: "Llamá {get} únicamente desde {onEnable} en adelante — nunca desde el constructor de tu plugin ni desde inicializadores estáticos, porque RPGRoll podría no estar listo todavía.",

    methodsTitle: "Métodos disponibles",
    thMethod: "Método",
    thReturns: "Devuelve",
    rShortcut: "boolean — atajo sobre getPlayer().isCharacterComplete()",
    rPublicIface: "interfaz pública, módulo api",
    rVersion: "String — versión del plugin",
    concreteNote:
      "{classes} son clases concretas del módulo {core} (no tienen todavía una interfaz propia en {api}, a diferencia de {ifaces}). Tu addon va a necesitar depender del jar completo de RPGRoll para usarlas, no solo del módulo {api}.",

    eventsTitle: "Eventos",
    thEvent: "Evento",
    thCancellable: "Cancelable",
    thWhen: "Se dispara cuando…",
    yes: "Sí",
    no: "No",
    evCreated: "Un jugador termina la creación de personaje (raza + clase elegidas y guardadas).",
    evLevelUp: "Un jugador sube de nivel de personaje. Expone el {rpgPlayer} completo ya actualizado.",
    evJobLevelUp: "Un jugador sube de nivel en un trabajo específico.",
    evJoinJob: "Un jugador intenta unirse a un trabajo — un addon puede cancelarlo (ej. requisito extra que RPGRoll no conoce).",
    evLeaveJob: "Un jugador abandona un trabajo.",
    exampleFile: "MiListener.java — ejemplo cancelando un join a trabajo",

    noCoreTitle: "Addons que no dependen del core",
    noCoreBody:
      "Si tu addon solo necesita leer el personaje, no hace falta atarlo al core: declará {depend} y {soft} en tu {pluginYml}, compilá contra {common} y pedí los datos a RPGRoll-Lib. Si el core no está instalado, {get} devuelve vacío y tu addon sigue funcionando.",
    noCoreIface: "Lo que expone {iface} (todo por UUID; sin personaje devuelve valores neutros: 0, vacío o false):",
    rBonusService: "suma los bonos de EXP del jugador (ver abajo)",
    expTitle: "Bonos de experiencia",
    expBody:
      "{service} aplica un bono a la EXP de personaje que se gana jugando (mobs, recompensas de misiones, recetas); los comandos de admin no pasan por él. El bono es el mayor permiso {perm} del jugador —no se acumulan entre sí— más lo que registre cada addon. RPGRoll-Ascension, por ejemplo, registra el bono de prestigio. Un addon con el core puede sumar el suyo:",

    whereTitle: "Dónde viven estos archivos, físicamente",
    whereBody:
      "{apiTypes} y dos de los eventos ({apiEvents}) viven en el módulo {api}, sin ninguna dependencia de {core}. {facade} y los 3 eventos que exponen {rpgPlayer} viven físicamente en {core} (para poder usar sus clases concretas), pero conservan el paquete {pkg} para que el código de tu addon no note la diferencia. Más detalle en",
  },
};

export type DevelopersCopy = typeof es;

const en: DevelopersCopy = {
  architecture: {
    title: "Architecture",
    intro: "RPGRoll is split into Gradle modules with one simple rule: no circular dependencies.",

    modulesTitle: "The core modules",
    modulesLead:
      "The project was split from a single monolithic module into three independent Gradle modules, each with a clear responsibility (plus a fourth optional addon module, see below):",
    apiCard:
      "Public contract for addons: {types}, and the events that do not expose internal types. No dependencies — a pure leaf module.",
    commonCard:
      "Generic YAML content-loading framework ({managers}) and {loader}, plus menus, languages and commands. It only uses the Paper API, and ships as the RPGRoll-Lib plugin.",
    coreCard: "The full implementation: players, database, commands, GUIs, combat, jobs. Depends on {deps}.",

    graphTitle: "Dependency graph",
    graphNote: "(only so Race/PlayerClass can implement RPGContent)",
    graphNothing: "(nothing)",
    graphCallout:
      "The key to keeping this acyclic: the public facade {facade} and the 3 events that expose the concrete {rpgPlayer} ({events}) live physically in the {core} module, although they keep the {pkg} package for name compatibility. That way {api} stays 100% decoupled from {core}.",

    packagesTitle: "Package structure (inside core)",
    pkgCommand: "/rpg commands and their registration (CommandManager)",
    pkgConfig: "loading and copying the configuration YAMLs",
    pkgCore: "Bootstrap (startup) and ServiceRegistry (simple DI)",
    pkgDatabase: "SQLite connection and migration system",
    pkgGui: "inventory GUIs (character creation, jobs)",
    pkgPlayer: "RPGPlayer, PlayerManager, repository and cache",
    pkgIntegration: "VaultEconomyProvider",

    bootstrapTitle: "Startup (Bootstrap)",
    bootstrapBody:
      "{onEnable} delegates everything to {bootstrap}, which initialises the services in a fixed order (config → database → players → YAML content → economy → jobs → combat/HUD), registers them in a simple {registry} (a {map}), registers the subcommands, and finally registers the event listeners.",
    bootstrapWarn:
      "There is no real dependency-injection container — {get} throws {exception} if the service has not been registered yet. The order in {register} matters.",

    shadowTitle: "Packaging (Shadow)",
    shadowBody:
      "Only {file} applies the {shadow} plugin. The final jar ({jar}) bundles the classes from {modules} + the {driver} driver (with its native binaries for every platform), and relocates the sqlite-jdbc package to {relocated} to avoid clashes with other plugins that also bundle it. {common} is no longer inside: at runtime the RPGRoll-Lib plugin provides it.",
    shadowJar: "this is the one that goes into plugins/ (shadow jar, everything bundled)",
    shadowPlain: "core classes only, no dependencies (do not use directly)",

    addonsTitle: "Addon modules (e.g. npcs)",
    addonsBody1: "An addon like",
    addonsBody2:
      "is its own Gradle module (its own {build}, its own {pluginYml}, its own jar) that applies {addonConv} instead of {pluginConv} directly. That convention adds the Paper API + {compileApi} + {compileCommon} and embeds the licensing module in the jar — nothing from the core. An addon that needs classes living physically in {core} (such as {classes}) has to add {compileCore} itself: today only Ascension and Magic do. The rest read the character through RPGRoll-Lib (see the next section).",
    addonsTipTitle: "Every addon decides its own packaging",
    addonsTipBody:
      "{npcs} has its own {shadow} configured separately from {core}'s, because it needs to bundle and relocate its own external dependencies (OkHttp, in its case) without touching the plugin's main jar.",

    libTitle: "RPGRoll-Lib: the shared library",
    libBody:
      "{common} ships as a plugin of its own, {lib}: free, unlicensed, and in the {depend} of every module. Paper lets a plugin see the classes of the ones it declares in depend/softdepend, so at runtime the whole ecosystem uses the same copy — a single {listener} and a single registry of open menus.",
    libModules:
      "Thanks to that, modules no longer compile against the core. What they need from the character they read with {characters}, which is empty when the core is not installed; they take the economy from Vault with {vault}; and they listen to level-ups as {event}. Only Ascension and Magic, which work on the character itself (prestige, mana and combat stats), keep the core in depend.",
    libWithoutCore:
      "Without the core there are no characters. Each module decides what to do with its character requirements — Quests, Items and Fishing ignore them; Crafting and NPC conditions are not met — and character EXP is simply not granted. Everything else works the same.",
    libLicenseTitle: "Licensing does not live in the library",
    libLicenseBody:
      "{licensing} is embedded in every module's jar. If it lived in RPGRoll-Lib, which is free and ships separately, replacing that single jar with a modified one would unlock every module at once.",

    textTitle: "Colours and text formatting — ComponentUtils",
    textBody:
      "Every piece of text coming from a content YAML (item names, quest messages, mob dialogue, crate rewards, etc.) goes through {parse} before becoming an Adventure {component}. It is the single source of truth for this — no addon should instantiate its own loose {serializer}.",
    thFormat: "Format",
    thExample: "Example",
    thEngine: "Engine",
    fLegacy: "Classic legacy",
    fHexChar: "Per-character hex",
    fHexBungee: "BungeeCord-style hex",
    fMiniMessage: "MiniMessage / gradient",
    eMiniMessage: "MiniMessage (auto-detected by the presence of {tag})",
    exceptionsStrong: "Deliberate exceptions",
    exceptionsBody:
      ": {srp} (standalone, no dependency on {core}) has its own identical local copy in {engine}. The chat channel ({chat}) lets you pick {legacy} vs {mini} explicitly per channel in its YAML — {utils}'s auto-detection is not used there, because the choice is already explicit.",

    tabTitle: "Tab-completion — TabCompleteUtil",
    tabBody:
      "Every command in every addon (and {rpg} in core) implements {completer} on top of {executor}, and suggests from the matching real content manager instead of fixed text: enchantment, mob, quest, effect, species and profession ids, plus online player and world names where applicable. The shared filtering logic (case-insensitive prefix match) lives in {util}.",
    tabFile: "Pattern used in every XxxCommand.java",
    tabTipTitle: "SackResourcePack too, with a local copy",
    tabTipBody:
      "Same as with colours: being standalone, {cmd} carries its own prefix-match filter instead of depending on {util}.",

    guiTitle: "GUIs: going back to the previous browser",
    guiBody:
      "Every inventory GUI extends {base}. Opening a new one ({open}) does three things: rebuilds the inventory ({build}), registers itself as the player's active GUI in {listener}, and shows it ({show}). An editor that returns to its browser (a “Back” button) receives a {runnable} in the constructor — almost always {reopen}.",
  },

  api: {
    title: "Addon API",
    intro: "A single entry point: {get}. Stable surface: the {pkg1} and {pkg2} packages.",

    setupTitle: "Setting up your addon",
    s1: "Declare {depend} in your {pluginYml}, to guarantee RPGRoll loads before your addon.",
    s2: "Add RPGRoll as a {compileOnly} dependency (via {gradle} from the RPGRoll project, or by referencing the compiled jar directly).",
    s3: "Call {get} only from {onEnable} onwards — never from your plugin's constructor nor from static initialisers, because RPGRoll might not be ready yet.",

    methodsTitle: "Available methods",
    thMethod: "Method",
    thReturns: "Returns",
    rShortcut: "boolean — shortcut over getPlayer().isCharacterComplete()",
    rPublicIface: "public interface, api module",
    rVersion: "String — plugin version",
    concreteNote:
      "{classes} are concrete classes from the {core} module (they do not have their own interface in {api} yet, unlike {ifaces}). Your addon will need to depend on the full RPGRoll jar to use them, not just the {api} module.",

    eventsTitle: "Events",
    thEvent: "Event",
    thCancellable: "Cancellable",
    thWhen: "Fires when…",
    yes: "Yes",
    no: "No",
    evCreated: "A player finishes character creation (race + class chosen and saved).",
    evLevelUp: "A player levels up their character. Exposes the full, already-updated {rpgPlayer}.",
    evJobLevelUp: "A player levels up in a specific job.",
    evJoinJob: "A player tries to join a job — an addon can cancel it (e.g. an extra requirement RPGRoll knows nothing about).",
    evLeaveJob: "A player leaves a job.",
    exampleFile: "MyListener.java — example cancelling a job join",

    noCoreTitle: "Addons that do not depend on the core",
    noCoreBody:
      "If your addon only needs to read the character, there is no need to tie it to the core: declare {depend} and {soft} in your {pluginYml}, compile against {common} and ask RPGRoll-Lib for the data. When the core is not installed, {get} returns empty and your addon keeps working.",
    noCoreIface: "What {iface} exposes (all by UUID; without a character it returns neutral values: 0, empty or false):",
    rBonusService: "adds up the player's EXP bonuses (see below)",
    expTitle: "Experience bonuses",
    expBody:
      "{service} applies a bonus to the character EXP earned by playing (mobs, quest rewards, recipes); admin commands do not go through it. The bonus is the player's highest {perm} permission — they do not stack with each other — plus whatever each addon registers. RPGRoll-Ascension, for example, registers the prestige bonus. An addon with the core can add its own:",

    whereTitle: "Where these files live, physically",
    whereBody:
      "{apiTypes} and two of the events ({apiEvents}) live in the {api} module, with no dependency on {core}. {facade} and the 3 events that expose {rpgPlayer} live physically in {core} (so they can use its concrete classes), but keep the {pkg} package so your addon's code does not notice the difference. More detail in",
  },
};

const pt: DevelopersCopy = {
  architecture: {
    title: "Arquitetura",
    intro: "O RPGRoll está dividido em módulos Gradle com uma regra simples: sem dependências circulares.",

    modulesTitle: "Os módulos do núcleo",
    modulesLead:
      "O projeto passou de um único módulo monolítico para três módulos Gradle independentes, cada um com uma responsabilidade clara (mais um quarto módulo de addon opcional, veja abaixo):",
    apiCard:
      "Contrato público para addons: {types}, e os eventos que não expõem tipos internos. Sem dependências — módulo folha puro.",
    commonCard:
      "Framework genérico de carregamento de conteúdo YAML ({managers}) e {loader}, além de menus, idiomas e comandos. Usa só a API do Paper, e é distribuído como o plugin RPGRoll-Lib.",
    coreCard: "A implementação completa: jogadores, banco de dados, comandos, GUIs, combate, trabalhos. Depende de {deps}.",

    graphTitle: "Grafo de dependências",
    graphNote: "(só para que Race/PlayerClass implementem RPGContent)",
    graphNothing: "(nada)",
    graphCallout:
      "A chave para isto não ser circular: a fachada pública {facade} e os 3 eventos que expõem o {rpgPlayer} concreto ({events}) vivem fisicamente no módulo {core}, embora conservem o pacote {pkg} por compatibilidade de nomes. Assim o {api} fica 100% desacoplado do {core}.",

    packagesTitle: "Estrutura de pacotes (dentro de core)",
    pkgCommand: "comandos de /rpg e o seu registro (CommandManager)",
    pkgConfig: "carregamento e cópia dos YAMLs de configuração",
    pkgCore: "Bootstrap (inicialização) e ServiceRegistry (DI simples)",
    pkgDatabase: "conexão SQLite e sistema de migrações",
    pkgGui: "GUIs de inventário (criação de personagem, trabalhos)",
    pkgPlayer: "RPGPlayer, PlayerManager, repositório e cache",
    pkgIntegration: "VaultEconomyProvider",

    bootstrapTitle: "Inicialização (Bootstrap)",
    bootstrapBody:
      "{onEnable} delega tudo ao {bootstrap}, que inicializa os serviços numa ordem fixa (config → banco de dados → jogadores → conteúdo YAML → economia → trabalhos → combate/HUD), registra-os num {registry} simples (um {map}), registra os subcomandos, e por último registra os event listeners.",
    bootstrapWarn:
      "Não há um contêiner de injeção de dependências real — {get} lança {exception} se o serviço ainda não foi registrado. A ordem de {register} importa.",

    shadowTitle: "Empacotamento (Shadow)",
    shadowBody:
      "Só {file} aplica o plugin {shadow}. O jar final ({jar}) empacota as classes de {modules} + o driver {driver} (com os seus binários nativos para todas as plataformas), e realoca o pacote do sqlite-jdbc para {relocated} para evitar conflitos com outros plugins que também o empacotem. {common} não vai mais dentro: em runtime quem o fornece é o plugin RPGRoll-Lib.",
    shadowJar: "este é o que vai para plugins/ (shadow jar, tudo empacotado)",
    shadowPlain: "só as classes do core, sem dependências (não usar diretamente)",

    addonsTitle: "Módulos de addon (ex. npcs)",
    addonsBody1: "Um addon como",
    addonsBody2:
      "é o seu próprio módulo Gradle (próprio {build}, próprio {pluginYml}, próprio jar) que aplica {addonConv} em vez de {pluginConv} diretamente. Essa convenção adiciona Paper API + {compileApi} + {compileCommon} e embute o módulo de licenças no jar — nada do núcleo. Um addon que precise de classes que vivem fisicamente no {core} (como {classes}) tem de adicionar {compileCore} ele mesmo: hoje só Ascension e Magic fazem isso. Os demais leem o personagem através do RPGRoll-Lib (veja a seção seguinte).",
    addonsTipTitle: "Cada addon decide o seu próprio empacotamento",
    addonsTipBody:
      "{npcs} tem o seu próprio {shadow} configurado à parte do de {core}, porque precisa empacotar e realocar as suas próprias dependências externas (OkHttp, no caso) sem tocar no jar principal do plugin.",

    libTitle: "RPGRoll-Lib: a biblioteca compartilhada",
    libBody:
      "{common} é distribuído como um plugin próprio, {lib}: grátis, sem licença, e no {depend} de todos os módulos. O Paper deixa um plugin ver as classes dos que ele declara em depend/softdepend, então em runtime todo o ecossistema usa a mesma cópia — um só {listener} e um só registro de menus abertos.",
    libModules:
      "Graças a isso os módulos não compilam mais contra o núcleo. O que precisam do personagem eles leem com {characters}, que fica vazio se o núcleo não estiver; a economia vem do Vault com {vault}; e as subidas de nível eles escutam como {event}. Só Ascension e Magic, que trabalham sobre o próprio personagem (prestígio, mana e stats de combate), continuam com o núcleo em depend.",
    libWithoutCore:
      "Sem o núcleo não há personagens. Cada módulo decide o que fazer com os seus requisitos de personagem — Quests, Items e Fishing os ignoram; as condições de Crafting e NPCs não são cumpridas — e a EXP de personagem simplesmente não é entregue. Todo o resto funciona igual.",
    libLicenseTitle: "A licença não vive na biblioteca",
    libLicenseBody:
      "{licensing} vai embutido no jar de cada módulo. Se vivesse no RPGRoll-Lib, que é grátis e vai à parte, trocar esse único jar por um modificado liberaria todos os módulos de uma vez.",

    textTitle: "Cores e formatação de texto — ComponentUtils",
    textBody:
      "Todo texto que vem de um YAML de conteúdo (nomes de itens, mensagens de missão, diálogos de mob, recompensas de crate, etc.) passa por {parse} antes de virar um {component} do Adventure. É a única fonte de verdade para isso — nenhum addon deveria instanciar o seu próprio {serializer} solto.",
    thFormat: "Formato",
    thExample: "Exemplo",
    thEngine: "Motor",
    fLegacy: "Legacy clássico",
    fHexChar: "Hex por caractere",
    fHexBungee: "Hex estilo BungeeCord",
    fMiniMessage: "MiniMessage / gradient",
    eMiniMessage: "MiniMessage (autodetectado pela presença de {tag})",
    exceptionsStrong: "Exceções deliberadas",
    exceptionsBody:
      ": o {srp} (standalone, sem dependência de {core}) tem a sua própria cópia local idêntica em {engine}. O canal de chat ({chat}) deixa escolher {legacy} vs {mini} explicitamente por canal no seu YAML — ali não se usa a autodetecção do {utils}, porque a escolha já é explícita.",

    tabTitle: "Tab-completion — TabCompleteUtil",
    tabBody:
      "Todos os comandos de todos os addons (e o {rpg} no core) implementam {completer} além de {executor}, e sugerem a partir do gerenciador real de conteúdo correspondente em vez de texto fixo: ids de encantamentos, mobs, missões, efeitos, espécies, profissões, etc., mais nomes de jogadores e mundos online onde couber. A lógica de filtragem compartilhada (correspondência de prefixo, sem diferenciar maiúsculas) vive em {util}.",
    tabFile: "Padrão usado em cada XxxCommand.java",
    tabTipTitle: "SackResourcePack também, com uma cópia local",
    tabTipBody:
      "Igual ao caso das cores: por ser standalone, o {cmd} traz o seu próprio filtro de correspondência de prefixo em vez de depender do {util}.",

    guiTitle: "GUIs: voltar ao navegador anterior",
    guiBody:
      "Todas as GUIs de inventário estendem {base}. Abrir uma nova ({open}) faz três coisas: reconstrói o inventário ({build}), registra-se como a GUI ativa do jogador no {listener}, e a exibe ({show}). Um editor que volta ao seu navegador (botão “Voltar”) recebe um {runnable} no construtor — quase sempre {reopen}.",
  },

  api: {
    title: "API para addons",
    intro: "Ponto de entrada único: {get}. Superfície estável: pacotes {pkg1} e {pkg2}.",

    setupTitle: "Configurar o seu addon",
    s1: "Declare {depend} no seu {pluginYml}, para garantir que o RPGRoll carregue antes do seu addon.",
    s2: "Adicione o RPGRoll como dependência {compileOnly} (via {gradle} a partir do projeto do RPGRoll, ou referenciando o jar compilado diretamente).",
    s3: "Chame {get} somente a partir do {onEnable} — nunca do construtor do seu plugin nem de inicializadores estáticos, porque o RPGRoll pode ainda não estar pronto.",

    methodsTitle: "Métodos disponíveis",
    thMethod: "Método",
    thReturns: "Devolve",
    rShortcut: "boolean — atalho sobre getPlayer().isCharacterComplete()",
    rPublicIface: "interface pública, módulo api",
    rVersion: "String — versão do plugin",
    concreteNote:
      "{classes} são classes concretas do módulo {core} (ainda não têm uma interface própria em {api}, ao contrário de {ifaces}). O seu addon vai precisar depender do jar completo do RPGRoll para usá-las, não só do módulo {api}.",

    eventsTitle: "Eventos",
    thEvent: "Evento",
    thCancellable: "Cancelável",
    thWhen: "Dispara quando…",
    yes: "Sim",
    no: "Não",
    evCreated: "Um jogador termina a criação de personagem (raça + classe escolhidas e salvas).",
    evLevelUp: "Um jogador sobe de nível de personagem. Expõe o {rpgPlayer} completo já atualizado.",
    evJobLevelUp: "Um jogador sobe de nível num trabalho específico.",
    evJoinJob: "Um jogador tenta entrar num trabalho — um addon pode cancelar (ex. um requisito extra que o RPGRoll desconhece).",
    evLeaveJob: "Um jogador sai de um trabalho.",
    exampleFile: "MeuListener.java — exemplo cancelando a entrada num trabalho",

    noCoreTitle: "Addons que não dependem do núcleo",
    noCoreBody:
      "Se o seu addon só precisa ler o personagem, não é preciso amarrá-lo ao núcleo: declare {depend} e {soft} no seu {pluginYml}, compile contra {common} e peça os dados ao RPGRoll-Lib. Se o núcleo não estiver instalado, {get} devolve vazio e o seu addon continua funcionando.",
    noCoreIface: "O que {iface} expõe (tudo por UUID; sem personagem devolve valores neutros: 0, vazio ou false):",
    rBonusService: "soma os bônus de EXP do jogador (veja abaixo)",
    expTitle: "Bônus de experiência",
    expBody:
      "{service} aplica um bônus à EXP de personagem ganha jogando (mobs, recompensas de missões, receitas); os comandos de admin não passam por ele. O bônus é a maior permissão {perm} do jogador — não se acumulam entre si — mais o que cada addon registrar. O RPGRoll-Ascension, por exemplo, registra o bônus de prestígio. Um addon com o núcleo pode somar o seu:",

    whereTitle: "Onde estes arquivos vivem, fisicamente",
    whereBody:
      "{apiTypes} e dois dos eventos ({apiEvents}) vivem no módulo {api}, sem nenhuma dependência do {core}. {facade} e os 3 eventos que expõem o {rpgPlayer} vivem fisicamente no {core} (para poderem usar as suas classes concretas), mas conservam o pacote {pkg} para que o código do seu addon não note a diferença. Mais detalhe em",
  },
};

export const DEV_COPY: Record<Locale, DevelopersCopy> = { es, en, pt };
