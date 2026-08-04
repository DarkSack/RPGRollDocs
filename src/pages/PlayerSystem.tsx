import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, Badge, PrevNext } from "../components/ui";

export function PlayerSystem({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Jugadores">
        El modelo de datos central: <code>RPGPlayer</code>, un objeto inmutable que agrupa toda la información de
        rol de un jugador.
      </PageHeader>

      <SectionHeading id="rpgplayer">RPGPlayer</SectionHeading>
      <p>
        <code>RPGPlayer</code> es inmutable: cada método que "modifica" algo (<code>setRace</code>,{" "}
        <code>addExperience</code>, <code>learnSkill</code>, <code>updateCombatStats</code>...) devuelve una{" "}
        <strong>nueva instancia</strong> en vez de mutar la existente. Agrupa:
      </p>
      <Table>
        <Thead>
          <Th>Componente</Th>
          <Th>Contiene</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">PlayerIdentity</Td><Td>UUID, username, raza, clase</Td></Tr>
          <Tr><Td className="font-mono text-xs">PlayerStats</Td><Td>Los 6 atributos D&D</Td></Tr>
          <Tr><Td className="font-mono text-xs">PlayerProgression</Td><Td>Nivel, experiencia, timestamps, puntos de stat sin gastar</Td></Tr>
          <Tr><Td className="font-mono text-xs">PlayerSkills</Td><Td>Habilidades aprendidas y su nivel</Td></Tr>
          <Tr><Td className="font-mono text-xs">PlayerTraits</Td><Td>Traits adquiridos</Td></Tr>
          <Tr><Td className="font-mono text-xs">CombatStats</Td><Td>Salud/maná actuales y máximos, armadura, evasión, crítico</Td></Tr>
          <Tr><Td className="font-mono text-xs">PlayerJobs</Td><Td>Trabajos activos (máx. 3) y su progreso</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="playermanager">PlayerManager</SectionHeading>
      <p>Punto de entrada único para operaciones de jugador. Coordina dos piezas:</p>
      <ul>
        <li>
          <strong>PlayerCache</strong> — mapa en memoria (<code>ConcurrentHashMap</code>) de jugadores conectados,
          para no golpear la base de datos en cada operación.
        </li>
        <li>
          <strong>PlayerRepository</strong> — persistencia real en SQLite (<code>save</code>/<code>update</code>/
          <code>findByUUID</code>).
        </li>
      </ul>

      <CodeBlock
        language="java"
        filename="flujo de PlayerManager.getPlayer(uuid)"
        code={
          "1. ¿Está en PlayerCache?  → devolverlo (sin tocar la BD)\n" +
          "2. ¿Existe en la BD?      → cargarlo, guardarlo en caché, devolverlo\n" +
          "3. No existe en ningún lado → Optional.empty()"
        }
      />

      <Callout tone="warning" title="Rendimiento: no todo se guarda a la BD">
        Las actualizaciones de combate (daño recibido, regeneración pasiva, maná gastado al usar una skill) solo se
        escriben en <code>PlayerCache</code>, <strong>no</strong> disparan un <code>UPDATE</code> a SQLite en cada
        golpe — eso sería un cuello de botella real en el hilo principal del servidor. La persistencia real ocurre
        al desconectarse (<code>unloadPlayer</code>) o al apagar el servidor (<code>saveAll</code>). Si el servidor
        crashea sin apagarse limpiamente, se puede perder el progreso de combate desde la última acción "normal"
        guardada (level up, cambio de raza/clase, etc).
      </Callout>

      <SectionHeading id="ciclo-de-vida">Ciclo de vida: join / quit</SectionHeading>
      <p>Todo pasa por <code>PlayerEventListener</code>:</p>
      <ol>
        <li><code>PlayerJoinEvent</code> → <code>playerManager.loadOrCreate(player)</code> (crea el jugador si es su primera vez).</li>
        <li>
          20 ticks después (1 segundo, para dar tiempo a que el cliente cargue): se reaplican los modificadores
          físicos de su raza, se muestra el boss bar de salud/maná, y si el personaje no está completo (sin
          raza/clase) se lanza el flujo de creación de personaje.
        </li>
        <li><code>PlayerQuitEvent</code> → se oculta el boss bar y se descarga del caché (guardando en BD).</li>
      </ol>

      <SectionHeading id="identidad-completa">¿Cuándo está "completo" un personaje?</SectionHeading>
      <p>
        <code>RPGPlayer.isCharacterComplete()</code> (delegado a <code>PlayerIdentity</code>) es simplemente:
        tiene raza <strong>y</strong> clase asignadas, ambas no vacías. Mientras no lo esté, el jugador es forzado
        al flujo de <code>/rpg create</code> en cada login.
      </p>

      <SectionHeading id="placeholders">Placeholders (PlaceholderAPI)</SectionHeading>
      <p>
        Softdepend — si <code>PlaceholderAPI</code> está instalado, el core registra la expansión{" "}
        <Badge tone="violet">rpgroll</Badge> automáticamente al arrancar. Todos leen el{" "}
        <code>RPGPlayer</code> ya cargado — un jugador sin personaje creado devuelve cadena vacía o{" "}
        <code>-</code>, nunca crea uno ni falla.
      </p>
      <Table>
        <Thead>
          <Th>Placeholder</Th>
          <Th>Valor</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">%rpgroll_level%</Td><Td>Nivel actual.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgroll_xp% / %rpgroll_xp_next%</Td><Td>Experiencia actual / requerida para el próximo nivel.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgroll_xp_percent%</Td><Td>Progreso hacia el próximo nivel, en %.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgroll_race% / %rpgroll_class%</Td><Td>Raza/clase actual, o <code>-</code> si no tiene.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgroll_health% / %rpgroll_health_max%</Td><Td>Salud del pool propio de RPGRoll (no los corazones vanilla).</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgroll_mana% / %rpgroll_mana_max%</Td><Td>Maná actual/máximo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgroll_armor% / %rpgroll_evasion% / %rpgroll_critical_chance%</Td><Td>Stats de combate derivados.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgroll_strength% ... %rpgroll_charisma%</Td><Td>Los 6 atributos D&D.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgroll_stat_points%</Td><Td>Puntos de atributo sin gastar.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgroll_job_<id>_level%"}</Td><Td>Nivel en ese trabajo (0 si no lo tiene).</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgroll_has_skill_<id>%"} / {"%rpgroll_has_trait_<id>%"}</Td><Td><code>si</code>/<code>no</code>.</Td></Tr>
        </tbody>
      </Table>

      <PrevNext current="jugadores" onNavigate={onNavigate} />
    </>
  );
}
