import { nav } from "../../content/nav";
import { addonMeta, DefaultNavIcon } from "../../content/addons";

interface SidebarProps {
  current: string;
  onNavigate: (slug: string) => void;
  onLinkClick?: () => void;
}

export function Sidebar({ current, onNavigate, onLinkClick }: SidebarProps) {
  return (
    <nav aria-label="Navegación principal" className="space-y-6 px-4 py-6 text-sm">
      {nav.map((section) => (
        <div key={section.title}>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {section.title}
          </p>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const active = item.slug === current;
              const Icon = addonMeta(item.slug)?.icon ?? DefaultNavIcon;
              return (
                <li key={item.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(item.slug);
                      onLinkClick?.();
                    }}
                    aria-current={active ? "page" : undefined}
                    className={
                      "flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-left transition-colors " +
                      (active
                        ? "bg-violet-100 font-medium text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100")
                    }
                  >
                    <Icon size={15} className={active ? "shrink-0" : "shrink-0 text-slate-400 dark:text-slate-500"} />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
