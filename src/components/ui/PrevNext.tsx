import { allSlugs, pageTitle } from "../../content/nav";

export function PrevNext({ current, onNavigate }: { current: string; onNavigate: (slug: string) => void }) {
  const index = allSlugs.indexOf(current);
  const prev = index > 0 ? allSlugs[index - 1] : null;
  const next = index >= 0 && index < allSlugs.length - 1 ? allSlugs[index + 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="mt-16 flex items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
      {prev ? (
        <button
          type="button"
          onClick={() => onNavigate(prev)}
          className="group flex flex-col items-start rounded-lg px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <span className="text-xs text-slate-400">← Anterior</span>
          <span className="font-medium text-slate-700 group-hover:text-violet-600 dark:text-slate-200 dark:group-hover:text-violet-400">
            {pageTitle(prev)}
          </span>
        </button>
      ) : (
        <span />
      )}

      {next && (
        <button
          type="button"
          onClick={() => onNavigate(next)}
          className="group flex flex-col items-end rounded-lg px-3 py-2 text-right hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <span className="text-xs text-slate-400">Siguiente →</span>
          <span className="font-medium text-slate-700 group-hover:text-violet-600 dark:text-slate-200 dark:group-hover:text-violet-400">
            {pageTitle(next)}
          </span>
        </button>
      )}
    </div>
  );
}
