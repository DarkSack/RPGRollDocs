import { useMemo, useState } from "react";
import { CodeBlock } from "../ui/CodeBlock";
import { CopyButton } from "../ui/CopyButton";
import { DownloadIcon, PlusIcon, TrashIcon } from "../icons/Icon";
import {
  AnimationEditor,
  BelowNameEditor,
  BossBarEditor,
  ContextEditor,
  NametagEditor,
  ProfileEditor,
  ScoreboardEditor,
  SortingEditor,
  TablistEditor,
  TeamsEditor,
} from "./editors";
import {
  buildAnimationYaml,
  buildBelowNameYaml,
  buildBossBarYaml,
  buildContextYaml,
  buildNametagYaml,
  buildProfileYaml,
  buildScoreboardYaml,
  buildSortingYaml,
  buildTablistYaml,
  buildTeamsYaml,
  downloadYaml,
  slugify,
} from "./yaml";
import {
  CONTENT_KIND_LABELS,
  defaultAnimation,
  defaultBelowName,
  defaultBossBar,
  defaultContext,
  defaultNametag,
  defaultProfile,
  defaultScoreboard,
  defaultSorting,
  defaultTablist,
  defaultTeams,
  emptyWorkspace,
  type TabContentKind,
  type TabWorkspace,
} from "./types";

const KIND_ORDER: TabContentKind[] = [
  "profiles",
  "contexts",
  "scoreboards",
  "tablists",
  "nametags",
  "belownames",
  "bossbars",
  "sortings",
  "teams",
  "animations",
];

const FACTORY: { [K in TabContentKind]: (id?: string) => TabWorkspace[K][number] } = {
  profiles: defaultProfile,
  contexts: defaultContext,
  scoreboards: defaultScoreboard,
  tablists: defaultTablist,
  nametags: defaultNametag,
  belownames: defaultBelowName,
  bossbars: defaultBossBar,
  sortings: defaultSorting,
  teams: defaultTeams,
  animations: defaultAnimation,
};

function buildYaml(kind: TabContentKind, item: any): string {
  switch (kind) {
    case "profiles":
      return buildProfileYaml(item);
    case "contexts":
      return buildContextYaml(item);
    case "scoreboards":
      return buildScoreboardYaml(item);
    case "tablists":
      return buildTablistYaml(item);
    case "nametags":
      return buildNametagYaml(item);
    case "belownames":
      return buildBelowNameYaml(item);
    case "bossbars":
      return buildBossBarYaml(item);
    case "sortings":
      return buildSortingYaml(item);
    case "teams":
      return buildTeamsYaml(item);
    case "animations":
      return buildAnimationYaml(item);
  }
}

/**
 * Diseñador de TAB: un workspace con las 10 clases de contenido que lee RPGRoll-TAB
 * (perfiles, contextos, scoreboards, tablists, nametags, belowname, bossbars, sorting,
 * teams, animaciones). Cada una se edita como una lista de entradas con su propio id,
 * y del otro lado sale el YAML exacto que espera cada *Parser.java — listo para copiar
 * o descargar a tab/<carpeta>/<id>.yml.
 */
export function TabDesignerTool() {
  const [workspace, setWorkspace] = useState<TabWorkspace>(emptyWorkspace);
  const [activeKind, setActiveKind] = useState<TabContentKind>("profiles");
  const [activeIndex, setActiveIndex] = useState(0);

  const items = workspace[activeKind] as any[];
  const activeItem = items[activeIndex] ?? null;

  const ids = useMemo(
    () => ({
      tablists: workspace.tablists.map((t) => t.id),
      scoreboards: workspace.scoreboards.map((s) => s.id),
      nametags: workspace.nametags.map((n) => n.id),
      belownames: workspace.belownames.map((b) => b.id),
      bossbars: workspace.bossbars.map((b) => b.id),
      sortings: workspace.sortings.map((s) => s.id),
      teams: workspace.teams.map((t) => t.id),
      profiles: workspace.profiles.map((p) => p.id),
    }),
    [workspace],
  );

  function switchKind(kind: TabContentKind) {
    setActiveKind(kind);
    setActiveIndex(0);
  }

  function updateItem(next: any) {
    setWorkspace((w) => ({ ...w, [activeKind]: items.map((it, i) => (i === activeIndex ? next : it)) }));
  }

  function addItem() {
    const factory = FACTORY[activeKind];
    const nextItem = factory(`nuevo_${items.length + 1}`);
    setWorkspace((w) => ({ ...w, [activeKind]: [...items, nextItem] }));
    setActiveIndex(items.length);
  }

  function removeItem(i: number) {
    setWorkspace((w) => ({ ...w, [activeKind]: items.filter((_, idx) => idx !== i) }));
    setActiveIndex((cur) => Math.max(0, Math.min(cur, items.length - 2)));
  }

  const yaml = activeItem ? buildYaml(activeKind, activeItem) : "";
  const slug = activeItem ? slugify(activeItem.id, "sin_id") : "";
  const folder = CONTENT_KIND_LABELS[activeKind].folder;

  return (
    <div className="not-prose my-6 space-y-5 rounded-xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="flex flex-wrap gap-1.5">
        {KIND_ORDER.map((kind) => (
          <button
            key={kind}
            type="button"
            onClick={() => switchKind(kind)}
            className={`rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
              kind === activeKind
                ? "bg-violet-600 text-white"
                : "bg-white text-slate-600 hover:bg-violet-50 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-violet-500/10"
            }`}
          >
            {CONTENT_KIND_LABELS[kind].label} ({workspace[kind].length})
          </button>
        ))}
      </div>

      <div className="grid min-w-0 gap-5 lg:grid-cols-[220px_1fr]">
        <div className="min-w-0 space-y-2">
          <div className="space-y-1">
            {items.map((it, i) => (
              <div
                key={i}
                className={`flex items-center justify-between gap-1 rounded-md px-2 py-1.5 text-sm ${
                  i === activeIndex
                    ? "bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300"
                    : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
                }`}
              >
                <button type="button" onClick={() => setActiveIndex(i)} className="min-w-0 flex-1 truncate text-left">
                  {it.id || "(sin id)"}
                </button>
                <button type="button" onClick={() => removeItem(i)} className="shrink-0 text-slate-400 hover:text-red-500">
                  <TrashIcon size={14} />
                </button>
              </div>
            ))}
            {items.length === 0 && <p className="px-2 py-1.5 text-sm text-slate-400">Sin entradas todavía.</p>}
          </div>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-violet-300 px-2.5 py-1.5 text-sm font-medium text-violet-600 transition-colors hover:bg-violet-50 dark:border-violet-700 dark:text-violet-400 dark:hover:bg-violet-950/30"
          >
            <PlusIcon size={14} />
            Nueva entrada
          </button>
        </div>

        <div className="min-w-0 space-y-4">
          {activeItem ? (
            <>
              {activeKind === "profiles" && <ProfileEditor item={activeItem} onChange={updateItem} ids={ids} />}
              {activeKind === "contexts" && <ContextEditor item={activeItem} onChange={updateItem} ids={ids} />}
              {activeKind === "scoreboards" && <ScoreboardEditor item={activeItem} onChange={updateItem} ids={ids} />}
              {activeKind === "tablists" && <TablistEditor item={activeItem} onChange={updateItem} />}
              {activeKind === "nametags" && <NametagEditor item={activeItem} onChange={updateItem} />}
              {activeKind === "belownames" && <BelowNameEditor item={activeItem} onChange={updateItem} />}
              {activeKind === "bossbars" && <BossBarEditor item={activeItem} onChange={updateItem} />}
              {activeKind === "sortings" && <SortingEditor item={activeItem} onChange={updateItem} />}
              {activeKind === "teams" && <TeamsEditor item={activeItem} onChange={updateItem} />}
              {activeKind === "animations" && <AnimationEditor item={activeItem} onChange={updateItem} />}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    tab/{folder}/{slug}.yml
                  </p>
                  <CopyButton text={yaml} />
                </div>
                <CodeBlock language="yaml" code={yaml} showLineNumbers={false} />
                <button
                  type="button"
                  onClick={() => downloadYaml(`${slug}.yml`, yaml)}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-violet-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
                >
                  <DownloadIcon size={14} />
                  Descargar {slug}.yml
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-400">Crea una entrada para empezar a editarla.</p>
          )}
        </div>
      </div>
    </div>
  );
}
