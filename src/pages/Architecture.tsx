import { PageHeader, SectionHeading, Callout, CodeBlock, Card, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";
import { useI18n, fill, localizedCaveatTitle, localizedCaveatBody } from "../i18n";
import { DEV_COPY } from "./copy/developers";

const HEX_TITLE = "Antes solo soportaba códigos clásicos";
const HEX_BODY =
  "Hasta hace poco, la mayoría de los addons construían su propio LegacyComponentSerializer.legacyAmpersand() local, que no entiende hex — cualquier &#RRGGBB o &x&R&R... se mostraba como texto literal en vez de color. Se corrigió centralizando todo en ComponentUtils, que arma el serializer con .hexColors() — ese único flag ya habilita ambos formatos hex al deserializar (el método .useUnusualXRepeatedCharacterHexFormat() solo afecta cómo se vuelve a serializar, no qué se puede leer).";

const GUI_TITLE = "Bug corregido: reopen() necesita open(), no solo build()";
const GUI_BODY =
  "Durante bastante tiempo, el reopen() privado de cada navegador solo llamaba a build() (redibuja el Inventory del navegador, pero ese objeto ya no es el que el jugador está viendo — está viendo el del editor). El resultado: apretar “Volver” no hacía nada visible, y además el click-listener seguía apuntando al editor. Se corrigió cambiando esos reopen() para que llamen a open() en vez de build() — open() sí redibuja, re-registra y vuelve a mostrar el inventario correcto. Esto se tocó en 59 archivos a lo largo de todo el ecosistema.";

export function Architecture({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = DEV_COPY[locale].architecture;

  return (
    <>
      <PageHeader title={c.title} slug="arquitectura">
        {c.intro}
      </PageHeader>

      <SectionHeading id="modulos">{c.modulesTitle}</SectionHeading>
      <p>{c.modulesLead}</p>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <h3 className="mb-1 font-mono font-semibold" style={{ color: "var(--ruby)" }}>
            api
          </h3>
          <p className="text-sm" style={{ color: "var(--text-dim)" }}>
            {fill(c.apiCard, {
              types: (
                <>
                  <code>Race</code>, <code>PlayerClass</code>, <code>RaceManager</code>,{" "}
                  <code>ClassManager</code>, <code>StatType</code>
                </>
              ),
            })}
          </p>
        </Card>
        <Card>
          <h3 className="mb-1 font-mono font-semibold" style={{ color: "var(--ruby)" }}>
            common
          </h3>
          <p className="text-sm" style={{ color: "var(--text-dim)" }}>
            {fill(c.commonCard, {
              managers: (
                <>
                  <code>ContentManager</code>/<code>ContentLoader</code>/<code>ContentRegistry</code>
                </>
              ),
              loader: <code>YamlLoader</code>,
            })}
          </p>
        </Card>
        <Card>
          <h3 className="mb-1 font-mono font-semibold" style={{ color: "var(--ruby)" }}>
            core
          </h3>
          <p className="text-sm" style={{ color: "var(--text-dim)" }}>
            {fill(c.coreCard, {
              deps: (
                <>
                  <code>api</code> &amp; <code>common</code>
                </>
              ),
            })}
          </p>
        </Card>
      </div>

      <SectionHeading id="grafo">{c.graphTitle}</SectionHeading>
      <CodeBlock
        language="text"
        code={
          "core   ──depends on──▶  api\n" +
          "core   ──depends on──▶  common\n" +
          `api    ──depends on──▶  common   ${c.graphNote}\n` +
          `common ──depends on──▶  ${c.graphNothing}\n`
        }
      />
      <Callout tone="info">
        {fill(c.graphCallout, {
          facade: <code>RPGRollAPI</code>,
          rpgPlayer: <code>RPGPlayer</code>,
          events: (
            <>
              <code>PlayerLevelUpEvent</code>, <code>PlayerJoinJobEvent</code>, <code>PlayerLeaveJobEvent</code>
            </>
          ),
          core: <code>core</code>,
          pkg: <code>com.sack.rpgroll.api</code>,
          api: <code>api</code>,
        })}
      </Callout>

      <SectionHeading id="paquetes">{c.packagesTitle}</SectionHeading>
      <CodeBlock
        language="text"
        code={
          "com.sack.rpgroll/\n" +
          `├── command/            ${c.pkgCommand}\n` +
          `├── config/              ${c.pkgConfig}\n` +
          `├── core/                ${c.pkgCore}\n` +
          `├── database/            ${c.pkgDatabase}\n` +
          "├── gameplay/\n" +
          "│   ├── combat/           CombatStats, CombatTracker, ResourceRegenTask\n" +
          "│   ├── job/              Job, JobManager, JobRewardService\n" +
          "│   ├── levelup/          LevelUpRewards(Config), PlayerLevelUpHandler\n" +
          "│   ├── skill/            Skill, SkillManager, SkillCooldownTracker\n" +
          "│   ├── stats/            StatPointAllocator\n" +
          "│   └── trait/            Trait, TraitManager, TraitEffect\n" +
          `├── gui/                  ${c.pkgGui}\n` +
          `├── player/               ${c.pkgPlayer}\n` +
          "├── playerclass/          ClassManagerImpl, ClassParser\n" +
          "├── race/                 RaceManagerImpl, RaceParser, RaceAttributeApplier\n" +
          `└── integration/         ${c.pkgIntegration}\n`
        }
      />

      <SectionHeading id="bootstrap">{c.bootstrapTitle}</SectionHeading>
      <p>
        {fill(c.bootstrapBody, {
          onEnable: <code>RPGRoll.onEnable()</code>,
          bootstrap: <code>core.Bootstrap</code>,
          registry: <code>ServiceRegistry</code>,
          map: <code>Map&lt;Class, Object&gt;</code>,
        })}
      </p>
      <Callout tone="warning">
        {fill(c.bootstrapWarn, {
          get: <code>ServiceRegistry.get(Clase.class)</code>,
          exception: <code>IllegalStateException</code>,
          register: <code>registerCoreServices()</code>,
        })}
      </Callout>

      <SectionHeading id="empaquetado">{c.shadowTitle}</SectionHeading>
      <p>
        {fill(c.shadowBody, {
          file: <code>core/build.gradle.kts</code>,
          shadow: <code>com.gradleup.shadow</code>,
          jar: <code>core-&lt;version&gt;.jar</code>,
          modules: (
            <>
              <code>api</code> + <code>common</code> + <code>core</code>
            </>
          ),
          driver: <code>sqlite-jdbc</code>,
          relocated: <code>com.sack.rpgroll.libs.sqlite</code>,
        })}
      </p>
      <CodeBlock
        language="text"
        code={
          "core/build/libs/\n" +
          `├── core-0.1.0.jar          ← ${c.shadowJar}\n` +
          `└── core-0.1.0-plain.jar    ← ${c.shadowPlain}\n`
        }
      />

      <SectionHeading id="addons">{c.addonsTitle}</SectionHeading>
      <p>
        {c.addonsBody1}{" "}
        <button type="button" className="underline" onClick={() => onNavigate("npcs")}>
          RPGRoll-NPCs
        </button>{" "}
        {fill(c.addonsBody2, {
          build: <code>build.gradle.kts</code>,
          pluginYml: <code>plugin.yml</code>,
          addonConv: <code>rpgroll.addon-conventions</code>,
          pluginConv: <code>rpgroll.plugin-conventions</code>,
          compileApi: <code>compileOnly(project(":api"))</code>,
          compileCommon: <code>compileOnly(project(":common"))</code>,
          core: <code>core</code>,
          classes: (
            <>
              <code>InventoryGUI</code>, <code>ItemBuilder</code>, <code>RPGRollAPI</code>
            </>
          ),
          compileCore: <code>compileOnly(project(":core"))</code>,
          addonConvShort: <code>addon-conventions</code>,
          api: <code>api</code>,
        })}
      </p>
      <Callout tone="tip" title={c.addonsTipTitle}>
        {fill(c.addonsTipBody, {
          npcs: <code>npcs</code>,
          shadow: <code>com.gradleup.shadow</code>,
          core: <code>core</code>,
        })}
      </Callout>

      <SectionHeading id="componentutils">{c.textTitle}</SectionHeading>
      <p>
        {fill(c.textBody, {
          parse: <code>com.sack.rpgroll.util.ComponentUtils#parse(String)</code>,
          component: <code>Component</code>,
          serializer: <code>LegacyComponentSerializer</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thFormat}</Th>
          <Th>{c.thExample}</Th>
          <Th>{c.thEngine}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td>{c.fLegacy}</Td>
            <Td className="font-mono text-xs">&amp;l&amp;bArquero</Td>
            <Td>LegacyComponentSerializer</Td>
          </Tr>
          <Tr>
            <Td>{c.fHexChar}</Td>
            <Td className="font-mono text-xs">&amp;#54DAF4B&amp;#54C8EBi&amp;#54B7E2r...</Td>
            <Td>LegacyComponentSerializer (.hexColors())</Td>
          </Tr>
          <Tr>
            <Td>{c.fHexBungee}</Td>
            <Td className="font-mono text-xs">&amp;x&amp;5&amp;4&amp;D&amp;A&amp;F&amp;4Birdflop</Td>
            <Td>LegacyComponentSerializer (.hexColors())</Td>
          </Tr>
          <Tr>
            <Td>{c.fMiniMessage}</Td>
            <Td className="font-mono text-xs">{"<gradient:#54daf4:#545eb6>Birdflop</gradient>"}</Td>
            <Td>{fill(c.eMiniMessage, { tag: <code>{"<...>"}</code> })}</Td>
          </Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title={localizedCaveatTitle("arquitectura", HEX_TITLE, locale)}>
        {localizedCaveatBody("arquitectura", HEX_TITLE, HEX_BODY, locale)}
      </Callout>
      <p>
        <strong>{c.exceptionsStrong}</strong>
        {fill(c.exceptionsBody, {
          srp: <code>SackResourcePack</code>,
          core: <code>core</code>,
          engine: <code>DistributionEngine</code>,
          chat: <code>RPGRoll-Chat</code>,
          legacy: <code>ChatTextFormat.LEGACY</code>,
          mini: <code>ChatTextFormat.MINIMESSAGE</code>,
          utils: <code>ComponentUtils</code>,
        })}
      </p>

      <SectionHeading id="tabcompleteutil">{c.tabTitle}</SectionHeading>
      <p>
        {fill(c.tabBody, {
          rpg: <code>/rpg</code>,
          completer: <code>TabCompleter</code>,
          executor: <code>CommandExecutor</code>,
          util: <code>com.sack.rpgroll.util.TabCompleteUtil</code>,
        })}
      </p>
      <CodeBlock
        language="java"
        filename={c.tabFile}
        code={
          "public class MobAdminCommand implements CommandExecutor, TabCompleter {\n\n" +
          "    @Override\n" +
          "    public List<String> onTabComplete(CommandSender sender, Command command, String alias, String[] args) {\n" +
          "        if (args.length == 1) {\n" +
          "            return TabCompleteUtil.filter(args[0], SUBCOMMANDS);\n" +
          "        }\n" +
          '        if (args.length == 3 && "create".equalsIgnoreCase(args[0])) {\n' +
          "            return TabCompleteUtil.spawnableEntityTypes(args[2]);\n" +
          "        }\n" +
          "        // ...\n" +
          "    }\n" +
          "}\n"
        }
      />
      <Callout tone="tip" title={c.tabTipTitle}>
        {fill(c.tabTipBody, { cmd: <code>SrpCommand</code>, util: <code>TabCompleteUtil</code> })}
      </Callout>

      <SectionHeading id="gui-back-navigation">{c.guiTitle}</SectionHeading>
      <p>
        {fill(c.guiBody, {
          base: <code>com.sack.rpgroll.gui.InventoryGUI</code>,
          open: <code>open()</code>,
          build: <code>build()</code>,
          listener: <code>GUIListener</code>,
          show: <code>player.openInventory(...)</code>,
          runnable: <code>Runnable onBack</code>,
          reopen: <code>browserInstance::reopen</code>,
        })}
      </p>
      <Callout tone="warning" title={localizedCaveatTitle("arquitectura", GUI_TITLE, locale)}>
        {localizedCaveatBody("arquitectura", GUI_TITLE, GUI_BODY, locale)}
      </Callout>

      <PrevNext current="arquitectura" onNavigate={onNavigate} />
    </>
  );
}
