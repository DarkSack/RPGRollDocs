import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";
import { pageTitle } from "../content/nav";
import { useI18n, fill, localizedPageLabel } from "../i18n";
import { CONFIG_DB_COPY, type ConfigDatabaseCopy } from "./copy/configDatabase";

type MigrationKey = keyof ConfigDatabaseCopy["database"];

const migrations: { version: string; file: string; key: MigrationKey }[] = [
  { version: "V1", file: "create_players.sql", key: "m1" },
  { version: "V2", file: "create_player_stats.sql", key: "m2" },
  { version: "V3", file: "create_player_skills.sql", key: "m3" },
  { version: "V4", file: "create_player_traits.sql", key: "m4" },
  { version: "V5", file: "create_player_jobs.sql", key: "m5" },
  { version: "V6", file: "create_placed_blocks.sql", key: "m6" },
  { version: "V7", file: "create_explorer_progress.sql", key: "m7" },
  { version: "V8", file: "add_placed_at_to_placed_blocks.sql", key: "m8" },
  { version: "V9", file: "add_stat_points_and_resources.sql", key: "m9" },
];

export function Database({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = CONFIG_DB_COPY[locale].database;

  return (
    <>
      <PageHeader title={c.title} slug="base-de-datos">
        {c.intro}
      </PageHeader>

      <SectionHeading id="migraciones">{c.migrationsTitle}</SectionHeading>
      <p>
        {fill(c.migrationsBody, {
          sql: <code>.sql</code>,
          dir: <code>database/migrations/</code>,
          registry: <code>MigrationRegistry</code>,
          tracker: <code>SchemaVersionTracker</code>,
          migrator: <code>DatabaseMigrator</code>,
        })}
      </p>

      <Table>
        <Thead>
          <Th>{c.thVersion}</Th>
          <Th>{c.thFile}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          {migrations.map((m) => (
            <Tr key={m.version}>
              <Td className="font-mono text-xs">{m.version}</Td>
              <Td className="whitespace-nowrap font-mono text-xs">{m.file}</Td>
              <Td>{c[m.key] as string}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <Callout tone="tip">
        {fill(c.tipBody, {
          file: <code>V10__descripcion.sql</code>,
          dir: <code>core/src/main/resources/database/migrations/</code>,
          call: <code>MigrationRegistry.registerMigrations()</code>,
          register: <code>register(10, "V10__descripcion.sql")</code>,
        })}
      </Callout>

      <SectionHeading id="esquema">{c.schemaTitle}</SectionHeading>
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
          "placed_blocks        (anti-farm, placed_at)\n" +
          "explorer_progress    (biomes, distance)\n"
        }
      />

      <SectionHeading id="conexion">{c.connTitle}</SectionHeading>
      <p>
        {fill(c.connBody, { file: <code>database.yml</code> })}{" "}
        <button type="button" className="underline" onClick={() => onNavigate("configuracion")}>
          {localizedPageLabel("configuracion", pageTitle("configuracion"), locale)}
        </button>{" "}
        {c.connAfter}
      </p>

      <PrevNext current="base-de-datos" onNavigate={onNavigate} />
    </>
  );
}
