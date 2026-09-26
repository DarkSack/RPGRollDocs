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
import { useI18n, fill, localizedPlaceholder } from "../i18n";
import { ADDONS_A_COPY, type AddonsACopy } from "./copy/addonsA";

type ChatCopy = AddonsACopy["chat"];

/** Las claves del YAML no se traducen; solo las etiquetas del formulario. */
const channelFields = (c: ChatCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: "nuevo_canal", placeholder: "global" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "Global" },
  { key: "icon", label: c.fIcon, type: "string", default: "PAPER" },
  { key: "color", label: c.fColor, type: "string", default: "WHITE" },
  { key: "priority", label: c.fPriority, type: "number", default: "0" },
  {
    key: "scope",
    label: c.fScope,
    type: "select",
    options: ["GLOBAL", "PROXIMITY", "WORLD", "GUILD", "TEAM", "STAFF"],
  },
  { key: "distance", label: c.fDistance, type: "number", default: "0" },
  { key: "view-permission", label: c.fViewPerm, type: "string" },
  { key: "speak-permission", label: c.fSpeakPerm, type: "string" },
  { key: "cooldown-millis", label: c.fCooldown, type: "number", default: "0" },
  { key: "format", label: c.fFormat, type: "string", placeholder: "&7[{channel}] &f{player}&7: &f{message}" },
  { key: "text-format", label: c.fTextFormat, type: "select", options: ["LEGACY", "MINIMESSAGE"] },
  { key: "join-sound", label: c.fJoinSound, type: "string" },
  { key: "filter-profanity", label: c.fProfanity, type: "boolean", default: "true" },
  { key: "filter-caps", label: c.fCaps, type: "boolean", default: "true" },
  { key: "allow-urls", label: c.fUrls, type: "boolean" },
  { key: "default-joined", label: c.fDefaultJoined, type: "boolean", default: "true" },
  { key: "cross-world", label: c.fCrossWorld, type: "boolean", default: "true" },
  { key: "also-action-bar", label: c.fActionBar, type: "boolean" },
];

const languageFields = (c: ChatCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: "nuevo_idioma", placeholder: "elfico" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "Élfico" },
  { key: "obfuscation-char", label: c.fObfChar, type: "string", default: "◌" },
  { key: "default-for-races", label: c.fDefaultRaces, type: "list", placeholder: "elf, elfo" },
];

const roleFields = (c: ChatCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: "nuevo_rol", placeholder: "vip" },
  { key: "prefix", label: c.fPrefix, type: "string", placeholder: "&6[VIP] &r" },
  { key: "suffix", label: c.fSuffix, type: "string" },
  { key: "color", label: c.fNameColor, type: "string", default: "WHITE" },
  { key: "icon", label: c.fIconOpt, type: "string" },
  { key: "priority", label: c.fPriority, type: "number", default: "0" },
  { key: "permission", label: c.fPermTrigger, type: "string", placeholder: "rpgrollchat.role.vip" },
];

const emoteFields = (c: ChatCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: "nueva_emote", placeholder: "wave" },
  { key: "template", label: c.fTemplate, type: "string", placeholder: "&f{player} &7saluda." },
  {
    key: "target-template",
    label: c.fTargetTemplate,
    type: "string",
    placeholder: "&f{player} &7saluda a &f{target}&7.",
  },
  { key: "radius", label: c.fRadius, type: "number", default: "0" },
];

export function Chat({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = ADDONS_A_COPY[locale].chat;

  const chatPlaceholders = placeholders.filter((p) => p.expansion === "rpgrollchat");

  const playerCommands: [string, React.ReactNode][] = [
    ["/channel <join|leave|list|switch|info> [canal]", fill(c.pChannel, { alias: <Kbd>/ch</Kbd> })],
    ["/w <jugador> <mensaje>", c.pWhisper],
    ["/r <mensaje>", c.pReply],
    ["/ignore <player|guild|channel> <add|remove|list> [nombre]", c.pIgnore],
    ["/me <acción>", c.pMe],
    ["/do <descripción>", c.pDo],
    ["/emote <nombre> [jugador]", c.pEmote],
    ["/react <emoji>", c.pReact],
    ["/language <list|learn|speak> [idioma]", c.pLanguage],
  ];

  const adminCommands: [string, string][] = [
    ["/socialspy", c.aSocialSpy],
    ["/chatlog <search|export|clear> [canal] [jugador] [fecha]", c.aChatLog],
    ["/chatadmin browser [channel|language|role|emote]", c.aBrowser],
    ["/chatadmin editor <canal>", c.aEditor],
    ["/chatadmin reload", c.aReload],
  ];

  return (
    <>
      <PageHeader title={c.title} slug="chat">
        {c.intro}
      </PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, RPGRoll-Guilds, PlaceholderAPI]"} />
      <p>{fill(c.reqBody, { guild: <code>scope: GUILD</code>, team: <code>scope: TEAM</code> })}</p>

      <SectionHeading id="canales">{c.channelsTitle}</SectionHeading>
      <p>
        {fill(c.channelsBody, {
          scope: <code>scope</code>,
          proximity: <code>PROXIMITY</code>,
          distance: <code>distance</code>,
          guildTeam: (
            <>
              <code>GUILD</code>/<code>TEAM</code>
            </>
          ),
          staff: <code>STAFF</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="channels/global.yml"
        code={
          "id: global\n" +
          'display-name: "Global"\n' +
          "icon: PAPER\n" +
          "color: WHITE\n" +
          "priority: 0\n" +
          "scope: GLOBAL\n" +
          "distance: 0\n" +
          "cooldown-millis: 0\n" +
          'format: "&7[&fGlobal&7] &f{player}&7: &f{message}"\n' +
          "text-format: LEGACY\n" +
          "filter-profanity: true\n" +
          "filter-caps: true\n" +
          "allow-urls: false\n" +
          "default-joined: true\n" +
          "cross-world: true\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="channels/guild.yml"
        code={
          "id: guild\n" +
          'display-name: "Guild"\n' +
          "icon: SHIELD\n" +
          "color: GREEN\n" +
          "priority: 8\n" +
          "scope: GUILD\n" +
          'format: "&2[&aGuild&2] &f{player}&7: &f{message}"\n' +
          "text-format: LEGACY\n" +
          "default-joined: true\n" +
          "cross-world: true\n"
        }
      />
      <p>
        {fill(c.channelsCount, {
          list: <code>global, local, comercio, ayuda, eventos, sistema, staff, team, guild</code>,
          scope: <code>scope</code>,
        })}
      </p>

      <YamlBuilder title={c.bChannel} folder="channels" fields={channelFields(c)} />
      <Callout tone="tip" title={c.channelRefTitle}>
        {fill(c.channelRefBody, {
          file: <code>channels/reference_full.yml</code>,
          scope: <code>scope: PROXIMITY</code>,
          distance: <code>distance</code>,
          joinSound: <code>join-sound</code>,
          alsoActionBar: <code>also-action-bar</code>,
        })}
      </Callout>

      <SectionHeading id="idiomas">{c.langTitle}</SectionHeading>
      <p>
        {fill(c.langBody, {
          obfuscated: <strong>{c.langObfuscated}</strong>,
          char: <code>obfuscation-char</code>,
          cmd: <Kbd>/language learn</Kbd>,
          defaultFor: <code>default-for-races</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="languages/elfico.yml"
        code={'id: elfico\ndisplay-name: "Élfico"\nobfuscation-char: "◌"\ndefault-for-races: ["elf", "elfo"]\n'}
      />
      <YamlBuilder title={c.bLanguage} folder="languages" fields={languageFields(c)} />

      <SectionHeading id="roles">{c.rolesTitle}</SectionHeading>
      <p>{fill(c.rolesBody, { permission: <code>permission</code> })}</p>
      <CodeBlock
        language="yaml"
        filename="roles/vip.yml"
        code={
          "id: vip\n" +
          'prefix: "&6[VIP] &r"\n' +
          "color: GOLD\n" +
          "icon: DIAMOND\n" +
          "priority: 5\n" +
          'permission: "rpgrollchat.role.vip"\n'
        }
      />
      <Callout tone="tip">
        {fill(c.rolesTip, { priority: <code>priority</code>, player: <code>jugador</code> })}
      </Callout>
      <YamlBuilder title={c.bRole} folder="roles" fields={roleFields(c)} />

      <SectionHeading id="emotes">{c.emotesTitle}</SectionHeading>
      <p>
        {fill(c.emotesBody, {
          template: <code>template</code>,
          cmd1: <Kbd>/wave</Kbd>,
          targetTemplate: <code>target-template</code>,
          cmd2: <Kbd>{"/wave <jugador>"}</Kbd>,
          vars: (
            <>
              <code>{"{player}"}</code>/<code>{"{target}"}</code>
            </>
          ),
          radius: <code>radius</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="emotes/wave.yml"
        code={
          "id: wave\n" +
          'template: "&f{player} &7saluda."\n' +
          'target-template: "&f{player} &7saluda a &f{target}&7."\n' +
          "radius: 0\n"
        }
      />
      <p>
        {fill(c.emotesCount, {
          list: <code>wave, laugh, sit, cry, dance</code>,
          cmds: (
            <>
              <Kbd>/wave</Kbd>, <Kbd>/laugh</Kbd>…
            </>
          ),
          generic: <Kbd>{"/emote <nombre>"}</Kbd>,
        })}
      </p>
      <YamlBuilder title={c.bEmote} folder="emotes" fields={emoteFields(c)} />

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>
        {fill(c.guiBody, {
          browser: <Kbd>{"/chatadmin browser [channel|language|role|emote]"}</Kbd>,
          channel: <code>channel</code>,
          editor: <Kbd>{"/chatadmin editor <canal>"}</Kbd>,
        })}
      </p>

      <SectionHeading id="comandos-jugador">{c.playerCmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          {playerCommands.map(([cmd, what]) => (
            <Tr key={cmd}>
              <Td className="font-mono text-xs">{cmd}</Td>
              <Td>{what}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="comandos-admin">{c.adminCmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          {adminCommands.map(([cmd, what]) => (
            <Tr key={cmd}>
              <Td className="font-mono text-xs">{cmd}</Td>
              <Td>{what}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>
        {fill(c.permNote, {
          spy: <Kbd>/socialspy</Kbd>,
          log: <Kbd>/chatlog</Kbd>,
          p1: <Badge tone="amber">rpgrollchat.socialspy</Badge>,
          p2: <Badge tone="amber">rpgrollchat.staff</Badge>,
          admin: <Kbd>/chatadmin</Kbd>,
          p3: <Badge tone="amber">rpgrollchat.admin.*</Badge>,
        })}
      </p>

      <SectionHeading id="placeholders">{c.phTitle}</SectionHeading>
      <p>{fill(c.phLead, { badge: <Badge tone="violet">rpgrollchat</Badge> })}</p>
      <Table>
        <Thead>
          <Th>{c.thPlaceholder}</Th>
          <Th>{c.thValue}</Th>
        </Thead>
        <tbody>
          {chatPlaceholders.map((p) => (
            <Tr key={p.name}>
              <Td className="font-mono text-xs">{p.name}</Td>
              <Td>{localizedPlaceholder(p.name, p.description, locale)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <PrevNext current="chat" onNavigate={onNavigate} />
    </>
  );
}
