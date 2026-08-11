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
  Badge,
  PrevNext,
  YamlBuilder,
  type YamlField,
} from "../components/ui";

const statFields: YamlField[] = [
  {
    key: "id",
    label: "Id",
    type: "string",
    default: "nuevo_stat",
    placeholder: "sanity",
  },
  { key: "enabled", label: "Habilitado", type: "boolean", default: "true" },
  { key: "max", label: "Máximo", type: "number", default: "100" },
  { key: "start", label: "Valor inicial", type: "number", default: "100" },
];

const conditionFields: YamlField[] = [
  {
    key: "id",
    label: "Id",
    type: "string",
    default: "nueva_condition",
    placeholder: "cursed",
  },
  {
    key: "duration",
    label: "Duración en ticks (-1 = indefinida)",
    type: "number",
    default: "-1",
  },
  { key: "damage", label: "Daño periódico", type: "number", default: "0" },
  {
    key: "interval",
    label: "Intervalo en ticks",
    type: "number",
    default: "20",
  },
  {
    key: "effects",
    label: "Potion effects (TYPE o TYPE:AMPLIFICADOR)",
    type: "list",
    placeholder: "slowness:0, nausea:0",
  },
];

const modifierFields: YamlField[] = [
  {
    key: "id",
    label: "Id (debe coincidir con el id en RPGRoll-Core)",
    type: "string",
    default: "nueva_raza",
    placeholder: "enano",
  },
  {
    key: "type",
    label: "Tipo",
    type: "select",
    options: ["RACE", "CLASS", "JOB"],
    default: "RACE",
  },
];

export function Extras({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Extras (RPGRoll-Extras)">
        Motor genérico de necesidades y estados de supervivencia: sed, stamina,
        fatiga, oxígeno, estrés, temperatura corporal y cualquier condition
        custom (sangrado, envenenado, congelamiento...) — un administrador puede
        inventar un need o un estado nuevo enteramente por YAML, sin tocar Java.
      </PageHeader>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock
        language="yaml"
        code={
          "depend: [RPGRoll]\nsoftdepend: [RPGRoll-TAB, RPGRoll-Seasons, PlaceholderAPI, Vault]"
        }
      />
      <p>
        Solo <code>depend: RPGRoll</code> es obligatorio (raza/clase/jobs vía{" "}
        <code>PlayerManager</code> real).{" "}
        <button
          type="button"
          onClick={() => onNavigate("tab")}
          className="text-violet-600 underline dark:text-violet-400"
        >
          RPGRoll-TAB
        </button>{" "}
        habilita placeholders si está instalado; sin él, los stats siguen
        funcionando pero no hay forma de mostrarlos en tablist/scoreboard sin el
        HUD propio. RPGRoll-Seasons/PlaceholderAPI/Vault no se referencian desde
        ningún código de este addon en esta pasada — quedan como softdepend
        reservado, no integración real.
      </p>

      <SectionHeading id="stats">Motor genérico de Stats</SectionHeading>
      <p>
        Un único <code>StatEngine</code> atiende sed, stamina, fatiga, oxígeno,
        estrés o cualquier need custom — el comportamiento completo
        (decay/regeneración/consumo/umbrales) viene del YAML, no de código
        específico por stat. Decay y regeneración corren en tareas programadas
        al intervalo que cada stat declara (no un tick global compartido);
        ajustes puntuales (consumo por acción, llamadas de otro addon) son
        siempre por evento.
      </p>
      <Table>
        <Thead>
          <Th>Campo</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">decay</Td>
            <Td>
              <code>{"{ amount, interval }"}</code> — baja pasivamente cada{" "}
              <code>interval</code> ticks.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">regeneration</Td>
            <Td>
              Lista de reglas <code>{"{ condition, amount }"}</code> — se suman
              todas las que matcheen (condición vacía = siempre).
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">consumption</Td>
            <Td>
              Mapa acción→cantidad (<code>sprint</code>/<code>jump</code>/
              <code>attack</code>/<code>mining</code>/cualquier acción custom
              reportada por otro addon).
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">thresholds</Td>
            <Td>
              Lista de{" "}
              <code>{"{ condition, potions, actions, apply-conditions }"}</code>{" "}
              evaluada contra el valor actual cada 20 ticks.
            </Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        Dentro de un threshold: <code>potions</code> se reaplica mientras la
        condición se mantenga verdadera (como un potion effect vanilla
        refrescado en cada chequeo); <code>actions</code> se ejecuta UNA sola
        vez, al cruzar hacia ese umbral; <code>apply-conditions</code> son ids
        de <code>ConditionDefinition</code> que se aplican mientras el umbral se
        mantiene y se remueven al salir — así un stat en 0 (ej. sed) puede
        disparar daño periódico reusando el motor de Conditions en vez de
        reinventarlo.
      </p>
      <CodeBlock
        language="yaml"
        filename="stats/thirst.yml"
        code={
          "id: thirst\n" +
          "enabled: true\n" +
          "max: 100\n" +
          "start: 100\n\n" +
          "decay:\n" +
          "  amount: 1\n" +
          "  interval: 60\n\n" +
          "consumption:\n" +
          "  sprint: 0.5\n\n" +
          "thresholds:\n" +
          '  - condition: "<=30"\n' +
          "    potions:\n" +
          "      - type: weakness\n" +
          "        amplifier: 0\n" +
          "    actions:\n" +
          "      - type: MESSAGE\n" +
          '        value: "&cTenés sed."\n' +
          '  - condition: "<=0"\n' +
          "    apply-conditions:\n" +
          "      - dehydration\n"
        }
      />
      <YamlBuilder
        title="Constructor visual: stat"
        description="Identidad y límites de un stat. decay/regeneration/consumption/thresholds son demasiado anidados para este formulario — copiá y adaptá el ejemplo de arriba para esos bloques."
        folder="stats"
        fields={statFields}
      />

      <SectionHeading id="actividad">Activity State Resolver</SectionHeading>
      <p>
        Las reglas de <code>regeneration</code> pueden condicionar por actividad
        del jugador: <code>resting</code>, <code>walking</code>,{" "}
        <code>sprinting</code>, <code>combat</code>. El resolver NO chequea esto
        por tick — se apoya en timestamps de eventos reales (último movimiento,
        último daño recibido o infligido) para clasificar barato en cada
        evaluación. También acepta condiciones ambientales con prefijo:{" "}
        <code>biome:</code>, <code>weather:</code>, <code>world:</code>,{" "}
        <code>dimension:</code>, y la palabra clave especial{" "}
        <code>underwater</code> (jugador sumergido en líquido).
      </p>

      <SectionHeading id="consumo">Consumption hooks</SectionHeading>
      <p>
        Sprint (al empezar a correr, no continuo), salto, ataque y minado se
        detectan automáticamente vía eventos vanilla. Pesca, farming y
        habilidades de otros addons NO se detectan acá a propósito — le
        corresponde a cada addon reportar su propia acción llamando a{" "}
        <code>ExtrasAPI.get().needs().consumeAll(player, "fishing")</code> (o el
        nombre de acción que corresponda), la misma superficie pública que usa
        el hook interno de minado.
      </p>

      <SectionHeading id="conditions">
        Conditions: estados custom
      </SectionHeading>
      <p>
        Una <code>ConditionDefinition</code> (sangrado, envenenado,
        congelamiento, o cualquier estado custom) es daño periódico + potion
        effects + acciones on-apply/on-tick/on-expire, con duración fija o
        indefinida (<code>duration: -1</code>, se remueve solo por API/comando o
        por otro sistema como un threshold de stat). Deliberadamente NO reusa{" "}
        <button
          type="button"
          onClick={() => onNavigate("rpgroll-effects")}
          className="text-violet-600 underline dark:text-violet-400"
        >
          RPGRoll-Effects
        </button>{" "}
        — se mantiene como un motor de estados simple y standalone en vez de
        acoplarse al sistema de efectos completo (stacking, inmunidades,
        componentes de aura...), que resuelve un problema más grande del que
        Extras necesita.
      </p>
      <CodeBlock
        language="yaml"
        filename="conditions/dehydration.yml"
        code={
          "id: dehydration\n" +
          "duration: -1\n" +
          "damage: 1\n" +
          "interval: 60\n" +
          "effects:\n" +
          '  - "weakness:1"\n' +
          '  - "slowness:0"\n' +
          "on-apply:\n" +
          "  - type: MESSAGE\n" +
          '    value: "&4Te estás deshidratando..."\n'
        }
      />
      <YamlBuilder
        title="Constructor visual: condition"
        description="Duración, daño y potion effects de un estado. on-apply/on-tick/on-expire (acciones) son demasiado anidados para este formulario — copiá y adaptá el ejemplo de arriba."
        folder="conditions"
        fields={conditionFields}
      />

      <SectionHeading id="temperatura">
        Temperatura: ambiental y corporal
      </SectionHeading>
      <p>
        <code>AmbientTemperatureCalculator</code> parte de{" "}
        <code>Block#getTemperature()</code> vanilla (cubre cualquier bioma sin
        mantener una tabla propia) y suma modificadores por hora del día, clima,
        altitud, dimensión (Nether +25°C, End -10°C) y bloques cercanos
        (lava/fuego calientan, hielo/nieve enfrían, radio de 3 bloques).{" "}
        <code>BodyTemperatureEngine</code> converge gradualmente hacia la
        ambiental según <code>exchange-rate</code> (fracción de la diferencia
        que se cierra en cada actualización) y mapea el resultado a un estado
        con nombre (hipotermia severa → hipotermia → frío → normal →
        sobrecalentamiento → hipertermia), cada uno con sus propios potion
        effects opcionales.
      </p>
      <CodeBlock
        language="yaml"
        filename="temperature.yml"
        code={
          "exchange-rate: 0.05\n" +
          "update-interval: 40\n\n" +
          "states:\n" +
          "  - id: severe_hypothermia\n" +
          '    label: "Hipotermia severa"\n' +
          "    max: 30\n" +
          "    potions:\n" +
          "      - type: slowness\n" +
          "        amplifier: 2\n\n" +
          "  - id: normal\n" +
          '    label: "Normal"\n' +
          "    min: 36\n" +
          "    max: 39\n"
        }
      />

      <SectionHeading id="proteccion-termica">
        Protección térmica de ítems
      </SectionHeading>
      <p>
        <code>ThermalProtectionService</code> suma la protección de las 4 piezas
        de armadura equipadas. Si un ítem trae <code>thermal_insulation</code>/
        <code>thermal_cold_resistance</code>/
        <code>thermal_heat_resistance</code> en el custom-data genérico de{" "}
        <button
          type="button"
          onClick={() => onNavigate("items")}
          className="text-violet-600 underline dark:text-violet-400"
        >
          RPGRoll-Items
        </button>{" "}
        se usa eso; si no, cae a una tabla de materiales vanilla razonable
        (cuero abriga, netherite protege de ambos extremos, etc.). La lectura
        del custom-data reconstruye manualmente la{" "}
        <code>NamespacedKey("rpgroll-items", "item-custom-data")</code> — cero
        dependencia de compilación con el módulo Items.
      </p>

      <SectionHeading id="modificadores">
        Modificadores desde raza/clase/job
      </SectionHeading>
      <p>
        Un <code>ModifierSet</code> (id + tipo RACE/CLASS/JOB + mapa de valores)
        aporta bonos a los sistemas de Extras sin que RPGRoll-Core sepa que este
        addon existe: <code>ModifierResolver</code> lee la raza/clase/ jobs
        ACTIVOS del jugador vía la API pública de Core y busca acá un set con
        ese mismo id. Las claves
        <code>{"<statId>_max"}</code> y <code>{"<statId>_rate"}</code> son
        multiplicadores —{" "}
        <strong>
          el motor calcula{" "}
          <code>1.0 + suma de todos los modificadores aplicables</code>
        </strong>
        , así que un valor de <code>0.3</code> da 130% y un valor de{" "}
        <code>-0.2</code> da 80%. Cualquier otra clave es un bono aditivo
        simple, a interpretar por quien la lea (hoy, ningún sistema además de
        stats consume claves arbitrarias).
      </p>
      <Callout
        tone="warning"
        title="No confundir con un valor multiplicador directo"
      >
        <code>stamina_max: 1.3</code> NO da 130% — da{" "}
        <code>1.0 + 1.3 = 230%</code>. El valor correcto para "130% del máximo"
        es <code>0.3</code>.
      </Callout>
      <CodeBlock
        language="yaml"
        filename="modifiers/barbaro.yml"
        code={
          "id: barbaro\n" +
          "type: CLASS\n" +
          "values:\n" +
          "  stamina_max: 0.3\n" +
          "  stress_rate: -0.3\n"
        }
      />
      <YamlBuilder
        title="Constructor visual: modifier"
        description="Id y tipo de fuente. Las claves de 'values' (ej. stamina_max, thirst_rate) son libres — copiá y adaptá el ejemplo de arriba."
        folder="modifiers"
        fields={modifierFields}
      />

      <SectionHeading id="condiciones-reusables">
        Condiciones/expresiones reusables
      </SectionHeading>
      <p>
        El mismo <code>RateConditionEvaluator</code> que resuelve{" "}
        <code>regeneration</code> se usa en cualquier lugar del addon que
        necesite evaluar una condición de texto: palabras clave de actividad sin
        prefijo, o <code>biome:</code>/<code>weather:</code>/<code>world:</code>
        /<code>dimension:</code>/<code>underwater</code> con prefijo. Los
        umbrales numéricos de <code>thresholds</code> (<code>{"<=30"}</code>,{" "}
        <code>{">=80"}</code>) usan un evaluador aparte (
        <code>NumericComparison</code>), específico para comparar contra el
        valor actual del stat.
      </p>

      <SectionHeading id="acciones">Sistema de Actions</SectionHeading>
      <Table>
        <Thead>
          <Th>Tipo</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">MESSAGE</Td>
            <Td>
              Le envía un mensaje al jugador (colores <code>&amp;</code>{" "}
              traducidos).
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">SOUND</Td>
            <Td>
              <code>"SOUND_ID;volumen;pitch"</code> reproducido en la ubicación
              del jugador.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">PARTICLE</Td>
            <Td>
              <code>"PARTICLE_ID;cantidad"</code> spawneado en la ubicación del
              jugador.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">DAMAGE</Td>
            <Td>
              Daño directo (<code>Player#damage</code>) — usado internamente por
              conditions y thresholds.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">COMMAND</Td>
            <Td>
              Ejecuta un comando de consola con <code>%player%</code>{" "}
              reemplazado.
            </Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="hud">HUD configurable</SectionHeading>
      <p>
        Un actionbar opcional (deshabilitado por defecto) que renderiza una o
        más líneas con formato libre, incluyendo una barra de progreso ASCII (
        <code>{"{bar}"}</code>) con caracteres lleno/vacío configurables.
        Pensado como fallback simple para servidores sin{" "}
        <button
          type="button"
          onClick={() => onNavigate("tab")}
          className="text-violet-600 underline dark:text-violet-400"
        >
          RPGRoll-TAB
        </button>{" "}
        instalado — con TAB, mostrar los mismos valores en tablist/scoreboard
        vía placeholders suele ser preferible.
      </p>
      <CodeBlock
        language="yaml"
        filename="hud.yml"
        code={
          "enabled: false\n" +
          "interval: 20\n" +
          'separator: "  "\n\n' +
          "lines:\n" +
          "  - stat: thirst\n" +
          '    format: "&b💧 {bar} {value}/{max}"\n' +
          "    bar: true\n" +
          "    bar-length: 10\n" +
          '    filled-char: "█"\n' +
          '    empty-char: "░"\n'
        }
      />

      <SectionHeading id="integracion-tab">
        Integración con RPGRoll-TAB
      </SectionHeading>
      <p>
        Si RPGRoll-TAB está instalado, Extras registra un placeholder{" "}
        <code>{"{extras_<statId>}"}</code> y{" "}
        <code>{"{extras_<statId>_max}"}</code> por cada stat cargado, más{" "}
        <code>{"{extras_body_temperature}"}</code>,{" "}
        <code>{"{extras_temperature_state}"}</code> y{" "}
        <code>{"{extras_conditions}"}</code> (lista separada por comas de las
        conditions activas). El registro vive aislado en{" "}
        <code>TabIntegrationBridge</code> — la JVM nunca resuelve clases de TAB
        si el plugin no está presente.
      </p>

      <SectionHeading id="api">API para addons — ExtrasAPI</SectionHeading>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={
          "// Leer/ajustar un need\n" +
          'double sed = ExtrasAPI.get().needs().get(player, "thirst");\n' +
          'ExtrasAPI.get().needs().add(player, "stamina", 20);\n' +
          "\n" +
          "// Reportar una acción propia del addon a cualquier stat que la tenga\n" +
          "// configurada en su bloque 'consumption' (ej. pesca, cocina, un skill).\n" +
          'ExtrasAPI.get().needs().consumeAll(player, "fishing");\n' +
          "\n" +
          "// Aplicar o consultar un estado custom\n" +
          'ExtrasAPI.get().states().apply(player, "bleeding");\n' +
          'boolean congelado = ExtrasAPI.get().states().has(player, "frostbite");\n' +
          "\n" +
          "// Temperatura\n" +
          "double corporal = ExtrasAPI.get().bodyTemperature(player);\n"
        }
      />

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">/extrasadmin reload</Td>
            <Td>Recarga stats/conditions/modifiers desde disco.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">/extrasadmin list</Td>
            <Td>Lista todos los stats y conditions cargados.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/extrasadmin get <jugador> <stat>"}
            </Td>
            <Td>Muestra el valor actual de un stat.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/extrasadmin set <jugador> <stat> <valor>"}
            </Td>
            <Td>
              Fija el valor de un stat (clampeado a [0, máximo efectivo]).
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/extrasadmin add <jugador> <stat> <cantidad>"}
            </Td>
            <Td>Suma/resta una cantidad al valor actual.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/extrasadmin apply <jugador> <condition>"}
            </Td>
            <Td>Aplica una condition.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/extrasadmin remove <jugador> <condition>"}
            </Td>
            <Td>Remueve una condition activa.</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        Todo el comando requiere{" "}
        <Badge tone="amber">rpgrollextras.admin.*</Badge> (default: op) — no hay
        comando de jugador propio; los stats se consultan vía placeholders (con
        TAB) o el HUD.
      </p>

      <PrevNext current="extras" onNavigate={onNavigate} />
    </>
  );
}
