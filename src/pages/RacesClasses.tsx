import type { ReactNode } from "react";
import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";
import { pageTitle } from "../content/nav";
import { useI18n, fill, localizedPageLabel, localizedCaveatTitle, localizedCaveatBody } from "../i18n";
import { CORE_COPY } from "./copy/core";

const CAVEAT_TITLE = "passive-traits no se aplica solo";
const CAVEAT_BODY =
  "El campo passive-traits se parsea y queda disponible en el objeto Race/ PlayerClass, pero nada en el código actual llama automáticamente a rpgPlayer.acquireTrait(...) con esos IDs al crear personaje. Si lo necesitas, es la primera extensión natural de CharacterCreationFlow.saveCharacter().";

export function RacesClasses({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = CORE_COPY[locale].races;

  const Go = ({ to, children }: { to: string; children: ReactNode }) => (
    <button type="button" className="underline" onClick={() => onNavigate(to)}>
      {children}
    </button>
  );

  return (
    <>
      <PageHeader title={c.title} slug="razas-clases">
        {c.intro}
      </PageHeader>

      <SectionHeading id="donde-viven">{c.whereTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thFolder}</Th>
          <Th>{c.thDefaults}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">plugins/RPGRoll/races/*.yml</Td>
            <Td>draconido, elfo, enano, gigante</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">plugins/RPGRoll/classes/*.yml</Td>
            <Td>guerrero</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.loadedBy, {
          managers: (
            <>
              <code>RaceManagerImpl</code>/<code>ClassManagerImpl</code>
            </>
          ),
          common: <code>common</code>,
          contentManager: <code>ContentManager</code>,
        })}
      </p>

      <SectionHeading id="formato-raza">{c.raceFormatTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="races/elfo.yml"
        code={
          "id: elfo\n" +
          'display-name: "Elfo"\n' +
          'description: "Ágiles y conectados con la naturaleza."\n' +
          "base-attributes:\n" +
          "  dexterity: 3\n" +
          "  wisdom: 2\n" +
          "  strength: -1\n" +
          "passive-traits:\n" +
          "  - vision_nocturna\n" +
          'icon: "<textura base64 de minecraft-heads.com>"\n' +
          "lore:\n" +
          '  - "Habitantes ancestrales del bosque."\n' +
          "physical:\n" +
          "  scale: 0.95\n" +
          "  movement-speed-percent: 0.05\n" +
          "  extra-health: 0.0\n" +
          "  knockback-resistance: 0.0\n"
        }
      />

      <SectionHeading id="formato-clase">{c.classFormatTitle}</SectionHeading>
      <p>{fill(c.classFormatLead, { physical: <code>physical</code> })}</p>
      <CodeBlock
        language="yaml"
        filename="classes/guerrero.yml"
        code={
          "id: guerrero\n" +
          'display-name: "Guerrero"\n' +
          'description: "Maestro del combate cuerpo a cuerpo."\n' +
          "base-attributes:\n" +
          "  strength: 4\n" +
          "  constitution: 3\n" +
          "passive-traits: []\n" +
          'icon: "<textura base64>"\n' +
          "lore:\n" +
          '  - "Forjado en mil batallas."\n'
        }
      />

      <SectionHeading id="campos">{c.fieldsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thField}</Th>
          <Th>{c.thType}</Th>
          <Th>{c.thRequired}</Th>
          <Th>{c.thDescription}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">id</Td>
            <Td>{c.tString}</Td>
            <Td>{c.yes}</Td>
            <Td>{c.fId}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">display-name</Td>
            <Td>{c.tString}</Td>
            <Td>{c.noUsesId}</Td>
            <Td>{c.fDisplayName}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">description</Td>
            <Td>{c.tString}</Td>
            <Td>{c.no}</Td>
            <Td>{c.fDescription}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">base-attributes</Td>
            <Td>{c.tMap}</Td>
            <Td>{c.no}</Td>
            <Td>{c.fBaseAttributes}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">passive-traits</Td>
            <Td>{c.tStringList}</Td>
            <Td>{c.no}</Td>
            <Td>{fill(c.fPassiveTraits, { strong: <strong>{c.fPassiveTraitsStrong}</strong> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">icon</Td>
            <Td>{c.tBase64}</Td>
            <Td>{c.no}</Td>
            <Td>{c.fIcon}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">lore</Td>
            <Td>{c.tStringList}</Td>
            <Td>{c.no}</Td>
            <Td>{c.fLore}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">physical</Td>
            <Td>{c.tObjectRaces}</Td>
            <Td>{c.no}</Td>
            <Td>{c.fPhysical}</Td>
          </Tr>
        </tbody>
      </Table>

      <Callout tone="warning" title={localizedCaveatTitle("razas-clases", CAVEAT_TITLE, locale)}>
        {localizedCaveatBody("razas-clases", CAVEAT_TITLE, CAVEAT_BODY, locale)}
      </Callout>

      <SectionHeading id="modificadores-fisicos">{c.physicalTitle}</SectionHeading>
      <p>
        {fill(c.physicalBody, {
          applier: <code>RaceAttributeApplier</code>,
          physical: <code>physical</code>,
          modifier: <code>AttributeModifier</code>,
          key: <code>NamespacedKey</code>,
        })}
      </p>

      <SectionHeading id="bonos-de-atributo">{c.bonusTitle}</SectionHeading>
      <p>
        {fill(c.bonusBody, {
          create: <code>/rpg create</code>,
          flow: <code>CharacterCreationFlow</code>,
          default: <code>PlayerStats.createDefault()</code>,
          baseAttributes: <code>base-attributes</code>,
        })}{" "}
        <Go to="stats-combate">{localizedPageLabel("stats-combate", pageTitle("stats-combate"), locale)}</Go>.
      </p>

      <SectionHeading id="cambio-raza-clase">{c.changeTitle}</SectionHeading>
      <p>
        {fill(c.changeBody, {
          not: <strong>{c.notWord}</strong>,
          file: <code>gameplay.yml</code>,
          keys: (
            <>
              <code>races.allow_race_change</code> / <code>classes.allow_class_change</code>
            </>
          ),
          false: <code>false</code>,
        })}{" "}
        <Go to="comandos">
          <code>/rpg setrace</code> / <code>/rpg setclass</code>
        </Go>
        {fill(c.changeAfter, { recalc: <code>--recalc</code> })}
      </p>

      <PrevNext current="razas-clases" onNavigate={onNavigate} />
    </>
  );
}
