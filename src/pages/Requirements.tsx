import type { ReactNode } from "react";
import { PageHeader, SectionHeading, Table, Thead, Th, Tr, Td, Badge, Callout, CodeBlock, PrevNext } from "../components/ui";
import { REQUIREMENTS, SYSTEM_META } from "../content/site";
import { addonDependencies } from "../content/integrations";
import { pageTitle } from "../content/nav";
import { useI18n, fill, localizedPageLabel, type Locale } from "../i18n";
import { REQUIREMENTS_COPY, type RequirementsCopy } from "./copy/requirements";
import { ServerIcon } from "../components/icons/Icon";

const pageLabel = (slug: string, locale: Locale) => localizedPageLabel(slug, pageTitle(slug), locale);

/** Detalle traducido de cada requisito, indexado por su etiqueta en site.ts. */
const DETAIL_KEY: Record<string, keyof RequirementsCopy> = {
  "Paper API": "detailPaper",
  SQLite: "detailSqlite",
  Vault: "detailVault",
  PlaceholderAPI: "detailPapi",
};

/**
 * Requisitos del sistema.
 *
 * Consolida lo que hasta ahora estaba repartido entre la introducción (stack
 * técnico) y la sección "Requisitos" de cada addon. Solo lista lo que el repo
 * documenta: no se declara una versión de Minecraft porque la determina el
 * build de Paper, y no está fijada en ningún lado del proyecto.
 */
export function Requirements({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { t, locale } = useI18n();
  const c = REQUIREMENTS_COPY[locale];

  const hardThirdParty = addonDependencies.filter((a) =>
    a.hard.some((d) => d !== "RPGRoll" && !d.startsWith("RPGRoll-")),
  );

  const Go = ({ to, children }: { to: string; children: ReactNode }) => (
    <button type="button" className="underline" onClick={() => onNavigate(to)}>
      {children}
    </button>
  );

  return (
    <>
      <PageHeader
        title={c.title}
        slug="requisitos"
        icon={ServerIcon}
        meta={[
          { label: t.meta.platform, value: SYSTEM_META.platform },
          { label: "Paper API", value: SYSTEM_META.paperApi },
          { label: t.meta.java, value: SYSTEM_META.java },
        ]}
      >
        {c.intro}
      </PageHeader>

      <SectionHeading id="core">{c.coreTitle}</SectionHeading>
      <p>{fill(c.coreLead, { jar: <code>RPGRoll.jar</code> })}</p>
      <Table>
        <Thead>
          <Th>{c.thComponent}</Th>
          <Th>{c.thVersion}</Th>
          <Th>{c.thType}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          {REQUIREMENTS.map((req) => {
            const key = DETAIL_KEY[req.label];
            const detail = key ? (c[key] as string) : undefined;
            return (
              <Tr key={req.label}>
                <Td className="font-medium">{req.label}</Td>
                <Td className="font-mono text-xs">{req.value}</Td>
                <Td>
                  {req.requirement === "required" ? (
                    <Badge tone="violet">{t.meta.required}</Badge>
                  ) : (
                    <Badge>{t.meta.optional}</Badge>
                  )}
                </Td>
                <Td>{detail ?? req.detail ?? "—"}</Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>

      <Callout tone="info" title={c.mcTitle}>
        {fill(c.mcBody, {
          paperApi: <strong>Paper API</strong>,
          version: SYSTEM_META.paperApi,
        })}
      </Callout>

      <SectionHeading id="plataforma">{c.platformTitle}</SectionHeading>
      <p>{fill(c.platformBody, { paper: <strong>Paper</strong> })}</p>

      <SectionHeading id="instalacion">{c.installTitle}</SectionHeading>
      <p>{fill(c.installLead, { dir: <code>plugins/</code> })}</p>
      <CodeBlock
        language="bash"
        filename="plugins/"
        code={
          `plugins/\n` +
          `  RPGRoll.jar            # ${c.cCore}\n` +
          `  RPGRoll-Items.jar      # ${c.cAddons}\n` +
          `  RPGRoll-Quests.jar\n` +
          `  ProtocolLib.jar        # ${c.cProtocol}\n` +
          `  Vault.jar              # ${c.cOptional}\n` +
          `  PlaceholderAPI.jar     # ${c.cOptional}`
        }
      />
      <p>
        {c.installAfter} <Go to="configuracion">{pageLabel("configuracion", locale)}</Go>.
      </p>

      <SectionHeading id="dependencias-duras">{c.hardTitle}</SectionHeading>
      <p>{fill(c.hardLead, { soft: <code>softdepend</code> })}</p>
      <Table>
        <Thead>
          <Th>{c.thAddon}</Th>
          <Th>{c.thRequires}</Th>
        </Thead>
        <tbody>
          {hardThirdParty.map((addon) => (
            <Tr key={addon.slug}>
              <Td>
                <Go to={addon.slug}>{pageLabel(addon.slug, locale)}</Go>
              </Td>
              <Td className="font-mono text-xs">
                {addon.hard.filter((d) => d !== "RPGRoll" && !d.startsWith("RPGRoll-")).join(", ")}
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>
        {c.hardAfter} <Go to="integraciones">{pageLabel("integraciones", locale)}</Go>.
      </p>

      <SectionHeading id="persistencia">{c.storageTitle}</SectionHeading>
      <p>
        {fill(c.storageBody, { driver: <code>sqlite-jdbc</code> })}{" "}
        <Go to="base-de-datos">{pageLabel("base-de-datos", locale)}</Go>.
      </p>

      <PrevNext current="requisitos" onNavigate={onNavigate} />
    </>
  );
}
