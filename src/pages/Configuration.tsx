import { PageHeader, SectionHeading, Callout, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";
import { configFiles } from "../content/config";

export function Configuration({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Configuración">
        Los archivos YAML que controlan el comportamiento del plugin, generados automáticamente la primera vez que
        arranca (en <code>plugins/RPGRoll/</code>).
      </PageHeader>

      {configFiles.map((file) => (
        <div key={file.filename}>
          <SectionHeading id={file.filename.replace(".yml", "")}>{file.filename}</SectionHeading>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <code className="text-xs">{file.path}</code> — {file.description}
          </p>
          <Table>
            <Thead>
              <Th>Clave</Th>
              <Th>Tipo</Th>
              <Th>Default</Th>
              <Th>Descripción</Th>
            </Thead>
            <tbody>
              {file.keys.map((k) => (
                <Tr key={k.key}>
                  <Td className="font-mono text-xs whitespace-nowrap">{k.key}</Td>
                  <Td className="text-xs whitespace-nowrap">{k.type}</Td>
                  <Td className="text-xs whitespace-nowrap">{k.default}</Td>
                  <Td>{k.description}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}

      <Callout tone="warning" title="Claves marcadas con ⚠">
        Algunas claves de <code>gameplay.yml</code> existen en el archivo pero el código nunca las lee — quedaron
        de un diseño anterior o anticipan una función no conectada todavía (ver las notas ⚠ en la tabla de
        gameplay.yml arriba). No asumas que cambiarlas tiene efecto sin verificar contra el código.
      </Callout>

      <p className="mt-6">
        Los archivos de <strong>contenido</strong> (razas, clases, trabajos, habilidades, traits) tienen su propio
        formato — ver{" "}
        <button className="underline" onClick={() => onNavigate("razas-clases")}>
          Razas y clases
        </button>
        ,{" "}
        <button className="underline" onClick={() => onNavigate("trabajos")}>
          Trabajos
        </button>{" "}
        y{" "}
        <button className="underline" onClick={() => onNavigate("habilidades-traits")}>
          Habilidades y traits
        </button>
        .
      </p>

      <PrevNext current="configuracion" onNavigate={onNavigate} />
    </>
  );
}
