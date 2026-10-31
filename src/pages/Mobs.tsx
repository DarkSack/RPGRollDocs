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
import { MOBS_COPY, type MobsCopy } from "./copy/mobs";

const mobFields = (c: MobsCopy): YamlField[] => [
  { key: "id", label: c.mfId, type: "string", default: "nuevo_mob", placeholder: "forest_goblin" },
  {
    key: "category",
    label: c.mfCategory,
    type: "select",
    options: [
      "NORMAL",
      "MINI_BOSS",
      "WORLD_BOSS",
      "RAID_BOSS",
      "DUNGEON_BOSS",
      "ELITE",
      "SUMMON",
      "SPIRIT",
      "HOSTILE_PET",
      "NEUTRAL",
      "ARMED_MERCHANT",
      "GUARDIAN",
      "CINEMATIC_BOSS",
    ],
  },
  { key: "display-name", label: c.mfDisplayName, type: "string", placeholder: "&2Trasgo del Bosque" },
  { key: "base-entity-type", label: c.mfBaseEntity, type: "string", placeholder: "ZOMBIE" },
  { key: "level", label: c.mfLevel, type: "number", default: "1" },
  { key: "rarity", label: c.mfRarity, type: "string", default: "common" },
  { key: "tags", label: c.mfTags, type: "list", placeholder: "forest, humanoid" },
  { key: "description", label: c.mfDescription, type: "string" },
  {
    key: "model",
    label: c.mfModel,
    type: "group",
    fields: [
      { key: "scale", label: c.mfScale, type: "number", default: "1.0" },
      { key: "glow", label: c.mfGlow, type: "boolean" },
      { key: "invisible", label: c.mfInvisible, type: "boolean" },
    ],
  },
  { key: "stats", label: c.mfStats, type: "map", placeholder: "health=30, damage=4, speed=105" },
  { key: "resistances", label: c.mfResistances, type: "map", placeholder: "poison=25" },
  {
    key: "ai",
    label: c.mfAi,
    type: "group",
    fields: [
      { key: "goals", label: c.mfGoals, type: "list", placeholder: "ATTACK_PLAYERS, FLEE" },
      { key: "aggro-range", label: c.mfAggro, type: "number", default: "16" },
      { key: "flee-health-percent", label: c.mfFlee, type: "number", default: "0" },
      { key: "move-speed", label: c.mfMoveSpeed, type: "number", default: "1.0" },
    ],
  },
];

const mobRegionFields = (c: MobsCopy): YamlField[] => [
  { key: "id", label: c.rfId, type: "string", default: "nueva_region", placeholder: "volcano_arena" },
  { key: "world", label: c.rfWorld, type: "string", default: "world" },
  {
    key: "min",
    label: c.rfMin,
    type: "group",
    fields: [
      { key: "x", label: "X", type: "number", default: "0" },
      { key: "y", label: "Y", type: "number", default: "0" },
      { key: "z", label: "Z", type: "number", default: "0" },
    ],
  },
  {
    key: "max",
    label: c.rfMax,
    type: "group",
    fields: [
      { key: "x", label: "X", type: "number", default: "0" },
      { key: "y", label: "Y", type: "number", default: "0" },
      { key: "z", label: "Z", type: "number", default: "0" },
    ],
  },
];

export function Mobs({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = MOBS_COPY[locale];

  return (
    <>
      <PageHeader title={c.title} slug="mobs">
        {c.intro}
      </PageHeader>

      <Callout tone="info" title={c.scopeTitle}>
        {fill(c.scopeBody, {
          models3d: (
            <a href="#modelos-3d" onClick={(e) => e.preventDefault()}>
              {c.models3dLink}
            </a>
          ),
          skins: (
            <a href="#reskin" onClick={(e) => e.preventDefault()}>
              model.skins
            </a>
          ),
        })}
      </Callout>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        code={"depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, Vault, RPGRoll-Items, RPGRoll-Quests, PlaceholderAPI, SackResourcePack, FreeMinecraftModels]"}
      />
      <p>
        {fill(c.reqBody1, {
          material: <code>Material</code>,
          item: <code>ITEM</code>,
          quest: <code>QUEST</code>,
        })}{" "}
        <a href="/sackresourcepack" className="text-violet-600 underline dark:text-violet-400">
          SackResourcePack
        </a>
        {fill(c.reqBody2, {
          skins: (
            <a href="#reskin" onClick={(e) => e.preventDefault()}>
              {c.skinsLink}
            </a>
          ),
        })}
      </p>

      <SectionHeading id="filosofia">{c.philTitle}</SectionHeading>
      <p>
        {fill(c.philBody, {
          def: <code>MobDefinition</code>,
          record: <em>{c.recordWord}</em>,
          id: <code>id</code>,
          baseType: <code>base-entity-type</code>,
        })}
      </p>

      <SectionHeading id="ia">{c.aiTitle}</SectionHeading>
      <p>
        {fill(c.aiBody, {
          pathfindingGoals: <em>{c.pathfindingGoals}</em>,
          setAware: <code>Mob#setAware(false)</code>,
          all: <strong>{c.allWord}</strong>,
          task: <code>MobAITask</code>,
          goals: <code>goals</code>,
          moveTo: <code>Pathfinder#moveTo(...)</code>,
          setTarget: <code>Mob#setTarget(...)</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thGoal}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">ATTACK_PLAYERS</Td><Td>{c.gAttack}</Td></Tr>
          <Tr><Td className="font-mono text-xs">FLEE</Td><Td>{fill(c.gFlee, { pct: <code>flee-health-percent</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PATROL</Td><Td>{fill(c.gPatrol, { points: <code>patrol-points</code>, xyz: <code>x,y,z</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">GUARD_REGION</Td><Td>{fill(c.gGuard, { region: <code>guard-region</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">DEFEND_ALLY</Td><Td>{c.gDefend}</Td></Tr>
          <Tr><Td className="font-mono text-xs">FOLLOW_LEADER</Td><Td>{c.gFollow}</Td></Tr>
          <Tr><Td className="font-mono text-xs">STAY_STILL</Td><Td>{c.gStay}</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="tip">
        {fill(c.goalTip, {
          inOrder: <strong>{c.inOrderWord}</strong>,
          goals: <code>ai.goals</code>,
          example: <code>[FLEE, ATTACK_PLAYERS]</code>,
        })}
      </Callout>

      <SectionHeading id="combate">{c.combatTitle}</SectionHeading>
      <p>{c.combatIntro}</p>
      <ul>
        <li>
          {fill(c.liAttrs, {
            names: <strong>{c.attrNames}</strong>,
            attrs: (
              <>
                <code>GENERIC_MAX_HEALTH</code>, etc.
              </>
            ),
          })}
        </li>
        <li>
          {fill(c.liDamage, {
            names: <strong>{c.damageNames}</strong>,
            accuracy: <code>accuracy</code>,
            crit: (
              <>
                <code>critical_chance</code>/<code>critical_damage</code>
              </>
            ),
          })}
        </li>
        <li>{fill(c.liDodge, { name: <strong>{c.dodgeName}</strong> })}</li>
        <li>{fill(c.liDefense, { names: <strong>{c.defenseNames}</strong> })}</li>
        <li>{fill(c.liRes, { names: <strong>{c.resNames}</strong>, cause: <code>DamageCause</code> })}</li>
      </ul>
      <Callout tone="warning" title={c.tickTitle}>
        {fill(c.tickBody, { damaged: <code>DAMAGED</code>, getHealth: <code>getHealth()</code> })}
      </Callout>

      <SectionHeading id="modelos-3d">{c.m3dTitle}</SectionHeading>
      <p>
        {fill(c.m3dBody, {
          field: <code>model.model-engine-id</code>,
          fmm: <strong>{c.fmmName}</strong>,
          bbmodel: <code>.bbmodel</code>,
          dir: <code>plugins/FreeMinecraftModels/models/</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thAnimation}</Th>
          <Th>{c.thWho}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">spawn / idle / walk</Td><Td>{c.anSpawn}</Td></Tr>
          <Tr><Td className="font-mono text-xs">attack</Td><Td>{c.anAttack}</Td></Tr>
          <Tr><Td className="font-mono text-xs">death</Td><Td>{c.anDeath}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{c.anOtherLabel}</Td><Td>{fill(c.anOther, { animation: <code>ANIMATION</code>, value: <code>value</code>, loop: <code>loop: true</code> })}</Td></Tr>
        </tbody>
      </Table>
      <CodeBlock
        language="yaml"
        filename={c.m3dFile}
        code={
          "base-entity-type: RAVAGER\n" +
          "model:\n" +
          "  scale: 1.3                # FMM escala el modelo con el atributo scale del mob\n" +
          "  model-engine-id: wyrm_carmesi\n" +
          "skills:\n" +
          "  - id: aliento_de_fuego\n" +
          "    trigger: PERIODIC\n" +
          "    cooldown: \"18s\"\n" +
          "    actions:\n" +
          "      - type: ANIMATION\n" +
          "        value: aliento\n" +
          "      - type: FIRE\n" +
          "        ticks: \"100\"\n"
        }
      />
      <Callout tone="info" title={c.scaleTitle}>
        {fill(c.scaleBody, {
          scale: <code>scale</code>,
          modelScale: <code>model.scale</code>,
          tag: <code>tag_</code>,
        })}
      </Callout>

      <SectionHeading id="reskin">{c.reskinTitle}</SectionHeading>
      <p>
        {fill(c.reskinBody, {
          cmd: <code>CustomModelData</code>,
          display: <code>ItemDisplay</code>,
          cmdLower: <code>custom-model-data</code>,
          invisible: <code>model.invisible: true</code>,
        })}
      </p>
      <p>
        {fill(c.reskinBody2, {
          skins: <code>model.skins</code>,
          list: <strong>{c.listWord}</strong>,
          weight: <code>weight</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename={c.reskinFile}
        code={
          "model:\n" +
          "  invisible: true\n" +
          "  skins:\n" +
          "    - id: molten\n" +
          "      material: PAPER\n" +
          "      custom-model-data: 100001\n" +
          "      scale: 2.5\n" +
          "      weight: 2.0\n" +
          "    - id: obsidian\n" +
          "      material: PAPER\n" +
          "      custom-model-data: 100002\n" +
          "      scale: 2.5\n" +
          "      weight: 1.0\n"
        }
      />
      <p>
        {fill(c.reskinBody3, {
          cmd: <code>custom-model-data</code>,
          path: (
            <code>
              plugins/RPGRoll-Mobs/resourcepack/&lt;namespace&gt;/&lt;textures|models&gt;/item/...
            </code>
          ),
        })}
      </p>
      <p>
        {fill(c.editorBody, {
          cmd: <Kbd>{"/mobadmin editor <id>"}</Kbd>,
          fmt: <code>id material custom-model-data [peso]</code>,
        })}
      </p>
      <Callout tone="warning" title={c.untestedTitle}>
        {c.untestedBody}
      </Callout>

      <SectionHeading id="fases">{c.phasesTitle}</SectionHeading>
      <p>
        {fill(c.phasesBody, {
          phase: <code>MobPhase</code>,
          threshold: <code>health-threshold-percent</code>,
          additive: <strong>{c.additiveWord}</strong>,
        })}
      </p>

      <SectionHeading id="loot">{c.lootTitle}</SectionHeading>
      <p>
        {fill(c.lootBody, {
          type: <code>type</code>,
          badges: (
            <>
              <Badge tone="green">ITEM</Badge> <Badge tone="amber">MONEY</Badge>{" "}
              <Badge tone="blue">EXPERIENCE</Badge> <Badge tone="violet">COMMAND</Badge>{" "}
              <Badge>QUEST</Badge>
            </>
          ),
          scope: <code>scope</code>,
        })}
      </p>
      <ul>
        <li>{fill(c.liShared, { name: <strong>{c.sharedName}</strong> })}</li>
        <li>
          {fill(c.liPerPlayer, {
            name: <strong>{c.perPlayerName}</strong>,
            perEach: <em>{c.perEachPlayer}</em>,
          })}
        </li>
      </ul>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <p>{fill(c.yamlIntro, { path: <code>plugins/RPGRoll-Mobs/mobs/**/*.yml</code> })}</p>
      <CodeBlock
        language="yaml"
        filename="mobs/normal/forest_goblin.yml"
        code={
          "id: forest_goblin\n" +
          "category: NORMAL\n" +
          'display-name: "&2Trasgo del Bosque"\n' +
          "level: 5\n" +
          "rarity: common\n" +
          'tags: [ "forest", "humanoid" ]\n' +
          'description: "Un trasgo hostil que ronda los bosques densos."\n' +
          "base-entity-type: ZOMBIE\n" +
          "\n" +
          "model:\n" +
          "  scale: 0.85\n" +
          "  glow: false\n" +
          "  invisible: false\n" +
          "  equipment:\n" +
          "    hand: STONE_SWORD\n" +
          "    head: LEATHER_HELMET\n" +
          "\n" +
          "stats:\n" +
          "  health: 30\n" +
          "  damage: 4\n" +
          "  defense: 1\n" +
          "  speed: 105\n" +
          "  armor: 2\n" +
          "  dodge: 5\n" +
          "  accuracy: 90\n" +
          "  critical_chance: 10\n" +
          "  critical_damage: 50\n" +
          "  knockback_resistance: 0\n" +
          "\n" +
          "resistances:\n" +
          "  poison: 25\n" +
          "\n" +
          "ai:\n" +
          '  goals: [ "ATTACK_PLAYERS", "FLEE" ]\n' +
          "  aggro-range: 14\n" +
          "  flee-health-percent: 20\n" +
          "  move-speed: 1.05\n" +
          "\n" +
          "skills:\n" +
          "  - id: goblin_screech\n" +
          '    display-name: "Chillido"\n' +
          "    trigger: PERIODIC\n" +
          "    cooldown: 20s\n" +
          "    chance: 30\n" +
          "    conditions:\n" +
          '      - "target.type == PLAYER"\n' +
          "    actions:\n" +
          "      - type: SOUND\n" +
          "        sound: ENTITY_VEX_HURT\n" +
          '        volume: "1.0"\n' +
          '        pitch: "1.4"\n' +
          "\n" +
          "loot:\n" +
          "  - type: ITEM\n" +
          "    reference: IRON_NUGGET\n" +
          "    amount-min: 1\n" +
          "    amount-max: 3\n" +
          "    chance: 60\n" +
          "    scope: SHARED\n" +
          "  - type: MONEY\n" +
          "    amount-min: 2\n" +
          "    amount-max: 5\n" +
          "    chance: 100\n" +
          "    scope: PER_PLAYER\n" +
          "\n" +
          "spawn-rules:\n" +
          '  biomes: [ "forest", "dark_forest", "birch_forest" ]\n' +
          "  min-height: 60\n" +
          "  max-height: 200\n" +
          '  hour: "19-6"\n' +
          "  natural-spawn: false\n" +
          "  spawn-weight: 1.0\n"
        }
      />
      <p>
        {fill(c.bossIntro, {
          fields: (
            <>
              <code>phases</code>, <code>bossbar</code>, <code>dialogues</code> &amp; <code>triggers</code>
            </>
          ),
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename={c.bossFile}
        code={
          "category: MINI_BOSS\n" +
          "phases:\n" +
          "  - id: enraged\n" +
          "    health-threshold-percent: 50\n" +
          "    stat-multipliers:\n" +
          "      damage: 1.4\n" +
          "      speed: 1.2\n" +
          "    skills:\n" +
          "      - id: ash_nova\n" +
          "        trigger: PERIODIC\n" +
          "        cooldown: 15s\n" +
          "        chance: 70\n" +
          "        actions:\n" +
          "          - type: DAMAGE\n" +
          '            amount: "10"\n' +
          "    bossbar-title: \"&4&lColoso de Ceniza &7[Enfurecido]\"\n" +
          "\n" +
          "triggers:\n" +
          "  PHASE_CHANGE:\n" +
          "    - type: TITLE\n" +
          '      title: "&c&l¡EL COLOSO DESPIERTA!"\n' +
          "\n" +
          "bossbar:\n" +
          "  enabled: true\n" +
          "  color: RED\n" +
          "  style: NOTCHED_10\n"
        }
      />

      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, { file: <code>mobs/bosses/reference_full.yml</code> })}
      </Callout>

      <SectionHeading id="skills">{c.skillsTitle}</SectionHeading>
      <p>
        {fill(c.skillsBody, {
          trigger: <code>trigger</code>,
          cooldown: <code>cooldown</code>,
          chance: <code>chance</code>,
          conditions: <code>conditions</code>,
          exprs: (
            <>
              <code>mob.health &lt; 50%</code>, <code>target.type == PLAYER</code>,{" "}
              <code>night == true</code>
            </>
          ),
          actions: <code>actions</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thTrigger}</Th>
          <Th>{c.thWhen}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">SPAWN / DEATH</Td><Td>{c.tSpawn}</Td></Tr>
          <Tr><Td className="font-mono text-xs">DAMAGED / ATTACK</Td><Td>{c.tDamaged}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PHASE_CHANGE</Td><Td>{c.tPhase}</Td></Tr>
          <Tr><Td className="font-mono text-xs">LOSE_TARGET</Td><Td>{c.tLoseTarget}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PLAYER_ENTER_RANGE</Td><Td>{c.tEnterRange}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PERIODIC / HEALTH_THRESHOLD</Td><Td>{c.tPeriodic}</Td></Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.actionsBody, {
          list: (
            <>
              <code>MESSAGE</code>, <code>COMMAND</code>, <code>SOUND</code>, <code>PARTICLE</code>,{" "}
              <code>DAMAGE</code>, <code>HEAL</code>, <code>SUMMON</code>, <code>TELEPORT</code>,{" "}
              <code>EXPLOSION</code>, <code>FIRE</code>, <code>FREEZE</code>, <code>PUSH</code>,{" "}
              <code>PULL</code>, <code>LIGHTNING</code>, <code>TITLE</code>, <code>ANIMATION</code>
            </>
          ),
          kv: <code>key=value</code>,
        })}
      </p>

      <YamlBuilder
        title={c.bMob}
        description={c.bMobDesc}
        folder="mobs"
        fields={mobFields(c)}
      />

      <SectionHeading id="spawn">{c.spawnTitle}</SectionHeading>
      <p>
        {fill(c.spawnBody, {
          flag: <code>spawn-rules.natural-spawn: true</code>,
          event: <code>CreatureSpawnEvent</code>,
          weight: <code>spawn-weight</code>,
        })}
      </p>

      <SectionHeading id="regiones">{c.regionsTitle}</SectionHeading>
      <p>
        {fill(c.regionsBody, {
          guardRegion: <code>guard-region</code>,
          goal: <code>GUARD_REGION</code>,
          filter: <code>spawn-rules.regions</code>,
        })}
      </p>
      <Callout tone="info">
        {fill(c.regionsNote, {
          dir: <code>mobs/src/main/resources/regions/</code>,
          files: (
            <>
              <code>boss_arena.yml</code>, <code>forest_camp.yml</code>
            </>
          ),
        })}
      </Callout>
      <YamlBuilder title={c.bRegion} folder="regions" fields={mobRegionFields(c)} />

      <SectionHeading id="tamano-aleatorio">{c.sizeTitle}</SectionHeading>
      <p>
        {fill(c.sizeBody, {
          flag: <code>random-size.enabled: true</code>,
          config: <code>config.yml</code>,
          scale: <code>scale</code>,
          vanilla: <strong>{c.vanillaWord}</strong>,
          rpgroll: <strong>{c.rpgrollWord}</strong>,
        })}
      </p>
      <ul>
        <li>{fill(c.liDist, { chance: <code>extremes.chance</code> })}</li>
        <li>
          {fill(c.liStats, {
            stats: <code>stats</code>,
            formula: <code>{c.sizeFormula}</code>,
            speed: <code>speed: -0.25</code>,
          })}
        </li>
        <li>{fill(c.liHeight, { min: <code>hostile-min-height</code> })}</li>
        <li>
          {fill(c.liExcluded, {
            exclude: <code>exclude-types</code>,
            reasons: <code>spawn-reasons</code>,
            summon: <code>/summon</code>,
            command: <code>COMMAND</code>,
            worlds: <code>disabled-worlds</code>,
          })}
        </li>
        <li>
          {fill(c.liRpgroll, {
            modelScale: <code>model.scale</code>,
            damage: <code>damage</code>,
            modeled: <code>rpgroll-modeled: true</code>,
            customData: <code>{'custom-data: {random-size: "false"}'}</code>,
            types: <code>types</code>,
            typeId: <code>{'"rpgroll:<id>"'}</code>,
          })}
        </li>
      </ul>
      <CodeBlock
        language="yaml"
        filename="config.yml"
        code={`random-size:
  enabled: false            # viene apagado: se enciende en cada servidor
  rpgroll-mobs: true        # también los mobs de RPGRoll
  rpgroll-modeled: false    # los de modelo 3D no (el modelo no sigue al tamaño)
  disabled-worlds: [lobby, creativo, arena]
  spawn-reasons: [NATURAL, CHUNK_GEN, SPAWNER, TRIAL_SPAWNER, BREEDING, SPAWNER_EGG, ...]
  exclude-types: [ender_dragon, wither, warden, elder_guardian, giant]
  ranges:
    passive: {min: 0.75, max: 1.25}
    neutral: {min: 0.8, max: 1.25}
    hostile: {min: 0.85, max: 1.3}
  extremes: {chance: 1.5, small: 0.5, large: 1.8}   # % de minis y gigantes
  types:                    # rango propio por tipo (sin extremos)
    villager: {min: 0.92, max: 1.08}
    "rpgroll:forest_goblin": {min: 0.9, max: 1.4}
  hostile-min-height: 1.05
  stats: {health: 1.0, damage: 0.5, speed: -0.25, experience: 1.0, loot: 0.5}`}
      />
      <Callout tone="info">
        {fill(c.configNote, { cmd: <Kbd>/mobadmin reload</Kbd>, config: <code>config.yml</code> })}
      </Callout>

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>{fill(c.guiBody, { browser: <Kbd>/mobadmin browser</Kbd> })}</p>
      <ul>
        <li>{c.liGuiIdentity}</li>
        <li>{c.liGuiAi}</li>
        <li>{fill(c.liGuiSkills, { fmt: <code>TIPO clave=valor</code> })}</li>
        <li>{c.liGuiPhases}</li>
        <li>{c.liGuiLoot}</li>
      </ul>
      <Callout tone="warning" title={c.noHistoryTitle}>
        {c.noHistoryBody}
      </Callout>

      <SectionHeading id="comandos">{c.cmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/mobadmin spawn <id> [jugador]"}</Td><Td>{c.xSpawn}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/mobadmin list [categoría]"}</Td><Td>{c.xList}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/mobadmin info <id>"}</Td><Td>{c.xInfo}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/mobadmin reload</Td><Td>{c.xReload}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/mobadmin killall [id]"}</Td><Td>{c.xKillall}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/mobadmin create <id> [tipo-entidad-base]"}</Td><Td>{c.xCreate}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/mobadmin browser</Td><Td>{c.xBrowser}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/mobadmin editor <id>"}</Td><Td>{c.xEditor}</Td></Tr>
        </tbody>
      </Table>
      <p>{fill(c.permNote, { perm: <Badge tone="amber">rpgrollmobs.admin.*</Badge> })}</p>

      <SectionHeading id="placeholders">{c.phTitle}</SectionHeading>
      <p>
        {fill(c.phIntro, {
          exp: <Badge tone="violet">rpgrollmobs</Badge>,
          nearest: <code>nearest_*</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thPlaceholder}</Th>
          <Th>{c.thValue}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">%rpgrollmobs_active_count%</Td><Td>{c.pActive}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgrollmobs_active_count_<categoría>%"}</Td><Td>{c.pActiveCat}</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollmobs_definitions_count%</Td><Td>{c.pDefs}</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollmobs_nearest_name%</Td><Td>{c.pNearestName}</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollmobs_nearest_health% / _health_max</Td><Td>{c.pNearestHealth}</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollmobs_nearest_distance%</Td><Td>{c.pNearestDistance}</Td></Tr>
        </tbody>
      </Table>

      <PrevNext current="mobs" onNavigate={onNavigate} />
    </>
  );
}
