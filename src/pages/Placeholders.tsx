import { useMemo, useState } from "react";
import { PageHeader, SectionHeading, Table, Thead, Th, Tr, Td, Callout, CopyButton, PrevNext } from "../components/ui";
import { placeholders, placeholderExpansions } from "../content/placeholders";
import { pageTitle } from "../content/nav";
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
        title="Placeholders"
        slug="placeholders"
        icon={BracesIcon}
        meta={[
          { label: "Placeholders", value: String(placeholders.length) },
          { label: "Expansiones", value: String(placeholderExpansions.length) },
          { label: "Requiere", value: "PlaceholderAPI" },
        ]}
      >
        Todos los placeholders que registra el ecosistema, con la expansión que los expone y el addon que hay que
        tener instalado.
      </PageHeader>

      <Callout tone="info" title="PlaceholderAPI es opcional">
        Ningún addon lo exige. Sin PlaceholderAPI instalado todo sigue funcionando: simplemente no se registra
        ninguna expansión y los tokens se muestran literales en los plugins que los usen. Cada expansión la registra
        su addon, así que <code>%rpgrollguilds_…%</code> solo existe si RPGRoll-Guilds está instalado.
      </Callout>

      <SectionHeading id="buscar">Buscar</SectionHeading>
      <label className="relative mb-4 block max-w-md">
        <span className="sr-only">Filtrar placeholders</span>
        <SearchIcon
          size={14}
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2"
          style={{ color: "var(--text-faint)" }}
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="nivel, guild, balance, helditem…"
          className="w-full rounded-sm border py-2 pl-8 pr-3 text-[13px] outline-none"
          style={{ borderColor: "var(--line)", backgroundColor: "var(--surface-2)", color: "var(--text)" }}
        />
      </label>
      <p className="fui-value">
        {shown} / {placeholders.length}
      </p>

      {groups.length === 0 && (
        <p className="py-10 text-center text-sm" style={{ color: "var(--text-faint)" }}>
          Sin coincidencias para &ldquo;{query}&rdquo;.
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
              La registra{" "}
              <button type="button" className="underline" onClick={() => onNavigate(slug)}>
                {pageTitle(slug)}
              </button>
              .
            </p>
            <Table>
              <Thead>
                <Th>Placeholder</Th>
                <Th>Devuelve</Th>
                <Th className="w-16">
                  <span className="sr-only">Copiar</span>
                </Th>
              </Thead>
              <tbody>
                {group.rows.map((row) => (
                  <Tr key={row.name}>
                    <Td className="font-mono text-xs">{row.name}</Td>
                    <Td>{row.description}</Td>
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

      <Callout tone="tip" title="Los argumentos entre <> se reemplazan">
        Un token como <code>{"%rpgroll_job_<id>_level%"}</code> espera el id del contenido en esa posición:{" "}
        <code>%rpgroll_job_minero_level%</code>. El botón de copiar entrega el token con el argumento tal cual, para
        que lo sustituyas.
      </Callout>

      <PrevNext current="placeholders" onNavigate={onNavigate} />
    </>
  );
}
