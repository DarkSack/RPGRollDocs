export function Kbd({ children }: { children: string }) {
  return (
    <code className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
      {children}
    </code>
  );
}
