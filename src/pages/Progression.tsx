import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, Kbd, PrevNext } from "../components/ui";
import { pageTitle } from "../content/nav";
import { useI18n, fill, localizedPageLabel, localizedCaveatTitle, localizedCaveatBody } from "../i18n";
import { CORE_COPY } from "./copy/core";

const CAVEAT_TITLE = "unlocked_skills/unlocked_traits no valida que el contenido exista";
const CAVEAT_BODY =
  "El levelup-rewards.yml de ejemplo referencia skills como power_strike, whirlwind y meteor_strike, y traits como warriors_resolve/arcane_master/ legend_of_old — ninguno tiene un archivo YAML real en skills//traits/ todavía. El jugador “aprende” el ID igual, pero /rpg use fallará con “no existe la habilidad” porque SkillManager no la tiene registrada. Si agregas niveles con contenido nuevo, crea también el YAML correspondiente.";

const REWARDS = [
  { level: 2, xp: "150", pts: 2, hp: 10, mp: 6, unlock: "—" },
  { level: 3, xp: "325", pts: 2, hp: 15, mp: 9, unlock: "—" },
  { level: 5, xp: "1,000", pts: 3, hp: 25, mp: 15, unlock: "skill: power_strike" },
  { level: 10, xp: "5,000", pts: 3, hp: 50, mp: 30, unlock: "skills: whirlwind, fireball" },
  { level: 15, xp: "15,000", pts: 4, hp: 75, mp: 45, unlock: "trait: warriors_resolve" },
  { level: 20, xp: "35,000", pts: 4, hp: 100, mp: 60, unlock: "skill: meteor_strike" },
  { level: 25, xp: "65,000", pts: 5, hp: 125, mp: 75, unlock: "trait: arcane_master" },
  { level: 30, xp: "110,000", pts: 5, hp: 150, mp: 90, unlock: "—" },
  { level: 50, xp: "700,000", pts: 6, hp: 250, mp: 150, unlock: "—" },
  { level: 100, xp: "10,000,000", pts: 8, hp: 500, mp: 300, unlock: "trait: legend_of_old" },
];

export function Progression({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = CORE_COPY[locale].progression;

  return (
    <>
      <PageHeader title={c.title} slug="progresion">
        {c.intro}
      </PageHeader>

      <SectionHeading id="ganar-xp">{c.gainTitle}</SectionHeading>
      <p>
        {fill(c.gainBody, {
          listener: <code>MobKillListener</code>,
          key: <code>gameplay.yml → experience.mob_exp</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        code={
          "experience:\n" +
          "  mob_exp:\n" +
          "    zombie: 10\n" +
          "    skeleton: 12\n" +
          "    creeper: 15\n" +
          "    spider: 8\n" +
          "    enderman: 50\n" +
          "    boss: 500\n"
        }
      />
      <p>{fill(c.maxLevel, { key: <code>gameplay.yml → experience.max_level</code> })}</p>

      <SectionHeading id="bonos-exp">{c.bonusTitle}</SectionHeading>
      <p>{fill(c.bonusBody, { addxp: <Kbd>/rpg addxp</Kbd> })}</p>
      <p>
        {fill(c.bonusPerm, {
          perm: <code>rpgroll.exp.bonus.&lt;n&gt;</code>,
          example: <code>rpgroll.exp.bonus.10</code>,
        })}
      </p>
      <CodeBlock
        language="bash"
        code={
          "lp group vip permission set rpgroll.exp.bonus.10 true\n" +
          "lp group vipmas permission set rpgroll.exp.bonus.20 true\n" +
          "lp group mvp permission set rpgroll.exp.bonus.30 true\n"
        }
      />

      <SectionHeading id="formula">{c.formulaTitle}</SectionHeading>
      <CodeBlock language="text" code={c.formula} />

      <SectionHeading id="que-pasa">{c.whatTitle}</SectionHeading>
      <p>
        {fill(c.whatLead, {
          file: <code>levelup-rewards.yml</code>,
          defaults: <code>defaults</code>,
          handler: <code>PlayerLevelUpHandler</code>,
        })}
      </p>
      <ol>
        <li>{c.p1}</li>
        <li>
          {fill(c.p2, {
            key: <code>stat_points</code>,
            link: (
              <button type="button" className="underline" onClick={() => onNavigate("stats-combate")}>
                {localizedPageLabel("stats-combate", pageTitle("stats-combate"), locale)}
              </button>
            ),
          })}
        </li>
        <li>
          {fill(c.p3, {
            key: (
              <>
                <code>health_bonus</code>/<code>mana_bonus</code>
              </>
            ),
          })}
        </li>
        <li>
          {fill(c.p4, {
            key: (
              <>
                <code>unlocked_skills</code>/<code>unlocked_traits</code>
              </>
            ),
          })}
        </li>
        <li>{fill(c.p5, { event: <code>LevelUpEvent</code> })}</li>
        <li>{c.p6}</li>
      </ol>

      <Callout tone="warning" title={localizedCaveatTitle("progresion", CAVEAT_TITLE, locale)}>
        {localizedCaveatBody("progresion", CAVEAT_TITLE, CAVEAT_BODY, locale)}
      </Callout>

      <SectionHeading id="tabla-rewards">{c.tableTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thLevel}</Th>
          <Th>{c.thXp}</Th>
          <Th>{c.thPoints}</Th>
          <Th>{c.thHealth}</Th>
          <Th>{c.thMana}</Th>
          <Th>{c.thUnlocks}</Th>
        </Thead>
        <tbody>
          {REWARDS.map((r) => (
            <Tr key={r.level}>
              <Td>{r.level}</Td>
              <Td>{r.xp}</Td>
              <Td>{r.pts}</Td>
              <Td>{r.hp}</Td>
              <Td>{r.mp}</Td>
              <Td>{r.unlock}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p className="text-sm" style={{ color: "var(--text-faint)" }}>
        {fill(c.tableNote, { defaults: <code>defaults</code> })}
      </p>

      <SectionHeading id="comandos-relacionados">{c.cmdTitle}</SectionHeading>
      <ul>
        <li>
          <Kbd>/rpg level</Kbd> — {c.c1}
        </li>
        <li>
          <Kbd>{"/rpg addxp <jugador> <cantidad>"}</Kbd> — {c.c2}
        </li>
        <li>
          <Kbd>/rpg levelup</Kbd> — {c.c3}
        </li>
      </ul>

      <PrevNext current="progresion" onNavigate={onNavigate} />
    </>
  );
}
