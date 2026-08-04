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

const questFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_mision", placeholder: "hunter" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&cCazador de Zombies" },
  {
    key: "category",
    label: "Categoría",
    type: "select",
    options: [
      "MAIN_STORY",
      "SIDE_QUEST",
      "DAILY",
      "WEEKLY",
      "PROFESSION",
      "GUILD",
      "EVENT",
      "DUNGEON",
      "ACHIEVEMENT",
    ],
  },
  {
    key: "difficulty",
    label: "Dificultad",
    type: "select",
    options: ["EASY", "NORMAL", "HARD", "ELITE", "LEGENDARY", "MYTHIC"],
  },
  { key: "repeatable", label: "Repetible", type: "boolean" },
  { key: "cooldown", label: "Cooldown (si es repetible)", type: "string", placeholder: "24h" },
  {
    key: "requirements",
    label: "Requisitos",
    type: "group",
    fields: [{ key: "level", label: "Nivel mínimo", type: "number", default: "0" }],
  },
  {
    key: "rewards",
    label: "Recompensas",
    type: "group",
    fields: [
      { key: "money", label: "Dinero", type: "number", default: "0" },
      { key: "experience", label: "Experiencia", type: "number", default: "0" },
    ],
  },
];

const regionFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_region", placeholder: "castle" },
  { key: "world", label: "Mundo", type: "string", default: "world" },
  {
    key: "min",
    label: "Esquina mínima",
    type: "group",
    fields: [
      { key: "x", label: "X", type: "number", default: "0" },
      { key: "y", label: "Y", type: "number", default: "0" },
      { key: "z", label: "Z", type: "number", default: "0" },
    ],
  },
  {
    key: "max",
    label: "Esquina máxima",
    type: "group",
    fields: [
      { key: "x", label: "X", type: "number", default: "0" },
      { key: "y", label: "Y", type: "number", default: "0" },
      { key: "z", label: "Z", type: "number", default: "0" },
    ],
  },
];

export function Quests({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Misiones (RPGRoll-Quests)">
        Motor de misiones por etapas: objetivos, condiciones, diálogos con ramas, recompensas encadenables y
        regiones propias (sin WorldGuard) — sin GUI, todo por comando y chat.
      </PageHeader>

      <Callout tone="info" title="Autocontenido — su propio guardado en YAML por jugador">
        No usa la base de datos SQLite de <code>:core</code> ni PDC: el progreso de cada jugador vive en{" "}
        <code>plugins/RPGRoll-Quests/playerdata/&lt;uuid&gt;.yml</code>.
      </Callout>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll]\nsoftdepend: [PlaceholderAPI]"} />
      <p>No depende de RPGRoll-Items (las recompensas de ítem usan <code>Material</code> vanilla directo) ni de RPGRoll-NPCs (la integración es por un evento propio, ver más abajo).</p>

      <SectionHeading id="estructura">Una misión es una lista de etapas</SectionHeading>
      <p>
        Cada <code>QuestStage</code> tiene objetivos, condiciones y, opcionalmente, un diálogo. Por defecto avanza
        linealmente a la siguiente etapa de la lista cuando se cumplen todos sus objetivos <strong>y</strong>{" "}
        condiciones — pero si el diálogo de la etapa tiene opciones, la etapa <strong>no avanza sola</strong>: se
        le muestran al jugador como botones de chat clickeables, cada uno saltando a la etapa que quieras (para
        adelante, para atrás, o a cualquier id) — así es como se arma un árbol de decisiones real sobre una lista
        que en el archivo es plana.
      </p>
      <CodeBlock
        language="yaml"
        filename="quests/tutorial.yml (fragmento con ramas)"
        code={
          "stages:\n" +
          "  - id: talk_to_elder\n" +
          "    dialog:\n" +
          '      - npc: "Bienvenido aventurero."\n' +
          "    options:\n" +
          '      - label: "Aceptar la misión"\n' +
          "        next-stage: get_sword\n" +
          '      - label: "Pedir más información"\n' +
          "        next-stage: more_info\n" +
          "\n" +
          "  - id: more_info\n" +
          "    dialog:\n" +
          '      - npc: "Los monstruos salieron de una cueva al norte."\n' +
          "    options:\n" +
          '      - label: "Aceptar la misión"\n' +
          "        next-stage: get_sword\n" +
          '      - label: "Volver"\n' +
          "        next-stage: talk_to_elder\n"
        }
      />

      <SectionHeading id="objetivos">Objetivos</SectionHeading>
      <p>10 tipos incorporados, la mitad reactivos a eventos y la otra mitad chequeados por un polling cada 20 ticks:</p>
      <Table>
        <Thead>
          <Th>Tipo</Th>
          <Th>Cómo progresa</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">KILL_ENTITY</Td><Td>EntityDeathEvent, si mató un jugador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">BREAK_BLOCK / PLACE_BLOCK</Td><Td>BlockBreakEvent / BlockPlaceEvent.</Td></Tr>
          <Tr><Td className="font-mono text-xs">COLLECT_ITEM</Td><Td>EntityPickupItemEvent del jugador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">DELIVER_ITEM</Td><Td>Al hablar con el NPC correcto, consume los ítems del inventario del jugador si tiene suficientes.</Td></Tr>
          <Tr><Td className="font-mono text-xs">TALK_TO_NPC</Td><Td>Evento propio <code>NpcTalkEvent</code> (ver integración con NPCs).</Td></Tr>
          <Tr><Td className="font-mono text-xs">COMMAND</Td><Td>PlayerCommandPreprocessEvent — dispara con cualquier comando que empiece igual.</Td></Tr>
          <Tr><Td className="font-mono text-xs">WAIT</Td><Td>Polling: tiempo transcurrido desde que entraste a la etapa.</Td></Tr>
          <Tr><Td className="font-mono text-xs">REACH_LOCATION</Td><Td>Polling: distancia a un punto fijo, con radio configurable.</Td></Tr>
          <Tr><Td className="font-mono text-xs">DISCOVER_REGION</Td><Td>Polling: estar dentro de una región propia del addon.</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="tip">
        El progreso de objetivos se resetea al cambiar de etapa — cada objetivo cuenta desde 0 dentro de su propia
        etapa, no acumula entre etapas.
      </Callout>

      <SectionHeading id="condiciones">Condiciones</SectionHeading>
      <p>
        Mismo patrón liviano que Items/Mobs: comparaciones (<code>player.level &gt;= 5</code>) o una única función
        soportada (<code>player.hasPermission(perm)</code>), resueltas contra{" "}
        <code>player.level/health/foodlevel</code>, <code>race</code>, <code>class</code>, <code>world</code>,{" "}
        <code>weather</code> — extensible por otros addons.
      </p>

      <SectionHeading id="regiones">Regiones (sin WorldGuard)</SectionHeading>
      <p>Cuboides simples propias, exactamente como en RPGRoll-Mobs — sin dependencia externa:</p>
      <CodeBlock
        language="yaml"
        filename="regions/castle.yml"
        code={"id: castle\nworld: world\nmin: { x: 100, y: 60, z: -300 }\nmax: { x: 200, y: 90, z: -250 }\n"}
      />
      <CodeBlock
        language="yaml"
        filename="regions/forest.yml"
        code={
          "id: forest\n" +
          "world: world\n" +
          "\n" +
          "min:\n" +
          "  x: -150\n" +
          "  y: 60\n" +
          "  z: 50\n" +
          "\n" +
          "max:\n" +
          "  x: -50\n" +
          "  y: 100\n" +
          "  z: 150\n"
        }
      />

      <YamlBuilder title="Constructor visual: Region" folder="regions" fields={regionFields} />

      <Callout tone="warning" title="reload no recarga las regiones">
        <code>/questadmin reload</code> solo recarga las misiones. Un cambio en <code>regions/*.yml</code>{" "}
        necesita reiniciar el server, o usar el editor gráfico (que sí escribe a disco al instante, aunque no
        fuerza un reload del resto del server).
      </Callout>

      <SectionHeading id="recompensas">Recompensas y encadenado</SectionHeading>
      <p>Dinero (Vault), experiencia, ítems (<code>Material</code> vanilla, sin integración con RPGRoll-Items), comandos, y una lista de <strong>otras misiones para iniciar automáticamente</strong> al completar esta — permitiendo encadenar una campaña completa.</p>
      <Callout tone="warning" title="COMPLETE_QUEST es solo informativo">
        Existe como tipo de acción pero no fuerza ningún progreso — solo loguea. Para completar una misión desde
        afuera (recompensa u otro sistema) hay que usar <Kbd>{"/questadmin complete"}</Kbd> o encadenarla vía{" "}
        <code>rewards.quests</code>.
      </Callout>

      <SectionHeading id="npcs">Integración con RPGRoll-NPCs</SectionHeading>
      <Callout tone="warning" title="El gancho existe, pero nada lo dispara todavía">
        Quests escucha un evento propio <code>NpcTalkEvent</code> para progresar <code>TALK_TO_NPC</code> y{" "}
        <code>DELIVER_ITEM</code> — pensado para que cualquier sistema de NPCs lo dispare sin acoplarse a él. Al
        revisar el código de RPGRoll-NPCs, ningún listener llama a este evento todavía: la integración está
        definida de este lado, pero no conectada del otro.
      </Callout>

      <SectionHeading id="gui">GUI: navegador y editor para Quest y Region</SectionHeading>
      <p>
        <Kbd>{"/questadmin browser [quests|regions]"}</Kbd> (por defecto <code>quests</code>) abre un navegador con
        botón "Crear nueva". El editor de <code>Quest</code> cubre nombre, categoría, dificultad, repetible,
        cooldown, nivel requerido y recompensas de dinero/experiencia, más alta/baja rápida de ids de etapa; el de{" "}
        <code>Region</code> tiene botones "Fijar esquina mínima/máxima acá" que usan tu ubicación actual.
      </p>
      <Callout tone="warning" title="Objetivos y diálogo siguen siendo solo YAML">
        Ni el editor in-game ni el constructor visual de esta página tocan <code>objectives</code>,{" "}
        <code>dialog</code> ni <code>options</code> de una etapa — son demasiado anidados para un formulario lineal.
        Para el resto del juego (jugar la misión, ver diálogos, botones de rama) sigue sin haber ningún
        inventario/menú — todo pasa por <Kbd>/quest</Kbd> y mensajes de chat.
      </Callout>

      <SectionHeading id="formato-yaml">Ejemplo de archivo YAML</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="quests/hunter.yml"
        code={
          "id: hunter\n" +
          'display-name: "&cCazador de Zombies"\n' +
          "category: DAILY\n" +
          "difficulty: NORMAL\n" +
          "repeatable: true\n" +
          "cooldown: 24h\n" +
          "\n" +
          "requirements:\n" +
          "  level: 5\n" +
          "\n" +
          "stages:\n" +
          "  - id: hunt\n" +
          "    objectives:\n" +
          "      - type: KILL_ENTITY\n" +
          "        entity: ZOMBIE\n" +
          "        amount: 20\n" +
          '        description: "Elimina 20 zombies"\n' +
          "    on-complete:\n" +
          "      - type: TITLE\n" +
          '        title: "&c¡Cacería completa!"\n' +
          "\n" +
          "rewards:\n" +
          "  money: 250\n" +
          "  experience: 500\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="quests/tutorial.yml (completo)"
        code={
          "id: tutorial\n" +
          'display-name: "&aTutorial: Los Primeros Pasos"\n' +
          "category: MAIN_STORY\n" +
          "difficulty: EASY\n" +
          "repeatable: false\n" +
          "\n" +
          "stages:\n" +
          "  - id: talk_to_elder\n" +
          "    dialog:\n" +
          '      - npc: "Bienvenido aventurero."\n' +
          '      - player: "¿Necesitas ayuda?"\n' +
          "      - npc: |\n" +
          "          Claro. Hay monstruos cerca del bosque\n" +
          "          y necesito que alguien se encargue de ellos.\n" +
          "    options:\n" +
          '      - label: "Aceptar la misión"\n' +
          "        next-stage: get_sword\n" +
          '      - label: "Pedir más información"\n' +
          "        next-stage: more_info\n" +
          "    on-start:\n" +
          "      - type: MESSAGE\n" +
          '        value: "&e¡Nueva misión disponible: Tutorial!"\n' +
          "\n" +
          "  - id: more_info\n" +
          "    dialog:\n" +
          '      - npc: "Los monstruos salieron de una cueva al norte del pueblo."\n' +
          "    options:\n" +
          '      - label: "Aceptar la misión"\n' +
          "        next-stage: get_sword\n" +
          '      - label: "Volver"\n' +
          "        next-stage: talk_to_elder\n" +
          "\n" +
          "  - id: get_sword\n" +
          "    objectives:\n" +
          "      - type: COLLECT_ITEM\n" +
          "        material: WOODEN_SWORD\n" +
          "        amount: 1\n" +
          '        description: "Consigue una espada"\n' +
          "    on-complete:\n" +
          "      - type: MESSAGE\n" +
          '        value: "&aConseguiste tu espada."\n' +
          "\n" +
          "  - id: defeat_captain\n" +
          "    objectives:\n" +
          "      - type: KILL_ENTITY\n" +
          "        entity: ZOMBIE\n" +
          "        amount: 1\n" +
          '        description: "Derrota al capitán de los monstruos"\n' +
          "    on-complete:\n" +
          "      - type: SOUND\n" +
          "        sound: ENTITY_PLAYER_LEVELUP\n" +
          "\n" +
          "  - id: travel_to_kingdom\n" +
          "    objectives:\n" +
          "      - type: REACH_LOCATION\n" +
          "        world: world\n" +
          "        x: 120\n" +
          "        y: 65\n" +
          "        z: -340\n" +
          "        radius: 8\n" +
          '        description: "Viaja al reino"\n' +
          "    on-complete:\n" +
          "      - type: MESSAGE\n" +
          '        value: "&6¡Llegaste al reino! Así comienza la historia principal..."\n' +
          "\n" +
          "rewards:\n" +
          "  money: 100\n" +
          "  experience: 200\n" +
          "  items:\n" +
          "    - IRON_SWORD\n"
        }
      />

      <YamlBuilder
        title="Constructor visual: Quest"
        description="Identidad, categoría/dificultad, cooldown, requisito de nivel y recompensas simples. Las etapas (stages) con objetivos/diálogo/ramas son demasiado anidadas para este formulario — usá uno de los ejemplos de arriba como base y editalo a mano, o construilas directamente en el editor in-game."
        folder="quests"
        fields={questFields}
      />

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/quest list</Td><Td>Lista todas las misiones definidas.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/quest info <id>"}</Td><Td>Categoría, dificultad, cantidad de etapas, si es repetible.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/quest start <id>"}</Td><Td>La inicia si cumplís requisitos, no está en cooldown y no la tenés activa.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/quest abandon <id>"}</Td><Td>La abandona (sin penalidad ni recompensa).</Td></Tr>
          <Tr><Td className="font-mono text-xs">/quest active</Td><Td>Lista tus misiones activas y en qué etapa vas.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/quest completed</Td><Td>Cuántas y cuáles completaste.</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title="track no existe">
        El <code>plugin.yml</code> anuncia <code>/quest track</code> en su texto de uso, pero el comando no tiene
        ese subcomando implementado — escribirlo solo te muestra el mensaje de uso.
      </Callout>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/questadmin give <jugador> <id>"}</Td><Td>Inicio forzado — ignora requisitos, cooldown y repetibilidad.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/questadmin complete <jugador> <id>"}</Td><Td>Completa una misión activa al instante, con recompensas completas.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/questadmin fail <jugador> <id>"}</Td><Td>La marca como fallida (sin recompensa).</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/questadmin reset <jugador> <id>"}</Td><Td>Borra todo rastro de esa misión para el jugador — permite reiniciar incluso una no repetible.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/questadmin browser [quests|regions]"}</Td><Td>Abre el navegador gráfico de misiones o regiones.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/questadmin reload</Td><Td>Recarga misiones (no regiones).</Td></Tr>
        </tbody>
      </Table>
      <p>Requiere <Badge tone="amber">rpgrollquests.admin.*</Badge> (default: op).</p>

      <SectionHeading id="placeholders">Placeholders (PlaceholderAPI)</SectionHeading>
      <p>Expansión <Badge tone="violet">rpgrollquests</Badge>.</p>
      <Table>
        <Thead>
          <Th>Placeholder</Th>
          <Th>Valor</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">%rpgrollquests_active_count%</Td><Td>Cantidad de misiones activas.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollquests_completed_count%</Td><Td>Cantidad de misiones completadas en total.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgrollquests_is_active_<id>%"} / {"%rpgrollquests_has_completed_<id>%"}</Td><Td><code>si</code>/<code>no</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgrollquests_active_<id>_stage%"}</Td><Td>Id de la etapa actual de esa misión, o <code>-</code> si no está activa.</Td></Tr>
        </tbody>
      </Table>

      <PrevNext current="quests" onNavigate={onNavigate} />
    </>
  );
}
