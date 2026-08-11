import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Si se pasa, la card se vuelve clickeable (button) con hover/focus visibles. */
  onClick?: () => void;
}

export function Card({ children, className = "", onClick }: CardProps) {
  const classes =
    "rounded-xl border border-slate-200 bg-white p-5 shadow-soft transition-all " +
    "dark:border-slate-800 dark:bg-slate-900/40 " +
    (onClick
      ? "text-left hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-card dark:hover:border-violet-500/40 "
      : "") +
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
  const colsClass = cols === 4 ? "sm:grid-cols-2 xl:grid-cols-4" : cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return <div className={`grid grid-cols-1 gap-4 ${colsClass}`}>{children}</div>;
}
