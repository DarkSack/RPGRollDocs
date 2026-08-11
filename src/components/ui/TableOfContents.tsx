import { useEffect, useState } from "react";
import { ListIcon } from "../icons/Icon";

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Rail derecho "En esta página" — no requiere que cada page.tsx declare sus
 * headings a mano: los lee directo del DOM (h2/h3 con id dentro de
 * .prose-doc, que es exactamente lo que SectionHeading ya genera) después de
 * cada cambio de ruta, y resalta la sección visible con IntersectionObserver.
 */
export function TableOfContents({ route }: { route: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(".prose-doc h2[id], .prose-doc h3[id]"));
      setHeadings(
        nodes.map((el) => ({
          id: el.id,
          text: el.textContent?.replace(/#$/, "").trim() ?? "",
          level: el.tagName === "H3" ? 3 : 2,
        })),
      );
      setActiveId(nodes[0]?.id ?? null);
    });
    return () => cancelAnimationFrame(raf);
  }, [route]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="En esta página" className="space-y-3 text-sm">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        <ListIcon size={14} />
        En esta página
      </p>
      <ul className="space-y-0.5 border-l border-slate-200 dark:border-slate-800">
        {headings.map((h) => {
          const active = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={
                  "-ml-px block border-l-2 py-1 leading-snug transition-colors " +
                  (h.level === 3 ? "pl-7 text-[13px]" : "pl-4") +
                  " " +
                  (active
                    ? "border-violet-500 font-medium text-violet-600 dark:text-violet-400"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200")
                }
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
