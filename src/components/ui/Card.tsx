import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Si se pasa, la card se vuelve clickeable (button) con hover/focus visibles. */
  onClick?: () => void;
}

/**
 * Contenedor plano. Sin sombra, sin elevación al hover y sin esquinas
 * redondeadas grandes: en una consola una card es una celda delimitada, no un
 * objeto flotante. El hover solo sube el contraste del borde.
 */
export function Card({ children, className = "", onClick }: CardProps) {
  const classes =
    "border p-4 transition-colors border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40 " +
    (onClick ? "text-left hover:border-violet-400 dark:hover:border-violet-500/60 " : "") +
    className;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`group w-full ${classes}`}>
        {children}
      </button>
    );
  }

  return <div className={classes}>{children}</div>;
}

export function CardGrid({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const colsClass =
    cols === 4 ? "sm:grid-cols-2 xl:grid-cols-4" : cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return <div className={`my-5 grid grid-cols-1 gap-3 ${colsClass}`}>{children}</div>;
}
