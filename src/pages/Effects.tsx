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
import { placeholders } from "../content/placeholders";
import { useI18n, fill } from "../i18n";
import { EFFECTS_COPY, type EffectsCopy } from "./copy/effects";

const mono = "font-mono text-xs";

const effectFields = (c: EffectsCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewEffect, placeholder: "bleeding" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: c.phBleeding },
  { key: "icon", label: c.fIcon, type: "string", default: "NETHER_STAR" },
  { key: "color", label: c.fColor, type: "string", default: "WHITE" },
  {
    key: "category",
    label: c.fCategory,
    type: "select",
    options: ["COMBAT", "SURVIVAL", "MAGIC", "ELEMENTAL", "PROFESSION", "SOCIAL", "EVENTS", "OTHER"],
    default: "OTHER",
  },
  {
    key: "rarity",
    label: c.fRarity,
    type: "select",
    options: ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY"],
    default: "COMMON",
  },
  { key: "description", label: c.fDescription, type: "string" },
  { key: "duration", label: c.fDuration, type: "number", default: "100" },
  { key: "priority", label: c.fPriority, type: "number", default: "0" },
  { key: "visible", label: c.fVisible, type: "boolean", default: "true" },
  { key: "tags", label: c.fTags, type: "list", placeholder: "bleed, debuff" },
  { key: "conflicts", label: c.fConflicts, type: "list", placeholder: "burning" },
];

export function Effects({
  onNavigate,
}: {
  onNavigate: (slug: string) => void;
}) {
  const { locale } = useI18n();
  const c = EFFECTS_COPY[locale];

  return (
    <>
      <PageHeader title={c.title}>{c.intro}</PageHeader>

      <Callout tone="info" title={c.notVanillaTitle}>
        {fill(c.notVanillaBody, {
          components: <code>components</code>,
          potion: <code>PotionEffect</code>,
          type: <code>POTION_VANILLA</code>,
        })}
      </Callout>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        code={"depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, RPGRoll-FX, RPGRoll-Guilds, PlaceholderAPI]"}
      />
      <p>
        {fill(c.reqBody, {
          fx: (
            <a href="/rpgroll-particles" className="text-violet-600 underline dark:text-violet-400">
              RPGRoll-FX
            </a>
          ),
          visual: <code>VISUAL</code>,
          guild: <code>GUILD</code>,
          team: <code>TEAM</code>,
          exp: <code>rpgrolleffects</code>,
        })}
      </p>

      <SectionHeading id="modelo">{c.modelTitle}</SectionHeading>
      <p>{fill(c.modelBody, { cls: <code>EffectDefinition</code> })}</p>
      <Table>
        <Thead>
          <Th>{c.thPart}</Th>
          <Th>{c.thAnswers}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>conditions</Td><Td>{c.mConditions}</Td></Tr>
          <Tr><Td className={mono}>components</Td><Td>{c.mComponents}</Td></Tr>
          <Tr><Td className={mono}>stacking / conflicts / tags</Td><Td>{c.mStacking}</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="categorias">{c.catTitle}</SectionHeading>
      <p>{c.catBody}</p>
      <Table>
        <Thead>
          <Th>{c.thCategory}</Th>
          <Th>{c.thMeantFor}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>COMBAT</Td><Td>{c.catCombat}</Td></Tr>
          <Tr><Td className={mono}>SURVIVAL</Td><Td>{c.catSurvival}</Td></Tr>
          <Tr><Td className={mono}>MAGIC</Td><Td>{c.catMagic}</Td></Tr>
          <Tr><Td className={mono}>ELEMENTAL</Td><Td>{c.catElemental}</Td></Tr>
          <Tr><Td className={mono}>PROFESSION</Td><Td>{c.catProfession}</Td></Tr>
          <Tr><Td className={mono}>SOCIAL</Td><Td>{c.catSocial}</Td></Tr>
          <Tr><Td className={mono}>EVENTS</Td><Td>{c.catEvents}</Td></Tr>
          <Tr><Td className={mono}>OTHER</Td><Td>{c.catOther}</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="componentes">{c.compTitle}</SectionHeading>
      <p>
        {fill(c.compBody, {
          cls: <code>EffectComponent</code>,
          type: <code>type</code>,
          trigger: <code>trigger</code>,
          itemAction: <code>ItemAction</code>,
          mobAction: <code>MobAction</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className={mono}>ATTRIBUTE_MODIFIER</Td>
            <Td>
              {fill(c.cAttr, {
                armor: <code>GENERIC_ARMOR</code>,
                damage: <code>GENERIC_ATTACK_DAMAGE</code>,
              })}
            </Td>
          </Tr>
          <Tr><Td className={mono}>MOVEMENT_MODIFIER</Td><Td>{c.cMovement}</Td></Tr>
          <Tr>
            <Td className={mono}>PERIODIC_DAMAGE / PERIODIC_HEAL</Td>
            <Td>
              {fill(c.cPeriodic, {
                amount: <code>amount</code>,
                perStack: <code>amount-per-stack</code>,
              })}
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>POTION_VANILLA</Td>
            <Td>{fill(c.cPotion, { potion: <code>PotionEffect</code> })}</Td>
          </Tr>
          <Tr><Td className={mono}>VISUAL</Td><Td>{c.cVisual}</Td></Tr>
          <Tr><Td className={mono}>SOUND</Td><Td>{c.cSound}</Td></Tr>
          <Tr><Td className={mono}>MESSAGE</Td><Td>{c.cMessage}</Td></Tr>
          <Tr><Td className={mono}>SHIELD</Td><Td>{c.cShield}</Td></Tr>
          <Tr>
            <Td className={mono}>SILENCE / CONFUSION</Td>
            <Td>{fill(c.cSilence, { api: <code>EffectsAPI#isSilenced/isConfused</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>AURA</Td>
            <Td>{fill(c.cAura, { radius: <code>radius</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>COMMAND</Td>
            <Td>{fill(c.cCommand, { target: <code>%target%</code> })}</Td>
          </Tr>
        </tbody>
      </Table>
      <Callout tone="tip" title={c.attrTipTitle}>
        {fill(c.attrTipBody, { trigger: <code>trigger</code> })}
      </Callout>

      <SectionHeading id="triggers">{c.trigTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thTrigger}</Th>
          <Th>{c.thFiresWhen}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>ON_APPLY</Td><Td>{c.tApply}</Td></Tr>
          <Tr><Td className={mono}>ON_TICK</Td><Td>{c.tTick}</Td></Tr>
          <Tr><Td className={mono}>ON_SECOND</Td><Td>{c.tSecond}</Td></Tr>
          <Tr><Td className={mono}>ON_DAMAGE_TAKEN / ON_DAMAGE_DEALT</Td><Td>{c.tDamage}</Td></Tr>
          <Tr><Td className={mono}>ON_DEATH / ON_HEAL</Td><Td>{c.tDeath}</Td></Tr>
          <Tr><Td className={mono}>ON_FOOD_CONSUME</Td><Td>{c.tFood}</Td></Tr>
          <Tr><Td className={mono}>ON_EXPIRE / ON_REMOVE</Td><Td>{c.tExpire}</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="info" title={c.manualTitle}>
        {fill(c.manualBody, { api: <code>EffectsAPI.get().fireTrigger(tipo, entidad)</code> })}
      </Callout>

      <SectionHeading id="condiciones">{c.condTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thChecks}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>LEVEL_MIN / LEVEL_MAX</Td><Td>{c.dLevel}</Td></Tr>
          <Tr><Td className={mono}>RACE / CLASS / JOB</Td><Td>{c.dRace}</Td></Tr>
          <Tr><Td className={mono}>WORLD / WEATHER / TIME_RANGE</Td><Td>{c.dWorld}</Td></Tr>
          <Tr><Td className={mono}>HEALTH_BELOW / HEALTH_ABOVE</Td><Td>{c.dHealth}</Td></Tr>
          <Tr><Td className={mono}>MANA_BELOW / MANA_ABOVE</Td><Td>{c.dMana}</Td></Tr>
          <Tr><Td className={mono}>GUILD / TEAM</Td><Td>{c.dGuild}</Td></Tr>
          <Tr><Td className={mono}>PERMISSION</Td><Td>{c.dPermission}</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="info" title={c.playersOnlyTitle}>
        {fill(c.playersOnlyBody, {
          entity: <code>LivingEntity</code>,
          not: <strong>{c.notWord}</strong>,
          api: <code>GuildsAPI</code>,
        })}
      </Callout>

      <SectionHeading id="stacking">{c.stackTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thMode}</Th>
          <Th>{c.thOnReapply}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>NONE</Td><Td>{c.sNone}</Td></Tr>
          <Tr><Td className={mono}>INDEPENDENT</Td><Td>{c.sIndependent}</Td></Tr>
          <Tr>
            <Td className={mono}>REFRESH</Td>
            <Td>{fill(c.sRefresh, { max: <code>max-stacks</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>UPGRADE</Td>
            <Td>{fill(c.sUpgrade, { upgradeTo: <code>upgrade-to</code> })}</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.stackExampleBody, {
          bleeding: <code>bleeding</code>,
          upgrade: <code>UPGRADE</code>,
          max: <code>max-stacks: 3</code>,
          to: <code>upgrade-to: hemorrhage</code>,
        })}
      </p>

      <SectionHeading id="conflictos-inmunidades">{c.conflictTitle}</SectionHeading>
      <p>
        {fill(c.conflictBody, {
          conflicts: <code>conflicts</code>,
          frozen: <code>frozen</code>,
          burning: <code>burning</code>,
        })}
      </p>
      <p>
        {fill(c.immunityBody, {
          tag: <em>tag</em>,
          fire: <code>fire</code>,
          cold: <code>cold</code>,
          curse: <code>curse</code>,
          cold2: <code>cold</code>,
          call: <code>{'EffectsAPI.get().addImmunity(entity, "fire")'}</code>,
        })}
      </p>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <p>
        {fill(c.yamlBody, { upgrade: <code>UPGRADE</code>, conflicts: <code>conflicts</code> })}
      </p>
      <CodeBlock
        language="yaml"
        filename="effects/bleeding.yml (plugins/RPGRoll-Effects/effects/)"
        code={
          "id: bleeding\n" +
          'display-name: "&cSangrado"\n' +
          "icon: REDSTONE\n" +
          "color: RED\n" +
          "category: COMBAT\n" +
          "rarity: COMMON\n" +
          'description: "Daño periódico que escala con los stacks. Al llegar a 3 stacks se transforma en Hemorrhage."\n' +
          "duration: 100\n" +
          "\n" +
          "tags: [bleed, debuff]\n" +
          "\n" +
          "stacking:\n" +
          "  mode: UPGRADE\n" +
          "  max-stacks: 3\n" +
          "  upgrade-to: hemorrhage\n" +
          "\n" +
          "components:\n" +
          "  - type: PERIODIC_DAMAGE\n" +
          "    trigger: ON_SECOND\n" +
          "    amount: 1\n" +
          "    amount-per-stack: 0.5\n" +
          "\n" +
          "  - type: SOUND\n" +
          "    trigger: ON_APPLY\n" +
          "    sound: ENTITY_PLAYER_HURT\n" +
          "    volume: 0.6\n" +
          "    pitch: 1.6\n" +
          "\n" +
          "  - type: MESSAGE\n" +
          "    trigger: ON_APPLY\n" +
          '    text: "&c¡Estás sangrando!"\n'
        }
      />
      <CodeBlock
        language="yaml"
        filename="effects/frozen.yml"
        code={
          "id: frozen\n" +
          'display-name: "&bCongelado"\n' +
          "icon: ICE\n" +
          "category: ELEMENTAL\n" +
          'description: "Reduce velocidad y ataque. Se rompe si te aplican Burning (y viceversa)."\n' +
          "duration: 100\n" +
          "\n" +
          "tags: [cold, debuff]\n" +
          "conflicts: [burning]\n" +
          "\n" +
          "components:\n" +
          "  - type: MOVEMENT_MODIFIER\n" +
          "    trigger: ON_APPLY\n" +
          "    amount: -0.4\n" +
          "    operation: ADD_SCALAR\n" +
          "\n" +
          "  - type: ATTRIBUTE_MODIFIER\n" +
          "    trigger: ON_APPLY\n" +
          "    attribute: GENERIC_ATTACK_DAMAGE\n" +
          "    amount: -1\n" +
          "    operation: ADD_NUMBER\n" +
          "\n" +
          "  - type: MESSAGE\n" +
          "    trigger: ON_APPLY\n" +
          '    text: "&b¡Estás congelado!"\n'
        }
      />
      <p>
        {fill(c.alsoIncludedBody, {
          hemorrhage: <code>hemorrhage</code>,
          burning: <code>burning</code>,
          frozen: <code>frozen</code>,
          refresh: <code>REFRESH</code>,
          poison: <code>poison</code>,
          blessing: <code>blessing</code>,
          shield: <code>shield</code>,
          refresh2: <code>REFRESH</code>,
          dir: <code>effects/</code>,
        })}
      </p>

      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, {
          file: <code>effects/reference_full.yml</code>,
          upgrade: <code>UPGRADE</code>,
        })}
      </Callout>

      <YamlBuilder
        title={c.builderTitle}
        description={c.builderDesc}
        folder="effects"
        fields={effectFields(c)}
      />

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>{fill(c.guiBody, { cmd: <Kbd>/rpgeffects browser</Kbd> })}</p>
      <Table>
        <Thead>
          <Th>{c.thScreen}</Th>
          <Th>{c.thEdits}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td>{c.gConditions}</Td>
            <Td>{fill(c.gConditionsBody, { syntax: <code>{"TIPO clave=valor,clave2=valor2"}</code> })}</Td>
          </Tr>
          <Tr>
            <Td>{c.gComponents}</Td>
            <Td>
              {fill(c.gComponentsBody, {
                syntax: <code>{"TIPO TRIGGER clave=valor,clave2=valor2"}</code>,
              })}
            </Td>
          </Tr>
          <Tr><Td>{c.gStacking}</Td><Td>{c.gStackingBody}</Td></Tr>
        </tbody>
      </Table>
      <p>{fill(c.testBody, { ignoring: <strong>{c.ignoringWord}</strong> })}</p>

      <SectionHeading id="api">{c.apiTitle}</SectionHeading>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={
          "// Aplicar un efecto ya definido — chequea condiciones/inmunidad/conflictos/stacking solo.\n" +
          'boolean applied = EffectsAPI.get().apply("poison", target, source);\n' +
          "\n" +
          "// Consultar antes de aplicar, para mostrarle al jugador por qué no se pudo.\n" +
          'List<String> reasons = EffectsAPI.get().checkConditions("poison", target);\n' +
          "\n" +
          "// Consultas de estado — útil desde un futuro addon de hechizos.\n" +
          "if (EffectsAPI.get().isSilenced(caster)) {\n" +
          '    caster.sendMessage("No puedes lanzar hechizos, estás silenciado.");\n' +
          "    return;\n" +
          "}\n" +
          "\n" +
          "// Inmunidades manuales (ej. al aplicar una raza).\n" +
          'EffectsAPI.get().addImmunity(player, "fire");\n'
        }
      />

      <SectionHeading id="comandos">{c.cmdsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>/rpgeffects browser</Td><Td>{c.a1}</Td></Tr>
          <Tr><Td className={mono}>/rpgeffects reload</Td><Td>{c.a2}</Td></Tr>
          <Tr><Td className={mono}>{"/rpgeffects apply <id> <jugador>"}</Td><Td>{c.a3}</Td></Tr>
          <Tr><Td className={mono}>{"/rpgeffects remove <id> <jugador>"}</Td><Td>{c.a4}</Td></Tr>
          <Tr><Td className={mono}>{"/rpgeffects list [jugador]"}</Td><Td>{c.a5}</Td></Tr>
        </tbody>
      </Table>
      <p>{fill(c.permBody, { perm: <Badge tone="amber">rpgrolleffects.admin.*</Badge> })}</p>

      <SectionHeading id="placeholders">{c.phTitle}</SectionHeading>
      <p>{fill(c.phBody, { exp: <Badge tone="violet">rpgrolleffects</Badge> })}</p>
      <Table>
        <Thead>
          <Th>{c.thPlaceholder}</Th>
          <Th>{c.thValue}</Th>
        </Thead>
        <tbody>
          {placeholders
            .filter((p) => p.expansion === "rpgrolleffects")
            .map((p) => (
              <Tr key={p.name}>
                <Td className="font-mono text-xs">{p.name}</Td>
                <Td>{p.description}</Td>
              </Tr>
            ))}
        </tbody>
      </Table>
      <PrevNext current="rpgroll-effects" onNavigate={onNavigate} />
    </>
  );
}
