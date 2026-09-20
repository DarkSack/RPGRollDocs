import { PageHeader, SectionHeading, Table, Thead, Th, Tr, Td, Badge, Callout, PrevNext } from "../components/ui";
import { integrations, nonIntegrations, addonDependencies, type Requirement } from "../content/integrations";
import { pageTitle } from "../content/nav";
import { PlugIcon } from "../components/icons/Icon";

const REQUIREMENT_BADGE: Record<Requirement, { tone: "violet" | "neutral" | "green"; label: string }> = {
  required: { tone: "violet", label: "requerido" },
  optional: { tone: "neutral", label: "opcional" },
  provided: { tone: "green", label: "lo provee" },
};

/**
 * Integraciones con plugins de terceros + grafo interno de dependencias.
 *
 * Hasta ahora esta información estaba solo en la sección "Requisitos" de cada
 * addon, así que responder "¿necesito Vault?" obligaba a abrir 23 páginas.
 */
export function Integrations({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader
        title="Integraciones"
        slug="integraciones"
        icon={PlugIcon}
        meta={[
          { label: "Integraciones", value: String(integrations.length) },
          { label: "Dep. duras de terceros", value: "1" },
        ]}
      >
        Qué plugins de terceros usa el ecosistema, cuáles son obligatorios, y qué deja de funcionar exactamente si
        no están instalados.
      </PageHeader>

      <Callout tone="info" title="Casi todo es opcional">
        Salvo <strong>ProtocolLib en RPGRoll-NPCs</strong>, todas las dependencias de terceros son{" "}
        <code>softdepend</code>: el addon carga igual y solo se apaga la función concreta que necesitaba ese plugin.
        Ningún addon obliga a instalar Vault ni PlaceholderAPI.
      </Callout>

      {integrations.map((integration) => (
        <div key={integration.id}>
          <SectionHeading id={integration.id}>{integration.name}</SectionHeading>
          <p className="flex flex-wrap items-center gap-2">
            <Badge tone={REQUIREMENT_BADGE[integration.requirement].tone}>
              {REQUIREMENT_BADGE[integration.requirement].label}
            </Badge>
          </p>
          <p>{integration.summary}</p>
          <Table>
            <Thead>
              <Th>Addon</Th>
              <Th>Tipo</Th>
              <Th>Qué aporta</Th>
            </Thead>
            <tbody>
              {integration.usedBy.map((use) => (
                <Tr key={use.slug}>
                  <Td>
                    <button type="button" className="underline" onClick={() => onNavigate(use.slug)}>
                      {pageTitle(use.slug)}
                    </button>
                  </Td>
                  <Td>
                    <Badge tone={REQUIREMENT_BADGE[use.requirement].tone}>
                      {REQUIREMENT_BADGE[use.requirement].label}
                    </Badge>
                  </Td>
                  <Td>{use.note}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}

      <SectionHeading id="no-integrado">Lo que NO integra</SectionHeading>
      <p>
        Estos plugins se dan por supuestos con frecuencia. El ecosistema implementa esa funcionalidad por su cuenta,
        así que <strong>no hace falta instalarlos y tampoco van a interoperar</strong>.
      </p>
      <Table>
        <Thead>
          <Th>Plugin</Th>
          <Th>Por qué no</Th>
        </Thead>
        <tbody>
          {nonIntegrations.map((item) => (
            <Tr key={item.name}>
              <Td className="font-medium">{item.name}</Td>
              <Td>{item.reason}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="grafo">Grafo de dependencias entre addons</SectionHeading>
      <p>
        Transcripción del <code>plugin.yml</code> de cada addon. <code>depend</code> bloquea la carga si falta;{" "}
        <code>softdepend</code> solo habilita funciones. <code>Particles</code> es el nombre de plugin de RPGRoll-FX.
      </p>
      <Table>
        <Thead>
          <Th>Addon</Th>
          <Th>depend</Th>
          <Th>softdepend</Th>
        </Thead>
        <tbody>
          {addonDependencies.map((addon) => (
            <Tr key={addon.slug}>
              <Td>
                <button type="button" className="underline" onClick={() => onNavigate(addon.slug)}>
                  {pageTitle(addon.slug)}
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
