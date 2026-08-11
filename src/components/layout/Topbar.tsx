import type { RefObject } from "react";
import { SearchBar } from "./SearchBar";
import { nav } from "../../content/nav";
import { MenuIcon, SunIcon, MoonIcon, GithubIcon, DiceIcon, ChevronRightIcon } from "../icons/Icon";

interface TopbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onToggleMobileNav: () => void;
  onNavigateHome: () => void;
  onNavigate: (slug: string) => void;
  current: string;
  menuButtonRef?: RefObject<HTMLButtonElement | null>;
}

export function Topbar({
  theme,
  onToggleTheme,
  onToggleMobileNav,
  onNavigateHome,
  onNavigate,
  current,
  menuButtonRef,
}: TopbarProps) {
  const section = nav.find((s) => s.items.some((i) => i.slug === current));
  const page = section?.items.find((i) => i.slug === current);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <button
        ref={menuButtonRef}
        type="button"
        onClick={onToggleMobileNav}
        aria-label="Abrir navegación"
        className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
      >
        <MenuIcon size={20} />
      </button>

      <button type="button" onClick={onNavigateHome} className="flex shrink-0 items-center gap-2 rounded-md py-1 pr-1 font-semibold text-slate-900 dark:text-slate-100">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-soft">
          <DiceIcon size={16} />
        </span>
        <span className="hidden sm:inline">RPGRoll</span>
      </button>

      {page && (
        <div className="hidden min-w-0 items-center gap-1.5 truncate text-sm text-slate-400 md:flex dark:text-slate-500">
          <ChevronRightIcon size={14} className="shrink-0" />
          <span className="truncate">{section?.title}</span>
          <ChevronRightIcon size={14} className="shrink-0" />
          <span className="truncate font-medium text-slate-600 dark:text-slate-300">{page.label}</span>
        </div>
      )}

      <div className="ml-auto max-w-xs flex-1 sm:max-w-sm">
        <SearchBar onNavigate={onNavigate} />
      </div>

      <div className="flex items-center gap-1">
        <a
          href="https://github.com/DarkSack/RPGRollSack"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 sm:flex dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <GithubIcon size={16} />
          GitHub
        </a>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          {theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </button>
      </div>
    </header>
  );
}
