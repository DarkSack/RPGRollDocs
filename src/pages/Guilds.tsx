import {
  PageHeader,
  SectionHeading,
  Callout,
  CodeBlock,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Kbd,
  Badge,
  PrevNext,
  YamlBuilder,
  type YamlField,
} from "../components/ui";

const guildQuestFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_mision_guild", placeholder: "first_boss" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "Primera Sangre" },
  { key: "description", label: "Descripción", type: "string" },
  {
    key: "type",
    label: "Tipo",
    type: "select",
    options: ["DEFEAT_BOSS", "COMPLETE_DUNGEON", "GATHER_RESOURCE", "WIN_WAR", "BUILD_BASE"],
  },
  {
    key: "target-reference",
    label: "Referencia del objetivo",
    type: "string",
    placeholder: "OAK_LOG (material/mob/dungeon según el tipo)",
  },
  { key: "target-amount", label: "Cantidad objetivo", type: "number", default: "1" },
  { key: "reward-money", label: "Recompensa: dinero", type: "number", default: "0" },
  { key: "reward-xp", label: "Recompensa: XP de guild", type: "number", default: "0" },
  { key: "min-guild-level", label: "Nivel mínimo de guild", type: "number", default: "1" },
];

export function Guilds({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Guilds (RPGRoll-Guilds)">
        Sistema social con dos capas: <strong>Teams</strong> (equipos temporales para una sesión de juego) y{" "}
        <strong>Guilds</strong> (organizaciones permanentes con banco, territorio, árbol de mejoras, diplomacia,
        misiones, logros, calendario y ranking).
      </PageHeader>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock
        language="yaml"
        code={"depend: [RPGRoll]\nsoftdepend: [RPGRoll-Items, RPGRoll-Quests, Vault, PlaceholderAPI]"}
      />
      <p>
        Sin Vault, el banco de la guild y el costo en dinero de crear una guild simplemente no cobran/pagan nada
        real. Sin RPGRoll-Quests, <code>WIN_WAR</code> y <code>COMPLETE_DUNGEON</code> igual funcionan si el addon
        correspondiente (RPGRoll-Dungeons) está presente — la dependencia declarada es informativa, no estricta.
      </p>

      <SectionHeading id="teams-vs-guilds">Teams vs. Guilds</SectionHeading>
      <Table>
        <Thead>
          <Th>{" "}</Th>
          <Th>Team</Th>
          <Th>Guild</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">Duración</Td><Td>Temporal — se disuelve solo</Td><Td>Permanente hasta <code>/guild disband</code></Td></Tr>
          <Tr><Td className="font-mono text-xs">Persistencia</Td><Td>Solo en memoria</Td><Td>Guardada en disco (<code>GuildStore</code>)</Td></Tr>
          <Tr><Td className="font-mono text-xs">Roles</Td><Td><code>TeamRole</code> (líder/miembro)</Td><Td><code>GuildRole</code>: LEADER, OFFICER, MEMBER, RECRUIT</Td></Tr>
          <Tr><Td className="font-mono text-xs">Sistemas propios</Td><Td>Buffs, ping, waypoint, cola de matchmaking</Td><Td>Banco, capital, territorio, árbol de mejoras, diplomacia, misiones, logros, calendario, ranking</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="contenido">No hay una "plantilla" de Guild en YAML</SectionHeading>
      <Callout tone="info" title="Guild es 100% runtime, no contenido cargado">
        A diferencia de todos los demás addons de esta documentación, <code>Guild</code> no implementa{" "}
        <code>RPGContent</code> ni se carga desde un <code>ContentManager</code> — se crea en memoria con{" "}
        <code>new Guild(id, nombre, fundadorId)</code> cuando un jugador ejecuta <code>/guild create</code>, y cada
        instancia se persiste como su propio archivo por <code>GuildStore</code>. No existe una carpeta de
        "guilds de ejemplo" para copiar, y el navegador gráfico (<code>/guildadmin browser guilds</code>) muestra
        guilds reales ya creadas, no plantillas.
      </Callout>
      <p>
        Lo único que sí es contenido YAML autoreable en este addon es <code>GuildQuestDefinition</code> — las
        misiones de guild que cualquier guild puede activar (según su nivel) para ganar dinero y XP de guild.
      </p>
      <CodeBlock
        language="yaml"
        code={
          "guild-creation:\n" +
          "  money-cost: 5000\n" +
          "  min-level: 5\n" +
          '  required-permission: ""\n' +
          '  required-quest: ""\n' +
          '  required-item: ""\n' +
          "  required-item-amount: 0\n"
        }
      />
      <p>
        Estos requisitos de creación (<code>config.yml</code>, no un content-type) sí se pueden ajustar sin
        recompilar: costo en dinero (Vault), nivel mínimo de personaje, un permiso, una quest completada
        (RPGRoll-Quests) y/o un ítem con cantidad mínima.
      </p>

      <SectionHeading id="guild-quests">Misiones de guild (GuildQuestDefinition)</SectionHeading>
      <p>
        Cada misión define un <code>type</code>, una referencia de objetivo (material para{" "}
        <code>GATHER_RESOURCE</code>, id de mob/dungeon para <code>DEFEAT_BOSS</code>/<code>COMPLETE_DUNGEON</code>
        ), una cantidad, recompensas y un nivel mínimo de guild para poder activarla.
      </p>
      <Callout tone="warning" title="WIN_WAR no tiene motor de guerra">
        El tipo <code>WIN_WAR</code> existe en el enum pero no hay ningún sistema de guerra entre guilds
        implementado que dispare su progreso — quedaría sin completarse nunca si la activás.
      </Callout>
      <CodeBlock
        language="yaml"
        filename="quests/first_boss.yml"
        code={
          "id: first_boss\n" +
          'display-name: "Primera Sangre"\n' +
          'description: "Derrotá tu primer jefe como guild."\n' +
          "type: DEFEAT_BOSS\n" +
          "target-amount: 1\n" +
          "reward-money: 500\n" +
          "reward-xp: 200\n" +
          "min-guild-level: 1\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="quests/gather_wood.yml"
        code={
          "id: gather_wood\n" +
          'display-name: "Recolectando Madera"\n' +
          'description: "Recolectá 200 bloques de madera de roble."\n' +
          "type: GATHER_RESOURCE\n" +
          "target-reference: OAK_LOG\n" +
          "target-amount: 200\n" +
          "reward-money: 300\n" +
          "reward-xp: 100\n" +
          "min-guild-level: 1\n"
        }
      />
      <YamlBuilder title="Constructor visual: Guild Quest" folder="quests" fields={guildQuestFields} />

      <SectionHeading id="roles">Roles y permisos dentro de una guild</SectionHeading>
      <Table>
        <Thead>
          <Th>Rol</Th>
          <Th>Invitar</Th>
          <Th>Expulsar</Th>
          <Th>Gestionar banco</Th>
          <Th>Gestionar ajustes</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">LEADER</Td><Td>sí</Td><Td>sí</Td><Td>sí</Td><Td>sí</Td></Tr>
          <Tr><Td className="font-mono text-xs">OFFICER</Td><Td>sí</Td><Td>sí</Td><Td>sí</Td><Td>no</Td></Tr>
          <Tr><Td className="font-mono text-xs">MEMBER</Td><Td>no</Td><Td>no</Td><Td>no</Td><Td>no</Td></Tr>
          <Tr><Td className="font-mono text-xs">RECRUIT</Td><Td>no</Td><Td>no</Td><Td>no</Td><Td>no</Td></Tr>
        </tbody>
      </Table>
      <p>
        "Gestionar ajustes" cubre territorio, capital, árbol de mejoras, diplomacia, calendario y personalización.
        Depositar en el banco siempre está permitido a cualquier miembro, sin importar el rol.
      </p>

      <SectionHeading id="gui">GUI: hub de guild + navegador/editor de misiones</SectionHeading>
      <p>
        <Kbd>/guild info</Kbd> (o el ítem correspondiente) abre <code>GuildHubGUI</code>, que enlaza a
        sub-pantallas propias: miembros, banco (<code>GuildVaultGUI</code>), territorio, árbol de mejoras,
        diplomacia, calendario, logros y personalización. Para el <strong>contenido YAML</strong> de esta página,{" "}
        <Kbd>{"/guildadmin browser [guilds|quests]"}</Kbd> (por defecto <code>guilds</code>) abre el navegador de
        guilds reales o el navegador/editor de <code>GuildQuestDefinition</code> con botón "Crear nueva".
      </p>

      <SectionHeading id="comandos-team">Comandos de jugador — /team</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/team create"}</Td><Td>Crea un equipo temporal.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/team invite <jugador>"}</Td><Td>Invita a un jugador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/team accept | decline"}</Td><Td>Acepta o rechaza la invitación pendiente.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/team leave | kick <jugador>"}</Td><Td>Sale del equipo, o expulsa a alguien.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/team promote | demote <jugador>"}</Td><Td>Cambia el rol de un miembro.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/team buff | ping | waypoint | chat | queue"}</Td><Td>Buffs de equipo, pings de mapa, waypoints compartidos, chat de equipo, cola de matchmaking.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="comandos-guild">Comandos de jugador — /guild</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/guild create <nombre>"}</Td><Td>Crea una guild si cumplís los requisitos de <code>guild-creation</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/guild disband</Td><Td>Disuelve tu guild (solo LEADER).</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/guild invite | accept | decline | leave | kick | promote | demote"}</Td><Td>Gestión de membresía y roles.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/guild info | vault | territory | upgrade | diplomacy | quest | achievements | calendar | ranking | chat | customize"}</Td><Td>Abren cada sub-sistema (la mayoría como GUI).</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="comandos-admin">Comandos de administrador — /guildadmin</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/guildadmin browser [guilds|quests]"}</Td><Td>Navegador de guilds reales, o de <code>GuildQuestDefinition</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/guildadmin delete <id>"}</Td><Td>Disuelve una guild por id (sin pasar por su LEADER).</Td></Tr>
          <Tr><Td className="font-mono text-xs">/guildadmin reload</Td><Td>Recarga las misiones de guild desde disco (no hay nada más que recargar — las guilds son runtime).</Td></Tr>
        </tbody>
      </Table>
      <p>Requiere <Badge tone="amber">rpgrollguilds.admin.*</Badge> (default: op).</p>

      <SectionHeading id="placeholders">Placeholders (PlaceholderAPI)</SectionHeading>
      <p>Expansión <Badge tone="violet">rpgrollguilds</Badge>.</p>
      <Table>
        <Thead>
          <Th>Placeholder</Th>
          <Th>Valor</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">%rpgrollguilds_guilds_count%</Td><Td>Cantidad total de guilds (único que no necesita jugador).</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollguilds_in_team% / _in_guild</Td><Td><code>si</code>/<code>no</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollguilds_team_name% / _team_size / _team_role</Td><Td>Datos de tu equipo actual, o <code>-</code>/<code>0</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollguilds_guild_name% / _guild_id / _guild_level / _guild_role / _guild_members</Td><Td>Datos de tu guild actual, o <code>-</code>/<code>0</code>.</Td></Tr>
        </tbody>
      </Table>

      <PrevNext current="guilds" onNavigate={onNavigate} />
    </>
  );
}
