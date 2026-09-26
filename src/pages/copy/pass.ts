import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Pass. Ver copy/quickStart.ts para el patrón. */

const es = {
  title: "Pase de temporada (RPGRoll-Pass)",
  intro:
    "Pase de temporada con pista gratis y premium, misiones diarias, semanales y de temporada, recompensa diaria con racha y extra por rango, y recompensas por votar por el servidor — todo configurable por YAML.",

  reqTitle: "Requisitos",
  reqBody:
    "Todo lo demás es opcional y solo habilita un tipo de recompensa o de misión: {crates} entrega las llaves, {items} los ítems custom, {mobs} las misiones de matar mobs propios, {quests} las de completar misiones, {votifier} los votos y {vault} el dinero. Con el core instalado, además, cuentan las subidas de nivel de personaje y se puede dar EXP de personaje.",

  howTitle: "Cómo funciona",
  howBody1:
    "Una temporada tiene fechas de inicio y fin y una lista de niveles. Cada {xp} puntos de pase se sube un nivel, y cada nivel tiene una recompensa en la pista gratis y otra en la premium. Los puntos salen de tres lugares: las misiones, la recompensa diaria y los votos.",
  howBody2:
    "Las recompensas no se entregan solas: el jugador las reclama desde {pase} (clic en cada nivel) o todas juntas con {claim}. La pista premium se ve siempre, pero solo se puede reclamar con el permiso {perm}; si el jugador lo consigue más tarde, puede reclamar todo lo premium de los niveles que ya tenía.",
  howBody3:
    "Al entrar al servidor, unos segundos después, se le recuerda al jugador si tiene la recompensa diaria disponible o recompensas del pase sin reclamar. Fuera de las fechas de la temporada el pase aparece cerrado, y al cambiar {active} cada jugador empieza la nueva temporada desde el nivel 0.",

  rewardsTitle: "Formato de recompensas",
  rewardsLead: "En todos los archivos del addon una recompensa es una línea corta de texto:",
  thFormat: "Formato",
  thGives: "Entrega",
  rMoney: "Dinero, vía Vault.",
  rKey: "Llaves de RPGRoll-Crates (ejecuta {cmd} desde consola).",
  rItem: "Ítems de RPGRoll-Items (ejecuta {cmd} desde consola).",
  rMaterial: "Un ítem vanilla; lo que no entra en el inventario cae al suelo.",
  rExp: "Experiencia de personaje, sin bonos (necesita el core).",
  rCommand: "Un comando de consola; {player} es el nombre del jugador y {uuid} su UUID.",
  rewardsWarnTitle: "Si falta el addon, la recompensa se salta",
  rewardsWarnBody:
    "Una llave sin RPGRoll-Crates, un ítem sin RPGRoll-Items o dinero sin economía no rompen nada: esa recompensa no se entrega y la consola lo avisa. Revisá los logs después de cambiar las recompensas.",

  seasonTitle: "Temporadas",
  seasonBody:
    "Cada temporada es un archivo en {dir}. La activa se elige en {config} con {active}; vacío deja el pase cerrado. {timezone} decide a qué hora cambia el día (diario y misiones diarias) y la semana.",

  missionsTitle: "Misiones",
  missionsBody:
    "Las misiones viven en {file}. Cada una da {xp} puntos de pase al completarse. Las diarias y semanales se sortean de la lista: {daily} por día y {weekly} por semana (la semana empieza el lunes). El sorteo depende solo de la fecha, así que todos los jugadores tienen las mismas misiones ese día.",
  thScope: "Scope",
  thMeaning: "Significa",
  scopeDaily: "Se sortean cada día.",
  scopeWeekly: "Se sortean cada semana.",
  scopeSeason: "Fijas toda la temporada; se completan una sola vez.",
  thType: "Tipo",
  thCounts: "Cuenta",
  tKillMob: "Matar mobs vanilla; {target} es el tipo de entidad ({example}).",
  tKillRpgMob: "Matar mobs de RPGRoll-Mobs; {target} es su id.",
  tBreak: "Romper bloques; {target} es el material. No cuentan los bloques que puso un jugador.",
  tFish: "Pescar algo.",
  tLevelUp: "Subir de nivel de personaje (necesita el core).",
  tQuest: "Completar una misión de RPGRoll-Quests; {target} es su id.",
  tPlaytime: "Minutos jugados sin estar AFK.",
  tVote: "Votar por el servidor.",
  tDaily: "Reclamar la recompensa diaria.",
  missionsTarget: "{target} es opcional: sin él, cuenta cualquiera del tipo.",

  dailyTitle: "Recompensa diaria",
  dailyBody:
    "{cmd} abre la recompensa del día. Hay una por día; cada día seguido avanza la racha y el ciclo de días, que vuelve a empezar tras el último. Con {reset}, un día sin reclamar devuelve la racha a 1.",
  dailyRankBody:
    "{bonus} agrega un extra por rango: se da el primero de la lista cuyo permiso tenga el jugador. Con LuckPerms, {group} lo tiene todo miembro del rango y quien lo herede, así que conviene ordenar la lista de mayor a menor.",

  votesTitle: "Votos",
  votesBody:
    "{cmd} muestra los enlaces de voto (clicables) y los votos del jugador. Para recibir los votos hace falta Votifier (NuVotifier o AzuVotifier) escuchando en un puerto abierto, y dar de alta el servidor en cada página con ese puerto y la clave pública de {key}.",
  votesOffline:
    "Quien vota sin estar conectado recibe el voto al entrar. Además de las recompensas por voto, {streak} da un premio al llegar a N días seguidos votando. Para probar sin ninguna página: {test}.",

  premiumTitle: "Pase premium",
  premiumBody:
    "La pista premium la abre el permiso {perm}. Lo habitual es venderlo por temporada y darlo con fecha de vencimiento, por ejemplo con LuckPerms:",

  cmdTitle: "Comandos",
  thCommand: "Comando",
  thWhat: "Qué hace",
  cPase: "Abre el pase: niveles, las dos pistas y tu progreso.",
  cMissions: "Tus misiones diarias, semanales y de temporada.",
  cClaim: "Reclama todo lo desbloqueado de las dos pistas.",
  cDaily: "Abre la recompensa diaria.",
  cVote: "Enlaces de voto y tus votos.",
  cReload: "Recarga la configuración y todos los archivos.",
  cXp: "Da puntos de pase a un jugador conectado.",
  cSimVote: "Simula un voto (entrega recompensas como si viniera de una página).",
  cInfo: "Temporada, puntos, nivel, premium, racha diaria y votos de un jugador.",
  aliases: "Alias",

  permsTitle: "Permisos",
  thPermission: "Permiso",
  thDefault: "Por defecto",
  pPremium: "Desbloquea la pista premium.",
  pAdmin: "Acceso a /passadmin.",

  filesTitle: "Archivos",
  thFile: "Archivo",
  thContains: "Contiene",
  fConfig: "Idioma, temporada activa, zona horaria y umbral AFK para el tiempo jugado.",
  fSeasons: "Una temporada por archivo: fechas, puntos por nivel y recompensas.",
  fMissions: "Misiones diarias, semanales y de temporada.",
  fDaily: "Recompensa diaria, racha y extra por rango.",
  fVotes: "Páginas de voto, recompensas, racha y aviso global.",
  fLang: "Mensajes (es, en).",
  fPlayers: "Progreso de cada jugador.",
  fPending: "Votos que llegaron con el jugador desconectado.",
  filesReload: "Después de editar cualquiera, {cmd}.",
};

export type PassCopy = typeof es;

const en: PassCopy = {
  title: "Season pass (RPGRoll-Pass)",
  intro:
    "A season pass with a free and a premium track, daily, weekly and season missions, a daily reward with a streak and a per-rank bonus, and rewards for voting for the server — all configurable through YAML.",

  reqTitle: "Requirements",
  reqBody:
    "Everything else is optional and only enables a reward or mission type: {crates} hands out keys, {items} custom items, {mobs} missions for killing its mobs, {quests} missions for completing quests, {votifier} votes and {vault} money. With the core installed, character level-ups also count and character EXP can be granted.",

  howTitle: "How it works",
  howBody1:
    "A season has a start and end date and a list of levels. Every {xp} pass points is one level, and each level has one reward on the free track and another on the premium track. Points come from three places: missions, the daily reward and votes.",
  howBody2:
    "Rewards are not handed out automatically: the player claims them from {pase} (click each level) or all at once with {claim}. The premium track is always visible but can only be claimed with the {perm} permission; if the player gets it later, they can claim every premium reward from the levels they already reached.",
  howBody3:
    "A few seconds after joining, the player is reminded if the daily reward is available or if there are unclaimed pass rewards. Outside the season dates the pass shows as closed, and when {active} changes every player starts the new season from level 0.",

  rewardsTitle: "Reward format",
  rewardsLead: "In every file of the addon a reward is a short line of text:",
  thFormat: "Format",
  thGives: "Gives",
  rMoney: "Money, through Vault.",
  rKey: "RPGRoll-Crates keys (runs {cmd} from the console).",
  rItem: "RPGRoll-Items items (runs {cmd} from the console).",
  rMaterial: "A vanilla item; whatever does not fit in the inventory drops on the ground.",
  rExp: "Character experience, without bonuses (needs the core).",
  rCommand: "A console command; {player} is the player's name and {uuid} their UUID.",
  rewardsWarnTitle: "If the addon is missing, the reward is skipped",
  rewardsWarnBody:
    "A key without RPGRoll-Crates, an item without RPGRoll-Items or money without an economy break nothing: that reward is not handed out and the console warns about it. Check the logs after changing rewards.",

  seasonTitle: "Seasons",
  seasonBody:
    "Each season is a file in {dir}. The active one is chosen in {config} with {active}; empty leaves the pass closed. {timezone} decides when the day (daily reward and daily missions) and the week roll over.",

  missionsTitle: "Missions",
  missionsBody:
    "Missions live in {file}. Each one gives {xp} pass points when completed. Daily and weekly ones are drawn from the list: {daily} per day and {weekly} per week (the week starts on Monday). The draw only depends on the date, so every player gets the same missions that day.",
  thScope: "Scope",
  thMeaning: "Means",
  scopeDaily: "Drawn every day.",
  scopeWeekly: "Drawn every week.",
  scopeSeason: "Fixed for the whole season; completed only once.",
  thType: "Type",
  thCounts: "Counts",
  tKillMob: "Killing vanilla mobs; {target} is the entity type ({example}).",
  tKillRpgMob: "Killing RPGRoll-Mobs mobs; {target} is its id.",
  tBreak: "Breaking blocks; {target} is the material. Blocks placed by a player do not count.",
  tFish: "Catching something while fishing.",
  tLevelUp: "Levelling up the character (needs the core).",
  tQuest: "Completing an RPGRoll-Quests quest; {target} is its id.",
  tPlaytime: "Minutes played without being AFK.",
  tVote: "Voting for the server.",
  tDaily: "Claiming the daily reward.",
  missionsTarget: "{target} is optional: without it, anything of that type counts.",

  dailyTitle: "Daily reward",
  dailyBody:
    "{cmd} opens the reward of the day. There is one per day; each consecutive day advances the streak and the day cycle, which starts over after the last day. With {reset}, a day without claiming sets the streak back to 1.",
  dailyRankBody:
    "{bonus} adds a per-rank extra: the first entry whose permission the player has is given. With LuckPerms, every member of a rank (and whoever inherits it) has {group}, so order the list from highest to lowest.",

  votesTitle: "Votes",
  votesBody:
    "{cmd} shows the (clickable) vote links and the player's votes. Receiving votes requires Votifier (NuVotifier or AzuVotifier) listening on an open port, and registering the server on each site with that port and the public key from {key}.",
  votesOffline:
    "Whoever votes while offline receives the vote on join. Besides the per-vote rewards, {streak} gives a prize on reaching N consecutive voting days. To test without any site: {test}.",

  premiumTitle: "Premium pass",
  premiumBody:
    "The premium track is unlocked by the {perm} permission. The usual approach is to sell it per season and grant it with an expiry date, for example with LuckPerms:",

  cmdTitle: "Commands",
  thCommand: "Command",
  thWhat: "What it does",
  cPase: "Opens the pass: levels, both tracks and your progress.",
  cMissions: "Your daily, weekly and season missions.",
  cClaim: "Claims everything unlocked on both tracks.",
  cDaily: "Opens the daily reward.",
  cVote: "Vote links and your votes.",
  cReload: "Reloads the configuration and every file.",
  cXp: "Gives pass points to an online player.",
  cSimVote: "Simulates a vote (hands out rewards as if it came from a site).",
  cInfo: "A player's season, points, level, premium, daily streak and votes.",
  aliases: "Aliases",

  permsTitle: "Permissions",
  thPermission: "Permission",
  thDefault: "Default",
  pPremium: "Unlocks the premium track.",
  pAdmin: "Access to /passadmin.",

  filesTitle: "Files",
  thFile: "File",
  thContains: "Contains",
  fConfig: "Language, active season, time zone and AFK threshold for playtime.",
  fSeasons: "One season per file: dates, points per level and rewards.",
  fMissions: "Daily, weekly and season missions.",
  fDaily: "Daily reward, streak and per-rank bonus.",
  fVotes: "Vote sites, rewards, streak and global announcement.",
  fLang: "Messages (es, en).",
  fPlayers: "Each player's progress.",
  fPending: "Votes that arrived while the player was offline.",
  filesReload: "After editing any of them, {cmd}.",
};

const pt: PassCopy = {
  title: "Passe de temporada (RPGRoll-Pass)",
  intro:
    "Passe de temporada com trilha grátis e premium, missões diárias, semanais e de temporada, recompensa diária com sequência e extra por rank, e recompensas por votar no servidor — tudo configurável por YAML.",

  reqTitle: "Requisitos",
  reqBody:
    "Todo o resto é opcional e só habilita um tipo de recompensa ou de missão: {crates} entrega as chaves, {items} os itens custom, {mobs} as missões de matar os seus mobs, {quests} as de completar missões, {votifier} os votos e {vault} o dinheiro. Com o núcleo instalado, também contam as subidas de nível de personagem e dá para dar EXP de personagem.",

  howTitle: "Como funciona",
  howBody1:
    "Uma temporada tem datas de início e fim e uma lista de níveis. A cada {xp} pontos de passe sobe-se um nível, e cada nível tem uma recompensa na trilha grátis e outra na premium. Os pontos vêm de três lugares: as missões, a recompensa diária e os votos.",
  howBody2:
    "As recompensas não são entregues sozinhas: o jogador as resgata em {pase} (clique em cada nível) ou todas de uma vez com {claim}. A trilha premium aparece sempre, mas só pode ser resgatada com a permissão {perm}; se o jogador a conseguir depois, pode resgatar todo o premium dos níveis que já tinha.",
  howBody3:
    "Alguns segundos depois de entrar, o jogador é lembrado se a recompensa diária está disponível ou se há recompensas do passe sem resgatar. Fora das datas da temporada o passe aparece fechado, e ao mudar {active} cada jogador começa a nova temporada do nível 0.",

  rewardsTitle: "Formato das recompensas",
  rewardsLead: "Em todos os arquivos do addon uma recompensa é uma linha curta de texto:",
  thFormat: "Formato",
  thGives: "Entrega",
  rMoney: "Dinheiro, via Vault.",
  rKey: "Chaves do RPGRoll-Crates (executa {cmd} pelo console).",
  rItem: "Itens do RPGRoll-Items (executa {cmd} pelo console).",
  rMaterial: "Um item vanilla; o que não couber no inventário cai no chão.",
  rExp: "Experiência de personagem, sem bônus (precisa do núcleo).",
  rCommand: "Um comando de console; {player} é o nome do jogador e {uuid} o seu UUID.",
  rewardsWarnTitle: "Se faltar o addon, a recompensa é pulada",
  rewardsWarnBody:
    "Uma chave sem RPGRoll-Crates, um item sem RPGRoll-Items ou dinheiro sem economia não quebram nada: essa recompensa não é entregue e o console avisa. Confira os logs depois de mudar as recompensas.",

  seasonTitle: "Temporadas",
  seasonBody:
    "Cada temporada é um arquivo em {dir}. A ativa é escolhida em {config} com {active}; vazio deixa o passe fechado. {timezone} decide a que horas vira o dia (diário e missões diárias) e a semana.",

  missionsTitle: "Missões",
  missionsBody:
    "As missões ficam em {file}. Cada uma dá {xp} pontos de passe ao ser completada. As diárias e semanais são sorteadas da lista: {daily} por dia e {weekly} por semana (a semana começa na segunda). O sorteio depende só da data, então todos os jogadores têm as mesmas missões naquele dia.",
  thScope: "Scope",
  thMeaning: "Significa",
  scopeDaily: "Sorteadas todo dia.",
  scopeWeekly: "Sorteadas toda semana.",
  scopeSeason: "Fixas a temporada toda; completadas uma única vez.",
  thType: "Tipo",
  thCounts: "Conta",
  tKillMob: "Matar mobs vanilla; {target} é o tipo de entidade ({example}).",
  tKillRpgMob: "Matar mobs do RPGRoll-Mobs; {target} é o id.",
  tBreak: "Quebrar blocos; {target} é o material. Blocos colocados por um jogador não contam.",
  tFish: "Pescar algo.",
  tLevelUp: "Subir de nível de personagem (precisa do núcleo).",
  tQuest: "Completar uma missão do RPGRoll-Quests; {target} é o id.",
  tPlaytime: "Minutos jogados sem estar AFK.",
  tVote: "Votar no servidor.",
  tDaily: "Resgatar a recompensa diária.",
  missionsTarget: "{target} é opcional: sem ele, conta qualquer um do tipo.",

  dailyTitle: "Recompensa diária",
  dailyBody:
    "{cmd} abre a recompensa do dia. Há uma por dia; cada dia seguido avança a sequência e o ciclo de dias, que recomeça depois do último. Com {reset}, um dia sem resgatar volta a sequência para 1.",
  dailyRankBody:
    "{bonus} adiciona um extra por rank: é dado o primeiro da lista cuja permissão o jogador tenha. Com LuckPerms, todo membro do rank (e quem o herda) tem {group}, então ordene a lista do maior para o menor.",

  votesTitle: "Votos",
  votesBody:
    "{cmd} mostra os links de voto (clicáveis) e os votos do jogador. Para receber os votos é preciso o Votifier (NuVotifier ou AzuVotifier) escutando numa porta aberta, e cadastrar o servidor em cada site com essa porta e a chave pública de {key}.",
  votesOffline:
    "Quem vota sem estar conectado recebe o voto ao entrar. Além das recompensas por voto, {streak} dá um prêmio ao chegar a N dias seguidos votando. Para testar sem nenhum site: {test}.",

  premiumTitle: "Passe premium",
  premiumBody:
    "A trilha premium é liberada pela permissão {perm}. O comum é vendê-la por temporada e dá-la com data de vencimento, por exemplo com LuckPerms:",

  cmdTitle: "Comandos",
  thCommand: "Comando",
  thWhat: "O que faz",
  cPase: "Abre o passe: níveis, as duas trilhas e o seu progresso.",
  cMissions: "As suas missões diárias, semanais e de temporada.",
  cClaim: "Resgata tudo o que foi desbloqueado nas duas trilhas.",
  cDaily: "Abre a recompensa diária.",
  cVote: "Links de voto e os seus votos.",
  cReload: "Recarrega a configuração e todos os arquivos.",
  cXp: "Dá pontos de passe a um jogador conectado.",
  cSimVote: "Simula um voto (entrega as recompensas como se viesse de um site).",
  cInfo: "Temporada, pontos, nível, premium, sequência diária e votos de um jogador.",
  aliases: "Aliases",

  permsTitle: "Permissões",
  thPermission: "Permissão",
  thDefault: "Padrão",
  pPremium: "Libera a trilha premium.",
  pAdmin: "Acesso a /passadmin.",

  filesTitle: "Arquivos",
  thFile: "Arquivo",
  thContains: "Contém",
  fConfig: "Idioma, temporada ativa, fuso horário e limite AFK para o tempo jogado.",
  fSeasons: "Uma temporada por arquivo: datas, pontos por nível e recompensas.",
  fMissions: "Missões diárias, semanais e de temporada.",
  fDaily: "Recompensa diária, sequência e extra por rank.",
  fVotes: "Sites de voto, recompensas, sequência e aviso global.",
  fLang: "Mensagens (es, en).",
  fPlayers: "O progresso de cada jogador.",
  fPending: "Votos que chegaram com o jogador desconectado.",
  filesReload: "Depois de editar qualquer um, {cmd}.",
};

export const PASS_COPY: Record<Locale, PassCopy> = { es, en, pt };
