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
  Badge,
  PrevNext,
  YamlBuilder,
  type YamlField,
} from "../components/ui";
import { useI18n, fill } from "../i18n";
import { TAB_COPY, type TabCopy } from "./copy/tab";

const profileFields = (c: TabCopy): YamlField[] => [
  { key: "id", label: c.pfId, type: "string", default: "nuevo_perfil", placeholder: "default" },
  { key: "tablist", label: c.pfTablist, type: "string", placeholder: "default" },
  { key: "scoreboard", label: c.pfScoreboard, type: "string", placeholder: "default" },
  { key: "nametag", label: c.pfNametag, type: "string", placeholder: "default" },
  { key: "belowname", label: c.pfBelowname, type: "string", placeholder: "default" },
  { key: "teams", label: c.pfTeams, type: "string", placeholder: "default" },
  { key: "sorting", label: c.pfSorting, type: "string", placeholder: "default" },
  { key: "bossbar", label: c.pfBossbar, type: "string", placeholder: "" },
  { key: "layout", label: c.pfLayout, type: "string", placeholder: "" },
];

const contextFields = (c: TabCopy): YamlField[] => [
  { key: "id", label: c.cfId, type: "string", default: "nuevo_contexto", placeholder: "vip" },
  { key: "priority", label: c.cfPriority, type: "number", default: "0" },
  { key: "profile", label: c.cfProfile, type: "string", placeholder: "" },
  { key: "tablist", label: c.cfTablist, type: "string", placeholder: "" },
  { key: "scoreboard", label: c.cfScoreboard, type: "string", placeholder: "" },
  { key: "nametag", label: c.cfNametag, type: "string", placeholder: "" },
  { key: "bossbar", label: c.cfBossbar, type: "string", placeholder: "" },
];

export function Tab({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = TAB_COPY[locale];

  return (
    <>
      <PageHeader title={c.title}>
        {fill(c.intro, { ph: <code>{"{placeholder}"}</code> })}
      </PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, ProtocolLib, PlaceholderAPI]"} />
      <p>
        {fill(c.reqBody, {
          indep: <em>{c.indepWord}</em>,
          internals: (
            <>
              <code>{"{player}"}</code>, <code>{"{ping}"}</code>, <code>{"{health}"}</code>...
            </>
          ),
          ext: <code>{"%addon_x%"}</code>,
        })}
      </p>

      <SectionHeading id="filosofia">{c.philTitle}</SectionHeading>
      <p>
        {fill(c.philBody, {
          registry: <code>TABPlaceholderRegistry</code>,
          native: (
            <>
              <code>world</code>/<code>permission</code>/<code>gamemode</code>/<code>dimension</code>/
              <code>weather</code>
            </>
          ),
          generic: <code>placeholder</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        code={
          "conditions:\n" +
          "  - type: world\n" +
          "    value: dungeon_world\n" +
          "  - type: placeholder\n" +
          '    placeholder: "{dungeon_id}"\n' +
          "    operator: NOT_EMPTY\n" +
          "  - type: placeholder\n" +
          '    placeholder: "{guild_name}"\n' +
          "    operator: EQUALS\n" +
          "    value: Knights\n"
        }
      />

      <SectionHeading id="arquitectura">{c.archTitle}</SectionHeading>
      <p>
        {fill(c.archBody, {
          scoreboard: <code>Scoreboard</code>,
          all: <em>{c.allWord}</em>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thElement}</Th>
          <Th>{c.thMechanism}</Th>
          <Th>{c.thNeedsPL}</Th>
        </Thead>
        <tbody>
          <Tr><Td>{c.elHeaderFooter}</Td><Td>Adventure <code>Player#sendPlayerListHeaderAndFooter</code></Td><Td><Badge tone="green">{c.noWord}</Badge></Td></Tr>
          <Tr><Td>{c.elTabName}</Td><Td><code>Player#playerListName</code></Td><Td><Badge tone="green">{c.noWord}</Badge></Td></Tr>
          <Tr><Td>{c.elOrder}</Td><Td>{c.mOrder}</Td><Td><Badge tone="green">{c.noWord}</Badge></Td></Tr>
          <Tr><Td>{c.elMultiline}</Td><Td>{fill(c.mMultiline, { display: <code>TextDisplay</code>, transform: <code>Transformation</code> })}</Td><Td><Badge tone="green">{c.noWord}</Badge></Td></Tr>
          <Tr><Td>{c.elStaffTag}</Td><Td>{fill(c.mStaffTag, { api: <><code>Entity#setVisibleByDefault(false)</code> + <code>showEntity</code>/<code>hideEntity</code></> })}</Td><Td><Badge tone="green">{c.noWord}</Badge></Td></Tr>
          <Tr><Td>{c.elBelowName}</Td><Td>{fill(c.mBelowName, { slot: <code>DisplaySlot.BELOW_NAME</code> })}</Td><Td><Badge tone="green">{c.noWord}</Badge></Td></Tr>
          <Tr><Td>{c.elLongLines}</Td><Td>{fill(c.mLongLines, { range: <><code>§0</code>-<code>§f</code></> })}</Td><Td><Badge tone="green">{c.noWord}</Badge></Td></Tr>
          <Tr><Td>{c.elBossBars}</Td><Td>{fill(c.mBossBars, { bossbar: <code>BossBar</code> })}</Td><Td><Badge tone="green">{c.noWord}</Badge></Td></Tr>
          <Tr><Td>{c.elVisibility}</Td><Td>{fill(c.mVisibility, { flag: <code>UPDATE_LISTED</code>, packet: <code>PLAYER_INFO</code> })}</Td><Td><Badge tone="amber">{c.yesWord}</Badge></Td></Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title={c.layoutTitle}>
        {fill(c.layoutBody, {
          noForce: <strong>{c.noForceWord}</strong>,
          order: <em>{c.orderWord}</em>,
        })}
      </Callout>

      <SectionHeading id="motor-de-contexto">{c.ctxTitle}</SectionHeading>
      <p>
        {fill(c.ctxBody, {
          refresh: <code>TABAPI.get().player(p).refresh()</code>,
          priority: <code>priority</code>,
          profile: <code>TABProfile</code>,
          profileDungeon: <code>profile: dungeon</code>,
          profileField: <code>profile</code>,
          sbCombat: <code>scoreboard: combat</code>,
        })}
      </p>

      <SectionHeading id="perfiles">{c.profilesTitle}</SectionHeading>
      <p>
        {fill(c.profilesBody, {
          profile: <code>TABProfile</code>,
          mustExist: <strong>{fill(c.mustExistWord, { d: <code>default</code> })}</strong>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="profiles/default.yml"
        code={
          "id: default\n" +
          "tablist: default\n" +
          "scoreboard: default\n" +
          "nametag: default\n" +
          "belowname: default\n" +
          "teams: default\n" +
          "sorting: default\n"
        }
      />
      <YamlBuilder
        title={c.bProfile}
        description={c.bProfileDesc}
        folder="profiles"
        fields={profileFields(c)}
      />

      <SectionHeading id="contextos">{c.contextsTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="contexts/vip.yml"
        code={
          "id: vip\n" +
          "priority: 10\n" +
          "\n" +
          "conditions:\n" +
          "  - type: permission\n" +
          "    value: rpgrolltab.vip\n" +
          "\n" +
          "# profile vacío = override PARCIAL sobre lo que ya haya resuelto\n" +
          "tablist: vip\n"
        }
      />
      <YamlBuilder
        title={c.bContext}
        description={c.bContextDesc}
        folder="contexts"
        fields={contextFields(c)}
      />

      <SectionHeading id="tablist">{c.tablistTitle}</SectionHeading>
      <p>
        {fill(c.tablistBody, {
          anims: (
            <>
              <code>header.animation</code>/<code>footer.animation</code>
            </>
          ),
          animDef: <code>AnimationDefinition</code>,
          interval: <code>interval</code>,
          lines: <code>lines</code>,
          playerFormat: <code>player-format</code>,
          prefixSuffix: (
            <>
              <code>{"{prefix}"}</code>/<code>{"{suffix}"}</code>
            </>
          ),
          pingFmt: <code>{"{ping_formatted}"}</code>,
          ping: <code>ping</code>,
          gmFmt: <code>{"{gamemode_formatted}"}</code>,
          gmEnabled: <code>gamemode.enabled: true</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="tablists/default.yml"
        code={
          "id: default\n" +
          "\n" +
          "header:\n" +
          "  animation: rpgroll_title\n" +
          "  lines:\n" +
          '    - "&6&lRPGRoll"\n' +
          '    - "&7Bienvenido, &f{player}"\n' +
          '    - ""\n' +
          "\n" +
          "footer:\n" +
          "  lines:\n" +
          '    - ""\n' +
          '    - "&7Jugadores: &f{online}&7/&f{max}"\n' +
          '    - "&6play.example.com"\n' +
          "\n" +
          'player-format: "{prefix}{player}{suffix} &8- {ping_formatted}"\n' +
          "\n" +
          "ping:\n" +
          '  - format: "&a{ping}ms"\n' +
          "    max: 50\n" +
          '  - format: "&e{ping}ms"\n' +
          "    max: 100\n" +
          '  - format: "&c{ping}ms"\n' +
          "\n" +
          "worlds: []  # vacío = sin restricción de mundo\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="animations/rpgroll_title.yml"
        code={
          "id: rpgroll_title\n" +
          "type: FRAME\n" +
          "interval: 10\n" +
          "frames:\n" +
          '  - "&6&lRPGRoll"\n' +
          '  - "&e&lRPGRoll"\n' +
          '  - "&f&lRPGRoll"\n' +
          '  - "&e&lRPGRoll"\n'
        }
      />
      <p>
        {fill(c.animBody, {
          frame: <code>FRAME</code>,
          scroll: <code>SCROLL</code>,
          text: <code>text</code>,
          blink: <code>BLINK</code>,
          textEmpty: <code>text</code>,
        })}
      </p>

      <SectionHeading id="sorting">{c.sortingTitle}</SectionHeading>
      <p>
        {fill(c.sortingBody, {
          priority: <code>priority</code>,
          natives: (
            <>
              <code>permission</code>/<code>ping</code>/<code>world</code>/<code>online-time</code>
            </>
          ),
          rules: <code>rules</code>,
          values: <code>values</code>,
          permission: <code>permission</code>,
          numeric: <code>numeric</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="sortings/default.yml"
        code={
          "id: default\n" +
          "priority:\n" +
          "  - permission\n" +
          "  - ping\n" +
          "  - name\n" +
          "\n" +
          "# equivalente explícito:\n" +
          "# rules:\n" +
          '#   - field: permission\n' +
          '#     values: ["rpgrolltab.staff", "rpgrolltab.vip"]\n' +
          "#     order: DESC\n" +
          '#   - placeholder: "{rpgroll_level}"\n' +
          "#     order: DESC\n" +
          "#     numeric: true\n" +
          "#   - field: name\n" +
          "#     order: ASC\n"
        }
      />

      <SectionHeading id="teams-nametag">{c.teamsTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="teams/default.yml"
        code={
          "id: default\n" +
          'prefix: ""\n' +
          'suffix: ""\n' +
          "color: white\n" +
          "friendly-fire: true\n" +
          "see-friendly-invisibles: true\n" +
          "collision: ALWAYS\n" +
          "nametag-visibility: ALWAYS\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="nametags/default.yml"
        code={
          "id: default\n" +
          "lines:\n" +
          '  - "&8[&f{world}&8]"\n' +
          '  - "{player}"\n' +
          "\n" +
          "# Sección 11: nametag distinto según quién mira\n" +
          "staff-override:\n" +
          '  permission: "rpgrolltab.staff"\n' +
          "  lines:\n" +
          '    - "&c&l[STAFF]"\n' +
          '    - "{player}"\n'
        }
      />
      <Callout tone="tip" title={c.staffTitle}>
        {fill(c.staffBody, { engine: <code>NametagEngine</code> })}
      </Callout>

      <SectionHeading id="belowname">{c.belowTitle}</SectionHeading>
      <p>
        {fill(c.belowBody, {
          number: <strong>{c.numberWord}</strong>,
          score: <code>score</code>,
          label: <code>label</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="belownames/default.yml"
        code={'id: default\nscore: "{health}"\nlabel: "&c❤"\n'}
      />

      <SectionHeading id="scoreboard">{c.sbTitle}</SectionHeading>
      <p>
        {fill(c.sbBody, {
          lineShape: <code>{"{text, condition}"}</code>,
          condition: <code>condition</code>,
          ops: (
            <>
              <code>==</code>/<code>!=</code>/<code>&gt;</code>/<code>&gt;=</code>/<code>&lt;</code>/
              <code>&lt;=</code>
            </>
          ),
          extends: (
            <>
              <code>extends</code> + <code>replacements</code>
            </>
          ),
          inherited: (
            <>
              <code>title</code>/<code>lines</code>
            </>
          ),
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="scoreboards/rpg_template.yml"
        code={
          "id: rpg_template\n" +
          'title: "&6&lRPGRoll"\n' +
          "lines:\n" +
          '  - text: "&7Jugador: &f{player}"\n' +
          '  - text: "&7Ping: &a{ping}ms"\n' +
          '  - text: "&c❤ Vida: &f{health}"\n' +
          '    condition: "{health} < 10"\n' +
          '  - text: "&a❤ Vida: &f{health}"\n' +
          '    condition: "{health} >= 10"\n' +
          '  - text: "&6{server}"\n' +
          "priority: 0\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="scoreboards/default.yml"
        code={
          "id: default\n" +
          "extends: rpg_template\n" +
          "replacements:\n" +
          '  server: "play.example.com"\n' +
          "priority: 0\n"
        }
      />
      <p>
        {fill(c.sbMultiBody, {
          profileSb: <code>profile.scoreboard</code>,
          priority: <code>priority</code>,
        })}
      </p>

      <SectionHeading id="bossbars">{c.bossTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="bossbars/example_event.yml"
        code={
          "id: example_event\n" +
          'title: "&4&l{player} &7— &cEvento de temporada"\n' +
          'progress: "100"\n' +
          "color: RED\n" +
          "style: SEGMENTED_10\n" +
          "priority: 10\n"
        }
      />
      <p>{c.bossBody}</p>

      <SectionHeading id="api">{c.apiTitle}</SectionHeading>
      <CodeBlock
        language="java"
        code={
          "TABAPI tab = TABAPI.get();\n\n" +
          "// Refrescar / forzar perfil de un jugador\n" +
          "tab.player(player).refresh();\n" +
          'tab.player(player).setProfile("dungeon");\n\n' +
          "// Registrar un placeholder — sin conocer PlaceholderAPI\n" +
          'tab.placeholders().register("guild_name", p -> guildService.getGuild(p).name());\n\n' +
          "// Perfil de evento temporal, servidor completo\n" +
          'tab.registerProfile("summer_event", profile);\n' +
          'tab.activateProfile("summer_event");\n' +
          "// ... más tarde:\n" +
          "tab.deactivateEventProfile();\n"
        }
      />
      <p>{fill(c.eventsIntro, { pkg: <code>com.sack.rpgroll.tab.event</code> })}</p>
      <Table>
        <Thead>
          <Th>{c.thEvent}</Th>
          <Th>{c.thWhen}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">TabProfileChangeEvent</Td><Td>{c.evProfile}</Td></Tr>
          <Tr><Td className="font-mono text-xs">ScoreboardChangeEvent</Td><Td>{c.evScoreboard}</Td></Tr>
          <Tr><Td className="font-mono text-xs">NametagUpdateEvent</Td><Td>{c.evNametag}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PlayerVisibilityEvent</Td><Td>{c.evVisibility}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PlaceholderRequestEvent</Td><Td>{c.evPlaceholder}</Td></Tr>
          <Tr><Td className="font-mono text-xs">LayoutChangeEvent</Td><Td>{c.evLayout}</Td></Tr>
          <Tr><Td className="font-mono text-xs">BossBarCreateEvent / BossBarRemoveEvent</Td><Td>{c.evBossBar}</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="comandos">{c.cmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/tabadmin reload</Td><Td>{c.xReload}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/tabadmin list</Td><Td>{c.xList}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/tabadmin profile <jugador> <perfil>"}</Td><Td>{c.xProfile}</Td></Tr>
        </tbody>
      </Table>
      <p>{fill(c.permNote, { perm: <Badge tone="amber">rpgrolltab.admin.*</Badge> })}</p>

      <Callout tone="info" title={c.designerTitle}>
        {fill(c.designerBody, {
          link: (
            <a href="/tab-designer" className="underline">
              {c.designerLink}
            </a>
          ),
          parser: <code>*Parser.java</code>,
        })}
      </Callout>

      <PrevNext current="tab" onNavigate={onNavigate} />
    </>
  );
}
