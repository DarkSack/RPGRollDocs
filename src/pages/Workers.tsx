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

const professionFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_profesion", placeholder: "miner" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&7Minero" },
  { key: "icon", label: "Ícono (Material)", type: "string", default: "VILLAGER_SPAWN_EGG" },
  { key: "description", label: "Descripción", type: "string" },
  { key: "entity-type", label: "EntityType vanilla", type: "string", default: "VILLAGER" },
  { key: "skills", label: "Habilidades", type: "list", placeholder: "mining_speed, vein_detection" },
  { key: "schedule", label: "Id de horario (vacío = ninguno)", type: "string" },
  { key: "wage-amount", label: "Salario", type: "number", default: "0" },
  { key: "wage-type", label: "Tipo de pago", type: "select", options: ["HOURLY", "PER_TASK"], default: "PER_TASK" },
  { key: "tool-material", label: "Herramienta requerida (vacío = ninguna)", type: "string" },
];

export function Workers({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Workers (RPGRoll-Workers)">
        Trabajadores autónomos con profesión, habilidades, inventario, necesidades, personalidad, horario y una
        IA por reglas configurable — habitantes del mundo que trabajan incluso cuando ningún jugador los está
        mirando, no minions que generan recursos por arte de magia.
      </PageHeader>

      <Callout tone="info" title="El 'árbol de comportamiento' es una lista de reglas ordenadas, no nodos visuales">
        Un editor de nodos de verdad no es viable en una GUI de inventario de Bukkit. En su lugar, cada{" "}
        <code>Profession</code> tiene una lista de <code>AiRule</code> (condición→acción→prioridad) — la primera
        regla cuya condición matchea gana. Si ninguna matchea, cae al horario de la profesión, y si tampoco tiene
        uno, a <code>WORK</code> por defecto.
      </Callout>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock
        language="yaml"
        code={"depend: [RPGRoll]\nsoftdepend: [SackEffects, RPGRoll-Effects, RPGRoll-Seasons, RPGRoll-Ranching, RPGRoll-Fishing, RPGRoll-Guilds, Vault]"}
      />
      <p>
        De todos los addons que el diseño original nombraba como integración (Ranching/Fishing/Mining/Blacksmith/
        Housing/Magic/Quests/Guilds/Teams), solo{" "}
        <button type="button" onClick={() => onNavigate("ranching")} className="text-violet-600 underline dark:text-violet-400">
          RPGRoll-Ranching
        </button>
        , RPGRoll-Fishing, RPGRoll-Seasons, RPGRoll-Quests, RPGRoll-Guilds y RPGRoll-Magic existen en este proyecto
        — RPGRoll-Mining, RPGRoll-Blacksmith y "Housing" como addon separado no existen. Sin Vault + un plugin de
        economía real, los salarios simplemente no se cobran (el resto de la simulación sigue igual).
      </p>

      <SectionHeading id="ia">IA por reglas</SectionHeading>
      <Table>
        <Thead>
          <Th>Condición</Th>
          <Th>Se activa cuando...</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">HUNGRY / TIRED / SLEEPY / STRESSED</Td><Td>Alguna necesidad cruza un umbral (hambre/energía/sueño bajos, o estrés alto).</Td></Tr>
          <Tr><Td className="font-mono text-xs">INVENTORY_FULL</Td><Td>El inventario cargado del worker llega a su capacidad.</Td></Tr>
          <Tr><Td className="font-mono text-xs">RAINING / NIGHT</Td><Td>Clima/hora real del mundo (<code>World#hasStorm()</code> / <code>World#getTime()</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">LOW_HAPPINESS</Td><Td>Felicidad por debajo de un umbral.</Td></Tr>
          <Tr><Td className="font-mono text-xs">ALWAYS</Td><Td>Siempre — pensada como regla de respaldo al final de la lista.</Td></Tr>
        </tbody>
      </Table>
      <p>
        La acción <code>EAT</code> es autosuficiente: si el worker tiene un hogar asignado y todavía no llegó,
        camina hacia él; al llegar (o si no tiene hogar), come. Una sola regla{" "}
        <code>HUNGRY → EAT</code> alcanza para todo el flujo "buscar comida → comer → volver al trabajo" del
        diseño original, sin necesitar un rastreador de estado de varios pasos.
      </p>
      <CodeBlock
        language="yaml"
        filename="professions/miner.yml (fragmento ai-rules)"
        code={
          "ai-rules:\n" +
          "  - condition: HUNGRY\n" +
          "    action: EAT\n" +
          "    priority: 10\n" +
          "  - condition: INVENTORY_FULL\n" +
          "    action: STORE_ITEMS\n" +
          "    priority: 20\n" +
          "  - condition: RAINING\n" +
          "    action: SEEK_SHELTER\n" +
          "    priority: 30\n" +
          "  - condition: NIGHT\n" +
          "    action: GO_HOME\n" +
          "    priority: 40\n" +
          "  - condition: ALWAYS\n" +
          "    action: WORK\n" +
          "    priority: 100\n"
        }
      />

      <SectionHeading id="necesidades-personalidad">Necesidades y personalidad</SectionHeading>
      <p>
        Cada worker tiene 7 necesidades (0-100): hambre, energía, sueño, estrés (invertido — alto es malo),
        motivación, salud y felicidad. Decaen solas cada chequeo periódico salvo mientras el worker está
        durmiendo, que las restaura. Felicidad/motivación se arrastran hacia el promedio de las demás — ignorar
        las necesidades básicas las termina bajando solas, sin un chequeo aparte.
      </p>
      <p>
        Cada worker tiene UN rasgo de personalidad dominante (no una combinación), que modula velocidad de
        trabajo, resistencia al estrés, y chance de error:
      </p>
      <Table>
        <Thead>
          <Th>Rasgo</Th>
          <Th>Efecto</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">LAZY</Td><Td>x0.7 velocidad, menos estrés.</Td></Tr>
          <Tr><Td className="font-mono text-xs">FAST</Td><Td>x1.3 velocidad.</Td></Tr>
          <Tr><Td className="font-mono text-xs">RESPONSIBLE / AMBITIOUS</Td><Td>x1.1-1.15 velocidad.</Td></Tr>
          <Tr><Td className="font-mono text-xs">CLUMSY</Td><Td>x2.0 chance de error (desperdicia el intento de trabajo).</Td></Tr>
          <Tr><Td className="font-mono text-xs">SMART / RESPONSIBLE</Td><Td>x0.5 chance de error.</Td></Tr>
          <Tr><Td className="font-mono text-xs">SOCIAL / COWARD / etc.</Td><Td>Resto de rasgos (SMART, SOCIAL, LONER, BRAVE, COWARD) — flavor sin modificador mecánico propio en esta pasada.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="profesiones-habilidades">Profesiones y habilidades</SectionHeading>
      <p>
        Una <code>Profession</code> define identidad, qué entidad vanilla la representa, sus reglas de IA, su
        horario, su salario, y opcionalmente una herramienta requerida. El comportamiento físico real de
        "trabajar" NO vive en la profesión — lo resuelve un <code>ProfessionBehavior</code> registrado por id.
      </p>
      <Table>
        <Thead>
          <Th>Profesión de ejemplo</Th>
          <Th>Comportamiento real</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">miner</Td><Td>Busca la veta más cercana, evita bloques adyacentes a lava, rompe y carga el mineral (sin durabilidad de herramienta ni tiempo de rotura real).</Td></Tr>
          <Tr><Td className="font-mono text-xs">farmer</Td><Td>Cosecha el cultivo maduro más cercano y resetea su edad a 0 (replantado instantáneo).</Td></Tr>
          <Tr><Td className="font-mono text-xs">lumberjack</Td><Td>Corta el tronco más cercano — no reforesta de verdad (plantar un árbol completo excede el alcance de esta pasada).</Td></Tr>
          <Tr><Td className="font-mono text-xs">rancher</Td><Td><strong>Integración real</strong> — busca un animal de Ranching cercano y lo alimenta vía <code>RanchingAPI.feedAnimal(...)</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">fisherman</Td><Td>Busca agua cercana y saca un pez vanilla genérico — ver el aviso de abajo.</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title="El pescador NO usa FishingAPI de verdad">
        <code>FishingAPI.forceCatch(...)</code> exige un <code>Player</code> real (lo necesita para chequear
        nivel vía RPGRollAPI en peces legendarios), y un worker no es un jugador. Simularlo con un jugador falso
        sería frágil y engañoso, así que <code>FishingBehavior</code> se queda con una captura vanilla simple en
        vez de la genética/calidad rica de{" "}
        <button type="button" onClick={() => onNavigate("fishing")} className="text-violet-600 underline dark:text-violet-400">
          RPGRoll-Fishing
        </button>
        . Una profesión sin ningún behavior registrado sigue "trabajando" a efectos de horario/salario/experiencia,
        solo que sin ninguna interacción física real (fallback silencioso, no un error).
      </Callout>

      <SectionHeading id="inventario-logistica">Inventario y logística</SectionHeading>
      <p>
        El inventario cargado de un worker es un mapa (material → cantidad), no un <code>Inventory</code> real de
        27 slots — no necesita preservar metadata de ítems individuales, solo saber cuánto lleva de qué. Un
        almacén no es contenido admin-creado como una especie o un gen: es un cofre/baúl real marcado en el mundo
        con el Designador de Almacén (<Kbd>/workersadmin designator</Kbd>). Todos los almacenes designados viven
        en un único <code>warehouses.yml</code> — no tiene sentido "reusar" la ubicación de un cofre puntual como
        contenido reusable.
      </p>

      <SectionHeading id="vivienda">Vivienda</SectionHeading>
      <p>
        Fijar el hogar de un worker es un botón en su ficha ("Fijar hogar en mi ubicación"), no una herramienta
        de marcar camas — simplemente guarda la ubicación del jugador que lo gestiona. Dormir ahí (o en cualquier
        lado, mientras la acción sea <code>SLEEP</code>) restaura energía/sueño en vez de decaerlos.
      </p>

      <SectionHeading id="economia">Economía: salarios, contratos y moral</SectionHeading>
      <p>
        El worker en sí no tiene cuenta — "cobrar" es, en la práctica, un costo de mantenimiento que el empleador
        paga con su saldo real de Vault (vía <code>RPGRollAPI.get().getEconomyProvider()</code>, ya cableado en{" "}
        <code>:core</code> — no se inventó una economía propia). <code>HOURLY</code> se cobra en un tick
        periódico; <code>PER_TASK</code> se cobra en el momento exacto de entregar en un almacén.
      </p>
      <p>
        La moral general (promedio de las 7 necesidades) modula la velocidad de trabajo y, si está muy baja
        durante mucho tiempo, una chance periódica de que el worker renuncie a su contrato solo.
      </p>

      <SectionHeading id="eventos">Eventos de worker</SectionHeading>
      <Table>
        <Thead>
          <Th>Tipo</Th>
          <Th>Cuándo se sortea</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">ILLNESS / ACCIDENT / STRIKE</Td><Td>Solo con moral baja — aplican un estado activo con duración y multiplicador de velocidad de trabajo (0% en huelga = no trabaja nada).</Td></Tr>
          <Tr><Td className="font-mono text-xs">VACATION</Td><Td>En cualquier momento, si está empleado.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PROMOTION</Td><Td>Solo con moral alta — a diferencia de los demás, aplica sus bonos al instante, sin un estado temporal.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="formato-yaml">Ejemplo de archivo YAML</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="professions/rancher.yml"
        code={
          "id: rancher\n" +
          'display-name: "&6Ganadero"\n' +
          "icon: HAY_BLOCK\n" +
          'description: "Busca animales de RPGRoll-Ranching cercanos y los alimenta de verdad."\n' +
          "entity-type: VILLAGER\n" +
          "skills: [animal_care]\n" +
          "schedule: standard_day\n" +
          "wage-amount: 45\n" +
          "wage-type: HOURLY\n" +
          "tool-material: null\n" +
          "ai-rules:\n" +
          "  - condition: HUNGRY\n" +
          "    action: EAT\n" +
          "    priority: 10\n" +
          "  - condition: RAINING\n" +
          "    action: SEEK_SHELTER\n" +
          "    priority: 30\n" +
          "  - condition: NIGHT\n" +
          "    action: GO_HOME\n" +
          "    priority: 40\n" +
          "  - condition: ALWAYS\n" +
          "    action: WORK\n" +
          "    priority: 100\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="schedules/standard_day.yml"
        code={
          "id: standard_day\n" +
          'display-name: "Jornada Estándar"\n' +
          'description: "06:00 despertar, 07:00 desayuno, 08:00-13:00 y 14:00-20:00 trabajo, 22:00 dormir."\n' +
          "entries:\n" +
          "  - start-tick: 0\n" +
          "    activity: WAKE\n" +
          "  - start-tick: 1000\n" +
          "    activity: EAT\n" +
          "  - start-tick: 2000\n" +
          "    activity: WORK\n" +
          "  - start-tick: 7000\n" +
          "    activity: EAT\n" +
          "  - start-tick: 8000\n" +
          "    activity: WORK\n" +
          "  - start-tick: 14000\n" +
          "    activity: REST\n" +
          "  - start-tick: 16000\n" +
          "    activity: SLEEP\n"
        }
      />

      <Callout tone="tip" title="Referencia completa: todos los campos en un solo archivo">
        <code>professions/reference_full.yml</code> (incluido en el jar) usa las 10 condiciones y las 9 acciones de
        IA — el ejemplo de arriba solo usa 4 de cada una.
      </Callout>

      <YamlBuilder
        title="Constructor visual: profesión"
        description="Identidad, horario y salario de una profesión. Las reglas de IA (ai-rules) son demasiado estructuradas para este formulario — copiá y adaptá el ejemplo de arriba para esas."
        folder="professions"
        fields={professionFields}
      />

      <SectionHeading id="gui">GUI: Worker Studio</SectionHeading>
      <p>
        <Kbd>/workersadmin browser</Kbd> abre un hub que enlaza a 4 navegadores (Profesiones, Habilidades,
        Horarios, Eventos) más el Explorador de Workers. La ficha de un worker muestra necesidades/habilidades/
        contrato en texto (mismo criterio de "sin preview visual real" que otros módulos de este proyecto) y
        expone Renombrar, Contratar, Despedir y Fijar hogar.
      </p>

      <SectionHeading id="api">API para addons — WorkersAPI</SectionHeading>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={
          "// Darle comportamiento físico real a una profesión custom (ej. si algún día\n" +
          "// existen RPGRoll-Mining o RPGRoll-Blacksmith).\n" +
          "WorkersAPI.get().registerBehavior(\"blacksmith\", (worker, entity, profession) -> {\n" +
          "    // romper/fabricar lo que corresponda\n" +
          "});\n" +
          "\n" +
          "// Pensado en primer lugar para un futuro objetivo de RPGRoll-Quests\n" +
          "// (\"contratá 5 trabajadores\") — la consulta ya funciona, solo falta\n" +
          "// que Quests defina el tipo de objetivo que la llame.\n" +
          "List<Worker> misWorkers = WorkersAPI.get().getEmployedWorkers(player.getUniqueId());\n"
        }
      />

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/workersadmin browser</Td><Td>Abre el Worker Studio.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/workersadmin reload</Td><Td>Recarga todas las definiciones desde disco.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/workersadmin spawn <profesion> [nombre]"}</Td><Td>Spawnea un worker en tu ubicación.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/workersadmin designator</Td><Td>Te da el Designador de Almacén.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/workers inspect</Td><Td>Abre la ficha del worker al que estás mirando.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/workers hire</Td><Td>Contrata al worker al que estás mirando (salario por defecto de su profesión).</Td></Tr>
          <Tr><Td className="font-mono text-xs">/workers fire</Td><Td>Despide al worker al que estás mirando (si es tuyo, o de tu gremio).</Td></Tr>
          <Tr><Td className="font-mono text-xs">/workers list</Td><Td>Lista tus trabajadores contratados.</Td></Tr>
        </tbody>
      </Table>
      <p>
        <code>/workersadmin</code> requiere <Badge tone="amber">rpgrollworkers.admin.*</Badge> (default: op);{" "}
        <code>/workers</code> requiere <Badge tone="blue">rpgrollworkers.use</Badge> (default: true). Con
        RPGRoll-Guilds instalado, cualquier miembro del mismo gremio que el empleador también puede despedir su
        worker — "los gremios pueden compartir trabajadores" del diseño original, resuelto como gestión
        compartida.
      </p>

      <SectionHeading id="pendiente">Qué falta (próxima pasada)</SectionHeading>
      <Callout tone="warning" title="Esta pasada es 'Núcleo + IA avanzada y economía', no todo el diseño original">
        A propósito, esta versión <strong>no</strong> incluye empresas, equipos como sistema propio, transporte
        (caballos/carretas/barcos), construcción con planos configurables, ni integración con RPGRoll-Magic
        (magos que trabajan). Tampoco hay RPGRoll-Mining, RPGRoll-Blacksmith, ni Housing como addon separado — no
        existen en este proyecto, así que esas integraciones no podían ser reales. Lo que sí está completo y
        estable: el motor de IA por reglas, necesidades y personalidad, profesiones y habilidades con XP real,
        horarios, logística de almacenes, economía con salarios reales vía Vault y moral, eventos de worker, la
        integración real con Ranching, el Worker Studio, la API pública, y contenido de ejemplo (4 profesiones, 6
        habilidades, 1 horario, 2 eventos).
      </Callout>

      <PrevNext current="workers" onNavigate={onNavigate} />
    </>
  );
}
