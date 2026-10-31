import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Effects. */

const es = {
  title: "Effects (RPGRoll-Effects)",
  intro:
    "Motor de efectos de estado — buffs, debuffs, auras, maldiciones, bendiciones — construidos a partir de componentes combinables, con condiciones para aplicarse, reglas de acumulación, conflictos e inmunidades por tag. Pensado para que ítems, encantamientos, hechizos, mobs, dungeons o cualquier otro addon lo use como su motor central de «qué le pasa a esta entidad ahora».",

  notVanillaTitle: "No son PotionEffects vanilla",
  notVanillaBody:
    "Un efecto de RPGRoll-Effects es un objeto compuesto: metadata, condiciones para aplicarse, una lista de {components} (qué hace mientras está activo, cada uno con su propio trigger), reglas de stacking, conflictos y tags de inmunidad. Los {potion} vanilla siguen existiendo — de hecho un componente {type} puede aplicar uno real, para que se vea el ícono clásico — pero son solo una herramienta más entre varias.",

  reqTitle: "Requisitos",
  reqBody:
    "Sin {fx} instalado, los componentes {visual} simplemente no hacen nada (el resto del efecto funciona igual). Sin RPGRoll-Guilds, las condiciones {guild}/{team} nunca se cumplen. Con PlaceholderAPI se registra la expansión {exp} (tabla de placeholders, más abajo); sin él, nada más cambia.",

  modelTitle: "Anatomía de un efecto",
  modelBody:
    "Un {cls} combina identidad (nombre, ícono, color, categoría, rareza, descripción, duración, prioridad, visibilidad) con cuatro listas independientes:",
  thPart: "Parte",
  thAnswers: "Responde a",
  mConditions: "¿Se puede aplicar? Se evalúa una sola vez, al aplicar — no se re-chequea mientras sigue activo.",
  mComponents: "¿Qué hace? Cada uno dispara en su propio momento (trigger) mientras el efecto está activo.",
  mStacking: "¿Qué pasa si se reaplica, o si choca con otro efecto activo?",

  catTitle: "Categorías",
  catBody: "Puramente organizativas — usadas para filtrar en el navegador del Effect Studio.",
  thCategory: "Categoría",
  thMeantFor: "Pensada para",
  catCombat: "Sangrado, aturdimiento, escudos.",
  catSurvival: "Veneno, hambre, agotamiento.",
  catMagic: "Bendiciones, maldiciones, silencios.",
  catElemental: "Fuego, hielo, electricidad.",
  catProfession: "Bonos temporales de un job/profesión.",
  catSocial: "Auras de guild/team.",
  catEvents: "Efectos de temporada/evento especial.",
  catOther: "Cualquier cosa que no encaje arriba (por defecto).",

  compTitle: "Componentes — qué hace el efecto",
  compBody:
    "Cada {cls} tiene un {type}, un {trigger} (cuándo dispara) y params libres — mismo patrón «tipo + params» que {itemAction}/{mobAction} en el resto del proyecto.",
  thType: "Tipo",
  thWhat: "Qué hace",
  cAttr: "Sube/baja cualquier atributo vanilla (ej. {armor}, {damage}).",
  cMovement: "Atajo de ATTRIBUTE_MODIFIER específico para velocidad de movimiento.",
  cPeriodic: "Daño/curación periódicos — {amount} + {perStack} opcional para que escale con los stacks.",
  cPotion: "Aplica un {potion} vanilla real (ícono clásico en el HUD de Minecraft).",
  cVisual: "Dispara un efecto de RPGRoll-FX por id (partículas/sonido/título/bossbar) — solo funciona sobre jugadores.",
  cSound: "Un sonido vanilla suelto, sin necesitar RPGRoll-FX.",
  cMessage: "Mensaje de chat o actionbar al titular.",
  cShield: "Otorga absorción (vida de escudo, se descuenta antes que la vida real).",
  cSilence: "Banderas puras — no hacen nada por sí solas, otros addons consultan {api} antes de permitir lanzar un hechizo, etc.",
  cAura: "Reaplica un efecto (el mismo u otro por id) a las entidades vivas dentro de {radius}.",
  cCommand: "Ejecuta un comando de consola con el placeholder {target}.",
  attrTipTitle: "ATTRIBUTE_MODIFIER/MOVEMENT_MODIFIER ignoran su propio trigger",
  attrTipBody:
    "Necesitan correr tanto al aplicar (agregar el modifier) como al expirar/remover (sacarlo) — por eso, sin importar qué {trigger} les pongas en el YAML, siempre disparan en esos 3 momentos del ciclo de vida del efecto. El resto de los tipos sí respeta el trigger tal cual se configura.",

  trigTitle: "Triggers — cuándo dispara cada componente",
  thTrigger: "Trigger",
  thFiresWhen: "Dispara cuando…",
  tApply: "El efecto se aplica por primera vez.",
  tTick: "Cada tick del servidor mientras está activo — usar con cuidado, es costoso.",
  tSecond: "Cada 20 ticks (1 segundo) mientras está activo — el más usado para daño/curación periódicos.",
  tDamage: "El titular recibe daño / el titular ataca a alguien.",
  tDeath: "El titular muere / se cura (por cualquier motivo).",
  tFood: "El titular consume un ítem de comida.",
  tExpire: "Se acabó la duración de forma natural / se removió antes de tiempo (comando, conflicto, upgrade).",
  manualTitle: "REGION_ENTER, REGION_EXIT, COMBAT_START y SPELL_CAST se disparan manualmente",
  manualBody:
    "Existen en el enum para que YAML y otros addons puedan escribirlos, pero ningún listener de este módulo los dispara por sí solo. Cualquier addon puede dispararlos a mano vía {api}.",

  condTitle: "Condiciones — requisitos para aplicarse",
  thChecks: "Chequea",
  dLevel: "Nivel del personaje (del core, vía RPGRoll-Lib; sin el core no aplica).",
  dRace: "Raza / clase / profesión actual (sin el core no aplica).",
  dWorld: "Mundo, clima (CLEAR/RAIN/STORM) u hora del mundo — vanilla, aplican a cualquier entidad.",
  dHealth: "Porcentaje de vida actual vs. máxima.",
  dMana: "Porcentaje de maná actual del personaje (del core, vía RPGRoll-Lib; sin el core no aplica).",
  dGuild: "Pertenencia a un guild (opcionalmente uno específico por id) / a un team — vía GuildsAPI.",
  dPermission: "Nodo de permiso de Bukkit.",
  playersOnlyTitle: "Todas menos WORLD/WEATHER/TIME_RANGE/HEALTH_* solo aplican a jugadores",
  playersOnlyBody:
    "Sobre cualquier otro {entity} (mobs) esas condiciones se consideran automáticamente satisfechas — no tiene sentido gatear el efecto propio de un mob según «nivel de jugador». REGION y DUNGEON {not} están disponibles todavía como tipo de condición: ni Quests ni Dungeons exponen una API pública estable (tipo {api}) para consultarlas desde otro addon.",
  notWord: "no",

  stackTitle: "Acumulación (stacking)",
  thMode: "Modo",
  thOnReapply: "Al reaplicar sobre un objetivo que ya lo tiene…",
  sNone: "Solo reinicia la duración. Sin stacks.",
  sIndependent:
    "Cada aplicación crea una instancia nueva que corre en paralelo con su propia duración (ej. varias fuentes de daño distintas).",
  sRefresh: "Un único contador de stacks (tope {max}) que sube y reinicia la duración.",
  sUpgrade: "Igual que REFRESH, pero al llegar al tope se reemplaza por completo por {upgradeTo} (otro efecto por id).",
  stackExampleBody:
    "El ejemplo incluido {bleeding} usa {upgrade} con {max} y {to} — al tercer stack, Sangrado se remueve solo y se aplica Hemorragia en su lugar (más daño, además frena el movimiento).",

  conflictTitle: "Conflictos e inmunidades",
  conflictBody:
    "{conflicts} es una lista de ids de otros efectos — al aplicar uno, se remueve cualquier efecto activo que esté en conflicto en cualquiera de los dos sentidos (no hace falta que ambos se declaren mutuamente). Los ejemplos {frozen}/{burning} se declaran en conflicto entre sí: aplicar uno mientras el otro está activo lo remueve.",
  immunityBody:
    "Las inmunidades son por {tag} (texto libre, ej. {fire}, {cold}, {curse}), no por id de efecto — así una raza «Elemental de Hielo» puede ser inmune a {cold2} sin importar cuántos efectos distintos usen ese tag. No hay ningún sistema de razas cableado automáticamente: cualquier addon llama a {call} cuando corresponda (ej. al aplicar la raza Demonio).",

  yamlTitle: "Ejemplos de archivo YAML",
  yamlBody:
    "Los 7 efectos incluidos por defecto demuestran las dos mecánicas más particulares del sistema: stacking {upgrade} (sangrado → hemorragia) y {conflicts} (congelado × quemadura).",
  alsoIncludedBody:
    "También incluidos: {hemorrhage} (el estado final del sangrado), {burning} (conflicto recíproco de {frozen}, stacking {refresh}), {poison} (daño periódico que escala con stacks), {blessing} (curación periódica + armadura) y {shield} (absorción, stacking {refresh2}) — todos en {dir} dentro de la carpeta de datos del plugin.",
  refTitle: "Referencia completa: todos los campos en un solo archivo",
  refBody:
    "{file} (incluido en el jar) usa las 15 condiciones, los 13 tipos de componente, los 14 triggers (incluidos los 4 sin listener todavía) y stacking {upgrade} — todo en un solo archivo.",
  builderTitle: "Constructor visual: identidad del efecto",
  builderDesc:
    "Metadata, tags y conflictos. Conditions, components y stacking son demasiado variados para un formulario lineal — el editor in-game los separa en pantallas propias (EffectConditionsEditorGUI, EffectComponentsEditorGUI, EffectStackingEditorGUI); aquí lo más práctico es copiar y adaptar uno de los ejemplos de arriba.",

  guiTitle: "GUI: Effect Studio",
  guiBody:
    "{cmd} abre el navegador — busca por substring de id/nombre, filtra por categoría (ciclando con clic), y duplica un efecto existente con shift-clic. Cada efecto abre un hub con la identidad completa (ícono/color/categoría/rareza/nombre/descripción/duración/prioridad/visible) más 3 accesos a pantallas dedicadas:",
  thScreen: "Pantalla",
  thEdits: "Edita",
  gConditions: "Condiciones",
  gConditionsBody: "Lista de requisitos, agregados por chat con {syntax}.",
  gComponents: "Componentes",
  gComponentsBody: "Lista de componentes, agregados por chat con {syntax}.",
  gStacking: "Stacking / Tags / Conflictos",
  gStackingBody:
    "Modo de acumulación, tope de stacks, a qué efecto se transforma, tags y conflictos (listas separadas por comas).",
  testBody: "El botón «▶ Probar en ti mismo» del hub aplica el efecto directamente, {ignoring} — es una previsualización, no un uso real.",
  ignoringWord: "ignorando las condiciones",

  apiTitle: "API para addons — EffectsAPI",

  cmdsTitle: "Comandos",
  thCommand: "Comando",
  a1: "Abre el Effect Studio.",
  a2: "Recarga las definiciones desde disco.",
  a3: "Aplica un efecto, respetando condiciones (muestra los motivos de rechazo si no se puede).",
  a4: "Remueve un efecto activo.",
  a5: "Lista los efectos activos (stacks, tiempo restante).",
  permBody: "Todos requieren {perm} (por defecto: op).",

  phTitle: "Placeholders",
  phBody: "Con PlaceholderAPI instalado, la expansión {exp} expone los efectos activos de cada jugador.",
  thPlaceholder: "Placeholder",
  thValue: "Valor",

  // YamlBuilder
  fId: "Id",
  fDisplayName: "Nombre visible",
  fIcon: "Ícono (Material)",
  fColor: "Color",
  fCategory: "Categoría",
  fRarity: "Rareza",
  fDescription: "Descripción",
  fDuration: "Duración (ticks, 0 = permanente)",
  fPriority: "Prioridad",
  fVisible: "Visible en HUD",
  fTags: "Tags",
  fConflicts: "Conflictos (ids de otros efectos)",
  phNewEffect: "nuevo_efecto",
  phBleeding: "&cSangrado",
};

export type EffectsCopy = typeof es;

const en: EffectsCopy = {
  title: "Effects (RPGRoll-Effects)",
  intro:
    "A status-effect engine — buffs, debuffs, auras, curses, blessings — built from combinable components, with conditions for applying, stacking rules, conflicts and immunities by tag. Meant for items, enchantments, spells, mobs, dungeons or any other addon to use as their central engine for “what is happening to this entity right now”.",

  notVanillaTitle: "They are not vanilla PotionEffects",
  notVanillaBody:
    "An RPGRoll-Effects effect is a composite object: metadata, conditions for applying, a list of {components} (what it does while active, each with its own trigger), stacking rules, conflicts and immunity tags. Vanilla {potion}s still exist — in fact a {type} component can apply a real one, so the classic icon shows — but they are just one more tool among several.",

  reqTitle: "Requirements",
  reqBody:
    "Without {fx} installed, {visual} components simply do nothing (the rest of the effect works the same). Without RPGRoll-Guilds, the {guild}/{team} conditions are never met. With PlaceholderAPI the {exp} expansion is registered (placeholder table further down); without it, nothing else changes.",

  modelTitle: "Anatomy of an effect",
  modelBody:
    "An {cls} combines identity (name, icon, color, category, rarity, description, duration, priority, visibility) with four independent lists:",
  thPart: "Part",
  thAnswers: "Answers",
  mConditions: "Can it be applied? It is evaluated once, on applying — it is not re-checked while it stays active.",
  mComponents: "What does it do? Each one fires at its own moment (trigger) while the effect is active.",
  mStacking: "What happens if it is reapplied, or if it clashes with another active effect?",

  catTitle: "Categories",
  catBody: "Purely organizational — used to filter in the Effect Studio's browser.",
  thCategory: "Category",
  thMeantFor: "Meant for",
  catCombat: "Bleeding, stunning, shields.",
  catSurvival: "Poison, hunger, exhaustion.",
  catMagic: "Blessings, curses, silences.",
  catElemental: "Fire, ice, electricity.",
  catProfession: "A job/profession's temporary bonuses.",
  catSocial: "Guild/team auras.",
  catEvents: "Season/special-event effects.",
  catOther: "Anything that does not fit above (the default).",

  compTitle: "Components — what the effect does",
  compBody:
    "Each {cls} has a {type}, a {trigger} (when it fires) and free params — the same “type + params” pattern as {itemAction}/{mobAction} in the rest of the project.",
  thType: "Type",
  thWhat: "What it does",
  cAttr: "Raises/lowers any vanilla attribute (e.g. {armor}, {damage}).",
  cMovement: "An ATTRIBUTE_MODIFIER shortcut specific to movement speed.",
  cPeriodic: "Periodic damage/healing — {amount} + an optional {perStack} so it scales with the stacks.",
  cPotion: "Applies a real vanilla {potion} (the classic icon in Minecraft's HUD).",
  cVisual: "Fires an RPGRoll-FX effect by id (particles/sound/title/bossbar) — it only works on players.",
  cSound: "A loose vanilla sound, without needing RPGRoll-FX.",
  cMessage: "A chat or action-bar message to the holder.",
  cShield: "Grants absorption (shield health, deducted before real health).",
  cSilence: "Pure flags — they do nothing on their own, other addons query {api} before allowing a spell to be cast, etc.",
  cAura: "Reapplies an effect (the same one or another by id) to the living entities within {radius}.",
  cCommand: "Runs a console command with the {target} placeholder.",
  attrTipTitle: "ATTRIBUTE_MODIFIER/MOVEMENT_MODIFIER ignore their own trigger",
  attrTipBody:
    "They need to run both on applying (adding the modifier) and on expiring/removing (taking it off) — so, no matter what {trigger} you give them in the YAML, they always fire at those 3 moments of the effect's lifecycle. The remaining types do respect the trigger as configured.",

  trigTitle: "Triggers — when each component fires",
  thTrigger: "Trigger",
  thFiresWhen: "Fires when…",
  tApply: "The effect is applied for the first time.",
  tTick: "Every server tick while it is active — use with care, it is expensive.",
  tSecond: "Every 20 ticks (1 second) while it is active — the most used one for periodic damage/healing.",
  tDamage: "The holder takes damage / the holder attacks someone.",
  tDeath: "The holder dies / is healed (for any reason).",
  tFood: "The holder consumes a food item.",
  tExpire: "The duration ran out naturally / it was removed early (a command, a conflict, an upgrade).",
  manualTitle: "REGION_ENTER, REGION_EXIT, COMBAT_START and SPELL_CAST are fired manually",
  manualBody:
    "They exist in the enum so YAML and other addons can write them, but no listener in this module fires them on its own. Any addon can fire them by hand via {api}.",

  condTitle: "Conditions — requirements for applying",
  thChecks: "Checks",
  dLevel: "The character's level (from the core, via RPGRoll-Lib; without the core it does not apply).",
  dRace: "The current race / class / profession (without the core it does not apply).",
  dWorld: "The world, weather (CLEAR/RAIN/STORM) or world time — vanilla, they apply to any entity.",
  dHealth: "The percentage of current vs. maximum health.",
  dMana: "The character's current mana percentage (from the core, via RPGRoll-Lib; without the core it does not apply).",
  dGuild: "Membership of a guild (optionally a specific one by id) / of a team — via GuildsAPI.",
  dPermission: "A Bukkit permission node.",
  playersOnlyTitle: "All but WORLD/WEATHER/TIME_RANGE/HEALTH_* apply only to players",
  playersOnlyBody:
    "On any other {entity} (mobs) those conditions are automatically considered satisfied — gating a mob's own effect by “player level” makes no sense. REGION and DUNGEON are {not} available yet as a condition type: neither Quests nor Dungeons expose a stable public API (like {api}) to query them from another addon.",
  notWord: "not",

  stackTitle: "Stacking",
  thMode: "Mode",
  thOnReapply: "On reapplying to a target that already has it…",
  sNone: "It only restarts the duration. No stacks.",
  sIndependent:
    "Each application creates a new instance running in parallel with its own duration (e.g. several different damage sources).",
  sRefresh: "A single stack counter (capped at {max}) that goes up and restarts the duration.",
  sUpgrade: "The same as REFRESH, but on reaching the cap it is replaced entirely by {upgradeTo} (another effect by id).",
  stackExampleBody:
    "The included {bleeding} example uses {upgrade} with {max} and {to} — on the third stack, Bleeding removes itself and Hemorrhage is applied in its place (more damage, and it also slows movement).",

  conflictTitle: "Conflicts and immunities",
  conflictBody:
    "{conflicts} is a list of other effects' ids — on applying one, any active effect that conflicts in either direction is removed (both do not need to declare each other). The {frozen}/{burning} examples declare a conflict with each other: applying one while the other is active removes it.",
  immunityBody:
    "Immunities are by {tag} (free text, e.g. {fire}, {cold}, {curse}), not by effect id — so an “Ice Elemental” race can be immune to {cold2} no matter how many different effects use that tag. There is no race system wired in automatically: any addon calls {call} when appropriate (e.g. on applying the Demon race).",

  yamlTitle: "YAML file examples",
  yamlBody:
    "The 7 effects included by default demonstrate the system's two most particular mechanics: {upgrade} stacking (bleeding → hemorrhage) and {conflicts} (frozen × burning).",
  alsoIncludedBody:
    "Also included: {hemorrhage} (bleeding's final state), {burning} ({frozen}'s reciprocal conflict, {refresh} stacking), {poison} (periodic damage that scales with stacks), {blessing} (periodic healing + armor) and {shield} (absorption, {refresh2} stacking) — all in {dir} inside the plugin's data folder.",
  refTitle: "Full reference: every field in a single file",
  refBody:
    "{file} (included in the jar) uses the 15 conditions, the 13 component types, the 14 triggers (including the 4 with no listener yet) and {upgrade} stacking — all in a single file.",
  builderTitle: "Visual builder: the effect's identity",
  builderDesc:
    "Metadata, tags and conflicts. Conditions, components and stacking are too varied for a linear form — the in-game editor splits them into their own screens (EffectConditionsEditorGUI, EffectComponentsEditorGUI, EffectStackingEditorGUI); here the most practical thing is to copy and adapt one of the examples above.",

  guiTitle: "GUI: Effect Studio",
  guiBody:
    "{cmd} opens the browser — it searches by id/name substring, filters by category (cycling with a click), and duplicates an existing effect with shift-click. Each effect opens a hub with the full identity (icon/color/category/rarity/name/description/duration/priority/visible) plus 3 entries to dedicated screens:",
  thScreen: "Screen",
  thEdits: "Edits",
  gConditions: "Conditions",
  gConditionsBody: "The list of requirements, added in chat with {syntax}.",
  gComponents: "Components",
  gComponentsBody: "The list of components, added in chat with {syntax}.",
  gStacking: "Stacking / Tags / Conflicts",
  gStackingBody:
    "The stacking mode, stack cap, which effect it turns into, tags and conflicts (comma-separated lists).",
  testBody: "The hub's “▶ Test on yourself” button applies the effect directly, {ignoring} — it is a preview, not real use.",
  ignoringWord: "ignoring the conditions",

  apiTitle: "API for addons — EffectsAPI",

  cmdsTitle: "Commands",
  thCommand: "Command",
  a1: "Opens the Effect Studio.",
  a2: "Reloads the definitions from disk.",
  a3: "Applies an effect, respecting conditions (it shows the rejection reasons if it cannot).",
  a4: "Removes an active effect.",
  a5: "Lists the active effects (stacks, remaining time).",
  permBody: "They all require {perm} (default: op).",

  phTitle: "Placeholders",
  phBody: "With PlaceholderAPI installed, the {exp} expansion exposes each player's active effects.",
  thPlaceholder: "Placeholder",
  thValue: "Value",

  fId: "Id",
  fDisplayName: "Display name",
  fIcon: "Icon (Material)",
  fColor: "Color",
  fCategory: "Category",
  fRarity: "Rarity",
  fDescription: "Description",
  fDuration: "Duration (ticks, 0 = permanent)",
  fPriority: "Priority",
  fVisible: "Visible in the HUD",
  fTags: "Tags",
  fConflicts: "Conflicts (other effects' ids)",
  phNewEffect: "new_effect",
  phBleeding: "&cBleeding",
};

const pt: EffectsCopy = {
  title: "Effects (RPGRoll-Effects)",
  intro:
    "Motor de efeitos de estado — buffs, debuffs, auras, maldições, bênçãos — construídos a partir de componentes combináveis, com condições para se aplicarem, regras de acumulação, conflitos e imunidades por tag. Pensado para que itens, encantamentos, feitiços, mobs, dungeons ou qualquer outro addon o use como o seu motor central de «o que está acontecendo com esta entidade agora».",

  notVanillaTitle: "Não são PotionEffects vanilla",
  notVanillaBody:
    "Um efeito do RPGRoll-Effects é um objeto composto: metadata, condições para se aplicar, uma lista de {components} (o que faz enquanto está ativo, cada um com o seu próprio trigger), regras de stacking, conflitos e tags de imunidade. Os {potion} vanilla continuam existindo — de fato um componente {type} pode aplicar um real, para que o ícone clássico apareça — mas são só mais uma ferramenta entre várias.",

  reqTitle: "Requisitos",
  reqBody:
    "Sem o {fx} instalado, os componentes {visual} simplesmente não fazem nada (o resto do efeito funciona igual). Sem o RPGRoll-Guilds, as condições {guild}/{team} nunca são cumpridas. Com o PlaceholderAPI é registrada a expansão {exp} (tabela de placeholders, mais abaixo); sem ele, nada mais muda.",

  modelTitle: "Anatomia de um efeito",
  modelBody:
    "Um {cls} combina identidade (nome, ícone, cor, categoria, raridade, descrição, duração, prioridade, visibilidade) com quatro listas independentes:",
  thPart: "Parte",
  thAnswers: "Responde a",
  mConditions: "Pode ser aplicado? É avaliado uma só vez, ao aplicar — não é verificado de novo enquanto segue ativo.",
  mComponents: "O que faz? Cada um dispara no seu próprio momento (trigger) enquanto o efeito está ativo.",
  mStacking: "O que acontece se for reaplicado, ou se colidir com outro efeito ativo?",

  catTitle: "Categorias",
  catBody: "Puramente organizativas — usadas para filtrar no navegador do Effect Studio.",
  thCategory: "Categoria",
  thMeantFor: "Pensada para",
  catCombat: "Sangramento, atordoamento, escudos.",
  catSurvival: "Veneno, fome, esgotamento.",
  catMagic: "Bênçãos, maldições, silêncios.",
  catElemental: "Fogo, gelo, eletricidade.",
  catProfession: "Bônus temporários de um job/profissão.",
  catSocial: "Auras de guild/team.",
  catEvents: "Efeitos de temporada/evento especial.",
  catOther: "Qualquer coisa que não encaixe acima (por padrão).",

  compTitle: "Componentes — o que o efeito faz",
  compBody:
    "Cada {cls} tem um {type}, um {trigger} (quando dispara) e params livres — mesmo padrão «tipo + params» que {itemAction}/{mobAction} no resto do projeto.",
  thType: "Tipo",
  thWhat: "O que faz",
  cAttr: "Sobe/baixa qualquer atributo vanilla (ex. {armor}, {damage}).",
  cMovement: "Atalho de ATTRIBUTE_MODIFIER específico para velocidade de movimento.",
  cPeriodic: "Dano/cura periódicos — {amount} + {perStack} opcional para que escale com os stacks.",
  cPotion: "Aplica um {potion} vanilla real (ícone clássico no HUD do Minecraft).",
  cVisual: "Dispara um efeito do RPGRoll-FX por id (partículas/som/título/bossbar) — só funciona sobre jogadores.",
  cSound: "Um som vanilla solto, sem precisar do RPGRoll-FX.",
  cMessage: "Mensagem de chat ou actionbar ao titular.",
  cShield: "Concede absorção (vida de escudo, descontada antes da vida real).",
  cSilence: "Bandeiras puras — não fazem nada por si só, outros addons consultam {api} antes de permitir lançar um feitiço, etc.",
  cAura: "Reaplica um efeito (o mesmo ou outro por id) às entidades vivas dentro de {radius}.",
  cCommand: "Executa um comando de console com o placeholder {target}.",
  attrTipTitle: "ATTRIBUTE_MODIFIER/MOVEMENT_MODIFIER ignoram o próprio trigger",
  attrTipBody:
    "Precisam rodar tanto ao aplicar (adicionar o modifier) como ao expirar/remover (tirá-lo) — por isso, não importa qual {trigger} você coloque no YAML, sempre disparam nesses 3 momentos do ciclo de vida do efeito. O resto dos tipos respeita o trigger tal como é configurado.",

  trigTitle: "Triggers — quando cada componente dispara",
  thTrigger: "Trigger",
  thFiresWhen: "Dispara quando…",
  tApply: "O efeito é aplicado pela primeira vez.",
  tTick: "A cada tick do servidor enquanto está ativo — usar com cuidado, é custoso.",
  tSecond: "A cada 20 ticks (1 segundo) enquanto está ativo — o mais usado para dano/cura periódicos.",
  tDamage: "O titular recebe dano / o titular ataca alguém.",
  tDeath: "O titular morre / é curado (por qualquer motivo).",
  tFood: "O titular consome um item de comida.",
  tExpire: "A duração acabou de forma natural / foi removido antes do tempo (comando, conflito, upgrade).",
  manualTitle: "REGION_ENTER, REGION_EXIT, COMBAT_START e SPELL_CAST são disparados manualmente",
  manualBody:
    "Existem no enum para que YAML e outros addons possam escrevê-los, mas nenhum listener deste módulo os dispara por si só. Qualquer addon pode dispará-los à mão via {api}.",

  condTitle: "Condições — requisitos para se aplicar",
  thChecks: "Verifica",
  dLevel: "Nível do personagem (do core, via RPGRoll-Lib; sem o core não se aplica).",
  dRace: "Raça / classe / profissão atual (sem o core não se aplica).",
  dWorld: "Mundo, clima (CLEAR/RAIN/STORM) ou hora do mundo — vanilla, aplicam-se a qualquer entidade.",
  dHealth: "Porcentagem de vida atual vs. máxima.",
  dMana: "Porcentagem de mana atual do personagem (do core, via RPGRoll-Lib; sem o core não se aplica).",
  dGuild: "Pertencer a uma guild (opcionalmente uma específica por id) / a um team — via GuildsAPI.",
  dPermission: "Nó de permissão do Bukkit.",
  playersOnlyTitle: "Todas menos WORLD/WEATHER/TIME_RANGE/HEALTH_* só se aplicam a jogadores",
  playersOnlyBody:
    "Sobre qualquer outro {entity} (mobs) essas condições são automaticamente consideradas satisfeitas — não faz sentido condicionar o efeito próprio de um mob conforme «nível de jogador». REGION e DUNGEON {not} estão disponíveis ainda como tipo de condição: nem Quests nem Dungeons expõem uma API pública estável (tipo {api}) para consultá-las de outro addon.",
  notWord: "não",

  stackTitle: "Acumulação (stacking)",
  thMode: "Modo",
  thOnReapply: "Ao reaplicar sobre um alvo que já o tem…",
  sNone: "Só reinicia a duração. Sem stacks.",
  sIndependent:
    "Cada aplicação cria uma instância nova que roda em paralelo com a sua própria duração (ex. várias fontes de dano diferentes).",
  sRefresh: "Um único contador de stacks (teto {max}) que sobe e reinicia a duração.",
  sUpgrade: "Igual ao REFRESH, mas ao chegar ao teto é substituído por completo por {upgradeTo} (outro efeito por id).",
  stackExampleBody:
    "O exemplo incluído {bleeding} usa {upgrade} com {max} e {to} — no terceiro stack, Sangramento se remove sozinho e Hemorragia é aplicada no lugar dele (mais dano, além de frear o movimento).",

  conflictTitle: "Conflitos e imunidades",
  conflictBody:
    "{conflicts} é uma lista de ids de outros efeitos — ao aplicar um, é removido qualquer efeito ativo que esteja em conflito em qualquer um dos dois sentidos (não é preciso que os dois se declarem mutuamente). Os exemplos {frozen}/{burning} se declaram em conflito entre si: aplicar um enquanto o outro está ativo o remove.",
  immunityBody:
    "As imunidades são por {tag} (texto livre, ex. {fire}, {cold}, {curse}), não por id de efeito — assim uma raça «Elemental de Gelo» pode ser imune a {cold2} sem importar quantos efeitos diferentes usem essa tag. Não há nenhum sistema de raças cabeado automaticamente: qualquer addon chama {call} quando corresponder (ex. ao aplicar a raça Demônio).",

  yamlTitle: "Exemplos de arquivo YAML",
  yamlBody:
    "Os 7 efeitos incluídos por padrão demonstram as duas mecânicas mais particulares do sistema: stacking {upgrade} (sangramento → hemorragia) e {conflicts} (congelado × queimadura).",
  alsoIncludedBody:
    "Também incluídos: {hemorrhage} (o estado final do sangramento), {burning} (conflito recíproco de {frozen}, stacking {refresh}), {poison} (dano periódico que escala com stacks), {blessing} (cura periódica + armadura) e {shield} (absorção, stacking {refresh2}) — todos em {dir} dentro da pasta de dados do plugin.",
  refTitle: "Referência completa: todos os campos num só arquivo",
  refBody:
    "{file} (incluído no jar) usa as 15 condições, os 13 tipos de componente, os 14 triggers (incluídos os 4 sem listener ainda) e stacking {upgrade} — tudo num só arquivo.",
  builderTitle: "Construtor visual: identidade do efeito",
  builderDesc:
    "Metadata, tags e conflitos. Conditions, components e stacking são variados demais para um formulário linear — o editor in-game os separa em telas próprias (EffectConditionsEditorGUI, EffectComponentsEditorGUI, EffectStackingEditorGUI); aqui o mais prático é copiar e adaptar um dos exemplos acima.",

  guiTitle: "GUI: Effect Studio",
  guiBody:
    "{cmd} abre o navegador — busca por substring de id/nome, filtra por categoria (alternando com clique), e duplica um efeito existente com shift-clique. Cada efeito abre um hub com a identidade completa (ícone/cor/categoria/raridade/nome/descrição/duração/prioridade/visível) mais 3 acessos a telas dedicadas:",
  thScreen: "Tela",
  thEdits: "Edita",
  gConditions: "Condições",
  gConditionsBody: "Lista de requisitos, adicionados pelo chat com {syntax}.",
  gComponents: "Componentes",
  gComponentsBody: "Lista de componentes, adicionados pelo chat com {syntax}.",
  gStacking: "Stacking / Tags / Conflitos",
  gStackingBody:
    "Modo de acumulação, teto de stacks, em qual efeito se transforma, tags e conflitos (listas separadas por vírgulas).",
  testBody: "O botão «▶ Testar em você mesmo» do hub aplica o efeito diretamente, {ignoring} — é uma pré-visualização, não um uso real.",
  ignoringWord: "ignorando as condições",

  apiTitle: "API para addons — EffectsAPI",

  cmdsTitle: "Comandos",
  thCommand: "Comando",
  a1: "Abre o Effect Studio.",
  a2: "Recarrega as definições do disco.",
  a3: "Aplica um efeito, respeitando condições (mostra os motivos da recusa se não for possível).",
  a4: "Remove um efeito ativo.",
  a5: "Lista os efeitos ativos (stacks, tempo restante).",
  permBody: "Todos requerem {perm} (padrão: op).",

  phTitle: "Placeholders",
  phBody: "Com o PlaceholderAPI instalado, a expansão {exp} expõe os efeitos ativos de cada jogador.",
  thPlaceholder: "Placeholder",
  thValue: "Valor",

  fId: "Id",
  fDisplayName: "Nome visível",
  fIcon: "Ícone (Material)",
  fColor: "Cor",
  fCategory: "Categoria",
  fRarity: "Raridade",
  fDescription: "Descrição",
  fDuration: "Duração (ticks, 0 = permanente)",
  fPriority: "Prioridade",
  fVisible: "Visível no HUD",
  fTags: "Tags",
  fConflicts: "Conflitos (ids de outros efeitos)",
  phNewEffect: "novo_efeito",
  phBleeding: "&cSangramento",
};

export const EFFECTS_COPY: Record<Locale, EffectsCopy> = { es, en, pt };
