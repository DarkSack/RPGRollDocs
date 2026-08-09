import { useEffect, useRef, useState } from "react";
import { searchDocs, type SearchEntry } from "../../content/search";

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

  const results = searchDocs(query);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full max-w-xs items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-left text-sm text-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-500 dark:hover:bg-slate-800"
      >
        <SearchIcon />
        <span className="hidden sm:inline">Buscar en la documentación…</span>
        <span className="sm:hidden">Buscar…</span>
        <Kbd className="ml-auto hidden sm:inline-flex" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-24" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
              <SearchIcon />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDownInput}
                placeholder="Buscar página, addon o sección…"
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              <Kbd label="Esc" />
            </div>

            <ul className="max-h-96 overflow-y-auto py-2">
              {query.trim() === "" && (
                <li className="px-4 py-6 text-center text-sm text-slate-400 dark:text-slate-500">
                  Escribí para buscar en las {new Set(results.map((r) => r.slug)).size || 30}+ páginas y secciones de la
                  documentación.
                </li>
              )}

              {query.trim() !== "" && results.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-slate-400 dark:text-slate-500">
                  Sin resultados para "{query}".
                </li>
              )}

              {results.map((entry, i) => (
                <li key={`${entry.slug}-${entry.heading ?? ""}`}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => select(entry)}
                    className={
                      "flex w-full flex-col items-start gap-0.5 px-4 py-2 text-left text-sm transition-colors " +
                      (i === activeIndex
                        ? "bg-violet-50 dark:bg-violet-500/10"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800")
                    }
                  >
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {entry.heading ? entry.headingLabel : entry.pageTitle}
                    </span>
                    {entry.heading && (
                      <span className="text-xs text-slate-400 dark:text-slate-500">en {entry.pageTitle}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
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

function Kbd({ label, className = "" }: { label?: string; className?: string }) {
  if (label) {
    return (
      <kbd className={"rounded border border-slate-200 px-1.5 py-0.5 text-xs text-slate-400 dark:border-slate-700 dark:text-slate-500 " + className}>
        {label}
      </kbd>
    );
  }
  const isMac = typeof navigator !== "undefined" && navigator.platform.toLowerCase().includes("mac");
  return (
    <span className={"inline-flex items-center gap-0.5 " + className}>
      <kbd className="rounded border border-slate-200 px-1.5 py-0.5 text-xs text-slate-400 dark:border-slate-700 dark:text-slate-500">
        {isMac ? "⌘" : "Ctrl"}
      </kbd>
      <kbd className="rounded border border-slate-200 px-1.5 py-0.5 text-xs text-slate-400 dark:border-slate-700 dark:text-slate-500">K</kbd>
    </span>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
