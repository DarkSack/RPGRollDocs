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
import { DISASTERS_COPY } from "./copy/disasters";

const HAILSTORM_YAML =
  "id: hailstorm\n" +
  'display-name: "&b&lGranizada"\n' +
  "icon: PACKED_ICE\n" +
  'description: "Cae granizo: a cubierto no te hará daño."\n' +
  "duration: 900\n" +
  "chance: 0.02\n" +
  "seasons: [spring, summer]\n" +
  'start-sound: "ENTITY_LIGHTNING_BOLT_THUNDER 0.8 1.4"\n' +
  "\n" +
  "phenomena:\n" +
  "  - type: METEOR_STORM\n" +
  "    storm: true\n" +
  "    interval: 6\n" +
  "    blocks: [ICE, PACKED_ICE]\n" +
  '    trail-particles: ["SNOWFLAKE*2"]\n' +
  '    impact-particles: ["ITEM_SNOWBALL*12"]\n' +
  '    impact-sound: "BLOCK_GLASS_BREAK 0.6 1.6"\n' +
  "    damage: 1.5\n" +
  "    crater-radius: 0                 # sin cráter\n";

const APOCALYPSE_YAML =
  "id: mi_apocalipsis\n" +
  'display-name: "&4&lFin del Mundo"\n' +
  "duration: 1800\n" +
  "intensity: 1.3\n" +
  "chance: 0                           # solo por comando\n" +
  "combine: [tornado, meteor_storm, earthquake, sinkhole]\n" +
  "\n" +
  "regenerate-seconds: 900             # lo que rompe vuelve a los 15 minutos\n" +
  "\n" +
  "messages:\n" +
  '  title: "&4&l¡FIN DEL MUNDO!"\n' +
  '  subtitle: "&cNivel {level} · todo a la vez"\n' +
  "\n" +
  "phenomena:\n" +
  "  - type: ACID_RAIN\n" +
  "    thunder: true\n" +
  '    corrode: ["GRASS_BLOCK>DIRT"]\n' +
  "    corrode-chance: 0.2\n" +
  "    regenerate: false               # esto sí se queda para siempre\n";

const LEVELS: [string, string, string, string, string][] = [
  ["1", "30", "0.6", "0.75", "0.7"],
  ["2", "25", "0.8", "0.9", "0.85"],
  ["3", "20", "1.0", "1.0", "1.0"],
  ["4", "14", "1.3", "1.15", "1.1"],
  ["5", "9", "1.7", "1.3", "1.25"],
  ["6", "2", "2.2", "1.5", "1.4"],
];

export function Disasters({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = DISASTERS_COPY[locale];

  const phenomena: [string, ReactNode][] = [
    ["TORNADO", c.dTornado],
    ["METEOR_STORM", c.dMeteor],
    ["ACID_RAIN", c.dAcid],
    ["EARTHQUAKE", c.dQuake],
    ["SINKHOLE", c.dSinkhole],
    ["MOBS", fill(c.dMobs, { rpgroll: <code>rpgroll:&lt;id&gt;</code> })],
  ];

  const commands: [string, string][] = [
    ["/disastersadmin start <id> [mundo] [nivel]", c.cStart],
    ["/disastersadmin stop [mundo]", c.cStop],
    ["/disastersadmin list", c.cList],
    ["/disastersadmin regenerate", c.cRegenerate],
    ["/disastersadmin reload", c.cReload],
  ];

  const config: [string, string, string][] = [
    ["language", "es", c.kLanguage],
    ["disabled-worlds", "[]", c.kDisabled],
    ["safe-radius", "96", c.kSafe],
    ["gamemodes", "[SURVIVAL, ADVENTURE]", c.kGamemodes],
    ["max-start-delay", "18000", c.kDelay],
    ["warning-seconds / warning-sound", "10", c.kWarning],
    ["bossbar", "RED PROGRESS", c.kBossbar],
    ["levels", "1-6", c.kLevels],
    ["world-damage.enabled", "true", c.kEnabled],
    ["world-damage.restore-per-tick", "40", c.kRestore],
    ["world-damage.protect-containers", "true", c.kContainers],
    ["world-damage.max-changes", "60000", c.kMax],
    ["world-damage.immune", "BEDROCK, SPAWNER…", c.kImmune],
    ["world-damage.resistance", "OBSIDIAN: 0.95…", c.kResistance],
  ];

  return (
    <>
      <PageHeader title={c.title} slug="disasters">
        {c.intro}
      </PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        code={"depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll-Seasons, RPGRoll-Mobs, GriefPrevention, WorldGuard]"}
      />
      <p>
        {fill(c.reqBody, {
          lib: <strong>RPGRoll-Lib</strong>,
          seasons: <strong>RPGRoll-Seasons</strong>,
          mobs: <strong>RPGRoll-Mobs</strong>,
          gp: <strong>GriefPrevention</strong>,
          wg: <strong>WorldGuard</strong>,
        })}
      </p>

      <SectionHeading id="como-funcionan">{c.howTitle}</SectionHeading>
      <p>
        {fill(c.howBody, {
          chance: <code>chance</code>,
          delay: <code>max-start-delay</code>,
          warning: <code>warning-seconds</code>,
        })}
      </p>

      <SectionHeading id="niveles">{c.levelsTitle}</SectionHeading>
      <p>
        {fill(c.levelsBody, {
          weight: <code>weight</code>,
          config: <code>config.yml</code>,
          level: <code>{"{level}"}</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thLevel}</Th>
          <Th>{c.thWeight}</Th>
          <Th>{c.thIntensity}</Th>
          <Th>{c.thSize}</Th>
          <Th>{c.thDuration}</Th>
        </Thead>
        <tbody>
          {LEVELS.map(([level, weight, intensity, size, duration]) => (
            <Tr key={level}>
              <Td className="font-mono text-xs">{level}</Td>
              <Td className="font-mono text-xs">{weight}</Td>
              <Td className="font-mono text-xs">×{intensity}</Td>
              <Td className="font-mono text-xs">×{size}</Td>
              <Td className="font-mono text-xs">×{duration}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="fenomenos">{c.phTitle}</SectionHeading>
      <p>{c.phBody}</p>
      <Table>
        <Thead>
          <Th>{c.thPhenomenon}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          {phenomena.map(([type, what]) => (
            <Tr key={type}>
              <Td className="font-mono text-xs">{type}</Td>
              <Td>{what}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>{fill(c.examplesBody, { reference: <code>disasters/_reference.yml</code> })}</p>

      <SectionHeading id="destruccion">{c.damageTitle}</SectionHeading>
      <p>{fill(c.damageBody, { safe: <code>safe-radius</code> })}</p>

      <SectionHeading id="regeneracion">{c.regenTitle}</SectionHeading>
      <p>{fill(c.regenBody, { file: <code>regen.dat</code> })}</p>
      <Table>
        <Thead>
          <Th>{c.thKey}</Th>
          <Th>{c.thDefault}</Th>
          <Th>{c.thDesc}</Th>
        </Thead>
        <tbody>
          {(
            [
              ["regenerate", "true", c.rRegenerate],
              ["regenerate-seconds", "300", c.rSeconds],
              ["regenerate-spread-seconds", "60", c.rSpread],
            ] as [string, string, string][]
          ).map(([key, def, text]) => (
            <Tr key={key}>
              <Td className="font-mono text-xs">{key}</Td>
              <Td className="font-mono text-xs">{def}</Td>
              <Td>{text}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <Callout tone="info">
        {fill(c.regenWhere, {
          config: <code>world-damage</code>,
          combine: <code>combine</code>,
          cmd: <Kbd>/disastersadmin regenerate</Kbd>,
        })}
      </Callout>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <CodeBlock language="yaml" filename="disasters/hailstorm.yml" code={HAILSTORM_YAML} />

      <SectionHeading id="combinar">{c.combineTitle}</SectionHeading>
      <p>{fill(c.combineBody, { combine: <code>combine</code> })}</p>
      <CodeBlock language="yaml" filename="disasters/mi_apocalipsis.yml" code={APOCALYPSE_YAML} />

      <SectionHeading id="desde-seasons">{c.migrateTitle}</SectionHeading>
      <p>
        {fill(c.migrateBody, {
          disabled: <code>disabled-worlds</code>,
          folder: <code>plugins/RPGRoll-Seasons/disasters/</code>,
          old: <code>/seasonsadmin disaster</code>,
          cmd: <code>/disastersadmin</code>,
        })}
      </p>

      <SectionHeading id="comandos">{c.commandsTitle}</SectionHeading>
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
          <Tr>
            <Td>
              <Badge>rpgrolldisasters.admin</Badge>
            </Td>
            <Td className="font-mono text-xs">op</Td>
            <Td>{c.pAdmin}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="configuracion">{c.configTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thKey}</Th>
          <Th>{c.thDefault}</Th>
          <Th>{c.thDesc}</Th>
        </Thead>
        <tbody>
          {config.map(([key, def, text]) => (
            <Tr key={key}>
              <Td className="font-mono text-xs">{key}</Td>
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
              ["lang/<idioma>.yml", c.fLang],
              ["disasters/*.yml", c.fDisasters],
              ["regen.dat", c.fRegen],
              ["state.yml", c.fState],
            ] as [string, string][]
          ).map(([file, contains]) => (
            <Tr key={file}>
              <Td className="font-mono text-xs">plugins/RPGRoll-Disasters/{file}</Td>
              <Td>{contains}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <PrevNext current="disasters" onNavigate={onNavigate} />
    </>
  );
}
