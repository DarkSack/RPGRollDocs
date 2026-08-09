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

const npcFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_npc", placeholder: "guardia" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&7Guardia de la Ciudad" },
  {
    key: "pose",
    label: "Pose",
    type: "select",
    options: ["STANDING", "SITTING", "SNEAKING", "SWIMMING", "SLEEPING"],
  },
  {
    key: "location",
    label: "Ubicación",
    type: "group",
    fields: [
      { key: "world", label: "Mundo", type: "string", default: "world" },
      { key: "x", label: "X", type: "number", default: "0" },
      { key: "y", label: "Y", type: "number", default: "64" },
      { key: "z", label: "Z", type: "number", default: "0" },
      { key: "yaw", label: "Yaw", type: "number", default: "0" },
      { key: "pitch", label: "Pitch", type: "number", default: "0" },
    ],
  },
  {
    key: "skin",
    label: "Skin (opcional)",
    type: "group",
    fields: [
      {
        key: "value",
        label: "Textura (base64)",
        type: "string",
        help: "En el editor in-game se resuelve solo pegando un link/id de mineskin.org — acá hay que pegarla a mano.",
      },
      { key: "signature", label: "Firma (base64)", type: "string" },
    ],
  },
];

const npcMenuFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_menu", placeholder: "tienda_general" },
  { key: "title", label: "Título", type: "string", placeholder: "&2Tienda General" },
  { key: "rows", label: "Filas (1-6)", type: "number", default: "3" },
];

export function Npcs({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="NPCs (RPGRoll-NPCs)">
        Un addon <strong>separado</strong> de RPGRoll: NPCs interactuables renderizados como jugadores falsos vía
        paquetes de ProtocolLib, con acciones y condiciones que se enganchan al RPGRoll real.
      </PageHeader>

      <Callout tone="info" title="Es un plugin distinto, con su propio jar">
        A diferencia de todo lo demás en esta documentación, <code>RPGRoll-NPCs</code> no vive dentro del jar de{" "}
        <code>core</code> — es su propio plugin (<code>npcs/</code>, módulo Gradle separado) que se instala junto a
        RPGRoll y depende de él a través de <code>RPGRollAPI</code>.
      </Callout>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <p>Declarado en su <code>plugin.yml</code>:</p>
      <CodeBlock language="yaml" code={"depend: [RPGRoll, ProtocolLib]"} />
      <ul>
        <li><strong>RPGRoll</strong> — para <code>RPGRollAPI</code> (usado por las condiciones) y el framework de GUIs (<code>InventoryGUI</code>/<code>ItemBuilder</code>).</li>
        <li>
          <strong>ProtocolLib</strong> — tiene que estar instalado como plugin real en el servidor. Es lo que
          permite renderizar los NPCs como jugadores falsos a nivel de paquete, sin crear entidades reales.
        </li>
      </ul>
      <Callout tone="tip">
        Compilá con <Kbd>./gradlew :npcs:build</Kbd> — el jar queda en{" "}
        <code>npcs/build/libs/npcs-&lt;version&gt;.jar</code> (no el <code>-plain.jar</code>). Igual que{" "}
        <code>core</code>, usa Shadow para empaquetar OkHttp (necesario para hablar con la API de MineSkin) — pero{" "}
        <code>ProtocolLib</code> y <code>Gson</code> quedan afuera a propósito (el primero porque debe ser la{" "}
        <em>misma</em> instancia que corre en el servidor, el segundo porque Paper ya lo trae).
      </Callout>

      <SectionHeading id="como-funciona">Cómo funcionan los NPCs</SectionHeading>
      <p>
        Un NPC no es una entidad real de Minecraft — es una ilusión mantenida a punta de paquetes (
        <code>FakePlayerRenderer</code>): se le asigna un UUID y un entityId fijos, y se envían los paquetes{" "}
        <code>PLAYER_INFO</code> (para que el cliente pueda mostrar la skin), <code>SPAWN_ENTITY</code>, y{" "}
        <code>ENTITY_METADATA</code> (pose) solo a los jugadores cercanos.
      </p>
      <ul>
        <li>
          <strong>Visibilidad por distancia:</strong> cada NPC se muestra solo a jugadores dentro de 48 bloques,
          recalculado en join, teletransporte, y cambios de bloque de posición (no en cada micro-movimiento).
        </li>
        <li>
          <strong>Sin IA ni colisión real:</strong> al no ser una entidad real, un NPC no camina, no tiene
          hitbox real más allá de lo que el cliente infiere de un jugador falso, y no interactúa con el mundo
          por sí mismo.
        </li>
        <li>
          <strong>Interacción:</strong> se detecta a nivel de paquete (<code>USE_ENTITY</code>), con un cooldown
          de 300ms para evitar que un solo click dispare la acción varias veces.
        </li>
      </ul>

      <SectionHeading id="crear-npc">Crear y editar un NPC</SectionHeading>
      <p>Todo el flujo de creación es una GUI de inventario, no un formulario de texto:</p>
      <ol>
        <li><Kbd>{"/npc create <id>"}</Kbd> — usa tu ubicación y posición actuales, abre el editor.</li>
        <li>Click en <strong>Nombre</strong> → te pide el nombre por chat.</li>
        <li>
          Click en <strong>Skin</strong> → pegás un link o ID de{" "}
          <a href="#" onClick={(e) => e.preventDefault()}>mineskin.org</a> por chat; el addon consulta la API de
          MineSkin y resuelve el <code>value</code>/<code>signature</code> reales automáticamente (no hace falta
          pegar el texto largo de la textura a mano).
        </li>
        <li>Click en <strong>Pose</strong> → elegís entre STANDING, SITTING, SNEAKING, SWIMMING, SLEEPING.</li>
        <li>Click en <strong>Posición</strong> → reasigna la ubicación a donde estés parado.</li>
        <li>Click en <strong>Acciones</strong> → agregá/quitá acciones (formato <code>TIPO|valor</code> por chat).</li>
        <li>Guardar (deshabilitado hasta tener nombre y posición).</li>
      </ol>
      <p>
        <Kbd>{"/npc edit <id>"}</Kbd> reabre el mismo editor sobre un NPC existente. Nada se escribe a disco hasta
        tocar "Guardar".
      </p>

      <SectionHeading id="formato-yaml">Formato del archivo YAML</SectionHeading>
      <p>Se genera solo al guardar desde la GUI, en <code>plugins/RPGRoll-NPCs/npcs/&lt;id&gt;.yml</code>:</p>
      <CodeBlock
        language="yaml"
        filename="npcs/prueba.yml"
        code={
          "id: prueba\n" +
          'display-name: "NPC de Prueba"\n' +
          "skin:\n" +
          '  value: "<textura base64 resuelta por MineSkin>"\n' +
          '  signature: "<firma resuelta por MineSkin>"\n' +
          'pose: "STANDING"\n' +
          "\n" +
          "location:\n" +
          "  world: world\n" +
          "  x: -3.0\n" +
          "  y: 80.0\n" +
          "  z: -15.0\n" +
          "  yaw: 0.0\n" +
          "  pitch: 0.0\n" +
          "\n" +
          "actions:\n" +
          "  - type: MESSAGE\n" +
          '    value: "Bienvenido, {player}."\n' +
          "  - type: SOUND\n" +
          '    value: "ENTITY_VILLAGER_YES,1.0,1.2"\n'
        }
      />
      <CodeBlock
        language="yaml"
        filename="npcs/guardia.yml"
        code={
          "id: guardia\n" +
          'display-name: "&7Guardia de la Ciudad"\n' +
          'pose: "STANDING"\n' +
          "\n" +
          "location:\n" +
          "  world: world\n" +
          "  x: 10.0\n" +
          "  y: 65.0\n" +
          "  z: 5.0\n" +
          "  yaw: 90.0\n" +
          "  pitch: 0.0\n" +
          "\n" +
          "actions:\n" +
          "  - type: MESSAGE\n" +
          '    value: "Circula, ciudadano. Nada que ver por aquí."\n' +
          "  - type: SOUND\n" +
          '    value: "ENTITY_VILLAGER_AMBIENT,1.0,1.0"\n'
        }
      />

      <YamlBuilder
        title="Constructor visual: NPC"
        description="El id, nombre, pose y ubicación de un NPC. La lista de actions (mensajes, sonidos, condicionales, abrir menú...) es demasiado variada para un formulario — agregala luego con /npc edit o copiando un ejemplo de arriba."
        folder="npcs"
        fields={npcFields}
      />

      <SectionHeading id="acciones">Acciones (NpcAction)</SectionHeading>
      <p>Se ejecutan en orden, todas, cada vez que un jugador hace click en el NPC. <code>{"{player}"}</code> se reemplaza por el nombre del jugador.</p>
      <Table>
        <Thead>
          <Th>Tipo</Th>
          <Th>Formato de value</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">MESSAGE</Td><Td className="font-mono text-xs">texto libre</Td><Td>Envía un mensaje al jugador (soporta color legacy <code>&amp;</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">COMMAND</Td><Td className="font-mono text-xs">comando</Td><Td>Ejecuta el comando como consola (<code>Bukkit.dispatchCommand</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">GIVE_ITEM</Td><Td className="font-mono text-xs">MATERIAL[,cantidad]</Td><Td>Da un ítem; lo que no entra en el inventario se dropea a los pies.</Td></Tr>
          <Tr><Td className="font-mono text-xs">TAKE_ITEM</Td><Td className="font-mono text-xs">MATERIAL[,cantidad]</Td><Td>Quita un ítem del inventario (sin volver a chequear si hay suficiente — pensado para usarse junto a un CONDITIONAL con HAS_ITEM).</Td></Tr>
          <Tr><Td className="font-mono text-xs">SOUND</Td><Td className="font-mono text-xs">SONIDO[,volumen[,pitch]]</Td><Td>Reproduce un sonido en la ubicación del jugador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">TELEPORT</Td><Td className="font-mono text-xs">mundo,x,y,z</Td><Td>Teletransporta al jugador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">CONDITIONAL</Td><Td className="font-mono text-xs">condición;accSiTrue[;accSiFalse]</Td><Td>Evalúa una condición y ejecuta una sub-acción distinta según el resultado.</Td></Tr>
          <Tr><Td className="font-mono text-xs">OPEN_GUI</Td><Td className="font-mono text-xs">menuId</Td><Td>Abre un menú definido en <code>menus/*.yml</code> (ver abajo).</Td></Tr>
          <Tr><Td className="font-mono text-xs">OPEN_INVENTORY</Td><Td className="font-mono text-xs">{"CHEST|HOPPER|FURNACE[,título]"}</Td><Td>Abre un contenedor vanilla vacío (sin ítems ni acciones propias).</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="condicionales">CONDITIONAL: sub-acciones y condiciones</SectionHeading>
      <p>
        El formato es <code>condicion;accionSiTrue[;accionSiFalse]</code>, y cada sub-acción usa{" "}
        <code>TIPO:valor</code> (con dos puntos, no <code>|</code> como en la GUI de acciones):
      </p>
      <CodeBlock
        language="text"
        code={"HAS_JOB:minero;MESSAGE:Ya eres minero, sigue así!;MESSAGE:¿No quieres unirte a los mineros?"}
      />
      <Table>
        <Thead>
          <Th>Condición</Th>
          <Th>Parámetro</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">HAS_JOB</Td><Td className="font-mono text-xs">jobId</Td></Tr>
          <Tr><Td className="font-mono text-xs">MIN_JOB_LEVEL</Td><Td className="font-mono text-xs">jobId,nivel</Td></Tr>
          <Tr><Td className="font-mono text-xs">MIN_LEVEL</Td><Td className="font-mono text-xs">nivel (de personaje)</Td></Tr>
          <Tr><Td className="font-mono text-xs">HAS_RACE</Td><Td className="font-mono text-xs">razaId</Td></Tr>
          <Tr><Td className="font-mono text-xs">HAS_CLASS</Td><Td className="font-mono text-xs">claseId</Td></Tr>
          <Tr><Td className="font-mono text-xs">HAS_ITEM</Td><Td className="font-mono text-xs">MATERIAL[,cantidad mínima]</Td></Tr>
        </tbody>
      </Table>
      <p>
        Se pueden combinar condiciones con <code>&amp;&amp;</code> (todas deben cumplirse) o <code>||</code> (al
        menos una) — pero no ambos en la misma expresión, ya que no hay parser de precedencia/paréntesis: si
        aparecen los dos operadores, solo se evalúa el primero que aparece de izquierda a derecha.
      </p>
      <CodeBlock
        language="text"
        code={"HAS_JOB:minero && MIN_JOB_LEVEL:minero,20 && HAS_ITEM:IRON_PICKAXE;GIVE_ITEM:DIAMOND,5;MESSAGE:Necesitas ser Minero nivel 20 y llevar un pico de hierro."}
      />

      <SectionHeading id="menus">Menús (tiendas)</SectionHeading>
      <p>
        Un <code>NpcMenuDefinition</code> es una GUI de inventario configurable, abierta desde una acción{" "}
        <code>OPEN_GUI</code>. Vive en <code>plugins/RPGRoll-NPCs/menus/&lt;id&gt;.yml</code>:
      </p>
      <CodeBlock
        language="yaml"
        filename="menus/tienda_herrero.yml"
        code={
          "id: tienda_herrero\n" +
          'title: "&6Tienda del Herrero"\n' +
          "rows: 3\n" +
          "\n" +
          "items:\n" +
          "  - slot: 11\n" +
          "    material: IRON_SWORD\n" +
          '    name: "&fEspada de Hierro"\n' +
          "    lore:\n" +
          '      - "&7Precio: &e50 monedas (Lingote de Oro)"\n' +
          "    actions:\n" +
          "      - type: CONDITIONAL\n" +
          '        value: "HAS_ITEM:GOLD_INGOT,50;GIVE_ITEM:IRON_SWORD,1;MESSAGE:No tienes suficiente oro."\n' +
          "      - type: CONDITIONAL\n" +
          '        value: "HAS_ITEM:GOLD_INGOT,50;TAKE_ITEM:GOLD_INGOT,50"\n'
        }
      />
      <CodeBlock
        language="yaml"
        filename="menus/tienda_general.yml"
        code={
          "id: tienda_general\n" +
          'title: "&2Tienda General"\n' +
          "rows: 3\n" +
          "\n" +
          "items:\n" +
          "  - slot: 11\n" +
          "    material: BREAD\n" +
          '    name: "&fPan"\n' +
          "    lore:\n" +
          '      - "&7Precio: &e5 monedas (Lingote de Oro)"\n' +
          "    actions:\n" +
          "      - type: CONDITIONAL\n" +
          '        value: "HAS_ITEM:GOLD_INGOT,5;GIVE_ITEM:BREAD,4;MESSAGE:No tienes suficiente oro (necesitas 5 lingotes)."\n' +
          "      - type: CONDITIONAL\n" +
          '        value: "HAS_ITEM:GOLD_INGOT,5;TAKE_ITEM:GOLD_INGOT,5"\n' +
          "\n" +
          "  - slot: 13\n" +
          "    material: TORCH\n" +
          '    name: "&fAntorchas"\n' +
          "    lore:\n" +
          '      - "&7Precio: &e2 monedas"\n' +
          "    actions:\n" +
          "      - type: GIVE_ITEM\n" +
          '        value: "TORCH,8"\n' +
          "\n" +
          "  - slot: 15\n" +
          "    material: BARRIER\n" +
          '    name: "&cCerrar"\n' +
          "    actions: []\n"
        }
      />

      <Callout tone="tip" title="Referencia completa: todos los campos en dos archivos">
        <code>npcs/reference_full.yml</code> y <code>menus/reference_full_menu.yml</code> (incluidos en el jar) usan
        absolutamente todos los tipos de acción, todas las condiciones de <code>CONDITIONAL</code> (incluyendo{" "}
        <code>&amp;&amp;</code>/<code>||</code>) y todos los campos de un ítem de menú — pensados para copiar/pegar,
        no para dar en partidas reales tal cual.
      </Callout>

      <YamlBuilder
        title="Constructor visual: NPC Menu"
        description="Identidad de la GUI de tienda/menú. Los ítems del menú (slot/material/nombre/lore/acciones) se editan mejor con /npc menus, o copiando/adaptando uno de los ejemplos de arriba."
        folder="menus"
        fields={npcMenuFields}
      />

      <Callout tone="warning" title="El orden de GIVE_ITEM y TAKE_ITEM importa">
        Para que una "compra" funcione de verdad hacen falta <strong>dos</strong> condicionales con la misma
        condición: primero el que entrega el ítem, después el que cobra. Si el cobro fuera primero, el segundo
        condicional volvería a evaluar <code>HAS_ITEM</code> ya sin el oro recién descontado y nunca llegaría a
        entregar la espada. No hay una acción de "transacción atómica" — son dos chequeos independientes en
        secuencia.
      </Callout>
      <p>Cada ítem del menú tiene: <code>slot</code>, <code>material</code>, <code>name</code>, <code>lore</code> (lista), y su propia lista de <code>actions</code> (mismo sistema que las acciones de NPC).</p>

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/npc create <id>"}</Td><Td>Crea un NPC en tu ubicación y abre el editor.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/npc edit <id>"}</Td><Td>Reabre el editor sobre un NPC existente.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/npc list</Td><Td>Lista todos los NPCs existentes.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/npc delete <id>"}</Td><Td>Borra un NPC y lo despawnea para todos.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/npc menus</Td><Td>Abre el navegador gráfico de menús (crear/editar <code>NpcMenuDefinition</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">/npc reload</Td><Td>Recarga NPCs y menús desde disco, sin reiniciar el servidor.</Td></Tr>
        </tbody>
      </Table>
      <p>
        Todos requieren el permiso <Badge tone="amber">rpgrollnpcs.admin.*</Badge> (default: op) — declarado tanto
        en el comando (<code>plugin.yml</code>) como chequeado explícitamente en el código.
      </p>

      <PrevNext current="npcs" onNavigate={onNavigate} />
    </>
  );
}
