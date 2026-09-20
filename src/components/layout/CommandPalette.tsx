import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { searchPalette, type PaletteEntry, type ResultKind } from "../../content/paletteIndex";
import { localizedPageLabel, useI18n, LOCALES, LOCALE_META } from "../../i18n";
import { REPO_URL, ISSUES_URL } from "../../content/site";
import { pageTitle } from "../../content/nav";
import { Kbd } from "../ui/Kbd";
import {
  SearchIcon,
  HashIcon,
  BookIcon,
  TerminalIcon,
  KeyIcon,
  SlidersIcon,
  ArrowRightIcon,
} from "../icons/Icon";

type Kind = ResultKind | "action";

interface ActionEntry {
  kind: "action";
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
  run: () => void;
  keywords: string;
}

type Row = (PaletteEntry & { run?: never }) | ActionEntry;

interface CommandPaletteProps {
  onNavigate: (slug: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const KIND_ICON: Record<Kind, typeof HashIcon> = {
  page: BookIcon,
  section: HashIcon,
  command: TerminalIcon,
  permission: KeyIcon,
  config: SlidersIcon,
  action: ArrowRightIcon,
};

/** Color por tipo — el chip es la señal que permite escanear los resultados sin leerlos. */
const KIND_CLASS: Record<Kind, string> = {
  page: "text-slate-500 dark:text-slate-400",
  section: "text-slate-400 dark:text-slate-500",
  command: "text-violet-600 dark:text-violet-400",
  permission: "text-amber-600 dark:text-amber-400",
  config: "text-sky-600 dark:text-sky-400",
  action: "text-emerald-600 dark:text-emerald-400",
};

const GROUP_ORDER: Kind[] = ["action", "page", "command", "section", "permission", "config"];

/**
 * Command palette (Ctrl/Cmd+K, o `/`).
 *
 * Busca sobre el índice unificado —páginas, secciones, comandos, permisos y
 * claves de configuración— y agrega acciones del propio sitio (tema, idioma,
 * repositorio). Los resultados se muestran agrupados por tipo pero se navegan
 * como una sola lista plana, que es lo que espera el teclado.
 */
export function CommandPalette({ onNavigate, theme, onToggleTheme }: CommandPaletteProps) {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const actions = useMemo<ActionEntry[]>(() => {
    const go = (slug: string, keywords: string): ActionEntry => ({
      kind: "action",
      id: `action:go:${slug}`,
      title: localizedPageLabel(slug, pageTitle(slug), locale),
      meta: slug,
      run: () => onNavigate(slug),
      keywords,
    });

    return [
      go("comandos", "commands comandos comandos cli"),
      go("permisos", "permissions permisos permissoes nodes"),
      go("configuracion", "configuration configuracao config yml"),
      go("api", "api developers desarrolladores eventos events"),
      go("arquitectura", "architecture arquitetura modules modulos"),
      {
        kind: "action",
        id: "action:theme",
        title: theme === "dark" ? t.actions.themeToLight : t.actions.themeToDark,
        meta: theme === "dark" ? "light" : "dark",
        run: onToggleTheme,
        keywords: "theme tema tono dark light claro oscuro escuro",
      },
      ...LOCALES.filter((l) => l !== locale).map<ActionEntry>((l) => ({
        kind: "action",
        id: `action:locale:${l}`,
        title: `${t.actions.language}: ${LOCALE_META[l].native}`,
        meta: LOCALE_META[l].short,
        run: () => setLocale(l),
        keywords: `language idioma lingua ${l} ${LOCALE_META[l].native}`,
      })),
      {
        kind: "action",
        id: "action:github",
        title: t.actions.openGithub,
        meta: "github.com",
        run: () => window.open(REPO_URL, "_blank", "noopener,noreferrer"),
        keywords: "github repo repositorio source codigo",
      },
      {
        kind: "action",
        id: "action:issues",
        title: t.page.reportIssue,
        meta: "issues",
        run: () => window.open(ISSUES_URL, "_blank", "noopener,noreferrer"),
        keywords: "issue bug problema reportar report",
      },
    ];
  }, [locale, onNavigate, onToggleTheme, setLocale, t, theme]);

  const rows = useMemo<Row[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions.slice(0, 6);

    const matchedActions = actions.filter(
      (a) => a.title.toLowerCase().includes(q) || a.keywords.includes(q) || (a.meta ?? "").toLowerCase().includes(q),
    );
    return [...matchedActions, ...searchPalette(query)];
  }, [actions, query]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const typing =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "/" && !typing && !open && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        close();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, rows]);

  function select(row: Row) {
    setOpen(false);
    if (row.kind === "action") {
      row.run();
      return;
    }
    onNavigate(row.slug);
    if (row.heading) scrollToHeadingWhenReady(row.heading);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (rows.length === 0 ? 0 : (i + 1) % rows.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (rows.length === 0 ? 0 : (i - 1 + rows.length) % rows.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const row = rows[activeIndex];
      if (row) select(row);
    } else if (e.key === "Tab") {
      // El diálogo tiene un único elemento enfocable (el input): Tab no debe escapar a la página de atrás.
      e.preventDefault();
    }
  }

  // Se agrupa para mostrar, pero el índice activo recorre la lista plana.
  const grouped = GROUP_ORDER.map((kind) => ({
    kind,
    rows: rows.map((row, index) => ({ row, index })).filter(({ row }) => row.kind === kind),
  })).filter((group) => group.rows.length > 0);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-2 rounded-sm border px-2.5 py-1.5 text-left text-[13px] transition-colors hover:border-[--line-strong]"
        style={{ borderColor: "var(--line)", backgroundColor: "var(--surface-2)", color: "var(--text-faint)" }}
      >
        <SearchIcon size={14} className="shrink-0" />
        <span className="hidden truncate sm:inline">{t.search.trigger}</span>
        <span className="truncate sm:hidden">{t.search.triggerShort}</span>
        <span className="ml-auto hidden shrink-0 items-center gap-1 sm:inline-flex">
          <Kbd>{isMac() ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh] animate-fade-in"
          style={{ backgroundColor: "rgb(8 10 13 / 0.6)" }}
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.search.label}
            className="w-full max-w-2xl overflow-hidden rounded-sm border shadow-popover animate-scale-in"
            style={{ borderColor: "var(--line-strong)", backgroundColor: "var(--surface)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 border-b px-4" style={{ borderColor: "var(--line)" }}>
              <SearchIcon size={16} className="shrink-0" style={{ color: "var(--text-faint)" }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder={t.search.placeholder}
                aria-label={t.search.label}
                role="combobox"
                aria-expanded
                aria-controls="palette-results"
                aria-activedescendant={rows[activeIndex] ? `palette-row-${activeIndex}` : undefined}
                className="w-full bg-transparent py-3.5 text-sm outline-none"
                style={{ color: "var(--text)" }}
              />
              {query && (
                <span className="fui-value hidden shrink-0 sm:block">{t.search.resultCount(rows.length)}</span>
              )}
            </div>

            <div ref={listRef} id="palette-results" role="listbox" aria-label={t.search.label} className="max-h-[52vh] overflow-y-auto py-1.5">
              {rows.length === 0 && (
                <p className="px-4 py-10 text-center text-sm" style={{ color: "var(--text-faint)" }}>
                  {query.trim() ? `${t.search.noResults} “${query}”.` : t.search.empty}
                </p>
              )}

              {grouped.map((group) => (
                <div key={group.kind} className="mb-1 last:mb-0">
                  <p className="fui-label px-4 pb-1 pt-2">{t.search.groups[group.kind]}</p>
                  {group.rows.map(({ row, index }) => {
                    const Icon = KIND_ICON[row.kind];
                    const active = index === activeIndex;
                    return (
                      <button
                        key={row.id}
                        id={`palette-row-${index}`}
                        role="option"
                        aria-selected={active}
                        data-active={active}
                        type="button"
                        onMouseMove={() => setActiveIndex(index)}
                        onClick={() => select(row)}
                        className="flex w-full items-center gap-3 border-l-2 px-4 py-2 text-left"
                        style={{
                          borderLeftColor: active ? "var(--ruby)" : "transparent",
                          backgroundColor: active ? "var(--surface-2)" : "transparent",
                        }}
                      >
                        <Icon size={14} className={`shrink-0 ${KIND_CLASS[row.kind]}`} />
                        <span className="min-w-0 flex-1">
                          <span
                            className={
                              "block truncate text-[13px] font-medium " +
                              (row.kind === "command" || row.kind === "permission" || row.kind === "config"
                                ? "font-mono"
                                : "")
                            }
                            style={{ color: "var(--text)" }}
                          >
                            {row.title}
                          </span>
                          {row.subtitle && (
                            <span className="block truncate text-xs" style={{ color: "var(--text-faint)" }}>
                              {row.subtitle}
                            </span>
                          )}
                        </span>
                        {row.meta && <span className="fui-value hidden shrink-0 sm:block">{row.meta}</span>}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div
              className="flex items-center gap-4 border-t px-4 py-2"
              style={{ borderColor: "var(--line)", backgroundColor: "var(--surface-2)" }}
            >
              <span className="flex items-center gap-1.5 fui-value">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
                {t.search.hintNavigate}
              </span>
              <span className="flex items-center gap-1.5 fui-value">
                <Kbd>↵</Kbd>
                {t.search.hintOpen}
              </span>
              <span className="ml-auto flex items-center gap-1.5 fui-value">
                <Kbd>esc</Kbd>
                {t.search.hintClose}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function isMac(): boolean {
  return typeof navigator !== "undefined" && /mac/i.test(navigator.userAgent);
}

/**
 * La navegación por hash actualiza el DOM de forma asíncrona (vía el evento
 * "hashchange"), así que la sección destino puede no existir todavía cuando
 * queremos scrollear — reintenta un rato en vez de un solo setTimeout fijo.
 */
function scrollToHeadingWhenReady(id: string, attemptsLeft = 60): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ block: "start" });
    return;
  }
  if (attemptsLeft <= 0) return;
  setTimeout(() => scrollToHeadingWhenReady(id, attemptsLeft - 1), 50);
}
