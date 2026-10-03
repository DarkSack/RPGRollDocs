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

const enchantmentFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_encantamiento", placeholder: "frost" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&bFrost" },
  {
    key: "rarity",
    label: "Rareza",
    type: "select",
    options: ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE"],
  },
  { key: "max-level", label: "Nivel máximo", type: "number", default: "1" },
  {
    key: "categories",
    label: "Categorías permitidas",
    type: "list",
    placeholder: "ARMOR, WEAPON, TOOLS, BOW",
  },
  { key: "trigger", label: "Triggers", type: "list", placeholder: "ENTITY_DAMAGE, PLAYER_ATTACK" },
  { key: "conditions", label: "Condiciones", type: "list", placeholder: "player.health < 10" },
  { key: "conflicts", label: "Conflictos (ids)", type: "list", placeholder: "thunder" },
  { key: "chance", label: "Probabilidad", type: "string", placeholder: "100% (opcional, ej. 15%)" },
];

export function Enchantments({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Encantamientos (RPGRoll-Enchantments)">
        Sistema de encantamientos 100% personalizado — no son <code>org.bukkit.enchantments.Enchantment</code>{" "}
        reales, sino datos propios guardados en el PDC del ítem, con triggers, condiciones y efectos configurables
        en YAML.
      </PageHeader>

      <Callout tone="warning" title="No pasa por la mesa de encantar, el yunque, ni el grindstone">
        No hay ningún listener para <code>PrepareItemEnchantEvent</code>, <code>EnchantItemEvent</code> ni{" "}
        <code>PrepareAnvilEvent</code>. Un encantamiento propio solo se aplica de dos formas: con{" "}
        <Kbd>/renchant apply|give</Kbd>, o programáticamente desde otro addon (así lo hace RPGRoll-Items).
      </Callout>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, RPGRoll-FX, PlaceholderAPI]"} />
      <p>
        La relación con RPGRoll-Items es al revés: es <strong>Items</strong> quien opcionalmente depende de este
        addon (<code>softdepend: [RPGRoll-Enchantments, Vault]</code> en su <code>plugin.yml</code>), nunca al
        contrario — Encantamientos no sabe que Items existe.
      </p>

      <SectionHeading id="modelo">Cómo se guarda un encantamiento en el ítem</SectionHeading>
      <p>
        <code>EnchantmentItem</code> escribe los datos directamente en el <code>PersistentDataContainer</code> del{" "}
        <code>ItemStack</code>, bajo una clave propia (<code>id:nivel</code> separados por <code>;</code> para
        varios encantamientos en el mismo ítem) más un contador de cuántas líneas de lore ocupa el bloque de
        encantamientos — así puede reescribirlo sin pisar lore agregado por otro sistema (RPGRoll-Items, una
        crate, etc).
      </p>

      <SectionHeading id="categorias">Categorías y restricción de ítem</SectionHeading>
      <p>
        Cada definición puede restringir en qué ítems es válida vía <code>categories</code> (una o más de{" "}
        <code>WEAPON, ARMOR, HELMET, CHESTPLATE, LEGGINGS, BOOTS, TOOLS, BOW, CROSSBOW, TRIDENT, FISHING_ROD, SWORD, PICKAXE, AXE, SHOVEL, HOE, SHIELD, ANY</code>
        , cada una con su propia lógica de qué <code>Material</code> matchea) o, si necesitas algo más específico,
        una lista explícita de <code>allowed-items</code> que tiene prioridad sobre las categorías.
      </p>

      <SectionHeading id="niveles">Niveles: tabla de overrides, no fórmula</SectionHeading>
      <p>
        No hay ninguna fórmula de escalado — cada nivel define su propio bloque <code>levels: &lt;n&gt;:</code>{" "}
        con pares <code>clave: número</code> libres, y los efectos referencian esos valores con{" "}
        <code>{"\"{clave}\""}</code>. Si un nivel no tiene bloque propio, cada placeholder cae a su valor por
        defecto hardcodeado en el efecto (no hay interpolación entre niveles vecinos).
      </p>

      <SectionHeading id="triggers">Triggers</SectionHeading>
      <p>Fijos en un enum — no hay forma de sumar triggers custom sin tocar el código del addon:</p>
      <Table>
        <Thead>
          <Th>Trigger</Th>
          <Th>Evento de Bukkit/Paper</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">PLAYER_ATTACK</Td><Td>EntityDamageByEntityEvent (el jugador es quien pega)</Td></Tr>
          <Tr><Td className="font-mono text-xs">ENTITY_DAMAGE</Td><Td>EntityDamageEvent (el jugador es quien recibe)</Td></Tr>
          <Tr><Td className="font-mono text-xs">BLOCK_BREAK</Td><Td>BlockBreakEvent</Td></Tr>
          <Tr><Td className="font-mono text-xs">PLAYER_JUMP</Td><Td>PlayerJumpEvent (Paper)</Td></Tr>
          <Tr><Td className="font-mono text-xs">PLAYER_MOVE</Td><Td>PlayerMoveEvent, filtrado a cambios de bloque real (ignora solo mirar alrededor)</Td></Tr>
          <Tr><Td className="font-mono text-xs">PLAYER_DEATH</Td><Td>PlayerDeathEvent (objetivo = quien mató)</Td></Tr>
          <Tr><Td className="font-mono text-xs">ENTITY_KILL</Td><Td>EntityDeathEvent, si el asesino es un jugador</Td></Tr>
          <Tr><Td className="font-mono text-xs">BLOCK_INTERACT</Td><Td>PlayerInteractEvent: clic derecho a un bloque con la mano principal</Td></Tr>
          <Tr><Td className="font-mono text-xs">SHIELD_BLOCK</Td><Td>EntityDamageEvent cuando el escudo del jugador para el golpe (objetivo = el atacante, o quien disparó el proyectil)</Td></Tr>
          <Tr><Td className="font-mono text-xs">SHIELD_DISABLE</Td><Td>PlayerShieldDisableEvent (Paper): un hacha le desactiva el escudo</Td></Tr>
          <Tr><Td className="font-mono text-xs">EXP_PICKUP</Td><Td>PlayerExpChangeEvent al recoger experiencia (lo que sobra tras la Reparación vanilla)</Td></Tr>
        </tbody>
      </Table>
      <p>
        En cada uno de estos eventos, el addon revisa mano principal, offhand, casco, pechera, piernas y botas del
        jugador en busca de encantamientos propios, y por cada uno: tira <code>chance</code>, evalúa{" "}
        <code>conditions</code>, y si todo pasa ejecuta sus <code>effects</code>. Los efectos reciben además el
        evento, el ítem encantado y su ranura: los de herramienta solo actúan si el ítem está en la mano principal.
      </p>

      <SectionHeading id="condiciones">Condiciones</SectionHeading>
      <p>
        No es un lenguaje de expresiones completo — solo dos formas soportadas: una llamada a función (en la
        práctica, solo existe <code>player.hasPermission(perm)</code>), o una comparación{" "}
        <code>izquierda operador derecha</code> contra una tabla fija de variables:
      </p>
      <Table>
        <Thead>
          <Th>Variable</Th>
          <Th>Tipo</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">player.health</Td><Td>número</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.level</Td><Td>número (nivel de RPGRoll, igual que en Quests e Items)</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.xplevel</Td><Td>número (nivel de XP vanilla)</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.foodlevel</Td><Td>número</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.sneaking</Td><Td>texto (true / false)</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.shieldticks</Td><Td>número: ticks que lleva el escudo levantado (sin escudo, la condición falla)</Td></Tr>
          <Tr><Td className="font-mono text-xs">world</Td><Td>texto (nombre del mundo)</Td></Tr>
          <Tr><Td className="font-mono text-xs">weather</Td><Td>texto (STORM / RAIN / CLEAR)</Td></Tr>
          <Tr><Td className="font-mono text-xs">target.type</Td><Td>texto (tipo de entidad del objetivo)</Td></Tr>
          <Tr><Td className="font-mono text-xs">target.health</Td><Td>número</Td></Tr>
        </tbody>
      </Table>
      <p>
        Comparaciones numéricas admiten <code>{"== != < <= > >="}</code>; las de texto solo{" "}
        <code>{"== !="}</code> (sin distinguir mayúsculas). Todas las condiciones de la lista se combinan con Y
        (todas deben cumplirse) — una lista vacía siempre pasa, y cualquier variable no reconocida hace fallar la
        condición en silencio (sin log de error).
      </p>

      <SectionHeading id="efectos">Efectos</SectionHeading>
      <Table>
        <Thead>
          <Th>Tipo</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">DAMAGE</Td><Td>Daña al objetivo (no hace nada sin objetivo).</Td></Tr>
          <Tr><Td className="font-mono text-xs">HEAL</Td><Td>Cura al jugador, sin pasar su vida máxima.</Td></Tr>
          <Tr><Td className="font-mono text-xs">LIGHTNING</Td><Td>Rayo real (daña) o solo visual, según <code>damage</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">POTION</Td><Td>Aplica un efecto de poción al jugador o al objetivo (<code>apply-to</code>), con duración/amplificador por nivel.</Td></Tr>
          <Tr><Td className="font-mono text-xs">FIRE</Td><Td>Prende fuego al jugador o al objetivo por N ticks.</Td></Tr>
          <Tr><Td className="font-mono text-xs">EXPLOSION</Td><Td>Explosión con potencia configurable (nunca rompe bloques con fuego).</Td></Tr>
          <Tr><Td className="font-mono text-xs">TELEPORT</Td><Td>Al objetivo, o al spawn del mundo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">COMMAND</Td><Td>Ejecutado como consola — soporta <code>{"{player}"}</code>/<code>{"{target}"}</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">MESSAGE</Td><Td>Mensaje al jugador con color legacy (<code>&amp;</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">PARTICLE</Td><Td>Partícula en la ubicación del objetivo o del jugador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">SOUND</Td><Td>Sonido reproducido al jugador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PICKUP_ITEMS</Td><Td>Absorbe ítems dropeados en un radio cúbico hacia el inventario del jugador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PARTICLES</Td><Td>Efecto completo de RPGRoll-FX por id (<code>effect-id</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">VEIN_MINE</Td><Td>Rompe la veta entera de la mena golpeada, hasta <code>max</code> bloques (también las menas de RPGRoll-Items).</Td></Tr>
          <Tr><Td className="font-mono text-xs">TREE_FELL</Td><Td>Tala los troncos conectados hacia arriba (<code>max</code>) y, con <code>leaves: true</code>, deshace sus hojas. Solo si el tronco toca hojas naturales: no se come casas de madera.</Td></Tr>
          <Tr><Td className="font-mono text-xs">AREA_MINE</Td><Td>Martillo: rompe un cuadrado de lado <code>2·radius+1</code> de cara al jugador. Nada más duro que lo golpeado ni bloques con contenido.</Td></Tr>
          <Tr><Td className="font-mono text-xs">AUTO_SMELT</Td><Td>Lo que suelta el bloque sale fundido (recetas de horno del servidor) con su experiencia. Respeta Fortuna. Un ítem propio solo se funde con una receta exacta para él.</Td></Tr>
          <Tr><Td className="font-mono text-xs">TILL_AREA</Td><Td>Con BLOCK_INTERACT labra un cuadrado de <code>radius</code>; con BLOCK_BREAK sobre un cultivo maduro cosecha los de alrededor y, con <code>replant: true</code>, replanta con semillas del inventario o de lo que cayó.</Td></Tr>
          <Tr><Td className="font-mono text-xs">REPAIR</Td><Td>Con EXP_PICKUP: repara <code>ratio</code> de durabilidad por punto de experiencia y gasta solo lo usado; <code>equipment: 1</code> reparte por todo el equipo puesto.</Td></Tr>
          <Tr><Td className="font-mono text-xs">DAMAGE_BONUS</Td><Td>Suma <code>amount</code> (y multiplica por <code>multiplier</code>) el daño del golpe, escalado por la carga del ataque.</Td></Tr>
          <Tr><Td className="font-mono text-xs">KNOCKBACK</Td><Td>Empuja al objetivo lejos del jugador (<code>strength</code>, <code>vertical</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">REFLECT</Td><Td>Con SHIELD_BLOCK: devuelve flechas y bolas de fuego a quien las disparó, con el mismo daño (<code>chance</code> en %, <code>speed</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">SHIELD_COOLDOWN</Td><Td>Con SHIELD_DISABLE: multiplica el tiempo que el hacha deja el escudo desactivado por <code>factor</code>; 0 lo evita.</Td></Tr>
        </tbody>
      </Table>
      <p>
        Los efectos que rompen varios bloques lo hacen como si los rompiera el jugador, uno a uno: cada bloque lanza
        su BlockBreakEvent, así que lo respetan GriefPrevention y WorldGuard, lo registra CoreProtect, gasta la
        herramienta (nunca hasta romperla: siempre le deja 2 usos) y aplica Fortuna.
      </p>
      <p>
        Los parámetros numéricos aceptan tanto un número literal como <code>{"\"{clave}\""}</code> para leerlo del
        bloque <code>levels</code> del nivel actual.
      </p>

      <SectionHeading id="incluidos">Encantamientos incluidos</SectionHeading>
      <Table>
        <Thead>
          <Th>Id</Th>
          <Th>Para</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">veinminer</Td><Td>pico</Td><Td>Minero de vetas I–III (12/24/48 bloques). Agachado no se activa.</Td></Tr>
          <Tr><Td className="font-mono text-xs">timber</Td><Td>hacha</Td><Td>Leñador I–III (24/64/160 troncos), deshace las hojas. Agachado no se activa.</Td></Tr>
          <Tr><Td className="font-mono text-xs">autosmelt</Td><Td>pico, hacha, pala</Td><Td>Autofundición.</Td></Tr>
          <Tr><Td className="font-mono text-xs">hammer</Td><Td>pico, pala</Td><Td>Martillo I–II (3x3 y 5x5). Choca con el minero de vetas.</Td></Tr>
          <Tr><Td className="font-mono text-xs">tiller</Td><Td>azada</Td><Td>Azada amplia I–II (3x3 y 5x5): labra, cosecha y replanta.</Td></Tr>
          <Tr><Td className="font-mono text-xs">advanced_mending</Td><Td>cualquiera</Td><Td>Reparación avanzada I–III (3, 4 y 4 de durabilidad por punto; el III repara todo el equipo).</Td></Tr>
          <Tr><Td className="font-mono text-xs">advanced_sharpness</Td><Td>espada, hacha</Td><Td>Filo avanzado I–V: +1 a +5 de daño encima del Filo vanilla.</Td></Tr>
          <Tr><Td className="font-mono text-xs">shield_reflect</Td><Td>escudo</Td><Td>Reflejo I–III (25/50/80 %).</Td></Tr>
          <Tr><Td className="font-mono text-xs">shield_parry</Td><Td>escudo</Td><Td>Parada I–III: un golpe en el primer medio segundo de bloqueo aturde y empuja al atacante.</Td></Tr>
          <Tr><Td className="font-mono text-xs">shield_bash</Td><Td>escudo</Td><Td>Embestida I–II: cada golpe parado empuja al atacante.</Td></Tr>
          <Tr><Td className="font-mono text-xs">shield_temper</Td><Td>escudo</Td><Td>Temple I–III: el hacha desactiva el escudo un 60 %, un 30 % o nada del tiempo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">shield_aegis</Td><Td>escudo</Td><Td>Égida I–III: un 30 % de las veces, parar un golpe da corazones de absorción.</Td></Tr>
        </tbody>
      </Table>
      <p>
        Además vienen <code>lifesteal</code>, <code>frost</code>, <code>magnet</code>, <code>poison</code> y{" "}
        <code>thunder</code>. Todos funcionan igual en Java y en Bedrock: viven en el servidor.
      </p>

      <SectionHeading id="formato-yaml">Ejemplos de archivo YAML</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="enchantments/frost.yml"
        code={
          "id: frost\n" +
          'display-name: "&bFrost"\n' +
          "rarity: RARE\n" +
          "max-level: 3\n" +
          "\n" +
          "categories:\n" +
          "  - ARMOR\n" +
          "\n" +
          "trigger:\n" +
          "  - ENTITY_DAMAGE\n" +
          "\n" +
          "conditions:\n" +
          "  - player.health < 10\n" +
          "\n" +
          "levels:\n" +
          "  1:\n" +
          "    duration: 60\n" +
          "    amplifier: 0\n" +
          "  3:\n" +
          "    duration: 140\n" +
          "    amplifier: 2\n" +
          "\n" +
          "effects:\n" +
          "  - type: POTION\n" +
          "    potion: SLOWNESS\n" +
          "    apply-to: target\n" +
          '    duration: "{duration}"\n' +
          '    amplifier: "{amplifier}"\n' +
          "  - type: PARTICLE\n" +
          "    particle: SNOWFLAKE\n" +
          "    count: 10\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="enchantments/thunder.yml"
        code={
          "id: thunder\n" +
          'display-name: "&eThunder"\n' +
          "rarity: EPIC\n" +
          "max-level: 1\n" +
          "\n" +
          "categories:\n" +
          "  - WEAPON\n" +
          "\n" +
          "trigger:\n" +
          "  - PLAYER_ATTACK\n" +
          "\n" +
          "chance: 15%\n" +
          "\n" +
          "effects:\n" +
          "  - LIGHTNING\n" +
          "  - type: MESSAGE\n" +
          '    value: "&e¡Un rayo golpeó a tu objetivo!"\n'
        }
      />
      <Callout tone="tip">
        <code>effects</code> admite tanto la forma corta <code>- LIGHTNING</code> (sin parámetros) como la forma
        detallada <code>{"- type: ... "}</code> — se pueden mezclar en la misma lista, como en el ejemplo de
        arriba.
      </Callout>

      <Callout tone="tip" title="Referencia completa: todos los campos en un solo archivo">
        <code>enchantments/reference_full.yml</code> (incluido en el jar) usa absolutamente todos los campos
        disponibles.
      </Callout>
      <CodeBlock
        language="yaml"
        filename="enchantments/reference_full.yml"
        code={
          "id: reference_full_example\n" +
          'display-name: "&d&lEncantamiento de Referencia"\n' +
          "rarity: DIVINE\n" +
          "max-level: 5\n" +
          "\n" +
          "categories:\n" +
          "  - WEAPON\n" +
          "  - BOW\n" +
          "\n" +
          "allowed-items:\n" +
          "  - NETHERITE_SWORD\n" +
          "  - DIAMOND_SWORD\n" +
          "  - BOW\n" +
          "\n" +
          "conflicts:\n" +
          "  - lifesteal\n" +
          "  - frost\n" +
          "\n" +
          "trigger:\n" +
          "  - PLAYER_ATTACK\n" +
          "  - ENTITY_KILL\n" +
          "\n" +
          "conditions:\n" +
          '  - "sneaking"\n' +
          '  - "health-below:50%"\n' +
          "\n" +
          "chance: 35%\n" +
          "\n" +
          "levels:\n" +
          "  1:\n" +
          "    damage: 2\n" +
          "    duration-ticks: 40\n" +
          "  5:\n" +
          "    damage: 12\n" +
          "    duration-ticks: 140\n" +
          "\n" +
          "effects:\n" +
          "  - LIGHTNING\n" +
          "  - type: DAMAGE\n" +
          '    amount: "4"\n' +
          "  - type: POTION\n" +
          "    potion: WITHER\n" +
          '    amplifier: "1"\n' +
          '    duration: "60"\n' +
          "  - type: FIRE\n" +
          '    duration: "100"\n' +
          "  - type: PARTICLE\n" +
          "    particle: FLAME\n" +
          '    count: "20"\n' +
          "  - type: SOUND\n" +
          "    sound: ENTITY_LIGHTNING_BOLT_THUNDER\n" +
          "  - type: MESSAGE\n" +
          '    value: "&d¡El Encantamiento de Referencia se activó!"\n' +
          "  - type: COMMAND\n" +
          '    command: "give %player% diamond 1"\n'
        }
      />

      <YamlBuilder
        title="Constructor visual: Custom Enchantment"
        description="Identidad, rareza, categorías, triggers y condiciones. Effects y levels quedan afuera del formulario — son listas de objetos anidados, copia uno de los ejemplos de arriba y editalo a mano (es exactamente lo que hace el editor in-game también)."
        folder="enchantments"
        fields={enchantmentFields}
      />

      <SectionHeading id="integracion-items">Integración con RPGRoll-Items</SectionHeading>
      <p>
        <code>ItemDefinition</code> tiene dos mapas separados: <code>vanilla-enchantments</code> (encantamientos
        reales de Bukkit, aplicados directamente por Items sin pasar por este addon) y{" "}
        <code>custom-enchantments</code> (<code>id: nivel</code>, resueltos contra este addon). Al crear el ítem,
        Items comprueba en runtime si <code>RPGRoll-Enchantments</code> está instalado — si no lo está, esa parte
        simplemente no hace nada; si lo está, busca cada definición por id y llama al mismo{" "}
        <code>EnchantmentItem.apply(...)</code> que usa <code>/renchant</code>.
      </p>

      <SectionHeading id="gui">GUI: navegador y editor</SectionHeading>
      <p>
        <Kbd>/renchant browser</Kbd> abre un navegador con todos los encantamientos definidos y un botón "Crear
        nuevo". El editor cubre identidad, rareza, una grilla de 9 categorías y otra de 9 triggers (toggle por
        click), y la lista de efectos con alta rápida por chat (<code>{"TIPO;clave=valor,clave2=valor2"}</code>).
      </p>
      <Callout tone="info">
        Además, la GUI de Items (<code>EnchantmentsEditorGUI</code>) tiene su <strong>propio</strong> editor, pero
        solo permite asignar <code>id</code>+nivel a un ítem existente — no crea definiciones nuevas. Para eso
        siempre hace falta <code>/renchant browser</code>.
      </Callout>

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/renchant apply <id> <nivel>"}</Td><Td>Aplica el encantamiento al ítem en tu mano principal.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/renchant remove <id>"}</Td><Td>Lo quita del ítem en tu mano.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/renchant give <jugador> <id> <nivel>"}</Td><Td>Se lo aplica a otro jugador (funciona desde consola).</Td></Tr>
          <Tr><Td className="font-mono text-xs">/renchant list</Td><Td>Lista todos los encantamientos definidos.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/renchant info <id>"}</Td><Td>Muestra rareza, nivel máximo, triggers, probabilidad y conflictos.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/renchant browser</Td><Td>Abre el navegador gráfico (crear/editar definiciones).</Td></Tr>
          <Tr><Td className="font-mono text-xs">/renchant reload</Td><Td>Recarga las definiciones desde disco.</Td></Tr>
        </tbody>
      </Table>
      <p>
        Todos requieren <Badge tone="amber">rpgrollenchantments.admin.*</Badge> (default: op) — chequeado una sola
        vez al principio del comando, no por subcomando.
      </p>
      <Callout tone="warning" title="apply/remove no pueden fallar por conflicto silenciosamente">
        Si el encantamiento excede su nivel máximo, choca con uno ya presente en el ítem (vía{" "}
        <code>conflicts</code>), o el ítem no pertenece a una categoría permitida, <code>/renchant apply</code>{" "}
        responde con el motivo exacto en vez de aplicarlo a medias.
      </Callout>

      <SectionHeading id="placeholders">Placeholders (PlaceholderAPI)</SectionHeading>
      <p>Expansión <Badge tone="violet">rpgrollenchantments</Badge> — todos leen el ítem en la mano principal.</p>
      <Table>
        <Thead>
          <Th>Placeholder</Th>
          <Th>Valor</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">%rpgrollenchantments_helditem_count%</Td><Td>Cantidad de encantamientos custom en el ítem.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgrollenchantments_helditem_<id>_level%"}</Td><Td>Nivel de ese encantamiento en el ítem (0 si no lo tiene).</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgrollenchantments_helditem_has_<id>%"}</Td><Td><code>si</code>/<code>no</code>.</Td></Tr>
        </tbody>
      </Table>

      <PrevNext current="encantamientos" onNavigate={onNavigate} />
    </>
  );
}
