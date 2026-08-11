import { useEffect, useRef, useState, type ReactNode } from "react";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { TableOfContents } from "../ui/TableOfContents";
import { CloseIcon } from "../icons/Icon";

interface LayoutProps {
  current: string;
  onNavigate: (slug: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  children: ReactNode;
}

export function Layout({ current, onNavigate, theme, onToggleTheme, children }: LayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  function closeMobileNav() {
    setMobileNavOpen(false);
    menuButtonRef.current?.focus();
  }

  useEffect(() => {
    if (!mobileNavOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMobileNav();
    }
    window.addEventListener("keydown", onKeyDown);

    const first = drawerRef.current?.querySelector<HTMLElement>("button, a[href]");
    first?.focus();

    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileNavOpen]);

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>

      <Topbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        onToggleMobileNav={() => setMobileNavOpen((v) => !v)}
        onNavigateHome={() => onNavigate("inicio")}
        onNavigate={onNavigate}
        current={current}
        menuButtonRef={menuButtonRef}
      />

      <div className="mx-auto flex max-w-[100rem]">
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-slate-200 dark:border-slate-800 lg:block">
          <Sidebar current={current} onNavigate={onNavigate} />
        </aside>

        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 animate-fade-in bg-black/40"
              onClick={closeMobileNav}
              aria-hidden="true"
            />
            <div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navegación"
              className="absolute inset-y-0 left-0 flex w-72 animate-slide-in-left flex-col overflow-y-auto bg-white shadow-2xl dark:bg-slate-950"
            >
              <div className="flex items-center justify-end p-2">
                <button
                  type="button"
                  onClick={closeMobileNav}
                  aria-label="Cerrar navegación"
                  className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <CloseIcon size={18} />
                </button>
              </div>
              <Sidebar current={current} onNavigate={onNavigate} onLinkClick={closeMobileNav} />
            </div>
          </div>
        )}

        <main id="main-content" className="min-w-0 flex-1 px-6 py-10 sm:px-10">
          <div className="mx-auto flex max-w-6xl gap-10">
            <div className="prose-doc min-w-0 max-w-3xl flex-1">{children}</div>
            <aside className="sticky top-20 hidden h-fit w-56 shrink-0 xl:block">
              <TableOfContents route={current} />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
