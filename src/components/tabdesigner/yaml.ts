import type {
  AnimationDefinition,
  BelowNameDefinition,
  BossBarDefinition,
  ContextDefinition,
  NametagDefinition,
  ScoreboardDefinition,
  SortingDefinition,
  TABProfile,
  TablistDefinition,
  TeamsDefinition,
} from "./types";

export function slugify(raw: string, fallback: string): string {
  const slug = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return slug || fallback;
}

function q(raw: string): string {
  return `"${raw.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function pushIfSet(lines: string[], key: string, value: string): void {
  if (value.trim() !== "") lines.push(`${key}: ${q(value)}`);
}

function pushList(lines: string[], key: string, items: string[], indent = ""): void {
  if (items.length === 0) {
    lines.push(`${indent}${key}: []`);
    return;
  }
  lines.push(`${indent}${key}:`);
  for (const item of items) lines.push(`${indent}  - ${q(item)}`);
}

/** id: ..., tablist/scoreboard/nametag/belowname/bossbar/sorting/teams: ..., leídos por ProfileParser.java */
export function buildProfileYaml(p: TABProfile): string {
  const id = slugify(p.id, "perfil");
  const lines: string[] = [`id: ${id}`];
  pushIfSet(lines, "tablist", p.tablist);
  pushIfSet(lines, "scoreboard", p.scoreboard);
  pushIfSet(lines, "nametag", p.nametag);
  pushIfSet(lines, "belowname", p.belowname);
  pushIfSet(lines, "bossbar", p.bossbar);
  pushIfSet(lines, "sorting", p.sorting);
  pushIfSet(lines, "teams", p.teams);
  return lines.join("\n") + "\n";
}

/** Leído por ContextParser.java — conditions: lista de {type, value} o {type: placeholder, placeholder, operator, value}. */
export function buildContextYaml(c: ContextDefinition): string {
  const id = slugify(c.id, "contexto");
  const lines: string[] = [`id: ${id}`, `priority: ${Math.trunc(c.priority) || 0}`];

  if (c.conditions.length === 0) {
    lines.push("conditions: []");
  } else {
    lines.push("conditions:");
    for (const cond of c.conditions) {
      lines.push(`  - type: ${cond.type.toLowerCase()}`);
      if (cond.type === "PLACEHOLDER") {
        lines.push(`    placeholder: ${q(cond.placeholder)}`);
        if (cond.operator !== "EQUALS") lines.push(`    operator: ${cond.operator.toLowerCase()}`);
        if (cond.operator !== "NOT_EMPTY" && cond.operator !== "EMPTY") lines.push(`    value: ${q(cond.value)}`);
      } else {
        lines.push(`    value: ${q(cond.value)}`);
      }
    }
  }

  pushIfSet(lines, "profile", c.profile);
  pushIfSet(lines, "tablist", c.tablist);
  pushIfSet(lines, "scoreboard", c.scoreboard);
  pushIfSet(lines, "nametag", c.nametag);
  pushIfSet(lines, "belowname", c.belowname);
  pushIfSet(lines, "bossbar", c.bossbar);
  return lines.join("\n") + "\n";
}

/** Leído por ScoreboardParser.java — lines siempre en forma mapa (text/condition) como rpg_template.yml. */
export function buildScoreboardYaml(s: ScoreboardDefinition): string {
  const id = slugify(s.id, "scoreboard");
  const lines: string[] = [`id: ${id}`];
  pushIfSet(lines, "title", s.title);
  pushIfSet(lines, "title-animation", s.titleAnimation);

  if (s.lines.length === 0) {
    lines.push("lines: []");
  } else {
    lines.push("lines:");
    for (const line of s.lines) {
      lines.push(`  - text: ${q(line.text)}`);
      if (line.condition.trim() !== "") lines.push(`    condition: ${q(line.condition)}`);
    }
  }

  pushIfSet(lines, "extends", s.extends);
  if (s.replacements.length > 0) {
    lines.push("replacements:");
    for (const r of s.replacements) if (r.key.trim() !== "") lines.push(`  ${r.key.trim()}: ${q(r.value)}`);
  }
  lines.push(`priority: ${Math.trunc(s.priority) || 0}`);
  return lines.join("\n") + "\n";
}

/** Leído por TablistParser.java — header/footer.lines + animation opcional, ping (lista con último sin max), gamemode. */
export function buildTablistYaml(t: TablistDefinition): string {
  const id = slugify(t.id, "tablist");
  const lines: string[] = [`id: ${id}`, "header:"];
  if (t.headerAnimation.trim() !== "") lines.push(`  animation: ${slugify(t.headerAnimation, t.headerAnimation)}`);
  pushList(lines, "lines", t.headerLines, "  ");

  lines.push("footer:");
  if (t.footerAnimation.trim() !== "") lines.push(`  animation: ${slugify(t.footerAnimation, t.footerAnimation)}`);
  pushList(lines, "lines", t.footerLines, "  ");

  pushIfSet(lines, "player-format", t.playerFormat);

  if (t.pingTiers.length === 0) {
    lines.push("ping: []");
  } else {
    lines.push("ping:");
    t.pingTiers.forEach((tier, i) => {
      lines.push(`  - format: ${q(tier.format)}`);
      const isLast = i === t.pingTiers.length - 1;
      if (!isLast && tier.max.trim() !== "") lines.push(`    max: ${Math.trunc(Number(tier.max)) || 0}`);
    });
  }

  lines.push("gamemode:");
  lines.push(`  enabled: ${t.gamemodeEnabled}`);
  lines.push(`  short-icon: ${t.gamemodeShortIcon}`);
  pushList(lines, "worlds", t.worldFilter);
  return lines.join("\n") + "\n";
}

/** Leído por NametagParser.java — staff-override solo si permission Y staffLines están completos. */
export function buildNametagYaml(n: NametagDefinition): string {
  const id = slugify(n.id, "nametag");
  const lines: string[] = [`id: ${id}`];
  pushList(lines, "lines", n.lines);
  if (n.staffPermission.trim() !== "" && n.staffLines.length > 0) {
    lines.push("staff-override:");
    lines.push(`  permission: ${q(n.staffPermission)}`);
    pushList(lines, "lines", n.staffLines, "  ");
  }
  return lines.join("\n") + "\n";
}

/** Leído por BelowNameParser.java. */
export function buildBelowNameYaml(b: BelowNameDefinition): string {
  const id = slugify(b.id, "belowname");
  const lines: string[] = [`id: ${id}`];
  pushIfSet(lines, "score", b.score || "{health}");
  lines.push(`label: ${q(b.label)}`);
  return lines.join("\n") + "\n";
}

/** Leído por BossBarParser.java — color/style son los nombres reales de Bukkit BossBar.Color/Overlay. */
export function buildBossBarYaml(b: BossBarDefinition): string {
  const id = slugify(b.id, "bossbar");
  const lines: string[] = [`id: ${id}`];
  pushIfSet(lines, "title", b.title || id);
  pushIfSet(lines, "progress", b.progress || "100");
  lines.push(`color: ${b.color}`);
  lines.push(`style: ${b.style}`);
  lines.push(`priority: ${Math.trunc(b.priority) || 0}`);
  return lines.join("\n") + "\n";
}

/** Leído por SortingParser.java — "priority:" (shorthand) o "rules:" (explícito), nunca ambos. */
export function buildSortingYaml(s: SortingDefinition): string {
  const id = slugify(s.id, "sorting");
  const lines: string[] = [`id: ${id}`];

  if (s.mode === "shorthand") {
    pushList(lines, "priority", s.shorthand);
  } else if (s.rules.length === 0) {
    lines.push("rules: []");
  } else {
    lines.push("rules:");
    for (const rule of s.rules) {
      if (rule.kind === "placeholder") {
        lines.push(`  - placeholder: ${q(rule.placeholder)}`);
        lines.push(`    order: ${rule.order}`);
        if (rule.numeric) lines.push("    numeric: true");
      } else {
        lines.push(`  - field: ${rule.field}`);
        if (rule.field === "permission" && rule.values.length > 0) {
          lines.push(`    values: [${rule.values.map((v) => q(v)).join(", ")}]`);
        }
        lines.push(`    order: ${rule.order}`);
      }
    }
  }
  return lines.join("\n") + "\n";
}

/** Leído por TeamsParser.java — color/collision/nametag-visibility son nombres reales de Bukkit. */
export function buildTeamsYaml(t: TeamsDefinition): string {
  const id = slugify(t.id, "teams");
  const lines: string[] = [`id: ${id}`];
  lines.push(`prefix: ${q(t.prefix)}`);
  lines.push(`suffix: ${q(t.suffix)}`);
  lines.push(`color: ${t.color || "white"}`);
  lines.push(`friendly-fire: ${t.friendlyFire}`);
  lines.push(`see-friendly-invisibles: ${t.seeFriendlyInvisibles}`);
  lines.push(`collision: ${t.collision}`);
  lines.push(`nametag-visibility: ${t.nametagVisibility}`);
  return lines.join("\n") + "\n";
}

/**
 * Leído por AnimationParser.java — el shape cambia según "type":
 * FRAME usa frames: [...] directo, SCROLL se arma desde text/width/separator,
 * BLINK se arma desde text (frames = [text, ""]). PROGRESS no está implementado
 * en el parser todavía (queda fuera del selector de tipo de la herramienta).
 */
export function buildAnimationYaml(a: AnimationDefinition): string {
  const id = slugify(a.id, "animacion");
  const lines: string[] = [`id: ${id}`, `type: ${a.type}`, `interval: ${Math.max(1, Math.trunc(a.interval) || 10)}`];

  if (a.type === "FRAME") {
    pushList(lines, "frames", a.frames);
  } else if (a.type === "SCROLL") {
    lines.push(`text: ${q(a.text)}`);
    lines.push(`width: ${Math.trunc(a.width) || 20}`);
    lines.push(`separator: ${q(a.separator)}`);
  } else {
    lines.push(`text: ${q(a.text)}`);
  }
  return lines.join("\n") + "\n";
}

export function downloadYaml(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/yaml" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
