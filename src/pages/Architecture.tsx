import { PageHeader, SectionHeading, Callout, CodeBlock, Card, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";

export function Architecture({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Arquitectura">
        RPGRoll está dividido en módulos Gradle con una regla simple: sin dependencias circulares.
      </PageHeader>

      <SectionHeading id="modulos">Los módulos del núcleo</SectionHeading>
      <p>
        El proyecto se separó de un único módulo monolítico a tres módulos Gradle independientes, cada uno con
        una responsabilidad clara (más un cuarto módulo de addon opcional, ver más abajo):
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <h3 className="mb-1 font-mono font-semibold text-violet-600 dark:text-violet-400">api</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Contrato público para addons: <code>Race</code>, <code>PlayerClass</code>, <code>RaceManager</code>,{" "}
            <code>ClassManager</code>, <code>StatType</code>, y los eventos que no exponen tipos internos. Sin
            dependencias — módulo hoja puro.
          </p>
        </Card>
        <Card>
          <h3 className="mb-1 font-mono font-semibold text-violet-600 dark:text-violet-400">common</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Framework genérico de carga de contenido YAML (<code>ContentManager</code>/<code>ContentLoader</code>/
            <code>ContentRegistry</code>) y <code>YamlLoader</code>. También sin dependencias — solo usa la API de
            Paper.
          </p>
        </Card>
        <Card>
          <h3 className="mb-1 font-mono font-semibold text-violet-600 dark:text-violet-400">core</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            La implementación completa: jugadores, base de datos, comandos, GUIs, combate, trabajos. Depende de{" "}
            <code>api</code> y <code>common</code>.
          </p>
        </Card>
      </div>

      <SectionHeading id="grafo">Grafo de dependencias</SectionHeading>
      <CodeBlock
        language="text"
        code={
          "core   ──depends on──▶  api\n" +
          "core   ──depends on──▶  common\n" +
          "api    ──depends on──▶  common   (solo para que Race/PlayerClass implementen RPGContent)\n" +
          "common ──depends on──▶  (nada)\n"
        }
      />
      <Callout tone="info">
        La clave para que esto no sea circular: la fachada pública <code>RPGRollAPI</code> y los 3 eventos que
        exponen el <code>RPGPlayer</code> concreto (<code>PlayerLevelUpEvent</code>, <code>PlayerJoinJobEvent</code>,{" "}
        <code>PlayerLeaveJobEvent</code>) viven físicamente en el módulo <code>core</code>, aunque conservan el
        paquete <code>com.sack.rpgroll.api</code> por compatibilidad de nombres. Así <code>api</code> queda 100%
        desacoplado de <code>core</code>.
      </Callout>

      <SectionHeading id="paquetes">Estructura de paquetes (dentro de core)</SectionHeading>
      <CodeBlock
        language="text"
        code={
          "com.sack.rpgroll/\n" +
          "├── command/            comandos de /rpg y su registro (CommandManager)\n" +
          "├── config/              carga y copia de los YAML de configuración\n" +
          "├── core/                Bootstrap (arranque) y ServiceRegistry (DI simple)\n" +
          "├── database/            conexión SQLite y sistema de migraciones\n" +
          "├── gameplay/\n" +
          "│   ├── combat/           CombatStats, CombatTracker, ResourceRegenTask\n" +
          "│   ├── job/              Job, JobManager, JobRewardService, listeners por trabajo\n" +
          "│   ├── levelup/          LevelUpRewards(Config), PlayerLevelUpHandler\n" +
          "│   ├── listener/         listeners de gameplay (XP, combate, level up)\n" +
          "│   ├── skill/            Skill, SkillManager, SkillCooldownTracker\n" +
          "│   ├── stats/            StatPointAllocator\n" +
          "│   └── trait/            Trait, TraitManager, TraitEffect\n" +
          "├── gui/                  GUIs de inventario (creación de personaje, trabajos)\n" +
          "├── player/               RPGPlayer, PlayerManager, repositorio y caché\n" +
          "├── playerclass/          ClassManagerImpl, ClassParser\n" +
          "├── race/                 RaceManagerImpl, RaceParser, RaceAttributeApplier\n" +
          "└── integration/         VaultEconomyProvider\n"
        }
      />

      <SectionHeading id="bootstrap">Arranque (Bootstrap)</SectionHeading>
      <p>
        <code>RPGRoll.onEnable()</code> delega todo a <code>core.Bootstrap</code>, que inicializa los servicios en
        un orden fijo (config → base de datos → jugadores → contenido YAML → economía → trabajos → combate/HUD),
        los registra en un <code>ServiceRegistry</code> simple (un <code>Map&lt;Class, Object&gt;</code>), registra
        los subcomandos, y por último registra los event listeners.
      </p>
      <Callout tone="warning">
        No hay un contenedor de inyección de dependencias real — <code>ServiceRegistry.get(Clase.class)</code>{" "}
        lanza <code>IllegalStateException</code> si el servicio no fue registrado todavía. El orden de{" "}
        <code>registerCoreServices()</code> importa.
      </Callout>

      <SectionHeading id="empaquetado">Empaquetado (Shadow)</SectionHeading>
      <p>
        Solo <code>core/build.gradle.kts</code> aplica el plugin{" "}
        <code>com.gradleup.shadow</code>. El jar final (<code>core-&lt;version&gt;.jar</code>) bundlea las clases
        de <code>api</code> + <code>common</code> + <code>core</code> + el driver <code>sqlite-jdbc</code> (con sus
        binarios nativos para todas las plataformas), y reubica el paquete de sqlite-jdbc a{" "}
        <code>com.sack.rpgroll.libs.sqlite</code> para evitar choques con otros plugins que también lo empaqueten.
      </p>
      <CodeBlock
        language="text"
        code={
          "core/build/libs/\n" +
          "├── core-0.1.0.jar          ← este es el que va a plugins/ (shadow jar, todo bundleado)\n" +
          "└── core-0.1.0-plain.jar    ← solo las clases de core, sin dependencias (no usar directamente)\n"
        }
      />

      <SectionHeading id="addons">Módulos de addon (ej. npcs)</SectionHeading>
      <p>
        Un addon como{" "}
        <button className="underline" onClick={() => onNavigate("npcs")}>
          RPGRoll-NPCs
        </button>{" "}
        es su propio módulo Gradle (propio <code>build.gradle.kts</code>, propio <code>plugin.yml</code>, propio
        jar) que aplica <code>rpgroll.addon-conventions</code> en vez de <code>rpgroll.plugin-conventions</code>{" "}
        directamente. Esa convención agrega automáticamente Paper API + <code>compileOnly(project(":api"))</code> +{" "}
        <code>compileOnly(project(":common"))</code>. Si el addon también necesita clases que viven físicamente en{" "}
        <code>core</code> (como <code>InventoryGUI</code>, <code>ItemBuilder</code>, o <code>RPGRollAPI</code>),
        tiene que agregar <code>compileOnly(project(":core"))</code> él mismo — <code>addon-conventions</code> no
        lo incluye por defecto, porque en teoría un addon "puro" solo debería necesitar el contrato de{" "}
        <code>api</code>.
      </p>
      <Callout tone="tip" title="Cada addon decide su propio empaquetado">
        <code>npcs</code> tiene su propio <code>com.gradleup.shadow</code> configurado por separado del de{" "}
        <code>core</code>, porque necesita bundlear y reubicar sus propias dependencias externas (OkHttp, en su
        caso) sin tocar el jar principal del plugin.
      </Callout>

      <SectionHeading id="componentutils">Colores y formato de texto — ComponentUtils</SectionHeading>
      <p>
        Todo texto que viene de un YAML de contenido (nombres de ítems, mensajes de misión, diálogos de mob,
        recompensas de crate, etc.) pasa por <code>com.sack.rpgroll.util.ComponentUtils#parse(String)</code> antes
        de convertirse en un <code>Component</code> de Adventure. Es la única fuente de verdad para esto — ningún
        addon debería instanciar su propio <code>LegacyComponentSerializer</code> suelto.
      </p>
      <Table>
        <Thead>
          <Th>Formato</Th>
          <Th>Ejemplo</Th>
          <Th>Motor</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td>Legacy clásico</Td>
            <Td className="font-mono text-xs">&amp;l&amp;bArquero</Td>
            <Td>LegacyComponentSerializer</Td>
          </Tr>
          <Tr>
            <Td>Hex por carácter</Td>
            <Td className="font-mono text-xs">&amp;#54DAF4B&amp;#54C8EBi&amp;#54B7E2r...</Td>
            <Td>LegacyComponentSerializer (.hexColors())</Td>
          </Tr>
          <Tr>
            <Td>Hex estilo BungeeCord</Td>
            <Td className="font-mono text-xs">&amp;x&amp;5&amp;4&amp;D&amp;A&amp;F&amp;4Birdflop</Td>
            <Td>LegacyComponentSerializer (.hexColors())</Td>
          </Tr>
          <Tr>
            <Td>MiniMessage / gradient</Td>
            <Td className="font-mono text-xs">{"<gradient:#54daf4:#545eb6>Birdflop</gradient>"}</Td>
            <Td>MiniMessage (autodetectado por la presencia de <code>{"<...>"}</code>)</Td>
          </Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title="Antes solo soportaba códigos clásicos">
        Hasta hace poco, la mayoría de los addons construían su propio{" "}
        <code>LegacyComponentSerializer.legacyAmpersand()</code> local, que <strong>no</strong> entiende hex —
        cualquier <code>&amp;#RRGGBB</code> o <code>&amp;x&amp;R&amp;R...</code> se mostraba como texto literal en
        vez de color. Se corrigió centralizando todo en <code>ComponentUtils</code>, que arma el serializer con{" "}
        <code>.hexColors()</code> — ese único flag ya habilita <strong>ambos</strong> formatos hex al deserializar
        (el método <code>.useUnusualXRepeatedCharacterHexFormat()</code> solo afecta cómo se vuelve a serializar,
        no qué se puede leer).
      </Callout>
      <p>
        <strong>Excepciones deliberadas</strong>: <code>SackResourcePack</code> (standalone, sin dependencia de{" "}
        <code>core</code>) tiene su propia copia local idéntica en <code>DistributionEngine</code>. El canal de
        chat (<code>RPGRoll-Chat</code>) deja elegir <code>ChatTextFormat.LEGACY</code> vs{" "}
        <code>ChatTextFormat.MINIMESSAGE</code> explícitamente por canal en su YAML — ahí no se usa la
        auto-detección de <code>ComponentUtils</code>, porque la elección ya es explícita.
      </p>

      <SectionHeading id="tabcompleteutil">Tab-completion — TabCompleteUtil</SectionHeading>
      <p>
        Todos los comandos de todos los addons (y de <code>/rpg</code> en core) implementan{" "}
        <code>TabCompleter</code> además de <code>CommandExecutor</code>, y sugieren desde el manager real de
        contenido correspondiente en vez de texto fijo: ids de encantamientos, mobs, quests, efectos, especies,
        profesiones, etc., más nombres de jugadores y mundos online donde corresponde. La lógica de filtrado
        compartida (coincidencia de prefijo, sin importar mayúsculas) vive en{" "}
        <code>com.sack.rpgroll.util.TabCompleteUtil</code>.
      </p>
      <CodeBlock
        language="java"
        filename="Patrón usado en cada XxxCommand.java"
        code={
          "public class MobAdminCommand implements CommandExecutor, TabCompleter {\n\n" +
          "    @Override\n" +
          "    public List<String> onTabComplete(CommandSender sender, Command command, String alias, String[] args) {\n" +
          "        if (args.length == 1) {\n" +
          "            return TabCompleteUtil.filter(args[0], SUBCOMMANDS);\n" +
          "        }\n" +
          "        if (args.length == 3 && \"create\".equalsIgnoreCase(args[0])) {\n" +
          "            return TabCompleteUtil.spawnableEntityTypes(args[2]); // EntityType real, no una lista fija\n" +
          "        }\n" +
          "        // ...\n" +
          "    }\n" +
          "}\n"
        }
      />
      <Callout tone="tip" title="SackResourcePack también, con una copia local">
        Igual que con los colores: como es standalone, <code>SrpCommand</code> trae su propio filtro de
        coincidencia de prefijo en vez de depender de <code>TabCompleteUtil</code>.
      </Callout>

      <SectionHeading id="gui-back-navigation">GUIs: volver al navegador anterior</SectionHeading>
      <p>
        Todas las GUIs de inventario extienden <code>com.sack.rpgroll.gui.InventoryGUI</code>. Abrir una nueva
        (<code>open()</code>) hace tres cosas: reconstruye el inventario (<code>build()</code>), se registra como
        la GUI activa del jugador en <code>GUIListener</code>, y se la muestra (
        <code>player.openInventory(...)</code>). Un editor que vuelve a su navegador (botón "Volver") recibe un{" "}
        <code>Runnable onBack</code> en el constructor — casi siempre <code>browserInstance::reopen</code>.
      </p>
      <Callout tone="warning" title="Bug corregido: reopen() necesita open(), no solo build()">
        Durante bastante tiempo, el <code>reopen()</code> privado de cada navegador solo llamaba a{" "}
        <code>build()</code> (redibuja el <code>Inventory</code> del navegador, pero ese objeto ya no es el que el
        jugador está viendo — está viendo el del editor). El resultado: apretar "Volver" no hacía nada visible, y
        además el click-listener seguía apuntando al editor. Se corrigió cambiando esos{" "}
        <code>reopen()</code> para que llamen a <code>open()</code> en vez de <code>build()</code> — <code>open()</code>{" "}
        sí redibuja, re-registra y vuelve a mostrar el inventario correcto. Esto se tocó en{" "}
        <strong>59 archivos</strong> a lo largo de todo el ecosistema.
      </Callout>

      <PrevNext current="arquitectura" onNavigate={onNavigate} />
    </>
  );
}
