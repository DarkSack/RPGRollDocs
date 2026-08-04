import { PageHeader, SectionHeading, Callout, Badge, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";
import { permissions } from "../content/permissions";

const TONE_BY_DEFAULT = {
  true: "green",
  op: "amber",
  false: "neutral",
} as const;

export function Permissions({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const wildcards = permissions.filter((p) => p.node.endsWith(".*"));
  const leaves = permissions.filter((p) => !p.node.endsWith(".*"));

  return (
    <>
      <PageHeader title="Permisos">
        Árbol completo de permisos declarado en <code>plugin.yml</code>.
      </PageHeader>

      <SectionHeading id="wildcards">Nodos generales</SectionHeading>
      <p>
        <code>rpgroll.*</code> agrupa todo. <code>rpgroll.player.*</code> (default: todos) agrupa los comandos de
        jugador. <code>rpgroll.admin.*</code> (default: op) agrupa los comandos de administración.
      </p>
      <Table>
        <Thead>
          <Th>Nodo</Th>
          <Th>Default</Th>
          <Th>Incluye</Th>
        </Thead>
        <tbody>
          {wildcards.map((p) => (
            <Tr key={p.node}>
              <Td className="font-mono text-xs">{p.node}</Td>
              <Td><Badge tone={TONE_BY_DEFAULT[p.default]}>{p.default}</Badge></Td>
              <Td className="font-mono text-xs">
                {p.children?.map((c) => (
                  <span key={c} className="mr-2 mb-1 inline-block">{c}</span>
                ))}
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="individuales">Permisos individuales</SectionHeading>
      <Table>
        <Thead>
          <Th>Nodo</Th>
          <Th>Default</Th>
          <Th>Descripción</Th>
        </Thead>
        <tbody>
          {leaves.map((p) => (
            <Tr key={p.node}>
              <Td className="font-mono text-xs whitespace-nowrap">{p.node}</Td>
              <Td><Badge tone={TONE_BY_DEFAULT[p.default]}>{p.default}</Badge></Td>
              <Td>{p.description}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <Callout tone="info" title="Leyenda">
        <Badge tone="green">true</Badge> = todos los jugadores lo tienen por defecto. <Badge tone="amber">op</Badge>{" "}
        = solo operadores del servidor.
      </Callout>

      <p className="mt-6">
        Ver qué comando corresponde a cada permiso en{" "}
        <button className="underline" onClick={() => onNavigate("comandos")}>
          Comandos
        </button>
        .
      </p>

      <PrevNext current="permisos" onNavigate={onNavigate} />
    </>
  );
}
