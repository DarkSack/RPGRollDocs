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
import { RANCHING_COPY, type RanchingCopy } from "./copy/ranching";

const mono = "font-mono text-xs";

const speciesFields = (c: RanchingCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewSpecies, placeholder: "cow" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: c.phCow },
  { key: "icon", label: c.fIcon, type: "string", default: "COW_SPAWN_EGG" },
  { key: "description", label: c.fDescription, type: "string" },
  {
    key: "entity-type",
    label: c.fEntityType,
    type: "string",
    default: "COW",
    help: c.fEntityTypeHelp,
  },
  { key: "product-types", label: c.fProductTypes, type: "list", placeholder: "milk, meat, leather" },
  { key: "base-weight-min", label: c.fWeightMin, type: "number", default: "100" },
  { key: "base-weight-max", label: c.fWeightMax, type: "number", default: "300" },
  { key: "baby-stage-duration-ticks", label: c.fBabyDur, type: "number", default: "6000" },
  { key: "juvenile-stage-duration-ticks", label: c.fJuvenileDur, type: "number", default: "12000" },
  { key: "elder-threshold-ticks", label: c.fElder, type: "number", default: "240000" },
  { key: "gestation-duration-ticks", label: c.fGestation, type: "number", default: "24000" },
  { key: "min-litter-size", label: c.fLitterMin, type: "number", default: "1" },
  { key: "max-litter-size", label: c.fLitterMax, type: "number", default: "1" },
  { key: "base-fertility", label: c.fFertility, type: "number", default: "0.5" },
  { key: "diet-tags", label: c.fDietTags, type: "list", placeholder: "grain, hay" },
];

const geneFields = (c: RanchingCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewGene, placeholder: "milk_production" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: c.phMilkProduction },
  { key: "description", label: c.fDescription, type: "string" },
  { key: "attribute-key", label: c.fAttrKey, type: "string", placeholder: "milk_production" },
  {
    key: "dominance",
    label: c.fDominanceLabel,
    type: "select",
    options: ["DOMINANT", "RECESSIVE", "MIXED"],
    default: "MIXED",
  },
  { key: "min-value", label: c.fMin, type: "number", default: "0" },
  { key: "max-value", label: c.fMax, type: "number", default: "100" },
  { key: "applicable-species", label: c.fSpeciesList, type: "list", placeholder: "cow" },
];

export function Ranching({
  onNavigate,
}: {
  onNavigate: (slug: string) => void;
}) {
  const { locale } = useI18n();
  const c = RANCHING_COPY[locale];

  return (
    <>
      <PageHeader title={c.title} slug="ranching">
        {c.intro}
      </PageHeader>

      <Callout tone="info" title={c.heartTitle}>
        {fill(c.heartBody, { dominance: <code>dominance</code> })}
      </Callout>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        code={
          "depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, RPGRoll-FX, RPGRoll-Effects, RPGRoll-Seasons, SackResourcePack, Vault, FreeMinecraftModels]"
        }
      />
      <p>
        {fill(c.reqBody, {
          seasons: (
            <a href="/seasons" className="text-violet-600 underline dark:text-violet-400">
              RPGRoll-Seasons
            </a>
          ),
          api: <code>RanchingAPI</code>,
          srp: (
            <a href="/sackresourcepack" className="text-violet-600 underline dark:text-violet-400">
              SackResourcePack
            </a>
          ),
          reskinLink: (
            <a href="#reskin" onClick={(e) => e.preventDefault()}>
              {c.reskinLinkText}
            </a>
          ),
        })}
      </p>

      <SectionHeading id="genetica">{c.geneticsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thDominance}</Th>
          <Th>{c.thPhenotype}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>DOMINANT</Td><Td>{c.dDominant}</Td></Tr>
          <Tr><Td className={mono}>RECESSIVE</Td><Td>{c.dRecessive}</Td></Tr>
          <Tr><Td className={mono}>MIXED</Td><Td>{c.dMixed}</Td></Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.modesBody, { config: <code>config.yml</code>, key: <code>genetics-mode</code> })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thMode}</Th>
          <Th>{c.thHowConceives}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>SIMPLE</Td><Td>{c.mSimple}</Td></Tr>
          <Tr><Td className={mono}>ADVANCED</Td><Td>{c.mAdvanced}</Td></Tr>
          <Tr><Td className={mono}>PROBABILISTIC</Td><Td>{c.mProbabilistic}</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="tip" title={c.mutTitle}>
        {fill(c.mutBody, {
          gene: <code>Gene</code>,
          mutations: <code>mutations</code>,
          multiply: <code>MULTIPLY</code>,
          override: <code>OVERRIDE</code>,
          cosmetic: <code>COSMETIC_TAG</code>,
        })}
      </Callout>

      <SectionHeading id="linaje">{c.lineageTitle}</SectionHeading>
      <p>
        {fill(c.lineageBody, {
          never: <strong>{c.neverResolves}</strong>,
          setting: <code>inbreeding-warning-generations</code>,
        })}
      </p>

      <SectionHeading id="especies-razas">{c.speciesTitle}</SectionHeading>
      <p>
        {fill(c.speciesBody, {
          species: <code>Species</code>,
          entityType: <code>EntityType</code>,
          breed: <code>Breed</code>,
          temperament: <code>temperament</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thStage}</Th>
          <Th>{c.thTrigger}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className={mono}>BABY → JUVENILE</Td>
            <Td>{fill(c.stBaby, { ticks: <code>baby-stage-duration-ticks</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>JUVENILE → ADULT</Td>
            <Td>{fill(c.stJuvenile, { ticks: <code>juvenile-stage-duration-ticks</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>ADULT → ELDER</Td>
            <Td>{fill(c.stAdult, { ticks: <code>elder-threshold-ticks</code> })}</Td>
          </Tr>
        </tbody>
      </Table>

      <p>{c.stockBody}</p>
      <Table>
        <Thead>
          <Th>{c.thSpecies}</Th>
          <Th>{c.thBreeds}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>cow</Td><Td>holstein, jersey, angus</Td></Tr>
          <Tr><Td className={mono}>sheep</Td><Td>merino, suffolk, jacob</Td></Tr>
          <Tr><Td className={mono}>chicken</Td><Td>leghorn, rhode_island, silkie</Td></Tr>
          <Tr><Td className={mono}>pig</Td><Td>yorkshire, berkshire, mangalica</Td></Tr>
          <Tr><Td className={mono}>rabbit</Td><Td>{c.bRabbit}</Td></Tr>
          <Tr><Td className={mono}>duck</Td><Td>{c.bDuck}</Td></Tr>
          <Tr><Td className={mono}>goat</Td><Td>saanen, boer, nubian</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="modelos-animales">{c.modelsAnimalsTitle}</SectionHeading>
      <p>
        {fill(c.modelsAnimalsBody, {
          key: <code>model</code>,
          example: <code>model: ranching_holstein</code>,
          bbmodel: <code>.bbmodel</code>,
          dir: <code>plugins/FreeMinecraftModels/models/</code>,
          reload: <code>/fmm reload</code>,
        })}
      </p>
      <p>{c.modelsAdultsBody}</p>
      <Callout tone="info" title={c.emptyHandTitle}>
        {c.emptyHandBody}
      </Callout>

      <SectionHeading id="reskin">{c.reskinTitle}</SectionHeading>
      <p>
        {fill(c.reskinBody, {
          cmd: <code>CustomModelData</code>,
          breed: <code>Breed</code>,
          reskin: <code>reskin</code>,
          display: <code>ItemDisplay</code>,
          cmdKey: <code>custom-model-data</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="breeds/holstein.yml (con reskin activo)"
        code={
          "reskin:\n" +
          "  material: PAPER\n" +
          "  custom-model-data: 200001\n" +
          "  scale: 1.0\n" +
          "  y-offset: 0.0\n"
        }
      />
      <p>
        {fill(c.reskinScaleBody, {
          baby: <code>BABY</code>,
          material: <code>reskin.material</code>,
          path: (
            <code>
              plugins/RPGRoll-Ranching/resourcepack/&lt;namespace&gt;/&lt;textures|models&gt;/item/...
            </code>
          ),
        })}
      </p>
      <Callout tone="warning" title={c.reskinWarnTitle}>
        {c.reskinWarnBody}
      </Callout>

      <SectionHeading id="reproduccion">{c.breedingTitle}</SectionHeading>
      <Callout tone="tip" title={c.breedingTipTitle}>
        {fill(c.breedingTipBody, {
          event: <code>EntityBreedEvent</code>,
          gestation: <code>gestation-duration-ticks: 0</code>,
          frozen: <strong>{c.frozenWord}</strong>,
        })}
      </Callout>
      <p>
        {fill(c.gestationBody, { restart: <strong>{c.restartWarning}</strong> })}
      </p>

      <SectionHeading id="bienestar">{c.welfareTitle}</SectionHeading>
      <p>
        {fill(c.welfareBody, {
          feed: <code>Feed</code>,
          quality: <code>quality</code>,
          dietTags: <code>diet-tags</code>,
          nutrition: <code>nutrition-value</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thFactor}</Th>
          <Th>{c.thHowMeasured}</Th>
        </Thead>
        <tbody>
          <Tr><Td>{c.fLight}</Td><Td>{c.fLightBody}</Td></Tr>
          <Tr><Td>{c.fWater}</Td><Td>{c.fWaterBody}</Td></Tr>
          <Tr><Td>{c.fCompany}</Td><Td>{c.fCompanyBody}</Td></Tr>
          <Tr><Td>{c.fWeather}</Td><Td>{c.fWeatherBody}</Td></Tr>
          <Tr><Td>{c.fHealth}</Td><Td>{c.fHealthBody}</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title={c.cleanTitle}>
        {c.cleanBody}
      </Callout>

      <SectionHeading id="salud">{c.healthTitle}</SectionHeading>
      <p>
        {fill(c.healthBody, {
          vaccine: <code>Vaccine</code>,
          reduction: <code>risk-reduction</code>,
          medicine: <code>Medicine</code>,
        })}
      </p>

      <SectionHeading id="produccion">{c.prodTitle}</SectionHeading>
      <p>
        {fill(c.prodBody, {
          types: <code>product-types</code>,
          base: <code>base-production</code>,
          attrKey: <code>attribute-key</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thProduct}</Th>
          <Th>{c.thObtained}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className={mono}>milk</Td>
            <Td>{fill(c.pMilk, { event: <code>PlayerInteractEntityEvent</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>wool</Td>
            <Td>{fill(c.pWool, { event: <code>PlayerShearEntityEvent</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>eggs</Td>
            <Td>{fill(c.pEggs, { event: <code>EntityDropItemEvent</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>meat / leather / etc.</Td>
            <Td>{fill(c.pMeat, { event: <code>EntityDeathEvent</code> })}</Td>
          </Tr>
        </tbody>
      </Table>
      <p>{c.qualityBody}</p>

      <SectionHeading id="modelos">{c.modelsTitle}</SectionHeading>
      <p>
        {fill(c.modelsBody, {
          key: <code>model</code>,
          example: <code>rpgroll_ranching:feed/hay</code>,
          productModels: <code>product-models</code>,
          config: <code>config.yml</code>,
          bbDir: <code>blockbench/</code>,
          bedrockDir: <code>bedrock/</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="config.yml"
        code={
          "product-models:\n" +
          "  milk:\n" +
          "    default: rpgroll_ranching:product/milk\n" +
          "    LEGENDARY: rpgroll_ranching:product/milk_legendary\n" +
          "  eggs:\n" +
          "    default: rpgroll_ranching:product/egg\n" +
          "    LEGENDARY: rpgroll_ranching:product/egg_legendary\n" +
          "  meat: rpgroll_ranching:product/meat\n" +
          "  leather: rpgroll_ranching:product/leather\n"
        }
      />

      <SectionHeading id="duenos">{c.ownersTitle}</SectionHeading>
      <p>
        {fill(c.ownersBody, {
          perm: <Badge tone="amber">rpgrollranching.bypass-owner</Badge>,
          cmd: <code>/ranching reclamar</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thWhat}</Th>
          <Th>{c.thHow}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td>{c.oMine}</Td>
            <Td>{fill(c.oMineBody, { cmd: <code>/ranching animales</code> })}</Td>
          </Tr>
          <Tr>
            <Td>{c.oCall}</Td>
            <Td>{fill(c.oCallBody, { cmd: <code>/ranching llamar [id|todos]</code> })}</Td>
          </Tr>
          <Tr>
            <Td>{c.oPen}</Td>
            <Td>
              {fill(c.oPenBody, {
                fix: <code>/ranching corral fijar</code>,
                send: <code>/ranching corral enviar [id|todos]</code>,
              })}
            </Td>
          </Tr>
          <Tr>
            <Td>{c.oSell}</Td>
            <Td>
              {fill(c.oSellBody, {
                cmd: <code>/ranching vender &lt;precio&gt;</code>,
                buy: <code>[Comprar]</code>,
              })}
            </Td>
          </Tr>
          <Tr>
            <Td>{c.oMarket}</Td>
            <Td>{fill(c.oMarketBody, { cmd: <code>/ranching mercado</code> })}</Td>
          </Tr>
          <Tr>
            <Td>{c.oSellServer}</Td>
            <Td>{fill(c.oSellServerBody, { cmd: <code>/ranching vender servidor [id]</code> })}</Td>
          </Tr>
        </tbody>
      </Table>
      <p>{fill(c.idBody, { example: <code>#8c93ce76</code> })}</p>
      <CodeBlock
        language="yaml"
        filename="config.yml"
        code={
          "ownership:\n" +
          "  protect: true\n" +
          "  claim-unowned: true\n" +
          "  max-animals-per-player: 0   # 0 = sin límite; las crías no cuentan\n" +
          "recall:\n" +
          "  cooldown-seconds: 5\n" +
          "  cross-world: true\n" +
          "  recreate-missing: true\n" +
          "market:\n" +
          "  enabled: true\n" +
          "  min-price: 1\n" +
          "  max-price: 1000000\n" +
          "  tax-percent: 0\n" +
          "  server-shop:\n" +
          "    - {species: cow, breed: holstein, sex: RANDOM, price: 250}\n" +
          "  sell-to-server:\n" +
          "    cow: 100\n"
        }
      />

      <SectionHeading id="huevo-secreto">{c.eggTitle}</SectionHeading>
      <p>
        {fill(c.eggBody, {
          egg: <strong>{c.eggWord}</strong>,
          species: <code>trex</code>,
          breed: <code>tiranosaurio</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="config.yml"
        code={
          "secret:\n" +
          "  dino-egg-chance: 0.0005        # por huevo de gallina/pato; 0 lo desactiva\n" +
          "  sniffer-dino-egg-chance: 0.02  # por lo que desentierra un sniffer\n" +
          "  species: trex\n" +
          "  breed: tiranosaurio\n"
        }
      />

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="species/cow.yml"
        code={
          "id: cow\n" +
          'display-name: "&fVaca"\n' +
          "icon: COW_SPAWN_EGG\n" +
          'description: "Ganado bovino clásico — leche, carne y cuero."\n' +
          "entity-type: COW\n" +
          "product-types: [milk, meat, leather]\n" +
          "base-production:\n" +
          "  milk: 3.0\n" +
          "  meat: 4.0\n" +
          "  leather: 2.0\n" +
          "base-weight-min: 400\n" +
          "base-weight-max: 750\n" +
          "baby-stage-duration-ticks: 6000\n" +
          "juvenile-stage-duration-ticks: 12000\n" +
          "elder-threshold-ticks: 480000\n" +
          "gestation-duration-ticks: 24000\n" +
          "min-litter-size: 1\n" +
          "max-litter-size: 1\n" +
          "base-fertility: 0.5\n" +
          "diet-tags: [grain, hay]\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="genes/milk_production.yml"
        code={
          "id: milk_production\n" +
          'display-name: "Producción de leche"\n' +
          'description: "Qué tan lechera es la vaca — un solo padre con una copia alta alcanza para heredarla."\n' +
          "attribute-key: milk_production\n" +
          "dominance: DOMINANT\n" +
          "min-value: 0\n" +
          "max-value: 100\n" +
          "applicable-species: [cow]\n" +
          "mutations:\n" +
          "  - id: double_production\n" +
          '    display-name: "Producción doble"\n' +
          "    effect-type: MULTIPLY\n" +
          "    effect-value: 2.0\n" +
          "    chance: 0.01\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="breeds/holstein.yml"
        code={
          "id: holstein\n" +
          'display-name: "&fHolstein"\n' +
          'description: "La raza lechera por excelencia — gran producción, temperamento tranquilo."\n' +
          "species: cow\n" +
          "production-multiplier: 1.4\n" +
          "weight-multiplier: 1.1\n" +
          "fertility-multiplier: 1.0\n" +
          "resistance-multiplier: 0.9\n" +
          'temperament: "Calmada"\n' +
          "\n" +
          "# Reskin visual (opcional, ver sección más abajo) — comentado en el ejemplo real\n" +
          "# reskin:\n" +
          "#   material: PAPER\n" +
          "#   custom-model-data: 200001\n" +
          "#   scale: 1.0\n"
        }
      />

      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, { file: <code>species/reference_full.yml</code> })}
      </Callout>

      <YamlBuilder
        title={c.builderSpecies}
        description={c.builderSpeciesDesc}
        folder="species"
        fields={speciesFields(c)}
      />
      <YamlBuilder title={c.builderGene} folder="genes" fields={geneFields(c)} />

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>{fill(c.guiBody, { cmd: <Kbd>/ranchingadmin browser</Kbd> })}</p>

      <SectionHeading id="api">{c.apiTitle}</SectionHeading>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={
          "// Registrar contenido por código (mismo patrón que cualquier ContentManager#save).\n" +
          "RanchingAPI.get().species().save(nuevaEspecie);\n" +
          "\n" +
          "// Pensado en primer lugar para un futuro RPGRoll-Workers que automatice\n" +
          "// el cuidado diario sin depender de que un jugador haga click derecho.\n" +
          'RanchingAPI.get().feedAnimal(animal, "premium_grain");\n' +
          'RanchingAPI.get().treatAnimal(animal, "antibiotic_shot");\n' +
          'RanchingAPI.get().vaccinateAnimal(animal, "flu_vaccine");\n' +
          "RanchingAPI.get().attemptBreeding(animalA, animalB, location);\n"
        }
      />
      <Callout tone="tip" title={c.apiTipTitle}>
        {c.apiTipBody}
      </Callout>

      <SectionHeading id="comandos">{c.cmdsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhatDoes}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>/ranchingadmin browser</Td><Td>{c.a1}</Td></Tr>
          <Tr><Td className={mono}>/ranchingadmin reload</Td><Td>{c.a2}</Td></Tr>
          <Tr>
            <Td className={mono}>{"/ranchingadmin spawn <especie> [raza|-] [dueno|-] [macho|hembra]"}</Td>
            <Td>{fill(c.a3, { dash: <code>-</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>
              {"/ranchingadmin givefeed|givemedicine|givevaccine <id> [cantidad] [jugador]"}
            </Td>
            <Td>{c.a4}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>{"/ranchingadmin giveproduct <tipo> [calidad] [cantidad] [jugador]"}</Td>
            <Td>{c.a5}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>{"/ranchingadmin setowner <jugador|ninguno>"}</Td>
            <Td>{c.a6}</Td>
          </Tr>
          <Tr><Td className={mono}>/ranchingadmin givedinoegg [jugador]</Td><Td>{c.a7}</Td></Tr>
          <Tr><Td className={mono}>/ranching inspect</Td><Td>{c.a8}</Td></Tr>
          <Tr><Td className={mono}>/ranching animales | mercado | reclamar</Td><Td>{c.a9}</Td></Tr>
          <Tr>
            <Td className={mono}>{"/ranching vender <precio>|cancelar|servidor [id]"}</Td>
            <Td>{c.a10}</Td>
          </Tr>
          <Tr><Td className={mono}>{"/ranching comprar <id>"}</Td><Td>{c.a11}</Td></Tr>
          <Tr>
            <Td className={mono}>
              {"/ranching llamar [id|todos] \u00b7 corral [fijar|quitar|enviar [id|todos]]"}
            </Td>
            <Td>{c.a12}</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.permBody, {
          admin: <code>/ranchingadmin</code>,
          adminPerm: <Badge tone="amber">rpgrollranching.admin.*</Badge>,
          use: <code>/ranching</code>,
          usePerm: <Badge tone="blue">rpgrollranching.use</Badge>,
        })}
      </p>
      <PrevNext current="ranching" onNavigate={onNavigate} />
    </>
  );
}
