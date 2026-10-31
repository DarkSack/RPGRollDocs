import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-TAB. */

const es = {
  title: "RPGRoll-TAB",
  intro:
    "Personalización avanzada de TabList, Scoreboard, Nametags, BelowName y BossBars. El addon más grande del ecosistema — no tiene ni una línea de lógica de RPG hardcodeada: todo lo que muestra sobre nivel, clase, guild, job, etc. le llega vía {ph} registrado por el addon dueño de esa información.",

  reqTitle: "Requisitos",
  reqBody:
    "Funciona completo sin ProtocolLib (header/footer, sorting, teams, nametag multi-línea, belowname, sidebar, bossbars — todo vía API nativa de Paper/Adventure). Con ProtocolLib instalado se suma el control de visibilidad del tablist {indep} de la visibilidad real de la entidad (playerlist por mundo a nivel de entradas, no solo de header/footer). Sin PlaceholderAPI, los placeholders internos ({internals}) y los que registre cualquier addon vía la API pública siguen funcionando — solo se pierde el puente a expansiones {ext} ya existentes de PlaceholderAPI.",
  indepWord: "independiente",

  philTitle: "Filosofía: cero lógica de RPG hardcodeada",
  philBody:
    "RPGRoll-TAB no sabe qué es una “guild” ni un “job”. Todo concepto específico de otro addon se expresa como un placeholder: internos vía {registry} (registro Java directo, funciona sin PlaceholderAPI), o externos vía el puente automático a expansiones de PlaceholderAPI ya existentes (Economy, Ascension, Mobs...). El único lugar donde esto se nota en el YAML es el Context Engine: las condiciones “nativas” ({native}) se resuelven directo contra Bukkit; todo lo demás — guild, party, dungeon, quest, región, combate — se expresa como condición {generic} genérica.",

  archTitle: "Arquitectura",
  archBody:
    "Cada jugador online tiene su propio {scoreboard} individual (Bukkit no permite más de uno activo por jugador a la vez, y ese único objeto determina tanto los colores de nametag que ve —vía Teams— como su sidebar/belowname). Los Teams de {all} los jugadores se espejan en el tablero de cada viewer para que nadie pierda los colores de nametag del resto solo por tener su propio sidebar.",
  allWord: "todos",
  thElement: "Elemento",
  thMechanism: "Mecanismo",
  thNeedsPL: "Requiere ProtocolLib",
  noWord: "No",
  yesWord: "Sí",
  elHeaderFooter: "Header/Footer",
  elTabName: "Nombre en el tablist",
  elOrder: "Orden visual + prefix/suffix/color",
  mOrder: "Team por jugador, nombre del Team codifica el rango (truco estándar de sorting)",
  elMultiline: "Nametag multi-línea",
  mMultiline: "Entidades {display} montadas como pasajero, con offset por {transform}",
  elStaffTag: "Nametag distinto para staff",
  mStaffTag: "{api} por viewer",
  elBelowName: "BelowName",
  mBelowName: "{slot} en el tablero individual",
  elLongLines: "Sidebar con líneas largas",
  mLongLines: "Entradas invisibles ({range}) + Team prefix/suffix por línea",
  elBossBars: "BossBars múltiples",
  mBossBars: "Adventure {bossbar} nativo, uno por definición mostrado simultáneamente",
  elVisibility: "Visibilidad del tablist por-viewer",
  mVisibility:
    "Flag {flag} del paquete {packet} — separa “aparece en la lista” de “existe en el mundo”",

  layoutTitle: "Sobre 'Layout' y columnas",
  layoutBody:
    "El cliente vanilla decide por su cuenta en cuántas columnas mostrar el tablist (según cantidad de jugadores y tamaño de ventana) — {noForce}, es puramente client-side. Lo que sí es 100% controlable es el {order} (Sorting + Teams) y agrupar visualmente por rango — los “layouts predefinidos” (classic/ranked/guild/dungeon/...) son presets de Sorting + Teams, no una grilla arbitraria.",
  noForceWord: "ningún plugin de servidor puede forzar un número de columnas distinto",
  orderWord: "orden",

  ctxTitle: "Context Engine y resolución de perfil",
  ctxBody:
    "En cada evento relevante (join, cambio de mundo, comando admin, o cualquier addon llamando a {refresh}) se recorren los contextos de mayor a menor {priority} y se aplica el primero cuyas condiciones se cumplan TODAS. Un contexto puede reemplazar el {profile} completo ({profileDungeon}) o solo una parte (dejar {profileField} vacío y poner, por ejemplo, solo {sbCombat} para cambiar únicamente el sidebar durante combate, conservando tablist/nametag/belowname del perfil base). Nunca se re-evalúa por tick — solo cuando algo pudo haber cambiado el resultado.",

  profilesTitle: "Profiles",
  profilesBody:
    "Un {profile} agrupa referencias por id a cada sub-configuración. {mustExist} — es el fallback final si ningún contexto matchea.",
  mustExistWord: "Siempre debe existir un perfil con id {d}",

  bProfile: "Constructor visual: Profile",
  bProfileDesc:
    "Cada campo es el id de una definición del tipo correspondiente — déjalo vacío para no aplicar nada de ese tipo.",

  contextsTitle: "Contexts",
  bContext: "Constructor visual: Context",
  bContextDesc:
    "Las condiciones (conditions) no están en este formulario simplificado — copia y adapta el ejemplo de arriba, o usa el Diseñador de TAB de abajo.",

  tablistTitle: "TabList: header, footer y playerlist",
  tablistBody:
    "{anims} referencian una {animDef} (frames que ciclan cada {interval} ticks) — si se omiten, {lines} se muestra estático. {playerFormat} resuelve {prefixSuffix} desde el Team activo, {pingFmt} desde los tramos de {ping}, y {gmFmt} si {gmEnabled}.",
  animBody:
    "Además de {frame}: {scroll} (ventana deslizante sobre un {text} largo, precalculada a frames en el parseo) y {blink} (alterna {textEmpty}). El header/footer animado se re-renderiza cada 10 ticks vía un scheduler dedicado y liviano — nunca recalcula sorting/teams en esa pasada, eso sigue siendo estrictamente event-driven.",

  sortingTitle: "Sorting",
  sortingBody:
    "Forma corta ({priority}): una palabra por línea. {natives} son nativos; cualquier otra palabra se interpreta como el nombre de un placeholder ya registrado por otro addon. Forma explícita ({rules}): mismo resultado, pero permite {values} (lista de permisos ordenada) para {permission}, y {numeric} para comparar placeholders como número en vez de texto.",

  teamsTitle: "Teams y Nametag",
  staffTitle: "¿Por qué solo un override de 'staff' y no 'mismo guild'?",
  staffBody:
    "“¿Tiene el viewer permiso X?” se resuelve sin conocer a ningún otro addon. “¿Están el viewer y el subject en la misma guild?” es una relación entre DOS jugadores — no algo que un placeholder de un solo jugador pueda expresar. Para ese caso, el addon dueño de esa relación (ej. RPGRoll-Guilds) puede llamar directamente a {engine} vía la API pública.",

  belowTitle: "BelowName",
  belowBody:
    "Limitación de Minecraft, no del addon: solo se puede mostrar un {number} debajo del nombre. {score} debe resolver a algo numérico, {label} es el texto/ícono que aparece junto al número.",
  numberWord: "número",

  sbTitle: "Scoreboard (sidebar)",
  sbBody:
    "Cada línea es {lineShape} — {condition} es opcional (soporta {ops}, compara numérico si ambos lados parsean como número). {extends} implementan templates reutilizables: el hijo hereda {inherited} del padre y reemplaza placeholders literales del padre por sus propios valores.",
  sbMultiBody:
    "Varios scoreboards pueden coexistir (default/combat/dungeon/boss/...) — el Context Engine decide cuál está activo vía {profileSb} o un override parcial de contexto; {priority} entra en juego cuando la resolución de contexto es ambigua.",

  bossTitle: "BossBars",
  bossBody:
    "No está activado por defecto (ningún perfil ni contexto lo referencia todavía) — sirve de plantilla. Un jugador puede tener varias bossbars simultáneas si distintas fuentes (perfil + API de otro addon) las muestran a la vez; cada una se identifica por su id y se puede ocultar individualmente.",

  apiTitle: "API pública",
  eventsIntro: "Eventos disponibles (todos en {pkg}):",
  thEvent: "Evento",
  thWhen: "Cuándo",
  evProfile: "El perfil activo de un jugador cambió.",
  evScoreboard: "El sidebar activo cambió.",
  evNametag: "Se re-renderizó el nametag de un jugador.",
  evVisibility: "Cancelable — antes de mostrar/ocultar a alguien en un tablist ajeno.",
  evPlaceholder: "Informativo — un placeholder desconocido (ni interno ni registrado).",
  evLayout: "Cambió el layout/orden aplicado.",
  evBossBar: "Se mostró/ocultó una bossbar.",

  cmdTitle: "Comandos",
  thCommand: "Comando",
  thWhat: "Qué hace",
  xReload: "Recarga todo el contenido YAML (9 tipos) y refresca a todos los jugadores online.",
  xList: "Lista los perfiles definidos.",
  xProfile: "Fuerza un perfil específico, ignorando el Context Engine hasta el próximo refresh real.",
  permNote: "Todos requieren {perm} (default: op), y funcionan desde consola.",

  designerTitle: "Arma todo esto visualmente: Diseñador de TAB",
  designerBody:
    "En vez de escribir a mano los 10 tipos de archivo de arriba, usa el {link} — una herramienta en el navegador que arma perfiles, contextos, scoreboards, tablists, nametags, belowname, bossbars, sorting, teams y animaciones con formularios, y te da el YAML exacto que lee cada {parser} listo para copiar o descargar. No reemplaza ningún editor in-game (no existe uno para TAB) — es la forma recomendada de armar el contenido sin memorizar el schema de cada archivo.",
  designerLink: "Diseñador de TAB",

  pfId: "Id",
  pfTablist: "Tablist (header/footer/playerlist)",
  pfScoreboard: "Scoreboard (sidebar)",
  pfNametag: "Nametag (multi-línea)",
  pfBelowname: "BelowName",
  pfTeams: "Teams (prefix/suffix/color)",
  pfSorting: "Sorting",
  pfBossbar: "BossBar (opcional)",
  pfLayout: "Layout preset (opcional)",

  cfId: "Id",
  cfPriority: "Prioridad (gana el número más alto)",
  cfProfile: "Perfil completo a aplicar (opcional)",
  cfTablist: "Override: solo tablist (opcional)",
  cfScoreboard: "Override: solo scoreboard (opcional)",
  cfNametag: "Override: solo nametag (opcional)",
  cfBossbar: "Override: solo bossbar (opcional)",
};

export type TabCopy = typeof es;

const en: TabCopy = {
  title: "RPGRoll-TAB",
  intro:
    "Advanced customization of TabList, Scoreboard, Nametags, BelowName and BossBars. The largest addon in the ecosystem — it has not a single line of hardcoded RPG logic: everything it shows about level, class, guild, job, etc. reaches it via a {ph} registered by the addon that owns that information.",

  reqTitle: "Requirements",
  reqBody:
    "It works fully without ProtocolLib (header/footer, sorting, teams, multi-line nametag, belowname, sidebar, bossbars — all through Paper/Adventure's native API). With ProtocolLib installed you additionally get tablist visibility control {indep} of the entity's real visibility (per-world playerlist at the entry level, not just header/footer). Without PlaceholderAPI, the internal placeholders ({internals}) and any registered by an addon through the public API keep working — you only lose the bridge to existing PlaceholderAPI {ext} expansions.",
  indepWord: "independent",

  philTitle: "Philosophy: zero hardcoded RPG logic",
  philBody:
    "RPGRoll-TAB does not know what a “guild” or a “job” is. Every concept specific to another addon is expressed as a placeholder: internal ones via {registry} (a direct Java registry, works without PlaceholderAPI), or external ones via the automatic bridge to existing PlaceholderAPI expansions (Economy, Ascension, Mobs...). The only place this shows up in the YAML is the Context Engine: the “native” conditions ({native}) resolve directly against Bukkit; everything else — guild, party, dungeon, quest, region, combat — is expressed as a generic {generic} condition.",

  archTitle: "Architecture",
  archBody:
    "Every online player has their own individual {scoreboard} (Bukkit does not allow more than one active per player at a time, and that single object determines both the nametag colors they see —via Teams— and their sidebar/belowname). The Teams of {all} players are mirrored onto each viewer's board so nobody loses everyone else's nametag colors just by having their own sidebar.",
  allWord: "all",
  thElement: "Element",
  thMechanism: "Mechanism",
  thNeedsPL: "Needs ProtocolLib",
  noWord: "No",
  yesWord: "Yes",
  elHeaderFooter: "Header/Footer",
  elTabName: "Name in the tablist",
  elOrder: "Visual order + prefix/suffix/color",
  mOrder: "One Team per player, the Team's name encodes the rank (the standard sorting trick)",
  elMultiline: "Multi-line nametag",
  mMultiline: "{display} entities mounted as passengers, offset via {transform}",
  elStaffTag: "A different nametag for staff",
  mStaffTag: "{api}, per viewer",
  elBelowName: "BelowName",
  mBelowName: "{slot} on the individual board",
  elLongLines: "Sidebar with long lines",
  mLongLines: "Invisible entries ({range}) + per-line Team prefix/suffix",
  elBossBars: "Multiple BossBars",
  mBossBars: "Native Adventure {bossbar}, one per definition shown simultaneously",
  elVisibility: "Per-viewer tablist visibility",
  mVisibility:
    "The {packet} packet's {flag} flag — it separates “appears in the list” from “exists in the world”",

  layoutTitle: "About 'Layout' and columns",
  layoutBody:
    "The vanilla client decides on its own how many columns to show the tablist in (based on player count and window size) — {noForce}, it is purely client-side. What is 100% controllable is the {order} (Sorting + Teams) and grouping visually by rank — the “predefined layouts” (classic/ranked/guild/dungeon/...) are Sorting + Teams presets, not an arbitrary grid.",
  noForceWord: "no server plugin can force a different column count",
  orderWord: "order",

  ctxTitle: "Context Engine and profile resolution",
  ctxBody:
    "On every relevant event (join, world change, admin command, or any addon calling {refresh}) the contexts are walked from highest to lowest {priority} and the first one whose conditions ALL hold is applied. A context can replace the whole {profile} ({profileDungeon}) or only a part of it (leave {profileField} empty and set, for example, just {sbCombat} to change only the sidebar during combat, keeping the base profile's tablist/nametag/belowname). It is never re-evaluated per tick — only when something could have changed the result.",

  profilesTitle: "Profiles",
  profilesBody:
    "A {profile} groups id references to each sub-configuration. {mustExist} — it is the final fallback if no context matches.",
  mustExistWord: "There must always be a profile with id {d}",

  bProfile: "Visual builder: Profile",
  bProfileDesc:
    "Each field is the id of a definition of the matching type — leave it empty to apply nothing of that type.",

  contextsTitle: "Contexts",
  bContext: "Visual builder: Context",
  bContextDesc:
    "The conditions are not in this simplified form — copy and adapt the example above, or use the TAB Designer below.",

  tablistTitle: "TabList: header, footer and playerlist",
  tablistBody:
    "{anims} reference an {animDef} (frames cycling every {interval} ticks) — if omitted, {lines} is shown statically. {playerFormat} resolves {prefixSuffix} from the active Team, {pingFmt} from the {ping} brackets, and {gmFmt} if {gmEnabled}.",
  animBody:
    "Besides {frame}: {scroll} (a sliding window over a long {text}, precomputed into frames at parse time) and {blink} (alternates {textEmpty}). The animated header/footer re-renders every 10 ticks via a dedicated, lightweight scheduler — it never recomputes sorting/teams in that pass, which stays strictly event-driven.",

  sortingTitle: "Sorting",
  sortingBody:
    "Short form ({priority}): one word per line. {natives} are native; any other word is read as the name of a placeholder already registered by another addon. Explicit form ({rules}): same result, but it allows {values} (an ordered permission list) for {permission}, and {numeric} to compare placeholders as a number instead of text.",

  teamsTitle: "Teams and Nametag",
  staffTitle: "Why only a 'staff' override and not 'same guild'?",
  staffBody:
    "“Does the viewer have permission X?” resolves without knowing about any other addon. “Are the viewer and the subject in the same guild?” is a relationship between TWO players — not something a single-player placeholder can express. For that case, the addon that owns the relationship (e.g. RPGRoll-Guilds) can call {engine} directly through the public API.",

  belowTitle: "BelowName",
  belowBody:
    "A Minecraft limitation, not the addon's: only a {number} can be shown below the name. {score} must resolve to something numeric, {label} is the text/icon that appears next to the number.",
  numberWord: "number",

  sbTitle: "Scoreboard (sidebar)",
  sbBody:
    "Each line is {lineShape} — {condition} is optional (it supports {ops}, comparing numerically if both sides parse as numbers). {extends} implement reusable templates: the child inherits {inherited} from the parent and replaces the parent's literal placeholders with its own values.",
  sbMultiBody:
    "Several scoreboards can coexist (default/combat/dungeon/boss/...) — the Context Engine decides which is active via {profileSb} or a partial context override; {priority} comes into play when context resolution is ambiguous.",

  bossTitle: "BossBars",
  bossBody:
    "It is not enabled by default (no profile or context references it yet) — it serves as a template. A player can have several simultaneous bossbars if different sources (a profile + another addon's API) show them at once; each is identified by its id and can be hidden individually.",

  apiTitle: "Public API",
  eventsIntro: "Available events (all in {pkg}):",
  thEvent: "Event",
  thWhen: "When",
  evProfile: "A player's active profile changed.",
  evScoreboard: "The active sidebar changed.",
  evNametag: "A player's nametag was re-rendered.",
  evVisibility: "Cancellable — before showing/hiding someone in another player's tablist.",
  evPlaceholder: "Informational — an unknown placeholder (neither internal nor registered).",
  evLayout: "The applied layout/order changed.",
  evBossBar: "A bossbar was shown/hidden.",

  cmdTitle: "Commands",
  thCommand: "Command",
  thWhat: "What it does",
  xReload: "Reloads all the YAML content (9 types) and refreshes every online player.",
  xList: "Lists the defined profiles.",
  xProfile: "Forces a specific profile, ignoring the Context Engine until the next real refresh.",
  permNote: "All of them require {perm} (default: op), and work from the console.",

  designerTitle: "Build all of this visually: the TAB Designer",
  designerBody:
    "Instead of hand-writing the 10 file types above, use the {link} — a browser tool that builds profiles, contexts, scoreboards, tablists, nametags, belowname, bossbars, sorting, teams and animations with forms, and gives you the exact YAML each {parser} reads, ready to copy or download. It does not replace any in-game editor (there is none for TAB) — it is the recommended way to build the content without memorizing each file's schema.",
  designerLink: "TAB Designer",

  pfId: "Id",
  pfTablist: "Tablist (header/footer/playerlist)",
  pfScoreboard: "Scoreboard (sidebar)",
  pfNametag: "Nametag (multi-line)",
  pfBelowname: "BelowName",
  pfTeams: "Teams (prefix/suffix/color)",
  pfSorting: "Sorting",
  pfBossbar: "BossBar (optional)",
  pfLayout: "Layout preset (optional)",

  cfId: "Id",
  cfPriority: "Priority (the highest number wins)",
  cfProfile: "Full profile to apply (optional)",
  cfTablist: "Override: tablist only (optional)",
  cfScoreboard: "Override: scoreboard only (optional)",
  cfNametag: "Override: nametag only (optional)",
  cfBossbar: "Override: bossbar only (optional)",
};

const pt: TabCopy = {
  title: "RPGRoll-TAB",
  intro:
    "Personalização avançada de TabList, Scoreboard, Nametags, BelowName e BossBars. O addon mais grande do ecossistema — não tem uma única linha de lógica de RPG fixada no código: tudo o que mostra sobre nível, classe, guilda, job, etc. chega até ele via {ph} registrado pelo addon dono daquela informação.",

  reqTitle: "Requisitos",
  reqBody:
    "Funciona completo sem ProtocolLib (header/footer, sorting, teams, nametag multilinha, belowname, sidebar, bossbars — tudo pela API nativa do Paper/Adventure). Com o ProtocolLib instalado soma-se o controle de visibilidade do tablist {indep} da visibilidade real da entidade (playerlist por mundo no nível das entradas, não só de header/footer). Sem o PlaceholderAPI, os placeholders internos ({internals}) e os que qualquer addon registre pela API pública continuam funcionando — só se perde a ponte para expansões {ext} já existentes do PlaceholderAPI.",
  indepWord: "independente",

  philTitle: "Filosofia: zero lógica de RPG fixada no código",
  philBody:
    "O RPGRoll-TAB não sabe o que é uma “guilda” nem um “job”. Todo conceito específico de outro addon é expresso como um placeholder: internos via {registry} (registro Java direto, funciona sem PlaceholderAPI), ou externos via a ponte automática para expansões do PlaceholderAPI já existentes (Economy, Ascension, Mobs...). O único lugar onde isso aparece no YAML é o Context Engine: as condições “nativas” ({native}) se resolvem direto contra o Bukkit; todo o resto — guilda, party, dungeon, quest, região, combate — é expresso como condição {generic} genérica.",

  archTitle: "Arquitetura",
  archBody:
    "Cada jogador online tem o seu próprio {scoreboard} individual (o Bukkit não permite mais de um ativo por jogador ao mesmo tempo, e esse único objeto determina tanto as cores de nametag que ele vê —via Teams— como o seu sidebar/belowname). Os Teams de {all} os jogadores são espelhados no quadro de cada viewer para que ninguém perca as cores de nametag dos outros só por ter o seu próprio sidebar.",
  allWord: "todos",
  thElement: "Elemento",
  thMechanism: "Mecanismo",
  thNeedsPL: "Exige ProtocolLib",
  noWord: "Não",
  yesWord: "Sim",
  elHeaderFooter: "Header/Footer",
  elTabName: "Nome no tablist",
  elOrder: "Ordem visual + prefix/suffix/cor",
  mOrder: "Um Team por jogador, o nome do Team codifica o rank (truque padrão de sorting)",
  elMultiline: "Nametag multilinha",
  mMultiline: "Entidades {display} montadas como passageiro, com offset por {transform}",
  elStaffTag: "Nametag diferente para staff",
  mStaffTag: "{api} por viewer",
  elBelowName: "BelowName",
  mBelowName: "{slot} no quadro individual",
  elLongLines: "Sidebar com linhas longas",
  mLongLines: "Entradas invisíveis ({range}) + Team prefix/suffix por linha",
  elBossBars: "BossBars múltiplas",
  mBossBars: "{bossbar} nativo do Adventure, um por definição mostrado simultaneamente",
  elVisibility: "Visibilidade do tablist por viewer",
  mVisibility:
    "Flag {flag} do pacote {packet} — separa “aparece na lista” de “existe no mundo”",

  layoutTitle: "Sobre 'Layout' e colunas",
  layoutBody:
    "O cliente vanilla decide por conta própria em quantas colunas mostrar o tablist (conforme a quantidade de jogadores e o tamanho da janela) — {noForce}, é puramente client-side. O que é 100% controlável é a {order} (Sorting + Teams) e agrupar visualmente por rank — os “layouts predefinidos” (classic/ranked/guild/dungeon/...) são presets de Sorting + Teams, não uma grade arbitrária.",
  noForceWord: "nenhum plugin de servidor pode forçar um número de colunas diferente",
  orderWord: "ordem",

  ctxTitle: "Context Engine e resolução de perfil",
  ctxBody:
    "Em cada evento relevante (join, troca de mundo, comando admin, ou qualquer addon chamando {refresh}) os contextos são percorridos do maior para o menor {priority} e o primeiro cujas condições se cumpram TODAS é aplicado. Um contexto pode substituir o {profile} completo ({profileDungeon}) ou só uma parte (deixar {profileField} vazio e colocar, por exemplo, só {sbCombat} para mudar unicamente o sidebar durante o combate, conservando tablist/nametag/belowname do perfil base). Nunca é reavaliado por tick — só quando algo pode ter mudado o resultado.",

  profilesTitle: "Profiles",
  profilesBody:
    "Um {profile} agrupa referências por id a cada subconfiguração. {mustExist} — é o fallback final se nenhum contexto casar.",
  mustExistWord: "Sempre deve existir um perfil com id {d}",

  bProfile: "Construtor visual: Profile",
  bProfileDesc:
    "Cada campo é o id de uma definição do tipo correspondente — deixe vazio para não aplicar nada desse tipo.",

  contextsTitle: "Contexts",
  bContext: "Construtor visual: Context",
  bContextDesc:
    "As condições (conditions) não estão neste formulário simplificado — copie e adapte o exemplo acima, ou use o Designer de TAB abaixo.",

  tablistTitle: "TabList: header, footer e playerlist",
  tablistBody:
    "{anims} referenciam uma {animDef} (frames que ciclam a cada {interval} ticks) — se forem omitidos, {lines} é mostrado estático. {playerFormat} resolve {prefixSuffix} a partir do Team ativo, {pingFmt} a partir das faixas de {ping}, e {gmFmt} se {gmEnabled}.",
  animBody:
    "Além de {frame}: {scroll} (janela deslizante sobre um {text} longo, pré-calculada em frames no parse) e {blink} (alterna {textEmpty}). O header/footer animado é re-renderizado a cada 10 ticks por um scheduler dedicado e leve — nunca recalcula sorting/teams nessa passada, isso segue estritamente event-driven.",

  sortingTitle: "Sorting",
  sortingBody:
    "Forma curta ({priority}): uma palavra por linha. {natives} são nativos; qualquer outra palavra é interpretada como o nome de um placeholder já registrado por outro addon. Forma explícita ({rules}): mesmo resultado, mas permite {values} (lista de permissões ordenada) para {permission}, e {numeric} para comparar placeholders como número em vez de texto.",

  teamsTitle: "Teams e Nametag",
  staffTitle: "Por que só um override de 'staff' e não 'mesma guilda'?",
  staffBody:
    "“O viewer tem a permissão X?” se resolve sem conhecer nenhum outro addon. “O viewer e o subject estão na mesma guilda?” é uma relação entre DOIS jogadores — não algo que um placeholder de um único jogador possa expressar. Para esse caso, o addon dono dessa relação (ex. RPGRoll-Guilds) pode chamar {engine} diretamente pela API pública.",

  belowTitle: "BelowName",
  belowBody:
    "Limitação do Minecraft, não do addon: só é possível mostrar um {number} embaixo do nome. {score} deve resolver para algo numérico, {label} é o texto/ícone que aparece junto ao número.",
  numberWord: "número",

  sbTitle: "Scoreboard (sidebar)",
  sbBody:
    "Cada linha é {lineShape} — {condition} é opcional (suporta {ops}, compara numérico se os dois lados fizerem parse como número). {extends} implementam templates reutilizáveis: o filho herda {inherited} do pai e substitui placeholders literais do pai pelos seus próprios valores.",
  sbMultiBody:
    "Vários scoreboards podem coexistir (default/combat/dungeon/boss/...) — o Context Engine decide qual está ativo via {profileSb} ou um override parcial de contexto; {priority} entra em jogo quando a resolução de contexto é ambígua.",

  bossTitle: "BossBars",
  bossBody:
    "Não está ativado por padrão (nenhum perfil nem contexto o referencia ainda) — serve de modelo. Um jogador pode ter várias bossbars simultâneas se fontes diferentes (perfil + API de outro addon) as mostrarem ao mesmo tempo; cada uma é identificada pelo seu id e pode ser escondida individualmente.",

  apiTitle: "API pública",
  eventsIntro: "Eventos disponíveis (todos em {pkg}):",
  thEvent: "Evento",
  thWhen: "Quando",
  evProfile: "O perfil ativo de um jogador mudou.",
  evScoreboard: "O sidebar ativo mudou.",
  evNametag: "O nametag de um jogador foi re-renderizado.",
  evVisibility: "Cancelável — antes de mostrar/esconder alguém num tablist alheio.",
  evPlaceholder: "Informativo — um placeholder desconhecido (nem interno nem registrado).",
  evLayout: "Mudou o layout/ordem aplicado.",
  evBossBar: "Uma bossbar foi mostrada/escondida.",

  cmdTitle: "Comandos",
  thCommand: "Comando",
  thWhat: "O que faz",
  xReload: "Recarrega todo o conteúdo YAML (9 tipos) e atualiza todos os jogadores online.",
  xList: "Lista os perfis definidos.",
  xProfile: "Força um perfil específico, ignorando o Context Engine até o próximo refresh real.",
  permNote: "Todos exigem {perm} (padrão: op), e funcionam pelo console.",

  designerTitle: "Monte tudo isso visualmente: Designer de TAB",
  designerBody:
    "Em vez de escrever à mão os 10 tipos de arquivo acima, use o {link} — uma ferramenta no navegador que monta perfis, contextos, scoreboards, tablists, nametags, belowname, bossbars, sorting, teams e animações com formulários, e te dá o YAML exato que cada {parser} lê, pronto para copiar ou baixar. Não substitui nenhum editor in-game (não existe um para TAB) — é a forma recomendada de montar o conteúdo sem memorizar o schema de cada arquivo.",
  designerLink: "Designer de TAB",

  pfId: "Id",
  pfTablist: "Tablist (header/footer/playerlist)",
  pfScoreboard: "Scoreboard (sidebar)",
  pfNametag: "Nametag (multilinha)",
  pfBelowname: "BelowName",
  pfTeams: "Teams (prefix/suffix/cor)",
  pfSorting: "Sorting",
  pfBossbar: "BossBar (opcional)",
  pfLayout: "Layout preset (opcional)",

  cfId: "Id",
  cfPriority: "Prioridade (ganha o número mais alto)",
  cfProfile: "Perfil completo a aplicar (opcional)",
  cfTablist: "Override: só tablist (opcional)",
  cfScoreboard: "Override: só scoreboard (opcional)",
  cfNametag: "Override: só nametag (opcional)",
  cfBossbar: "Override: só bossbar (opcional)",
};

export const TAB_COPY: Record<Locale, TabCopy> = { es, en, pt };
