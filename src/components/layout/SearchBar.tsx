import { useEffect, useRef, useState } from "react";
import { searchDocs, type SearchEntry } from "../../content/search";
import { addonMeta, DefaultNavIcon } from "../../content/addons";
import { Kbd } from "../ui/Kbd";
import { SearchIcon, HashIcon } from "../icons/Icon";

interface SearchBarProps {
  onNavigate: (slug: string) => void;
}

/**
 * Buscador global (Ctrl/Cmd+K): busca por título de página o por sección
 * (SectionHeading) dentro de cualquier addon, y navega directo a esa sección.
 */
export function SearchBar({ onNavigate }: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = searchDocs(query);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        close();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function select(entry: SearchEntry) {
    onNavigate(entry.slug);
    setOpen(false);
    if (entry.heading) {
      scrollToHeadingWhenReady(entry.heading);
    }
  }

  function onKeyDownInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = results[activeIndex];
      if (entry) select(entry);
    } else if (e.key === "Tab") {
      // Diálogo con un único elemento enfocable (el input) — Tab no debe escapar al resto de la página.
      e.preventDefault();
    }
  }

  let lastPage: string | null = null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full max-w-xs items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-left text-sm text-slate-400 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-500 dark:hover:border-slate-600 dark:hover:bg-slate-800"
      >
        <SearchIcon size={16} className="shrink-0" />
        <span className="hidden truncate sm:inline">Buscar en la documentación…</span>
        <span className="truncate sm:hidden">Buscar…</span>
        <span className="ml-auto hidden shrink-0 items-center gap-0.5 sm:inline-flex">
          <Kbd>{isMac() ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-24 animate-fade-in"
          onClick={close}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Buscar en la documentación"
            className="w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-popover animate-scale-in dark:border-slate-700 dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
              <SearchIcon size={16} className="shrink-0 text-slate-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDownInput}
                placeholder="Buscar página, addon o sección…"
                aria-label="Buscar"
                aria-activedescendant={results[activeIndex] ? `search-result-${activeIndex}` : undefined}
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="search-results"
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={close}
                className="rounded border border-slate-200 px-1.5 py-0.5 text-xs text-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-500 dark:hover:bg-slate-800"
              >
                Esc
              </button>
            </div>

            <ul ref={listRef} id="search-results" role="listbox" className="max-h-96 overflow-y-auto py-2">
              {query.trim() === "" && (
                <li className="px-4 py-6 text-center text-sm text-slate-400 dark:text-slate-500">
                  Escribí para buscar en las páginas y secciones de la documentación.
                </li>
              )}

              {query.trim() !== "" && results.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-slate-400 dark:text-slate-500">
                  Sin resultados para &ldquo;{query}&rdquo;.
                </li>
              )}

              {results.map((entry, i) => {
                const showDivider = entry.heading !== undefined && entry.pageTitle !== lastPage;
                lastPage = entry.pageTitle;
                const Icon = entry.heading ? HashIcon : addonMeta(entry.slug)?.icon ?? DefaultNavIcon;

                return (
                  <li key={`${entry.slug}-${entry.heading ?? ""}`}>
                    {showDivider && (
                      <p className="mt-1 px-4 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {entry.pageTitle}
                      </p>
                    )}
                    <button
                      id={`search-result-${i}`}
                      role="option"
                      aria-selected={i === activeIndex}
                      data-active={i === activeIndex}
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => select(entry)}
                      className={
                        "flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm transition-colors " +
                        (i === activeIndex ? "bg-violet-50 dark:bg-violet-500/10" : "hover:bg-slate-50 dark:hover:bg-slate-800")
                      }
                    >
                      <Icon size={15} className="shrink-0 text-slate-400 dark:text-slate-500" />
                      <span className="min-w-0 flex-1 truncate">
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {entry.heading ? entry.headingLabel : entry.pageTitle}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

function isMac(): boolean {
  return typeof navigator !== "undefined" && navigator.platform.toLowerCase().includes("mac");
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
