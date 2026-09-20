import { useEffect, useState } from "react";
import { useI18n } from "../../i18n";
import { ChevronDownIcon, ArrowUpIcon } from "../icons/Icon";

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
 *
 * `variant="collapsible"` es la versión para pantallas angostas: mismo índice,
 * plegado dentro de un <details> arriba del contenido.
 */
export function TableOfContents({ route, variant = "rail" }: { route: string; variant?: "rail" | "collapsible" }) {
  const { t } = useI18n();
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
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const list = (
    <ul style={{ borderLeft: "1px solid var(--line)" }}>
      {headings.map((h) => {
        const active = h.id === activeId;
        return (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active ? "location" : undefined}
              className={
                "no-prose -ml-px block border-l-2 py-1 leading-snug no-underline transition-colors " +
                (h.level === 3 ? "pl-6 text-[12px]" : "pl-3 text-[13px]")
              }
              style={{
                borderLeftColor: active ? "var(--ruby)" : "transparent",
                color: active ? "var(--ruby)" : "var(--text-faint)",
                fontWeight: active ? 500 : 400,
              }}
            >
              {h.text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  if (variant === "collapsible") {
    return (
      <details className="mb-8 rounded-sm border xl:hidden" style={{ borderColor: "var(--line)" }}>
        <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2">
          <ChevronDownIcon size={13} style={{ color: "var(--text-faint)" }} />
          <span className="fui-label">{t.toc.title}</span>
          <span className="fui-label ml-auto opacity-50">{String(headings.length).padStart(2, "0")}</span>
        </summary>
        <nav aria-label={t.toc.label} className="px-3 pb-3 pl-4">
          {list}
        </nav>
      </details>
    );
  }

  return (
    <nav aria-label={t.toc.label} className="space-y-2">
      <p className="fui-label pl-3">{t.toc.title}</p>
      {list}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-1.5 pl-3 pt-2 fui-label transition-colors hover:opacity-100"
      >
        <ArrowUpIcon size={11} />
        {t.toc.top}
      </button>
    </nav>
  );
}
