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

const stationFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_estacion", placeholder: "iron_forge" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "Forja de Hierro" },
  { key: "icon", label: "Ícono (Material)", type: "string", default: "SMITHING_TABLE" },
  { key: "trigger-block-material", label: "Bloque disparador (Material)", type: "string", default: "SMITHING_TABLE" },
  { key: "inventory-size", label: "Tamaño de inventario", type: "number", default: "27" },
  { key: "ingredient-slots", label: "Slots de ingrediente", type: "list", placeholder: "0, 1, 2, 3" },
  { key: "fuel-slot", label: "Slot de combustible (-1 = sin combustible)", type: "number", default: "-1" },
  { key: "output-slot", label: "Slot de salida", type: "number", default: "26" },
  { key: "requires-fuel", label: "Requiere combustible", type: "boolean", default: "false" },
  { key: "gui-title", label: "Título de GUI", type: "string" },
  { key: "allowed-recipe-ids", label: "Recetas permitidas (vacío = todas de esta estación)", type: "list" },
];

const recipeFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_receta", placeholder: "steel_ingot" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "Lingote de Acero" },
  { key: "icon", label: "Ícono (Material)", type: "string", default: "CRAFTING_TABLE" },
  { key: "station-id", label: "Id de la estación", type: "string", placeholder: "iron_forge" },
  { key: "processing-time-ticks", label: "Tiempo de proceso (ticks)", type: "number", default: "100" },
  { key: "fuel-per-craft", label: "Combustible por crafteo", type: "number", default: "0" },
  { key: "xp-amount", label: "XP de personaje otorgada", type: "number", default: "0" },
  { key: "economy-currency-id", label: "Moneda (vacío = base)", type: "string" },
  { key: "economy-cost", label: "Costo económico", type: "number", default: "0" },
  { key: "fail-chance", label: "Prob. de fallo (-1 = usar config.yml)", type: "number", default: "-1" },
  { key: "quality-enabled", label: "Calidad habilitada", type: "boolean", default: "false" },
];

const fuelFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_combustible", placeholder: "charcoal_fuel" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "Carbón vegetal" },
  { key: "icon", label: "Ícono (Material)", type: "string", default: "COAL" },
  { key: "material-or-item-id", label: "Material o id de ítem", type: "string", default: "COAL" },
  { key: "is-custom-item", label: "Es ítem personalizado", type: "boolean", default: "false" },
  { key: "burn-ticks", label: "Ticks de quemado", type: "number", default: "1600" },
  { key: "consume-amount", label: "Cantidad consumida", type: "number", default: "1" },
];

export function Crafting({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="RPGRoll-Crafting">
        Motor de crafteo avanzado: recetas personalizadas con <strong>ingredientes y condiciones ricas</strong>, un
        sistema de calidad, <strong>estaciones de crafteo propias</strong> (multi-etapa, con combustible) y un puente
        hacia las estaciones vanilla que exponen una API de receta genérica (mesa de crafteo, familia de hornos,
        cortadora de piedra, mesa de herrería), más motores dedicados de yunque y fermentación para las dos
        estaciones que no la tienen.
      </PageHeader>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <Table>
        <Thead>
          <Th>Plugin</Th>
          <Th>Tipo</Th>
          <Th>Para qué</Th>
        </Thead>
        <tbody>
          <Tr><Td>RPGRoll (core)</Td><Td><Badge tone="violet">depend</Badge></Td><Td>Framework de GUIs, RPGRollAPI (nivel/raza/clase/job del jugador) y xp de personaje.</Td></Tr>
          <Tr><Td>RPGRoll-Items</Td><Td><Badge>softdepend</Badge></Td><Td>Reconoce ítems personalizados como ingrediente/resultado (vía <code>ItemsPlugin#getItemManager()</code>/<code>getItemFactory()</code>, sin una API pública dedicada de ese addon).</Td></Tr>
          <Tr><Td>RPGRoll-Economy</Td><Td><Badge>softdepend</Badge></Td><Td>Cobra el costo monetario opcional de una receta.</Td></Tr>
          <Tr><Td>RPGRoll-Guilds</Td><Td><Badge>softdepend</Badge></Td><Td>Condición <code>GUILD_MEMBER</code>.</Td></Tr>
          <Tr><Td>RPGRoll-Seasons</Td><Td><Badge>softdepend</Badge></Td><Td>Condición <code>SEASON</code>.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="identidad-de-item">Identidad de ítem</SectionHeading>
      <p>
        Cualquier resultado que no sea un material vanilla puro se marca con la clave PDC compartida{" "}
        <code>rpgroll:item_id</code> (namespace literal, no atado a este plugin). El motor también sabe leer, sin
        depender en tiempo de compilación de RPGRoll-Items, la clave que ese addon ya usa (
        <code>rpgroll-items:item-id</code>) — así un ítem personalizado de Items funciona como ingrediente o
        resultado sin que Crafting necesite su clase Java.
      </p>
      <Callout tone="tip" title="Los materiales vanilla planos nunca se etiquetan">
        Si el resultado es un <code>Material</code> simple sin calidad habilitada, el ítem sale limpio (sin PDC) para
        que siga apilando normalmente con el resto del inventario. Solo se etiqueta cuando hay una identidad real que
        preservar (ítem personalizado, o calidad rolada).
      </Callout>

      <SectionHeading id="ingredientes">Ingredientes</SectionHeading>
      <p>
        Cada <code>IngredientSpec</code> tiene un <code>type</code>, un <code>value</code>, una <code>amount</code> y
        opcionalmente una <code>min-quality</code> (el ítem entregado debe cumplir o superar esa calidad).
      </p>
      <Table>
        <Thead>
          <Th>Tipo</Th>
          <Th>value espera</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">MATERIAL</Td><Td>Un <code>Material</code> vanilla exacto.</Td></Tr>
          <Tr><Td className="font-mono text-xs">TAG</Td><Td>Un tag vanilla de ítems (ej. <code>minecraft:planks</code>) — cualquier material del tag sirve.</Td></Tr>
          <Tr><Td className="font-mono text-xs">ITEM_ID</Td><Td>Un id de ítem personalizado, propio de Crafting o de RPGRoll-Items.</Td></Tr>
          <Tr><Td className="font-mono text-xs">ANY</Td><Td>Comodín — cualquier ítem sirve, solo importa la cantidad.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="condiciones">Condiciones</SectionHeading>
      <p>
        Gating por jugador, evaluado antes de iniciar una receta (o al previsualizar el resultado en la mesa de
        crafteo vanilla). Cada tipo que depende de otro addon sigue el patrón blando "isReady() → get()" del
        ecosistema: si el addon no está instalado, la condición simplemente no se cumple.
      </p>
      <Table>
        <Thead>
          <Th>Tipo</Th>
          <Th>Qué chequea</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">LEVEL_MIN</Td><Td>Nivel de personaje mínimo (<code>min-value</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">RACE / CLASS</Td><Td>Raza o clase exacta del personaje.</Td></Tr>
          <Tr><Td className="font-mono text-xs">JOB_MIN</Td><Td>Nivel mínimo en un job específico (<code>value</code> + <code>min-value</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">PERMISSION</Td><Td>Nodo de permiso de Bukkit.</Td></Tr>
          <Tr><Td className="font-mono text-xs">WORLD</Td><Td>Nombre del mundo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">HOUR_RANGE</Td><Td>Rango de hora del reloj de Minecraft, ej. <code>"6-18"</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">BIOME</Td><Td>Bioma vanilla exacto.</Td></Tr>
          <Tr><Td className="font-mono text-xs">SEASON</Td><Td>Id de estación de RPGRoll-Seasons.</Td></Tr>
          <Tr><Td className="font-mono text-xs">GUILD_MEMBER</Td><Td>El jugador pertenece a un gremio (RPGRoll-Guilds).</Td></Tr>
          <Tr><Td className="font-mono text-xs">WEATHER</Td><Td><code>CLEAR</code> / <code>RAIN</code> / <code>THUNDER</code> en el mundo del jugador.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="calidad">Sistema de calidad</SectionHeading>
      <p>
        Cuando una receta tiene <code>quality-enabled: true</code>, el resultado rola un tier{" "}
        <code>CraftQuality</code> (70% según habilidad, 30% azar — mismo enfoque que <code>ProductQuality</code> de
        RPGRoll-Ranching) y queda etiquetado con una línea de lore + la clave PDC de calidad, para que otras recetas
        puedan exigir <code>min-quality</code> sobre ese ítem como ingrediente.
      </p>
      <Table>
        <Thead>
          <Th>Tier</Th>
          <Th>Multiplicador de valor</Th>
        </Thead>
        <tbody>
          <Tr><Td>Tosca</Td><Td>x0.75</Td></Tr>
          <Tr><Td>Estándar</Td><Td>x1.0</Td></Tr>
          <Tr><Td>Fina</Td><Td>x1.3</Td></Tr>
          <Tr><Td>Maestra</Td><Td>x1.7</Td></Tr>
          <Tr><Td>Legendaria</Td><Td>x2.5</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="estaciones-personalizadas">Estaciones personalizadas ⭐</SectionHeading>
      <p>
        El sistema insignia del addon. Una <code>CustomStation</code> es un bloque del mundo (cualquier{" "}
        <code>Material</code> que definas) que al hacer click derecho abre un inventario propio (ingredientes +
        combustible opcional + resultado). Cada estación colocada en el mundo tiene su propio{" "}
        <code>StationRuntime</code> — persistido por ubicación en{" "}
        <code>station-instances/&lt;mundo&gt;_&lt;x&gt;_&lt;y&gt;_&lt;z&gt;.yml</code> — que{" "}
        <code>StationProcessingEngine</code> tickea periódicamente (<code>station-tick-interval-ticks</code>): busca
        una receta cuyos ingredientes/condiciones/combustible se cumplan, la inicia (consumiendo ingredientes y
        cobrando el costo), avanza el progreso, y entrega el resultado — con calidad, xp y descubrimiento de receta
        incluidos — cuando termina.
      </p>
      <Callout tone="warning" title="El slot de salida es de solo-extracción">
        El jugador puede sacar el resultado terminado, pero no puede insertar ítems ahí a mano — si lo hiciera,
        rompería el conteo que usa el motor para saber si ya puede colocar el próximo resultado.
      </Callout>

      <SectionHeading id="recetas-personalizadas">Recetas personalizadas</SectionHeading>
      <p>
        Una <code>CustomRecipe</code> apunta a una <code>station-id</code>, define sus ingredientes y condiciones, un{" "}
        <code>result</code> (material vanilla o ítem de RPGRoll-Items), tiempo de proceso, combustible requerido,
        costo económico opcional, xp de personaje, probabilidad de fallo propia (o heredada de{" "}
        <code>default-fail-chance</code>) y si pasa por el sistema de calidad.
      </p>

      <SectionHeading id="recetas-vanilla">Puente con estaciones vanilla</SectionHeading>
      <p>
        Una <code>VanillaRecipeDefinition</code> se registra directamente en{" "}
        <code>Bukkit.addRecipe()</code> — cubre las 7 estaciones vanilla para las que Bukkit expone un tipo{" "}
        <code>Recipe</code> genérico. El resultado puede ser un material o un ítem de RPGRoll-Items, igual que las
        recetas de estación propia.
      </p>
      <Table>
        <Thead>
          <Th>type</Th>
          <Th>Estación vanilla</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">CRAFTING_TABLE_SHAPED / SHAPELESS</Td><Td>Mesa de crafteo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">FURNACE / BLAST_FURNACE / SMOKER / CAMPFIRE</Td><Td>Familia completa de hornos.</Td></Tr>
          <Tr><Td className="font-mono text-xs">STONECUTTER</Td><Td>Cortadora de piedra.</Td></Tr>
          <Tr><Td className="font-mono text-xs">SMITHING_TRANSFORM</Td><Td>Mesa de herrería (plantilla + base + adición).</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title="Las condiciones solo se aplican en la mesa de crafteo">
        Bukkit no ofrece un evento de "previsualización" para hornos/cortadora/herrería — esas 5 estaciones registran
        la receta igual, pero sin gating por jugador. En la mesa de crafteo, <code>PrepareItemCraftEvent</code> oculta
        el resultado si el jugador que la ve no cumple las condiciones.
      </Callout>

      <SectionHeading id="yunque-y-fermentacion">Yunque y fermentación</SectionHeading>
      <p>
        Ninguna de las dos estaciones tiene un tipo <code>Recipe</code> genérico en Bukkit, así que tienen motores
        dedicados: <code>AnvilEngine</code> escucha <code>PrepareAnvilEvent</code> y, si los dos ítems puestos
        coinciden con una <code>AnvilRecipeDefinition</code> (base + adición), reemplaza el resultado vanilla
        (reparación/renombrado normal) por el nuestro al costo de niveles configurado. <code>BrewingEngine</code>{" "}
        escucha <code>BrewEvent</code> y, si el ingrediente coincide con una <code>BrewRecipeDefinition</code>,
        reemplaza el resultado de cada botella no vacía. Sin coincidencia, ambas estaciones funcionan exactamente
        igual que en vanilla.
      </p>

      <SectionHeading id="descubrimiento">Descubrimiento de recetas</SectionHeading>
      <p>
        Cada vez que una <code>CustomRecipe</code> se completa por primera vez para un jugador, queda marcada como
        descubierta (persistido en <code>discoveries/&lt;uuid&gt;.yml</code>) y dispara{" "}
        <code>RecipeDiscoverEvent</code>. <Kbd>/crafting book</Kbd> abre el Recipe Book: las recetas descubiertas
        muestran su ícono, estación e ingredientes reales; las que no, un ítem "???" — nunca revela una receta sin
        descubrir.
      </p>

      <SectionHeading id="formato-yaml">Ejemplos de archivo YAML</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="stations/iron_forge.yml"
        code={
          "id: iron_forge\n" +
          'display-name: "Forja de Hierro"\n' +
          "icon: SMITHING_TABLE\n" +
          "trigger-block-material: SMITHING_TABLE\n" +
          "inventory-size: 27\n" +
          "ingredient-slots: [0, 1, 2, 3]\n" +
          "fuel-slot: 9\n" +
          "output-slot: 26\n" +
          "requires-fuel: true\n" +
          'gui-title: "Forja de Hierro"\n' +
          "allowed-recipe-ids: []\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="recipes/steel_ingot.yml"
        code={
          "id: steel_ingot\n" +
          'display-name: "Lingote de Acero"\n' +
          "icon: IRON_INGOT\n" +
          "station-id: iron_forge\n" +
          "processing-time-ticks: 200\n" +
          "fuel-per-craft: 2\n" +
          "xp-amount: 5\n" +
          "fail-chance: 0.1\n" +
          "quality-enabled: true\n" +
          "result:\n  type: MATERIAL\n  value: IRON_INGOT\n  amount: 1\n" +
          "ingredients:\n  - type: MATERIAL\n    value: IRON_ORE\n    amount: 2\n  - type: MATERIAL\n    value: COAL\n    amount: 1\n" +
          "conditions:\n  - type: LEVEL_MIN\n    min-value: 5\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="fuels/charcoal_fuel.yml"
        code={
          "id: charcoal_fuel\n" +
          'display-name: "Carbón vegetal"\n' +
          "icon: CHARCOAL\n" +
          "material-or-item-id: CHARCOAL\n" +
          "is-custom-item: false\n" +
          "burn-ticks: 1600\n" +
          "consume-amount: 1\n"
        }
      />
      <Callout tone="tip" title="Referencia completa: todos los campos en un solo archivo, por cada tipo de contenido">
        <code>recipes/reference_full.yml</code>, <code>stations/reference_full.yml</code>,{" "}
        <code>fuels/reference_full.yml</code>, <code>vanilla-recipes/reference_full.yml</code>,{" "}
        <code>anvil-recipes/reference_full.yml</code> y <code>brew-recipes/reference_full.yml</code> (incluidos en
        el jar) documentan todos los campos disponibles de cada tipo, incluyendo todos los tipos posibles de
        ingrediente y de condición.
      </Callout>

      <YamlBuilder title="Constructor visual: Estación personalizada" folder="stations" fields={stationFields} />
      <YamlBuilder title="Constructor visual: Receta personalizada" folder="recipes" fields={recipeFields} />
      <YamlBuilder title="Constructor visual: Combustible" folder="fuels" fields={fuelFields} />

      <SectionHeading id="gui">GUI: Crafting Studio</SectionHeading>
      <p>
        <Kbd>/craftingadmin browser</Kbd> abre un hub que enlaza a 6 navegadores, y los 6 tienen crear + editar
        completo en inventario — nada requiere tocar YAML a mano. Los campos escalares (nombre, ícono, tiempos,
        costos, resultado...) se editan slot por slot; las listas (ingredientes de una receta, condiciones) abren
        un sub-editor dedicado con sus propios slots de "agregar"/"quitar" (shift-click) y una mini-sintaxis por
        chat para el ítem nuevo, ej. <code>MATERIAL IRON_INGOT 2</code> o <code>LEVEL_MIN 5</code>; <code>shape</code>
        /<code>key</code>/<code>ingredients</code> de una receta vanilla se retipean enteros por chat (una lista tan
        variable no entra en slots fijos). Editar o borrar una receta vanilla la vuelve a registrar en Bukkit al
        instante — no hace falta reiniciar el servidor. Del lado del jugador, <Kbd>/crafting book</Kbd> abre el
        Recipe Book.
      </p>

      <SectionHeading id="api">API para addons — CraftingAPI + eventos</SectionHeading>
      <p>
        <code>CraftingAPI.isReady()</code> / <code>CraftingAPI.get()</code>, mismo patrón que el resto del
        ecosistema. Expone los 6 managers de contenido, <code>discovery()</code> y{" "}
        <code>stationAt(mundo, x, y, z)</code> para consultar el <code>StationRuntime</code> de una ubicación.
      </p>
      <Table>
        <Thead>
          <Th>Evento</Th>
          <Th>Cuándo</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">CraftPrepareEvent</Td><Td>Justo antes de consumir ingredientes/cobrar — cancelable.</Td></Tr>
          <Tr><Td className="font-mono text-xs">CraftStartEvent</Td><Td>La receta empieza a procesarse.</Td></Tr>
          <Tr><Td className="font-mono text-xs">CraftProcessEvent</Td><Td>Cada tick que avanza el progreso.</Td></Tr>
          <Tr><Td className="font-mono text-xs">CraftCompleteEvent</Td><Td>Resultado entregado exitosamente.</Td></Tr>
          <Tr><Td className="font-mono text-xs">CraftFailEvent</Td><Td>La receta terminó pero falló.</Td></Tr>
          <Tr><Td className="font-mono text-xs">RecipeDiscoverEvent</Td><Td>Primera vez que un jugador descubre una receta.</Td></Tr>
          <Tr><Td className="font-mono text-xs">StationOpenEvent</Td><Td>Click derecho en el bloque de una estación — cancelable.</Td></Tr>
          <Tr><Td className="font-mono text-xs">StationCloseEvent</Td><Td>El jugador cierra el inventario de una estación.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
          <Th>Permiso</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/craftingadmin browser</Td><Td>Abre el Crafting Studio.</Td><Td><Badge tone="violet">rpgrollcrafting.admin.*</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">/craftingadmin reload</Td><Td>Recarga todo el contenido YAML.</Td><Td><Badge tone="violet">rpgrollcrafting.admin.*</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/craftingadmin give <jugador> <item-id>"}</Td><Td>Entrega un ítem de RPGRoll-Items por id.</Td><Td><Badge tone="violet">rpgrollcrafting.admin.*</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">/crafting book</Td><Td>Abre tu Recipe Book.</Td><Td><Badge>rpgrollcrafting.use</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">/crafting discover</Td><Td>Ve cuántas recetas descubriste.</Td><Td><Badge>rpgrollcrafting.use</Badge></Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="pendiente">Qué falta (próxima pasada)</SectionHeading>
      <ul className="list-disc space-y-1 pl-6">
        <li>Detección de estructuras multibloque para estaciones (hoy es un único bloque disparador).</li>
        <li>Mejoras/niveles de estación (Forja I-V) que aceleren el proceso o reduzcan el fallo.</li>
        <li>Integración con un sistema de habilidades dedicado (no existe todavía en el ecosistema).</li>
        <li>Recetas personalizadas para Telar, Mesa de Cartografía, Piedra de Amolar, Comercio de Aldeanos y automatización de Crafter — ninguna tiene una API de <code>Recipe</code> genérica en Bukkit, necesitarían trabajo dedicado por estación.</li>
        <li>Auto-descubrimiento por experimentación (combinar materiales al azar sin conocer la receta).</li>
        <li>Modelos 3D multibloque vía SackResourcePack para las estaciones personalizadas.</li>
        <li>Procesamiento de estaciones personalizadas mientras el dueño está offline (las estaciones vanilla-bridged ya son inherentemente offline-capable, al ser estado del mundo/bloque).</li>
      </ul>

      <PrevNext current="crafting" onNavigate={onNavigate} />
    </>
  );
}
