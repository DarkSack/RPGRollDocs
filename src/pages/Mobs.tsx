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

const mobFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_mob", placeholder: "forest_goblin" },
  {
    key: "category",
    label: "Categoría",
    type: "select",
    options: [
      "NORMAL",
      "MINI_BOSS",
      "WORLD_BOSS",
      "RAID_BOSS",
      "DUNGEON_BOSS",
      "ELITE",
      "SUMMON",
      "SPIRIT",
      "HOSTILE_PET",
      "NEUTRAL",
      "ARMED_MERCHANT",
      "GUARDIAN",
      "CINEMATIC_BOSS",
    ],
  },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&2Trasgo del Bosque" },
  { key: "base-entity-type", label: "Tipo de entidad base (Bukkit)", type: "string", placeholder: "ZOMBIE" },
  { key: "level", label: "Nivel", type: "number", default: "1" },
  { key: "rarity", label: "Rareza (id)", type: "string", default: "common" },
  { key: "tags", label: "Tags", type: "list", placeholder: "forest, humanoid" },
  { key: "description", label: "Descripción", type: "string" },
  {
    key: "model",
    label: "Modelo",
    type: "group",
    fields: [
      { key: "scale", label: "Escala", type: "number", default: "1.0" },
      { key: "glow", label: "Brillo", type: "boolean" },
      { key: "invisible", label: "Invisible", type: "boolean" },
    ],
  },
  { key: "stats", label: "Stats", type: "map", placeholder: "health=30, damage=4, speed=105" },
  { key: "resistances", label: "Resistencias", type: "map", placeholder: "poison=25" },
  {
    key: "ai",
    label: "IA",
    type: "group",
    fields: [
      { key: "goals", label: "Goals (orden de prioridad)", type: "list", placeholder: "ATTACK_PLAYERS, FLEE" },
      { key: "aggro-range", label: "Rango de aggro", type: "number", default: "16" },
      { key: "flee-health-percent", label: "% de vida para huir", type: "number", default: "0" },
      { key: "move-speed", label: "Velocidad de movimiento", type: "number", default: "1.0" },
    ],
  },
];

const mobRegionFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_region", placeholder: "volcano_arena" },
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

export function Mobs({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Mobs y jefes (RPGRoll-Mobs)">
        Motor de criaturas personalizadas: mobs normales, mini-jefes y jefes con fases, IA propia, resistencias,
        loot con probabilidad y bossbar/diálogos — todo definido en YAML, con editor gráfico incluido.
      </PageHeader>

      <Callout tone="info" title="Alcance de esta primera versión: núcleo PvE a fondo">
        RPGRoll-Mobs se pensó originalmente con un alcance enorme (integración con ModelEngine/BetterModel,
        WorldGuard/WorldEdit, eventos cinematográficos guionados). Esta primera pasada prioriza profundidad real en
        definición de mob, motor de combate, comportamiento y fases de jefe — el resto queda documentado como
        punto de extensión, no implementado (ver <a href="#extension" onClick={(e) => e.preventDefault()}>al
        final de esta página</a>).
      </Callout>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock
        language="yaml"
        code={"depend: [RPGRoll]\nsoftdepend: [RPGRoll-Items, RPGRoll-Quests, PlaceholderAPI, SackResourcePack]"}
      />
      <p>
        Sin RPGRoll-Items ni RPGRoll-Quests instalados, todo sigue funcionando: el equipo de un mob cae a{" "}
        <code>Material</code> vanilla directo, el loot de tipo <code>ITEM</code> también, y el loot de tipo{" "}
        <code>QUEST</code> simplemente no hace nada. Sin{" "}
        <button
          type="button"
          onClick={() => onNavigate("sackresourcepack")}
          className="text-violet-600 underline dark:text-violet-400"
        >
          SackResourcePack
        </button>
        , las <a href="#reskin" onClick={(e) => e.preventDefault()}>skins visuales</a> de un mob simplemente no
        aparecen configuradas como opción (no rompe nada — el mob se ve vanilla normal).
      </p>

      <SectionHeading id="filosofia">Un mob es una composición de sistemas independientes</SectionHeading>
      <p>
        Cada <code>MobDefinition</code> es un registro (<em>record</em>) que junta 21 componentes: identidad,
        modelo, stats, resistencias, debilidades, IA, skills, triggers, fases, loot, bossbar, diálogos, reglas de
        spawn y datos custom. Ningún componente es obligatorio salvo <code>id</code> y{" "}
        <code>base-entity-type</code> — todo lo demás tiene un valor por defecto razonable.
      </p>

      <SectionHeading id="ia">IA simulada, no vanilla</SectionHeading>
      <p>
        Bukkit/Paper no expone el sistema real de <em>pathfinding-goals</em> de Minecraft (es interno de NMS). En
        vez de usar reflection, cada mob RPGRoll arranca con <code>Mob#setAware(false)</code> — apaga{" "}
        <strong>toda</strong> la IA vanilla — y una tarea propia (<code>MobAITask</code>) corre cada 10 ticks
        evaluando sus <code>goals</code> en orden de prioridad, moviéndolo con{" "}
        <code>Pathfinder#moveTo(...)</code> y <code>Mob#setTarget(...)</code>.
      </p>
      <Table>
        <Thead>
          <Th>Goal</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">ATTACK_PLAYERS</Td><Td>Busca al jugador survival/adventure más cercano dentro del rango de aggro, lo persigue y ataca cuerpo a cuerpo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">FLEE</Td><Td>Si la vida cae debajo de <code>flee-health-percent</code>, huye en dirección opuesta a su objetivo actual.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PATROL</Td><Td>Recorre <code>patrol-points</code> (lista de coordenadas <code>x,y,z</code>) en orden, ciclando.</Td></Tr>
          <Tr><Td className="font-mono text-xs">GUARD_REGION</Td><Td>Si sale de la región indicada en <code>guard-region</code>, vuelve caminando a su centro.</Td></Tr>
          <Tr><Td className="font-mono text-xs">DEFEND_ALLY</Td><Td>Si un mob de la misma definición cerca tiene target, ese mob también ataca a ese jugador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">FOLLOW_LEADER</Td><Td>Sigue al mob más cercano de la misma definición.</Td></Tr>
          <Tr><Td className="font-mono text-xs">STAY_STILL</Td><Td>No hace nada — útil como último goal de la lista, o para mobs puramente decorativos/comerciantes.</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="tip">
        Los goals se evalúan <strong>en el orden en que aparecen</strong> en <code>ai.goals</code> — el primero
        que aplica ese tick gana. Un mob con <code>[FLEE, ATTACK_PLAYERS]</code> prioriza huir sobre pelear en
        cuanto cruza el umbral de vida.
      </Callout>

      <SectionHeading id="combate">Motor de combate</SectionHeading>
      <p>Los stats se aplican de verdad, no son solo cosmética:</p>
      <ul>
        <li><strong>health / speed / armor / knockback_resistance</strong> — se mapean a atributos vanilla reales (<code>GENERIC_MAX_HEALTH</code>, etc.) al spawnear.</li>
        <li><strong>damage / accuracy / critical_chance / critical_damage</strong> — se resuelven en el propio ataque cuerpo a cuerpo del mob: <code>accuracy</code> es la chance de no fallar el golpe, <code>critical_chance</code>/<code>critical_damage</code> aplican un multiplicador extra.</li>
        <li><strong>dodge</strong> — chance de anular por completo cualquier daño entrante (propio o de otro jugador/mob), evaluado antes de aplicar resistencias.</li>
        <li><strong>defense / resistance</strong> — reducción plana de daño, aplicada después del multiplicador elemental.</li>
        <li><strong>resistances / weaknesses</strong> — % de reducción o de daño extra según el <code>DamageCause</code> de Bukkit mapeado a un elemento (fire, water, ice, electric, poison, dark, magic, explosion, arrow).</li>
      </ul>
      <Callout tone="warning" title="El daño se resuelve un tick después">
        Cuando un mob recibe daño, el listener ajusta el daño del evento en el momento (esquive/resistencias), pero
        el chequeo de transición de fase y el trigger <code>DAMAGED</code> se agendan para el próximo tick — recién
        ahí <code>getHealth()</code> refleja la vida ya restada por Bukkit.
      </Callout>

      <SectionHeading id="reskin">Skins visuales (sin ModelEngine/BetterModel)</SectionHeading>
      <p>
        Minecraft no tiene ningún equivalente a <code>CustomModelData</code> para entidades vivas — no hay forma de
        re-texturizar un mob vanilla solo con un resource pack. RPGRoll-Mobs implementa el mismo truco que usan
        plugins como ModelEngine, pero desde cero y sin esa dependencia: la entidad vanilla real sigue siendo la
        que pelea/camina (hitbox, IA, pathfinding intactos), pero se le monta una entidad <code>ItemDisplay</code>{" "}
        como pasajero real, portando un ítem con <code>custom-model-data</code>. Combinado con{" "}
        <code>model.invisible: true</code>, el jugador solo ve el modelo custom, nunca la entidad vanilla debajo.
      </p>
      <p>
        <code>model.skins</code> es una <strong>lista</strong>, no un valor único: al spawnear el mob se sortea
        una skin por peso (<code>weight</code>, mayor = más probable) y esa elección queda persistida en la
        entidad — un reinicio del server o una recarga de chunk nunca le cambia la apariencia a un mob ya vivo
        (no vuelve a sortear). Lista vacía (o sin la sección) = sin reskin, mob vanilla normal.
      </p>
      <CodeBlock
        language="yaml"
        filename="mobs/bosses/reference_full.yml (fragmento)"
        code={
          "model:\n" +
          "  invisible: true\n" +
          "  skins:\n" +
          "    - id: molten\n" +
          "      material: PAPER\n" +
          "      custom-model-data: 100001\n" +
          "      scale: 2.5\n" +
          "      weight: 2.0\n" +
          "    - id: obsidian\n" +
          "      material: PAPER\n" +
          "      custom-model-data: 100002\n" +
          "      scale: 2.5\n" +
          "      weight: 1.0\n"
        }
      />
      <p>
        Con este ejemplo, un mob nuevo tiene 2/3 de chance de nacer "molten" y 1/3 "obsidian". El material y el
        número de <code>custom-model-data</code> los define un resource pack real — el mismo pipeline que ya usa
        RPGRoll-Items: poné el modelo/textura en{" "}
        <code>plugins/RPGRoll-Mobs/resourcepack/&lt;namespace&gt;/&lt;textures|models&gt;/item/...</code> y, si
        SackResourcePack está instalado, se sincroniza solo al arrancar el plugin.
      </p>
      <p>
        Desde <Kbd>{"/mobadmin editor <id>"}</Kbd> → Modelo → Skins se administra la lista sin tocar el YAML a
        mano: agregar pide <code>id material custom-model-data [peso]</code> por chat, shift-click sobre una
        entrada existente la quita.
      </p>
      <Callout tone="warning" title="Solo verificado por compilación, no probado en juego">
        Esta primera versión de las skins no fue probada visualmente contra un cliente real de Minecraft (sin
        servidor Paper disponible en el entorno de desarrollo) — la lógica de sorteo/montaje/persistencia/limpieza
        está completa, pero conviene probarla en un server de pruebas antes de usarla en producción.
      </Callout>

      <SectionHeading id="fases">Fases de jefe</SectionHeading>
      <p>
        Cada <code>MobPhase</code> tiene un <code>health-threshold-percent</code>: al cruzar ese % de vida hacia
        abajo, se activa la fase con umbral más bajo entre las ya cruzadas (la más profunda en el combate). Las
        fases son <strong>aditivas</strong>: las skills de una fase se suman a las que el mob ya tenía, no las
        reemplazan. Además puede sobreescribir color/título de la bossbar, disparar una línea de diálogo, y
        cambiar la partícula de aura.
      </p>

      <SectionHeading id="loot">Loot</SectionHeading>
      <p>
        Cada entrada tiene <code>type</code> (<Badge tone="green">ITEM</Badge> <Badge tone="amber">MONEY</Badge>{" "}
        <Badge tone="blue">EXPERIENCE</Badge> <Badge tone="violet">COMMAND</Badge> <Badge>QUEST</Badge>),
        cantidad mín/máx, probabilidad, nivel mínimo requerido, y <code>scope</code>:
      </p>
      <ul>
        <li><strong>SHARED</strong> — se sortea una sola vez, entregado a quien dio el golpe final.</li>
        <li><strong>PER_PLAYER</strong> — se sortea una vez <em>por cada jugador</em> que contribuyó daño (trackeado en memoria mientras el mob está vivo — no persiste a través de un reinicio del server).</li>
      </ul>

      <SectionHeading id="formato-yaml">Formato del archivo YAML</SectionHeading>
      <p>
        Se cargan recursivamente desde <code>plugins/RPGRoll-Mobs/mobs/**/*.yml</code> (admite subcarpetas por
        categoría). Ejemplo de un mob normal:
      </p>
      <CodeBlock
        language="yaml"
        filename="mobs/normal/forest_goblin.yml"
        code={
          "id: forest_goblin\n" +
          "category: NORMAL\n" +
          'display-name: "&2Trasgo del Bosque"\n' +
          "level: 5\n" +
          "rarity: common\n" +
          'tags: [ "forest", "humanoid" ]\n' +
          'description: "Un trasgo hostil que ronda los bosques densos."\n' +
          "base-entity-type: ZOMBIE\n" +
          "\n" +
          "model:\n" +
          "  scale: 0.85\n" +
          "  glow: false\n" +
          "  invisible: false\n" +
          "  equipment:\n" +
          "    hand: STONE_SWORD\n" +
          "    head: LEATHER_HELMET\n" +
          "\n" +
          "stats:\n" +
          "  health: 30\n" +
          "  damage: 4\n" +
          "  defense: 1\n" +
          "  speed: 105\n" +
          "  armor: 2\n" +
          "  dodge: 5\n" +
          "  accuracy: 90\n" +
          "  critical_chance: 10\n" +
          "  critical_damage: 50\n" +
          "  knockback_resistance: 0\n" +
          "\n" +
          "resistances:\n" +
          "  poison: 25\n" +
          "\n" +
          "ai:\n" +
          '  goals: [ "ATTACK_PLAYERS", "FLEE" ]\n' +
          "  aggro-range: 14\n" +
          "  flee-health-percent: 20\n" +
          "  move-speed: 1.05\n" +
          "\n" +
          "skills:\n" +
          "  - id: goblin_screech\n" +
          '    display-name: "Chillido"\n' +
          "    trigger: PERIODIC\n" +
          "    cooldown: 20s\n" +
          "    chance: 30\n" +
          "    conditions:\n" +
          '      - "target.type == PLAYER"\n' +
          "    actions:\n" +
          "      - type: SOUND\n" +
          "        sound: ENTITY_VEX_HURT\n" +
          '        volume: "1.0"\n' +
          '        pitch: "1.4"\n' +
          "\n" +
          "loot:\n" +
          "  - type: ITEM\n" +
          "    reference: IRON_NUGGET\n" +
          "    amount-min: 1\n" +
          "    amount-max: 3\n" +
          "    chance: 60\n" +
          "    scope: SHARED\n" +
          "  - type: MONEY\n" +
          "    amount-min: 2\n" +
          "    amount-max: 5\n" +
          "    chance: 100\n" +
          "    scope: PER_PLAYER\n" +
          "\n" +
          "spawn-rules:\n" +
          '  biomes: [ "forest", "dark_forest", "birch_forest" ]\n' +
          "  min-height: 60\n" +
          "  max-height: 200\n" +
          '  hour: "19-6"\n' +
          "  natural-spawn: false\n" +
          "  spawn-weight: 1.0\n"
        }
      />
      <p>
        Un mini-jefe agrega <code>phases</code>, <code>bossbar</code>, <code>dialogues</code> y{" "}
        <code>triggers</code> (acciones directas por evento, sin pasar por el sistema de skills):
      </p>
      <CodeBlock
        language="yaml"
        filename="mobs/bosses/ash_colossus.yml (fragmento)"
        code={
          "category: MINI_BOSS\n" +
          "phases:\n" +
          "  - id: enraged\n" +
          "    health-threshold-percent: 50\n" +
          "    stat-multipliers:\n" +
          "      damage: 1.4\n" +
          "      speed: 1.2\n" +
          "    skills:\n" +
          "      - id: ash_nova\n" +
          "        trigger: PERIODIC\n" +
          "        cooldown: 15s\n" +
          "        chance: 70\n" +
          "        actions:\n" +
          "          - type: DAMAGE\n" +
          '            amount: "10"\n' +
          "    bossbar-title: \"&4&lColoso de Ceniza &7[Enfurecido]\"\n" +
          "\n" +
          "triggers:\n" +
          "  PHASE_CHANGE:\n" +
          "    - type: TITLE\n" +
          '      title: "&c&l¡EL COLOSO DESPIERTA!"\n' +
          "\n" +
          "bossbar:\n" +
          "  enabled: true\n" +
          "  color: RED\n" +
          "  style: NOTCHED_10\n"
        }
      />

      <Callout tone="tip" title="Referencia completa: todos los campos en un solo archivo">
        <code>mobs/bosses/reference_full.yml</code> (incluido en el jar) usa absolutamente todos los campos de un
        mob: modelo, stats, resistencias, debilidades, IA, skills, los 12 triggers, fases, los 5 tipos de loot,
        bossbar, diálogos y reglas de spawn.
      </Callout>

      <SectionHeading id="skills">Skills, triggers y condiciones</SectionHeading>
      <p>
        Una skill tiene <code>trigger</code> (o ninguno, si es pasiva), <code>cooldown</code>, <code>chance</code>{" "}
        de disparar, una lista de <code>conditions</code> (expresiones simples tipo{" "}
        <code>mob.health &lt; 50%</code>, <code>target.type == PLAYER</code>, <code>night == true</code>) y una
        lista de <code>actions</code>.
      </p>
      <Table>
        <Thead>
          <Th>Trigger</Th>
          <Th>Cuándo dispara</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">SPAWN / DEATH</Td><Td>Al crear/morir el mob.</Td></Tr>
          <Tr><Td className="font-mono text-xs">DAMAGED / ATTACK</Td><Td>Al recibir daño / al golpear cuerpo a cuerpo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PHASE_CHANGE</Td><Td>Al entrar a una nueva fase.</Td></Tr>
          <Tr><Td className="font-mono text-xs">LOSE_TARGET</Td><Td>Cuando pierde de vista a su objetivo actual.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PLAYER_ENTER_RANGE</Td><Td>La primera vez que un jugador entra a su rango de aggro.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PERIODIC / HEALTH_THRESHOLD</Td><Td>Cada pocos segundos, mientras esté vivo.</Td></Tr>
        </tbody>
      </Table>
      <p>Acciones incorporadas: <code>MESSAGE</code>, <code>COMMAND</code>, <code>SOUND</code>, <code>PARTICLE</code>, <code>DAMAGE</code>, <code>HEAL</code>, <code>SUMMON</code>, <code>TELEPORT</code>, <code>EXPLOSION</code>, <code>FIRE</code>, <code>FREEZE</code>, <code>PUSH</code>, <code>PULL</code>, <code>LIGHTNING</code>, <code>TITLE</code> — cada una con sus propios parámetros por <code>key=value</code>.</p>

      <YamlBuilder
        title="Constructor visual: Mob"
        description="Identidad, modelo, stats/resistencias e IA básica. Skins, skills, triggers, phases, loot, bossbar, diálogos y spawn-rules son demasiado anidados para este formulario — usá /mobadmin editor o copiá uno de los ejemplos de arriba."
        folder="mobs"
        fields={mobFields}
      />

      <SectionHeading id="spawn">Reglas de spawn natural</SectionHeading>
      <p>
        Con <code>spawn-rules.natural-spawn: true</code>, el addon intercepta el <code>CreatureSpawnEvent</code>{" "}
        vanilla: si el tipo de entidad y el contexto (bioma, mundo, región, altura, rango horario, clima,
        distancia mínima a jugadores) calzan con alguna definición, cancela el spawn vanilla y crea el mob
        RPGRoll en su lugar — eligiendo por peso (<code>spawn-weight</code>) si varias definiciones compiten por
        el mismo tipo de entidad.
      </p>

      <SectionHeading id="regiones">Regiones de mob (MobRegion)</SectionHeading>
      <p>
        Un cuboide propio (sin WorldGuard), igual que en RPGRoll-Quests: sirve como <code>guard-region</code> para
        el goal <code>GUARD_REGION</code> y como filtro de <code>spawn-rules.regions</code>.
      </p>
      <Callout tone="info">
        Todavía no se distribuye ningún archivo de ejemplo en <code>mobs/src/main/resources/regions/</code> — la
        carpeta se crea recién cuando guardás la primera región desde el constructor de abajo o por código.
      </Callout>
      <YamlBuilder title="Constructor visual: Mob Region" folder="regions" fields={mobRegionFields} />

      <SectionHeading id="gui">GUI: navegador y editor</SectionHeading>
      <p>
        <Kbd>/mobadmin browser</Kbd> abre un navegador paginado con búsqueda y filtro por categoría. Click sobre
        un mob abre el editor completo, con un botón por componente:
      </p>
      <ul>
        <li>Identidad, Modelo, Stats, Resistencias/Debilidades — edición directa con clicks (+1/+10, alternar, ciclar) y prompts de chat para texto.</li>
        <li>IA — activar/desactivar goals, ajustar rango/huida/velocidad, gestionar puntos de patrulla y región a proteger.</li>
        <li>Skills y Triggers — lista de acciones por evento, alta rápida con sintaxis <code>TIPO clave=valor</code> por chat.</li>
        <li>Fases — umbral de vida, multiplicadores de stat, y qué skills ya existentes se suman en esa fase.</li>
        <li>Loot, BossBar, Diálogos, Reglas de spawn, Datos custom.</li>
      </ul>
      <Callout tone="warning" title="Sin historial, versionado ni import/export">
        A diferencia de lo que se planteó originalmente, este editor no guarda versiones anteriores ni permite
        importar/exportar definiciones — cada "Guardar" sobreescribe el YAML en disco directamente.
      </Callout>

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/mobadmin spawn <id> [jugador]"}</Td><Td>Invoca un mob en la ubicación del jugador indicado (o la tuya).</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/mobadmin list [categoría]"}</Td><Td>Lista definiciones cargadas, opcionalmente filtradas.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/mobadmin info <id>"}</Td><Td>Muestra stats y componentes resumidos de una definición.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/mobadmin reload</Td><Td>Recarga todas las definiciones desde disco.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/mobadmin killall [id]"}</Td><Td>Elimina todos los mobs activos, opcionalmente de una sola definición.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/mobadmin create <id> [tipo-entidad-base]"}</Td><Td>Crea un mob base y abre el editor directo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/mobadmin browser</Td><Td>Abre el navegador gráfico.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/mobadmin editor <id>"}</Td><Td>Abre el editor gráfico directo sobre una definición.</Td></Tr>
        </tbody>
      </Table>
      <p>Todos requieren <Badge tone="amber">rpgrollmobs.admin.*</Badge> (default: op).</p>

      <SectionHeading id="extension">Puntos de extensión documentados, no implementados</SectionHeading>
      <Callout tone="info">
        Estos quedaron fuera del alcance de esta primera versión a propósito — el <code>base-entity-type</code>{" "}
        vanilla y el sistema de resistencias/loot ya son plenamente funcionales sin ellos:
        <ul className="mt-2 list-disc pl-5">
          <li><strong>ModelEngine / BetterModel</strong> — <code>model.model-engine-id</code> ya existe como campo en el YAML, pero ningún código lee ese id para aplicar un modelo custom real todavía. Para skins visuales sin esas dependencias, usá <a href="#reskin" onClick={(e) => e.preventDefault()}>model.skins</a>, que sí está implementado.</li>
          <li><strong>WorldGuard / WorldEdit</strong> — las "regiones" de este addon son cuboides propios (<code>MobRegion</code>), sin dependencia externa; no hay integración con las regiones de WorldGuard.</li>
          <li><strong>Eventos cinematográficos guionados</strong> (secuencias de jefe con cámaras, cutscenes) — no implementado.</li>
          <li><strong>Historial / versionado / import-export</strong> en el editor gráfico.</li>
        </ul>
      </Callout>

      <SectionHeading id="placeholders">Placeholders (PlaceholderAPI)</SectionHeading>
      <p>
        Expansión <Badge tone="violet">rpgrollmobs</Badge> — a diferencia de los demás addons, la mayoría son
        globales al servidor (conteos), no por jugador. La excepción es <code>nearest_*</code>, que busca el mob
        RPGRoll vivo más cercano al jugador (hasta 64 bloques) en su mismo mundo.
      </p>
      <Table>
        <Thead>
          <Th>Placeholder</Th>
          <Th>Valor</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">%rpgrollmobs_active_count%</Td><Td>Mobs RPGRoll vivos ahora mismo, en todos los mundos.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgrollmobs_active_count_<categoría>%"}</Td><Td>Igual, filtrado por categoría (NORMAL, MINI_BOSS, etc.).</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollmobs_definitions_count%</Td><Td>Cantidad de definiciones de mob cargadas.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollmobs_nearest_name%</Td><Td>Nombre del mob RPGRoll más cercano al jugador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollmobs_nearest_health% / _health_max</Td><Td>Su vida actual/máxima.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollmobs_nearest_distance%</Td><Td>Distancia en bloques.</Td></Tr>
        </tbody>
      </Table>

      <PrevNext current="mobs" onNavigate={onNavigate} />
    </>
  );
}
