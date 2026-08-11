import { allSlugs, pageTitle } from "../../content/nav";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons/Icon";

export function PrevNext({ current, onNavigate }: { current: string; onNavigate: (slug: string) => void }) {
  const index = allSlugs.indexOf(current);
  const prev = index > 0 ? allSlugs[index - 1] : null;
  const next = index >= 0 && index < allSlugs.length - 1 ? allSlugs[index + 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="mt-16 grid grid-cols-2 gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
      {prev ? (
        <button
          type="button"
          onClick={() => onNavigate(prev)}
          className="group flex items-center gap-2.5 rounded-xl border border-slate-200 px-4 py-3 text-left transition-colors hover:border-violet-300 hover:bg-violet-50/50 dark:border-slate-800 dark:hover:border-violet-500/40 dark:hover:bg-violet-500/[0.06]"
        >
          <ArrowLeftIcon size={16} className="shrink-0 text-slate-300 transition-colors group-hover:text-violet-500 dark:text-slate-600" />
          <span className="min-w-0">
            <span className="block text-xs text-slate-400 dark:text-slate-500">Anterior</span>
            <span className="block truncate font-medium text-slate-700 group-hover:text-violet-700 dark:text-slate-200 dark:group-hover:text-violet-300">
              {pageTitle(prev)}
            </span>
          </span>
        </button>
      ) : (
        <span />
      )}

      {next ? (
        <button
          type="button"
          onClick={() => onNavigate(next)}
          className="group flex items-center justify-end gap-2.5 rounded-xl border border-slate-200 px-4 py-3 text-right transition-colors hover:border-violet-300 hover:bg-violet-50/50 dark:border-slate-800 dark:hover:border-violet-500/40 dark:hover:bg-violet-500/[0.06]"
        >
          <span className="min-w-0">
            <span className="block text-xs text-slate-400 dark:text-slate-500">Siguiente</span>
            <span className="block truncate font-medium text-slate-700 group-hover:text-violet-700 dark:text-slate-200 dark:group-hover:text-violet-300">
              {pageTitle(next)}
            </span>
          </span>
          <ArrowRightIcon size={16} className="shrink-0 text-slate-300 transition-colors group-hover:text-violet-500 dark:text-slate-600" />
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}
