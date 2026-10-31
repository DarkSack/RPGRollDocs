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

type MagicCopy = AddonsECopy["magic"];

const spellFields = (c: MagicCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: "nuevo_hechizo", placeholder: "fireball" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&6Bola de Fuego" },
  { key: "icon", label: c.fIcon, type: "string", default: "BLAZE_POWDER" },
  { key: "color", label: c.fColor, type: "string", default: "WHITE" },
  { key: "school", label: c.fSchool, type: "string", placeholder: "fire" },
  {
    key: "rarity",
    label: c.fRarity,
    type: "select",
    options: ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY"],
    default: "COMMON",
  },
  { key: "level", label: c.fLevel, type: "number", default: "1" },
  {
    key: "trigger",
    label: c.fTrigger,
    type: "select",
    options: ["LEFT_CLICK", "RIGHT_CLICK", "HOLD"],
    default: "RIGHT_CLICK",
  },
  { key: "cast-time", label: c.fCastTime, type: "number", default: "0" },
  { key: "cooldown", label: c.fCooldown, type: "number", default: "40" },
  { key: "tree-parent", label: c.fTreeParent, type: "string" },
  { key: "tree-tier", label: c.fTreeTier, type: "number", default: "0" },
  { key: "tags", label: c.fTags, type: "list", placeholder: "fire, projectile" },
  { key: "description", label: c.fDescription, type: "string" },
];

export function Magic({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = ADDONS_E_COPY[locale].magic;

  return (
    <>
      <PageHeader title={c.title}>{c.intro}</PageHeader>

      <Callout tone="info" title={c.noProgTitle}>
        {fill(c.noProgBody, {
          comp: <code>EffectComponent</code>,
          step: <code>EffectStep</code>,
          spell: <code>Spell</code>,
        })}
      </Callout>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll-Lib, RPGRoll]\nsoftdepend: [RPGRoll-FX, RPGRoll-Effects]"} />
      <p>
        {fill(c.reqBody, {
          fx: (
            <a href="/rpgroll-particles" className="text-violet-600 underline dark:text-violet-400">
              RPGRoll-FX
            </a>
          ),
          effects: (
            <a href="/rpgroll-effects" className="text-violet-600 underline dark:text-violet-400">
              RPGRoll-Effects
            </a>
          ),
          visual: <code>VISUAL</code>,
          applyEffect: (
            <>
              <code>APPLY_EFFECT</code>/<code>REMOVE_EFFECT</code>
            </>
          ),
        })}
      </p>

      <SectionHeading id="escuelas">{c.schoolsTitle}</SectionHeading>
      <p>
        {fill(c.schoolsBody, {
          school: <code>MagicSchool</code>,
          affinities: <strong>{c.affinities}</strong>,
          tags: <code>tags</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="schools/fire.yml"
        code={
          "id: fire\n" +
          'display-name: "&cFuego"\n' +
          "color: RED\n" +
          "icon: BLAZE_POWDER\n" +
          'description: "Escuela de destrucción y daño directo."\n' +
          "cast-sound: ENTITY_BLAZE_SHOOT\n" +
          "\n" +
          "race-affinities:\n" +
          "  demon: 0.3\n" +
          "  elf: -0.1\n" +
          "\n" +
          "class-affinities:\n" +
          "  mage: 0.15\n"
        }
      />

      <SectionHeading id="hechizos">{c.spellTitle}</SectionHeading>
      <p>
        {fill(c.spellBody, {
          spell: <code>Spell</code>,
          cost: <code>SpellCost</code>,
          trigger: <code>trigger</code>,
          tree: (
            <>
              <code>tree-parent</code>/<code>tree-tier</code>
            </>
          ),
        })}
      </p>

      <SectionHeading id="triggers">{c.triggersTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thTrigger}</Th>
          <Th>{c.thHowCast}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">LEFT_CLICK</Td><Td>{c.tLeft}</Td></Tr>
          <Tr><Td className="font-mono text-xs">RIGHT_CLICK</Td><Td>{c.tRight}</Td></Tr>
          <Tr><Td className="font-mono text-xs">HOLD</Td><Td>{fill(c.tHold, { castTime: <code>cast-time</code> })}</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title={c.holdTitle}>
        {fill(c.holdBody, { castTime: <code>cast-time</code> })}
      </Callout>

      <SectionHeading id="componentes">{c.compTitle}</SectionHeading>
      <p>
        {fill(c.compBody, {
          projectile: <code>PROJECTILE</code>,
          delay: <code>DELAY</code>,
          power: <code>powerMultiplier</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thCategory}</Th>
          <Th>{c.thTypes}</Th>
        </Thead>
        <tbody>
          <Tr><Td>{c.catMovement}</Td><Td className="font-mono text-xs">PROJECTILE, DASH, TELEPORT, LEAP, ORBIT</Td></Tr>
          <Tr><Td>{c.catDamage}</Td><Td className="font-mono text-xs">DAMAGE_DIRECT, DAMAGE_AREA, DAMAGE_LINE, DAMAGE_CHAIN, DAMAGE_CONE</Td></Tr>
          <Tr><Td>{c.catVisual}</Td><Td className="font-mono text-xs">{c.visualTypes}</Td></Tr>
          <Tr><Td>{c.catWorld}</Td><Td className="font-mono text-xs">BREAK_BLOCK, PLACE_BLOCK, IGNITE, FREEZE_WATER</Td></Tr>
          <Tr><Td>{c.catEntities}</Td><Td className="font-mono text-xs">SUMMON, HEAL, APPLY_EFFECT, REMOVE_EFFECT, PUSH, PULL</Td></Tr>
          <Tr><Td>{c.catControl}</Td><Td className="font-mono text-xs">DELAY, MESSAGE, COMMAND</Td></Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.projBody, {
          projectile: <code>PROJECTILE</code>,
          piercing: <code>PIERCING</code>,
          damage: <code>DAMAGE_DIRECT</code>,
          summon: <code>SUMMON</code>,
          vanilla: <strong>{c.vanilla}</strong>,
          entityType: <code>EntityType</code>,
        })}
      </p>

      <SectionHeading id="runas">{c.runesTitle}</SectionHeading>
      <p>{fill(c.runesBody, { learned: <strong>{c.learned}</strong> })}</p>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thEffect}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">EXTRA_PROJECTILES</Td><Td>{c.rExtra}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PIERCING</Td><Td>{fill(c.rPiercing, { maxPierces: <code>max-pierces</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">EXPLOSIVE</Td><Td>{c.rExplosive}</Td></Tr>
          <Tr><Td className="font-mono text-xs">APPLY_EFFECT</Td><Td>{c.rApplyEffect}</Td></Tr>
          <Tr><Td className="font-mono text-xs">COST_MODIFIER</Td><Td>{c.rCost}</Td></Tr>
          <Tr><Td className="font-mono text-xs">COOLDOWN_MODIFIER</Td><Td>{c.rCooldown}</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="catalizadores">{c.catalystTitle}</SectionHeading>
      <p>
        {fill(c.catalystBody, {
          same: <strong>{c.same}</strong>,
          catalyst: <code>SpellCatalyst</code>,
          mults: (
            <>
              <code>power</code>/<code>cost</code>/<code>range</code>
            </>
          ),
        })}
      </p>

      <SectionHeading id="grimorios">{c.grimTitle}</SectionHeading>
      <p>
        {fill(c.grimBody, {
          grimoire: <code>Grimoire</code>,
          all: <strong>{c.all}</strong>,
          treeParent: <code>tree-parent</code>,
        })}
      </p>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="spells/fireball.yml (plugins/RPGRoll-Magic/spells/)"
        code={
          "id: fireball\n" +
          'display-name: "&6Bola de Fuego"\n' +
          "icon: FIRE_CHARGE\n" +
          "color: RED\n" +
          "school: fire\n" +
          "rarity: COMMON\n" +
          "level: 1\n" +
          "cast-time: 0\n" +
          "cooldown: 40\n" +
          "trigger: RIGHT_CLICK\n" +
          "tree-tier: 0\n" +
          "tags: [fire, projectile]\n" +
          'description: "El hechizo básico de Fuego — un proyectil que explota al impactar."\n' +
          "\n" +
          "cost:\n" +
          "  mana: 15\n" +
          "\n" +
          "components:\n" +
          "  - type: PROJECTILE\n" +
          "    speed: 1.0\n" +
          "    max-distance: 25\n" +
          "    trail-particle: FLAME\n" +
          "\n" +
          "  - type: DAMAGE_DIRECT\n" +
          "    amount: 8\n" +
          "\n" +
          "  - type: PARTICLE\n" +
          "    particle: FLAME\n" +
          "    count: 20\n" +
          "\n" +
          "  - type: SOUND\n" +
          "    sound: ENTITY_GENERIC_EXPLODE\n" +
          "    volume: 1.0\n" +
          "    pitch: 1.2\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename={c.meteorFile}
        code={
          "id: meteor\n" +
          'display-name: "&4&lMeteoro"\n' +
          "icon: MAGMA_BLOCK\n" +
          "color: DARK_RED\n" +
          "school: fire\n" +
          "rarity: EPIC\n" +
          "level: 5\n" +
          "cast-time: 60\n" +
          "cooldown: 200\n" +
          "trigger: HOLD\n" +
          "tree-parent: fireball\n" +
          "tree-tier: 1\n" +
          'description: "Canaliza 3 segundos quieto para invocar una explosión devastadora a tus pies."\n' +
          "\n" +
          "cost:\n" +
          "  mana: 50\n" +
          "\n" +
          "components:\n" +
          "  - type: DAMAGE_AREA\n" +
          "    radius: 5\n" +
          "    amount: 20\n" +
          "\n" +
          "  - type: PARTICLE\n" +
          "    particle: LAVA\n" +
          "    count: 40\n" +
          "\n" +
          "  - type: SOUND\n" +
          "    sound: ENTITY_GENERIC_EXPLODE\n" +
          "    volume: 1.5\n" +
          "    pitch: 0.8\n"
        }
      />

      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, { file: <code>spells/reference_full.yml</code> })}
      </Callout>

      <YamlBuilder
        title={c.bTitle}
        description={c.bDesc}
        folder="spells"
        fields={spellFields(c)}
      />

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>
        {fill(c.guiBody, {
          browser: <Kbd>/magicadmin browser</Kbd>,
          add: <code>{"TIPO clave=valor,clave2=valor2"}</code>,
          spellbook: <Kbd>/magic spellbook</Kbd>,
        })}
      </p>

      <SectionHeading id="api">{c.apiTitle}</SectionHeading>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={
          "// Castear un hechizo por código (ej. un boss de RPGRoll-Mobs \"lanza\" un hechizo).\n" +
          "CastResult result = MagicAPI.get().cast(\"fireball\", caster);\n" +
          "\n" +
          "if (!result.success()) {\n" +
          "    result.reasons().forEach(reason -> caster.sendMessage(\"✘ \" + reason));\n" +
          "}\n" +
          "\n" +
          "// Enseñar/consultar hechizos sin pasar por un grimorio físico.\n" +
          'MagicAPI.get().learn(player, "frost_bolt");\n' +
          'boolean sabe = MagicAPI.get().knows(player, "frost_bolt");\n'
        }
      />

      <SectionHeading id="comandos">{c.cmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/magicadmin browser</Td><Td>{c.cBrowser}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/magicadmin reload</Td><Td>{c.cReload}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/magicadmin givecatalyst <id>"}</Td><Td>{c.cGiveCatalyst}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/magicadmin givegrimoire <id>"}</Td><Td>{c.cGiveGrimoire}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/magic spellbook</Td><Td>{c.cSpellbook}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/magic select <id>"}</Td><Td>{c.cSelect}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/magic cast <id>"}</Td><Td>{c.cCast}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/magic cooldowns</Td><Td>{c.cCooldowns}</Td></Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.permNote, {
          admin: <code>/magicadmin</code>,
          p1: <Badge tone="amber">rpgrollmagic.admin.*</Badge>,
          use: <code>/magic</code>,
          p2: <Badge tone="blue">rpgrollmagic.use</Badge>,
        })}
      </p>

      <SectionHeading id="alcance">{c.scopeTitle}</SectionHeading>
      <Callout tone="info" title={c.scopeCallout}>
        {c.scopeBody}
      </Callout>

      <PrevNext current="magic" onNavigate={onNavigate} />
    </>
  );
}
