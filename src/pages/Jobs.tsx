import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, Kbd, PrevNext } from "../components/ui";

export function Jobs({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Trabajos (Jobs)">
        Un sistema paralelo de progresión: hasta 3 trabajos activos por jugador, cada uno con su propio nivel y XP.
      </PageHeader>

      <SectionHeading id="trabajos-disponibles">Los 6 trabajos</SectionHeading>
      <Table>
        <Thead>
          <Th>ID</Th>
          <Th>Nombre</Th>
          <Th>Protección anti-farm</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">minero</Td><Td>Minero</Td><Td>No paga por bloques colocados por el propio jugador</Td></Tr>
          <Tr><Td className="font-mono text-xs">pescador</Td><Td>Pescador</Td><Td>—</Td></Tr>
          <Tr><Td className="font-mono text-xs">cazador</Td><Td>Cazador</Td><Td>No paga por mobs nacidos de spawner</Td></Tr>
          <Tr><Td className="font-mono text-xs">granjero</Td><Td>Granjero</Td><Td>Comparte la marca "de spawner" con Cazador para granjas automáticas de animales</Td></Tr>
          <Tr><Td className="font-mono text-xs">alquimista</Td><Td>Alquimista</Td><Td>—</Td></Tr>
          <Tr><Td className="font-mono text-xs">explorador</Td><Td>Explorador</Td><Td>Recompensa por bioma nuevo visitado y distancia recorrida, no por acciones repetibles</Td></Tr>
        </tbody>
      </Table>
      <p>
        Se cargan desde <code>plugins/RPGRoll/jobs/*.yml</code>, cada uno con recompensas por <em>target</em>{" "}
        (nombre de <code>Material</code> o <code>EntityType</code>) y, para Explorador, recompensas especiales por
        distancia/bioma.
      </p>

      <SectionHeading id="unirse-abandonar">Unirse y abandonar</SectionHeading>
      <p>
        <Kbd>/rpg jobs</Kbd> abre una GUI con el catálogo completo y tu estado en cada uno. Click en uno inactivo
        te une; click en uno activo lo abandona. El límite es <strong>3 trabajos activos</strong> — si ya estás en
        el máximo e intentás unirte a otro, se abre una GUI para elegir cuál abandonar primero.
      </p>
      <Callout tone="warning" title="El límite de 3 está fijo en código, no en config">
        <code>gameplay.yml</code> tiene <code>professions.max_per_player: 2</code>, pero el sistema real de Jobs
        usa la constante <code>PlayerJobs.MAX_ACTIVE_JOBS = 3</code> y nunca lee esa clave de config. Son dos
        sistemas de "profesiones" que no terminaron de unificarse — la config es efectivamente un residuo de un
        diseño anterior.
      </Callout>

      <SectionHeading id="recompensas">Cómo funciona una recompensa</SectionHeading>
      <p>
        Todos los listeners de trabajo (uno por trabajo) delegan en <code>JobRewardService.reward(player, jobId,
        target)</code>, que centraliza:
      </p>
      <ol>
        <li>Verifica que el jugador tenga ese trabajo activo.</li>
        <li>Busca la recompensa configurada para ese target — si no hay, no pasa nada.</li>
        <li>Paga dinero vía Vault, si hay economía activa y la recompensa incluye monto.</li>
        <li>Suma experiencia <em>del trabajo</em> (independiente de tu XP de personaje) y sube de nivel si corresponde.</li>
        <li>Muestra feedback en la action bar (XP y dinero ganado).</li>
      </ol>
      <CodeBlock
        language="text"
        code={"Curva de nivel de trabajo: expBase × (nivel - 1) ^ expMultiplier   (igual patrón que el XP de personaje)"}
      />

      <SectionHeading id="explorador">Explorador: un caso especial</SectionHeading>
      <p>
        No se dispara por romper/matar algo, sino por moverse: paga por cada bioma nuevo visitado y por tramos de
        distancia recorrida. Su progreso (biomas ya visitados, distancia acumulada) se guarda en su propia tabla (
        <code>explorer_progress</code>), separado de <code>player_jobs</code>.
      </p>

      <SectionHeading id="admin">Administración</SectionHeading>
      <p>
        <Kbd>{"/rpg job <give|remove|setlevel> <jugador> <jobId> [nivel]"}</Kbd> — asignar, quitar, o fijar el
        nivel de un trabajo de cualquier jugador conectado.
      </p>

      <PrevNext current="trabajos" onNavigate={onNavigate} />
    </>
  );
}
