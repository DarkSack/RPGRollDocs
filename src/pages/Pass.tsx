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
import { useI18n, fill } from "../i18n";
import { PASS_COPY } from "./copy/pass";

export function Pass({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = PASS_COPY[locale];

  const rewards: [string, string][] = [
    ["money:500", c.rMoney],
    ["key:legendario:1", c.rKey],
    ["item:phoenix_feather:1", c.rItem],
    ["material:diamond:8", c.rMaterial],
    ["exp:400", c.rExp],
    ["command:<comando>", c.rCommand],
  ];

  const missionTypes: [string, string][] = [
    ["KILL_MOB", c.tKillMob],
    ["KILL_RPG_MOB", c.tKillRpgMob],
    ["BREAK_BLOCK", c.tBreak],
    ["FISH", c.tFish],
    ["LEVEL_UP", c.tLevelUp],
    ["COMPLETE_QUEST", c.tQuest],
    ["PLAYTIME", c.tPlaytime],
    ["VOTE", c.tVote],
    ["CLAIM_DAILY", c.tDaily],
  ];

  const commands: [string, string, string][] = [
    ["/pase", c.cPase, "pass, battlepass"],
    ["/pase misiones", c.cMissions, "missions"],
    ["/pase reclamar", c.cClaim, "claim"],
    ["/diario", c.cDaily, "daily, recompensas"],
    ["/votar", c.cVote, "vote, votes"],
    ["/passadmin reload", c.cReload, ""],
    ["/passadmin xp <jugador> <cantidad>", c.cXp, ""],
    ["/passadmin vote <jugador>", c.cSimVote, ""],
    ["/passadmin info <jugador>", c.cInfo, ""],
  ];

  const target = <code>target</code>;

  return (
    <>
      <PageHeader title={c.title} slug="pass">
        {c.intro}
      </PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        code={
          "depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, RPGRoll-Quests, RPGRoll-Mobs, RPGRoll-Crates, RPGRoll-Items, Votifier, Vault]"
        }
      />
      <p>
        {fill(c.reqBody, {
          crates: <strong>RPGRoll-Crates</strong>,
          items: <strong>RPGRoll-Items</strong>,
          mobs: <strong>RPGRoll-Mobs</strong>,
          quests: <strong>RPGRoll-Quests</strong>,
          votifier: <strong>Votifier</strong>,
          vault: <strong>Vault</strong>,
        })}
      </p>

      <SectionHeading id="como-funciona">{c.howTitle}</SectionHeading>
      <p>{fill(c.howBody1, { xp: <code>xp-per-level</code> })}</p>
      <p>
        {fill(c.howBody2, {
          pase: <Kbd>/pase</Kbd>,
          claim: <Kbd>/pase reclamar</Kbd>,
          perm: <code>rpgroll.pass.premium</code>,
        })}
      </p>
      <p>{fill(c.howBody3, { active: <code>active-season</code> })}</p>

      <SectionHeading id="recompensas">{c.rewardsTitle}</SectionHeading>
      <p>{c.rewardsLead}</p>
      <Table>
        <Thead>
          <Th>{c.thFormat}</Th>
          <Th>{c.thGives}</Th>
        </Thead>
        <tbody>
          {rewards.map(([format, gives]) => (
            <Tr key={format}>
              <Td className="font-mono text-xs">{format}</Td>
              <Td>
                {fill(gives, {
                  cmd: <code>{format.startsWith("key") ? "crate givekey" : "itemadmin give"}</code>,
                  player: <code>{"{player}"}</code>,
                  uuid: <code>{"{uuid}"}</code>,
                })}
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <Callout tone="warning" title={c.rewardsWarnTitle}>
        {c.rewardsWarnBody}
      </Callout>

      <SectionHeading id="temporadas">{c.seasonTitle}</SectionHeading>
      <p>
        {fill(c.seasonBody, {
          dir: <code>seasons/&lt;id&gt;.yml</code>,
          config: <code>config.yml</code>,
          active: <code>active-season</code>,
          timezone: <code>timezone</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="config.yml"
        code={
          "language: es\n" +
          "active-season: temporada_1\n" +
          "timezone: America/Mexico_City\n" +
          "# Tras cuántos segundos sin moverse deja de contar el tiempo jugado (PLAYTIME).\n" +
          "playtime-afk-seconds: 300\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="seasons/temporada_1.yml"
        code={
          "id: temporada_1\n" +
          'display-name: "&6&l✦ Pase Royale &7· &eTemporada 1"\n' +
          "start: 2026-09-25\n" +
          "end: 2026-11-08\n" +
          "xp-per-level: 1000\n" +
          "\n" +
          "levels:\n" +
          "  1:\n" +
          "    free: [money:300, material:bread:16]\n" +
          "    premium: [item:healing_potion:4, money:500]\n" +
          "  5:\n" +
          "    free: [key:comun:1, money:500]\n" +
          "    premium: [key:epica:1, item:enchanted_gem:2]\n" +
          "  10:\n" +
          "    free: [key:comun:2, material:diamond:4]\n" +
          "    premium: [key:epica:2, item:hoja_del_centinela:1, money:2500]\n"
        }
      />

      <SectionHeading id="misiones">{c.missionsTitle}</SectionHeading>
      <p>
        {fill(c.missionsBody, {
          file: <code>missions.yml</code>,
          xp: <code>xp</code>,
          daily: <code>daily-count</code>,
          weekly: <code>weekly-count</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thScope}</Th>
          <Th>{c.thMeaning}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">DAILY</Td>
            <Td>{c.scopeDaily}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">WEEKLY</Td>
            <Td>{c.scopeWeekly}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">SEASON</Td>
            <Td>{c.scopeSeason}</Td>
          </Tr>
        </tbody>
      </Table>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thCounts}</Th>
        </Thead>
        <tbody>
          {missionTypes.map(([type, counts]) => (
            <Tr key={type}>
              <Td className="font-mono text-xs">{type}</Td>
              <Td>{fill(counts, { target, example: <code>ZOMBIE</code> })}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>{fill(c.missionsTarget, { target })}</p>
      <CodeBlock
        language="yaml"
        filename="missions.yml"
        code={
          "daily-count: 3\n" +
          "weekly-count: 3\n" +
          "\n" +
          "missions:\n" +
          "  cazar_zombis:\n" +
          "    scope: DAILY\n" +
          '    name: "&fCaza &e25 &fzombis"\n' +
          "    type: KILL_MOB\n" +
          "    target: ZOMBIE\n" +
          "    amount: 25\n" +
          "    xp: 200\n" +
          "  jugar_un_rato:\n" +
          "    scope: DAILY\n" +
          '    name: "&fJuega &e45 &fminutos"\n' +
          "    type: PLAYTIME\n" +
          "    amount: 45\n" +
          "    xp: 250\n"
        }
      />

      <SectionHeading id="diario">{c.dailyTitle}</SectionHeading>
      <p>
        {fill(c.dailyBody, {
          cmd: <Kbd>/diario</Kbd>,
          reset: <code>reset-streak-if-missed: true</code>,
        })}
      </p>
      <p>
        {fill(c.dailyRankBody, {
          bonus: <code>rank-bonus</code>,
          group: <code>group.&lt;rango&gt;</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="daily.yml"
        code={
          "reset-streak-if-missed: true\n" +
          "pass-xp: 100\n" +
          "\n" +
          "days:\n" +
          "  1:\n" +
          "    - money:200\n" +
          "    - material:bread:8\n" +
          "  7:\n" +
          "    - key:epica:1\n" +
          "    - money:1200\n" +
          "\n" +
          "rank-bonus:\n" +
          "  - permission: group.mvp\n" +
          '    name: "&6&lMVP"\n' +
          "    rewards: [money:600, key:comun:1]\n" +
          "  - permission: group.vip\n" +
          '    name: "&a&lVIP"\n' +
          "    rewards: [money:200]\n"
        }
      />

      <SectionHeading id="votos">{c.votesTitle}</SectionHeading>
      <p>
        {fill(c.votesBody, {
          cmd: <Kbd>/votar</Kbd>,
          key: <code>plugins/Votifier/rsa/public.key</code>,
        })}
      </p>
      <p>
        {fill(c.votesOffline, {
          streak: <code>streak</code>,
          test: <Kbd>{"/passadmin vote <jugador>"}</Kbd>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="votes.yml"
        code={
          "sites:\n" +
          '  - name: "&aMinecraft-MP"\n' +
          '    url: "https://minecraft-mp.com/server/XXXXX/vote/"\n' +
          "\n" +
          "rewards:\n" +
          "  - money:250\n" +
          "  - key:comun:1\n" +
          "\n" +
          "pass-xp: 150\n" +
          "\n" +
          "streak:\n" +
          "  7:\n" +
          "    - key:epica:1\n" +
          "    - money:1500\n" +
          "\n" +
          'broadcast: "&b{player} &7votó por el servidor y se llevó recompensas. &e/votar"\n'
        }
      />

      <SectionHeading id="premium">{c.premiumTitle}</SectionHeading>
      <p>{fill(c.premiumBody, { perm: <code>rpgroll.pass.premium</code> })}</p>
      <CodeBlock language="bash" code={"lp user <jugador> permission settemp rpgroll.pass.premium true 45d"} />

      <SectionHeading id="comandos">{c.cmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
          <Th>{c.aliases}</Th>
        </Thead>
        <tbody>
          {commands.map(([cmd, what, aliases]) => (
            <Tr key={cmd}>
              <Td className="font-mono text-xs">{cmd}</Td>
              <Td>{what}</Td>
              <Td className="font-mono text-xs">{aliases || "—"}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="permisos">{c.permsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thPermission}</Th>
          <Th>{c.thWhat}</Th>
          <Th>{c.thDefault}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td>
              <Badge tone="amber">rpgroll.pass.premium</Badge>
            </Td>
            <Td>{c.pPremium}</Td>
            <Td className="font-mono text-xs">false</Td>
          </Tr>
          <Tr>
            <Td>
              <Badge tone="amber">rpgroll.pass.admin</Badge>
            </Td>
            <Td>{c.pAdmin}</Td>
            <Td className="font-mono text-xs">op</Td>
          </Tr>
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
              ["seasons/<id>.yml", c.fSeasons],
              ["missions.yml", c.fMissions],
              ["daily.yml", c.fDaily],
              ["votes.yml", c.fVotes],
              ["lang/<idioma>.yml", c.fLang],
              ["data/players/<uuid>.yml", c.fPlayers],
              ["data/pending-votes.yml", c.fPending],
            ] as [string, string][]
          ).map(([file, contains]) => (
            <Tr key={file}>
              <Td className="font-mono text-xs">plugins/RPGRoll-Pass/{file}</Td>
              <Td>{contains}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>{fill(c.filesReload, { cmd: <Kbd>/passadmin reload</Kbd> })}</p>

      <PrevNext current="pass" onNavigate={onNavigate} />
    </>
  );
}
