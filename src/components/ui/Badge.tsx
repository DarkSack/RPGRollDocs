import type { ReactNode } from "react";

type BadgeTone = "neutral" | "violet" | "green" | "amber" | "red" | "blue";

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  violet: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  red: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  blue: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
};

const DOT_CLASSES: Record<BadgeTone, string> = {
  neutral: "bg-slate-400 dark:bg-slate-500",
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
    <span className={"inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium " + TONE_CLASSES[tone]}>
      {dot && <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT_CLASSES[tone]}`} aria-hidden="true" />}
      {children}
    </span>
  );
}
