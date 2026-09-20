import type { ReactNode } from "react";
import { InfoIcon, LightbulbIcon, AlertTriangleIcon, AlertOctagonIcon, CheckCircleIcon } from "../icons/Icon";
import type { IconProps } from "../icons/Icon";

type CalloutTone = "info" | "tip" | "warning" | "danger" | "success";

/**
 * Aviso dentro del contenido.
 *
 * El peso visual lo carga una barra de 2px a la izquierda, no un fondo de
 * color saturado: el bloque sigue siendo legible como texto y no compite con
 * el contenido que lo rodea. El título va en monospace como etiqueta de tipo.
 */
const TONE_STYLES: Record<
  CalloutTone,
  { bar: string; text: string; icon: (p: IconProps) => ReactNode; label: string; tint: string }
> = {
  info: {
    bar: "border-l-sky-500",
    text: "text-sky-700 dark:text-sky-300",
    tint: "bg-sky-50/60 dark:bg-sky-500/[0.06]",
    label: "Nota",
    icon: InfoIcon,
  },
  tip: {
    bar: "border-l-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300",
    tint: "bg-emerald-50/60 dark:bg-emerald-500/[0.06]",
    label: "Tip",
    icon: LightbulbIcon,
  },
  success: {
    bar: "border-l-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300",
    tint: "bg-emerald-50/60 dark:bg-emerald-500/[0.06]",
    label: "Listo",
    icon: CheckCircleIcon,
  },
  warning: {
    bar: "border-l-amber-500",
    text: "text-amber-700 dark:text-amber-300",
    tint: "bg-amber-50/60 dark:bg-amber-500/[0.06]",
    label: "Cuidado",
    icon: AlertTriangleIcon,
  },
  danger: {
    bar: "border-l-red-500",
    text: "text-red-700 dark:text-red-300",
    tint: "bg-red-50/60 dark:bg-red-500/[0.06]",
    label: "Importante",
    icon: AlertOctagonIcon,
  },
};

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: CalloutTone;
  title?: string;
  children: ReactNode;
}) {
  const style = TONE_STYLES[tone];
  const Icon = style.icon;

  return (
    <div
      role="note"
      className={`my-5 border border-l-2 px-4 py-3 text-sm ${style.bar} ${style.tint}`}
      style={{ borderTopColor: "var(--line)", borderRightColor: "var(--line)", borderBottomColor: "var(--line)" }}
    >
      <p className={`mb-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider ${style.text}`}>
        <Icon size={13} className="shrink-0" />
        {title ?? style.label}
      </p>
      <div
        className="leading-relaxed [&_a]:underline [&_code]:rounded-sm [&_code]:border [&_code]:border-current/15 [&_code]:bg-black/[0.04] [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] dark:[&_code]:bg-white/[0.06]"
        style={{ color: "var(--text-dim)" }}
      >
        {children}
      </div>
    </div>
  );
}
