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
  PrevNext,
} from "../components/ui";

const PRESET_YAML =
  "schema: 1\n" +
  "id: mi-mundo                 # minúsculas, números, - y _ (hasta 32)\n" +
  "name: Mi mundo\n" +
  "provider: hybrid\n" +
  "seed: 12345                  # opcional; sin semilla, aleatoria\n" +
  "environment: normal          # normal, nether o the_end\n" +
  "structures: true             # estructuras vanilla (vanilla e hybrid)\n" +
  "spawn: {x: 0, y: 70, z: 0}   # opcional\n" +
  "platform: {block: stone, radius: 2, y: 69}   # opcional\n" +
  "biomes: [plains, forest]     # opcional: solo estos biomas existentes\n" +
  "ores:\n" +
  "- id: mas-diamante\n" +
  "  block: deepslate_diamond_ore\n" +
  "  replaces: [deepslate, tuff]\n" +
  "  veins-per-chunk: 2\n" +
  "  size: 6\n" +
  "  min-y: -64\n" +
  "  max-y: -16\n" +
  "  distribution: triangle     # uniform o triangle\n" +
  "player-gravity: 0.5          # opcional: gravedad de los jugadores en este mundo (0.1 a 4)\n" +
  "# provider: terrain  →  terrain: montanas         (un terreno de terrains/)\n" +
  "# provider: plugin   →  generator: Terra:OVERWORLD (como en bukkit.yml)\n" +
  "templates:\n" +
  "- id: mazmorra\n" +
  "  structure: mazmorra        # structures/mazmorra.nbt\n" +
  "  rarity: 40                 # una de cada 40 chunks, de media\n" +
  "  placement: underground     # surface (sobre el suelo) o underground\n" +
  "  min-y: -40\n" +
  "  max-y: 0\n" +
  "  rotation: random           # random o none\n";

const TERRAIN_YAML =
  "id: mio\n" +
  "description: lo que verás en /wf terrain list\n" +
  "base: overworld        # overworld, amplified o large_biomes\n" +
  "height-scale: 1.5      # 0.25 a 3: estira la forma del relieve alrededor de y=64\n" +
  "height-offset: 0       # -96 a 96: sube o hunde toda la tierra\n" +
  "peaks: 1.0             # 0 a 4: picos dentados (0 los quita)\n" +
  "continent-size: 1.0    # 0.25 a 8: continentes y océanos\n" +
  "erosion-size: 1.0      # 0.25 a 8: zonas llanas y escarpadas\n" +
  "ridge-size: 1.0        # 0.25 a 8: crestas y valles\n" +
  "biome-size: 1.0        # 0.25 a 8: zonas de clima (temperatura y humedad)\n" +
  "sea-level: 63\n" +
  "aquifers: true\n" +
  "ore-veins: true\n";

const presets: [string, string][] = [
  ["vanilla", "Minecraft sin cambios."],
  ["amplified", "Tipo amplificado de vanilla."],
  ["empty", "Ni un bloque."],
  ["void-platform", "Vacío con una plataforma de piedra de 5×5 en la aparición."],
  ["flat", "Capas planas (bedrock, tierra, hierba)."],
  ["resource-rich", "Terreno vanilla con venas extra de carbón, hierro, oro y diamante."],
  ["custom", "Base para el tuyo: duplícalo y edítalo."],
  ["nether, end", "Un Nether o un End aparte, con su propia semilla."],
  ["montanas", "Cordilleras altas con el motor de terreno de WorldForge."],
];

const providers: [string, string, string, string, string, string][] = [
  ["vanilla", "Minecraft (normal, amplificado, biomas grandes)", "—", "—", "—", "sí/no"],
  ["empty", "nada", "—", "sí", "sí", "—"],
  ["flat", "capas del preset", "sí", "sí", "sí", "—"],
  ["hybrid", "Minecraft", "sí", "sí", "sí", "sí/no"],
  ["terrain", "el motor de WorldForge con un terreno de terrains/", "sí", "sí", "por altura y clima", "sí/no"],
  ["plugin", "el generador de otro plugin (Terra, Iris…)", "—", "—", "—", "lo que haga ese plugin"],
];

const terrains: [string, string, string][] = [
  ["suave", "Colinas bajas, cómodas para construir.", "overworld"],
  ["continentes", "Continentes tres veces más anchos, biomas grandes.", "overworld"],
  ["archipielago", "Islas y estrechos.", "overworld"],
  ["montanas", "Cordilleras casi el doble de altas.", "towering"],
  ["extremo", "Relieve 2,4 veces más alto, picos muy dentados y continentes anchos.", "towering"],
];

const folia: [string, string][] = [
  ["Presets, exportar e importar, zonas protegidas, plantillas, diagnóstico, menú", "Igual que en Paper."],
  [
    "Mundo principal con un preset (bukkit.yml): vacío, plano, plantillas, menas, el motor de terreno",
    "Sí; los chunks se generan en paralelo por regiones.",
  ],
  ["Dimensiones por datapack, también con terreno y tipo towering", "Sí, al reiniciar."],
  ["Regenerar", "Siempre al reiniciar, antes de abrir los mundos."],
  ["/wf world tp a otro mundo cargado", "Sí."],
  ["/wf world create, load, unload, import", "No: el comando explica por qué y propone una dimensión por datapack."],
  ["Mundos administrados creados antes en Paper", "No se cargan; el registro lo avisa."],
  ["Nether y End aparte, provider: plugin, gravedad por mundo", "No: dependen de crear mundos en caliente."],
];

const commands: [string, string][] = [
  ["/wf help · status · gui", "worlds.view"],
  ["/wf diagnostics", "diagnostics"],
  ["/wf reload-config", "reload"],
  ["/wf world list · inspect <mundo>", "worlds.view"],
  ["/wf world create <nombre> <preset>", "worlds.create"],
  ["/wf world load|unload <mundo>", "worlds.manage"],
  ["/wf world import <nombre> <preset>", "worlds.create"],
  ["/wf world tp <mundo> [jugador]", "worlds.teleport (otro jugador: worlds.teleport.others)"],
  ["/wf preset list · info · validate <id>", "presets.view"],
  ["/wf preset create|duplicate|seed|publish", "presets.edit"],
  ["/wf preset export <id> · import <archivo.yml>", "presets.export · presets.import"],
  ["/wf generation validate|preview · apply <mundo> <preset>", "generation.validate · generation.apply"],
  ["/wf regen plan|restore · confirm|accept · cancel · list|info", "regeneration.plan · execute · cancel · view"],
  ["/wf dimension list · create|remove", "dimensions.view · dimensions.create"],
  ["/wf terrain list · main <terreno|vanilla>", "dimensions.view · terrain.main"],
  ["/wf structure list|info · save", "templates.view · templates.save"],
  ["/wf protection list · add|remove", "protection.view · protection.manage"],
];

const troubles: [string, string][] = [
  [
    "El servidor se para al arrancar y el registro dice «Se para el servidor»",
    "Las líneas de antes dicen si falta la licencia o qué preset de bukkit.yml falla.",
  ],
  ["«tiene errores» al publicar", "/wf preset validate <id> lista cada campo con su problema."],
  ["Un mundo administrado no carga al arrancar", "El registro dice por qué (preset con errores, carpeta que falta, plantilla que falta)."],
  ["«Regeneración BLOQUEADA» en el diagnóstico", "protections.yml mal escrito: arréglalo y /wf reload-config."],
  ["Un trabajo en NEEDS_RECOVERY", "/wf regen info, luego restore o accept."],
  ["«✘ Plantilla …: esa regla no se aplica»", "Falta o está rota structures/<nombre>.nbt."],
  [
    "El servidor no arranca tras terrain main",
    "Borra world/datapacks/worldforge/data/minecraft/worldgen/noise_settings/overworld.json y arranca.",
  ],
  ["«ya está escrito en el datapack con otros valores»", "Editaste un terreno que ya usa una dimensión: guárdalo con otro id."],
];

const mono = "font-mono text-xs";

export function WorldForge({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="WorldForge (RPGRoll-WorldForge)" slug="worldforge">
        Generación y administración de mundos: mundos vacíos, planos, vanilla o híbridos a partir de presets
        versionados; varios mundos a la vez como con Multiverse; terrenos al estilo Tectonic o Terralith (más altos,
        más llanos, continentes enormes, archipiélagos); menas y plantillas en los chunks nuevos; dimensiones nuevas
        por datapack; y regeneración de chunks con plan, confirmación, respaldo y recuperación. Todo desde comandos o
        desde un menú en el juego.
      </PageHeader>

      <Callout tone="info" title="Versión 1.0.0">
        Todo lo que describe esta página está probado en un servidor real, en Paper 26.1.2 y en Folia 26.1.2, con
        jugadores de prueba conectados. Lo que no está probado lo dice <a href="#limites">Límites</a>.
      </Callout>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <Table>
        <tbody>
          <Tr><Td>Servidor</Td><Td>Paper 26.1.2 (probado con el build 74) o Folia 26.1.2 (build 8; ver <a href="#folia">Folia</a>)</Td></Tr>
          <Tr><Td>Java</Td><Td>25</Td></Tr>
          <Tr><Td>Dependencias</Td><Td>Ninguna: SQLite y YAML vienen con Paper.</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="tip" title="No necesita RPGRoll-Lib">
        WorldForge funciona solo: no depende de RPGRoll-Lib ni de RPGRoll. Puedes instalarlo en un servidor sin nada
        más de RPGRoll.
      </Callout>

      <SectionHeading id="instalacion">Instalación</SectionHeading>
      <ol>
        <li>Copia <code>RPGRoll-WorldForge-&lt;versión&gt;.jar</code> en <code>plugins/</code>.</li>
        <li>
          Arranca el servidor una vez. Se crea <code>plugins/RPGRoll-WorldForge/license.yml</code>: pega ahí tu clave
          (empieza por <code>RPGR-</code>) en lugar de <code>%%__LICENSE__%%</code> y vuelve a arrancar. Sin una clave
          válida, WorldForge se desactiva.
        </li>
        <li>
          Con la licencia se crean también <code>config.yml</code>, <code>messages.yml</code>,{" "}
          <code>protections.yml</code>, la base de datos <code>worldforge.db</code>, los presets de serie en{" "}
          <code>presets/</code> y las carpetas <code>drafts/</code>, <code>imports/</code> y <code>exports/</code>;{" "}
          <code>structures/</code> y <code>backups/</code> aparecen la primera vez que hacen falta.
        </li>
        <li>
          <code>/wf diagnostics</code> dice si todo está en orden: plataforma, base de datos, presets, zonas
          protegidas, trabajos pendientes y dimensiones.
        </li>
      </ol>
      <p>
        WorldForge carga en <code>STARTUP</code>: así puede generar también el mundo principal y aplicar
        regeneraciones pendientes antes de que el servidor abra los mundos.
      </p>

      <SectionHeading id="primeros-pasos">Primeros pasos</SectionHeading>
      <CodeBlock
        language="text"
        code={
          "/wf preset list                         presets disponibles\n" +
          "/wf world create islas void-platform    un mundo vacío con plataforma\n" +
          "/wf world inspect islas                 qué generador usa, su altura, su aparición…\n" +
          "/wf gui                                 lo mismo con menús"
        }
      />
      <p>
        Para que el <strong>mundo principal</strong> use un preset, ponlo en <code>bukkit.yml</code> y reinicia:
      </p>
      <CodeBlock language="yaml" filename="bukkit.yml" code={"worlds:\n  world:\n    generator: RPGRoll-WorldForge:void-platform"} />
      <Callout tone="warning" title="Si no puede generarlo, para el servidor">
        Si al arrancar WorldForge no puede dar ese generador (no hay licencia válida, o el preset no existe o tiene
        errores), para el servidor antes de abrir los mundos y el registro dice por qué. Si siguiera, Minecraft
        generaría ese mundo con su terreno normal y después habría que regenerar esos chunks. Arréglalo, o quita la
        línea <code>generator:</code>, y vuelve a arrancar. La licencia aguanta 7 días sin poder hablar con la tienda
        desde la última vez que se comprobó.
      </Callout>

      <SectionHeading id="presets">Presets</SectionHeading>
      <p>
        Un preset dice cómo es un mundo. Los publicados viven en <code>presets/</code> y los borradores en{" "}
        <code>drafts/</code>. Un borrador no crea mundos: se publica con <code>/wf preset publish</code>, que lo valida
        antes. Cada preset tiene una <strong>versión</strong> (el hash de su texto) y un mundo recuerda con qué
        versión se creó.
      </p>
      <Table>
        <Thead>
          <Th>Preset de serie</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          {presets.map(([id, what]) => (
            <Tr key={id}><Td className={mono}>{id}</Td><Td>{what}</Td></Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="proveedores" level={3}>Proveedores</SectionHeading>
      <p>
        Cada preset elige un proveedor. Un campo que el proveedor no controla es un <strong>error</strong> al validar:
        nunca se ignora en silencio.
      </p>
      <Table>
        <Thead>
          <Th>Proveedor</Th>
          <Th>Terreno</Th>
          <Th>Menas</Th>
          <Th>Plantillas</Th>
          <Th>Biomas a elegir</Th>
          <Th>Estructuras vanilla</Th>
        </Thead>
        <tbody>
          {providers.map(([id, ...cols]) => (
            <Tr key={id}>
              <Td className={mono}>{id}</Td>
              {cols.map((v, i) => <Td key={i}>{v}</Td>)}
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="formato" level={3}>Formato</SectionHeading>
      <CodeBlock language="yaml" filename="presets/mi-mundo.yml" code={PRESET_YAML} />
      <Callout tone="warning">
        Menas, plantillas y biomas <strong>solo afectan a chunks que se generan a partir de ahora</strong>. Lo ya
        generado no cambia; para eso está la <a href="#regeneracion">regeneración</a>.
      </Callout>

      <SectionHeading id="editar-exportar" level={3}>Editar, exportar, importar</SectionHeading>
      <ul>
        <li>
          <code>/wf preset duplicate &lt;origen&gt; &lt;nuevo&gt;</code> crea un borrador;{" "}
          <code>/wf preset seed &lt;borrador&gt; &lt;número&gt;</code> le fija la semilla; edítalo en{" "}
          <code>drafts/</code> si quieres más y publícalo con <code>/wf preset publish &lt;borrador&gt;</code>.
        </li>
        <li>
          <code>/wf preset export &lt;id&gt;</code> escribe el preset en <code>exports/</code> con un manifiesto
          SHA-256.
        </li>
        <li>
          Un <code>.yml</code> en <code>imports/</code> entra con <code>/wf preset import &lt;archivo.yml&gt;</code>,{" "}
          <strong>siempre como borrador</strong> (tamaño máximo en <code>config.yml</code>, por defecto 256 KB).
        </li>
      </ul>

      <SectionHeading id="varios-mundos">Varios mundos (como Multiverse)</SectionHeading>
      <CodeBlock
        language="text"
        code={
          "/wf world create minas nether      un Nether aparte (también: end)\n" +
          "/wf world tp minas                 ir a un mundo; /wf world tp minas Ana manda a otro jugador\n" +
          "/wf world import viejo flat        adoptar una carpeta de mundo que WorldForge no creó"
        }
      />
      <ul>
        <li>Cada mundo creado vuelve solo al reiniciar, con su preset.</li>
        <li>
          <code>import</code> no toca los bloques: solo pasa a administrar la carpeta (
          <code>world/dimensions/minecraft/&lt;nombre&gt;/</code>, el formato de 26.1). Una carpeta del formato de
          antes (<code>level.dat</code> suelto) se rechaza: hay que abrirla antes con Paper 26.1 para que la
          convierta.
        </li>
        <li>
          <code>player-gravity</code> cambia la gravedad de los <strong>jugadores</strong> (salto y caída; la caída
          segura se ajusta a la par) al entrar, al cambiar de mundo y al reaparecer. A los mobs no les afecta.
        </li>
        <li>
          <code>provider: plugin</code> usa el generador de otro plugin igual que <code>bukkit.yml</code> o el{" "}
          <code>-g</code> de Multiverse; si ese plugin no está, el preset no se publica. WorldForge no mete sus menas
          ni plantillas dentro de un generador ajeno.
        </li>
      </ul>

      <SectionHeading id="plantillas">Plantillas (estructuras y mazmorras)</SectionHeading>
      <ol>
        <li>
          Construye en un mundo. Los cofres pueden llevar tabla de botín con el comando de vanilla:{" "}
          <code>{'/data merge block <x> <y> <z> {LootTable:"minecraft:chests/simple_dungeon"}'}</code>.
        </li>
        <li>
          <code>{"/wf structure save <nombre> <x1> <y1> <z1> <x2> <y2> <z2> [mundo]"}</code> guarda esa caja (esquinas
          incluidas, sin entidades) en <code>structures/&lt;nombre&gt;.nbt</code>. Como mucho{" "}
          <strong>32×64×32</strong>, y la zona tiene que estar cargada.
        </li>
        <li>Úsala en un preset (<code>templates:</code>), publícalo y crea un mundo con él.</li>
      </ol>
      <ul>
        <li>Un cofre con tabla de botín la conserva en cada copia colocada; el botín se sortea al abrirlo.</li>
        <li>
          Una plantilla guardada <strong>no se sobrescribe</strong>: guarda otra con otro nombre. Así un preset
          publicado sigue generando lo mismo.
        </li>
        <li>
          Sirve cualquier <code>.nbt</code> de Minecraft (el formato de los bloques de estructura) de hasta 2 MB y
          32×64×32: déjalo en <code>structures/</code>.
        </li>
        <li>
          <Kbd>surface</Kbd> la pone sobre el primer bloque sólido desde arriba (atraviesa hojas, troncos y plantas;
          nunca sobre agua o lava). <Kbd>underground</Kbd> la pone con la base a una altura al azar entre{" "}
          <code>min-y</code> y <code>max-y</code>; con los dos iguales, a una altura fija (sirve para islas en el
          vacío).
        </li>
        <li>
          <code>/wf world inspect &lt;mundo&gt;</code> dice cuántas ha colocado cada regla desde que se cargó el mundo
          y dónde fueron las últimas.
        </li>
        <li>Crear o cargar un mundo vuelve a comprobar sus plantillas: si falta el archivo, no sigue.</li>
      </ul>

      <SectionHeading id="dimensiones">Dimensiones</SectionHeading>
      <CodeBlock language="text" code="/wf dimension create minas tall overworld" />
      <p>
        Escribe la dimensión en el datapack <code>worldforge</code> del mundo principal.{" "}
        <strong>Minecraft solo lee dimensiones nuevas al arrancar</strong>: tras reiniciar aparece como el mundo{" "}
        <code>world_worldforge_minas</code> (entra con <code>/execute in worldforge:minas run tp @s 0 100 0</code>).
      </p>
      <Table>
        <Thead>
          <Th>Tipo</Th>
          <Th>Cómo es</Th>
          <Th>Generador</Th>
          <Th>Qué genera</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>overworld</Td><Td>cielo, día y noche, −64 a 319</Td><Td className={mono}>void</Td><Td>vacío (bioma the_void)</Td></Tr>
          <Tr><Td className={mono}>caves</Td><Td>con techo, sin cielo</Td><Td className={mono}>flat</Td><Td>capas planas</Td></Tr>
          <Tr><Td className={mono}>tall</Td><Td>como el normal pero hasta 383</Td><Td className={mono}>overworld</Td><Td>terreno normal</Td></Tr>
          <Tr><Td className={mono}>towering</Td><Td>como el normal pero hasta 575</Td><Td className={mono}>amplified</Td><Td>terreno amplificado</Td></Tr>
          <Tr><Td className={mono}>nether</Td><Td>como el Nether, 0 a 255</Td><Td className={mono}>nether, end</Td><Td>solo con su tipo</Td></Tr>
          <Tr><Td className={mono}>end</Td><Td>como el End</Td><Td className={mono}>{"terrain:<id>"}</Td><Td>un <a href="#terrenos">terreno</a> (tipos del normal)</Td></Tr>
        </tbody>
      </Table>
      <p>
        <code>/wf dimension remove &lt;id&gt;</code> quita la definición: deja de cargarse al reiniciar y{" "}
        <strong>la carpeta se conserva</strong>. Una dimensión de datapack usa el generador de Minecraft, así que las
        menas y plantillas de WorldForge no se aplican ahí.
      </p>

      <SectionHeading id="terrenos">Terrenos</SectionHeading>
      <p>
        Un terreno cambia la <strong>forma</strong> del mundo, como Tectonic, Terralith o Stratos: más alto o más
        llano, continentes más anchos, picos más afilados, biomas más grandes. Viven en <code>terrains/*.yml</code>;
        los de serie se copian ahí la primera vez y sirven de ejemplo (<code>/wf terrain list</code>).
      </p>
      <Table>
        <Thead>
          <Th>De serie</Th>
          <Th>Cómo es</Th>
          <Th>Tipo</Th>
        </Thead>
        <tbody>
          {terrains.map(([id, what, type]) => (
            <Tr key={id}><Td className={mono}>{id}</Td><Td>{what}</Td><Td className={mono}>{type}</Td></Tr>
          ))}
        </tbody>
      </Table>
      <CodeBlock language="yaml" filename="terrains/mio.yml" code={TERRAIN_YAML} />

      <SectionHeading id="usar-terrenos" level={3}>Tres maneras de usarlo</SectionHeading>
      <Table>
        <Thead>
          <Th>Dónde</Th>
          <Th>Cómo</Th>
          <Th>Qué genera</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td>Una dimensión nueva</Td>
            <Td><code>/wf dimension create alpes towering terrain:montanas</code> y reiniciar</Td>
            <Td>El generador de Minecraft con los números cambiados: sus cuevas, acuíferos, biomas y estructuras.</Td>
          </Tr>
          <Tr>
            <Td>El mundo normal</Td>
            <Td><code>/wf terrain main montanas</code> y reiniciar (<code>vanilla</code> lo deshace)</Td>
            <Td>Lo mismo, en el mundo principal, como hace Terralith.</Td>
          </Tr>
          <Tr>
            <Td>Un mundo creado en caliente</Td>
            <Td>Un preset con <code>provider: terrain</code> y <code>terrain: montanas</code></Td>
            <Td>El motor propio de WorldForge (abajo).</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        <strong>Por datapack</strong> (dimensión y mundo normal): WorldForge copia el <em>noise router</em> de vanilla
        del propio jar del servidor y cambia sus números. Con todo a 1 sale igual que el generador normal (dos
        generaciones del mismo sitio pueden diferir en algún bloque suelto de la frontera entre chunks). Para alturas
        por encima de y≈240 hace falta un tipo más alto: <code>/wf dimension create</code> avisa si las cimas se van
        a cortar. Un terreno ya escrito no se pisa: si lo editas, guárdalo con otro id.
      </p>
      <p>
        <code>height-scale</code> estira la forma grande del terreno (continentes, valles, montañas y su dentado). El
        detalle 3D de vanilla, que talla salientes y agujas, conserva su tamaño: las agujas más altas no salen al
        doble. Con <code>height-scale: 2</code>, medido: el doble de piedra sobre y=64 y el suelo ×1,94 columna a
        columna (mediana). Con <code>height-scale: 3</code> y <code>height-offset: 96</code> en un tipo{" "}
        <code>towering</code>, el suelo llega a y=395, algo que el mundo normal no permite.
      </p>
      <Callout tone="warning" title="terrain main cambia el mundo normal">
        Cambia <code>minecraft:overworld</code>, así que también lo usan los mundos con proveedor{" "}
        <code>vanilla</code> y las dimensiones con generador <code>overworld</code>. Solo afecta a chunks nuevos:
        donde lo nuevo toque lo ya generado habrá un corte. Otro datapack que también lo cambie (Terralith) compite
        con él; el comando lo avisa. Pruébalo antes en una copia del mundo.
      </Callout>
      <p>
        <strong>El motor propio</strong> (<code>provider: terrain</code>) es para mundos creados sin reiniciar, donde
        Minecraft no deja usar un datapack: los mismos ajustes, con su propia forma (no idéntica a vanilla). Encima
        Minecraft pone su superficie, cuevas, decoración y estructuras (bedrock, pizarra profunda, carbón, pueblos);
        los biomas los elige el motor por altura y clima (picos arriba, océanos en el mar). Las cimas se comprimen al
        acercarse al techo del mundo (y=319) en vez de cortarse.
      </p>
      <p>
        <strong>Con Terralith instalado</strong>: las dimensiones y el motor de WorldForge no heredan su terreno
        (salen del jar del servidor); el generador <code>overworld</code> sí. En Paper sin el mod lithostitched, los
        biomas de Terralith solo aparecen en el mundo principal.
      </p>

      <SectionHeading id="regeneracion">Regeneración</SectionHeading>
      <Callout tone="danger" title="Regenerar borra lo que hay en esos chunks">
        Por eso siempre sigue los mismos cuatro pasos, y WorldForge nunca borra un respaldo.
      </Callout>
      <ol>
        <li>
          <strong>Plan</strong>: <code>{"/wf regen plan <mundo> radius <x> <z> <radio>"}</code> (o{" "}
          <code>{"area <x1> <z1> <x2> <z2>"}</code>, o <code>all</code>). Dice cuántos chunks, cuántos se saltan por
          estar protegidos o sin generar, cuánto ocupa el respaldo y cuándo se aplicará. No toca nada.
        </li>
        <li>
          <strong>Confirmación</strong> con el código del plan: <code>{"/wf regen confirm <trabajo> <código>"}</code>.
          Caduca a los 15 minutos (<code>regeneration.confirm-minutes</code>).
        </li>
        <li>
          <strong>Respaldo</strong> de los archivos de región afectados en <code>backups/</code>, comprobado con
          SHA-256 justo antes de editar.
        </li>
        <li>
          <strong>Ejecución</strong>: un mundo secundario se descarga, se edita y se vuelve a cargar al momento (los
          jugadores que haya dentro se mueven al mundo principal). El mundo principal se aplica en el{" "}
          <strong>próximo arranque</strong>, antes de abrir los mundos.
        </li>
      </ol>
      <p>
        Deshacer: <code>/wf regen restore &lt;trabajo&gt;</code> planifica una restauración de ese respaldo, que sigue
        el mismo camino (plan, código y respaldo de lo actual).
      </p>

      <SectionHeading id="zonas-protegidas" level={3}>Zonas protegidas</SectionHeading>
      <p>
        <code>plugins/RPGRoll-WorldForge/protections.yml</code> (o <code>/wf protection add|remove|list</code>): la
        regeneración nunca toca un chunk protegido, ni al planificar ni al ejecutar. Alrededor de la aparición de cada
        mundo hay una zona protegida de <code>spawn-radius-chunks</code> chunks (por defecto 2; 0 la quita). Si el
        archivo no se puede leer, la regeneración queda <strong>bloqueada</strong> hasta arreglarlo.
      </p>

      <SectionHeading id="recuperacion" level={3}>Si el servidor se apaga a mitad</SectionHeading>
      <p>
        Un trabajo que estaba ejecutándose queda en <code>NEEDS_RECOVERY</code> y bloquea ese mundo: no se reanuda
        solo. <code>/wf regen info &lt;trabajo&gt;</code> dice qué pasó; puedes restaurar su respaldo (
        <code>/wf regen restore</code>) o aceptarlo tal como quedó (<code>/wf regen accept</code>).
      </p>

      <SectionHeading id="menu">Menú</SectionHeading>
      <p>
        <code>/wf gui</code> abre mundos (cargar, descargar, inspeccionar, cambiar de preset, regenerar o proteger
        alrededor de ti), presets (validar, duplicar, semilla, publicar, exportar, crear mundo), regeneración
        (confirmar, cancelar, restaurar, aceptar), zonas protegidas y diagnóstico. Cada botón pide su permiso al
        pulsarlo, lo destructivo pide confirmación y, si otro admin cambia lo que estás viendo, el menú no guarda
        encima. Plantillas, dimensiones, terrenos, <code>world import</code> y <code>world tp</code> van solo por
        comandos.
      </p>

      <SectionHeading id="folia">Folia</SectionHeading>
      <p>
        Probado en <strong>Folia 26.1.2 build 8</strong> con un jugador conectado. Folia no deja crear, cargar ni
        descargar mundos con el servidor en marcha, así que todo lo que cambia mundos pasa por el arranque:
      </p>
      <Table>
        <Thead>
          <Th>Qué</Th>
          <Th>En Folia</Th>
        </Thead>
        <tbody>
          {folia.map(([what, how]) => (
            <Tr key={what}><Td>{what}</Td><Td>{how}</Td></Tr>
          ))}
        </tbody>
      </Table>
      <p>
        Folia no tiene <code>save-all</code>: lo recién generado llega a disco en el autoguardado o al parar, y un plan
        de regeneración lo avisa si toca chunks que todavía no están guardados.
      </p>

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <p>
        Todos van con <code>/wf</code>. El permiso de cada uno lleva delante <code>worldforge.</code>
      </p>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Permiso</Th>
        </Thead>
        <tbody>
          {commands.map(([cmd, perm]) => (
            <Tr key={cmd}><Td className={mono}>{cmd}</Td><Td className={mono}>{perm}</Td></Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="permisos">Permisos</SectionHeading>
      <Table>
        <Thead>
          <Th>Permiso</Th>
          <Th>Qué permite</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>worldforge.admin (op)</Td><Td>Todo.</Td></Tr>
          <Tr>
            <Td className={mono}>worldforge.operator</Td>
            <Td>
              Preparar sin ejecutar nada destructivo: editar borradores, exportar, validar, planificar regeneraciones,
              guardar plantillas.
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>worldforge.viewer</Td>
            <Td>Solo lectura: mundos, presets, dimensiones, zonas, trabajos, plantillas, diagnóstico.</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        Sueltos: <code>{"worldforge.worlds.{view,create,manage,teleport,teleport.others}"}</code>,{" "}
        <code>worldforge.terrain.main</code> (solo admin), <code>{"worldforge.presets.{view,edit,import,export}"}</code>,{" "}
        <code>{"worldforge.generation.{validate,apply}"}</code>,{" "}
        <code>{"worldforge.regeneration.{view,plan,execute,cancel}"}</code>,{" "}
        <code>{"worldforge.protection.{view,manage}"}</code>, <code>{"worldforge.dimensions.{view,create}"}</code>,{" "}
        <code>{"worldforge.templates.{view,save}"}</code>, <code>worldforge.diagnostics</code> y{" "}
        <code>worldforge.reload</code>. La consola también pasa por los permisos.
      </p>

      <SectionHeading id="limites">Límites</SectionHeading>
      <ul>
        <li>Menas, plantillas y biomas de un preset solo se aplican a <strong>chunks nuevos</strong>.</li>
        <li>Crear, cargar y descargar mundos en caliente es solo de Paper.</li>
        <li>Dimensiones nuevas solo al reiniciar (así funciona Minecraft) y con el generador de Minecraft.</li>
        <li>
          Las plantillas se colocan sin entidades (soportes de armadura, marcos…); los bloques con datos (cofres,
          generadores de monstruos, carteles) sí van. Como mucho 32×64×32. Cada chunk decide la suya sin mirar a los
          vecinos, así que dos plantillas grandes pueden solaparse: súbeles <code>rarity</code>.
        </li>
        <li>
          No hay estructuras «registradas» de Minecraft (jigsaw, <code>/locate</code>): las plantillas son de
          WorldForge.
        </li>
        <li>
          La gravedad por mundo es solo de los jugadores. Sin física ni bloques nuevos: WorldForge solo usa lo que
          Minecraft ya trae.
        </li>
        <li>
          Terrenos por datapack: solo en dimensiones nuevas y en el mundo principal, al reiniciar. El mundo principal
          no puede cambiar de altura (−64 a 319).
        </li>
        <li>Biomas nuevos no: los terrenos y el motor reparten los que ya existen (también los de datapacks).</li>
      </ul>
      <Callout tone="info" title="Sin probar todavía">
        <code>provider: plugin</code> se probó con un generador de prueba, no con Terra ni Iris. Tampoco están
        probados en Folia <code>terrain main</code> ni el proveedor <code>hybrid</code>, ni el servidor con muchos
        jugadores a la vez.
      </Callout>

      <SectionHeading id="problemas">Problemas frecuentes</SectionHeading>
      <Table>
        <Thead>
          <Th>Síntoma</Th>
          <Th>Qué mirar</Th>
        </Thead>
        <tbody>
          {troubles.map(([sym, fix]) => (
            <Tr key={sym}><Td>{sym}</Td><Td>{fix}</Td></Tr>
          ))}
        </tbody>
      </Table>

      <PrevNext current="worldforge" onNavigate={onNavigate} />
    </>
  );
}
