import type { ReactNode } from "react";
import { PageHeader, SectionHeading, CodeBlock, Callout, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";
import { SYSTEM_META } from "../content/site";
import { useI18n, localizedPageLabel, type Locale } from "../i18n";
import { pageTitle } from "../content/nav";
import { QUICK_START_COPY } from "./copy/quickStart";
import { CompassIcon } from "../components/icons/Icon";

/**
 * Recorrido de puesta en marcha.
 *
 * El resto de la documentación está organizada por sistema, que sirve para
 * consultar pero no para empezar: alguien que llega por primera vez tiene que
 * deducir en qué orden leer. Esta página es el único lugar con un orden
 * impuesto, y cada paso delega en la página que tiene el detalle en vez de
 * duplicarlo.
 *
 * Es además la primera página traducida: el texto vive en copy/quickStart.ts
 * y acá solo queda la estructura. Ver ese archivo para el patrón.
 */
export function QuickStart({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { t, locale } = useI18n();
  const c = QUICK_START_COPY[locale];

  /** Link interno dentro de una oración. */
  const Go = ({ to, children }: { to: string; children: ReactNode }) => (
    <button type="button" className="underline" onClick={() => onNavigate(to)}>
      {children}
    </button>
  );

  return (
    <>
      <PageHeader
        title={c.title}
        slug="primeros-pasos"
        icon={CompassIcon}
        meta={[
          { label: c.metaSteps, value: "06" },
          { label: t.meta.platform, value: `${SYSTEM_META.platform} ${SYSTEM_META.paperApi}` },
          { label: t.meta.java, value: SYSTEM_META.java },
        ]}
      >
        {c.intro}
      </PageHeader>

      <Step n="01" id="requisitos" title={c.s1.title}>
        <p>{c.s1.lead}</p>
        <Table>
          <Thead>
            <Th>{c.s1.thComponent}</Th>
            <Th>{c.s1.thNeed}</Th>
            <Th>{c.s1.thCheck}</Th>
          </Thead>
          <tbody>
            <Tr>
              <Td>{c.s1.server}</Td>
              <Td className="font-mono text-xs">Paper {SYSTEM_META.paperApi}</Td>
              <Td>
                <code>/version</code> {c.s1.inConsole}
              </Td>
            </Tr>
            <Tr>
              <Td>{c.s1.java}</Td>
              <Td className="font-mono text-xs">{SYSTEM_META.java}</Td>
              <Td>
                <code>java -version</code>
              </Td>
            </Tr>
            <Tr>
              <Td>{c.s1.database}</Td>
              <Td className="font-mono text-xs">SQLite</Td>
              <Td>{c.s1.embedded}</Td>
            </Tr>
          </tbody>
        </Table>
        <p>
          {c.s1.optionalNote} <Go to="requisitos">{requisitosLabel(locale)}</Go>.
        </p>
      </Step>

      <Step n="02" id="instalacion" title={c.s2.title}>
        <p>
          {c.s2.lead1} <code>plugins/</code>. {c.s2.lead2}
        </p>
        <CodeBlock language="bash" filename="plugins/" code={`plugins/\n  RPGRoll-Lib.jar  # ${c.s2.libComment}\n  RPGRoll.jar      # ${c.s2.comment}`} />
        <Callout tone="tip" title={c.s2.calloutTitle}>
          {c.s2.calloutBody}
        </Callout>
      </Step>

      <Step n="03" id="primer-arranque" title={c.s3.title}>
        <p>{c.s3.lead}</p>
        <p>{c.s3.checksLead}</p>
        <Table>
          <Thead>
            <Th>{c.s3.thCheck}</Th>
            <Th>{c.s3.thExpect}</Th>
          </Thead>
          <tbody>
            <Tr>
              <Td className="font-mono text-xs">/plugins</Td>
              <Td>
                <code>RPGRoll</code> {c.s3.pluginsRow}
              </Td>
            </Tr>
            <Tr>
              <Td className="font-mono text-xs">/rpg</Td>
              <Td>{c.s3.helpRow}</Td>
            </Tr>
          </tbody>
        </Table>
        <Callout tone="warning" title={c.s3.calloutTitle}>
          {c.s3.calloutBody} <Go to="troubleshooting">Troubleshooting</Go>.
        </Callout>
      </Step>

      <Step n="04" id="configuracion" title={c.s4.title}>
        <p>{c.s4.lead}</p>
        <Table>
          <Thead>
            <Th>{c.s4.thFile}</Th>
            <Th>{c.s4.thControls}</Th>
          </Thead>
          <tbody>
            <Tr>
              <Td className="font-mono text-xs">plugins/RPGRoll/config.yml</Td>
              <Td>{c.s4.configRow}</Td>
            </Tr>
            <Tr>
              <Td className="font-mono text-xs">plugins/RPGRoll/config/database.yml</Td>
              <Td>{c.s4.databaseRow}</Td>
            </Tr>
            <Tr>
              <Td className="font-mono text-xs">plugins/RPGRoll/config/gameplay.yml</Td>
              <Td>{c.s4.gameplayRow}</Td>
            </Tr>
          </tbody>
        </Table>
        <p>{c.s4.keysLead}</p>
        <CodeBlock
          language="yaml"
          filename="plugins/RPGRoll/config/gameplay.yml"
          code={
            `experience:\n` +
            `  base_exp: 100      # ${c.s4.cBaseExp}\n` +
            `  max_level: 100     # ${c.s4.cMaxLevel}\n` +
            `\n` +
            `stats:\n` +
            `  base_value: 10     # ${c.s4.cBaseValue}\n` +
            `  max_value: 20      # ${c.s4.cMaxValue}`
          }
        />
        <p>
          {c.s4.reload1} <code>/rpg reload</code>. {c.s4.reload2}{" "}
          <Go to="configuracion">{configuracionLabel(locale)}</Go>.
        </p>
      </Step>

      <Step n="05" id="primer-personaje" title={c.s5.title}>
        <p>{c.s5.lead}</p>
        <Table>
          <Thead>
            <Th>{c.s5.thCommand}</Th>
            <Th>{c.s5.thDoes}</Th>
          </Thead>
          <tbody>
            <Tr>
              <Td className="font-mono text-xs">/rpg create</Td>
              <Td>{c.s5.create}</Td>
            </Tr>
            <Tr>
              <Td className="font-mono text-xs">/rpg stats</Td>
              <Td>{c.s5.stats}</Td>
            </Tr>
            <Tr>
              <Td className="font-mono text-xs">/rpg mystats</Td>
              <Td>{c.s5.mystats}</Td>
            </Tr>
            <Tr>
              <Td className="font-mono text-xs">/rpg skills</Td>
              <Td>{c.s5.skills}</Td>
            </Tr>
          </tbody>
        </Table>
        <p>
          {c.s5.adminLead1} <code>/rpg addxp &lt;jugador&gt; &lt;cantidad&gt;</code> {c.s5.adminLead2}{" "}
          <code>/rpg levelup</code> {c.s5.adminLead3} <code>/rpg allocate</code>:
        </p>
        <CodeBlock language="bash" showLineNumbers={false} code={"/rpg allocate fuerza 3"} />
        <Callout tone="success" title={c.s5.calloutTitle}>
          {c.s5.calloutBody}
        </Callout>
      </Step>

      <Step n="06" id="siguientes-pasos" title={c.s6.title} last>
        <p>{c.s6.lead}</p>
        <Table>
          <Thead>
            <Th>{c.s6.thWant}</Th>
            <Th>{c.s6.thGo}</Th>
          </Thead>
          <tbody>
            <Tr>
              <Td>{c.s6.content}</Td>
              <Td>
                <Go to="razas-clases">{razasLabel(locale)}</Go> — {c.s6.contentGo}{" "}
                <code>/rpg admincontent</code>
              </Td>
            </Tr>
            <Tr>
              <Td>{c.s6.addons}</Td>
              <Td>
                <Go to="integraciones">{integracionesLabel(locale)}</Go> — {c.s6.addonsGo}
              </Td>
            </Tr>
            <Tr>
              <Td>{c.s6.perms}</Td>
              <Td>
                <Go to="permisos">{permisosLabel(locale)}</Go>
              </Td>
            </Tr>
            <Tr>
              <Td>{c.s6.placeholders}</Td>
              <Td>
                <Go to="placeholders">Placeholders</Go>
              </Td>
            </Tr>
            <Tr>
              <Td>{c.s6.dev}</Td>
              <Td>
                <Go to="arquitectura">{arquitecturaLabel(locale)}</Go> {c.s6.devAnd}{" "}
                <Go to="api">{apiLabel(locale)}</Go>
              </Td>
            </Tr>
          </tbody>
        </Table>
      </Step>

      <PrevNext current="primeros-pasos" onNavigate={onNavigate} />
    </>
  );
}

/* Los nombres de las páginas destino salen del mismo mapa que usa la sidebar,
   para que un link dentro de una oración diga exactamente lo mismo que el
   ítem de navegación al que lleva. */
const label = (slug: string, locale: Locale) => localizedPageLabel(slug, pageTitle(slug), locale);
const requisitosLabel = (l: Locale) => label("requisitos", l);
const configuracionLabel = (l: Locale) => label("configuracion", l);
const razasLabel = (l: Locale) => label("razas-clases", l);
const integracionesLabel = (l: Locale) => label("integraciones", l);
const permisosLabel = (l: Locale) => label("permisos", l);
const arquitecturaLabel = (l: Locale) => label("arquitectura", l);
const apiLabel = (l: Locale) => label("api", l);

/**
 * Un paso del recorrido. El número va en un riel a la izquierda unido por una
 * línea vertical: deja claro que hay un orden, que es justamente lo que el
 * resto de la documentación no impone.
 */
function Step({
  n,
  id,
  title,
  children,
  last = false,
}: {
  n: string;
  id: string;
  title: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div className="relative pl-9 sm:pl-14">
      <span
        className="absolute left-0 top-9 flex h-6 w-6 items-center justify-center rounded-sm border font-mono text-[10px] font-semibold sm:h-7 sm:w-7 sm:text-[11px]"
        style={{ borderColor: "var(--line-strong)", backgroundColor: "var(--surface)", color: "var(--ruby)" }}
        aria-hidden="true"
      >
        {n}
      </span>
      {!last && (
        <span
          className="absolute bottom-0 left-[11px] top-[64px] w-px sm:left-[13px] sm:top-[68px]"
          style={{ backgroundColor: "var(--line)" }}
          aria-hidden="true"
        />
      )}
      <SectionHeading id={id}>{title}</SectionHeading>
      {children}
    </div>
  );
}
