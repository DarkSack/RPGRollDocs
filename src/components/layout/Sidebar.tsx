import { nav } from "../../content/nav";

interface SidebarProps {
  current: string;
  onNavigate: (slug: string) => void;
  onLinkClick?: () => void;
}

export function Sidebar({ current, onNavigate, onLinkClick }: SidebarProps) {
  return (
    <nav className="space-y-6 px-4 py-6 text-sm">
      {nav.map((section) => (
        <div key={section.title}>
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {section.title}
          </p>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const active = item.slug === current;
              return (
                <li key={item.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(item.slug);
                      onLinkClick?.();
                    }}
                    className={
                      "block w-full rounded-lg px-3 py-1.5 text-left transition-colors " +
                      (active
                        ? "bg-violet-100 font-medium text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100")
                    }
                  >
                    {item.label}
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
