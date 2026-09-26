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

const trapFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_trampa", placeholder: "spike_corridor" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&cPasillo de Pinchos" },
  { key: "description", label: "Descripción", type: "string" },
  { key: "icon", label: "Ícono (Material)", type: "string", default: "TRIPWIRE_HOOK" },
  {
    key: "trigger",
    label: "Trigger",
    type: "group",
    fields: [
      {
        key: "type",
        label: "Tipo",
        type: "select",
        default: "PRESSURE",
        options: [
          "PRESSURE", "MOVEMENT", "PROXIMITY", "LINE_OF_SIGHT", "INTERACTION", "BLOCK_BREAK",
          "BLOCK_PLACE", "PROJECTILE", "ENTITY", "REDSTONE", "TIMER", "COMMAND", "CUSTOM_EVENT",
        ],
      },
    ],
  },
  { key: "radius", label: "Radio (bloques)", type: "number", default: "1.5" },
  { key: "cooldown-millis", label: "Cooldown (ms)", type: "number", default: "0" },
  { key: "charges", label: "Cargas (-1 = infinitas)", type: "number", default: "-1" },
];

export function Traps({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Traps &amp; Defenses (RPGRoll-Traps)">
        Motor genérico de trampas/mecanismos configurable por YAML: bloques reforzados con llave, minas, pinchos,
        explosiones custom, puertas secretas/paredes falsas, runas mágicas, teletransporte, cadenas de mecanismos
        e integración con redstone — con un state machine propio (IDLE→ARMED→TRIGGERED→COOLDOWN→DEPLETED) para que
        cada instancia colocada en el mundo se comporte de forma consistente y persistente entre reinicios.
      </PageHeader>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, RPGRoll-Items, RPGRoll-Effects, RPGRoll-Mobs, RPGRoll-FX, RPGRoll-Guilds, PlaceholderAPI]"} />
      <p>
        RPGRoll-Items es opcional: si está instalado, <code>required-item-id</code> reconoce ítems custom por id
        (vía <code>ItemInstanceService</code>); si no, cae a un <code>Material</code> vanilla directo en la mano.
        RPGRoll-Effects también es opcional: sin él, la acción <Kbd>EFFECT</Kbd> simplemente no hace nada (con un
        warning en consola) en vez de crashear.
      </p>

      <SectionHeading id="modelo">Definición vs. instancia colocada</SectionHeading>
      <p>
        Igual que en Crates o Dungeons: un <code>TrapDefinition</code> (YAML en <code>traps/*.yml</code>) es un{" "}
        <strong>tipo</strong> de trampa reusable (comportamiento), y un <code>PlacedTrap</code> es una{" "}
        <strong>instancia</strong> física en el mundo (persistida en <code>locations.yml</code>, recreada al
        reiniciar). Varias instancias pueden compartir la misma definición.
      </p>
      <Callout tone="info" title="Sin comando de jugador">
        Todo el addon es admin-configurado vía <Kbd>/trapadmin</Kbd> — no hay un comando <code>/trap</code> de
        jugador en esta versión. Los jugadores solo interactúan con las trampas ya puestas en el mundo.
      </Callout>

      <SectionHeading id="triggers">Triggers</SectionHeading>
      <p>
        Los primeros ocho son dirigidos por evento vanilla (un listener los detecta al instante).{" "}
        <Badge tone="amber">PROXIMITY</Badge>, <Badge tone="amber">LINE_OF_SIGHT</Badge> y{" "}
        <Badge tone="amber">TIMER</Badge> no tienen evento equivalente, así que el motor los re-evalúa en un tick
        periódico propio (<code>config.yml: engine.tick-interval-ticks</code>, 20 por defecto).{" "}
        <Badge tone="violet">COMMAND</Badge> y <Badge tone="violet">CUSTOM_EVENT</Badge> nunca se disparan solos —
        solo vía <Kbd>/trapadmin forcetrigger</Kbd> o la acción <code>TRIGGER_TRAP</code> de otra trampa.
      </p>
      <Table>
        <Thead>
          <Th>Trigger</Th>
          <Th>Qué detecta</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">PRESSURE</Td><Td>Un jugador pisa el bloque exacto de la trampa.</Td></Tr>
          <Tr><Td className="font-mono text-xs">MOVEMENT</Td><Td>Un jugador se mueve dentro del radio configurado (sin exigir que esté parado encima).</Td></Tr>
          <Tr><Td className="font-mono text-xs">PROXIMITY</Td><Td>Hay un jugador dentro del radio — re-evaluado en el tick periódico.</Td></Tr>
          <Tr><Td className="font-mono text-xs">LINE_OF_SIGHT</Td><Td>Un jugador tiene visión directa hacia la trampa — también por tick.</Td></Tr>
          <Tr><Td className="font-mono text-xs">INTERACTION</Td><Td>Click derecho sobre el bloque (la base de puertas secretas con llave).</Td></Tr>
          <Tr><Td className="font-mono text-xs">BLOCK_BREAK / BLOCK_PLACE</Td><Td>Alguien rompe o coloca el bloque de la trampa.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PROJECTILE</Td><Td>Un proyectil impacta el bloque (<code>ProjectileHitEvent</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">ENTITY</Td><Td>Cualquier <code>LivingEntity</code> no-jugador entra en la zona (mobs, animales).</Td></Tr>
          <Tr><Td className="font-mono text-xs">REDSTONE</Td><Td>El bloque recibe señal de redstone (flanco de subida).</Td></Tr>
          <Tr><Td className="font-mono text-xs">TIMER</Td><Td>Se dispara sola cada tanto, sin necesitar un jugador cerca.</Td></Tr>
          <Tr><Td className="font-mono text-xs">COMMAND / CUSTOM_EVENT</Td><Td>Solo por API/comando — nunca automático.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="acciones">Acciones</SectionHeading>
      <p>
        Cada trampa tiene una lista de <code>actions</code> (se ejecutan todas, en orden, cuando el motor decide
        disparar). Formato YAML: <code>{"{ type: TIPO, params: { ... } }"}</code>.
      </p>
      <Table>
        <Thead>
          <Th>Acción</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">MESSAGE</Td><Td>Mensaje al jugador que disparó (soporta <code>{"{player}"}</code>/<code>{"{trap}"}</code> y color/formato <code>&amp;</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">SOUND / PARTICLE</Td><Td>Sonido o partícula vanilla en la ubicación de la trampa.</Td></Tr>
          <Tr><Td className="font-mono text-xs">DAMAGE</Td><Td>Daño directo al objetivo — jugador <strong>o mob</strong> (torretas apuntando a hostiles).</Td></Tr>
          <Tr><Td className="font-mono text-xs">HEAL</Td><Td>Restaura vida al objetivo (<code>amount</code>) — la base de una torreta "de sanación" apuntada solo a jugadores.</Td></Tr>
          <Tr><Td className="font-mono text-xs">EXPLOSION</Td><Td>Explosión custom (<code>power</code>/<code>fire</code>/<code>break-blocks</code>) — no usa TNT real, así que puedes dañar sin romper estructuras.</Td></Tr>
          <Tr><Td className="font-mono text-xs">FIRE</Td><Td>Prende fuego al jugador por N ticks.</Td></Tr>
          <Tr><Td className="font-mono text-xs">TELEPORT</Td><Td>Teletransporta al jugador a coordenadas fijas (o a su mundo actual si no especificas <code>world</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">EFFECT</Td><Td>Aplica un efecto de estado de RPGRoll-Effects por id (veneno, sangrado, quemadura...) al objetivo — jugador <strong>o mob</strong>. No hace nada si el addon no está instalado.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PROJECTILE</Td><Td>Ráfaga fija de N flechas hacia el jugador que disparó (<code>amount</code>/<code>spread</code>/<code>interval-ticks</code>/<code>speed</code>) — pensada para trampas ("le llueven flechas al pisar la placa").</Td></Tr>
          <Tr><Td className="font-mono text-xs">CUSTOM_PROJECTILE</Td><Td>Un solo disparo instantáneo hacia el objetivo — <code>projectile-type</code> elige entre <code>ARROW</code> (default), <code>SPECTRAL_ARROW</code>, <code>SNOWBALL</code>, <code>EGG</code>, <code>ENDER_PEARL</code>, <code>FIREBALL</code>, <code>SMALL_FIREBALL</code>, <code>WITHER_SKULL</code>, <code>DRAGON_FIREBALL</code>, <code>TRIDENT</code>, <code>SHULKER_BULLET</code> o <code>POTION</code> (una poción arrojadiza real: no hace daño de impacto, solo aplica los efectos de <code>effects</code> — formato <code>{"TIPO:duración-ticks:amplificador;TIPO2:..."}</code>, ej. <code>SLOWNESS:200:1;WEAKNESS:200:0</code>). Es la acción por defecto de una torreta.</Td></Tr>
          <Tr><Td className="font-mono text-xs">SONIC_BOOM</Td><Td>Aproximación del ataque a distancia del Warden: daño instantáneo (<code>damage</code>) + partícula/sonido interpolados entre el origen y el objetivo. No reimplementa el hitbox-piercing real del Warden (vive en código de servidor no expuesto por la API pública).</Td></Tr>
          <Tr><Td className="font-mono text-xs">COMMAND / COMMAND_AS_PLAYER</Td><Td>Ejecuta un comando por consola o como el jugador (necesario para comandos propios de RPGRoll que exigen un jugador real).</Td></Tr>
          <Tr><Td className="font-mono text-xs">TRIGGER_TRAP</Td><Td>Fuerza el disparo de otra instancia colocada por su <code>placement-id</code> — la base de las cadenas de mecanismos. Sin efecto si se usa desde una torreta (no hay cadena de trampas que forzar).</Td></Tr>
          <Tr><Td className="font-mono text-xs">REDSTONE_PULSE</Td><Td>Coloca un <code>REDSTONE_BLOCK</code> temporal en una posición relativa y lo revierte tras N ticks (Trap → Redstone).</Td></Tr>
          <Tr><Td className="font-mono text-xs">TOGGLE_BLOCKS</Td><Td>Alterna una lista de bloques reales entre material "cerrado"/"abierto" — la base de puertas secretas y paredes falsas, con animación <code>INSTANT</code> o <code>SLIDE</code> (progresiva, bloque por bloque).</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="tip" title="Las mismas acciones sirven para trampas Y torretas">
        Torretas y trampas ejecutan acciones a través del mismo <code>TrapActionRegistry</code> — cualquier acción
        nueva que se agregue queda disponible para ambas sin cableado aparte. Una trampa custom puede usar{" "}
        <code>CUSTOM_PROJECTILE</code>/<code>SONIC_BOOM</code> en su propia lista de <code>actions</code> igual que
        una torreta las usa como su <code>impact</code>.
      </Callout>
      <Callout tone="warning" title="Sin camuflaje por-jugador">
        El "camuflaje" de este addon es <strong>swap de bloque real</strong> (<code>TOGGLE_BLOCKS</code>/
        <code>disguise</code>), visible igual para todos los jugadores — no hay un sistema de bloques falsos
        por-paquete (requeriría ProtocolLib + block-change packets, sin precedente en el repo). Igual sirve para
        la mayoría de los casos: una pared falsa se ve como pared normal hasta que se activa el mecanismo.
      </Callout>

      <SectionHeading id="condiciones">Condiciones</SectionHeading>
      <p>
        Mismo mini-lenguaje que <code>MobConditionEvaluator</code> (Mobs) y otros evaluadores del ecosistema:{" "}
        <code>ruta operador valor</code>, con <code>==</code>, <code>!=</code>, <code>&lt;</code>,{" "}
        <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code>. Si la trampa se dispara sin un jugador en
        contexto (ej. por TIMER/REDSTONE lejos de cualquiera), cualquier condición <code>player.*</code> se evalúa
        como no cumplida.
      </p>
      <CodeBlock
        language="yaml"
        code={"conditions:\n  - \"player.level >= 30\"\n  - \"player.sneaking == true\"\n  - \"player.health < 50%\""}
      />
      <Table>
        <Thead>
          <Th>Ruta</Th>
          <Th>Valor</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">player.level</Td><Td>Nivel del jugador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.health</Td><Td>Vida actual — acepta <code>%</code> (ej. <code>&lt; 50%</code>) para comparar contra el máximo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.sneaking</Td><Td><code>true</code>/<code>false</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.foodlevel</Td><Td>Nivel de hambre (0-20).</Td></Tr>
          <Tr><Td className="font-mono text-xs">world</Td><Td>Nombre del mundo del jugador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">weather</Td><Td><code>CLEAR</code>/<code>RAIN</code>/<code>STORM</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">night</Td><Td><code>true</code>/<code>false</code> según la hora del mundo.</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="tip">
        <code>TrapConditionRegistry</code> queda abierto para que código Java sume sus propias rutas (ej. otro
        addon registrando <code>guild.rank</code>) — no hay una API pública todavía porque en v1 ningún otro addon
        depende de RPGRoll-Traps.
      </Callout>

      <SectionHeading id="bloques-protegidos">Bloques protegidos y llaves</SectionHeading>
      <p>
        La sección opcional <code>block</code> de una definición convierte su bloque colocado en{" "}
        <strong>protegido</strong>: <code>breakable: false</code> cancela cualquier intento de romperlo,{" "}
        <code>required-item-id</code> exige tener ese ítem en la mano (custom de RPGRoll-Items o Material vanilla)
        para poder romperlo, y <code>explosion-immune</code>/<code>piston-immune</code> lo excluyen de{" "}
        <code>EntityExplodeEvent</code>/<code>BlockExplodeEvent</code>/pistones por completo — sin este sistema,
        TNT/creepers/pistones tratarían el bloque como cualquier otro.
      </p>
      <CodeBlock
        language="yaml"
        filename="traps/reinforced_vault_door.yml (fragmento)"
        code={
          "block:\n" +
          "  material: IRON_DOOR\n" +
          "  breakable: false\n" +
          '  required-item-id: "vault_key"\n' +
          "  explosion-immune: true\n" +
          "  piston-immune: true"
        }
      />

      <SectionHeading id="cadenas">Cadenas de mecanismos</SectionHeading>
      <p>
        El campo <code>chain</code> de una definición dispara (vía <code>TrapEngine#forceTrigger</code>) otras
        instancias colocadas apenas esta se activa — pero cada trampa encadenada sigue respetando sus{" "}
        <strong>propias</strong> condiciones, cooldown y cargas, no las salta. Lo mismo logra la acción{" "}
        <code>TRIGGER_TRAP</code> dentro de <code>actions</code>, para encadenar desde un punto específico de la
        secuencia en vez de solo al final.
      </p>

      <SectionHeading id="estados">Estados (state machine)</SectionHeading>
      <p>
        Cada <code>PlacedTrap</code> tiene su propio estado, persistido junto a su posición:
      </p>
      <CodeBlock language="text" code={"IDLE/ARMED → TRIGGERED → (COOLDOWN → ARMED) | DEPLETED"} />
      <p>
        Con <code>cooldown-millis {">"} 0</code> vuelve a <code>ARMED</code> cuando expira (revisado en el tick
        periódico del motor); con <code>charges</code> agotadas cae en <code>DEPLETED</code> y no vuelve a
        dispararse. <code>charges: -1</code> (default) es infinito.
      </p>

      <SectionHeading id="torretas">Torretas</SectionHeading>
      <p>
        Un subsistema paralelo a las trampas, en vez de una variante — una torreta no reacciona a un evento
        puntual como una <code>TrapDefinition</code>: reevalúa objetivo <strong>continuamente</strong> en su
        propio tick (<code>config.yml: engine.turret-tick-interval-ticks</code>, 5 por defecto — más frecuente
        que el de trampas para que el apuntado se sienta fluido), apunta un cañón visual (un{" "}
        <code>ItemDisplay</code> real, sin animación por-paquete) hacia el objetivo más cercano dentro de su
        radio, y ejecuta su <code>impact</code> — la MISMA acción configurable que usan las trampas (ver la
        tabla de Acciones más arriba) — mientras haya alguien en rango.
      </p>
      <Table>
        <Thead>
          <Th>Campo</Th>
          <Th>Qué controla</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">radius</Td><Td>Radio de detección en bloques.</Td></Tr>
          <Tr><Td className="font-mono text-xs">target-players / target-hostile-mobs</Td><Td>Si apunta a jugadores (en SURVIVAL/ADVENTURE) y/o a mobs hostiles (<code>Monster</code> vanilla o cualquier mob custom de RPGRoll-Mobs, si está instalado).</Td></Tr>
          <Tr><Td className="font-mono text-xs">conditions</Td><Td>Mismo evaluador que las trampas — solo se aplican a objetivos jugador (un mob no tiene <code>player.*</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">fire-interval-ticks</Td><Td>Cada cuántos ticks vuelve a ejecutar <code>impact</code> mientras haya objetivo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">impact</Td><Td>La acción que dispara contra el objetivo — <code>{"{ type: TIPO, params: {...} }"}</code>, igual formato que una entrada de <code>actions</code> de trampa. Default: <code>CUSTOM_PROJECTILE</code> con <code>projectile-type: ARROW</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">model.material / model.custom-model-data</Td><Td>Apariencia del cañón (el <code>ItemDisplay</code>).</Td></Tr>
        </tbody>
      </Table>
      <CodeBlock
        language="yaml"
        filename="turrets/sentry_turret.yml"
        code={
          "id: sentry_turret\n" +
          'display-name: "&cTorreta de Vigilancia"\n\n' +
          "radius: 12.0\n" +
          "target-players: true\n" +
          "target-hostile-mobs: true\n" +
          "fire-interval-ticks: 20\n" +
          "conditions: []\n\n" +
          "impact:\n" +
          "  type: CUSTOM_PROJECTILE\n" +
          "  params:\n" +
          "    projectile-type: ARROW\n" +
          '    speed: "2.5"\n\n' +
          "model:\n" +
          "  material: CROSSBOW"
        }
      />
      <p>
        Cambiar el comportamiento de disparo de una torreta es solo cambiar su <code>impact</code>, sin tocar
        nada más de la definición — 3 ejemplos incluidos que lo muestran:
      </p>
      <Table>
        <Thead>
          <Th>Archivo</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">turrets/sentry_turret.yml</Td><Td>Flecha simple (<code>CUSTOM_PROJECTILE</code> + <code>projectile-type: ARROW</code>) contra jugadores y mobs hostiles.</Td></Tr>
          <Tr><Td className="font-mono text-xs">turrets/warden_turret.yml</Td><Td>Sonic boom instantáneo (<code>SONIC_BOOM</code>) en vez de un proyectil que viaja.</Td></Tr>
          <Tr><Td className="font-mono text-xs">turrets/healing_turret.yml</Td><Td>Cura en vez de dañar (<code>HEAL</code>) — <code>target-hostile-mobs: false</code>, apuntada solo a jugadores.</Td></Tr>
          <Tr><Td className="font-mono text-xs">turrets/alchemist_turret.yml</Td><Td>Pociones arrojadizas reales (<code>CUSTOM_PROJECTILE</code> + <code>projectile-type: POTION</code>) que no dañan al impactar, solo ralentizan y debilitan.</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="info" title="Estado de apuntado no persistido">
        El objetivo actual y el cooldown de disparo de una torreta viven en memoria (no en{" "}
        <code>turret-locations.yml</code>) — al reiniciar el server simplemente vuelve a adquirir objetivo en el
        próximo tick. El <code>ItemDisplay</code> visual sí es una entidad real y persiste solo, como cualquier
        entidad del mundo.
      </Callout>
      <p>
        <Kbd>/trapadmin turret place</Kbd>/<Kbd>remove</Kbd>/<Kbd>edit</Kbd>/<Kbd>browser</Kbd>/<Kbd>list</Kbd>{" "}
        siguen exactamente el mismo patrón que los comandos de trampa — ver la tabla de comandos más abajo.
      </p>

      <SectionHeading id="ejemplos">Ejemplos de archivo YAML</SectionHeading>
      <p>
        El addon incluye 5 trampas de ejemplo en <code>traps/</code> (copiadas a disco al primer arranque):{" "}
        <code>landmine</code> (PRESSURE + EXPLOSION + EFFECT), <code>spike_corridor</code> (PROXIMITY + DAMAGE),{" "}
        <code>reinforced_vault_door</code> (bloque protegido + llave + TOGGLE_BLOCKS),{" "}
        <code>arrow_corridor</code> (INTERACTION + PROJECTILE) y <code>poison_gas_room</code> (TIMER + EFFECT).
      </p>
      <CodeBlock
        language="yaml"
        filename="traps/landmine.yml"
        code={
          "id: landmine\n" +
          'display-name: "&cMina Terrestre"\n' +
          'description: "Explota al pisarla."\n' +
          "icon: TNT\n\n" +
          "trigger:\n" +
          "  type: PRESSURE\n\n" +
          "radius: 0.5\n" +
          "conditions: []\n\n" +
          "actions:\n" +
          "  - type: SOUND\n" +
          "    params: { sound: ENTITY_TNT_PRIMED, volume: \"1.0\", pitch: \"0.8\" }\n" +
          "  - type: EXPLOSION\n" +
          "    params: { power: \"2.5\", fire: \"false\", break-blocks: \"false\" }\n" +
          "  - type: EFFECT\n" +
          '    params: { effect-id: "burning" }\n\n' +
          "cooldown-millis: 10000\n" +
          "charges: 1\n" +
          "chain: []"
        }
      />

      <SectionHeading id="comandos">Comandos — /trapadmin</SectionHeading>
      <p>
        Único comando de v1, todo bajo el permiso <code>rpgrolltraps.admin.*</code>.
      </p>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/trapadmin create <id>"}</Td><Td>Crea una definición vacía (trigger PRESSURE por defecto) y la guarda.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin edit <id>"}</Td><Td>Abre el editor GUI de esa definición.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/trapadmin browser</Td><Td>Navegador de todas las definiciones, con acceso directo a crear/editar.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/trapadmin reload</Td><Td>Recarga definiciones desde disco (las instancias colocadas no se pierden).</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin place <id> [zone]"}</Td><Td>Coloca una instancia en el bloque que estás mirando — <code>zone</code> abre el editor de 2 esquinas para una trampa de área.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin remove <placementId>"}</Td><Td>Elimina una instancia colocada.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/trapadmin list</Td><Td>Lista todas las instancias colocadas con su estado actual.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin info <placementId>"}</Td><Td>Detalle: estado, cargas restantes, posición.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin forcetrigger <placementId>"}</Td><Td>Fuerza el disparo saltando la detección de evento (sigue respetando condiciones/cooldown/cargas).</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin turret create <id>"}</Td><Td>Crea una definición de torreta vacía.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin turret edit <id>"}</Td><Td>Abre el editor GUI de esa torreta.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/trapadmin turret browser</Td><Td>Navegador de todas las torretas.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin turret place <id>"}</Td><Td>Coloca una instancia en el bloque que estás mirando.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin turret remove <placementId>"}</Td><Td>Elimina una instancia colocada (y su ItemDisplay visual).</Td></Tr>
          <Tr><Td className="font-mono text-xs">/trapadmin turret list</Td><Td>Lista todas las torretas colocadas.</Td></Tr>
        </tbody>
      </Table>

      <YamlBuilder
        title="Constructor visual: Trap (campos simples)"
        description="Trigger básico + metadata. actions/conditions/chain/block/disguise son demasiado anidados para este formulario — copia y adaptá uno de los 5 ejemplos incluidos."
        folder="traps"
        fields={trapFields}
      />

      <PrevNext current="traps" onNavigate={onNavigate} />
    </>
  );
}
