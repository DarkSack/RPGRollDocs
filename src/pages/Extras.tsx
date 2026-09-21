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
  Badge,
  PrevNext,
  YamlBuilder,
  type YamlField,
} from "../components/ui";
import { pageTitle } from "../content/nav";
import { useI18n, fill, localizedPageLabel, localizedCaveatTitle, localizedCaveatBody } from "../i18n";
import { ADDONS_D_COPY, type AddonsDCopy } from "./copy/addonsD";

type ExtrasCopy = AddonsDCopy["extras"];

const CAVEAT_TITLE = "No confundir con un valor multiplicador directo";
const CAVEAT_BODY =
  "stamina_max: 1.3 NO da 130% — da 1.0 + 1.3 = 230%. El valor correcto para \u201c130% del máximo\u201d es 0.3.";

const statFields = (c: ExtrasCopy): YamlField[] => [
  {
    key: "id",
    label: c.sfId,
    type: "string",
    default: "nuevo_stat",
    placeholder: "sanity",
  },
  { key: "enabled", label: c.sfEnabled, type: "boolean", default: "true" },
  { key: "max", label: c.sfMax, type: "number", default: "100" },
  { key: "start", label: c.sfStart, type: "number", default: "100" },
];

const conditionFields = (c: ExtrasCopy): YamlField[] => [
  {
    key: "id",
    label: c.sfId,
    type: "string",
    default: "nueva_condition",
    placeholder: "cursed",
  },
  {
    key: "duration",
    label: c.cfDuration,
    type: "number",
    default: "-1",
  },
  { key: "damage", label: c.cfDamage, type: "number", default: "0" },
  {
    key: "interval",
    label: c.cfInterval,
    type: "number",
    default: "20",
  },
  {
    key: "effects",
    label: c.cfEffects,
    type: "list",
    placeholder: "slowness:0, nausea:0",
  },
];

const modifierFields = (c: ExtrasCopy): YamlField[] => [
  {
    key: "id",
    label: c.mfId,
    type: "string",
    default: "nueva_raza",
    placeholder: "enano",
  },
  {
    key: "type",
    label: c.mfType,
    type: "select",
    options: ["RACE", "CLASS", "JOB"],
    default: "RACE",
  },
];

export function Extras({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = ADDONS_D_COPY[locale].extras;
  const label = (slug: string) => localizedPageLabel(slug, pageTitle(slug), locale);

  return (
    <>
      <PageHeader title={c.title} slug="extras">
        {c.intro}
      </PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        code={
          "depend: [RPGRoll]\nsoftdepend: [RPGRoll-TAB, RPGRoll-Seasons, PlaceholderAPI, Vault]"
        }
      />
      <p>
        {fill(c.reqBody1, { depend: <code>depend: RPGRoll</code>, pm: <code>PlayerManager</code> })}{" "}
        <button
          type="button"
          onClick={() => onNavigate("tab")}
          className="text-violet-600 underline dark:text-violet-400"
        >
          {label("tab")}
        </button>{" "}
        {c.reqBody2}
      </p>

      <SectionHeading id="stats">{c.statsTitle}</SectionHeading>
      <p>
        {fill(c.statsBody, { engine: <code>StatEngine</code> })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thField}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">decay</Td>
            <Td>{fill(c.fDecay, { obj: <code>{"{ amount, interval }"}</code>, interval: <code>interval</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">regeneration</Td>
            <Td>{fill(c.fRegen, { obj: <code>{"{ condition, amount }"}</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">consumption</Td>
            <Td>
              {fill(c.fConsumption, {
                actions: (
                  <>
                    <code>sprint</code>/<code>jump</code>/<code>attack</code>/<code>mining</code>
                  </>
                ),
              })}
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">thresholds</Td>
            <Td>
              {fill(c.fThresholds, { obj: <code>{"{ condition, potions, actions, apply-conditions }"}</code> })}
            </Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.thresholdBody, {
          potions: <code>potions</code>,
          actions: <code>actions</code>,
          applyConditions: <code>apply-conditions</code>,
          def: <code>ConditionDefinition</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="stats/thirst.yml"
        code={
          "id: thirst\n" +
          "enabled: true\n" +
          "max: 100\n" +
          "start: 100\n\n" +
          "decay:\n" +
          "  amount: 1\n" +
          "  interval: 60\n\n" +
          "consumption:\n" +
          "  sprint: 0.5\n\n" +
          "thresholds:\n" +
          '  - condition: "<=30"\n' +
          "    potions:\n" +
          "      - type: weakness\n" +
          "        amplifier: 0\n" +
          "    actions:\n" +
          "      - type: MESSAGE\n" +
          '        value: "&cTienes sed."\n' +
          '  - condition: "<=0"\n' +
          "    apply-conditions:\n" +
          "      - dehydration\n"
        }
      />
      <YamlBuilder
        title={c.bStat}
        description={c.bStatDesc}
        folder="stats"
        fields={statFields(c)}
      />

      <SectionHeading id="actividad">{c.activityTitle}</SectionHeading>
      <p>
        {fill(c.activityBody, {
          regen: <code>regeneration</code>,
          states: (
            <>
              <code>resting</code>, <code>walking</code>, <code>sprinting</code>, <code>combat</code>
            </>
          ),
          prefixes: (
            <>
              <code>biome:</code>, <code>weather:</code>, <code>world:</code>, <code>dimension:</code>
            </>
          ),
          underwater: <code>underwater</code>,
        })}
      </p>

      <SectionHeading id="consumo">{c.consumeTitle}</SectionHeading>
      <p>
        {fill(c.consumeBody, { call: <code>ExtrasAPI.get().needs().consumeAll(player, "fishing")</code> })}
      </p>

      <SectionHeading id="conditions">{c.condTitle}</SectionHeading>
      <p>
        {fill(c.condBody1, { def: <code>ConditionDefinition</code>, duration: <code>duration: -1</code> })}{" "}
        <button
          type="button"
          onClick={() => onNavigate("rpgroll-effects")}
          className="text-violet-600 underline dark:text-violet-400"
        >
          {label("rpgroll-effects")}
        </button>{" "}
        {c.condBody2}
      </p>
      <CodeBlock
        language="yaml"
        filename="conditions/dehydration.yml"
        code={
          "id: dehydration\n" +
          "duration: -1\n" +
          "damage: 1\n" +
          "interval: 60\n" +
          "effects:\n" +
          '  - "weakness:1"\n' +
          '  - "slowness:0"\n' +
          "on-apply:\n" +
          "  - type: MESSAGE\n" +
          '    value: "&4Te estás deshidratando..."\n'
        }
      />
      <YamlBuilder
        title={c.bCondition}
        description={c.bConditionDesc}
        folder="conditions"
        fields={conditionFields(c)}
      />

      <SectionHeading id="temperatura">{c.tempTitle}</SectionHeading>
      <p>
        {fill(c.tempBody, {
          calc: <code>AmbientTemperatureCalculator</code>,
          vanilla: <code>Block#getTemperature()</code>,
          engine: <code>BodyTemperatureEngine</code>,
          rate: <code>exchange-rate</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="temperature.yml"
        code={
          "exchange-rate: 0.05\n" +
          "update-interval: 40\n\n" +
          "states:\n" +
          "  - id: severe_hypothermia\n" +
          '    label: "Hipotermia severa"\n' +
          "    max: 30\n" +
          "    potions:\n" +
          "      - type: slowness\n" +
          "        amplifier: 2\n\n" +
          "  - id: normal\n" +
          '    label: "Normal"\n' +
          "    min: 36\n" +
          "    max: 39\n"
        }
      />

      <SectionHeading id="proteccion-termica">{c.thermalTitle}</SectionHeading>
      <p>
        {fill(c.thermalBody1, {
          service: <code>ThermalProtectionService</code>,
          keys: (
            <>
              <code>thermal_insulation</code>/<code>thermal_cold_resistance</code>/
              <code>thermal_heat_resistance</code>
            </>
          ),
        })}{" "}
        <button
          type="button"
          onClick={() => onNavigate("items")}
          className="text-violet-600 underline dark:text-violet-400"
        >
          {label("items")}
        </button>{" "}
        {fill(c.thermalBody2, { nsKey: <code>NamespacedKey("rpgroll-items", "item-custom-data")</code> })}
      </p>

      <SectionHeading id="modificadores">{c.modTitle}</SectionHeading>
      <p>
        {fill(c.modBody, {
          set: <code>ModifierSet</code>,
          resolver: <code>ModifierResolver</code>,
          keys: (
            <>
              <code>{"<statId>_max"}</code> / <code>{"<statId>_rate"}</code>
            </>
          ),
          strong: (
            <strong>
              {fill(c.modStrong, { formula: <code>1.0 + suma de todos los modificadores aplicables</code> })}
            </strong>
          ),
          v1: <code>0.3</code>,
          v2: <code>-0.2</code>,
        })}
      </p>
      <Callout tone="warning" title={localizedCaveatTitle("extras", CAVEAT_TITLE, locale)}>
        {localizedCaveatBody("extras", CAVEAT_TITLE, CAVEAT_BODY, locale)}
      </Callout>
      <CodeBlock
        language="yaml"
        filename="modifiers/barbaro.yml"
        code={
          "id: barbaro\n" +
          "type: CLASS\n" +
          "values:\n" +
          "  stamina_max: 0.3\n" +
          "  stress_rate: -0.3\n"
        }
      />
      <YamlBuilder
        title={c.bModifier}
        description={c.bModifierDesc}
        folder="modifiers"
        fields={modifierFields(c)}
      />

      <SectionHeading id="condiciones-reusables">{c.reusableTitle}</SectionHeading>
      <p>
        {fill(c.reusableBody, {
          evaluator: <code>RateConditionEvaluator</code>,
          regen: <code>regeneration</code>,
          prefixes: (
            <>
              <code>biome:</code>/<code>weather:</code>/<code>world:</code>/<code>dimension:</code>/
              <code>underwater</code>
            </>
          ),
          thresholds: <code>thresholds</code>,
          examples: (
            <>
              <code>{"<=30"}</code>, <code>{">=80"}</code>
            </>
          ),
          numeric: <code>NumericComparison</code>,
        })}
      </p>

      <SectionHeading id="acciones">{c.actionsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">MESSAGE</Td>
            <Td>{fill(c.aMessage, { amp: <code>&amp;</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">SOUND</Td>
            <Td>{fill(c.aSound, { fmt: <code>"SOUND_ID;volumen;pitch"</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">PARTICLE</Td>
            <Td>{fill(c.aParticle, { fmt: <code>"PARTICLE_ID;cantidad"</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">DAMAGE</Td>
            <Td>{fill(c.aDamage, { api: <code>Player#damage</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">COMMAND</Td>
            <Td>{fill(c.aCommand, { var: <code>%player%</code> })}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="hud">{c.hudTitle}</SectionHeading>
      <p>
        {fill(c.hudBody1, { bar: <code>{"{bar}"}</code> })}{" "}
        <button
          type="button"
          onClick={() => onNavigate("tab")}
          className="text-violet-600 underline dark:text-violet-400"
        >
          {label("tab")}
        </button>{" "}
        {c.hudBody2}
      </p>
      <CodeBlock
        language="yaml"
        filename="hud.yml"
        code={
          "enabled: false\n" +
          "interval: 20\n" +
          'separator: "  "\n\n' +
          "lines:\n" +
          "  - stat: thirst\n" +
          '    format: "&b💧 {bar} {value}/{max}"\n' +
          "    bar: true\n" +
          "    bar-length: 10\n" +
          '    filled-char: "█"\n' +
          '    empty-char: "░"\n'
        }
      />

      <SectionHeading id="integracion-tab">{c.tabTitle}</SectionHeading>
      <p>
        {fill(c.tabBody, {
          p1: <code>{"{extras_<statId>}"}</code>,
          p2: <code>{"{extras_<statId>_max}"}</code>,
          p3: <code>{"{extras_body_temperature}"}</code>,
          p4: <code>{"{extras_temperature_state}"}</code>,
          p5: <code>{"{extras_conditions}"}</code>,
          bridge: <code>TabIntegrationBridge</code>,
        })}
      </p>

      <SectionHeading id="api">{c.apiTitle}</SectionHeading>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={
          "// Leer/ajustar un need\n" +
          'double sed = ExtrasAPI.get().needs().get(player, "thirst");\n' +
          'ExtrasAPI.get().needs().add(player, "stamina", 20);\n' +
          "\n" +
          "// Reportar una acción propia del addon a cualquier stat que la tenga\n" +
          "// configurada en su bloque 'consumption' (ej. pesca, cocina, un skill).\n" +
          'ExtrasAPI.get().needs().consumeAll(player, "fishing");\n' +
          "\n" +
          "// Aplicar o consultar un estado custom\n" +
          'ExtrasAPI.get().states().apply(player, "bleeding");\n' +
          'boolean congelado = ExtrasAPI.get().states().has(player, "frostbite");\n' +
          "\n" +
          "// Temperatura\n" +
          "double corporal = ExtrasAPI.get().bodyTemperature(player);\n"
        }
      />

      <SectionHeading id="comandos">{c.cmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">/extrasadmin reload</Td>
            <Td>{c.cReload}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">/extrasadmin list</Td>
            <Td>{c.cList}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/extrasadmin get <jugador> <stat>"}
            </Td>
            <Td>{c.cGet}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/extrasadmin set <jugador> <stat> <valor>"}
            </Td>
            <Td>{c.cSet}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/extrasadmin add <jugador> <stat> <cantidad>"}
            </Td>
            <Td>{c.cAdd}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/extrasadmin apply <jugador> <condition>"}
            </Td>
            <Td>{c.cApply}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/extrasadmin remove <jugador> <condition>"}
            </Td>
            <Td>{c.cRemove}</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.permNote, { perm: <Badge tone="amber">rpgrollextras.admin.*</Badge> })}
      </p>

      <PrevNext current="extras" onNavigate={onNavigate} />
    </>
  );
}
