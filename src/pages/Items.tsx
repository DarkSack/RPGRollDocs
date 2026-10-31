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
import { ITEMS_COPY, type ItemsCopy } from "./copy/items";

const mono = "font-mono text-xs";

const itemFields = (c: ItemsCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewItem, placeholder: "dragon_slayer" },
  { key: "category", label: c.fCategory, type: "string", default: "misc", placeholder: "sword" },
  { key: "material", label: c.fMaterial, type: "string", placeholder: "NETHERITE_SWORD" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&4Dragon Slayer" },
  { key: "lore", label: c.fLore, type: "list", placeholder: c.phLore },
  { key: "rarity", label: c.fRarity, type: "string", default: "common", placeholder: "mythic" },
  { key: "glow", label: c.fGlow, type: "boolean" },
  { key: "stats", label: c.fStats, type: "map", placeholder: "damage=14, critical_chance=20" },
  { key: "attributes", label: c.fAttributes, type: "map", placeholder: "GENERIC_ATTACK_DAMAGE=2" },
  {
    key: "requirements",
    label: c.fRequirements,
    type: "group",
    fields: [
      { key: "level", label: c.fLevel, type: "number", default: "0" },
      { key: "class", label: c.fClass, type: "string" },
    ],
  },
  {
    key: "durability",
    label: c.fDurability,
    type: "group",
    fields: [
      { key: "max", label: c.fMax, type: "number", default: "0" },
      { key: "repairable", label: c.fRepairable, type: "boolean", default: "true" },
      { key: "degrade-per-use", label: c.fDegrade, type: "number", default: "1" },
    ],
  },
  {
    key: "economy",
    label: c.fEconomy,
    type: "group",
    fields: [
      { key: "sell", label: c.fSell, type: "number", default: "0" },
      { key: "buy", label: c.fBuy, type: "number", default: "0" },
    ],
  },
];

const rarityFields = (c: ItemsCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewRarity, placeholder: "epic" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: c.phEpic },
  { key: "color", label: c.fColor, type: "string", placeholder: "light_purple" },
  { key: "glow", label: c.fGlowPlain, type: "boolean" },
  { key: "sound", label: c.fSound, type: "string", placeholder: "ENTITY_ILLUSIONER_CAST_SPELL" },
  { key: "particle", label: c.fParticle, type: "string", placeholder: "FLAME" },
];

const gemFields = (c: ItemsCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewGem, placeholder: "ruby" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: c.phRuby },
  { key: "type", label: c.fSocketType, type: "string", default: "GENERIC", placeholder: "FIRE" },
  { key: "material", label: c.fBaseItem, type: "string", default: "EMERALD", placeholder: "EMERALD" },
  { key: "item-model", label: c.fItemModel, type: "string", placeholder: "miserver:rubi" },
  { key: "stats", label: c.fStatBonus, type: "map", placeholder: "damage=3" },
];

export function Items({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = ITEMS_COPY[locale];

  return (
    <>
      <PageHeader title={c.title}>{c.intro}</PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, RPGRoll-FX, RPGRoll-Enchantments, Vault, PlaceholderAPI, SackResourcePack]"} />

      <SectionHeading id="rareza">{c.rarityTitle}</SectionHeading>
      <p>
        {fill(c.rarityBody, {
          dir: <code>rarities/*.yml</code>,
          ench: <code>luck_of_the_sea</code>,
          flag: <code>HIDE_ENCHANTS</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>id</Th>
          <Th>{c.thColor}</Th>
          <Th>{c.thGlow}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>common</Td><Td>{c.cWhite}</Td><Td>{c.no}</Td></Tr>
          <Tr><Td className={mono}>uncommon</Td><Td>{c.cGreen}</Td><Td>{c.no}</Td></Tr>
          <Tr><Td className={mono}>rare</Td><Td>{c.cAqua}</Td><Td>{c.no}</Td></Tr>
          <Tr><Td className={mono}>epic</Td><Td>{c.cPurple}</Td><Td>{c.yes}</Td></Tr>
          <Tr><Td className={mono}>legendary</Td><Td>{c.cGold}</Td><Td>{c.yes}</Td></Tr>
          <Tr><Td className={mono}>mythic</Td><Td>{c.cRed}</Td><Td>{c.yes}</Td></Tr>
          <Tr><Td className={mono}>divine</Td><Td>{c.cYellow}</Td><Td>{c.yes}</Td></Tr>
          <Tr><Td className={mono}>celestial</Td><Td>#00FFFF</Td><Td>{c.yes}</Td></Tr>
          <Tr><Td className={mono}>ancient</Td><Td>#8B5A2B</Td><Td>{c.yes}</Td></Tr>
        </tbody>
      </Table>
      <CodeBlock
        language="yaml"
        filename="rarities/epic.yml"
        code={
          "id: epic\n" +
          'display-name: "Épica"\n' +
          "color: light_purple\n" +
          "glow: true\n" +
          "sound: ENTITY_ILLUSIONER_CAST_SPELL\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="rarities/legendary.yml"
        code={
          "id: legendary\n" +
          'display-name: "Legendaria"\n' +
          "color: gold\n" +
          "glow: true\n" +
          "sound: ENTITY_PLAYER_LEVELUP\n" +
          "particle: FLAME\n"
        }
      />
      <YamlBuilder title={c.builderRarity} folder="rarities" fields={rarityFields(c)} />

      <SectionHeading id="stats">{c.statsTitle}</SectionHeading>
      <p>
        {fill(c.statsBody, {
          attributes: <code>attributes:</code>,
          real: <strong>{c.realWord}</strong>,
          dmg: <code>GENERIC_ATTACK_DAMAGE</code>,
          armor: <code>GENERIC_ARMOR</code>,
          hide: <code>HIDE_ATTRIBUTES</code>,
          stats: <code>stats:</code>,
        })}
      </p>
      <Callout tone="info" title={c.statsCalloutTitle}>
        {fill(c.statsCalloutBody, {
          health: <code>health</code>,
          maxHealth: <code>GENERIC_MAX_HEALTH</code>,
          speed: <code>speed</code>,
          moveSpeed: <code>GENERIC_MOVEMENT_SPEED</code>,
          others: (
            <>
              <code>damage</code>, <code>defense</code>, <code>critical_chance</code>,{" "}
              <code>critical_damage</code>, <code>resistance</code>
            </>
          ),
        })}
      </Callout>
      <p>{fill(c.pollingBody, { polling: <strong>{c.pollingWord}</strong> })}</p>
      <p>
        {fill(c.statsListBody, {
          list: (
            <code>
              health, mana, defense, damage, speed, strength, dexterity, intelligence, agility, luck, resistance,
              armor_penetration, critical_chance, critical_damage, attack_speed, magic_power, magic_resistance,
              mining_speed, fishing_luck
            </code>
          ),
        })}
      </p>

      <SectionHeading id="sockets">{c.socketsTitle}</SectionHeading>
      <p>
        {fill(c.socketsBody, {
          sockets: <code>sockets:</code>,
          id: <code>id</code>,
          cmd: <Kbd>{"/item socket <id>"}</Kbd>,
          offhand: <strong>offhand</strong>,
        })}
      </p>
      <p>
        {fill(c.gemsBody, {
          emerald: <code>EMERALD</code>,
          material: <code>material</code>,
          itemModel: <code>item-model</code>,
          link: <a href="#texturas-propias">{c.texturesLink}</a>,
          gemRef: <code>{"gem:<id>"}</code>,
          cmd: <Kbd>{"/itemadmin give <jugador> gem:ruby"}</Kbd>,
          ref: <code>reference: gem:ruby</code>,
        })}
      </p>
      <CodeBlock language="yaml" filename="gems/ruby.yml" code={'id: ruby\ndisplay-name: "&cRubí"\ntype: FIRE\nstats:\n  damage: 3\n'} />
      <CodeBlock
        language="yaml"
        filename="gems/sapphire.yml"
        code={'id: sapphire\ndisplay-name: "&9Zafiro"\ntype: GENERIC\nstats:\n  intelligence: 4\n  magic_power: 2\n'}
      />
      <YamlBuilder title={c.builderGem} folder="gems" fields={gemFields(c)} />

      <SectionHeading id="skins-mejoras-durabilidad">{c.skinsTitle}</SectionHeading>
      <ul>
        <li>
          {fill(c.skinsItem, { skins: <strong>{c.skinsWord}</strong>, cmd: <Kbd>/item skin</Kbd> })}
        </li>
        <li>
          {fill(c.upgradesItem, {
            upgrades: <strong>{c.upgradesWord}</strong>,
            cmd: <Kbd>/item upgrade</Kbd>,
            levels: <code>+1, +2...</code>,
            e1: <code>MAX_LEVEL</code>,
            e2: <code>NO_UPGRADE_DEFINED</code>,
            e3: <code>CANT_AFFORD_MONEY</code>,
            e4: <code>MISSING_MATERIAL</code>,
          })}
        </li>
        <li>
          {fill(c.durabilityItem, {
            dur: <strong>{c.durabilityWord}</strong>,
            auto: <code>auto-repair-per-minute &gt; 0</code>,
          })}
        </li>
      </ul>

      <SectionHeading id="texturas-propias">{c.texturesTitle}</SectionHeading>
      <p>
        {fill(c.texturesBody, {
          example: <code>item-model: "miserver:espada_de_mitrilo"</code>,
          component: <code>item_model</code>,
          mc: <code>minecraft:</code>,
        })}
      </p>
      <p>
        {fill(c.texturesPackBody, {
          path: <code>assets/miserver/items/espada_de_mitrilo.json</code>,
        })}
      </p>
      <Callout tone="info" title={c.bedrockTitle}>
        {fill(c.bedrockBody, {
          component: <code>item_model</code>,
          model: <code>{'"model": "miserver:espada_de_mitrilo"'}</code>,
          ironSword: <code>minecraft:iron_sword</code>,
          dir: <code>custom_mappings/</code>,
          mcpack: <code>.mcpack</code>,
          packs: <code>packs/</code>,
        })}
      </Callout>

      <p>
        {fill(c.equipmentBody, {
          example: <code>equipment-model: "miserver:mitrilo"</code>,
          worn: <strong>{c.wornWord}</strong>,
          path: <code>assets/miserver/equipment/mitrilo.json</code>,
          layer1: <code>textures/entity/equipment/humanoid/mitrilo.png</code>,
          layer2: <code>humanoid_leggings/mitrilo.png</code>,
          attachable: <em>attachable</em>,
          mcpack: <code>.mcpack</code>,
        })}
      </p>
      <p>
        {fill(c.equipmentNoneBody, {
          none: <code>equipment-model: none</code>,
          itemModel: <strong>{c.itemModelWord}</strong>,
          display: <code>display.head</code>,
        })}
      </p>

      <SectionHeading id="menas">{c.oresTitle}</SectionHeading>
      <p>{fill(c.oresBody, { dir: <code>ores/</code> })}</p>
      <CodeBlock language="yaml" filename="ores/mena_de_mitrilo.yml" code={"id: mena_de_mitrilo\ndisplay-name: \"&bMena de Mitrilo\"\nblocks:\n  stone: \"minecraft:note_block[instrument=zombie,note=2,powered=false]\"\n  deepslate: \"minecraft:note_block[instrument=zombie,note=3,powered=false]\"\ndrop:\n  item: mitrilo_en_bruto      # o gem:<id>\n  min: 1\n  max: 1\n  fortune: true\nxp: [2, 4]\nhardness: 4.0                 # como la de vanilla: la del diamante es 3\nrequired-tier: 3              # pico de diamante o mejor\ngeneration:\n  - worlds: [recursos, overworld]\n    min-y: -32\n    max-y: 32\n    veins-per-chunk: 4         # 0.25 = una veta cada cuatro chunks\n    vein-size: [3, 6]\n    replace:\n      STONE: stone\n      DEEPSLATE: deepslate\n"} />
      <ul>
        <li>
          {fill(c.oDisguise, {
            label: <strong>{c.oDisguiseLabel}</strong>,
            zombie: <code>zombie</code>,
            skeleton: <code>skeleton</code>,
            setting: <code>block-updates.disable-noteblock-updates: true</code>,
            file: <code>config/paper-global.yml</code>,
          })}
        </li>
        <li>
          {fill(c.oMine, {
            label: <strong>{c.oMineLabel}</strong>,
            attr: <code>block_break_speed</code>,
            hardness: <code>hardness</code>,
            tier: <code>required-tier</code>,
          })}
        </li>
        <li>
          {fill(c.oTier, {
            label: <strong>{c.oTierLabel}</strong>,
            data: <code>{'custom-data: { mining-tier: "5", mining-speed: "8.5" }'}</code>,
            speed: <code>mining-speed</code>,
          })}
        </li>
        <li>
          {fill(c.oGen, {
            label: <strong>{c.oGenLabel}</strong>,
            worlds: <code>worlds</code>,
            replace: <code>replace</code>,
            retrogen: <code>ores.retrogen-worlds</code>,
            config: <code>config.yml</code>,
          })}
        </li>
        <li>{fill(c.oMisc, { cmd: <Kbd>/itemadmin ores</Kbd> })}</li>
      </ul>
      <Callout tone="warning" title={c.oreWarnTitle}>
        {c.oreWarnBody}
      </Callout>
      <Callout tone="info" title={c.oreBedrockTitle}>
        {fill(c.oreBedrockBody, {
          dir: <code>custom_mappings/</code>,
          noteblock: <code>minecraft:note_block</code>,
          override: <code>only_override_states: true</code>,
          states: <code>state_overrides</code>,
          texture: <code>terrain_texture.json</code>,
          mining: <code>destructible_by_mining</code>,
        })}
      </Callout>

      <SectionHeading id="comportamiento">{c.behaviorTitle}</SectionHeading>
      <p>
        {fill(c.behaviorBody, { triggers: <code>triggers</code>, abilities: <code>abilities</code> })}
      </p>
      <p>
        {fill(c.triggersBody, {
          list: (
            <code>
              EQUIP, UNEQUIP, RIGHT_CLICK, LEFT_CLICK, ENTITY_HIT, ENTITY_KILL, BLOCK_BREAK, BLOCK_PLACE,
              PLAYER_DAMAGE, SHIELD_BLOCK, PLAYER_DEATH, PLAYER_RESPAWN, PLAYER_MOVE, PLAYER_JUMP, PLAYER_SNEAK,
              PLAYER_SPRINT, PLAYER_INTERACT, CONSUME, THROW, PICKUP, DROP
            </code>
          ),
        })}
      </p>
      <p>
        {fill(c.actionsBody, {
          list: (
            <code>
              MESSAGE, COMMAND, SOUND, PARTICLE, EXPLOSION, DAMAGE, HEAL, FIRE, TITLE, BOSSBAR, SUMMON,
              PROJECTILE, SHOOT
            </code>
          ),
        })}
      </p>
      <p>
        {fill(c.placeholdersBody, {
          message: <code>MESSAGE</code>,
          command: <code>COMMAND</code>,
          player: <code>{"{player}"}</code>,
          target: <code>{"{target}"}</code>,
          targetUuid: <code>{"{target_uuid}"}</code>,
          example: <code>{"effect give {target_uuid} minecraft:slowness 4 2"}</code>,
        })}
      </p>
      <p>
        {fill(c.conditionsBody, {
          ability: <em>ability</em>,
          e1: <code>player.level &gt;= 20</code>,
          e2: <code>player.health &lt; 50%</code>,
          e3: <code>player.hasPermission(perm)</code>,
          v1: <code>player.level/health/foodlevel</code>,
          v2: <code>target.type/health</code>,
          v3: <code>world</code>,
          v4: <code>weather</code>,
        })}
      </p>

      <SectionHeading id="armas-de-fuego">{c.shootTitle}</SectionHeading>
      <p>
        {fill(c.shootBody, {
          shoot: <code>SHOOT</code>,
          speed: <code>speed</code>,
          speed2: <code>speed</code>,
          gravity: <code>gravity</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thParam}</Th>
          <Th>{c.thDefault}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>amount</Td><Td>6</Td><Td>{c.sAmount}</Td></Tr>
          <Tr><Td className={mono}>range</Td><Td>32</Td><Td>{c.sRange}</Td></Tr>
          <Tr><Td className={mono}>speed</Td><Td>0</Td><Td>{c.sSpeed}</Td></Tr>
          <Tr><Td className={mono}>gravity</Td><Td>0</Td><Td>{c.sGravity}</Td></Tr>
          <Tr>
            <Td className={mono}>model</Td>
            <Td>—</Td>
            <Td>
              {fill(c.sModel, {
                component: <code>item_model</code>,
                example: <code>vanguardia:proyectil/cohete</code>,
              })}
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>particle, color, size</Td>
            <Td>CRIT, #FF3030, 0.8</Td>
            <Td>{fill(c.sParticle, { color: <code>color</code>, size: <code>size</code> })}</Td>
          </Tr>
          <Tr><Td className={mono}>particle2, color2, size2</Td><Td>—, #FFFFFF, 0.6</Td><Td>{c.sParticle2}</Td></Tr>
          <Tr><Td className={mono}>spiral</Td><Td>0</Td><Td>{c.sSpiral}</Td></Tr>
          <Tr><Td className={mono}>density</Td><Td>3</Td><Td>{c.sDensity}</Td></Tr>
          <Tr><Td className={mono}>explosion</Td><Td>0</Td><Td>{c.sExplosion}</Td></Tr>
          <Tr><Td className={mono}>break-blocks</Td><Td>false</Td><Td>{c.sBreak}</Td></Tr>
          <Tr><Td className={mono}>fire</Td><Td>false</Td><Td>{c.sFire}</Td></Tr>
          <Tr><Td className={mono}>muzzle-effect</Td><Td>—</Td><Td>{c.sMuzzle}</Td></Tr>
          <Tr><Td className={mono}>hit-effect</Td><Td>—</Td><Td>{c.sHit}</Td></Tr>
          <Tr>
            <Td className={mono}>sustain</Td>
            <Td>0</Td>
            <Td>{fill(c.sSustain, { speed: <code>speed</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>sound, volume, pitch</Td>
            <Td>—, 1.0, 1.0</Td>
            <Td>{fill(c.sSound, { sound: <code>Sound</code>, example: <code>ENTITY_BLAZE_SHOOT</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>ammo</Td>
            <Td>—</Td>
            <Td>
              {fill(c.sAmmo, {
                cell: <code>celula_laser</code>,
                mc: <code>minecraft:&lt;material&gt;</code>,
              })}
            </Td>
          </Tr>
          <Tr><Td className={mono}>ammo-amount</Td><Td>1</Td><Td>{c.sAmmoAmount}</Td></Tr>
          <Tr><Td className={mono}>no-ammo-sound</Td><Td>BLOCK_DISPENSER_FAIL</Td><Td>{c.sNoAmmoSound}</Td></Tr>
          <Tr><Td className={mono}>no-ammo-message</Td><Td>—</Td><Td>{c.sNoAmmoMessage}</Td></Tr>
        </tbody>
      </Table>
      <CodeBlock
        language="yaml"
        filename="packs/vanguardia/lanzacohetes_de_impulso.yml (trigger RIGHT_CLICK)"
        code={
          "      - type: SHOOT\n" +
          '        amount: "16"\n' +
          '        range: "50"\n' +
          '        speed: "1.0"\n' +
          '        model: "vanguardia:proyectil/cohete"\n' +
          "        particle: SMOKE\n" +
          "        particle2: FLAME\n" +
          '        explosion: "3.5"\n' +
          '        break-blocks: "true"\n' +
          "        muzzle-effect: vanguardia_fogonazo_cohete\n" +
          "        hit-effect: vanguardia_explosion_de_impulso\n"
        }
      />
      <Callout tone="info" title={c.ammoTitle}>
        {fill(c.ammoBody, {
          ammo: <code>ammo</code>,
          sound: <code>sound</code>,
          paper: <code>minecraft:paper</code>,
        })}
      </Callout>
      <CodeBlock
        language="yaml"
        filename="packs/vanguardia/rifle_laser.yml (trigger RIGHT_CLICK)"
        code={
          "      - type: SHOOT\n" +
          '        amount: "9"\n' +
          '        range: "48"\n' +
          "        particle: DUST\n" +
          '        color: "#FF2A2A"\n' +
          "        particle2: END_ROD\n" +
          "        sound: BLOCK_BEACON_DEACTIVATE\n" +
          '        pitch: "1.8"\n' +
          "        ammo: celula_laser\n" +
          "        no-ammo-message: \"<red>Sin células láser\"\n"
        }
      />
      <SectionHeading id="laser-sostenido">{c.laserTitle}</SectionHeading>
      <p>
        {fill(c.laserBody, {
          sustain: <code>sustain</code>,
          ammo: <code>ammo</code>,
          amount: <code>amount</code>,
          example: <code>amount: "2"</code>,
          sustain2: <code>sustain</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="packs/vanguardia/haz_laser.yml (trigger RIGHT_CLICK)"
        code={
          "      - type: SHOOT\n" +
          '        amount: "2"\n' +
          '        range: "24"\n' +
          '        sustain: "6"\n' +
          "        particle: DUST\n" +
          '        color: "#30C8FF"\n' +
          '        size: "1.4"\n' +
          "        particle2: ELECTRIC_SPARK\n" +
          '        spiral: "0.25"\n' +
          "        sound: BLOCK_BEACON_AMBIENT\n" +
          '        pitch: "2.0"\n' +
          "        ammo: celula_laser\n"
        }
      />
      <Callout tone="info" title={c.laserBedrockTitle}>
        {c.laserBedrockBody}
      </Callout>

      <SectionHeading id="requisitos-de-uso">{c.useReqTitle}</SectionHeading>
      <p>{c.useReqBody}</p>
      <Callout tone="warning" title={c.useReqWarnTitle}>
        {fill(c.useReqWarnBody, {
          abilities: <code>abilities</code>,
          triggers: <code>triggers</code>,
          field: <code>completed-quests</code>,
        })}
      </Callout>

      <SectionHeading id="recetas">{c.recipesTitle}</SectionHeading>
      <p>
        {fill(c.recipesBody, {
          types: (
            <>
              <code>SHAPED</code>, <code>SHAPELESS</code>, <code>FURNACE</code>, <code>STONECUTTER</code>
            </>
          ),
          smithing: <code>SMITHING</code>,
          dataOnly: (
            <>
              <code>NPC</code>, <code>PROFESSION</code>, <code>QUEST</code>
            </>
          ),
          sourceId: <code>sourceId</code>,
        })}
      </p>
      <p>
        {fill(c.ingredientsBody, {
          itemRef: <code>{"item:<id>"}</code>,
          key: <code>key</code>,
          shaped: <code>SHAPED</code>,
          ingredients: <code>ingredients</code>,
          amount: <code>amount</code>,
          furnace: <code>FURNACE</code>,
          stonecutter: <code>STONECUTTER</code>,
          baseMaterial: <code>base-material</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="packs/forja/lingote_de_mitrilo.yml (fragmento)"
        code={
          "recipes:\n" +
          "  - type: FURNACE\n" +
          "    ingredients: [\"item:mitrilo_en_bruto\"]\n" +
          "  - type: SHAPED\n" +
          "    shape: [NNN, NNN, NNN]\n" +
          "    key:\n" +
          "      N: item:pepita_de_mitrilo\n"
        }
      />
      <p>
        {fill(c.protectBody, {
          setting: <code>recipes.protect-custom-items: true</code>,
          config: <code>config.yml</code>,
        })}
      </p>
      <Callout tone="warning" title={c.clashTitle}>
        {fill(c.clashBody, { ingot: <code>IRON_INGOT</code> })}
      </Callout>

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>{fill(c.guiBody, { cmd: <Kbd>/itemadmin browser</Kbd> })}</p>
      <ul>
        <li>{c.gui1}</li>
        <li>{c.gui2}</li>
        <li>{c.gui3}</li>
      </ul>
      <p>{c.guiSessionBody}</p>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="items/sword/dragon_slayer.yml"
        code={
          "id: dragon_slayer\n" +
          "category: sword\n" +
          "material: NETHERITE_SWORD\n" +
          'display-name: "&4Dragon Slayer"\n' +
          "lore:\n" +
          '  - "&7Forjada para matar dragones."\n' +
          "rarity: MYTHIC\n" +
          "glow: true\n" +
          "\n" +
          "stats:\n" +
          "  damage: 14\n" +
          "  critical_chance: 20\n" +
          "  critical_damage: 75\n" +
          "\n" +
          "requirements:\n" +
          "  level: 40\n" +
          "\n" +
          "durability:\n" +
          "  max: 1000\n" +
          "  repairable: true\n" +
          "  degrade-per-use: 1\n" +
          "\n" +
          "triggers:\n" +
          "  ENTITY_KILL:\n" +
          "    - type: MESSAGE\n" +
          '      value: "&4¡Otro enemigo cae ante Dragon Slayer!"\n' +
          "    - type: PARTICLE\n" +
          "      particle: DRAGON_BREATH\n" +
          "      count: 15\n" +
          "\n" +
          "economy:\n" +
          "  sell: 2000\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="items/relics/phoenix_feather.yml"
        code={
          "id: phoenix_feather\n" +
          "category: relics\n" +
          "material: BLAZE_ROD\n" +
          'display-name: "&6Pluma de Fénix"\n' +
          "lore:\n" +
          '  - "&7Aún guarda el calor de las llamas eternas."\n' +
          "rarity: LEGENDARY\n" +
          "glow: true\n" +
          "\n" +
          "stats:\n" +
          "  magic_power: 6\n" +
          "  luck: 3\n" +
          "\n" +
          "requirements:\n" +
          "  level: 20\n" +
          "\n" +
          "abilities:\n" +
          "  - id: phoenix_warmth\n" +
          '    display-name: "&6Calidez del Fénix"\n' +
          "    passive: true\n" +
          "    actions:\n" +
          "      - type: PARTICLE\n" +
          "        particle: FLAME\n" +
          "        count: 8\n" +
          "      - type: MESSAGE\n" +
          '        value: "&6La Pluma de Fénix arde suavemente en tu mano."\n' +
          "\n" +
          "economy:\n" +
          "  sell: 2500\n" +
          "  buy: 5000\n"
        }
      />

      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, { file: <code>items/example/reference_full.yml</code> })}
      </Callout>
      <CodeBlock
        language="yaml"
        filename="items/example/reference_full.yml"
        code={
          "id: reference_full_example\n" +
          "category: example\n" +
          "material: NETHERITE_SWORD\n" +
          'display-name: "<gradient:#54daf4:#545eb6>Hoja de Referencia</gradient>"\n' +
          "lore:\n" +
          '  - "&7Un ítem de ejemplo que documenta cada campo disponible."\n' +
          '  - "&7No está pensado para usarse en partidas reales."\n' +
          "\n" +
          "custom-model-data: 100001\n" +
          "rarity: MYTHIC\n" +
          "glow: true\n" +
          "\n" +
          "flags:\n" +
          "  - HIDE_ENCHANTS\n" +
          "  - HIDE_UNBREAKABLE\n" +
          "  - HIDE_DYE\n" +
          "  - HIDE_ARMOR_TRIM\n" +
          "hide-attributes: false\n" +
          "unbreakable: false\n" +
          'color: "#8B0000"\n' +
          'skull-texture: "MHF_Steve"\n' +
          "\n" +
          "trim:\n" +
          "  material: REDSTONE\n" +
          "  pattern: SPIRE\n" +
          "\n" +
          "stats:\n" +
          "  damage: 25\n" +
          "  critical_chance: 35\n" +
          "  critical_damage: 120\n" +
          "  magic_power: 15\n" +
          "  luck: 10\n" +
          "\n" +
          "attributes:\n" +
          "  GENERIC_MAX_HEALTH: 4\n" +
          "  GENERIC_MOVEMENT_SPEED: 0.02\n" +
          "\n" +
          "requirements:\n" +
          "  level: 40\n" +
          "  race: elf\n" +
          "  class: warrior\n" +
          "  profession: blacksmith\n" +
          "  skill: swordsmanship\n" +
          "  trait: strong_arm\n" +
          "  permission: rpgroll.items.mythic\n" +
          "  money: 500\n" +
          "  completed-quests: [dragon_hunt, ancient_trial]\n" +
          "\n" +
          "durability:\n" +
          "  max: 1000\n" +
          "  repairable: true\n" +
          "  degrade-per-use: 1\n" +
          "  auto-repair-per-minute: 0\n" +
          "\n" +
          "enchantments:\n" +
          "  SHARPNESS: 5\n" +
          "  UNBREAKING: 3\n" +
          "custom-enchantments:\n" +
          "  flaming_strike: 3\n" +
          "\n" +
          "effects:\n" +
          "  - potion: FIRE_RESISTANCE\n" +
          "    amplifier: 0\n" +
          "    requires-held: true\n" +
          "\n" +
          "triggers:\n" +
          "  ENTITY_KILL:\n" +
          "    - type: MESSAGE\n" +
          '      value: "&4¡Otro enemigo cae ante la Hoja de Referencia!"\n' +
          "\n" +
          "abilities:\n" +
          "  - id: reference_dash\n" +
          '    display-name: "&bEmbestida"\n' +
          "    passive: false\n" +
          "    trigger: RIGHT_CLICK\n" +
          '    cooldown: "10s"\n' +
          "    conditions: [sneaking]\n" +
          "    actions:\n" +
          "      - type: PARTICLE\n" +
          "        particle: CLOUD\n" +
          "        count: 20\n" +
          "\n" +
          "sockets:\n" +
          "  - id: socket_1\n" +
          "    accepted-types: [OFFENSIVE, UTILITY]\n" +
          "\n" +
          "skins:\n" +
          "  - id: golden_finish\n" +
          '    display-name: "&6Hoja de Referencia (Acabado Dorado)"\n' +
          "    material: NETHERITE_SWORD\n" +
          "    custom-model-data: 100002\n" +
          "\n" +
          'upgrades:\n' +
          '  "1":\n' +
          "    stats: { damage: 5 }\n" +
          "    cost: 100\n" +
          "    cost-material: DIAMOND\n" +
          "    cost-amount: 2\n" +
          "\n" +
          "recipes:\n" +
          "  - type: SHAPED\n" +
          '    shape: [" D ", " D ", " S "]\n' +
          "    key: { D: DIAMOND, S: STICK }\n" +
          "\n" +
          "economy:\n" +
          "  sell: 5000\n" +
          "  buy: 15000\n" +
          "\n" +
          "custom-data:\n" +
          '  faction: "reference_order"\n'
        }
      />

      <YamlBuilder
        title={c.builderItem}
        description={c.builderItemDesc}
        folder="items"
        fields={itemFields(c)}
      />

      <SectionHeading id="comandos">{c.cmdsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>{"/itemadmin give <jugador> <id|gem:id> [cantidad]"}</Td><Td>{c.a1}</Td></Tr>
          <Tr><Td className={mono}>/itemadmin ores</Td><Td>{c.a2}</Td></Tr>
          <Tr><Td className={mono}>/itemadmin list</Td><Td>{c.a3}</Td></Tr>
          <Tr><Td className={mono}>/itemadmin reload</Td><Td>{c.a4}</Td></Tr>
          <Tr><Td className={mono}>{"/itemadmin create <id> [pack]"}</Td><Td>{c.a5}</Td></Tr>
          <Tr><Td className={mono}>/itemadmin browser</Td><Td>{c.a6}</Td></Tr>
          <Tr><Td className={mono}>{"/itemadmin editor <id>"}</Td><Td>{c.a7}</Td></Tr>
        </tbody>
      </Table>
      <p>{fill(c.adminPermBody, { perm: <Badge tone="amber">rpgrollitems.admin.*</Badge> })}</p>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>/item info</Td><Td>{c.u1}</Td></Tr>
          <Tr><Td className={mono}>/item upgrade</Td><Td>{c.u2}</Td></Tr>
          <Tr><Td className={mono}>/item skin</Td><Td>{c.u3}</Td></Tr>
          <Tr><Td className={mono}>{"/item socket <id>"}</Td><Td>{c.u4}</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="info">
        {fill(c.noPermBody, { cmd: <code>/item</code> })}
      </Callout>

      <SectionHeading id="placeholders">{c.phTitle}</SectionHeading>
      <p>
        {fill(c.phBody, {
          exp: <Badge tone="violet">rpgrollitems</Badge>,
          stat: <code>stat_*</code>,
          held: <code>helditem_*</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thPlaceholder}</Th>
          <Th>{c.thValue}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>{"%rpgrollitems_stat_<nombre>%"}</Td><Td>{c.ph1}</Td></Tr>
          <Tr>
            <Td className={mono}>%rpgrollitems_helditem_name%</Td>
            <Td>{fill(c.ph2, { dash: <code>-</code> })}</Td>
          </Tr>
          <Tr><Td className={mono}>%rpgrollitems_helditem_rarity%</Td><Td>{c.ph3}</Td></Tr>
          <Tr><Td className={mono}>%rpgrollitems_helditem_upgrade_level%</Td><Td>{c.ph4}</Td></Tr>
          <Tr><Td className={mono}>%rpgrollitems_helditem_durability% / _durability_max</Td><Td>{c.ph5}</Td></Tr>
        </tbody>
      </Table>

      <PrevNext current="items" onNavigate={onNavigate} />
    </>
  );
}
