import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, Kbd, PrevNext } from "../components/ui";

export function StatsCombat({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Stats, salud y maná">
        Los 6 atributos D&D, y un sistema de salud/maná propio de RPGRoll — independiente de los corazones de
        Minecraft.
      </PageHeader>

      <SectionHeading id="atributos">Los 6 atributos</SectionHeading>
      <p>
        <code>PlayerStats</code> guarda Fuerza, Destreza, Constitución, Inteligencia, Sabiduría y Carisma, cada uno
        entre 1 y 20 (10 por defecto). El modificador estilo D&D se calcula como <code>(valor - 10) / 2</code>{" "}
        (división entera) y es lo que realmente afecta salud, maná, armadura, evasión y crítico — no el valor
        crudo.
      </p>

      <SectionHeading id="combatstats">CombatStats: el recurso de salud/maná</SectionHeading>
      <Callout tone="info" title="No es la barra de corazones">
        RPGRoll trackea <code>currentHealth</code>/<code>maxHealth</code> y <code>currentMana</code>/
        <code>maxMana</code> como un recurso propio (escala base 100, no 20), separado de la vida vanilla de
        Minecraft. Es una decisión de diseño deliberada: evita reescribir el sistema de muerte/respawn de Bukkit,
        pero significa que la salud "RPG" no es literalmente lo mismo que las vidas del jugador.
      </Callout>

      <Table>
        <Thead>
          <Th>Campo</Th>
          <Th>Se deriva de</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">maxHealth</Td><Td>100 + (modificador de Constitución × 5), + bonos acumulados de level up</Td></Tr>
          <Tr><Td className="font-mono text-xs">maxMana</Td><Td>100 + (modificador de Inteligencia × 5), + bonos acumulados de level up</Td></Tr>
          <Tr><Td className="font-mono text-xs">armorRating</Td><Td>5.0 + (nivel × 0.5) — se recalcula siempre, no acumula</Td></Tr>
          <Tr><Td className="font-mono text-xs">evasionChance</Td><Td>0.10 + (modificador de Destreza × 0.02)</Td></Tr>
          <Tr><Td className="font-mono text-xs">criticalChance</Td><Td>0.05 + (modificador de Destreza × 0.01)</Td></Tr>
          <Tr><Td className="font-mono text-xs">criticalMultiplier</Td><Td>1.5 (fijo)</Td></Tr>
        </tbody>
      </Table>

      <Callout tone="warning" title="maxHealth/maxMana NO se recalculan en cada carga">
        A propósito: si se recalcularan desde la fórmula en cada login se perdería el crecimiento acumulado por
        nivel. En cambio se persisten en la BD tal cual, y solo crecen explícitamente vía{" "}
        <code>CombatStats.growHealth()</code>/<code>growMana()</code> (level up, o al invertir un punto en
        Constitución/Inteligencia). armorRating/evasionChance/criticalChance sí se recalculan libremente, porque
        no tienen historial propio que perder.
      </Callout>

      <SectionHeading id="puntos-de-stat">Puntos de estadística</SectionHeading>
      <p>
        Cada nivel otorga puntos de estadística (configurable en <code>levelup-rewards.yml</code>, 2 por defecto)
        que quedan guardados como <code>unspentStatPoints</code> en <code>PlayerProgression</code> hasta que el
        jugador los gasta con:
      </p>
      <CodeBlock language="text" code={"/rpg allocate <fuerza|destreza|constitucion|inteligencia|sabiduria|carisma> <cantidad>"} />
      <p>
        Internamente usa <code>StatPointAllocator</code> para validar (puntos suficientes, no pasarse de 20), y si
        el punto sube el modificador de Constitución o Inteligencia, ajusta <code>maxHealth</code>/
        <code>maxMana</code> en el momento; si sube Destreza, refresca evasión/crítico.
      </p>

      <SectionHeading id="respec">Reiniciar atributos (admin)</SectionHeading>
      <p>
        <Kbd>{"/rpg resetstats <jugador>"}</Kbd> vuelve los 6 atributos a su valor base (10) y le devuelve al
        jugador, como puntos sin gastar, la suma de todo lo que debería haber ganado según su nivel actual — un
        respec completo. No toca salud/maná máximos acumulados, porque esos crecen con el nivel, no con los
        puntos de atributo invertidos.
      </p>

      <SectionHeading id="combate-real">Consecuencias reales en combate</SectionHeading>
      <p><code>CombatEffectsListener</code> conecta estos números con el combate de verdad:</p>
      <ol>
        <li><strong>Evasión</strong> se tira primero — si esquivás, el evento de daño se cancela por completo.</li>
        <li>
          <strong>Armadura</strong> reduce el daño real con una fórmula de retornos decrecientes:{" "}
          <code>reducción = armorRating / (armorRating + 50)</code>.
        </li>
        <li>
          <strong>Crítico</strong> (si sos el atacante) multiplica tu daño por <code>criticalMultiplier</code>{" "}
          antes de que se aplique la armadura del defensor.
        </li>
        <li>
          El daño final (post-armadura) se descuenta de tu <code>currentHealth</code> RPG. Si llega a 0: recibís
          Lentitud + Debilidad por 5 segundos y te recuperás al 25% de tu máximo — un estado "derribado" propio,
          no la muerte vanilla (esa sigue funcionando en paralelo, gobernada por tus corazones reales).
        </li>
      </ol>
      <Callout tone="danger" title="Esto es daño duplicado, en dos sistemas distintos">
        La vida vanilla (corazones) sigue existiendo y sigue causando muerte normal a 0 HP. La salud RPG es un
        segundo contador independiente. Un jugador puede llegar a 0 salud RPG (y quedar debilitado) sin estar
        cerca de morir de verdad, o viceversa. Si querés unificarlos, es la próxima decisión de diseño grande a
        tomar.
      </Callout>

      <SectionHeading id="regeneracion">Regeneración pasiva</SectionHeading>
      <p>
        <code>ResourceRegenTask</code> corre cada <code>combat.regen_interval_seconds</code> (config, 5s por
        defecto) y suma un % del máximo a salud/maná (<code>health_regen_percent</code>/
        <code>mana_regen_percent</code>). Si <code>combat.natural_regen_in_combat</code> es <code>false</code>{" "}
        (default), no regenera mientras el jugador esté en combate reciente (ventana definida por{" "}
        <code>combat.combat_duration</code>).
      </p>

      <SectionHeading id="hud">Indicador en pantalla</SectionHeading>
      <p>
        <code>PlayerResourceBar</code> muestra un boss bar persistente: la barra de progreso refleja el % de
        salud, y el maná se muestra como texto en el título (<code>❤ 80/100   ✦ 45/100</code>). Se actualiza en
        cada golpe, cada uso de habilidad, y cada tick de regeneración.
      </p>

      <PrevNext current="stats-combate" onNavigate={onNavigate} />
    </>
  );
}
