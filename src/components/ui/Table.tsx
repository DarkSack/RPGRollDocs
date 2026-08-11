import type { ReactNode } from "react";

export function Table({ children, zebra = true }: { children: ReactNode; zebra?: boolean }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-soft dark:border-slate-800">
      <table
        className={
          "w-full border-collapse text-left text-sm " +
          (zebra ? "[&_tbody_tr:nth-child(even)]:bg-slate-50/70 dark:[&_tbody_tr:nth-child(even)]:bg-slate-900/40" : "")
        }
      >
        {children}
      </table>
    </div>
  );
}

export function Thead({ children }: { children: ReactNode }) {
  return (
    <thead className="sticky top-0 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-400">
      <tr>{children}</tr>
    </thead>
  );
}

export function Th({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <th className={`px-4 py-3 font-semibold ${className}`}>{children}</th>;
}

export function Tr({ children }: { children: ReactNode }) {
  return (
    <tr className="border-t border-slate-200 transition-colors hover:bg-violet-50/60 dark:border-slate-800 dark:hover:bg-violet-500/[0.06]">
      {children}
    </tr>
  );
}

export function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top text-slate-600 dark:text-slate-300 ${className}`}>{children}</td>;
}
