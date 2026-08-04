interface TopbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onToggleMobileNav: () => void;
  onNavigateHome: () => void;
}

export function Topbar({ theme, onToggleTheme, onToggleMobileNav, onNavigateHome }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <button
        type="button"
        onClick={onToggleMobileNav}
        aria-label="Abrir navegación"
        className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onNavigateHome}
        className="flex items-center gap-2 rounded-md px-1 py-1 font-semibold text-slate-900 dark:text-slate-100"
      >
        <span className="text-xl">🎲</span>
        <span>RPGRoll</span>
        <span className="hidden text-sm font-normal text-slate-400 sm:inline dark:text-slate-500">docs</span>
      </button>

      <div className="ml-auto flex items-center gap-2">
        <a
          href="https://github.com"
          onClick={(e) => e.preventDefault()}
          className="hidden items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 sm:flex dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          title="Reemplazá este link por el repositorio real"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.1.83-.26.83-.58v-2.17c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.08 1.83 2.82 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .3Z" />
          </svg>
          GitHub
        </a>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Cambiar tema"
          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}
