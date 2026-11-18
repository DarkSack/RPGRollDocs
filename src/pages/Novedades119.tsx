import type { ReactNode } from "react";
import { Badge, CodeBlock, SectionHeading } from "../components/ui";
import { useI18n } from "../i18n";
import { CODE, NOVEDADES_119, type Novedades119Page } from "./copy/novedades119";

/** Pinta `texto` como código y **texto** en negrita; el resto, tal cual. */
function inline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
    if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    return part;
  });
}

/** Secciones con lo nuevo de la 1.1.9 para una página; se pone justo antes de PrevNext. */
export function Novedades119({ page }: { page: Novedades119Page }) {
  const { locale } = useI18n();
  const c = NOVEDADES_119[locale];
  return (
    <>
      {c.pages[page].map((n) => (
        <section key={n.id}>
          <SectionHeading id={n.id}>
            {n.title} <Badge tone="violet">{c.badge}</Badge>
          </SectionHeading>
          {n.body.map((p, i) => (
            <p key={i}>{inline(p)}</p>
          ))}
          {n.code && <CodeBlock code={CODE[n.code].code} language="yaml" filename={CODE[n.code].filename} />}
        </section>
      ))}
    </>
  );
}
