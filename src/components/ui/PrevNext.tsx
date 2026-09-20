import { allSlugs, pageTitle } from "../../content/nav";
import { useI18n, localizedPageLabel } from "../../i18n";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons/Icon";

export function PrevNext({ current, onNavigate }: { current: string; onNavigate: (slug: string) => void }) {
  const { t, locale } = useI18n();
  const index = allSlugs.indexOf(current);
  const prev = index > 0 ? allSlugs[index - 1] : null;
  const next = index >= 0 && index < allSlugs.length - 1 ? allSlugs[index + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="mt-14 grid grid-cols-2 gap-3 border-t pt-5" style={{ borderColor: "var(--line)" }}>
      {prev ? (
        <PrevNextLink
          slug={prev}
          label={t.page.prev}
          direction="prev"
          locale={locale}
          onNavigate={onNavigate}
        />
      ) : (
        <span />
      )}

      {next ? (
        <PrevNextLink
          slug={next}
          label={t.page.next}
          direction="next"
          locale={locale}
          onNavigate={onNavigate}
        />
      ) : (
        <span />
      )}
    </nav>
  );
}

function PrevNextLink({
  slug,
  label,
  direction,
  locale,
  onNavigate,
}: {
  slug: string;
  label: string;
  direction: "prev" | "next";
  locale: Parameters<typeof localizedPageLabel>[2];
  onNavigate: (slug: string) => void;
}) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={() => onNavigate(slug)}
      className={
        "group flex items-center gap-2.5 border px-3 py-2.5 transition-colors " +
        (isNext ? "justify-end text-right" : "text-left")
      }
      style={{ borderColor: "var(--line)" }}
    >
      {!isNext && <ArrowLeftIcon size={14} className="shrink-0" style={{ color: "var(--text-faint)" }} />}
      <span className="min-w-0">
        <span className="fui-label block">{label}</span>
        <span className="mt-0.5 block truncate text-[13px] font-medium" style={{ color: "var(--text)" }}>
          {localizedPageLabel(slug, pageTitle(slug), locale)}
        </span>
      </span>
      {isNext && <ArrowRightIcon size={14} className="shrink-0" style={{ color: "var(--text-faint)" }} />}
    </button>
  );
}
