import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={
        "rounded-xl border border-slate-200 bg-white p-5 shadow-sm " +
        "dark:border-slate-800 dark:bg-slate-900/40 " +
        className
      }
    >
      {children}
    </div>
  );
}

export function CardGrid({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 }) {
  return (
    <div className={`grid grid-cols-1 gap-4 ${cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>
      {children}
    </div>
  );
}
