import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, Kbd, PrevNext } from "../components/ui";
import { useI18n, fill, localizedCaveatTitle, localizedCaveatBody } from "../i18n";
import { CORE_COPY } from "./copy/core";

const CAVEAT_TITLE = "TraitEffect existe, pero no se aplica automáticamente";
const CAVEAT_BODY =
  "La estructura de datos está completa y se parsea desde YAML, pero ningún listener suma estos bonos a las stats reales del jugador cuando adquiere el trait — PlayerTraits.acquire() solo registra que el jugador “tiene” el trait.";

export function SkillsTraits({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = CORE_COPY[locale].skills;

  return (
    <>
      <PageHeader title={c.title} slug="habilidades-traits">
        {c.intro}
      </PageHeader>

      <SectionHeading id="skills">{c.skillsTitle}</SectionHeading>
      <p>
        {fill(c.skillsLead, {
          dir: <code>plugins/RPGRoll/skills/*.yml</code>,
          fireball: <code>fireball</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="skills/fireball.yml"
        code={
          "id: fireball\n" +
          'name: "&cBola de Fuego"\n' +
          "description: |\n" +
          "  Lanza una bola de\n" +
          "  fuego que inflige daño mágico.\n" +
          "required-level: 5\n" +
          "mana-cost: 20\n" +
          "cooldown-seconds: 8\n" +
          "damage-multiplier: 1.5\n"
        }
      />

      <SectionHeading id="usar-skill">{c.useTitle}</SectionHeading>
      <p>
        {fill(c.useLead, {
          link: (
            <button type="button" className="underline" onClick={() => onNavigate("progresion")}>
              {c.useLink}
            </button>
          ),
        })}
      </p>
      <CodeBlock language="text" code={"/rpg use <skillId>"} />
      <ol>
        <li>{c.u1}</li>
        <li>{fill(c.u2, { key: <code>gameplay.yml → skills.global_cooldown</code> })}</li>
        <li>{c.u3}</li>
        <li>
          {fill(c.u4, {
            raytrace: <code>World.rayTraceEntities</code>,
            formula: <code>(4 + modificador de Inteligencia) × damage-multiplier</code>,
          })}
        </li>
        <li>{c.u5}</li>
      </ol>

      <Callout tone="info">{fill(c.memoryNote, { strong: <strong>{c.memoryStrong}</strong> })}</Callout>

      <SectionHeading id="listar-skills">{c.listTitle}</SectionHeading>
      <p>{fill(c.listBody, { cmd: <Kbd>/rpg skills</Kbd> })}</p>

      <SectionHeading id="traits">{c.traitsTitle}</SectionHeading>
      <p>
        {fill(c.traitsLead, {
          dir: <code>plugins/RPGRoll/traits/*.yml</code>,
          night: <code>vision_nocturna</code>,
          effect: <code>TraitEffect</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thField}</Th>
          <Th>{c.thEffect}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">strengthBonus … charismaBonus</Td>
            <Td>{c.eAttrs}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">healthBonus / manaBonus</Td>
            <Td>{c.eHealth}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">damageBonus / defenseBonus</Td>
            <Td>{c.eDamage}</Td>
          </Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title={localizedCaveatTitle("habilidades-traits", CAVEAT_TITLE, locale)}>
        {localizedCaveatBody("habilidades-traits", CAVEAT_TITLE, CAVEAT_BODY, locale)}
      </Callout>
      <p>{fill(c.traitsList, { cmd: <Kbd>/rpg traits</Kbd> })}</p>

      <PrevNext current="habilidades-traits" onNavigate={onNavigate} />
    </>
  );
}
