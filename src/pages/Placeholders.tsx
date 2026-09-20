import { useMemo, useState } from "react";
import { PageHeader, SectionHeading, Table, Thead, Th, Tr, Td, Callout, CopyButton, PrevNext } from "../components/ui";
import { placeholders, placeholderExpansions } from "../content/placeholders";
import { pageTitle } from "../content/nav";
import { useI18n, fill, localizedPlaceholder, localizedPageLabel } from "../i18n";
import { PH_INT_COPY } from "./copy/placeholdersIntegrations";
import { BracesIcon, SearchIcon } from "../components/icons/Icon";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/**
 * Registro completo de placeholders de PlaceholderAPI.
 *
 * El caso de uso es "sé el nombre a medias y no sé qué addon lo expone", así
 * que la página es un buscador sobre una tabla densa, no prosa: filtro arriba,
 * agrupación por expansión, y botón de copiar en cada fila porque el
 * placeholder casi siempre se va a pegar en otro plugin.
 */
export function Placeholders({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = PH_INT_COPY[locale].placeholders;
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = normalize(query.trim());
    return placeholderExpansions
      .map((expansion) => ({
        expansion,
        rows: placeholders.filter(
          (p) =>
            p.expansion === expansion &&
            (!q || normalize(p.name).includes(q) || normalize(p.description).includes(q)),
        ),
      }))
      .filter((group) => group.rows.length > 0);
  }, [query]);

  const shown = groups.reduce((total, group) => total + group.rows.length, 0);

  return (
    <>
      <PageHeader
        title={c.title}
        slug="placeholders"
        icon={BracesIcon}
        meta={[
          { label: c.metaPlaceholders, value: String(placeholders.length) },
          { label: c.metaExpansions, value: String(placeholderExpansions.length) },
          { label: c.metaRequires, value: "PlaceholderAPI" },
        ]}
      >
        {c.intro}
      </PageHeader>

      <Callout tone="info" title={c.calloutTitle}>
        {fill(c.calloutBody, { example: <code>%rpgrollguilds_…%</code> })}
      </Callout>

      <SectionHeading id="buscar">{c.searchTitle}</SectionHeading>
      <label className="relative mb-4 block max-w-md">
        <span className="sr-only">{c.searchLabel}</span>
        <SearchIcon
          size={14}
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2"
          style={{ color: "var(--text-faint)" }}
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={c.searchPlaceholder}
          className="w-full rounded-sm border py-2 pl-8 pr-3 text-[13px] outline-none"
          style={{ borderColor: "var(--line)", backgroundColor: "var(--surface-2)", color: "var(--text)" }}
        />
      </label>
      <p className="fui-value">
        {shown} / {placeholders.length}
      </p>

      {groups.length === 0 && (
        <p className="py-10 text-center text-sm" style={{ color: "var(--text-faint)" }}>
          {c.noResults} &ldquo;{query}&rdquo;.
        </p>
      )}

      {groups.map((group) => {
        const slug = group.rows[0].slug;
        return (
          <div key={group.expansion}>
            <SectionHeading id={group.expansion} level={3}>
              {group.expansion}
            </SectionHeading>
            <p>
              {c.registeredBy}{" "}
              <button type="button" className="underline" onClick={() => onNavigate(slug)}>
                {localizedPageLabel(slug, pageTitle(slug), locale)}
              </button>
              .
            </p>
            <Table>
              <Thead>
                <Th>{c.thPlaceholder}</Th>
                <Th>{c.thReturns}</Th>
                <Th className="w-16">
                  <span className="sr-only">{c.thCopy}</span>
                </Th>
              </Thead>
              <tbody>
                {group.rows.map((row) => (
                  <Tr key={row.name}>
                    <Td className="font-mono text-xs">{row.name}</Td>
                    <Td>{localizedPlaceholder(row.name, row.description, locale)}</Td>
                    <Td>
                      <CopyButton text={row.name} />
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </div>
        );
      })}

      <Callout tone="tip" title={c.argsTitle}>
        {fill(c.argsBody, {
          token: <code>{"%rpgroll_job_<id>_level%"}</code>,
          example: <code>%rpgroll_job_minero_level%</code>,
        })}
      </Callout>

      <PrevNext current="placeholders" onNavigate={onNavigate} />
    </>
  );
}
