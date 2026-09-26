import type { Locale } from "../../i18n";

/**
 * Texto de la página "Primeros pasos", por idioma.
 *
 * Patrón para traducir contenido: el componente queda con la estructura
 * (tablas, bloques de código, callouts) y todo el texto sale de acá. Se
 * traduce prosa, no marcado — los identificadores que aparecen en medio de
 * una oración (`/rpg create`, `plugins/`, nombres de archivo) quedan fuera
 * del diccionario porque no se traducen y romperían el string si se mezclaran.
 *
 * Igual que con el chrome (ver i18n/strings.ts), `es` es la fuente de verdad
 * y el tipo se deriva de ella: agregar una clave rompe el typecheck hasta
 * completarla en en/pt.
 */

const es = {
  title: "Primeros pasos",
  intro: "De un servidor Paper vacío a un personaje con raza, clase y atributos. Seguilo en orden la primera vez.",
  metaSteps: "Pasos",

  s1: {
    title: "Confirmá los requisitos",
    lead: "Antes de copiar nada, verificá que el servidor cumpla con esto:",
    thComponent: "Componente",
    thNeed: "Necesitás",
    thCheck: "Cómo lo verificás",
    server: "Servidor",
    inConsole: "en la consola",
    java: "Java",
    database: "Base de datos",
    embedded: "Embebida — no hay que instalar nada",
    optionalNote: "Vault y PlaceholderAPI son opcionales: nada del núcleo los exige. El detalle completo está en",
  },

  s2: {
    title: "Instalá el núcleo",
    lead1: "Todo el ecosistema se instala dejando jars en",
    lead2: "Para empezar alcanzan dos: RPGRoll-Lib, la librería compartida que necesitan todos los módulos (gratis), y el núcleo. Los addons vienen después, y ninguno es necesario para arrancar.",
    libComment: "la librería compartida — la piden todos los módulos",
    comment: "el núcleo — con esto alcanza por ahora",
    calloutTitle: "Empezá solo con el núcleo",
    calloutBody:
      "Es tentador copiar los 24 addons de una. No lo hagas en la primera vuelta: si algo falla, con un solo jar sabés exactamente dónde mirar. Los addons se suman en el paso 06.",
  },

  s3: {
    title: "Arrancá el servidor y verificá",
    lead: "Iniciá el servidor como lo hacés siempre. En el primer arranque el núcleo crea sus archivos de configuración y el contenido de ejemplo (razas, clases y trabajos), así que no hay nada que configurar para que cargue.",
    checksLead: "Para confirmar que quedó activo, dos comprobaciones:",
    thCheck: "Comprobación",
    thExpect: "Qué deberías ver",
    pluginsRow: "en la lista, en verde. Si aparece en rojo, no cargó.",
    helpRow: "La ayuda con los comandos que tu rango tiene permiso de ver.",
    calloutTitle: "Si no cargó",
    calloutBody:
      "La consola del arranque nombra la causa — casi siempre una dependencia o la versión de Java. Los síntomas más frecuentes, con su causa y solución, están en",
  },

  s4: {
    title: "Ajustá la configuración",
    lead: "El núcleo genera tres archivos. Para una primera puesta en marcha solo vas a tocar el tercero, y solo si querés cambiar los valores por defecto:",
    thFile: "Archivo",
    thControls: "Qué controla",
    configRow: "Idioma de los mensajes y modo debug.",
    databaseRow: "Conexión a la base de datos. El valor por defecto ya funciona.",
    gameplayRow: "El archivo grande: experiencia, atributos, razas, clases, habilidades, trabajos y combate.",
    keysLead: "Las cuatro claves que más se cambian al empezar:",
    cBaseExp: "XP de la primera subida de nivel",
    cMaxLevel: "techo de nivel",
    cBaseValue: "valor inicial de cada atributo",
    cMaxValue: "techo por atributo",
    reload1: "Después de editar cualquier YAML, aplicá los cambios sin reiniciar con",
    reload2: "La referencia completa de cada clave, con tipo y valor por defecto, está en",
  },

  s5: {
    title: "Creá tu primer personaje",
    lead: "Entrá al servidor como jugador. Este es el recorrido mínimo para comprobar que el ciclo completo funciona de punta a punta:",
    thCommand: "Comando",
    thDoes: "Qué hace",
    create: "Abre la creación de personaje: elegís raza y clase.",
    stats: "Tus seis atributos al estilo D&D.",
    mystats: "Vista detallada: puntos sin gastar, salud y maná, armadura, evasión y crítico.",
    skills: "Habilidades aprendidas, con su costo de maná y cooldown.",
    adminLead1: "Para ver la progresión sin tener que farmear, usá los comandos de administrador —",
    adminLead2: "sube experiencia y",
    adminLead3:
      "fuerza un intento de subida sobre vos mismo, que es la forma rápida de probar las recompensas de nivel. Con puntos disponibles, gastalos con",
    calloutTitle: "Si llegaste hasta acá, está funcionando",
    calloutBody:
      "Tenés un personaje con raza, clase, atributos asignables y un pool de salud y maná independiente de los corazones de Minecraft. El resto es contenido y addons.",
  },

  s6: {
    title: "Próximos pasos",
    lead: "Según lo que quieras hacer ahora:",
    thWant: "Si querés…",
    thGo: "Andá a",
    content: "Crear razas, clases, trabajos o habilidades propias",
    contentGo: "o el editor con GUI,",
    addons: "Sumar addons (mazmorras, economía, misiones…)",
    addonsGo: "qué depende de qué antes de copiar jars",
    perms: "Repartir permisos entre rangos",
    placeholders: "Mostrar datos del jugador en otros plugins",
    dev: "Programar contra RPGRoll",
    devAnd: "y",
  },
};

export type QuickStartCopy = typeof es;

const en: QuickStartCopy = {
  title: "Quick start",
  intro: "From an empty Paper server to a character with a race, a class and attributes. Follow it in order the first time.",
  metaSteps: "Steps",

  s1: {
    title: "Confirm the requirements",
    lead: "Before copying anything, check that your server meets this:",
    thComponent: "Component",
    thNeed: "You need",
    thCheck: "How to check it",
    server: "Server",
    inConsole: "in the console",
    java: "Java",
    database: "Database",
    embedded: "Embedded — nothing to install",
    optionalNote:
      "Vault and PlaceholderAPI are optional: nothing in the core requires them. The full detail is in",
  },

  s2: {
    title: "Install the core",
    lead1: "The whole ecosystem installs by dropping jars into",
    lead2: "Two are enough to start: RPGRoll-Lib, the shared library every module needs (free), and the core. Addons come later, and none of them are needed to start.",
    libComment: "the shared library — every module asks for it",
    comment: "the core — this is all you need for now",
    calloutTitle: "Start with the core alone",
    calloutBody:
      "It is tempting to copy all 24 addons at once. Don't, on the first pass: with a single jar, if something fails you know exactly where to look. Addons come in step 06.",
  },

  s3: {
    title: "Start the server and verify",
    lead: "Start the server the way you always do. On first boot the core creates its configuration files and the example content (races, classes and jobs), so there is nothing to configure for it to load.",
    checksLead: "Two checks to confirm it came up:",
    thCheck: "Check",
    thExpect: "What you should see",
    pluginsRow: "in the list, in green. If it shows red, it did not load.",
    helpRow: "The help listing the commands your rank is allowed to see.",
    calloutTitle: "If it did not load",
    calloutBody:
      "The startup console names the cause — almost always a dependency or the Java version. The most frequent symptoms, with cause and fix, are in",
  },

  s4: {
    title: "Adjust the configuration",
    lead: "The core generates three files. For a first run you will only touch the third one, and only if you want to change the defaults:",
    thFile: "File",
    thControls: "What it controls",
    configRow: "Message language and debug mode.",
    databaseRow: "Database connection. The default already works.",
    gameplayRow: "The big one: experience, attributes, races, classes, skills, jobs and combat.",
    keysLead: "The four keys most often changed at the start:",
    cBaseExp: "XP for the first level up",
    cMaxLevel: "level cap",
    cBaseValue: "starting value of each attribute",
    cMaxValue: "cap per attribute",
    reload1: "After editing any YAML, apply the changes without restarting using",
    reload2: "The full reference for every key, with type and default, is in",
  },

  s5: {
    title: "Create your first character",
    lead: "Join the server as a player. This is the minimum path to confirm the whole loop works end to end:",
    thCommand: "Command",
    thDoes: "What it does",
    create: "Opens character creation: you pick a race and a class.",
    stats: "Your six D&D-style attributes.",
    mystats: "Detailed view: unspent points, health and mana, armor, evasion and crit.",
    skills: "Learned skills, with their mana cost and cooldown.",
    adminLead1: "To see progression without grinding, use the admin commands —",
    adminLead2: "grants experience and",
    adminLead3:
      "forces a level-up attempt on yourself, which is the quick way to test level rewards. Once you have points, spend them with",
    calloutTitle: "If you got this far, it works",
    calloutBody:
      "You have a character with a race, a class, assignable attributes and a health and mana pool independent from Minecraft hearts. The rest is content and addons.",
  },

  s6: {
    title: "Next steps",
    lead: "Depending on what you want to do now:",
    thWant: "If you want to…",
    thGo: "Go to",
    content: "Create your own races, classes, jobs or skills",
    contentGo: "or the GUI editor,",
    addons: "Add addons (dungeons, economy, quests…)",
    addonsGo: "what depends on what, before copying jars",
    perms: "Split permissions across ranks",
    placeholders: "Show player data in other plugins",
    dev: "Write code against RPGRoll",
    devAnd: "and",
  },
};

const pt: QuickStartCopy = {
  title: "Primeiros passos",
  intro: "De um servidor Paper vazio a um personagem com raça, classe e atributos. Siga na ordem da primeira vez.",
  metaSteps: "Passos",

  s1: {
    title: "Confirme os requisitos",
    lead: "Antes de copiar qualquer coisa, verifique se o servidor atende a isto:",
    thComponent: "Componente",
    thNeed: "Você precisa de",
    thCheck: "Como verificar",
    server: "Servidor",
    inConsole: "no console",
    java: "Java",
    database: "Banco de dados",
    embedded: "Embutido — nada a instalar",
    optionalNote: "Vault e PlaceholderAPI são opcionais: nada do núcleo os exige. O detalhe completo está em",
  },

  s2: {
    title: "Instale o núcleo",
    lead1: "Todo o ecossistema se instala colocando jars em",
    lead2: "Para começar bastam dois: o RPGRoll-Lib, a biblioteca compartilhada que todos os módulos precisam (grátis), e o núcleo. Os addons vêm depois, e nenhum é necessário para iniciar.",
    libComment: "a biblioteca compartilhada — todos os módulos a pedem",
    comment: "o núcleo — isto é tudo o que você precisa por agora",
    calloutTitle: "Comece só com o núcleo",
    calloutBody:
      "É tentador copiar os 24 addons de uma vez. Não faça isso na primeira volta: com um único jar, se algo falhar você sabe exatamente onde olhar. Os addons entram no passo 06.",
  },

  s3: {
    title: "Inicie o servidor e verifique",
    lead: "Inicie o servidor como você sempre faz. Na primeira inicialização o núcleo cria seus arquivos de configuração e o conteúdo de exemplo (raças, classes e trabalhos), então não há nada a configurar para que ele carregue.",
    checksLead: "Duas verificações para confirmar que subiu:",
    thCheck: "Verificação",
    thExpect: "O que você deve ver",
    pluginsRow: "na lista, em verde. Se aparecer em vermelho, não carregou.",
    helpRow: "A ajuda com os comandos que o seu rank tem permissão de ver.",
    calloutTitle: "Se não carregou",
    calloutBody:
      "O console da inicialização nomeia a causa — quase sempre uma dependência ou a versão do Java. Os sintomas mais frequentes, com causa e solução, estão em",
  },

  s4: {
    title: "Ajuste a configuração",
    lead: "O núcleo gera três arquivos. Para uma primeira execução você só vai mexer no terceiro, e só se quiser mudar os valores padrão:",
    thFile: "Arquivo",
    thControls: "O que controla",
    configRow: "Idioma das mensagens e modo debug.",
    databaseRow: "Conexão com o banco de dados. O padrão já funciona.",
    gameplayRow: "O arquivo grande: experiência, atributos, raças, classes, habilidades, trabalhos e combate.",
    keysLead: "As quatro chaves mais alteradas no começo:",
    cBaseExp: "XP da primeira subida de nível",
    cMaxLevel: "teto de nível",
    cBaseValue: "valor inicial de cada atributo",
    cMaxValue: "teto por atributo",
    reload1: "Depois de editar qualquer YAML, aplique as mudanças sem reiniciar com",
    reload2: "A referência completa de cada chave, com tipo e valor padrão, está em",
  },

  s5: {
    title: "Crie seu primeiro personagem",
    lead: "Entre no servidor como jogador. Este é o caminho mínimo para confirmar que o ciclo completo funciona de ponta a ponta:",
    thCommand: "Comando",
    thDoes: "O que faz",
    create: "Abre a criação de personagem: você escolhe raça e classe.",
    stats: "Seus seis atributos no estilo D&D.",
    mystats: "Visão detalhada: pontos não gastos, vida e mana, armadura, evasão e crítico.",
    skills: "Habilidades aprendidas, com custo de mana e cooldown.",
    adminLead1: "Para ver a progressão sem farmar, use os comandos de administrador —",
    adminLead2: "dá experiência e",
    adminLead3:
      "força uma tentativa de subida de nível em você mesmo, que é a forma rápida de testar as recompensas de nível. Com pontos disponíveis, gaste-os com",
    calloutTitle: "Se você chegou até aqui, está funcionando",
    calloutBody:
      "Você tem um personagem com raça, classe, atributos atribuíveis e um pool de vida e mana independente dos corações do Minecraft. O resto é conteúdo e addons.",
  },

  s6: {
    title: "Próximos passos",
    lead: "Conforme o que você quiser fazer agora:",
    thWant: "Se você quer…",
    thGo: "Vá para",
    content: "Criar suas próprias raças, classes, trabalhos ou habilidades",
    contentGo: "ou o editor com GUI,",
    addons: "Somar addons (masmorras, economia, missões…)",
    addonsGo: "o que depende do quê, antes de copiar jars",
    perms: "Distribuir permissões entre ranks",
    placeholders: "Mostrar dados do jogador em outros plugins",
    dev: "Programar com RPGRoll",
    devAnd: "e",
  },
};

export const QUICK_START_COPY: Record<Locale, QuickStartCopy> = { es, en, pt };
