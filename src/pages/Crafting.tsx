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
import { CRAFTING_COPY, type CraftingCopy } from "./copy/crafting";

const mono = "font-mono text-xs";

const stationFields = (c: CraftingCopy): YamlField[] => [
  {
    key: "id",
    label: c.fId,
    type: "string",
    default: c.phNewStation,
    placeholder: "iron_forge",
  },
  {
    key: "display-name",
    label: c.fDisplayName,
    type: "string",
    placeholder: c.phForge,
  },
  {
    key: "icon",
    label: c.fIcon,
    type: "string",
    default: "SMITHING_TABLE",
  },
  {
    key: "trigger-block-material",
    label: c.fTriggerBlock,
    type: "string",
    default: "SMITHING_TABLE",
  },
  {
    key: "inventory-size",
    label: c.fInvSize,
    type: "number",
    default: "27",
  },
  {
    key: "ingredient-slots",
    label: c.fIngSlots,
    type: "list",
    placeholder: "0, 1, 2, 3",
  },
  {
    key: "fuel-slot",
    label: c.fFuelSlot,
    type: "number",
    default: "-1",
  },
  {
    key: "output-slot",
    label: c.fOutputSlot,
    type: "number",
    default: "26",
  },
  {
    key: "requires-fuel",
    label: c.fRequiresFuel,
    type: "boolean",
    default: "false",
  },
  { key: "gui-title", label: c.fGuiTitle, type: "string" },
  {
    key: "allowed-recipe-ids",
    label: c.fAllowedRecipes,
    type: "list",
  },
];

const recipeFields = (c: CraftingCopy): YamlField[] => [
  {
    key: "id",
    label: c.fId,
    type: "string",
    default: c.phNewRecipe,
    placeholder: "steel_ingot",
  },
  {
    key: "display-name",
    label: c.fDisplayName,
    type: "string",
    placeholder: c.phSteel,
  },
  {
    key: "icon",
    label: c.fIcon,
    type: "string",
    default: "CRAFTING_TABLE",
  },
  {
    key: "station-id",
    label: c.fStationId,
    type: "string",
    placeholder: "iron_forge",
  },
  {
    key: "processing-time-ticks",
    label: c.fProcTime,
    type: "number",
    default: "100",
  },
  {
    key: "fuel-per-craft",
    label: c.fFuelPerCraft,
    type: "number",
    default: "0",
  },
  {
    key: "xp-amount",
    label: c.fXp,
    type: "number",
    default: "0",
  },
  {
    key: "economy-currency-id",
    label: c.fCurrency,
    type: "string",
  },
  {
    key: "economy-cost",
    label: c.fCost,
    type: "number",
    default: "0",
  },
  {
    key: "fail-chance",
    label: c.fFailChance,
    type: "number",
    default: "-1",
  },
  {
    key: "quality-enabled",
    label: c.fQualityEnabled,
    type: "boolean",
    default: "false",
  },
];

const fuelFields = (c: CraftingCopy): YamlField[] => [
  {
    key: "id",
    label: c.fId,
    type: "string",
    default: c.phNewFuel,
    placeholder: "charcoal_fuel",
  },
  {
    key: "display-name",
    label: c.fDisplayName,
    type: "string",
    placeholder: c.phCharcoal,
  },
  { key: "icon", label: c.fIcon, type: "string", default: "COAL" },
  {
    key: "material-or-item-id",
    label: c.fMaterialOrItem,
    type: "string",
    default: "COAL",
  },
  {
    key: "is-custom-item",
    label: c.fIsCustomItem,
    type: "boolean",
    default: "false",
  },
  {
    key: "burn-ticks",
    label: c.fBurnTicks,
    type: "number",
    default: "1600",
  },
  {
    key: "consume-amount",
    label: c.fConsumeAmount,
    type: "number",
    default: "1",
  },
];

export function Crafting({
  onNavigate,
}: {
  onNavigate: (slug: string) => void;
}) {
  const { locale } = useI18n();
  const c = CRAFTING_COPY[locale];

  return (
    <>
      <PageHeader title={c.title}>
        {fill(c.intro, {
          rich: <strong>{c.richWord}</strong>,
          stations: <strong>{c.stationsWord}</strong>,
          prof: <strong>{c.profWord}</strong>,
        })}
      </PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thPlugin}</Th>
          <Th>{c.thType}</Th>
          <Th>{c.thWhatFor}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td>RPGRoll-Lib</Td>
            <Td>
              <Badge tone="violet">depend</Badge>
            </Td>
            <Td>{c.rLib}</Td>
          </Tr>
          <Tr>
            <Td>RPGRoll (core)</Td>
            <Td>
              <Badge>softdepend</Badge>
            </Td>
            <Td>{c.rCore}</Td>
          </Tr>
          <Tr>
            <Td>RPGRoll-Items</Td>
            <Td>
              <Badge>softdepend</Badge>
            </Td>
            <Td>
              {fill(c.rItems, {
                m1: <code>ItemsPlugin#getItemManager()</code>,
                m2: <code>getItemFactory()</code>,
              })}
            </Td>
          </Tr>
          <Tr>
            <Td>RPGRoll-Economy</Td>
            <Td>
              <Badge>softdepend</Badge>
            </Td>
            <Td>{c.rEconomy}</Td>
          </Tr>
          <Tr>
            <Td>RPGRoll-Guilds</Td>
            <Td>
              <Badge>softdepend</Badge>
            </Td>
            <Td>{fill(c.rGuilds, { cond: <code>GUILD_MEMBER</code> })}</Td>
          </Tr>
          <Tr>
            <Td>RPGRoll-Seasons</Td>
            <Td>
              <Badge>softdepend</Badge>
            </Td>
            <Td>{fill(c.rSeasons, { cond: <code>SEASON</code> })}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="identidad-de-item">{c.identityTitle}</SectionHeading>
      <p>
        {fill(c.identityBody, {
          key: <code>rpgroll:item_id</code>,
          key2: <code>rpgroll-items:item-id</code>,
        })}
      </p>
      <Callout tone="tip" title={c.plainTitle}>
        {fill(c.plainBody, { material: <code>Material</code> })}
      </Callout>

      <SectionHeading id="ingredientes">{c.ingTitle}</SectionHeading>
      <p>
        {fill(c.ingBody, {
          spec: <code>IngredientSpec</code>,
          type: <code>type</code>,
          value: <code>value</code>,
          amount: <code>amount</code>,
          minQuality: <code>min-quality</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thValueExpects}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className={mono}>MATERIAL</Td>
            <Td>{fill(c.iMaterial, { material: <code>Material</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>TAG</Td>
            <Td>
              {fill(c.iTag, { example: <code>minecraft:planks</code> })}
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>ITEM_ID</Td>
            <Td>{c.iItemId}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>ANY</Td>
            <Td>{c.iAny}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="condiciones">{c.condTitle}</SectionHeading>
      <p>{c.condBody}</p>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thChecks}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className={mono}>LEVEL_MIN</Td>
            <Td>{fill(c.cLevel, { min: <code>min-value</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>RACE / CLASS</Td>
            <Td>{c.cRace}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>JOB_MIN</Td>
            <Td>
              {fill(c.cJob, {
                value: <code>value</code>,
                min: <code>min-value</code>,
              })}
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>PERMISSION</Td>
            <Td>{c.cPermission}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>WORLD</Td>
            <Td>{c.cWorld}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>HOUR_RANGE</Td>
            <Td>{fill(c.cHour, { example: <code>"6-18"</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>BIOME</Td>
            <Td>{c.cBiome}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>SEASON</Td>
            <Td>{c.cSeason}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>GUILD_MEMBER</Td>
            <Td>{c.cGuild}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>WEATHER</Td>
            <Td>
              {fill(c.cWeather, {
                clear: <code>CLEAR</code>,
                rain: <code>RAIN</code>,
                thunder: <code>THUNDER</code>,
              })}
            </Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="calidad">{c.qualTitle}</SectionHeading>
      <p>
        {fill(c.qualBody, {
          enabled: <code>quality-enabled: true</code>,
          cls: <code>CraftQuality</code>,
          ranchQuality: <code>ProductQuality</code>,
          minQuality: <code>min-quality</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thTier}</Th>
          <Th>{c.thValueMult}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td>{c.qCrude}</Td>
            <Td>x0.75</Td>
          </Tr>
          <Tr>
            <Td>{c.qStandard}</Td>
            <Td>x1.0</Td>
          </Tr>
          <Tr>
            <Td>{c.qFine}</Td>
            <Td>x1.3</Td>
          </Tr>
          <Tr>
            <Td>{c.qMaster}</Td>
            <Td>x1.7</Td>
          </Tr>
          <Tr>
            <Td>{c.qLegendary}</Td>
            <Td>x2.5</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="estaciones-personalizadas">
        {c.stationsTitle}
      </SectionHeading>
      <p>
        {fill(c.stationsBody, {
          cls: <code>CustomStation</code>,
          material: <code>Material</code>,
          runtime: <code>StationRuntime</code>,
          path: (
            <code>
              station-instances/&lt;mundo&gt;_&lt;x&gt;_&lt;y&gt;_&lt;z&gt;.yml
            </code>
          ),
          engine: <code>StationProcessingEngine</code>,
          interval: <code>station-tick-interval-ticks</code>,
        })}
      </p>
      <Callout tone="warning" title={c.outputWarnTitle}>
        {c.outputWarnBody}
      </Callout>

      <SectionHeading id="estructura-multibloque" level={3}>
        {c.structTitle}
      </SectionHeading>
      <p>
        {fill(c.structBody, {
          key: <code>structure-requirements</code>,
          dx: <code>dx</code>,
          dy: <code>dy</code>,
          dz: <code>dz</code>,
          material: <code>material</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        code={
          "structure-requirements:\n" +
          "  - dx: -1\n    dy: 0\n    dz: -1\n    material: IRON_BLOCK\n" +
          "  - dx: 1\n    dy: 0\n    dz: -1\n    material: IRON_BLOCK\n" +
          "  - dx: -1\n    dy: 0\n    dz: 1\n    material: IRON_BLOCK\n" +
          "  - dx: 1\n    dy: 0\n    dz: 1\n    material: IRON_BLOCK\n"
        }
      />

      <SectionHeading id="niveles-de-estacion" level={3}>
        {c.tiersTitle}
      </SectionHeading>
      <p>
        {fill(c.tiersBody, {
          maxTier: <code>max-tier</code>,
          speedBonus: <code>speed-bonus-per-tier</code>,
          failReduction: <code>fail-reduction-per-tier</code>,
          runtime: <code>StationRuntime</code>,
          tier: <code>tier</code>,
          cmd: <Kbd>/crafting upgrade</Kbd>,
          upgrades: <code>tier-upgrades</code>,
          time: <code>processing-time-ticks</code>,
          fail: <code>fail-chance</code>,
        })}
      </p>

      <SectionHeading id="proficiencia" level={3}>
        {c.profTitle}
      </SectionHeading>
      <p>
        {fill(c.profBody, {
          skillFactor: <code>skillFactor</code>,
          category: <code>skill-category</code>,
          xp: <code>xp-amount</code>,
          path: <code>proficiency/&lt;uuid&gt;.yml</code>,
          roller: <code>QualityRoller</code>,
          cmd: <Kbd>{"/crafting proficiency <categoria>"}</Kbd>,
        })}
      </p>
      <Callout tone="tip" title={c.profTipTitle}>
        {fill(c.profTipBody, { api: <code>CraftingAPI.proficiency()</code> })}
      </Callout>

      <SectionHeading id="recetas-personalizadas">
        {c.recipesTitle}
      </SectionHeading>
      <p>
        {fill(c.recipesBody, {
          cls: <code>CustomRecipe</code>,
          stationId: <code>station-id</code>,
          result: <code>result</code>,
          default: <code>default-fail-chance</code>,
        })}
      </p>

      <SectionHeading id="recetas-vanilla">{c.vanillaTitle}</SectionHeading>
      <p>
        {fill(c.vanillaBody, {
          cls: <code>VanillaRecipeDefinition</code>,
          addRecipe: <code>Bukkit.addRecipe()</code>,
          recipe: <code>Recipe</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>type</Th>
          <Th>{c.thVanillaStation}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className={mono}>CRAFTING_TABLE_SHAPED / SHAPELESS</Td>
            <Td>{c.vTable}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>
              FURNACE / BLAST_FURNACE / SMOKER / CAMPFIRE
            </Td>
            <Td>{c.vFurnace}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>STONECUTTER</Td>
            <Td>{c.vStonecutter}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>SMITHING_TRANSFORM</Td>
            <Td>{c.vSmithing}</Td>
          </Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title={c.vanillaWarnTitle}>
        {fill(c.vanillaWarnBody, {
          event: <code>PrepareItemCraftEvent</code>,
        })}
      </Callout>

      <SectionHeading id="motores-dedicados">{c.enginesTitle}</SectionHeading>
      <p>{fill(c.enginesBody, { recipe: <code>Recipe</code> })}</p>
      <Table>
        <Thead>
          <Th>{c.thStation}</Th>
          <Th>{c.thEngine}</Th>
          <Th>{c.thIntercepts}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td>{c.eAnvil}</Td>
            <Td className={mono}>AnvilEngine</Td>
            <Td>
              {fill(c.eAnvilBody, {
                event: <code>PrepareAnvilEvent</code>,
                def: <code>AnvilRecipeDefinition</code>,
              })}
            </Td>
          </Tr>
          <Tr>
            <Td>{c.eBrewing}</Td>
            <Td className={mono}>BrewingEngine</Td>
            <Td>
              {fill(c.eBrewingBody, {
                event: <code>BrewEvent</code>,
                def: <code>BrewRecipeDefinition</code>,
              })}
            </Td>
          </Tr>
          <Tr>
            <Td>{c.eGrindstone}</Td>
            <Td className={mono}>GrindstoneEngine</Td>
            <Td>
              {fill(c.eGrindstoneBody, {
                event: <code>PrepareGrindstoneEvent</code>,
                def: <code>GrindstoneRecipeDefinition</code>,
              })}
            </Td>
          </Tr>
          <Tr>
            <Td>{c.eCartography}</Td>
            <Td className={mono}>CartographyEngine</Td>
            <Td>
              {fill(c.eCartographyBody, {
                event: <code>CartographyItemEvent</code>,
                def: <code>CartographyRecipeDefinition</code>,
              })}
            </Td>
          </Tr>
          <Tr>
            <Td>{c.eLoom}</Td>
            <Td className={mono}>LoomEngine</Td>
            <Td>
              {fill(c.eLoomBody, { def: <code>LoomRecipeDefinition</code> })}
            </Td>
          </Tr>
          <Tr>
            <Td>{c.eVillager}</Td>
            <Td className={mono}>VillagerTradeEngine</Td>
            <Td>
              {fill(c.eVillagerBody, {
                e1: <code>VillagerAcquireTradeEvent</code>,
                e2: <code>VillagerReplenishTradeEvent</code>,
                def: <code>VillagerTradeDefinition</code>,
              })}
            </Td>
          </Tr>
          <Tr>
            <Td>{c.eCrafter}</Td>
            <Td className={mono}>CrafterAutomationEngine</Td>
            <Td>
              {fill(c.eCrafterBody, { event: <code>CrafterCraftEvent</code> })}
            </Td>
          </Tr>
        </tbody>
      </Table>
      <p>{c.enginesNoMatchBody}</p>

      <SectionHeading id="piedra-de-amolar" level={3}>
        {c.grindTitle}
      </SectionHeading>
      <p>
        {fill(c.grindBody, {
          def: <code>GrindstoneRecipeDefinition</code>,
          upper: <code>upper</code>,
          lower: <code>lower</code>,
          result: <code>result</code>,
          dir: <code>grindstone-recipes/</code>,
        })}
      </p>

      <SectionHeading id="mesa-de-cartografia" level={3}>
        {c.cartTitle}
      </SectionHeading>
      <p>
        {fill(c.cartBody, {
          def: <code>CartographyRecipeDefinition</code>,
          map: <code>map</code>,
          item: <code>item</code>,
          result: <code>result</code>,
          dir: <code>cartography-recipes/</code>,
        })}
      </p>

      <SectionHeading id="telar" level={3}>
        {c.loomTitle}
      </SectionHeading>
      <p>
        {fill(c.loomBody, {
          def: <code>LoomRecipeDefinition</code>,
          banner: <code>banner</code>,
          dye: <code>dye</code>,
          pattern: <code>pattern</code>,
          result: <code>result</code>,
          dir: <code>loom-recipes/</code>,
        })}
      </p>

      <SectionHeading id="comercio-de-aldeanos" level={3}>
        {c.villagerTitle}
      </SectionHeading>
      <p>
        {fill(c.villagerBody, {
          def: <code>VillagerTradeDefinition</code>,
          bind: <em>{c.bindWord}</em>,
          cmd: <Kbd>{"/craftingadmin villager bind <id1,id2,...>"}</Kbd>,
          unbind: <Kbd>/craftingadmin villager unbind</Kbd>,
        })}
      </p>

      <SectionHeading id="automatizacion-de-crafter" level={3}>
        {c.crafterTitle}
      </SectionHeading>
      <p>
        {fill(c.crafterBody, {
          def: <code>VanillaRecipeDefinition</code>,
          engine: <code>CrafterAutomationEngine</code>,
        })}
      </p>

      <SectionHeading id="descubrimiento">{c.discTitle}</SectionHeading>
      <p>
        {fill(c.discBody, {
          cls: <code>CustomRecipe</code>,
          path: <code>discoveries/&lt;uuid&gt;.yml</code>,
          event: <code>RecipeDiscoverEvent</code>,
          cmd: <Kbd>/crafting book</Kbd>,
        })}
      </p>
      <p>
        {fill(c.expBody, {
          cmd: <Kbd>/crafting experiment</Kbd>,
          allow: <code>allow-experimentation: true</code>,
          cooldown: <code>experimentation-cooldown-seconds</code>,
        })}
      </p>

      <SectionHeading id="procesamiento-offline">
        {c.offlineTitle}
      </SectionHeading>
      <p>
        {fill(c.offlineBody, {
          start: <em>{c.startWord}</em>,
          player: <code>Player</code>,
          evaluator: <code>ConditionEvaluator</code>,
          stationWorld: <em>{c.stationWorldWord}</em>,
          conds: (
            <>
              <code>WORLD</code>/<code>HOUR_RANGE</code>/<code>SEASON</code>/
              <code>WEATHER</code>
            </>
          ),
        })}
      </p>
      <Callout tone="warning" title={c.offlineWarnTitle}>
        {fill(c.offlineWarnBody, {
          permission: <code>PERMISSION</code>,
          biome: <code>BIOME</code>,
        })}
      </Callout>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="stations/iron_forge.yml"
        code={
          "id: iron_forge\n" +
          'display-name: "Forja de Hierro"\n' +
          "icon: SMITHING_TABLE\n" +
          "trigger-block-material: SMITHING_TABLE\n" +
          "inventory-size: 27\n" +
          "ingredient-slots: [0, 1, 2, 3]\n" +
          "fuel-slot: 9\n" +
          "output-slot: 26\n" +
          "requires-fuel: true\n" +
          'gui-title: "Forja de Hierro"\n' +
          "allowed-recipe-ids: []\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="recipes/steel_ingot.yml"
        code={
          "id: steel_ingot\n" +
          'display-name: "Lingote de Acero"\n' +
          "icon: IRON_INGOT\n" +
          "station-id: iron_forge\n" +
          "processing-time-ticks: 200\n" +
          "fuel-per-craft: 2\n" +
          "xp-amount: 5\n" +
          "fail-chance: 0.1\n" +
          "quality-enabled: true\n" +
          "result:\n  type: MATERIAL\n  value: IRON_INGOT\n  amount: 1\n" +
          "ingredients:\n  - type: MATERIAL\n    value: IRON_ORE\n    amount: 2\n  - type: MATERIAL\n    value: COAL\n    amount: 1\n" +
          "conditions:\n  - type: LEVEL_MIN\n    min-value: 5\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="fuels/charcoal_fuel.yml"
        code={
          "id: charcoal_fuel\n" +
          'display-name: "Carbón vegetal"\n' +
          "icon: CHARCOAL\n" +
          "material-or-item-id: CHARCOAL\n" +
          "is-custom-item: false\n" +
          "burn-ticks: 1600\n" +
          "consume-amount: 1\n"
        }
      />
      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, {
          files: (
            <>
              <code>recipes/reference_full.yml</code>,{" "}
              <code>stations/reference_full.yml</code>,{" "}
              <code>fuels/reference_full.yml</code>,{" "}
              <code>vanilla-recipes/reference_full.yml</code>,{" "}
              <code>anvil-recipes/reference_full.yml</code>,{" "}
              <code>brew-recipes/reference_full.yml</code>
            </>
          ),
        })}
      </Callout>

      <YamlBuilder
        title={c.builderStation}
        folder="stations"
        fields={stationFields(c)}
      />
      <YamlBuilder
        title={c.builderRecipe}
        folder="recipes"
        fields={recipeFields(c)}
      />
      <YamlBuilder
        title={c.builderFuel}
        folder="fuels"
        fields={fuelFields(c)}
      />

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>
        {fill(c.guiBody, {
          cmd: <Kbd>/craftingadmin browser</Kbd>,
          ten: <strong>{c.tenBrowsers}</strong>,
          e1: <code>MATERIAL IRON_INGOT 2</code>,
          e2: <code>LEVEL_MIN 5</code>,
          fields: (
            <>
              <code>shape</code>/<code>key</code>/<code>ingredients</code>
            </>
          ),
          book: <Kbd>/crafting book</Kbd>,
        })}
      </p>

      <SectionHeading id="api">{c.apiTitle}</SectionHeading>
      <p>
        {fill(c.apiBody, {
          isReady: <code>CraftingAPI.isReady()</code>,
          get: <code>CraftingAPI.get()</code>,
          discovery: <code>discovery()</code>,
          proficiency: <code>proficiency()</code>,
          stationAt: <code>stationAt(world, x, y, z)</code>,
          runtime: <code>StationRuntime</code>,
          tier: <code>tier</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thEvent}</Th>
          <Th>{c.thWhen}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className={mono}>CraftPrepareEvent</Td>
            <Td>{c.ev1}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>CraftStartEvent</Td>
            <Td>{c.ev2}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>CraftProcessEvent</Td>
            <Td>{c.ev3}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>CraftCompleteEvent</Td>
            <Td>{c.ev4}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>CraftFailEvent</Td>
            <Td>{c.ev5}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>RecipeDiscoverEvent</Td>
            <Td>{c.ev6}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>StationOpenEvent</Td>
            <Td>{c.ev7}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>StationCloseEvent</Td>
            <Td>{c.ev8}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="comandos">{c.cmdsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
          <Th>{c.thPermission}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className={mono}>/craftingadmin browser</Td>
            <Td>{c.a1}</Td>
            <Td>
              <Badge tone="violet">rpgrollcrafting.admin.*</Badge>
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>/craftingadmin reload</Td>
            <Td>{c.a2}</Td>
            <Td>
              <Badge tone="violet">rpgrollcrafting.admin.*</Badge>
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>
              {"/craftingadmin give <player> <item-id>"}
            </Td>
            <Td>{c.a3}</Td>
            <Td>
              <Badge tone="violet">rpgrollcrafting.admin.*</Badge>
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>
              {"/craftingadmin villager bind <id1,id2,...>"}
            </Td>
            <Td>{c.a4}</Td>
            <Td>
              <Badge tone="violet">rpgrollcrafting.admin.*</Badge>
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>/craftingadmin villager unbind</Td>
            <Td>{c.a5}</Td>
            <Td>
              <Badge tone="violet">rpgrollcrafting.admin.*</Badge>
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>/crafting book</Td>
            <Td>{c.u1}</Td>
            <Td>
              <Badge>rpgrollcrafting.use</Badge>
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>/crafting discover</Td>
            <Td>{c.u2}</Td>
            <Td>
              <Badge>rpgrollcrafting.use</Badge>
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>/crafting upgrade</Td>
            <Td>{c.u3}</Td>
            <Td>
              <Badge>rpgrollcrafting.use</Badge>
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>/crafting experiment</Td>
            <Td>
              {fill(c.u4, { allow: <code>allow-experimentation</code> })}
            </Td>
            <Td>
              <Badge>rpgrollcrafting.use</Badge>
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>
              {"/crafting proficiency <categoria>"}
            </Td>
            <Td>{c.u5}</Td>
            <Td>
              <Badge>rpgrollcrafting.use</Badge>
            </Td>
          </Tr>
        </tbody>
      </Table>

      <PrevNext current="crafting" onNavigate={onNavigate} />
    </>
  );
}
