import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-WorldForge. */

const es = {
  title: "WorldForge (RPGRoll-WorldForge)",
  intro:
    "Generación y administración de mundos: mundos vacíos, planos, vanilla o híbridos a partir de presets versionados; varios mundos a la vez como con Multiverse; terrenos al estilo Tectonic o Terralith (más altos, más llanos, continentes enormes, archipiélagos); menas y plantillas en los chunks nuevos; dimensiones nuevas por datapack; y regeneración de chunks con plan, confirmación, respaldo y recuperación. Todo desde comandos o desde un menú en el juego.",

  versionTitle: "Versión 1.0.0",
  versionBody:
    "Todo lo que describe esta página está probado en un servidor real, en Paper 26.1.2 y en Folia 26.1.2, con jugadores de prueba conectados. Lo que no está probado lo dice {limits}.",
  limitsLink: "Límites",

  reqTitle: "Requisitos",
  rServer: "Servidor",
  rServerVal: "Paper 26.1.2 (probado con el build 74) o Folia 26.1.2 (build 8; ver {folia})",
  foliaLink: "Folia",
  rJava: "Java",
  rDeps: "Dependencias",
  rDepsVal: "Ninguna: SQLite y YAML vienen con Paper.",
  noLibTitle: "No necesita RPGRoll-Lib",
  noLibBody:
    "WorldForge funciona solo: no depende de RPGRoll-Lib ni de RPGRoll. Puedes instalarlo en un servidor sin nada más de RPGRoll.",

  installTitle: "Instalación",
  i1: "Copia {jar} en {dir}.",
  i2: "Arranca el servidor una vez. Se crea {file}: pega ahí tu clave (empieza por {prefix}) en lugar de {placeholder} y vuelve a arrancar. Sin una clave válida, WorldForge se desactiva.",
  i3: "Con la licencia se crean también {files}, la base de datos {db}, los presets de serie en {presets} y las carpetas {dirs}; {lazy} aparecen la primera vez que hacen falta.",
  i4: "{cmd} dice si todo está en orden: plataforma, base de datos, presets, zonas protegidas, trabajos pendientes y dimensiones.",
  startupBody:
    "WorldForge carga en {startup}: así puede generar también el mundo principal y aplicar regeneraciones pendientes antes de que el servidor abra los mundos.",

  firstStepsTitle: "Primeros pasos",
  mainWorldBody: "Para que el {main} use un preset, ponlo en {bukkit} y reinicia:",
  mainWorldWord: "mundo principal",
  stopTitle: "Si no puede generarlo, para el servidor",
  stopBody:
    "Si al arrancar WorldForge no puede dar ese generador (no hay licencia válida, o el preset no existe o tiene errores), para el servidor antes de abrir los mundos y el registro dice por qué. Si siguiera, Minecraft generaría ese mundo con su terreno normal y después habría que regenerar esos chunks. Arréglalo, o quita la línea {generator}, y vuelve a arrancar. La licencia aguanta 7 días sin poder hablar con la tienda desde la última vez que se comprobó.",

  presetsTitle: "Presets",
  presetsBody:
    "Un preset dice cómo es un mundo. Los publicados viven en {presets} y los borradores en {drafts}. Un borrador no crea mundos: se publica con {publish}, que lo valida antes. Cada preset tiene una {version} (el hash de su texto) y un mundo recuerda con qué versión se creó.",
  versionWord: "versión",
  thPreset: "Preset de serie",
  thWhat: "Qué hace",
  presets: [
    ["vanilla", "Minecraft sin cambios."],
    ["amplified", "Tipo amplificado de vanilla."],
    ["empty", "Ni un bloque."],
    ["void-platform", "Vacío con una plataforma de piedra de 5×5 en la aparición."],
    ["flat", "Capas planas (bedrock, tierra, hierba)."],
    ["resource-rich", "Terreno vanilla con venas extra de carbón, hierro, oro y diamante."],
    ["custom", "Base para el tuyo: duplícalo y edítalo."],
    ["nether, end", "Un Nether o un End aparte, con su propia semilla."],
    ["montanas", "Cordilleras altas con el motor de terreno de WorldForge."],
  ],

  providersTitle: "Proveedores",
  providersBody:
    "Cada preset elige un proveedor. Un campo que el proveedor no controla es un {error} al validar: nunca se ignora en silencio.",
  errorWord: "error",
  thProvider: "Proveedor",
  thTerrain: "Terreno",
  thOres: "Menas",
  thTemplates: "Plantillas",
  thBiomes: "Biomas a elegir",
  thVanillaStructures: "Estructuras vanilla",
  providers: [
    ["vanilla", "Minecraft (normal, amplificado, biomas grandes)", "—", "—", "—", "sí/no"],
    ["empty", "nada", "—", "sí", "sí", "—"],
    ["flat", "capas del preset", "sí", "sí", "sí", "—"],
    ["hybrid", "Minecraft", "sí", "sí", "sí", "sí/no"],
    ["terrain", "el motor de WorldForge con un terreno de terrains/", "sí", "sí", "por altura y clima", "sí/no"],
    ["plugin", "el generador de otro plugin (Terra, Iris…)", "—", "—", "—", "lo que haga ese plugin"],
  ],

  formatTitle: "Formato",
  newChunksWarn:
    "Menas, plantillas y biomas {only}. Lo ya generado no cambia; para eso está la {regen}.",
  onlyNewChunks: "solo afectan a chunks que se generan a partir de ahora",
  regenLink: "regeneración",

  editTitle: "Editar, exportar, importar",
  e1: "{duplicate} crea un borrador; {seed} le fija la semilla; edítalo en {drafts} si quieres más y publícalo con {publish}.",
  e2: "{export} escribe el preset en {dir} con un manifiesto SHA-256.",
  e3: "Un {yml} en {dir} entra con {import}, {always} (tamaño máximo en {config}, por defecto 256 KB).",
  alwaysDraft: "siempre como borrador",

  multiTitle: "Varios mundos (como Multiverse)",
  m1: "Cada mundo creado vuelve solo al reiniciar, con su preset.",
  m2: "{import} no toca los bloques: solo pasa a administrar la carpeta ({path}, el formato de 26.1). Una carpeta del formato de antes ({levelDat} suelto) se rechaza: hay que abrirla antes con Paper 26.1 para que la convierta.",
  m3: "{gravity} cambia la gravedad de los {players} (salto y caída; la caída segura se ajusta a la par) al entrar, al cambiar de mundo y al reaparecer. A los mobs no les afecta.",
  playersWord: "jugadores",
  m4: "{provider} usa el generador de otro plugin igual que {bukkit} o el {dashG} de Multiverse; si ese plugin no está, el preset no se publica. WorldForge no mete sus menas ni plantillas dentro de un generador ajeno.",

  templatesTitle: "Plantillas (estructuras y mazmorras)",
  t1: "Construye en un mundo. Los cofres pueden llevar tabla de botín con el comando de vanilla: {cmd}.",
  t2: "{cmd} guarda esa caja (esquinas incluidas, sin entidades) en {path}. Como mucho {max}, y la zona tiene que estar cargada.",
  t3: "Úsala en un preset ({templates}), publícalo y crea un mundo con él.",
  tl1: "Un cofre con tabla de botín la conserva en cada copia colocada; el botín se sortea al abrirlo.",
  tl2: "Una plantilla guardada {noOverwrite}: guarda otra con otro nombre. Así un preset publicado sigue generando lo mismo.",
  noOverwrite: "no se sobrescribe",
  tl3: "Sirve cualquier {nbt} de Minecraft (el formato de los bloques de estructura) de hasta 2 MB y 32×64×32: déjalo en {dir}.",
  tl4: "{surface} la pone sobre el primer bloque sólido desde arriba (atraviesa hojas, troncos y plantas; nunca sobre agua o lava). {underground} la pone con la base a una altura al azar entre {minY} y {maxY}; con los dos iguales, a una altura fija (sirve para islas en el vacío).",
  tl5: "{cmd} dice cuántas ha colocado cada regla desde que se cargó el mundo y dónde fueron las últimas.",
  tl6: "Crear o cargar un mundo vuelve a comprobar sus plantillas: si falta el archivo, no sigue.",

  dimTitle: "Dimensiones",
  dimBody:
    "Escribe la dimensión en el datapack {datapack} del mundo principal. {onlyOnBoot}: tras reiniciar aparece como el mundo {world} (entra con {cmd}).",
  onlyOnBoot: "Minecraft solo lee dimensiones nuevas al arrancar",
  thType: "Tipo",
  thHow: "Cómo es",
  thGenerator: "Generador",
  thGenerates: "Qué genera",
  dOverworld: "cielo, día y noche, −64 a 319",
  dOverworldGen: "vacío (bioma the_void)",
  dCaves: "con techo, sin cielo",
  dCavesGen: "capas planas",
  dTall: "como el normal pero hasta 383",
  dTallGen: "terreno normal",
  dTowering: "como el normal pero hasta 575",
  dToweringGen: "terreno amplificado",
  dNether: "como el Nether, 0 a 255",
  dNetherGen: "solo con su tipo",
  dEnd: "como el End",
  dEndGen: "un {terrain} (tipos del normal)",
  terrainLink: "terreno",
  dimRemoveBody:
    "{cmd} quita la definición: deja de cargarse al reiniciar y {kept}. Una dimensión de datapack usa el generador de Minecraft, así que las menas y plantillas de WorldForge no se aplican ahí.",
  folderKept: "la carpeta se conserva",

  terrainsTitle: "Terrenos",
  terrainsBody:
    "Un terreno cambia la {shape} del mundo, como Tectonic, Terralith o Stratos: más alto o más llano, continentes más anchos, picos más afilados, biomas más grandes. Viven en {dir}; los de serie se copian ahí la primera vez y sirven de ejemplo ({cmd}).",
  shapeWord: "forma",
  thStock: "De serie",
  terrains: [
    ["suave", "Colinas bajas, cómodas para construir.", "overworld"],
    ["continentes", "Continentes tres veces más anchos, biomas grandes.", "overworld"],
    ["archipielago", "Islas y estrechos.", "overworld"],
    ["montanas", "Cordilleras casi el doble de altas.", "towering"],
    ["extremo", "Relieve 2,4 veces más alto, picos muy dentados y continentes anchos.", "towering"],
  ],

  useTerrainTitle: "Tres maneras de usarlo",
  thWhere: "Dónde",
  thHowUse: "Cómo",
  uNewDim: "Una dimensión nueva",
  uNewDimHow: "{cmd} y reiniciar",
  uNewDimGen:
    "El generador de Minecraft con los números cambiados: sus cuevas, acuíferos, biomas y estructuras.",
  uMain: "El mundo normal",
  uMainHow: "{cmd} y reiniciar ({vanilla} lo deshace)",
  uMainGen: "Lo mismo, en el mundo principal, como hace Terralith.",
  uHot: "Un mundo creado en caliente",
  uHotHow: "Un preset con {provider} y {terrain}",
  uHotGen: "El motor propio de WorldForge (abajo).",
  datapackBody:
    "{byDatapack} (dimensión y mundo normal): WorldForge copia el {noiseRouter} de vanilla del propio jar del servidor y cambia sus números. Con todo a 1 sale igual que el generador normal (dos generaciones del mismo sitio pueden diferir en algún bloque suelto de la frontera entre chunks). Para alturas por encima de y≈240 hace falta un tipo más alto: {cmd} avisa si las cimas se van a cortar. Un terreno ya escrito no se pisa: si lo editas, guárdalo con otro id.",
  byDatapack: "Por datapack",
  noiseRouter: "noise router",
  heightScaleBody:
    "{heightScale} estira la forma grande del terreno (continentes, valles, montañas y su dentado). El detalle 3D de vanilla, que talla salientes y agujas, conserva su tamaño: las agujas más altas no salen al doble. Con {hs2}, medido: el doble de piedra sobre y=64 y el suelo ×1,94 columna a columna (mediana). Con {hs3} y {offset} en un tipo {towering}, el suelo llega a y=395, algo que el mundo normal no permite.",
  mainWarnTitle: "terrain main cambia el mundo normal",
  mainWarnBody:
    "Cambia {overworld}, así que también lo usan los mundos con proveedor {vanilla} y las dimensiones con generador {overworldGen}. Solo afecta a chunks nuevos: donde lo nuevo toque lo ya generado habrá un corte. Otro datapack que también lo cambie (Terralith) compite con él; el comando lo avisa. Pruébalo antes en una copia del mundo.",
  engineBody:
    "{ownEngine} ({provider}) es para mundos creados sin reiniciar, donde Minecraft no deja usar un datapack: los mismos ajustes, con su propia forma (no idéntica a vanilla). Encima Minecraft pone su superficie, cuevas, decoración y estructuras (bedrock, pizarra profunda, carbón, pueblos); los biomas los elige el motor por altura y clima (picos arriba, océanos en el mar). Las cimas se comprimen al acercarse al techo del mundo (y=319) en vez de cortarse.",
  ownEngine: "El motor propio",
  terralithBody:
    "{withTerralith}: las dimensiones y el motor de WorldForge no heredan su terreno (salen del jar del servidor); el generador {overworldGen} sí. En Paper sin el mod lithostitched, los biomas de Terralith solo aparecen en el mundo principal.",
  withTerralith: "Con Terralith instalado",

  regenTitle: "Regeneración",
  regenDangerTitle: "Regenerar borra lo que hay en esos chunks",
  regenDangerBody: "Por eso siempre sigue los mismos cuatro pasos, y WorldForge nunca borra un respaldo.",
  r1: "{plan}: {cmd} (o {area}, o {all}). Dice cuántos chunks, cuántos se saltan por estar protegidos o sin generar, cuánto ocupa el respaldo y cuándo se aplicará. No toca nada.",
  planWord: "Plan",
  r2: "{confirm} con el código del plan: {cmd}. Caduca a los 15 minutos ({setting}).",
  confirmWord: "Confirmación",
  r3: "{backup} de los archivos de región afectados en {dir}, comprobado con SHA-256 justo antes de editar.",
  backupWord: "Respaldo",
  r4: "{exec}: un mundo secundario se descarga, se edita y se vuelve a cargar al momento (los jugadores que haya dentro se mueven al mundo principal). El mundo principal se aplica en el {nextBoot}, antes de abrir los mundos.",
  execWord: "Ejecución",
  nextBoot: "próximo arranque",
  undoBody:
    "Deshacer: {cmd} planifica una restauración de ese respaldo, que sigue el mismo camino (plan, código y respaldo de lo actual).",

  protTitle: "Zonas protegidas",
  protBody:
    "{file} (o {cmd}): la regeneración nunca toca un chunk protegido, ni al planificar ni al ejecutar. Alrededor de la aparición de cada mundo hay una zona protegida de {setting} chunks (por defecto 2; 0 la quita). Si el archivo no se puede leer, la regeneración queda {blocked} hasta arreglarlo.",
  blockedWord: "bloqueada",

  recoveryTitle: "Si el servidor se apaga a mitad",
  recoveryBody:
    "Un trabajo que estaba ejecutándose queda en {state} y bloquea ese mundo: no se reanuda solo. {info} dice qué pasó; puedes restaurar su respaldo ({restore}) o aceptarlo tal como quedó ({accept}).",

  menuTitle: "Menú",
  menuBody:
    "{cmd} abre mundos (cargar, descargar, inspeccionar, cambiar de preset, regenerar o proteger alrededor de ti), presets (validar, duplicar, semilla, publicar, exportar, crear mundo), regeneración (confirmar, cancelar, restaurar, aceptar), zonas protegidas y diagnóstico. Cada botón pide su permiso al pulsarlo, lo destructivo pide confirmación y, si otro admin cambia lo que estás viendo, el menú no guarda encima. Plantillas, dimensiones, terrenos, {worldImport} y {worldTp} van solo por comandos.",

  foliaTitle: "Folia",
  foliaBody:
    "Probado en {build} con un jugador conectado. Folia no deja crear, cargar ni descargar mundos con el servidor en marcha, así que todo lo que cambia mundos pasa por el arranque:",
  foliaBuild: "Folia 26.1.2 build 8",
  thWhatF: "Qué",
  thInFolia: "En Folia",
  folia: [
    ["Presets, exportar e importar, zonas protegidas, plantillas, diagnóstico, menú", "Igual que en Paper."],
    [
      "Mundo principal con un preset (bukkit.yml): vacío, plano, plantillas, menas, el motor de terreno",
      "Sí; los chunks se generan en paralelo por regiones.",
    ],
    ["Dimensiones por datapack, también con terreno y tipo towering", "Sí, al reiniciar."],
    ["Regenerar", "Siempre al reiniciar, antes de abrir los mundos."],
    ["/wf world tp a otro mundo cargado", "Sí."],
    ["/wf world create, load, unload, import", "No: el comando explica por qué y propone una dimensión por datapack."],
    ["Mundos administrados creados antes en Paper", "No se cargan; el registro lo avisa."],
    ["Nether y End aparte, provider: plugin, gravedad por mundo", "No: dependen de crear mundos en caliente."],
  ],
  foliaSaveBody:
    "Folia no tiene {saveAll}: lo recién generado llega a disco en el autoguardado o al parar, y un plan de regeneración lo avisa si toca chunks que todavía no están guardados.",

  cmdTitle: "Comandos",
  cmdIntro: "Todos van con {wf}. El permiso de cada uno lleva delante {prefix}",
  thCommand: "Comando",
  thPermission: "Permiso",
  commands: [
    ["/wf help · status · gui", "worlds.view"],
    ["/wf diagnostics", "diagnostics"],
    ["/wf reload-config", "reload"],
    ["/wf world list · inspect <mundo>", "worlds.view"],
    ["/wf world create <nombre> <preset>", "worlds.create"],
    ["/wf world load|unload <mundo>", "worlds.manage"],
    ["/wf world import <nombre> <preset>", "worlds.create"],
    ["/wf world tp <mundo> [jugador]", "worlds.teleport (otro jugador: worlds.teleport.others)"],
    ["/wf preset list · info · validate <id>", "presets.view"],
    ["/wf preset create|duplicate|seed|publish", "presets.edit"],
    ["/wf preset export <id> · import <archivo.yml>", "presets.export · presets.import"],
    ["/wf generation validate|preview · apply <mundo> <preset>", "generation.validate · generation.apply"],
    ["/wf regen plan|restore · confirm|accept · cancel · list|info", "regeneration.plan · execute · cancel · view"],
    ["/wf dimension list · create|remove", "dimensions.view · dimensions.create"],
    ["/wf terrain list · main <terreno|vanilla>", "dimensions.view · terrain.main"],
    ["/wf structure list|info · save", "templates.view · templates.save"],
    ["/wf protection list · add|remove", "protection.view · protection.manage"],
  ],

  permTitle: "Permisos",
  thAllows: "Qué permite",
  pAdmin: "Todo.",
  pOperator:
    "Preparar sin ejecutar nada destructivo: editar borradores, exportar, validar, planificar regeneraciones, guardar plantillas.",
  pViewer: "Solo lectura: mundos, presets, dimensiones, zonas, trabajos, plantillas, diagnóstico.",
  permLooseBody: "Sueltos: {list}. La consola también pasa por los permisos.",
  adminOnly: "solo admin",

  limitsTitle: "Límites",
  l1: "Menas, plantillas y biomas de un preset solo se aplican a {newChunks}.",
  newChunksWord: "chunks nuevos",
  l2: "Crear, cargar y descargar mundos en caliente es solo de Paper.",
  l3: "Dimensiones nuevas solo al reiniciar (así funciona Minecraft) y con el generador de Minecraft.",
  l4: "Las plantillas se colocan sin entidades (soportes de armadura, marcos…); los bloques con datos (cofres, generadores de monstruos, carteles) sí van. Como mucho 32×64×32. Cada chunk decide la suya sin mirar a los vecinos, así que dos plantillas grandes pueden solaparse: súbeles {rarity}.",
  l5: "No hay estructuras «registradas» de Minecraft (jigsaw, {locate}): las plantillas son de WorldForge.",
  l6: "La gravedad por mundo es solo de los jugadores. Sin física ni bloques nuevos: WorldForge solo usa lo que Minecraft ya trae.",
  l7: "Terrenos por datapack: solo en dimensiones nuevas y en el mundo principal, al reiniciar. El mundo principal no puede cambiar de altura (−64 a 319).",
  l8: "Biomas nuevos no: los terrenos y el motor reparten los que ya existen (también los de datapacks).",
  untestedTitle: "Sin probar todavía",
  untestedBody:
    "{provider} se probó con un generador de prueba, no con Terra ni Iris. Tampoco están probados en Folia {terrainMain} ni el proveedor {hybrid}, ni el servidor con muchos jugadores a la vez.",

  troublesTitle: "Problemas frecuentes",
  thSymptom: "Síntoma",
  thLook: "Qué mirar",
  troubles: [
    [
      "El servidor se para al arrancar y el registro dice «Se para el servidor»",
      "Las líneas de antes dicen si falta la licencia o qué preset de bukkit.yml falla.",
    ],
    ["«tiene errores» al publicar", "/wf preset validate <id> lista cada campo con su problema."],
    [
      "Un mundo administrado no carga al arrancar",
      "El registro dice por qué (preset con errores, carpeta que falta, plantilla que falta).",
    ],
    ["«Regeneración BLOQUEADA» en el diagnóstico", "protections.yml mal escrito: arréglalo y /wf reload-config."],
    ["Un trabajo en NEEDS_RECOVERY", "/wf regen info, luego restore o accept."],
    ["«✘ Plantilla …: esa regla no se aplica»", "Falta o está rota structures/<nombre>.nbt."],
    [
      "El servidor no arranca tras terrain main",
      "Borra world/datapacks/worldforge/data/minecraft/worldgen/noise_settings/overworld.json y arranca.",
    ],
    ["«ya está escrito en el datapack con otros valores»", "Editaste un terreno que ya usa una dimensión: guárdalo con otro id."],
  ],
};

export type WorldForgeCopy = typeof es;

const en: WorldForgeCopy = {
  title: "WorldForge (RPGRoll-WorldForge)",
  intro:
    "World generation and management: void, flat, vanilla or hybrid worlds from versioned presets; several worlds at once like with Multiverse; Tectonic- or Terralith-style terrains (taller, flatter, huge continents, archipelagos); ores and templates in new chunks; new dimensions via datapack; and chunk regeneration with a plan, confirmation, backup and recovery. All from commands or from an in-game menu.",

  versionTitle: "Version 1.0.0",
  versionBody:
    "Everything this page describes has been tested on a real server, on Paper 26.1.2 and on Folia 26.1.2, with test players connected. What is untested is listed under {limits}.",
  limitsLink: "Limits",

  reqTitle: "Requirements",
  rServer: "Server",
  rServerVal: "Paper 26.1.2 (tested with build 74) or Folia 26.1.2 (build 8; see {folia})",
  foliaLink: "Folia",
  rJava: "Java",
  rDeps: "Dependencies",
  rDepsVal: "None: SQLite and YAML ship with Paper.",
  noLibTitle: "It does not need RPGRoll-Lib",
  noLibBody:
    "WorldForge works on its own: it does not depend on RPGRoll-Lib or RPGRoll. You can install it on a server with nothing else from RPGRoll.",

  installTitle: "Installation",
  i1: "Copy {jar} into {dir}.",
  i2: "Start the server once. {file} is created: paste your key there (it starts with {prefix}) in place of {placeholder} and start again. Without a valid key, WorldForge disables itself.",
  i3: "With the license, {files}, the {db} database, the stock presets in {presets} and the {dirs} folders are also created; {lazy} appear the first time they are needed.",
  i4: "{cmd} tells you whether everything is in order: platform, database, presets, protected areas, pending jobs and dimensions.",
  startupBody:
    "WorldForge loads at {startup}: that way it can also generate the main world and apply pending regenerations before the server opens the worlds.",

  firstStepsTitle: "First steps",
  mainWorldBody: "To make the {main} use a preset, set it in {bukkit} and restart:",
  mainWorldWord: "main world",
  stopTitle: "If it cannot generate it, it stops the server",
  stopBody:
    "If on startup WorldForge cannot provide that generator (no valid license, or the preset does not exist or has errors), it stops the server before the worlds open and the log says why. If it carried on, Minecraft would generate that world with its normal terrain and those chunks would have to be regenerated afterwards. Fix it, or remove the {generator} line, and start again. The license tolerates 7 days without being able to reach the store since the last check.",

  presetsTitle: "Presets",
  presetsBody:
    "A preset says what a world is like. Published ones live in {presets} and drafts in {drafts}. A draft does not create worlds: it is published with {publish}, which validates it first. Each preset has a {version} (the hash of its text) and a world remembers which version it was created with.",
  versionWord: "version",
  thPreset: "Stock preset",
  thWhat: "What it does",
  presets: [
    ["vanilla", "Minecraft unchanged."],
    ["amplified", "Vanilla's amplified type."],
    ["empty", "Not a single block."],
    ["void-platform", "Void with a 5×5 stone platform at spawn."],
    ["flat", "Flat layers (bedrock, dirt, grass)."],
    ["resource-rich", "Vanilla terrain with extra coal, iron, gold and diamond veins."],
    ["custom", "A base for your own: duplicate it and edit it."],
    ["nether, end", "A separate Nether or End, with its own seed."],
    ["montanas", "High mountain ranges using WorldForge's terrain engine."],
  ],

  providersTitle: "Providers",
  providersBody:
    "Each preset picks a provider. A field the provider does not control is an {error} at validation time: it is never silently ignored.",
  errorWord: "error",
  thProvider: "Provider",
  thTerrain: "Terrain",
  thOres: "Ores",
  thTemplates: "Templates",
  thBiomes: "Biomes to choose",
  thVanillaStructures: "Vanilla structures",
  providers: [
    ["vanilla", "Minecraft (normal, amplified, large biomes)", "—", "—", "—", "yes/no"],
    ["empty", "nothing", "—", "yes", "yes", "—"],
    ["flat", "the preset's layers", "yes", "yes", "yes", "—"],
    ["hybrid", "Minecraft", "yes", "yes", "yes", "yes/no"],
    ["terrain", "WorldForge's engine with a terrain from terrains/", "yes", "yes", "by height and climate", "yes/no"],
    ["plugin", "another plugin's generator (Terra, Iris…)", "—", "—", "—", "whatever that plugin does"],
  ],

  formatTitle: "Format",
  newChunksWarn: "Ores, templates and biomes {only}. What is already generated does not change; that is what {regen} is for.",
  onlyNewChunks: "only affect chunks generated from now on",
  regenLink: "regeneration",

  editTitle: "Editing, exporting, importing",
  e1: "{duplicate} creates a draft; {seed} sets its seed; edit it in {drafts} if you want more and publish it with {publish}.",
  e2: "{export} writes the preset into {dir} with a SHA-256 manifest.",
  e3: "A {yml} in {dir} comes in with {import}, {always} (max size in {config}, 256 KB by default).",
  alwaysDraft: "always as a draft",

  multiTitle: "Several worlds (like Multiverse)",
  m1: "Every created world comes back on its own after a restart, with its preset.",
  m2: "{import} does not touch the blocks: it only starts managing the folder ({path}, the 26.1 format). A folder in the old format (a loose {levelDat}) is rejected: you have to open it with Paper 26.1 first so it converts it.",
  m3: "{gravity} changes the gravity of {players} (jumping and falling; safe fall adjusts along with it) on join, on changing world and on respawn. Mobs are unaffected.",
  playersWord: "players",
  m4: "{provider} uses another plugin's generator just like {bukkit} or Multiverse's {dashG}; if that plugin is missing, the preset is not published. WorldForge does not inject its ores or templates into someone else's generator.",

  templatesTitle: "Templates (structures and dungeons)",
  t1: "Build in a world. Chests can carry a loot table with the vanilla command: {cmd}.",
  t2: "{cmd} saves that box (corners included, without entities) into {path}. At most {max}, and the area has to be loaded.",
  t3: "Use it in a preset ({templates}), publish it and create a world with it.",
  tl1: "A chest with a loot table keeps it in every placed copy; the loot is rolled when it is opened.",
  tl2: "A saved template {noOverwrite}: save another one under another name. That way a published preset keeps generating the same thing.",
  noOverwrite: "is not overwritten",
  tl3: "Any Minecraft {nbt} works (the structure-block format) up to 2 MB and 32×64×32: drop it in {dir}.",
  tl4: "{surface} places it on the first solid block from the top (it goes through leaves, logs and plants; never on water or lava). {underground} places it with its base at a random height between {minY} and {maxY}; with both equal, at a fixed height (useful for islands in the void).",
  tl5: "{cmd} tells you how many each rule has placed since the world was loaded and where the last ones went.",
  tl6: "Creating or loading a world re-checks its templates: if the file is missing, it does not continue.",

  dimTitle: "Dimensions",
  dimBody:
    "It writes the dimension into the main world's {datapack} datapack. {onlyOnBoot}: after a restart it appears as the world {world} (enter it with {cmd}).",
  onlyOnBoot: "Minecraft only reads new dimensions at startup",
  thType: "Type",
  thHow: "What it is like",
  thGenerator: "Generator",
  thGenerates: "What it generates",
  dOverworld: "sky, day and night, −64 to 319",
  dOverworldGen: "void (the_void biome)",
  dCaves: "with a ceiling, no sky",
  dCavesGen: "flat layers",
  dTall: "like the normal one but up to 383",
  dTallGen: "normal terrain",
  dTowering: "like the normal one but up to 575",
  dToweringGen: "amplified terrain",
  dNether: "like the Nether, 0 to 255",
  dNetherGen: "only with its own type",
  dEnd: "like the End",
  dEndGen: "a {terrain} (normal types)",
  terrainLink: "terrain",
  dimRemoveBody:
    "{cmd} removes the definition: it stops loading on restart and {kept}. A datapack dimension uses Minecraft's generator, so WorldForge's ores and templates do not apply there.",
  folderKept: "the folder is kept",

  terrainsTitle: "Terrains",
  terrainsBody:
    "A terrain changes the world's {shape}, like Tectonic, Terralith or Stratos: taller or flatter, wider continents, sharper peaks, larger biomes. They live in {dir}; the stock ones are copied there the first time and serve as examples ({cmd}).",
  shapeWord: "shape",
  thStock: "Stock",
  terrains: [
    ["suave", "Low hills, comfortable to build on.", "overworld"],
    ["continentes", "Continents three times wider, large biomes.", "overworld"],
    ["archipielago", "Islands and straits.", "overworld"],
    ["montanas", "Mountain ranges almost twice as tall.", "towering"],
    ["extremo", "Relief 2.4 times taller, very jagged peaks and wide continents.", "towering"],
  ],

  useTerrainTitle: "Three ways to use it",
  thWhere: "Where",
  thHowUse: "How",
  uNewDim: "A new dimension",
  uNewDimHow: "{cmd} and restart",
  uNewDimGen: "Minecraft's generator with the numbers changed: its caves, aquifers, biomes and structures.",
  uMain: "The normal world",
  uMainHow: "{cmd} and restart ({vanilla} undoes it)",
  uMainGen: "The same, in the main world, the way Terralith does.",
  uHot: "A world created at runtime",
  uHotHow: "A preset with {provider} and {terrain}",
  uHotGen: "WorldForge's own engine (below).",
  datapackBody:
    "{byDatapack} (dimension and normal world): WorldForge copies vanilla's {noiseRouter} from the server's own jar and changes its numbers. With everything at 1 it comes out the same as the normal generator (two generations of the same place can differ by the odd loose block at a chunk border). For heights above y≈240 you need a taller type: {cmd} warns if the peaks are going to be cut off. An already-written terrain is not overwritten: if you edit it, save it under another id.",
  byDatapack: "Via datapack",
  noiseRouter: "noise router",
  heightScaleBody:
    "{heightScale} stretches the terrain's large shape (continents, valleys, mountains and their jaggedness). Vanilla's 3D detail, which carves overhangs and spires, keeps its size: the tallest spires do not come out twice as high. With {hs2}, measured: twice the stone above y=64 and the ground ×1.94 column by column (median). With {hs3} and {offset} on a {towering} type, the ground reaches y=395, something the normal world does not allow.",
  mainWarnTitle: "terrain main changes the normal world",
  mainWarnBody:
    "It changes {overworld}, so worlds with the {vanilla} provider and dimensions with the {overworldGen} generator use it too. It only affects new chunks: where the new meets the already-generated there will be a seam. Another datapack that also changes it (Terralith) competes with it; the command warns you. Test it on a copy of the world first.",
  engineBody:
    "{ownEngine} ({provider}) is for worlds created without restarting, where Minecraft does not allow a datapack: the same settings, with its own shape (not identical to vanilla). On top of it Minecraft puts its surface, caves, decoration and structures (bedrock, deepslate, coal, villages); the biomes are chosen by the engine by height and climate (peaks up high, oceans at sea). Peaks are compressed as they approach the world ceiling (y=319) instead of being cut off.",
  ownEngine: "The own engine",
  terralithBody:
    "{withTerralith}: WorldForge's dimensions and engine do not inherit its terrain (they come from the server's jar); the {overworldGen} generator does. On Paper without the lithostitched mod, Terralith's biomes only appear in the main world.",
  withTerralith: "With Terralith installed",

  regenTitle: "Regeneration",
  regenDangerTitle: "Regenerating deletes whatever is in those chunks",
  regenDangerBody: "That is why it always follows the same four steps, and WorldForge never deletes a backup.",
  r1: "{plan}: {cmd} (or {area}, or {all}). It says how many chunks, how many are skipped for being protected or ungenerated, how much the backup takes up and when it will be applied. It touches nothing.",
  planWord: "Plan",
  r2: "{confirm} with the plan's code: {cmd}. It expires after 15 minutes ({setting}).",
  confirmWord: "Confirmation",
  r3: "{backup} of the affected region files into {dir}, verified with SHA-256 right before editing.",
  backupWord: "Backup",
  r4: "{exec}: a secondary world is unloaded, edited and reloaded right away (any players inside are moved to the main world). The main world is applied on the {nextBoot}, before the worlds open.",
  execWord: "Execution",
  nextBoot: "next startup",
  undoBody:
    "To undo: {cmd} plans a restore of that backup, which follows the same path (plan, code and a backup of the current state).",

  protTitle: "Protected areas",
  protBody:
    "{file} (or {cmd}): regeneration never touches a protected chunk, neither when planning nor when executing. Around each world's spawn there is a protected area of {setting} chunks (2 by default; 0 removes it). If the file cannot be read, regeneration stays {blocked} until it is fixed.",
  blockedWord: "blocked",

  recoveryTitle: "If the server shuts down halfway",
  recoveryBody:
    "A job that was executing is left in {state} and locks that world: it does not resume on its own. {info} says what happened; you can restore its backup ({restore}) or accept it as it ended up ({accept}).",

  menuTitle: "Menu",
  menuBody:
    "{cmd} opens worlds (load, unload, inspect, change preset, regenerate or protect around you), presets (validate, duplicate, seed, publish, export, create world), regeneration (confirm, cancel, restore, accept), protected areas and diagnostics. Each button asks for its permission when pressed, destructive things ask for confirmation and, if another admin changes what you are looking at, the menu does not save over it. Templates, dimensions, terrains, {worldImport} and {worldTp} are command-only.",

  foliaTitle: "Folia",
  foliaBody:
    "Tested on {build} with one player connected. Folia does not allow creating, loading or unloading worlds with the server running, so everything that changes worlds goes through startup:",
  foliaBuild: "Folia 26.1.2 build 8",
  thWhatF: "What",
  thInFolia: "On Folia",
  folia: [
    ["Presets, export and import, protected areas, templates, diagnostics, menu", "Same as on Paper."],
    [
      "Main world with a preset (bukkit.yml): void, flat, templates, ores, the terrain engine",
      "Yes; chunks are generated in parallel by region.",
    ],
    ["Datapack dimensions, including with terrain and the towering type", "Yes, on restart."],
    ["Regenerating", "Always on restart, before the worlds open."],
    ["/wf world tp to another loaded world", "Yes."],
    ["/wf world create, load, unload, import", "No: the command explains why and suggests a datapack dimension."],
    ["Managed worlds created earlier on Paper", "They do not load; the log says so."],
    ["Separate Nether and End, provider: plugin, per-world gravity", "No: they depend on creating worlds at runtime."],
  ],
  foliaSaveBody:
    "Folia has no {saveAll}: newly generated content reaches disk on autosave or on shutdown, and a regeneration plan warns you if it touches chunks that are not saved yet.",

  cmdTitle: "Commands",
  cmdIntro: "They all go through {wf}. Each one's permission is prefixed with {prefix}",
  thCommand: "Command",
  thPermission: "Permission",
  commands: [
    ["/wf help · status · gui", "worlds.view"],
    ["/wf diagnostics", "diagnostics"],
    ["/wf reload-config", "reload"],
    ["/wf world list · inspect <world>", "worlds.view"],
    ["/wf world create <name> <preset>", "worlds.create"],
    ["/wf world load|unload <world>", "worlds.manage"],
    ["/wf world import <name> <preset>", "worlds.create"],
    ["/wf world tp <world> [player]", "worlds.teleport (another player: worlds.teleport.others)"],
    ["/wf preset list · info · validate <id>", "presets.view"],
    ["/wf preset create|duplicate|seed|publish", "presets.edit"],
    ["/wf preset export <id> · import <file.yml>", "presets.export · presets.import"],
    ["/wf generation validate|preview · apply <world> <preset>", "generation.validate · generation.apply"],
    ["/wf regen plan|restore · confirm|accept · cancel · list|info", "regeneration.plan · execute · cancel · view"],
    ["/wf dimension list · create|remove", "dimensions.view · dimensions.create"],
    ["/wf terrain list · main <terrain|vanilla>", "dimensions.view · terrain.main"],
    ["/wf structure list|info · save", "templates.view · templates.save"],
    ["/wf protection list · add|remove", "protection.view · protection.manage"],
  ],

  permTitle: "Permissions",
  thAllows: "What it allows",
  pAdmin: "Everything.",
  pOperator:
    "Preparing without executing anything destructive: editing drafts, exporting, validating, planning regenerations, saving templates.",
  pViewer: "Read-only: worlds, presets, dimensions, areas, jobs, templates, diagnostics.",
  permLooseBody: "Individually: {list}. The console also goes through the permissions.",
  adminOnly: "admin only",

  limitsTitle: "Limits",
  l1: "A preset's ores, templates and biomes only apply to {newChunks}.",
  newChunksWord: "new chunks",
  l2: "Creating, loading and unloading worlds at runtime is Paper-only.",
  l3: "New dimensions only on restart (that is how Minecraft works) and with Minecraft's generator.",
  l4: "Templates are placed without entities (armor stands, item frames…); blocks with data (chests, spawners, signs) do go. At most 32×64×32. Each chunk decides its own without looking at its neighbors, so two large templates can overlap: raise their {rarity}.",
  l5: "There are no “registered” Minecraft structures (jigsaw, {locate}): the templates are WorldForge's.",
  l6: "Per-world gravity is players only. No physics or new blocks: WorldForge only uses what Minecraft already ships.",
  l7: "Datapack terrains: only in new dimensions and in the main world, on restart. The main world cannot change its height (−64 to 319).",
  l8: "No new biomes: terrains and the engine distribute the ones that already exist (datapack ones too).",
  untestedTitle: "Not tested yet",
  untestedBody:
    "{provider} was tested with a test generator, not with Terra or Iris. Also untested on Folia are {terrainMain} and the {hybrid} provider, nor the server with many players at once.",

  troublesTitle: "Common problems",
  thSymptom: "Symptom",
  thLook: "What to check",
  troubles: [
    [
      "The server stops at startup and the log says «Stopping the server»",
      "The lines before say whether the license is missing or which bukkit.yml preset is failing.",
    ],
    ["«has errors» when publishing", "/wf preset validate <id> lists each field with its problem."],
    [
      "A managed world does not load at startup",
      "The log says why (a preset with errors, a missing folder, a missing template).",
    ],
    ["«Regeneration BLOCKED» in the diagnostics", "protections.yml is malformed: fix it and /wf reload-config."],
    ["A job in NEEDS_RECOVERY", "/wf regen info, then restore or accept."],
    ["«✘ Template …: that rule does not apply»", "structures/<name>.nbt is missing or broken."],
    [
      "The server does not start after terrain main",
      "Delete world/datapacks/worldforge/data/minecraft/worldgen/noise_settings/overworld.json and start.",
    ],
    ["«already written in the datapack with different values»", "You edited a terrain a dimension already uses: save it under another id."],
  ],
};

const pt: WorldForgeCopy = {
  title: "WorldForge (RPGRoll-WorldForge)",
  intro:
    "Geração e administração de mundos: mundos vazios, planos, vanilla ou híbridos a partir de presets versionados; vários mundos ao mesmo tempo como com o Multiverse; terrenos no estilo Tectonic ou Terralith (mais altos, mais planos, continentes enormes, arquipélagos); minérios e modelos nos chunks novos; dimensões novas por datapack; e regeneração de chunks com plano, confirmação, backup e recuperação. Tudo por comandos ou por um menu no jogo.",

  versionTitle: "Versão 1.0.0",
  versionBody:
    "Tudo o que esta página descreve está testado num servidor real, no Paper 26.1.2 e no Folia 26.1.2, com jogadores de teste conectados. O que não está testado está em {limits}.",
  limitsLink: "Limites",

  reqTitle: "Requisitos",
  rServer: "Servidor",
  rServerVal: "Paper 26.1.2 (testado com o build 74) ou Folia 26.1.2 (build 8; ver {folia})",
  foliaLink: "Folia",
  rJava: "Java",
  rDeps: "Dependências",
  rDepsVal: "Nenhuma: SQLite e YAML vêm com o Paper.",
  noLibTitle: "Não precisa do RPGRoll-Lib",
  noLibBody:
    "O WorldForge funciona sozinho: não depende do RPGRoll-Lib nem do RPGRoll. Você pode instalá-lo num servidor sem mais nada do RPGRoll.",

  installTitle: "Instalação",
  i1: "Copie {jar} para {dir}.",
  i2: "Inicie o servidor uma vez. É criado {file}: cole ali a sua chave (começa por {prefix}) no lugar de {placeholder} e inicie de novo. Sem uma chave válida, o WorldForge se desativa.",
  i3: "Com a licença são criados também {files}, o banco de dados {db}, os presets de série em {presets} e as pastas {dirs}; {lazy} aparecem na primeira vez que fazem falta.",
  i4: "{cmd} diz se está tudo em ordem: plataforma, banco de dados, presets, zonas protegidas, trabalhos pendentes e dimensões.",
  startupBody:
    "O WorldForge carrega no {startup}: assim pode gerar também o mundo principal e aplicar regenerações pendentes antes de o servidor abrir os mundos.",

  firstStepsTitle: "Primeiros passos",
  mainWorldBody: "Para que o {main} use um preset, coloque-o no {bukkit} e reinicie:",
  mainWorldWord: "mundo principal",
  stopTitle: "Se não puder gerá-lo, para o servidor",
  stopBody:
    "Se ao iniciar o WorldForge não puder fornecer esse gerador (não há licença válida, ou o preset não existe ou tem erros), para o servidor antes de abrir os mundos e o log diz por quê. Se continuasse, o Minecraft geraria esse mundo com o terreno normal dele e depois seria preciso regenerar esses chunks. Conserte, ou remova a linha {generator}, e inicie de novo. A licença aguenta 7 dias sem conseguir falar com a loja desde a última verificação.",

  presetsTitle: "Presets",
  presetsBody:
    "Um preset diz como é um mundo. Os publicados vivem em {presets} e os rascunhos em {drafts}. Um rascunho não cria mundos: é publicado com {publish}, que o valida antes. Cada preset tem uma {version} (o hash do seu texto) e um mundo lembra com qual versão foi criado.",
  versionWord: "versão",
  thPreset: "Preset de série",
  thWhat: "O que faz",
  presets: [
    ["vanilla", "Minecraft sem mudanças."],
    ["amplified", "Tipo amplificado do vanilla."],
    ["empty", "Nem um bloco."],
    ["void-platform", "Vazio com uma plataforma de pedra de 5×5 no spawn."],
    ["flat", "Camadas planas (bedrock, terra, grama)."],
    ["resource-rich", "Terreno vanilla com veios extra de carvão, ferro, ouro e diamante."],
    ["custom", "Base para o seu: duplique e edite."],
    ["nether, end", "Um Nether ou um End à parte, com a sua própria semente."],
    ["montanas", "Cordilheiras altas com o motor de terreno do WorldForge."],
  ],

  providersTitle: "Provedores",
  providersBody:
    "Cada preset escolhe um provedor. Um campo que o provedor não controla é um {error} ao validar: nunca é ignorado em silêncio.",
  errorWord: "erro",
  thProvider: "Provedor",
  thTerrain: "Terreno",
  thOres: "Minérios",
  thTemplates: "Modelos",
  thBiomes: "Biomas a escolher",
  thVanillaStructures: "Estruturas vanilla",
  providers: [
    ["vanilla", "Minecraft (normal, amplificado, biomas grandes)", "—", "—", "—", "sim/não"],
    ["empty", "nada", "—", "sim", "sim", "—"],
    ["flat", "camadas do preset", "sim", "sim", "sim", "—"],
    ["hybrid", "Minecraft", "sim", "sim", "sim", "sim/não"],
    ["terrain", "o motor do WorldForge com um terreno de terrains/", "sim", "sim", "por altura e clima", "sim/não"],
    ["plugin", "o gerador de outro plugin (Terra, Iris…)", "—", "—", "—", "o que esse plugin fizer"],
  ],

  formatTitle: "Formato",
  newChunksWarn: "Minérios, modelos e biomas {only}. O que já foi gerado não muda; para isso existe a {regen}.",
  onlyNewChunks: "só afetam chunks que são gerados a partir de agora",
  regenLink: "regeneração",

  editTitle: "Editar, exportar, importar",
  e1: "{duplicate} cria um rascunho; {seed} fixa a semente dele; edite-o em {drafts} se quiser mais e publique com {publish}.",
  e2: "{export} escreve o preset em {dir} com um manifesto SHA-256.",
  e3: "Um {yml} em {dir} entra com {import}, {always} (tamanho máximo em {config}, por padrão 256 KB).",
  alwaysDraft: "sempre como rascunho",

  multiTitle: "Vários mundos (como o Multiverse)",
  m1: "Cada mundo criado volta sozinho ao reiniciar, com o seu preset.",
  m2: "{import} não toca nos blocos: só passa a administrar a pasta ({path}, o formato da 26.1). Uma pasta do formato antigo ({levelDat} solto) é rejeitada: é preciso abri-la antes com o Paper 26.1 para que ele a converta.",
  m3: "{gravity} muda a gravidade dos {players} (salto e queda; a queda segura se ajusta junto) ao entrar, ao trocar de mundo e ao renascer. Os mobs não são afetados.",
  playersWord: "jogadores",
  m4: "{provider} usa o gerador de outro plugin igual ao {bukkit} ou ao {dashG} do Multiverse; se esse plugin não estiver presente, o preset não é publicado. O WorldForge não coloca os seus minérios nem modelos dentro de um gerador alheio.",

  templatesTitle: "Modelos (estruturas e dungeons)",
  t1: "Construa num mundo. Os baús podem levar tabela de loot com o comando do vanilla: {cmd}.",
  t2: "{cmd} salva essa caixa (cantos incluídos, sem entidades) em {path}. No máximo {max}, e a área tem que estar carregada.",
  t3: "Use-o num preset ({templates}), publique-o e crie um mundo com ele.",
  tl1: "Um baú com tabela de loot a conserva em cada cópia colocada; o loot é sorteado ao abri-lo.",
  tl2: "Um modelo salvo {noOverwrite}: salve outro com outro nome. Assim um preset publicado continua gerando a mesma coisa.",
  noOverwrite: "não é sobrescrito",
  tl3: "Serve qualquer {nbt} do Minecraft (o formato dos blocos de estrutura) de até 2 MB e 32×64×32: deixe-o em {dir}.",
  tl4: "{surface} o coloca sobre o primeiro bloco sólido de cima para baixo (atravessa folhas, troncos e plantas; nunca sobre água ou lava). {underground} o coloca com a base numa altura aleatória entre {minY} e {maxY}; com os dois iguais, numa altura fixa (serve para ilhas no vazio).",
  tl5: "{cmd} diz quantos cada regra colocou desde que o mundo foi carregado e onde foram os últimos.",
  tl6: "Criar ou carregar um mundo verifica de novo os seus modelos: se faltar o arquivo, não continua.",

  dimTitle: "Dimensões",
  dimBody:
    "Escreve a dimensão no datapack {datapack} do mundo principal. {onlyOnBoot}: depois de reiniciar aparece como o mundo {world} (entre com {cmd}).",
  onlyOnBoot: "O Minecraft só lê dimensões novas ao iniciar",
  thType: "Tipo",
  thHow: "Como é",
  thGenerator: "Gerador",
  thGenerates: "O que gera",
  dOverworld: "céu, dia e noite, −64 a 319",
  dOverworldGen: "vazio (bioma the_void)",
  dCaves: "com teto, sem céu",
  dCavesGen: "camadas planas",
  dTall: "como o normal mas até 383",
  dTallGen: "terreno normal",
  dTowering: "como o normal mas até 575",
  dToweringGen: "terreno amplificado",
  dNether: "como o Nether, 0 a 255",
  dNetherGen: "só com o tipo dele",
  dEnd: "como o End",
  dEndGen: "um {terrain} (tipos do normal)",
  terrainLink: "terreno",
  dimRemoveBody:
    "{cmd} remove a definição: deixa de carregar ao reiniciar e {kept}. Uma dimensão de datapack usa o gerador do Minecraft, então os minérios e modelos do WorldForge não se aplicam ali.",
  folderKept: "a pasta é conservada",

  terrainsTitle: "Terrenos",
  terrainsBody:
    "Um terreno muda a {shape} do mundo, como Tectonic, Terralith ou Stratos: mais alto ou mais plano, continentes mais largos, picos mais afiados, biomas maiores. Vivem em {dir}; os de série são copiados ali na primeira vez e servem de exemplo ({cmd}).",
  shapeWord: "forma",
  thStock: "De série",
  terrains: [
    ["suave", "Colinas baixas, cômodas para construir.", "overworld"],
    ["continentes", "Continentes três vezes mais largos, biomas grandes.", "overworld"],
    ["archipielago", "Ilhas e estreitos.", "overworld"],
    ["montanas", "Cordilheiras quase o dobro de altas.", "towering"],
    ["extremo", "Relevo 2,4 vezes mais alto, picos muito dentados e continentes largos.", "towering"],
  ],

  useTerrainTitle: "Três maneiras de usá-lo",
  thWhere: "Onde",
  thHowUse: "Como",
  uNewDim: "Uma dimensão nova",
  uNewDimHow: "{cmd} e reiniciar",
  uNewDimGen: "O gerador do Minecraft com os números mudados: as cavernas, aquíferos, biomas e estruturas dele.",
  uMain: "O mundo normal",
  uMainHow: "{cmd} e reiniciar ({vanilla} desfaz)",
  uMainGen: "O mesmo, no mundo principal, como o Terralith faz.",
  uHot: "Um mundo criado em tempo real",
  uHotHow: "Um preset com {provider} e {terrain}",
  uHotGen: "O motor próprio do WorldForge (abaixo).",
  datapackBody:
    "{byDatapack} (dimensão e mundo normal): o WorldForge copia o {noiseRouter} do vanilla do próprio jar do servidor e muda os números dele. Com tudo em 1 sai igual ao gerador normal (duas gerações do mesmo lugar podem diferir em algum bloco solto na fronteira entre chunks). Para alturas acima de y≈240 é preciso um tipo mais alto: {cmd} avisa se os cumes vão ser cortados. Um terreno já escrito não é sobrescrito: se você editá-lo, salve com outro id.",
  byDatapack: "Por datapack",
  noiseRouter: "noise router",
  heightScaleBody:
    "{heightScale} estica a forma grande do terreno (continentes, vales, montanhas e o seu dentado). O detalhe 3D do vanilla, que esculpe saliências e agulhas, conserva o seu tamanho: as agulhas mais altas não saem ao dobro. Com {hs2}, medido: o dobro de pedra acima de y=64 e o solo ×1,94 coluna a coluna (mediana). Com {hs3} e {offset} num tipo {towering}, o solo chega a y=395, algo que o mundo normal não permite.",
  mainWarnTitle: "terrain main muda o mundo normal",
  mainWarnBody:
    "Muda {overworld}, então também é usado pelos mundos com provedor {vanilla} e pelas dimensões com gerador {overworldGen}. Só afeta chunks novos: onde o novo tocar o já gerado haverá um corte. Outro datapack que também o mude (Terralith) compete com ele; o comando avisa. Teste antes numa cópia do mundo.",
  engineBody:
    "{ownEngine} ({provider}) é para mundos criados sem reiniciar, onde o Minecraft não deixa usar um datapack: os mesmos ajustes, com a própria forma (não idêntica ao vanilla). Em cima o Minecraft coloca a superfície, cavernas, decoração e estruturas dele (bedrock, deepslate, carvão, vilas); os biomas são escolhidos pelo motor por altura e clima (picos no alto, oceanos no mar). Os cumes são comprimidos ao se aproximarem do teto do mundo (y=319) em vez de serem cortados.",
  ownEngine: "O motor próprio",
  terralithBody:
    "{withTerralith}: as dimensões e o motor do WorldForge não herdam o terreno dele (saem do jar do servidor); o gerador {overworldGen} sim. No Paper sem o mod lithostitched, os biomas do Terralith só aparecem no mundo principal.",
  withTerralith: "Com o Terralith instalado",

  regenTitle: "Regeneração",
  regenDangerTitle: "Regenerar apaga o que há nesses chunks",
  regenDangerBody: "Por isso sempre segue os mesmos quatro passos, e o WorldForge nunca apaga um backup.",
  r1: "{plan}: {cmd} (ou {area}, ou {all}). Diz quantos chunks, quantos são pulados por estarem protegidos ou sem gerar, quanto ocupa o backup e quando será aplicado. Não toca em nada.",
  planWord: "Plano",
  r2: "{confirm} com o código do plano: {cmd}. Expira em 15 minutos ({setting}).",
  confirmWord: "Confirmação",
  r3: "{backup} dos arquivos de região afetados em {dir}, verificado com SHA-256 logo antes de editar.",
  backupWord: "Backup",
  r4: "{exec}: um mundo secundário é descarregado, editado e carregado de novo na hora (os jogadores que estiverem dentro vão para o mundo principal). O mundo principal é aplicado no {nextBoot}, antes de abrir os mundos.",
  execWord: "Execução",
  nextBoot: "próximo início",
  undoBody:
    "Desfazer: {cmd} planeja uma restauração desse backup, que segue o mesmo caminho (plano, código e backup do atual).",

  protTitle: "Zonas protegidas",
  protBody:
    "{file} (ou {cmd}): a regeneração nunca toca num chunk protegido, nem ao planejar nem ao executar. Em volta do spawn de cada mundo há uma zona protegida de {setting} chunks (por padrão 2; 0 a remove). Se o arquivo não puder ser lido, a regeneração fica {blocked} até ser consertado.",
  blockedWord: "bloqueada",

  recoveryTitle: "Se o servidor desligar no meio",
  recoveryBody:
    "Um trabalho que estava em execução fica em {state} e bloqueia esse mundo: não é retomado sozinho. {info} diz o que aconteceu; você pode restaurar o backup dele ({restore}) ou aceitá-lo como ficou ({accept}).",

  menuTitle: "Menu",
  menuBody:
    "{cmd} abre mundos (carregar, descarregar, inspecionar, trocar de preset, regenerar ou proteger ao seu redor), presets (validar, duplicar, semente, publicar, exportar, criar mundo), regeneração (confirmar, cancelar, restaurar, aceitar), zonas protegidas e diagnóstico. Cada botão pede a sua permissão ao ser pressionado, o destrutivo pede confirmação e, se outro admin mudar o que você está vendo, o menu não salva por cima. Modelos, dimensões, terrenos, {worldImport} e {worldTp} são só por comandos.",

  foliaTitle: "Folia",
  foliaBody:
    "Testado no {build} com um jogador conectado. O Folia não deixa criar, carregar nem descarregar mundos com o servidor em andamento, então tudo o que muda mundos passa pelo início:",
  foliaBuild: "Folia 26.1.2 build 8",
  thWhatF: "O quê",
  thInFolia: "No Folia",
  folia: [
    ["Presets, exportar e importar, zonas protegidas, modelos, diagnóstico, menu", "Igual ao Paper."],
    [
      "Mundo principal com um preset (bukkit.yml): vazio, plano, modelos, minérios, o motor de terreno",
      "Sim; os chunks são gerados em paralelo por regiões.",
    ],
    ["Dimensões por datapack, também com terreno e tipo towering", "Sim, ao reiniciar."],
    ["Regenerar", "Sempre ao reiniciar, antes de abrir os mundos."],
    ["/wf world tp para outro mundo carregado", "Sim."],
    ["/wf world create, load, unload, import", "Não: o comando explica por que e propõe uma dimensão por datapack."],
    ["Mundos administrados criados antes no Paper", "Não carregam; o log avisa."],
    ["Nether e End à parte, provider: plugin, gravidade por mundo", "Não: dependem de criar mundos em tempo real."],
  ],
  foliaSaveBody:
    "O Folia não tem {saveAll}: o recém-gerado chega ao disco no autosave ou ao parar, e um plano de regeneração avisa se toca chunks que ainda não estão salvos.",

  cmdTitle: "Comandos",
  cmdIntro: "Todos vão com {wf}. A permissão de cada um leva na frente {prefix}",
  thCommand: "Comando",
  thPermission: "Permissão",
  commands: [
    ["/wf help · status · gui", "worlds.view"],
    ["/wf diagnostics", "diagnostics"],
    ["/wf reload-config", "reload"],
    ["/wf world list · inspect <mundo>", "worlds.view"],
    ["/wf world create <nome> <preset>", "worlds.create"],
    ["/wf world load|unload <mundo>", "worlds.manage"],
    ["/wf world import <nome> <preset>", "worlds.create"],
    ["/wf world tp <mundo> [jogador]", "worlds.teleport (outro jogador: worlds.teleport.others)"],
    ["/wf preset list · info · validate <id>", "presets.view"],
    ["/wf preset create|duplicate|seed|publish", "presets.edit"],
    ["/wf preset export <id> · import <arquivo.yml>", "presets.export · presets.import"],
    ["/wf generation validate|preview · apply <mundo> <preset>", "generation.validate · generation.apply"],
    ["/wf regen plan|restore · confirm|accept · cancel · list|info", "regeneration.plan · execute · cancel · view"],
    ["/wf dimension list · create|remove", "dimensions.view · dimensions.create"],
    ["/wf terrain list · main <terreno|vanilla>", "dimensions.view · terrain.main"],
    ["/wf structure list|info · save", "templates.view · templates.save"],
    ["/wf protection list · add|remove", "protection.view · protection.manage"],
  ],

  permTitle: "Permissões",
  thAllows: "O que permite",
  pAdmin: "Tudo.",
  pOperator:
    "Preparar sem executar nada destrutivo: editar rascunhos, exportar, validar, planejar regenerações, salvar modelos.",
  pViewer: "Só leitura: mundos, presets, dimensões, zonas, trabalhos, modelos, diagnóstico.",
  permLooseBody: "Soltos: {list}. O console também passa pelas permissões.",
  adminOnly: "só admin",

  limitsTitle: "Limites",
  l1: "Minérios, modelos e biomas de um preset só se aplicam a {newChunks}.",
  newChunksWord: "chunks novos",
  l2: "Criar, carregar e descarregar mundos em tempo real é só do Paper.",
  l3: "Dimensões novas só ao reiniciar (é assim que o Minecraft funciona) e com o gerador do Minecraft.",
  l4: "Os modelos são colocados sem entidades (suportes de armadura, molduras…); os blocos com dados (baús, geradores de monstros, placas) vão. No máximo 32×64×32. Cada chunk decide o seu sem olhar para os vizinhos, então dois modelos grandes podem se sobrepor: aumente o {rarity} deles.",
  l5: "Não há estruturas «registradas» do Minecraft (jigsaw, {locate}): os modelos são do WorldForge.",
  l6: "A gravidade por mundo é só dos jogadores. Sem física nem blocos novos: o WorldForge só usa o que o Minecraft já traz.",
  l7: "Terrenos por datapack: só em dimensões novas e no mundo principal, ao reiniciar. O mundo principal não pode mudar de altura (−64 a 319).",
  l8: "Biomas novos não: os terrenos e o motor distribuem os que já existem (também os de datapacks).",
  untestedTitle: "Sem testar ainda",
  untestedBody:
    "{provider} foi testado com um gerador de teste, não com Terra nem Iris. Também não estão testados no Folia {terrainMain} nem o provedor {hybrid}, nem o servidor com muitos jogadores ao mesmo tempo.",

  troublesTitle: "Problemas frequentes",
  thSymptom: "Sintoma",
  thLook: "O que olhar",
  troubles: [
    [
      "O servidor para ao iniciar e o log diz «Para o servidor»",
      "As linhas anteriores dizem se falta a licença ou qual preset do bukkit.yml falha.",
    ],
    ["«tem erros» ao publicar", "/wf preset validate <id> lista cada campo com o seu problema."],
    [
      "Um mundo administrado não carrega ao iniciar",
      "O log diz por quê (preset com erros, pasta que falta, modelo que falta).",
    ],
    ["«Regeneração BLOQUEADA» no diagnóstico", "protections.yml mal escrito: conserte e /wf reload-config."],
    ["Um trabalho em NEEDS_RECOVERY", "/wf regen info, depois restore ou accept."],
    ["«✘ Modelo …: essa regra não se aplica»", "Falta ou está quebrado structures/<nome>.nbt."],
    [
      "O servidor não inicia depois do terrain main",
      "Apague world/datapacks/worldforge/data/minecraft/worldgen/noise_settings/overworld.json e inicie.",
    ],
    ["«já está escrito no datapack com outros valores»", "Você editou um terreno que uma dimensão já usa: salve com outro id."],
  ],
};

export const WORLDFORGE_COPY: Record<Locale, WorldForgeCopy> = { es, en, pt };
