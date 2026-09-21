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
import { ADDONS_C_COPY, type AddonsCCopy } from "./copy/addonsC";

type QuestsCopy = AddonsCCopy["quests"];

const CAVEATS: Record<string, [string, string]> = {
  reload: [
    "reload no recarga las regiones",
    "/questadmin reload solo recarga las misiones. Un cambio en regions/*.yml necesita reiniciar el server, o usar el editor gráfico (que sí escribe a disco al instante, aunque no fuerza un reload del resto del server).",
  ],
  complete: [
    "COMPLETE_QUEST es solo informativo",
    "Existe como tipo de acción pero no fuerza ningún progreso — solo loguea. Para completar una misión desde afuera (recompensa u otro sistema) hay que usar /questadmin complete o encadenarla vía rewards.quests.",
  ],
  npc: [
    "El gancho existe, pero nada lo dispara todavía",
    "Quests escucha un evento propio NpcTalkEvent para progresar TALK_TO_NPC y DELIVER_ITEM — pensado para que cualquier sistema de NPCs lo dispare sin acoplarse a él. Al revisar el código de RPGRoll-NPCs, ningún listener llama a este evento todavía: la integración está definida de este lado, pero no conectada del otro.",
  ],
  yamlOnly: [
    "Objetivos y diálogo siguen siendo solo YAML",
    "Ni el editor in-game ni el constructor visual de esta página tocan objectives, dialog ni options de una etapa — son demasiado anidados para un formulario lineal. Para el resto del juego (jugar la misión, ver diálogos, botones de rama) sigue sin haber ningún inventario/menú — todo pasa por /quest y mensajes de chat.",
  ],
  track: [
    "track no existe",
    "El plugin.yml anuncia /quest track en su texto de uso, pero el comando no tiene ese subcomando implementado — escribirlo solo te muestra el mensaje de uso.",
  ],
};

const questFields = (c: QuestsCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: "nueva_mision", placeholder: "hunter" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&cCazador de Zombies" },
  {
    key: "category",
    label: c.fCategory,
    type: "select",
    options: [
      "MAIN_STORY",
      "SIDE_QUEST",
      "DAILY",
      "WEEKLY",
      "PROFESSION",
      "GUILD",
      "EVENT",
      "DUNGEON",
      "ACHIEVEMENT",
    ],
  },
  {
    key: "difficulty",
    label: c.fDifficulty,
    type: "select",
    options: ["EASY", "NORMAL", "HARD", "ELITE", "LEGENDARY", "MYTHIC"],
  },
  { key: "repeatable", label: c.fRepeatable, type: "boolean" },
  { key: "cooldown", label: c.fCooldown, type: "string", placeholder: "24h" },
  {
    key: "requirements",
    label: c.fRequirements,
    type: "group",
    fields: [{ key: "level", label: c.fMinLevel, type: "number", default: "0" }],
  },
  {
    key: "rewards",
    label: c.fRewards,
    type: "group",
    fields: [
      { key: "money", label: c.fMoney, type: "number", default: "0" },
      { key: "experience", label: c.fExperience, type: "number", default: "0" },
    ],
  },
];

const regionFields = (c: QuestsCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: "nueva_region", placeholder: "castle" },
  { key: "world", label: c.fWorld, type: "string", default: "world" },
  {
    key: "min",
    label: c.fMin,
    type: "group",
    fields: [
      { key: "x", label: "X", type: "number", default: "0" },
      { key: "y", label: "Y", type: "number", default: "0" },
      { key: "z", label: "Z", type: "number", default: "0" },
    ],
  },
  {
    key: "max",
    label: c.fMax,
    type: "group",
    fields: [
      { key: "x", label: "X", type: "number", default: "0" },
      { key: "y", label: "Y", type: "number", default: "0" },
      { key: "z", label: "Z", type: "number", default: "0" },
    ],
  },
];

export function Quests({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = ADDONS_C_COPY[locale].quests;
  const questPlaceholders = placeholders.filter((p) => p.expansion === "rpgrollquests");

  const note = (key: keyof typeof CAVEATS) => {
    const [title, body] = CAVEATS[key];
    return {
      title: localizedCaveatTitle("quests", title, locale),
      body: localizedCaveatBody("quests", title, body, locale),
    };
  };

  return (
    <>
      <PageHeader title={c.title} slug="quests">
        {c.intro}
      </PageHeader>

      <Callout tone="info" title={c.selfTitle}>
        {fill(c.selfBody, {
          core: <code>:core</code>,
          path: <code>plugins/RPGRoll-Quests/playerdata/&lt;uuid&gt;.yml</code>,
        })}
      </Callout>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll]\nsoftdepend: [PlaceholderAPI]"} />
      <p>{fill(c.reqBody, { material: <code>Material</code> })}</p>

      <SectionHeading id="estructura">{c.structTitle}</SectionHeading>
      <p>
        {fill(c.structBody, {
          stage: <code>QuestStage</code>,
          and: <strong>{c.structAnd}</strong>,
          notAuto: <strong>{c.structNotAuto}</strong>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename={c.branchFile}
        code={
          "stages:\n" +
          "  - id: talk_to_elder\n" +
          "    dialog:\n" +
          '      - npc: "Bienvenido aventurero."\n' +
          "    options:\n" +
          '      - label: "Aceptar la misión"\n' +
          "        next-stage: get_sword\n" +
          '      - label: "Pedir más información"\n' +
          "        next-stage: more_info\n" +
          "\n" +
          "  - id: more_info\n" +
          "    dialog:\n" +
          '      - npc: "Los monstruos salieron de una cueva al norte."\n' +
          "    options:\n" +
          '      - label: "Aceptar la misión"\n' +
          "        next-stage: get_sword\n" +
          '      - label: "Volver"\n' +
          "        next-stage: talk_to_elder\n"
        }
      />

      <SectionHeading id="objetivos">{c.objTitle}</SectionHeading>
      <p>{c.objLead}</p>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thHow}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">KILL_ENTITY</Td><Td>{c.oKill}</Td></Tr>
          <Tr><Td className="font-mono text-xs">BREAK_BLOCK / PLACE_BLOCK</Td><Td>{c.oBlock}</Td></Tr>
          <Tr><Td className="font-mono text-xs">COLLECT_ITEM</Td><Td>{c.oCollect}</Td></Tr>
          <Tr><Td className="font-mono text-xs">DELIVER_ITEM</Td><Td>{c.oDeliver}</Td></Tr>
          <Tr><Td className="font-mono text-xs">TALK_TO_NPC</Td><Td>{fill(c.oTalk, { event: <code>NpcTalkEvent</code> })}</Td></Tr>
          <Tr><Td className="font-mono text-xs">COMMAND</Td><Td>{c.oCommand}</Td></Tr>
          <Tr><Td className="font-mono text-xs">WAIT</Td><Td>{c.oWait}</Td></Tr>
          <Tr><Td className="font-mono text-xs">REACH_LOCATION</Td><Td>{c.oReach}</Td></Tr>
          <Tr><Td className="font-mono text-xs">DISCOVER_REGION</Td><Td>{c.oDiscover}</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="tip">{c.objTip}</Callout>

      <SectionHeading id="condiciones">{c.condTitle}</SectionHeading>
      <p>
        {fill(c.condBody, {
          cmp: <code>player.level &gt;= 5</code>,
          fn: <code>player.hasPermission(perm)</code>,
          vars: (
            <>
              <code>player.level/health/foodlevel</code>, <code>race</code>, <code>class</code>,{" "}
              <code>world</code>, <code>weather</code>
            </>
          ),
        })}
      </p>

      <SectionHeading id="regiones">{c.regionTitle}</SectionHeading>
      <p>{c.regionLead}</p>
      <CodeBlock
        language="yaml"
        filename="regions/castle.yml"
        code={"id: castle\nworld: world\nmin: { x: 100, y: 60, z: -300 }\nmax: { x: 200, y: 90, z: -250 }\n"}
      />
      <CodeBlock
        language="yaml"
        filename="regions/forest.yml"
        code={
          "id: forest\n" +
          "world: world\n" +
          "\n" +
          "min:\n" +
          "  x: -150\n" +
          "  y: 60\n" +
          "  z: 50\n" +
          "\n" +
          "max:\n" +
          "  x: -50\n" +
          "  y: 100\n" +
          "  z: 150\n"
        }
      />

      <YamlBuilder title={c.bRegion} folder="regions" fields={regionFields(c)} />

      <Callout tone="warning" title={note("reload").title}>
        {note("reload").body}
      </Callout>

      <SectionHeading id="recompensas">{c.rewardTitle}</SectionHeading>
      <p>{fill(c.rewardBody, { material: <code>Material</code>, strong: <strong>{c.rewardStrong}</strong> })}</p>
      <Callout tone="warning" title={note("complete").title}>
        {note("complete").body}
      </Callout>

      <SectionHeading id="npcs">{c.npcTitle}</SectionHeading>
      <Callout tone="warning" title={note("npc").title}>
        {note("npc").body}
      </Callout>

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>
        {fill(c.guiBody, {
          browser: <Kbd>{"/questadmin browser [quests|regions]"}</Kbd>,
          quests: <code>quests</code>,
          quest: <code>Quest</code>,
          region: <code>Region</code>,
        })}
      </p>
      <Callout tone="warning" title={note("yamlOnly").title}>
        {note("yamlOnly").body}
      </Callout>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="quests/hunter.yml"
        code={
          "id: hunter\n" +
          'display-name: "&cCazador de Zombies"\n' +
          "category: DAILY\n" +
          "difficulty: NORMAL\n" +
          "repeatable: true\n" +
          "cooldown: 24h\n" +
          "\n" +
          "requirements:\n" +
          "  level: 5\n" +
          "\n" +
          "stages:\n" +
          "  - id: hunt\n" +
          "    objectives:\n" +
          "      - type: KILL_ENTITY\n" +
          "        entity: ZOMBIE\n" +
          "        amount: 20\n" +
          '        description: "Elimina 20 zombies"\n' +
          "    on-complete:\n" +
          "      - type: TITLE\n" +
          '        title: "&c¡Cacería completa!"\n' +
          "\n" +
          "rewards:\n" +
          "  money: 250\n" +
          "  experience: 500\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="quests/tutorial.yml (completo)"
        code={
          "id: tutorial\n" +
          'display-name: "&aTutorial: Los Primeros Pasos"\n' +
          "category: MAIN_STORY\n" +
          "difficulty: EASY\n" +
          "repeatable: false\n" +
          "\n" +
          "stages:\n" +
          "  - id: talk_to_elder\n" +
          "    dialog:\n" +
          '      - npc: "Bienvenido aventurero."\n' +
          '      - player: "¿Necesitas ayuda?"\n' +
          "      - npc: |\n" +
          "          Claro. Hay monstruos cerca del bosque\n" +
          "          y necesito que alguien se encargue de ellos.\n" +
          "    options:\n" +
          '      - label: "Aceptar la misión"\n' +
          "        next-stage: get_sword\n" +
          '      - label: "Pedir más información"\n' +
          "        next-stage: more_info\n" +
          "    on-start:\n" +
          "      - type: MESSAGE\n" +
          '        value: "&e¡Nueva misión disponible: Tutorial!"\n' +
          "\n" +
          "  - id: more_info\n" +
          "    dialog:\n" +
          '      - npc: "Los monstruos salieron de una cueva al norte del pueblo."\n' +
          "    options:\n" +
          '      - label: "Aceptar la misión"\n' +
          "        next-stage: get_sword\n" +
          '      - label: "Volver"\n' +
          "        next-stage: talk_to_elder\n" +
          "\n" +
          "  - id: get_sword\n" +
          "    objectives:\n" +
          "      - type: COLLECT_ITEM\n" +
          "        material: WOODEN_SWORD\n" +
          "        amount: 1\n" +
          '        description: "Consigue una espada"\n' +
          "    on-complete:\n" +
          "      - type: MESSAGE\n" +
          '        value: "&aConseguiste tu espada."\n' +
          "\n" +
          "  - id: defeat_captain\n" +
          "    objectives:\n" +
          "      - type: KILL_ENTITY\n" +
          "        entity: ZOMBIE\n" +
          "        amount: 1\n" +
          '        description: "Derrota al capitán de los monstruos"\n' +
          "    on-complete:\n" +
          "      - type: SOUND\n" +
          "        sound: ENTITY_PLAYER_LEVELUP\n" +
          "\n" +
          "  - id: travel_to_kingdom\n" +
          "    objectives:\n" +
          "      - type: REACH_LOCATION\n" +
          "        world: world\n" +
          "        x: 120\n" +
          "        y: 65\n" +
          "        z: -340\n" +
          "        radius: 8\n" +
          '        description: "Viaja al reino"\n' +
          "    on-complete:\n" +
          "      - type: MESSAGE\n" +
          '        value: "&6¡Llegaste al reino! Así comienza la historia principal..."\n' +
          "\n" +
          "rewards:\n" +
          "  money: 100\n" +
          "  experience: 200\n" +
          "  items:\n" +
          "    - IRON_SWORD\n"
        }
      />

      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, {
          file: <code>quests/reference_full.yml</code>,
          events: (
            <>
              <code>on-start</code>/<code>on-progress</code>/<code>on-complete</code>/<code>on-fail</code>/
              <code>on-abandon</code>/<code>on-stage-change</code>
            </>
          ),
          reqs: <code>requirements</code>,
          rewards: <code>rewards</code>,
        })}
      </Callout>

      <YamlBuilder
        title={c.bQuest}
        description={c.bQuestDesc}
        folder="quests"
        fields={questFields(c)}
      />

      <SectionHeading id="comandos">{c.cmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/quest list</Td><Td>{c.cList}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/quest info <id>"}</Td><Td>{c.cInfo}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/quest start <id>"}</Td><Td>{c.cStart}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/quest abandon <id>"}</Td><Td>{c.cAbandon}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/quest active</Td><Td>{c.cActive}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/quest completed</Td><Td>{c.cCompleted}</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title={note("track").title}>
        {note("track").body}
      </Callout>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/questadmin give <jugador> <id>"}</Td><Td>{c.aGive}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/questadmin complete <jugador> <id>"}</Td><Td>{c.aComplete}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/questadmin fail <jugador> <id>"}</Td><Td>{c.aFail}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/questadmin reset <jugador> <id>"}</Td><Td>{c.aReset}</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/questadmin browser [quests|regions]"}</Td><Td>{c.aBrowser}</Td></Tr>
          <Tr><Td className="font-mono text-xs">/questadmin reload</Td><Td>{c.aReload}</Td></Tr>
        </tbody>
      </Table>
      <p>{fill(c.permNote, { perm: <Badge tone="amber">rpgrollquests.admin.*</Badge> })}</p>

      <SectionHeading id="placeholders">{c.phTitle}</SectionHeading>
      <p>{fill(c.phLead, { badge: <Badge tone="violet">rpgrollquests</Badge> })}</p>
      <Table>
        <Thead>
          <Th>{c.thPlaceholder}</Th>
          <Th>{c.thValue}</Th>
        </Thead>
        <tbody>
          {questPlaceholders.map((p) => (
            <Tr key={p.name}>
              <Td className="font-mono text-xs">{p.name}</Td>
              <Td>{localizedPlaceholder(p.name, p.description, locale)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <PrevNext current="quests" onNavigate={onNavigate} />
    </>
  );
}
