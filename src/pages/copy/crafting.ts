import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Crafting. */

const es = {
  title: "RPGRoll-Crafting",
  intro:
    "Motor de crafteo avanzado: recetas personalizadas con {rich}, un sistema de calidad, {stations} (multi-etapa, con combustible, estructura multibloque opcional y niveles mejorables) y un puente hacia las estaciones vanilla que exponen una API de receta genérica (mesa de crafteo, familia de hornos, cortadora de piedra, mesa de herrería), más motores dedicados para las que no la tienen (yunque, fermentación, piedra de amolar, mesa de cartografía, telar, comercio de aldeanos y automatización de Crafter). Incluye además un sistema de {prof} propio y descubrimiento de recetas por experimentación.",
  richWord: "ingredientes y condiciones ricas",
  stationsWord: "estaciones de crafteo propias",
  profWord: "proficiencia de crafteo",

  reqTitle: "Requisitos",
  thPlugin: "Plugin",
  thType: "Tipo",
  thWhatFor: "Para qué",
  rLib: "Framework de GUIs y utilidades compartidas.",
  rCore:
    "Nivel, raza, clase y oficio del jugador para las condiciones LEVEL_MIN, RACE, CLASS y JOB_MIN, y la xp de personaje de las recetas. Sin el core esas condiciones no se cumplen y la xp se omite.",
  rItems: "Reconoce ítems personalizados como ingrediente/resultado (vía {m1}/{m2}, sin una API pública dedicada de ese addon).",
  rEconomy: "Cobra el costo monetario opcional de una receta.",
  rGuilds: "Condición {cond}.",
  rSeasons: "Condición {cond}.",

  identityTitle: "Identidad de ítem",
  identityBody:
    "Cualquier resultado que no sea un material vanilla puro se marca con la clave PDC compartida {key} (namespace literal, no atado a este plugin). El motor también sabe leer, sin depender en tiempo de compilación de RPGRoll-Items, la clave que ese addon ya usa ({key2}) — así un ítem personalizado de Items funciona como ingrediente o resultado sin que Crafting necesite su clase Java.",
  plainTitle: "Los materiales vanilla planos nunca se etiquetan",
  plainBody:
    "Si el resultado es un {material} simple sin calidad habilitada, el ítem sale limpio (sin PDC) para que siga apilando normalmente con el resto del inventario. Solo se etiqueta cuando hay una identidad real que preservar (ítem personalizado, o calidad rolada).",

  ingTitle: "Ingredientes",
  ingBody:
    "Cada {spec} tiene un {type}, un {value}, una {amount} y opcionalmente una {minQuality} (el ítem entregado debe cumplir o superar esa calidad).",
  thValueExpects: "value espera",
  iMaterial: "Un {material} vanilla exacto.",
  iTag: "Un tag vanilla de ítems (ej. {example}) — cualquier material del tag sirve.",
  iItemId: "Un id de ítem personalizado, propio de Crafting o de RPGRoll-Items.",
  iAny: "Comodín — cualquier ítem sirve, solo importa la cantidad.",

  condTitle: "Condiciones",
  condBody:
    "Gating por jugador, evaluado antes de iniciar una receta (o al previsualizar el resultado en la mesa de crafteo vanilla). Cada tipo que depende de otro addon sigue el patrón blando «isReady() → get()» del ecosistema: si el addon no está instalado, la condición simplemente no se cumple.",
  thChecks: "Qué chequea",
  cLevel: "Nivel de personaje mínimo ({min}).",
  cRace: "Raza o clase exacta del personaje.",
  cJob: "Nivel mínimo en un job específico ({value} + {min}).",
  cPermission: "Nodo de permiso de Bukkit.",
  cWorld: "Nombre del mundo.",
  cHour: "Rango de hora del reloj de Minecraft, ej. {example}.",
  cBiome: "Bioma vanilla exacto.",
  cSeason: "Id de estación de RPGRoll-Seasons.",
  cGuild: "El jugador pertenece a un gremio (RPGRoll-Guilds).",
  cWeather: "{clear} / {rain} / {thunder} en el mundo del jugador.",

  qualTitle: "Sistema de calidad",
  qualBody:
    "Cuando una receta tiene {enabled}, el resultado rola un tier {cls} (70 % según habilidad, 30 % azar — mismo enfoque que {ranchQuality} de RPGRoll-Ranching) y queda etiquetado con una línea de lore + la clave PDC de calidad, para que otras recetas puedan exigir {minQuality} sobre ese ítem como ingrediente.",
  thTier: "Tier",
  thValueMult: "Multiplicador de valor",
  qCrude: "Tosca",
  qStandard: "Estándar",
  qFine: "Fina",
  qMaster: "Maestra",
  qLegendary: "Legendaria",

  stationsTitle: "Estaciones personalizadas ⭐",
  stationsBody:
    "El sistema insignia del addon. Una {cls} es un bloque del mundo (cualquier {material} que definas) que al hacer clic derecho abre un inventario propio (ingredientes + combustible opcional + resultado). Cada estación colocada en el mundo tiene su propio {runtime} — persistido por ubicación en {path} — que {engine} tickea periódicamente ({interval}): busca una receta cuyos ingredientes/condiciones/combustible se cumplan, la inicia (consumiendo ingredientes y cobrando el costo), avanza el progreso, y entrega el resultado — con calidad, xp y descubrimiento de receta incluidos — cuando termina.",
  outputWarnTitle: "El slot de salida es de solo-extracción",
  outputWarnBody:
    "El jugador puede sacar el resultado terminado, pero no puede insertar ítems ahí a mano — si lo hiciera, rompería el conteo que usa el motor para saber si ya puede colocar el próximo resultado.",

  structTitle: "Estructura multibloque",
  structBody:
    "Una estación puede exigir bloques concretos alrededor del disparador — {key} es una lista de offsets relativos ({dx}/{dy}/{dz}) + {material}. Si falta alguno, el clic derecho no abre nada y avisa qué falta y dónde. Vacía (por defecto), la estación se comporta como siempre: un único bloque disparador, sin estructura.",

  tiersTitle: "Niveles de estación (Forja I-V)",
  tiersBody:
    "{maxTier}, {speedBonus} y {failReduction} habilitan mejoras por instancia: cada {runtime} guarda su propio {tier} (persistido, arranca en 1), y {cmd} — usado con la estación abierta — cobra el costo del próximo nivel ({upgrades}: ingredientes + costo económico opcional) y lo sube. El motor de proceso aplica el bono automáticamente: menos {time} efectivos y menos {fail} efectiva por cada nivel sobre el 1, sin que la receta necesite saber nada del nivel de la estación.",

  profTitle: "Proficiencia de crafteo",
  profBody:
    "El «sistema de habilidades» propio del addon — reemplaza el {skillFactor} que antes era una constante fija en el roll de calidad. Cada estación tiene una {category} (vacía = usa su propio id; dos estaciones con la misma categoría comparten el mismo progreso). Completar una receta otorga xp de proficiencia a esa categoría (el mismo {xp} de la receta, mínimo 1), persistido en {path}. El nivel resultante (curva cuadrática, 50 niveles) alimenta {roller} como factor 0-1 — más nivel en una categoría, mejor calidad promedio al craftear ahí. {cmd} muestra tu nivel y progreso.",
  profTipTitle: "Por qué no un addon nuevo",
  profTipBody:
    "No existe todavía un sistema de habilidades genérico compartido en el ecosistema RPGRoll — en vez de construir uno aparte (fuera de alcance de «completar Crafting»), la proficiencia vive adentro de este addon, expuesta vía {api} para que algo más general se conecte después.",

  recipesTitle: "Recetas personalizadas",
  recipesBody:
    "Una {cls} apunta a una {stationId}, define sus ingredientes y condiciones, un {result} (material vanilla o ítem de RPGRoll-Items), tiempo de proceso, combustible requerido, costo económico opcional, xp de personaje, probabilidad de fallo propia (o heredada de {default}) y si pasa por el sistema de calidad.",

  vanillaTitle: "Puente con estaciones vanilla",
  vanillaBody:
    "Una {cls} se registra directamente en {addRecipe} — cubre las 7 estaciones vanilla para las que Bukkit expone un tipo {recipe} genérico. El resultado puede ser un material o un ítem de RPGRoll-Items, igual que las recetas de estación propia.",
  thVanillaStation: "Estación vanilla",
  vTable: "Mesa de crafteo.",
  vFurnace: "Familia completa de hornos.",
  vStonecutter: "Cortadora de piedra.",
  vSmithing: "Mesa de herrería (plantilla + base + adición).",
  vanillaWarnTitle: "Las condiciones solo se aplican en la mesa de crafteo",
  vanillaWarnBody:
    "Bukkit no ofrece un evento de «previsualización» para hornos/cortadora/herrería — esas 5 estaciones registran la receta igual, pero sin gating por jugador. En la mesa de crafteo, {event} oculta el resultado si el jugador que la ve no cumple las condiciones.",

  enginesTitle: "Motores dedicados",
  enginesBody:
    "7 estaciones vanilla tienen un tipo {recipe} genérico en Bukkit (arriba). Las otras 7 no — Yunque y Fermentación se resolvieron desde el lanzamiento del addon; Piedra de Amolar, Mesa de Cartografía, Telar, Comercio de Aldeanos y automatización de Crafter se agregaron después, cada una con su propio motor porque cada una expone (o no expone) una API distinta.",
  thStation: "Estación",
  thEngine: "Motor",
  thIntercepts: "Cómo intercepta",
  eAnvil: "Yunque",
  eAnvilBody: "{event} — reemplaza el resultado si base+adición coinciden con una {def}.",
  eBrewing: "Fermentación",
  eBrewingBody: "{event} — reemplaza el resultado de cada botella si el ingrediente coincide con una {def}.",
  eGrindstone: "Piedra de Amolar",
  eGrindstoneBody: "{event} (mismo patrón que el yunque) — {def}.",
  eCartography: "Mesa de Cartografía",
  eCartographyBody: "Bukkit no tiene evento «prepare» aquí — Paper sí, {event} — {def}.",
  eLoom: "Telar",
  eLoomBody:
    "Sin evento «prepare» ni getters de slot — intercepta el clic en el slot de resultado (layout fijo: banner/tinte/patrón/resultado) — {def}.",
  eVillager: "Comercio de Aldeanos",
  eVillagerBody: "{e1}/{e2} sobre un aldeano vinculado — {def}.",
  eCrafter: "Crafter (automatización)",
  eCrafterBody:
    "{event} — cancela recetas vanilla con condiciones que dependen de un jugador (un Crafter craftea sin ninguno presente).",
  enginesNoMatchBody: "Sin coincidencia, las siete estaciones funcionan exactamente igual que en vanilla.",

  grindTitle: "Piedra de amolar",
  grindBody: "{def}: {upper} + {lower} → {result}, con condiciones opcionales — YAML ({dir}) o el navegador de Crafting Studio.",
  cartTitle: "Mesa de cartografía",
  cartBody: "{def}: {map} + {item} → {result} — YAML ({dir}) o el navegador de Crafting Studio.",
  loomTitle: "Telar",
  loomBody:
    "{def}: {banner} + {dye} + opcionalmente un {pattern} concreto → {result} — YAML ({dir}) o el navegador de Crafting Studio (el patrón se puede quitar con clic derecho para volver a «cualquiera»).",
  villagerTitle: "Comercio de aldeanos",
  villagerBody:
    "Un {def} (1 o 2 costos, editable por YAML o el navegador de Crafting Studio) no se activa solo — hay que {bind} un aldeano puntual con {cmd} mirándolo (guarda los ids en su PDC, que persiste con el chunk — sin YAML propio de bindings). Un aldeano vinculado ofrece esos comercios en vez de los vanilla normales; {unbind} lo devuelve a la normalidad.",
  bindWord: "vincular",
  crafterTitle: "Automatización de Crafter",
  crafterBody:
    "El bloque Crafter craftea sin ningún jugador presente, así que una {def} de mesa de crafteo con condiciones que dependen de un jugador (nivel, raza, clase, job, permiso, bioma, guild) no puede evaluarse ahí — {engine} cancela ese auto-crafteo en vez de dejarlo pasar sin chequeo.",

  discTitle: "Descubrimiento de recetas",
  discBody:
    "Cada vez que una {cls} se completa por primera vez para un jugador, queda marcada como descubierta (persistido en {path}) y dispara {event}. {cmd} abre el Recipe Book: las recetas descubiertas muestran su ícono, estación e ingredientes reales; las que no, un ítem «???» — nunca revela una receta sin descubrir.",
  expBody:
    "Craftear nunca estuvo condicionado por el descubrimiento — cualquier combinación que coincida con una receta funciona, la conozcas o no; descubrir es solo lo que queda registrado después. {cmd} va un paso más allá: en una estación con {allow}, con materiales puestos que no coinciden con nada exacto, compara qué tan cerca estuviste (fracción de ingredientes coincidentes) de la receta no descubierta más parecida y rola una chance de revelarla sin craftearla — solo conocimiento, no un atajo gratis al ítem. Tiene cooldown por jugador ({cooldown}) para evitar spam.",

  offlineTitle: "Procesamiento con el dueño offline",
  offlineBody:
    "Una estación ya sobrevivía un reinicio del servidor y seguía avanzando el progreso en curso aunque su dueño se desconectara — lo que no funcionaba era {start} una receta nueva con condiciones si el dueño no estaba conectado, porque el chequeo exigía un {player} en línea incluso para condiciones que en realidad solo necesitan su UUID (nivel, raza, clase, job, membresía de gremio — se leen de datos persistidos, no del jugador en vivo). {evaluator} ahora evalúa esas contra el UUID directamente, y usa el {stationWorld} (no el del jugador) para {conds}. El costo de Economy y el xp de personaje ya cobraban/otorgaban por UUID — nunca necesitaron al jugador en línea, solo estaban gateados de más.",
  startWord: "iniciar",
  stationWorldWord: "mundo de la estación",
  offlineWarnTitle: "Dos condiciones siguen exigiendo al jugador conectado",
  offlineWarnBody:
    "{permission} y {biome} dependen de estado que solo existe en un jugador real (su árbol de permisos, su posición) — una receta que las use no puede iniciarse con el dueño offline, y eso es correcto, no un bug.",

  yamlTitle: "Ejemplos de archivo YAML",
  refTitle: "Referencia completa: todos los campos en un solo archivo, por cada tipo de contenido",
  refBody:
    "{files} (incluidos en el jar) documentan todos los campos disponibles de cada tipo, incluyendo todos los tipos posibles de ingrediente y de condición.",
  builderStation: "Constructor visual: Estación personalizada",
  builderRecipe: "Constructor visual: Receta personalizada",
  builderFuel: "Constructor visual: Combustible",

  guiTitle: "GUI: Crafting Studio",
  guiBody:
    "{cmd} abre un hub que enlaza a los {ten} (uno por tipo de contenido), y los 10 tienen crear + editar completo en inventario — nada requiere tocar YAML a mano. Los campos escalares (nombre, ícono, tiempos, costos, resultado…) se editan slot por slot; las listas (ingredientes de una receta, condiciones) abren un sub-editor dedicado con sus propios slots de «agregar»/«quitar» (shift-clic) y una mini-sintaxis por chat para el ítem nuevo, ej. {e1} o {e2}; {fields} de una receta vanilla se reescriben enteros por chat (una lista tan variable no entra en slots fijos). El comercio de aldeano tiene su propia variante: hasta 2 costos, cada uno con su propio slot de tipo/valor/cantidad, y un botón para agregar/quitar el segundo. Editar o borrar una receta vanilla la vuelve a registrar en Bukkit al instante — no hace falta reiniciar el servidor. Del lado del jugador, {book} abre el Recipe Book.",
  tenBrowsers: "10 navegadores",

  apiTitle: "API para addons — CraftingAPI + eventos",
  apiBody:
    "{isReady} / {get}, mismo patrón que el resto del ecosistema. Expone los 10 managers de contenido (estaciones, recetas personalizadas, combustibles, vanilla, yunque, fermentación, amolar, cartografía, telar, comercio de aldeanos), {discovery}, {proficiency} y {stationAt} para consultar el {runtime} de una ubicación (incluye su {tier} actual).",
  thEvent: "Evento",
  thWhen: "Cuándo",
  ev1: "Justo antes de consumir ingredientes/cobrar — cancelable.",
  ev2: "La receta empieza a procesarse.",
  ev3: "Cada tick que avanza el progreso.",
  ev4: "Resultado entregado exitosamente.",
  ev5: "La receta terminó pero falló.",
  ev6: "Primera vez que un jugador descubre una receta.",
  ev7: "Clic derecho en el bloque de una estación — cancelable.",
  ev8: "El jugador cierra el inventario de una estación.",

  cmdsTitle: "Comandos",
  thCommand: "Comando",
  thWhat: "Qué hace",
  thPermission: "Permiso",
  a1: "Abre el Crafting Studio.",
  a2: "Recarga todo el contenido YAML.",
  a3: "Entrega un ítem de RPGRoll-Items por id.",
  a4: "Vincula el aldeano al que miras a esos comercios.",
  a5: "Desvincula el aldeano al que miras.",
  u1: "Abre tu Recipe Book.",
  u2: "Ve cuántas recetas descubriste.",
  u3: "Sube de nivel la estación que tienes abierta.",
  u4: "Intenta descubrir una receta por lo que tienes puesto (estación con {allow}).",
  u5: "Ve tu nivel de proficiencia en esa categoría.",

  // YamlBuilder
  fId: "Id",
  fDisplayName: "Nombre visible",
  fIcon: "Ícono (Material)",
  fTriggerBlock: "Bloque disparador (Material)",
  fInvSize: "Tamaño de inventario",
  fIngSlots: "Slots de ingrediente",
  fFuelSlot: "Slot de combustible (-1 = sin combustible)",
  fOutputSlot: "Slot de salida",
  fRequiresFuel: "Requiere combustible",
  fGuiTitle: "Título de GUI",
  fAllowedRecipes: "Recetas permitidas (vacío = todas de esta estación)",
  fStationId: "Id de la estación",
  fProcTime: "Tiempo de proceso (ticks)",
  fFuelPerCraft: "Combustible por crafteo",
  fXp: "XP de personaje otorgada",
  fCurrency: "Moneda (vacío = base)",
  fCost: "Costo económico",
  fFailChance: "Prob. de fallo (-1 = usar config.yml)",
  fQualityEnabled: "Calidad habilitada",
  fMaterialOrItem: "Material o id de ítem",
  fIsCustomItem: "Es ítem personalizado",
  fBurnTicks: "Ticks de quemado",
  fConsumeAmount: "Cantidad consumida",
  phNewStation: "nueva_estacion",
  phForge: "Forja de Hierro",
  phNewRecipe: "nueva_receta",
  phSteel: "Lingote de Acero",
  phNewFuel: "nuevo_combustible",
  phCharcoal: "Carbón vegetal",
};

export type CraftingCopy = typeof es;

const en: CraftingCopy = {
  title: "RPGRoll-Crafting",
  intro:
    "An advanced crafting engine: custom recipes with {rich}, a quality system, {stations} (multi-stage, with fuel, an optional multiblock structure and upgradable tiers) and a bridge to the vanilla stations that expose a generic recipe API (crafting table, the furnace family, stonecutter, smithing table), plus dedicated engines for the ones that do not (anvil, brewing, grindstone, cartography table, loom, villager trading and Crafter automation). It also includes its own {prof} system and recipe discovery by experimentation.",
  richWord: "rich ingredients and conditions",
  stationsWord: "custom crafting stations",
  profWord: "crafting proficiency",

  reqTitle: "Requirements",
  thPlugin: "Plugin",
  thType: "Type",
  thWhatFor: "What for",
  rLib: "GUI framework and shared utilities.",
  rCore:
    "The player's level, race, class and job for the LEVEL_MIN, RACE, CLASS and JOB_MIN conditions, and the recipes' character xp. Without the core those conditions are not met and the xp is skipped.",
  rItems: "It recognizes custom items as an ingredient/result (via {m1}/{m2}, without a dedicated public API from that addon).",
  rEconomy: "It charges a recipe's optional monetary cost.",
  rGuilds: "The {cond} condition.",
  rSeasons: "The {cond} condition.",

  identityTitle: "Item identity",
  identityBody:
    "Any result that is not a pure vanilla material is marked with the shared PDC key {key} (a literal namespace, not tied to this plugin). The engine also knows how to read, without a compile-time dependency on RPGRoll-Items, the key that addon already uses ({key2}) — so a custom Items item works as an ingredient or a result without Crafting needing its Java class.",
  plainTitle: "Plain vanilla materials are never tagged",
  plainBody:
    "If the result is a simple {material} with quality disabled, the item comes out clean (no PDC) so it keeps stacking normally with the rest of the inventory. It is only tagged when there is a real identity to preserve (a custom item, or a rolled quality).",

  ingTitle: "Ingredients",
  ingBody:
    "Each {spec} has a {type}, a {value}, an {amount} and optionally a {minQuality} (the item handed in must meet or exceed that quality).",
  thValueExpects: "value expects",
  iMaterial: "An exact vanilla {material}.",
  iTag: "A vanilla item tag (e.g. {example}) — any material in the tag works.",
  iItemId: "A custom item id, Crafting's own or RPGRoll-Items'.",
  iAny: "A wildcard — any item works, only the amount matters.",

  condTitle: "Conditions",
  condBody:
    "Per-player gating, evaluated before starting a recipe (or when previewing the result in the vanilla crafting table). Each type that depends on another addon follows the ecosystem's soft “isReady() → get()” pattern: if the addon is not installed, the condition simply is not met.",
  thChecks: "What it checks",
  cLevel: "The minimum character level ({min}).",
  cRace: "The character's exact race or class.",
  cJob: "The minimum level in a specific job ({value} + {min}).",
  cPermission: "A Bukkit permission node.",
  cWorld: "The world's name.",
  cHour: "A range on Minecraft's clock, e.g. {example}.",
  cBiome: "An exact vanilla biome.",
  cSeason: "An RPGRoll-Seasons season id.",
  cGuild: "The player belongs to a guild (RPGRoll-Guilds).",
  cWeather: "{clear} / {rain} / {thunder} in the player's world.",

  qualTitle: "Quality system",
  qualBody:
    "When a recipe has {enabled}, the result rolls a {cls} tier (70% from skill, 30% chance — the same approach as RPGRoll-Ranching's {ranchQuality}) and is tagged with a lore line + the quality PDC key, so other recipes can require {minQuality} on that item as an ingredient.",
  thTier: "Tier",
  thValueMult: "Value multiplier",
  qCrude: "Crude",
  qStandard: "Standard",
  qFine: "Fine",
  qMaster: "Masterwork",
  qLegendary: "Legendary",

  stationsTitle: "Custom stations ⭐",
  stationsBody:
    "The addon's flagship system. A {cls} is a block in the world (any {material} you define) that on right click opens an inventory of its own (ingredients + optional fuel + result). Each station placed in the world has its own {runtime} — persisted per location in {path} — which {engine} ticks periodically ({interval}): it looks for a recipe whose ingredients/conditions/fuel are met, starts it (consuming ingredients and charging the cost), advances the progress, and hands over the result — with quality, xp and recipe discovery included — when it finishes.",
  outputWarnTitle: "The output slot is extract-only",
  outputWarnBody:
    "The player can take the finished result out, but cannot insert items there by hand — doing so would break the count the engine uses to know whether it can place the next result.",

  structTitle: "Multiblock structure",
  structBody:
    "A station can require specific blocks around the trigger — {key} is a list of relative offsets ({dx}/{dy}/{dz}) + {material}. If one is missing, the right click opens nothing and reports what is missing and where. Empty (the default), the station behaves as always: a single trigger block, with no structure.",

  tiersTitle: "Station tiers (Forge I-V)",
  tiersBody:
    "{maxTier}, {speedBonus} and {failReduction} enable per-instance upgrades: each {runtime} stores its own {tier} (persisted, starting at 1), and {cmd} — used with the station open — charges the next tier's cost ({upgrades}: ingredients + an optional monetary cost) and raises it. The processing engine applies the bonus automatically: fewer effective {time} and a lower effective {fail} per tier above 1, without the recipe needing to know anything about the station's tier.",

  profTitle: "Crafting proficiency",
  profBody:
    "The addon's own “skill system” — it replaces the {skillFactor} that used to be a fixed constant in the quality roll. Each station has a {category} (empty = it uses its own id; two stations with the same category share the same progress). Completing a recipe grants proficiency xp to that category (the recipe's same {xp}, minimum 1), persisted in {path}. The resulting level (a quadratic curve, 50 levels) feeds {roller} as a 0-1 factor — the higher the level in a category, the better the average quality when crafting there. {cmd} shows your level and progress.",
  profTipTitle: "Why not a new addon",
  profTipBody:
    "There is no generic shared skill system in the RPGRoll ecosystem yet — instead of building a separate one (out of scope for “finishing Crafting”), the proficiency lives inside this addon, exposed through {api} so something more general can plug in later.",

  recipesTitle: "Custom recipes",
  recipesBody:
    "A {cls} points at a {stationId}, defines its ingredients and conditions, a {result} (a vanilla material or an RPGRoll-Items item), a processing time, required fuel, an optional monetary cost, character xp, its own fail chance (or one inherited from {default}) and whether it goes through the quality system.",

  vanillaTitle: "Bridge to vanilla stations",
  vanillaBody:
    "A {cls} is registered directly in {addRecipe} — it covers the 7 vanilla stations for which Bukkit exposes a generic {recipe} type. The result can be a material or an RPGRoll-Items item, just like the custom-station recipes.",
  thVanillaStation: "Vanilla station",
  vTable: "Crafting table.",
  vFurnace: "The whole furnace family.",
  vStonecutter: "Stonecutter.",
  vSmithing: "Smithing table (template + base + addition).",
  vanillaWarnTitle: "The conditions only apply at the crafting table",
  vanillaWarnBody:
    "Bukkit offers no “preview” event for furnaces/stonecutter/smithing — those 5 stations register the recipe all the same, but with no per-player gating. At the crafting table, {event} hides the result if the player looking at it does not meet the conditions.",

  enginesTitle: "Dedicated engines",
  enginesBody:
    "7 vanilla stations have a generic {recipe} type in Bukkit (above). The other 7 do not — Anvil and Brewing were solved from the addon's launch; Grindstone, Cartography Table, Loom, Villager Trading and Crafter automation were added later, each with its own engine because each exposes (or does not expose) a different API.",
  thStation: "Station",
  thEngine: "Engine",
  thIntercepts: "How it intercepts",
  eAnvil: "Anvil",
  eAnvilBody: "{event} — it replaces the result if base+addition match an {def}.",
  eBrewing: "Brewing",
  eBrewingBody: "{event} — it replaces each bottle's result if the ingredient matches a {def}.",
  eGrindstone: "Grindstone",
  eGrindstoneBody: "{event} (the same pattern as the anvil) — {def}.",
  eCartography: "Cartography Table",
  eCartographyBody: "Bukkit has no “prepare” event here — Paper does, {event} — {def}.",
  eLoom: "Loom",
  eLoomBody:
    "With no “prepare” event or slot getters — it intercepts the click on the result slot (a fixed layout: banner/dye/pattern/result) — {def}.",
  eVillager: "Villager Trading",
  eVillagerBody: "{e1}/{e2} on a bound villager — {def}.",
  eCrafter: "Crafter (automation)",
  eCrafterBody:
    "{event} — it cancels vanilla recipes with conditions that depend on a player (a Crafter crafts with none present).",
  enginesNoMatchBody: "With no match, the seven stations work exactly as in vanilla.",

  grindTitle: "Grindstone",
  grindBody: "{def}: {upper} + {lower} → {result}, with optional conditions — YAML ({dir}) or the Crafting Studio browser.",
  cartTitle: "Cartography table",
  cartBody: "{def}: {map} + {item} → {result} — YAML ({dir}) or the Crafting Studio browser.",
  loomTitle: "Loom",
  loomBody:
    "{def}: {banner} + {dye} + optionally a specific {pattern} → {result} — YAML ({dir}) or the Crafting Studio browser (the pattern can be cleared with a right click to go back to “any”).",
  villagerTitle: "Villager trading",
  villagerBody:
    "A {def} (1 or 2 costs, editable by YAML or the Crafting Studio browser) does not activate by itself — you have to {bind} a specific villager with {cmd} while looking at it (it stores the ids in its PDC, which persists with the chunk — with no bindings YAML of its own). A bound villager offers those trades instead of the normal vanilla ones; {unbind} returns it to normal.",
  bindWord: "bind",
  crafterTitle: "Crafter automation",
  crafterBody:
    "The Crafter block crafts with no player present, so a crafting-table {def} with conditions that depend on a player (level, race, class, job, permission, biome, guild) cannot be evaluated there — {engine} cancels that auto-craft instead of letting it through unchecked.",

  discTitle: "Recipe discovery",
  discBody:
    "Every time a {cls} is completed for the first time for a player, it is marked as discovered (persisted in {path}) and fires {event}. {cmd} opens the Recipe Book: discovered recipes show their icon, station and real ingredients; the others show a “???” item — it never reveals an undiscovered recipe.",
  expBody:
    "Crafting was never gated by discovery — any combination that matches a recipe works, whether you know it or not; discovering is just what gets recorded afterwards. {cmd} goes one step further: at a station with {allow}, with materials laid out that match nothing exactly, it compares how close you got (the fraction of matching ingredients) to the most similar undiscovered recipe and rolls a chance of revealing it without crafting it — knowledge only, not a free shortcut to the item. It has a per-player cooldown ({cooldown}) to prevent spam.",

  offlineTitle: "Processing with the owner offline",
  offlineBody:
    "A station already survived a server restart and kept advancing the progress underway even if its owner disconnected — what did not work was {start} a new recipe with conditions if the owner was not connected, because the check demanded an online {player} even for conditions that really only need their UUID (level, race, class, job, guild membership — read from persisted data, not from the live player). {evaluator} now evaluates those against the UUID directly, and uses the {stationWorld} (not the player's) for {conds}. Economy's cost and the character xp already charged/granted by UUID — they never needed the player online, they were just over-gated.",
  startWord: "starting",
  stationWorldWord: "station's world",
  offlineWarnTitle: "Two conditions still require the player online",
  offlineWarnBody:
    "{permission} and {biome} depend on state that only exists on a real player (their permission tree, their position) — a recipe that uses them cannot start with the owner offline, and that is correct, not a bug.",

  yamlTitle: "YAML file examples",
  refTitle: "Full reference: every field in a single file, for each content type",
  refBody:
    "{files} (included in the jar) document every available field of each type, including every possible ingredient and condition type.",
  builderStation: "Visual builder: Custom station",
  builderRecipe: "Visual builder: Custom recipe",
  builderFuel: "Visual builder: Fuel",

  guiTitle: "GUI: Crafting Studio",
  guiBody:
    "{cmd} opens a hub linking to the {ten} (one per content type), and all 10 have full create + edit in an inventory — nothing requires touching YAML by hand. The scalar fields (name, icon, times, costs, result…) are edited slot by slot; the lists (a recipe's ingredients, conditions) open a dedicated sub-editor with their own “add”/“remove” slots (shift-click) and a mini chat syntax for the new entry, e.g. {e1} or {e2}; a vanilla recipe's {fields} are retyped whole in chat (such a variable list does not fit in fixed slots). Villager trading has its own variant: up to 2 costs, each with its own type/value/amount slot, and a button to add/remove the second. Editing or deleting a vanilla recipe re-registers it in Bukkit at once — there is no need to restart the server. On the player's side, {book} opens the Recipe Book.",
  tenBrowsers: "10 browsers",

  apiTitle: "API for addons — CraftingAPI + events",
  apiBody:
    "{isReady} / {get}, the same pattern as the rest of the ecosystem. It exposes the 10 content managers (stations, custom recipes, fuels, vanilla, anvil, brewing, grindstone, cartography, loom, villager trading), {discovery}, {proficiency} and {stationAt} to query a location's {runtime} (including its current {tier}).",
  thEvent: "Event",
  thWhen: "When",
  ev1: "Just before consuming ingredients/charging — cancellable.",
  ev2: "The recipe starts processing.",
  ev3: "Every tick the progress advances.",
  ev4: "The result was handed over successfully.",
  ev5: "The recipe finished but failed.",
  ev6: "The first time a player discovers a recipe.",
  ev7: "A right click on a station's block — cancellable.",
  ev8: "The player closes a station's inventory.",

  cmdsTitle: "Commands",
  thCommand: "Command",
  thWhat: "What it does",
  thPermission: "Permission",
  a1: "Opens the Crafting Studio.",
  a2: "Reloads all the YAML content.",
  a3: "Hands over an RPGRoll-Items item by id.",
  a4: "Binds the villager you are looking at to those trades.",
  a5: "Unbinds the villager you are looking at.",
  u1: "Opens your Recipe Book.",
  u2: "See how many recipes you have discovered.",
  u3: "Upgrades the station you have open.",
  u4: "Tries to discover a recipe from what you have laid out (a station with {allow}).",
  u5: "See your proficiency level in that category.",

  fId: "Id",
  fDisplayName: "Display name",
  fIcon: "Icon (Material)",
  fTriggerBlock: "Trigger block (Material)",
  fInvSize: "Inventory size",
  fIngSlots: "Ingredient slots",
  fFuelSlot: "Fuel slot (-1 = no fuel)",
  fOutputSlot: "Output slot",
  fRequiresFuel: "Requires fuel",
  fGuiTitle: "GUI title",
  fAllowedRecipes: "Allowed recipes (empty = all of this station's)",
  fStationId: "Station id",
  fProcTime: "Processing time (ticks)",
  fFuelPerCraft: "Fuel per craft",
  fXp: "Character XP granted",
  fCurrency: "Currency (empty = base)",
  fCost: "Monetary cost",
  fFailChance: "Fail chance (-1 = use config.yml)",
  fQualityEnabled: "Quality enabled",
  fMaterialOrItem: "Material or item id",
  fIsCustomItem: "Is a custom item",
  fBurnTicks: "Burn ticks",
  fConsumeAmount: "Amount consumed",
  phNewStation: "new_station",
  phForge: "Iron Forge",
  phNewRecipe: "new_recipe",
  phSteel: "Steel Ingot",
  phNewFuel: "new_fuel",
  phCharcoal: "Charcoal",
};

const pt: CraftingCopy = {
  title: "RPGRoll-Crafting",
  intro:
    "Motor de crafting avançado: receitas personalizadas com {rich}, um sistema de qualidade, {stations} (multietapa, com combustível, estrutura multibloco opcional e níveis melhoráveis) e uma ponte para as estações vanilla que expõem uma API de receita genérica (mesa de crafting, família de fornos, cortadora de pedra, mesa de ferraria), mais motores dedicados para as que não a têm (bigorna, fermentação, esmeril, mesa de cartografia, tear, comércio de aldeões e automação de Crafter). Inclui também um sistema de {prof} próprio e descobrimento de receitas por experimentação.",
  richWord: "ingredientes e condições ricas",
  stationsWord: "estações de crafting próprias",
  profWord: "proficiência de crafting",

  reqTitle: "Requisitos",
  thPlugin: "Plugin",
  thType: "Tipo",
  thWhatFor: "Para quê",
  rLib: "Framework de GUIs e utilitários compartilhados.",
  rCore:
    "Nível, raça, classe e ofício do jogador para as condições LEVEL_MIN, RACE, CLASS e JOB_MIN, e o xp de personagem das receitas. Sem o core essas condições não são cumpridas e o xp é omitido.",
  rItems: "Reconhece itens personalizados como ingrediente/resultado (via {m1}/{m2}, sem uma API pública dedicada desse addon).",
  rEconomy: "Cobra o custo monetário opcional de uma receita.",
  rGuilds: "Condição {cond}.",
  rSeasons: "Condição {cond}.",

  identityTitle: "Identidade de item",
  identityBody:
    "Qualquer resultado que não seja um material vanilla puro é marcado com a chave PDC compartilhada {key} (namespace literal, não atado a este plugin). O motor também sabe ler, sem depender em tempo de compilação do RPGRoll-Items, a chave que esse addon já usa ({key2}) — assim um item personalizado do Items funciona como ingrediente ou resultado sem que o Crafting precise da classe Java dele.",
  plainTitle: "Os materiais vanilla puros nunca são etiquetados",
  plainBody:
    "Se o resultado é um {material} simples sem qualidade habilitada, o item sai limpo (sem PDC) para que continue empilhando normalmente com o resto do inventário. Só é etiquetado quando há uma identidade real a preservar (item personalizado, ou qualidade rolada).",

  ingTitle: "Ingredientes",
  ingBody:
    "Cada {spec} tem um {type}, um {value}, uma {amount} e opcionalmente uma {minQuality} (o item entregue deve cumprir ou superar essa qualidade).",
  thValueExpects: "value espera",
  iMaterial: "Um {material} vanilla exato.",
  iTag: "Uma tag vanilla de itens (ex. {example}) — qualquer material da tag serve.",
  iItemId: "Um id de item personalizado, próprio do Crafting ou do RPGRoll-Items.",
  iAny: "Curinga — qualquer item serve, só importa a quantidade.",

  condTitle: "Condições",
  condBody:
    "Condicionamento por jogador, avaliado antes de iniciar uma receita (ou ao pré-visualizar o resultado na mesa de crafting vanilla). Cada tipo que depende de outro addon segue o padrão brando «isReady() → get()» do ecossistema: se o addon não está instalado, a condição simplesmente não é cumprida.",
  thChecks: "O que verifica",
  cLevel: "Nível de personagem mínimo ({min}).",
  cRace: "Raça ou classe exata do personagem.",
  cJob: "Nível mínimo num job específico ({value} + {min}).",
  cPermission: "Nó de permissão do Bukkit.",
  cWorld: "Nome do mundo.",
  cHour: "Faixa de hora do relógio do Minecraft, ex. {example}.",
  cBiome: "Bioma vanilla exato.",
  cSeason: "Id de estação do RPGRoll-Seasons.",
  cGuild: "O jogador pertence a uma guilda (RPGRoll-Guilds).",
  cWeather: "{clear} / {rain} / {thunder} no mundo do jogador.",

  qualTitle: "Sistema de qualidade",
  qualBody:
    "Quando uma receita tem {enabled}, o resultado rola um tier {cls} (70 % conforme habilidade, 30 % sorte — mesma abordagem que o {ranchQuality} do RPGRoll-Ranching) e fica etiquetado com uma linha de lore + a chave PDC de qualidade, para que outras receitas possam exigir {minQuality} sobre esse item como ingrediente.",
  thTier: "Tier",
  thValueMult: "Multiplicador de valor",
  qCrude: "Tosca",
  qStandard: "Padrão",
  qFine: "Fina",
  qMaster: "Mestra",
  qLegendary: "Lendária",

  stationsTitle: "Estações personalizadas ⭐",
  stationsBody:
    "O sistema insígnia do addon. Uma {cls} é um bloco do mundo (qualquer {material} que você definir) que ao clicar com o direito abre um inventário próprio (ingredientes + combustível opcional + resultado). Cada estação colocada no mundo tem o seu próprio {runtime} — persistido por localização em {path} — que o {engine} tickeia periodicamente ({interval}): busca uma receita cujos ingredientes/condições/combustível sejam cumpridos, a inicia (consumindo ingredientes e cobrando o custo), avança o progresso, e entrega o resultado — com qualidade, xp e descobrimento de receita incluídos — quando termina.",
  outputWarnTitle: "O slot de saída é só de extração",
  outputWarnBody:
    "O jogador pode tirar o resultado terminado, mas não pode inserir itens ali à mão — se fizesse, quebraria a contagem que o motor usa para saber se já pode colocar o próximo resultado.",

  structTitle: "Estrutura multibloco",
  structBody:
    "Uma estação pode exigir blocos concretos em volta do disparador — {key} é uma lista de offsets relativos ({dx}/{dy}/{dz}) + {material}. Se faltar algum, o clique direito não abre nada e avisa o que falta e onde. Vazia (por padrão), a estação se comporta como sempre: um único bloco disparador, sem estrutura.",

  tiersTitle: "Níveis de estação (Forja I-V)",
  tiersBody:
    "{maxTier}, {speedBonus} e {failReduction} habilitam melhorias por instância: cada {runtime} guarda o seu próprio {tier} (persistido, começa em 1), e {cmd} — usado com a estação aberta — cobra o custo do próximo nível ({upgrades}: ingredientes + custo monetário opcional) e o sobe. O motor de processo aplica o bônus automaticamente: menos {time} efetivos e menos {fail} efetiva por cada nível acima de 1, sem que a receita precise saber nada do nível da estação.",

  profTitle: "Proficiência de crafting",
  profBody:
    "O «sistema de habilidades» próprio do addon — substitui o {skillFactor} que antes era uma constante fixa no roll de qualidade. Cada estação tem uma {category} (vazia = usa o próprio id; duas estações com a mesma categoria compartilham o mesmo progresso). Completar uma receita concede xp de proficiência a essa categoria (o mesmo {xp} da receita, mínimo 1), persistido em {path}. O nível resultante (curva quadrática, 50 níveis) alimenta o {roller} como fator 0-1 — mais nível numa categoria, melhor qualidade média ao craftar ali. {cmd} mostra o seu nível e progresso.",
  profTipTitle: "Por que não um addon novo",
  profTipBody:
    "Não existe ainda um sistema de habilidades genérico compartilhado no ecossistema RPGRoll — em vez de construir um à parte (fora do escopo de «completar o Crafting»), a proficiência vive dentro deste addon, exposta via {api} para que algo mais geral se conecte depois.",

  recipesTitle: "Receitas personalizadas",
  recipesBody:
    "Uma {cls} aponta para uma {stationId}, define os seus ingredientes e condições, um {result} (material vanilla ou item do RPGRoll-Items), tempo de processo, combustível requerido, custo monetário opcional, xp de personagem, probabilidade de falha própria (ou herdada de {default}) e se passa pelo sistema de qualidade.",

  vanillaTitle: "Ponte com estações vanilla",
  vanillaBody:
    "Uma {cls} é registrada diretamente em {addRecipe} — cobre as 7 estações vanilla para as quais o Bukkit expõe um tipo {recipe} genérico. O resultado pode ser um material ou um item do RPGRoll-Items, igual às receitas de estação própria.",
  thVanillaStation: "Estação vanilla",
  vTable: "Mesa de crafting.",
  vFurnace: "Família completa de fornos.",
  vStonecutter: "Cortadora de pedra.",
  vSmithing: "Mesa de ferraria (template + base + adição).",
  vanillaWarnTitle: "As condições só se aplicam na mesa de crafting",
  vanillaWarnBody:
    "O Bukkit não oferece um evento de «pré-visualização» para fornos/cortadora/ferraria — essas 5 estações registram a receita igual, mas sem condicionamento por jogador. Na mesa de crafting, {event} oculta o resultado se o jogador que a vê não cumpre as condições.",

  enginesTitle: "Motores dedicados",
  enginesBody:
    "7 estações vanilla têm um tipo {recipe} genérico no Bukkit (acima). As outras 7 não — Bigorna e Fermentação foram resolvidas desde o lançamento do addon; Esmeril, Mesa de Cartografia, Tear, Comércio de Aldeões e automação de Crafter foram adicionadas depois, cada uma com o seu próprio motor porque cada uma expõe (ou não expõe) uma API diferente.",
  thStation: "Estação",
  thEngine: "Motor",
  thIntercepts: "Como intercepta",
  eAnvil: "Bigorna",
  eAnvilBody: "{event} — substitui o resultado se base+adição coincidirem com uma {def}.",
  eBrewing: "Fermentação",
  eBrewingBody: "{event} — substitui o resultado de cada garrafa se o ingrediente coincidir com uma {def}.",
  eGrindstone: "Esmeril",
  eGrindstoneBody: "{event} (mesmo padrão que a bigorna) — {def}.",
  eCartography: "Mesa de Cartografia",
  eCartographyBody: "O Bukkit não tem evento «prepare» aqui — o Paper sim, {event} — {def}.",
  eLoom: "Tear",
  eLoomBody:
    "Sem evento «prepare» nem getters de slot — intercepta o clique no slot de resultado (layout fixo: estandarte/corante/padrão/resultado) — {def}.",
  eVillager: "Comércio de Aldeões",
  eVillagerBody: "{e1}/{e2} sobre um aldeão vinculado — {def}.",
  eCrafter: "Crafter (automação)",
  eCrafterBody:
    "{event} — cancela receitas vanilla com condições que dependem de um jogador (um Crafter crafta sem nenhum presente).",
  enginesNoMatchBody: "Sem coincidência, as sete estações funcionam exatamente igual ao vanilla.",

  grindTitle: "Esmeril",
  grindBody: "{def}: {upper} + {lower} → {result}, com condições opcionais — YAML ({dir}) ou o navegador do Crafting Studio.",
  cartTitle: "Mesa de cartografia",
  cartBody: "{def}: {map} + {item} → {result} — YAML ({dir}) ou o navegador do Crafting Studio.",
  loomTitle: "Tear",
  loomBody:
    "{def}: {banner} + {dye} + opcionalmente um {pattern} concreto → {result} — YAML ({dir}) ou o navegador do Crafting Studio (o padrão pode ser removido com clique direito para voltar a «qualquer»).",
  villagerTitle: "Comércio de aldeões",
  villagerBody:
    "Um {def} (1 ou 2 custos, editável por YAML ou pelo navegador do Crafting Studio) não se ativa sozinho — é preciso {bind} um aldeão pontual com {cmd} olhando para ele (guarda os ids no PDC dele, que persiste com o chunk — sem YAML próprio de bindings). Um aldeão vinculado oferece esses comércios em vez dos vanilla normais; {unbind} o devolve à normalidade.",
  bindWord: "vincular",
  crafterTitle: "Automação de Crafter",
  crafterBody:
    "O bloco Crafter crafta sem nenhum jogador presente, então uma {def} de mesa de crafting com condições que dependem de um jogador (nível, raça, classe, job, permissão, bioma, guilda) não pode ser avaliada ali — o {engine} cancela esse auto-craft em vez de deixá-lo passar sem verificação.",

  discTitle: "Descobrimento de receitas",
  discBody:
    "Cada vez que uma {cls} é completada pela primeira vez para um jogador, fica marcada como descoberta (persistido em {path}) e dispara {event}. {cmd} abre o Recipe Book: as receitas descobertas mostram o ícone, estação e ingredientes reais; as que não, um item «???» — nunca revela uma receita não descoberta.",
  expBody:
    "Craftar nunca foi condicionado pelo descobrimento — qualquer combinação que coincida com uma receita funciona, você a conheça ou não; descobrir é só o que fica registrado depois. {cmd} vai um passo além: numa estação com {allow}, com materiais colocados que não coincidem com nada exato, compara o quão perto você esteve (fração de ingredientes coincidentes) da receita não descoberta mais parecida e rola uma chance de revelá-la sem craftá-la — só conhecimento, não um atalho grátis para o item. Tem cooldown por jogador ({cooldown}) para evitar spam.",

  offlineTitle: "Processamento com o dono offline",
  offlineBody:
    "Uma estação já sobrevivia a um reinício do servidor e seguia avançando o progresso em curso mesmo que o dono se desconectasse — o que não funcionava era {start} uma receita nova com condições se o dono não estivesse conectado, porque a verificação exigia um {player} online mesmo para condições que na verdade só precisam do UUID dele (nível, raça, classe, job, filiação a guilda — são lidos de dados persistidos, não do jogador ao vivo). O {evaluator} agora avalia essas contra o UUID diretamente, e usa o {stationWorld} (não o do jogador) para {conds}. O custo do Economy e o xp de personagem já cobravam/concediam por UUID — nunca precisaram do jogador online, só estavam condicionados demais.",
  startWord: "iniciar",
  stationWorldWord: "mundo da estação",
  offlineWarnTitle: "Duas condições seguem exigindo o jogador conectado",
  offlineWarnBody:
    "{permission} e {biome} dependem de estado que só existe num jogador real (a árvore de permissões dele, a posição dele) — uma receita que as use não pode iniciar com o dono offline, e isso é correto, não um bug.",

  yamlTitle: "Exemplos de arquivo YAML",
  refTitle: "Referência completa: todos os campos num só arquivo, por cada tipo de conteúdo",
  refBody:
    "{files} (incluídos no jar) documentam todos os campos disponíveis de cada tipo, incluindo todos os tipos possíveis de ingrediente e de condição.",
  builderStation: "Construtor visual: Estação personalizada",
  builderRecipe: "Construtor visual: Receita personalizada",
  builderFuel: "Construtor visual: Combustível",

  guiTitle: "GUI: Crafting Studio",
  guiBody:
    "{cmd} abre um hub que liga aos {ten} (um por tipo de conteúdo), e os 10 têm criar + editar completo no inventário — nada requer mexer em YAML à mão. Os campos escalares (nome, ícone, tempos, custos, resultado…) são editados slot por slot; as listas (ingredientes de uma receita, condições) abrem um subeditor dedicado com os seus próprios slots de «adicionar»/«remover» (shift-clique) e uma minissintaxe pelo chat para o item novo, ex. {e1} ou {e2}; {fields} de uma receita vanilla são reescritos inteiros pelo chat (uma lista tão variável não entra em slots fixos). O comércio de aldeão tem a sua própria variante: até 2 custos, cada um com o seu próprio slot de tipo/valor/quantidade, e um botão para adicionar/remover o segundo. Editar ou apagar uma receita vanilla a registra de novo no Bukkit na hora — não é preciso reiniciar o servidor. Do lado do jogador, {book} abre o Recipe Book.",
  tenBrowsers: "10 navegadores",

  apiTitle: "API para addons — CraftingAPI + eventos",
  apiBody:
    "{isReady} / {get}, mesmo padrão que o resto do ecossistema. Expõe os 10 managers de conteúdo (estações, receitas personalizadas, combustíveis, vanilla, bigorna, fermentação, esmeril, cartografia, tear, comércio de aldeões), {discovery}, {proficiency} e {stationAt} para consultar o {runtime} de uma localização (inclui o {tier} atual dela).",
  thEvent: "Evento",
  thWhen: "Quando",
  ev1: "Logo antes de consumir ingredientes/cobrar — cancelável.",
  ev2: "A receita começa a ser processada.",
  ev3: "A cada tick que o progresso avança.",
  ev4: "Resultado entregue com sucesso.",
  ev5: "A receita terminou mas falhou.",
  ev6: "Primeira vez que um jogador descobre uma receita.",
  ev7: "Clique direito no bloco de uma estação — cancelável.",
  ev8: "O jogador fecha o inventário de uma estação.",

  cmdsTitle: "Comandos",
  thCommand: "Comando",
  thWhat: "O que faz",
  thPermission: "Permissão",
  a1: "Abre o Crafting Studio.",
  a2: "Recarrega todo o conteúdo YAML.",
  a3: "Entrega um item do RPGRoll-Items por id.",
  a4: "Vincula o aldeão para o qual você olha a esses comércios.",
  a5: "Desvincula o aldeão para o qual você olha.",
  u1: "Abre o seu Recipe Book.",
  u2: "Veja quantas receitas você descobriu.",
  u3: "Sobe de nível a estação que você tem aberta.",
  u4: "Tenta descobrir uma receita pelo que você tem colocado (estação com {allow}).",
  u5: "Veja o seu nível de proficiência nessa categoria.",

  fId: "Id",
  fDisplayName: "Nome visível",
  fIcon: "Ícone (Material)",
  fTriggerBlock: "Bloco disparador (Material)",
  fInvSize: "Tamanho de inventário",
  fIngSlots: "Slots de ingrediente",
  fFuelSlot: "Slot de combustível (-1 = sem combustível)",
  fOutputSlot: "Slot de saída",
  fRequiresFuel: "Requer combustível",
  fGuiTitle: "Título de GUI",
  fAllowedRecipes: "Receitas permitidas (vazio = todas desta estação)",
  fStationId: "Id da estação",
  fProcTime: "Tempo de processo (ticks)",
  fFuelPerCraft: "Combustível por craft",
  fXp: "XP de personagem concedido",
  fCurrency: "Moeda (vazio = base)",
  fCost: "Custo monetário",
  fFailChance: "Prob. de falha (-1 = usar config.yml)",
  fQualityEnabled: "Qualidade habilitada",
  fMaterialOrItem: "Material ou id de item",
  fIsCustomItem: "É item personalizado",
  fBurnTicks: "Ticks de queima",
  fConsumeAmount: "Quantidade consumida",
  phNewStation: "nova_estacao",
  phForge: "Forja de Ferro",
  phNewRecipe: "nova_receita",
  phSteel: "Barra de Aço",
  phNewFuel: "novo_combustivel",
  phCharcoal: "Carvão vegetal",
};

export const CRAFTING_COPY: Record<Locale, CraftingCopy> = { es, en, pt };
