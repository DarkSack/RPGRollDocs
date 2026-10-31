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
import { useI18n, fill } from "../i18n";
import { ADDONS_E_COPY, type AddonsECopy } from "./copy/addonsE";

type NpcsCopy = AddonsECopy["npcs"];

const npcFields = (c: NpcsCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: "nuevo_npc", placeholder: "guardia" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&7Guardia de la Ciudad" },
  {
    key: "pose",
    label: c.fPose,
    type: "select",
    options: ["STANDING", "SITTING", "SNEAKING", "SWIMMING", "SLEEPING"],
  },
  {
    key: "location",
    label: c.fLocation,
    type: "group",
    fields: [
      { key: "world", label: c.fWorld, type: "string", default: "world" },
      { key: "x", label: "X", type: "number", default: "0" },
      { key: "y", label: "Y", type: "number", default: "64" },
      { key: "z", label: "Z", type: "number", default: "0" },
      { key: "yaw", label: "Yaw", type: "number", default: "0" },
      { key: "pitch", label: "Pitch", type: "number", default: "0" },
    ],
  },
  {
    key: "skin",
    label: c.fSkin,
    type: "group",
    fields: [
      {
        key: "value",
        label: c.fTexture,
        type: "string",
        help: c.fTextureHelp,
      },
      { key: "signature", label: c.fSignature, type: "string" },
    ],
  },
];

const npcMenuFields = (c: NpcsCopy): YamlField[] => [
  { key: "id", label: c.mId, type: "string", default: "nuevo_menu", placeholder: "tienda_general" },
  { key: "title", label: c.mTitle, type: "string", placeholder: "&2Tienda General" },
  { key: "rows", label: c.mRows, type: "number", default: "3" },
];

export function Npcs({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = ADDONS_E_COPY[locale].npcs;

  return (
    <>
      <PageHeader title={c.title}>
        {fill(c.intro, { separate: <strong>{c.separate}</strong> })}
      </PageHeader>

      <Callout tone="info" title={c.sepTitle}>
        {fill(c.sepBody, {
          plugin: <code>RPGRoll-NPCs</code>,
          core: <code>core</code>,
          dir: <code>npcs/</code>,
          lib: <code>RPGRoll-Lib</code>,
        })}
      </Callout>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <p>{fill(c.reqDeclared, { pluginYml: <code>plugin.yml</code> })}</p>
      <CodeBlock language="yaml" code={"depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, RPGRoll-Quests]"} />
      <ul>
        <li>
          <strong>RPGRoll-Lib</strong> —{" "}
          {fill(c.liLib, {
            gui: (
              <>
                <code>InventoryGUI</code>/<code>ItemBuilder</code>
              </>
            ),
          })}
        </li>
        <li>
          <strong>RPGRoll</strong>{" "}
          {fill(c.liCore, {
            conds: (
              <>
                <code>MIN_LEVEL</code>, <code>HAS_RACE</code>, <code>HAS_CLASS</code>, <code>HAS_JOB</code>,{" "}
                <code>MIN_JOB_LEVEL</code>
              </>
            ),
            hasItem: <code>HAS_ITEM</code>,
          })}
        </li>
        <li>
          <strong>RPGRoll-Quests</strong> {c.liQuests}
        </li>
      </ul>
      <Callout tone="tip">
        {fill(c.buildTip, {
          cmd: <Kbd>./gradlew :npcs:build</Kbd>,
          jar: <code>npcs/build/libs/npcs-&lt;version&gt;.jar</code>,
          plain: <code>-plain.jar</code>,
          core: <code>core</code>,
        })}
      </Callout>

      <SectionHeading id="como-funciona">{c.howTitle}</SectionHeading>
      <p>{fill(c.howBody, { mannequin: <code>Mannequin</code> })}</p>
      <ul>
        <li>
          <strong>{c.liYamlTitle}</strong> {c.liYaml}
        </li>
        <li>
          <strong>{c.liNoAiTitle}</strong> {c.liNoAi}
        </li>
        <li>
          <strong>{c.liInteractTitle}</strong> {c.liInteract}
        </li>
        <li>
          <strong>{c.liRegionsTitle}</strong>{" "}
          {fill(c.liRegions, {
            deny: <code>mob-spawning deny</code>,
            blockSpawning: <code>block-plugin-spawning</code>,
            msg: <code>{"\u2718 NPC '<id>': otro plugin cancel\u00f3 su aparici\u00f3n"}</code>,
          })}
        </li>
      </ul>

      <SectionHeading id="crear-npc">{c.createTitle}</SectionHeading>
      <p>{c.createIntro}</p>
      <ol>
        <li>
          <Kbd>{"/npc create <id>"}</Kbd> {c.s1}
        </li>
        <li>{fill(c.s2, { name: <strong>{c.sName}</strong> })}</li>
        <li>
          {fill(c.s3, {
            skin: <strong>{c.sSkin}</strong>,
            link: (
              <a href="https://mineskin.org" target="_blank" rel="noopener noreferrer">
                mineskin.org
              </a>
            ),
            value: (
              <>
                <code>value</code>/<code>signature</code>
              </>
            ),
          })}
        </li>
        <li>{fill(c.s4, { pose: <strong>{c.sPose}</strong> })}</li>
        <li>{fill(c.s5, { pos: <strong>{c.sPos}</strong> })}</li>
        <li>
          {fill(c.s6, { actions: <strong>{c.sActions}</strong>, fmt: <code>TIPO|valor</code> })}
        </li>
        <li>{c.s7}</li>
      </ol>
      <p>{fill(c.editNote, { cmd: <Kbd>{"/npc edit <id>"}</Kbd> })}</p>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <p>{fill(c.yamlIntro, { path: <code>plugins/RPGRoll-NPCs/npcs/&lt;id&gt;.yml</code> })}</p>
      <CodeBlock
        language="yaml"
        filename="npcs/prueba.yml"
        code={
          "id: prueba\n" +
          'display-name: "NPC de Prueba"\n' +
          "skin:\n" +
          '  value: "<textura base64 resuelta por MineSkin>"\n' +
          '  signature: "<firma resuelta por MineSkin>"\n' +
          'pose: "STANDING"\n' +
          "\n" +
          "location:\n" +
          "  world: world\n" +
          "  x: -3.0\n" +
          "  y: 80.0\n" +
          "  z: -15.0\n" +
          "  yaw: 0.0\n" +
          "  pitch: 0.0\n" +
          "\n" +
          "actions:\n" +
          "  - type: MESSAGE\n" +
          '    value: "Bienvenido, {player}."\n' +
          "  - type: SOUND\n" +
          '    value: "ENTITY_VILLAGER_YES,1.0,1.2"\n'
        }
      />
      <CodeBlock
        language="yaml"
        filename="npcs/guardia.yml"
        code={
          "id: guardia\n" +
          'display-name: "&7Guardia de la Ciudad"\n' +
          'pose: "STANDING"\n' +
          "\n" +
          "location:\n" +
          "  world: world\n" +
          "  x: 10.0\n" +
          "  y: 65.0\n" +
          "  z: 5.0\n" +
          "  yaw: 90.0\n" +
          "  pitch: 0.0\n" +
          "\n" +
          "actions:\n" +
          "  - type: MESSAGE\n" +
          '    value: "Circula, ciudadano. Nada que ver por aquí."\n' +
          "  - type: SOUND\n" +
          '    value: "ENTITY_VILLAGER_AMBIENT,1.0,1.0"\n'
        }
      />

      <YamlBuilder
        title={c.bNpc}
        description={c.bNpcDesc}
        folder="npcs"
        fields={npcFields(c)}
      />

      <SectionHeading id="acciones">{c.actionsTitle}</SectionHeading>
      <p>{fill(c.actionsIntro, { player: <code>{"{player}"}</code> })}</p>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thValueFmt}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">MESSAGE</Td><Td className="font-mono text-xs">{c.vFree}</Td><Td>{fill(c.aMessage, { amp: <code>&amp;</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">COMMAND</Td><Td className="font-mono text-xs">{c.vCommand}</Td><Td>{fill(c.aCommand, { console: <strong>{c.console}</strong>, give: <code>/give</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">COMMAND_AS_PLAYER</Td><Td className="font-mono text-xs">{c.vCommand}</Td><Td>{fill(c.aCommandAsPlayer, { asPlayer: <strong>{c.asPlayer}</strong>, quest: <code>quest start x</code>, sender: <code>sender instanceof Player</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">GIVE_ITEM</Td><Td className="font-mono text-xs">{c.vMaterial}</Td><Td>{c.aGiveItem}</Td></Tr>
          <Tr><Td className="font-mono text-xs">TAKE_ITEM</Td><Td className="font-mono text-xs">{c.vMaterial}</Td><Td>{c.aTakeItem}</Td></Tr>
          <Tr><Td className="font-mono text-xs">SOUND</Td><Td className="font-mono text-xs">{c.vSound}</Td><Td>{c.aSound}</Td></Tr>
          <Tr><Td className="font-mono text-xs">TELEPORT</Td><Td className="font-mono text-xs">{c.vWorldXyz}</Td><Td>{c.aTeleport}</Td></Tr>
          <Tr><Td className="font-mono text-xs">CONDITIONAL</Td><Td className="font-mono text-xs">{c.vCondFmt}</Td><Td>{c.aConditional}</Td></Tr>
          <Tr><Td className="font-mono text-xs">OPEN_GUI</Td><Td className="font-mono text-xs">{c.vMenuId}</Td><Td>{fill(c.aOpenGui, { menus: <code>menus/*.yml</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">CLOSE</Td><Td className="font-mono text-xs">{c.vEmpty}</Td><Td>{c.aClose}</Td></Tr>
          <Tr><Td className="font-mono text-xs">OPEN_INVENTORY</Td><Td className="font-mono text-xs">{"CHEST|HOPPER|FURNACE[,t\u00edtulo]"}</Td><Td>{c.aOpenInventory}</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="condicionales">{c.condTitle}</SectionHeading>
      <p>
        {fill(c.condIntro, {
          fmt: <code>condicion;accionSiTrue[;accionSiFalse]</code>,
          sub: <code>TIPO:valor</code>,
          pipe: <code>|</code>,
        })}
      </p>
      <CodeBlock
        language="text"
        code={"HAS_JOB:minero;MESSAGE:Ya eres minero, sigue así!;MESSAGE:¿No quieres unirte a los mineros?"}
      />
      <Table>
        <Thead>
          <Th>{c.thCondition}</Th>
          <Th>{c.thParam}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">HAS_JOB</Td><Td className="font-mono text-xs">{c.pJobId}</Td></Tr>
          <Tr><Td className="font-mono text-xs">MIN_JOB_LEVEL</Td><Td className="font-mono text-xs">{c.pJobLevel}</Td></Tr>
          <Tr><Td className="font-mono text-xs">MIN_LEVEL</Td><Td className="font-mono text-xs">{c.pLevel}</Td></Tr>
          <Tr><Td className="font-mono text-xs">HAS_RACE</Td><Td className="font-mono text-xs">{c.pRaceId}</Td></Tr>
          <Tr><Td className="font-mono text-xs">HAS_CLASS</Td><Td className="font-mono text-xs">{c.pClassId}</Td></Tr>
          <Tr><Td className="font-mono text-xs">HAS_ITEM</Td><Td className="font-mono text-xs">{c.pMaterial}</Td></Tr>
          <Tr><Td className="font-mono text-xs">HAS_PERMISSION</Td><Td className="font-mono text-xs">{c.pPermission}</Td></Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.combineBody, { and: <code>&amp;&amp;</code>, or: <code>||</code> })}
      </p>
      <CodeBlock
        language="text"
        code={"HAS_JOB:minero && MIN_JOB_LEVEL:minero,20 && HAS_ITEM:IRON_PICKAXE;GIVE_ITEM:DIAMOND,5;MESSAGE:Necesitas ser Minero nivel 20 y llevar un pico de hierro."}
      />

      <SectionHeading id="menus">{c.menusTitle}</SectionHeading>
      <p>
        {fill(c.menusBody, {
          openGui: <code>OPEN_GUI</code>,
          path: <code>plugins/RPGRoll-NPCs/menus/&lt;id&gt;.yml</code>,
          extras: (
            <a className="underline" href="/extras">
              RPGRoll-Extras
            </a>
          ),
          filler: <code>filler: GRAY_STAINED_GLASS_PANE</code>,
          permission: <code>permission</code>,
          nameLore: (
            <>
              <code>name</code> / <code>lore</code>
            </>
          ),
          player: <code>{"{player}"}</code>,
          head: <code>PLAYER_HEAD</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="menus/tienda_herrero.yml"
        code={
          "id: tienda_herrero\n" +
          'title: "&6Tienda del Herrero"\n' +
          "rows: 3\n" +
          "\n" +
          "items:\n" +
          "  - slot: 11\n" +
          "    material: IRON_SWORD\n" +
          '    name: "&fEspada de Hierro"\n' +
          "    lore:\n" +
          '      - "&7Precio: &e50 monedas (Lingote de Oro)"\n' +
          "    actions:\n" +
          "      - type: CONDITIONAL\n" +
          '        value: "HAS_ITEM:GOLD_INGOT,50;GIVE_ITEM:IRON_SWORD,1;MESSAGE:No tienes suficiente oro."\n' +
          "      - type: CONDITIONAL\n" +
          '        value: "HAS_ITEM:GOLD_INGOT,50;TAKE_ITEM:GOLD_INGOT,50"\n'
        }
      />
      <CodeBlock
        language="yaml"
        filename="menus/tienda_general.yml"
        code={
          "id: tienda_general\n" +
          'title: "&2Tienda General"\n' +
          "rows: 3\n" +
          "\n" +
          "items:\n" +
          "  - slot: 11\n" +
          "    material: BREAD\n" +
          '    name: "&fPan"\n' +
          "    lore:\n" +
          '      - "&7Precio: &e5 monedas (Lingote de Oro)"\n' +
          "    actions:\n" +
          "      - type: CONDITIONAL\n" +
          '        value: "HAS_ITEM:GOLD_INGOT,5;GIVE_ITEM:BREAD,4;MESSAGE:No tienes suficiente oro (necesitas 5 lingotes)."\n' +
          "      - type: CONDITIONAL\n" +
          '        value: "HAS_ITEM:GOLD_INGOT,5;TAKE_ITEM:GOLD_INGOT,5"\n' +
          "\n" +
          "  - slot: 13\n" +
          "    material: TORCH\n" +
          '    name: "&fAntorchas"\n' +
          "    lore:\n" +
          '      - "&7Precio: &e2 monedas"\n' +
          "    actions:\n" +
          "      - type: GIVE_ITEM\n" +
          '        value: "TORCH,8"\n' +
          "\n" +
          "  - slot: 15\n" +
          "    material: BARRIER\n" +
          '    name: "&cCerrar"\n' +
          "    actions: []\n"
        }
      />

      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, {
          files: (
            <>
              <code>npcs/reference_full.yml</code> / <code>menus/reference_full_menu.yml</code>
            </>
          ),
          conditional: <code>CONDITIONAL</code>,
          andOr: (
            <>
              <code>&amp;&amp;</code>/<code>||</code>
            </>
          ),
        })}
      </Callout>

      <YamlBuilder
        title={c.bMenu}
        description={c.bMenuDesc}
        folder="menus"
        fields={npcMenuFields(c)}
      />

      <Callout tone="warning" title={c.orderTitle}>
        {fill(c.orderBody, { two: <strong>{c.two}</strong>, hasItem: <code>HAS_ITEM</code> })}
      </Callout>
      <p>
        {fill(c.itemNote, {
          fields: (
            <>
              <code>slot</code>, <code>material</code>, <code>name</code>, <code>lore</code> {c.listNote}
            </>
          ),
          actions: <code>actions</code>,
        })}
      </p>

      <SectionHeading id="comandos">{c.cmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/npc create <id>"}</Td><Td>{c.cCreate}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/npc edit <id>"}</Td><Td>{c.cEdit}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/npc list</Td><Td>{c.cList}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/npc delete <id>"}</Td><Td>{c.cDelete}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/npc menus</Td><Td>{c.cMenus}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/npc reload</Td><Td>{c.cReload}</Td></Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.permNote, {
          perm: <Badge tone="amber">rpgrollnpcs.admin.*</Badge>,
          pluginYml: <code>plugin.yml</code>,
        })}
      </p>

      <PrevNext current="npcs" onNavigate={onNavigate} />
    </>
  );
}
