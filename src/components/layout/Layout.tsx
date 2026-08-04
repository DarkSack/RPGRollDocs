import { useState, type ReactNode } from "react";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  current: string;
  onNavigate: (slug: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  children: ReactNode;
}

export function Layout({ current, onNavigate, theme, onToggleTheme, children }: LayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Topbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        onToggleMobileNav={() => setMobileNavOpen((v) => !v)}
        onNavigateHome={() => onNavigate("inicio")}
      />

      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-slate-200 dark:border-slate-800 lg:block">
          <Sidebar current={current} onNavigate={onNavigate} />
        </aside>

        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileNavOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-white shadow-xl dark:bg-slate-950">
              <Sidebar current={current} onNavigate={onNavigate} onLinkClick={() => setMobileNavOpen(false)} />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 px-6 py-10 sm:px-10">
          <div className="prose-doc mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
