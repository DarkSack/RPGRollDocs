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
import { ADDONS_F_COPY, type AddonsFCopy } from "./copy/addonsF";

type WorkersCopy = AddonsFCopy["workers"];

const professionFields = (c: WorkersCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: "nueva_profesion", placeholder: "miner" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&7Minero" },
  { key: "icon", label: c.fIcon, type: "string", default: "VILLAGER_SPAWN_EGG" },
  { key: "description", label: c.fDescription, type: "string" },
  { key: "entity-type", label: c.fEntityType, type: "string", default: "VILLAGER" },
  { key: "skills", label: c.fSkills, type: "list", placeholder: "mining_speed, vein_detection" },
  { key: "schedule", label: c.fSchedule, type: "string" },
  { key: "wage-amount", label: c.fWage, type: "number", default: "0" },
  { key: "wage-type", label: c.fWageType, type: "select", options: ["HOURLY", "PER_TASK"], default: "PER_TASK" },
  { key: "tool-material", label: c.fTool, type: "string" },
  {
    key: "reskin",
    label: c.fReskin,
    type: "group",
    fields: [
      { key: "material", label: c.fMaterial, type: "string", placeholder: "PAPER" },
      { key: "custom-model-data", label: c.fCmd, type: "number", placeholder: "100001" },
      { key: "scale", label: c.fScale, type: "number", default: "1.0" },
    ],
  },
];

export function Workers({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = ADDONS_F_COPY[locale].workers;

  return (
    <>
      <PageHeader title={c.title} slug="workers">
        {c.intro}
      </PageHeader>

      <Callout tone="info" title={c.treeTitle}>
        {fill(c.treeBody, {
          profession: <code>Profession</code>,
          aiRule: <code>AiRule</code>,
          work: <code>WORK</code>,
        })}
      </Callout>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        code={"depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, RPGRoll-FX, RPGRoll-Effects, RPGRoll-Seasons, RPGRoll-Ranching, RPGRoll-Fishing, RPGRoll-Guilds, Vault, SackResourcePack]"}
      />
      <p>
        {c.reqBody1}{" "}
        <a href="/ranching" className="text-violet-600 underline dark:text-violet-400">
          RPGRoll-Ranching
        </a>
        {c.reqBody2}{" "}
        <a href="/sackresourcepack" className="text-violet-600 underline dark:text-violet-400">
          SackResourcePack
        </a>
        {fill(c.reqBody3, {
          reskin: (
            <a href="#reskin" onClick={(e) => e.preventDefault()}>
              {c.reskinLink}
            </a>
          ),
          entityType: <code>entity-type</code>,
        })}
      </p>

      <SectionHeading id="reskin">{c.reskinTitle}</SectionHeading>
      <p>
        {fill(c.reskinBody, {
          cmd: <code>CustomModelData</code>,
          display: <code>ItemDisplay</code>,
          cmdLower: <code>custom-model-data</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename={c.reskinFragFile}
        code={
          "reskin:\n" +
          "  material: PAPER\n" +
          "  custom-model-data: 100001\n" +
          "  scale: 1.0\n" +
          "  y-offset: 0.0\n"
        }
      />
      <p>
        {fill(c.reskinBody2, {
          cmd: <code>custom-model-data</code>,
          path: (
            <code>
              plugins/RPGRoll-Workers/resourcepack/&lt;namespace&gt;/&lt;textures|models&gt;/item/...
            </code>
          ),
        })}
      </p>
      <Callout tone="warning" title={c.untestedTitle}>
        {c.untestedBody}
      </Callout>

      <SectionHeading id="ia">{c.aiTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCondition}</Th>
          <Th>{c.thActivates}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">HUNGRY / TIRED / SLEEPY / STRESSED</Td><Td>{c.iNeeds}</Td></Tr>
          <Tr><Td className="font-mono text-xs">INVENTORY_FULL</Td><Td>{c.iInvFull}</Td></Tr>
          <Tr><Td className="font-mono text-xs">RAINING / NIGHT</Td><Td>{fill(c.iWeather, { api: <><code>World#hasStorm()</code> / <code>World#getTime()</code></> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">LOW_HAPPINESS</Td><Td>{c.iHappiness}</Td></Tr>
          <Tr><Td className="font-mono text-xs">ALWAYS</Td><Td>{c.iAlways}</Td></Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.eatBody, { eat: <code>EAT</code>, rule: <code>HUNGRY → EAT</code> })}
      </p>
      <CodeBlock
        language="yaml"
        filename={c.aiFragFile}
        code={
          "ai-rules:\n" +
          "  - condition: HUNGRY\n" +
          "    action: EAT\n" +
          "    priority: 10\n" +
          "  - condition: INVENTORY_FULL\n" +
          "    action: STORE_ITEMS\n" +
          "    priority: 20\n" +
          "  - condition: RAINING\n" +
          "    action: SEEK_SHELTER\n" +
          "    priority: 30\n" +
          "  - condition: NIGHT\n" +
          "    action: GO_HOME\n" +
          "    priority: 40\n" +
          "  - condition: ALWAYS\n" +
          "    action: WORK\n" +
          "    priority: 100\n"
        }
      />

      <SectionHeading id="necesidades-personalidad">{c.needsTitle}</SectionHeading>
      <p>{c.needsBody}</p>
      <p>{c.traitBody}</p>
      <Table>
        <Thead>
          <Th>{c.thTrait}</Th>
          <Th>{c.thEffect}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">LAZY</Td><Td>{c.pLazy}</Td></Tr>
          <Tr><Td className="font-mono text-xs">FAST</Td><Td>{c.pFast}</Td></Tr>
          <Tr><Td className="font-mono text-xs">RESPONSIBLE / AMBITIOUS</Td><Td>{c.pResponsible}</Td></Tr>
          <Tr><Td className="font-mono text-xs">CLUMSY</Td><Td>{c.pClumsy}</Td></Tr>
          <Tr><Td className="font-mono text-xs">SMART / RESPONSIBLE</Td><Td>{c.pSmart}</Td></Tr>
          <Tr><Td className="font-mono text-xs">SOCIAL / COWARD / etc.</Td><Td>{c.pOther}</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="profesiones-habilidades">{c.profTitle}</SectionHeading>
      <p>
        {fill(c.profBody, {
          profession: <code>Profession</code>,
          behavior: <code>ProfessionBehavior</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thProfession}</Th>
          <Th>{c.thBehavior}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">miner</Td><Td>{c.bMiner}</Td></Tr>
          <Tr><Td className="font-mono text-xs">farmer</Td><Td>{c.bFarmer}</Td></Tr>
          <Tr><Td className="font-mono text-xs">lumberjack</Td><Td>{c.bLumberjack}</Td></Tr>
          <Tr><Td className="font-mono text-xs">rancher</Td><Td>{fill(c.bRancher, { real: <strong>{c.realIntegration}</strong>, api: <code>RanchingAPI.feedAnimal(...)</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">fisherman</Td><Td>{c.bFisherman}</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title={c.fishTitle}>
        {fill(c.fishBody1, {
          forceCatch: <code>FishingAPI.forceCatch(...)</code>,
          player: <code>Player</code>,
          behavior: <code>FishingBehavior</code>,
        })}{" "}
        <a href="/fishing" className="text-violet-600 underline dark:text-violet-400">
          RPGRoll-Fishing
        </a>
        {c.fishBody2}
      </Callout>

      <SectionHeading id="inventario-logistica">{c.invTitle}</SectionHeading>
      <p>
        {fill(c.invBody, {
          inventory: <code>Inventory</code>,
          designator: <Kbd>/workersadmin designator</Kbd>,
          warehouses: <code>warehouses.yml</code>,
        })}
      </p>

      <SectionHeading id="vivienda">{c.houseTitle}</SectionHeading>
      <p>{fill(c.houseBody, { sleep: <code>SLEEP</code> })}</p>

      <SectionHeading id="economia">{c.ecoTitle}</SectionHeading>
      <p>
        {fill(c.ecoBody, {
          vault: <code>VaultEconomy</code>,
          hourly: <code>HOURLY</code>,
          perTask: <code>PER_TASK</code>,
        })}
      </p>
      <p>{c.moralBody}</p>

      <SectionHeading id="eventos">{c.eventsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thWhen}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">ILLNESS / ACCIDENT / STRIKE</Td><Td>{c.eIllness}</Td></Tr>
          <Tr><Td className="font-mono text-xs">VACATION</Td><Td>{c.eVacation}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PROMOTION</Td><Td>{c.ePromotion}</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="professions/rancher.yml"
        code={
          "id: rancher\n" +
          'display-name: "&6Ganadero"\n' +
          "icon: HAY_BLOCK\n" +
          'description: "Busca animales de RPGRoll-Ranching cercanos y los alimenta de verdad."\n' +
          "entity-type: VILLAGER\n" +
          "skills: [animal_care]\n" +
          "schedule: standard_day\n" +
          "wage-amount: 45\n" +
          "wage-type: HOURLY\n" +
          "tool-material: null\n" +
          "ai-rules:\n" +
          "  - condition: HUNGRY\n" +
          "    action: EAT\n" +
          "    priority: 10\n" +
          "  - condition: RAINING\n" +
          "    action: SEEK_SHELTER\n" +
          "    priority: 30\n" +
          "  - condition: NIGHT\n" +
          "    action: GO_HOME\n" +
          "    priority: 40\n" +
          "  - condition: ALWAYS\n" +
          "    action: WORK\n" +
          "    priority: 100\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="schedules/standard_day.yml"
        code={
          "id: standard_day\n" +
          'display-name: "Jornada Estándar"\n' +
          'description: "06:00 despertar, 07:00 desayuno, 08:00-13:00 y 14:00-20:00 trabajo, 22:00 dormir."\n' +
          "entries:\n" +
          "  - start-tick: 0\n" +
          "    activity: WAKE\n" +
          "  - start-tick: 1000\n" +
          "    activity: EAT\n" +
          "  - start-tick: 2000\n" +
          "    activity: WORK\n" +
          "  - start-tick: 7000\n" +
          "    activity: EAT\n" +
          "  - start-tick: 8000\n" +
          "    activity: WORK\n" +
          "  - start-tick: 14000\n" +
          "    activity: REST\n" +
          "  - start-tick: 16000\n" +
          "    activity: SLEEP\n"
        }
      />

      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, { file: <code>professions/reference_full.yml</code> })}
      </Callout>

      <YamlBuilder
        title={c.bTitle}
        description={c.bDesc}
        folder="professions"
        fields={professionFields(c)}
      />

      <SectionHeading id="skins">{c.skinsTitle}</SectionHeading>
      <p>{c.skinsBody}</p>
      <Callout tone="tip" title={c.skinSrcTitle}>
        {fill(c.skinSrcBody, {
          link: <code>mineskin.org/...</code>,
          id: <code>mineskin:&lt;id&gt;</code>,
          path: <code>workers/&lt;uuid&gt;.yml</code>,
          fields: (
            <>
              <code>skin.value</code> / <code>skin.signature</code>
            </>
          ),
        })}
      </Callout>

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>{fill(c.guiBody, { browser: <Kbd>/workersadmin browser</Kbd> })}</p>

      <SectionHeading id="api">{c.apiTitle}</SectionHeading>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={
          "// Darle comportamiento físico real a una profesión custom (ej. si algún día\n" +
          "// existen RPGRoll-Mining o RPGRoll-Blacksmith).\n" +
          "WorkersAPI.get().registerBehavior(\"blacksmith\", (worker, entity, profession) -> {\n" +
          "    // romper/fabricar lo que corresponda\n" +
          "});\n" +
          "\n" +
          "// Pensado en primer lugar para un futuro objetivo de RPGRoll-Quests\n" +
          "// (\"contratá 5 trabajadores\") — la consulta ya funciona, solo falta\n" +
          "// que Quests defina el tipo de objetivo que la llame.\n" +
          "List<Worker> misWorkers = WorkersAPI.get().getEmployedWorkers(player.getUniqueId());\n"
        }
      />

      <SectionHeading id="comandos">{c.cmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/workersadmin browser</Td><Td>{c.wBrowser}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/workersadmin reload</Td><Td>{c.wReload}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/workersadmin spawn <profesion> [nombre]"}</Td><Td>{c.wSpawn}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/workersadmin designator</Td><Td>{c.wDesignator}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/workersadmin skin <mineskin|jugador|quitar>"}</Td><Td>{fill(c.wSkin, { remove: <code>quitar</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/workers inspect</Td><Td>{c.wInspect}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/workers hire</Td><Td>{c.wHire}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/workers fire</Td><Td>{c.wFire}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/workers list</Td><Td>{c.wList}</Td></Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.permNote, {
          admin: <code>/workersadmin</code>,
          p1: <Badge tone="amber">rpgrollworkers.admin.*</Badge>,
          use: <code>/workers</code>,
          p2: <Badge tone="blue">rpgrollworkers.use</Badge>,
          p1b: <Badge tone="amber">rpgrollworkers.admin.*</Badge>,
          p3: <Badge tone="amber">rpgrollworkers.sethome</Badge>,
        })}
      </p>
      <p>{c.regionsBody}</p>
      <PrevNext current="workers" onNavigate={onNavigate} />
    </>
  );
}
