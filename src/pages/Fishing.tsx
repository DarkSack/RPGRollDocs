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
import { useI18n, fill, localizedPageLabel } from "../i18n";
import { ADDONS_D_COPY, type AddonsDCopy } from "./copy/addonsD";

type FishingCopy = AddonsDCopy["fishing"];

const speciesFields = (c: FishingCopy): YamlField[] => [
  {
    key: "id",
    label: c.fId,
    type: "string",
    default: "nueva_especie",
    placeholder: "river_trout",
  },
  {
    key: "display-name",
    label: c.fDisplayName,
    type: "string",
    placeholder: "&bTrucha de Río",
  },
  { key: "icon", label: c.fIcon, type: "string", default: "COD" },
  {
    key: "custom-model-data",
    label: c.fCmd,
    type: "number",
    default: "0",
  },
  { key: "description", label: c.fDescription, type: "string" },
  {
    key: "category",
    label: c.fCategory,
    type: "select",
    options: [
      "FRESHWATER",
      "SALTWATER",
      "DEEP",
      "TROPICAL",
      "ARCTIC",
      "VOLCANIC",
      "MAGIC",
      "LEGENDARY",
    ],
    default: "FRESHWATER",
  },
  {
    key: "rarity",
    label: c.fRarity,
    type: "select",
    options: ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY"],
    default: "COMMON",
  },
  {
    key: "water-types",
    label: c.fWaterTypes,
    type: "list",
    placeholder: "RIVER, LAKE",
  },
  { key: "biomes", label: c.fBiomes, type: "list" },
  {
    key: "min-weight",
    label: c.fMinWeight,
    type: "number",
    default: "0.5",
  },
  { key: "max-weight", label: c.fMaxWeight, type: "number", default: "3" },
  {
    key: "min-length",
    label: c.fMinLength,
    type: "number",
    default: "15",
  },
  {
    key: "max-length",
    label: c.fMaxLength,
    type: "number",
    default: "40",
  },
  { key: "base-price", label: c.fBasePrice, type: "number", default: "5" },
  {
    key: "base-experience",
    label: c.fBaseXp,
    type: "number",
    default: "3",
  },
  {
    key: "behavior",
    label: c.fBehavior,
    type: "select",
    options: ["SHY", "AGGRESSIVE", "FAST", "SLOW", "JUMPER", "ELUSIVE"],
    default: "SLOW",
  },
  {
    key: "attracted-by-bait-tags",
    label: c.fBaitTags,
    type: "list",
  },
  {
    key: "catch-effect",
    label: c.fCatchEffect,
    type: "string",
  },
  {
    key: "catch-status-effect",
    label: c.fCatchStatus,
    type: "string",
  },
];

const rodFields = (c: FishingCopy): YamlField[] => [
  {
    key: "id",
    label: c.fId,
    type: "string",
    default: "nueva_cana",
    placeholder: "apprentice_rod",
  },
  {
    key: "display-name",
    label: c.fDisplayName,
    type: "string",
    placeholder: "&fCaña de Aprendiz",
  },
  {
    key: "material",
    label: c.fMaterial,
    type: "string",
    default: "FISHING_ROD",
  },
  { key: "description", label: c.fDescription, type: "string" },
  { key: "durability", label: c.fDurability, type: "number", default: "64" },
  {
    key: "cast-power",
    label: c.fCastPower,
    type: "number",
    default: "1.0",
  },
  {
    key: "reel-speed",
    label: c.fReelSpeed,
    type: "number",
    default: "1.0",
  },
  {
    key: "precision",
    label: c.fPrecision,
    type: "number",
    default: "0",
  },
  {
    key: "resistance",
    label: c.fResistance,
    type: "number",
    default: "1.0",
  },
  {
    key: "luck-bonus",
    label: c.fLuck,
    type: "number",
    default: "1.0",
  },
  { key: "preferred-categories", label: c.fPreferred, type: "list" },
];

export function Fishing({
  onNavigate,
}: {
  onNavigate: (slug: string) => void;
}) {
  const { locale } = useI18n();
  const c = ADDONS_D_COPY[locale].fishing;
  const label = (slug: string) => localizedPageLabel(slug, pageTitle(slug), locale);

  return (
    <>
      <PageHeader title={c.title} slug="fishing">
        {c.intro}
      </PageHeader>

      <Callout tone="info" title={c.vanillaTitle}>
        {fill(c.vanillaBody, {
          event: <code>PlayerFishEvent</code>,
          state: <code>CAUGHT_FISH</code>,
          strong: <strong>{fill(c.vanillaStrong, { lava: <code>water-types: [LAVA]</code> })}</strong>,
        })}
      </Callout>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        code={
          "depend: [RPGRoll]\nsoftdepend: [RPGRoll-FX, RPGRoll-Effects, RPGRoll-Seasons, SackResourcePack]"
        }
      />
      <p>
        {c.reqBody1}{" "}
        <button
          type="button"
          onClick={() => onNavigate("seasons")}
          className="text-violet-600 underline dark:text-violet-400"
        >
          {label("seasons")}
        </button>
        {fill(c.reqBody2, {
          seasons: <code>allowed-seasons</code>,
          effects: (
            <>
              <code>catch-effect</code>/<code>catch-status-effect</code>
            </>
          ),
        })}{" "}
        <button
          type="button"
          onClick={() => onNavigate("sackresourcepack")}
          className="text-violet-600 underline dark:text-violet-400"
        >
          {label("sackresourcepack")}
        </button>
        {fill(c.reqBody3, { cmd: <code>custom-model-data</code>, icon: <code>icon</code> })}
      </p>

      <SectionHeading id="especies">{c.speciesTitle}</SectionHeading>
      <p>
        {fill(c.speciesBody, {
          species: <code>FishSpecies</code>,
          cmd: <code>CustomModelData</code>,
          strong: <strong>{c.speciesStrong}</strong>,
          waterTypes: <code>water-types</code>,
        })}
      </p>
      <Callout tone="info" title={c.texTitle}>
        {fill(c.texBody, {
          cmd: <code>custom-model-data</code>,
          path: (
            <code>plugins/RPGRoll-Fishing/resourcepack/&lt;namespace&gt;/&lt;textures|models&gt;/item/...</code>
          ),
          icon: <code>icon</code>,
        })}
      </Callout>
      <Table>
        <Thead>
          <Th>{c.thCondition}</Th>
          <Th>{c.thHow}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">water-types</Td>
            <Td>{fill(c.cWater, { region: <code>FishingRegion</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">biomes</Td>
            <Td>{fill(c.cBiomes, { ex: <code>river</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">depths</Td>
            <Td>{c.cDepths}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">allowed-weathers</Td>
            <Td>{fill(c.cWeather, { api: <code>World#hasStorm/isThundering</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">allowed-times</Td>
            <Td>{fill(c.cTimes, { api: <code>World#getTime()</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">allowed-seasons</Td>
            <Td>{c.cSeasons}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="legendarios">{c.legendaryTitle}</SectionHeading>
      <p>
        {fill(c.legendaryBody, {
          flag: <code>legendary: true</code>,
          besides: <strong>{c.legendaryBesides}</strong>,
          reqLevel: <code>required-level</code>,
          fullMoon: <code>requires-full-moon</code>,
          formula: <code>(fullTime / 24000) % 8 == 0</code>,
          reqBait: <code>required-bait</code>,
        })}
      </p>

      <SectionHeading id="canas-carnadas">{c.rodsTitle}</SectionHeading>
      <Callout tone="tip" title={c.rodsTipTitle}>
        {fill(c.rodsTipBody, { rod: <code>FishingRod</code>, catalyst: <code>SpellCatalyst</code> })}
      </Callout>
      <Table>
        <Thead>
          <Th>{c.thRodField}</Th>
          <Th>{c.thEffect}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">reel-speed</Td>
            <Td>{c.rReelSpeed}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">precision</Td>
            <Td>{c.rPrecision}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">resistance</Td>
            <Td>{c.rResistance}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">luck-bonus</Td>
            <Td>{c.rLuck}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">preferred-categories</Td>
            <Td>{c.rPreferred}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">cast-power</Td>
            <Td>{c.rCastPower}</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.baitBody, {
          quality: <code>quality-bonus</code>,
          legWeight: <code>legendary-weight-multiplier</code>,
          legendary: <code>legendary</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="baits/golden_lure.yml"
        code={
          "id: golden_lure\n" +
          'display-name: "&6Señuelo Dorado"\n' +
          "material: GOLD_NUGGET\n" +
          'description: "La carnada legendaria — atrae la atención de lo que normalmente ni se acerca."\n' +
          "tags: [magic, shiny]\n" +
          "quality-bonus: 3\n" +
          "legendary-weight-multiplier: 6.0\n"
        }
      />

      <SectionHeading id="tesoros-basura">{c.treasureTitle}</SectionHeading>
      <p>
        {fill(c.treasureBody, {
          chances: (
            <>
              <code>treasure-chance</code>/<code>junk-chance</code>
            </>
          ),
          stack: <code>ItemStack</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="treasures/sunken_chest.yml"
        code={
          "id: sunken_chest\n" +
          'display-name: "&6Cofre Hundido"\n' +
          "icon: CHEST\n" +
          'description: "Un pequeño cofre que se hundió hace años — todavía tiene algo de valor adentro."\n' +
          "rarity: RARE\n" +
          "reward-material: EMERALD\n" +
          "reward-amount: 3\n" +
          "weight: 1.0\n"
        }
      />

      <SectionHeading id="regiones">{c.regionsTitle}</SectionHeading>
      <p>
        {fill(c.regionsBody, {
          region: <code>FishingRegion</code>,
          seasonRegion: <code>SeasonRegion</code>,
          waterType: <code>WaterType</code>,
          magic: <code>MAGIC_WATER</code>,
          corrupted: <code>CORRUPTED_WATER</code>,
        })}
      </p>

      <SectionHeading id="minijuego">{c.miniTitle}</SectionHeading>
      <p>
        {fill(c.miniBody, {
          rpgMode: <code>rpg-mode: true</code>,
          strong: <strong>{c.miniStrong}</strong>,
          behavior: <code>behavior</code>,
          jumper: <code>JUMPER</code>,
          rpgModeOff: <code>rpg-mode: false</code>,
        })}
      </p>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="species/dragon_fish.yml"
        code={
          "id: dragon_fish\n" +
          'display-name: "&4Pez Dragón"\n' +
          "icon: TROPICAL_FISH\n" +
          "custom-model-data: 1002\n" +
          'description: "Vive cerca de fumarolas volcánicas submarinas — quema al sacarlo del agua."\n' +
          "category: VOLCANIC\n" +
          "rarity: EPIC\n" +
          "water-types: [DEEP_OCEAN]\n" +
          "min-weight: 3\n" +
          "max-weight: 12\n" +
          "min-length: 40\n" +
          "max-length: 90\n" +
          "base-price: 60\n" +
          "base-experience: 25\n" +
          "behavior: AGGRESSIVE\n" +
          "catch-status-effect: burning\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="species/leviathan.yml"
        code={
          "id: leviathan\n" +
          'display-name: "&5&lLeviatán"\n' +
          "icon: TROPICAL_FISH\n" +
          "custom-model-data: 1000\n" +
          'description: "Una criatura ancestral que solo emerge bajo condiciones extremadamente específicas. Requiere la Carnada Legendaria."\n' +
          "category: LEGENDARY\n" +
          "rarity: LEGENDARY\n" +
          "depths: [BOTTOM, UNDERWATER_CAVE]\n" +
          "min-weight: 80\n" +
          "max-weight: 250\n" +
          "min-length: 300\n" +
          "max-length: 800\n" +
          "base-price: 500\n" +
          "base-experience: 200\n" +
          "behavior: ELUSIVE\n" +
          "allowed-seasons: [winter]\n" +
          "allowed-weathers: [STORM]\n" +
          "legendary: true\n" +
          "required-level: 50\n" +
          "requires-full-moon: true\n" +
          "required-bait: golden_lure\n" +
          "catch-effect: level_up\n"
        }
      />

      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, {
          file: <code>species/reference_full.yml</code>,
          fields: (
            <>
              <code>biomes</code>, <code>allowed-times</code> &amp; <code>attracted-by-bait-tags</code>
            </>
          ),
        })}
      </Callout>

      <YamlBuilder
        title={c.bSpecies}
        description={c.bSpeciesDesc}
        folder="species"
        fields={speciesFields(c)}
      />
      <YamlBuilder
        title={c.bRod}
        folder="rods"
        fields={rodFields(c)}
      />

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>
        {fill(c.guiBody, { browser: <Kbd>/fishingadmin browser</Kbd>, enc: <Kbd>/fishing encyclopedia</Kbd> })}
      </p>

      <SectionHeading id="api">{c.apiTitle}</SectionHeading>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={
          "// Pensado en primer lugar para un futuro RPGRoll-Quests objective\n" +
          '// ("capturá 15 peces legendarios") o RPGRoll-Cooking.\n' +
          'boolean yaLoConoce = FishingAPI.get().hasCaught(player, "leviathan");\n' +
          'int vecesCapturado = FishingAPI.get().getCaughtCount(player, "river_trout");\n' +
          "\n" +
          "// Forzar una tirada de captura por código, sin pasar por el minijuego ni la vara física.\n" +
          "CatchResult resultado = FishingAPI.get().forceCatch(player, hookLocation);\n"
        }
      />
      <Callout tone="tip" title={c.apiTipTitle}>
        {c.apiTipBody}
      </Callout>

      <SectionHeading id="comandos">{c.cmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">/fishingadmin browser</Td>
            <Td>{c.cBrowser}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">/fishingadmin reload</Td>
            <Td>{c.cReload}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/fishingadmin giverod <id>"}
            </Td>
            <Td>{c.cGiveRod}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/fishingadmin givebait <id>"}
            </Td>
            <Td>{c.cGiveBait}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">/fishing encyclopedia</Td>
            <Td>{c.cEncyclopedia}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">/fishing stats</Td>
            <Td>{c.cStats}</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.permNote, {
          admin: <code>/fishingadmin</code>,
          p1: <Badge tone="amber">rpgrollfishing.admin.*</Badge>,
          use: <code>/fishing</code>,
          p2: <Badge tone="blue">rpgrollfishing.use</Badge>,
        })}
      </p>
      <PrevNext current="fishing" onNavigate={onNavigate} />
    </>
  );
}
