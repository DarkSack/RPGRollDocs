import type { RefObject } from "react";
import { CommandPalette } from "./CommandPalette";
import { Dropdown } from "./Dropdown";
import { sectionOf } from "../../content/nav";
import { DOC_VERSIONS, SYSTEM_META, REPO_URL } from "../../content/site";
import { useI18n, localizedPageLabel, localizedSectionLabel, LOCALES, LOCALE_META, type Locale } from "../../i18n";
import { statusColor } from "../ui/status";
import { MenuIcon, SunIcon, MoonIcon, GithubIcon, DiceIcon, ChevronRightIcon } from "../icons/Icon";

interface TopbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onToggleMobileNav: () => void;
  onNavigateHome: () => void;
  onNavigate: (slug: string) => void;
  current: string;
  version: string;
  onVersionChange: (id: string) => void;
  menuButtonRef?: RefObject<HTMLButtonElement | null>;
}

export function Topbar({
  theme,
  onToggleTheme,
  onToggleMobileNav,
  onNavigateHome,
  onNavigate,
  current,
  version,
  onVersionChange,
  menuButtonRef,
}: TopbarProps) {
  const { t, locale, setLocale } = useI18n();

  const section = sectionOf(current);
  const page = section?.items.find((i) => i.slug === current);
  const activeVersion = DOC_VERSIONS.find((v) => v.id === version) ?? DOC_VERSIONS[0];

  return (
    <header className="sticky top-0 z-30" style={{ backgroundColor: "var(--bg)" }}>
      {/* Fila 1 — identidad, ruta, búsqueda y controles del sistema. */}
      <div
        className="flex h-12 items-center gap-2 border-b px-3 sm:px-4"
        style={{ borderColor: "var(--line)" }}
      >
        <button
          ref={menuButtonRef}
          type="button"
          onClick={onToggleMobileNav}
          aria-label={t.nav.openMenu}
          className="-ml-1 rounded-sm p-2 lg:hidden"
          style={{ color: "var(--text-dim)" }}
        >
          <MenuIcon size={18} />
        </button>

        <button
          type="button"
          onClick={onNavigateHome}
          className="flex shrink-0 items-center gap-2 rounded-sm py-1 pr-1"
        >
          <span
            className="flex h-6 w-6 items-center justify-center rounded-sm border"
            style={{ borderColor: "var(--line-strong)", backgroundColor: "var(--ruby-soft)", color: "var(--ruby)" }}
          >
            <DiceIcon size={14} />
          </span>
          <span className="text-[13px] font-semibold tracking-tight" style={{ color: "var(--text)" }}>
            RPGRoll
          </span>
          <span
            className="hidden rounded-sm border px-1.5 py-px font-mono text-[10px] uppercase tracking-widest sm:inline"
            style={{ borderColor: "var(--line)", color: "var(--text-faint)" }}
          >
            {t.brand.docs}
          </span>
        </button>

        {page && section && (
          <nav
            aria-label={t.nav.breadcrumb}
            className="hidden min-w-0 items-center gap-1 truncate pl-1 text-[13px] md:flex"
            style={{ color: "var(--text-faint)" }}
          >
            <ChevronRightIcon size={13} className="shrink-0 opacity-50" />
            <span className="truncate">{localizedSectionLabel(section.id, section.title, locale)}</span>
            <ChevronRightIcon size={13} className="shrink-0 opacity-50" />
            <span className="truncate font-medium" style={{ color: "var(--text-dim)" }}>
              {localizedPageLabel(page.slug, page.label, locale)}
            </span>
          </nav>
        )}

        <div className="ml-auto w-full max-w-[18rem] sm:max-w-sm">
          <CommandPalette onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme} />
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <div className="hidden sm:block">
            <Dropdown
              label={t.versions.label}
              value={activeVersion.id}
              onChange={onVersionChange}
              options={DOC_VERSIONS.map((v) => ({
                value: v.id,
                label: v.label,
                hint: v.note,
              }))}
              trigger={
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: statusColor(activeVersion.status) }}
                    aria-hidden="true"
                  />
                  {activeVersion.label}
                </span>
              }
            />
          </div>

          <Dropdown
            label={t.actions.language}
            value={locale}
            onChange={(next) => setLocale(next as Locale)}
            options={LOCALES.map((l) => ({ value: l, label: LOCALE_META[l].native, hint: LOCALE_META[l].short }))}
            trigger={LOCALE_META[locale].short}
          />

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? t.actions.themeToLight : t.actions.themeToDark}
            className="rounded-sm border p-1.5 transition-colors"
            style={{ borderColor: "var(--line)", color: "var(--text-dim)" }}
          >
            {theme === "dark" ? <SunIcon size={15} /> : <MoonIcon size={15} />}
          </button>

          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            aria-label={t.actions.openGithub}
            className="hidden rounded-sm border p-1.5 transition-colors sm:block"
            style={{ borderColor: "var(--line)", color: "var(--text-dim)" }}
          >
            <GithubIcon size={15} />
          </a>
        </div>
      </div>

      {/* Fila 2 — franja de estado. Metadata del sistema, nada clickeable. */}
      <div
        className="hidden h-7 items-center gap-5 border-b px-4 lg:flex"
        style={{ borderColor: "var(--line)", backgroundColor: "var(--surface)" }}
      >
        <MetaItem label={t.meta.system} value={SYSTEM_META.system} />
        <MetaItem label={t.meta.platform} value={`${SYSTEM_META.platform} ${SYSTEM_META.paperApi}`} />
        <MetaItem label={t.meta.java} value={SYSTEM_META.java} />
        <MetaItem label={t.meta.storage} value={SYSTEM_META.storage} />
        <span className="ml-auto flex items-center gap-1.5">
          <span className="fui-label">{t.meta.status}</span>
          <span className="fui-label opacity-40">//</span>
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: statusColor(activeVersion.status) }}
            aria-hidden="true"
          />
          <span className="fui-value">{t.status[activeVersion.status]}</span>
        </span>
      </div>
    </header>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="fui-label">{label}</span>
      <span className="fui-label opacity-40">//</span>
      <span className="fui-value">{value}</span>
    </span>
  );
}
