import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Ranching. */

const es = {
  title: "Ranching (RPGRoll-Ranching)",
  intro:
    "Ganadería como simulación viva — cada animal tiene su propio ADN, con genes heredables, dominancia real, mutaciones raras y un linaje congelado que persigue la endogamia. Criar no es acumular: es seleccionar reproductores, mejorar generaciones, y cuidar salud/nutrición/bienestar para que la producción valga la pena.",

  heartTitle: "El corazón del addon: Genetics & Bloodline Engine",
  heartBody:
    "Cada gen es un porcentaje continuo (0-100), no un rasgo discreto «A/a» de libro de texto — más fiel a ejemplos como «Producción de leche: 92 %» que al cuadro de Punnett clásico. Cada animal tiene DOS alelos por gen; la {dominance} del gen decide cómo se combinan en el valor final expresado.",

  reqTitle: "Requisitos",
  reqBody:
    "Sin {seasons}, el factor climático de bienestar/fertilidad/producción simplemente no aplica (el resto funciona igual). RPGRoll-Farming, RPGRoll-Cooking y RPGRoll-Alchemy no existen, así que Ranching no se integra con ellos — esas integraciones del diseño original quedan sin usar como métodos genéricos en {api}. Sin {srp}, el {reskinLink} simplemente no aparece configurado (el animal se ve vanilla normal, nada se rompe). Sin Vault el mercado de animales avisa y no cobra; sin FreeMinecraftModels los animales usan su aspecto vanilla (o el reskin).",
  reskinLinkText: "reskin visual por raza",

  geneticsTitle: "Genética: alelos y dominancia",
  thDominance: "Dominancia",
  thPhenotype: "Cómo se resuelve el fenotipo",
  dDominant: "El alelo más alto domina — un solo padre con una copia fuerte alcanza para expresarla.",
  dRecessive: "El alelo más bajo domina — hacen falta AMBAS copias fuertes para expresarse del todo.",
  dMixed: "Codominancia/mezcla — el fenotipo es el promedio de los dos alelos.",
  modesBody: "Tres modos de herencia, elegibles en {config} ({key}):",
  thMode: "Modo",
  thHowConceives: "Cómo concibe una cría",
  mSimple: "Promedio de ambos padres +/- una pequeña variación al azar — sin alelos separados.",
  mAdvanced: "Segregación mendeliana real: un alelo al azar de cada padre, resuelto por la dominancia del gen.",
  mProbabilistic:
    "Igual que ADVANCED, pero el Breeding Planner puede simular 500 crías virtuales antes de aparear y mostrar la distribución (mín/prom/máx) por chat.",
  mutTitle: "Las mutaciones viven DENTRO del gen, no son un tipo de contenido propio",
  mutBody:
    "Cada {gene} puede declarar una lista de {mutations} — variantes raras ({multiply} el fenotipo, {override} a un valor fijo, o puramente {cosmetic} como «Lana dorada») con su propia chance. No tienen su propio navegador en el Ranch Studio porque no tienen sentido sin el gen al que decoran.",

  lineageTitle: "Linaje y endogamia",
  lineageBody:
    "Al nacer, una cría congela una copia (id, nombre, especie) de sus dos padres y de los ancestros que ya tenían — {never}, así que el linaje se puede mostrar completo incluso mucho después de que un ancestro murió o fue vendido. El Breeding Planner chequea {setting} generaciones hacia atrás antes de aparear y avisa (no bloquea) si dos candidatos comparten sangre reciente.",
  neverResolves: "nunca vuelve a resolver un animal real más tarde",

  speciesTitle: "Especies y razas",
  speciesBody:
    "Una {species} ata la simulación a un {entityType} vanilla real (COW, CHICKEN, SHEEP…) y define cuánto pesa, cuánto dura cada etapa de vida, si gesta o no, y qué produce. Una {breed} siempre pertenece a una sola especie y aplica multiplicadores sobre esa base (producción/peso/fertilidad/resistencia) más un {temperament} puramente descriptivo.",
  thStage: "Etapa de vida",
  thTrigger: "Qué la activa",
  stBaby: "Pasadas {ticks}.",
  stJuvenile: "Pasadas {ticks} más.",
  stAdult: "Pasado {ticks} como adulto — producción y peso caen un poco, la fertilidad baja a 40 %.",
  stockBody: "El plugin trae 7 especies con 3 razas cada una, cada raza con su modelo 3D:",
  thSpecies: "Especie",
  thBreeds: "Razas",
  bRabbit: "californian, rex, angora (da pelo)",
  bDuck: "pekin, mallard, khaki_campbell (entidad CHICKEN)",

  modelsAnimalsTitle: "Modelos 3D de animales (FreeMinecraftModels)",
  modelsAnimalsBody:
    "Con FreeMinecraftModels instalado, cada raza lleva su propio modelo (clave {key} de la raza, p. ej. {example}). Los modelos de las especies vanilla copian la forma del animal original y cambian colores y detalles (cuernos, manchas, crestas, lana). El plugin copia sus {bbmodel} a {dir} al arrancar; si editas uno en Blockbench, no se vuelve a sobrescribir. Tras la primera instalación hay que reiniciar (o {reload}) para que FMM los cargue.",
  modelsAdultsBody:
    "El modelo solo se pone a los adultos; las crías se ven vanilla. El animal vanilla sigue debajo, invisible, y los clics sobre el modelo le llegan igual: ordeñar, esquilar, alimentar, curar y poner en celo con su comida funcionan como siempre.",
  emptyHandTitle: "Clic derecho con la mano vacía",
  emptyHandBody:
    "FreeMinecraftModels no envía al servidor un clic derecho sin ítem sobre un modelo. Para ver el precio o el dueño de un animal ajeno, golpéalo (clic izquierdo): no le hace daño y muestra el aviso.",

  reskinTitle: "Reskin visual por raza (sin ModelEngine/BetterModel)",
  reskinBody:
    "Minecraft no tiene ningún {cmd} para entidades vivas — no hay forma de re-texturizar una vaca u oveja solo con un resource pack. Cada {breed} puede declarar una sección {reskin} opcional que usa el mismo mecanismo que RPGRoll-Mobs: la entidad vanilla real sigue siendo la que camina/produce/se reproduce (comportamiento intacto), pero se le monta una entidad {display} como pasajero real portando un ítem con {cmdKey}.",
  reskinFile: "breeds/holstein.yml (con reskin activo)",
  reskinScaleBody:
    "La escala del reskin se reduce automáticamente a la mitad mientras el animal está en etapa {baby}, igual que ya hace vanilla con el tamaño reducido nativo — no hace falta declarar nada aparte para eso. Sin {material} configurado, el animal se ve exactamente igual que antes: vanilla normal, sin ningún cambio. El material/textura los define un resource pack real — mismo pipeline que RPGRoll-Items: archivos en {path}, sincronizados solos hacia SackResourcePack (si está instalado) al arrancar el plugin.",
  reskinWarnTitle: "Solo verificado por compilación, no probado en juego",
  reskinWarnBody:
    "Igual que en RPGRoll-Mobs, esta primera versión del reskin no fue probada visualmente contra un cliente real (sin servidor Paper disponible en el entorno de desarrollo).",

  breedingTitle: "Reproducción y embarazo",
  breedingTipTitle: "El apareamiento reutiliza el modo vanilla de siempre",
  breedingTipBody:
    "Alimenta a dos animales adultos de sexo opuesto y misma especie con su comida de cría (trigo, semillas, zanahorias…) — Minecraft ya sabe ponerlos en «modo amor». Ranching intercepta ese resultado ({event}), cancela el bebé instantáneo de vanilla, tira la fertilidad de la madre, y si prende: nace directo si la especie no gesta ({gestation}, ej. gallinas), o arranca una gestación real con el tamaño de camada, sexo y genética de la cría {frozen} desde el momento de la concepción — el nacimiento no depende de que el padre siga vivo cuando termine.",
  frozenWord: "ya congelados",
  gestationBody:
    "Durante la gestación la hembra no produce y su fertilidad recalculada baja a 0 hasta que nace la camada. {restart} (no se persiste el estado — una simplificación deliberada para no serializar genotipos/fenotipos de crías pendientes).",
  restartWarning: "Un reinicio del servidor a mitad de gestación cancela el embarazo",

  welfareTitle: "Nutrición y bienestar",
  welfareBody:
    "Un {feed} se da con clic derecho y suma salud/felicidad/un bono temporal de producción, multiplicado por su {quality} (Común/Buena/Premium/Orgánica/Legendaria) — si no coincide con la dieta de la especie ({dietTags}), el efecto se reduce a 40 %. El bienestar se recalcula solo, acercándose gradualmente a un «objetivo» ambiental. El {nutrition} llena la saciedad del animal (0–100, se vacía en un día de Minecraft): lleno, rechaza la comida y el ítem no se gasta. El bono de producción que se acumula comiendo tiene tope: como mucho duplica la siguiente producción.",
  thFactor: "Factor",
  thHowMeasured: "Cómo se mide",
  fLight: "Luz",
  fLightBody: "Nivel de luz del bloque — oscuro penaliza, iluminado da un bono.",
  fWater: "Agua cercana",
  fWaterBody: "Escaneo simple de bloques de agua en un radio chico.",
  fCompany: "Compañía / hacinamiento",
  fCompanyBody:
    "Cuenta animales de la misma especie cerca — 1 a 5 da bono, 0 penaliza (soledad), 9+ penaliza (hacinamiento).",
  fWeather: "Clima",
  fWeatherBody: "Vía RPGRoll-Seasons (si está instalado) — calor/frío extremo penaliza.",
  fHealth: "Salud",
  fHealthBody: "Salud baja arrastra la felicidad hacia abajo también.",
  cleanTitle: "La «limpieza» del diseño original no tiene equivalente real en Bukkit",
  cleanBody:
    "No existe ninguna noción de «corral sucio» para medir — ese factor se reemplazó por luz + agua + hacinamiento, que sí son medibles de verdad contra el mundo. Felicidad y salud alimentan directo a fertilidad y producción, así que «un animal feliz produce más» sigue siendo literalmente cierto.",

  healthTitle: "Enfermedades, vacunas y medicina",
  healthBody:
    "Las enfermedades se contagian entre animales sanos cercanos de la misma especie (chance propia por enfermedad, mayor cuanto peor esté la salud del blanco) y también pueden aparecer solas si el bienestar de un animal está muy descuidado. Mientras dura, penalizan salud/felicidad/producción por igual en cada chequeo periódico. Una {vaccine} no da inmunidad binaria: reduce el riesgo de contagio un {reduction} mientras esté activa (temporal o permanente). Una {medicine} (Antibiótico/Vitamina/Analgésico/Antiparasitario) puede curar al instante con una chance, o acortar la duración restante si no.",

  prodTitle: "Producción y calidad",
  prodBody:
    "Cada especie declara sus productos ({types}) y una cantidad base por unidad ({base}). La cantidad y calidad final de cada ordeñada/esquilada/huevo/carne dependen de genética (busca un gen cuyo {attrKey} contenga el nombre del producto), raza, etapa de vida, felicidad, salud, clima y enfermedad activa — tal como pide el diseño original.",
  thProduct: "Producto",
  thObtained: "Se obtiene reutilizando…",
  pMilk: "Clic con balde vacío ({event}) — entrega un balde de leche con calidad.",
  pWool: "Esquilar ({event}) — respeta el color real de la oveja.",
  pEggs: "La puesta automática de huevos de una gallina ({event}).",
  pMeat: "Se agregan como drops extra al morir el animal ({event}), sumados a los drops vanilla normales.",
  qualityBody:
    "Cada ítem de producción sale etiquetado con su calidad (Común → Buena → Premium → Orgánica → Legendaria) en el lore — listo para que un futuro RPGRoll-Cooking le dé un uso real a esa diferencia.",

  modelsTitle: "Modelos 3D e ítems",
  modelsBody:
    "Los piensos, medicinas y vacunas aceptan la clave {key} (componente item_model, 1.21.4+), y el plugin trae modelos de fábrica para todo su contenido con ids como {example}. Los productos no tienen YAML propio: su modelo sale de {productModels} en el {config}, por tipo de producto y, si quieres, por calidad. El pack de Java va dentro del jar y se registra solo en SackResourcePack; en {bbDir} están los .bbmodel y en {bedrockDir} el pack y el mapeo de Geyser.",

  ownersTitle: "Dueños, mercado y corral",
  ownersBody:
    "Cada animal tiene dueño: quien lo spawnea, lo compra o lo reclama, y las crías heredan el de la madre (o el del padre). Solo el dueño puede ordeñarlo, esquilarlo, alimentarlo, curarlo, criarlo, atarlo o hacerle daño ({perm} se lo salta). Los animales de antes de esta versión no tienen dueño: con {cmd} se hacen tuyos.",
  thWhat: "Qué",
  thHow: "Cómo",
  oMine: "Mis animales",
  oMineBody:
    "{cmd}: clic izquierdo lo llama, derecho lo manda al corral, shift+izquierdo abre su ficha, shift+derecho lo pone o quita de la venta. Abajo: llamar a todos, todos al corral, fijar el corral aquí y el mercado.",
  oCall: "Llamar",
  oCallBody:
    "{cmd} trae al animal a tus pies aunque esté en un chunk descargado u otro mundo. Si su entidad ya no existe (la borró un comando o un plugin de limpieza), se crea otra con sus mismos datos.",
  oPen: "Corral",
  oPenBody: "{fix} guarda tu posición; {send} los manda allí.",
  oSell: "Vender a otro jugador",
  oSellBody: "{cmd} mirando al animal (o con su id). Quien lo toque ve el precio y un botón {buy}; también sale en el mercado.",
  oMarket: "Mercado",
  oMarketBody:
    "{cmd}: pestañas de animales de jugadores, tienda del servidor (fundadores nuevos que aparecen a tus pies) y vender al servidor. Toda compra pide confirmación.",
  oSellServer: "Vender al servidor",
  oSellServerBody:
    "{cmd}: paga el precio base de la especie por su calidad (POOR ×0,5, COMMON ×1, GOOD ×1,5, EXCELLENT ×2,5, EXCEPTIONAL ×5) y el animal desaparece.",
  idBody: "El id de un animal son los primeros caracteres de su UUID, como sale en su ficha ({example}). El dinero va por Vault.",

  eggTitle: "El huevo fosilizado (secreto)",
  eggBody:
    "Muy de vez en cuando una gallina o un pato del rancho pone un {egg} en lugar de un huevo, y a veces lo desentierra un sniffer. Usado sobre un bloque, se incuba unos segundos y nace un mini T-Rex del jugador (especie {species}, raza {breed}, con su modelo). No se anuncia en el juego: es para que lo descubran los jugadores.",
  eggWord: "huevo fosilizado",

  yamlTitle: "Ejemplos de archivo YAML",
  refTitle: "Referencia completa: todos los campos en un solo archivo",
  refBody:
    "{file} (incluido en el jar) usa todos los campos de una especie con una camada múltiple (2 a 6 crías) — la vaca de ejemplo siempre tiene 1, así que no muestra ese caso.",
  builderSpecies: "Constructor visual: especie",
  builderSpeciesDesc:
    "Identidad, ciclo de vida y reproducción de una especie. 'base-production' (mapa clave=valor) se edita mejor copiando el ejemplo de arriba.",
  builderGene: "Constructor visual: gen",

  guiTitle: "GUI: Ranch Studio",
  guiBody:
    "{cmd} abre un hub que enlaza a 7 navegadores de contenido (Especies, Razas, Genes, Alimentos, Enfermedades, Vacunas, Medicinas) más el Explorador de Animales, el Planificador de Cría, y Veterinaria. El Explorador de Animales lista cada animal rastreado y abre una ficha de solo lectura con su genética expresada, linaje y estado. El Planificador de Cría deja elegir dos animales, previsualizar la distribución probable de la cría (modo PROBABILISTIC) por chat, y — como atajo administrativo — forzar el apareamiento sin pasar por el minijuego de alimentar. Veterinaria lista solo los animales enfermos con cura de un clic.",

  apiTitle: "API para addons — RanchingAPI",
  apiTipTitle: "Las acciones de cuidado programáticas no son solo un atajo interno",
  apiTipBody:
    "Son la misma lógica que corre cuando un jugador da clic derecho con un ítem — expuestas a propósito para que un futuro RPGRoll-Workers (pastor/veterinario/alimentador automatizados) las llame directo, sin que Ranching necesite saber que «Workers» existe.",

  cmdsTitle: "Comandos",
  thCommand: "Comando",
  thWhatDoes: "Qué hace",
  a1: "Abre el Ranch Studio.",
  a2: "Recarga todas las definiciones desde disco.",
  a3: "Spawnea un animal fundador (sin padres) en tu ubicación. El dueño por defecto es quien lo spawnea ({dash} = sin dueño); el sexo, al azar si no se indica.",
  a4: "Da un pienso, medicina o vacuna. Sin jugador, a quien lo pide; desde la consola hay que indicar cantidad y jugador.",
  a5: "Da un producto (leche, lana, huevos, carne…) de la calidad indicada (COMMON por defecto), igual que el que da un animal.",
  a6: "Cambia el dueño del animal al que miras.",
  a7: "Da el huevo fosilizado.",
  a8: "Abre la ficha del animal al que estás mirando.",
  a9: "Tus animales, el mercado y reclamar uno sin dueño.",
  a10: "Ponerlo en venta, quitarlo o vendérselo al servidor.",
  a11: "Comprar un animal en venta.",
  a12: "Traer tus animales o mandarlos al corral.",
  permBody: "{admin} requiere {adminPerm} (por defecto: op); {use} requiere {usePerm} (por defecto: true).",

  // YamlBuilder
  fId: "Id",
  fDisplayName: "Nombre visible",
  fIcon: "Ícono (Material)",
  fDescription: "Descripción",
  fEntityType: "EntityType vanilla",
  fEntityTypeHelp: "COW, CHICKEN, SHEEP, PIG, HORSE…",
  fProductTypes: "Tipos de producto",
  fWeightMin: "Peso mín. (kg)",
  fWeightMax: "Peso máx. (kg)",
  fBabyDur: "Duración cría (ticks)",
  fJuvenileDur: "Duración juvenil (ticks)",
  fElder: "Umbral anciano (ticks)",
  fGestation: "Gestación (ticks, 0 = nace directo)",
  fLitterMin: "Camada mín.",
  fLitterMax: "Camada máx.",
  fFertility: "Fertilidad base (0-1)",
  fDietTags: "Tags de dieta",
  fAttrKey: "attribute-key",
  fDominanceLabel: "Dominancia",
  fMin: "Mínimo",
  fMax: "Máximo",
  fSpeciesList: "Especies (vacío = cualquiera)",
  phNewSpecies: "nueva_especie",
  phCow: "&fVaca",
  phNewGene: "nuevo_gen",
  phMilkProduction: "Producción de leche",
};

export type RanchingCopy = typeof es;

const en: RanchingCopy = {
  title: "Ranching (RPGRoll-Ranching)",
  intro:
    "Livestock as a living simulation — each animal has its own DNA, with heritable genes, real dominance, rare mutations and a frozen lineage that tracks inbreeding. Breeding is not hoarding: it is selecting breeders, improving generations, and looking after health/nutrition/welfare so production is worth it.",

  heartTitle: "The addon's heart: the Genetics & Bloodline Engine",
  heartBody:
    "Each gene is a continuous percentage (0-100), not a discrete textbook “A/a” trait — closer to examples like “Milk production: 92%” than to the classic Punnett square. Each animal has TWO alleles per gene; the gene's {dominance} decides how they combine into the final expressed value.",

  reqTitle: "Requirements",
  reqBody:
    "Without {seasons}, the weather factor in welfare/fertility/production simply does not apply (the rest works the same). RPGRoll-Farming, RPGRoll-Cooking and RPGRoll-Alchemy do not exist, so Ranching does not integrate with them — those integrations from the original design are left unused as generic methods in {api}. Without {srp}, the {reskinLink} simply does not come configured (the animal looks plain vanilla, nothing breaks). Without Vault the animal market warns and does not charge; without FreeMinecraftModels the animals use their vanilla look (or the reskin).",
  reskinLinkText: "visual reskin per breed",

  geneticsTitle: "Genetics: alleles and dominance",
  thDominance: "Dominance",
  thPhenotype: "How the phenotype resolves",
  dDominant: "The higher allele dominates — a single parent with one strong copy is enough to express it.",
  dRecessive: "The lower allele dominates — BOTH strong copies are needed to express it fully.",
  dMixed: "Codominance/blending — the phenotype is the average of the two alleles.",
  modesBody: "Three inheritance modes, selectable in {config} ({key}):",
  thMode: "Mode",
  thHowConceives: "How it conceives offspring",
  mSimple: "The average of both parents +/- a small random variation — with no separate alleles.",
  mAdvanced: "Real Mendelian segregation: one random allele from each parent, resolved by the gene's dominance.",
  mProbabilistic:
    "The same as ADVANCED, but the Breeding Planner can simulate 500 virtual offspring before mating and show the distribution (min/avg/max) in chat.",
  mutTitle: "Mutations live INSIDE the gene, they are not a content type of their own",
  mutBody:
    "Each {gene} can declare a list of {mutations} — rare variants ({multiply} the phenotype, {override} it to a fixed value, or purely {cosmetic} like “Golden wool”) with their own chance. They have no browser of their own in the Ranch Studio because they make no sense without the gene they decorate.",

  lineageTitle: "Lineage and inbreeding",
  lineageBody:
    "On being born, offspring freeze a copy (id, name, species) of both parents and of the ancestors they already had — {never}, so the lineage can be shown in full even long after an ancestor died or was sold. The Breeding Planner checks {setting} generations back before mating and warns (it does not block) if two candidates share recent blood.",
  neverResolves: "it never resolves a real animal again later",

  speciesTitle: "Species and breeds",
  speciesBody:
    "A {species} ties the simulation to a real vanilla {entityType} (COW, CHICKEN, SHEEP…) and defines how much it weighs, how long each life stage lasts, whether it gestates or not, and what it produces. A {breed} always belongs to a single species and applies multipliers on top of that base (production/weight/fertility/resistance) plus a purely descriptive {temperament}.",
  thStage: "Life stage",
  thTrigger: "What triggers it",
  stBaby: "Once {ticks} have passed.",
  stJuvenile: "Once another {ticks} have passed.",
  stAdult: "Once {ticks} have passed as an adult — production and weight drop a little, fertility falls to 40%.",
  stockBody: "The plugin ships 7 species with 3 breeds each, each breed with its 3D model:",
  thSpecies: "Species",
  thBreeds: "Breeds",
  bRabbit: "californian, rex, angora (gives fur)",
  bDuck: "pekin, mallard, khaki_campbell (CHICKEN entity)",

  modelsAnimalsTitle: "3D animal models (FreeMinecraftModels)",
  modelsAnimalsBody:
    "With FreeMinecraftModels installed, each breed carries its own model (the breed's {key} key, e.g. {example}). The vanilla species' models copy the original animal's shape and change colors and details (horns, patches, combs, wool). The plugin copies their {bbmodel} into {dir} at startup; if you edit one in Blockbench, it is not overwritten again. After the first install you have to restart (or {reload}) for FMM to load them.",
  modelsAdultsBody:
    "The model is only put on adults; the young look vanilla. The vanilla animal is still underneath, invisible, and clicks on the model reach it all the same: milking, shearing, feeding, healing and putting it in love mode with its food work as always.",
  emptyHandTitle: "Right click with an empty hand",
  emptyHandBody:
    "FreeMinecraftModels does not send the server a right click with no item on a model. To see the price or owner of someone else's animal, hit it (left click): it does no damage and shows the notice.",

  reskinTitle: "Visual reskin per breed (without ModelEngine/BetterModel)",
  reskinBody:
    "Minecraft has no {cmd} for living entities — there is no way to re-texture a cow or a sheep with a resource pack alone. Each {breed} can declare an optional {reskin} section that uses the same mechanism as RPGRoll-Mobs: the real vanilla entity is still the one that walks/produces/breeds (behavior intact), but an {display} entity is mounted on it as a real passenger carrying an item with {cmdKey}.",
  reskinFile: "breeds/holstein.yml (with reskin active)",
  reskinScaleBody:
    "The reskin's scale is automatically halved while the animal is in the {baby} stage, just as vanilla already does with the native reduced size — nothing separate needs declaring for that. Without {material} configured, the animal looks exactly as before: plain vanilla, with no change at all. The material/texture are defined by a real resource pack — the same pipeline as RPGRoll-Items: files in {path}, synced on their own to SackResourcePack (if installed) when the plugin starts.",
  reskinWarnTitle: "Verified by compilation only, not tested in game",
  reskinWarnBody:
    "As in RPGRoll-Mobs, this first version of the reskin was not tested visually against a real client (no Paper server available in the development environment).",

  breedingTitle: "Breeding and pregnancy",
  breedingTipTitle: "Mating reuses the usual vanilla mode",
  breedingTipBody:
    "Feed two adult animals of opposite sex and the same species their breeding food (wheat, seeds, carrots…) — Minecraft already knows how to put them in “love mode”. Ranching intercepts that result ({event}), cancels vanilla's instant baby, rolls the mother's fertility, and if it takes: it is born directly if the species does not gestate ({gestation}, e.g. chickens), or a real gestation starts with the litter size, sex and genetics of the offspring {frozen} from the moment of conception — the birth does not depend on the father still being alive when it ends.",
  frozenWord: "already frozen",
  gestationBody:
    "During gestation the female does not produce and her recalculated fertility drops to 0 until the litter is born. {restart} (the state is not persisted — a deliberate simplification to avoid serializing genotypes/phenotypes of pending offspring).",
  restartWarning: "A server restart mid-gestation cancels the pregnancy",

  welfareTitle: "Nutrition and welfare",
  welfareBody:
    "A {feed} is given with a right click and adds health/happiness/a temporary production bonus, multiplied by its {quality} (Common/Good/Premium/Organic/Legendary) — if it does not match the species' diet ({dietTags}), the effect is reduced to 40%. Welfare recalculates itself, gradually approaching an environmental “target”. The {nutrition} fills the animal's satiety (0–100, emptying over one Minecraft day): when full, it refuses the food and the item is not spent. The production bonus accumulated by eating is capped: at most it doubles the next production.",
  thFactor: "Factor",
  thHowMeasured: "How it is measured",
  fLight: "Light",
  fLightBody: "The block's light level — dark penalizes, lit gives a bonus.",
  fWater: "Nearby water",
  fWaterBody: "A simple scan for water blocks in a small radius.",
  fCompany: "Company / overcrowding",
  fCompanyBody:
    "It counts nearby animals of the same species — 1 to 5 gives a bonus, 0 penalizes (loneliness), 9+ penalizes (overcrowding).",
  fWeather: "Weather",
  fWeatherBody: "Via RPGRoll-Seasons (if installed) — extreme heat/cold penalizes.",
  fHealth: "Health",
  fHealthBody: "Low health drags happiness down too.",
  cleanTitle: "The original design's “cleanliness” has no real equivalent in Bukkit",
  cleanBody:
    "There is no notion of a “dirty pen” to measure — that factor was replaced by light + water + overcrowding, which really are measurable against the world. Happiness and health feed straight into fertility and production, so “a happy animal produces more” is still literally true.",

  healthTitle: "Diseases, vaccines and medicine",
  healthBody:
    "Diseases spread between nearby healthy animals of the same species (each disease has its own chance, higher the worse the target's health) and can also appear on their own if an animal's welfare is badly neglected. While it lasts, they penalize health/happiness/production equally at every periodic check. A {vaccine} does not give binary immunity: it reduces the infection risk by a {reduction} while it is active (temporary or permanent). A {medicine} (Antibiotic/Vitamin/Painkiller/Antiparasitic) can cure instantly with a chance, or shorten the remaining duration if not.",

  prodTitle: "Production and quality",
  prodBody:
    "Each species declares its products ({types}) and a base amount per unit ({base}). The final amount and quality of each milking/shearing/egg/meat depend on genetics (it looks for a gene whose {attrKey} contains the product's name), breed, life stage, happiness, health, weather and any active disease — exactly as the original design asks.",
  thProduct: "Product",
  thObtained: "Obtained by reusing…",
  pMilk: "A click with an empty bucket ({event}) — it hands over a milk bucket with quality.",
  pWool: "Shearing ({event}) — it respects the sheep's real color.",
  pEggs: "A hen's automatic egg laying ({event}).",
  pMeat: "They are added as extra drops when the animal dies ({event}), on top of the normal vanilla drops.",
  qualityBody:
    "Each production item comes labeled with its quality (Common → Good → Premium → Organic → Legendary) in the lore — ready for a future RPGRoll-Cooking to put that difference to real use.",

  modelsTitle: "3D models and items",
  modelsBody:
    "Feeds, medicines and vaccines accept the {key} key (the item_model component, 1.21.4+), and the plugin ships stock models for all its content with ids like {example}. The products have no YAML of their own: their model comes from {productModels} in {config}, by product type and, if you want, by quality. The Java pack ships inside the jar and registers itself in SackResourcePack; {bbDir} holds the .bbmodel files and {bedrockDir} the pack and the Geyser mapping.",

  ownersTitle: "Owners, market and pen",
  ownersBody:
    "Every animal has an owner: whoever spawns, buys or claims it, and the offspring inherit the mother's (or the father's). Only the owner can milk, shear, feed, heal, breed, leash or hurt it ({perm} bypasses that). Animals from before this version have no owner: with {cmd} they become yours.",
  thWhat: "What",
  thHow: "How",
  oMine: "My animals",
  oMineBody:
    "{cmd}: left click calls it, right click sends it to the pen, shift+left opens its sheet, shift+right lists or unlists it for sale. At the bottom: call everyone, everyone to the pen, set the pen here, and the market.",
  oCall: "Call",
  oCallBody:
    "{cmd} brings the animal to your feet even if it is in an unloaded chunk or another world. If its entity no longer exists (a command or a cleanup plugin removed it), another is created with the same data.",
  oPen: "Pen",
  oPenBody: "{fix} saves your position; {send} sends them there.",
  oSell: "Sell to another player",
  oSellBody: "{cmd} while looking at the animal (or with its id). Whoever touches it sees the price and a {buy} button; it also shows in the market.",
  oMarket: "Market",
  oMarketBody:
    "{cmd}: tabs for players' animals, the server shop (new founders that appear at your feet) and selling to the server. Every purchase asks for confirmation.",
  oSellServer: "Sell to the server",
  oSellServerBody:
    "{cmd}: it pays the species' base price times its quality (POOR ×0.5, COMMON ×1, GOOD ×1.5, EXCELLENT ×2.5, EXCEPTIONAL ×5) and the animal disappears.",
  idBody: "An animal's id is the first characters of its UUID, as shown on its sheet ({example}). The money goes through Vault.",

  eggTitle: "The fossilized egg (a secret)",
  eggBody:
    "Very occasionally a hen or a duck on the ranch lays a {egg} instead of an egg, and sometimes a sniffer digs one up. Used on a block, it incubates for a few seconds and a mini T-Rex of the player's is born (species {species}, breed {breed}, with its model). It is not announced in game: it is for the players to discover.",
  eggWord: "fossilized egg",

  yamlTitle: "YAML file examples",
  refTitle: "Full reference: every field in a single file",
  refBody:
    "{file} (included in the jar) uses every field of a species with a multiple litter (2 to 6 young) — the example cow always has 1, so it does not show that case.",
  builderSpecies: "Visual builder: species",
  builderSpeciesDesc:
    "A species' identity, life cycle and breeding. 'base-production' (a key=value map) is best edited by copying the example above.",
  builderGene: "Visual builder: gene",

  guiTitle: "GUI: Ranch Studio",
  guiBody:
    "{cmd} opens a hub linking to 7 content browsers (Species, Breeds, Genes, Feeds, Diseases, Vaccines, Medicines) plus the Animal Explorer, the Breeding Planner, and Veterinary. The Animal Explorer lists each tracked animal and opens a read-only sheet with its expressed genetics, lineage and state. The Breeding Planner lets you pick two animals, preview the offspring's likely distribution (PROBABILISTIC mode) in chat, and — as an administrative shortcut — force the mating without going through the feeding minigame. Veterinary lists only the sick animals, with a one-click cure.",

  apiTitle: "API for addons — RanchingAPI",
  apiTipTitle: "The programmatic care actions are not just an internal shortcut",
  apiTipBody:
    "They are the same logic that runs when a player right clicks with an item — exposed on purpose so a future RPGRoll-Workers (automated shepherd/vet/feeder) can call them directly, without Ranching needing to know that “Workers” exists.",

  cmdsTitle: "Commands",
  thCommand: "Command",
  thWhatDoes: "What it does",
  a1: "Opens the Ranch Studio.",
  a2: "Reloads every definition from disk.",
  a3: "Spawns a founder animal (with no parents) at your location. The default owner is whoever spawns it ({dash} = no owner); the sex is random if not stated.",
  a4: "Gives a feed, medicine or vaccine. With no player, to whoever asked; from the console the amount and player must be stated.",
  a5: "Gives a product (milk, wool, eggs, meat…) of the stated quality (COMMON by default), just like the one an animal gives.",
  a6: "Changes the owner of the animal you are looking at.",
  a7: "Gives the fossilized egg.",
  a8: "Opens the sheet of the animal you are looking at.",
  a9: "Your animals, the market, and claiming an unowned one.",
  a10: "List it for sale, unlist it, or sell it to the server.",
  a11: "Buy an animal that is for sale.",
  a12: "Bring your animals over or send them to the pen.",
  permBody: "{admin} requires {adminPerm} (default: op); {use} requires {usePerm} (default: true).",

  fId: "Id",
  fDisplayName: "Display name",
  fIcon: "Icon (Material)",
  fDescription: "Description",
  fEntityType: "Vanilla EntityType",
  fEntityTypeHelp: "COW, CHICKEN, SHEEP, PIG, HORSE…",
  fProductTypes: "Product types",
  fWeightMin: "Min. weight (kg)",
  fWeightMax: "Max. weight (kg)",
  fBabyDur: "Baby duration (ticks)",
  fJuvenileDur: "Juvenile duration (ticks)",
  fElder: "Elder threshold (ticks)",
  fGestation: "Gestation (ticks, 0 = born directly)",
  fLitterMin: "Min. litter",
  fLitterMax: "Max. litter",
  fFertility: "Base fertility (0-1)",
  fDietTags: "Diet tags",
  fAttrKey: "attribute-key",
  fDominanceLabel: "Dominance",
  fMin: "Minimum",
  fMax: "Maximum",
  fSpeciesList: "Species (empty = any)",
  phNewSpecies: "new_species",
  phCow: "&fCow",
  phNewGene: "new_gene",
  phMilkProduction: "Milk production",
};

const pt: RanchingCopy = {
  title: "Ranching (RPGRoll-Ranching)",
  intro:
    "Pecuária como simulação viva — cada animal tem o seu próprio DNA, com genes herdáveis, dominância real, mutações raras e uma linhagem congelada que acompanha a endogamia. Criar não é acumular: é selecionar reprodutores, melhorar gerações, e cuidar de saúde/nutrição/bem-estar para que a produção valha a pena.",

  heartTitle: "O coração do addon: Genetics & Bloodline Engine",
  heartBody:
    "Cada gene é uma porcentagem contínua (0-100), não um traço discreto «A/a» de livro didático — mais fiel a exemplos como «Produção de leite: 92 %» que ao quadro de Punnett clássico. Cada animal tem DOIS alelos por gene; a {dominance} do gene decide como se combinam no valor final expresso.",

  reqTitle: "Requisitos",
  reqBody:
    "Sem o {seasons}, o fator climático de bem-estar/fertilidade/produção simplesmente não se aplica (o resto funciona igual). RPGRoll-Farming, RPGRoll-Cooking e RPGRoll-Alchemy não existem, então o Ranching não se integra com eles — essas integrações do desenho original ficam sem uso como métodos genéricos em {api}. Sem o {srp}, o {reskinLink} simplesmente não aparece configurado (o animal fica vanilla normal, nada quebra). Sem Vault o mercado de animais avisa e não cobra; sem FreeMinecraftModels os animais usam o aspecto vanilla deles (ou o reskin).",
  reskinLinkText: "reskin visual por raça",

  geneticsTitle: "Genética: alelos e dominância",
  thDominance: "Dominância",
  thPhenotype: "Como o fenótipo é resolvido",
  dDominant: "O alelo mais alto domina — um só pai com uma cópia forte basta para expressá-la.",
  dRecessive: "O alelo mais baixo domina — são necessárias AMBAS as cópias fortes para se expressar por completo.",
  dMixed: "Codominância/mistura — o fenótipo é a média dos dois alelos.",
  modesBody: "Três modos de herança, escolhíveis no {config} ({key}):",
  thMode: "Modo",
  thHowConceives: "Como concebe uma cria",
  mSimple: "Média de ambos os pais +/- uma pequena variação aleatória — sem alelos separados.",
  mAdvanced: "Segregação mendeliana real: um alelo aleatório de cada pai, resolvido pela dominância do gene.",
  mProbabilistic:
    "Igual ao ADVANCED, mas o Breeding Planner pode simular 500 crias virtuais antes de acasalar e mostrar a distribuição (mín/méd/máx) pelo chat.",
  mutTitle: "As mutações vivem DENTRO do gene, não são um tipo de conteúdo próprio",
  mutBody:
    "Cada {gene} pode declarar uma lista de {mutations} — variantes raras ({multiply} o fenótipo, {override} para um valor fixo, ou puramente {cosmetic} como «Lã dourada») com a sua própria chance. Não têm o seu próprio navegador no Ranch Studio porque não fazem sentido sem o gene que decoram.",

  lineageTitle: "Linhagem e endogamia",
  lineageBody:
    "Ao nascer, uma cria congela uma cópia (id, nome, espécie) dos seus dois pais e dos ancestrais que eles já tinham — {never}, então a linhagem pode ser mostrada completa mesmo muito depois de um ancestral morrer ou ser vendido. O Breeding Planner verifica {setting} gerações para trás antes de acasalar e avisa (não bloqueia) se dois candidatos compartilham sangue recente.",
  neverResolves: "nunca volta a resolver um animal real mais tarde",

  speciesTitle: "Espécies e raças",
  speciesBody:
    "Uma {species} amarra a simulação a um {entityType} vanilla real (COW, CHICKEN, SHEEP…) e define quanto pesa, quanto dura cada etapa de vida, se gesta ou não, e o que produz. Uma {breed} sempre pertence a uma só espécie e aplica multiplicadores sobre essa base (produção/peso/fertilidade/resistência) mais um {temperament} puramente descritivo.",
  thStage: "Etapa de vida",
  thTrigger: "O que a ativa",
  stBaby: "Passados {ticks}.",
  stJuvenile: "Passados {ticks} a mais.",
  stAdult: "Passado {ticks} como adulto — produção e peso caem um pouco, a fertilidade baixa a 40 %.",
  stockBody: "O plugin traz 7 espécies com 3 raças cada uma, cada raça com o seu modelo 3D:",
  thSpecies: "Espécie",
  thBreeds: "Raças",
  bRabbit: "californian, rex, angora (dá pelo)",
  bDuck: "pekin, mallard, khaki_campbell (entidade CHICKEN)",

  modelsAnimalsTitle: "Modelos 3D de animais (FreeMinecraftModels)",
  modelsAnimalsBody:
    "Com o FreeMinecraftModels instalado, cada raça leva o seu próprio modelo (chave {key} da raça, p. ex. {example}). Os modelos das espécies vanilla copiam a forma do animal original e mudam cores e detalhes (chifres, manchas, cristas, lã). O plugin copia os seus {bbmodel} para {dir} ao iniciar; se você editar um no Blockbench, não é sobrescrito de novo. Depois da primeira instalação é preciso reiniciar (ou {reload}) para que o FMM os carregue.",
  modelsAdultsBody:
    "O modelo só é colocado nos adultos; as crias ficam vanilla. O animal vanilla segue embaixo, invisível, e os cliques sobre o modelo chegam a ele igual: ordenhar, tosquiar, alimentar, curar e colocar no cio com a comida dele funcionam como sempre.",
  emptyHandTitle: "Clique direito com a mão vazia",
  emptyHandBody:
    "O FreeMinecraftModels não envia ao servidor um clique direito sem item sobre um modelo. Para ver o preço ou o dono de um animal alheio, bata nele (clique esquerdo): não faz dano e mostra o aviso.",

  reskinTitle: "Reskin visual por raça (sem ModelEngine/BetterModel)",
  reskinBody:
    "O Minecraft não tem nenhum {cmd} para entidades vivas — não há forma de re-texturizar uma vaca ou ovelha só com um resource pack. Cada {breed} pode declarar uma seção {reskin} opcional que usa o mesmo mecanismo do RPGRoll-Mobs: a entidade vanilla real continua sendo a que anda/produz/se reproduz (comportamento intacto), mas é montada nela uma entidade {display} como passageiro real portando um item com {cmdKey}.",
  reskinFile: "breeds/holstein.yml (com reskin ativo)",
  reskinScaleBody:
    "A escala do reskin é reduzida automaticamente à metade enquanto o animal está na etapa {baby}, igual ao que o vanilla já faz com o tamanho reduzido nativo — não é preciso declarar nada à parte para isso. Sem {material} configurado, o animal fica exatamente igual a antes: vanilla normal, sem nenhuma mudança. O material/textura são definidos por um resource pack real — mesmo pipeline do RPGRoll-Items: arquivos em {path}, sincronizados sozinhos para o SackResourcePack (se estiver instalado) ao iniciar o plugin.",
  reskinWarnTitle: "Só verificado por compilação, não testado no jogo",
  reskinWarnBody:
    "Igual ao RPGRoll-Mobs, esta primeira versão do reskin não foi testada visualmente contra um cliente real (sem servidor Paper disponível no ambiente de desenvolvimento).",

  breedingTitle: "Reprodução e gravidez",
  breedingTipTitle: "O acasalamento reutiliza o modo vanilla de sempre",
  breedingTipBody:
    "Alimente dois animais adultos de sexo oposto e mesma espécie com a comida de cria deles (trigo, sementes, cenouras…) — o Minecraft já sabe colocá-los em «modo amor». O Ranching intercepta esse resultado ({event}), cancela o bebê instantâneo do vanilla, rola a fertilidade da mãe, e se pegar: nasce direto se a espécie não gesta ({gestation}, ex. galinhas), ou começa uma gestação real com o tamanho da ninhada, sexo e genética da cria {frozen} desde o momento da concepção — o nascimento não depende de o pai seguir vivo quando terminar.",
  frozenWord: "já congelados",
  gestationBody:
    "Durante a gestação a fêmea não produz e a fertilidade recalculada dela baixa a 0 até a ninhada nascer. {restart} (o estado não é persistido — uma simplificação deliberada para não serializar genótipos/fenótipos de crias pendentes).",
  restartWarning: "Um reinício do servidor no meio da gestação cancela a gravidez",

  welfareTitle: "Nutrição e bem-estar",
  welfareBody:
    "Um {feed} é dado com clique direito e soma saúde/felicidade/um bônus temporário de produção, multiplicado pela sua {quality} (Comum/Boa/Premium/Orgânica/Lendária) — se não coincidir com a dieta da espécie ({dietTags}), o efeito é reduzido a 40 %. O bem-estar se recalcula sozinho, aproximando-se gradualmente de um «objetivo» ambiental. O {nutrition} enche a saciedade do animal (0–100, esvazia num dia de Minecraft): cheio, recusa a comida e o item não é gasto. O bônus de produção acumulado comendo tem teto: no máximo dobra a próxima produção.",
  thFactor: "Fator",
  thHowMeasured: "Como é medido",
  fLight: "Luz",
  fLightBody: "Nível de luz do bloco — escuro penaliza, iluminado dá um bônus.",
  fWater: "Água por perto",
  fWaterBody: "Varredura simples de blocos de água num raio pequeno.",
  fCompany: "Companhia / superlotação",
  fCompanyBody:
    "Conta animais da mesma espécie por perto — 1 a 5 dá bônus, 0 penaliza (solidão), 9+ penaliza (superlotação).",
  fWeather: "Clima",
  fWeatherBody: "Via RPGRoll-Seasons (se estiver instalado) — calor/frio extremo penaliza.",
  fHealth: "Saúde",
  fHealthBody: "Saúde baixa arrasta a felicidade para baixo também.",
  cleanTitle: "A «limpeza» do desenho original não tem equivalente real no Bukkit",
  cleanBody:
    "Não existe nenhuma noção de «cercado sujo» para medir — esse fator foi substituído por luz + água + superlotação, que são de verdade mensuráveis contra o mundo. Felicidade e saúde alimentam direto a fertilidade e produção, então «um animal feliz produz mais» continua sendo literalmente verdade.",

  healthTitle: "Doenças, vacinas e medicina",
  healthBody:
    "As doenças se contagiam entre animais saudáveis próximos da mesma espécie (chance própria por doença, maior quanto pior esteja a saúde do alvo) e também podem aparecer sozinhas se o bem-estar de um animal está muito descuidado. Enquanto dura, penalizam saúde/felicidade/produção por igual em cada verificação periódica. Uma {vaccine} não dá imunidade binária: reduz o risco de contágio em {reduction} enquanto estiver ativa (temporária ou permanente). Uma {medicine} (Antibiótico/Vitamina/Analgésico/Antiparasitário) pode curar na hora com uma chance, ou encurtar a duração restante se não.",

  prodTitle: "Produção e qualidade",
  prodBody:
    "Cada espécie declara os seus produtos ({types}) e uma quantidade base por unidade ({base}). A quantidade e qualidade final de cada ordenha/tosquia/ovo/carne dependem de genética (busca um gene cujo {attrKey} contenha o nome do produto), raça, etapa de vida, felicidade, saúde, clima e doença ativa — tal como o desenho original pede.",
  thProduct: "Produto",
  thObtained: "É obtido reutilizando…",
  pMilk: "Clique com balde vazio ({event}) — entrega um balde de leite com qualidade.",
  pWool: "Tosquiar ({event}) — respeita a cor real da ovelha.",
  pEggs: "A postura automática de ovos de uma galinha ({event}).",
  pMeat: "São adicionados como drops extra ao morrer o animal ({event}), somados aos drops vanilla normais.",
  qualityBody:
    "Cada item de produção sai etiquetado com a sua qualidade (Comum → Boa → Premium → Orgânica → Lendária) no lore — pronto para que um futuro RPGRoll-Cooking dê um uso real a essa diferença.",

  modelsTitle: "Modelos 3D e itens",
  modelsBody:
    "As rações, medicinas e vacinas aceitam a chave {key} (componente item_model, 1.21.4+), e o plugin traz modelos de fábrica para todo o seu conteúdo com ids como {example}. Os produtos não têm YAML próprio: o modelo deles sai de {productModels} no {config}, por tipo de produto e, se você quiser, por qualidade. O pack de Java vai dentro do jar e se registra sozinho no SackResourcePack; em {bbDir} estão os .bbmodel e em {bedrockDir} o pack e o mapeamento do Geyser.",

  ownersTitle: "Donos, mercado e cercado",
  ownersBody:
    "Cada animal tem dono: quem o spawna, o compra ou o reivindica, e as crias herdam o da mãe (ou o do pai). Só o dono pode ordenhá-lo, tosquiá-lo, alimentá-lo, curá-lo, criá-lo, amarrá-lo ou machucá-lo ({perm} pula isso). Os animais de antes desta versão não têm dono: com {cmd} ficam seus.",
  thWhat: "O quê",
  thHow: "Como",
  oMine: "Meus animais",
  oMineBody:
    "{cmd}: clique esquerdo o chama, direito o manda ao cercado, shift+esquerdo abre a ficha dele, shift+direito o coloca ou tira da venda. Abaixo: chamar todos, todos ao cercado, fixar o cercado aqui e o mercado.",
  oCall: "Chamar",
  oCallBody:
    "{cmd} traz o animal aos seus pés mesmo que esteja num chunk descarregado ou outro mundo. Se a entidade dele já não existe (um comando ou um plugin de limpeza a apagou), é criada outra com os mesmos dados.",
  oPen: "Cercado",
  oPenBody: "{fix} guarda a sua posição; {send} os manda para lá.",
  oSell: "Vender a outro jogador",
  oSellBody: "{cmd} olhando para o animal (ou com o id dele). Quem o tocar vê o preço e um botão {buy}; também sai no mercado.",
  oMarket: "Mercado",
  oMarketBody:
    "{cmd}: abas de animais de jogadores, loja do servidor (fundadores novos que aparecem aos seus pés) e vender ao servidor. Toda compra pede confirmação.",
  oSellServer: "Vender ao servidor",
  oSellServerBody:
    "{cmd}: paga o preço base da espécie pela sua qualidade (POOR ×0,5, COMMON ×1, GOOD ×1,5, EXCELLENT ×2,5, EXCEPTIONAL ×5) e o animal desaparece.",
  idBody: "O id de um animal são os primeiros caracteres do UUID dele, como sai na ficha ({example}). O dinheiro vai pelo Vault.",

  eggTitle: "O ovo fossilizado (segredo)",
  eggBody:
    "Muito de vez em quando uma galinha ou um pato do rancho põe um {egg} em lugar de um ovo, e às vezes um sniffer o desenterra. Usado sobre um bloco, incuba uns segundos e nasce um mini T-Rex do jogador (espécie {species}, raça {breed}, com o modelo dele). Não é anunciado no jogo: é para que os jogadores o descubram.",
  eggWord: "ovo fossilizado",

  yamlTitle: "Exemplos de arquivo YAML",
  refTitle: "Referência completa: todos os campos num só arquivo",
  refBody:
    "{file} (incluído no jar) usa todos os campos de uma espécie com uma ninhada múltipla (2 a 6 crias) — a vaca de exemplo sempre tem 1, então não mostra esse caso.",
  builderSpecies: "Construtor visual: espécie",
  builderSpeciesDesc:
    "Identidade, ciclo de vida e reprodução de uma espécie. 'base-production' (mapa chave=valor) é editado melhor copiando o exemplo acima.",
  builderGene: "Construtor visual: gene",

  guiTitle: "GUI: Ranch Studio",
  guiBody:
    "{cmd} abre um hub que liga a 7 navegadores de conteúdo (Espécies, Raças, Genes, Alimentos, Doenças, Vacinas, Medicinas) mais o Explorador de Animais, o Planejador de Cria, e Veterinária. O Explorador de Animais lista cada animal rastreado e abre uma ficha somente de leitura com a genética expressa, linhagem e estado dele. O Planejador de Cria deixa escolher dois animais, pré-visualizar a distribuição provável da cria (modo PROBABILISTIC) pelo chat, e — como atalho administrativo — forçar o acasalamento sem passar pelo minijogo de alimentar. Veterinária lista só os animais doentes com cura de um clique.",

  apiTitle: "API para addons — RanchingAPI",
  apiTipTitle: "As ações de cuidado programáticas não são só um atalho interno",
  apiTipBody:
    "São a mesma lógica que roda quando um jogador dá clique direito com um item — expostas de propósito para que um futuro RPGRoll-Workers (pastor/veterinário/alimentador automatizados) as chame direto, sem que o Ranching precise saber que «Workers» existe.",

  cmdsTitle: "Comandos",
  thCommand: "Comando",
  thWhatDoes: "O que faz",
  a1: "Abre o Ranch Studio.",
  a2: "Recarrega todas as definições do disco.",
  a3: "Spawna um animal fundador (sem pais) na sua localização. O dono por padrão é quem o spawna ({dash} = sem dono); o sexo, aleatório se não for indicado.",
  a4: "Dá uma ração, medicina ou vacina. Sem jogador, a quem pede; do console é preciso indicar quantidade e jogador.",
  a5: "Dá um produto (leite, lã, ovos, carne…) da qualidade indicada (COMMON por padrão), igual ao que um animal dá.",
  a6: "Muda o dono do animal para o qual você olha.",
  a7: "Dá o ovo fossilizado.",
  a8: "Abre a ficha do animal para o qual você está olhando.",
  a9: "Os seus animais, o mercado e reivindicar um sem dono.",
  a10: "Colocá-lo em venda, tirá-lo ou vendê-lo ao servidor.",
  a11: "Comprar um animal em venda.",
  a12: "Trazer os seus animais ou mandá-los ao cercado.",
  permBody: "{admin} requer {adminPerm} (padrão: op); {use} requer {usePerm} (padrão: true).",

  fId: "Id",
  fDisplayName: "Nome visível",
  fIcon: "Ícone (Material)",
  fDescription: "Descrição",
  fEntityType: "EntityType vanilla",
  fEntityTypeHelp: "COW, CHICKEN, SHEEP, PIG, HORSE…",
  fProductTypes: "Tipos de produto",
  fWeightMin: "Peso mín. (kg)",
  fWeightMax: "Peso máx. (kg)",
  fBabyDur: "Duração cria (ticks)",
  fJuvenileDur: "Duração juvenil (ticks)",
  fElder: "Limite ancião (ticks)",
  fGestation: "Gestação (ticks, 0 = nasce direto)",
  fLitterMin: "Ninhada mín.",
  fLitterMax: "Ninhada máx.",
  fFertility: "Fertilidade base (0-1)",
  fDietTags: "Tags de dieta",
  fAttrKey: "attribute-key",
  fDominanceLabel: "Dominância",
  fMin: "Mínimo",
  fMax: "Máximo",
  fSpeciesList: "Espécies (vazio = qualquer)",
  phNewSpecies: "nova_especie",
  phCow: "&fVaca",
  phNewGene: "novo_gene",
  phMilkProduction: "Produção de leite",
};

export const RANCHING_COPY: Record<Locale, RanchingCopy> = { es, en, pt };
