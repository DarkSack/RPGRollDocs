import { PageHeader, SectionHeading, Callout, CodeBlock, Badge, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";
import { commands } from "../content/commands";
import { pageTitle } from "../content/nav";
import { useI18n, fill, localizedCommand, localizedPageLabel, type Locale } from "../i18n";
import { REFERENCE_COPY, type ReferenceCopy } from "./copy/reference";

const mono = "whitespace-nowrap font-mono text-xs";

const LANG_EXAMPLES: [string, string, string][] = [
  ["/gremio crear", "/guild create", "/guilda criar"],
  ["/equipo invitar", "/team invite", "/equipe convidar"],
  ["/mazmorra entrar", "/dungeon enter", "/masmorra entrar"],
  ["/mision abandonar", "/quest abandon", "/missao abandonar"],
  ["/pesca enciclopedia", "/fishing encyclopedia", "/pesca enciclopedia"],
  ["/rpg estadisticas", "/rpg stats", "/rpg estatisticas"],
  ["/tienda", "/shop", "/loja"],
  ["/subasta vender", "/auction sell", "/leilao vender"],
  ["/abrir tienda", "/open shop", "/abrir loja"],
];

const THING_TYPES: [string, string, string][] = [
  ["minecraft", "—", "/dar diamond 64"],
  ["item", "RPGRoll-Items", "/dar item:medallon_del_dragon"],
  ["gema", "RPGRoll-Items", "/dar gema:<id>"],
  ["mueble", "RPGRoll-Furniture", "/dar mueble:sofa:red"],
  ["spawner", "RPGRoll-Machines", "/dar spawner:zombie"],
  ["maquina", "RPGRoll-Machines", "/dar maquina:cantera · maquina:<horno>.<nivel>"],
  ["libro", "RPGRoll-Enchantments", "/dar libro:lifesteal_3"],
  ["estacion", "RPGRoll-Enchantments", "/dar estacion:infusor · estacion:super_encantador"],
  ["llave", "RPGRoll-Crates", "/dar llave:<crate>"],
  ["lucky", "RPGRoll-Crates", "/dar lucky:<id>"],
  ["extra", "RPGRoll-Extras", "/dar extra:reforzador · extra:llave_en_blanco"],
  ["mob", "RPGRoll-Mobs", "/invocar mob:<id> 3"],
];

export function Commands({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = REFERENCE_COPY[locale].commands;

  const playerCommands = commands.filter((cmd) => cmd.category === "jugador");
  const adminCommands = commands.filter((cmd) => cmd.category === "admin");

  return (
    <>
      <PageHeader title={c.title} slug="comandos">
        {fill(c.intro, { root: <code>/rpg</code>, a1: <code>/rpgroll</code>, a2: <code>/dnd</code> })}
      </PageHeader>

      <SectionHeading id="jugador">{c.playerTitle}</SectionHeading>
      <CommandsTable rows={playerCommands} c={c} locale={locale} />

      <SectionHeading id="admin">{c.adminTitle}</SectionHeading>
      <CommandsTable rows={adminCommands} c={c} locale={locale} />

      <Callout tone="info" title={c.consoleTitle}>
        {fill(c.consoleBody, {
          list: (
            <>
              <code>/rpg reload</code>, <code>/rpg addxp</code>, <code>/rpg job</code>,{" "}
              <code>/rpg resetstats</code>, <code>/rpg restore</code>, <code>/rpg setrace</code> &amp; <code>/rpg setclass</code>
            </>
          ),
          rest: (
            <>
              <code>/rpg admincontent</code>, <code>/rpg admingui</code>, <code>/rpg levelup</code>
            </>
          ),
        })}
      </Callout>

      <Callout tone="tip" title={c.tabTitle}>
        {fill(c.tabBody, {
          root: <code>/rpg</code>,
          manager: <code>RaceManager</code>,
          ex1: <code>/rpg setrace &lt;jugador&gt; &lt;Tab&gt;</code>,
          ex2: <code>/rpg job give &lt;jugador&gt; &lt;Tab&gt;</code>,
          ex3: <code>/rpg race &lt;Tab&gt;</code>,
          ex4: <code>/rpg class &lt;Tab&gt;</code>,
        })}{" "}
        <a href="/arquitectura" className="underline">
          {c.tabLink}
        </a>
        .
      </Callout>

      <SectionHeading id="idioma">{c.langTitle}</SectionHeading>
      <p>{c.langBody}</p>
      <Table>
        <Thead>
          <Th>{c.thEs}</Th>
          <Th>{c.thEn}</Th>
          <Th>{c.thPt}</Th>
        </Thead>
        <tbody>
          {LANG_EXAMPLES.map(([es, en, pt]) => (
            <Tr key={en}>
              <Td className={mono}>{es}</Td>
              <Td className={mono}>{en}</Td>
              <Td className={mono}>{pt}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <Callout tone="tip" title={c.langDevTitle}>
        {fill(c.langDevBody, {
          file: <code>src/main/resources/command-words.yml</code>,
          cmd: <code>{"commands: <comando>: names / subcommands"}</code>,
          bridge: <code>BrigadierCommands</code>,
        })}
      </Callout>
      <CodeBlock
        language="yaml"
        filename="guilds/src/main/resources/command-words.yml"
        code={
          "commands:\n" +
          "  guild:\n" +
          "    names: {es: gremio, pt: guilda}\n" +
          "    subcommands:\n" +
          "      create: {es: crear, pt: criar}\n" +
          "      leave: {es: salir, pt: sair}"
        }
      />

      <SectionHeading id="atajos">{c.quickTitle}</SectionHeading>
      <p>{fill(c.quickBody, { thing: <code>{"<cosa>"}</code>, typed: <code>{"tipo:id"}</code> })}</p>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thAliases}</Th>
          <Th>{c.thPermission}</Th>
          <Th>{c.thDescription}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className={mono}>{"/dar [jugador] <cosa> [cantidad]"}</Td>
            <Td className="text-xs">/rgive</Td>
            <Td className="text-xs"><Badge tone="violet">rpgrolllib.dar</Badge></Td>
            <Td>{c.qDar}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>{"/invocar <criatura> [cantidad] [jugador]"}</Td>
            <Td className="text-xs">/rsummon</Td>
            <Td className="text-xs"><Badge tone="violet">rpgrolllib.invocar</Badge></Td>
            <Td>{c.qInvocar}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>{"/abrir <menú> [jugador]"}</Td>
            <Td className="text-xs">/open</Td>
            <Td className="text-xs"><Badge>{c.none}</Badge></Td>
            <Td>
              {fill(c.qAbrir, {
                cfg: <code>{"plugins/RPGRoll-Lib/config.yml → abrir:"}</code>,
                perm: <Badge tone="violet">rpgrolllib.abrir.otros</Badge>,
              })}
            </Td>
          </Tr>
        </tbody>
      </Table>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thModule}</Th>
          <Th>{c.thExample}</Th>
        </Thead>
        <tbody>
          {THING_TYPES.map(([type, module, example]) => (
            <Tr key={type}>
              <Td className={mono}>{type}</Td>
              <Td>{module}</Td>
              <Td className={mono}>{example}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <p className="mt-6">
        {c.seePerms}{" "}
        <a href="/permisos" className="underline">
          {localizedPageLabel("permisos", pageTitle("permisos"), locale)}
        </a>
        .
      </p>

      <PrevNext current="comandos" onNavigate={onNavigate} />
    </>
  );
}

function CommandsTable({
  rows,
  c,
  locale,
}: {
  rows: typeof commands;
  c: ReferenceCopy["commands"];
  locale: Locale;
}) {
  return (
    <Table>
      <Thead>
        <Th>{c.thCommand}</Th>
        <Th>{c.thAliases}</Th>
        <Th>{c.thPermission}</Th>
        <Th>{c.thDescription}</Th>
      </Thead>
      <tbody>
        {rows.map((cmd) => (
          <Tr key={cmd.name}>
            <Td className="whitespace-nowrap font-mono text-xs text-slate-800 dark:text-slate-100">{cmd.usage}</Td>
            <Td className="text-xs">
              {cmd.aliases.length > 0 ? cmd.aliases.map((a) => `/rpg ${a}`).join(", ") : "—"}
            </Td>
            <Td className="text-xs">
              {cmd.permission ? <Badge tone="violet">{cmd.permission}</Badge> : <Badge>{c.none}</Badge>}
            </Td>
            <Td>
              {localizedCommand(cmd.name, cmd.description, locale)}
              {cmd.consoleAllowed && (
                <span className="mt-1 block text-xs" style={{ color: "var(--text-faint)" }}>
                  {c.fromConsole}
                </span>
              )}
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
