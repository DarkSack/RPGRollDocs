import { PageHeader, SectionHeading, Callout, Badge, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";
import { commands } from "../content/commands";

export function Commands({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const playerCommands = commands.filter((c) => c.category === "jugador");
  const adminCommands = commands.filter((c) => c.category === "admin");

  return (
    <>
      <PageHeader title="Comandos">
        Todo pasa por un único comando raíz: <code>/rpg</code> (alias <code>/rpgroll</code>, <code>/dnd</code>).
        Sin argumentos muestra la ayuda con los comandos que el que ejecuta tiene permiso de ver.
      </PageHeader>

      <SectionHeading id="jugador">Comandos de jugador</SectionHeading>
      <CommandsTable rows={playerCommands} />

      <SectionHeading id="admin">Comandos de administrador</SectionHeading>
      <CommandsTable rows={adminCommands} />

      <Callout tone="info" title="Todos requieren ser jugador, con una excepción">
        <code>/rpg reload</code> puede ejecutarse también desde la consola del servidor — es el único comando que
        no requiere ser un jugador en el mundo.
      </Callout>

      <Callout tone="tip" title="Autocompletado real, no solo la lista de subcomandos">
        Además de sugerir el subcomando, <code>/rpg</code> (y el de cada addon) sugiere desde el manager de
        contenido real: <code>/rpg race &lt;Tab&gt;</code> lista razas de verdad, <code>/rpg setrace &lt;jugador&gt; &lt;Tab&gt;</code>{" "}
        también, etc. Ver el detalle técnico en{" "}
        <button className="underline" onClick={() => onNavigate("arquitectura")}>
          Arquitectura → Tab-completion
        </button>
        .
      </Callout>

      <p className="mt-6">
        Ver el árbol completo de permisos en{" "}
        <button className="underline" onClick={() => onNavigate("permisos")}>
          Permisos
        </button>
        .
      </p>

      <PrevNext current="comandos" onNavigate={onNavigate} />
    </>
  );
}

function CommandsTable({ rows }: { rows: typeof commands }) {
  return (
    <Table>
      <Thead>
        <Th>Comando</Th>
        <Th>Alias</Th>
        <Th>Permiso</Th>
        <Th>Descripción</Th>
      </Thead>
      <tbody>
        {rows.map((cmd) => (
          <Tr key={cmd.name}>
            <Td className="font-mono text-xs whitespace-nowrap text-slate-800 dark:text-slate-100">{cmd.usage}</Td>
            <Td className="text-xs">
              {cmd.aliases.length > 0 ? cmd.aliases.map((a) => `/rpg ${a}`).join(", ") : "—"}
            </Td>
            <Td className="text-xs">
              {cmd.permission ? <Badge tone="violet">{cmd.permission}</Badge> : <Badge>ninguno</Badge>}
            </Td>
            <Td>
              {cmd.description}
              {cmd.consoleAllowed && (
                <span className="mt-1 block text-xs text-slate-400">Ejecutable desde consola.</span>
              )}
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
