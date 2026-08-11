import type { ReactNode } from "react";
import type { IconProps } from "../icons/Icon";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
  /** Ícono temático de la página (ej. el mismo que en la sidebar/grilla de la home). */
  icon?: (p: IconProps) => ReactNode;
  /** Texto pequeño arriba del título — ej. "Addon oficial", "Referencia". */
  eyebrow?: string;
}

export function PageHeader({ title, children, icon: Icon, eyebrow }: PageHeaderProps) {
  return (
    <header className="mb-10 border-b border-slate-100 pb-8 dark:border-slate-800/60">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-500 dark:text-violet-400">
          {eyebrow}
        </p>
      )}
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            <Icon size={20} />
          </span>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
      </div>
      {children && <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">{children}</p>}
    </header>
  );
}
