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

const speciesFields: YamlField[] = [
  {
    key: "id",
    label: "Id",
    type: "string",
    default: "nueva_especie",
    placeholder: "river_trout",
  },
  {
    key: "display-name",
    label: "Nombre visible",
    type: "string",
    placeholder: "&bTrucha de Río",
  },
  { key: "icon", label: "Ícono (Material)", type: "string", default: "COD" },
  {
    key: "custom-model-data",
    label: "CustomModelData",
    type: "number",
    default: "0",
  },
  { key: "description", label: "Descripción", type: "string" },
  {
    key: "category",
    label: "Categoría",
    type: "select",
    options: [
      "FRESHWATER",
      "SALTWATER",
      "DEEP",
      "TROPICAL",
      "ARCTIC",
      "VOLCANIC",
      "MAGIC",
      "LEGENDARY",
    ],
    default: "FRESHWATER",
  },
  {
    key: "rarity",
    label: "Rareza",
    type: "select",
    options: ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY"],
    default: "COMMON",
  },
  {
    key: "water-types",
    label: "Tipos de agua (vacío = cualquiera)",
    type: "list",
    placeholder: "RIVER, LAKE",
  },
  { key: "biomes", label: "Biomas (vacío = cualquiera)", type: "list" },
  {
    key: "min-weight",
    label: "Peso mín. (kg)",
    type: "number",
    default: "0.5",
  },
  { key: "max-weight", label: "Peso máx. (kg)", type: "number", default: "3" },
  {
    key: "min-length",
    label: "Largo mín. (cm)",
    type: "number",
    default: "15",
  },
  {
    key: "max-length",
    label: "Largo máx. (cm)",
    type: "number",
    default: "40",
  },
  { key: "base-price", label: "Precio base", type: "number", default: "5" },
  {
    key: "base-experience",
    label: "Experiencia base",
    type: "number",
    default: "3",
  },
  {
    key: "behavior",
    label: "Comportamiento (dificultad del minijuego)",
    type: "select",
    options: ["SHY", "AGGRESSIVE", "FAST", "SLOW", "JUMPER", "ELUSIVE"],
    default: "SLOW",
  },
  {
    key: "attracted-by-bait-tags",
    label: "Tags de carnada que atraen (bono de peso)",
    type: "list",
  },
  {
    key: "catch-effect",
    label: "Efecto SackEffects al capturar",
    type: "string",
  },
  {
    key: "catch-status-effect",
    label: "Efecto de estado (RPGRoll-Effects) al capturar",
    type: "string",
  },
];

const rodFields: YamlField[] = [
  {
    key: "id",
    label: "Id",
    type: "string",
    default: "nueva_cana",
    placeholder: "apprentice_rod",
  },
  {
    key: "display-name",
    label: "Nombre visible",
    type: "string",
    placeholder: "&fCaña de Aprendiz",
  },
  {
    key: "material",
    label: "Material",
    type: "string",
    default: "FISHING_ROD",
  },
  { key: "description", label: "Descripción", type: "string" },
  { key: "durability", label: "Durabilidad", type: "number", default: "64" },
  {
    key: "cast-power",
    label: "Poder de lanzamiento (cosmético)",
    type: "number",
    default: "1.0",
  },
  {
    key: "reel-speed",
    label: "Velocidad de reeleo (ancho de zona)",
    type: "number",
    default: "1.0",
  },
  {
    key: "precision",
    label: "Precisión (bono a calidad)",
    type: "number",
    default: "0",
  },
  {
    key: "resistance",
    label: "Resistencia (fallos permitidos)",
    type: "number",
    default: "1.0",
  },
  {
    key: "luck-bonus",
    label: "Suerte (peso de especies raras+)",
    type: "number",
    default: "1.0",
  },
  { key: "preferred-categories", label: "Categorías preferidas", type: "list" },
];

export function Fishing({
  onNavigate,
}: {
  onNavigate: (slug: string) => void;
}) {
  return (
    <>
      <PageHeader title="Fishing (RPGRoll-Fishing)">
        Pesca como profesión completa — especies configurables con docenas de
        condiciones de captura, cañas y carnadas que modifican la tirada, un
        minijuego de forcejeo opcional, tesoros y basura, peces legendarios con
        requisitos extremos, y una enciclopedia de capturas por jugador.
      </PageHeader>

      <Callout
        tone="info"
        title="No reimplementa el cast/espera/mordida de la pesca"
      >
        RPGRoll-Fishing se apoya por completo en <code>PlayerFishEvent</code> de
        Bukkit — Minecraft decide cuándo y dónde muerde el anzuelo (vanilla), y
        este addon solo intercepta el estado <code>CAUGHT_FISH</code> para
        sustituir lo que iba a soltar por su propia tirada ponderada. Esto
        simplifica muchísimo el addon, pero trae una consecuencia real:{" "}
        <strong>
          una especie con <code>water-types: [LAVA]</code> sería imposible de
          pescar
        </strong>
        , porque vanilla nunca genera una mordida con el anzuelo flotando en
        lava.
      </Callout>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock
        language="yaml"
        code={
          "depend: [RPGRoll]\nsoftdepend: [SackEffects, RPGRoll-Effects, RPGRoll-Seasons, SackResourcePack]"
        }
      />
      <p>
        Sin{" "}
        <button
          type="button"
          onClick={() => onNavigate("seasons")}
          className="text-violet-600 underline dark:text-violet-400"
        >
          RPGRoll-Seasons
        </button>
        , el campo <code>allowed-seasons</code> de una especie simplemente no
        filtra nada (siempre elegible por estación) y el clima usa una tabla de
        temperatura aproximada propia en vez de la de Seasons. Sin
        SackEffects/RPGRoll-Effects, <code>catch-effect</code>/
        <code>catch-status-effect</code> no hacen nada — el resto de la captura
        funciona igual. Sin{" "}
        <button
          type="button"
          onClick={() => onNavigate("sackresourcepack")}
          className="text-violet-600 underline dark:text-violet-400"
        >
          SackResourcePack
        </button>
        , <code>custom-model-data</code> se guarda igual en la especie pero no
        se sincroniza ninguna textura — el ítem se ve con el <code>icon</code>{" "}
        vanilla normal, sin errores ni advertencias.
      </p>

      <SectionHeading id="especies">Especies de peces</SectionHeading>
      <p>
        Una <code>FishSpecies</code> combina identidad (nombre, ícono,{" "}
        <code>CustomModelData</code>), clasificación (categoría/rareza),
        condiciones de captura y rango de peso/largo/precio/experiencia.{" "}
        <strong>
          Todo campo de tipo lista vacío significa "sin restricción"
        </strong>{" "}
        — un <code>water-types</code> vacío permite cualquier agua, no ninguna.
      </p>
      <Callout tone="info" title="Texturas custom: la carpeta resourcepack/ se sincroniza sola">
        <code>custom-model-data</code> solo define el número — el material/textura reales los pone un resource
        pack. Dejá el modelo/textura en{" "}
        <code>plugins/RPGRoll-Fishing/resourcepack/&lt;namespace&gt;/&lt;textures|models&gt;/item/...</code> y, si
        SackResourcePack está instalado, se sincroniza solo al arrancar el plugin (mismo mecanismo que ya usa
        RPGRoll-Items). Sin ese resource pack armado, el pez se ve con su <code>icon</code> vanilla normal.
      </Callout>
      <Table>
        <Thead>
          <Th>Condición</Th>
          <Th>Cómo se resuelve</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">water-types</Td>
            <Td>
              Bioma/bloque del anzuelo → RIVER/LAKE/SWAMP/OCEAN/DEEP_OCEAN, o
              forzado por una <code>FishingRegion</code> para
              MAGIC_WATER/CORRUPTED_WATER.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">biomes</Td>
            <Td>
              Nombre de bioma vanilla en minúsculas (ej. <code>river</code>).
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">depths</Td>
            <Td>
              Escaneo simple de la columna de agua: SURFACE/MID_WATER/BOTTOM, o
              UNDERWATER_CAVE si hay techo sólido sobre la superficie.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">allowed-weathers</Td>
            <Td>
              SUNNY/RAIN/SNOW (según temperatura)/STORM, leído de{" "}
              <code>World#hasStorm/isThundering</code>.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">allowed-times</Td>
            <Td>
              DAY/NIGHT/DAWN/DUSK/NOON/MIDNIGHT — varios pueden estar activos a
              la vez, según <code>World#getTime()</code>.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">allowed-seasons</Td>
            <Td>
              Compara contra la estación efectiva de RPGRoll-Seasons (si está
              instalado).
            </Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="legendarios">Peces legendarios</SectionHeading>
      <p>
        <code>legendary: true</code> activa hasta 3 condiciones extra, evaluadas{" "}
        <strong>además</strong> de las normales: <code>required-level</code>{" "}
        (vía RPGRollAPI, si no está instalado un nivel mínimo &gt; 0 hace la
        especie imposible), <code>requires-full-moon</code> (una fase lunar
        propia calculada como <code>(fullTime / 24000) % 8 == 0</code>, no una
        luna llena "real" de Minecraft), y <code>required-bait</code> (exige esa
        carnada exacta, no solo un tag). El Leviatán del contenido de ejemplo
        usa las tres a la vez.
      </p>

      <SectionHeading id="canas-carnadas">Cañas y carnadas</SectionHeading>
      <Callout
        tone="tip"
        title="Una caña unifica Caña/Carrete/Sedal/Anzuelo del diseño original"
      >
        Los cuatro son, en la práctica, multiplicadores sobre la misma tirada de
        captura — <code>FishingRod</code> los junta en un solo tipo de contenido
        (mismo criterio que <code>SpellCatalyst</code> en Magic). Lo que los
        diferenciaría (modelo, lore, nombre) sigue siendo libre por caña.
      </Callout>
      <Table>
        <Thead>
          <Th>Campo de la caña</Th>
          <Th>Efecto</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">reel-speed</Td>
            <Td>
              Achica la zona de tensión del minijuego RPG (más difícil) o la
              agranda si es &gt;1 (más fácil).
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">precision</Td>
            <Td>Bono directo a la tirada de calidad de la captura.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">resistance</Td>
            <Td>Aumenta los fallos permitidos antes de que el pez escape.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">luck-bonus</Td>
            <Td>Multiplica el peso de tirada de especies no-COMMON.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">preferred-categories</Td>
            <Td>+50% de peso extra a especies de esas categorías.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">cast-power</Td>
            <Td>
              Cosmético por ahora — reservado para una futura mecánica de
              distancia real.
            </Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        Una carnada se sostiene en la mano secundaria y se consume 1 por cada
        lanzamiento (aunque no muerda nada). <code>quality-bonus</code> suma
        directo a la tirada de calidad; <code>legendary-weight-multiplier</code>{" "}
        es la "Carnada Legendaria" del diseño original — solo importa contra
        especies <code>legendary</code>.
      </p>
      <CodeBlock
        language="yaml"
        filename="baits/golden_lure.yml"
        code={
          "id: golden_lure\n" +
          'display-name: "&6Señuelo Dorado"\n' +
          "material: GOLD_NUGGET\n" +
          'description: "La carnada legendaria — atrae la atención de lo que normalmente ni se acerca."\n' +
          "tags: [magic, shiny]\n" +
          "quality-bonus: 3\n" +
          "legendary-weight-multiplier: 6.0\n"
        }
      />

      <SectionHeading id="tesoros-basura">Tesoros y basura</SectionHeading>
      <p>
        Antes de sortear una especie, cada picada tira contra{" "}
        <code>treasure-chance</code>/<code>junk-chance</code> (config global) —
        si sale tesoro o basura, ni siquiera se evalúan las especies elegibles.
        Ambos entregan hoy un <code>ItemStack</code> vanilla puro (material +
        cantidad); referenciar un ítem custom de RPGRoll-Items queda para una
        integración futura.
      </p>
      <CodeBlock
        language="yaml"
        filename="treasures/sunken_chest.yml"
        code={
          "id: sunken_chest\n" +
          'display-name: "&6Cofre Hundido"\n' +
          "icon: CHEST\n" +
          'description: "Un pequeño cofre que se hundió hace años — todavía tiene algo de valor adentro."\n' +
          "rarity: RARE\n" +
          "reward-material: EMERALD\n" +
          "reward-amount: 3\n" +
          "weight: 1.0\n"
        }
      />

      <SectionHeading id="regiones">Regiones de pesca</SectionHeading>
      <p>
        Una <code>FishingRegion</code> es una caja simple (AABB, sin WorldGuard
        — mismo estilo que <code>SeasonRegion</code>) que fuerza un{" "}
        <code>WaterType</code>. Es la única forma de conseguir{" "}
        <code>MAGIC_WATER</code> o <code>CORRUPTED_WATER</code>, ya que ningún
        bioma vanilla las implica.
      </p>

      <SectionHeading id="minijuego">
        Minijuego de forcejeo (modo RPG)
      </SectionHeading>
      <p>
        Con <code>rpg-mode: true</code> (config global), cada picada de pez abre
        una barra de tensión: un indicador oscila con una onda seno y el jugador
        tiene que golpear con <strong>click izquierdo (swing de brazo)</strong>{" "}
        — a propósito, no click derecho, porque con una caña en mano ese botón
        ya recoge el sedal en vanilla. <code>behavior</code> de la especie
        decide velocidad de oscilación y ancho de zona; <code>JUMPER</code>{" "}
        re-centra la zona cada 40 ticks para simular un pez errático. Con{" "}
        <code>rpg-mode: false</code> la captura se resuelve al instante, sin
        minijuego (modo vanilla clásico).
      </p>

      <SectionHeading id="formato-yaml">
        Ejemplos de archivo YAML
      </SectionHeading>
      <CodeBlock
        language="yaml"
        filename="species/dragon_fish.yml"
        code={
          "id: dragon_fish\n" +
          'display-name: "&4Pez Dragón"\n' +
          "icon: TROPICAL_FISH\n" +
          "custom-model-data: 1002\n" +
          'description: "Vive cerca de fumarolas volcánicas submarinas — quema al sacarlo del agua."\n' +
          "category: VOLCANIC\n" +
          "rarity: EPIC\n" +
          "water-types: [DEEP_OCEAN]\n" +
          "min-weight: 3\n" +
          "max-weight: 12\n" +
          "min-length: 40\n" +
          "max-length: 90\n" +
          "base-price: 60\n" +
          "base-experience: 25\n" +
          "behavior: AGGRESSIVE\n" +
          "catch-status-effect: burning\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="species/leviathan.yml"
        code={
          "id: leviathan\n" +
          'display-name: "&5&lLeviatán"\n' +
          "icon: TROPICAL_FISH\n" +
          "custom-model-data: 1000\n" +
          'description: "Una criatura ancestral que solo emerge bajo condiciones extremadamente específicas. Requiere la Carnada Legendaria."\n' +
          "category: LEGENDARY\n" +
          "rarity: LEGENDARY\n" +
          "depths: [BOTTOM, UNDERWATER_CAVE]\n" +
          "min-weight: 80\n" +
          "max-weight: 250\n" +
          "min-length: 300\n" +
          "max-length: 800\n" +
          "base-price: 500\n" +
          "base-experience: 200\n" +
          "behavior: ELUSIVE\n" +
          "allowed-seasons: [winter]\n" +
          "allowed-weathers: [STORM]\n" +
          "legendary: true\n" +
          "required-level: 50\n" +
          "requires-full-moon: true\n" +
          "required-bait: golden_lure\n" +
          "catch-effect: level_up\n"
        }
      />

      <Callout
        tone="tip"
        title="Referencia completa: todos los campos en un solo archivo"
      >
        <code>species/reference_full.yml</code> (incluido en el jar) agrega{" "}
        <code>biomes</code>, <code>allowed-times</code> y{" "}
        <code>attracted-by-bait-tags</code> — los tres campos que ninguno de los
        dos ejemplos de arriba muestra, junto con todos los demás.
      </Callout>

      <YamlBuilder
        title="Constructor visual: especie de pez"
        description="Identidad, clasificación y condiciones básicas de captura. Campos de listas van separados por comas; dejalos vacíos para 'sin restricción'."
        folder="species"
        fields={speciesFields}
      />
      <YamlBuilder
        title="Constructor visual: caña de pescar"
        folder="rods"
        fields={rodFields}
      />

      <SectionHeading id="gui">GUI: Fishing Studio</SectionHeading>
      <p>
        <Kbd>/fishingadmin browser</Kbd> abre un hub que enlaza a 6 navegadores
        — Especies, Cañas, Carnadas, Tesoros, Basura y Regiones.{" "}
        <Kbd>/fishing encyclopedia</Kbd> abre la enciclopedia personal del
        jugador: qué especies conoce y su mejor captura (peso/largo/calidad) de
        cada una.
      </p>

      <SectionHeading id="api">API para addons — FishingAPI</SectionHeading>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={
          "// Pensado en primer lugar para un futuro RPGRoll-Quests objective\n" +
          '// ("capturá 15 peces legendarios") o RPGRoll-Cooking.\n' +
          'boolean yaLoConoce = FishingAPI.get().hasCaught(player, "leviathan");\n' +
          'int vecesCapturado = FishingAPI.get().getCaughtCount(player, "river_trout");\n' +
          "\n" +
          "// Forzar una tirada de captura por código, sin pasar por el minijuego ni la vara física.\n" +
          "CatchResult resultado = FishingAPI.get().forceCatch(player, hookLocation);\n"
        }
      />
      <Callout
        tone="tip"
        title="hasCaught/getCaughtCount no saben nada de misiones ni recetas"
      >
        Son atajos genéricos sobre la enciclopedia del jugador — un futuro
        RPGRoll-Quests definiría su propio objetivo de captura y llamaría a
        estos métodos; Fishing no necesita saber que "eso" es una misión.
      </Callout>

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">/fishingadmin browser</Td>
            <Td>Abre el Fishing Studio.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">/fishingadmin reload</Td>
            <Td>Recarga todas las definiciones desde disco.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/fishingadmin giverod <id>"}
            </Td>
            <Td>Entrega una caña al jugador.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/fishingadmin givebait <id>"}
            </Td>
            <Td>Entrega carnada al jugador.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">/fishing encyclopedia</Td>
            <Td>Abre la enciclopedia de capturas personal.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">/fishing stats</Td>
            <Td>
              Resumen: peces capturados, especies descubiertas, tesoros y
              basura.
            </Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        <code>/fishingadmin</code> requiere{" "}
        <Badge tone="amber">rpgrollfishing.admin.*</Badge> (default: op);{" "}
        <code>/fishing</code> requiere{" "}
        <Badge tone="blue">rpgrollfishing.use</Badge> (default: true).
      </p>
      <PrevNext current="fishing" onNavigate={onNavigate} />
    </>
  );
}
