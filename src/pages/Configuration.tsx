import { PageHeader, SectionHeading, Callout, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";
import { configFiles } from "../content/config";
import { pageTitle } from "../content/nav";
import { useI18n, fill, localizedConfigFile, localizedConfigKey, localizedPageLabel } from "../i18n";
import { CONFIG_DB_COPY } from "./copy/configDatabase";

export function Configuration({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = CONFIG_DB_COPY[locale].config;

  const Go = ({ to }: { to: string }) => (
    <button type="button" className="underline" onClick={() => onNavigate(to)}>
      {localizedPageLabel(to, pageTitle(to), locale)}
    </button>
  );

  return (
    <>
      <PageHeader title={c.title} slug="configuracion">
        {fill(c.intro, { dir: <code>plugins/RPGRoll/</code> })}
      </PageHeader>

      {configFiles.map((file) => (
        <div key={file.filename}>
          <SectionHeading id={file.filename.replace(".yml", "")}>{file.filename}</SectionHeading>
          <p className="text-sm" style={{ color: "var(--text-dim)" }}>
            <code className="text-xs">{file.path}</code> —{" "}
            {localizedConfigFile(file.filename, file.description, locale)}
          </p>
          <Table>
            <Thead>
              <Th>{c.thKey}</Th>
              <Th>{c.thType}</Th>
              <Th>{c.thDefault}</Th>
              <Th>{c.thDescription}</Th>
            </Thead>
            <tbody>
              {file.keys.map((k) => (
                <Tr key={k.key}>
                  <Td className="whitespace-nowrap font-mono text-xs">{k.key}</Td>
                  <Td className="whitespace-nowrap text-xs">{k.type}</Td>
                  <Td className="whitespace-nowrap text-xs">{k.default}</Td>
                  <Td>{localizedConfigKey(k.key, k.description, locale)}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}

      <Callout tone="warning" title={c.warnTitle}>
        {fill(c.warnBody, { file: <code>gameplay.yml</code> })}
      </Callout>

      <p className="mt-6">
        {fill(c.contentNote, { content: <strong>{c.contentStrong}</strong> })} <Go to="razas-clases" />,{" "}
        <Go to="trabajos" /> {c.and} <Go to="habilidades-traits" />.
      </p>

      <PrevNext current="configuracion" onNavigate={onNavigate} />
    </>
  );
}
