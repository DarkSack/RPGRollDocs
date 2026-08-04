import type { ReactNode } from "react";

export function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="mb-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
      {children && <p className="mt-3 text-lg leading-relaxed text-slate-500 dark:text-slate-400">{children}</p>}
    </header>
  );
}
