import type { Locale } from "../../i18n";

const es = {
  title: "Requisitos",
  intro: "Lo que necesita un servidor para correr el núcleo y los addons, y qué es obligatorio contra qué es opcional.",

  coreTitle: "Núcleo",
  coreLead: "Estos son los requisitos de {jar}, el núcleo. Cada addon agrega los suyos, siempre sobre esta base.",
  thComponent: "Componente",
  thVersion: "Versión",
  thType: "Tipo",
  thWhat: "Para qué",

  detailPaper: "Compatible con Bukkit/Spigot",
  detailSqlite: "Embebido, sin servidor externo",
  detailVault: "Recompensas en dinero de los trabajos",
  detailPapi: "Placeholders expuestos por varios addons",

  mcTitle: "Sobre la versión de Minecraft",
  mcBody:
    "El proyecto fija la versión de la {paperApi} ({version}), no una versión de Minecraft concreta: la determina el build de Paper contra el que compiles y corras el servidor. Esta documentación no afirma compatibilidad con ninguna otra plataforma que no esté verificada en el repo.",

  platformTitle: "Plataforma",
  platformBody:
    "El destino verificado es {paper}. La API usada es compatible con Bukkit/Spigot, pero lo que el proyecto compila y documenta es Paper —incluidas piezas que dependen de Paper/Adventure, como el motor de texto y el TAB nativo—, así que es la plataforma sobre la que conviene desplegar.",

  installTitle: "Qué se instala",
  installLead:
    "Todo se instala dejando jars en {dir}. {lib} es obligatorio para todos los módulos: es la librería compartida, gratis y sin licencia. El núcleo aporta los personajes y solo es obligatorio para Ascension y Magic; el resto de addons funciona con o sin él. Cada addon es independiente y opcional.",
  cLib: "librería compartida — obligatoria",
  cCore: "núcleo — personajes; obligatorio para Ascension y Magic",
  cAddons: "addons — cualquier combinación",
  cProtocol: "opcional, solo lo aprovecha RPGRoll-TAB",
  cOptional: "opcional",
  installAfter: "En el primer arranque el núcleo genera su configuración y contenido de ejemplo. El detalle de cada archivo está en",

  hardTitle: "Dependencias duras de terceros",
  hardLead:
    "Casi todas las dependencias de terceros son {soft}: si el plugin no está, el addon carga igual y solo se apaga la función puntual. Las únicas excepciones —addons que directamente no cargan sin un plugin de terceros— son estas:",
  thAddon: "Addon",
  thRequires: "Requiere",
  hardNone:
    "Hoy ninguna: ningún addon exige un plugin de terceros para cargar. RPGRoll-NPCs pedía ProtocolLib; desde que sus NPCs son Mannequins nativos del servidor, ya no.",
  hardAfter: "El grafo completo —qué addon depende de qué otro addon, y con qué fuerza— está en",

  storageTitle: "Persistencia",
  storageBody:
    "SQLite embebido vía {driver}, con migraciones versionadas propias. No hace falta levantar ningún servidor de base de datos aparte. El esquema y el sistema de migraciones están en",
};

export type RequirementsCopy = typeof es;

const en: RequirementsCopy = {
  title: "Requirements",
  intro: "What a server needs to run the core and the addons, and what is mandatory versus optional.",

  coreTitle: "Core",
  coreLead: "These are the requirements of {jar}, the core. Every addon adds its own, always on top of this base.",
  thComponent: "Component",
  thVersion: "Version",
  thType: "Type",
  thWhat: "What for",

  detailPaper: "Bukkit/Spigot compatible",
  detailSqlite: "Embedded, no external server",
  detailVault: "Money rewards for jobs",
  detailPapi: "Placeholders exposed by several addons",

  mcTitle: "About the Minecraft version",
  mcBody:
    "The project pins the {paperApi} version ({version}), not a specific Minecraft version: that is decided by the Paper build you compile and run the server against. This documentation does not claim compatibility with any platform that is not verified in the repo.",

  platformTitle: "Platform",
  platformBody:
    "The verified target is {paper}. The API in use is Bukkit/Spigot compatible, but what the project compiles and documents is Paper — including pieces that depend on Paper/Adventure, such as the text engine and the native TAB — so that is the platform to deploy on.",

  installTitle: "What gets installed",
  installLead:
    "Everything installs by dropping jars into {dir}. {lib} is mandatory for every module: it is the shared library, free and unlicensed. The core provides characters and is only mandatory for Ascension and Magic; the other addons work with or without it. Every addon is independent and optional.",
  cLib: "shared library — mandatory",
  cCore: "core — characters; mandatory for Ascension and Magic",
  cAddons: "addons — any combination",
  cProtocol: "optional, only RPGRoll-TAB uses it",
  cOptional: "optional",
  installAfter: "On first boot the core generates its configuration and example content. The detail of every file is in",

  hardTitle: "Hard third-party dependencies",
  hardLead:
    "Almost every third-party dependency is {soft}: if the plugin is missing, the addon still loads and only that specific feature turns off. The only exceptions — addons that simply will not load without a third-party plugin — are these:",
  thAddon: "Addon",
  thRequires: "Requires",
  hardNone:
    "None today: no addon needs a third-party plugin to load. RPGRoll-NPCs used to require ProtocolLib; since its NPCs became native server Mannequins, it no longer does.",
  hardAfter: "The full graph — which addon depends on which, and how strongly — is in",

  storageTitle: "Storage",
  storageBody:
    "Embedded SQLite via {driver}, with its own versioned migrations. There is no separate database server to run. The schema and the migration system are in",
};

const pt: RequirementsCopy = {
  title: "Requisitos",
  intro: "O que um servidor precisa para rodar o núcleo e os addons, e o que é obrigatório versus opcional.",

  coreTitle: "Núcleo",
  coreLead: "Estes são os requisitos de {jar}, o núcleo. Cada addon adiciona os seus, sempre sobre esta base.",
  thComponent: "Componente",
  thVersion: "Versão",
  thType: "Tipo",
  thWhat: "Para quê",

  detailPaper: "Compatível com Bukkit/Spigot",
  detailSqlite: "Embutido, sem servidor externo",
  detailVault: "Recompensas em dinheiro dos trabalhos",
  detailPapi: "Placeholders expostos por vários addons",

  mcTitle: "Sobre a versão do Minecraft",
  mcBody:
    "O projeto fixa a versão da {paperApi} ({version}), não uma versão de Minecraft específica: quem a determina é o build do Paper contra o qual você compila e roda o servidor. Esta documentação não afirma compatibilidade com nenhuma plataforma que não esteja verificada no repositório.",

  platformTitle: "Plataforma",
  platformBody:
    "O destino verificado é {paper}. A API usada é compatível com Bukkit/Spigot, mas o que o projeto compila e documenta é Paper — incluindo peças que dependem de Paper/Adventure, como o motor de texto e o TAB nativo —, então é a plataforma onde convém implantar.",

  installTitle: "O que se instala",
  installLead:
    "Tudo se instala colocando jars em {dir}. {lib} é obrigatório para todos os módulos: é a biblioteca compartilhada, grátis e sem licença. O núcleo fornece os personagens e só é obrigatório para Ascension e Magic; os demais addons funcionam com ou sem ele. Cada addon é independente e opcional.",
  cLib: "biblioteca compartilhada — obrigatória",
  cCore: "núcleo — personagens; obrigatório para Ascension e Magic",
  cAddons: "addons — qualquer combinação",
  cProtocol: "opcional, só o RPGRoll-TAB o usa",
  cOptional: "opcional",
  installAfter: "Na primeira inicialização o núcleo gera a sua configuração e o conteúdo de exemplo. O detalhe de cada arquivo está em",

  hardTitle: "Dependências duras de terceiros",
  hardLead:
    "Quase todas as dependências de terceiros são {soft}: se o plugin não estiver, o addon carrega mesmo assim e só a função específica é desligada. As únicas exceções — addons que simplesmente não carregam sem um plugin de terceiros — são estas:",
  thAddon: "Addon",
  thRequires: "Requer",
  hardNone:
    "Nenhuma hoje: nenhum addon exige um plugin de terceiros para carregar. O RPGRoll-NPCs pedia o ProtocolLib; desde que os seus NPCs viraram Mannequins nativos do servidor, não pede mais.",
  hardAfter: "O grafo completo — qual addon depende de qual, e com que força — está em",

  storageTitle: "Persistência",
  storageBody:
    "SQLite embutido via {driver}, com migrações versionadas próprias. Não é preciso subir nenhum servidor de banco de dados à parte. O esquema e o sistema de migrações estão em",
};

export const REQUIREMENTS_COPY: Record<Locale, RequirementsCopy> = { es, en, pt };
