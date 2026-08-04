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

const channelFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_canal", placeholder: "global" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "Global" },
  { key: "icon", label: "Ícono (Material)", type: "string", default: "PAPER" },
  { key: "color", label: "Color", type: "string", default: "WHITE" },
  { key: "priority", label: "Prioridad", type: "number", default: "0" },
  {
    key: "scope",
    label: "Alcance",
    type: "select",
    options: ["GLOBAL", "PROXIMITY", "WORLD", "GUILD", "TEAM", "STAFF"],
  },
  { key: "distance", label: "Distancia (solo PROXIMITY)", type: "number", default: "0" },
  { key: "view-permission", label: "Permiso para ver", type: "string" },
  { key: "speak-permission", label: "Permiso para hablar", type: "string" },
  { key: "cooldown-millis", label: "Cooldown (ms)", type: "number", default: "0" },
  { key: "format", label: "Formato del mensaje", type: "string", placeholder: "&7[{channel}] &f{player}&7: &f{message}" },
  { key: "text-format", label: "Formato de texto", type: "select", options: ["LEGACY", "MINIMESSAGE"] },
  { key: "join-sound", label: "Sonido al unirse", type: "string" },
  { key: "filter-profanity", label: "Filtrar groserías", type: "boolean", default: "true" },
  { key: "filter-caps", label: "Filtrar mayúsculas", type: "boolean", default: "true" },
  { key: "allow-urls", label: "Permitir URLs", type: "boolean" },
  { key: "default-joined", label: "Unido por defecto", type: "boolean", default: "true" },
  { key: "cross-world", label: "Cruza entre mundos", type: "boolean", default: "true" },
  { key: "also-action-bar", label: "También mostrar en action bar", type: "boolean" },
];

const languageFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_idioma", placeholder: "elfico" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "Élfico" },
  { key: "obfuscation-char", label: "Carácter de ofuscación", type: "string", default: "◌" },
  {
    key: "default-for-races",
    label: "Razas que lo hablan por defecto",
    type: "list",
    placeholder: "elf, elfo",
  },
];

const roleFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_rol", placeholder: "vip" },
  { key: "prefix", label: "Prefijo", type: "string", placeholder: "&6[VIP] &r" },
  { key: "suffix", label: "Sufijo", type: "string" },
  { key: "color", label: "Color del nombre", type: "string", default: "WHITE" },
  { key: "icon", label: "Ícono (Material, opcional)", type: "string" },
  { key: "priority", label: "Prioridad", type: "number", default: "0" },
  { key: "permission", label: "Permiso que lo activa", type: "string", placeholder: "rpgrollchat.role.vip" },
];

const emoteFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_emote", placeholder: "wave" },
  { key: "template", label: "Plantilla (sin objetivo)", type: "string", placeholder: "&f{player} &7saluda." },
  {
    key: "target-template",
    label: "Plantilla (con objetivo)",
    type: "string",
    placeholder: "&f{player} &7saluda a &f{target}&7.",
  },
  { key: "radius", label: "Radio (0 = sin límite)", type: "number", default: "0" },
];

export function Chat({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Chat (RPGRoll-Chat)">
        Motor de chat modular: canales con distintos alcances (global, proximidad, mundo, guild, equipo, staff),
        idiomas con ofuscación real, roles cosméticos, formatos dinámicos, whisper, antispam, ignorados, reacciones
        y logs — todo editable en vivo desde un navegador gráfico.
      </PageHeader>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll]\nsoftdepend: [RPGRoll-Guilds, PlaceholderAPI]"} />
      <p>
        Sin RPGRoll-Guilds, los canales con <code>scope: GUILD</code> o <code>scope: TEAM</code> simplemente no
        tienen a quién enrutar el mensaje — no rompen nada, solo quedan sin efecto para ese jugador.
      </p>

      <SectionHeading id="canales">Canales (ChatChannel)</SectionHeading>
      <p>
        Cada canal define su <code>scope</code> (a quién llega el mensaje), formato, permisos de ver/hablar,
        cooldown y filtros propios. <code>PROXIMITY</code> usa <code>distance</code> en bloques, mismo mundo;{" "}
        <code>GUILD</code>/<code>TEAM</code> dependen de RPGRoll-Guilds; <code>STAFF</code> llega a cualquiera con
        el permiso del canal sin importar mundo o distancia.
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
          'view-permission: ""\n' +
          'speak-permission: ""\n' +
          "cooldown-millis: 0\n" +
          'format: "&7[&fGlobal&7] &f{player}&7: &f{message}"\n' +
          "text-format: LEGACY\n" +
          'join-sound: ""\n' +
          "filter-profanity: true\n" +
          "filter-caps: true\n" +
          "allow-urls: false\n" +
          "default-joined: true\n" +
          "cross-world: true\n" +
          "also-action-bar: false\n"
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
          "distance: 0\n" +
          'view-permission: ""\n' +
          'speak-permission: ""\n' +
          "cooldown-millis: 0\n" +
          'format: "&2[&aGuild&2] &f{player}&7: &f{message}"\n' +
          "text-format: LEGACY\n" +
          'join-sound: ""\n' +
          "filter-profanity: true\n" +
          "filter-caps: true\n" +
          "allow-urls: false\n" +
          "default-joined: true\n" +
          "cross-world: true\n" +
          "also-action-bar: false\n"
        }
      />
      <p>
        Hay 9 canales de ejemplo (<code>global, local, comercio, ayuda, eventos, sistema, staff, team, guild</code>)
        cubriendo los 6 <code>scope</code> disponibles.
      </p>

      <YamlBuilder title="Constructor visual: Channel" folder="channels" fields={channelFields} />

      <SectionHeading id="idiomas">Idiomas</SectionHeading>
      <p>
        Un jugador que no conoce el idioma en el que se habló ve el mensaje <strong>ofuscado</strong> de verdad
        (cada carácter reemplazado por <code>obfuscation-char</code>), no un simple aviso — tiene que aprenderlo
        (vía <Kbd>/language learn</Kbd> u otro addon que lo otorgue) para leerlo. <code>default-for-races</code>{" "}
        determina qué razas lo conocen desde el vamos, sin necesidad de aprenderlo.
      </p>
      <CodeBlock
        language="yaml"
        filename="languages/elfico.yml"
        code={"id: elfico\ndisplay-name: \"Élfico\"\nobfuscation-char: \"◌\"\ndefault-for-races: [\"elf\", \"elfo\"]\n"}
      />
      <CodeBlock
        language="yaml"
        filename="languages/draconico.yml"
        code={
          "id: draconico\n" +
          'display-name: "Dracónico"\n' +
          'obfuscation-char: "◆"\n' +
          'default-for-races: ["dragonkin", "draconido"]\n'
        }
      />
      <YamlBuilder title="Constructor visual: Language" folder="languages" fields={languageFields} />

      <SectionHeading id="roles">Roles de chat</SectionHeading>
      <p>
        Puramente cosmético: agrega prefijo/sufijo/color al nombre en el chat según el <code>permission</code> que
        el jugador tenga — no otorga ninguna capacidad por sí mismo, y no reemplaza a un plugin de permisos
        (Vault/LuckPerms siguen siendo quienes deciden qué permisos tiene cada jugador).
      </p>
      <CodeBlock
        language="yaml"
        filename="roles/jugador.yml"
        code={
          "id: jugador\n" +
          'prefix: ""\n' +
          'suffix: ""\n' +
          "color: WHITE\n" +
          'icon: ""\n' +
          "priority: 0\n" +
          'permission: ""\n'
        }
      />
      <CodeBlock
        language="yaml"
        filename="roles/vip.yml"
        code={
          "id: vip\n" +
          'prefix: "&6[VIP] &r"\n' +
          'suffix: ""\n' +
          "color: GOLD\n" +
          "icon: DIAMOND\n" +
          "priority: 5\n" +
          'permission: "rpgrollchat.role.vip"\n'
        }
      />
      <Callout tone="tip">
        Un jugador puede calificar para varios roles a la vez (varios permisos) — se muestra el de mayor{" "}
        <code>priority</code>. El rol <code>jugador</code> (permiso vacío) actúa como default para todos.
      </Callout>
      <YamlBuilder title="Constructor visual: Chat Role" folder="roles" fields={roleFields} />

      <SectionHeading id="emotes">Emotes</SectionHeading>
      <p>
        <code>template</code> se usa cuando la emote se ejecuta sin objetivo (<Kbd>/wave</Kbd>),{" "}
        <code>target-template</code> cuando apunta a otro jugador (<Kbd>{"/wave <jugador>"}</Kbd>) —{" "}
        <code>{"{player}"}</code>/<code>{"{target}"}</code> se reemplazan por los nombres reales.{" "}
        <code>radius</code> en 0 significa sin límite de distancia para quién la ve.
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
      <CodeBlock
        language="yaml"
        filename="emotes/dance.yml"
        code={
          "id: dance\n" +
          'template: "&f{player} &7se pone a bailar."\n' +
          'target-template: "&f{player} &7baila con &f{target}&7."\n' +
          "radius: 0\n"
        }
      />
      <p>Hay 5 emotes de ejemplo: <code>wave, laugh, sit, cry, dance</code> — cada una registrada también como comando directo (<Kbd>/wave</Kbd>, <Kbd>/laugh</Kbd>...) además de <Kbd>{"/emote <nombre>"}</Kbd>.</p>
      <YamlBuilder title="Constructor visual: Emote" folder="emotes" fields={emoteFields} />

      <SectionHeading id="gui">GUI: navegador y editor para los 4 tipos de contenido</SectionHeading>
      <p>
        <Kbd>{"/chatadmin browser [channel|language|role|emote]"}</Kbd> (por defecto <code>channel</code>) abre un
        navegador con botón "Crear nuevo" para cada uno de los 4 tipos de esta página. <Kbd>{"/chatadmin editor <canal>"}</Kbd>{" "}
        abre el editor de un canal existente directamente (sin pasar por el navegador) — no hay atajo equivalente
        para language/role/emote, esos siempre se editan desde su navegador.
      </p>

      <SectionHeading id="comandos-jugador">Comandos de jugador</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/channel <join|leave|list|switch|info> [canal]"}</Td><Td>Gestiona tus canales (alias <Kbd>/ch</Kbd>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/w <jugador> <mensaje>"}</Td><Td>Whisper privado.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/r <mensaje>"}</Td><Td>Responde al último whisper recibido.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/ignore <player|guild|channel> <add|remove|list> [nombre]"}</Td><Td>Ignora jugadores, guilds enteras, o silencia un canal para vos.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/me <acción>"}</Td><Td>Acción narrativa en tercera persona.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/do <descripción>"}</Td><Td>Descripción fuera de personaje (OOC).</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/emote <nombre> [jugador]"}</Td><Td>Ejecuta una emote definida en YAML.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/react <emoji>"}</Td><Td>Reacciona al último mensaje visto en un canal.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/language <list|learn|speak> [idioma]"}</Td><Td>Lista, aprende, o cambia el idioma en el que hablás.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="comandos-admin">Comandos de administrador</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/socialspy"}</Td><Td>Alterna ver los whispers ajenos.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/chatlog <search|export|clear> [canal] [jugador] [fecha]"}</Td><Td>Busca, exporta o borra el historial de chat.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/chatadmin browser [channel|language|role|emote]"}</Td><Td>Abre el navegador gráfico del tipo de contenido indicado.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/chatadmin editor <canal>"}</Td><Td>Abre el editor de un canal existente directamente.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/chatadmin reload</Td><Td>Recarga canales, idiomas, roles y emotes desde disco.</Td></Tr>
        </tbody>
      </Table>
      <p>
        <Kbd>/socialspy</Kbd> y <Kbd>/chatlog</Kbd> requieren <Badge tone="amber">rpgrollchat.socialspy</Badge> /{" "}
        <Badge tone="amber">rpgrollchat.staff</Badge> respectivamente; <Kbd>/chatadmin</Kbd> requiere{" "}
        <Badge tone="amber">rpgrollchat.admin.*</Badge> (todos default: op).
      </p>

      <SectionHeading id="placeholders">Placeholders (PlaceholderAPI)</SectionHeading>
      <p>Expansión <Badge tone="violet">rpgrollchat</Badge>.</p>
      <Table>
        <Thead>
          <Th>Placeholder</Th>
          <Th>Valor</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">%rpgrollchat_channels_count%</Td><Td>Cantidad de canales definidos (único placeholder que no necesita un jugador).</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollchat_active_channel%</Td><Td>Nombre del canal activo del jugador, o <code>-</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollchat_speaking_language%</Td><Td>Idioma en el que está hablando actualmente.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollchat_known_languages_count%</Td><Td>Cantidad de idiomas que conoce.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollchat_ignored_players_count%</Td><Td>Cantidad de jugadores que tiene ignorados.</Td></Tr>
        </tbody>
      </Table>

      <PrevNext current="chat" onNavigate={onNavigate} />
    </>
  );
}
