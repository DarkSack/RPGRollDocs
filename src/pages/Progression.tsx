import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, Kbd, PrevNext } from "../components/ui";

export function Progression({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Progresión y nivel">
        Cómo se gana experiencia, la fórmula de nivel, y qué pasa exactamente cuando subís de nivel.
      </PageHeader>

      <SectionHeading id="ganar-xp">Ganar experiencia</SectionHeading>
      <p>
        <code>MobKillListener</code> otorga XP al matar un mob, con montos configurables por tipo de entidad en{" "}
        <code>gameplay.yml → experience.mob_exp</code> (10 por defecto si el tipo no está listado explícitamente).
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
      <p>Nivel máximo: 100 (<code>gameplay.yml → experience.max_level</code>).</p>

      <SectionHeading id="formula">Fórmula de experiencia requerida</SectionHeading>
      <CodeBlock language="text" code={"XP requerida para nivel N = base_exp × N ^ exp_multiplier   (100 × N^1.5 por defecto)"} />

      <SectionHeading id="que-pasa">Qué se aplica exactamente al subir de nivel</SectionHeading>
      <p>
        Cada nivel puede definir recompensas en <code>levelup-rewards.yml</code>; si un nivel no tiene entrada
        explícita, se usan los valores de <code>defaults</code>. <code>PlayerLevelUpHandler</code> aplica, en
        orden:
      </p>
      <ol>
        <li>Incrementa el nivel del jugador.</li>
        <li><code>stat_points</code> se suman a su pool de puntos sin gastar (ver <button className="underline" onClick={() => onNavigate("stats-combate")}>Stats, salud y maná</button>).</li>
        <li><code>health_bonus</code>/<code>mana_bonus</code> aumentan su salud/maná máximos (y curan/restauran esa misma cantidad).</li>
        <li>
          <code>unlocked_skills</code>/<code>unlocked_traits</code> se aprenden/adquieren automáticamente — sin
          pisar el nivel de una skill que el jugador ya hubiera subido manualmente.
        </li>
        <li>Se dispara el evento <code>LevelUpEvent</code> (para que otros plugins/listeners puedan reaccionar).</li>
        <li>Se guarda el jugador y se le muestra un mensaje resumen.</li>
      </ol>

      <Callout tone="warning" title="unlocked_skills/unlocked_traits no valida que el contenido exista">
        El levelup-rewards.yml de ejemplo referencia skills como <code>power_strike</code>, <code>whirlwind</code>{" "}
        y <code>meteor_strike</code>, y traits como <code>warriors_resolve</code>/<code>arcane_master</code>/
        <code>legend_of_old</code> — ninguno tiene un archivo YAML real en <code>skills/</code>/<code>traits/</code>{" "}
        todavía. El jugador "aprende" el ID igual, pero <code>/rpg use</code> fallará con "no existe la
        habilidad" porque <code>SkillManager</code> no la tiene registrada. Si agregás niveles con contenido
        nuevo, creá también el YAML correspondiente.
      </Callout>

      <SectionHeading id="tabla-rewards">Recompensas configuradas por defecto</SectionHeading>
      <Table>
        <Thead>
          <Th>Nivel</Th>
          <Th>XP requerida</Th>
          <Th>Puntos stat</Th>
          <Th>+Salud</Th>
          <Th>+Maná</Th>
          <Th>Desbloquea</Th>
        </Thead>
        <tbody>
          <Tr><Td>2</Td><Td>150</Td><Td>2</Td><Td>10</Td><Td>6</Td><Td>—</Td></Tr>
          <Tr><Td>3</Td><Td>325</Td><Td>2</Td><Td>15</Td><Td>9</Td><Td>—</Td></Tr>
          <Tr><Td>5</Td><Td>1,000</Td><Td>3</Td><Td>25</Td><Td>15</Td><Td>skill: power_strike</Td></Tr>
          <Tr><Td>10</Td><Td>5,000</Td><Td>3</Td><Td>50</Td><Td>30</Td><Td>skills: whirlwind, fireball</Td></Tr>
          <Tr><Td>15</Td><Td>15,000</Td><Td>4</Td><Td>75</Td><Td>45</Td><Td>trait: warriors_resolve</Td></Tr>
          <Tr><Td>20</Td><Td>35,000</Td><Td>4</Td><Td>100</Td><Td>60</Td><Td>skill: meteor_strike</Td></Tr>
          <Tr><Td>25</Td><Td>65,000</Td><Td>5</Td><Td>125</Td><Td>75</Td><Td>trait: arcane_master</Td></Tr>
          <Tr><Td>30</Td><Td>110,000</Td><Td>5</Td><Td>150</Td><Td>90</Td><Td>—</Td></Tr>
          <Tr><Td>50</Td><Td>700,000</Td><Td>6</Td><Td>250</Td><Td>150</Td><Td>—</Td></Tr>
          <Tr><Td>100</Td><Td>10,000,000</Td><Td>8</Td><Td>500</Td><Td>300</Td><Td>trait: legend_of_old</Td></Tr>
        </tbody>
      </Table>
      <p className="text-sm text-slate-400">
        Cualquier otro nivel usa los <code>defaults</code>: 2 puntos de stat, +5 salud/nivel, +3 maná/nivel.
      </p>

      <SectionHeading id="comandos-relacionados">Comandos relacionados</SectionHeading>
      <ul>
        <li><Kbd>/rpg level</Kbd> — nivel y experiencia actuales.</li>
        <li><Kbd>{"/rpg addxp <jugador> <cantidad>"}</Kbd> — admin, agrega XP.</li>
        <li><Kbd>/rpg levelup</Kbd> — admin/debug, fuerza un intento de subir de nivel sobre vos mismo.</li>
      </ul>

      <PrevNext current="progresion" onNavigate={onNavigate} />
    </>
  );
}
