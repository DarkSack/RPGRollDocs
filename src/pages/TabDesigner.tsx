import { PageHeader, SectionHeading, Callout, PrevNext } from "../components/ui";
import { TabDesignerTool } from "../components/tabdesigner/TabDesignerTool";
import { TableListIcon } from "../components/icons/Icon";
import { useI18n, fill } from "../i18n";
import { TAB_DESIGNER_COPY } from "./copy/tabdesigner";

export function TabDesigner({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = TAB_DESIGNER_COPY[locale];

  return (
    <>
      <PageHeader title={c.title} icon={TableListIcon} eyebrow={c.eyebrow}>
        {fill(c.intro, {
          tab: (
            <a href="/tab" className="underline">
              RPGRoll-TAB
            </a>
          ),
        })}
      </PageHeader>

      <Callout tone="info" title={c.browserTitle}>
        {fill(c.browserBody, {
          dir: <code>plugins/RPGRoll-TAB/tab/&lt;{c.folderWord}&gt;/</code>,
          d1: <code>profiles/</code>,
          d2: <code>contexts/</code>,
          d3: <code>scoreboards/</code>,
          parser: <code>*Parser.java</code>,
        })}
      </Callout>

      <SectionHeading id="como-usar">{c.howTitle}</SectionHeading>
      <ol>
        <li>{c.step1}</li>
        <li>{fill(c.step2, { tablist: <code>tablist</code> })}</li>
        <li>{c.step3}</li>
        <li>{c.step4}</li>
      </ol>

      <Callout tone="warning" title={c.warnTitle}>
        {fill(c.warnBody, { reload: <code>/tabadmin reload</code> })}
      </Callout>

      <SectionHeading id="herramienta">{c.toolTitle}</SectionHeading>
      <TabDesignerTool />

      <SectionHeading id="siguiente-paso">{c.nextTitle}</SectionHeading>
      <p>
        {fill(c.nextBody, {
          dir: <code>tab/</code>,
          reload: <code>/tabadmin reload</code>,
          commands: (
            <a className="underline" href="/tab#comandos">
              {c.commandsLink}
            </a>
          ),
          engine: (
            <a className="underline" href="/tab#motor-de-contexto">
              Context Engine
            </a>
          ),
        })}
      </p>

      <PrevNext current="tab-designer" onNavigate={onNavigate} />
    </>
  );
}
