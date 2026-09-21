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
  Kbd,
  Badge,
  PrevNext,
  YamlBuilder,
  type YamlField,
} from "../components/ui";
import { useI18n, fill, localizedCaveatTitle, localizedCaveatBody } from "../i18n";
import { ADDONS_A_COPY, type AddonsACopy } from "./copy/addonsA";

const CAVEAT_TITLE = "Un crate necesita al menos 1 recompensa";
const CAVEAT_BODY =
  "El compacto constructor de Crate tira IllegalArgumentException si rewards está vacío — no se puede guardar (ni desde YAML ni desde el editor gráfico) un crate sin ninguna recompensa.";

/** Las claves del YAML no se traducen; solo las etiquetas del formulario. */
function crateFields(c: AddonsACopy["crates"]): YamlField[] {
  return [
    { key: "id", label: c.fId, type: "string", default: "nuevo_crate", placeholder: "comun" },
    { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&eCrate Común" },
    { key: "gui-title", label: c.fGuiTitle, type: "string", placeholder: "&6Abriendo Crate Común" },
    { key: "require-key", label: c.fRequireKey, type: "boolean", default: "true" },
    {
      key: "key",
      label: c.fKey,
      type: "group",
      fields: [
        { key: "material", label: c.fMaterial, type: "string", default: "TRIPWIRE_HOOK" },
        { key: "name", label: c.fKeyName, type: "string", placeholder: "&eLlave de Crate Común" },
        { key: "lore", label: c.fKeyLore, type: "list", placeholder: "Úsala en un Crate Común." },
      ],
    },
    {
      key: "hologram",
      label: c.fHologram,
      type: "list",
      placeholder: "&6&lCRATE COMÚN, &7Necesitas una llave",
      help: c.fHologramHelp,
    },
  ];
}

export function Crates({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = ADDONS_A_COPY[locale].crates;

  const commands: [string, string][] = [
    ["/crate setlocation <id>", c.cSetLocation],
    ["/crate removelocation", c.cRemoveLocation],
    ["/crate givekey <jugador> <id> [cantidad]", c.cGiveKey],
    ["/crate list", c.cList],
    ["/crate browser", c.cBrowser],
    ["/crate reload", c.cReload],
  ];

  return (
    <>
      <PageHeader title={c.title} slug="crates">
        {c.intro}
      </PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll]\nsoftdepend: [DecentHolograms]"} />
      <p>{c.reqBody}</p>

      <SectionHeading id="modelo">{c.modelTitle}</SectionHeading>
      <p>
        {fill(c.modelBody, {
          crate: <code>Crate</code>,
          def: <strong>{c.modelDef}</strong>,
          placed: <code>PlacedCrate</code>,
          cmd: <Kbd>{"/crate setlocation <id>"}</Kbd>,
        })}
      </p>

      <SectionHeading id="recompensas">{c.rewardsTitle}</SectionHeading>
      <p>
        {fill(c.rewardsBody, {
          reward: <code>CrateReward</code>,
          weight: <code>weight</code>,
          announce: <code>announce: true</code>,
        })}
      </p>
      <Callout tone="warning" title={localizedCaveatTitle("crates", CAVEAT_TITLE, locale)}>
        {localizedCaveatBody("crates", CAVEAT_TITLE, CAVEAT_BODY, locale)}
      </Callout>
      <p>
        {fill(c.rewardsActions, {
          actions: <code>actions</code>,
          types: (
            <>
              <code>GIVE_ITEM</code>, <code>MESSAGE</code>, <code>SOUND</code>, <code>COMMAND</code>
            </>
          ),
        })}
      </p>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="crates/comun.yml"
        code={
          "id: comun\n" +
          'display-name: "&eCrate Común"\n' +
          'gui-title: "&6Abriendo Crate Común"\n' +
          "require-key: true\n" +
          "\n" +
          "key:\n" +
          "  material: TRIPWIRE_HOOK\n" +
          '  name: "&eLlave de Crate Común"\n' +
          "  lore:\n" +
          '    - "&7Úsala en un Crate Común."\n' +
          "\n" +
          "hologram:\n" +
          '  - "&6&lCRATE COMÚN"\n' +
          '  - "&7Necesitas una llave"\n' +
          '  - "&7Click derecho para abrir"\n' +
          "\n" +
          "rewards:\n" +
          "  - id: manzanas\n" +
          '    display-name: "&f8 Manzanas Doradas"\n' +
          "    icon: GOLDEN_APPLE\n" +
          "    weight: 30\n" +
          "    actions:\n" +
          "      - type: GIVE_ITEM\n" +
          '        value: "GOLDEN_APPLE,8"\n' +
          "      - type: MESSAGE\n" +
          '        value: "&aGanaste 8 Manzanas Doradas."\n' +
          "\n" +
          "  - id: diamantes\n" +
          '    display-name: "&b3 Diamantes"\n' +
          "    icon: DIAMOND\n" +
          "    lore:\n" +
          '      - "&7No está nada mal."\n' +
          "    weight: 3\n" +
          "    announce: true\n" +
          "    actions:\n" +
          "      - type: GIVE_ITEM\n" +
          '        value: "DIAMOND,3"\n' +
          "      - type: SOUND\n" +
          '        value: "ENTITY_PLAYER_LEVELUP,1.0,1.5"\n' +
          "      - type: MESSAGE\n" +
          '        value: "&b¡Ganaste 3 Diamantes!"\n'
        }
      />
      <CodeBlock
        language="yaml"
        filename="crates/legendario.yml"
        code={
          "id: legendario\n" +
          'display-name: "&6&lCrate Legendario"\n' +
          'gui-title: "&4&lAbriendo Crate Legendario"\n' +
          "require-key: true\n" +
          "\n" +
          "key:\n" +
          "  material: NETHER_STAR\n" +
          '  name: "&6&lLlave del Crate Legendario"\n' +
          "  lore:\n" +
          '    - "&7Una llave que brilla con poder."\n' +
          "\n" +
          "hologram:\n" +
          '  - "&4&l☠ CRATE LEGENDARIO ☠"\n' +
          '  - "&7Solo para los más valientes"\n' +
          "\n" +
          "rewards:\n" +
          "  - id: netherite_scrap\n" +
          '    display-name: "&f4 Fragmentos de Netherita"\n' +
          "    icon: NETHERITE_SCRAP\n" +
          "    weight: 35\n" +
          "    actions:\n" +
          "      - type: GIVE_ITEM\n" +
          '        value: "NETHERITE_SCRAP,4"\n' +
          "\n" +
          "  - id: totem\n" +
          '    display-name: "&6&l¡TOTEM DE LA INMORTALIDAD!"\n' +
          "    icon: TOTEM_OF_UNDYING\n" +
          "    weight: 1\n" +
          "    announce: true\n" +
          "    actions:\n" +
          "      - type: GIVE_ITEM\n" +
          '        value: "TOTEM_OF_UNDYING,1"\n' +
          "      - type: SOUND\n" +
          '        value: "ENTITY_ENDER_DRAGON_GROWL,1.0,1.0"\n'
        }
      />

      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, {
          file: <code>crates/reference_full.yml</code>,
          types: (
            <>
              <code>GIVE_ITEM</code>, <code>COMMAND</code>, <code>SOUND</code>, <code>MESSAGE</code>
            </>
          ),
        })}
      </Callout>

      <YamlBuilder title={c.builderTitle} description={c.builderDesc} folder="crates" fields={crateFields(c)} />

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>
        {fill(c.guiBody, {
          browser: <Kbd>/crate browser</Kbd>,
          format: <code>{"id;nombre;material;peso;item-material,cantidad"}</code>,
          spin: <code>CrateSpinGUI</code>,
        })}
      </p>

      <SectionHeading id="comandos">{c.cmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          {commands.map(([cmd, what]) => (
            <Tr key={cmd}>
              <Td className="font-mono text-xs">{cmd}</Td>
              <Td>{what}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>{fill(c.cmdNote, { perm: <Badge tone="amber">rpgrollcrates.admin.*</Badge> })}</p>

      <PrevNext current="crates" onNavigate={onNavigate} />
    </>
  );
}
