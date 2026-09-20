import { useMemo, useState } from "react";
import { nav } from "../../content/nav";
import { addonMeta, DefaultNavIcon } from "../../content/addons";
import { useI18n, localizedPageLabel, localizedSectionLabel } from "../../i18n";
import { SearchIcon } from "../icons/Icon";

interface SidebarProps {
  current: string;
  onNavigate: (slug: string) => void;
  onLinkClick?: () => void;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/**
 * Navegación lateral.
 *
 * Con 40 páginas, la sidebar entera no entra en pantalla: el filtro de arriba
 * es la forma rápida de llegar sin abrir el palette ni scrollear. Filtra por
 * etiqueta traducida y también por slug, que es lo que alguien recuerda
 * cuando viene de una URL.
 */
export function Sidebar({ current, onNavigate, onLinkClick }: SidebarProps) {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState("");

  const sections = useMemo(() => {
    const q = normalize(filter.trim());
    return nav
      .map((section) => ({
        ...section,
        items: q
          ? section.items.filter(
              (item) =>
                normalize(localizedPageLabel(item.slug, item.label, locale)).includes(q) ||
                normalize(item.slug).includes(q),
            )
          : section.items,
      }))
      .filter((section) => section.items.length > 0);
  }, [filter, locale]);

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 px-3 pb-2 pt-3" style={{ backgroundColor: "var(--bg)" }}>
        <label className="relative block">
          <span className="sr-only">{t.nav.filter}</span>
          <SearchIcon
            size={13}
            className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-faint)" }}
          />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={t.nav.filter}
            className="w-full rounded-sm border py-1.5 pl-7 pr-2 text-[12px] outline-none"
            style={{ borderColor: "var(--line)", backgroundColor: "var(--surface-2)", color: "var(--text)" }}
          />
        </label>
      </div>

      <nav aria-label={t.nav.main} className="flex-1 px-3 pb-10">
        {sections.length === 0 && (
          <p className="px-2 py-6 text-center text-[12px]" style={{ color: "var(--text-faint)" }}>
            {t.nav.noMatches}
          </p>
        )}

        {sections.map((section) => (
          <div key={section.id} className="mb-5">
            <div className="mb-1.5 flex items-baseline gap-2 px-2">
              <span className="fui-label">{localizedSectionLabel(section.id, section.title, locale)}</span>
              <span className="fui-label ml-auto opacity-50">{String(section.items.length).padStart(2, "0")}</span>
            </div>

            <ul style={{ borderLeft: "1px solid var(--line)" }}>
              {section.items.map((item) => {
                const active = item.slug === current;
                const Icon = addonMeta(item.slug)?.icon ?? DefaultNavIcon;
                return (
                  <li key={item.slug}>
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate(item.slug);
                        onLinkClick?.();
                      }}
                      aria-current={active ? "page" : undefined}
                      className="-ml-px flex w-full items-center gap-2 border-l-2 py-[5px] pl-2.5 pr-2 text-left text-[13px] leading-tight transition-colors"
                      style={{
                        borderLeftColor: active ? "var(--ruby)" : "transparent",
                        backgroundColor: active ? "var(--surface-2)" : "transparent",
                        color: active ? "var(--text)" : "var(--text-dim)",
                        fontWeight: active ? 500 : 400,
                      }}
                    >
                      <Icon
                        size={13}
                        className="shrink-0"
                        style={{ color: active ? "var(--ruby)" : "var(--text-faint)" }}
                      />
                      <span className="truncate">{localizedPageLabel(item.slug, item.label, locale)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
