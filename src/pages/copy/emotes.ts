import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Emotes. Ver copy/quickStart.ts para el patrón. */

const es = {
  title: "Emotes (RPGRoll-Emotes)",
  intro:
    "Emotes y animaciones del jugador hechos con BetterModel: menú con favoritos, desbloqueos por comando o permiso, sonido, partículas y música opcionales, y animaciones de conjuro para RPGRoll-Magic. Trae 23 animaciones de fábrica y se amplía con archivos .yml y .bbmodel. Desde la versión 1.1.12.",

  reqTitle: "Requisitos",
  reqBody:
    "Paper 26.1.x con {lib} 1.1.12 y {bm} 3.6 o posterior (gratis). Opcionales: {srp}, que reparte el pack de BetterModel, y {magic}, que anima los conjuros. Los clientes tienen que ser Java 1.21.4 o posterior.",
  reqJava: "Solo Java: los jugadores de Bedrock no ven los emotes.",

  installTitle: "Instalación",
  install1: "Instala {bm} en plugins/ si no lo tienes. RPGRoll-Emotes no arranca sin él.",
  install2: "Copia el jar de RPGRoll-Emotes en plugins/, junto a RPGRoll-Lib, y pega tu clave en {license}.",
  install3:
    "Arranca el servidor. Se crea {folder} con config.yml, lang/, emotes/ y animations/, y la animación de fábrica se copia a {bbmodel}.",
  install4: "Haz llegar el pack de recursos a los jugadores (siguiente sección). Sin pack no se ven las animaciones.",
  installEdit:
    "Si editas a mano {bbmodel}, las actualizaciones no lo pisan: el log avisa y se queda tu versión. Para volver a la de fábrica, borra ese archivo y reinicia.",

  packTitle: "El pack de recursos",
  packSrp:
    "Con SackResourcePack: tras cada recarga correcta de BetterModel (también la inicial), Emotes copia el build.zip de BetterModel al módulo {module} de SackResourcePack. Para aplicarlo, ejecuta {publish}.",
  packWarn:
    "No uses {rebuild}: deja el hash antiguo y los clientes no descargan el pack nuevo. BetterModel tiene que generar el pack como zip ({zip} en su config.yml).",
  packNoSrp:
    "Sin SackResourcePack, usa las opciones de pack de BetterModel para repartir el suyo. Emotes no sirve ningún pack por sí mismo. Para desactivar la copia, pon {key} en false (necesita reiniciar).",

  playTitle: "Cómo se juega",
  thAction: "Acción",
  thWhat: "Qué hace",
  pMenu: "Abre el menú. Clic izquierdo lanza el emote; clic derecho lo añade o quita de favoritos.",
  pHotkey: "Abre el menú. Se desactiva con hotkeys.sneak-swap: false.",
  pQuick: "Abre un diálogo con los favoritos, «Abrir menú» y «Parar». Pensado para atarlo a una tecla con un macro.",
  pEmote: "Lanza un emote que tengas.",
  pSlot: "Lanza el favorito de ese hueco.",
  pStop: "Para el emote en marcha.",
  playNote:
    "/e es un alias de /emote. La tecla vanilla «Acciones rápidas» no se puede usar desde un plugin; por eso existe /emotes rapido.",
  shiftF: "Shift + F (cambiar de mano agachado)",

  cutTitle: "Qué corta un emote",
  cutBody:
    "Un emote en marcha se corta si el jugador se mueve más de {move} (0,3 bloques en horizontal), recibe daño, ataca, se monta, se teletransporta, cambia de mundo, planea con élitros, nada, se duerme o muere. Los bucles siguen hasta que ocurra algo de esto o el jugador pare o lance otro emote.",
  cutNoTitle: "No se puede lanzar un emote:",
  cutCombat:
    "durante {combat} (8 s) tras recibir daño de un jugador o un mob, o golpear a un ser vivo. El daño de caída o de fuego corta el emote pero no marca combate;",
  cutCooldown: "antes de que pase el enfriamiento ({cooldown}, 3 s). El permiso {bypass} lo ignora;",
  cutLocked: "si el emote está bloqueado y el jugador no lo tiene.",

  commandsTitle: "Comandos",
  thCommand: "Comando",
  thDesc: "Descripción",
  cGive: "Desbloquea un emote.",
  cTake: "Quita un emote desbloqueado.",
  cList: "Lista los emotes que tiene.",
  cPlay: "Lo reproduce a un jugador conectado, sin desbloqueo ni enfriamiento.",
  cReload: "Recarga config, idiomas, animaciones y catálogo. Si cambió alguna animación, recarga BetterModel en segundo plano.",

  permissionsTitle: "Permisos",
  thPerm: "Permiso",
  thDefault: "Por defecto",
  pUse: "Usar los emotes desbloqueados.",
  pOne: "Tener ese emote sin desbloquearlo.",
  pAll: "Tener todos.",
  pBypass: "Ignorar el enfriamiento.",
  pAdmin: "Administrar. Incluye todos los emotes y el bypass.",
  dAll: "todos",
  dNone: "nadie",
  permData: "Los desbloqueos se guardan por jugador en {file}.",

  unlockTitle: "Desbloquear desde el pase, cajas, misiones y NPC",
  unlockBody:
    "Un emote con {locked} se da con {give}. Funciona desde la consola, así que sirve como recompensa de cualquier sistema que ejecute un comando: pase de batalla, cajas, misiones, menús de NPC o tienda. En los módulos de RPGRoll el jugador es {player}; en plugins de terceros usa su marcador (a menudo {pct}). Otra vía es dar el permiso {perm}.",

  formatTitle: "Formato de un emote",
  formatBody:
    "Cada emote es un .yml dentro de {folder}. Se lee la carpeta entera, subcarpetas incluidas. Tras añadir o editar uno, ejecuta {reload}. Un .yml roto no detiene el servidor: se salta ese emote y el log dice cuál y por qué.",
  thKey: "Clave",
  thNotes: "Notas",
  kAnimation: "Obligatoria. Si no existe en el modelo, el emote se quita al cargar y el log lo avisa.",
  kUnlock: "free o locked. Otro valor invalida el emote.",
  kRarity: "common, uncommon, rare, epic o legendary. Ordena el menú y sale en la descripción.",
  kHidden: "Solo lo ve en el menú quien ya lo tiene. Los emotes de magia (canalizar, conjurar) van ocultos.",
  kSound: "id es una clave de sonido de Minecraft o de tu pack. volume y pitch valen 1 por defecto.",
  kParticles: "type es un nombre de partícula de Bukkit, como NOTE o HEART. Un tipo desconocido se ignora y el emote sale igual.",
  kCancel:
    "Motivos que cortan este emote: move, damage, attack, mount, glide, swim, sleep. Sin la clave, cortan todos. Teletransporte, cambio de mundo y muerte cortan siempre.",

  musicTitle: "Música",
  musicBody:
    "{music} reproduce un sonido de tu pack mientras dura el emote. {sound} es la clave con espacio de nombres, {volume} va de 0 a 4 y {length} es la duración en segundos: en un emote en bucle, la música se repite cada {length} segundos. Suena en la fuente «Discos» y se para al acabar el emote.",
  musicWarn:
    "Los emotes de fábrica no traen música. Si añades música, usa solo audio original o con la licencia adecuada. No uses música comercial ni de otros juegos.",

  customTitle: "Añadir animaciones propias",
  custom1: "Crea un modelo en Blockbench a partir de la plantilla de jugador de BetterModel y añade tus animaciones. El nombre del archivo es el nombre del modelo.",
  custom2: "Copia el .bbmodel a {folder}. Al arrancar o con /emotesadmin reload se copia a plugins/BetterModel/players/ y se recarga BetterModel. El nombre rpgroll_emotes.bbmodel está reservado.",
  custom3: "Crea el .yml del emote con {model} y {animation}.",
  custom4: "Haz llegar el pack nuevo a los jugadores. Para probar una animación sin el menú: {bm}.",
  customPacks: "Los packs temáticos Mareas Malditas y Dinastía de Jade traen sus emotes y su .bbmodel con este mismo formato.",

  magicTitle: "Integración con RPGRoll-Magic",
  magicBody:
    "Si RPGRoll-Magic está instalado, sus hechizos animan al jugador. Emotes solo escucha los eventos de hechizo de RPGRoll-Lib, así que no necesita nada más. {key} lo apaga.",
  magicCast: "Hechizo instantáneo: reproduce conjurar; si el jugador se mueve al lanzarlo, conjurar_caminando.",
  magicChannel:
    "Hechizo mantenido (HOLD): reproduce canalizar en bucle mientras dura la canalización. Si el jugador se mueve, la canalización se cancela y el bucle para.",
  magicReplace: "Un hechizo reemplaza al emote que esté en marcha.",
  magicSchools: "Cada escuela puede tener sus animaciones: en {cast} y {channel} pon, por ejemplo, {example}.",
  magicVersion: "Necesita RPGRoll-Magic 1.1.12 o posterior con RPGRoll-Lib 1.1.12: las versiones anteriores no lanzan los eventos de hechizo.",

  configTitle: "Configuración",
  cfLanguage: "Idioma de los mensajes: es, en, pt_BR.",
  cfCooldown: "Espera entre emotes de un jugador.",
  cfCombat: "Segundos sin poder lanzar tras daño.",
  cfMove: "Bloques de movimiento horizontal que cortan un emote.",
  cfFavorites: "Huecos de favoritos (1 a 7). Necesita reiniciar.",
  cfSneak: "Shift + F abre el menú.",
  cfQuick: "Activa /emotes rapido.",
  cfLimb: "Modelo de BetterModel por defecto de los emotes. Necesita reiniciar.",
  cfMagic: "Animaciones de conjuro.",
  cfDefaults: "Emote de cada hechizo.",
  cfSchools: "Emote propio por escuela.",
  cfMenus: "Fondos dibujados del paquete de recursos. Vacío = menús de cofre normales.",
  cfSrp: "Copiar el pack de BetterModel a SackResourcePack. Necesita reiniciar.",
  vEmpty: "vacío",

  limitsTitle: "Límites",
  lJava: "Solo Java. Los jugadores de Bedrock no ven los emotes.",
  lClient: "Cliente 1.21.4 o posterior. Los anteriores no se admiten.",
  lSkins: "BetterModel viste las animaciones con la skin del jugador. En un servidor en modo offline muestra su skin de reserva.",
  lVelocity: "Detrás de Velocity, el reenvío de información del jugador (player info forwarding) tiene que estar activado para que llegue la skin.",
  lPack: "Sin el pack de recursos, el jugador no ve las animaciones.",
};

export type EmotesCopy = typeof es;

const en: EmotesCopy = {
  title: "Emotes (RPGRoll-Emotes)",
  intro:
    "Player emotes and animations made with BetterModel: a menu with favorites, unlocks by command or permission, optional sound, particles and music, and casting animations for RPGRoll-Magic. Ships with 23 animations and grows with .yml and .bbmodel files. Since version 1.1.12.",

  reqTitle: "Requirements",
  reqBody:
    "Paper 26.1.x with {lib} 1.1.12 and {bm} 3.6 or later (free). Optional: {srp}, which distributes BetterModel's pack, and {magic}, which animates spellcasting. Clients must be Java 1.21.4 or later.",
  reqJava: "Java only: Bedrock players do not see the emotes.",

  installTitle: "Installation",
  install1: "Install {bm} in plugins/ if you do not have it. RPGRoll-Emotes does not start without it.",
  install2: "Copy the RPGRoll-Emotes jar to plugins/, next to RPGRoll-Lib, and paste your key in {license}.",
  install3:
    "Start the server. It creates {folder} with config.yml, lang/, emotes/ and animations/, and copies the bundled animation to {bbmodel}.",
  install4: "Get the resource pack to your players (next section). Without the pack, nobody sees the animations.",
  installEdit:
    "If you edit {bbmodel} by hand, updates do not overwrite it: the log warns and your version stays. To go back to the bundled one, delete that file and restart.",

  packTitle: "The resource pack",
  packSrp:
    "With SackResourcePack: after every successful BetterModel reload (including the first one), Emotes copies BetterModel's build.zip to SackResourcePack's {module} module. To apply it, run {publish}.",
  packWarn:
    "Do not use {rebuild}: it keeps the old hash and clients do not download the new pack. BetterModel must build its pack as a zip ({zip} in its config.yml).",
  packNoSrp:
    "Without SackResourcePack, use BetterModel's own pack options to distribute it. Emotes does not serve any pack by itself. To turn the copy off, set {key} to false (needs a restart).",

  playTitle: "How to play",
  thAction: "Action",
  thWhat: "What it does",
  pMenu: "Opens the menu. Left click plays the emote; right click adds it to or removes it from favorites.",
  pHotkey: "Opens the menu. Turn it off with hotkeys.sneak-swap: false.",
  pQuick: "Opens a dialog with your favorites, “Open menu” and “Stop”. Meant to be bound to a key with a macro.",
  pEmote: "Plays an emote you own.",
  pSlot: "Plays the favorite in that slot.",
  pStop: "Stops the running emote.",
  playNote:
    "/e is an alias of /emote. Plugins cannot use the vanilla “Quick Actions” key; that is why /emotes rapido exists.",
  shiftF: "Shift + F (swap hands while sneaking)",

  cutTitle: "What stops an emote",
  cutBody:
    "A running emote stops if the player moves more than {move} (0.3 blocks horizontally), takes damage, attacks, mounts, teleports, changes world, glides with an elytra, swims, sleeps or dies. Loops keep going until one of these happens or the player stops or plays another emote.",
  cutNoTitle: "An emote cannot be played:",
  cutCombat:
    "for {combat} (8 s) after taking damage from a player or a mob, or hitting a living entity. Fall or fire damage stops the emote but does not tag combat;",
  cutCooldown: "before the cooldown ends ({cooldown}, 3 s). The {bypass} permission skips it;",
  cutLocked: "if the emote is locked and the player does not own it.",

  commandsTitle: "Commands",
  thCommand: "Command",
  thDesc: "Description",
  cGive: "Unlocks an emote.",
  cTake: "Removes an unlocked emote.",
  cList: "Lists the emotes the player owns.",
  cPlay: "Plays it on an online player, with no unlock or cooldown.",
  cReload: "Reloads config, languages, animations and catalog. If an animation changed, reloads BetterModel in the background.",

  permissionsTitle: "Permissions",
  thPerm: "Permission",
  thDefault: "Default",
  pUse: "Use unlocked emotes.",
  pOne: "Own that emote without unlocking it.",
  pAll: "Own all of them.",
  pBypass: "Skip the cooldown.",
  pAdmin: "Administer. Includes every emote and the bypass.",
  dAll: "everyone",
  dNone: "nobody",
  permData: "Unlocks are saved per player in {file}.",

  unlockTitle: "Unlock from the pass, crates, quests and NPCs",
  unlockBody:
    "An emote with {locked} is given with {give}. It works from the console, so any system that runs a command can use it as a reward: battle pass, crates, quests, NPC menus or shop. In RPGRoll modules the player is {player}; in third-party plugins use their placeholder (often {pct}). You can also grant the {perm} permission.",

  formatTitle: "Emote format",
  formatBody:
    "Each emote is a .yml inside {folder}. The whole folder is read, subfolders included. After adding or editing one, run {reload}. A broken .yml does not stop the server: that emote is skipped and the log says which one and why.",
  thKey: "Key",
  thNotes: "Notes",
  kAnimation: "Required. If the model does not have it, the emote is dropped on load and the log warns.",
  kUnlock: "free or locked. Any other value makes the emote invalid.",
  kRarity: "common, uncommon, rare, epic or legendary. Sorts the menu and shows in the description.",
  kHidden: "Only players who own it see it in the menu. The magic emotes (canalizar, conjurar) are hidden.",
  kSound: "id is a Minecraft or resource pack sound key. volume and pitch default to 1.",
  kParticles: "type is a Bukkit particle name, such as NOTE or HEART. An unknown type is ignored and the emote still plays.",
  kCancel:
    "Reasons that stop this emote: move, damage, attack, mount, glide, swim, sleep. Without the key, all of them do. Teleporting, changing world and dying always stop it.",

  musicTitle: "Music",
  musicBody:
    "{music} plays a sound from your pack while the emote runs. {sound} is the namespaced key, {volume} goes from 0 to 4 and {length} is the length in seconds: in a looping emote, the music repeats every {length} seconds. It plays on the “Jukebox/Note Blocks” channel and stops when the emote ends.",
  musicWarn:
    "The bundled emotes have no music. If you add music, only use original audio or audio with the right license. Do not use commercial music or music from other games.",

  customTitle: "Adding your own animations",
  custom1: "Make a model in Blockbench from BetterModel's player template and add your animations. The file name is the model name.",
  custom2: "Copy the .bbmodel to {folder}. On startup or with /emotesadmin reload it is copied to plugins/BetterModel/players/ and BetterModel reloads. The name rpgroll_emotes.bbmodel is reserved.",
  custom3: "Create the emote's .yml with {model} and {animation}.",
  custom4: "Get the new pack to your players. To test an animation without the menu: {bm}.",
  customPacks: "The Cursed Tides and Jade Dynasty themed packs ship their emotes and their .bbmodel in this same format.",

  magicTitle: "RPGRoll-Magic integration",
  magicBody:
    "If RPGRoll-Magic is installed, its spells animate the player. Emotes only listens to RPGRoll-Lib's spell events, so it needs nothing else. {key} turns it off.",
  magicCast: "Instant spell: plays conjurar; if the player is moving when casting, conjurar_caminando.",
  magicChannel:
    "Held spell (HOLD): plays canalizar in a loop while the channel lasts. If the player moves, the channel is cancelled and the loop stops.",
  magicReplace: "A spell replaces the running emote.",
  magicSchools: "Each school can have its own animations: in {cast} and {channel} set, for example, {example}.",
  magicVersion: "Needs RPGRoll-Magic 1.1.12 or later with RPGRoll-Lib 1.1.12: older versions do not fire the spell events.",

  configTitle: "Configuration",
  cfLanguage: "Message language: es, en, pt_BR.",
  cfCooldown: "Wait between a player's emotes.",
  cfCombat: "Seconds a player cannot play emotes after damage.",
  cfMove: "Horizontal blocks of movement that stop an emote.",
  cfFavorites: "Favorite slots (1 to 7). Needs a restart.",
  cfSneak: "Shift + F opens the menu.",
  cfQuick: "Turns on /emotes rapido.",
  cfLimb: "Default BetterModel model for emotes. Needs a restart.",
  cfMagic: "Casting animations.",
  cfDefaults: "Emote for each kind of spell.",
  cfSchools: "Per-school emote.",
  cfMenus: "Drawn backgrounds from the resource pack. Empty = plain chest menus.",
  cfSrp: "Copy BetterModel's pack to SackResourcePack. Needs a restart.",
  vEmpty: "empty",

  limitsTitle: "Limits",
  lJava: "Java only. Bedrock players do not see the emotes.",
  lClient: "Client 1.21.4 or later. Older ones are not supported.",
  lSkins: "BetterModel dresses the animations in the player's skin. On an offline-mode server it shows its fallback skin.",
  lVelocity: "Behind Velocity, player info forwarding must be on for the skin to arrive.",
  lPack: "Without the resource pack, players do not see the animations.",
};

const pt: EmotesCopy = {
  title: "Emotes (RPGRoll-Emotes)",
  intro:
    "Emotes e animações do jogador feitos com o BetterModel: menu com favoritos, desbloqueio por comando ou permissão, som, partículas e música opcionais, e animações de conjuração para o RPGRoll-Magic. Vem com 23 animações e cresce com arquivos .yml e .bbmodel. Desde a versão 1.1.12.",

  reqTitle: "Requisitos",
  reqBody:
    "Paper 26.1.x com {lib} 1.1.12 e {bm} 3.6 ou posterior (grátis). Opcionais: {srp}, que distribui o pack do BetterModel, e {magic}, que anima as conjurações. Os clientes precisam ser Java 1.21.4 ou posterior.",
  reqJava: "Só Java: jogadores do Bedrock não veem os emotes.",

  installTitle: "Instalação",
  install1: "Instale o {bm} em plugins/ se ainda não tiver. O RPGRoll-Emotes não inicia sem ele.",
  install2: "Copie o jar do RPGRoll-Emotes em plugins/, junto do RPGRoll-Lib, e cole sua chave em {license}.",
  install3:
    "Inicie o servidor. É criada {folder} com config.yml, lang/, emotes/ e animations/, e a animação de fábrica é copiada para {bbmodel}.",
  install4: "Faça o pack de recursos chegar aos jogadores (próxima seção). Sem o pack, ninguém vê as animações.",
  installEdit:
    "Se você editar {bbmodel} à mão, as atualizações não o sobrescrevem: o log avisa e sua versão fica. Para voltar à de fábrica, apague esse arquivo e reinicie.",

  packTitle: "O pack de recursos",
  packSrp:
    "Com o SackResourcePack: depois de cada recarga bem-sucedida do BetterModel (inclusive a inicial), o Emotes copia o build.zip do BetterModel para o módulo {module} do SackResourcePack. Para aplicar, execute {publish}.",
  packWarn:
    "Não use {rebuild}: ele mantém o hash antigo e os clientes não baixam o pack novo. O BetterModel precisa gerar o pack como zip ({zip} no config.yml dele).",
  packNoSrp:
    "Sem o SackResourcePack, use as opções de pack do BetterModel para distribuir o dele. O Emotes não serve nenhum pack sozinho. Para desligar a cópia, ponha {key} em false (precisa reiniciar).",

  playTitle: "Como se joga",
  thAction: "Ação",
  thWhat: "O que faz",
  pMenu: "Abre o menu. Clique esquerdo usa o emote; clique direito o adiciona ou remove dos favoritos.",
  pHotkey: "Abre o menu. Desligue com hotkeys.sneak-swap: false.",
  pQuick: "Abre um diálogo com os favoritos, «Abrir menu» e «Parar». Pensado para associar a uma tecla com um macro.",
  pEmote: "Usa um emote que você tem.",
  pSlot: "Usa o favorito desse espaço.",
  pStop: "Para o emote em andamento.",
  playNote:
    "/e é um alias de /emote. Plugins não podem usar a tecla vanilla «Ações rápidas»; por isso existe /emotes rapido.",
  shiftF: "Shift + F (trocar de mão agachado)",

  cutTitle: "O que corta um emote",
  cutBody:
    "Um emote em andamento é cortado se o jogador se move mais de {move} (0,3 blocos na horizontal), recebe dano, ataca, monta, se teletransporta, muda de mundo, plana com élitros, nada, dorme ou morre. Os loops continuam até algo disso acontecer ou o jogador parar ou usar outro emote.",
  cutNoTitle: "Não é possível usar um emote:",
  cutCombat:
    "durante {combat} (8 s) depois de receber dano de um jogador ou mob, ou bater em um ser vivo. Dano de queda ou de fogo corta o emote mas não marca combate;",
  cutCooldown: "antes de acabar a espera ({cooldown}, 3 s). A permissão {bypass} ignora a espera;",
  cutLocked: "se o emote está bloqueado e o jogador não o tem.",

  commandsTitle: "Comandos",
  thCommand: "Comando",
  thDesc: "Descrição",
  cGive: "Desbloqueia um emote.",
  cTake: "Remove um emote desbloqueado.",
  cList: "Lista os emotes que o jogador tem.",
  cPlay: "Reproduz o emote em um jogador conectado, sem desbloqueio nem espera.",
  cReload: "Recarrega config, idiomas, animações e catálogo. Se alguma animação mudou, recarrega o BetterModel em segundo plano.",

  permissionsTitle: "Permissões",
  thPerm: "Permissão",
  thDefault: "Padrão",
  pUse: "Usar os emotes desbloqueados.",
  pOne: "Ter esse emote sem desbloqueá-lo.",
  pAll: "Ter todos.",
  pBypass: "Ignorar a espera.",
  pAdmin: "Administrar. Inclui todos os emotes e o bypass.",
  dAll: "todos",
  dNone: "ninguém",
  permData: "Os desbloqueios são salvos por jogador em {file}.",

  unlockTitle: "Desbloquear pelo passe, caixas, missões e NPCs",
  unlockBody:
    "Um emote com {locked} é dado com {give}. Funciona pelo console, então serve de recompensa em qualquer sistema que execute um comando: passe de batalha, caixas, missões, menus de NPC ou loja. Nos módulos do RPGRoll o jogador é {player}; em plugins de terceiros, use o marcador deles (muitas vezes {pct}). Outra via é dar a permissão {perm}.",

  formatTitle: "Formato de um emote",
  formatBody:
    "Cada emote é um .yml dentro de {folder}. A pasta inteira é lida, subpastas incluídas. Depois de adicionar ou editar um, execute {reload}. Um .yml quebrado não para o servidor: esse emote é pulado e o log diz qual e por quê.",
  thKey: "Chave",
  thNotes: "Notas",
  kAnimation: "Obrigatória. Se não existir no modelo, o emote é removido ao carregar e o log avisa.",
  kUnlock: "free ou locked. Outro valor invalida o emote.",
  kRarity: "common, uncommon, rare, epic ou legendary. Ordena o menu e aparece na descrição.",
  kHidden: "Só aparece no menu para quem já o tem. Os emotes de magia (canalizar, conjurar) são ocultos.",
  kSound: "id é uma chave de som do Minecraft ou do seu pack. volume e pitch valem 1 por padrão.",
  kParticles: "type é um nome de partícula do Bukkit, como NOTE ou HEART. Um tipo desconhecido é ignorado e o emote sai igual.",
  kCancel:
    "Motivos que cortam este emote: move, damage, attack, mount, glide, swim, sleep. Sem a chave, todos cortam. Teletransporte, mudança de mundo e morte cortam sempre.",

  musicTitle: "Música",
  musicBody:
    "{music} toca um som do seu pack enquanto o emote dura. {sound} é a chave com namespace, {volume} vai de 0 a 4 e {length} é a duração em segundos: em um emote em loop, a música se repete a cada {length} segundos. Toca no canal «Jukebox/Blocos musicais» e para quando o emote acaba.",
  musicWarn:
    "Os emotes de fábrica não trazem música. Se adicionar música, use só áudio original ou com a licença adequada. Não use música comercial nem de outros jogos.",

  customTitle: "Adicionar animações próprias",
  custom1: "Crie um modelo no Blockbench a partir do modelo de jogador do BetterModel e adicione suas animações. O nome do arquivo é o nome do modelo.",
  custom2: "Copie o .bbmodel para {folder}. Ao iniciar ou com /emotesadmin reload, ele é copiado para plugins/BetterModel/players/ e o BetterModel recarrega. O nome rpgroll_emotes.bbmodel é reservado.",
  custom3: "Crie o .yml do emote com {model} e {animation}.",
  custom4: "Faça o pack novo chegar aos jogadores. Para testar uma animação sem o menu: {bm}.",
  customPacks: "Os packs temáticos Marés Malditas e Dinastia de Jade trazem seus emotes e seu .bbmodel neste mesmo formato.",

  magicTitle: "Integração com o RPGRoll-Magic",
  magicBody:
    "Se o RPGRoll-Magic estiver instalado, os feitiços animam o jogador. O Emotes só escuta os eventos de feitiço do RPGRoll-Lib, então não precisa de mais nada. {key} desliga.",
  magicCast: "Feitiço instantâneo: reproduz conjurar; se o jogador se move ao lançar, conjurar_caminando.",
  magicChannel:
    "Feitiço mantido (HOLD): reproduz canalizar em loop enquanto a canalização dura. Se o jogador se move, a canalização é cancelada e o loop para.",
  magicReplace: "Um feitiço substitui o emote em andamento.",
  magicSchools: "Cada escola pode ter suas animações: em {cast} e {channel} ponha, por exemplo, {example}.",
  magicVersion: "Precisa do RPGRoll-Magic 1.1.12 ou posterior com o RPGRoll-Lib 1.1.12: as versões anteriores não disparam os eventos de feitiço.",

  configTitle: "Configuração",
  cfLanguage: "Idioma das mensagens: es, en, pt_BR.",
  cfCooldown: "Espera entre emotes de um jogador.",
  cfCombat: "Segundos sem poder usar emotes depois de dano.",
  cfMove: "Blocos de movimento horizontal que cortam um emote.",
  cfFavorites: "Espaços de favoritos (1 a 7). Precisa reiniciar.",
  cfSneak: "Shift + F abre o menu.",
  cfQuick: "Liga /emotes rapido.",
  cfLimb: "Modelo do BetterModel padrão dos emotes. Precisa reiniciar.",
  cfMagic: "Animações de conjuração.",
  cfDefaults: "Emote de cada tipo de feitiço.",
  cfSchools: "Emote próprio por escola.",
  cfMenus: "Fundos desenhados do pack de recursos. Vazio = menus de baú normais.",
  cfSrp: "Copiar o pack do BetterModel para o SackResourcePack. Precisa reiniciar.",
  vEmpty: "vazio",

  limitsTitle: "Limites",
  lJava: "Só Java. Jogadores do Bedrock não veem os emotes.",
  lClient: "Cliente 1.21.4 ou posterior. Os anteriores não são suportados.",
  lSkins: "O BetterModel veste as animações com a skin do jogador. Em um servidor em modo offline, mostra a skin reserva dele.",
  lVelocity: "Atrás do Velocity, o encaminhamento de informações do jogador (player info forwarding) precisa estar ligado para a skin chegar.",
  lPack: "Sem o pack de recursos, o jogador não vê as animações.",
};

export const EMOTES_COPY: Record<Locale, EmotesCopy> = { es, en, pt };
