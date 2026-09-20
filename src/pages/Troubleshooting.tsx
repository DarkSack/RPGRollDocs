import { useMemo, useState } from "react";
import { PageHeader, SectionHeading, Callout, Badge, PrevNext } from "../components/ui";
import { diagnostics, caveats } from "../content/troubleshooting";
import { pageTitle } from "../content/nav";
import { LifeBuoyIcon, AlertTriangleIcon, AlertOctagonIcon } from "../components/icons/Icon";

/**
 * Diagnóstico de problemas.
 *
 * Dos partes con orígenes distintos, a propósito:
 *
 * - `diagnostics`: síntoma → causa → solución, deducidos del grafo de
 *   dependencias declarado y de las integraciones documentadas.
 * - `caveats`: los avisos de tono warning/danger que ya vivían repartidos en
 *   las páginas. Son comportamientos reales que sorprenden, no errores.
 *
 * No hay logs simulados ni mensajes de error inventados: si el repo no
 * documenta el texto exacto que imprime el plugin, acá no aparece.
 */
export function Troubleshooting({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const [filter, setFilter] = useState<string>("todos");

  const pages = useMemo(() => [...new Set(caveats.map((c) => c.slug))].sort(), []);
  const visible = filter === "todos" ? caveats : caveats.filter((c) => c.slug === filter);

  return (
    <>
      <PageHeader
        title="Troubleshooting"
        slug="troubleshooting"
        icon={LifeBuoyIcon}
        meta={[
          { label: "Síntomas", value: String(diagnostics.length) },
          { label: "Comportamientos", value: String(caveats.length) },
        ]}
      >
        Qué revisar cuando algo no arranca o no hace lo esperado, y la lista de comportamientos documentados que
        suelen confundirse con errores.
      </PageHeader>

      <SectionHeading id="sintomas">Diagnóstico por síntoma</SectionHeading>
      <p>
        Cada entrada sale del grafo de dependencias declarado por los plugins y de las integraciones documentadas —
        no de errores hipotéticos.
      </p>

      <div className="my-5 space-y-3">
        {diagnostics.map((item) => (
          <details key={item.id} id={item.id} className="border" style={{ borderColor: "var(--line)" }}>
            <summary className="flex cursor-pointer list-none items-start gap-2.5 px-4 py-3">
              <AlertTriangleIcon size={14} className="mt-0.5 shrink-0" style={{ color: "var(--gold)" }} />
              <span className="text-[14px] font-medium" style={{ color: "var(--text)" }}>
                {item.symptom}
              </span>
            </summary>

            <div className="border-t px-4 py-3" style={{ borderColor: "var(--line)" }}>
              <p className="fui-label mb-2">Causas posibles</p>
              <ol className="mb-4 ml-4 list-decimal space-y-1.5 text-[13px]" style={{ color: "var(--text-dim)" }}>
                {item.causes.map((cause) => (
                  <li key={cause}>{cause}</li>
                ))}
              </ol>

              <p className="fui-label mb-2">Solución</p>
              <p className="mb-3 text-[13px]" style={{ color: "var(--text-dim)" }}>
                {item.fix}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <span className="fui-label">Ver</span>
                {item.slugs.map((slug) => (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => onNavigate(slug)}
                    className="rounded-sm border px-1.5 py-px font-mono text-[10px] uppercase tracking-wider"
                    style={{ borderColor: "var(--line)", color: "var(--text-dim)" }}
                  >
                    {pageTitle(slug)}
                  </button>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>

      <Callout tone="info" title="Antes que nada, mirá la consola del arranque">
        Cuando falta una dependencia dura, Bukkit nombra exactamente cuál al cargar los plugins. Eso resuelve la
        mayoría de los casos de &ldquo;el addon no aparece&rdquo; sin tener que revisar configuración.
      </Callout>

      <SectionHeading id="comportamientos">Comportamientos documentados</SectionHeading>
      <p>
        No son fallas: son decisiones de diseño o limitaciones conocidas que ya están explicadas en la página de
        cada sistema, reunidas acá para poder revisarlas de una. Cada una enlaza a su página de origen.
      </p>

      <div className="my-4 flex flex-wrap items-center gap-1.5">
        <span className="fui-label mr-1">Filtrar</span>
        <FilterChip label="Todos" active={filter === "todos"} onClick={() => setFilter("todos")} />
        {pages.map((slug) => (
          <FilterChip
            key={slug}
            label={pageTitle(slug)}
            active={filter === slug}
            onClick={() => setFilter(slug)}
          />
        ))}
      </div>

      <div className="space-y-2">
        {visible.map((caveat) => {
          const Icon = caveat.tone === "danger" ? AlertOctagonIcon : AlertTriangleIcon;
          const color = caveat.tone === "danger" ? "var(--ruby)" : "var(--gold)";
          return (
            <div
              key={`${caveat.slug}-${caveat.title}`}
              className="border border-l-2 px-4 py-3"
              style={{ borderColor: "var(--line)", borderLeftColor: color }}
            >
              <div className="mb-1.5 flex items-start gap-2">
                <Icon size={13} className="mt-0.5 shrink-0" style={{ color }} />
                <p className="flex-1 text-[14px] font-medium" style={{ color: "var(--text)" }}>
                  {caveat.title}
                </p>
                <button type="button" onClick={() => onNavigate(caveat.slug)} className="shrink-0">
                  <Badge>{pageTitle(caveat.slug)}</Badge>
                </button>
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                {caveat.body}
              </p>
            </div>
          );
        })}
      </div>

      <PrevNext current="troubleshooting" onNavigate={onNavigate} />
    </>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-colors"
      style={{
        borderColor: active ? "var(--ruby)" : "var(--line)",
        color: active ? "var(--ruby)" : "var(--text-faint)",
        backgroundColor: active ? "var(--ruby-soft)" : "transparent",
      }}
    >
      {label}
    </button>
  );
}
