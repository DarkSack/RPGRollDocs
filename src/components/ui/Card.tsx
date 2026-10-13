import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Si se pasa, la card se vuelve clickeable (button) con hover/focus visibles. */
  onClick?: () => void;
  /** Si se pasa, la card es un enlace a esa ruta interna. Tiene prioridad sobre `onClick`. */
  href?: string;
}

/**
 * Contenedor plano. Sin sombra, sin elevación al hover y sin esquinas
 * redondeadas grandes: en una consola una card es una celda delimitada, no un
 * objeto flotante. El hover solo sube el contraste del borde.
 */
export function Card({ children, className = "", onClick, href }: CardProps) {
  const classes =
    "border p-4 transition-colors border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40 " +
    (onClick || href ? "text-left hover:border-violet-400 dark:hover:border-violet-500/60 " : "") +
    className;

  // Un enlace de verdad cuando la tarjeta lleva a otra página: así existe en el
  // HTML para los buscadores y se puede abrir en una pestaña nueva.
  if (href) {
    return (
      <a href={href} className={`group block w-full no-underline ${classes}`}>
        {children}
      </a>
    );
  }

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
