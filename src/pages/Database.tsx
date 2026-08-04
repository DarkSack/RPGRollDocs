import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";

const migrations = [
  { version: "V1", file: "create_players.sql", desc: "Tabla players: identidad, raza, clase, nivel, experiencia." },
  { version: "V2", file: "create_player_stats.sql", desc: "Tabla player_stats: los 6 atributos D&D." },
  { version: "V3", file: "create_player_skills.sql", desc: "Tabla player_skills: habilidades aprendidas y su nivel." },
  { version: "V4", file: "create_player_traits.sql", desc: "Tabla player_traits: traits adquiridos." },
  { version: "V5", file: "create_player_jobs.sql", desc: "Tabla player_jobs: trabajos activos, nivel y experiencia." },
  { version: "V6", file: "create_placed_blocks.sql", desc: "Tabla placed_blocks: anti-farm del Minero." },
  { version: "V7", file: "create_explorer_progress.sql", desc: "Tabla explorer_progress: biomas visitados y distancia recorrida." },
  { version: "V8", file: "add_placed_at_to_placed_blocks.sql", desc: "Agrega timestamp a placed_blocks (para la limpieza periódica)." },
  { version: "V9", file: "add_stat_points_and_resources.sql", desc: "Agrega unspent_stat_points a players, y max/current health/mana a player_stats." },
];

export function Database({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Base de datos">
        SQLite embebido (sin servidor externo), con un sistema de migraciones versionadas propio.
      </PageHeader>

      <SectionHeading id="migraciones">Sistema de migraciones</SectionHeading>
      <p>
        Cada migración es un archivo <code>.sql</code> plano dentro del jar (
        <code>database/migrations/</code>), registrado manualmente en{" "}
        <code>MigrationRegistry</code> con un número de versión. <code>SchemaVersionTracker</code> guarda qué
        versiones ya se aplicaron; <code>DatabaseMigrator</code> corre las pendientes en orden, cada una dentro de
        su propia transacción (rollback automático si falla).
      </p>

      <Table>
        <Thead>
          <Th>Versión</Th>
          <Th>Archivo</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          {migrations.map((m) => (
            <Tr key={m.version}>
              <Td className="font-mono text-xs">{m.version}</Td>
              <Td className="font-mono text-xs whitespace-nowrap">{m.file}</Td>
              <Td>{m.desc}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <Callout tone="tip">
        Para agregar tu propia migración: creá <code>V10__descripcion.sql</code> en{" "}
        <code>core/src/main/resources/database/migrations/</code>, y registrala en{" "}
        <code>MigrationRegistry.registerMigrations()</code> con <code>register(10, "V10__descripcion.sql")</code>.
        Las migraciones se ejecutan en orden y nunca se re-corren una vez aplicadas.
      </Callout>

      <SectionHeading id="esquema">Esquema actual (tablas principales)</SectionHeading>
      <CodeBlock
        language="text"
        code={
          "players\n" +
          "├── uuid (PK)\n" +
          "├── username, race, class\n" +
          "├── level, experience\n" +
          "├── created_at, last_login\n" +
          "└── unspent_stat_points        (V9)\n" +
          "\n" +
          "player_stats\n" +
          "├── uuid (PK, FK → players)\n" +
          "├── strength, dexterity, constitution, intelligence, wisdom, charisma\n" +
          "└── max_health, current_health, max_mana, current_mana   (V9)\n" +
          "\n" +
          "player_skills        (uuid, skill_id, skill_level)\n" +
          "player_traits        (uuid, trait_id)\n" +
          "player_jobs          (uuid, job_id, level, experience)\n" +
          "placed_blocks        (anti-farm del Minero, con placed_at)\n" +
          "explorer_progress    (biomas visitados, distancia acumulada)\n"
        }
      />

      <SectionHeading id="conexion">Configuración de conexión</SectionHeading>
      <p>
        Ver <code>database.yml</code> en{" "}
        <button className="underline" onClick={() => onNavigate("configuracion")}>
          Configuración
        </button>{" "}
        — modo WAL activado por defecto para mejor concurrencia lectura/escritura.
      </p>

      <PrevNext current="base-de-datos" onNavigate={onNavigate} />
    </>
  );
}
