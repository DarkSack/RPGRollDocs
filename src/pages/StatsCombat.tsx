import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, Kbd, PrevNext } from "../components/ui";
import { useI18n, fill, localizedCaveatTitle, localizedCaveatBody } from "../i18n";
import { CORE_COPY } from "./copy/core";

const MAX_TITLE = "maxHealth/maxMana NO se recalculan en cada carga";
const MAX_BODY =
  "A propósito: si se recalcularan desde la fórmula en cada login se perdería el crecimiento acumulado por nivel. En cambio se persisten en la BD tal cual, y solo crecen explícitamente vía CombatStats.growHealth()/growMana() (level up, o al invertir un punto en Constitución/Inteligencia). armorRating/evasionChance/criticalChance sí se recalculan libremente, porque no tienen historial propio que perder.";

const DUP_TITLE = "Esto es daño duplicado, en dos sistemas distintos";
const DUP_BODY =
  "La vida vanilla (corazones) sigue existiendo y sigue causando muerte normal a 0 HP. La salud RPG es un segundo contador independiente. Un jugador puede llegar a 0 salud RPG (y quedar debilitado) sin estar cerca de morir de verdad, o viceversa. Si quieres unificarlos, es la próxima decisión de diseño grande a tomar.";

export function StatsCombat({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = CORE_COPY[locale].stats;

  return (
    <>
      <PageHeader title={c.title} slug="stats-combate">
        {c.intro}
      </PageHeader>

      <SectionHeading id="atributos">{c.attrTitle}</SectionHeading>
      <p>
        {fill(c.attrBody, {
          playerStats: <code>PlayerStats</code>,
          formula: <code>(valor - 10) / 2</code>,
        })}
      </p>

      <SectionHeading id="combatstats">{c.combatTitle}</SectionHeading>
      <Callout tone="info" title={c.notHeartsTitle}>
        {fill(c.notHeartsBody, {
          health: (
            <>
              <code>currentHealth</code>/<code>maxHealth</code>
            </>
          ),
          mana: (
            <>
              <code>currentMana</code>/<code>maxMana</code>
            </>
          ),
        })}
      </Callout>

      <Table>
        <Thead>
          <Th>{c.thField}</Th>
          <Th>{c.thDerived}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">maxHealth</Td>
            <Td>{c.dMaxHealth}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">maxMana</Td>
            <Td>{c.dMaxMana}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">armorRating</Td>
            <Td>{c.dArmor}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">evasionChance</Td>
            <Td>{c.dEvasion}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">criticalChance</Td>
            <Td>{c.dCrit}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">criticalMultiplier</Td>
            <Td>{c.dCritMult}</Td>
          </Tr>
        </tbody>
      </Table>

      <Callout tone="warning" title={localizedCaveatTitle("stats-combate", MAX_TITLE, locale)}>
        {localizedCaveatBody("stats-combate", MAX_TITLE, MAX_BODY, locale)}
      </Callout>

      <SectionHeading id="puntos-de-stat">{c.pointsTitle}</SectionHeading>
      <p>
        {fill(c.pointsBody, {
          file: <code>levelup-rewards.yml</code>,
          field: <code>unspentStatPoints</code>,
          progression: <code>PlayerProgression</code>,
        })}
      </p>
      <CodeBlock
        language="text"
        code={"/rpg allocate <fuerza|destreza|constitucion|inteligencia|sabiduria|carisma> <cantidad>"}
      />
      <p>
        {fill(c.pointsAfter, {
          allocator: <code>StatPointAllocator</code>,
          health: (
            <>
              <code>maxHealth</code>/<code>maxMana</code>
            </>
          ),
        })}
      </p>

      <SectionHeading id="respec">{c.respecTitle}</SectionHeading>
      <p>{fill(c.respecBody, { command: <Kbd>{"/rpg resetstats <jugador>"}</Kbd> })}</p>

      <SectionHeading id="combate-real">{c.realTitle}</SectionHeading>
      <p>{fill(c.realLead, { listener: <code>CombatEffectsListener</code> })}</p>
      <ol>
        <li>{fill(c.r1, { strong: <strong>{c.r1s}</strong> })}</li>
        <li>
          {fill(c.r2, {
            strong: <strong>{c.r2s}</strong>,
            formula: <code>reducción = armorRating / (armorRating + 50)</code>,
          })}
        </li>
        <li>
          {fill(c.r3, {
            strong: <strong>{c.r3s}</strong>,
            mult: <code>criticalMultiplier</code>,
          })}
        </li>
        <li>{fill(c.r4, { health: <code>currentHealth</code> })}</li>
      </ol>
      <Callout tone="danger" title={localizedCaveatTitle("stats-combate", DUP_TITLE, locale)}>
        {localizedCaveatBody("stats-combate", DUP_TITLE, DUP_BODY, locale)}
      </Callout>

      <SectionHeading id="regeneracion">{c.regenTitle}</SectionHeading>
      <p>
        {fill(c.regenBody, {
          task: <code>ResourceRegenTask</code>,
          interval: <code>combat.regen_interval_seconds</code>,
          percents: (
            <>
              <code>health_regen_percent</code>/<code>mana_regen_percent</code>
            </>
          ),
          flag: <code>combat.natural_regen_in_combat</code>,
          false: <code>false</code>,
          duration: <code>combat.combat_duration</code>,
        })}
      </p>

      <SectionHeading id="hud">{c.hudTitle}</SectionHeading>
      <p>
        {fill(c.hudBody, {
          bar: <code>PlayerResourceBar</code>,
          example: <code>❤ 80/100   ✦ 45/100</code>,
        })}
      </p>

      <PrevNext current="stats-combate" onNavigate={onNavigate} />
    </>
  );
}
