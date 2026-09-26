import type { Locale } from "../../i18n";

/**
 * Texto de los addons, primera tanda (de menor a mayor): Crates y Chat.
 *
 * Se agrupan de a varios por archivo para no tener 23 archivos de copy casi
 * vacíos; cada tanda nueva agrega su propio archivo (addonsB, addonsC…) en vez
 * de engordar este sin límite.
 *
 * Incluye las etiquetas de los YamlBuilder: son UI de formulario, no YAML, así
 * que se traducen. Las CLAVES que el formulario escribe (`display-name`,
 * `require-key`) no, porque van literales al archivo.
 */

const es = {
  crates: {
    title: "Crates (RPGRoll-Crates)",
    intro:
      "Crates físicos con animación de ruleta y recompensas ponderadas — llave opcional, holograma flotante vía DecentHolograms, y anuncio global para el premio mayor.",
    reqTitle: "Requisitos",
    reqBody:
      "Sin DecentHolograms, los crates funcionan igual (click derecho, ruleta, recompensas) — simplemente no hay ningún texto flotante sobre el bloque.",

    modelTitle: "Tipo de crate vs. ubicación física",
    modelBody:
      "{crate} es la {def} (nombre, llave, recompensas) — no un bloque en el mundo. La ubicación física es un objeto separado ({placed}, gestionado por {cmd}, no cargado desde YAML de contenido). Varios bloques distintos pueden apuntar al mismo {crate} — todos comparten las mismas recompensas, llave y holograma.",
    modelDef: "definición",

    rewardsTitle: "Recompensas ponderadas",
    rewardsBody:
      "Cada {reward} tiene un {weight} — la probabilidad de salir sorteada es {weight} dividido por la suma de todos los weights del crate. No hace falta que sumen 100, pero ayuda a la legibilidad si lo hacen. {announce} anuncia esa recompensa a todo el servidor cuando sale (pensado para el premio mayor).",
    rewardsActions:
      "Cada recompensa ejecuta su propia lista de {actions} al salir sorteada — mismo sistema de acciones simples que otros addons ({types}).",

    yamlTitle: "Ejemplos de archivo YAML",
    refTitle: "Referencia completa: todos los campos en un solo archivo",
    refBody:
      "{file} (incluido en el jar) usa absolutamente todos los campos de una crate y los 4 tipos de acción de recompensa ({types}) en un solo archivo.",

    builderTitle: "Constructor visual: Crate",
    builderDesc:
      "Identidad, llave y holograma. Las recompensas (rewards) son una lista de objetos con sus propias acciones — copia y adaptá las de un ejemplo de arriba, o usá /crate browser para agregarlas de a una.",
    fId: "Id",
    fDisplayName: "Nombre visible",
    fGuiTitle: "Título de la ruleta",
    fRequireKey: "Requiere llave",
    fKey: "Llave",
    fMaterial: "Material",
    fKeyName: "Nombre de la llave",
    fKeyLore: "Lore de la llave",
    fHologram: "Líneas del holograma",
    fHologramHelp: "Requiere DecentHolograms instalado — sin él, estas líneas se ignoran.",

    guiTitle: "GUI: navegador, editor y ruleta",
    guiBody:
      "{browser} abre un navegador con botón “Crear nuevo”. El editor cubre identidad, llave y holograma, más alta/actualización rápida de recompensas por chat ({format}). Al abrir un crate físico (click derecho sobre el bloque registrado), {spin} anima la ruleta y termina en la recompensa sorteada.",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    thWhat: "Qué hace",
    cSetLocation: "Registra el bloque que estás mirando como ubicación física de ese tipo de crate.",
    cRemoveLocation: "Quita el registro del bloque que estás mirando.",
    cGiveKey: "Entrega llaves de ese crate.",
    cList: "Lista los crates definidos y cuántas ubicaciones físicas tiene cada uno.",
    cBrowser: "Abre el navegador gráfico.",
    cReload: "Recarga definiciones y vuelve a crear los hologramas de todas las ubicaciones.",
    cmdNote: "Todos requieren {perm} (default: op) y solo pueden ejecutarse como jugador.",
  },

  chat: {
    title: "Chat (RPGRoll-Chat)",
    intro:
      "Motor de chat modular: canales con distintos alcances (global, proximidad, mundo, guild, equipo, staff), idiomas con ofuscación real, roles cosméticos, formatos dinámicos, whisper, antispam, ignorados, reacciones y logs — todo editable en vivo desde un navegador gráfico.",
    reqTitle: "Requisitos",
    reqBody:
      "Sin RPGRoll-Guilds, los canales con {guild} o {team} simplemente no tienen a quién enrutar el mensaje — no rompen nada, solo quedan sin efecto para ese jugador.",

    channelsTitle: "Canales (ChatChannel)",
    channelsBody:
      "Cada canal define su {scope} (a quién llega el mensaje), formato, permisos de ver/hablar, cooldown y filtros propios. {proximity} usa {distance} en bloques, mismo mundo; {guildTeam} dependen de RPGRoll-Guilds; {staff} llega a cualquiera con el permiso del canal sin importar mundo o distancia.",
    channelsCount: "Hay 9 canales de ejemplo ({list}) cubriendo los 6 {scope} disponibles.",
    channelRefTitle: "Referencia completa: todos los campos en un solo archivo",
    channelRefBody:
      "{file} (incluido en el jar) usa {scope} con {distance}, ambos permisos, cooldown, {joinSound} y {alsoActionBar} — los campos que los dos ejemplos de arriba dejan vacíos.",

    langTitle: "Idiomas",
    langBody:
      "Un jugador que no conoce el idioma en el que se habló ve el mensaje {obfuscated} de verdad (cada carácter reemplazado por {char}), no un simple aviso — tiene que aprenderlo (vía {cmd} u otro addon que lo otorgue) para leerlo. {defaultFor} determina qué razas lo conocen desde el vamos, sin necesidad de aprenderlo.",
    langObfuscated: "ofuscado",

    rolesTitle: "Roles de chat",
    rolesBody:
      "Puramente cosmético: agrega prefijo/sufijo/color al nombre en el chat según el {permission} que el jugador tenga — no otorga ninguna capacidad por sí mismo, y no reemplaza a un plugin de permisos (Vault/LuckPerms siguen siendo quienes deciden qué permisos tiene cada jugador).",
    rolesTip:
      "Un jugador puede calificar para varios roles a la vez (varios permisos) — se muestra el de mayor {priority}. El rol {player} (permiso vacío) actúa como default para todos.",

    emotesTitle: "Emotes",
    emotesBody:
      "{template} se usa cuando la emote se ejecuta sin objetivo ({cmd1}), {targetTemplate} cuando apunta a otro jugador ({cmd2}) — {vars} se reemplazan por los nombres reales. {radius} en 0 significa sin límite de distancia para quién la ve.",
    emotesCount:
      "Hay 5 emotes de ejemplo: {list} — cada una registrada también como comando directo ({cmds}) además de {generic}.",

    guiTitle: "GUI: navegador y editor para los 4 tipos de contenido",
    guiBody:
      "{browser} (por defecto {channel}) abre un navegador con botón “Crear nuevo” para cada uno de los 4 tipos de esta página. {editor} abre el editor de un canal existente directamente (sin pasar por el navegador) — no hay atajo equivalente para language/role/emote, esos siempre se editan desde su navegador.",

    playerCmdTitle: "Comandos de jugador",
    adminCmdTitle: "Comandos de administrador",
    thCommand: "Comando",
    thWhat: "Qué hace",
    pChannel: "Gestiona tus canales (alias {alias}).",
    pWhisper: "Whisper privado.",
    pReply: "Responde al último whisper recibido.",
    pIgnore: "Ignora jugadores, guilds enteras, o silencia un canal para ti.",
    pMe: "Acción narrativa en tercera persona.",
    pDo: "Descripción fuera de personaje (OOC).",
    pEmote: "Ejecuta una emote definida en YAML.",
    pReact: "Reacciona al último mensaje visto en un canal.",
    pLanguage: "Lista, aprende, o cambia el idioma en el que hablas.",
    aSocialSpy: "Alterna ver los whispers ajenos.",
    aChatLog: "Busca, exporta o borra el historial de chat.",
    aBrowser: "Abre el navegador gráfico del tipo de contenido indicado.",
    aEditor: "Abre el editor de un canal existente directamente.",
    aReload: "Recarga canales, idiomas, roles y emotes desde disco.",
    permNote: "{spy} y {log} requieren {p1} / {p2} respectivamente; {admin} requiere {p3}, y {p4} saltea el antispam (todos default: op).",

    phTitle: "Placeholders (PlaceholderAPI)",
    phLead: "Expansión {badge}.",
    thPlaceholder: "Placeholder",
    thValue: "Valor",

    bChannel: "Constructor visual: Channel",
    bLanguage: "Constructor visual: Language",
    bRole: "Constructor visual: Chat Role",
    bEmote: "Constructor visual: Emote",
    fId: "Id",
    fDisplayName: "Nombre visible",
    fIcon: "Ícono (Material)",
    fIconOpt: "Ícono (Material, opcional)",
    fColor: "Color",
    fNameColor: "Color del nombre",
    fPriority: "Prioridad",
    fScope: "Alcance",
    fDistance: "Distancia (solo PROXIMITY)",
    fViewPerm: "Permiso para ver",
    fSpeakPerm: "Permiso para hablar",
    fCooldown: "Cooldown (ms)",
    fFormat: "Formato del mensaje",
    fTextFormat: "Formato de texto",
    fJoinSound: "Sonido al unirse",
    fProfanity: "Filtrar groserías",
    fCaps: "Filtrar mayúsculas",
    fUrls: "Permitir URLs",
    fDefaultJoined: "Unido por defecto",
    fCrossWorld: "Cruza entre mundos",
    fActionBar: "También mostrar en action bar",
    fObfChar: "Carácter de ofuscación",
    fDefaultRaces: "Razas que lo hablan por defecto",
    fPrefix: "Prefijo",
    fSuffix: "Sufijo",
    fPermTrigger: "Permiso que lo activa",
    fTemplate: "Plantilla (sin objetivo)",
    fTargetTemplate: "Plantilla (con objetivo)",
    fRadius: "Radio (0 = sin límite)",
  },
};

export type AddonsACopy = typeof es;

const en: AddonsACopy = {
  crates: {
    title: "Crates (RPGRoll-Crates)",
    intro:
      "Physical crates with a roulette animation and weighted rewards — optional key, floating hologram via DecentHolograms, and a server-wide announcement for the jackpot.",
    reqTitle: "Requirements",
    reqBody:
      "Without DecentHolograms, crates work the same (right click, roulette, rewards) — there is simply no floating text above the block.",

    modelTitle: "Crate type vs. physical location",
    modelBody:
      "{crate} is the {def} (name, key, rewards) — not a block in the world. The physical location is a separate object ({placed}, managed with {cmd}, not loaded from content YAML). Several different blocks can point to the same {crate} — they all share the same rewards, key and hologram.",
    modelDef: "definition",

    rewardsTitle: "Weighted rewards",
    rewardsBody:
      "Each {reward} has a {weight} — the chance of being drawn is {weight} divided by the sum of every weight in the crate. They do not need to add up to 100, but it helps readability if they do. {announce} announces that reward to the whole server when it comes up (meant for the jackpot).",
    rewardsActions:
      "Each reward runs its own list of {actions} when drawn — the same simple action system as other addons ({types}).",

    yamlTitle: "YAML file examples",
    refTitle: "Full reference: every field in a single file",
    refBody:
      "{file} (shipped in the jar) uses absolutely every crate field and all 4 reward action types ({types}) in a single file.",

    builderTitle: "Visual builder: Crate",
    builderDesc:
      "Identity, key and hologram. Rewards are a list of objects with their own actions — copy and adapt one from the examples above, or use /crate browser to add them one at a time.",
    fId: "Id",
    fDisplayName: "Display name",
    fGuiTitle: "Roulette title",
    fRequireKey: "Requires a key",
    fKey: "Key",
    fMaterial: "Material",
    fKeyName: "Key name",
    fKeyLore: "Key lore",
    fHologram: "Hologram lines",
    fHologramHelp: "Requires DecentHolograms installed — without it, these lines are ignored.",

    guiTitle: "GUI: browser, editor and roulette",
    guiBody:
      "{browser} opens a browser with a “Create new” button. The editor covers identity, key and hologram, plus quick reward add/update through chat ({format}). When a physical crate is opened (right click on the registered block), {spin} animates the roulette and lands on the drawn reward.",

    cmdTitle: "Commands",
    thCommand: "Command",
    thWhat: "What it does",
    cSetLocation: "Registers the block you are looking at as a physical location of that crate type.",
    cRemoveLocation: "Removes the registration from the block you are looking at.",
    cGiveKey: "Gives keys for that crate.",
    cList: "Lists the defined crates and how many physical locations each one has.",
    cBrowser: "Opens the graphical browser.",
    cReload: "Reloads definitions and recreates the holograms for every location.",
    cmdNote: "They all require {perm} (default: op) and can only be run as a player.",
  },

  chat: {
    title: "Chat (RPGRoll-Chat)",
    intro:
      "Modular chat engine: channels with different scopes (global, proximity, world, guild, team, staff), languages with real obfuscation, cosmetic roles, dynamic formats, whisper, antispam, ignores, reactions and logs — all editable live from a graphical browser.",
    reqTitle: "Requirements",
    reqBody:
      "Without RPGRoll-Guilds, channels with {guild} or {team} simply have nobody to route the message to — they break nothing, they just have no effect for that player.",

    channelsTitle: "Channels (ChatChannel)",
    channelsBody:
      "Each channel defines its {scope} (who receives the message), format, view/speak permissions, cooldown and its own filters. {proximity} uses {distance} in blocks, same world; {guildTeam} depend on RPGRoll-Guilds; {staff} reaches anyone with the channel permission regardless of world or distance.",
    channelsCount: "There are 9 example channels ({list}) covering the 6 available {scope} values.",
    channelRefTitle: "Full reference: every field in a single file",
    channelRefBody:
      "{file} (shipped in the jar) uses {scope} with {distance}, both permissions, cooldown, {joinSound} and {alsoActionBar} — the fields the two examples above leave empty.",

    langTitle: "Languages",
    langBody:
      "A player who does not know the language being spoken sees the message genuinely {obfuscated} (every character replaced with {char}), not a simple notice — they have to learn it (via {cmd} or another addon that grants it) to read it. {defaultFor} decides which races know it from the start, with no need to learn it.",
    langObfuscated: "obfuscated",

    rolesTitle: "Chat roles",
    rolesBody:
      "Purely cosmetic: it adds a prefix/suffix/colour to the chat name based on the {permission} the player has — it grants no capability by itself, and it does not replace a permissions plugin (Vault/LuckPerms still decide what permissions each player has).",
    rolesTip:
      "A player can qualify for several roles at once (several permissions) — the one with the highest {priority} is shown. The {player} role (empty permission) acts as the default for everyone.",

    emotesTitle: "Emotes",
    emotesBody:
      "{template} is used when the emote runs with no target ({cmd1}), {targetTemplate} when it points at another player ({cmd2}) — {vars} are replaced with the real names. {radius} at 0 means no distance limit on who sees it.",
    emotesCount:
      "There are 5 example emotes: {list} — each one also registered as a direct command ({cmds}) on top of {generic}.",

    guiTitle: "GUI: browser and editor for the 4 content types",
    guiBody:
      "{browser} (defaults to {channel}) opens a browser with a “Create new” button for each of the 4 types on this page. {editor} opens an existing channel's editor directly (skipping the browser) — there is no equivalent shortcut for language/role/emote, those are always edited from their browser.",

    playerCmdTitle: "Player commands",
    adminCmdTitle: "Admin commands",
    thCommand: "Command",
    thWhat: "What it does",
    pChannel: "Manages your channels (alias {alias}).",
    pWhisper: "Private whisper.",
    pReply: "Replies to the last whisper received.",
    pIgnore: "Ignores players, whole guilds, or mutes a channel for you.",
    pMe: "Narrative action in third person.",
    pDo: "Out-of-character description (OOC).",
    pEmote: "Runs an emote defined in YAML.",
    pReact: "Reacts to the last message seen in a channel.",
    pLanguage: "Lists, learns, or changes the language you speak.",
    aSocialSpy: "Toggles seeing other people's whispers.",
    aChatLog: "Searches, exports or clears the chat history.",
    aBrowser: "Opens the graphical browser for the given content type.",
    aEditor: "Opens an existing channel's editor directly.",
    aReload: "Reloads channels, languages, roles and emotes from disk.",
    permNote: "{spy} and {log} require {p1} / {p2} respectively; {admin} requires {p3}, and {p4} skips the anti-spam (all default: op).",

    phTitle: "Placeholders (PlaceholderAPI)",
    phLead: "{badge} expansion.",
    thPlaceholder: "Placeholder",
    thValue: "Value",

    bChannel: "Visual builder: Channel",
    bLanguage: "Visual builder: Language",
    bRole: "Visual builder: Chat Role",
    bEmote: "Visual builder: Emote",
    fId: "Id",
    fDisplayName: "Display name",
    fIcon: "Icon (Material)",
    fIconOpt: "Icon (Material, optional)",
    fColor: "Colour",
    fNameColor: "Name colour",
    fPriority: "Priority",
    fScope: "Scope",
    fDistance: "Distance (PROXIMITY only)",
    fViewPerm: "View permission",
    fSpeakPerm: "Speak permission",
    fCooldown: "Cooldown (ms)",
    fFormat: "Message format",
    fTextFormat: "Text format",
    fJoinSound: "Join sound",
    fProfanity: "Filter profanity",
    fCaps: "Filter caps",
    fUrls: "Allow URLs",
    fDefaultJoined: "Joined by default",
    fCrossWorld: "Crosses worlds",
    fActionBar: "Also show in action bar",
    fObfChar: "Obfuscation character",
    fDefaultRaces: "Races that speak it by default",
    fPrefix: "Prefix",
    fSuffix: "Suffix",
    fPermTrigger: "Permission that enables it",
    fTemplate: "Template (no target)",
    fTargetTemplate: "Template (with target)",
    fRadius: "Radius (0 = no limit)",
  },
};

const pt: AddonsACopy = {
  crates: {
    title: "Crates (RPGRoll-Crates)",
    intro:
      "Crates físicos com animação de roleta e recompensas ponderadas — chave opcional, holograma flutuante via DecentHolograms, e anúncio global para o prêmio maior.",
    reqTitle: "Requisitos",
    reqBody:
      "Sem o DecentHolograms, os crates funcionam igual (clique direito, roleta, recompensas) — simplesmente não há nenhum texto flutuante sobre o bloco.",

    modelTitle: "Tipo de crate vs. localização física",
    modelBody:
      "{crate} é a {def} (nome, chave, recompensas) — não um bloco no mundo. A localização física é um objeto separado ({placed}, gerenciado por {cmd}, não carregado de YAML de conteúdo). Vários blocos diferentes podem apontar para o mesmo {crate} — todos compartilham as mesmas recompensas, chave e holograma.",
    modelDef: "definição",

    rewardsTitle: "Recompensas ponderadas",
    rewardsBody:
      "Cada {reward} tem um {weight} — a probabilidade de ser sorteada é {weight} dividido pela soma de todos os weights do crate. Não precisam somar 100, mas ajuda na legibilidade se somarem. {announce} anuncia essa recompensa para todo o servidor quando sai (pensado para o prêmio maior).",
    rewardsActions:
      "Cada recompensa executa a sua própria lista de {actions} ao ser sorteada — mesmo sistema de ações simples de outros addons ({types}).",

    yamlTitle: "Exemplos de arquivo YAML",
    refTitle: "Referência completa: todos os campos num só arquivo",
    refBody:
      "{file} (incluído no jar) usa absolutamente todos os campos de um crate e os 4 tipos de ação de recompensa ({types}) num único arquivo.",

    builderTitle: "Construtor visual: Crate",
    builderDesc:
      "Identidade, chave e holograma. As recompensas (rewards) são uma lista de objetos com as suas próprias ações — copie e adapte as de um exemplo acima, ou use /crate browser para adicioná-las uma a uma.",
    fId: "Id",
    fDisplayName: "Nome visível",
    fGuiTitle: "Título da roleta",
    fRequireKey: "Exige chave",
    fKey: "Chave",
    fMaterial: "Material",
    fKeyName: "Nome da chave",
    fKeyLore: "Lore da chave",
    fHologram: "Linhas do holograma",
    fHologramHelp: "Requer o DecentHolograms instalado — sem ele, estas linhas são ignoradas.",

    guiTitle: "GUI: navegador, editor e roleta",
    guiBody:
      "{browser} abre um navegador com botão “Criar novo”. O editor cobre identidade, chave e holograma, mais inclusão/atualização rápida de recompensas pelo chat ({format}). Ao abrir um crate físico (clique direito sobre o bloco registrado), {spin} anima a roleta e termina na recompensa sorteada.",

    cmdTitle: "Comandos",
    thCommand: "Comando",
    thWhat: "O que faz",
    cSetLocation: "Registra o bloco que você está olhando como localização física desse tipo de crate.",
    cRemoveLocation: "Remove o registro do bloco que você está olhando.",
    cGiveKey: "Entrega chaves desse crate.",
    cList: "Lista os crates definidos e quantas localizações físicas cada um tem.",
    cBrowser: "Abre o navegador gráfico.",
    cReload: "Recarrega definições e recria os hologramas de todas as localizações.",
    cmdNote: "Todos exigem {perm} (default: op) e só podem ser executados como jogador.",
  },

  chat: {
    title: "Chat (RPGRoll-Chat)",
    intro:
      "Motor de chat modular: canais com alcances diferentes (global, proximidade, mundo, guilda, time, staff), idiomas com ofuscação real, papéis cosméticos, formatos dinâmicos, whisper, antispam, ignorados, reações e logs — tudo editável ao vivo por um navegador gráfico.",
    reqTitle: "Requisitos",
    reqBody:
      "Sem o RPGRoll-Guilds, os canais com {guild} ou {team} simplesmente não têm para quem rotear a mensagem — não quebram nada, só ficam sem efeito para aquele jogador.",

    channelsTitle: "Canais (ChatChannel)",
    channelsBody:
      "Cada canal define o seu {scope} (a quem chega a mensagem), formato, permissões de ver/falar, cooldown e filtros próprios. {proximity} usa {distance} em blocos, mesmo mundo; {guildTeam} dependem do RPGRoll-Guilds; {staff} chega a qualquer um com a permissão do canal, independente de mundo ou distância.",
    channelsCount: "Há 9 canais de exemplo ({list}) cobrindo os 6 {scope} disponíveis.",
    channelRefTitle: "Referência completa: todos os campos num só arquivo",
    channelRefBody:
      "{file} (incluído no jar) usa {scope} com {distance}, ambas as permissões, cooldown, {joinSound} e {alsoActionBar} — os campos que os dois exemplos acima deixam vazios.",

    langTitle: "Idiomas",
    langBody:
      "Um jogador que não conhece o idioma falado vê a mensagem realmente {obfuscated} (cada caractere substituído por {char}), não um simples aviso — ele tem de aprendê-lo (via {cmd} ou outro addon que o conceda) para lê-lo. {defaultFor} determina quais raças o conhecem de saída, sem precisar aprender.",
    langObfuscated: "ofuscada",

    rolesTitle: "Papéis de chat",
    rolesBody:
      "Puramente cosmético: adiciona prefixo/sufixo/cor ao nome no chat conforme a {permission} que o jogador tenha — não concede nenhuma capacidade por si só, e não substitui um plugin de permissões (Vault/LuckPerms continuam decidindo quais permissões cada jogador tem).",
    rolesTip:
      "Um jogador pode se qualificar para vários papéis ao mesmo tempo (várias permissões) — mostra-se o de maior {priority}. O papel {player} (permissão vazia) atua como padrão para todos.",

    emotesTitle: "Emotes",
    emotesBody:
      "{template} é usado quando a emote roda sem alvo ({cmd1}), {targetTemplate} quando aponta para outro jogador ({cmd2}) — {vars} são substituídos pelos nomes reais. {radius} em 0 significa sem limite de distância para quem a vê.",
    emotesCount:
      "Há 5 emotes de exemplo: {list} — cada uma registrada também como comando direto ({cmds}) além de {generic}.",

    guiTitle: "GUI: navegador e editor para os 4 tipos de conteúdo",
    guiBody:
      "{browser} (por padrão {channel}) abre um navegador com botão “Criar novo” para cada um dos 4 tipos desta página. {editor} abre o editor de um canal existente diretamente (sem passar pelo navegador) — não há atalho equivalente para language/role/emote, esses sempre se editam a partir do seu navegador.",

    playerCmdTitle: "Comandos de jogador",
    adminCmdTitle: "Comandos de administrador",
    thCommand: "Comando",
    thWhat: "O que faz",
    pChannel: "Gerencia os seus canais (alias {alias}).",
    pWhisper: "Whisper privado.",
    pReply: "Responde ao último whisper recebido.",
    pIgnore: "Ignora jogadores, guildas inteiras, ou silencia um canal para você.",
    pMe: "Ação narrativa em terceira pessoa.",
    pDo: "Descrição fora de personagem (OOC).",
    pEmote: "Executa uma emote definida em YAML.",
    pReact: "Reage à última mensagem vista num canal.",
    pLanguage: "Lista, aprende, ou muda o idioma em que você fala.",
    aSocialSpy: "Alterna ver os whispers alheios.",
    aChatLog: "Busca, exporta ou apaga o histórico de chat.",
    aBrowser: "Abre o navegador gráfico do tipo de conteúdo indicado.",
    aEditor: "Abre o editor de um canal existente diretamente.",
    aReload: "Recarrega canais, idiomas, papéis e emotes do disco.",
    permNote: "{spy} e {log} exigem {p1} / {p2} respectivamente; {admin} exige {p3}, e {p4} ignora o antispam (todos default: op).",

    phTitle: "Placeholders (PlaceholderAPI)",
    phLead: "Expansão {badge}.",
    thPlaceholder: "Placeholder",
    thValue: "Valor",

    bChannel: "Construtor visual: Channel",
    bLanguage: "Construtor visual: Language",
    bRole: "Construtor visual: Chat Role",
    bEmote: "Construtor visual: Emote",
    fId: "Id",
    fDisplayName: "Nome visível",
    fIcon: "Ícone (Material)",
    fIconOpt: "Ícone (Material, opcional)",
    fColor: "Cor",
    fNameColor: "Cor do nome",
    fPriority: "Prioridade",
    fScope: "Alcance",
    fDistance: "Distância (só PROXIMITY)",
    fViewPerm: "Permissão para ver",
    fSpeakPerm: "Permissão para falar",
    fCooldown: "Cooldown (ms)",
    fFormat: "Formato da mensagem",
    fTextFormat: "Formato de texto",
    fJoinSound: "Som ao entrar",
    fProfanity: "Filtrar palavrões",
    fCaps: "Filtrar maiúsculas",
    fUrls: "Permitir URLs",
    fDefaultJoined: "Conectado por padrão",
    fCrossWorld: "Cruza entre mundos",
    fActionBar: "Também mostrar na action bar",
    fObfChar: "Caractere de ofuscação",
    fDefaultRaces: "Raças que o falam por padrão",
    fPrefix: "Prefixo",
    fSuffix: "Sufixo",
    fPermTrigger: "Permissão que o ativa",
    fTemplate: "Modelo (sem alvo)",
    fTargetTemplate: "Modelo (com alvo)",
    fRadius: "Raio (0 = sem limite)",
  },
};

export const ADDONS_A_COPY: Record<Locale, AddonsACopy> = { es, en, pt };
