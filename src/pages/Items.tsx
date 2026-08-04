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

const itemFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_item", placeholder: "dragon_slayer" },
  { key: "category", label: "Categoría", type: "string", default: "misc", placeholder: "sword" },
  { key: "material", label: "Material (Bukkit)", type: "string", placeholder: "NETHERITE_SWORD" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&4Dragon Slayer" },
  { key: "lore", label: "Lore", type: "list", placeholder: "Forjada para matar dragones." },
  { key: "rarity", label: "Rareza (id)", type: "string", default: "common", placeholder: "mythic" },
  { key: "glow", label: "Brillo forzado", type: "boolean" },
  { key: "stats", label: "Stats propios", type: "map", placeholder: "damage=14, critical_chance=20" },
  { key: "attributes", label: "Atributos vanilla", type: "map", placeholder: "GENERIC_ATTACK_DAMAGE=2" },
  {
    key: "requirements",
    label: "Requisitos",
    type: "group",
    fields: [
      { key: "level", label: "Nivel", type: "number", default: "0" },
      { key: "class", label: "Clase", type: "string" },
    ],
  },
  {
    key: "durability",
    label: "Durabilidad",
    type: "group",
    fields: [
      { key: "max", label: "Máxima", type: "number", default: "0" },
      { key: "repairable", label: "Reparable", type: "boolean", default: "true" },
      { key: "degrade-per-use", label: "Degradación por uso", type: "number", default: "1" },
    ],
  },
  {
    key: "economy",
    label: "Economía",
    type: "group",
    fields: [
      { key: "sell", label: "Precio de venta", type: "number", default: "0" },
      { key: "buy", label: "Precio de compra", type: "number", default: "0" },
    ],
  },
];

const rarityFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_rareza", placeholder: "epic" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "Épica" },
  { key: "color", label: "Color", type: "string", placeholder: "light_purple" },
  { key: "glow", label: "Brillo", type: "boolean" },
  { key: "sound", label: "Sonido al obtenerlo", type: "string", placeholder: "ENTITY_ILLUSIONER_CAST_SPELL" },
  { key: "particle", label: "Partícula", type: "string", placeholder: "FLAME" },
];

const gemFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_gema", placeholder: "ruby" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&cRubí" },
  { key: "type", label: "Tipo de socket aceptado", type: "string", default: "GENERIC", placeholder: "FIRE" },
  { key: "stats", label: "Bono de stats", type: "map", placeholder: "damage=3" },
];

export function Items({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Ítems (RPGRoll-Items)">
        Motor de ítems completamente personalizados: rareza, stats propios + atributos vanilla reales, sockets
        con gemas, skins, mejoras (+1, +2...), durabilidad propia, encantamientos, habilidades activas/pasivas y
        recetas — todo con editor gráfico completo.
      </PageHeader>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll]\nsoftdepend: [RPGRoll-Enchantments, Vault, PlaceholderAPI]"} />

      <SectionHeading id="rareza">Rareza</SectionHeading>
      <p>
        No es un enum cerrado — es un contenido más, cargado desde{" "}
        <code>rarities/*.yml</code>. Cada rareza define color, si brilla, y opcionalmente un sonido/partícula.
        El brillo se implementa con el truco clásico: agrega el encantamiento vanilla{" "}
        <code>luck_of_the_sea</code> nivel 1 (si el ítem no tiene ya otros encantamientos) más el flag{" "}
        <code>HIDE_ENCHANTS</code> para que no se vea en el tooltip.
      </p>
      <Table>
        <Thead>
          <Th>id</Th>
          <Th>Color</Th>
          <Th>Brillo</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">common</Td><Td>blanco</Td><Td>no</Td></Tr>
          <Tr><Td className="font-mono text-xs">uncommon</Td><Td>verde</Td><Td>no</Td></Tr>
          <Tr><Td className="font-mono text-xs">rare</Td><Td>aqua</Td><Td>no</Td></Tr>
          <Tr><Td className="font-mono text-xs">epic</Td><Td>violeta</Td><Td>sí</Td></Tr>
          <Tr><Td className="font-mono text-xs">legendary</Td><Td>dorado</Td><Td>sí</Td></Tr>
          <Tr><Td className="font-mono text-xs">mythic</Td><Td>rojo</Td><Td>sí</Td></Tr>
          <Tr><Td className="font-mono text-xs">divine</Td><Td>amarillo</Td><Td>sí</Td></Tr>
          <Tr><Td className="font-mono text-xs">celestial</Td><Td>#00FFFF</Td><Td>sí</Td></Tr>
          <Tr><Td className="font-mono text-xs">ancient</Td><Td>#8B5A2B</Td><Td>sí</Td></Tr>
        </tbody>
      </Table>
      <CodeBlock
        language="yaml"
        filename="rarities/epic.yml"
        code={
          "id: epic\n" +
          'display-name: "Épica"\n' +
          "color: light_purple\n" +
          "glow: true\n" +
          "sound: ENTITY_ILLUSIONER_CAST_SPELL\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="rarities/legendary.yml"
        code={
          "id: legendary\n" +
          'display-name: "Legendaria"\n' +
          "color: gold\n" +
          "glow: true\n" +
          "sound: ENTITY_PLAYER_LEVELUP\n" +
          "particle: FLAME\n"
        }
      />
      <YamlBuilder title="Constructor visual: Rarity" folder="rarities" fields={rarityFields} />

      <SectionHeading id="stats">Dos sistemas de números: stats propios vs. atributos vanilla</SectionHeading>
      <p>
        <code>attributes:</code> son atributos <strong>reales</strong> de Bukkit (<code>GENERIC_ATTACK_DAMAGE</code>,{" "}
        <code>GENERIC_ARMOR</code>, etc.) — se ven en el tooltip nativo salvo que ocultes con{" "}
        <code>HIDE_ATTRIBUTES</code>. <code>stats:</code> son números propios de RPGRoll sin significado nativo
        para Minecraft — solo importan porque el motor de stats y los listeners de combate los leen por nombre.
      </p>
      <Callout tone="info" title="Solo 2 stats propios tienen efecto automático">
        <code>health</code> se suma a <code>GENERIC_MAX_HEALTH</code> y <code>speed</code> a{" "}
        <code>GENERIC_MOVEMENT_SPEED</code> (÷100) en cuanto el ítem se equipa. El resto (<code>damage</code>,{" "}
        <code>defense</code>, <code>critical_chance</code>, <code>critical_damage</code>, <code>resistance</code>
        , etc.) los lee directamente el listener de combate al calcular el golpe — no son atributos vanilla, así
        que no aparecen en ningún tooltip nativo.
      </Callout>
      <p>
        La detección de equipar/desequipar es <strong>por polling</strong>, cada 10 ticks, sobre las 6 ranuras
        relevantes (mano, offhand, casco, pechera, piernas, botas) — Bukkit no tiene un solo evento que cubra
        todos los casos (comandos, dispensadores, clicks de inventario...).
      </p>
      <p>18 stats conocidos de fábrica: <code>health, mana, defense, damage, speed, strength, dexterity, intelligence, agility, luck, resistance, armor_penetration, critical_chance, critical_damage, attack_speed, magic_power, magic_resistance, mining_speed, fishing_luck</code> — otros addons pueden sumar más.</p>

      <SectionHeading id="sockets">Sockets y gemas</SectionHeading>
      <p>
        Un ítem declara ranuras (<code>sockets:</code>, con <code>id</code> y tipos aceptados opcionales) y una
        gema (siempre un <code>EMERALD</code> con lore) se inserta con <Kbd>{"/item socket <id>"}</Kbd>, tomando
        la gema de tu <strong>offhand</strong> y consumiéndola si encaja. El bono de stats de cada gema insertada
        se suma al de la definición base + mejoras.
      </p>
      <CodeBlock language="yaml" filename="gems/ruby.yml" code={'id: ruby\ndisplay-name: "&cRubí"\ntype: FIRE\nstats:\n  damage: 3\n'} />
      <CodeBlock
        language="yaml"
        filename="gems/sapphire.yml"
        code={'id: sapphire\ndisplay-name: "&9Zafiro"\ntype: GENERIC\nstats:\n  intelligence: 4\n  magic_power: 2\n'}
      />
      <YamlBuilder title="Constructor visual: Gem" folder="gems" fields={gemFields} />

      <SectionHeading id="skins-mejoras-durabilidad">Skins, mejoras y durabilidad</SectionHeading>
      <ul>
        <li><strong>Skins</strong> (<Kbd>/item skin</Kbd>) — cicla entre apariencias alternativas (material/nombre/CMD distintos), 100% cosmético, nunca toca stats.</li>
        <li><strong>Mejoras</strong> (<Kbd>/item upgrade</Kbd>) — niveles <code>+1, +2...</code> definidos en YAML, cada uno con su propio bono de stats aditivo y costo (dinero vía Vault y/o un material del inventario). Puede fallar por <code>MAX_LEVEL</code>, <code>NO_UPGRADE_DEFINED</code> (hueco en la lista de niveles), <code>CANT_AFFORD_MONEY</code> o <code>MISSING_MATERIAL</code>.</li>
        <li><strong>Durabilidad</strong> — sistema propio, independiente del daño vanilla del ítem (se crea sin daño real; el contador vive aparte). Se degrada en golpes/romper bloques, se puede reparar manualmente o automáticamente (cada minuto, si <code>auto-repair-per-minute &gt; 0</code>); al llegar a 0 el ítem se consume.</li>
      </ul>

      <SectionHeading id="comportamiento">Triggers, habilidades y condiciones</SectionHeading>
      <p>Un ítem tiene dos formas de reaccionar a eventos: <code>triggers</code> (acciones directas, sin condición extra) y <code>abilities</code> (con cooldown propio y condiciones, activas o pasivas).</p>
      <p>20 triggers disponibles: <code>EQUIP, UNEQUIP, RIGHT_CLICK, LEFT_CLICK, ENTITY_HIT, ENTITY_KILL, BLOCK_BREAK, BLOCK_PLACE, PLAYER_DAMAGE, PLAYER_DEATH, PLAYER_RESPAWN, PLAYER_MOVE, PLAYER_JUMP, PLAYER_SNEAK, PLAYER_SPRINT, PLAYER_INTERACT, CONSUME, THROW, PICKUP, DROP</code>.</p>
      <p>Acciones incorporadas: <code>MESSAGE, COMMAND, SOUND, PARTICLE, EXPLOSION, DAMAGE, HEAL, FIRE, TITLE, BOSSBAR, SUMMON, PROJECTILE</code> — cinemáticas, abrir GUIs y scripts quedan como punto de extensión para otros addons.</p>
      <p>
        Las condiciones de una <em>ability</em> son expresiones simples (<code>player.level &gt;= 20</code>,{" "}
        <code>player.health &lt; 50%</code>, <code>player.hasPermission(perm)</code>) resueltas contra{" "}
        <code>player.level/health/foodlevel</code>, <code>target.type/health</code>, <code>world</code>,{" "}
        <code>weather</code> — extensible vía registro de variables para otros addons.
      </p>

      <SectionHeading id="requisitos-de-uso">Requisitos de uso</SectionHeading>
      <p>Un ítem puede pedir nivel, raza, clase, profesión, skill, trait, permiso, o dinero mínimo.</p>
      <Callout tone="warning" title="Son informativos, no bloquean nada">
        <code>ItemRequirementChecker</code> solo devuelve la lista de razones incumplidas — el equipo real avisa
        por chat al equipar un ítem que no cumplís, pero <strong>no impide equiparlo ni usarlo</strong>. El campo{" "}
        <code>completed-quests</code> ni siquiera se evalúa todavía (se parsea del YAML pero ningún código lo
        consulta).
      </Callout>

      <SectionHeading id="recetas">Recetas</SectionHeading>
      <p>
        <code>SHAPED</code>, <code>SHAPELESS</code>, <code>FURNACE</code> y <code>STONECUTTER</code> se registran
        como recetas reales de Bukkit al arrancar. <code>SMITHING</code> usa la plantilla de netherite (con
        try/catch para versiones de servidor más viejas). <code>NPC</code>, <code>PROFESSION</code> y{" "}
        <code>QUEST</code> son solo datos — no se registran como receta de crafteo; quedan disponibles vía{" "}
        <code>sourceId</code> para que otro addon (una tienda de NPC, un sistema de trabajos, misiones) decida
        cuándo entregar el ítem.
      </p>

      <SectionHeading id="gui">GUI: navegador y editor</SectionHeading>
      <p><Kbd>/itemadmin browser</Kbd> abre un grid paginado con la apariencia real de cada ítem como ícono, filtro por categoría, y búsqueda. Click izquierdo te da el ítem; click derecho abre el editor completo — un botón por componente:</p>
      <ul>
        <li>Apariencia, Stats y Atributos, Reglas (requisitos+durabilidad+economía)</li>
        <li>Encantamientos (vanilla + RPGRoll-Enchantments), Efectos, Sockets, Skins</li>
        <li>Mejoras, Comportamiento (triggers), Habilidades, Recetas, Datos custom</li>
      </ul>
      <p>Todos los sub-editores comparten la misma sesión de edición — los cambios se acumulan hasta apretar Guardar, sin importar cuánto navegues entre pantallas.</p>

      <SectionHeading id="formato-yaml">Ejemplos de archivo YAML</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="items/sword/dragon_slayer.yml"
        code={
          "id: dragon_slayer\n" +
          "category: sword\n" +
          "material: NETHERITE_SWORD\n" +
          'display-name: "&4Dragon Slayer"\n' +
          "lore:\n" +
          '  - "&7Forjada para matar dragones."\n' +
          "rarity: MYTHIC\n" +
          "glow: true\n" +
          "\n" +
          "stats:\n" +
          "  damage: 14\n" +
          "  critical_chance: 20\n" +
          "  critical_damage: 75\n" +
          "\n" +
          "requirements:\n" +
          "  level: 40\n" +
          "\n" +
          "durability:\n" +
          "  max: 1000\n" +
          "  repairable: true\n" +
          "  degrade-per-use: 1\n" +
          "\n" +
          "triggers:\n" +
          "  ENTITY_KILL:\n" +
          "    - type: MESSAGE\n" +
          '      value: "&4¡Otro enemigo cae ante Dragon Slayer!"\n' +
          "    - type: PARTICLE\n" +
          "      particle: DRAGON_BREATH\n" +
          "      count: 15\n" +
          "\n" +
          "economy:\n" +
          "  sell: 2000\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="items/relics/phoenix_feather.yml"
        code={
          "id: phoenix_feather\n" +
          "category: relics\n" +
          "material: BLAZE_ROD\n" +
          'display-name: "&6Pluma de Fénix"\n' +
          "lore:\n" +
          '  - "&7Aún guarda el calor de las llamas eternas."\n' +
          "rarity: LEGENDARY\n" +
          "glow: true\n" +
          "\n" +
          "stats:\n" +
          "  magic_power: 6\n" +
          "  luck: 3\n" +
          "\n" +
          "requirements:\n" +
          "  level: 20\n" +
          "\n" +
          "abilities:\n" +
          "  - id: phoenix_warmth\n" +
          '    display-name: "&6Calidez del Fénix"\n' +
          "    passive: true\n" +
          "    actions:\n" +
          "      - type: PARTICLE\n" +
          "        particle: FLAME\n" +
          "        count: 8\n" +
          "      - type: MESSAGE\n" +
          '        value: "&6La Pluma de Fénix arde suavemente en tu mano."\n' +
          "\n" +
          "economy:\n" +
          "  sell: 2500\n" +
          "  buy: 5000\n"
        }
      />

      <YamlBuilder
        title="Constructor visual: Item"
        description="Identidad, lore, rareza, stats/atributos, requisitos, durabilidad y economía. Encantamientos, triggers, abilities, sockets, skins, upgrades y recipes son demasiado anidados para este formulario — usá /itemadmin editor o copiá uno de los ejemplos de arriba."
        folder="items"
        fields={itemFields}
      />

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/itemadmin give <jugador> <id> [cantidad]"}</Td><Td>Entrega un ítem, con overflow al piso.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/itemadmin list</Td><Td>Lista todos los ítems con su categoría y rareza.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/itemadmin reload</Td><Td>Recarga todas las definiciones.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/itemadmin create <id> [categoría]"}</Td><Td>Crea un ítem base y abre el editor directo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/itemadmin browser</Td><Td>Abre el navegador gráfico.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/itemadmin editor <id>"}</Td><Td>Abre el editor gráfico directo.</Td></Tr>
        </tbody>
      </Table>
      <p>Requiere <Badge tone="amber">rpgrollitems.admin.*</Badge> (default: op).</p>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/item info</Td><Td>Nombre, categoría, rareza, nivel de mejora y durabilidad del ítem en tu mano.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/item upgrade</Td><Td>Sube un nivel de mejora si podés pagarlo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/item skin</Td><Td>Cicla su skin.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/item socket <id>"}</Td><Td>Inserta la gema de tu offhand en esa ranura.</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="info">
        <code>/item</code> no tiene permiso declarado — cualquier jugador puede usarlo sobre el ítem que tenga en
        la mano.
      </Callout>

      <SectionHeading id="placeholders">Placeholders (PlaceholderAPI)</SectionHeading>
      <p>Expansión <Badge tone="violet">rpgrollitems</Badge>. <code>stat_*</code> lee el motor de stats agregados del jugador; <code>helditem_*</code> lee solo la mano principal.</p>
      <Table>
        <Thead>
          <Th>Placeholder</Th>
          <Th>Valor</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"%rpgrollitems_stat_<nombre>%"}</Td><Td>Total de ese stat sumando armadura + mano principal/secundaria + gemas.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollitems_helditem_name%</Td><Td>Nombre del ítem en mano, o <code>-</code> si no es un ítem de RPGRoll.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollitems_helditem_rarity%</Td><Td>Id de rareza del ítem en mano.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollitems_helditem_upgrade_level%</Td><Td>Nivel de mejora actual.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollitems_helditem_durability% / _durability_max</Td><Td>Durabilidad propia (no la barra vanilla).</Td></Tr>
        </tbody>
      </Table>

      <PrevNext current="items" onNavigate={onNavigate} />
    </>
  );
}
