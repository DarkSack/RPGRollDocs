import type { ReactNode } from "react";
import type { IconProps } from "../icons/Icon";
import { useI18n } from "../../i18n";
import { sectionOf } from "../../content/nav";
import { localizedSectionLabel } from "../../i18n";
import { statusColor } from "./status";
import type { ReleaseStatus } from "../../content/site";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
  /** Ícono temático de la página (ej. el mismo que en la sidebar/grilla de la home). */
  icon?: (p: IconProps) => ReactNode;
  /** Texto pequeño arriba del título — ej. "Addon oficial", "Referencia". */
  eyebrow?: string;
  /** Slug de la página: si se pasa, el eyebrow sale de la sección del nav. */
  slug?: string;
  /** Chips de metadata: `PAPER 26.1.1`, `JAVA 25`, etc. */
  meta?: { label: string; value: string }[];
  /** Estado de madurez de lo que documenta la página. */
  status?: ReleaseStatus;
  /** Acciones a la derecha (instalación, repositorio…). */
  actions?: ReactNode;
}

/**
 * Cabecera de página.
 *
 * Deliberadamente chata: una línea de contexto, el título, una bajada y una
 * franja de metadata. Nada de hero — el contenido tiene que empezar arriba
 * del fold, que es todo el punto de una documentación.
 */
export function PageHeader({
  title,
  children,
  icon: Icon,
  eyebrow,
  slug,
  meta,
  status,
  actions,
}: PageHeaderProps) {
  const { t, locale } = useI18n();
  const section = slug ? sectionOf(slug) : undefined;
  const contextLabel =
    eyebrow ?? (section ? localizedSectionLabel(section.id, section.title, locale) : undefined);

  return (
    <header className="mb-10 border-b pb-6" style={{ borderColor: "var(--line)" }}>
      {contextLabel && <p className="fui-label mb-2.5">{contextLabel}</p>}

      <div className="flex items-start gap-3">
        {Icon && (
          <span
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border"
            style={{ borderColor: "var(--line-strong)", backgroundColor: "var(--ruby-soft)", color: "var(--ruby)" }}
          >
            <Icon size={17} />
          </span>
        )}
        <h1 className="text-[28px] font-bold leading-tight tracking-tight" style={{ color: "var(--text)" }}>
          {title}
        </h1>

        {status && (
          <span className="mt-2 flex shrink-0 items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: statusColor(status) }}
              aria-hidden="true"
            />
            <span className="fui-value">{t.status[status]}</span>
          </span>
        )}
      </div>

      {children && (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
          {children}
        </p>
      )}

      {(meta?.length || actions) && (
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          {meta?.map((item) => (
            <span key={item.label} className="flex items-center gap-1.5">
              <span className="fui-label">{item.label}</span>
              <span className="fui-label opacity-40">//</span>
              <span className="fui-value">{item.value}</span>
            </span>
          ))}
          {actions && <span className="ml-auto flex items-center gap-2">{actions}</span>}
        </div>
      )}
    </header>
  );
}
