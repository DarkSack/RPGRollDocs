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
  Kbd,
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
          "depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, RPGRoll-TAB, RPGRoll-Seasons, RPGRoll-Items, PlaceholderAPI, Vault]"
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

      <SectionHeading id="afk">{c.afkTitle}</SectionHeading>
      <p>
        {fill(c.afkBody, {
          idle: <code>idle-seconds</code>,
          pause: <code>pause-stats: false</code>,
          reload: <Kbd>/extrasadmin reload</Kbd>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="config.yml"
        code={"afk:\n  pause-stats: true\n  idle-seconds: 300 # 5 minutos\n"}
      />

      <SectionHeading id="menu-servidor">{c.menuTitle}</SectionHeading>
      <p>
        {fill(c.menuBody, {
          section: <code>server-menu</code>,
          config: <code>config.yml</code>,
          enabled: <code>enabled: false</code>,
          locked: <code>locked</code>,
          keep: <code>keep-on-death</code>,
          join: <code>give-on-join</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="config.yml"
        code={
          "server-menu:\n" +
          "  enabled: true\n" +
          "  menu: servidor          # menus/servidor.yml\n" +
          "  give-on-join: true\n" +
          "  keep-on-death: true\n" +
          "  locked: true\n" +
          "  item:\n" +
          "    material: COMPASS\n" +
          '    name: "&c&l✦ Brújula del Nether &7(clic)"\n' +
          "    lore:\n" +
          '      - "&7Viajes, tienda, pase y más."\n' +
          "    slot: 8               # casilla de la barra (0-8)\n" +
          "    glint: true\n"
        }
      />
      <p>
        {fill(c.menuFilesBody, {
          dir: <code>menus/</code>,
          main: <Kbd>/menu</Kbd>,
          item: <Kbd>/menu item</Kbd>,
          any: <Kbd>{"/menu <id>"}</Kbd>,
          perm: <code>rpgrollextras.menu.any</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="menus/servidor.yml"
        code={
          "id: servidor\n" +
          'title: "&c&l✦ Brújula del Nether"\n' +
          "rows: 5\n" +
          "filler: GRAY_STAINED_GLASS_PANE   # rellena los huecos\n" +
          "items:\n" +
          "  - slot: 4\n" +
          "    material: PLAYER_HEAD            # sin dueño: la cabeza de quien abre\n" +
          '    name: "&e&l{player}"\n' +
          "    actions:\n" +
          "      - type: COMMAND_AS_PLAYER\n" +
          '        value: "rpg mystats"\n' +
          "  - slot: 20\n" +
          "    material: ENDER_PEARL\n" +
          '    name: "&a&lViajes"\n' +
          "    actions:\n" +
          "      - type: OPEN_GUI                # otro menú de menus/\n" +
          '        value: "destinos"\n' +
          "  - slot: 21\n" +
          "    material: EMERALD\n" +
          '    name: "&6&lTienda"\n' +
          "    actions:\n" +
          "      - type: COMMAND_AS_PLAYER\n" +
          '        value: "tienda"\n' +
          "  - slot: 31\n" +
          "    material: COMMAND_BLOCK\n" +
          '    name: "&cPanel de staff"\n' +
          "    permission: sackito.staff        # solo lo ve quien lo tenga\n" +
          "    actions:\n" +
          "      - type: OPEN_GUI\n" +
          '        value: "staff"\n' +
          "  - slot: 40\n" +
          "    material: BARRIER\n" +
          '    name: "&cCerrar"\n' +
          "    actions:\n" +
          "      - type: CLOSE\n" +
          '        value: ""\n'
        }
      />

      <SectionHeading id="mochilas">{c.bpTitle}</SectionHeading>
      <p>
        {fill(c.bpBody, {
          data: <code>data/backpacks/</code>,
          file: <code>backpacks.yml</code>,
        })}
      </p>
      <p>{fill(c.bpTiersBody, { item: <code>item:mineral_espacial</code> })}</p>
      <Table>
        <Thead>
          <Th>{c.bpThTier}</Th>
          <Th>{c.bpThSlots}</Th>
          <Th>{c.bpThRecipe}</Th>
        </Thead>
        <tbody>
          {(
            [
              ["cuero", "18", "LEATHER + CHEST"],
              ["hierro", "27", "IRON_INGOT"],
              ["oro", "36", "GOLD_INGOT"],
              ["diamante", "45", "DIAMOND"],
              ["netherita_fragmentada", "72", "NETHERITE_SCRAP"],
              ["netherita", "90", "NETHERITE_INGOT"],
              ["espacial", "135", "item:mineral_espacial"],
            ] as const
          ).map(([tier, slots, recipe]) => (
            <Tr key={tier}>
              <Td className="font-mono text-xs">{tier}</Td>
              <Td>{slots}</Td>
              <Td className="font-mono text-xs">{recipe}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <CodeBlock
        language="yaml"
        filename="backpacks.yml"
        code={
          "tiers:\n" +
          "  hierro:\n" +
          '    name: "&fMochila de Hierro"\n' +
          "    slots: 27                 # más de 45 reparte en pestañas\n" +
          "    texture: ddaf8edc32afb461aee0713058023101f924e2a7efa883dae72d5d57d4c053d7\n" +
          "    lore:\n" +
          '      - "&7Capacidad: &f{slots} espacios"\n' +
          "    recipe:\n" +
          '      shape: ["III", "IBI", "III"]\n' +
          "      ingredients:\n" +
          "        I: IRON_INGOT           # material vanilla\n" +
          "        B: backpack             # la mochila del nivel anterior\n" +
          "  espacial:\n" +
          "    slots: 135\n" +
          "    recipe:\n" +
          '      shape: ["MMM", "MBM", "MMM"]\n' +
          "      ingredients:\n" +
          "        M: item:mineral_espacial  # un ítem de RPGRoll-Items\n" +
          "        B: backpack\n"
        }
      />
      <p>
        {fill(c.bpBottomBody, {
          bypass: <code>rpgrollextras.backpack.bypass</code>,
          forbidden: <code>settings.forbidden-items</code>,
        })}
      </p>
      <p>
        {fill(c.bpPlaceBody, {
          allow: <code>settings.allow-place</code>,
          access: <code>placed-access: placer</code>,
        })}
      </p>
      <Callout tone="info" title={c.bpNoteTitle}>
        {fill(c.bpNoteBody, {
          use: <Badge>rpgrollextras.backpack.use</Badge>,
          bypass: <Badge tone="amber">rpgrollextras.backpack.bypass</Badge>,
          admin: <Badge tone="amber">rpgrollextras.backpack.admin</Badge>,
        })}
      </Callout>

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
          <Tr>
            <Td className="font-mono text-xs">/menu</Td>
            <Td>{c.cMenu}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">{"/mochila give <jugador> <nivel> [cantidad]"}</Td>
            <Td>{c.cBackpackGive}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">/mochila list</Td>
            <Td>{c.cBackpackList}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">/menu item</Td>
            <Td>{c.cMenuItem}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">{"/menu <id>"}</Td>
            <Td>{c.cMenuAny}</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.permNote, {
          perm: <Badge tone="amber">rpgrollextras.admin.*</Badge>,
          menu: <Badge>rpgrollextras.menu</Badge>,
          any: <Badge tone="amber">rpgrollextras.menu.any</Badge>,
        })}
      </p>

      <PrevNext current="extras" onNavigate={onNavigate} />
    </>
  );
}
