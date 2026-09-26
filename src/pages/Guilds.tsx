import type { ReactNode } from "react";
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
import { useI18n, fill, localizedPlaceholder, localizedCaveatTitle, localizedCaveatBody } from "../i18n";
import { ADDONS_B_COPY, type AddonsBCopy } from "./copy/addonsB";

type GuildsCopy = AddonsBCopy["guilds"];

const CAVEAT_TITLE = "WIN_WAR no tiene motor de guerra";
const CAVEAT_BODY =
  "El tipo WIN_WAR existe en el enum pero no hay ningún sistema de guerra entre guilds implementado que dispare su progreso — quedaría sin completarse nunca si la activas.";

const guildQuestFields = (c: GuildsCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: "nueva_mision_guild", placeholder: "first_boss" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "Primera Sangre" },
  { key: "description", label: c.fDescription, type: "string" },
  {
    key: "type",
    label: c.fType,
    type: "select",
    options: ["DEFEAT_BOSS", "COMPLETE_DUNGEON", "GATHER_RESOURCE", "WIN_WAR", "BUILD_BASE"],
  },
  { key: "target-reference", label: c.fTargetRef, type: "string", placeholder: c.fTargetRefPlaceholder },
  { key: "target-amount", label: c.fTargetAmount, type: "number", default: "1" },
  { key: "reward-money", label: c.fRewardMoney, type: "number", default: "0" },
  { key: "reward-xp", label: c.fRewardXp, type: "number", default: "0" },
  { key: "min-guild-level", label: c.fMinLevel, type: "number", default: "1" },
];

export function Guilds({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = ADDONS_B_COPY[locale].guilds;

  const guildPlaceholders = placeholders.filter((p) => p.expansion === "rpgrollguilds");

  const roles: [string, boolean, boolean, boolean, boolean][] = [
    ["LEADER", true, true, true, true],
    ["OFFICER", true, true, true, false],
    ["MEMBER", false, false, false, false],
    ["RECRUIT", false, false, false, false],
  ];

  const teamCommands: [string, ReactNode][] = [
    ["/team invite <jugador>", c.tInvite],
    ["/team accept | decline", c.tAccept],
    ["/team leave | kick <jugador>", c.tLeave],
    ["/team info | gui | config | buff", c.tInfo],
    ["/team ping | waypoint | chat | queue", c.tPing],
  ];

  const guildCommands: [string, ReactNode][] = [
    ["/guild create <nombre>", fill(c.gCreate, { key: <code>guild-creation</code> })],
    ["/guild disband", c.gDisband],
    ["/guild accept <id-de-guild> | decline | leave", c.gAccept],
    ["/guild info | vault | territory | upgrade | diplomacy | quest | achievements | calendar | members | ranking | chat | customize", c.gInfo],
    ["/guild browser", fill(c.gBrowser, { cmd: <code>/guildadmin browser guilds</code> })],
  ];

  const adminCommands: [string, ReactNode][] = [
    ["/guildadmin browser [guilds|quests]", fill(c.aBrowser, { def: <code>GuildQuestDefinition</code> })],
    ["/guildadmin delete <id>", c.aDelete],
    ["/guildadmin reload", c.aReload],
  ];

  return (
    <>
      <PageHeader title={c.title} slug="guilds">
        {c.intro1} <strong>{c.introTeams}</strong> {c.introTeamsDesc} <strong>{c.introGuilds}</strong>{" "}
        {c.introGuildsDesc}
      </PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        code={"depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, RPGRoll-Items, RPGRoll-Quests, Vault, PlaceholderAPI]"}
      />
      <p>
        {fill(c.reqBody, {
          winWar: <code>WIN_WAR</code>,
          completeDungeon: <code>COMPLETE_DUNGEON</code>,
        })}
      </p>

      <SectionHeading id="teams-vs-guilds">{c.compareTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th> </Th>
          <Th>{c.thTeam}</Th>
          <Th>{c.thGuild}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">{c.rDuration}</Td>
            <Td>{c.rDurationTeam}</Td>
            <Td>{fill(c.rDurationGuild, { cmd: <code>/guild disband</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">{c.rPersistence}</Td>
            <Td>{c.rPersistenceTeam}</Td>
            <Td>{fill(c.rPersistenceGuild, { store: <code>GuildStore</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">{c.rRoles}</Td>
            <Td>{fill(c.rRolesTeam, { role: <code>TeamRole</code> })}</Td>
            <Td>{fill(c.rRolesGuild, { role: <code>GuildRole</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">{c.rSystems}</Td>
            <Td>{c.rSystemsTeam}</Td>
            <Td>{c.rSystemsGuild}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="contenido">{c.noTemplateTitle}</SectionHeading>
      <Callout tone="info" title={c.runtimeTitle}>
        {fill(c.runtimeBody, {
          guild: <code>Guild</code>,
          content: <code>RPGContent</code>,
          cm: <code>ContentManager</code>,
          ctor: <code>new Guild(id, nombre, fundadorId)</code>,
          cmd: <code>/guild create</code>,
          store: <code>GuildStore</code>,
          browser: <code>/guildadmin browser guilds</code>,
        })}
      </Callout>
      <p>{fill(c.onlyYaml, { def: <code>GuildQuestDefinition</code> })}</p>
      <CodeBlock
        language="yaml"
        code={
          "guild-creation:\n" +
          "  money-cost: 5000\n" +
          "  min-level: 5\n" +
          '  required-permission: ""\n' +
          '  required-quest: ""\n' +
          '  required-item: ""\n' +
          "  required-item-amount: 0\n"
        }
      />
      <p>{fill(c.creationNote, { file: <code>config.yml</code> })}</p>

      <SectionHeading id="guild-quests">{c.questsTitle}</SectionHeading>
      <p>
        {fill(c.questsBody, {
          type: <code>type</code>,
          gather: <code>GATHER_RESOURCE</code>,
          defeat: (
            <>
              <code>DEFEAT_BOSS</code>/<code>COMPLETE_DUNGEON</code>
            </>
          ),
        })}
      </p>
      <Callout tone="warning" title={localizedCaveatTitle("guilds", CAVEAT_TITLE, locale)}>
        {localizedCaveatBody("guilds", CAVEAT_TITLE, CAVEAT_BODY, locale)}
      </Callout>
      <CodeBlock
        language="yaml"
        filename="quests/gather_wood.yml"
        code={
          "id: gather_wood\n" +
          'display-name: "Recolectando Madera"\n' +
          'description: "Recolectá 200 bloques de madera de roble."\n' +
          "type: GATHER_RESOURCE\n" +
          "target-reference: OAK_LOG\n" +
          "target-amount: 200\n" +
          "reward-money: 300\n" +
          "reward-xp: 100\n" +
          "min-guild-level: 1\n"
        }
      />
      <YamlBuilder title={c.builderTitle} folder="quests" fields={guildQuestFields(c)} />
      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, { file: <code>quests/reference_full.yml</code> })}
      </Callout>

      <SectionHeading id="roles">{c.rolesTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thRole}</Th>
          <Th>{c.thInvite}</Th>
          <Th>{c.thKick}</Th>
          <Th>{c.thBank}</Th>
          <Th>{c.thSettings}</Th>
        </Thead>
        <tbody>
          {roles.map(([role, invite, kick, bank, settings]) => (
            <Tr key={role}>
              <Td className="font-mono text-xs">{role}</Td>
              <Td>{invite ? c.yes : c.no}</Td>
              <Td>{kick ? c.yes : c.no}</Td>
              <Td>{bank ? c.yes : c.no}</Td>
              <Td>{settings ? c.yes : c.no}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>{c.rolesNote}</p>

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>
        {fill(c.guiBody, {
          info: <Kbd>/guild info</Kbd>,
          hub: <code>GuildHubGUI</code>,
          vault: <code>GuildVaultGUI</code>,
          contentStrong: <strong>{c.contentStrong}</strong>,
          browser: <Kbd>{"/guildadmin browser [guilds|quests]"}</Kbd>,
          guilds: <code>guilds</code>,
          def: <code>GuildQuestDefinition</code>,
        })}
      </p>

      <SectionHeading id="comandos-team">{c.teamCmdTitle}</SectionHeading>
      <CommandTable rows={teamCommands} thCommand={c.thCommand} thWhat={c.thWhat} />

      <SectionHeading id="comandos-guild">{c.guildCmdTitle}</SectionHeading>
      <CommandTable rows={guildCommands} thCommand={c.thCommand} thWhat={c.thWhat} />

      <SectionHeading id="comandos-admin">{c.adminCmdTitle}</SectionHeading>
      <CommandTable rows={adminCommands} thCommand={c.thCommand} thWhat={c.thWhat} />
      <p>{fill(c.permNote, { perm: <Badge tone="amber">rpgrollguilds.admin.*</Badge> })}</p>

      <SectionHeading id="placeholders">{c.phTitle}</SectionHeading>
      <p>{fill(c.phLead, { badge: <Badge tone="violet">rpgrollguilds</Badge> })}</p>
      <Table>
        <Thead>
          <Th>{c.thPlaceholder}</Th>
          <Th>{c.thValue}</Th>
        </Thead>
        <tbody>
          {guildPlaceholders.map((p) => (
            <Tr key={p.name}>
              <Td className="font-mono text-xs">{p.name}</Td>
              <Td>{localizedPlaceholder(p.name, p.description, locale)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <PrevNext current="guilds" onNavigate={onNavigate} />
    </>
  );
}

function CommandTable({
  rows,
  thCommand,
  thWhat,
}: {
  rows: [string, ReactNode][];
  thCommand: string;
  thWhat: string;
}) {
  return (
    <Table>
      <Thead>
        <Th>{thCommand}</Th>
        <Th>{thWhat}</Th>
      </Thead>
      <tbody>
        {rows.map(([cmd, what]) => (
          <Tr key={cmd}>
            <Td className="font-mono text-xs">{cmd}</Td>
            <Td>{what}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
