import { PageHeader, SectionHeading, Callout, PrevNext } from "../components/ui";
import { RoomDesignerTool } from "../components/roomdesigner/RoomDesignerTool";
import { CubeIcon } from "../components/icons/Icon";
import { useI18n, fill } from "../i18n";
import { ROOM_DESIGNER_COPY } from "./copy/roomdesigner";

export function RoomDesigner({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = ROOM_DESIGNER_COPY[locale];

  return (
    <>
      <PageHeader title={c.title} icon={CubeIcon} eyebrow={c.eyebrow}>
        {fill(c.intro, {
          library: (
            <a href="/dungeons" className="underline">
              {c.libraryLink}
            </a>
          ),
        })}
      </PageHeader>

      <Callout tone="info" title={c.browserTitle}>
        {fill(c.browserBody, {
          dir: <code>plugins/RPGRoll-Dungeons/structures/</code>,
          parser: <code>StructureParser.java</code>,
        })}
      </Callout>

      <SectionHeading id="como-usar">{c.howTitle}</SectionHeading>
      <ol>
        <li>{c.step1}</li>
        <li>{c.step2}</li>
        <li>{c.step3}</li>
        <li>{c.step4}</li>
        <li>{c.step5}</li>
      </ol>

      <Callout tone="warning" title={c.warnTitle}>
        {fill(c.warnBody, { setType: <code>setType()</code> })}
      </Callout>

      <SectionHeading id="herramienta">{c.toolTitle}</SectionHeading>
      <RoomDesignerTool />

      <SectionHeading id="siguiente-paso">{c.nextTitle}</SectionHeading>
      <p>
        {fill(c.nextBody, {
          dir: <code>structures/</code>,
          reload: <code>/dungeonadmin reload</code>,
          browser: <code>/dungeonadmin structure browser</code>,
          link: (
            <a className="underline" href="/dungeons#pegar-estructura">
              {c.pasteLink}
            </a>
          ),
        })}
      </p>

      <PrevNext current="room-designer" onNavigate={onNavigate} />
    </>
  );
}
