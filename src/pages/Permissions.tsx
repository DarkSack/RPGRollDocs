import { PageHeader, SectionHeading, Callout, Badge, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";
import { permissions } from "../content/permissions";
import { pageTitle } from "../content/nav";
import { useI18n, fill, localizedPermission, localizedPageLabel } from "../i18n";
import { REFERENCE_COPY } from "./copy/reference";

const TONE_BY_DEFAULT = {
  true: "green",
  op: "amber",
  false: "neutral",
} as const;

export function Permissions({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = REFERENCE_COPY[locale].permissions;

  const wildcards = permissions.filter((p) => p.node.endsWith(".*"));
  const leaves = permissions.filter((p) => !p.node.endsWith(".*"));

  return (
    <>
      <PageHeader title={c.title} slug="permisos">
        {fill(c.intro, { file: <code>plugin.yml</code> })}
      </PageHeader>

      <SectionHeading id="wildcards">{c.wildcardTitle}</SectionHeading>
      <p>
        {fill(c.wildcardLead, {
          all: <code>rpgroll.*</code>,
          player: <code>rpgroll.player.*</code>,
          admin: <code>rpgroll.admin.*</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thNode}</Th>
          <Th>{c.thDefault}</Th>
          <Th>{c.thIncludes}</Th>
        </Thead>
        <tbody>
          {wildcards.map((p) => (
            <Tr key={p.node}>
              <Td className="font-mono text-xs">{p.node}</Td>
              <Td>
                <Badge tone={TONE_BY_DEFAULT[p.default]}>{p.default}</Badge>
              </Td>
              <Td className="font-mono text-xs">
                {p.children?.map((child) => (
                  <span key={child} className="mb-1 mr-2 inline-block">
                    {child}
                  </span>
                ))}
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="individuales">{c.leavesTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thNode}</Th>
          <Th>{c.thDefault}</Th>
          <Th>{c.thDescription}</Th>
        </Thead>
        <tbody>
          {leaves.map((p) => (
            <Tr key={p.node}>
              <Td className="whitespace-nowrap font-mono text-xs">{p.node}</Td>
              <Td>
                <Badge tone={TONE_BY_DEFAULT[p.default]}>{p.default}</Badge>
              </Td>
              <Td>{localizedPermission(p.node, p.description, locale)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <Callout tone="info" title={c.legendTitle}>
        <Badge tone="green">true</Badge> {c.legendTrue} <Badge tone="amber">op</Badge> {c.legendOp}
      </Callout>

      <p className="mt-6">
        {c.seeCommands}{" "}
        <button type="button" className="underline" onClick={() => onNavigate("comandos")}>
          {localizedPageLabel("comandos", pageTitle("comandos"), locale)}
        </button>
        .
      </p>

      <PrevNext current="permisos" onNavigate={onNavigate} />
    </>
  );
}
