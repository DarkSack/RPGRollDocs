import { useEffect, useState } from "react";
import { useI18n } from "../../i18n";
import { DOCS_REPO_URL, DOCS_SOURCE_PATH, ISSUES_URL } from "../../content/site";
import { pageFile } from "../../content/pageFiles";
import { pageTitle } from "../../content/nav";
import { ThumbsUpIcon, ThumbsDownIcon, PencilIcon, AlertOctagonIcon, ExternalLinkIcon } from "../icons/Icon";

/**
 * Pie de artículo: señal de utilidad + accesos para corregir la página.
 *
 * El sitio es estático y no tiene backend, así que el voto NO se envía a
 * ningún lado: es un disparador local que ofrece el camino que sí sirve
 * (abrir un issue con la página ya identificada). Prometer telemetría que no
 * existe sería peor que no preguntar.
 */
export function PageFooter({ slug }: { slug: string }) {
  const { t } = useI18n();
  const [vote, setVote] = useState<"yes" | "no" | null>(null);

  useEffect(() => setVote(null), [slug]);

  const file = pageFile(slug);
  const editUrl = file ? `${DOCS_REPO_URL}/edit/main/${DOCS_SOURCE_PATH}/${file}` : null;
  const issueUrl = `${ISSUES_URL}/new?title=${encodeURIComponent(`docs(${slug}): `)}&body=${encodeURIComponent(
    `Página: ${pageTitle(slug)} (#page/${slug})\n\n`,
  )}`;

  return (
    <footer className="mt-16 border-t pt-5" style={{ borderColor: "var(--line)" }}>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-2.5">
          <span className="fui-label">{t.feedback.question}</span>
          <div className="flex items-center gap-1.5">
            <VoteButton
              active={vote === "yes"}
              onClick={() => setVote("yes")}
              label={t.feedback.yes}
              icon={<ThumbsUpIcon size={12} />}
            />
            <VoteButton
              active={vote === "no"}
              onClick={() => setVote("no")}
              label={t.feedback.no}
              icon={<ThumbsDownIcon size={12} />}
            />
          </div>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-2">
          {editUrl && (
            <FooterLink href={editUrl} icon={<PencilIcon size={12} />}>
              {t.page.editOnGithub}
            </FooterLink>
          )}
          <FooterLink href={issueUrl} icon={<AlertOctagonIcon size={12} />}>
            {t.page.reportIssue}
          </FooterLink>
        </div>
      </div>

      {vote && (
        <p className="mt-3 flex flex-wrap items-center gap-2 text-[13px]" style={{ color: "var(--text-faint)" }}>
          <span>{t.feedback.thanks}</span>
          <span>{vote === "no" ? t.feedback.followUpNo : t.feedback.followUpYes}</span>
          {vote === "no" && (
            <a
              href={issueUrl}
              target="_blank"
              rel="noreferrer"
              className="no-prose inline-flex items-center gap-1 underline"
              style={{ color: "var(--ruby)" }}
            >
              {t.feedback.openIssue}
              <ExternalLinkIcon size={11} />
            </a>
          )}
        </p>
      )}
    </footer>
  );
}

function VoteButton({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors"
      style={{
        borderColor: active ? "var(--ruby)" : "var(--line)",
        color: active ? "var(--ruby)" : "var(--text-dim)",
        backgroundColor: active ? "var(--ruby-soft)" : "transparent",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function FooterLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="no-prose inline-flex items-center gap-1.5 text-[12px] no-underline transition-colors"
      style={{ color: "var(--text-faint)" }}
    >
      {icon}
      {children}
    </a>
  );
}
