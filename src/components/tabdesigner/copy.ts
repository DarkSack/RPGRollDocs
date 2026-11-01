import type { Locale } from "../../i18n";
import type { TabContentKind } from "./types";

/** Texto de la interfaz del Diseñador de TAB. */

const es = {
  noEntries: "Sin entradas todavía.",
  newEntry: "Nueva entrada",
  noId: "(sin id)",
  download: "Descargar",
  createFirst: "Crea una entrada para empezar a editarla.",

  linesHint: "una por línea",
  remove: "Quitar",

  lId: "Id",
  lPriority: "Prioridad",
  lType: "Tipo",
  lValue: "Valor",
  lPlaceholder: "Placeholder",
  lTitle: "Título",
  lFormat: "Formato",
  lOrder: "Orden",
  lColor: "Color",

  fullProfile: "Perfil completo (opcional)",
  phReplacesAll: "reemplaza todo",

  condsTitle: "Condiciones (todas deben cumplirse — AND)",
  lOperator: "Operador",
  addCondition: "Agregar condición",
  contextHint:
    "Deja vacío cualquier campo de abajo que no quieras sobrescribir para este contexto.",

  lExtends: "Extends (otro scoreboard, opcional)",
  lTitleAnim: "Animación de título (id, opcional)",
  linesTitle: "Líneas",
  lLineN: "Línea {n}",
  lCondition: "Condición (opcional)",
  addLine: "Agregar línea",
  replTitle: "Replacements (para llenar un extends)",
  lKey: "Clave",
  addRepl: "Agregar replacement",

  lHeaderAnim: "Animación del header (id, opcional)",
  lHeaderLines: "Header — líneas estáticas",
  lFooterAnim: "Animación del footer (id, opcional)",
  lFooterLines: "Footer — líneas estáticas",
  lPlayerFormat: "Formato de jugador",
  pingTitle:
    "Tramos de ping (se evalúan en orden; el último puede quedar sin tope como catch-all)",
  lMax: "Máximo (ms, vacío = catch-all)",
  addTier: "Agregar tramo",
  lShowGamemode: "Mostrar gamemode",
  lShortIcon: "Ícono corto de gamemode",
  lWorldFilter: "Filtro de mundos (vacío = sin restricción)",

  lNametagLines: "Líneas (apiladas sobre la cabeza, la última va más cerca)",
  lStaffPerm: "Permiso de staff-override (opcional)",
  lStaffLines: "Líneas para quien tiene ese permiso",
  nametagHint:
    "Solo se emite el bloque staff-override si el permiso y al menos una línea están completos.",

  lScore: "Score (debe resolver a un número)",
  lLabel: "Label",

  lProgress: "Progreso (0-100, placeholder o número)",
  lStyle: "Estilo",

  lMode: "Forma",
  lShorthand:
    "Orden (palabra por línea: name/ping/world/online-time/permission, o cualquier otra = placeholder)",
  lField: "Campo",
  lNodes: "Nodos (coma, mayor a menor)",
  lNumeric: "Numérico",
  addRule: "Agregar regla",

  lPrefix: "Prefix",
  lSuffix: "Suffix",
  hintMax64: "máx. 64 caracteres",
  lTeamColor: "Color (nombre de NamedTextColor/ChatColor)",
  lFriendlyFire: "Friendly fire",
  lSeeInvis: "Ver invisibles del mismo equipo",
  lCollision: "Colisión",
  lNametagVis: "Visibilidad de nametag",

  lInterval: "Intervalo (ticks)",
  lFrames: "Frames (texto completo por línea)",
  lFullText: "Texto completo",
  lWidth: "Ancho de la ventana",
  lSeparator: "Separador",
  lText: "Texto",

  kinds: {
    profiles: "Perfiles",
    contexts: "Contextos",
    scoreboards: "Scoreboards",
    tablists: "Tablists",
    nametags: "Nametags",
    belownames: "BelowName",
    bossbars: "BossBars",
    sortings: "Sorting",
    teams: "Teams",
    animations: "Animaciones",
  } as Record<TabContentKind, string>,
};

export type TabToolCopy = typeof es;

const en: TabToolCopy = {
  noEntries: "No entries yet.",
  newEntry: "New entry",
  noId: "(no id)",
  download: "Download",
  createFirst: "Create an entry to start editing it.",

  linesHint: "one per line",
  remove: "Remove",

  lId: "Id",
  lPriority: "Priority",
  lType: "Type",
  lValue: "Value",
  lPlaceholder: "Placeholder",
  lTitle: "Title",
  lFormat: "Format",
  lOrder: "Order",
  lColor: "Color",

  fullProfile: "Full profile (optional)",
  phReplacesAll: "replaces everything",

  condsTitle: "Conditions (all of them must be met — AND)",
  lOperator: "Operator",
  addCondition: "Add a condition",
  contextHint: "Leave empty any field below that you do not want to override for this context.",

  lExtends: "Extends (another scoreboard, optional)",
  lTitleAnim: "Title animation (id, optional)",
  linesTitle: "Lines",
  lLineN: "Line {n}",
  lCondition: "Condition (optional)",
  addLine: "Add a line",
  replTitle: "Replacements (to fill in an extends)",
  lKey: "Key",
  addRepl: "Add a replacement",

  lHeaderAnim: "Header animation (id, optional)",
  lHeaderLines: "Header — static lines",
  lFooterAnim: "Footer animation (id, optional)",
  lFooterLines: "Footer — static lines",
  lPlayerFormat: "Player format",
  pingTitle:
    "Ping tiers (evaluated in order; the last one can be left with no cap as a catch-all)",
  lMax: "Maximum (ms, empty = catch-all)",
  addTier: "Add a tier",
  lShowGamemode: "Show the gamemode",
  lShortIcon: "Short gamemode icon",
  lWorldFilter: "World filter (empty = no restriction)",

  lNametagLines: "Lines (stacked above the head, the last one sits closest)",
  lStaffPerm: "Staff-override permission (optional)",
  lStaffLines: "Lines for whoever holds that permission",
  nametagHint:
    "The staff-override block is only emitted if the permission and at least one line are filled in.",

  lScore: "Score (must resolve to a number)",
  lLabel: "Label",

  lProgress: "Progress (0-100, a placeholder or a number)",
  lStyle: "Style",

  lMode: "Form",
  lShorthand:
    "Order (one word per line: name/ping/world/online-time/permission, or any other = a placeholder)",
  lField: "Field",
  lNodes: "Nodes (comma-separated, highest to lowest)",
  lNumeric: "Numeric",
  addRule: "Add a rule",

  lPrefix: "Prefix",
  lSuffix: "Suffix",
  hintMax64: "max. 64 characters",
  lTeamColor: "Color (a NamedTextColor/ChatColor name)",
  lFriendlyFire: "Friendly fire",
  lSeeInvis: "See invisible teammates",
  lCollision: "Collision",
  lNametagVis: "Nametag visibility",

  lInterval: "Interval (ticks)",
  lFrames: "Frames (the whole text per line)",
  lFullText: "Full text",
  lWidth: "Window width",
  lSeparator: "Separator",
  lText: "Text",

  kinds: {
    profiles: "Profiles",
    contexts: "Contexts",
    scoreboards: "Scoreboards",
    tablists: "Tablists",
    nametags: "Nametags",
    belownames: "BelowName",
    bossbars: "BossBars",
    sortings: "Sorting",
    teams: "Teams",
    animations: "Animations",
  },
};

const pt: TabToolCopy = {
  noEntries: "Sem entradas ainda.",
  newEntry: "Nova entrada",
  noId: "(sem id)",
  download: "Baixar",
  createFirst: "Crie uma entrada para começar a editá-la.",

  linesHint: "uma por linha",
  remove: "Remover",

  lId: "Id",
  lPriority: "Prioridade",
  lType: "Tipo",
  lValue: "Valor",
  lPlaceholder: "Placeholder",
  lTitle: "Título",
  lFormat: "Formato",
  lOrder: "Ordem",
  lColor: "Cor",

  fullProfile: "Perfil completo (opcional)",
  phReplacesAll: "substitui tudo",

  condsTitle: "Condições (todas devem ser cumpridas — AND)",
  lOperator: "Operador",
  addCondition: "Adicionar condição",
  contextHint:
    "Deixe vazio qualquer campo abaixo que você não queira sobrescrever para este contexto.",

  lExtends: "Extends (outro scoreboard, opcional)",
  lTitleAnim: "Animação de título (id, opcional)",
  linesTitle: "Linhas",
  lLineN: "Linha {n}",
  lCondition: "Condição (opcional)",
  addLine: "Adicionar linha",
  replTitle: "Replacements (para preencher um extends)",
  lKey: "Chave",
  addRepl: "Adicionar replacement",

  lHeaderAnim: "Animação do header (id, opcional)",
  lHeaderLines: "Header — linhas estáticas",
  lFooterAnim: "Animação do footer (id, opcional)",
  lFooterLines: "Footer — linhas estáticas",
  lPlayerFormat: "Formato de jogador",
  pingTitle:
    "Faixas de ping (avaliadas em ordem; a última pode ficar sem limite como catch-all)",
  lMax: "Máximo (ms, vazio = catch-all)",
  addTier: "Adicionar faixa",
  lShowGamemode: "Mostrar o gamemode",
  lShortIcon: "Ícone curto de gamemode",
  lWorldFilter: "Filtro de mundos (vazio = sem restrição)",

  lNametagLines: "Linhas (empilhadas sobre a cabeça, a última fica mais perto)",
  lStaffPerm: "Permissão de staff-override (opcional)",
  lStaffLines: "Linhas para quem tem essa permissão",
  nametagHint:
    "O bloco staff-override só é emitido se a permissão e ao menos uma linha estiverem preenchidos.",

  lScore: "Score (deve resolver para um número)",
  lLabel: "Label",

  lProgress: "Progresso (0-100, placeholder ou número)",
  lStyle: "Estilo",

  lMode: "Forma",
  lShorthand:
    "Ordem (uma palavra por linha: name/ping/world/online-time/permission, ou qualquer outra = placeholder)",
  lField: "Campo",
  lNodes: "Nós (separados por vírgula, do maior ao menor)",
  lNumeric: "Numérico",
  addRule: "Adicionar regra",

  lPrefix: "Prefix",
  lSuffix: "Suffix",
  hintMax64: "máx. 64 caracteres",
  lTeamColor: "Cor (nome de NamedTextColor/ChatColor)",
  lFriendlyFire: "Friendly fire",
  lSeeInvis: "Ver invisíveis do mesmo time",
  lCollision: "Colisão",
  lNametagVis: "Visibilidade de nametag",

  lInterval: "Intervalo (ticks)",
  lFrames: "Frames (o texto completo por linha)",
  lFullText: "Texto completo",
  lWidth: "Largura da janela",
  lSeparator: "Separador",
  lText: "Texto",

  kinds: {
    profiles: "Perfis",
    contexts: "Contextos",
    scoreboards: "Scoreboards",
    tablists: "Tablists",
    nametags: "Nametags",
    belownames: "BelowName",
    bossbars: "BossBars",
    sortings: "Sorting",
    teams: "Teams",
    animations: "Animações",
  },
};

export const TAB_TOOL_COPY: Record<Locale, TabToolCopy> = { es, en, pt };
