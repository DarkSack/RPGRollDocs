import { PageHeader, SectionHeading, Table, Thead, Th, Tr, Td, Badge, Callout, PrevNext } from "../components/ui";
import { integrations, nonIntegrations, addonDependencies, type Requirement } from "../content/integrations";
import { pageTitle } from "../content/nav";
import {
  useI18n,
  fill,
  localizedPageLabel,
  localizedIntegrationSummary,
  localizedIntegrationNote,
  localizedNonIntegration,
} from "../i18n";
import { PH_INT_COPY } from "./copy/placeholdersIntegrations";
import { PlugIcon } from "../components/icons/Icon";

const REQUIREMENT_TONE: Record<Requirement, "violet" | "neutral" | "green"> = {
  required: "violet",
  optional: "neutral",
  provided: "green",
};

/**
 * Integraciones con plugins de terceros + grafo interno de dependencias.
 *
 * Hasta ahora esta información estaba solo en la sección "Requisitos" de cada
 * addon, así que responder "¿necesito Vault?" obligaba a abrir 23 páginas.
 */
export function Integrations({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = PH_INT_COPY[locale].integrations;

  const reqLabel: Record<Requirement, string> = {
    required: c.reqRequired,
    optional: c.reqOptional,
    provided: c.reqProvided,
  };

  const label = (slug: string) => localizedPageLabel(slug, pageTitle(slug), locale);

  return (
    <>
      <PageHeader
        title={c.title}
        slug="integraciones"
        icon={PlugIcon}
        meta={[
          { label: c.metaIntegrations, value: String(integrations.length) },
          { label: c.metaHard, value: "1" },
        ]}
      >
        {c.intro}
      </PageHeader>

      <Callout tone="info" title={c.optionalTitle}>
        {fill(c.optionalBody, { protocol: <strong>{c.protocolStrong}</strong>, soft: <code>softdepend</code> })}
      </Callout>

      {integrations.map((integration) => (
        <div key={integration.id}>
          <SectionHeading id={integration.id}>{integration.name}</SectionHeading>
          <p className="flex flex-wrap items-center gap-2">
            <Badge tone={REQUIREMENT_TONE[integration.requirement]}>{reqLabel[integration.requirement]}</Badge>
          </p>
          <p>{localizedIntegrationSummary(integration.id, integration.summary, locale)}</p>
          <Table>
            <Thead>
              <Th>{c.thAddon}</Th>
              <Th>{c.thType}</Th>
              <Th>{c.thProvides}</Th>
            </Thead>
            <tbody>
              {integration.usedBy.map((use) => (
                <Tr key={use.slug}>
                  <Td>
                    <button type="button" className="underline" onClick={() => onNavigate(use.slug)}>
                      {label(use.slug)}
                    </button>
                  </Td>
                  <Td>
                    <Badge tone={REQUIREMENT_TONE[use.requirement]}>{reqLabel[use.requirement]}</Badge>
                  </Td>
                  <Td>{localizedIntegrationNote(integration.id, use.slug, use.note, locale)}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}

      <SectionHeading id="no-integrado">{c.notTitle}</SectionHeading>
      <p>
        {fill(c.notLead, { strong: <strong>{c.notStrong}</strong> })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thPlugin}</Th>
          <Th>{c.thWhyNot}</Th>
        </Thead>
        <tbody>
          {nonIntegrations.map((item) => (
            <Tr key={item.name}>
              <Td className="font-medium">{item.name}</Td>
              <Td>{localizedNonIntegration(item.name, item.reason, locale)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="grafo">{c.graphTitle}</SectionHeading>
      <p>
        {fill(c.graphLead, { file: <code>plugin.yml</code>, depend: <code>depend</code>, soft: <code>softdepend</code> })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thAddon}</Th>
          <Th>depend</Th>
          <Th>softdepend</Th>
        </Thead>
        <tbody>
          {addonDependencies.map((addon) => (
            <Tr key={addon.slug}>
              <Td>
                <button type="button" className="underline" onClick={() => onNavigate(addon.slug)}>
                  {label(addon.slug)}
                </button>
              </Td>
              <Td className="font-mono text-xs">{addon.hard.length > 0 ? addon.hard.join(", ") : "—"}</Td>
              <Td className="font-mono text-xs">{addon.soft.length > 0 ? addon.soft.join(", ") : "—"}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <PrevNext current="integraciones" onNavigate={onNavigate} />
    </>
  );
}
