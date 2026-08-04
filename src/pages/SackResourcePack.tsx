import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, Kbd, Badge, PrevNext } from "../components/ui";

export function SackResourcePack({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="SackResourcePack">
        Un Asset Pipeline independiente para resource packs — cero dependencia de RPGRoll. Cualquier plugin (de
        este ecosistema o no) declara una carpeta de assets con un manifiesto simple, y SackResourcePack la
        escanea, resuelve el orden entre módulos, fusiona namespaces, valida, empaqueta con hash, y distribuye el
        pack a los jugadores — todo automático.
      </PageHeader>

      <Callout tone="info" title="Standalone a propósito — no es un addon de RPGRoll">
        <code>plugin.yml</code> no tiene <code>depend</code> ni <code>softdepend</code> en RPGRoll, y el código
        solo usa <code>compileOnly(paper-api)</code>. La idea es que sirva para <strong>cualquier</strong>{" "}
        ecosistema de plugins, del mismo modo que{" "}
        <button type="button" onClick={() => onNavigate("sackeffects")} className="text-violet-600 underline dark:text-violet-400">
          SackEffects
        </button>{" "}
        es una librería de partículas/sonido standalone.
      </Callout>

      <SectionHeading id="modulos-de-contenido">Módulos de contenido</SectionHeading>
      <p>
        Cualquier plugin que quiera aportar assets crea una carpeta bajo <code>content/&lt;id&gt;/</code> con un{" "}
        <code>pack.yml</code> y su propia carpeta <code>assets/&lt;namespace&gt;/...</code> (mismo layout que un
        resource pack real, solo que sin <code>pack.mcmeta</code> propio — ese se genera una única vez para todo
        el pack fusionado).
      </p>
      <CodeBlock
        language="yaml"
        filename="content/rpgroll_fishing/pack.yml"
        code={
          "id: rpgroll_fishing\n" +
          'name: "RPGRoll-Fishing"\n' +
          "version: 1.0.0\n" +
          "author: Sack\n" +
          "namespace: rpgroll_fishing\n" +
          "priority: 0\n" +
          "depends: []\n" +
          "optional: [rpgroll_core_textures]\n" +
          'description: "Modelos e íconos de especies, cañas y carnadas."\n'
        }
      />
      <Table>
        <Thead>
          <Th>Campo</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">priority</Td><Td>A igualdad de dependencias, menor prioridad se fusiona primero — los de mayor prioridad pueden pisar a los de menor.</Td></Tr>
          <Tr><Td className="font-mono text-xs">depends</Td><Td>Ids obligatorios. Si falta alguno, el build reporta un error claro (no revienta el pipeline entero).</Td></Tr>
          <Tr><Td className="font-mono text-xs">optional</Td><Td>Ids opcionales. Si están presentes se ordenan antes; si no, se ignoran sin error.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="resolucion">Resolución de dependencias</SectionHeading>
      <p>
        El orden final de fusión sale de un algoritmo de Kahn determinista: entre módulos sin relación de
        dependencia, desempata <code>priority</code> y luego el <code>id</code> alfabéticamente. Una dependencia
        circular <strong>no</strong> traba el build — se reporta como error y el resto se agrega en el mejor
        orden posible (prioridad/id), para que un solo módulo mal configurado no tumbe todo el pipeline.
      </p>

      <SectionHeading id="fusion">Motor de fusión</SectionHeading>
      <p>
        Cada módulo se copia hacia un único árbol de trabajo, en el orden ya resuelto. La mayoría de los archivos
        (texturas, modelos, <code>.ogg</code>) se copian tal cual — el último módulo pisa, y cualquier pisada se
        registra como un "conflicto" visible en <Kbd>/srp conflicts</Kbd>. Tres formatos, en cambio, se{" "}
        <strong>fusionan de verdad</strong> en vez de pisarse:
      </p>
      <Table>
        <Thead>
          <Th>Archivo</Th>
          <Th>Estrategia de fusión</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">sounds.json</Td><Td>Unión de eventos de sonido (claves) — un evento que ya existe con otro contenido se marca como conflicto.</Td></Tr>
          <Tr><Td className="font-mono text-xs">lang/*.json</Td><Td>Unión de claves de traducción — nunca se pierde lo que ya había, solo se agregan claves nuevas o se avisa si difieren.</Td></Tr>
          <Tr><Td className="font-mono text-xs">font/*.json</Td><Td>Concatena el array <code>providers</code> de todos los módulos que aporten esa fuente.</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="tip" title="pack.mcmeta se genera una sola vez, en la raíz">
        Ningún módulo debería traer su propio <code>pack.mcmeta</code> — si lo trae, se ignora, porque no tiene
        sentido fusionar metadata de pack. El generado real lista, en su descripción, los ids de todos los módulos
        que entraron en ese build.
      </Callout>

      <SectionHeading id="custom-model-data">CustomModelData estable</SectionHeading>
      <p>
        Cada clave lógica (ej. <code>rpgroll_fishing:fish_salmon</code>) recibe un <code>CustomModelData</code>{" "}
        la primera vez que se pide, y esa asignación queda fija para siempre en{" "}
        <code>cmd-registry.yml</code> — <strong>nunca se reasigna un número ya usado</strong>, así que un ítem ya
        entregado a un jugador sigue mostrando el modelo correcto después de cualquier rebuild futuro, incluso si
        se agregan o quitan módulos entre medio.
      </p>

      <SectionHeading id="validacion">Motor de validación</SectionHeading>
      <p>
        Corre después de fusionar y antes de empaquetar — nunca bloquea el build por sí solo (eso lo decide quien
        llama, mirando si hay algún <code>ERROR</code>), solo junta todos los problemas de una pasada.
      </p>
      <Table>
        <Thead>
          <Th>Chequeo</Th>
          <Th>Severidad</Th>
        </Thead>
        <tbody>
          <Tr><Td>PNG ilegible o corrupto (<code>ImageIO</code>)</Td><Td><Badge tone="red">ERROR</Badge></Td></Tr>
          <Tr><Td>Modelo JSON que no parsea</Td><Td><Badge tone="red">ERROR</Badge></Td></Tr>
          <Tr><Td>Modelo referencia un <code>parent</code> o textura inexistente</Td><Td><Badge tone="amber">WARNING</Badge></Td></Tr>
          <Tr><Td><code>sounds.json</code> referencia un <code>.ogg</code> inexistente</Td><Td><Badge tone="amber">WARNING</Badge></Td></Tr>
          <Tr><Td>Namespace declarado no coincide con la carpeta real de assets del módulo</Td><Td><Badge tone="amber">WARNING</Badge></Td></Tr>
          <Tr><Td>Override entre módulos (archivo pisado por otro)</Td><Td><Badge tone="amber">WARNING</Badge></Td></Tr>
        </tbody>
      </Table>
      <p>
        Las referencias con namespace <code>minecraft:</code> (o sin <code>:</code>, que se asume vanilla) se
        saltean — SackResourcePack no valida contra los assets internos del juego.
      </p>

      <SectionHeading id="build-cache">Build: ZIP + SHA1 + caché incremental</SectionHeading>
      <p>
        Un "signature" (hash SHA-256 de los metadatos de cada módulo más ruta:tamaño:mtime de cada archivo de
        assets) decide si hace falta reconstruir. Si nada cambió desde el último build y no se fuerza, se devuelve
        el resultado cacheado sin volver a escanear/fusionar/validar/empaquetar. Es{" "}
        <strong>un caché de todo el pack, no una fusión parcial por módulo</strong> — una decisión deliberada de
        simplicidad: más robusto ante módulos que cambian en formas inesperadas, a costa de reconstruir todo
        cuando cualquier cosa cambia (en la práctica, rápido igual salvo packs enormes).
      </p>
      <p>
        <Kbd>PackBuildEvent</Kbd> es cancelable — otro plugin puede abortar un build en curso.{" "}
        <Kbd>PackGeneratedEvent</Kbd> se dispara con el ZIP final, su SHA1, y si vino de caché.
      </p>

      <SectionHeading id="distribucion">Distribución</SectionHeading>
      <Table>
        <Thead>
          <Th>Mecanismo</Th>
          <Th>Cómo funciona</Th>
        </Thead>
        <tbody>
          <Tr><Td>Host HTTP embebido</Td><Td>Un <code>com.sun.net.httpserver.HttpServer</code> (JDK puro, sin dependencia extra) sirve el ZIP directo — cero configuración externa.</Td></Tr>
          <Tr><Td>Subida remota</Td><Td>PUT/POST autenticado genérico (header configurable) a cualquier endpoint propio, proxy, o servicio compatible.</Td></Tr>
          <Tr><Td>Envío al jugador</Td><Td><code>Player#setResourcePack(url, sha1, prompt, required)</code> — vanilla puro, sin reimplementar el protocolo.</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title="No hay firma AWS S3 SigV4">
        La subida remota es un PUT/POST autenticado genérico — a propósito{" "}
        <strong>no</strong> implementa la firma específica de un proveedor como S3 directo. Es un algoritmo de
        firma real, sensible a errores sutiles, e imposible de verificar sin credenciales reales. Sirve perfecto
        para un endpoint propio, un proxy, o cualquier servicio que acepte un header de autenticación simple.
      </Callout>
      <p>
        <code>http.public-url</code> (config) es la URL efectiva que se le manda al jugador, sea que la sirva el
        host embebido o un CDN/proxy externo completamente distinto — dejalo vacío para usar el host embebido
        directo, o completalo si tenés el pack hosteado en otro lado.
      </p>

      <SectionHeading id="modo-desarrollo">Modo desarrollo</SectionHeading>
      <p>
        Un <code>WatchService</code> (JDK puro) observa <code>content/</code> recursivamente. Tras 1.5s sin más
        cambios (para no reconstruir en medio de que alguien todavía está copiando varios archivos), dispara un
        rebuild y reenvío automático — pensado para iterar assets sin reiniciar el servidor. <Kbd>/srp dev</Kbd>{" "}
        lo prende/apaga en caliente.
      </p>

      <SectionHeading id="assets-api">API para addons — AssetsAPI</SectionHeading>
      <p>
        Un plugin que quiera aportar sus propios assets sin tocar <code>content/</code> a mano tiene dos caminos:
      </p>
      <CodeBlock
        language="java"
        filename="MiPlugin.java"
        code={
          "public class MiPlugin extends JavaPlugin {\n" +
          "    @Override\n" +
          "    public void onEnable() {\n" +
          "        // Copia el resourcepack/ embebido en el jar de MiPlugin (pack.yml + assets/)\n" +
          "        // hacia content/miplugin/ — idempotente, solo re-copia lo que cambió.\n" +
          "        AssetsAPI.assets().registerPlugin(this);\n" +
          "\n" +
          "        // O registro directo, archivo por archivo:\n" +
          '        AssetsAPI.models().register("miplugin", "miplugin", "item/espada.json", modeloBytes);\n' +
          '        AssetsAPI.textures().register("miplugin", "miplugin", "item/espada.png", texturaBytes);\n' +
          "    }\n" +
          "}\n"
        }
      />
      <p>
        Ambos caminos convergen en el mismo pipeline de siempre — no hay un modelo de objetos "en memoria"
        paralelo. <code>registerPlugin</code> le crea un <code>pack.yml</code> mínimo al módulo si todavía no
        tiene uno; los registros directos también.
      </p>
      <Table>
        <Thead>
          <Th>Registro</Th>
          <Th>Carpeta destino</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">models() / textures() / sounds() / particles()</Td><Td><code>models/</code>, <code>textures/</code>, <code>sounds/</code>, <code>particles/</code></Td></Tr>
          <Tr><Td className="font-mono text-xs">fonts() / languages()</Td><Td><code>font/</code>, <code>lang/</code></Td></Tr>
          <Tr><Td className="font-mono text-xs">music()</Td><Td><code>sounds/music/</code> (convención propia, no un requisito vanilla)</Td></Tr>
          <Tr><Td className="font-mono text-xs">gui()</Td><Td><code>textures/gui/</code> (convención vanilla para texturas de interfaz)</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="gui">GUI: Dashboard y Explorador de Assets</SectionHeading>
      <p>
        Un <code>InventoryGUI</code>/<code>GUIListener</code> propios — copia deliberada del mismo patrón que usa
        el resto del ecosistema RPGRoll, pero <strong>sin importar nada de RPGRoll</strong>, porque este módulo
        es standalone. <Kbd>/srp</Kbd> (sin argumentos, desde un jugador) abre el Dashboard: lista de módulos
        cargados, resumen de errores/warnings del último build, y botones de Reconstruir/Validar/Publicar/Modo
        desarrollo. Desde ahí, "Explorador de Assets" abre una lista paginada y filtrable por tipo de todo lo que
        entró en el pack fusionado.
      </p>
      <Callout tone="warning" title="Sin preview visual real">
        Bukkit no puede renderizar un PNG arbitrario dentro de un item de inventario — cada entrada del explorador
        muestra su información en texto (ruta, tipo, módulo dueño, tamaño), no una imagen. Es una limitación de
        la plataforma, no un recorte de esta pasada.
      </Callout>

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/srp</Td><Td>Sin argumentos, desde un jugador: abre el Dashboard.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/srp reload</Td><Td>Recarga config.yml (puerto HTTP/carpeta de contenido requieren reiniciar el plugin).</Td></Tr>
          <Tr><Td className="font-mono text-xs">/srp rebuild</Td><Td>Fuerza un build completo, ignorando el caché.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/srp validate</Td><Td>Reconstruye solo si algo cambió y muestra los issues.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/srp publish</Td><Td>Sube (si está configurado) y reenvía el pack a todos los jugadores conectados.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/srp status</Td><Td>Módulos cargados, último SHA1, estado del host HTTP y del modo desarrollo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/srp content</Td><Td>Lista los módulos de contenido activos.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/srp conflicts</Td><Td>Lista los overrides (archivos pisados) del último build.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/srp models|textures|sounds|fonts"}</Td><Td>Lista los assets de ese tipo en el pack fusionado.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/srp cache</Td><Td>Invalida el caché — el próximo build reconstruye todo desde cero.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/srp dev</Td><Td>Prende/apaga el modo desarrollo en caliente.</Td></Tr>
        </tbody>
      </Table>
      <p>
        Todos los subcomandos requieren <Badge tone="amber">sackresourcepack.admin.*</Badge> (default: op).
      </p>

      <SectionHeading id="pendiente">Qué falta</SectionHeading>
      <Callout tone="info" title="Construido a scope completo — la única pasada donde se eligió 'todo de una'">
        A diferencia del resto de los addons de esta serie (que se construyeron en su tier recomendado), acá se
        pidió expresamente el scope completo. Lo que queda deliberadamente afuera, no por recorte de esta pasada
        sino por decisión de diseño: firma específica de proveedor para subida remota (ej. AWS SigV4 para hablarle
        directo a un bucket S3 sin proxy), preview visual real de assets en el explorador in-game (limitación de
        Bukkit, no de esta implementación), y fusión de carpetas de datapack (<code>data/</code>) — solo se maneja{" "}
        <code>assets/</code> de resource pack.
      </Callout>

      <PrevNext current="sackresourcepack" onNavigate={onNavigate} />
    </>
  );
}
