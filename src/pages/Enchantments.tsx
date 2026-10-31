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
import { ENCHANTMENTS_COPY, type EnchantmentsCopy } from "./copy/enchantments";

const enchantmentFields = (c: EnchantmentsCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: "nuevo_encantamiento", placeholder: "frost" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&bFrost" },
  {
    key: "rarity",
    label: c.fRarity,
    type: "select",
    options: ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE"],
  },
  { key: "max-level", label: c.fMaxLevel, type: "number", default: "1" },
  {
    key: "categories",
    label: c.fCategories,
    type: "list",
    placeholder: "ARMOR, WEAPON, TOOLS, BOW",
  },
  { key: "trigger", label: c.fTrigger, type: "list", placeholder: "ENTITY_DAMAGE, PLAYER_ATTACK" },
  { key: "conditions", label: c.fConditions, type: "list", placeholder: "player.health < 10" },
  { key: "conflicts", label: c.fConflicts, type: "list", placeholder: "thunder" },
  { key: "chance", label: c.fChance, type: "string", placeholder: c.fChancePh },
];

export function Enchantments({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = ENCHANTMENTS_COPY[locale];

  return (
    <>
      <PageHeader title={c.title}>
        {fill(c.intro, { ench: <code>org.bukkit.enchantments.Enchantment</code> })}
      </PageHeader>

      <Callout tone="warning" title={c.noVanillaTitle}>
        {fill(c.noVanillaBody, {
          events: (
            <>
              <code>PrepareItemEnchantEvent</code>, <code>EnchantItemEvent</code> &amp;{" "}
              <code>PrepareAnvilEvent</code>
            </>
          ),
          cmd: <Kbd>/renchant apply|give</Kbd>,
        })}
      </Callout>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, RPGRoll-FX, PlaceholderAPI]"} />
      <p>
        {fill(c.reqBody, {
          items: <strong>{c.itemsWord}</strong>,
          soft: <code>softdepend: [RPGRoll-Enchantments, Vault]</code>,
          pluginYml: <code>plugin.yml</code>,
        })}
      </p>

      <SectionHeading id="modelo">{c.modelTitle}</SectionHeading>
      <p>
        {fill(c.modelBody, {
          enchItem: <code>EnchantmentItem</code>,
          pdc: <code>PersistentDataContainer</code>,
          stack: <code>ItemStack</code>,
          key: <code>id:nivel</code>,
          sep: <code>;</code>,
        })}
      </p>

      <SectionHeading id="categorias">{c.catTitle}</SectionHeading>
      <p>
        {fill(c.catBody, {
          categories: <code>categories</code>,
          list: (
            <code>
              WEAPON, ARMOR, HELMET, CHESTPLATE, LEGGINGS, BOOTS, TOOLS, BOW, CROSSBOW, TRIDENT,
              FISHING_ROD, SWORD, PICKAXE, AXE, SHOVEL, HOE, SHIELD, ANY
            </code>
          ),
          material: <code>Material</code>,
          allowed: <code>allowed-items</code>,
        })}
      </p>

      <SectionHeading id="niveles">{c.levelsTitle}</SectionHeading>
      <p>
        {fill(c.levelsBody, {
          block: <code>levels: &lt;n&gt;:</code>,
          pairs: <code>clave: número</code>,
          ph: <code>{'"{clave}"'}</code>,
        })}
      </p>

      <SectionHeading id="triggers">{c.triggersTitle}</SectionHeading>
      <p>{c.triggersIntro}</p>
      <Table>
        <Thead>
          <Th>{c.thTrigger}</Th>
          <Th>{c.thEvent}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">PLAYER_ATTACK</Td><Td>{c.ePlayerAttack}</Td></Tr>
          <Tr><Td className="font-mono text-xs">ENTITY_DAMAGE</Td><Td>{c.eEntityDamage}</Td></Tr>
          <Tr><Td className="font-mono text-xs">BLOCK_BREAK</Td><Td>{c.eBlockBreak}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PLAYER_JUMP</Td><Td>{c.ePlayerJump}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PLAYER_MOVE</Td><Td>{c.ePlayerMove}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PLAYER_DEATH</Td><Td>{c.ePlayerDeath}</Td></Tr>
          <Tr><Td className="font-mono text-xs">ENTITY_KILL</Td><Td>{c.eEntityKill}</Td></Tr>
          <Tr><Td className="font-mono text-xs">BLOCK_INTERACT</Td><Td>{c.eBlockInteract}</Td></Tr>
          <Tr><Td className="font-mono text-xs">SHIELD_BLOCK</Td><Td>{c.eShieldBlock}</Td></Tr>
          <Tr><Td className="font-mono text-xs">SHIELD_DISABLE</Td><Td>{c.eShieldDisable}</Td></Tr>
          <Tr><Td className="font-mono text-xs">EXP_PICKUP</Td><Td>{c.eExpPickup}</Td></Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.scanBody, {
          chance: <code>chance</code>,
          conditions: <code>conditions</code>,
          effects: <code>effects</code>,
        })}
      </p>

      <SectionHeading id="condiciones">{c.condTitle}</SectionHeading>
      <p>
        {fill(c.condBody, {
          fn: <code>player.hasPermission(perm)</code>,
          cmp: <code>izquierda operador derecha</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thVariable}</Th>
          <Th>{c.thType}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">player.health</Td><Td>{c.tNumber}</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.level</Td><Td>{c.tLevel}</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.xplevel</Td><Td>{c.tXpLevel}</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.foodlevel</Td><Td>{c.tNumber}</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.sneaking</Td><Td>{c.tSneaking}</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.shieldticks</Td><Td>{c.tShieldTicks}</Td></Tr>
          <Tr><Td className="font-mono text-xs">world</Td><Td>{c.tWorld}</Td></Tr>
          <Tr><Td className="font-mono text-xs">weather</Td><Td>{c.tWeather}</Td></Tr>
          <Tr><Td className="font-mono text-xs">target.type</Td><Td>{c.tTargetType}</Td></Tr>
          <Tr><Td className="font-mono text-xs">target.health</Td><Td>{c.tNumber}</Td></Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.cmpBody, {
          num: <code>{"== != < <= > >="}</code>,
          txt: <code>{"== !="}</code>,
        })}
      </p>

      <SectionHeading id="efectos">{c.effectsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">DAMAGE</Td><Td>{c.fDamage}</Td></Tr>
          <Tr><Td className="font-mono text-xs">HEAL</Td><Td>{c.fHeal}</Td></Tr>
          <Tr><Td className="font-mono text-xs">LIGHTNING</Td><Td>{fill(c.fLightning, { damage: <code>damage</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">POTION</Td><Td>{fill(c.fPotion, { applyTo: <code>apply-to</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">FIRE</Td><Td>{c.fFire}</Td></Tr>
          <Tr><Td className="font-mono text-xs">EXPLOSION</Td><Td>{c.fExplosion}</Td></Tr>
          <Tr><Td className="font-mono text-xs">TELEPORT</Td><Td>{c.fTeleport}</Td></Tr>
          <Tr><Td className="font-mono text-xs">COMMAND</Td><Td>{fill(c.fCommand, { ph: <><code>{"{player}"}</code>/<code>{"{target}"}</code></> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">MESSAGE</Td><Td>{fill(c.fMessage, { amp: <code>&amp;</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PARTICLE</Td><Td>{c.fParticle}</Td></Tr>
          <Tr><Td className="font-mono text-xs">SOUND</Td><Td>{c.fSound}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PICKUP_ITEMS</Td><Td>{c.fPickupItems}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PARTICLES</Td><Td>{fill(c.fParticles, { effectId: <code>effect-id</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">VEIN_MINE</Td><Td>{fill(c.fVeinMine, { max: <code>max</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">TREE_FELL</Td><Td>{fill(c.fTreeFell, { max: <code>max</code>, leaves: <code>leaves: true</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">AREA_MINE</Td><Td>{fill(c.fAreaMine, { side: <code>2·radius+1</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">AUTO_SMELT</Td><Td>{c.fAutoSmelt}</Td></Tr>
          <Tr><Td className="font-mono text-xs">TILL_AREA</Td><Td>{fill(c.fTillArea, { radius: <code>radius</code>, replant: <code>replant: true</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">REPAIR</Td><Td>{fill(c.fRepair, { ratio: <code>ratio</code>, equipment: <code>equipment: 1</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">DAMAGE_BONUS</Td><Td>{fill(c.fDamageBonus, { amount: <code>amount</code>, multiplier: <code>multiplier</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">KNOCKBACK</Td><Td>{fill(c.fKnockback, { params: <><code>strength</code>, <code>vertical</code></> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">REFLECT</Td><Td>{fill(c.fReflect, { chance: <code>chance</code>, speed: <code>speed</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">SHIELD_COOLDOWN</Td><Td>{fill(c.fShieldCooldown, { factor: <code>factor</code> })}</Td></Tr>
        </tbody>
      </Table>
      <p>{c.breakBody}</p>
      <p>
        {fill(c.paramsBody, { ph: <code>{'"{clave}"'}</code>, levels: <code>levels</code> })}
      </p>

      <SectionHeading id="incluidos">{c.includedTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thId}</Th>
          <Th>{c.thFor}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">veinminer</Td><Td>{c.wPickaxe}</Td><Td>{c.iVeinminer}</Td></Tr>
          <Tr><Td className="font-mono text-xs">timber</Td><Td>{c.wAxe}</Td><Td>{c.iTimber}</Td></Tr>
          <Tr><Td className="font-mono text-xs">autosmelt</Td><Td>{c.wPickaxe}, {c.wAxe}, {c.wShovel}</Td><Td>{c.iAutosmelt}</Td></Tr>
          <Tr><Td className="font-mono text-xs">hammer</Td><Td>{c.wPickaxe}, {c.wShovel}</Td><Td>{c.iHammer}</Td></Tr>
          <Tr><Td className="font-mono text-xs">tiller</Td><Td>{c.wHoe}</Td><Td>{c.iTiller}</Td></Tr>
          <Tr><Td className="font-mono text-xs">advanced_mending</Td><Td>{c.wAny}</Td><Td>{c.iMending}</Td></Tr>
          <Tr><Td className="font-mono text-xs">advanced_sharpness</Td><Td>{c.wSword}, {c.wAxe}</Td><Td>{c.iSharpness}</Td></Tr>
          <Tr><Td className="font-mono text-xs">shield_reflect</Td><Td>{c.wShield}</Td><Td>{c.iReflect}</Td></Tr>
          <Tr><Td className="font-mono text-xs">shield_parry</Td><Td>{c.wShield}</Td><Td>{c.iParry}</Td></Tr>
          <Tr><Td className="font-mono text-xs">shield_bash</Td><Td>{c.wShield}</Td><Td>{c.iBash}</Td></Tr>
          <Tr><Td className="font-mono text-xs">shield_temper</Td><Td>{c.wShield}</Td><Td>{c.iTemper}</Td></Tr>
          <Tr><Td className="font-mono text-xs">shield_aegis</Td><Td>{c.wShield}</Td><Td>{c.iAegis}</Td></Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.extraBody, {
          ids: (
            <>
              <code>lifesteal</code>, <code>frost</code>, <code>magnet</code>, <code>poison</code> &amp;{" "}
              <code>thunder</code>
            </>
          ),
        })}
      </p>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="enchantments/frost.yml"
        code={
          "id: frost\n" +
          'display-name: "&bFrost"\n' +
          "rarity: RARE\n" +
          "max-level: 3\n" +
          "\n" +
          "categories:\n" +
          "  - ARMOR\n" +
          "\n" +
          "trigger:\n" +
          "  - ENTITY_DAMAGE\n" +
          "\n" +
          "conditions:\n" +
          "  - player.health < 10\n" +
          "\n" +
          "levels:\n" +
          "  1:\n" +
          "    duration: 60\n" +
          "    amplifier: 0\n" +
          "  3:\n" +
          "    duration: 140\n" +
          "    amplifier: 2\n" +
          "\n" +
          "effects:\n" +
          "  - type: POTION\n" +
          "    potion: SLOWNESS\n" +
          "    apply-to: target\n" +
          '    duration: "{duration}"\n' +
          '    amplifier: "{amplifier}"\n' +
          "  - type: PARTICLE\n" +
          "    particle: SNOWFLAKE\n" +
          "    count: 10\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="enchantments/thunder.yml"
        code={
          "id: thunder\n" +
          'display-name: "&eThunder"\n' +
          "rarity: EPIC\n" +
          "max-level: 1\n" +
          "\n" +
          "categories:\n" +
          "  - WEAPON\n" +
          "\n" +
          "trigger:\n" +
          "  - PLAYER_ATTACK\n" +
          "\n" +
          "chance: 15%\n" +
          "\n" +
          "effects:\n" +
          "  - LIGHTNING\n" +
          "  - type: MESSAGE\n" +
          '    value: "&e¡Un rayo golpeó a tu objetivo!"\n'
        }
      />
      <Callout tone="tip">
        {fill(c.shortFormTip, {
          effects: <code>effects</code>,
          short: <code>- LIGHTNING</code>,
          long: <code>{"- type: ... "}</code>,
        })}
      </Callout>

      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, { file: <code>enchantments/reference_full.yml</code> })}
      </Callout>
      <CodeBlock
        language="yaml"
        filename="enchantments/reference_full.yml"
        code={
          "id: reference_full_example\n" +
          'display-name: "&d&lEncantamiento de Referencia"\n' +
          "rarity: DIVINE\n" +
          "max-level: 5\n" +
          "\n" +
          "categories:\n" +
          "  - WEAPON\n" +
          "  - BOW\n" +
          "\n" +
          "allowed-items:\n" +
          "  - NETHERITE_SWORD\n" +
          "  - DIAMOND_SWORD\n" +
          "  - BOW\n" +
          "\n" +
          "conflicts:\n" +
          "  - lifesteal\n" +
          "  - frost\n" +
          "\n" +
          "trigger:\n" +
          "  - PLAYER_ATTACK\n" +
          "  - ENTITY_KILL\n" +
          "\n" +
          "conditions:\n" +
          '  - "sneaking"\n' +
          '  - "health-below:50%"\n' +
          "\n" +
          "chance: 35%\n" +
          "\n" +
          "levels:\n" +
          "  1:\n" +
          "    damage: 2\n" +
          "    duration-ticks: 40\n" +
          "  5:\n" +
          "    damage: 12\n" +
          "    duration-ticks: 140\n" +
          "\n" +
          "effects:\n" +
          "  - LIGHTNING\n" +
          "  - type: DAMAGE\n" +
          '    amount: "4"\n' +
          "  - type: POTION\n" +
          "    potion: WITHER\n" +
          '    amplifier: "1"\n' +
          '    duration: "60"\n' +
          "  - type: FIRE\n" +
          '    duration: "100"\n' +
          "  - type: PARTICLE\n" +
          "    particle: FLAME\n" +
          '    count: "20"\n' +
          "  - type: SOUND\n" +
          "    sound: ENTITY_LIGHTNING_BOLT_THUNDER\n" +
          "  - type: MESSAGE\n" +
          '    value: "&d¡El Encantamiento de Referencia se activó!"\n' +
          "  - type: COMMAND\n" +
          '    command: "give %player% diamond 1"\n'
        }
      />

      <YamlBuilder
        title={c.bTitle}
        description={c.bDesc}
        folder="enchantments"
        fields={enchantmentFields(c)}
      />

      <SectionHeading id="integracion-items">{c.itemsTitle}</SectionHeading>
      <p>
        {fill(c.itemsBody, {
          def: <code>ItemDefinition</code>,
          vanilla: <code>vanilla-enchantments</code>,
          custom: <code>custom-enchantments</code>,
          idLevel: <code>id: nivel</code>,
          plugin: <code>RPGRoll-Enchantments</code>,
          apply: <code>EnchantmentItem.apply(...)</code>,
          cmd: <code>/renchant</code>,
        })}
      </p>

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>
        {fill(c.guiBody, {
          browser: <Kbd>/renchant browser</Kbd>,
          fmt: <code>{"TIPO;clave=valor,clave2=valor2"}</code>,
        })}
      </p>
      <Callout tone="info">
        {fill(c.guiNote, {
          gui: <code>EnchantmentsEditorGUI</code>,
          own: <strong>{c.ownWord}</strong>,
          idLevel: <code>id</code>,
          cmd: <code>/renchant browser</code>,
        })}
      </Callout>

      <SectionHeading id="comandos">{c.cmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/renchant apply <id> <nivel>"}</Td><Td>{c.xApply}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/renchant remove <id>"}</Td><Td>{c.xRemove}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/renchant give <jugador> <id> <nivel>"}</Td><Td>{c.xGive}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/renchant list</Td><Td>{c.xList}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/renchant info <id>"}</Td><Td>{c.xInfo}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/renchant browser</Td><Td>{c.xBrowser}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/renchant reload</Td><Td>{c.xReload}</Td></Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.permNote, { perm: <Badge tone="amber">rpgrollenchantments.admin.*</Badge> })}
      </p>
      <Callout tone="warning" title={c.failTitle}>
        {fill(c.failBody, { conflicts: <code>conflicts</code>, apply: <code>/renchant apply</code> })}
      </Callout>

      <SectionHeading id="placeholders">{c.phTitle}</SectionHeading>
      <p>{fill(c.phIntro, { exp: <Badge tone="violet">rpgrollenchantments</Badge> })}</p>
      <Table>
        <Thead>
          <Th>{c.thPlaceholder}</Th>
          <Th>{c.thValue}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">%rpgrollenchantments_helditem_count%</Td><Td>{c.pCount}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgrollenchantments_helditem_<id>_level%"}</Td><Td>{c.pLevel}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgrollenchantments_helditem_has_<id>%"}</Td><Td>{fill(c.pHas, { yesno: <><code>si</code>/<code>no</code></> })}</Td></Tr>
        </tbody>
      </Table>

      <PrevNext current="encantamientos" onNavigate={onNavigate} />
    </>
  );
}
