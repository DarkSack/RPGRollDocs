import { PageHeader, SectionHeading, Callout, CodeBlock, Card, PrevNext } from "../components/ui";

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

      <PrevNext current="arquitectura" onNavigate={onNavigate} />
    </>
  );
}
