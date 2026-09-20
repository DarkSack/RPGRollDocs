import type { ReactNode } from "react";

/**
 * Encabezado de sección con ancla.
 *
 * El h2 abre con una línea divisoria a todo el ancho: en páginas largas es lo
 * que permite ubicar dónde empieza cada bloque mientras se scrollea rápido.
 * El "#" aparece al hover y es un link real al ancla, que es lo que la gente
 * copia para compartir una sección puntual.
 */
export function SectionHeading({
  id,
  level = 2,
  children,
}: {
  id: string;
  level?: 2 | 3;
  children: ReactNode;
}) {
  const Tag = level === 2 ? "h2" : "h3";

  return (
    <Tag
      id={id}
      className={
        "group scroll-mt-28 font-semibold tracking-tight " +
        (level === 2 ? "mb-4 mt-12 border-t pt-6 text-[22px] leading-snug" : "mb-2 mt-8 text-[16px]")
      }
      style={{ color: "var(--text)", borderColor: level === 2 ? "var(--line)" : "transparent" }}
    >
      <a href={`#${id}`} className="no-prose no-underline" style={{ color: "inherit" }}>
        {children}
        <span
          className="ml-2 font-mono text-sm opacity-0 transition-opacity group-hover:opacity-100"
          style={{ color: "var(--ruby)" }}
          aria-hidden="true"
        >
          #
        </span>
      </a>
    </Tag>
  );
}
