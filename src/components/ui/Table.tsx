import type { ReactNode } from "react";

/**
 * Tabla de referencia densa.
 *
 * El caso real de estas tablas es escanear decenas de filas (permisos,
 * comandos, claves de config), así que: filas bajas, encabezado monospace
 * pegado arriba, zebra muy sutil y una línea de acento al hacer hover para no
 * perder el renglón. En móvil scrollea en horizontal dentro de su caja — nunca
 * rompe el viewport.
 */
export function Table({ children, zebra = true }: { children: ReactNode; zebra?: boolean }) {
  return (
    <div className="my-5 overflow-x-auto border border-slate-200 dark:border-slate-800">
      <table
        className={
          "w-full border-collapse text-left text-[13px] " +
          (zebra ? "[&_tbody_tr:nth-child(even)]:bg-slate-50/60 dark:[&_tbody_tr:nth-child(even)]:bg-slate-900/40" : "")
        }
      >
        {children}
      </table>
    </div>
  );
}

export function Thead({ children }: { children: ReactNode }) {
  return (
    <thead
      className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
    >
      <tr>{children}</tr>
    </thead>
  );
}

export function Th({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <th className={`px-3 py-2 font-medium ${className}`}>{children}</th>;
}

export function Tr({ children }: { children: ReactNode }) {
  return (
    <tr className="border-t border-slate-200 transition-colors hover:bg-violet-50/50 dark:border-slate-800 dark:hover:bg-violet-500/[0.07]">
      {children}
    </tr>
  );
}

export function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-3 py-2 align-top text-slate-600 dark:text-slate-300 ${className}`}>{children}</td>;
}
