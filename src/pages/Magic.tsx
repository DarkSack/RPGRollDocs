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

const spellFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_hechizo", placeholder: "fireball" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&6Bola de Fuego" },
  { key: "icon", label: "Ícono (Material)", type: "string", default: "BLAZE_POWDER" },
  { key: "color", label: "Color", type: "string", default: "WHITE" },
  { key: "school", label: "Escuela (id)", type: "string", placeholder: "fire" },
  {
    key: "rarity",
    label: "Rareza",
    type: "select",
    options: ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY"],
    default: "COMMON",
  },
  { key: "level", label: "Nivel requerido", type: "number", default: "1" },
  {
    key: "trigger",
    label: "Trigger",
    type: "select",
    options: ["LEFT_CLICK", "RIGHT_CLICK", "HOLD"],
    default: "RIGHT_CLICK",
  },
  { key: "cast-time", label: "Tiempo de canalización (ticks, solo HOLD)", type: "number", default: "0" },
  { key: "cooldown", label: "Cooldown (ticks)", type: "number", default: "40" },
  { key: "tree-parent", label: "Requiere antes (id de otro hechizo)", type: "string" },
  { key: "tree-tier", label: "Nivel del árbol", type: "number", default: "0" },
  { key: "tags", label: "Tags", type: "list", placeholder: "fire, projectile" },
  { key: "description", label: "Descripción", type: "string" },
];

export function Magic({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Magic (RPGRoll-Magic)">
        Framework de magia modular — escuelas con afinidades, hechizos construidos por componentes (nunca
        "programados"), maná/vida/experiencia/reactivos como costo, catalizadores, grimorios, runas y árboles de
        progresión. Profundamente integrado con SackEffects (visuales) y RPGRoll-Effects (aplicar maldiciones/
        curses reales).
      </PageHeader>

      <Callout tone="info" title="No existen hechizos programados">
        Todos los hechizos, sin excepción, se arman encadenando los mismos ~23 tipos de componente en el orden que
        quieras — igual que <code>EffectComponent</code> en RPGRoll-Effects o <code>EffectStep</code> en
        SackEffects. No hay ninguna clase Java especial para "Fireball" o "Meteoro": ambos son la misma{" "}
        <code>Spell</code>, solo con distintos componentes.
      </Callout>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll]\nsoftdepend: [SackEffects, RPGRoll-Effects]"} />
      <p>
        Sin{" "}
        <button type="button" onClick={() => onNavigate("sackeffects")} className="text-violet-600 underline dark:text-violet-400">
          SackEffects
        </button>
        , los componentes <code>VISUAL</code> no hacen nada. Sin{" "}
        <button type="button" onClick={() => onNavigate("rpgroll-effects")} className="text-violet-600 underline dark:text-violet-400">
          RPGRoll-Effects
        </button>
        , los componentes <code>APPLY_EFFECT</code>/<code>REMOVE_EFFECT</code> tampoco — el resto del motor
        (daño, movimiento, maná, cooldowns, runas) funciona igual.
      </p>

      <SectionHeading id="escuelas">Escuelas y afinidades</SectionHeading>
      <p>
        Una <code>MagicSchool</code> agrupa hechizos con identidad visual compartida (color, ícono, sonido/efecto
        al lanzar) y <strong>afinidades</strong> — bonos/maleficios multiplicativos de daño/curación según la raza
        o clase del jugador (ej. Elfo +25% en Nature, Demonio +30% en Fire y -40% en Holy). No hay jerarquía real
        entre escuelas ("Elemental" como padre de "Fire"/"Water") — es puramente organizativo vía <code>tags</code>,
        no se modela como estructura.
      </p>
      <CodeBlock
        language="yaml"
        filename="schools/fire.yml"
        code={
          "id: fire\n" +
          'display-name: "&cFuego"\n' +
          "color: RED\n" +
          "icon: BLAZE_POWDER\n" +
          'description: "Escuela de destrucción y daño directo."\n' +
          "cast-sound: ENTITY_BLAZE_SHOOT\n" +
          "\n" +
          "race-affinities:\n" +
          "  demon: 0.3\n" +
          "  elf: -0.1\n" +
          "\n" +
          "class-affinities:\n" +
          "  mage: 0.15\n"
        }
      />

      <SectionHeading id="hechizos">Anatomía de un hechizo</SectionHeading>
      <p>
        Un <code>Spell</code> combina identidad (nombre/ícono/color/escuela/rareza/nivel) con un{" "}
        <code>SpellCost</code> (maná/vida/experiencia/reactivo — ninguno usa "almas"/"energía" todavía, esas
        quedan para un futuro addon de economía propio), tiempos de cast/cooldown, un <code>trigger</code> de
        click, su lugar en el árbol de progresión de su escuela (<code>tree-parent</code>/<code>tree-tier</code>,
        sin entidad de "árbol" separada — el árbol es simplemente el grafo implícito de qué hechizo requiere a
        cuál), y el pipeline de componentes que define qué hace.
      </p>

      <SectionHeading id="triggers">Triggers de cast</SectionHeading>
      <Table>
        <Thead>
          <Th>Trigger</Th>
          <Th>Cómo lanza</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">LEFT_CLICK</Td><Td>Click izquierdo con el catalizador en mano.</Td></Tr>
          <Tr><Td className="font-mono text-xs">RIGHT_CLICK</Td><Td>Click derecho — instantáneo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">HOLD</Td><Td>Canaliza <code>cast-time</code> ticks quieto y sin recibir daño tras el click derecho — se cancela si te movés o te golpean.</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title="HOLD es una simulación, no un click-sostenido real">
        Bukkit no expone un evento de "seguís apretando click derecho" sin escuchar paquetes de cliente — en vez de
        eso, al iniciarse la canalización tenés <code>cast-time</code> ticks para completarla quieto y sin recibir
        daño. Es la misma simplificación que usan la mayoría de los plugins de RPG/magia sobre Bukkit puro.
      </Callout>

      <SectionHeading id="componentes">Componentes del pipeline (Spell Engine)</SectionHeading>
      <p>
        Solo <code>PROJECTILE</code> y <code>DELAY</code> pausan el pipeline (colisión sobre varios ticks / espera
        agendada) — todo lo demás corre sincrónico dentro del mismo tick. Los componentes de daño escalan por{" "}
        <code>powerMultiplier</code> (afinidad de escuela × catalizador).
      </p>
      <Table>
        <Thead>
          <Th>Categoría</Th>
          <Th>Tipos</Th>
        </Thead>
        <tbody>
          <Tr><Td>Movimiento</Td><Td className="font-mono text-xs">PROJECTILE, DASH, TELEPORT, LEAP, ORBIT</Td></Tr>
          <Tr><Td>Daño</Td><Td className="font-mono text-xs">DAMAGE_DIRECT, DAMAGE_AREA, DAMAGE_LINE, DAMAGE_CHAIN, DAMAGE_CONE</Td></Tr>
          <Tr><Td>Visual</Td><Td className="font-mono text-xs">PARTICLE, SOUND, VISUAL (delega en SackEffects)</Td></Tr>
          <Tr><Td>Mundo</Td><Td className="font-mono text-xs">BREAK_BLOCK, PLACE_BLOCK, IGNITE, FREEZE_WATER</Td></Tr>
          <Tr><Td>Entidades</Td><Td className="font-mono text-xs">SUMMON, HEAL, APPLY_EFFECT, REMOVE_EFFECT, PUSH, PULL</Td></Tr>
          <Tr><Td>Control</Td><Td className="font-mono text-xs">DELAY, MESSAGE, COMMAND</Td></Tr>
        </tbody>
      </Table>
      <p>
        <code>PROJECTILE</code> es el único componente con colisión real: avanza por tick spawneando una
        partícula de estela, se detiene al chocar con un bloque sólido o la primera entidad viva (salvo que una
        runa <code>PIERCING</code> esté activa), y deja el punto/entidad golpeada en el contexto para que el
        siguiente componente (típicamente <code>DAMAGE_DIRECT</code>) lo use. <code>SUMMON</code> invoca un mob{" "}
        <strong>vanilla</strong> por <code>EntityType</code> — la integración con RPGRoll-Mobs para invocaciones
        reales queda pendiente.
      </p>

      <SectionHeading id="runas">Runas</SectionHeading>
      <p>
        Una runa se socketea a un hechizo ya <strong>aprendido</strong> (vía el Spellbook del jugador, tope 3 por
        hechizo) — no son ítems físicos que se consuman, se adjuntan desde la GUI. Modifican el pipeline solo en
        el momento del cast, nunca la definición guardada del hechizo.
      </p>
      <Table>
        <Thead>
          <Th>Tipo</Th>
          <Th>Efecto</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">EXTRA_PROJECTILES</Td><Td>"Split" — proyectiles extra con un pequeño desvío de ángulo, cada uno corre el resto del pipeline de forma independiente.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PIERCING</Td><Td>El proyectil no se detiene en el primer enemigo — atraviesa hasta <code>max-pierces</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">EXPLOSIVE</Td><Td>Agrega una explosión (daño de área + partícula) justo en el punto de colisión.</Td></Tr>
          <Tr><Td className="font-mono text-xs">APPLY_EFFECT</Td><Td>Aplica un efecto extra de RPGRoll-Effects junto con el daño normal del hechizo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">COST_MODIFIER</Td><Td>Multiplica el costo de maná.</Td></Tr>
          <Tr><Td className="font-mono text-xs">COOLDOWN_MODIFIER</Td><Td>Multiplica el cooldown.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="catalizadores">Catalizadores</SectionHeading>
      <p>
        Varitas, báculos, libros, cristales, amuletos, orbes y reliquias son, mecánicamente, <strong>lo mismo</strong>:
        un <code>SpellCatalyst</code> — un ítem que hace falta sostener para poder lanzar el hechizo seleccionado,
        con 3 multiplicadores opcionales (<code>power</code>/<code>cost</code>/<code>range</code>). Lo que los
        diferencia es puramente material/nombre/lore, no un sistema separado. "Modificar elementos" (que un báculo
        cambie la escuela de un hechizo) queda fuera de esta pasada.
      </p>

      <SectionHeading id="grimorios">Grimorios</SectionHeading>
      <p>
        Un <code>Grimoire</code> es un libro que, al usarse (click derecho), se consume 1 del stack e intenta
        enseñar <strong>todos</strong> sus hechizos al jugador — los que ya sabe, o para los que no cumple el
        nivel o el árbol de progresión (<code>tree-parent</code> no aprendido todavía), se saltean con un mensaje
        propio, sin cancelar el resto del lote.
      </p>

      <SectionHeading id="formato-yaml">Ejemplos de archivo YAML</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="spells/fireball.yml (plugins/RPGRoll-Magic/spells/)"
        code={
          "id: fireball\n" +
          'display-name: "&6Bola de Fuego"\n' +
          "icon: FIRE_CHARGE\n" +
          "color: RED\n" +
          "school: fire\n" +
          "rarity: COMMON\n" +
          "level: 1\n" +
          "cast-time: 0\n" +
          "cooldown: 40\n" +
          "trigger: RIGHT_CLICK\n" +
          "tree-tier: 0\n" +
          "tags: [fire, projectile]\n" +
          'description: "El hechizo básico de Fuego — un proyectil que explota al impactar."\n' +
          "\n" +
          "cost:\n" +
          "  mana: 15\n" +
          "\n" +
          "components:\n" +
          "  - type: PROJECTILE\n" +
          "    speed: 1.0\n" +
          "    max-distance: 25\n" +
          "    trail-particle: FLAME\n" +
          "\n" +
          "  - type: DAMAGE_DIRECT\n" +
          "    amount: 8\n" +
          "\n" +
          "  - type: PARTICLE\n" +
          "    particle: FLAME\n" +
          "    count: 20\n" +
          "\n" +
          "  - type: SOUND\n" +
          "    sound: ENTITY_GENERIC_EXPLODE\n" +
          "    volume: 1.0\n" +
          "    pitch: 1.2\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="spells/meteor.yml (canalizado, con árbol de progresión)"
        code={
          "id: meteor\n" +
          'display-name: "&4&lMeteoro"\n' +
          "icon: MAGMA_BLOCK\n" +
          "color: DARK_RED\n" +
          "school: fire\n" +
          "rarity: EPIC\n" +
          "level: 5\n" +
          "cast-time: 60\n" +
          "cooldown: 200\n" +
          "trigger: HOLD\n" +
          "tree-parent: fireball\n" +
          "tree-tier: 1\n" +
          'description: "Canalizá 3 segundos quieto para invocar una explosión devastadora a tus pies."\n' +
          "\n" +
          "cost:\n" +
          "  mana: 50\n" +
          "\n" +
          "components:\n" +
          "  - type: DAMAGE_AREA\n" +
          "    radius: 5\n" +
          "    amount: 20\n" +
          "\n" +
          "  - type: PARTICLE\n" +
          "    particle: LAVA\n" +
          "    count: 40\n" +
          "\n" +
          "  - type: SOUND\n" +
          "    sound: ENTITY_GENERIC_EXPLODE\n" +
          "    volume: 1.5\n" +
          "    pitch: 0.8\n"
        }
      />

      <YamlBuilder
        title="Constructor visual: identidad, costo básico y progresión del hechizo"
        description="El pipeline de componentes es demasiado variado para un formulario lineal (cada tipo tiene sus propios params) — copiá y adaptá uno de los ejemplos de arriba, o usá /magicadmin browser para armarlo paso a paso desde el chat en el juego."
        folder="spells"
        fields={spellFields}
      />

      <SectionHeading id="gui">GUI: Magic Studio</SectionHeading>
      <p>
        <Kbd>/magicadmin browser</Kbd> abre un hub que enlaza a 5 navegadores — Escuelas, Hechizos, Grimorios,
        Runas y Catalizadores. El editor de un hechizo separa identidad/costo/cast/cooldown/árbol en un hub y el
        pipeline de componentes en su propia pantalla (agregar con{" "}
        <code>{"TIPO clave=valor,clave2=valor2"}</code>, shift-click para quitar). La vista del jugador,{" "}
        <Kbd>/magic spellbook</Kbd>, lista los hechizos aprendidos, permite seleccionar cuál lanzar, ver cooldowns
        activos, y socketear runas (shift-click sobre un hechizo).
      </p>

      <SectionHeading id="api">API para addons — MagicAPI</SectionHeading>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={
          "// Castear un hechizo por código (ej. un boss de RPGRoll-Mobs \"lanza\" un hechizo).\n" +
          "CastResult result = MagicAPI.get().cast(\"fireball\", caster);\n" +
          "\n" +
          "if (!result.success()) {\n" +
          "    result.reasons().forEach(reason -> caster.sendMessage(\"✘ \" + reason));\n" +
          "}\n" +
          "\n" +
          "// Enseñar/consultar hechizos sin pasar por un grimorio físico.\n" +
          'MagicAPI.get().learn(player, "frost_bolt");\n' +
          'boolean sabe = MagicAPI.get().knows(player, "frost_bolt");\n'
        }
      />

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/magicadmin browser</Td><Td>Abre el Magic Studio.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/magicadmin reload</Td><Td>Recarga todas las definiciones desde disco.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/magicadmin givecatalyst <id>"}</Td><Td>Te da un catalizador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/magicadmin givegrimoire <id>"}</Td><Td>Te da un grimorio.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/magic spellbook</Td><Td>Abre tu grimorio — seleccionar hechizo, ver cooldowns, socketear runas.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/magic select <id>"}</Td><Td>Selecciona qué hechizo aprendido se lanza al usar tu catalizador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/magic cast <id>"}</Td><Td>Lanza un hechizo directo (sin catalizador), respetando costo/cooldown.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/magic cooldowns</Td><Td>Lista tus cooldowns activos.</Td></Tr>
        </tbody>
      </Table>
      <p>
        Los comandos <code>/magicadmin</code> requieren <Badge tone="amber">rpgrollmagic.admin.*</Badge> (default:
        op); <code>/magic</code> requiere <Badge tone="blue">rpgrollmagic.use</Badge> (default: true).
      </p>

      <SectionHeading id="pendiente">Qué falta (próxima pasada)</SectionHeading>
      <Callout tone="warning" title="Esta pasada es 'Núcleo + progresión', no todo el diseño original">
        A propósito, esta versión <strong>no</strong> incluye rituales multi-jugador, combos encadenados
        (ej. Freeze → Ice Spear → Shatter), sinergias elementales (Water + Lightning → Electrified Water), un
        sistema de sobrecarga/fatiga de maná, ni invocaciones integradas con RPGRoll-Mobs (<code>SUMMON</code>{" "}
        hoy invoca un mob vanilla por <code>EntityType</code>, no una definición de Mobs). Lo que sí está completo
        y estable: el motor de componentes, escuelas/afinidades, maná/costos/cooldowns, catalizadores, grimorios,
        runas, árboles de progresión, la API pública, el Magic Studio, y contenido de ejemplo listo para usar o
        copiar (2 escuelas, 5 hechizos, 1 grimorio, 3 runas, 2 catalizadores).
      </Callout>

      <PrevNext current="magic" onNavigate={onNavigate} />
    </>
  );
}
