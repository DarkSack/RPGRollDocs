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
import { pageTitle } from "../content/nav";
import { useI18n, fill, localizedPageLabel, localizedCaveatTitle, localizedCaveatBody } from "../i18n";
import { ADDONS_C_COPY, type AddonsCCopy } from "./copy/addonsC";

type SeasonsCopy = AddonsCCopy["seasons"];

const CAVEAT_TITLE = "La temperatura por bioma es una tabla propia, no un valor real de Bukkit";
const CAVEAT_BODY =
  "Bukkit no expone la temperatura interna real de un bioma como un double consultable de forma estable entre versiones — Seasons mantiene su propia tabla aproximada en plugins/RPGRoll-Seasons/biome-temperatures.yml (editable), y cada estación suma un delta por bioma encima de esa base.";

const seasonFields = (c: SeasonsCopy): YamlField[] => [
  {
    key: "id",
    label: c.fId,
    type: "string",
    default: "nueva_estacion",
    placeholder: "spring",
  },
  {
    key: "display-name",
    label: c.fDisplayName,
    type: "string",
    placeholder: "&aPrimavera",
  },
  {
    key: "icon",
    label: c.fIcon,
    type: "string",
    default: "SUNFLOWER",
  },
  { key: "color", label: c.fColor, type: "string", default: "WHITE" },
  { key: "description", label: c.fDescription, type: "string" },
  { key: "duration-amount", label: c.fDuration, type: "number", default: "7" },
  {
    key: "duration-unit",
    label: c.fDurationUnit,
    type: "select",
    options: ["REAL_HOURS", "REAL_DAYS", "REAL_WEEKS", "MINECRAFT_DAYS"],
    default: "MINECRAFT_DAYS",
  },
  {
    key: "exclusive-boss",
    label: c.fBoss,
    type: "string",
  },
  {
    key: "world-event-daily-chance",
    label: c.fEventChance,
    type: "number",
    default: "0",
  },
  { key: "tags", label: c.fTags, type: "list", placeholder: "mild, growth" },
];

export function Seasons({
  onNavigate,
}: {
  onNavigate: (slug: string) => void;
}) {
  const { locale } = useI18n();
  const c = ADDONS_C_COPY[locale].seasons;

  return (
    <>
      <PageHeader title={c.title} slug="seasons">
        {c.intro}
      </PageHeader>

      <Callout tone="info" title={c.calTitle}>
        {fill(c.calBody, { cal: <code>SeasonCalendar</code>, javaCal: <code>java.util.Calendar</code> })}
      </Callout>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        code={
          "depend: [RPGRoll]\nsoftdepend: [RPGRoll-FX, RPGRoll-Effects, RPGRoll-Mobs]"
        }
      />
      <p>
        {fill(c.reqBody1, {
          mobMods: (
            <>
              <code>mob-modifiers</code>/<code>exclusive-boss</code>
            </>
          ),
        })}{" "}
        <button
          type="button"
          onClick={() => onNavigate("rpgroll-effects")}
          className="text-violet-600 underline dark:text-violet-400"
        >
          {localizedPageLabel("rpgroll-effects", pageTitle("rpgroll-effects"), locale)}
        </button>
        {fill(c.reqBody2, { applyEffect: <code>APPLY_EFFECT</code> })}
      </p>

      <SectionHeading id="calendarios">{c.calendarsTitle}</SectionHeading>
      <p>
        {fill(c.calendarsBody, {
          classic: <em>Primavera/Verano/Otoño/Invierno</em>,
          example: <em>Luna Roja → Era del Sol → Oscuridad → Renacimiento</em>,
          clock: <code>"world:&lt;nombre&gt;"</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="calendars/default_calendar.yml"
        code={
          "id: default_calendar\n" +
          'display-name: "Calendario Estándar"\n' +
          'description: "El ciclo clásico de 4 estaciones."\n' +
          "\n" +
          "seasons:\n" +
          "  - spring\n" +
          "  - summer\n" +
          "  - autumn\n" +
          "  - winter\n"
        }
      />

      <SectionHeading id="subestaciones">{c.subTitle}</SectionHeading>
      <p>
        {fill(c.subBody, { replaces: <strong>{c.subReplaces}</strong> })}
      </p>

      <SectionHeading id="clima">{c.climateTitle}</SectionHeading>
      <p>
        {fill(c.climateBody, {
          profile: <code>ClimateProfile</code>,
          task: <code>WeatherTickTask</code>,
          api: <code>World#setStorm/setThundering</code>,
        })}
      </p>
      <Callout tone="warning" title={localizedCaveatTitle("seasons", CAVEAT_TITLE, locale)}>
        {localizedCaveatBody("seasons", CAVEAT_TITLE, CAVEAT_BODY, locale)}
      </Callout>

      <SectionHeading id="vegetacion">{c.vegTitle}</SectionHeading>
      <p>
        {fill(c.vegBody, { task: <code>VegetationTask</code> })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thEffect}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">SNOW_LAYERS</Td>
            <Td>{c.vSnow}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">ICE_LAKES</Td>
            <Td>{c.vIce}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">DRY_GRASS</Td>
            <Td>{c.vDry}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">FALLING_LEAVES</Td>
            <Td>{c.vLeaves}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">FLOWER_BOOM</Td>
            <Td>{c.vFlower}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="mobs-jefes">{c.mobsTitle}</SectionHeading>
      <p>
        {fill(c.mobsBody, {
          mobMods: <code>mob-modifiers</code>,
          boss: <code>exclusive-boss</code>,
          fullTime: <code>World#getFullTime()</code>,
        })}
      </p>

      <SectionHeading id="eventos">{c.eventsTitle}</SectionHeading>
      <p>
        {fill(c.eventsBody, {
          event: <code>WorldEvent</code>,
          all: <strong>{c.eventsAll}</strong>,
          worldEvents: <code>world-events</code>,
          chance: <code>world-event-daily-chance</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thComponent}</Th>
          <Th>{c.thScope}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">PARTICLE / SOUND / VISUAL</Td>
            <Td>{c.ePerPlayer}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">APPLY_EFFECT</Td>
            <Td>{c.eEffect}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">SPAWN_MOB</Td>
            <Td>{fill(c.eSpawn, { chance: <code>chance</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">MESSAGE</Td>
            <Td>{c.eMessage}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">COMMAND / SET_WEATHER</Td>
            <Td>{c.eCommand}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="regiones">{c.regionsTitle}</SectionHeading>
      <p>
        {fill(c.regionsBody, { region: <code>SeasonRegion</code> })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thMode}</Th>
          <Th>{c.thBehaviour}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">FOLLOW_WORLD_CALENDAR</Td>
            <Td>{c.mFollow}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">PINNED_SEASON</Td>
            <Td>{c.mPinnedSeason}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">PINNED_CALENDAR</Td>
            <Td>{c.mPinnedCal}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="seasons/summer.yml (plugins/RPGRoll-Seasons/seasons/)"
        code={
          "id: summer\n" +
          'display-name: "&eVerano"\n' +
          "icon: WHEAT\n" +
          "color: YELLOW\n" +
          'description: "Calor intenso, sequías y ríos bajos. El Coloso de Ceniza a veces despierta."\n' +
          "duration-amount: 7\n" +
          "duration-unit: MINECRAFT_DAYS\n" +
          "tags: [hot, drought]\n" +
          "exclusive-boss: ash_colossus\n" +
          "world-events: [meteor_shower]\n" +
          "world-event-daily-chance: 0.2\n" +
          "\n" +
          "climate:\n" +
          "  rain-chance: 0.1\n" +
          "  storm-chance: 0.02\n" +
          "  base-temperature: 28\n" +
          "  temperature-variance: 5\n" +
          "  heatwave-chance: 0.15\n" +
          "\n" +
          "vegetation-effects:\n" +
          "  - DRY_GRASS\n" +
          "\n" +
          "biome-temperature-modifiers:\n" +
          "  desert: 10\n" +
          "  plains: 5\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="seasons/winter.yml"
        code={
          "id: winter\n" +
          'display-name: "&bInvierno"\n' +
          "icon: SNOWBALL\n" +
          "color: AQUA\n" +
          'description: "Nieve, ríos congelados, y las auroras más frecuentes del año."\n' +
          "duration-amount: 7\n" +
          "duration-unit: MINECRAFT_DAYS\n" +
          "world-events: [aurora]\n" +
          "world-event-daily-chance: 0.25\n" +
          "\n" +
          "climate:\n" +
          "  rain-chance: 0.3\n" +
          "  storm-chance: 0.1\n" +
          "  snow-chance: 0.5\n" +
          "  base-temperature: -5\n" +
          "\n" +
          "vegetation-effects:\n" +
          "  - SNOW_LAYERS\n" +
          "  - ICE_LAKES\n" +
          "\n" +
          "biome-temperature-modifiers:\n" +
          "  taiga: -15\n" +
          "  snowy_taiga: -10\n"
        }
      />

      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, {
          file: <code>seasons/reference_full.yml</code>,
          fields: (
            <>
              <code>sub-seasons</code> &amp; <code>mob-modifiers</code>
            </>
          ),
        })}
      </Callout>

      <YamlBuilder
        title={c.bSeason}
        description={c.bSeasonDesc}
        folder="seasons"
        fields={seasonFields(c)}
      />

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>
        {fill(c.guiBody, { browser: <Kbd>/seasonsadmin browser</Kbd> })}
      </p>

      <SectionHeading id="api">{c.apiTitle}</SectionHeading>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={
          "// Pensado en primer lugar para un futuro RPGRoll-Farming/RPGRoll-Fishing.\n" +
          "double temperatura = SeasonsAPI.get().getTemperature(location);\n" +
          "\n" +
          'Set<String> temporadasPermitidas = Set.of("spring", "summer");\n' +
          "boolean permitido = SeasonsAPI.get().isSeasonAllowed(location, temporadasPermitidas);\n" +
          "\n" +
          "// Control manual (ej. desde un comando propio o un evento de otro addon).\n" +
          'SeasonsAPI.get().setSeason(world, "winter");\n' +
          'SeasonsAPI.get().triggerWorldEvent("aurora", world);\n'
        }
      />
      <Callout tone="tip" title={c.apiTipTitle}>
        {fill(c.apiTipBody, { example: <code>allowed-seasons: [spring, summer]</code> })}
      </Callout>

      <SectionHeading id="comandos">{c.cmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">/seasonsadmin browser</Td>
            <Td>{c.cBrowser}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">/seasonsadmin reload</Td>
            <Td>{c.cReload}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/seasonsadmin setseason <mundo> <id>"}
            </Td>
            <Td>{c.cSetSeason}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/seasonsadmin advance <mundo>"}
            </Td>
            <Td>{c.cAdvance}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/seasonsadmin trigger <id> <mundo>"}
            </Td>
            <Td>{c.cTrigger}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">{"/seasons info [mundo]"}</Td>
            <Td>{c.cInfo}</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.permNote, {
          admin: <code>/seasonsadmin</code>,
          p1: <Badge tone="amber">rpgrollseasons.admin.*</Badge>,
          use: <code>/seasons</code>,
          p2: <Badge tone="blue">rpgrollseasons.use</Badge>,
        })}
      </p>
      <PrevNext current="seasons" onNavigate={onNavigate} />
    </>
  );
}
