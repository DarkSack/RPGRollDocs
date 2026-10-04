import type { Locale } from "../../i18n/strings";

/** Textos de la sección de lucky blocks de la página de Crates (las claves YAML no se traducen). */
export interface LuckyCopy {
  title: string;
  intro: string;
  how: string[];
  safeTitle: string;
  safe: string;
  thAction: string;
  thParams: string;
  actions: [string, string, string][];
  crateNote: string;
  packTitle: string;
  pack: string;
  cmds: [string, string][];
}

const ACTION_KEYS: [string, string][] = [
  ["DROP", "item, amount, name, enchantments, fake"],
  ["RAIN", "item, amount, radius, height"],
  ["COMMAND", "command ({player} {x} {y} {z} {world})"],
  ["MONEY", "amount"],
  ["XP", "amount"],
  ["LUCKY", "lucky, amount"],
  ["MOB", "entity, amount, name, baby"],
  ["POTION", "effect, seconds, level"],
  ["EXPLOSION", "power, delay, fire"],
  ["LIGHTNING", "damage"],
  ["LAUNCH", "power"],
  ["CAGE", "block, seconds"],
  ["ARROWS", "amount, height"],
  ["FIREWORK", "amount"],
  ["MESSAGE", "text"],
  ["TITLE", "title, subtitle"],
  ["SOUND", "sound, volume, pitch"],
  ["PARTICLE", "particle, count"],
];

function withText(texts: string[]): [string, string, string][] {
  return ACTION_KEYS.map(([type, params], i) => [type, params, texts[i]]);
}

const es: LuckyCopy = {
  title: "Lucky blocks",
  intro:
    "Bloques que se colocan con su ítem y, al romperlos, sueltan un resultado al azar de su tabla: premios, sustos o las dos cosas. Cada tipo vive en plugins/RPGRoll-Crates/lucky/<tipo>.yml; el jar trae siete de ejemplo (común, raro, épico, legendario, maldito, minero y cristal).",
  how: [
    "En el mundo son bloques musicales con instrumento de esqueleto y una nota por tipo (note: 0–24). Tu resource pack puede dibujar cada nota como un lucky block distinto; Geyser puede hacer lo mismo para Bedrock con un bloque propio por estado.",
    "El ítem es item.material (papel por defecto) con item.model, el modelo de tu pack. Se coloca con clic derecho: el plugin lo anuncia como una colocación normal, así que GriefPrevention, WorldGuard y CoreProtect lo ven.",
    "Solo cuenta como lucky block el que se colocó con su ítem (queda apuntado en el chunk). Un bloque musical con una calavera de esqueleto encima no se queda con ese instrumento, y uno puesto con /setblock es un bloque musical normal.",
    "No se puede afinar, no suena, no arde y los pistones no lo mueven. Una explosión no lo abre: lo devuelve como ítem. En creativo se rompe sin abrirse.",
    "Cada resultado tiene weight (relativo; /lucky outcomes enseña el %), luck GOOD, NEUTRAL o BAD (el aviso y el sonido), message opcional y announce: true para anunciarlo a todos. Las cantidades admiten rangos: amount: 2-5.",
  ],
  safeTitle: "Nada de lo que hace rompe el mundo",
  safe: "Las explosiones (también la TNT con retardo) no rompen bloques ni queman, el rayo es solo el efecto (el daño lo pone damage), la jaula ocupa solo aire, no suelta nada al romperla y se quita sola, y las flechas no se pueden recoger. La jaula exige un bloque que deje pasar la luz.",
  thAction: "Acción",
  thParams: "Parámetros",
  actions: withText([
    'Suelta un ítem vanilla en el bloque. enchantments: "sharpness:3,unbreaking:2". fake: true se ve pero no se puede coger.',
    "Lluvia de ítems sobre el jugador.",
    "Comando de consola (por ejemplo itemadmin give {player} <id> 1 para ítems de RPGRoll-Items).",
    "Dinero por Vault.",
    "Orbes de experiencia.",
    "Suelta otro lucky block.",
    "Mobs alrededor del bloque.",
    "Efecto de poción al jugador.",
    "Explosión sin romper bloques; con delay (ticks) es una TNT encendida.",
    "Rayo (solo efecto) y damage de vida.",
    "Impulso hacia arriba.",
    "Jaula temporal alrededor del jugador.",
    "Flechas que caen sobre el jugador.",
    "Fuegos artificiales.",
    "Mensaje al jugador.",
    "Título en pantalla.",
    'Sonido ("entity.player.levelup" o ENTITY_PLAYER_LEVELUP).',
    "Partículas.",
  ]),
  crateNote: 'Como premio de un crate: acción LUCKY_BLOCK con value "tipo" o "tipo,cantidad".',
  packTitle: "Requisito del servidor",
  pack: "block-updates.disable-noteblock-updates: true en paper-global.yml: sin eso, un bloque musical cambia de instrumento al tocar sus vecinos y el lucky block dejaría de serlo.",
  cmds: [
    ["/lucky give <jugador> <tipo> [cantidad]", "Da lucky blocks."],
    ["/lucky list", "Tipos cargados, con su nota."],
    ["/lucky outcomes <tipo>", "Resultados del tipo y su probabilidad."],
    ["/lucky test <tipo> <resultado>", "Ejecuta un resultado delante de ti, como si lo rompieras."],
    ["/lucky reload", "Recarga lucky/*.yml."],
  ],
};

const en: LuckyCopy = {
  title: "Lucky blocks",
  intro:
    "Blocks placed with their item that, when broken, roll a random outcome from their table: rewards, scares or both. Each type lives in plugins/RPGRoll-Crates/lucky/<type>.yml; the jar ships seven examples (common, rare, epic, legendary, cursed, miner and crystal).",
  how: [
    "In the world they are note blocks with the skeleton instrument and one note per type (note: 0–24). Your resource pack can draw each note as a different lucky block; Geyser can do the same for Bedrock with a custom block per state.",
    "The item is item.material (paper by default) with item.model, the model in your pack. It is placed with right click: the plugin announces it as a normal placement, so GriefPrevention, WorldGuard and CoreProtect see it.",
    "Only a block placed with its item counts as a lucky block (it is recorded in the chunk). A note block under a skeleton skull does not keep that instrument, and one placed with /setblock is a plain note block.",
    "It cannot be tuned, does not play, does not burn and pistons do not move it. An explosion does not open it: it gives it back as an item. In creative it breaks without opening.",
    "Each outcome has weight (relative; /lucky outcomes shows the %), luck GOOD, NEUTRAL or BAD (the notice and sound), an optional message and announce: true to broadcast it. Amounts accept ranges: amount: 2-5.",
  ],
  safeTitle: "Nothing it does breaks the world",
  safe: "Explosions (delayed TNT too) never break blocks or set fires, lightning is only the effect (damage sets the harm), the cage only fills air, drops nothing when broken and removes itself, and arrows cannot be picked up. The cage needs a block that lets light through.",
  thAction: "Action",
  thParams: "Parameters",
  actions: withText([
    'Drops a vanilla item at the block. enchantments: "sharpness:3,unbreaking:2". fake: true shows it but it cannot be picked up.',
    "Rains items over the player.",
    "Console command (for example itemadmin give {player} <id> 1 for RPGRoll-Items items).",
    "Money through Vault.",
    "Experience orbs.",
    "Drops another lucky block.",
    "Mobs around the block.",
    "Potion effect on the player.",
    "Explosion that breaks no blocks; with delay (ticks) it is a lit TNT.",
    "Lightning (effect only) plus damage.",
    "Upward push.",
    "Temporary cage around the player.",
    "Arrows falling on the player.",
    "Fireworks.",
    "Message to the player.",
    "On-screen title.",
    'Sound ("entity.player.levelup" or ENTITY_PLAYER_LEVELUP).',
    "Particles.",
  ]),
  crateNote: 'As a crate reward: action LUCKY_BLOCK with value "type" or "type,amount".',
  packTitle: "Server requirement",
  pack: "block-updates.disable-noteblock-updates: true in paper-global.yml: without it a note block changes instrument when its neighbours change and the lucky block would stop being one.",
  cmds: [
    ["/lucky give <player> <type> [amount]", "Gives lucky blocks."],
    ["/lucky list", "Loaded types and their note."],
    ["/lucky outcomes <type>", "Outcomes of a type and their chance."],
    ["/lucky test <type> <outcome>", "Runs an outcome in front of you, as if you broke one."],
    ["/lucky reload", "Reloads lucky/*.yml."],
  ],
};

const pt: LuckyCopy = {
  title: "Lucky blocks",
  intro:
    "Blocos colocados com o seu item que, ao serem quebrados, sorteiam um resultado da sua tabela: prêmios, sustos ou os dois. Cada tipo fica em plugins/RPGRoll-Crates/lucky/<tipo>.yml; o jar traz sete exemplos (comum, raro, épico, lendário, maldito, mineiro e cristal).",
  how: [
    "No mundo são blocos musicais com o instrumento de esqueleto e uma nota por tipo (note: 0–24). O seu resource pack pode desenhar cada nota como um lucky block diferente; o Geyser pode fazer o mesmo no Bedrock com um bloco próprio por estado.",
    "O item é item.material (papel por padrão) com item.model, o modelo do seu pack. Coloca-se com clique direito: o plugin anuncia como uma colocação normal, então GriefPrevention, WorldGuard e CoreProtect enxergam.",
    "Só conta como lucky block o que foi colocado com o seu item (fica registrado no chunk). Um bloco musical sob uma caveira de esqueleto não fica com esse instrumento, e um colocado com /setblock é um bloco musical comum.",
    "Não pode ser afinado, não toca, não queima e pistões não o movem. Uma explosão não o abre: devolve como item. No criativo quebra sem abrir.",
    "Cada resultado tem weight (relativo; /lucky outcomes mostra o %), luck GOOD, NEUTRAL ou BAD (o aviso e o som), message opcional e announce: true para anunciar a todos. Quantidades aceitam intervalos: amount: 2-5.",
  ],
  safeTitle: "Nada do que faz quebra o mundo",
  safe: "As explosões (também a TNT com atraso) não quebram blocos nem queimam, o raio é só o efeito (o dano vem de damage), a jaula ocupa só ar, não solta nada ao ser quebrada e some sozinha, e as flechas não podem ser pegas. A jaula exige um bloco que deixe passar a luz.",
  thAction: "Ação",
  thParams: "Parâmetros",
  actions: withText([
    'Solta um item vanilla no bloco. enchantments: "sharpness:3,unbreaking:2". fake: true aparece mas não pode ser pego.',
    "Chuva de itens sobre o jogador.",
    "Comando de console (por exemplo itemadmin give {player} <id> 1 para itens do RPGRoll-Items).",
    "Dinheiro pelo Vault.",
    "Orbes de experiência.",
    "Solta outro lucky block.",
    "Mobs ao redor do bloco.",
    "Efeito de poção no jogador.",
    "Explosão sem quebrar blocos; com delay (ticks) é uma TNT acesa.",
    "Raio (só efeito) e damage de vida.",
    "Impulso para cima.",
    "Jaula temporária ao redor do jogador.",
    "Flechas caindo sobre o jogador.",
    "Fogos de artifício.",
    "Mensagem ao jogador.",
    "Título na tela.",
    'Som ("entity.player.levelup" ou ENTITY_PLAYER_LEVELUP).',
    "Partículas.",
  ]),
  crateNote: 'Como prêmio de crate: ação LUCKY_BLOCK com value "tipo" ou "tipo,quantidade".',
  packTitle: "Requisito do servidor",
  pack: "block-updates.disable-noteblock-updates: true no paper-global.yml: sem isso, um bloco musical muda de instrumento quando os vizinhos mudam e o lucky block deixaria de ser.",
  cmds: [
    ["/lucky give <jogador> <tipo> [quantidade]", "Dá lucky blocks."],
    ["/lucky list", "Tipos carregados e a sua nota."],
    ["/lucky outcomes <tipo>", "Resultados do tipo e a sua chance."],
    ["/lucky test <tipo> <resultado>", "Executa um resultado na sua frente, como se quebrasse um."],
    ["/lucky reload", "Recarrega lucky/*.yml."],
  ],
};

export const LUCKY_COPY: Record<Locale, LuckyCopy> = { es, en, pt };
