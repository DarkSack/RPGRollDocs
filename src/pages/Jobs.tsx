import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, Kbd, PrevNext } from "../components/ui";
import { useI18n, fill, localizedCaveatTitle, localizedCaveatBody } from "../i18n";
import { CORE_COPY } from "./copy/core";

const CAVEAT_TITLE = "El límite de 3 está fijo en código, no en config";
const CAVEAT_BODY =
  "gameplay.yml tiene professions.max_per_player: 2, pero el sistema real de Jobs usa la constante PlayerJobs.MAX_ACTIVE_JOBS = 3 y nunca lee esa clave de config. Son dos sistemas de “profesiones” que no terminaron de unificarse — la config es efectivamente un residuo de un diseño anterior.";

export function Jobs({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = CORE_COPY[locale].jobs;

  const rows = [
    { id: "minero", name: c.nMiner, anti: c.aMiner },
    { id: "pescador", name: c.nFisher, anti: "—" },
    { id: "cazador", name: c.nHunter, anti: c.aHunter },
    { id: "granjero", name: c.nFarmer, anti: c.aFarmer },
    { id: "alquimista", name: c.nAlchemist, anti: "—" },
    { id: "explorador", name: c.nExplorer, anti: c.aExplorer },
  ];

  return (
    <>
      <PageHeader title={c.title} slug="trabajos">
        {c.intro}
      </PageHeader>

      <SectionHeading id="trabajos-disponibles">{c.listTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thId}</Th>
          <Th>{c.thName}</Th>
          <Th>{c.thAntiFarm}</Th>
        </Thead>
        <tbody>
          {rows.map((r) => (
            <Tr key={r.id}>
              <Td className="font-mono text-xs">{r.id}</Td>
              <Td>{r.name}</Td>
              <Td>{r.anti}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>
        {fill(c.listAfter, {
          dir: <code>plugins/RPGRoll/jobs/*.yml</code>,
          target: <em>target</em>,
          material: <code>Material</code>,
          entity: <code>EntityType</code>,
        })}
      </p>

      <SectionHeading id="unirse-abandonar">{c.joinTitle}</SectionHeading>
      <p>
        {fill(c.joinBody, {
          cmd: <Kbd>/rpg jobs</Kbd>,
          strong: <strong>{c.joinStrong}</strong>,
        })}
      </p>
      <Callout tone="warning" title={localizedCaveatTitle("trabajos", CAVEAT_TITLE, locale)}>
        {localizedCaveatBody("trabajos", CAVEAT_TITLE, CAVEAT_BODY, locale)}
      </Callout>

      <SectionHeading id="recompensas">{c.rewardTitle}</SectionHeading>
      <p>{fill(c.rewardLead, { service: <code>JobRewardService.reward(player, jobId, target)</code> })}</p>
      <ol>
        <li>{c.w1}</li>
        <li>{c.w2}</li>
        <li>{c.w3}</li>
        <li>{fill(c.w4, { em: <em>{c.w4em}</em> })}</li>
        <li>{c.w5}</li>
      </ol>
      <CodeBlock language="text" code={c.curve} />

      <SectionHeading id="explorador">{c.explorerTitle}</SectionHeading>
      <p>
        {fill(c.explorerBody, {
          table: <code>explorer_progress</code>,
          other: <code>player_jobs</code>,
        })}
      </p>

      <SectionHeading id="admin">{c.adminTitle}</SectionHeading>
      <p>{fill(c.adminBody, { cmd: <Kbd>{"/rpg job <give|remove|setlevel> <jugador> <jobId> [nivel]"}</Kbd> })}</p>

      <PrevNext current="trabajos" onNavigate={onNavigate} />
    </>
  );
}
