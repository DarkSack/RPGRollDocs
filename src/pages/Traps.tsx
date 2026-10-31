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
import { ADDONS_F_COPY, type AddonsFCopy } from "./copy/addonsF";

type TrapsCopy = AddonsFCopy["traps"];

const trapFields = (c: TrapsCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: "nueva_trampa", placeholder: "spike_corridor" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&cPasillo de Pinchos" },
  { key: "description", label: c.fDescription, type: "string" },
  { key: "icon", label: c.fIcon, type: "string", default: "TRIPWIRE_HOOK" },
  {
    key: "trigger",
    label: c.fTrigger,
    type: "group",
    fields: [
      {
        key: "type",
        label: c.fType,
        type: "select",
        default: "PRESSURE",
        options: [
          "PRESSURE", "MOVEMENT", "PROXIMITY", "LINE_OF_SIGHT", "INTERACTION", "BLOCK_BREAK",
          "BLOCK_PLACE", "PROJECTILE", "ENTITY", "REDSTONE", "TIMER", "COMMAND", "CUSTOM_EVENT",
        ],
      },
    ],
  },
  { key: "radius", label: c.fRadius, type: "number", default: "1.5" },
  { key: "cooldown-millis", label: c.fCooldown, type: "number", default: "0" },
  { key: "charges", label: c.fCharges, type: "number", default: "-1" },
];

export function Traps({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = ADDONS_F_COPY[locale].traps;

  return (
    <>
      <PageHeader title={c.title}>{c.intro}</PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, RPGRoll-Items, RPGRoll-Effects, RPGRoll-Mobs, RPGRoll-FX, RPGRoll-Guilds, PlaceholderAPI, SackResourcePack]"} />
      <p>
        {fill(c.reqBody, {
          reqItem: <code>required-item-id</code>,
          iis: <code>ItemInstanceService</code>,
          material: <code>Material</code>,
          effect: <Kbd>EFFECT</Kbd>,
          srp: <Kbd>/srp rebuild</Kbd>,
        })}
      </p>

      <SectionHeading id="modelo">{c.modelTitle}</SectionHeading>
      <p>
        {fill(c.modelBody, {
          def: <code>TrapDefinition</code>,
          dir: <code>traps/*.yml</code>,
          type: <strong>{c.typeWord}</strong>,
          placed: <code>PlacedTrap</code>,
          instance: <strong>{c.instanceWord}</strong>,
          locations: <code>locations.yml</code>,
        })}
      </p>
      <Callout tone="info" title={c.noPlayerTitle}>
        {fill(c.noPlayerBody, { trapadmin: <Kbd>/trapadmin</Kbd>, trap: <code>/trap</code> })}
      </Callout>

      <SectionHeading id="triggers">{c.triggersTitle}</SectionHeading>
      <p>
        {fill(c.triggersBody, {
          proximity: <Badge tone="amber">PROXIMITY</Badge>,
          los: <Badge tone="amber">LINE_OF_SIGHT</Badge>,
          timer: <Badge tone="amber">TIMER</Badge>,
          tick: <code>config.yml: engine.tick-interval-ticks</code>,
          command: <Badge tone="violet">COMMAND</Badge>,
          customEvent: <Badge tone="violet">CUSTOM_EVENT</Badge>,
          force: <Kbd>/trapadmin forcetrigger</Kbd>,
          triggerTrap: <code>TRIGGER_TRAP</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thTrigger}</Th>
          <Th>{c.thDetects}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">PRESSURE</Td><Td>{c.tPressure}</Td></Tr>
          <Tr><Td className="font-mono text-xs">MOVEMENT</Td><Td>{c.tMovement}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PROXIMITY</Td><Td>{c.tProximity}</Td></Tr>
          <Tr><Td className="font-mono text-xs">LINE_OF_SIGHT</Td><Td>{c.tLos}</Td></Tr>
          <Tr><Td className="font-mono text-xs">INTERACTION</Td><Td>{c.tInteraction}</Td></Tr>
          <Tr><Td className="font-mono text-xs">BLOCK_BREAK / BLOCK_PLACE</Td><Td>{c.tBlock}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PROJECTILE</Td><Td>{fill(c.tProjectile, { ev: <code>ProjectileHitEvent</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">ENTITY</Td><Td>{fill(c.tEntity, { le: <code>LivingEntity</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">REDSTONE</Td><Td>{c.tRedstone}</Td></Tr>
          <Tr><Td className="font-mono text-xs">TIMER</Td><Td>{c.tTimer}</Td></Tr>
          <Tr><Td className="font-mono text-xs">COMMAND / CUSTOM_EVENT</Td><Td>{c.tCommand}</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="acciones">{c.actionsTitle}</SectionHeading>
      <p>
        {fill(c.actionsBody, {
          actions: <code>actions</code>,
          fmt: <code>{"{ type: TIPO, params: { ... } }"}</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thAction}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">MESSAGE</Td><Td>{fill(c.aMessage, { ph: <><code>{"{player}"}</code>/<code>{"{trap}"}</code></>, amp: <code>&amp;</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">SOUND / PARTICLE</Td><Td>{c.aSound}</Td></Tr>
          <Tr><Td className="font-mono text-xs">DAMAGE</Td><Td>{fill(c.aDamage, { orMob: <strong>{c.orMob}</strong> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">HEAL</Td><Td>{fill(c.aHeal, { amount: <code>amount</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">EXPLOSION</Td><Td>{fill(c.aExplosion, { params: <><code>power</code>/<code>fire</code>/<code>break-blocks</code></> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">FIRE</Td><Td>{c.aFire}</Td></Tr>
          <Tr><Td className="font-mono text-xs">TELEPORT</Td><Td>{fill(c.aTeleport, { world: <code>world</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">EFFECT</Td><Td>{fill(c.aEffect, { orMob: <strong>{c.orMob}</strong> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">PROJECTILE</Td><Td>{fill(c.aProjectile, { params: <><code>amount</code>/<code>spread</code>/<code>interval-ticks</code>/<code>speed</code></> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">CUSTOM_PROJECTILE</Td><Td>{fill(c.aCustomProjectile, {
            ptype: <code>projectile-type</code>,
            types: (
              <>
                <code>ARROW</code> (default), <code>SPECTRAL_ARROW</code>, <code>SNOWBALL</code>, <code>EGG</code>,{" "}
                <code>ENDER_PEARL</code>, <code>FIREBALL</code>, <code>SMALL_FIREBALL</code>, <code>WITHER_SKULL</code>,{" "}
                <code>DRAGON_FIREBALL</code>, <code>TRIDENT</code>, <code>SHULKER_BULLET</code>, <code>POTION</code>
              </>
            ),
            effects: <code>effects</code>,
            fmt: <code>{"TIPO:duraci\u00f3n-ticks:amplificador;TIPO2:..."}</code>,
            ex: <code>SLOWNESS:200:1;WEAKNESS:200:0</code>,
          })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">SONIC_BOOM</Td><Td>{fill(c.aSonicBoom, { damage: <code>damage</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">COMMAND / COMMAND_AS_PLAYER</Td><Td>{c.aCommand}</Td></Tr>
          <Tr><Td className="font-mono text-xs">TRIGGER_TRAP</Td><Td>{fill(c.aTriggerTrap, { placementId: <code>placement-id</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">REDSTONE_PULSE</Td><Td>{fill(c.aRedstonePulse, { rb: <code>REDSTONE_BLOCK</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">TOGGLE_BLOCKS</Td><Td>{fill(c.aToggleBlocks, { instant: <code>INSTANT</code>, slide: <code>SLIDE</code> })}</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="tip" title={c.sameActionsTitle}>
        {fill(c.sameActionsBody, {
          registry: <code>TrapActionRegistry</code>,
          cp: (
            <>
              <code>CUSTOM_PROJECTILE</code>/<code>SONIC_BOOM</code>
            </>
          ),
          actions: <code>actions</code>,
          impact: <code>impact</code>,
        })}
      </Callout>
      <Callout tone="warning" title={c.noCamoTitle}>
        {fill(c.noCamoBody, {
          swap: <strong>{c.blockSwap}</strong>,
          toggle: (
            <>
              <code>TOGGLE_BLOCKS</code>/<code>disguise</code>
            </>
          ),
        })}
      </Callout>

      <SectionHeading id="condiciones">{c.condTitle}</SectionHeading>
      <p>
        {fill(c.condBody, {
          evaluator: <code>MobConditionEvaluator</code>,
          syntax: <code>ruta operador valor</code>,
          ops: (
            <>
              <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>,{" "}
              <code>&gt;=</code>
            </>
          ),
          playerStar: <code>player.*</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        code={"conditions:\n  - \"player.level >= 30\"\n  - \"player.sneaking == true\"\n  - \"player.health < 50%\""}
      />
      <Table>
        <Thead>
          <Th>{c.thPath}</Th>
          <Th>{c.thValue}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">player.level</Td><Td>{c.cLevel}</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.health</Td><Td>{fill(c.cHealth, { pct: <code>%</code>, ex: <code>&lt; 50%</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.sneaking</Td><Td>{fill(c.cSneaking, { tf: <><code>true</code>/<code>false</code></> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">player.foodlevel</Td><Td>{c.cFood}</Td></Tr>
          <Tr><Td className="font-mono text-xs">world</Td><Td>{c.cWorld}</Td></Tr>
          <Tr><Td className="font-mono text-xs">weather</Td><Td>{fill(c.cWeather, { vals: <><code>CLEAR</code>/<code>RAIN</code>/<code>STORM</code></> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">night</Td><Td>{fill(c.cNight, { tf: <><code>true</code>/<code>false</code></> })}</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="tip">
        {fill(c.condTip, {
          registry: <code>TrapConditionRegistry</code>,
          guildRank: <code>guild.rank</code>,
        })}
      </Callout>

      <SectionHeading id="bloques-protegidos">{c.blocksTitle}</SectionHeading>
      <p>
        {fill(c.blocksBody, {
          block: <code>block</code>,
          protectedWord: <strong>{c.protectedWord}</strong>,
          breakable: <code>breakable: false</code>,
          reqItem: <code>required-item-id</code>,
          immune: (
            <>
              <code>explosion-immune</code>/<code>piston-immune</code>
            </>
          ),
          events: (
            <>
              <code>EntityExplodeEvent</code>/<code>BlockExplodeEvent</code>
            </>
          ),
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename={c.fragFile}
        code={
          "block:\n" +
          "  material: IRON_DOOR\n" +
          "  breakable: false\n" +
          '  required-item-id: "vault_key"\n' +
          "  explosion-immune: true\n" +
          "  piston-immune: true"
        }
      />

      <SectionHeading id="cadenas">{c.chainsTitle}</SectionHeading>
      <p>
        {fill(c.chainsBody, {
          chain: <code>chain</code>,
          force: <code>TrapEngine#forceTrigger</code>,
          own: <strong>{c.ownWord}</strong>,
          triggerTrap: <code>TRIGGER_TRAP</code>,
          actions: <code>actions</code>,
        })}
      </p>

      <SectionHeading id="estados">{c.statesTitle}</SectionHeading>
      <p>{fill(c.statesBody, { placed: <code>PlacedTrap</code> })}</p>
      <CodeBlock language="text" code={"IDLE/ARMED → TRIGGERED → (COOLDOWN → ARMED) | DEPLETED"} />
      <p>
        {fill(c.statesAfter, {
          cooldown: <code>cooldown-millis {">"} 0</code>,
          armed: <code>ARMED</code>,
          charges: <code>charges</code>,
          depleted: <code>DEPLETED</code>,
          infinite: <code>charges: -1</code>,
        })}
      </p>

      <SectionHeading id="torretas">{c.turretsTitle}</SectionHeading>
      <p>
        {fill(c.turretsBody, {
          def: <code>TrapDefinition</code>,
          continuously: <strong>{c.continuouslyWord}</strong>,
          tick: <code>config.yml: engine.turret-tick-interval-ticks</code>,
          display: <code>ItemDisplay</code>,
          impact: <code>impact</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thField}</Th>
          <Th>{c.thControls}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">radius</Td><Td>{c.uRadius}</Td></Tr>
          <Tr><Td className="font-mono text-xs">target-players / target-hostile-mobs</Td><Td>{fill(c.uTarget, { monster: <code>Monster</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">conditions</Td><Td>{fill(c.uConditions, { playerStar: <code>player.*</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">fire-interval-ticks</Td><Td>{fill(c.uFireInterval, { impact: <code>impact</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">impact</Td><Td>{fill(c.uImpact, {
            fmt: <code>{"{ type: TIPO, params: {...} }"}</code>,
            actions: <code>actions</code>,
            default: <code>CUSTOM_PROJECTILE</code>,
            ptype: <code>projectile-type: ARROW</code>,
          })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">model.material / model.custom-model-data</Td><Td>{fill(c.uModel, { display: <code>ItemDisplay</code> })}</Td></Tr>
        </tbody>
      </Table>
      <CodeBlock
        language="yaml"
        filename="turrets/sentry_turret.yml"
        code={
          "id: sentry_turret\n" +
          'display-name: "&cTorreta de Vigilancia"\n\n' +
          "radius: 12.0\n" +
          "target-players: true\n" +
          "target-hostile-mobs: true\n" +
          "fire-interval-ticks: 20\n" +
          "conditions: []\n\n" +
          "impact:\n" +
          "  type: CUSTOM_PROJECTILE\n" +
          "  params:\n" +
          "    projectile-type: ARROW\n" +
          '    speed: "2.5"\n\n' +
          "model:\n" +
          "  material: CROSSBOW"
        }
      />
      <p>{fill(c.impactBody, { impact: <code>impact</code> })}</p>
      <Table>
        <Thead>
          <Th>{c.thFile}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">turrets/sentry_turret.yml</Td><Td>{fill(c.tSentry, { cp: <code>CUSTOM_PROJECTILE</code>, ptype: <code>projectile-type: ARROW</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">turrets/warden_turret.yml</Td><Td>{fill(c.tWarden, { sb: <code>SONIC_BOOM</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">turrets/healing_turret.yml</Td><Td>{fill(c.tHealing, { heal: <code>HEAL</code>, flag: <code>target-hostile-mobs: false</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">turrets/alchemist_turret.yml</Td><Td>{fill(c.tAlchemist, { cp: <code>CUSTOM_PROJECTILE</code>, ptype: <code>projectile-type: POTION</code> })}</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="info" title={c.aimTitle}>
        {fill(c.aimBody, {
          yml: <code>turret-locations.yml</code>,
          display: <code>ItemDisplay</code>,
        })}
      </Callout>
      <p>
        {fill(c.turretCmds, {
          cmds: (
            <>
              <Kbd>/trapadmin turret place</Kbd>/<Kbd>remove</Kbd>/<Kbd>edit</Kbd>/<Kbd>browser</Kbd>/
              <Kbd>list</Kbd>
            </>
          ),
        })}
      </p>

      <SectionHeading id="ejemplos">{c.examplesTitle}</SectionHeading>
      <p>
        {fill(c.examplesBody, {
          dir: <code>traps/</code>,
          landmine: <code>landmine</code>,
          spike: <code>spike_corridor</code>,
          vault: <code>reinforced_vault_door</code>,
          arrow: <code>arrow_corridor</code>,
          gas: <code>poison_gas_room</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="traps/landmine.yml"
        code={
          "id: landmine\n" +
          'display-name: "&cMina Terrestre"\n' +
          'description: "Explota al pisarla."\n' +
          "icon: TNT\n\n" +
          "trigger:\n" +
          "  type: PRESSURE\n\n" +
          "radius: 0.5\n" +
          "conditions: []\n\n" +
          "actions:\n" +
          "  - type: SOUND\n" +
          "    params: { sound: ENTITY_TNT_PRIMED, volume: \"1.0\", pitch: \"0.8\" }\n" +
          "  - type: EXPLOSION\n" +
          "    params: { power: \"2.5\", fire: \"false\", break-blocks: \"false\" }\n" +
          "  - type: EFFECT\n" +
          '    params: { effect-id: "burning" }\n\n' +
          "cooldown-millis: 10000\n" +
          "charges: 1\n" +
          "chain: []"
        }
      />

      <SectionHeading id="comandos">{c.cmdTitle}</SectionHeading>
      <p>{fill(c.cmdIntro, { perm: <code>rpgrolltraps.admin.*</code> })}</p>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/trapadmin create <id>"}</Td><Td>{c.xCreate}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin edit <id>"}</Td><Td>{c.xEdit}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/trapadmin browser</Td><Td>{c.xBrowser}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/trapadmin reload</Td><Td>{c.xReload}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin place <id> [zone]"}</Td><Td>{fill(c.xPlace, { zone: <code>zone</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin remove <placementId>"}</Td><Td>{c.xRemove}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/trapadmin list</Td><Td>{c.xList}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin info <placementId>"}</Td><Td>{c.xInfo}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin forcetrigger <placementId>"}</Td><Td>{c.xForce}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin turret create <id>"}</Td><Td>{c.xTCreate}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin turret edit <id>"}</Td><Td>{c.xTEdit}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/trapadmin turret browser</Td><Td>{c.xTBrowser}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin turret place <id>"}</Td><Td>{c.xTPlace}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/trapadmin turret remove <placementId>"}</Td><Td>{c.xTRemove}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/trapadmin turret list</Td><Td>{c.xTList}</Td></Tr>
        </tbody>
      </Table>

      <YamlBuilder
        title={c.bTitle}
        description={c.bDesc}
        folder="traps"
        fields={trapFields(c)}
      />

      <PrevNext current="traps" onNavigate={onNavigate} />
    </>
  );
}
