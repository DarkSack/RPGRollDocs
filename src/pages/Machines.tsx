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
} from "../components/ui";
import type { ReactNode } from "react";
import { useI18n, fill } from "../i18n";
import { MACHINES_COPY } from "./copy/machines";

const FURNACE_YAML =
  "tiers:\n" +
  "  cobre:\n" +
  '    name: "&6Cobre"\n' +
  "    speed: 1.25            # 1.25 veces más rápido\n" +
  "    fuel: 1.1              # cada combustible rinde un 10 % más\n" +
  "    double-chance: 0.0\n" +
  "    cost:\n" +
  '      items: ["COPPER_INGOT:16"]\n' +
  "  hierro:\n" +
  '    name: "&fHierro"\n' +
  "    speed: 1.5\n" +
  "    fuel: 1.2\n" +
  "    double-chance: 0.05    # 5 %\n" +
  "    cost:\n" +
  "      money: 500           # Vault\n" +
  '      items: ["IRON_INGOT:16", "rpgroll-items:mi_lingote:4"]\n';

const QUARRY_YAML =
  "block: LODESTONE\n" +
  "max-per-player: 2\n" +
  "require-claim: true\n" +
  "\n" +
  "upgrades:\n" +
  "  speed:\n" +
  "    levels:\n" +
  "      - {value: 1}                                  # nivel 0: sin coste\n" +
  '      - {value: 2, cost: {items: ["REDSTONE_BLOCK:8"]}}\n' +
  '      - {value: 4, cost: {money: 2000, items: ["DIAMOND:8"]}}\n' +
  "  silk-touch:                                      # de una vez\n" +
  '    cost: {items: ["DIAMOND:8"]}\n' +
  "\n" +
  "recipe:\n" +
  "  enabled: true\n" +
  '  shape: ["IDI", "RPR", "IOI"]\n' +
  "  ingredients: {I: IRON_BLOCK, D: DIAMOND, R: REDSTONE_BLOCK, P: DIAMOND_PICKAXE, O: OBSERVER}\n";

const FURNACE_TIERS: [string, string, string, string, string][] = [
  ["cobre", "×1.25", "×1.1", "0 %", "16 COPPER_INGOT"],
  ["hierro", "×1.5", "×1.2", "5 %", "16 IRON_INGOT"],
  ["oro", "×2", "×1.35", "10 %", "16 GOLD_INGOT"],
  ["diamante", "×2.5", "×1.5", "15 %", "8 DIAMOND"],
  ["netherita", "×3", "×1.75", "25 %", "1 NETHERITE_INGOT"],
];

export function Machines({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = MACHINES_COPY[locale];
  const sneak = <Kbd>{locale === "en" ? "Shift + right-click" : locale === "pt" ? "Shift + clique direito" : "Mayús + clic derecho"}</Kbd>;

  const spawnerUpgrades: [string, string][] = [
    [c.sSpeed, c.sSpeedLv],
    [c.sCount, c.sCountLv],
    [c.sRange, c.sRangeLv],
  ];

  const quarryUpgrades: [string, ReactNode, string][] = [
    [c.qSpeed, c.qSpeedD, "1 → 2 → 4 → 8"],
    [c.qArea, c.qAreaD, "16 → 24 → 32 → 48"],
    [c.qFortune, c.qFortuneD, "0 → I → II → III"],
    [c.qTier, c.qTierD, c.qTierV],
    [c.qSilk, c.qSilkD, c.qOnce],
    [c.qSmelt, c.qSmeltD, c.qOnce],
    [c.qFilter, fill(c.qFilterD, { junk: <code>junk</code> }), c.qOnce],
  ];

  const commands: [string, string][] = [
    ["/machines give <jugador> furnace|blast_furnace|smoker <nivel> [cantidad]", c.cGiveFurnace],
    ["/machines give <jugador> spawner <mob> [cantidad]", c.cGiveSpawner],
    ["/machines give <jugador> quarry [cantidad]", c.cGiveQuarry],
    ["/machines quarries [jugador]", c.cQuarries],
    ["/machines info", c.cInfo],
    ["/machines reload", c.cReload],
  ];

  const permissions: [string, string, string][] = [
    ["rpgroll.machines.furnace.upgrade", "true", c.pFurnace],
    ["rpgroll.machines.spawner.upgrade", "true", c.pSpawner],
    ["rpgroll.machines.spawner.mine", "op", c.pMine],
    ["rpgroll.machines.quarry.use", "true", c.pQuarry],
    ["rpgroll.machines.bypass", "op", c.pBypass],
    ["rpgroll.machines.admin", "op", c.pAdmin],
  ];

  return (
    <>
      <PageHeader title={c.title} slug="machines">
        {c.intro}
      </PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        code={"depend: [RPGRoll-Lib]\nsoftdepend: [Vault, GriefPrevention, RPGRoll-Items, RPGRoll-Crates, SackResourcePack]"}
      />
      <p>
        {fill(c.reqBody, {
          lib: <strong>RPGRoll-Lib</strong>,
          vault: <strong>Vault</strong>,
          gp: <strong>GriefPrevention</strong>,
          soft: <code>softdepend</code>,
        })}
      </p>

      <SectionHeading id="hornos">{c.furnTitle}</SectionHeading>
      <p>{fill(c.furnLead, { sneak })}</p>
      <Table>
        <Thead>
          <Th>{c.thTier}</Th>
          <Th>{c.thSpeed}</Th>
          <Th>{c.thFuel}</Th>
          <Th>{c.thDouble}</Th>
          <Th>{c.thCost}</Th>
        </Thead>
        <tbody>
          {FURNACE_TIERS.map(([tier, speed, fuel, double, cost]) => (
            <Tr key={tier}>
              <Td className="font-mono text-xs">{tier}</Td>
              <Td>{speed}</Td>
              <Td>{fuel}</Td>
              <Td>{double}</Td>
              <Td className="font-mono text-xs">{cost}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>
        {fill(c.furnNotes, {
          speed: <code>speed</code>,
          fuel: <code>fuel</code>,
          double: <code>double-chance</code>,
        })}
      </p>
      <CodeBlock language="yaml" filename="furnaces.yml" code={FURNACE_YAML} />
      <p>{fill(c.furnKinds, { kinds: <code>kinds</code> })}</p>

      <SectionHeading id="spawners">{c.spawnTitle}</SectionHeading>
      <p>{fill(c.spawnLead, { sneak })}</p>
      <Table>
        <Thead>
          <Th>{c.thUpgrade}</Th>
          <Th>{c.thLevels}</Th>
        </Thead>
        <tbody>
          {spawnerUpgrades.map(([upgrade, levels]) => (
            <Tr key={upgrade}>
              <Td>{upgrade}</Td>
              <Td>{levels}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>{fill(c.spawnStack, { max: <code>stack.max</code> })}</p>
      <p>{fill(c.spawnMine, { perm: <code>rpgroll.machines.spawner.mine</code> })}</p>

      <SectionHeading id="canteras">{c.quarryTitle}</SectionHeading>
      <p>{fill(c.quarryLead, { give: <Kbd>/machines give</Kbd> })}</p>
      <p>{c.quarryRules}</p>
      <Callout tone="info">
        {fill(c.quarryClaims, { claim: <code>require-claim: true</code>, max: <code>max-per-player</code> })}
      </Callout>
      <Table>
        <Thead>
          <Th>{c.thUpgrade}</Th>
          <Th>{c.thQDoes}</Th>
          <Th>{c.thQDefault}</Th>
        </Thead>
        <tbody>
          {quarryUpgrades.map(([upgrade, does, def]) => (
            <Tr key={upgrade}>
              <Td>{upgrade}</Td>
              <Td>{does}</Td>
              <Td className="font-mono text-xs">{def}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <CodeBlock language="yaml" filename="quarries.yml" code={QUARRY_YAML} />
      <p>
        {fill(c.quarryPerf, {
          bpt: <code>performance.blocks-per-tick</code>,
          spt: <code>performance.scans-per-tick</code>,
          skip: <code>skip</code>,
        })}
      </p>

      <SectionHeading id="costes">{c.costTitle}</SectionHeading>
      <p>
        {fill(c.costBody, {
          cost: <code>cost</code>,
          money: <code>money</code>,
          items: <code>items</code>,
          vanilla: <code>MATERIAL:cantidad</code>,
          custom: <code>rpgroll-items:&lt;id&gt;:cantidad</code>,
        })}
      </p>

      <SectionHeading id="modelos">{c.modelTitle}</SectionHeading>
      <p>
        {fill(c.modelBody, {
          block: <code>LODESTONE</code>,
          itemModel: <code>item-model</code>,
          frame: <code>frame</code>,
        })}
      </p>

      <SectionHeading id="comandos">{c.commandsTitle}</SectionHeading>
      <p>
        {c.thAliases}: <code>/maquinas</code>, <code>/rpgmachines</code>
      </p>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thDesc}</Th>
        </Thead>
        <tbody>
          {commands.map(([cmd, does]) => (
            <Tr key={cmd}>
              <Td className="font-mono text-xs">{cmd}</Td>
              <Td>{does}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="permisos">{c.permissionsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thPerm}</Th>
          <Th>{c.thDefault}</Th>
          <Th>{c.thDesc}</Th>
        </Thead>
        <tbody>
          {permissions.map(([node, def, text]) => (
            <Tr key={node}>
              <Td>
                <Badge>{node}</Badge>
              </Td>
              <Td className="font-mono text-xs">{def}</Td>
              <Td>{text}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="archivos">{c.filesTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thFile}</Th>
          <Th>{c.thContains}</Th>
        </Thead>
        <tbody>
          {(
            [
              ["config.yml", c.fConfig],
              ["furnaces.yml", c.fFurnaces],
              ["spawners.yml", c.fSpawners],
              ["quarries.yml", c.fQuarries],
              ["lang/<idioma>.yml", c.fLang],
              ["data/quarries.yml", c.fData],
            ] as [string, string][]
          ).map(([file, contains]) => (
            <Tr key={file}>
              <Td className="font-mono text-xs">plugins/RPGRoll-Machines/{file}</Td>
              <Td>{contains}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <PrevNext current="machines" onNavigate={onNavigate} />
    </>
  );
}
