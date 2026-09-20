import { useEffect, useRef, useState, type ReactNode } from "react";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { TableOfContents } from "../ui/TableOfContents";
import { PageFooter } from "../ui/PageFooter";
import { useI18n, TRANSLATED_PAGES } from "../../i18n";
import { CloseIcon, InfoIcon } from "../icons/Icon";

interface LayoutProps {
  current: string;
  onNavigate: (slug: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  version: string;
  onVersionChange: (id: string) => void;
  children: ReactNode;
}

export function Layout({
  current,
  onNavigate,
  theme,
  onToggleTheme,
  version,
  onVersionChange,
  children,
}: LayoutProps) {
  const { t, locale } = useI18n();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  function closeMobileNav() {
    setMobileNavOpen(false);
    menuButtonRef.current?.focus();
  }

  useEffect(() => {
    if (!mobileNavOpen) return;

    /**
     * El drawer declara `aria-modal="true"`, que le promete a un lector de
     * pantalla que el resto de la página está inerte. Sin esta trampa la
     * promesa es falsa: al tabular más allá del último ítem el foco se iba al
     * contenido de atrás, que sigue visible y scrolleable.
     */
    function focusables(): HTMLElement[] {
      const nodes = drawerRef.current?.querySelectorAll<HTMLElement>(
        'input, button, a[href], select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      return [...(nodes ?? [])].filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMobileNav();
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !drawerRef.current?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    focusables()[0]?.focus();

    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileNavOpen]);

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">
        {t.nav.skipToContent}
      </a>

      <Topbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        onToggleMobileNav={() => setMobileNavOpen((v) => !v)}
        onNavigateHome={() => onNavigate("inicio")}
        onNavigate={onNavigate}
        current={current}
        version={version}
        onVersionChange={onVersionChange}
        menuButtonRef={menuButtonRef}
      />

      <div className="mx-auto flex w-full max-w-[110rem]">
        <aside
          className="sticky top-[76px] hidden h-[calc(100svh-76px)] w-[16.5rem] shrink-0 overflow-y-auto border-r lg:block"
          style={{ borderColor: "var(--line)" }}
        >
          <Sidebar current={current} onNavigate={onNavigate} />
        </aside>

        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 animate-fade-in"
              style={{ backgroundColor: "rgb(8 10 13 / 0.6)" }}
              onClick={closeMobileNav}
              aria-hidden="true"
            />
            <div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label={t.nav.main}
              className="absolute inset-y-0 left-0 flex w-[17rem] animate-slide-in-left flex-col overflow-y-auto border-r shadow-popover"
              style={{ borderColor: "var(--line)", backgroundColor: "var(--bg)" }}
            >
              <div
                className="flex h-12 shrink-0 items-center justify-between border-b px-3"
                style={{ borderColor: "var(--line)" }}
              >
                <span className="fui-label">{t.nav.main}</span>
                <button
                  type="button"
                  onClick={closeMobileNav}
                  aria-label={t.nav.closeMenu}
                  className="rounded-sm p-1.5"
                  style={{ color: "var(--text-dim)" }}
                >
                  <CloseIcon size={16} />
                </button>
              </div>
              <Sidebar current={current} onNavigate={onNavigate} onLinkClick={closeMobileNav} />
            </div>
          </div>
        )}

        <main id="main-content" className="min-w-0 flex-1">
          <div className="mx-auto flex w-full max-w-[86rem] gap-10 px-5 py-8 sm:px-8">
            <div className="prose-doc min-w-0 flex-1">
              {locale !== "es" && !TRANSLATED_PAGES.has(current) && (
                <p
                  className="mb-8 flex items-start gap-2.5 rounded-sm border px-3 py-2.5 text-[13px]"
                  style={{
                    borderColor: "var(--line)",
                    backgroundColor: "var(--surface-2)",
                    color: "var(--text-faint)",
                  }}
                >
                  <InfoIcon size={14} className="mt-0.5 shrink-0" />
                  {t.page.untranslated}
                </p>
              )}

              <TableOfContents route={current} variant="collapsible" />

              {children}

              <PageFooter slug={current} />
            </div>

            <aside className="sticky top-[92px] hidden h-fit w-56 shrink-0 xl:block">
              <TableOfContents route={current} />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
