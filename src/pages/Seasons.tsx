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

const seasonFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_estacion", placeholder: "spring" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&aPrimavera" },
  { key: "icon", label: "Ícono (Material)", type: "string", default: "SUNFLOWER" },
  { key: "color", label: "Color", type: "string", default: "WHITE" },
  { key: "description", label: "Descripción", type: "string" },
  { key: "duration-amount", label: "Duración", type: "number", default: "7" },
  {
    key: "duration-unit",
    label: "Unidad de duración",
    type: "select",
    options: ["REAL_HOURS", "REAL_DAYS", "REAL_WEEKS", "MINECRAFT_DAYS"],
    default: "MINECRAFT_DAYS",
  },
  { key: "exclusive-boss", label: "Jefe exclusivo (id de mob)", type: "string" },
  { key: "world-event-daily-chance", label: "Chance diaria de evento mundial (0-1)", type: "number", default: "0" },
  { key: "tags", label: "Tags", type: "list", placeholder: "mild, growth" },
];

export function Seasons({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Seasons (RPGRoll-Seasons)">
        Calendario y estaciones 100% personalizables — no atado al reloj día/noche de Minecraft. Clima dinámico
        por bioma, reacciones de vegetación, mobs y un jefe exclusivo por estación, eventos mundiales, y regiones
        con su propio calendario o estación fija.
      </PageHeader>

      <Callout tone="info" title="No depende del calendario de Minecraft">
        Un <code>SeasonCalendar</code> (se llama así, no simplemente "Calendar", para no colisionar con{" "}
        <code>java.util.Calendar</code>) es un ciclo ordenado de ids de estación que se repite para siempre. Cada
        estación mide su duración en horas reales, días reales, semanas reales o días de Minecraft — la que
        elijas, independiente entre estaciones del mismo calendario.
      </Callout>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll]\nsoftdepend: [SackEffects, RPGRoll-Effects, RPGRoll-Mobs]"} />
      <p>
        Sin RPGRoll-Mobs, los <code>mob-modifiers</code>/<code>exclusive-boss</code> de una estación simplemente no
        hacen nada (el resto — calendario, clima, vegetación, eventos mundiales de partículas/sonido — funciona
        igual). Sin{" "}
        <button type="button" onClick={() => onNavigate("rpgroll-effects")} className="text-violet-600 underline dark:text-violet-400">
          RPGRoll-Effects
        </button>
        , los componentes <code>APPLY_EFFECT</code> de un evento mundial tampoco.
      </p>

      <SectionHeading id="calendarios">Calendarios y estaciones</SectionHeading>
      <p>
        Un calendario no tiene por qué llamarse "Primavera/Verano/Otoño/Invierno" — puede ser cualquier ciclo
        temático ("Luna Roja" → "Era del Sol" → "Oscuridad" → "Renacimiento"). Cada mundo tiene su propio reloj
        (<code>"world:&lt;nombre&gt;"</code>), independiente del de otros mundos, aunque compartan el mismo
        calendario.
      </p>
      <CodeBlock
        language="yaml"
        filename="calendars/default_calendar.yml"
        code={
          "id: default_calendar\n" +
          'display-name: "Calendario Estándar"\n' +
          'description: "El ciclo clásico de 4 estaciones."\n' +
          "\n" +
          "seasons:\n" +
          "  - spring\n" +
          "  - summer\n" +
          "  - autumn\n" +
          "  - winter\n"
        }
      />

      <SectionHeading id="subestaciones">Subestaciones</SectionHeading>
      <p>
        Cualquier estación puede dividirse en subestaciones (ej. Primavera Temprana/Media/Tardía), cada una con su
        propia duración y, opcionalmente, una temperatura fija que <strong>reemplaza</strong> (no suma) la
        temperatura calculada del bioma mientras esté activa.
      </p>

      <SectionHeading id="clima">Sistema climático y temperatura</SectionHeading>
      <p>
        Cada estación define un <code>ClimateProfile</code>: chances (0.0-1.0) de lluvia, tormenta, nieve, niebla,
        ola de calor y tormenta eléctrica, más una temperatura base y su variación. Un{" "}
        <code>WeatherTickTask</code> re-sortea el clima de cada mundo con jugadores online cada 5 minutos y lo
        aplica con <code>World#setStorm/setThundering</code> — la nieve es 100% vanilla: si está lloviendo y el
        bioma es frío, Minecraft ya la dibuja solo.
      </p>
      <Callout tone="warning" title="La temperatura por bioma es una tabla propia, no un valor real de Bukkit">
        Bukkit no expone la temperatura interna real de un bioma como un double consultable de forma estable entre
        versiones — Seasons mantiene su propia tabla aproximada en{" "}
        <code>plugins/RPGRoll-Seasons/biome-temperatures.yml</code> (editable), y cada estación suma un delta por
        bioma encima de esa base.
      </Callout>

      <SectionHeading id="vegetacion">Vegetación dinámica</SectionHeading>
      <p>
        Un <code>VegetationTask</code> aplica los efectos de la estación activa cerca de cada jugador online, con
        muestreo al azar y probabilidad baja por intento — un efecto ambiental gradual, no un "photoshop"
        instantáneo del radio entero.
      </p>
      <Table>
        <Thead>
          <Th>Efecto</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">SNOW_LAYERS</Td><Td>Capas de nieve sobre pasto/tierra/piedra en puntos con temperatura &lt; 0°C.</Td></Tr>
          <Tr><Td className="font-mono text-xs">ICE_LAKES</Td><Td>Congela agua expuesta en puntos fríos.</Td></Tr>
          <Tr><Td className="font-mono text-xs">DRY_GRASS</Td><Td>Reduce la humedad de tierra de cultivo cercana — sequía mecánica real, no solo visual.</Td></Tr>
          <Tr><Td className="font-mono text-xs">FALLING_LEAVES</Td><Td>Partículas de hojas cayendo cerca de árboles.</Td></Tr>
          <Tr><Td className="font-mono text-xs">FLOWER_BOOM</Td><Td>Florece pasto cercano con flores al azar.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="mobs-jefes">Mobs y jefe exclusivo de temporada</SectionHeading>
      <p>
        <code>mob-modifiers</code> es una lista de (id de mob de RPGRoll-Mobs, chance extra de spawn) evaluada
        cerca de cada jugador online. <code>exclusive-boss</code> es, como mucho, un mob por estación con una
        chance fija del 15% de aparecer una vez por día de Minecraft (según <code>World#getFullTime()</code>, sin
        relación con la unidad de duración que configuraste para la estación) cerca de un jugador al azar del
        mundo, con anuncio a todos.
      </p>

      <SectionHeading id="eventos">Eventos mundiales</SectionHeading>
      <p>
        Un <code>WorldEvent</code> corre sobre <strong>todos</strong> los jugadores online del mundo donde se
        dispara — no hay noción de "target" individual como en Magic/Effects. Cada estación sortea, una vez por
        día de Minecraft, si dispara uno de sus <code>world-events</code> elegibles según{" "}
        <code>world-event-daily-chance</code>.
      </p>
      <Table>
        <Thead>
          <Th>Tipo de componente</Th>
          <Th>Alcance</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">PARTICLE / SOUND / VISUAL</Td><Td>Por jugador (VISUAL delega en SackEffects).</Td></Tr>
          <Tr><Td className="font-mono text-xs">APPLY_EFFECT</Td><Td>Por jugador, vía RPGRoll-Effects.</Td></Tr>
          <Tr><Td className="font-mono text-xs">SPAWN_MOB</Td><Td>Por jugador, con su propia <code>chance</code> — vía RPGRoll-Mobs.</Td></Tr>
          <Tr><Td className="font-mono text-xs">MESSAGE</Td><Td>Una vez, a todo el mundo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">COMMAND / SET_WEATHER</Td><Td>Una vez por mundo (no por jugador).</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="regiones">Regiones</SectionHeading>
      <p>
        Una <code>SeasonRegion</code> es una simple caja (AABB, sin depender de WorldGuard) con un modo de
        override:
      </p>
      <Table>
        <Thead>
          <Th>Modo</Th>
          <Th>Comportamiento</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">FOLLOW_WORLD_CALENDAR</Td><Td>Usa el reloj normal del mundo (default — casi ninguna región lo necesita explícitamente).</Td></Tr>
          <Tr><Td className="font-mono text-xs">PINNED_SEASON</Td><Td>Siempre la misma estación fija, sin ningún reloj (ej. "Desierto: siempre verano").</Td></Tr>
          <Tr><Td className="font-mono text-xs">PINNED_CALENDAR</Td><Td>Corre su propio calendario con un reloj completamente independiente al del mundo (ej. "Reino mágico: su propio ciclo").</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="formato-yaml">Ejemplos de archivo YAML</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="seasons/summer.yml (plugins/RPGRoll-Seasons/seasons/)"
        code={
          "id: summer\n" +
          'display-name: "&eVerano"\n' +
          "icon: WHEAT\n" +
          "color: YELLOW\n" +
          'description: "Calor intenso, sequías y ríos bajos. El Coloso de Ceniza a veces despierta."\n' +
          "duration-amount: 7\n" +
          "duration-unit: MINECRAFT_DAYS\n" +
          "tags: [hot, drought]\n" +
          "exclusive-boss: ash_colossus\n" +
          "world-events: [meteor_shower]\n" +
          "world-event-daily-chance: 0.2\n" +
          "\n" +
          "climate:\n" +
          "  rain-chance: 0.1\n" +
          "  storm-chance: 0.02\n" +
          "  base-temperature: 28\n" +
          "  temperature-variance: 5\n" +
          "  heatwave-chance: 0.15\n" +
          "\n" +
          "vegetation-effects:\n" +
          "  - DRY_GRASS\n" +
          "\n" +
          "biome-temperature-modifiers:\n" +
          "  desert: 10\n" +
          "  plains: 5\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="seasons/winter.yml"
        code={
          "id: winter\n" +
          'display-name: "&bInvierno"\n' +
          "icon: SNOWBALL\n" +
          "color: AQUA\n" +
          'description: "Nieve, ríos congelados, y las auroras más frecuentes del año."\n' +
          "duration-amount: 7\n" +
          "duration-unit: MINECRAFT_DAYS\n" +
          "world-events: [aurora]\n" +
          "world-event-daily-chance: 0.25\n" +
          "\n" +
          "climate:\n" +
          "  rain-chance: 0.3\n" +
          "  storm-chance: 0.1\n" +
          "  snow-chance: 0.5\n" +
          "  base-temperature: -5\n" +
          "\n" +
          "vegetation-effects:\n" +
          "  - SNOW_LAYERS\n" +
          "  - ICE_LAKES\n" +
          "\n" +
          "biome-temperature-modifiers:\n" +
          "  taiga: -15\n" +
          "  snowy_taiga: -10\n"
        }
      />

      <YamlBuilder
        title="Constructor visual: identidad y duración de la estación"
        description="Clima, subestaciones, modificadores de bioma, vegetación y mobs de temporada son demasiado variados para un formulario lineal — todos viven en pantallas propias dentro del editor in-game. Copiá y adaptá uno de los ejemplos de arriba para esos campos."
        folder="seasons"
        fields={seasonFields}
      />

      <SectionHeading id="gui">GUI: Season Studio</SectionHeading>
      <p>
        <Kbd>/seasonsadmin browser</Kbd> abre un hub que enlaza a 4 navegadores — Calendarios, Estaciones, Eventos
        Mundiales y Regiones. El editor de una estación agrupa identidad/duración/clima/tags/modificadores de
        bioma/vegetación/eventos elegibles en un solo hub vía chat, y separa subestaciones y mobs de temporada en
        sus propias pantallas (listas con alta/baja).
      </p>

      <SectionHeading id="api">API para addons — SeasonsAPI</SectionHeading>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={
          "// Pensado en primer lugar para un futuro RPGRoll-Farming/RPGRoll-Fishing.\n" +
          "double temperatura = SeasonsAPI.get().getTemperature(location);\n" +
          "\n" +
          "Set<String> temporadasPermitidas = Set.of(\"spring\", \"summer\");\n" +
          "boolean permitido = SeasonsAPI.get().isSeasonAllowed(location, temporadasPermitidas);\n" +
          "\n" +
          "// Control manual (ej. desde un comando propio o un evento de otro addon).\n" +
          'SeasonsAPI.get().setSeason(world, "winter");\n' +
          'SeasonsAPI.get().triggerWorldEvent("aurora", world);\n'
        }
      />
      <Callout tone="tip" title="isSeasonAllowed no sabe nada de cultivos ni peces">
        Es un atajo genérico: compara la estación efectiva en una ubicación contra un conjunto de ids permitidos.
        Un futuro RPGRoll-Farming definiría, en su propio YAML de cultivo, algo como{" "}
        <code>allowed-seasons: [spring, summer]</code> y llamaría a este método — Seasons no necesita saber que
        "eso" es trigo.
      </Callout>

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/seasonsadmin browser</Td><Td>Abre el Season Studio.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/seasonsadmin reload</Td><Td>Recarga todas las definiciones desde disco.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/seasonsadmin setseason <mundo> <id>"}</Td><Td>Fuerza la estación de un mundo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/seasonsadmin advance <mundo>"}</Td><Td>Avanza a la siguiente estación del calendario de ese mundo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/seasonsadmin trigger <id> <mundo>"}</Td><Td>Dispara un evento mundial a mano.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/seasons info [mundo]"}</Td><Td>Estación actual y, si sos jugador, la temperatura donde estás.</Td></Tr>
        </tbody>
      </Table>
      <p>
        Los comandos <code>/seasonsadmin</code> requieren <Badge tone="amber">rpgrollseasons.admin.*</Badge>{" "}
        (default: op); <code>/seasons</code> requiere <Badge tone="blue">rpgrollseasons.use</Badge> (default: true).
      </p>

      <SectionHeading id="pendiente">Qué falta (próxima pasada)</SectionHeading>
      <Callout tone="warning" title="Esta pasada es 'Núcleo + contenido dinámico', no todo el diseño original">
        A propósito, esta versión <strong>no</strong> incluye festivales (NPCs/tiendas/misiones vía
        RPGRoll-NPCs/Quests), decoraciones automáticas de feriados (árboles de Navidad, calabazas de Halloween),
        ni migración/hibernación animal. Tampoco existen todavía RPGRoll-Farming ni RPGRoll-Fishing — las
        integraciones de cultivos/pesca de la idea original quedan como la API genérica{" "}
        <code>isSeasonAllowed(...)</code>, lista para cuando esos addons existan. Lo que sí está completo y
        estable: el motor de calendario/clima/temperatura, vegetación dinámica, mobs/jefe de temporada, eventos
        mundiales, regiones con override, la API pública, el Season Studio, y contenido de ejemplo (1 calendario
        de 4 estaciones, 2 eventos, 1 región).
      </Callout>

      <PrevNext current="seasons" onNavigate={onNavigate} />
    </>
  );
}
