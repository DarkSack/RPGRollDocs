import type { Locale } from "../../i18n";

/** Texto de la introducción. Ver copy/quickStart.ts para el patrón. */

const es = {
  title: "Un framework RPG completo para Paper/Minecraft",
  intro:
    "Razas, clases, atributos, salud y maná, habilidades, trabajos y progresión por niveles — con {n} addons oficiales que agregan desde mazmorras hasta una economía dinámica completa.",
  ctaConfigure: "Empezar a configurar",
  ctaArchitecture: "Ver arquitectura",

  statAddons: "Addons oficiales",
  statPersistence: "Persistencia",

  lead: "RPGRoll agrega una capa de rol completa sobre un servidor Paper vanilla: cada jugador tiene una raza, una clase, seis atributos al estilo D&D, un pool de salud y maná independiente de los corazones de Minecraft, habilidades con costo de maná y cooldown, trabajos con recompensas, y un sistema de progresión que desbloquea contenido automáticamente al subir de nivel. El núcleo vive en un solo plugin ({jar}); cada sistema adicional es un addon independiente que se instala aparte, y todos comparten {lib}, una librería gratuita.",

  audienceTitle: "¿Para quién es esta documentación?",
  adminsTitle: "Administradores de servidor",
  adminsBody:
    "Instalación, configuración de {file}, permisos, y cómo crear contenido nuevo (razas, clases, trabajos, habilidades) editando YAML.",
  devsTitle: "Desarrolladores de addons",
  devsBody: "La API pública ({api}), los eventos disponibles, y la arquitectura de módulos Gradle ({modules}).",

  addonsTitle: "Explorá los {n} addons oficiales",
  addonsLead:
    "Cada addon es un plugin separado que depende de la librería compartida ({depend}) y se instala dejando su propio jar en {dir}. Ninguno es obligatorio — instalá solo los que necesite tu servidor. Salvo Ascension y Magic, tampoco exigen el núcleo: sin él funcionan igual, solo que sin datos de personaje.",

  archTitle: "Arquitectura en breve",
  archBody:
    "El núcleo se organiza en tres módulos Gradle ({api} pública para addons, {common} utilidades compartidas, publicadas como el plugin RPGRoll-Lib, {core} la implementación real) y cada addon repite ese mismo patrón de soft-dependencia: comprueba con {check} antes de tocar cualquier clase de otro addon, así ninguno rompe si el otro no está instalado.",
  archCalloutTitle: "¿Cómo se conectan los addons entre sí?",
  archCalloutBody: "Casi todos exponen una API pública tipo singleton ({singleton}) más eventos de Bukkit propios — el patrón completo, con ejemplos reales, está en",

  quickTitle: "Instalación rápida",
  step1: "Descargá {lib} (la librería compartida) y {jar} (núcleo) y colocalos en {dir} de tu servidor Paper.",
  step2: "Reiniciá el servidor — el núcleo genera sus archivos de configuración y contenido de ejemplo la primera vez que arranca.",
  step3: "Editá {file} y el contenido en {dirs} a gusto (ver",
  step4: "Sumá los addons que quieras dejando su jar junto al del núcleo — cada uno agrega sus propios comandos y contenido de ejemplo al reiniciar.",
  quickComment: "...cualquier combinación de addons",

  stackTitle: "Stack técnico",
  stackGradle: "Java 25, Gradle multi-módulo ({modules})",
  stackPaper: "Paper API 26.1.1 (Bukkit/Spigot compatible)",
  stackDb: "SQLite embebido (sqlite-jdbc) con migraciones versionadas propias",
  stackVault: "Vault (softdepend) para recompensas en dinero de los trabajos",
  stackShadow: "Empaquetado con Shadow en un único jar desplegable por módulo",

  nextTitle: "¿Por dónde sigo?",
  nextAdmin: "Si administras un servidor, andá directo a",
  nextOr: "o",
  nextDev: "Si vas a programar contra RPGRoll, empezá por",
  nextThen: "y después",
};

export type HomeCopy = typeof es;

const en: HomeCopy = {
  title: "A complete RPG framework for Paper/Minecraft",
  intro:
    "Races, classes, attributes, health and mana, skills, jobs and level progression — with {n} official addons that add everything from dungeons to a full dynamic economy.",
  ctaConfigure: "Start configuring",
  ctaArchitecture: "See the architecture",

  statAddons: "Official addons",
  statPersistence: "Storage",

  lead: "RPGRoll adds a complete role-playing layer on top of a vanilla Paper server: every player has a race, a class, six D&D-style attributes, a health and mana pool independent from Minecraft hearts, skills with mana cost and cooldown, jobs with rewards, and a progression system that unlocks content automatically on level up. The core lives in a single plugin ({jar}); every additional system is a separate addon installed on its own, and they all share {lib}, a free library.",

  audienceTitle: "Who is this documentation for?",
  adminsTitle: "Server administrators",
  adminsBody:
    "Installation, configuring {file}, permissions, and how to create new content (races, classes, jobs, skills) by editing YAML.",
  devsTitle: "Addon developers",
  devsBody: "The public API ({api}), the available events, and the Gradle module architecture ({modules}).",

  addonsTitle: "Explore the {n} official addons",
  addonsLead:
    "Each addon is a separate plugin that depends on the shared library ({depend}) and installs by dropping its own jar into {dir}. None of them are mandatory — install only what your server needs. Except for Ascension and Magic, they do not require the core either: without it they work the same, just without character data.",

  archTitle: "Architecture at a glance",
  archBody:
    "The core is split into three Gradle modules ({api} the public one for addons, {common} shared utilities, shipped as the RPGRoll-Lib plugin, {core} the actual implementation) and every addon repeats the same soft-dependency pattern: it checks with {check} before touching any class from another addon, so nothing breaks when the other one is not installed.",
  archCalloutTitle: "How do addons talk to each other?",
  archCalloutBody: "Almost all of them expose a singleton-style public API ({singleton}) plus their own Bukkit events — the full pattern, with real examples, is in",

  quickTitle: "Quick install",
  step1: "Download {lib} (the shared library) and {jar} (the core) and drop them into {dir} on your Paper server.",
  step2: "Restart the server — the core generates its configuration files and example content the first time it boots.",
  step3: "Edit {file} and the content in {dirs} to taste (see",
  step4: "Add whatever addons you want by dropping their jars next to the core — each one adds its own commands and example content on restart.",
  quickComment: "...any combination of addons",

  stackTitle: "Technical stack",
  stackGradle: "Java 25, multi-module Gradle ({modules})",
  stackPaper: "Paper API 26.1.1 (Bukkit/Spigot compatible)",
  stackDb: "Embedded SQLite (sqlite-jdbc) with its own versioned migrations",
  stackVault: "Vault (softdepend) for job money rewards",
  stackShadow: "Packaged with Shadow into a single deployable jar per module",

  nextTitle: "Where do I go next?",
  nextAdmin: "If you run a server, go straight to",
  nextOr: "or",
  nextDev: "If you are going to write code against RPGRoll, start with",
  nextThen: "and then",
};

const pt: HomeCopy = {
  title: "Um framework RPG completo para Paper/Minecraft",
  intro:
    "Raças, classes, atributos, vida e mana, habilidades, trabalhos e progressão por níveis — com {n} addons oficiais que adicionam de masmorras a uma economia dinâmica completa.",
  ctaConfigure: "Começar a configurar",
  ctaArchitecture: "Ver a arquitetura",

  statAddons: "Addons oficiais",
  statPersistence: "Persistência",

  lead: "O RPGRoll adiciona uma camada de RPG completa sobre um servidor Paper vanilla: cada jogador tem uma raça, uma classe, seis atributos no estilo D&D, um pool de vida e mana independente dos corações do Minecraft, habilidades com custo de mana e cooldown, trabalhos com recompensas, e um sistema de progressão que desbloqueia conteúdo automaticamente ao subir de nível. O núcleo vive num único plugin ({jar}); cada sistema adicional é um addon independente instalado à parte, e todos compartilham {lib}, uma biblioteca gratuita.",

  audienceTitle: "Para quem é esta documentação?",
  adminsTitle: "Administradores de servidor",
  adminsBody:
    "Instalação, configuração de {file}, permissões, e como criar conteúdo novo (raças, classes, trabalhos, habilidades) editando YAML.",
  devsTitle: "Desenvolvedores de addons",
  devsBody: "A API pública ({api}), os eventos disponíveis, e a arquitetura de módulos Gradle ({modules}).",

  addonsTitle: "Explore os {n} addons oficiais",
  addonsLead:
    "Cada addon é um plugin separado que depende da biblioteca compartilhada ({depend}) e se instala colocando o seu próprio jar em {dir}. Nenhum é obrigatório — instale só o que o seu servidor precisa. Tirando Ascension e Magic, também não exigem o núcleo: sem ele funcionam igual, só que sem dados de personagem.",

  archTitle: "Arquitetura em resumo",
  archBody:
    "O núcleo se organiza em três módulos Gradle ({api} pública para addons, {common} utilitários compartilhados, publicados como o plugin RPGRoll-Lib, {core} a implementação real) e cada addon repete o mesmo padrão de soft-dependency: verifica com {check} antes de tocar qualquer classe de outro addon, então nada quebra se o outro não estiver instalado.",
  archCalloutTitle: "Como os addons se conectam entre si?",
  archCalloutBody: "Quase todos expõem uma API pública tipo singleton ({singleton}) mais eventos próprios do Bukkit — o padrão completo, com exemplos reais, está em",

  quickTitle: "Instalação rápida",
  step1: "Baixe {lib} (a biblioteca compartilhada) e {jar} (o núcleo) e coloque-os em {dir} do seu servidor Paper.",
  step2: "Reinicie o servidor — o núcleo gera os seus arquivos de configuração e o conteúdo de exemplo na primeira vez que inicia.",
  step3: "Edite {file} e o conteúdo em {dirs} como preferir (veja",
  step4: "Some os addons que quiser colocando o jar de cada um junto ao do núcleo — cada um adiciona os seus próprios comandos e conteúdo de exemplo ao reiniciar.",
  quickComment: "...qualquer combinação de addons",

  stackTitle: "Stack técnica",
  stackGradle: "Java 25, Gradle multi-módulo ({modules})",
  stackPaper: "Paper API 26.1.1 (compatível com Bukkit/Spigot)",
  stackDb: "SQLite embutido (sqlite-jdbc) com migrações versionadas próprias",
  stackVault: "Vault (softdepend) para recompensas em dinheiro dos trabalhos",
  stackShadow: "Empacotado com Shadow num único jar por módulo",

  nextTitle: "Por onde eu sigo?",
  nextAdmin: "Se você administra um servidor, vá direto para",
  nextOr: "ou",
  nextDev: "Se você vai programar com o RPGRoll, comece por",
  nextThen: "e depois",
};

export const HOME_COPY: Record<Locale, HomeCopy> = { es, en, pt };
