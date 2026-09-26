import { PageHeader, SectionHeading, Callout, Badge, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";
import { commands } from "../content/commands";
import { pageTitle } from "../content/nav";
import { useI18n, fill, localizedCommand, localizedPageLabel, type Locale } from "../i18n";
import { REFERENCE_COPY, type ReferenceCopy } from "./copy/reference";

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
        <button type="button" className="underline" onClick={() => onNavigate("arquitectura")}>
          {c.tabLink}
        </button>
        .
      </Callout>

      <p className="mt-6">
        {c.seePerms}{" "}
        <button type="button" className="underline" onClick={() => onNavigate("permisos")}>
          {localizedPageLabel("permisos", pageTitle("permisos"), locale)}
        </button>
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
