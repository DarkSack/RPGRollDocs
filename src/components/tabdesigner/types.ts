// Espejo TS de los records/enums leídos en tab/src/main/java/.../{profile,context,scoreboard,
// tablist,nametag,belowname,bossbar,sorting,teams,animation}/*.java — ver cada *Parser.java para
// el nombre exacto de cada clave YAML (documentado también en yaml.ts, función por función).

export interface TABProfile {
  id: string;
  tablist: string;
  scoreboard: string;
  nametag: string;
  belowname: string;
  bossbar: string;
  sorting: string;
  teams: string;
}

export const CONTEXT_CONDITION_TYPES = ["WORLD", "PERMISSION", "GAMEMODE", "DIMENSION", "WEATHER", "PLACEHOLDER"] as const;
export type ContextConditionType = (typeof CONTEXT_CONDITION_TYPES)[number];

export const CONDITION_OPERATORS = [
  "EQUALS",
  "NOT_EQUALS",
  "CONTAINS",
  "NOT_EMPTY",
  "EMPTY",
  "GREATER_THAN",
  "LESS_THAN",
  "MATCHES",
] as const;
export type ConditionOperator = (typeof CONDITION_OPERATORS)[number];

export interface ContextCondition {
  type: ContextConditionType;
  placeholder: string;
  operator: ConditionOperator;
  value: string;
}

export interface ContextDefinition {
  id: string;
  priority: number;
  conditions: ContextCondition[];
  profile: string;
  tablist: string;
  scoreboard: string;
  nametag: string;
  belowname: string;
  bossbar: string;
}

export interface ScoreboardLine {
  text: string;
  condition: string;
}

export interface ScoreboardDefinition {
  id: string;
  title: string;
  titleAnimation: string;
  lines: ScoreboardLine[];
  extends: string;
  replacements: { key: string; value: string }[];
  priority: number;
}

export interface PingTier {
  format: string;
  max: string; // vacío = catch-all (sin tope superior), debe ir al final
}

export interface TablistDefinition {
  id: string;
  headerAnimation: string;
  headerLines: string[];
  footerAnimation: string;
  footerLines: string[];
  playerFormat: string;
  pingTiers: PingTier[];
  gamemodeEnabled: boolean;
  gamemodeShortIcon: boolean;
  worldFilter: string[];
}

export interface NametagDefinition {
  id: string;
  lines: string[];
  staffPermission: string;
  staffLines: string[];
}

export interface BelowNameDefinition {
  id: string;
  score: string;
  label: string;
}

export const BOSSBAR_COLORS = ["PINK", "BLUE", "RED", "GREEN", "YELLOW", "PURPLE", "WHITE"] as const;
export const BOSSBAR_STYLES = ["PROGRESS", "NOTCHED_6", "NOTCHED_10", "NOTCHED_12", "NOTCHED_20"] as const;

export interface BossBarDefinition {
  id: string;
  title: string;
  progress: string;
  color: (typeof BOSSBAR_COLORS)[number];
  style: (typeof BOSSBAR_STYLES)[number];
  priority: number;
}

export const SORT_NATIVE_FIELDS = ["name", "ping", "world", "online-time", "permission"] as const;
export type SortRuleKind = "native" | "placeholder";

export interface SortRule {
  kind: SortRuleKind;
  field: string; // solo para "native": name|ping|world|online-time|permission
  values: string[]; // solo permission: lista ordenada de nodos, más alto primero
  placeholder: string; // solo para "placeholder"
  order: "ASC" | "DESC";
  numeric: boolean; // solo placeholder
}

export interface SortingDefinition {
  id: string;
  mode: "shorthand" | "explicit";
  shorthand: string[]; // ids/palabras sueltas (name, ping, world, online-time, permission, o cualquier otra = placeholder)
  rules: SortRule[];
}

export const TEAM_OPTION_STATUSES = ["ALWAYS", "NEVER", "PUSH_OTHER_TEAMS", "PUSH_OWN_TEAM"] as const;
export const NAMETAG_VISIBILITIES = ["ALWAYS", "NEVER", "HIDE_FOR_OTHER_TEAMS", "HIDE_FOR_OWN_TEAM"] as const;

export interface TeamsDefinition {
  id: string;
  prefix: string;
  suffix: string;
  color: string;
  friendlyFire: boolean;
  seeFriendlyInvisibles: boolean;
  collision: (typeof TEAM_OPTION_STATUSES)[number];
  nametagVisibility: (typeof NAMETAG_VISIBILITIES)[number];
}

export const ANIMATION_TYPES = ["FRAME", "SCROLL", "BLINK"] as const;
export type AnimationType = (typeof ANIMATION_TYPES)[number];

export interface AnimationDefinition {
  id: string;
  type: AnimationType;
  interval: number;
  frames: string[]; // solo FRAME
  text: string; // SCROLL/BLINK
  width: number; // solo SCROLL
  separator: string; // solo SCROLL
}

export interface TabWorkspace {
  profiles: TABProfile[];
  contexts: ContextDefinition[];
  scoreboards: ScoreboardDefinition[];
  tablists: TablistDefinition[];
  nametags: NametagDefinition[];
  belownames: BelowNameDefinition[];
  bossbars: BossBarDefinition[];
  sortings: SortingDefinition[];
  teams: TeamsDefinition[];
  animations: AnimationDefinition[];
}

export type TabContentKind = keyof TabWorkspace;

export const CONTENT_KIND_LABELS: Record<TabContentKind, { label: string; folder: string }> = {
  profiles: { label: "Perfiles", folder: "profiles" },
  contexts: { label: "Contextos", folder: "contexts" },
  scoreboards: { label: "Scoreboards", folder: "scoreboards" },
  tablists: { label: "Tablists", folder: "tablists" },
  nametags: { label: "Nametags", folder: "nametags" },
  belownames: { label: "BelowName", folder: "belownames" },
  bossbars: { label: "BossBars", folder: "bossbars" },
  sortings: { label: "Sorting", folder: "sortings" },
  teams: { label: "Teams", folder: "teams" },
  animations: { label: "Animaciones", folder: "animations" },
};

export function defaultProfile(id = "nuevo_perfil"): TABProfile {
  return { id, tablist: "", scoreboard: "", nametag: "", belowname: "", bossbar: "", sorting: "", teams: "" };
}

export function defaultContext(id = "nuevo_contexto"): ContextDefinition {
  return { id, priority: 0, conditions: [], profile: "", tablist: "", scoreboard: "", nametag: "", belowname: "", bossbar: "" };
}

export function defaultCondition(): ContextCondition {
  return { type: "PERMISSION", placeholder: "", operator: "EQUALS", value: "" };
}

export function defaultScoreboard(id = "nuevo_scoreboard"): ScoreboardDefinition {
  return { id, title: "&6&lServidor", titleAnimation: "", lines: [{ text: "", condition: "" }], extends: "", replacements: [], priority: 0 };
}

export function defaultTablist(id = "nuevo_tablist"): TablistDefinition {
  return {
    id,
    headerAnimation: "",
    headerLines: ["&6&lServidor"],
    footerAnimation: "",
    footerLines: ["&7Jugadores: {online}/{max}"],
    playerFormat: "{prefix}{player}{suffix}",
    pingTiers: [
      { format: "&a{ping}ms", max: "50" },
      { format: "&e{ping}ms", max: "100" },
      { format: "&c{ping}ms", max: "" },
    ],
    gamemodeEnabled: false,
    gamemodeShortIcon: true,
    worldFilter: [],
  };
}

export function defaultNametag(id = "nuevo_nametag"): NametagDefinition {
  return { id, lines: ["{player}"], staffPermission: "", staffLines: [] };
}

export function defaultBelowName(id = "nuevo_belowname"): BelowNameDefinition {
  return { id, score: "{health}", label: "&c❤" };
}

export function defaultBossBar(id = "nuevo_bossbar"): BossBarDefinition {
  return { id, title: "", progress: "100", color: "PURPLE", style: "PROGRESS", priority: 0 };
}

export function defaultSorting(id = "nuevo_sorting"): SortingDefinition {
  return { id, mode: "shorthand", shorthand: ["permission", "name"], rules: [] };
}

export function defaultTeams(id = "nuevo_teams"): TeamsDefinition {
  return {
    id,
    prefix: "",
    suffix: "",
    color: "white",
    friendlyFire: true,
    seeFriendlyInvisibles: true,
    collision: "ALWAYS",
    nametagVisibility: "ALWAYS",
  };
}

export function defaultAnimation(id = "nueva_animacion"): AnimationDefinition {
  return { id, type: "FRAME", interval: 10, frames: ["Frame 1", "Frame 2"], text: "", width: 20, separator: "   " };
}

export function emptyWorkspace(): TabWorkspace {
  return {
    profiles: [defaultProfile("default")],
    contexts: [],
    scoreboards: [defaultScoreboard("default")],
    tablists: [defaultTablist("default")],
    nametags: [defaultNametag("default")],
    belownames: [defaultBelowName("default")],
    bossbars: [],
    sortings: [defaultSorting("default")],
    teams: [defaultTeams("default")],
    animations: [],
  };
}
