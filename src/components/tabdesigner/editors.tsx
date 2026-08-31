import {
  AddButton,
  CheckboxField,
  IdDataList,
  idListId,
  LinesField,
  NumberField,
  PlaceholderDataList,
  RemoveButton,
  SectionCard,
  SelectField,
  TextField,
} from "./fields";
import {
  ANIMATION_TYPES,
  BOSSBAR_COLORS,
  BOSSBAR_STYLES,
  CONDITION_OPERATORS,
  CONTEXT_CONDITION_TYPES,
  NAMETAG_VISIBILITIES,
  SORT_NATIVE_FIELDS,
  TEAM_OPTION_STATUSES,
  defaultCondition,
  type AnimationDefinition,
  type BelowNameDefinition,
  type BossBarDefinition,
  type ContextCondition,
  type ContextDefinition,
  type NametagDefinition,
  type ScoreboardDefinition,
  type SortRule,
  type SortingDefinition,
  type TABProfile,
  type TablistDefinition,
  type TeamsDefinition,
} from "./types";
import { BUILTIN_PLACEHOLDERS } from "./placeholders";

interface Ids {
  tablists: string[];
  scoreboards: string[];
  nametags: string[];
  belownames: string[];
  bossbars: string[];
  sortings: string[];
  teams: string[];
  profiles: string[];
}

function ProfileRefFields({
  value,
  onChange,
  includeProfile,
}: {
  value: { tablist: string; scoreboard: string; nametag: string; belowname: string; bossbar: string; sorting?: string; teams?: string; profile?: string };
  onChange: (patch: Partial<typeof value>) => void;
  includeProfile?: boolean;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {includeProfile && (
        <TextField label="Perfil completo (opcional)" value={value.profile ?? ""} onChange={(v) => onChange({ profile: v })} list={idListId("profiles")} placeholder="reemplaza todo" />
      )}
      <TextField label="Tablist" value={value.tablist} onChange={(v) => onChange({ tablist: v })} list={idListId("tablists")} />
      <TextField label="Scoreboard" value={value.scoreboard} onChange={(v) => onChange({ scoreboard: v })} list={idListId("scoreboards")} />
      <TextField label="Nametag" value={value.nametag} onChange={(v) => onChange({ nametag: v })} list={idListId("nametags")} />
      <TextField label="BelowName" value={value.belowname} onChange={(v) => onChange({ belowname: v })} list={idListId("belownames")} />
      <TextField label="BossBar" value={value.bossbar} onChange={(v) => onChange({ bossbar: v })} list={idListId("bossbars")} />
      {value.sorting !== undefined && (
        <TextField label="Sorting" value={value.sorting} onChange={(v) => onChange({ sorting: v })} list={idListId("sortings")} />
      )}
      {value.teams !== undefined && <TextField label="Teams" value={value.teams} onChange={(v) => onChange({ teams: v })} list={idListId("teams")} />}
    </div>
  );
}

export function ProfileEditor({ item, onChange, ids }: { item: TABProfile; onChange: (v: TABProfile) => void; ids: Ids }) {
  return (
    <SectionCard>
      <IdDataList kind="tablists" ids={ids.tablists} />
      <IdDataList kind="scoreboards" ids={ids.scoreboards} />
      <IdDataList kind="nametags" ids={ids.nametags} />
      <IdDataList kind="belownames" ids={ids.belownames} />
      <IdDataList kind="bossbars" ids={ids.bossbars} />
      <IdDataList kind="sortings" ids={ids.sortings} />
      <IdDataList kind="teams" ids={ids.teams} />
      <TextField label="Id" value={item.id} onChange={(v) => onChange({ ...item, id: v })} placeholder="default" />
      <ProfileRefFields value={item} onChange={(patch) => onChange({ ...item, ...patch })} />
    </SectionCard>
  );
}

export function ContextEditor({ item, onChange, ids }: { item: ContextDefinition; onChange: (v: ContextDefinition) => void; ids: Ids }) {
  function updateCondition(i: number, patch: Partial<ContextCondition>) {
    const conditions = item.conditions.map((c, idx) => (idx === i ? { ...c, ...patch } : c));
    onChange({ ...item, conditions });
  }
  function removeCondition(i: number) {
    onChange({ ...item, conditions: item.conditions.filter((_, idx) => idx !== i) });
  }
  return (
    <SectionCard>
      <IdDataList kind="tablists" ids={ids.tablists} />
      <IdDataList kind="scoreboards" ids={ids.scoreboards} />
      <IdDataList kind="nametags" ids={ids.nametags} />
      <IdDataList kind="belownames" ids={ids.belownames} />
      <IdDataList kind="bossbars" ids={ids.bossbars} />
      <IdDataList kind="profiles" ids={ids.profiles} />
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="Id" value={item.id} onChange={(v) => onChange({ ...item, id: v })} placeholder="vip" />
        <NumberField label="Prioridad" value={item.priority} onChange={(v) => onChange({ ...item, priority: v })} />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Condiciones (todas deben cumplirse — AND)
        </p>
        {item.conditions.map((c, i) => (
          <div key={i} className="grid gap-2 rounded-md border border-slate-200 p-2 sm:grid-cols-5 dark:border-slate-800">
            <SelectField label="Tipo" value={c.type} options={CONTEXT_CONDITION_TYPES} onChange={(v) => updateCondition(i, { type: v as ContextCondition["type"] })} />
            {c.type === "PLACEHOLDER" ? (
              <>
                <TextField label="Placeholder" value={c.placeholder} onChange={(v) => updateCondition(i, { placeholder: v })} list="tabdesigner-placeholders" placeholder="{rpgroll_level}" />
                <SelectField label="Operador" value={c.operator} options={CONDITION_OPERATORS} onChange={(v) => updateCondition(i, { operator: v as ContextCondition["operator"] })} />
                {c.operator !== "NOT_EMPTY" && c.operator !== "EMPTY" && (
                  <TextField label="Valor" value={c.value} onChange={(v) => updateCondition(i, { value: v })} />
                )}
              </>
            ) : (
              <TextField label="Valor" value={c.value} onChange={(v) => updateCondition(i, { value: v })} placeholder="rpgrolltab.vip" />
            )}
            <div className="flex items-end">
              <RemoveButton onClick={() => removeCondition(i)} />
            </div>
          </div>
        ))}
        <AddButton label="Agregar condición" onClick={() => onChange({ ...item, conditions: [...item.conditions, defaultCondition()] })} />
      </div>

      <p className="text-xs text-slate-400">Dejá vacío cualquier campo de abajo que no quieras sobrescribir para este contexto.</p>
      <ProfileRefFields value={item} onChange={(patch) => onChange({ ...item, ...patch })} includeProfile />
    </SectionCard>
  );
}

export function ScoreboardEditor({ item, onChange, ids }: { item: ScoreboardDefinition; onChange: (v: ScoreboardDefinition) => void; ids: Ids }) {
  function updateLine(i: number, patch: Partial<ScoreboardDefinition["lines"][number]>) {
    onChange({ ...item, lines: item.lines.map((l, idx) => (idx === i ? { ...l, ...patch } : l)) });
  }
  function removeLine(i: number) {
    onChange({ ...item, lines: item.lines.filter((_, idx) => idx !== i) });
  }
  function updateReplacement(i: number, patch: Partial<{ key: string; value: string }>) {
    onChange({ ...item, replacements: item.replacements.map((r, idx) => (idx === i ? { ...r, ...patch } : r)) });
  }
  return (
    <SectionCard>
      <IdDataList kind="sortings" ids={ids.sortings} />
      <div className="grid gap-3 sm:grid-cols-3">
        <TextField label="Id" value={item.id} onChange={(v) => onChange({ ...item, id: v })} />
        <TextField label="Extends (otro scoreboard, opcional)" value={item.extends} onChange={(v) => onChange({ ...item, extends: v })} />
        <NumberField label="Prioridad" value={item.priority} onChange={(v) => onChange({ ...item, priority: v })} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="Título" value={item.title} onChange={(v) => onChange({ ...item, title: v })} placeholder="&6&lServidor" />
        <TextField label="Animación de título (id, opcional)" value={item.titleAnimation} onChange={(v) => onChange({ ...item, titleAnimation: v })} />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Líneas</p>
        <PlaceholderDataList placeholders={BUILTIN_PLACEHOLDERS} />
        {item.lines.map((line, i) => (
          <div key={i} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <TextField label={`Línea ${i + 1}`} value={line.text} onChange={(v) => updateLine(i, { text: v })} list="tabdesigner-placeholders" />
            <TextField label="Condición (opcional)" value={line.condition} onChange={(v) => updateLine(i, { condition: v })} placeholder="{health} < 10" />
            <div className="flex items-end">
              <RemoveButton onClick={() => removeLine(i)} />
            </div>
          </div>
        ))}
        <AddButton label="Agregar línea" onClick={() => onChange({ ...item, lines: [...item.lines, { text: "", condition: "" }] })} />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Replacements (para llenar un extends)</p>
        {item.replacements.map((r, i) => (
          <div key={i} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <TextField label="Clave" value={r.key} onChange={(v) => updateReplacement(i, { key: v })} placeholder="server" />
            <TextField label="Valor" value={r.value} onChange={(v) => updateReplacement(i, { value: v })} />
            <div className="flex items-end">
              <RemoveButton onClick={() => onChange({ ...item, replacements: item.replacements.filter((_, idx) => idx !== i) })} />
            </div>
          </div>
        ))}
        <AddButton label="Agregar replacement" onClick={() => onChange({ ...item, replacements: [...item.replacements, { key: "", value: "" }] })} />
      </div>
    </SectionCard>
  );
}

export function TablistEditor({ item, onChange }: { item: TablistDefinition; onChange: (v: TablistDefinition) => void }) {
  function updateTier(i: number, patch: Partial<TablistDefinition["pingTiers"][number]>) {
    onChange({ ...item, pingTiers: item.pingTiers.map((t, idx) => (idx === i ? { ...t, ...patch } : t)) });
  }
  return (
    <SectionCard>
      <PlaceholderDataList placeholders={BUILTIN_PLACEHOLDERS} />
      <TextField label="Id" value={item.id} onChange={(v) => onChange({ ...item, id: v })} />
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="Animación del header (id, opcional)" value={item.headerAnimation} onChange={(v) => onChange({ ...item, headerAnimation: v })} />
        <LinesField label="Header — líneas estáticas" value={item.headerLines} onChange={(v) => onChange({ ...item, headerLines: v })} rows={3} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="Animación del footer (id, opcional)" value={item.footerAnimation} onChange={(v) => onChange({ ...item, footerAnimation: v })} />
        <LinesField label="Footer — líneas estáticas" value={item.footerLines} onChange={(v) => onChange({ ...item, footerLines: v })} rows={3} />
      </div>
      <TextField label="Formato de jugador" value={item.playerFormat} onChange={(v) => onChange({ ...item, playerFormat: v })} list="tabdesigner-placeholders" />

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Tramos de ping (se evalúan en orden; el último puede quedar sin tope como catch-all)
        </p>
        {item.pingTiers.map((t, i) => (
          <div key={i} className="grid gap-2 sm:grid-cols-[1fr_140px_auto]">
            <TextField label="Formato" value={t.format} onChange={(v) => updateTier(i, { format: v })} />
            <TextField label="Máximo (ms, vacío = catch-all)" value={t.max} onChange={(v) => updateTier(i, { max: v })} />
            <div className="flex items-end">
              <RemoveButton onClick={() => onChange({ ...item, pingTiers: item.pingTiers.filter((_, idx) => idx !== i) })} />
            </div>
          </div>
        ))}
        <AddButton label="Agregar tramo" onClick={() => onChange({ ...item, pingTiers: [...item.pingTiers, { format: "&f{ping}ms", max: "" }] })} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <CheckboxField label="Mostrar gamemode" value={item.gamemodeEnabled} onChange={(v) => onChange({ ...item, gamemodeEnabled: v })} />
        <CheckboxField label="Ícono corto de gamemode" value={item.gamemodeShortIcon} onChange={(v) => onChange({ ...item, gamemodeShortIcon: v })} />
      </div>
      <LinesField label="Filtro de mundos (vacío = sin restricción)" value={item.worldFilter} onChange={(v) => onChange({ ...item, worldFilter: v })} rows={2} />
    </SectionCard>
  );
}

export function NametagEditor({ item, onChange }: { item: NametagDefinition; onChange: (v: NametagDefinition) => void }) {
  return (
    <SectionCard>
      <TextField label="Id" value={item.id} onChange={(v) => onChange({ ...item, id: v })} />
      <LinesField label="Líneas (apiladas sobre la cabeza, la última va más cerca)" value={item.lines} onChange={(v) => onChange({ ...item, lines: v })} />
      <TextField label="Permiso de staff-override (opcional)" value={item.staffPermission} onChange={(v) => onChange({ ...item, staffPermission: v })} placeholder="rpgrolltab.staff" />
      <LinesField label="Líneas para quien tiene ese permiso" value={item.staffLines} onChange={(v) => onChange({ ...item, staffLines: v })} rows={3} />
      <p className="text-xs text-slate-400">Solo se emite el bloque staff-override si el permiso y al menos una línea están completos.</p>
    </SectionCard>
  );
}

export function BelowNameEditor({ item, onChange }: { item: BelowNameDefinition; onChange: (v: BelowNameDefinition) => void }) {
  return (
    <SectionCard>
      <PlaceholderDataList placeholders={BUILTIN_PLACEHOLDERS} />
      <TextField label="Id" value={item.id} onChange={(v) => onChange({ ...item, id: v })} />
      <TextField label="Score (debe resolver a un número)" value={item.score} onChange={(v) => onChange({ ...item, score: v })} list="tabdesigner-placeholders" placeholder="{health}" />
      <TextField label="Label" value={item.label} onChange={(v) => onChange({ ...item, label: v })} placeholder="&c❤" />
    </SectionCard>
  );
}

export function BossBarEditor({ item, onChange }: { item: BossBarDefinition; onChange: (v: BossBarDefinition) => void }) {
  return (
    <SectionCard>
      <PlaceholderDataList placeholders={BUILTIN_PLACEHOLDERS} />
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="Id" value={item.id} onChange={(v) => onChange({ ...item, id: v })} />
        <NumberField label="Prioridad" value={item.priority} onChange={(v) => onChange({ ...item, priority: v })} />
      </div>
      <TextField label="Título" value={item.title} onChange={(v) => onChange({ ...item, title: v })} list="tabdesigner-placeholders" />
      <TextField label="Progreso (0-100, placeholder o número)" value={item.progress} onChange={(v) => onChange({ ...item, progress: v })} list="tabdesigner-placeholders" />
      <div className="grid gap-3 sm:grid-cols-2">
        <SelectField label="Color" value={item.color} options={BOSSBAR_COLORS} onChange={(v) => onChange({ ...item, color: v as BossBarDefinition["color"] })} />
        <SelectField label="Estilo" value={item.style} options={BOSSBAR_STYLES} onChange={(v) => onChange({ ...item, style: v as BossBarDefinition["style"] })} />
      </div>
    </SectionCard>
  );
}

export function SortingEditor({ item, onChange }: { item: SortingDefinition; onChange: (v: SortingDefinition) => void }) {
  function updateRule(i: number, patch: Partial<SortRule>) {
    onChange({ ...item, rules: item.rules.map((r, idx) => (idx === i ? { ...r, ...patch } : r)) });
  }
  return (
    <SectionCard>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="Id" value={item.id} onChange={(v) => onChange({ ...item, id: v })} />
        <SelectField
          label="Forma"
          value={item.mode}
          options={["shorthand", "explicit"] as const}
          onChange={(v) => onChange({ ...item, mode: v as SortingDefinition["mode"] })}
        />
      </div>

      {item.mode === "shorthand" ? (
        <LinesField
          label="Orden (palabra por línea: name/ping/world/online-time/permission, o cualquier otra = placeholder)"
          value={item.shorthand}
          onChange={(v) => onChange({ ...item, shorthand: v })}
        />
      ) : (
        <div className="space-y-2">
          {item.rules.map((r, i) => (
            <div key={i} className="grid gap-2 rounded-md border border-slate-200 p-2 sm:grid-cols-5 dark:border-slate-800">
              <SelectField
                label="Tipo"
                value={r.kind}
                options={["native", "placeholder"] as const}
                onChange={(v) => updateRule(i, { kind: v as SortRule["kind"] })}
              />
              {r.kind === "native" ? (
                <>
                  <SelectField label="Campo" value={r.field || "name"} options={SORT_NATIVE_FIELDS} onChange={(v) => updateRule(i, { field: v })} />
                  {r.field === "permission" && (
                    <TextField label="Nodos (coma, mayor a menor)" value={r.values.join(", ")} onChange={(v) => updateRule(i, { values: v.split(",").map((s) => s.trim()).filter(Boolean) })} />
                  )}
                </>
              ) : (
                <TextField label="Placeholder" value={r.placeholder} onChange={(v) => updateRule(i, { placeholder: v })} list="tabdesigner-placeholders" />
              )}
              <SelectField label="Orden" value={r.order} options={["ASC", "DESC"] as const} onChange={(v) => updateRule(i, { order: v as SortRule["order"] })} />
              {r.kind === "placeholder" && <CheckboxField label="Numérico" value={r.numeric} onChange={(v) => updateRule(i, { numeric: v })} />}
              <div className="flex items-end">
                <RemoveButton onClick={() => onChange({ ...item, rules: item.rules.filter((_, idx) => idx !== i) })} />
              </div>
            </div>
          ))}
          <AddButton
            label="Agregar regla"
            onClick={() =>
              onChange({ ...item, rules: [...item.rules, { kind: "native", field: "name", values: [], placeholder: "", order: "DESC", numeric: false }] })
            }
          />
        </div>
      )}
    </SectionCard>
  );
}

export function TeamsEditor({ item, onChange }: { item: TeamsDefinition; onChange: (v: TeamsDefinition) => void }) {
  return (
    <SectionCard>
      <div className="grid gap-3 sm:grid-cols-3">
        <TextField label="Id" value={item.id} onChange={(v) => onChange({ ...item, id: v })} />
        <TextField label="Prefix" value={item.prefix} onChange={(v) => onChange({ ...item, prefix: v })} hint="máx. 64 caracteres" />
        <TextField label="Suffix" value={item.suffix} onChange={(v) => onChange({ ...item, suffix: v })} hint="máx. 64 caracteres" />
      </div>
      <TextField label="Color (nombre de NamedTextColor/ChatColor)" value={item.color} onChange={(v) => onChange({ ...item, color: v })} placeholder="white" />
      <div className="grid gap-3 sm:grid-cols-2">
        <CheckboxField label="Friendly fire" value={item.friendlyFire} onChange={(v) => onChange({ ...item, friendlyFire: v })} />
        <CheckboxField label="Ver invisibles del mismo equipo" value={item.seeFriendlyInvisibles} onChange={(v) => onChange({ ...item, seeFriendlyInvisibles: v })} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <SelectField label="Colisión" value={item.collision} options={TEAM_OPTION_STATUSES} onChange={(v) => onChange({ ...item, collision: v as TeamsDefinition["collision"] })} />
        <SelectField
          label="Visibilidad de nametag"
          value={item.nametagVisibility}
          options={NAMETAG_VISIBILITIES}
          onChange={(v) => onChange({ ...item, nametagVisibility: v as TeamsDefinition["nametagVisibility"] })}
        />
      </div>
    </SectionCard>
  );
}

export function AnimationEditor({ item, onChange }: { item: AnimationDefinition; onChange: (v: AnimationDefinition) => void }) {
  return (
    <SectionCard>
      <div className="grid gap-3 sm:grid-cols-3">
        <TextField label="Id" value={item.id} onChange={(v) => onChange({ ...item, id: v })} />
        <SelectField label="Tipo" value={item.type} options={ANIMATION_TYPES} onChange={(v) => onChange({ ...item, type: v as AnimationDefinition["type"] })} />
        <NumberField label="Intervalo (ticks)" value={item.interval} onChange={(v) => onChange({ ...item, interval: v })} min={1} />
      </div>

      {item.type === "FRAME" && <LinesField label="Frames (texto completo por línea)" value={item.frames} onChange={(v) => onChange({ ...item, frames: v })} rows={4} />}

      {item.type === "SCROLL" && (
        <>
          <TextField label="Texto completo" value={item.text} onChange={(v) => onChange({ ...item, text: v })} />
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField label="Ancho de la ventana" value={item.width} onChange={(v) => onChange({ ...item, width: v })} min={1} />
            <TextField label="Separador" value={item.separator} onChange={(v) => onChange({ ...item, separator: v })} />
          </div>
        </>
      )}

      {item.type === "BLINK" && <TextField label="Texto" value={item.text} onChange={(v) => onChange({ ...item, text: v })} />}
    </SectionCard>
  );
}
