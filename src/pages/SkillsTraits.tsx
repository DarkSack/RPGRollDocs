import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, Kbd, PrevNext } from "../components/ui";

export function SkillsTraits({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Habilidades y traits">
        Habilidades activas con costo de maná y cooldown, y traits pasivos que se otorgan por nivel.
      </PageHeader>

      <SectionHeading id="skills">Habilidades (Skills)</SectionHeading>
      <p>
        Se cargan desde <code>plugins/RPGRoll/skills/*.yml</code> (por defecto solo trae{" "}
        <code>fireball</code>). Cada skill define:
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

      <SectionHeading id="usar-skill">Usar una habilidad</SectionHeading>
      <p>
        Un jugador que ya la aprendió (ver{" "}
        <button className="underline" onClick={() => onNavigate("progresion")}>
          desbloqueo automático por nivel
        </button>
        ) la usa con:
      </p>
      <CodeBlock language="text" code={"/rpg use <skillId>"} />
      <ol>
        <li>Verifica que la tengas aprendida, nivel suficiente y maná suficiente.</li>
        <li>Verifica el cooldown propio de la skill Y el cooldown global entre habilidades (<code>gameplay.yml → skills.global_cooldown</code>).</li>
        <li>Descuenta el maná.</li>
        <li>
          Busca la entidad que estás mirando (<code>World.rayTraceEntities</code>, hasta 20 bloques) y le aplica
          daño = <code>(4 + modificador de Inteligencia) × damage-multiplier</code>.
        </li>
        <li>Si no hay objetivo en rango, igual se gasta el maná y se activa el cooldown — el hechizo "se disipa".</li>
      </ol>

      <Callout tone="info">
        Los cooldowns y el estado de combate son <strong>en memoria, no persistidos</strong> — se reinician si el
        jugador se desconecta o el servidor reinicia. Es intencional.
      </Callout>

      <SectionHeading id="listar-skills">Ver tus habilidades</SectionHeading>
      <p>
        <Kbd>/rpg skills</Kbd> lista cada habilidad aprendida junto con su costo de maná, cooldown, y el comando
        exacto para usarla.
      </p>

      <SectionHeading id="traits">Traits</SectionHeading>
      <p>
        Se cargan desde <code>plugins/RPGRoll/traits/*.yml</code> (por defecto solo <code>vision_nocturna</code>).
        Un trait tiene un <code>TraitEffect</code> con bonos a los 6 atributos, salud, maná, daño y defensa:
      </p>
      <Table>
        <Thead>
          <Th>Campo de TraitEffect</Th>
          <Th>Efecto</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">strengthBonus … charismaBonus</Td><Td>Bono plano a cada atributo</Td></Tr>
          <Tr><Td className="font-mono text-xs">healthBonus / manaBonus</Td><Td>Bono plano a salud/maná máximos</Td></Tr>
          <Tr><Td className="font-mono text-xs">damageBonus / defenseBonus</Td><Td>Multiplicadores de combate</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title="TraitEffect existe, pero no se aplica automáticamente todavía">
        La estructura de datos está completa y se parsea desde YAML, pero ningún listener suma estos bonos a las
        stats reales del jugador cuando adquiere el trait — <code>PlayerTraits.acquire()</code> solo registra que
        el jugador "tiene" el trait. Aplicar el efecto es la extensión natural pendiente.
      </Callout>
      <p><Kbd>/rpg traits</Kbd> lista los traits adquiridos.</p>

      <PrevNext current="habilidades-traits" onNavigate={onNavigate} />
    </>
  );
}
