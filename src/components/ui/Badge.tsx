import type { ReactNode } from "react";

type BadgeTone = "neutral" | "violet" | "green" | "amber" | "red" | "blue";

/**
 * Etiqueta de estado. Rectangular, monospace y con borde de 1px: se lee como
 * un dato del sistema, no como un sticker. El tono siempre significa algo
 * (estado, severidad, obligatoriedad) — no se usa de adorno.
 */
const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: "border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-400",
  violet: "border-violet-200 text-violet-700 dark:border-violet-500/30 dark:text-violet-300",
  green: "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300",
  amber: "border-amber-200 text-amber-700 dark:border-amber-500/30 dark:text-amber-300",
  red: "border-red-200 text-red-700 dark:border-red-500/30 dark:text-red-300",
  blue: "border-sky-200 text-sky-700 dark:border-sky-500/30 dark:text-sky-300",
};

const TONE_BG: Record<BadgeTone, string> = {
  neutral: "bg-slate-50 dark:bg-slate-900",
  violet: "bg-violet-50 dark:bg-violet-500/10",
  green: "bg-emerald-50 dark:bg-emerald-500/10",
  amber: "bg-amber-50 dark:bg-amber-500/10",
  red: "bg-red-50 dark:bg-red-500/10",
  blue: "bg-sky-50 dark:bg-sky-500/10",
};

const DOT_CLASSES: Record<BadgeTone, string> = {
  neutral: "bg-slate-400 dark:bg-slate-600",
  violet: "bg-violet-500",
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
  blue: "bg-sky-500",
};

export function Badge({
  children,
  tone = "neutral",
  dot = false,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  /** Punto de color a la izquierda — útil para estados (activo/inactivo, disponible/pendiente). */
  dot?: boolean;
}) {
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-sm border px-1.5 py-px font-mono text-[10px] font-medium uppercase tracking-wider " +
        TONE_CLASSES[tone] +
        " " +
        TONE_BG[tone]
      }
    >
      {dot && <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT_CLASSES[tone]}`} aria-hidden="true" />}
      {children}
    </span>
  );
}
