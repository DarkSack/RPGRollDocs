import type { Locale } from "../../i18n";

/**
 * Novedades de la versión 1.1.9, por página. Cada página pinta sus secciones al final con
 * <Novedades119 page="..."/>. Los bloques de código no se traducen: viven en CODE.
 */
export type Novedades119Page =
  | "extras"
  | "encantamientos"
  | "mobs"
  | "economy"
  | "machines"
  | "recipes"
  | "quests"
  | "guilds"
  | "furniture"
  | "configuracion"
  | "pass"
  | "chat"
  | "tab"
  | "disasters";

export interface Novedad {
  /** Id del ancla (único en la página). */
  id: string;
  title: string;
  /** Párrafos; `texto` entre comillas invertidas se pinta como código. */
  body: string[];
  /** Clave de CODE con un bloque de ejemplo. */
  code?: keyof typeof CODE;
}

export const CODE = {
  needsSpeed: {
    filename: "plugins/RPGRoll-Extras/config.yml",
    code: `needs-speed:
  thirst: 0.5
  stress: 2

inventory-sort:
  enabled: true
  wand: true`,
  },
  elevator: {
    filename: "plugins/RPGRoll-Extras/config.yml",
    code: `elevator:
  enabled: true
  block: LIGHT_BLUE_GLAZED_TERRACOTTA
  max-distance: 32
  recipe-amount: 2

reinforcement:
  enabled: true`,
  },
  superEnchanter: {
    filename: "plugins/RPGRoll-Enchantments/config.yml",
    code: `super-enchanter:
  enabled: true
  extra-levels: 3
  hard-cap: 10
  base-levels: 15
  step-levels: 10
  lapis-per-level: 16
  treasure: false
  vanilla-levels: 2
  vanilla-lapis: 3
  rarity-levels:
    COMMON: 3
    RARE: 8
    LEGENDARY: 18
  rarity-lapis:
    COMMON: 4
    RARE: 10
    LEGENDARY: 24`,
  },
  infuser: {
    filename: "plugins/RPGRoll-Enchantments/config.yml",
    code: `infuser:
  enabled: true
  cost-levels: 10
  max-effects-per-piece: 1
  max-amplifier:
    default: 1
    strength: 0
  allowed-effects: [speed, jump_boost, strength, regeneration, resistance,
    fire_resistance, water_breathing, night_vision, slow_falling, luck]`,
  },
  rarities: {
    filename: "plugins/RPGRoll-Mobs/config.yml",
    code: `health-bar:
  enabled: true
  seconds: 5
  segments: 10

rarities:
  enabled: true
  applies-to: hostile
  spawn-reasons: [NATURAL, PATROL, RAID, JOCKEY, MOUNT, REINFORCEMENTS, VILLAGE_INVASION]
  exclude: [ender_dragon, wither, warden, elder_guardian]
  tiers:
    comun:
      name: "&fComún"
      weight: 85
    raro:
      name: "&9Raro"
      weight: 12
      health: 1.5
      damage: 1.25
      loot: 2
      xp: 2
      money: 2
    galactico:
      name: "&d&lGaláctico"
      weight: 0.3
      health: 4
      damage: 2.2
      scale: 1.25
      loot: 5
      xp: 12
      money: 50
      glow: true
      particles: true
      announce: true`,
  },
  dailyLimits: {
    filename: "plugins/RPGRoll-Economy/config.yml",
    code: `daily-limits:
  full-price-units: 192
  max-units: 768
  reduced-ratio: 0.3`,
  },
  spawnerFrame: {
    filename: "plugins/RPGRoll-Machines/spawners.yml",
    code: `frame:
  enabled: true
  model: "mipack:marco_{tier}"
  scale: 1.0`,
  },
  menusPack: {
    filename: "config.yml",
    code: `menus:
  pack: "sackito:menus"`,
  },
  combat: {
    filename: "plugins/RPGRoll/config/gameplay.yml",
    code: `combat:
  incoming_damage_multiplier: 1.0`,
  },
  furnitureCrafting: {
    filename: "plugins/RPGRoll-Furniture/config.yml",
    code: `crafting:
  enabled: false`,
  },
} as const;

type Copy = { badge: string; pages: Record<Novedades119Page, Novedad[]> };

const es: Copy = {
  badge: "Nuevo en 1.1.9",
  pages: {
    extras: [
      {
        id: "v119-menu-necesidades",
        title: "Menú de admin de necesidades",
        body: [
          "`/extrasadmin menu` abre un menú para manejar las necesidades sin tocar archivos. Desde él enciendes o apagas cada necesidad (sed, stamina, fatiga, oxígeno, estrés...), cambias su velocidad, decides si se reinicia al morir, apagas la temperatura, eliges los mundos sin necesidades y ajustas la pausa por AFK.",
          "En Jugadores eliges a alguien conectado y ves sus barras: subirlas o bajarlas de 10 en 10, llenarlas o vaciarlas, curarle las condiciones activas, **Curar todo** o hacerlo **Inmune** (no gasta necesidades ni sufre sus efectos; se guarda con el jugador).",
          "Cada cambio se escribe en el YAML (con sus comentarios) y se recarga solo. La velocidad vive en `needs-speed`: 1 es la normal, 0.5 la mitad y 2 el doble. La temperatura se apaga con `enabled: false` en `temperature.yml`.",
        ],
        code: "needsSpeed",
      },
      {
        id: "v119-ordenar",
        title: "Ordenar cofres e inventario",
        body: [
          "Con el cursor vacío, **Shift + clic en una casilla vacía** ordena ese contenedor; en tu inventario ordena solo las 27 casillas de la mochila (ni la barra rápida ni la armadura). En creativo también sirve el clic central. Junta los montones y agrupa: bloques, herramientas, armas y armadura, comida, minerales y el resto.",
          "`/ordenar` (alias `/sort`) ordena tu inventario; `/ordenar on` y `/ordenar off` encienden o apagan el gesto para ti. La **Varita de orden** (palo + cofre, sin forma) ordena el cofre al que le das clic derecho, y tu inventario si das clic al aire. `/ordenar varita` da una (permiso `rpgrollextras.sort.admin`).",
          "Solo ordena contenedores de bloque (cofres, barriles, cajas de shulker...) y el cofre de ender: nunca menús de plugins. La varita respeta las protecciones: si no puedes abrir ese cofre, no lo ordena. Se apaga con `inventory-sort.enabled` y `inventory-sort.wand`; permiso del jugador `rpgrollextras.sort` (por defecto todos).",
        ],
      },
      {
        id: "v119-elevadores",
        title: "Elevadores y Reforzador",
        body: [
          "**Elevador**: 8 de lana alrededor de una perla de ender dan `recipe-amount` bloques. Saltar encima te sube al siguiente elevador de la misma columna y agacharte te baja. Necesita dos bloques libres encima del destino y como mucho `max-distance` de separación. Un bloque igual puesto a mano no cuenta.",
          "**Reforzador** (obsidiana, lingote de hierro y palo en columna; 64 usos): clic derecho en un bloque donde puedas construir y nada lo rompe, ni jugadores, explosiones, pistones, fuego, endermans, withers, agua ni desastres. Agachado + clic derecho en uno tuyo le quita el refuerzo; `rpgrollextras.reinforce.admin` (op) se lo quita a cualquiera.",
        ],
        code: "elevator",
      },
    ],
    encantamientos: [
      {
        id: "v119-super-encantador",
        title: "Súper encantador por lista",
        body: [
          "Una mesa de encantamientos marcada (bloque de lapislázuli, estrella del Nether y bloque de lapislázuli; bloque de diamante, mesa de encantamientos y bloque de diamante; 3 obsidianas llorosas). Con un ítem en la mano, clic derecho: sale una fila por cada encantamiento vanilla y del plugin que admite ese ítem, con una barra de niveles. Nada se cobra hasta pulsar **Encantar**.",
          "Hasta el máximo vanilla cada nivel cuesta `vanilla-levels` niveles de experiencia y `vanilla-lapis` lapislázulis; los del plugin cobran por rareza con `rarity-levels` y `rarity-lapis`. Por encima del máximo vanilla (Afilado V → VI...) suben hasta `extra-levels` niveles más, nunca pasando `hard-cap`, y cada uno cuesta `base-levels` + `step-levels` por nivel extra anterior y `lapis-per-level`. Los de tesoro (Reparación, Paso helado...) quedan fuera salvo `treasure: true`.",
        ],
        code: "superEnchanter",
      },
      {
        id: "v119-infusor",
        title: "Infusor",
        body: [
          "Un soporte de pociones marcado (lágrima de ghast arriba; vara de blaze, soporte de pociones y vara de blaze en medio; 3 diamantes abajo). Con una pieza de armadura en la mano, clic derecho: eliges una poción de tu inventario y su efecto queda grabado en la pieza. Mientras la lleves puesta tienes ese efecto. Se gastan la poción y `cost-levels` niveles.",
          "Solo los efectos de `allowed-effects` (nada dañino, instantáneo ni invisibilidad), con un tope de amplificador por efecto y `max-effects-per-piece` efectos por pieza (uno nuevo sustituye al más antiguo).",
        ],
        code: "infuser",
      },
    ],
    mobs: [
      {
        id: "v119-rarezas",
        title: "Rarezas, barra de vida y bestiario",
        body: [
          "Cada mob vanilla que aparece sale de una rareza por peso: común, raro, legendario o galáctico. `health`, `damage` y `scale` multiplican sus atributos; `loot`, `xp` y `money` multiplican lo que suelta al matarlo un jugador (`money` en la moneda de Vault). `glow` lo hace brillar (solo Java), `particles` le pone partículas y `announce` avisa a quien esté cerca al aparecer y a todo el servidor al morir.",
          "`applies-to: hostile` lo limita a monstruos (`all` incluye animales). `spawn-reasons` deja fuera los spawners, para que una granja no dé rarezas. Tras cambiarlo, `/mobadmin reload`.",
          "**Barra de vida**: al golpear a un mob su nombre pasa unos segundos a «nombre ▮▮▮▮▮▯▯▯▯▯ 45/100», con su rareza; se ve en Java y Bedrock. **Bestiario**: `/bestiario` (también `/bestiary` y `/pokedex`) muestra cuántos de cada especie has matado y de qué rareza.",
        ],
        code: "rarities",
      },
    ],
    economy: [
      {
        id: "v119-tope-diario",
        title: "Tope diario de venta",
        body: [
          "Para que canteras y granjas automáticas no fabriquen dinero sin fin, cada jugador tiene un tope diario por producto en `/tienda` y en el comprador. Las primeras `full-price-units` unidades del día se pagan enteras; hasta `max-units`, a `reduced-ratio` del precio; pasado eso no se compra más hasta el día siguiente. `full-price-units: 0` lo apaga.",
        ],
        code: "dailyLimits",
      },
      {
        id: "v119-menus-economia",
        title: "Menús con fondo dibujado",
        body: [
          "Con `menus.pack` (el namespace de la fuente de tu paquete de recursos), `/tienda` y las tiendas de jugadores usan el fondo y los botones dibujados. Vacío, se ven los menús de cofre de siempre.",
        ],
        code: "menusPack",
      },
    ],
    machines: [
      {
        id: "v119-cantera",
        title: "Cantera y marco de spawners",
        body: [
          "Las mejoras de la cantera se ven en 4 filas y tienen su propio menú de módulos. Los spawners mejorados o apilados pueden llevar un **marco 3D**: un `item_display` con un modelo de tu paquete de recursos. `{tier}` vale 1, 2 o 3 según la parte de las mejoras que ya tiene; si el modelo sobresale, sube `hologram.height`.",
        ],
        code: "spawnerFrame",
      },
    ],
    recipes: [
      {
        id: "v119-categorias",
        title: "Catálogo por tipos",
        body: [
          "El recetario se abre por tipos (bloques, herramientas, comida...), con apartados propios para lo del servidor y para lo de cada plugin. Cuando un plugin publica sus recetas con los ingredientes reales (con `RecipeSource` de RPGRoll-Lib), esas ganan a las que solo ve Bukkit.",
          "Con `menus.pack`, las categorías, los plugins, el catálogo y la receta usan el fondo dibujado del paquete de recursos.",
        ],
        code: "menusPack",
      },
    ],
    quests: [
      {
        id: "v119-continuar",
        title: "/quest continuar",
        body: [
          "`/quest continuar [MAIN_STORY|SIDE_QUEST|DAILY]` te dice en qué capítulo de la historia vas y te repite sus objetivos; si el siguiente aún no se puede empezar, te dice qué falta. Sin tipo, usa la historia principal.",
        ],
      },
    ],
    guilds: [
      {
        id: "v119-placeholders",
        title: "Placeholders nuevos",
        body: [
          "`%rpgrollguilds_team_rank%` y `%rpgrollguilds_guild_rank%` dan el nombre de tu rol en el idioma del servidor (los `*_role` siguen dando la constante, para condiciones). `%rpgrollguilds_guild_balance%` da la tesorería compartida del gremio en la moneda de Vault.",
        ],
      },
    ],
    furniture: [
      {
        id: "v119-crafting",
        title: "Apagar las recetas del carpintero",
        body: [
          "Con `crafting.enabled: false` se ignoran todas las recetas del carpintero: los muebles solo se compran en la tienda (RPGRoll-Economy, línea `furniture: <id>`) o se dan con `/furnitureadmin give`.",
        ],
        code: "furnitureCrafting",
      },
    ],
    configuracion: [
      {
        id: "v119-menus-dibujados",
        title: "Menús con fondo dibujado",
        body: [
          "RPGRoll-Lib trae `MenuBackground` y `MenuSkin`: con `menus.pack` puesto, los menús de raza, clase, trabajos y confirmación usan el fondo y los botones de tu paquete de recursos. Antes de crear el personaje se ve un resumen de la raza y la clase elegidas. Vacío (lo de fábrica), se ven los menús de cofre de siempre.",
          "La misma clave existe en Economy, Pass, Recipes, Guilds y Extras.",
        ],
        code: "menusPack",
      },
      {
        id: "v119-dano-recibido",
        title: "Daño recibido",
        body: [
          "`combat.incoming_damage_multiplier` multiplica el daño que recibe la salud RPG (100 + 5 por punto de Resistencia, unas 5 veces los 20 de vanilla). 1.0 es el golpe vanilla tal cual; 3.0 se parece más a lo que asusta en vanilla.",
        ],
        code: "combat",
      },
    ],
    pass: [
      {
        id: "v119-menus-pase",
        title: "Menús con fondo dibujado",
        body: [
          "Con `menus.pack`, el pase, las misiones y la recompensa diaria usan el fondo y los botones de tu paquete de recursos. Vacío, se ven los menús de cofre de siempre.",
        ],
        code: "menusPack",
      },
    ],
    chat: [
      {
        id: "v119-cercania",
        title: "Aviso de cercanía",
        body: ["En un canal de cercanía, si nadie estaba a tu alcance para oírte, el chat te lo avisa: te dice hasta cuántos bloques llega, que no atraviesa paredes y cómo pasarte al canal global."],
      },
    ],
    tab: [
      {
        id: "v119-sidebar",
        title: "Sidebar",
        body: ["El sidebar se repinta solo cuando cambian sus datos; ya no hace falta recargar para verlo al día."],
      },
    ],
    disasters: [
      {
        id: "v119-chunks",
        title: "Chunks descargados",
        body: ["Los desastres ya no cargan chunks descargados: antes podían colgar el servidor."],
      },
    ],
  },
};

const en: Copy = {
  badge: "New in 1.1.9",
  pages: {
    extras: [
      {
        id: "v119-menu-necesidades",
        title: "Needs admin menu",
        body: [
          "`/extrasadmin menu` opens a menu to manage needs without editing files. Turn each need on or off (thirst, stamina, fatigue, oxygen, stress...), change its speed, choose whether it resets on death, turn temperature off, pick the worlds without needs and tune the AFK pause.",
          "Under Players you pick someone online and see their bars: raise or lower them by 10, fill or empty them, cure their active conditions, **Cure all** or make them **Immune** (no need drain and no effects; saved with the player).",
          "Every change is written to the YAML (keeping its comments) and reloads itself. Speed lives in `needs-speed`: 1 is normal, 0.5 half and 2 double. Temperature is turned off with `enabled: false` in `temperature.yml`.",
        ],
        code: "needsSpeed",
      },
      {
        id: "v119-ordenar",
        title: "Sorting chests and inventory",
        body: [
          "With an empty cursor, **Shift + click an empty slot** sorts that container; in your own inventory it sorts only the 27 backpack slots (not the hotbar or armor). In creative, middle click works too. Stacks are merged and grouped: blocks, tools, weapons and armor, food, ores and the rest.",
          "`/ordenar` (alias `/sort`) sorts your inventory; `/ordenar on` and `/ordenar off` turn the gesture on or off for you. The **Sorting wand** (stick + chest, shapeless) sorts the chest you right-click, and your inventory when you click the air. `/ordenar varita` gives one (permission `rpgrollextras.sort.admin`).",
          "It only sorts block containers (chests, barrels, shulker boxes...) and the ender chest: never plugin menus. The wand respects protections: if you cannot open that chest, it is not sorted. Turn it off with `inventory-sort.enabled` and `inventory-sort.wand`; player permission `rpgrollextras.sort` (everyone by default).",
        ],
      },
      {
        id: "v119-elevadores",
        title: "Elevators and Reinforcer",
        body: [
          "**Elevator**: 8 wool around an ender pearl give `recipe-amount` blocks. Jump on it to go up to the next elevator in the same column; sneak to go down. It needs two free blocks above the target and at most `max-distance` between them. The same block placed by hand does not count.",
          "**Reinforcer** (obsidian, iron ingot and stick in a column; 64 uses): right-click a block where you can build and nothing breaks it, not players, explosions, pistons, fire, endermen, withers, water or disasters. Sneak + right-click one of yours to remove it; `rpgrollextras.reinforce.admin` (op) can remove anyone's.",
        ],
        code: "elevator",
      },
    ],
    encantamientos: [
      {
        id: "v119-super-encantador",
        title: "Super enchanter with a list",
        body: [
          "A marked enchanting table (lapis block, nether star and lapis block; diamond block, enchanting table and diamond block; 3 crying obsidian). With an item in hand, right-click: you get one row per vanilla and plugin enchantment that fits the item, each with a level bar. Nothing is charged until you press **Enchant**.",
          "Up to the vanilla maximum each level costs `vanilla-levels` experience levels and `vanilla-lapis` lapis; plugin enchantments are priced by rarity with `rarity-levels` and `rarity-lapis`. Above the vanilla maximum (Sharpness V → VI...) they go up to `extra-levels` more, never past `hard-cap`, and each costs `base-levels` + `step-levels` per previous extra level and `lapis-per-level`. Treasure enchantments (Mending, Frost Walker...) are left out unless `treasure: true`.",
        ],
        code: "superEnchanter",
      },
      {
        id: "v119-infusor",
        title: "Infuser",
        body: [
          "A marked brewing stand (ghast tear on top; blaze rod, brewing stand and blaze rod in the middle; 3 diamonds at the bottom). With an armor piece in hand, right-click: pick a potion from your inventory and its effect is engraved into the piece. While you wear it you have that effect. The potion and `cost-levels` levels are spent.",
          "Only effects in `allowed-effects` (nothing harmful, instant or invisibility), with an amplifier cap per effect and `max-effects-per-piece` effects per piece (a new one replaces the oldest).",
        ],
        code: "infuser",
      },
    ],
    mobs: [
      {
        id: "v119-rarezas",
        title: "Rarities, health bar and bestiary",
        body: [
          "Every vanilla mob that spawns rolls a rarity by weight: common, rare, legendary or galactic. `health`, `damage` and `scale` multiply its attributes; `loot`, `xp` and `money` multiply what it drops when a player kills it (`money` in the Vault currency). `glow` makes it glow (Java only), `particles` adds particles and `announce` tells nearby players when it spawns and the whole server when it dies.",
          "`applies-to: hostile` limits it to monsters (`all` includes animals). `spawn-reasons` leaves spawners out, so a farm gives no rarities. After changing it, `/mobadmin reload`.",
          "**Health bar**: when you hit a mob its name turns for a few seconds into “name ▮▮▮▮▮▯▯▯▯▯ 45/100”, with its rarity; it shows on Java and Bedrock. **Bestiary**: `/bestiario` (also `/bestiary` and `/pokedex`) shows how many of each species you have killed and of which rarity.",
        ],
        code: "rarities",
      },
    ],
    economy: [
      {
        id: "v119-tope-diario",
        title: "Daily sell limit",
        body: [
          "So that quarries and automatic farms cannot print money forever, each player has a daily limit per product in `/tienda` and at the buyer. The first `full-price-units` units of the day are paid in full; up to `max-units`, at `reduced-ratio` of the price; after that nothing is bought until the next day. `full-price-units: 0` turns it off.",
        ],
        code: "dailyLimits",
      },
      {
        id: "v119-menus-economia",
        title: "Menus with a drawn background",
        body: [
          "With `menus.pack` (the font namespace of your resource pack), `/tienda` and player shops use the drawn background and buttons. Empty, you get the usual chest menus.",
        ],
        code: "menusPack",
      },
    ],
    machines: [
      {
        id: "v119-cantera",
        title: "Quarry and spawner frame",
        body: [
          "Quarry upgrades are shown in 4 rows and have their own modules menu. Upgraded or stacked spawners can wear a **3D frame**: an `item_display` with a model from your resource pack. `{tier}` is 1, 2 or 3 depending on how many upgrades it already has; if the model sticks out, raise `hologram.height`.",
        ],
        code: "spawnerFrame",
      },
    ],
    recipes: [
      {
        id: "v119-categorias",
        title: "Catalog by type",
        body: [
          "The recipe book opens by type (blocks, tools, food...), with its own sections for server items and for each plugin. When a plugin publishes its recipes with the real ingredients (through `RecipeSource` in RPGRoll-Lib), those win over the ones only Bukkit sees.",
          "With `menus.pack`, categories, plugins, the catalog and the recipe view use the drawn background from the resource pack.",
        ],
        code: "menusPack",
      },
    ],
    quests: [
      {
        id: "v119-continuar",
        title: "/quest continuar",
        body: [
          "`/quest continuar [MAIN_STORY|SIDE_QUEST|DAILY]` tells you which story chapter you are on and repeats its objectives; if the next one cannot be started yet, it tells you what is missing. Without a type it uses the main story.",
        ],
      },
    ],
    guilds: [
      {
        id: "v119-placeholders",
        title: "New placeholders",
        body: [
          "`%rpgrollguilds_team_rank%` and `%rpgrollguilds_guild_rank%` give your role name in the server language (the `*_role` ones still give the constant, for conditions). `%rpgrollguilds_guild_balance%` gives the guild's shared treasury in the Vault currency.",
        ],
      },
    ],
    furniture: [
      {
        id: "v119-crafting",
        title: "Turning off carpenter recipes",
        body: [
          "With `crafting.enabled: false` every carpenter recipe is ignored: furniture can only be bought in the shop (RPGRoll-Economy, line `furniture: <id>`) or given with `/furnitureadmin give`.",
        ],
        code: "furnitureCrafting",
      },
    ],
    configuracion: [
      {
        id: "v119-menus-dibujados",
        title: "Menus with a drawn background",
        body: [
          "RPGRoll-Lib ships `MenuBackground` and `MenuSkin`: with `menus.pack` set, the race, class, jobs and confirmation menus use the background and buttons from your resource pack. Before the character is created you see a summary of the chosen race and class. Empty (the default), you get the usual chest menus.",
          "The same key exists in Economy, Pass, Recipes, Guilds and Extras.",
        ],
        code: "menusPack",
      },
      {
        id: "v119-dano-recibido",
        title: "Incoming damage",
        body: [
          "`combat.incoming_damage_multiplier` multiplies the damage dealt to RPG health (100 + 5 per Resistance point, about 5 times vanilla's 20). 1.0 is the vanilla hit as is; 3.0 feels closer to how scary vanilla is.",
        ],
        code: "combat",
      },
    ],
    pass: [
      {
        id: "v119-menus-pase",
        title: "Menus with a drawn background",
        body: [
          "With `menus.pack`, the pass, quests and daily reward use the background and buttons from your resource pack. Empty, you get the usual chest menus.",
        ],
        code: "menusPack",
      },
    ],
    chat: [
      {
        id: "v119-cercania",
        title: "Proximity notice",
        body: ["In a proximity channel, if nobody was in range to hear you, the chat tells you: how many blocks it reaches, that it does not go through walls and how to switch to the global channel."],
      },
    ],
    tab: [
      {
        id: "v119-sidebar",
        title: "Sidebar",
        body: ["The sidebar redraws itself when its data changes; no reload needed to keep it up to date."],
      },
    ],
    disasters: [
      {
        id: "v119-chunks",
        title: "Unloaded chunks",
        body: ["Disasters no longer load unloaded chunks: before, they could hang the server."],
      },
    ],
  },
};

const pt: Copy = {
  badge: "Novo na 1.1.9",
  pages: {
    extras: [
      {
        id: "v119-menu-necesidades",
        title: "Menu de admin das necessidades",
        body: [
          "`/extrasadmin menu` abre um menu para gerenciar as necessidades sem mexer em arquivos. Nele você liga ou desliga cada necessidade (sede, stamina, fadiga, oxigênio, estresse...), muda a velocidade, decide se ela reinicia ao morrer, desliga a temperatura, escolhe os mundos sem necessidades e ajusta a pausa por AFK.",
          "Em Jogadores você escolhe alguém conectado e vê as barras: subir ou baixar de 10 em 10, encher ou esvaziar, curar as condições ativas, **Curar tudo** ou deixá-lo **Imune** (não gasta necessidades nem sofre efeitos; fica salvo no jogador).",
          "Cada mudança é gravada no YAML (com os comentários) e recarrega sozinha. A velocidade fica em `needs-speed`: 1 é a normal, 0.5 a metade e 2 o dobro. A temperatura é desligada com `enabled: false` em `temperature.yml`.",
        ],
        code: "needsSpeed",
      },
      {
        id: "v119-ordenar",
        title: "Organizar baús e inventário",
        body: [
          "Com o cursor vazio, **Shift + clique num slot vazio** organiza aquele contêiner; no seu inventário organiza só os 27 slots da mochila (nem a hotbar nem a armadura). No criativo o clique do meio também serve. Junta as pilhas e agrupa: blocos, ferramentas, armas e armadura, comida, minérios e o resto.",
          "`/ordenar` (alias `/sort`) organiza seu inventário; `/ordenar on` e `/ordenar off` ligam ou desligam o gesto para você. A **Varinha de organizar** (graveto + baú, sem forma) organiza o baú em que você clica com o botão direito, e seu inventário se clicar no ar. `/ordenar varita` dá uma (permissão `rpgrollextras.sort.admin`).",
          "Só organiza contêineres de bloco (baús, barris, caixas de shulker...) e o baú do ender: nunca menus de plugins. A varinha respeita as proteções: se você não pode abrir aquele baú, ele não é organizado. Desligue com `inventory-sort.enabled` e `inventory-sort.wand`; permissão do jogador `rpgrollextras.sort` (todos, por padrão).",
        ],
      },
      {
        id: "v119-elevadores",
        title: "Elevadores e Reforçador",
        body: [
          "**Elevador**: 8 lãs em volta de uma pérola do ender dão `recipe-amount` blocos. Pular em cima leva ao próximo elevador da mesma coluna; agachar desce. Precisa de dois blocos livres acima do destino e no máximo `max-distance` de distância. O mesmo bloco colocado à mão não conta.",
          "**Reforçador** (obsidiana, barra de ferro e graveto em coluna; 64 usos): clique direito num bloco onde você pode construir e nada o quebra, nem jogadores, explosões, pistões, fogo, endermen, withers, água ou desastres. Agachado + clique direito num seu tira o reforço; `rpgrollextras.reinforce.admin` (op) tira de qualquer um.",
        ],
        code: "elevator",
      },
    ],
    encantamientos: [
      {
        id: "v119-super-encantador",
        title: "Super encantador em lista",
        body: [
          "Uma mesa de encantamentos marcada (bloco de lápis-lazúli, estrela do Nether e bloco de lápis-lazúli; bloco de diamante, mesa de encantamentos e bloco de diamante; 3 obsidianas chorosas). Com um item na mão, clique direito: aparece uma linha para cada encantamento vanilla e do plugin que serve no item, com uma barra de níveis. Nada é cobrado até apertar **Encantar**.",
          "Até o máximo vanilla cada nível custa `vanilla-levels` níveis de experiência e `vanilla-lapis` lápis; os do plugin cobram por raridade com `rarity-levels` e `rarity-lapis`. Acima do máximo vanilla (Afiação V → VI...) sobem até `extra-levels` níveis a mais, nunca passando de `hard-cap`, e cada um custa `base-levels` + `step-levels` por nível extra anterior e `lapis-per-level`. Os de tesouro (Remendo, Passos gelados...) ficam de fora salvo `treasure: true`.",
        ],
        code: "superEnchanter",
      },
      {
        id: "v119-infusor",
        title: "Infusor",
        body: [
          "Um suporte de poções marcado (lágrima de ghast em cima; vara de blaze, suporte de poções e vara de blaze no meio; 3 diamantes embaixo). Com uma peça de armadura na mão, clique direito: escolha uma poção do inventário e o efeito fica gravado na peça. Enquanto estiver vestida, você tem esse efeito. Gastam-se a poção e `cost-levels` níveis.",
          "Só os efeitos de `allowed-effects` (nada nocivo, instantâneo nem invisibilidade), com teto de amplificador por efeito e `max-effects-per-piece` efeitos por peça (um novo substitui o mais antigo).",
        ],
        code: "infuser",
      },
    ],
    mobs: [
      {
        id: "v119-rarezas",
        title: "Raridades, barra de vida e bestiário",
        body: [
          "Cada mob vanilla que nasce tira uma raridade por peso: comum, raro, lendário ou galáctico. `health`, `damage` e `scale` multiplicam os atributos; `loot`, `xp` e `money` multiplicam o que ele solta quando um jogador o mata (`money` na moeda do Vault). `glow` o faz brilhar (só Java), `particles` coloca partículas e `announce` avisa quem está perto quando nasce e o servidor todo quando morre.",
          "`applies-to: hostile` limita a monstros (`all` inclui animais). `spawn-reasons` deixa os spawners de fora, para que uma farm não dê raridades. Depois de mudar, `/mobadmin reload`.",
          "**Barra de vida**: ao golpear um mob, o nome vira por alguns segundos “nome ▮▮▮▮▮▯▯▯▯▯ 45/100”, com a raridade; aparece no Java e no Bedrock. **Bestiário**: `/bestiario` (também `/bestiary` e `/pokedex`) mostra quantos de cada espécie você matou e de qual raridade.",
        ],
        code: "rarities",
      },
    ],
    economy: [
      {
        id: "v119-tope-diario",
        title: "Limite diário de venda",
        body: [
          "Para que pedreiras e farms automáticas não fabriquem dinheiro sem fim, cada jogador tem um limite diário por produto na `/tienda` e no comprador. As primeiras `full-price-units` unidades do dia são pagas inteiras; até `max-units`, a `reduced-ratio` do preço; depois disso nada é comprado até o dia seguinte. `full-price-units: 0` desliga.",
        ],
        code: "dailyLimits",
      },
      {
        id: "v119-menus-economia",
        title: "Menus com fundo desenhado",
        body: [
          "Com `menus.pack` (o namespace da fonte do seu pacote de recursos), a `/tienda` e as lojas de jogadores usam o fundo e os botões desenhados. Vazio, aparecem os menus de baú de sempre.",
        ],
        code: "menusPack",
      },
    ],
    machines: [
      {
        id: "v119-cantera",
        title: "Pedreira e moldura de spawners",
        body: [
          "As melhorias da pedreira aparecem em 4 linhas e têm seu próprio menu de módulos. Spawners melhorados ou empilhados podem ter uma **moldura 3D**: um `item_display` com um modelo do seu pacote de recursos. `{tier}` vale 1, 2 ou 3 conforme as melhorias que já tem; se o modelo sobrar para cima, aumente `hologram.height`.",
        ],
        code: "spawnerFrame",
      },
    ],
    recipes: [
      {
        id: "v119-categorias",
        title: "Catálogo por tipos",
        body: [
          "O livro de receitas abre por tipos (blocos, ferramentas, comida...), com seções próprias para o que é do servidor e para cada plugin. Quando um plugin publica suas receitas com os ingredientes reais (com `RecipeSource` da RPGRoll-Lib), elas ganham das que só o Bukkit vê.",
          "Com `menus.pack`, as categorias, os plugins, o catálogo e a receita usam o fundo desenhado do pacote de recursos.",
        ],
        code: "menusPack",
      },
    ],
    quests: [
      {
        id: "v119-continuar",
        title: "/quest continuar",
        body: [
          "`/quest continuar [MAIN_STORY|SIDE_QUEST|DAILY]` diz em qual capítulo da história você está e repete os objetivos; se o próximo ainda não pode ser iniciado, diz o que falta. Sem tipo, usa a história principal.",
        ],
      },
    ],
    guilds: [
      {
        id: "v119-placeholders",
        title: "Placeholders novos",
        body: [
          "`%rpgrollguilds_team_rank%` e `%rpgrollguilds_guild_rank%` dão o nome do seu cargo no idioma do servidor (os `*_role` continuam dando a constante, para condições). `%rpgrollguilds_guild_balance%` dá o tesouro compartilhado da guilda na moeda do Vault.",
        ],
      },
    ],
    furniture: [
      {
        id: "v119-crafting",
        title: "Desligar as receitas do carpinteiro",
        body: [
          "Com `crafting.enabled: false` todas as receitas do carpinteiro são ignoradas: os móveis só são comprados na loja (RPGRoll-Economy, linha `furniture: <id>`) ou dados com `/furnitureadmin give`.",
        ],
        code: "furnitureCrafting",
      },
    ],
    configuracion: [
      {
        id: "v119-menus-dibujados",
        title: "Menus com fundo desenhado",
        body: [
          "A RPGRoll-Lib traz `MenuBackground` e `MenuSkin`: com `menus.pack` definido, os menus de raça, classe, trabalhos e confirmação usam o fundo e os botões do seu pacote de recursos. Antes de criar o personagem aparece um resumo da raça e da classe escolhidas. Vazio (o padrão), aparecem os menus de baú de sempre.",
          "A mesma chave existe em Economy, Pass, Recipes, Guilds e Extras.",
        ],
        code: "menusPack",
      },
      {
        id: "v119-dano-recibido",
        title: "Dano recebido",
        body: [
          "`combat.incoming_damage_multiplier` multiplica o dano que a vida RPG recebe (100 + 5 por ponto de Resistência, umas 5 vezes os 20 do vanilla). 1.0 é o golpe vanilla tal qual; 3.0 se parece mais com o susto do vanilla.",
        ],
        code: "combat",
      },
    ],
    pass: [
      {
        id: "v119-menus-pase",
        title: "Menus com fundo desenhado",
        body: [
          "Com `menus.pack`, o passe, as missões e a recompensa diária usam o fundo e os botões do seu pacote de recursos. Vazio, aparecem os menus de baú de sempre.",
        ],
        code: "menusPack",
      },
    ],
    chat: [
      {
        id: "v119-cercania",
        title: "Aviso de proximidade",
        body: ["Num canal de proximidade, se ninguém estava ao alcance para ouvir, o chat avisa: até quantos blocos chega, que não atravessa paredes e como mudar para o canal global."],
      },
    ],
    tab: [
      {
        id: "v119-sidebar",
        title: "Sidebar",
        body: ["A sidebar se redesenha sozinha quando os dados mudam; não precisa recarregar para mantê-la em dia."],
      },
    ],
    disasters: [
      {
        id: "v119-chunks",
        title: "Chunks descarregados",
        body: ["Os desastres não carregam mais chunks descarregados: antes podiam travar o servidor."],
      },
    ],
  },
};

export const NOVEDADES_119: Record<Locale, Copy> = { es, en, pt };
