import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";
import { pageTitle } from "../content/nav";
import { useI18n, fill, localizedPageLabel, localizedCaveatTitle, localizedCaveatBody } from "../i18n";
import { DEV_COPY } from "./copy/developers";

const CAVEAT_TITLE = "get() lanza una excepción si RPGRoll no está listo";
const CAVEAT_BODY =
  "RPGRollAPI.get() lanza IllegalStateException si se llama antes de que RPGRoll termine de arrancar. Si tu addon quiere integrarse de forma opcional (sin depend obligatorio), usá RPGRollAPI.isReady() para chequear en runtime antes de llamar a get().";

export function Api({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = DEV_COPY[locale].api;

  const methods: [string, React.ReactNode][] = [
    ["getPlayer(UUID uuid)", "Optional<RPGPlayer>"],
    ["hasCompletedCharacter(UUID uuid)", c.rShortcut],
    ["getPlayerManager()", "PlayerManager"],
    ["getRaceManager()", `RaceManager (${c.rPublicIface})`],
    ["getClassManager()", `ClassManager (${c.rPublicIface})`],
    ["getSkillManager()", "SkillManager"],
    ["getTraitManager()", "TraitManager"],
    ["getJobManager()", "JobManager"],
    ["getEconomyProvider()", "VaultEconomyProvider"],
    ["getExperienceBonusService()", `ExperienceBonusService — ${c.rBonusService}`],
    ["getVersion()", c.rVersion],
  ];

  return (
    <>
      <PageHeader title={c.title} slug="api">
        {fill(c.intro, {
          get: <code>RPGRollAPI.get()</code>,
          pkg1: <code>com.sack.rpgroll.api</code>,
          pkg2: <code>com.sack.rpgroll.api.event</code>,
        })}
      </PageHeader>

      <SectionHeading id="setup">{c.setupTitle}</SectionHeading>
      <ol>
        <li>
          {fill(c.s1, { depend: <code>depend: [RPGRoll]</code>, pluginYml: <code>plugin.yml</code> })}
        </li>
        <li>
          {fill(c.s2, {
            compileOnly: <code>compileOnly</code>,
            gradle: <code>./gradlew publishToMavenLocal</code>,
          })}
        </li>
        <li>
          {fill(c.s3, { get: <code>RPGRollAPI.get()</code>, onEnable: <code>onEnable()</code> })}
        </li>
      </ol>

      <CodeBlock
        language="java"
        filename="MiAddon.java"
        code={
          "public class MiAddon extends JavaPlugin {\n" +
          "    @Override\n" +
          "    public void onEnable() {\n" +
          "        RPGRollAPI api = RPGRollAPI.get();\n" +
          "        getServer().getPluginManager().registerEvents(new MiListener(api), this);\n" +
          "    }\n" +
          "}\n"
        }
      />

      <Callout tone="warning" title={localizedCaveatTitle("api", CAVEAT_TITLE, locale)}>
        {localizedCaveatBody("api", CAVEAT_TITLE, CAVEAT_BODY, locale)}
      </Callout>

      <SectionHeading id="metodos">{c.methodsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thMethod}</Th>
          <Th>{c.thReturns}</Th>
        </Thead>
        <tbody>
          {methods.map(([name, ret]) => (
            <Tr key={name}>
              <Td className="font-mono text-xs">{name}</Td>
              <Td>{ret}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <Callout tone="info">
        {fill(c.concreteNote, {
          classes: (
            <>
              <code>RPGPlayer</code>, <code>PlayerManager</code>, <code>JobManager</code>,{" "}
              <code>SkillManager</code> &amp; <code>TraitManager</code>
            </>
          ),
          core: <code>core</code>,
          api: <code>api</code>,
          ifaces: (
            <>
              <code>RaceManager</code>/<code>ClassManager</code>
            </>
          ),
        })}
      </Callout>

      <SectionHeading id="eventos">{c.eventsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thEvent}</Th>
          <Th>{c.thCancellable}</Th>
          <Th>{c.thWhen}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">CharacterCreatedEvent</Td>
            <Td>{c.no}</Td>
            <Td>{c.evCreated}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">PlayerLevelUpEvent</Td>
            <Td>{c.no}</Td>
            <Td>{fill(c.evLevelUp, { rpgPlayer: <code>RPGPlayer</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">PlayerJobLevelUpEvent</Td>
            <Td>{c.no}</Td>
            <Td>{c.evJobLevelUp}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">PlayerJoinJobEvent</Td>
            <Td>
              <strong>{c.yes}</strong>
            </Td>
            <Td>{c.evJoinJob}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">PlayerLeaveJobEvent</Td>
            <Td>{c.no}</Td>
            <Td>{c.evLeaveJob}</Td>
          </Tr>
        </tbody>
      </Table>

      <CodeBlock
        language="java"
        filename={c.exampleFile}
        code={
          "public class MiListener implements Listener {\n\n" +
          "    @EventHandler\n" +
          "    public void onJoinJob(PlayerJoinJobEvent event) {\n" +
          "        if (event.getRpgPlayer().getLevel() < 10) {\n" +
          "            event.setCancelled(true);\n" +
          '            event.getPlayer().sendMessage("Necesitas nivel 10 para este trabajo.");\n' +
          "        }\n" +
          "    }\n\n" +
          "    @EventHandler\n" +
          "    public void onLevelUp(PlayerLevelUpEvent event) {\n" +
          '        Bukkit.broadcastMessage(event.getPlayer().getName() + " alcanzó el nivel " + event.getNewLevel() + "!");\n' +
          "    }\n" +
          "}\n"
        }
      />

      <SectionHeading id="bonos-exp">{c.expTitle}</SectionHeading>
      <p>
        {fill(c.expBody, {
          service: <code>ExperienceBonusService</code>,
          perm: <code>rpgroll.exp.bonus.&lt;n&gt;</code>,
        })}
      </p>
      <CodeBlock
        language="java"
        code={
          "ExperienceBonusService bonus = RPGRollAPI.get().getExperienceBonusService();\n" +
          "\n" +
          "// En porcentaje: +25% mientras dure el evento.\n" +
          'bonus.registerSource("miaddon:evento", player -> eventoActivo ? 25 : 0);\n' +
          "\n" +
          "// En onDisable:\n" +
          'bonus.unregisterSource("miaddon:evento");\n'
        }
      />

      <SectionHeading id="sin-core">{c.noCoreTitle}</SectionHeading>
      <p>
        {fill(c.noCoreBody, {
          depend: <code>depend: [RPGRoll-Lib]</code>,
          soft: <code>softdepend: [RPGRoll]</code>,
          pluginYml: <code>plugin.yml</code>,
          common: <code>compileOnly(project(":common"))</code>,
          get: <code>Characters.get()</code>,
        })}
      </p>
      <CodeBlock
        language="java"
        filename="MiAddon.java"
        code={
          "import com.sack.rpgroll.common.character.CharacterLevelUpEvent;\n" +
          "import com.sack.rpgroll.common.character.Characters;\n" +
          "import com.sack.rpgroll.common.integration.VaultEconomy;\n" +
          "\n" +
          "// Nivel del personaje; 0 si no hay core o el jugador no tiene personaje.\n" +
          "int level = Characters.get().map(c -> c.level(player.getUniqueId())).orElse(0);\n" +
          "\n" +
          "// EXP con los bonos del jugador (rango, prestigio), guardada.\n" +
          "Characters.get().ifPresent(c ->\n" +
          "        c.addExperience(player.getUniqueId(), c.boostExperience(player, 150)));\n" +
          "\n" +
          "// Dinero por Vault, sea cual sea el proveedor de economía.\n" +
          "VaultEconomy.get().ifPresent(economy -> economy.depositPlayer(player, 250));\n" +
          "\n" +
          "// Solo llega si el core está instalado.\n" +
          "@EventHandler\n" +
          "public void onLevelUp(CharacterLevelUpEvent event) {\n" +
          '    event.getPlayer().sendMessage("Nivel " + event.getNewLevel());\n' +
          "}\n"
        }
      />
      <p>{fill(c.noCoreIface, { iface: <code>RPGCharacters</code> })}</p>
      <CodeBlock
        language="java"
        filename="RPGCharacters.java"
        code={
          "boolean hasCharacter(UUID player);\n" +
          "int level(UUID player);\n" +
          "long experience(UUID player);\n" +
          "Optional<String> race(UUID player);\n" +
          "Optional<String> playerClass(UUID player);\n" +
          "boolean hasJob(UUID player, String jobId);\n" +
          "int jobLevel(UUID player, String jobId);\n" +
          "Set<String> activeJobs(UUID player);\n" +
          "boolean hasTrait(UUID player, String traitId);\n" +
          "boolean hasSkill(UUID player, String skillId);\n" +
          "int mana(UUID player);\n" +
          "int maxMana(UUID player);\n" +
          "void addExperience(UUID player, int amount);   // tal cual, sin bonos\n" +
          "int boostExperience(Player player, int base);  // base + bonos del jugador\n" +
          "void learnSkill(UUID player, String skillId);\n" +
          "void joinJob(UUID player, String jobId);\n" +
          "boolean isPlayerPlaced(Block block);           // lo puso un jugador\n"
        }
      />

      <SectionHeading id="donde-viven">{c.whereTitle}</SectionHeading>
      <p>
        {fill(c.whereBody, {
          apiTypes: (
            <>
              <code>Race</code>, <code>PlayerClass</code>, <code>RaceManager</code>, <code>ClassManager</code>{" "}
              &amp; <code>StatType</code>
            </>
          ),
          apiEvents: (
            <>
              <code>CharacterCreatedEvent</code>, <code>PlayerJobLevelUpEvent</code>
            </>
          ),
          api: <code>api</code>,
          core: <code>core</code>,
          facade: <code>RPGRollAPI</code>,
          rpgPlayer: <code>RPGPlayer</code>,
          pkg: <code>com.sack.rpgroll.api</code>,
        })}{" "}
        <button type="button" className="underline" onClick={() => onNavigate("arquitectura")}>
          {localizedPageLabel("arquitectura", pageTitle("arquitectura"), locale)}
        </button>
        .
      </p>

      <PrevNext current="api" onNavigate={onNavigate} />
    </>
  );
}
