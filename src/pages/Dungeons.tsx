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
import { DUNGEONS_COPY, type DungeonsCopy } from "./copy/dungeons";

const structureFields = (c: DungeonsCopy): YamlField[] => [
  { key: "id", label: c.sfId, type: "string", default: "nueva_estructura", placeholder: "watchtower" },
  { key: "display-name", label: c.sfDisplayName, type: "string", placeholder: "Torre de Vigía" },
  { key: "description", label: c.sfDescription, type: "string" },
  { key: "icon", label: c.sfIcon, type: "string", default: "STONE_BRICKS" },
  { key: "source", label: c.sfSource, type: "select", options: ["CUSTOM", "NATIVE"], default: "CUSTOM" },
];

const dungeonFields = (c: DungeonsCopy): YamlField[] => [
  { key: "id", label: c.dfId, type: "string", default: "nueva_mazmorra", placeholder: "trial_of_ash" },
  { key: "category", label: c.dfCategory, type: "string", default: "misc", placeholder: "trial" },
  { key: "display-name", label: c.dfDisplayName, type: "string", placeholder: "&6Prueba de Ceniza" },
  { key: "icon", label: c.dfIcon, type: "string", default: "STONE_BRICKS" },
  { key: "description", label: c.dfDescription, type: "string" },
  { key: "recommended-level", label: c.dfLevel, type: "number", default: "1" },
  { key: "estimated-minutes", label: c.dfMinutes, type: "number", default: "15" },
  { key: "min-players", label: c.dfMinPlayers, type: "number", default: "1" },
  { key: "max-players", label: c.dfMaxPlayers, type: "number", default: "5" },
  { key: "cooldown", label: c.dfCooldown, type: "string", placeholder: "1h" },
  { key: "repeatable", label: c.dfRepeatable, type: "boolean", default: "true" },
  { key: "tags", label: c.dfTags, type: "list", placeholder: "trial, solo" },
  {
    key: "lobby",
    label: c.dfLobby,
    type: "group",
    fields: [
      { key: "world", label: c.dfWorld, type: "string", default: "world" },
      { key: "x", label: "X", type: "number", default: "0" },
      { key: "y", label: "Y", type: "number", default: "64" },
      { key: "z", label: "Z", type: "number", default: "0" },
      { key: "yaw", label: "Yaw", type: "number", default: "0" },
      { key: "pitch", label: "Pitch", type: "number", default: "0" },
    ],
  },
  {
    key: "bounds",
    label: c.dfBounds,
    type: "group",
    fields: [
      { key: "world", label: c.dfWorld, type: "string", default: "world" },
      { key: "min-x", label: "Min X", type: "number", default: "0" },
      { key: "min-y", label: "Min Y", type: "number", default: "0" },
      { key: "min-z", label: "Min Z", type: "number", default: "0" },
      { key: "max-x", label: "Max X", type: "number", default: "0" },
      { key: "max-y", label: "Max Y", type: "number", default: "0" },
      { key: "max-z", label: "Max Z", type: "number", default: "0" },
    ],
  },
];

export function Dungeons({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = DUNGEONS_COPY[locale];

  return (
    <>
      <PageHeader title={c.title}>{c.intro}</PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        code={"depend: [RPGRoll-Lib, RPGRoll-Mobs, RPGRoll-Guilds]\nsoftdepend: [RPGRoll, Vault, RPGRoll-Items, RPGRoll-Quests, PlaceholderAPI, WorldEdit]"}
      />
      <Callout tone="warning" title={c.hardTitle}>
        {fill(c.hardBody, { not: <strong>{c.notWord}</strong>, mobDef: <code>MobDefinition</code> })}
      </Callout>

      <SectionHeading id="estructura">{c.roomsTitle}</SectionHeading>
      <p>
        {fill(c.roomsBody, {
          room: <code>DungeonRoom</code>,
          type: <code>type</code>,
          types: (
            <>
              <code>ENTRANCE</code>, <code>COMBAT</code>, <code>PUZZLE</code>, <code>REST</code>,{" "}
              <code>TREASURE</code>, <code>BOSS</code>, <code>EVENT</code>, <code>STORY</code>,{" "}
              <code>CINEMATIC</code>
            </>
          ),
          objectives: <code>objectives</code>,
          waves: <code>waves</code>,
          boss: <code>boss</code>,
          mobDef: <code>MobDefinition</code>,
          bossType: <code>BOSS</code>,
          events: <code>events</code>,
          eventTypes: (
            <>
              <code>ROOM_ENTER</code>, <code>ROOM_CLEAR</code>...
            </>
          ),
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thObjective}</Th>
          <Th>{c.thUse}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">KILL_ENTITY / DESTROY_BLOCK / COLLECT_ITEM</Td><Td>{c.oDirect}</Td></Tr>
          <Tr><Td className="font-mono text-xs">SURVIVE_TIME / RESIST_TIME</Td><Td>{c.oSurvive}</Td></Tr>
          <Tr><Td className="font-mono text-xs">DEFEND / ESCORT</Td><Td>{c.oDefend}</Td></Tr>
          <Tr><Td className="font-mono text-xs">SOLVE_PUZZLE / ACTIVATE_MECHANISM</Td><Td>{c.oPuzzle}</Td></Tr>
          <Tr><Td className="font-mono text-xs">ESCAPE</Td><Td>{c.oEscape}</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="dificultades">{c.diffTitle}</SectionHeading>
      <p>
        {fill(c.diffBody, {
          diff: <code>DungeonDifficulty</code>,
          modifiers: <code>modifiers</code>,
          mods: (
            <>
              <code>NO_HEALING</code>, <code>DOUBLE_DAMAGE_TAKEN</code>, <code>CONSTANT_RAIN</code>,{" "}
              <code>PERMANENT_DARKNESS</code>, <code>REDUCED_TIME_LIMIT</code>
            </>
          ),
        })}
      </p>
      <Callout tone="tip">
        {fill(c.diffTip, { difficulties: <code>difficulties</code>, normal: <code>normal</code> })}
      </Callout>

      <SectionHeading id="checkpoints">{c.cpTitle}</SectionHeading>
      <p>
        {fill(c.cpBody, {
          cpMode: <code>checkpoints.mode</code>,
          reviveCp: <code>REVIVE_AT_CHECKPOINT</code>,
          restartRoom: <code>RESTART_ROOM</code>,
          restartDungeon: <code>RESTART_DUNGEON</code>,
          reviveMode: <code>revive.mode</code>,
          none: <code>NONE</code>,
        })}
      </p>

      <SectionHeading id="estructuras-fisicas">{c.libTitle}</SectionHeading>
      <p>
        {fill(c.libBody, { room: <code>DungeonRoom</code>, reuse: <strong>{c.reuseWord}</strong> })}
      </p>
      <p>{fill(c.libIntro, { dir: <code>structures/*.yml</code> })}</p>
      <Table>
        <Thead>
          <Th>{c.thSource}</Th>
          <Th>{c.thHowGen}</Th>
          <Th>{c.thHowPaste}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td><Badge tone="violet">CUSTOM</Badge></Td>
            <Td>{c.sCustomGen}</Td>
            <Td>{fill(c.sCustomPaste, { api: <code>World#setBlockData</code> })}</Td>
          </Tr>
          <Tr>
            <Td><Badge tone="blue">NATIVE</Badge></Td>
            <Td>{c.sNativeGen}</Td>
            <Td>{fill(c.sNativePaste, { api: <code>Bukkit#getStructureManager()</code> })}</Td>
          </Tr>
          <Tr>
            <Td><Badge tone="green">SCHEMATIC</Badge></Td>
            <Td>{fill(c.sSchemGen, { ext: <code>.schem</code>, dir: <code>schematics/</code> })}</Td>
            <Td>{fill(c.sSchemPaste, { api: <><code>ClipboardHolder</code> + <code>EditSession</code></> })}</Td>
          </Tr>
        </tbody>
      </Table>
      <Callout tone="info" title={c.whyTwoTitle}>
        {fill(c.whyTwoBody, {
          ids: (
            <>
              <code>stone_entrance</code>, <code>treasure_vault</code>, <code>torch_corridor</code>,{" "}
              <code>boss_arena_small</code>
            </>
          ),
        })}
      </Callout>

      <SectionHeading id="importar-structure-block" level={3}>{c.importTitle}</SectionHeading>
      <p>
        {fill(c.importBody, {
          sb: <em>{c.structureBlock}</em>,
          save: <strong>{c.saveWord}</strong>,
          example: <code>rpgroll:sala_trasgos</code>,
          ns: <code>minecraft:</code>,
        })}
      </p>
      <CodeBlock language="bash" code={"/dungeonadmin structure import rpgroll:sala_trasgos sala_trasgos \"Sala de los Trasgos\""} />
      <p>
        {fill(c.importAfter, {
          nbt: <code>.nbt</code>,
          path: <code>structures/sala_trasgos.nbt</code>,
          source: <code>source: NATIVE</code>,
        })}
      </p>

      <SectionHeading id="importar-schematic" level={3}>{c.schemTitle}</SectionHeading>
      <p>
        {fill(c.schemBody, {
          schematic: <code>SCHEMATIC</code>,
          needWE: <strong>{c.needWE}</strong>,
          cmd: <Kbd>//schematic save miroom</Kbd>,
          path: <code>plugins/WorldEdit/schematics/miroom.schem</code>,
        })}
      </p>
      <CodeBlock
        language="bash"
        code={"/dungeonadmin structure importschem miroom sala_wizard \"Torre del Mago\""}
      />
      <p>
        {fill(c.schemAfter, {
          ext: <code>.schem</code>,
          path: <code>structures/sala_wizard.schem</code>,
          source: <code>source: SCHEMATIC</code>,
          cmd: <Kbd>/dungeonadmin structure paste</Kbd>,
        })}
      </p>

      <SectionHeading id="formato-custom" level={3}>{c.customTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename={c.customFile}
        code={
          "id: stone_entrance\n" +
          'display-name: "Entrada de Piedra"\n' +
          "icon: STONE_BRICKS\n" +
          "source: CUSTOM\n\n" +
          "anchor: { x: 3, y: 0, z: 3 }\n\n" +
          "palette:\n" +
          "  '#': STONE_BRICKS\n" +
          "  '.': AIR\n" +
          "  'T': TORCH\n" +
          "  'G': GLOWSTONE\n\n" +
          "layers:\n" +
          "  - # y=0 (piso)\n" +
          '    - "#######"\n' +
          '    - "#######"\n' +
          "    # ...\n" +
          "  - # y=1 (paredes)\n" +
          '    - "#######"\n' +
          '    - "#T...T#"\n' +
          "    # ...\n"
        }
      />
      <p>{fill(c.anchorBody, { anchor: <code>anchor</code> })}</p>
      <Callout tone="warning" title={c.noBlockDataTitle}>
        {fill(c.noBlockDataBody, { setType: <code>setType()</code> })}
      </Callout>

      <SectionHeading id="pegar-estructura" level={3}>{c.pasteTitle}</SectionHeading>
      <p>{fill(c.pasteBody, { browser: <Kbd>/dungeonadmin structure browser</Kbd> })}</p>
      <CodeBlock
        language="bash"
        code={"/dungeonadmin structure paste boss_arena_small world 100 64 -200 CLOCKWISE_90"}
      />
      <YamlBuilder
        title={c.bStructure}
        description={c.bStructureDesc}
        folder="structures"
        fields={structureFields(c)}
      />

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="dungeons/trial_of_ash.yml"
        code={
          "# Ejemplo mínimo: solo \"id\" es obligatorio, todo lo demás usa sus valores\n" +
          "# por defecto salvo lo que se especifique aquí.\n" +
          "id: trial_of_ash\n" +
          "category: trial\n" +
          'display-name: "&6Prueba de Ceniza"\n' +
          "icon: NETHERRACK\n" +
          'description: "Una prueba corta de una sola sala, pensada para un jugador."\n' +
          "recommended-level: 5\n" +
          "estimated-minutes: 5\n" +
          "min-players: 1\n" +
          "max-players: 1\n" +
          "cooldown: 1h\n" +
          "repeatable: true\n" +
          "tags: [trial, solo]\n" +
          "\n" +
          "lobby:\n" +
          "  world: world\n" +
          "  x: 0\n" +
          "  y: 64\n" +
          "  z: 100\n" +
          "  yaw: 0\n" +
          "  pitch: 0\n" +
          "\n" +
          "bounds:\n" +
          "  world: world\n" +
          "  min-x: -15\n" +
          "  min-y: 50\n" +
          "  min-z: 85\n" +
          "  max-x: 15\n" +
          "  max-y: 80\n" +
          "  max-z: 115\n" +
          "\n" +
          "rooms:\n" +
          "  - id: sala_unica\n" +
          "    type: COMBAT\n" +
          "    entry:\n" +
          "      world: world\n" +
          "      x: 0\n" +
          "      y: 64\n" +
          "      z: 100\n" +
          "    waves:\n" +
          "      - id: wave1\n" +
          "        mobs:\n" +
          "          - id: forest_goblin\n" +
          "            amount: 2\n" +
          "        time-limit: 0s\n" +
          "        delay-before: 0s\n" +
          "\n" +
          "difficulties:\n" +
          "  - id: normal\n" +
          '    display-name: "Normal"\n' +
          "    health-multiplier: 1.0\n" +
          "    damage-multiplier: 1.0\n" +
          "    loot-multiplier: 1.0\n" +
          "\n" +
          "loot:\n" +
          "  - type: EXPERIENCE\n" +
          "    amount-min: 30\n" +
          "    amount-max: 50\n" +
          "    chance: 100\n" +
          "    scope: PER_PLAYER\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename={c.denFile}
        code={
          "id: goblin_den\n" +
          "category: cave\n" +
          'display-name: "&2Guarida de los Trasgos"\n' +
          "min-players: 1\n" +
          "max-players: 4\n" +
          "cooldown: 12h\n" +
          "\n" +
          "rooms:\n" +
          "  - id: entrada\n" +
          "    type: ENTRANCE\n" +
          "    entry: { world: world, x: 0, y: 64, z: 5 }\n" +
          "    events:\n" +
          "      ROOM_ENTER:\n" +
          "        - type: MESSAGE\n" +
          '          value: "&2El eco de gruñidos resuena en la oscuridad..."\n' +
          "\n" +
          "  - id: sala_trasgos\n" +
          "    type: COMBAT\n" +
          "    waves:\n" +
          "      - id: wave1\n" +
          "        mobs: [{ id: forest_goblin, amount: 3 }]\n" +
          "        time-limit: 0s\n" +
          "      - id: wave2\n" +
          "        mobs: [{ id: forest_goblin, amount: 4 }]\n" +
          "        time-limit: 90s\n" +
          "        delay-before: 3s\n" +
          "\n" +
          "  - id: sala_jefe\n" +
          "    type: BOSS\n" +
          "    boss: ash_colossus\n" +
          "    events:\n" +
          "      ROOM_ENTER:\n" +
          "        - type: TITLE\n" +
          '          title: "&4&l¡El Coloso de Ceniza despierta!"\n' +
          "\n" +
          "difficulties:\n" +
          "  - id: normal\n" +
          '    display-name: "Normal"\n' +
          "    health-multiplier: 1.0\n" +
          "  - id: hard\n" +
          '    display-name: "Difícil"\n' +
          "    health-multiplier: 1.5\n" +
          "    damage-multiplier: 1.3\n" +
          "    modifiers: [DOUBLE_DAMAGE_TAKEN]\n" +
          "\n" +
          "checkpoints: { mode: REVIVE_AT_CHECKPOINT, shared-lives: false, max-retries: 3 }\n" +
          "revive: { mode: BY_TEAMMATE }\n" +
          "\n" +
          "triggers:\n" +
          "  DUNGEON_START:\n" +
          "    - type: MESSAGE\n" +
          '      value: "&a¡Entraron a la Guarida de los Trasgos!"\n'
        }
      />

      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, { file: <code>dungeons/reference_full.yml</code> })}
      </Callout>

      <YamlBuilder
        title={c.bDungeon}
        description={c.bDungeonDesc}
        folder="dungeons"
        fields={dungeonFields(c)}
      />

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>
        {fill(c.guiBody, {
          browser: <Kbd>/dungeonadmin browser</Kbd>,
          editor: <Kbd>{"/dungeonadmin editor <id>"}</Kbd>,
          hub: <code>DungeonEditorHubGUI</code>,
          structBrowser: <Kbd>/dungeonadmin structure browser</Kbd>,
          above: (
            <button
              type="button"
              className="underline"
              onClick={() => document.getElementById("estructuras-fisicas")?.scrollIntoView()}
            >
              {c.aboveWord}
            </button>
          ),
        })}
      </p>

      <SectionHeading id="comandos-jugador">{c.playerCmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/dungeon list</Td><Td>{c.pList}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeon info <id>"}</Td><Td>{c.pInfo}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeon invite <jugador> | accept | decline"}</Td><Td>{c.pInvite}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/dungeon leaveparty</Td><Td>{c.pLeaveParty}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeon enter <id> [dificultad]"}</Td><Td>{c.pEnter}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/dungeon leave</Td><Td>{c.pLeave}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeon revive <jugador>"}</Td><Td>{c.pRevive}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeon ranking <id> [daily|weekly|monthly|global]"}</Td><Td>{c.pRanking}</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="comandos-admin">{c.adminCmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/dungeonadmin create <id>"}</Td><Td>{c.aCreate}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeonadmin forcestop <id>"}</Td><Td>{c.aForceStop}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/dungeonadmin browser</Td><Td>{c.aBrowser}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeonadmin editor <id>"}</Td><Td>{c.aEditor}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/dungeonadmin reload</Td><Td>{c.aReload}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/dungeonadmin structure list</Td><Td>{c.aStructList}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeonadmin structure info <id>"}</Td><Td>{c.aStructInfo}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeonadmin structure paste <id> [mundo x y z] [rotación]"}</Td><Td>{c.aStructPaste}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeonadmin structure import <nombreVanilla> <id> [nombre...]"}</Td><Td>{c.aStructImport}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/dungeonadmin structure importschem <archivo.schem> <id> [nombre...]"}</Td><Td>{c.aStructImportSchem}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/dungeonadmin structure browser</Td><Td>{c.aStructBrowser}</Td></Tr>
        </tbody>
      </Table>
      <p>{fill(c.permNote, { perm: <Badge tone="amber">rpgrolldungeons.admin.*</Badge> })}</p>

      <SectionHeading id="placeholders">{c.phTitle}</SectionHeading>
      <p>{fill(c.phIntro, { exp: <Badge tone="violet">rpgrolldungeons</Badge> })}</p>
      <Table>
        <Thead>
          <Th>{c.thPlaceholder}</Th>
          <Th>{c.thValue}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">%rpgrolldungeons_active_count% / _definitions_count</Td><Td>{c.phActive}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgrolldungeons_occupied_<id>%"}</Td><Td>{fill(c.phOccupied, { yesno: <><code>si</code>/<code>no</code></> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrolldungeons_in_dungeon%</Td><Td>{fill(c.phInDungeon, { yesno: <><code>si</code>/<code>no</code></> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrolldungeons_current_dungeon% / _current_room</Td><Td>{fill(c.phCurrent, { dash: <code>-</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgrolldungeons_cooldown_<id>%"}</Td><Td>{c.phCooldown}</Td></Tr>
        </tbody>
      </Table>

      <PrevNext current="dungeons" onNavigate={onNavigate} />
    </>
  );
}
