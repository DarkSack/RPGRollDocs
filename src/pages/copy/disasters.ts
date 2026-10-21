import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Disasters. Ver copy/quickStart.ts para el patrón. */

const es = {
  title: "Desastres naturales (RPGRoll-Disasters)",
  intro:
    "Tornados, terremotos, tsunamis, lluvias de meteoritos, lluvia ácida, socavones, ventiscas y lo que quieras crear: cada desastre es un archivo YAML. Rompen el mundo de verdad, respetando claims y protecciones, y lo roto se repone solo. Salen con niveles del 1 al 6, avisan con cuenta atrás y pueden traer mobs.",

  reqTitle: "Requisitos",
  reqBody:
    "Solo {lib}. Con {seasons}, cada desastre sale solo en las estaciones que diga; sin él salen en cualquier época. {mobs} permite usar sus mobs en los desastres, y con {gp} y {wg} se respetan sus claims y regiones.",

  howTitle: "Cómo funcionan",
  howBody:
    "Cada día de Minecraft se sortea como mucho un desastre por mundo, según su probabilidad ({chance}). El elegido empieza en un momento al azar del día ({delay} en config.yml), nunca dos a la vez en el mismo mundo. Antes de empezar avisa: cuenta atrás en la barra de acción y la barra de jefe, con sonido ({warning}). Mientras dura, la barra de jefe enseña lo que le queda.",
  levelsTitle: "Niveles",
  levelsBody:
    "Cada vez que sale, el desastre tiene un nivel, sorteado por su peso ({weight}). El nivel multiplica la fuerza de los fenómenos (daño, empuje, cuántos bloques rompe), su tamaño (radios, alturas, largos) y la duración. Los niveles están en {config} y cada desastre puede traer los suyos. El nivel sale en los mensajes con {level}.",
  thLevel: "Nivel",
  thWeight: "Peso",
  thIntensity: "Fuerza",
  thSize: "Tamaño",
  thDuration: "Duración",

  phTitle: "Fenómenos",
  phBody:
    "Un desastre junta uno o varios fenómenos que ocurren a la vez. Hay siete tipos y cada uno es una plantilla: cambiando sus partículas, bloques, sonidos y números sale un desastre distinto. La granizada es un METEOR_STORM de hielo; la ventisca y la tormenta de arena son ACID_RAIN con MOBS.",
  thPhenomenon: "Fenómeno",
  thWhat: "Qué hace",
  dTornado:
    "Un embudo nace lejos y va hacia los jugadores. Arrastra en espiral a jugadores, mobs y objetos, los sube por el centro y los lanza. Arranca bloques por donde pasa (hierba, copas de árboles, tejados), que giran por el embudo y salen despedidos.",
  dMeteor:
    "Meteoritos que caen en diagonal con estela y estallan cerca de los jugadores. Dejan un cráter de verdad con el borde chamuscado y un núcleo de menas en el fondo. A cubierto no llega el golpe.",
  dAcid:
    "Algo cae del cielo sobre quien está a la intemperie: daño, efectos o congelación. El casco protege, pero se desgasta. Puede corroer el suelo (la hierba pasa a tierra, las hojas desaparecen), cubrirlo de nieve o arena y disolver objetos tirados. Con {wind} sopla un viento que empuja de lado a quien está fuera.",
  dQuake:
    "Sacudidas y estruendo bajo cada jugador. Se abren grietas de verdad que serpentean, se estrechan en las puntas y se ramifican, y lo que está cerca resbala hacia ellas. Bajo techo y en cuevas caen trozos del techo. También en el Nether y el End.",
  dSinkhole:
    "El suelo se hunde en un pozo redondo cerca de un jugador, del centro hacia fuera, y lo de encima resbala dentro. El fondo puede quedar con agua, lava o magma.",
  dTsunami:
    "Una ola gigante sale del mar, un lago o un río cercano y avanza hacia un jugador. Es una ola de agua de verdad, con la cresta curvada hacia delante y el tubo debajo: arrastra, golpea y quita el aire a lo que pilla, arrasa árboles, madera, vallas y cristales lanzando escombros, y al pasar deja charcos que se secan solos. Contra la piedra se estrella.",
  dMobs:
    "Mobs que aparecen alrededor de los jugadores mientras dura: vanilla (con peso, más vida, daño, equipo, efectos y nombre) o de RPGRoll-Mobs con {rpgroll}. Por defecto se van al terminar.",
  examplesBody:
    "Vienen de ejemplo el tornado, la tormenta de meteoritos, la lluvia ácida, el terremoto, el socavón, el tsunami, la granizada, la ventisca, la tormenta de arena, el fin del mundo y el Juicio Final, que combinan varios. Todos los campos con su valor por defecto están en {reference}.",

  damageTitle: "Destrucción y regeneración",
  damageBody:
    "Lo que rompen los desastres es de verdad, pero antes de tocar un bloque se mira, en este orden: la zona segura alrededor del spawn de cada mundo ({safe}), los claims de GriefPrevention, que no guarde nada (cofres, hornos, carteles, camas...), los bloques inmunes, la resistencia de su material y lo que WorldGuard y otros plugins protegen de las explosiones. Lo que cae (meteoritos, escombros, rocas) nunca se coloca.",
  regenTitle: "Configurar la regeneración",
  regenBody:
    "Lo roto se repone solo, poco a poco y de abajo arriba. Solo se repone si sigue como lo dejó el desastre (o vacío, o con agua o lava que se coló): lo que alguien construya en el hueco se respeta. La lista se guarda en {file}, así que tras un reinicio o una caída se repone igual. Hay tres claves:",
  thKey: "Clave",
  thDefault: "Por defecto",
  thDesc: "Descripción",
  rRegenerate: "Si lo roto se repone. false = se queda roto para siempre.",
  rSeconds: "Segundos desde que se rompe hasta que vuelve.",
  rSpread: "Extra al azar de hasta estos segundos, para que no vuelva todo de golpe.",
  regenWhere:
    "Se pueden poner en tres sitios y manda el más concreto: en {config} (para todo), arriba del archivo de un desastre (para todo lo que lanza, también lo que trae con {combine}) o dentro de un fenómeno. {cmd} lo repone todo ya.",

  yamlTitle: "Ejemplos de archivo YAML",
  combineTitle: "Combinar desastres",
  combineBody:
    "Un desastre puede listar varios fenómenos, y además {combine} suma los de otros desastres por id.",

  migrateTitle: "Si vienes de RPGRoll-Seasons 1.1.2",
  migrateBody:
    "Hasta la 1.1.2 los desastres iban dentro de RPGRoll-Seasons. Desde la 1.1.3 son este plugin aparte. La primera vez que arranca copia el {disabled} de Seasons y los desastres propios que tuvieras en {folder}. El comando pasa de {old} a {cmd}, y la intensidad del comando a nivel.",

  commandsTitle: "Comandos",
  thCommand: "Comando",
  cStart: "Lanza un desastre ya; sin mundo, el tuyo. Sin nivel, uno al azar por peso.",
  cStop: "Corta el desastre del mundo.",
  cList: "Lista los desastres con su probabilidad diaria, sus niveles y los bloques pendientes de reponer.",
  cRegenerate: "Repone ya todo lo que han roto los desastres.",
  cReload: "Recarga config.yml, el idioma y los desastres.",

  permissionsTitle: "Permisos",
  thPerm: "Permiso",
  pAdmin: "Todos los comandos de /disastersadmin.",

  configTitle: "Configuración",
  kLanguage: "Idioma de los mensajes: es, en o pt_BR.",
  kDisabled: "Mundos donde nunca salen solos (por comando sí).",
  kSafe: "A menos de estos bloques del spawn de cada mundo nadie sufre nada y no se rompe nada. 0 = sin zona segura.",
  kGamemodes: "Modos de juego a los que afectan.",
  kDelay: "Ticks como mucho desde el inicio del día hasta que empieza el desastre sorteado.",
  kWarning: "Segundos de aviso antes de empezar (0 = sin aviso) y sonido de cada segundo.",
  kBossbar: "Barra de jefe mientras dura: «COLOR ESTILO»; \"\" = sin barra.",
  kLevels: "Los niveles: peso, fuerza, tamaño y duración.",
  kEnabled: "false = ningún desastre cambia bloques: solo daño, empujes, partículas y mobs.",
  kRestore: "Bloques que se reponen por tick como mucho.",
  kContainers: "No tocar bloques que guardan algo.",
  kMax: "Tope de bloques rotos sin reponer a la vez; al llegar, dejan de romper. 0 = sin tope.",
  kImmune: "Bloques que nunca se rompen; admite * como comodín.",
  kResistance: "Probabilidad de aguantar cada intento, de 0 a 1, por material (admite *).",

  filesTitle: "Archivos",
  thFile: "Archivo",
  thContains: "Contiene",
  fConfig: "Ajustes generales, niveles y destrucción.",
  fLang: "Mensajes (es, en, pt_BR).",
  fDisasters: "Un archivo por desastre; _reference.yml tiene todos los campos y no se carga.",
  fRegen: "Lo roto que falta por reponer. No se edita a mano.",
  fState: "El último día sorteado en cada mundo.",
};

export type DisastersCopy = typeof es;

const en: DisastersCopy = {
  title: "Natural disasters (RPGRoll-Disasters)",
  intro:
    "Tornadoes, earthquakes, tsunamis, meteor showers, acid rain, sinkholes, blizzards and anything you want to build: every disaster is a YAML file. They really break the world, respecting claims and protections, and whatever breaks grows back on its own. They come in levels 1 to 6, warn with a countdown and can bring mobs.",

  reqTitle: "Requirements",
  reqBody:
    "Only {lib}. With {seasons}, each disaster only happens in the seasons it lists; without it, any time. {mobs} lets disasters use its mobs, and with {gp} and {wg} their claims and regions are respected.",

  howTitle: "How they work",
  howBody:
    "Every Minecraft day at most one disaster is rolled per world, by its chance ({chance}). The one picked starts at a random moment of the day ({delay} in config.yml), never two at once in the same world. Before it starts it warns: a countdown in the action bar and the boss bar, with sound ({warning}). While it lasts, the boss bar shows the time left.",
  levelsTitle: "Levels",
  levelsBody:
    "Each time it happens, the disaster has a level, rolled by its weight ({weight}). The level multiplies the strength of its phenomena (damage, push, how many blocks it breaks), their size (radius, height, length) and the duration. Levels live in {config} and each disaster can bring its own. Messages show the level with {level}.",
  thLevel: "Level",
  thWeight: "Weight",
  thIntensity: "Strength",
  thSize: "Size",
  thDuration: "Duration",

  phTitle: "Phenomena",
  phBody:
    "A disaster combines one or more phenomena happening together. There are seven types and each one is a template: change its particles, blocks, sounds and numbers and you get a different disaster. The hailstorm is an ice METEOR_STORM; the blizzard and the sandstorm are ACID_RAIN with MOBS.",
  thPhenomenon: "Phenomenon",
  thWhat: "What it does",
  dTornado:
    "A funnel spawns far away and heads for the players. It drags players, mobs and items in a spiral, lifts them up the middle and throws them. It rips up blocks on its way (grass, treetops, roofs), which spin around the funnel and get flung out.",
  dMeteor:
    "Meteors fall at an angle with a trail and explode near players. They leave a real crater with a scorched rim and an ore core at the bottom. Under a roof the blast doesn't reach you.",
  dAcid:
    "Something falls from the sky on whoever is outdoors: damage, effects or freezing. A helmet protects but wears down. It can corrode the ground (grass turns to dirt, leaves vanish), cover it with snow or sand and dissolve dropped items. With {wind}, a wind blows sideways on whoever is outdoors.",
  dQuake:
    "Shaking and rumbling under every player. Real cracks open that wind, narrow at the ends and branch, and whatever is nearby slides into them. Indoors and in caves, chunks of the ceiling fall. Also in the Nether and the End.",
  dSinkhole:
    "The ground caves into a round pit near a player, from the centre outwards, and whatever is on top slides in. The bottom can end up with water, lava or magma.",
  dTsunami:
    "A giant wave rises from a nearby sea, lake or river and rolls towards a player. It is a real wave of water, with its crest curling forward over a hollow tube: it drags, hits and drowns whatever it catches, smashes trees, wood, fences and glass into flying debris, and leaves puddles behind that dry on their own. Stone stops it.",
  dMobs:
    "Mobs that appear around players while it lasts: vanilla (weighted, with more health, damage, gear, effects and a name) or RPGRoll-Mobs ones with {rpgroll}. By default they leave when it ends.",
  examplesBody:
    "Included as examples: tornado, meteor storm, acid rain, earthquake, sinkhole, tsunami, hailstorm, blizzard, sandstorm, the end of the world and Doomsday, which combine several. Every field with its default value is in {reference}.",

  damageTitle: "Destruction and regeneration",
  damageBody:
    "What disasters break is real, but before touching a block it checks, in this order: the safe zone around each world's spawn ({safe}), GriefPrevention claims, that it doesn't store anything (chests, furnaces, signs, beds...), immune blocks, its material's resistance and what WorldGuard and other plugins protect from explosions. What falls (meteors, debris, rocks) is never placed.",
  regenTitle: "Configuring regeneration",
  regenBody:
    "Broken blocks come back on their own, little by little and from the bottom up. A block only comes back if it is still as the disaster left it (or empty, or with water or lava that flowed in): whatever someone builds in the hole is kept. The list is saved in {file}, so it still grows back after a restart or a crash. There are three keys:",
  thKey: "Key",
  thDefault: "Default",
  thDesc: "Description",
  rRegenerate: "Whether broken blocks come back. false = they stay broken forever.",
  rSeconds: "Seconds from breaking until it comes back.",
  rSpread: "Random extra of up to these seconds, so it doesn't all come back at once.",
  regenWhere:
    "They can go in three places and the most specific wins: in {config} (for everything), at the top of a disaster file (for everything it starts, including what it brings with {combine}) or inside a phenomenon. {cmd} restores everything now.",

  yamlTitle: "YAML file examples",
  combineTitle: "Combining disasters",
  combineBody: "A disaster can list several phenomena, and {combine} adds those of other disasters by id.",

  migrateTitle: "Coming from RPGRoll-Seasons 1.1.2",
  migrateBody:
    "Up to 1.1.2 disasters were part of RPGRoll-Seasons. From 1.1.3 they are this separate plugin. On its first start it copies Seasons' {disabled} and any custom disasters you had in {folder}. The command changes from {old} to {cmd}, and the command's intensity becomes a level.",

  commandsTitle: "Commands",
  thCommand: "Command",
  cStart: "Starts a disaster now; without a world, yours. Without a level, a random one by weight.",
  cStop: "Stops the world's disaster.",
  cList: "Lists the disasters with their daily chance, their levels and the blocks waiting to grow back.",
  cRegenerate: "Restores everything disasters have broken, now.",
  cReload: "Reloads config.yml, the language and the disasters.",

  permissionsTitle: "Permissions",
  thPerm: "Permission",
  pAdmin: "Every /disastersadmin command.",

  configTitle: "Configuration",
  kLanguage: "Message language: es, en or pt_BR.",
  kDisabled: "Worlds where they never happen on their own (by command they do).",
  kSafe: "Within this many blocks of each world's spawn nobody is hurt and nothing breaks. 0 = no safe zone.",
  kGamemodes: "Game modes they affect.",
  kDelay: "Maximum ticks from the start of the day until the rolled disaster starts.",
  kWarning: "Warning seconds before it starts (0 = no warning) and the sound played every second.",
  kBossbar: "Boss bar while it lasts: \"COLOUR STYLE\"; \"\" = no bar.",
  kLevels: "The levels: weight, strength, size and duration.",
  kEnabled: "false = no disaster changes blocks: only damage, pushes, particles and mobs.",
  kRestore: "Maximum blocks restored per tick.",
  kContainers: "Never touch blocks that store something.",
  kMax: "Cap on broken blocks waiting at once; when reached, disasters stop breaking. 0 = no cap.",
  kImmune: "Blocks that never break; * works as a wildcard.",
  kResistance: "Chance to hold on each attempt, 0 to 1, per material (* allowed).",

  filesTitle: "Files",
  thFile: "File",
  thContains: "Contains",
  fConfig: "General settings, levels and destruction.",
  fLang: "Messages (es, en, pt_BR).",
  fDisasters: "One file per disaster; _reference.yml has every field and isn't loaded.",
  fRegen: "Broken blocks still waiting to grow back. Don't edit by hand.",
  fState: "The last day rolled in each world.",
};

const pt: DisastersCopy = {
  title: "Desastres naturais (RPGRoll-Disasters)",
  intro:
    "Tornados, terremotos, tsunamis, chuvas de meteoros, chuva ácida, crateras de afundamento, nevascas e o que você quiser criar: cada desastre é um arquivo YAML. Eles quebram o mundo de verdade, respeitando claims e proteções, e o que quebra volta sozinho. Vêm em níveis de 1 a 6, avisam com contagem regressiva e podem trazer mobs.",

  reqTitle: "Requisitos",
  reqBody:
    "Só {lib}. Com {seasons}, cada desastre só acontece nas estações que ele listar; sem ele, em qualquer época. {mobs} permite usar os mobs dele nos desastres, e com {gp} e {wg} os claims e regiões deles são respeitados.",

  howTitle: "Como funcionam",
  howBody:
    "A cada dia de Minecraft é sorteado no máximo um desastre por mundo, pela chance dele ({chance}). O escolhido começa num momento aleatório do dia ({delay} no config.yml), nunca dois ao mesmo tempo no mesmo mundo. Antes de começar ele avisa: contagem regressiva na barra de ação e na barra de chefe, com som ({warning}). Enquanto dura, a barra de chefe mostra quanto falta.",
  levelsTitle: "Níveis",
  levelsBody:
    "Cada vez que acontece, o desastre tem um nível, sorteado pelo peso ({weight}). O nível multiplica a força dos fenômenos (dano, empurrão, quantos blocos quebra), o tamanho (raios, alturas, comprimentos) e a duração. Os níveis ficam em {config} e cada desastre pode trazer os seus. As mensagens mostram o nível com {level}.",
  thLevel: "Nível",
  thWeight: "Peso",
  thIntensity: "Força",
  thSize: "Tamanho",
  thDuration: "Duração",

  phTitle: "Fenômenos",
  phBody:
    "Um desastre junta um ou vários fenômenos que acontecem juntos. São sete tipos e cada um é um modelo: mudando partículas, blocos, sons e números sai um desastre diferente. A chuva de granizo é um METEOR_STORM de gelo; a nevasca e a tempestade de areia são ACID_RAIN com MOBS.",
  thPhenomenon: "Fenômeno",
  thWhat: "O que faz",
  dTornado:
    "Um funil nasce longe e vai até os jogadores. Arrasta jogadores, mobs e itens em espiral, levanta pelo centro e arremessa. Arranca blocos pelo caminho (grama, copas de árvores, telhados), que giram pelo funil e são lançados.",
  dMeteor:
    "Meteoros caem na diagonal com rastro e explodem perto dos jogadores. Deixam uma cratera de verdade com a borda queimada e um núcleo de minérios no fundo. Debaixo de um teto o impacto não chega.",
  dAcid:
    "Algo cai do céu em quem está ao ar livre: dano, efeitos ou congelamento. O capacete protege, mas se desgasta. Pode corroer o chão (a grama vira terra, as folhas somem), cobrir de neve ou areia e dissolver itens largados. Com {wind}, um vento empurra de lado quem está ao ar livre.",
  dQuake:
    "Tremores e estrondos sob cada jogador. Abrem-se rachaduras de verdade que serpenteiam, afinam nas pontas e se ramificam, e o que está perto escorrega para dentro. Sob teto e em cavernas caem pedaços do teto. Também no Nether e no End.",
  dSinkhole:
    "O chão afunda num poço redondo perto de um jogador, do centro para fora, e o que está em cima escorrega para dentro. O fundo pode ficar com água, lava ou magma.",
  dTsunami:
    "Uma onda gigante sai de um mar, lago ou rio próximo e avança até um jogador. É uma onda de água de verdade, com a crista curvada para a frente e o tubo embaixo: arrasta, golpeia e afoga o que pega, arrasa árvores, madeira, cercas e vidros lançando escombros, e ao passar deixa poças que secam sozinhas. A pedra a para.",
  dMobs:
    "Mobs que aparecem ao redor dos jogadores enquanto dura: vanilla (com peso, mais vida, dano, equipamento, efeitos e nome) ou do RPGRoll-Mobs com {rpgroll}. Por padrão vão embora no fim.",
  examplesBody:
    "Vêm de exemplo o tornado, a tempestade de meteoros, a chuva ácida, o terremoto, a cratera, o tsunami, a chuva de granizo, a nevasca, a tempestade de areia, o fim do mundo e o Juízo Final, que combinam vários. Todos os campos com o valor padrão estão em {reference}.",

  damageTitle: "Destruição e regeneração",
  damageBody:
    "O que os desastres quebram é de verdade, mas antes de mexer num bloco ele verifica, nesta ordem: a zona segura ao redor do spawn de cada mundo ({safe}), os claims do GriefPrevention, que o bloco não guarde nada (baús, fornalhas, placas, camas...), os blocos imunes, a resistência do material e o que o WorldGuard e outros plugins protegem de explosões. O que cai (meteoros, destroços, pedras) nunca é colocado.",
  regenTitle: "Configurar a regeneração",
  regenBody:
    "O que quebrou volta sozinho, aos poucos e de baixo para cima. Só volta se continuar como o desastre deixou (ou vazio, ou com água ou lava que entrou): o que alguém construir no buraco é respeitado. A lista fica em {file}, então volta mesmo depois de um reinício ou de uma queda. São três chaves:",
  thKey: "Chave",
  thDefault: "Padrão",
  thDesc: "Descrição",
  rRegenerate: "Se o que quebrou volta. false = fica quebrado para sempre.",
  rSeconds: "Segundos desde que quebra até voltar.",
  rSpread: "Extra aleatório de até estes segundos, para não voltar tudo de uma vez.",
  regenWhere:
    "Podem ficar em três lugares e vale o mais específico: no {config} (para tudo), no topo do arquivo de um desastre (para tudo o que ele inicia, inclusive o que traz com {combine}) ou dentro de um fenômeno. {cmd} repõe tudo agora.",

  yamlTitle: "Exemplos de arquivo YAML",
  combineTitle: "Combinar desastres",
  combineBody: "Um desastre pode listar vários fenômenos, e {combine} soma os de outros desastres por id.",

  migrateTitle: "Se você vem do RPGRoll-Seasons 1.1.2",
  migrateBody:
    "Até a 1.1.2 os desastres faziam parte do RPGRoll-Seasons. A partir da 1.1.3 são este plugin separado. Na primeira vez que inicia, ele copia o {disabled} do Seasons e os desastres próprios que você tinha em {folder}. O comando passa de {old} para {cmd}, e a intensidade do comando vira nível.",

  commandsTitle: "Comandos",
  thCommand: "Comando",
  cStart: "Inicia um desastre agora; sem mundo, o seu. Sem nível, um aleatório pelo peso.",
  cStop: "Interrompe o desastre do mundo.",
  cList: "Lista os desastres com a chance diária, os níveis e os blocos que faltam voltar.",
  cRegenerate: "Repõe agora tudo o que os desastres quebraram.",
  cReload: "Recarrega o config.yml, o idioma e os desastres.",

  permissionsTitle: "Permissões",
  thPerm: "Permissão",
  pAdmin: "Todos os comandos de /disastersadmin.",

  configTitle: "Configuração",
  kLanguage: "Idioma das mensagens: es, en ou pt_BR.",
  kDisabled: "Mundos onde nunca acontecem sozinhos (por comando, sim).",
  kSafe: "A menos destes blocos do spawn de cada mundo ninguém sofre nada e nada quebra. 0 = sem zona segura.",
  kGamemodes: "Modos de jogo afetados.",
  kDelay: "Ticks no máximo desde o início do dia até o desastre sorteado começar.",
  kWarning: "Segundos de aviso antes de começar (0 = sem aviso) e o som de cada segundo.",
  kBossbar: "Barra de chefe enquanto dura: \"COR ESTILO\"; \"\" = sem barra.",
  kLevels: "Os níveis: peso, força, tamanho e duração.",
  kEnabled: "false = nenhum desastre muda blocos: só dano, empurrões, partículas e mobs.",
  kRestore: "Máximo de blocos repostos por tick.",
  kContainers: "Nunca mexer em blocos que guardam algo.",
  kMax: "Limite de blocos quebrados esperando ao mesmo tempo; ao chegar, os desastres param de quebrar. 0 = sem limite.",
  kImmune: "Blocos que nunca quebram; * funciona como curinga.",
  kResistance: "Chance de aguentar cada tentativa, de 0 a 1, por material (aceita *).",

  filesTitle: "Arquivos",
  thFile: "Arquivo",
  thContains: "Contém",
  fConfig: "Ajustes gerais, níveis e destruição.",
  fLang: "Mensagens (es, en, pt_BR).",
  fDisasters: "Um arquivo por desastre; _reference.yml tem todos os campos e não é carregado.",
  fRegen: "Blocos quebrados que ainda faltam voltar. Não edite à mão.",
  fState: "O último dia sorteado em cada mundo.",
};

export const DISASTERS_COPY: Record<Locale, DisastersCopy> = { es, en, pt };
