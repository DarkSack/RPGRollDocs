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

const dungeonFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_mazmorra", placeholder: "trial_of_ash" },
  { key: "category", label: "Categoría", type: "string", default: "misc", placeholder: "trial" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&6Prueba de Ceniza" },
  { key: "icon", label: "Ícono (Material)", type: "string", default: "STONE_BRICKS" },
  { key: "description", label: "Descripción", type: "string" },
  { key: "recommended-level", label: "Nivel recomendado", type: "number", default: "1" },
  { key: "estimated-minutes", label: "Minutos estimados", type: "number", default: "15" },
  { key: "min-players", label: "Jugadores mínimos", type: "number", default: "1" },
  { key: "max-players", label: "Jugadores máximos", type: "number", default: "5" },
  { key: "cooldown", label: "Cooldown", type: "string", placeholder: "1h" },
  { key: "repeatable", label: "Repetible", type: "boolean", default: "true" },
  { key: "tags", label: "Tags", type: "list", placeholder: "trial, solo" },
  {
    key: "lobby",
    label: "Punto de lobby",
    type: "group",
    fields: [
      { key: "world", label: "Mundo", type: "string", default: "world" },
      { key: "x", label: "X", type: "number", default: "0" },
      { key: "y", label: "Y", type: "number", default: "64" },
      { key: "z", label: "Z", type: "number", default: "0" },
      { key: "yaw", label: "Yaw", type: "number", default: "0" },
      { key: "pitch", label: "Pitch", type: "number", default: "0" },
    ],
  },
  {
    key: "bounds",
    label: "Límites (bounds)",
    type: "group",
    fields: [
      { key: "world", label: "Mundo", type: "string", default: "world" },
      { key: "min-x", label: "Min X", type: "number", default: "0" },
      { key: "min-y", label: "Min Y", type: "number", default: "0" },
      { key: "min-z", label: "Min Z", type: "number", default: "0" },
      { key: "max-x", label: "Max X", type: "number", default: "0" },
      { key: "max-y", label: "Max Y", type: "number", default: "0" },
      { key: "max-z", label: "Max Z", type: "number", default: "0" },
    ],
  },
];

export function Dungeons({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Dungeons (RPGRoll-Dungeons)">
        Motor de mazmorras instanciadas: salas encadenadas, oleadas de mobs (vía RPGRoll-Mobs), jefes, objetivos,
        dificultades con multiplicadores, checkpoints/revive, loot y triggers por evento — con ranking de mejores
        tiempos.
      </PageHeader>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock
        language="yaml"
        code={"depend: [RPGRoll, RPGRoll-Mobs, RPGRoll-Guilds]\nsoftdepend: [RPGRoll-Items, RPGRoll-Quests, PlaceholderAPI]"}
      />
      <Callout tone="warning" title="Dos dependencias duras, no soft">
        A diferencia de casi todos los demás addons de RPGRoll, Dungeons <strong>no</strong> puede correr sin
        RPGRoll-Mobs (las oleadas y jefes referencian ids de <code>MobDefinition</code> directamente) ni sin
        RPGRoll-Guilds (los grupos que entran a una mazmorra se resuelven vía Team). RPGRoll-Items y
        RPGRoll-Quests sí son opcionales — sin ellos, ciertos tipos de loot/objetivo simplemente no hacen nada.
      </Callout>

      <SectionHeading id="estructura">Una mazmorra es una lista de salas</SectionHeading>
      <p>
        Cada <code>DungeonRoom</code> tiene un <code>type</code> (<code>ENTRANCE</code>, <code>COMBAT</code>,{" "}
        <code>PUZZLE</code>, <code>REST</code>, <code>TREASURE</code>, <code>BOSS</code>, <code>EVENT</code>,{" "}
        <code>STORY</code>, <code>CINEMATIC</code>), un punto de entrada, y según el tipo: <code>objectives</code>{" "}
        (salas normales/puzzle), <code>waves</code> de mobs (salas de combate), o un <code>boss</code> (id de{" "}
        <code>MobDefinition</code> de RPGRoll-Mobs, solo en salas <code>BOSS</code>). Cada sala puede además
        disparar <code>events</code> propios (<code>ROOM_ENTER</code>, <code>ROOM_CLEAR</code>...).
      </p>
      <Table>
        <Thead>
          <Th>Tipo de objetivo</Th>
          <Th>Uso típico</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">KILL_ENTITY / DESTROY_BLOCK / COLLECT_ITEM</Td><Td>Progreso directo, mismo estilo que RPGRoll-Quests.</Td></Tr>
          <Tr><Td className="font-mono text-xs">SURVIVE_TIME / RESIST_TIME</Td><Td>Aguantar sin morir/ser derrotado un tiempo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">DEFEND / ESCORT</Td><Td>Proteger un punto o un NPC/mob aliado.</Td></Tr>
          <Tr><Td className="font-mono text-xs">SOLVE_PUZZLE / ACTIVATE_MECHANISM</Td><Td>Salas de puzzle — la lógica real del mecanismo la implementa otro addon/plugin, esto solo trackea el flag.</Td></Tr>
          <Tr><Td className="font-mono text-xs">ESCAPE</Td><Td>Llegar a un punto de salida antes de que se acabe el tiempo.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="dificultades">Dificultades</SectionHeading>
      <p>
        Cada <code>DungeonDifficulty</code> multiplica vida/daño/loot de todo lo que ocurre dentro (mobs, jefes,
        recompensas) y puede sumar <code>modifiers</code>: <code>NO_HEALING</code>, <code>DOUBLE_DAMAGE_TAKEN</code>
        , <code>CONSTANT_RAIN</code>, <code>PERMANENT_DARKNESS</code>, <code>REDUCED_TIME_LIMIT</code>.
      </p>
      <Callout tone="tip">
        Si <code>difficulties</code> queda vacío en el YAML, el compacto constructor agrega automáticamente una
        dificultad <code>normal</code> con todos los multiplicadores en 1.0 — nunca hay una mazmorra sin ninguna
        dificultad jugable.
      </Callout>

      <SectionHeading id="checkpoints">Checkpoints y revivir</SectionHeading>
      <p>
        <code>checkpoints.mode</code> decide qué pasa al morir todo el grupo: volver al último checkpoint (
        <code>REVIVE_AT_CHECKPOINT</code>, default), reiniciar la sala (<code>RESTART_ROOM</code>), o la mazmorra
        entera (<code>RESTART_DUNGEON</code>). <code>revive.mode</code> decide cómo revive un jugador caído
        mientras el resto sigue vivo: nunca (<code>NONE</code>, default), automático, por un compañero, con un
        ítem, o esperando un timer.
      </p>

      <SectionHeading id="formato-yaml">Ejemplos de archivo YAML</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="dungeons/trial_of_ash.yml"
        code={
          "# Ejemplo mínimo: solo \"id\" es obligatorio, todo lo demás usa sus valores\n" +
          "# por defecto salvo lo que se especifique acá.\n" +
          "id: trial_of_ash\n" +
          "category: trial\n" +
          'display-name: "&6Prueba de Ceniza"\n' +
          "icon: NETHERRACK\n" +
          'description: "Una prueba corta de una sola sala, pensada para un jugador."\n' +
          "recommended-level: 5\n" +
          "estimated-minutes: 5\n" +
          "min-players: 1\n" +
          "max-players: 1\n" +
          "cooldown: 1h\n" +
          "repeatable: true\n" +
          "tags: [trial, solo]\n" +
          "\n" +
          "lobby:\n" +
          "  world: world\n" +
          "  x: 0\n" +
          "  y: 64\n" +
          "  z: 100\n" +
          "  yaw: 0\n" +
          "  pitch: 0\n" +
          "\n" +
          "bounds:\n" +
          "  world: world\n" +
          "  min-x: -15\n" +
          "  min-y: 50\n" +
          "  min-z: 85\n" +
          "  max-x: 15\n" +
          "  max-y: 80\n" +
          "  max-z: 115\n" +
          "\n" +
          "rooms:\n" +
          "  - id: sala_unica\n" +
          "    type: COMBAT\n" +
          "    entry:\n" +
          "      world: world\n" +
          "      x: 0\n" +
          "      y: 64\n" +
          "      z: 100\n" +
          "    waves:\n" +
          "      - id: wave1\n" +
          "        mobs:\n" +
          "          - id: forest_goblin\n" +
          "            amount: 2\n" +
          "        time-limit: 0s\n" +
          "        delay-before: 0s\n" +
          "\n" +
          "difficulties:\n" +
          "  - id: normal\n" +
          '    display-name: "Normal"\n' +
          "    health-multiplier: 1.0\n" +
          "    damage-multiplier: 1.0\n" +
          "    loot-multiplier: 1.0\n" +
          "\n" +
          "loot:\n" +
          "  - type: EXPERIENCE\n" +
          "    amount-min: 30\n" +
          "    amount-max: 50\n" +
          "    chance: 100\n" +
          "    scope: PER_PLAYER\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="dungeons/goblin_den.yml (fragmento — 3 salas, jefe y 2 dificultades)"
        code={
          "id: goblin_den\n" +
          "category: cave\n" +
          'display-name: "&2Guarida de los Trasgos"\n' +
          "min-players: 1\n" +
          "max-players: 4\n" +
          "cooldown: 12h\n" +
          "\n" +
          "rooms:\n" +
          "  - id: entrada\n" +
          "    type: ENTRANCE\n" +
          "    entry: { world: world, x: 0, y: 64, z: 5 }\n" +
          "    events:\n" +
          "      ROOM_ENTER:\n" +
          "        - type: MESSAGE\n" +
          '          value: "&2El eco de gruñidos resuena en la oscuridad..."\n' +
          "\n" +
          "  - id: sala_trasgos\n" +
          "    type: COMBAT\n" +
          "    waves:\n" +
          "      - id: wave1\n" +
          "        mobs: [{ id: forest_goblin, amount: 3 }]\n" +
          "        time-limit: 0s\n" +
          "      - id: wave2\n" +
          "        mobs: [{ id: forest_goblin, amount: 4 }]\n" +
          "        time-limit: 90s\n" +
          "        delay-before: 3s\n" +
          "\n" +
          "  - id: sala_jefe\n" +
          "    type: BOSS\n" +
          "    boss: ash_colossus\n" +
          "    events:\n" +
          "      ROOM_ENTER:\n" +
          "        - type: TITLE\n" +
          '          title: "&4&l¡El Coloso de Ceniza despierta!"\n' +
          "\n" +
          "difficulties:\n" +
          "  - id: normal\n" +
          '    display-name: "Normal"\n' +
          "    health-multiplier: 1.0\n" +
          "  - id: hard\n" +
          '    display-name: "Difícil"\n' +
          "    health-multiplier: 1.5\n" +
          "    damage-multiplier: 1.3\n" +
          "    modifiers: [DOUBLE_DAMAGE_TAKEN]\n" +
          "\n" +
          "checkpoints: { mode: REVIVE_AT_CHECKPOINT, shared-lives: false, max-retries: 3 }\n" +
          "revive: { mode: BY_TEAMMATE }\n" +
          "\n" +
          "triggers:\n" +
          "  DUNGEON_START:\n" +
          "    - type: MESSAGE\n" +
          '      value: "&a¡Entraron a la Guarida de los Trasgos!"\n'
        }
      />

      <Callout tone="tip" title="Referencia completa: todos los campos en un solo archivo">
        <code>dungeons/reference_full.yml</code> (incluido en el jar) usa los 9 tipos de sala, los 10 tipos de
        objetivo, oleadas, 3 dificultades con todos los modificadores, checkpoints/revive, los 5 tipos de loot con
        sus 3 scopes, y los 12 triggers.
      </Callout>

      <YamlBuilder
        title="Constructor visual: Dungeon"
        description="Identidad, límites de tiempo/jugadores, lobby y bounds. Rooms, waves, difficulties, checkpoints, revive, loot y triggers son demasiado anidados para un formulario lineal — el editor in-game los separa en pantallas propias (RoomsEditorGUI, WavesEditorGUI, DifficultiesEditorGUI...); acá lo más práctico es copiar y adaptar uno de los ejemplos de arriba."
        folder="dungeons"
        fields={dungeonFields}
      />

      <SectionHeading id="gui">GUI: navegador y editor con pantallas dedicadas</SectionHeading>
      <p>
        <Kbd>/dungeonadmin browser</Kbd> abre el navegador; <Kbd>{"/dungeonadmin editor <id>"}</Kbd> (o crear una
        nueva) abre <code>DungeonEditorHubGUI</code>, que enlaza a una pantalla propia por sección: info básica,
        salas, oleadas, dificultades, checkpoints/revive, loot y triggers. Todos los cambios se acumulan en una
        sesión de edición hasta guardar, sin importar cuánto navegues entre pantallas.
      </p>

      <SectionHeading id="comandos-jugador">Comandos de jugador — /dungeon</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/dungeon list</Td><Td>Lista mazmorras disponibles.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeon info <id>"}</Td><Td>Detalle: nivel recomendado, jugadores, dificultades, cooldown.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeon invite <jugador> | accept | decline"}</Td><Td>Arma el grupo antes de entrar.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/dungeon leaveparty</Td><Td>Sale del grupo previo a entrar.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeon enter <id> [dificultad]"}</Td><Td>Entra a la mazmorra con tu grupo actual.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/dungeon leave</Td><Td>Abandona la mazmorra en curso.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/dungeon revive</Td><Td>Intenta revivir según la política de revive de la mazmorra actual.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeon ranking <id>"}</Td><Td>Mejores tiempos registrados para esa mazmorra.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="comandos-admin">Comandos de administrador — /dungeonadmin</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/dungeonadmin create <id>"}</Td><Td>Crea una mazmorra base y abre el editor directo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeonadmin forcestop <id>"}</Td><Td>Termina a la fuerza una instancia activa.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/dungeonadmin browser</Td><Td>Abre el navegador gráfico.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeonadmin editor <id>"}</Td><Td>Abre el editor gráfico directo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/dungeonadmin reload</Td><Td>Recarga todas las definiciones desde disco.</Td></Tr>
        </tbody>
      </Table>
      <p>Requiere <Badge tone="amber">rpgrolldungeons.admin.*</Badge> (default: op).</p>

      <SectionHeading id="placeholders">Placeholders (PlaceholderAPI)</SectionHeading>
      <p>Expansión <Badge tone="violet">rpgrolldungeons</Badge>.</p>
      <Table>
        <Thead>
          <Th>Placeholder</Th>
          <Th>Valor</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">%rpgrolldungeons_active_count% / _definitions_count</Td><Td>Instancias activas / mazmorras definidas (globales al servidor).</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgrolldungeons_occupied_<id>%"}</Td><Td><code>si</code>/<code>no</code> — si esa mazmorra tiene una instancia corriendo ahora.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrolldungeons_in_dungeon%</Td><Td><code>si</code>/<code>no</code> para el jugador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrolldungeons_current_dungeon% / _current_room</Td><Td>Mazmorra y número de sala actual del jugador, o <code>-</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgrolldungeons_cooldown_<id>%"}</Td><Td>Segundos restantes de cooldown para esa mazmorra.</Td></Tr>
        </tbody>
      </Table>

      <PrevNext current="dungeons" onNavigate={onNavigate} />
    </>
  );
}
