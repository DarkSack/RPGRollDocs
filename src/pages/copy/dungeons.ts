import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Dungeons. */

const es = {
  title: "Dungeons (RPGRoll-Dungeons)",
  intro:
    "Motor de mazmorras instanciadas: salas encadenadas, oleadas de mobs (vía RPGRoll-Mobs), jefes, objetivos, dificultades con multiplicadores, checkpoints/revive, loot y triggers por evento — con ranking de mejores tiempos, y una Biblioteca de Estructuras para pegar los edificios físicos en el mundo.",

  reqTitle: "Requisitos",
  hardTitle: "Dos dependencias duras, no soft",
  hardBody:
    "A diferencia de casi todos los demás addons de RPGRoll, Dungeons {not} puede correr sin RPGRoll-Mobs (las oleadas y jefes referencian ids de {mobDef} directamente) ni sin RPGRoll-Guilds (los grupos que entran a una mazmorra se resuelven vía Team). RPGRoll-Items y RPGRoll-Quests sí son opcionales — sin ellos, ciertos tipos de loot/objetivo simplemente no hacen nada.",
  notWord: "no",

  roomsTitle: "Una mazmorra es una lista de salas",
  roomsBody:
    "Cada {room} tiene un {type} ({types}), un punto de entrada, y según el tipo: {objectives} (salas normales/puzzle), {waves} de mobs (salas de combate), o un {boss} (id de {mobDef} de RPGRoll-Mobs, solo en salas {bossType}). Cada sala puede además disparar {events} propios ({eventTypes}).",
  thObjective: "Tipo de objetivo",
  thUse: "Uso típico",
  oDirect: "Progreso directo, mismo estilo que RPGRoll-Quests.",
  oSurvive: "Aguantar sin morir/ser derrotado un tiempo.",
  oDefend: "Proteger un punto o un NPC/mob aliado.",
  oPuzzle:
    "Salas de puzzle — la lógica real del mecanismo la implementa otro addon/plugin, esto solo trackea el flag.",
  oEscape: "Llegar a un punto de salida antes de que se acabe el tiempo.",

  diffTitle: "Dificultades",
  diffBody:
    "Cada {diff} multiplica vida/daño/loot de todo lo que ocurre dentro (mobs, jefes, recompensas) y puede sumar {modifiers}: {mods}.",
  diffTip:
    "Si {difficulties} queda vacío en el YAML, el compacto constructor agrega automáticamente una dificultad {normal} con todos los multiplicadores en 1.0 — nunca hay una mazmorra sin ninguna dificultad jugable.",

  cpTitle: "Checkpoints y revivir",
  cpBody:
    "{cpMode} decide qué pasa al morir todo el grupo: volver al último checkpoint ({reviveCp}, default), reiniciar la sala ({restartRoom}), o la mazmorra entera ({restartDungeon}). {reviveMode} decide cómo revive un jugador caído mientras el resto sigue vivo: nunca ({none}, default), automático, por un compañero, con un ítem, o esperando un timer.",

  libTitle: "Estructuras físicas: la Biblioteca",
  libBody:
    "Una {room} solo guarda un punto de teletransporte y reglas de spawn — el edificio en sí (paredes, piso, techo) lo construye un admin en el mundo, como siempre. Lo que agrega la Biblioteca de Estructuras es una forma de {reuse} esa construcción: guardarla una vez y pegarla las veces que quieras, en vez de reconstruir cada sala a mano.",
  reuseWord: "reusar",
  libIntro: "Cada entrada de {dir} tiene una de estas tres fuentes:",
  thSource: "Fuente",
  thHowGen: "Cómo se genera",
  thHowPaste: "Cómo se pega",
  sCustomGen:
    "Un YAML propio: una paleta de caracteres → Material, más capas de texto (una fila por bloque en Z, un carácter por bloque en X). Es el único formato que se puede escribir a mano o generar sin correr Minecraft.",
  sCustomPaste: "{api} bloque a bloque, con soporte de rotación 90°/180°/270° y espejo.",
  sNativeGen:
    "Un Structure Block vanilla real: paras en el lugar, lo pones en modo Guardar, le pones un nombre, y listo — cero curva de aprendizaje para un admin que ya construye en survival.",
  sNativePaste:
    "API nativa de Paper ({api}, el mismo sistema que usan los Structure Blocks) — resuelve rotación, espejo y entidades por su cuenta.",
  sSchemGen:
    "Un archivo {ext} de WorldEdit/FAWE, importado desde su carpeta {dir}. Requiere WorldEdit instalado en el servidor (soft-dependency, no obligatorio para el resto del addon).",
  sSchemPaste:
    "API de WorldEdit ({api}) — resuelve rotación y espejo con su propio motor de transformaciones.",
  whyTwoTitle: "¿Por qué dos formatos en vez de uno solo?",
  whyTwoBody:
    "Un archivo NATIVE necesita un servidor de Minecraft corriendo para generarse (alguien tiene que construir y guardar con un Structure Block) — no es algo que se pueda escribir a mano ni generar por otro medio. El formato CUSTOM sí: es texto plano, así que las 4 estructuras de ejemplo que incluye este addon ({ids}) están escritas directamente en YAML, sin pasar por el juego.",

  importTitle: "Importar un Structure Block",
  importBody:
    "El flujo completo para un admin que ya construye a mano: construyes la sala en survival, pones un {sb} vanilla, modo {save}, le pones un nombre (ej. {example} — si no le pones namespace, Minecraft usa {ns} por defecto), y guardas. Después, en el juego:",
  structureBlock: "Structure Block",
  saveWord: "Save",
  importAfter:
    "Eso copia el {nbt} real a {path} y escribe el YAML de metadata ({source}) — ya queda en la Biblioteca, pegable como cualquier otra.",

  schemTitle: "Importar un schematic de WorldEdit",
  schemBody:
    "Un tercer origen, {schematic}, para quien ya construye con WorldEdit/FastAsyncWorldEdit en vez de Structure Blocks vanilla. Requiere {needWE} — es un soft-dependency, no obligatorio para el resto del addon; sin él, este flujo específico devuelve un error claro y el resto de Dungeons sigue funcionando igual. Flujo: selecciona la región con WorldEdit y guárdala con {cmd} (queda en {path}), y después:",
  needWE: "WorldEdit instalado en el servidor",
  schemAfter:
    "Copia ese {ext} a {path} (independiente de la carpeta de WorldEdit — si borras el original después, sigue funcionando) y escribe el YAML de metadata ({source}). Se pega igual que cualquier otra estructura de la Biblioteca ({cmd} o el browser), rotación y espejo incluidos — WorldEdit resuelve la geometría, RPGRoll solo orquesta cuándo y dónde.",

  customTitle: "Formato CUSTOM: paleta + capas",
  customFile: "structures/stone_entrance.yml (fragmento)",
  anchorBody:
    "{anchor} es el punto de la grilla que coincide con donde pegas — poner el centro ahí (como en el ejemplo) es justamente lo que permite “párate donde quieres el centro de la sala y pega”, en vez de tener que calcular esquinas. Las capas se pegan de abajo hacia arriba (y=0 primero), así que un bloque que necesite apoyo (como una antorcha en pie) ya tiene su soporte puesto cuando le toca su turno.",
  noBlockDataTitle: "Sin BlockData — evita materiales con orientación",
  noBlockDataBody:
    "El pegado CUSTOM hace {setType} plano, sin facing/hinge/half. Puertas, escaleras, antorchas de pared y camas van a quedar con una orientación por defecto, no la que “debería” tener. Los 4 ejemplos de este addon solo usan materiales sin orientación (ladrillos, antorchas de pie, cofres, glowstone) a propósito, para no depender de eso.",

  pasteTitle: "Pegar una estructura",
  pasteBody:
    "{browser} abre la Biblioteca en una GUI: eliges una, opcionalmente rotas/espejas, y “Pegar en mi posición” la pega centrada donde estás parado. Para coordenadas exactas (o desde consola) existe el comando equivalente:",

  bStructure: "Constructor visual: Structure (metadata)",
  bStructureDesc:
    "Identidad y fuente de una estructura. anchor/palette/layers (CUSTOM) son demasiado anidados para este formulario — copia y adapta uno de los 4 ejemplos incluidos. Para NATIVE ni siquiera hace falta escribir YAML: usa /dungeonadmin structure import.",

  yamlTitle: "Ejemplos de archivo YAML",
  denFile: "dungeons/goblin_den.yml (fragmento — 3 salas, jefe y 2 dificultades)",
  refTitle: "Referencia completa: todos los campos en un solo archivo",
  refBody:
    "{file} (incluido en el jar) usa los 9 tipos de sala, los 10 tipos de objetivo, oleadas, 3 dificultades con todos los modificadores, checkpoints/revive, los 5 tipos de loot con sus 3 scopes, y los 12 triggers.",

  bDungeon: "Constructor visual: Dungeon",
  bDungeonDesc:
    "Identidad, límites de tiempo/jugadores, lobby y bounds. Rooms, waves, difficulties, checkpoints, revive, loot y triggers son demasiado anidados para un formulario lineal — el editor in-game los separa en pantallas propias (RoomsEditorGUI, WavesEditorGUI, DifficultiesEditorGUI...); aquí lo más práctico es copiar y adaptar uno de los ejemplos de arriba.",

  guiTitle: "GUI: navegador y editor con pantallas dedicadas",
  guiBody:
    "{browser} abre el navegador; {editor} (o crear una nueva) abre {hub}, que enlaza a una pantalla propia por sección: info básica, salas, oleadas, dificultades, checkpoints/revive, loot y triggers. Todos los cambios se acumulan en una sesión de edición hasta guardar, sin importar cuánto navegues entre pantallas. Aparte, {structBrowser} abre la Biblioteca de Estructuras — ver {above}.",
  aboveWord: "arriba",

  playerCmdTitle: "Comandos de jugador — /dungeon",
  thCommand: "Comando",
  thWhat: "Qué hace",
  pList: "Lista mazmorras disponibles.",
  pInfo: "Detalle: nivel recomendado, jugadores, dificultades, cooldown.",
  pInvite: "Arma el grupo antes de entrar.",
  pLeaveParty: "Sale del grupo previo a entrar.",
  pEnter: "Entra a la mazmorra con tu grupo actual.",
  pLeave: "Abandona la mazmorra en curso.",
  pRevive: "Intenta revivir a ese jugador según la política de revive de la mazmorra actual.",
  pRanking: "Mejores tiempos registrados para esa mazmorra (por defecto: global).",

  adminCmdTitle: "Comandos de administrador — /dungeonadmin",
  aCreate: "Crea una mazmorra base y abre el editor directo.",
  aForceStop: "Termina a la fuerza una instancia activa.",
  aBrowser: "Abre el navegador gráfico.",
  aEditor: "Abre el editor gráfico directo.",
  aReload: "Recarga todas las definiciones (mazmorras y estructuras) desde disco.",
  aStructList: "Lista todas las estructuras de la Biblioteca.",
  aStructInfo: "Detalle: fuente, tamaño real, descripción.",
  aStructPaste: "Pega una estructura — sin coordenadas, en tu posición actual.",
  aStructImport: "Trae una estructura guardada con Structure Block a la Biblioteca.",
  aStructImportSchem: "Trae un schematic de WorldEdit a la Biblioteca (requiere WorldEdit instalado).",
  aStructBrowser: "Abre la Biblioteca en una GUI (elegir + rotar + pegar).",
  permNote: "Requiere {perm} (default: op).",

  phTitle: "Placeholders (PlaceholderAPI)",
  phIntro: "Expansión {exp}.",
  thPlaceholder: "Placeholder",
  thValue: "Valor",
  phActive: "Instancias activas / mazmorras definidas (globales al servidor).",
  phOccupied: "{yesno} — si esa mazmorra tiene una instancia corriendo ahora.",
  phInDungeon: "{yesno} para el jugador.",
  phCurrent: "Mazmorra y número de sala actual del jugador, o {dash}.",
  phCooldown: "Segundos restantes de cooldown para esa mazmorra.",

  sfId: "Id",
  sfDisplayName: "Nombre visible",
  sfDescription: "Descripción",
  sfIcon: "Ícono (Material)",
  sfSource: "Fuente",

  dfId: "Id",
  dfCategory: "Categoría",
  dfDisplayName: "Nombre visible",
  dfIcon: "Ícono (Material)",
  dfDescription: "Descripción",
  dfLevel: "Nivel recomendado",
  dfMinutes: "Minutos estimados",
  dfMinPlayers: "Jugadores mínimos",
  dfMaxPlayers: "Jugadores máximos",
  dfCooldown: "Cooldown",
  dfRepeatable: "Repetible",
  dfTags: "Tags",
  dfLobby: "Punto de lobby",
  dfWorld: "Mundo",
  dfBounds: "Límites (bounds)",
};

export type DungeonsCopy = typeof es;

const en: DungeonsCopy = {
  title: "Dungeons (RPGRoll-Dungeons)",
  intro:
    "An instanced dungeon engine: chained rooms, mob waves (via RPGRoll-Mobs), bosses, objectives, difficulties with multipliers, checkpoints/revive, loot and per-event triggers — with a best-times ranking, and a Structure Library for pasting the physical buildings into the world.",

  reqTitle: "Requirements",
  hardTitle: "Two hard dependencies, not soft",
  hardBody:
    "Unlike almost every other RPGRoll addon, Dungeons can{not} run without RPGRoll-Mobs (waves and bosses reference {mobDef} ids directly) nor without RPGRoll-Guilds (the parties entering a dungeon are resolved via Team). RPGRoll-Items and RPGRoll-Quests are optional — without them, certain loot/objective types simply do nothing.",
  notWord: "not",

  roomsTitle: "A dungeon is a list of rooms",
  roomsBody:
    "Each {room} has a {type} ({types}), an entry point, and depending on the type: {objectives} (normal/puzzle rooms), mob {waves} (combat rooms), or a {boss} (an RPGRoll-Mobs {mobDef} id, only in {bossType} rooms). Each room can also fire its own {events} ({eventTypes}).",
  thObjective: "Objective type",
  thUse: "Typical use",
  oDirect: "Direct progress, same style as RPGRoll-Quests.",
  oSurvive: "Hold out without dying/being defeated for a while.",
  oDefend: "Protect a point or a friendly NPC/mob.",
  oPuzzle:
    "Puzzle rooms — the mechanism's real logic is implemented by another addon/plugin, this only tracks the flag.",
  oEscape: "Reach an exit point before time runs out.",

  diffTitle: "Difficulties",
  diffBody:
    "Each {diff} multiplies the health/damage/loot of everything that happens inside (mobs, bosses, rewards) and can add {modifiers}: {mods}.",
  diffTip:
    "If {difficulties} is left empty in the YAML, the compact builder automatically adds a {normal} difficulty with every multiplier at 1.0 — there is never a dungeon without a playable difficulty.",

  cpTitle: "Checkpoints and reviving",
  cpBody:
    "{cpMode} decides what happens when the whole party dies: return to the last checkpoint ({reviveCp}, default), restart the room ({restartRoom}), or the whole dungeon ({restartDungeon}). {reviveMode} decides how a downed player revives while the rest are still alive: never ({none}, default), automatically, by a teammate, with an item, or by waiting out a timer.",

  libTitle: "Physical structures: the Library",
  libBody:
    "A {room} only stores a teleport point and spawn rules — the building itself (walls, floor, ceiling) is built by an admin in the world, as always. What the Structure Library adds is a way to {reuse} that build: save it once and paste it as many times as you want, instead of rebuilding each room by hand.",
  reuseWord: "reuse",
  libIntro: "Each {dir} entry has one of these three sources:",
  thSource: "Source",
  thHowGen: "How it is created",
  thHowPaste: "How it is pasted",
  sCustomGen:
    "Its own YAML: a character palette → Material, plus text layers (one row per block in Z, one character per block in X). It is the only format you can write by hand or generate without running Minecraft.",
  sCustomPaste: "{api} block by block, with support for 90°/180°/270° rotation and mirroring.",
  sNativeGen:
    "A real vanilla Structure Block: you stand in place, set it to Save mode, give it a name, and that is it — zero learning curve for an admin who already builds in survival.",
  sNativePaste:
    "Paper's native API ({api}, the same system Structure Blocks use) — it resolves rotation, mirroring and entities on its own.",
  sSchemGen:
    "A WorldEdit/FAWE {ext} file, imported from its {dir} folder. It needs WorldEdit installed on the server (a soft dependency, not required for the rest of the addon).",
  sSchemPaste: "WorldEdit's API ({api}) — it resolves rotation and mirroring with its own transform engine.",
  whyTwoTitle: "Why two formats instead of just one?",
  whyTwoBody:
    "A NATIVE file needs a running Minecraft server to be created (someone has to build and save with a Structure Block) — it is not something you can write by hand or generate any other way. The CUSTOM format is: it is plain text, so the 4 example structures this addon ships ({ids}) are written directly in YAML, without going through the game.",

  importTitle: "Importing a Structure Block",
  importBody:
    "The full flow for an admin who already builds by hand: you build the room in survival, place a vanilla {sb}, set it to {save} mode, give it a name (e.g. {example} — with no namespace, Minecraft uses {ns} by default), and save. Then, in game:",
  structureBlock: "Structure Block",
  saveWord: "Save",
  importAfter:
    "That copies the real {nbt} to {path} and writes the metadata YAML ({source}) — it is now in the Library, pasteable like any other.",

  schemTitle: "Importing a WorldEdit schematic",
  schemBody:
    "A third source, {schematic}, for anyone who already builds with WorldEdit/FastAsyncWorldEdit instead of vanilla Structure Blocks. It needs {needWE} — a soft dependency, not required for the rest of the addon; without it, this specific flow returns a clear error and the rest of Dungeons keeps working the same. Flow: select the region with WorldEdit and save it with {cmd} (it lands in {path}), and then:",
  needWE: "WorldEdit installed on the server",
  schemAfter:
    "It copies that {ext} to {path} (independent of WorldEdit's folder — if you delete the original afterwards, it still works) and writes the metadata YAML ({source}). It is pasted like any other Library structure ({cmd} or the browser), rotation and mirroring included — WorldEdit resolves the geometry, RPGRoll only orchestrates when and where.",

  customTitle: "CUSTOM format: palette + layers",
  customFile: "structures/stone_entrance.yml (excerpt)",
  anchorBody:
    "{anchor} is the grid point that lines up with where you paste — putting the center there (as in the example) is exactly what enables “stand where you want the room's center and paste”, instead of having to compute corners. Layers are pasted bottom-up (y=0 first), so a block that needs support (like a standing torch) already has its support in place by the time its turn comes.",
  noBlockDataTitle: "No BlockData — avoid materials with an orientation",
  noBlockDataBody:
    "CUSTOM pasting does a flat {setType}, with no facing/hinge/half. Doors, stairs, wall torches and beds will end up with a default orientation, not the one they “should” have. This addon's 4 examples deliberately use only orientation-free materials (bricks, standing torches, chests, glowstone) so as not to depend on that.",

  pasteTitle: "Pasting a structure",
  pasteBody:
    "{browser} opens the Library in a GUI: you pick one, optionally rotate/mirror it, and “Paste at my position” pastes it centered where you are standing. For exact coordinates (or from the console) there is the equivalent command:",

  bStructure: "Visual builder: Structure (metadata)",
  bStructureDesc:
    "A structure's identity and source. anchor/palette/layers (CUSTOM) are too deeply nested for this form — copy and adapt one of the 4 bundled examples. For NATIVE you do not even need to write YAML: use /dungeonadmin structure import.",

  yamlTitle: "YAML file examples",
  denFile: "dungeons/goblin_den.yml (excerpt — 3 rooms, a boss and 2 difficulties)",
  refTitle: "Full reference: every field in a single file",
  refBody:
    "{file} (shipped in the jar) uses all 9 room types, all 10 objective types, waves, 3 difficulties with every modifier, checkpoints/revive, the 5 loot types with their 3 scopes, and the 12 triggers.",

  bDungeon: "Visual builder: Dungeon",
  bDungeonDesc:
    "Identity, time/player limits, lobby and bounds. Rooms, waves, difficulties, checkpoints, revive, loot and triggers are too deeply nested for a linear form — the in-game editor splits them into screens of their own (RoomsEditorGUI, WavesEditorGUI, DifficultiesEditorGUI...); here the most practical path is to copy and adapt one of the examples above.",

  guiTitle: "GUI: browser and an editor with dedicated screens",
  guiBody:
    "{browser} opens the browser; {editor} (or creating a new one) opens {hub}, which links to a screen of its own per section: basic info, rooms, waves, difficulties, checkpoints/revive, loot and triggers. All changes accumulate in an editing session until you save, no matter how much you navigate between screens. Separately, {structBrowser} opens the Structure Library — see {above}.",
  aboveWord: "above",

  playerCmdTitle: "Player commands — /dungeon",
  thCommand: "Command",
  thWhat: "What it does",
  pList: "Lists available dungeons.",
  pInfo: "Detail: recommended level, players, difficulties, cooldown.",
  pInvite: "Builds the party before entering.",
  pLeaveParty: "Leaves the pre-entry party.",
  pEnter: "Enters the dungeon with your current party.",
  pLeave: "Abandons the dungeon in progress.",
  pRevive: "Tries to revive that player according to the current dungeon's revive policy.",
  pRanking: "Best recorded times for that dungeon (default: global).",

  adminCmdTitle: "Admin commands — /dungeonadmin",
  aCreate: "Creates a base dungeon and opens the editor directly.",
  aForceStop: "Force-ends an active instance.",
  aBrowser: "Opens the graphical browser.",
  aEditor: "Opens the graphical editor directly.",
  aReload: "Reloads every definition (dungeons and structures) from disk.",
  aStructList: "Lists every structure in the Library.",
  aStructInfo: "Detail: source, real size, description.",
  aStructPaste: "Pastes a structure — with no coordinates, at your current position.",
  aStructImport: "Brings a structure saved with a Structure Block into the Library.",
  aStructImportSchem: "Brings a WorldEdit schematic into the Library (needs WorldEdit installed).",
  aStructBrowser: "Opens the Library in a GUI (pick + rotate + paste).",
  permNote: "Requires {perm} (default: op).",

  phTitle: "Placeholders (PlaceholderAPI)",
  phIntro: "The {exp} expansion.",
  thPlaceholder: "Placeholder",
  thValue: "Value",
  phActive: "Active instances / defined dungeons (server-global).",
  phOccupied: "{yesno} — whether that dungeon has an instance running right now.",
  phInDungeon: "{yesno} for the player.",
  phCurrent: "The player's current dungeon and room number, or {dash}.",
  phCooldown: "Seconds of cooldown left for that dungeon.",

  sfId: "Id",
  sfDisplayName: "Display name",
  sfDescription: "Description",
  sfIcon: "Icon (Material)",
  sfSource: "Source",

  dfId: "Id",
  dfCategory: "Category",
  dfDisplayName: "Display name",
  dfIcon: "Icon (Material)",
  dfDescription: "Description",
  dfLevel: "Recommended level",
  dfMinutes: "Estimated minutes",
  dfMinPlayers: "Minimum players",
  dfMaxPlayers: "Maximum players",
  dfCooldown: "Cooldown",
  dfRepeatable: "Repeatable",
  dfTags: "Tags",
  dfLobby: "Lobby point",
  dfWorld: "World",
  dfBounds: "Bounds",
};

const pt: DungeonsCopy = {
  title: "Dungeons (RPGRoll-Dungeons)",
  intro:
    "Motor de dungeons instanciadas: salas encadeadas, ondas de mobs (via RPGRoll-Mobs), chefes, objetivos, dificuldades com multiplicadores, checkpoints/revive, loot e triggers por evento — com ranking de melhores tempos, e uma Biblioteca de Estruturas para colar os prédios físicos no mundo.",

  reqTitle: "Requisitos",
  hardTitle: "Duas dependências duras, não soft",
  hardBody:
    "Diferente de quase todos os outros addons do RPGRoll, o Dungeons {not} pode rodar sem o RPGRoll-Mobs (as ondas e chefes referenciam ids de {mobDef} diretamente) nem sem o RPGRoll-Guilds (os grupos que entram numa dungeon são resolvidos via Team). RPGRoll-Items e RPGRoll-Quests são opcionais — sem eles, certos tipos de loot/objetivo simplesmente não fazem nada.",
  notWord: "não",

  roomsTitle: "Uma dungeon é uma lista de salas",
  roomsBody:
    "Cada {room} tem um {type} ({types}), um ponto de entrada, e conforme o tipo: {objectives} (salas normais/puzzle), {waves} de mobs (salas de combate), ou um {boss} (id de {mobDef} do RPGRoll-Mobs, só em salas {bossType}). Cada sala pode também disparar {events} próprios ({eventTypes}).",
  thObjective: "Tipo de objetivo",
  thUse: "Uso típico",
  oDirect: "Progresso direto, mesmo estilo do RPGRoll-Quests.",
  oSurvive: "Aguentar sem morrer/ser derrotado por um tempo.",
  oDefend: "Proteger um ponto ou um NPC/mob aliado.",
  oPuzzle:
    "Salas de puzzle — a lógica real do mecanismo é implementada por outro addon/plugin, isto só rastreia a flag.",
  oEscape: "Chegar a um ponto de saída antes de o tempo acabar.",

  diffTitle: "Dificuldades",
  diffBody:
    "Cada {diff} multiplica vida/dano/loot de tudo o que ocorre dentro (mobs, chefes, recompensas) e pode somar {modifiers}: {mods}.",
  diffTip:
    "Se {difficulties} ficar vazio no YAML, o construtor compacto adiciona automaticamente uma dificuldade {normal} com todos os multiplicadores em 1.0 — nunca há uma dungeon sem nenhuma dificuldade jogável.",

  cpTitle: "Checkpoints e reviver",
  cpBody:
    "{cpMode} decide o que acontece quando todo o grupo morre: voltar ao último checkpoint ({reviveCp}, padrão), reiniciar a sala ({restartRoom}), ou a dungeon inteira ({restartDungeon}). {reviveMode} decide como um jogador caído revive enquanto o resto segue vivo: nunca ({none}, padrão), automático, por um companheiro, com um item, ou esperando um timer.",

  libTitle: "Estruturas físicas: a Biblioteca",
  libBody:
    "Uma {room} só guarda um ponto de teleporte e regras de spawn — o prédio em si (paredes, piso, teto) é construído por um admin no mundo, como sempre. O que a Biblioteca de Estruturas adiciona é uma forma de {reuse} essa construção: salvá-la uma vez e colá-la quantas vezes quiser, em vez de reconstruir cada sala à mão.",
  reuseWord: "reutilizar",
  libIntro: "Cada entrada de {dir} tem uma destas três fontes:",
  thSource: "Fonte",
  thHowGen: "Como é gerada",
  thHowPaste: "Como é colada",
  sCustomGen:
    "Um YAML próprio: uma paleta de caracteres → Material, mais camadas de texto (uma fila por bloco em Z, um caractere por bloco em X). É o único formato que se pode escrever à mão ou gerar sem rodar o Minecraft.",
  sCustomPaste: "{api} bloco a bloco, com suporte a rotação 90°/180°/270° e espelho.",
  sNativeGen:
    "Um Structure Block vanilla real: você para no lugar, coloca em modo Salvar, dá um nome, e pronto — zero curva de aprendizado para um admin que já constrói no survival.",
  sNativePaste:
    "API nativa do Paper ({api}, o mesmo sistema que os Structure Blocks usam) — resolve rotação, espelho e entidades por conta própria.",
  sSchemGen:
    "Um arquivo {ext} do WorldEdit/FAWE, importado da pasta {dir} dele. Exige WorldEdit instalado no servidor (soft-dependency, não obrigatório para o resto do addon).",
  sSchemPaste: "API do WorldEdit ({api}) — resolve rotação e espelho com o seu próprio motor de transformações.",
  whyTwoTitle: "Por que dois formatos em vez de só um?",
  whyTwoBody:
    "Um arquivo NATIVE precisa de um servidor de Minecraft rodando para ser gerado (alguém tem que construir e salvar com um Structure Block) — não é algo que se possa escrever à mão nem gerar por outro meio. O formato CUSTOM sim: é texto plano, então as 4 estruturas de exemplo que este addon inclui ({ids}) estão escritas diretamente em YAML, sem passar pelo jogo.",

  importTitle: "Importar um Structure Block",
  importBody:
    "O fluxo completo para um admin que já constrói à mão: você constrói a sala no survival, coloca um {sb} vanilla, modo {save}, dá um nome (ex. {example} — se não colocar namespace, o Minecraft usa {ns} por padrão), e salva. Depois, no jogo:",
  structureBlock: "Structure Block",
  saveWord: "Save",
  importAfter:
    "Isso copia o {nbt} real para {path} e escreve o YAML de metadata ({source}) — já fica na Biblioteca, colável como qualquer outra.",

  schemTitle: "Importar um schematic do WorldEdit",
  schemBody:
    "Uma terceira origem, {schematic}, para quem já constrói com WorldEdit/FastAsyncWorldEdit em vez de Structure Blocks vanilla. Exige {needWE} — é um soft-dependency, não obrigatório para o resto do addon; sem ele, este fluxo específico devolve um erro claro e o resto do Dungeons continua funcionando igual. Fluxo: selecione a região com o WorldEdit e salve com {cmd} (fica em {path}), e depois:",
  needWE: "WorldEdit instalado no servidor",
  schemAfter:
    "Copia esse {ext} para {path} (independente da pasta do WorldEdit — se você apagar o original depois, continua funcionando) e escreve o YAML de metadata ({source}). É colada igual a qualquer outra estrutura da Biblioteca ({cmd} ou o browser), rotação e espelho incluídos — o WorldEdit resolve a geometria, o RPGRoll só orquestra quando e onde.",

  customTitle: "Formato CUSTOM: paleta + camadas",
  customFile: "structures/stone_entrance.yml (fragmento)",
  anchorBody:
    "{anchor} é o ponto da grade que coincide com onde você cola — colocar o centro ali (como no exemplo) é justamente o que permite “fique onde você quer o centro da sala e cole”, em vez de ter que calcular cantos. As camadas são coladas de baixo para cima (y=0 primeiro), então um bloco que precise de apoio (como uma tocha em pé) já tem o seu suporte posto quando chega a sua vez.",
  noBlockDataTitle: "Sem BlockData — evite materiais com orientação",
  noBlockDataBody:
    "A colagem CUSTOM faz {setType} plano, sem facing/hinge/half. Portas, escadas, tochas de parede e camas vão ficar com uma orientação padrão, não a que “deveria” ter. Os 4 exemplos deste addon usam só materiais sem orientação (tijolos, tochas em pé, baús, glowstone) de propósito, para não depender disso.",

  pasteTitle: "Colar uma estrutura",
  pasteBody:
    "{browser} abre a Biblioteca numa GUI: você escolhe uma, opcionalmente rotaciona/espelha, e “Colar na minha posição” a cola centrada onde você está parado. Para coordenadas exatas (ou pelo console) existe o comando equivalente:",

  bStructure: "Construtor visual: Structure (metadata)",
  bStructureDesc:
    "Identidade e fonte de uma estrutura. anchor/palette/layers (CUSTOM) são aninhados demais para este formulário — copie e adapte um dos 4 exemplos incluídos. Para NATIVE nem é preciso escrever YAML: use /dungeonadmin structure import.",

  yamlTitle: "Exemplos de arquivo YAML",
  denFile: "dungeons/goblin_den.yml (fragmento — 3 salas, chefe e 2 dificuldades)",
  refTitle: "Referência completa: todos os campos num único arquivo",
  refBody:
    "{file} (incluído no jar) usa os 9 tipos de sala, os 10 tipos de objetivo, ondas, 3 dificuldades com todos os modificadores, checkpoints/revive, os 5 tipos de loot com os seus 3 scopes, e os 12 triggers.",

  bDungeon: "Construtor visual: Dungeon",
  bDungeonDesc:
    "Identidade, limites de tempo/jogadores, lobby e bounds. Rooms, waves, difficulties, checkpoints, revive, loot e triggers são aninhados demais para um formulário linear — o editor in-game os separa em telas próprias (RoomsEditorGUI, WavesEditorGUI, DifficultiesEditorGUI...); aqui o mais prático é copiar e adaptar um dos exemplos acima.",

  guiTitle: "GUI: navegador e editor com telas dedicadas",
  guiBody:
    "{browser} abre o navegador; {editor} (ou criar uma nova) abre o {hub}, que liga a uma tela própria por seção: info básica, salas, ondas, dificuldades, checkpoints/revive, loot e triggers. Todas as mudanças se acumulam numa sessão de edição até salvar, não importa quanto você navegue entre telas. À parte, {structBrowser} abre a Biblioteca de Estruturas — ver {above}.",
  aboveWord: "acima",

  playerCmdTitle: "Comandos de jogador — /dungeon",
  thCommand: "Comando",
  thWhat: "O que faz",
  pList: "Lista as dungeons disponíveis.",
  pInfo: "Detalhe: nível recomendado, jogadores, dificuldades, cooldown.",
  pInvite: "Monta o grupo antes de entrar.",
  pLeaveParty: "Sai do grupo antes de entrar.",
  pEnter: "Entra na dungeon com o seu grupo atual.",
  pLeave: "Abandona a dungeon em curso.",
  pRevive: "Tenta reviver esse jogador conforme a política de revive da dungeon atual.",
  pRanking: "Melhores tempos registrados para essa dungeon (por padrão: global).",

  adminCmdTitle: "Comandos de administrador — /dungeonadmin",
  aCreate: "Cria uma dungeon base e abre o editor direto.",
  aForceStop: "Encerra à força uma instância ativa.",
  aBrowser: "Abre o navegador gráfico.",
  aEditor: "Abre o editor gráfico direto.",
  aReload: "Recarrega todas as definições (dungeons e estruturas) do disco.",
  aStructList: "Lista todas as estruturas da Biblioteca.",
  aStructInfo: "Detalhe: fonte, tamanho real, descrição.",
  aStructPaste: "Cola uma estrutura — sem coordenadas, na sua posição atual.",
  aStructImport: "Traz uma estrutura salva com Structure Block para a Biblioteca.",
  aStructImportSchem: "Traz um schematic do WorldEdit para a Biblioteca (exige WorldEdit instalado).",
  aStructBrowser: "Abre a Biblioteca numa GUI (escolher + rotacionar + colar).",
  permNote: "Exige {perm} (padrão: op).",

  phTitle: "Placeholders (PlaceholderAPI)",
  phIntro: "Expansão {exp}.",
  thPlaceholder: "Placeholder",
  thValue: "Valor",
  phActive: "Instâncias ativas / dungeons definidas (globais ao servidor).",
  phOccupied: "{yesno} — se essa dungeon tem uma instância rodando agora.",
  phInDungeon: "{yesno} para o jogador.",
  phCurrent: "Dungeon e número de sala atual do jogador, ou {dash}.",
  phCooldown: "Segundos restantes de cooldown para essa dungeon.",

  sfId: "Id",
  sfDisplayName: "Nome visível",
  sfDescription: "Descrição",
  sfIcon: "Ícone (Material)",
  sfSource: "Fonte",

  dfId: "Id",
  dfCategory: "Categoria",
  dfDisplayName: "Nome visível",
  dfIcon: "Ícone (Material)",
  dfDescription: "Descrição",
  dfLevel: "Nível recomendado",
  dfMinutes: "Minutos estimados",
  dfMinPlayers: "Jogadores mínimos",
  dfMaxPlayers: "Jogadores máximos",
  dfCooldown: "Cooldown",
  dfRepeatable: "Repetível",
  dfTags: "Tags",
  dfLobby: "Ponto de lobby",
  dfWorld: "Mundo",
  dfBounds: "Limites (bounds)",
};

export const DUNGEONS_COPY: Record<Locale, DungeonsCopy> = { es, en, pt };
