/**
 * Diccionarios del chrome (navegación, palette, HUD, pie de página).
 *
 * Alcance deliberado: acá vive la *interfaz*, no el contenido. El cuerpo de
 * las páginas bajo src/pages sigue estando en español; cuando el usuario
 * elige EN o PT, el layout muestra un aviso honesto (`page.untranslated`) en
 * vez de fingir una traducción que no existe.
 *
 * `es` es la fuente de verdad: el tipo `Strings` se deriva de ella, así que
 * agregar una clave nueva rompe el typecheck hasta completarla en en/pt.
 */

export const LOCALES = ["es", "en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_META: Record<Locale, { label: string; native: string; short: string }> = {
  es: { label: "Español", native: "Español", short: "ES" },
  en: { label: "English", native: "English", short: "EN" },
  pt: { label: "Português", native: "Português", short: "PT" },
};

const es = {
  brand: {
    docs: "Docs",
    tagline: "Consola de documentación",
  },
  nav: {
    skipToContent: "Saltar al contenido",
    main: "Navegación principal",
    openMenu: "Abrir navegación",
    closeMenu: "Cerrar navegación",
    filter: "Filtrar navegación…",
    noMatches: "Sin coincidencias",
    breadcrumb: "Ruta de navegación",
    pagination: "Páginas anterior y siguiente",
  },
  search: {
    trigger: "Buscar en la documentación…",
    triggerShort: "Buscar…",
    placeholder: "Buscar páginas, comandos, permisos, configuración…",
    label: "Buscar en la documentación",
    empty: "Escribí para buscar, o elegí una acción de abajo.",
    noResults: "Sin resultados para",
    hintNavigate: "navegar",
    hintOpen: "abrir",
    hintClose: "cerrar",
    resultCount: (n: number) => `${n} resultado${n === 1 ? "" : "s"}`,
    groups: {
      action: "Acciones",
      page: "Páginas",
      section: "Secciones",
      command: "Comandos",
      permission: "Permisos",
      config: "Configuración",
    },
    kinds: {
      action: "ACCIÓN",
      page: "PÁGINA",
      section: "SECCIÓN",
      command: "COMANDO",
      permission: "PERMISO",
      config: "CONFIG",
    },
  },
  actions: {
    openGithub: "Abrir el repositorio en GitHub",
    toggleTheme: "Cambiar tema",
    themeToLight: "Cambiar a tema claro",
    themeToDark: "Cambiar a tema oscuro",
    language: "Idioma",
    version: "Versión",
    copy: "Copiar",
    copied: "Copiado",
    copyAria: "Copiar al portapapeles",
  },
  toc: {
    title: "En esta página",
    label: "Índice de la página",
    top: "Volver arriba",
  },
  page: {
    prev: "Anterior",
    next: "Siguiente",
    untranslated:
      "El contenido de esta página todavía está en español. La interfaz ya está traducida; las páginas se irán traduciendo progresivamente.",
    editOnGithub: "Editar esta página",
    reportIssue: "Reportar un problema",
    lastUpdated: "Última revisión",
  },
  feedback: {
    question: "¿Te sirvió esta página?",
    yes: "Sí",
    no: "No",
    thanks: "Gracias por avisar.",
    followUpNo: "¿Qué faltaba? Abrí un issue y lo agregamos.",
    followUpYes: "Nos sirve para saber qué mantener.",
    openIssue: "Abrir un issue",
  },
  meta: {
    system: "Sistema",
    version: "Versión",
    status: "Estado",
    platform: "Plataforma",
    java: "Java",
    storage: "Persistencia",
    dependencies: "Dependencias",
    required: "Requerido",
    optional: "Opcional",
  },
  status: {
    stable: "Estable",
    beta: "Beta",
    experimental: "Experimental",
    deprecated: "Obsoleto",
    dev: "En desarrollo",
  },
  versions: {
    label: "Versión de la documentación",
    notice: (v: string) => `Esta documentación describe ${v}.`,
  },
};

/**
 * Estructura que deben cumplir todos los idiomas.
 *
 * Se deriva de `es` SIN `as const` a propósito: con literales, cada cadena en
 * inglés o portugués sería un tipo distinto al español y no compilaría.
 */
export type Strings = typeof es;

const en: Strings = {
  brand: {
    docs: "Docs",
    tagline: "Documentation console",
  },
  nav: {
    skipToContent: "Skip to content",
    main: "Main navigation",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
    filter: "Filter navigation…",
    noMatches: "No matches",
    breadcrumb: "Breadcrumb",
    pagination: "Previous and next pages",
  },
  search: {
    trigger: "Search documentation…",
    triggerShort: "Search…",
    placeholder: "Search pages, commands, permissions, configuration…",
    label: "Search documentation",
    empty: "Type to search, or pick an action below.",
    noResults: "No results for",
    hintNavigate: "navigate",
    hintOpen: "open",
    hintClose: "close",
    resultCount: (n: number) => `${n} result${n === 1 ? "" : "s"}`,
    groups: {
      action: "Actions",
      page: "Pages",
      section: "Sections",
      command: "Commands",
      permission: "Permissions",
      config: "Configuration",
    },
    kinds: {
      action: "ACTION",
      page: "PAGE",
      section: "SECTION",
      command: "COMMAND",
      permission: "PERMISSION",
      config: "CONFIG",
    },
  },
  actions: {
    openGithub: "Open the repository on GitHub",
    toggleTheme: "Toggle theme",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    language: "Language",
    version: "Version",
    copy: "Copy",
    copied: "Copied",
    copyAria: "Copy to clipboard",
  },
  toc: {
    title: "On this page",
    label: "Page outline",
    top: "Back to top",
  },
  page: {
    prev: "Previous",
    next: "Next",
    untranslated:
      "This page's content is still in Spanish. The interface is translated; pages are being translated progressively.",
    editOnGithub: "Edit this page",
    reportIssue: "Report an issue",
    lastUpdated: "Last reviewed",
  },
  feedback: {
    question: "Was this page helpful?",
    yes: "Yes",
    no: "No",
    thanks: "Thanks for the signal.",
    followUpNo: "What was missing? Open an issue and we'll add it.",
    followUpYes: "That tells us what to keep.",
    openIssue: "Open an issue",
  },
  meta: {
    system: "System",
    version: "Version",
    status: "Status",
    platform: "Platform",
    java: "Java",
    storage: "Storage",
    dependencies: "Dependencies",
    required: "Required",
    optional: "Optional",
  },
  status: {
    stable: "Stable",
    beta: "Beta",
    experimental: "Experimental",
    deprecated: "Deprecated",
    dev: "In development",
  },
  versions: {
    label: "Documentation version",
    notice: (v: string) => `This documentation describes ${v}.`,
  },
};

const pt: Strings = {
  brand: {
    docs: "Docs",
    tagline: "Console de documentação",
  },
  nav: {
    skipToContent: "Ir para o conteúdo",
    main: "Navegação principal",
    openMenu: "Abrir navegação",
    closeMenu: "Fechar navegação",
    filter: "Filtrar navegação…",
    noMatches: "Sem correspondências",
    breadcrumb: "Trilha de navegação",
    pagination: "Páginas anterior e próxima",
  },
  search: {
    trigger: "Buscar na documentação…",
    triggerShort: "Buscar…",
    placeholder: "Buscar páginas, comandos, permissões, configuração…",
    label: "Buscar na documentação",
    empty: "Digite para buscar, ou escolha uma ação abaixo.",
    noResults: "Sem resultados para",
    hintNavigate: "navegar",
    hintOpen: "abrir",
    hintClose: "fechar",
    resultCount: (n: number) => `${n} resultado${n === 1 ? "" : "s"}`,
    groups: {
      action: "Ações",
      page: "Páginas",
      section: "Seções",
      command: "Comandos",
      permission: "Permissões",
      config: "Configuração",
    },
    kinds: {
      action: "AÇÃO",
      page: "PÁGINA",
      section: "SEÇÃO",
      command: "COMANDO",
      permission: "PERMISSÃO",
      config: "CONFIG",
    },
  },
  actions: {
    openGithub: "Abrir o repositório no GitHub",
    toggleTheme: "Alternar tema",
    themeToLight: "Mudar para tema claro",
    themeToDark: "Mudar para tema escuro",
    language: "Idioma",
    version: "Versão",
    copy: "Copiar",
    copied: "Copiado",
    copyAria: "Copiar para a área de transferência",
  },
  toc: {
    title: "Nesta página",
    label: "Índice da página",
    top: "Voltar ao topo",
  },
  page: {
    prev: "Anterior",
    next: "Próxima",
    untranslated:
      "O conteúdo desta página ainda está em espanhol. A interface já está traduzida; as páginas serão traduzidas progressivamente.",
    editOnGithub: "Editar esta página",
    reportIssue: "Relatar um problema",
    lastUpdated: "Última revisão",
  },
  feedback: {
    question: "Esta página ajudou?",
    yes: "Sim",
    no: "Não",
    thanks: "Obrigado pelo retorno.",
    followUpNo: "O que faltou? Abra uma issue e nós adicionamos.",
    followUpYes: "Isso nos diz o que manter.",
    openIssue: "Abrir uma issue",
  },
  meta: {
    system: "Sistema",
    version: "Versão",
    status: "Estado",
    platform: "Plataforma",
    java: "Java",
    storage: "Persistência",
    dependencies: "Dependências",
    required: "Obrigatório",
    optional: "Opcional",
  },
  status: {
    stable: "Estável",
    beta: "Beta",
    experimental: "Experimental",
    deprecated: "Obsoleto",
    dev: "Em desenvolvimento",
  },
  versions: {
    label: "Versão da documentação",
    notice: (v: string) => `Esta documentação descreve ${v}.`,
  },
};

export const STRINGS: Record<Locale, Strings> = { es, en, pt };
