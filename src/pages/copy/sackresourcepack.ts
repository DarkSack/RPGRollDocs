import type { Locale } from "../../i18n";

/** Texto de la página de SackResourcePack. */

const es = {
  title: "SackResourcePack",
  intro:
    "Un Asset Pipeline independiente para resource packs — cero dependencia de RPGRoll. Cualquier plugin (de este ecosistema o no) declara una carpeta de assets con un manifiesto simple, y SackResourcePack la escanea, resuelve el orden entre módulos, fusiona namespaces, valida, empaqueta con hash, y distribuye el pack a los jugadores — todo automático.",

  standaloneTitle: "Standalone a propósito — no es un addon de RPGRoll",
  standaloneBody:
    "{pluginYml} no tiene {depend} ni {softdepend} en RPGRoll, y el código solo usa {compileOnly}. La idea es que sirva para {any} ecosistema de plugins, del mismo modo que {fx} es una librería de partículas/sonido standalone.",
  anyWord: "cualquier",

  modulesTitle: "Módulos de contenido",
  modulesBody:
    "Cualquier plugin que quiera aportar assets crea una carpeta bajo {dir} con un {packYml} y su propia carpeta {assets} (mismo layout que un resource pack real, solo que sin {mcmeta} propio — ese se genera una única vez para todo el pack fusionado).",
  thField: "Campo",
  thWhat: "Qué hace",
  fPriority:
    "A igualdad de dependencias, menor prioridad se fusiona primero — los de mayor prioridad pueden pisar a los de menor.",
  fDepends: "Ids obligatorios. Si falta alguno, el build reporta un error claro (no rompe el pipeline entero).",
  fOptional: "Ids opcionales. Si están presentes se ordenan antes; si no, se ignoran sin error.",

  refTitle: "Referencia completa: todos los campos en un solo archivo",
  refBody:
    "{path} en el repositorio usa todos los campos del manifiesto. A diferencia del resto de los addons, SackResourcePack no copia contenido de ejemplo automáticamente a {content} al primer arranque (no tiene ese mecanismo, por ser standalone) — copia esta carpeta manualmente si quieres verla en un servidor real.",

  resolTitle: "Resolución de dependencias",
  resolBody:
    "El orden final de fusión sale de un algoritmo de Kahn determinista: entre módulos sin relación de dependencia, desempata {priority} y luego el {id} alfabéticamente. Una dependencia circular {not} traba el build — se reporta como error y el resto se agrega en el mejor orden posible (prioridad/id), para que un solo módulo mal configurado no bloquee todo el pipeline.",
  notWord: "no",

  mergeTitle: "Motor de fusión",
  mergeBody:
    "Cada módulo se copia hacia un único árbol de trabajo, en el orden ya resuelto. La mayoría de los archivos (texturas, modelos, {ogg}) se copian tal cual — el último módulo pisa, y cualquier pisada se registra como un «conflicto» visible en {conflicts}. Tres formatos, en cambio, se {really} en vez de pisarse:",
  reallyMerge: "fusionan de verdad",
  thFile: "Archivo",
  thStrategy: "Estrategia de fusión",
  mSounds: "Unión de eventos de sonido (claves) — un evento que ya existe con otro contenido se marca como conflicto.",
  mLang:
    "Unión de claves de traducción — nunca se pierde lo que ya había, solo se agregan claves nuevas o se avisa si difieren.",
  mFont: "Concatena el array {providers} de todos los módulos que aporten esa fuente.",

  mcmetaTitle: "pack.mcmeta se genera una sola vez, en la raíz",
  mcmetaBody:
    "Ningún módulo debería traer su propio {mcmeta} — si lo trae, se ignora, porque no tiene sentido fusionar metadata de pack. El generado real lista, en su descripción, los ids de todos los módulos que entraron en ese build.",

  cmdDataTitle: "CustomModelData estable",
  cmdDataBody:
    "Cada clave lógica (ej. {key}) recibe un {cmd} la primera vez que se pide, y esa asignación queda fija para siempre en {registry} — {never}, así que un ítem ya entregado a un jugador sigue mostrando el modelo correcto después de cualquier rebuild futuro, incluso si se agregan o quitan módulos entre medio.",
  neverReassign: "nunca se reasigna un número ya usado",

  valTitle: "Motor de validación",
  valBody:
    "Corre después de fusionar y antes de empaquetar — nunca bloquea el build por sí solo (eso lo decide quien llama, mirando si hay algún {error}), solo junta todos los problemas de una pasada.",
  thCheck: "Chequeo",
  thSeverity: "Severidad",
  v1: "PNG ilegible o corrupto ({imageio})",
  v2: "Modelo JSON que no parsea",
  v3: "Modelo referencia un {parent} o textura inexistente",
  v4: "{soundsJson} referencia un {ogg} inexistente",
  v5: "Namespace declarado no coincide con la carpeta real de assets del módulo",
  v6: "Override entre módulos (archivo pisado por otro)",
  valSkipBody:
    "Las referencias con namespace {ns} (o sin {colon}, que se asume vanilla) se omiten — SackResourcePack no valida contra los assets internos del juego.",

  buildTitle: "Build: ZIP + SHA1 + caché incremental",
  buildBody:
    "Un «signature» (hash SHA-256 de los metadatos de cada módulo más ruta:tamaño:mtime de cada archivo de assets) decide si hace falta reconstruir. Si nada cambió desde el último build y no se fuerza, se devuelve el resultado cacheado sin volver a escanear/fusionar/validar/empaquetar. Es {whole} — una decisión deliberada de simplicidad: más robusto ante módulos que cambian en formas inesperadas, a costa de reconstruir todo cuando cualquier cosa cambia (en la práctica, rápido igual salvo packs enormes).",
  wholeCache: "un caché de todo el pack, no una fusión parcial por módulo",
  buildEventsBody:
    "{buildEvent} es cancelable — otro plugin puede abortar un build en curso. {genEvent} se dispara con el ZIP final, su SHA1, y si vino de caché.",

  distTitle: "Distribución",
  thMechanism: "Mecanismo",
  thHowWorks: "Cómo funciona",
  d1: "Host HTTP embebido",
  d1Body: "Un {httpServer} (JDK puro, sin dependencia extra) sirve el ZIP directo — cero configuración externa.",
  d2: "Subida remota genérica",
  d2Body: "PUT/POST autenticado genérico (header configurable) a cualquier endpoint propio, proxy, o servicio compatible.",
  d3: "Subida a S3 (firmada)",
  d3Body:
    "PUT firmado con AWS Signature V4 real, directo a un bucket S3 o cualquier endpoint S3-compatible (MinIO, R2, B2…) — sin proxy intermedio.",
  d4: "Envío al jugador",
  d4Body: "{api} — vanilla puro, sin reimplementar el protocolo.",
  modeBody:
    "{mode} elige entre {generic} (el PUT/POST de siempre) y {s3}. En modo {s3b}, {settings} configura endpoint/bucket/región/credenciales y si el estilo es virtual-hosted ({virtual}, el default de AWS) o path-style ({pathStyle}, lo que piden MinIO y varios proveedores no-AWS).",

  sigFile: "AwsSignatureV4.java (algoritmo real, sin SDK)",
  sigWarnTitle: "Implementado según spec, no probado contra un bucket real",
  sigWarnBody:
    "{cls} sigue al pie de la letra el algoritmo documentado por AWS (canonical request, string-to-sign, clave de firma derivada, firma final), usando solo {jdk} del JDK — sin el SDK de AWS. Pero no hay credenciales de AWS disponibles en el entorno donde se escribió esto: pruébalo una vez contra tu bucket/endpoint real antes de confiar en esto en producción.",
  publicUrlBody:
    "{key} (config) es la URL efectiva que se le manda al jugador, sea que la sirva el host embebido o un CDN/proxy externo completamente distinto — déjalo vacío para usar el host embebido directo, o complétalo si tienes el pack hospedado en otro lado.",

  dpTitle: "Datapack (data/)",
  dpBody:
    "Además de {assets} (cliente), cada módulo puede traer su propia carpeta {dataDir} con tags, loot tables, recipes, advancements y functions. {dpEngine} vive separado de {mergeEngine} a propósito — la estrategia de fusión es distinta: los archivos bajo {tags} se fusionan de verdad (unión del array {values}, sin duplicados), pero el resto (loot tables, recipes, advancements, functions) se copia tal cual y el último módulo pisa, porque no tiene sentido «fusionar» dos recetas distintas con el mismo id.",
  dpInfoTitle: "Un datapack no es un resource pack — vive server-side",
  dpInfoBody:
    "Un resource pack se manda al cliente vía {setRP}. Un datapack (recetas, loot tables, advancements, functions) es puramente server-side: vive en {path} y nunca se envía a nadie. Por eso {buildEngine} no empaqueta ni sirve nada por HTTP — solo fusiona y copia la carpeta.",
  dpApplyBody:
    "Nada se aplica solo: {build} fusiona {dataDir} de todos los módulos y copia el resultado a {datapacks}, y por separado {reload} llama a {reloadData} — el método real de Paper para recargar recetas/loot tables/tags/advancements sin reiniciar plugins (verificado contra el jar real de la API, distinto de un {slashReload} completo). Deshabilitado por defecto ({enabled}); {packFormat} es una clave separada de {packFormat2} porque datapack y resource pack no comparten la misma numeración de {packFormatWord} entre versiones de Minecraft.",

  extTitle: "Packs de otros plugins (external-packs)",
  extBody:
    "Algunos plugins generan su propio resource pack en su carpeta (FreeMinecraftModels, por ejemplo, convierte sus modelos de Blockbench). En vez de copiarlo a mano a {content}, {externalPacks} lo lee en su sitio en cada build y lo suma como un módulo más, con su prioridad. La ruta es relativa a {plugins} y tiene que tener un {assets} dentro; si todavía no existe (el otro plugin no ha generado nada), se salta sin error. {exclude} deja fuera rutas de dentro de su {assets2}.",
  extFmmBody:
    "SackResourcePack declara {softdepend}, así que arranca después y el pack de FMM ya está generado para el primer build. Tras un {fmmReload}, un {srpRebuild} lo vuelve a empaquetar.",

  devTitle: "Modo desarrollo",
  devBody:
    "Un {watch} (JDK puro) observa {content} recursivamente. Tras 1.5s sin más cambios (para no reconstruir en medio de que alguien todavía está copiando varios archivos), dispara un rebuild y reenvío automático — pensado para iterar assets sin reiniciar el servidor. {dev} lo activa o desactiva en caliente.",

  apiTitle: "API para addons — AssetsAPI",
  apiBody: "Un plugin que quiera aportar sus propios assets sin tocar {content} a mano tiene dos caminos:",
  apiConvergeBody:
    "Ambos caminos convergen en el mismo pipeline de siempre — no hay un modelo de objetos «en memoria» paralelo. {registerPlugin} le crea un {packYml} mínimo al módulo si todavía no tiene uno; los registros directos también.",
  thRegister: "Registro",
  thDest: "Carpeta destino",
  rMusic: "{dir} (convención propia, no un requisito vanilla)",
  rGui: "{dir} (convención vanilla para texturas de interfaz)",

  guiTitle: "GUI: Dashboard y Explorador de Assets",
  guiBody:
    "Un {gui}/{listener} propios — copia deliberada del mismo patrón que usa el resto del ecosistema RPGRoll, pero {noImport}, porque este módulo es standalone. {srp} (sin argumentos, desde un jugador) abre el Dashboard: lista de módulos cargados, resumen de errores/warnings del último build, y botones de Reconstruir/Validar/Publicar/Modo desarrollo. Desde ahí, «Explorador de Assets» abre una lista paginada y filtrable por tipo de todo lo que entró en el pack fusionado.",
  noImportWord: "sin importar nada de RPGRoll",
  guiPngBody:
    "Las texturas {png} se muestran como una cabeza de jugador con esa imagen «pintada» encima — el host HTTP embebido gana un segundo contexto ({assetsCtx}) que sirve cualquier archivo suelto del árbol fusionado (con protección contra path traversal), y {skullFromUrl} arma un {profile} con el payload de textura apuntando a esa URL — el mismo truco que usa {skull} de :core, pero armando el JSON nosotros mismos en vez de partir de un base64 ya hecho.",
  previewWarnTitle: "Preview parcial, no un render real — y sin probar contra un cliente real",
  previewWarnBody:
    "Solo funciona con texturas (no con modelos/sonidos/fuentes), requiere que el cliente del jugador pueda alcanzar el host HTTP del plugin por red, y la imagen se distorsiona al envolverse sobre el UV de una cabeza en vez de mostrarse plana. Si el pack se sirve desde una {publicUrl} externa en vez del host embebido, no hay preview — el explorador cae de vuelta al ícono+lore de siempre. Tampoco se pudo verificar contra un cliente de Minecraft real en el entorno donde se escribió esto.",

  cmdsTitle: "Comandos",
  thCommand: "Comando",
  c1: "Sin argumentos, desde un jugador: abre el Dashboard.",
  c2: "Recarga config.yml (puerto HTTP/carpeta de contenido requieren reiniciar el plugin).",
  c3: "Fuerza un build completo, ignorando el caché.",
  c4: "Reconstruye solo si algo cambió y muestra los issues.",
  c5: "Sube (si está configurado) y reenvía el pack a todos los jugadores conectados.",
  c6: "Módulos cargados, último SHA1, estado del host HTTP y del modo desarrollo.",
  c7: "Lista los módulos de contenido activos.",
  c8: "Lista los overrides (archivos pisados) del último build.",
  c9: "Lista los assets de ese tipo en el pack fusionado.",
  c10: "Invalida el caché — el próximo build reconstruye todo desde cero.",
  c11: "Activa o desactiva el modo desarrollo en caliente.",
  c12: "Fusiona {dataDir} de todos los módulos y lo copia a {datapacks} (requiere {enabled}).",
  c13: "Llama a {reloadData} para aplicar el datapack ya copiado.",
  c14: "Igual que {srp} sin argumentos: abre el Dashboard (equivalente explícito, útil cuando hay más argumentos después en un alias).",
  permBody: "Todos los subcomandos requieren {perm} (por defecto: op).",
};

export type SackResourcePackCopy = typeof es;

const en: SackResourcePackCopy = {
  title: "SackResourcePack",
  intro:
    "A standalone Asset Pipeline for resource packs — zero dependency on RPGRoll. Any plugin (from this ecosystem or not) declares an assets folder with a simple manifest, and SackResourcePack scans it, resolves the order between modules, merges namespaces, validates, packages with a hash, and distributes the pack to the players — all automatic.",

  standaloneTitle: "Standalone on purpose — it is not an RPGRoll addon",
  standaloneBody:
    "{pluginYml} has no {depend} or {softdepend} on RPGRoll, and the code only uses {compileOnly}. The idea is that it serves {any} plugin ecosystem, in the same way {fx} is a standalone particle/sound library.",
  anyWord: "any",

  modulesTitle: "Content modules",
  modulesBody:
    "Any plugin that wants to contribute assets creates a folder under {dir} with a {packYml} and its own {assets} folder (the same layout as a real resource pack, only without its own {mcmeta} — that one is generated a single time for the whole merged pack).",
  thField: "Field",
  thWhat: "What it does",
  fPriority:
    "With equal dependencies, the lower priority is merged first — the higher-priority ones can override the lower ones.",
  fDepends: "Required ids. If one is missing, the build reports a clear error (it does not break the whole pipeline).",
  fOptional: "Optional ids. If they are present they are ordered first; if not, they are ignored without an error.",

  refTitle: "Full reference: every field in a single file",
  refBody:
    "{path} in the repository uses every field of the manifest. Unlike the rest of the addons, SackResourcePack does not copy example content automatically into {content} on first startup (it has no such mechanism, being standalone) — copy this folder manually if you want to see it on a real server.",

  resolTitle: "Dependency resolution",
  resolBody:
    "The final merge order comes from a deterministic Kahn algorithm: between modules with no dependency relation, {priority} breaks the tie and then the {id} alphabetically. A circular dependency does {not} stall the build — it is reported as an error and the rest is added in the best possible order (priority/id), so that a single misconfigured module does not block the whole pipeline.",
  notWord: "not",

  mergeTitle: "Merge engine",
  mergeBody:
    "Each module is copied into a single working tree, in the already-resolved order. Most files (textures, models, {ogg}) are copied as they are — the last module overrides, and any override is recorded as a “conflict” visible in {conflicts}. Three formats, on the other hand, are {really} instead of overridden:",
  reallyMerge: "truly merged",
  thFile: "File",
  thStrategy: "Merge strategy",
  mSounds: "Union of sound events (keys) — an event that already exists with other content is marked as a conflict.",
  mLang:
    "Union of translation keys — what was already there is never lost, only new keys are added or a warning is issued if they differ.",
  mFont: "Concatenates the {providers} array of every module that contributes that font.",

  mcmetaTitle: "pack.mcmeta is generated once, at the root",
  mcmetaBody:
    "No module should bring its own {mcmeta} — if it does, it is ignored, because merging pack metadata makes no sense. The actual generated one lists, in its description, the ids of every module that went into that build.",

  cmdDataTitle: "Stable CustomModelData",
  cmdDataBody:
    "Each logical key (e.g. {key}) receives a {cmd} the first time it is requested, and that assignment stays fixed forever in {registry} — {never}, so an item already given to a player keeps showing the right model after any future rebuild, even if modules are added or removed in between.",
  neverReassign: "a number already used is never reassigned",

  valTitle: "Validation engine",
  valBody:
    "It runs after merging and before packaging — it never blocks the build on its own (the caller decides that, by looking for any {error}), it just collects every problem in one pass.",
  thCheck: "Check",
  thSeverity: "Severity",
  v1: "Unreadable or corrupt PNG ({imageio})",
  v2: "A JSON model that does not parse",
  v3: "A model references a nonexistent {parent} or texture",
  v4: "{soundsJson} references a nonexistent {ogg}",
  v5: "The declared namespace does not match the module's real assets folder",
  v6: "Override between modules (a file overridden by another)",
  valSkipBody:
    "References with the {ns} namespace (or with no {colon}, which is assumed to be vanilla) are skipped — SackResourcePack does not validate against the game's internal assets.",

  buildTitle: "Build: ZIP + SHA1 + incremental cache",
  buildBody:
    "A “signature” (SHA-256 hash of each module's metadata plus path:size:mtime of each assets file) decides whether a rebuild is needed. If nothing changed since the last build and it is not forced, the cached result is returned without scanning/merging/validating/packaging again. It is {whole} — a deliberate simplicity decision: more robust against modules that change in unexpected ways, at the cost of rebuilding everything when anything changes (in practice, fast anyway except for huge packs).",
  wholeCache: "a cache of the whole pack, not a partial per-module merge",
  buildEventsBody:
    "{buildEvent} is cancellable — another plugin can abort a build in progress. {genEvent} fires with the final ZIP, its SHA1, and whether it came from the cache.",

  distTitle: "Distribution",
  thMechanism: "Mechanism",
  thHowWorks: "How it works",
  d1: "Embedded HTTP host",
  d1Body: "A {httpServer} (pure JDK, no extra dependency) serves the ZIP directly — zero external configuration.",
  d2: "Generic remote upload",
  d2Body: "Generic authenticated PUT/POST (configurable header) to any endpoint of your own, proxy, or compatible service.",
  d3: "S3 upload (signed)",
  d3Body:
    "PUT signed with real AWS Signature V4, straight to an S3 bucket or any S3-compatible endpoint (MinIO, R2, B2…) — with no intermediate proxy.",
  d4: "Sending to the player",
  d4Body: "{api} — pure vanilla, without reimplementing the protocol.",
  modeBody:
    "{mode} chooses between {generic} (the usual PUT/POST) and {s3}. In {s3b} mode, {settings} configures endpoint/bucket/region/credentials and whether the style is virtual-hosted ({virtual}, the AWS default) or path-style ({pathStyle}, what MinIO and several non-AWS providers require).",

  sigFile: "AwsSignatureV4.java (the real algorithm, no SDK)",
  sigWarnTitle: "Implemented to spec, not tested against a real bucket",
  sigWarnBody:
    "{cls} follows the algorithm documented by AWS to the letter (canonical request, string-to-sign, derived signing key, final signature), using only the JDK's {jdk} — without the AWS SDK. But no AWS credentials were available in the environment where this was written: test it once against your real bucket/endpoint before relying on it in production.",
  publicUrlBody:
    "{key} (config) is the effective URL sent to the player, whether it is served by the embedded host or by a completely different external CDN/proxy — leave it empty to use the embedded host directly, or fill it in if you have the pack hosted elsewhere.",

  dpTitle: "Datapack (data/)",
  dpBody:
    "Besides {assets} (client-side), each module can bring its own {dataDir} folder with tags, loot tables, recipes, advancements and functions. {dpEngine} lives apart from {mergeEngine} on purpose — the merge strategy is different: the files under {tags} are truly merged (union of the {values} array, without duplicates), but the rest (loot tables, recipes, advancements, functions) is copied as it is and the last module overrides, because “merging” two different recipes with the same id makes no sense.",
  dpInfoTitle: "A datapack is not a resource pack — it lives server-side",
  dpInfoBody:
    "A resource pack is sent to the client via {setRP}. A datapack (recipes, loot tables, advancements, functions) is purely server-side: it lives in {path} and is never sent to anyone. That is why {buildEngine} neither packages nor serves anything over HTTP — it only merges and copies the folder.",
  dpApplyBody:
    "Nothing applies by itself: {build} merges {dataDir} from every module and copies the result into {datapacks}, and separately {reload} calls {reloadData} — Paper's real method for reloading recipes/loot tables/tags/advancements without restarting plugins (verified against the API's real jar, different from a full {slashReload}). Disabled by default ({enabled}); {packFormat} is a key separate from {packFormat2} because datapacks and resource packs do not share the same {packFormatWord} numbering across Minecraft versions.",

  extTitle: "Other plugins' packs (external-packs)",
  extBody:
    "Some plugins generate their own resource pack in their folder (FreeMinecraftModels, for example, converts its Blockbench models). Instead of copying it into {content} by hand, {externalPacks} reads it where it is on every build and adds it as one more module, with its priority. The path is relative to {plugins} and has to have an {assets} inside; if it does not exist yet (the other plugin has generated nothing), it is skipped without an error. {exclude} leaves out paths inside its {assets2}.",
  extFmmBody:
    "SackResourcePack declares {softdepend}, so it starts afterwards and FMM's pack is already generated for the first build. After an {fmmReload}, an {srpRebuild} packages it again.",

  devTitle: "Development mode",
  devBody:
    "A {watch} (pure JDK) watches {content} recursively. After 1.5s with no further changes (so it does not rebuild while someone is still copying several files), it triggers an automatic rebuild and resend — meant for iterating on assets without restarting the server. {dev} turns it on or off at runtime.",

  apiTitle: "API for addons — AssetsAPI",
  apiBody: "A plugin that wants to contribute its own assets without touching {content} by hand has two paths:",
  apiConvergeBody:
    "Both paths converge on the same usual pipeline — there is no parallel “in-memory” object model. {registerPlugin} creates a minimal {packYml} for the module if it does not have one yet; the direct registrations do too.",
  thRegister: "Registration",
  thDest: "Target folder",
  rMusic: "{dir} (its own convention, not a vanilla requirement)",
  rGui: "{dir} (the vanilla convention for interface textures)",

  guiTitle: "GUI: Dashboard and Asset Explorer",
  guiBody:
    "Its own {gui}/{listener} — a deliberate copy of the same pattern the rest of the RPGRoll ecosystem uses, but {noImport}, because this module is standalone. {srp} (with no arguments, from a player) opens the Dashboard: the list of loaded modules, a summary of the last build's errors/warnings, and Rebuild/Validate/Publish/Development-mode buttons. From there, “Asset Explorer” opens a paginated list, filterable by type, of everything that went into the merged pack.",
  noImportWord: "without importing anything from RPGRoll",
  guiPngBody:
    "{png} textures are shown as a player head with that image “painted” on top — the embedded HTTP host gains a second context ({assetsCtx}) that serves any single file from the merged tree (with path-traversal protection), and {skullFromUrl} builds a {profile} with the texture payload pointing at that URL — the same trick :core's {skull} uses, but building the JSON ourselves instead of starting from a ready-made base64.",
  previewWarnTitle: "A partial preview, not a real render — and untested against a real client",
  previewWarnBody:
    "It only works with textures (not with models/sounds/fonts), it requires the player's client to be able to reach the plugin's HTTP host over the network, and the image is distorted as it wraps around a head's UV instead of being shown flat. If the pack is served from an external {publicUrl} instead of the embedded host, there is no preview — the explorer falls back to the usual icon+lore. Nor could it be verified against a real Minecraft client in the environment where this was written.",

  cmdsTitle: "Commands",
  thCommand: "Command",
  c1: "With no arguments, from a player: opens the Dashboard.",
  c2: "Reloads config.yml (the HTTP port and content folder require restarting the plugin).",
  c3: "Forces a full build, ignoring the cache.",
  c4: "Rebuilds only if something changed and shows the issues.",
  c5: "Uploads (if configured) and resends the pack to every connected player.",
  c6: "Loaded modules, last SHA1, state of the HTTP host and of development mode.",
  c7: "Lists the active content modules.",
  c8: "Lists the last build's overrides (overridden files).",
  c9: "Lists the assets of that type in the merged pack.",
  c10: "Invalidates the cache — the next build rebuilds everything from scratch.",
  c11: "Turns development mode on or off at runtime.",
  c12: "Merges {dataDir} from every module and copies it into {datapacks} (requires {enabled}).",
  c13: "Calls {reloadData} to apply the already-copied datapack.",
  c14: "The same as {srp} with no arguments: opens the Dashboard (an explicit equivalent, useful when more arguments follow in an alias).",
  permBody: "Every subcommand requires {perm} (default: op).",
};

const pt: SackResourcePackCopy = {
  title: "SackResourcePack",
  intro:
    "Um Asset Pipeline independente para resource packs — zero dependência do RPGRoll. Qualquer plugin (deste ecossistema ou não) declara uma pasta de assets com um manifesto simples, e o SackResourcePack a escaneia, resolve a ordem entre módulos, mescla namespaces, valida, empacota com hash, e distribui o pack aos jogadores — tudo automático.",

  standaloneTitle: "Standalone de propósito — não é um addon do RPGRoll",
  standaloneBody:
    "O {pluginYml} não tem {depend} nem {softdepend} no RPGRoll, e o código só usa {compileOnly}. A ideia é que sirva para {any} ecossistema de plugins, do mesmo modo que o {fx} é uma biblioteca de partículas/som standalone.",
  anyWord: "qualquer",

  modulesTitle: "Módulos de conteúdo",
  modulesBody:
    "Qualquer plugin que queira contribuir com assets cria uma pasta em {dir} com um {packYml} e a sua própria pasta {assets} (mesmo layout de um resource pack real, só sem {mcmeta} próprio — esse é gerado uma única vez para todo o pack mesclado).",
  thField: "Campo",
  thWhat: "O que faz",
  fPriority:
    "Com dependências iguais, a prioridade menor é mesclada primeiro — os de prioridade maior podem sobrescrever os de menor.",
  fDepends: "Ids obrigatórios. Se faltar algum, o build reporta um erro claro (não quebra o pipeline inteiro).",
  fOptional: "Ids opcionais. Se estiverem presentes são ordenados antes; se não, são ignorados sem erro.",

  refTitle: "Referência completa: todos os campos num só arquivo",
  refBody:
    "{path} no repositório usa todos os campos do manifesto. Diferente do resto dos addons, o SackResourcePack não copia conteúdo de exemplo automaticamente para {content} no primeiro início (não tem esse mecanismo, por ser standalone) — copie esta pasta manualmente se quiser vê-la num servidor real.",

  resolTitle: "Resolução de dependências",
  resolBody:
    "A ordem final de mesclagem sai de um algoritmo de Kahn determinista: entre módulos sem relação de dependência, o desempate é por {priority} e depois pelo {id} alfabeticamente. Uma dependência circular {not} trava o build — é reportada como erro e o resto é adicionado na melhor ordem possível (prioridade/id), para que um só módulo mal configurado não bloqueie todo o pipeline.",
  notWord: "não",

  mergeTitle: "Motor de mesclagem",
  mergeBody:
    "Cada módulo é copiado para uma única árvore de trabalho, na ordem já resolvida. A maioria dos arquivos (texturas, modelos, {ogg}) é copiada como está — o último módulo sobrescreve, e qualquer sobrescrita é registrada como um «conflito» visível em {conflicts}. Três formatos, por outro lado, são {really} em vez de sobrescritos:",
  reallyMerge: "mesclados de verdade",
  thFile: "Arquivo",
  thStrategy: "Estratégia de mesclagem",
  mSounds: "União de eventos de som (chaves) — um evento que já existe com outro conteúdo é marcado como conflito.",
  mLang:
    "União de chaves de tradução — nunca se perde o que já havia, só são adicionadas chaves novas ou é avisado se diferirem.",
  mFont: "Concatena o array {providers} de todos os módulos que contribuam com essa fonte.",

  mcmetaTitle: "pack.mcmeta é gerado uma só vez, na raiz",
  mcmetaBody:
    "Nenhum módulo deveria trazer o seu próprio {mcmeta} — se trouxer, é ignorado, porque não faz sentido mesclar metadata de pack. O gerado real lista, na sua descrição, os ids de todos os módulos que entraram nesse build.",

  cmdDataTitle: "CustomModelData estável",
  cmdDataBody:
    "Cada chave lógica (ex. {key}) recebe um {cmd} na primeira vez que é pedida, e essa atribuição fica fixa para sempre em {registry} — {never}, então um item já entregue a um jogador continua mostrando o modelo correto depois de qualquer rebuild futuro, mesmo que módulos sejam adicionados ou removidos no meio.",
  neverReassign: "um número já usado nunca é reatribuído",

  valTitle: "Motor de validação",
  valBody:
    "Roda depois de mesclar e antes de empacotar — nunca bloqueia o build por si só (isso quem chama decide, olhando se há algum {error}), só junta todos os problemas numa passada.",
  thCheck: "Verificação",
  thSeverity: "Severidade",
  v1: "PNG ilegível ou corrompido ({imageio})",
  v2: "Modelo JSON que não parseia",
  v3: "Modelo referencia um {parent} ou textura inexistente",
  v4: "{soundsJson} referencia um {ogg} inexistente",
  v5: "Namespace declarado não coincide com a pasta real de assets do módulo",
  v6: "Override entre módulos (arquivo sobrescrito por outro)",
  valSkipBody:
    "As referências com namespace {ns} (ou sem {colon}, que se assume vanilla) são omitidas — o SackResourcePack não valida contra os assets internos do jogo.",

  buildTitle: "Build: ZIP + SHA1 + cache incremental",
  buildBody:
    "Uma «signature» (hash SHA-256 dos metadados de cada módulo mais caminho:tamanho:mtime de cada arquivo de assets) decide se é preciso reconstruir. Se nada mudou desde o último build e não é forçado, o resultado em cache é devolvido sem escanear/mesclar/validar/empacotar de novo. É {whole} — uma decisão deliberada de simplicidade: mais robusto diante de módulos que mudam de formas inesperadas, ao custo de reconstruir tudo quando qualquer coisa muda (na prática, rápido do mesmo jeito salvo packs enormes).",
  wholeCache: "um cache de todo o pack, não uma mesclagem parcial por módulo",
  buildEventsBody:
    "{buildEvent} é cancelável — outro plugin pode abortar um build em curso. {genEvent} é disparado com o ZIP final, o seu SHA1, e se veio do cache.",

  distTitle: "Distribuição",
  thMechanism: "Mecanismo",
  thHowWorks: "Como funciona",
  d1: "Host HTTP embutido",
  d1Body: "Um {httpServer} (JDK puro, sem dependência extra) serve o ZIP direto — zero configuração externa.",
  d2: "Upload remoto genérico",
  d2Body: "PUT/POST autenticado genérico (header configurável) para qualquer endpoint próprio, proxy, ou serviço compatível.",
  d3: "Upload para S3 (assinado)",
  d3Body:
    "PUT assinado com AWS Signature V4 real, direto para um bucket S3 ou qualquer endpoint compatível com S3 (MinIO, R2, B2…) — sem proxy intermediário.",
  d4: "Envio ao jogador",
  d4Body: "{api} — vanilla puro, sem reimplementar o protocolo.",
  modeBody:
    "{mode} escolhe entre {generic} (o PUT/POST de sempre) e {s3}. No modo {s3b}, {settings} configura endpoint/bucket/região/credenciais e se o estilo é virtual-hosted ({virtual}, o padrão da AWS) ou path-style ({pathStyle}, o que MinIO e vários provedores não-AWS pedem).",

  sigFile: "AwsSignatureV4.java (algoritmo real, sem SDK)",
  sigWarnTitle: "Implementado conforme a spec, não testado contra um bucket real",
  sigWarnBody:
    "{cls} segue à risca o algoritmo documentado pela AWS (canonical request, string-to-sign, chave de assinatura derivada, assinatura final), usando só {jdk} do JDK — sem o SDK da AWS. Mas não há credenciais da AWS disponíveis no ambiente onde isto foi escrito: teste uma vez contra o seu bucket/endpoint real antes de confiar nisto em produção.",
  publicUrlBody:
    "{key} (config) é a URL efetiva que é mandada ao jogador, seja servida pelo host embutido ou por um CDN/proxy externo completamente diferente — deixe vazio para usar o host embutido direto, ou preencha se você tem o pack hospedado em outro lugar.",

  dpTitle: "Datapack (data/)",
  dpBody:
    "Além de {assets} (cliente), cada módulo pode trazer a sua própria pasta {dataDir} com tags, loot tables, recipes, advancements e functions. O {dpEngine} vive separado do {mergeEngine} de propósito — a estratégia de mesclagem é diferente: os arquivos em {tags} são mesclados de verdade (união do array {values}, sem duplicados), mas o resto (loot tables, recipes, advancements, functions) é copiado como está e o último módulo sobrescreve, porque não faz sentido «mesclar» duas receitas diferentes com o mesmo id.",
  dpInfoTitle: "Um datapack não é um resource pack — vive no servidor",
  dpInfoBody:
    "Um resource pack é mandado ao cliente via {setRP}. Um datapack (receitas, loot tables, advancements, functions) é puramente server-side: vive em {path} e nunca é enviado a ninguém. Por isso o {buildEngine} não empacota nem serve nada por HTTP — só mescla e copia a pasta.",
  dpApplyBody:
    "Nada se aplica sozinho: {build} mescla {dataDir} de todos os módulos e copia o resultado para {datapacks}, e separadamente {reload} chama {reloadData} — o método real do Paper para recarregar receitas/loot tables/tags/advancements sem reiniciar plugins (verificado contra o jar real da API, diferente de um {slashReload} completo). Desabilitado por padrão ({enabled}); {packFormat} é uma chave separada de {packFormat2} porque datapack e resource pack não compartilham a mesma numeração de {packFormatWord} entre versões do Minecraft.",

  extTitle: "Packs de outros plugins (external-packs)",
  extBody:
    "Alguns plugins geram o seu próprio resource pack na sua pasta (FreeMinecraftModels, por exemplo, converte os seus modelos do Blockbench). Em vez de copiá-lo à mão para {content}, {externalPacks} o lê no lugar em cada build e o soma como um módulo a mais, com a sua prioridade. O caminho é relativo a {plugins} e tem que ter um {assets} dentro; se ainda não existe (o outro plugin não gerou nada), é pulado sem erro. {exclude} deixa de fora caminhos de dentro do seu {assets2}.",
  extFmmBody:
    "O SackResourcePack declara {softdepend}, então inicia depois e o pack do FMM já está gerado para o primeiro build. Depois de um {fmmReload}, um {srpRebuild} o empacota de novo.",

  devTitle: "Modo desenvolvimento",
  devBody:
    "Um {watch} (JDK puro) observa {content} recursivamente. Depois de 1,5s sem mais mudanças (para não reconstruir no meio de alguém ainda estar copiando vários arquivos), dispara um rebuild e reenvio automático — pensado para iterar assets sem reiniciar o servidor. {dev} o ativa ou desativa em tempo real.",

  apiTitle: "API para addons — AssetsAPI",
  apiBody: "Um plugin que queira contribuir com os seus próprios assets sem mexer em {content} à mão tem dois caminhos:",
  apiConvergeBody:
    "Os dois caminhos convergem no mesmo pipeline de sempre — não há um modelo de objetos «em memória» paralelo. {registerPlugin} cria um {packYml} mínimo para o módulo se ele ainda não tiver um; os registros diretos também.",
  thRegister: "Registro",
  thDest: "Pasta destino",
  rMusic: "{dir} (convenção própria, não um requisito vanilla)",
  rGui: "{dir} (convenção vanilla para texturas de interface)",

  guiTitle: "GUI: Dashboard e Explorador de Assets",
  guiBody:
    "Um {gui}/{listener} próprios — cópia deliberada do mesmo padrão que o resto do ecossistema RPGRoll usa, mas {noImport}, porque este módulo é standalone. {srp} (sem argumentos, de um jogador) abre o Dashboard: lista de módulos carregados, resumo de erros/warnings do último build, e botões de Reconstruir/Validar/Publicar/Modo desenvolvimento. Dali, «Explorador de Assets» abre uma lista paginada e filtrável por tipo de tudo o que entrou no pack mesclado.",
  noImportWord: "sem importar nada do RPGRoll",
  guiPngBody:
    "As texturas {png} são mostradas como uma cabeça de jogador com essa imagem «pintada» em cima — o host HTTP embutido ganha um segundo contexto ({assetsCtx}) que serve qualquer arquivo solto da árvore mesclada (com proteção contra path traversal), e {skullFromUrl} monta um {profile} com o payload de textura apontando para essa URL — o mesmo truque que o {skull} do :core usa, mas montando o JSON nós mesmos em vez de partir de um base64 já feito.",
  previewWarnTitle: "Preview parcial, não um render real — e sem testar contra um cliente real",
  previewWarnBody:
    "Só funciona com texturas (não com modelos/sons/fontes), requer que o cliente do jogador consiga alcançar o host HTTP do plugin pela rede, e a imagem se distorce ao se envolver sobre o UV de uma cabeça em vez de ser mostrada plana. Se o pack é servido de uma {publicUrl} externa em vez do host embutido, não há preview — o explorador volta ao ícone+lore de sempre. Também não foi possível verificar contra um cliente de Minecraft real no ambiente onde isto foi escrito.",

  cmdsTitle: "Comandos",
  thCommand: "Comando",
  c1: "Sem argumentos, de um jogador: abre o Dashboard.",
  c2: "Recarrega o config.yml (porta HTTP/pasta de conteúdo requerem reiniciar o plugin).",
  c3: "Força um build completo, ignorando o cache.",
  c4: "Reconstrói só se algo mudou e mostra os issues.",
  c5: "Sobe (se estiver configurado) e reenvia o pack a todos os jogadores conectados.",
  c6: "Módulos carregados, último SHA1, estado do host HTTP e do modo desenvolvimento.",
  c7: "Lista os módulos de conteúdo ativos.",
  c8: "Lista os overrides (arquivos sobrescritos) do último build.",
  c9: "Lista os assets desse tipo no pack mesclado.",
  c10: "Invalida o cache — o próximo build reconstrói tudo do zero.",
  c11: "Ativa ou desativa o modo desenvolvimento em tempo real.",
  c12: "Mescla {dataDir} de todos os módulos e copia para {datapacks} (requer {enabled}).",
  c13: "Chama {reloadData} para aplicar o datapack já copiado.",
  c14: "Igual a {srp} sem argumentos: abre o Dashboard (equivalente explícito, útil quando há mais argumentos depois num alias).",
  permBody: "Todos os subcomandos requerem {perm} (padrão: op).",
};

export const SACKRESOURCEPACK_COPY: Record<Locale, SackResourcePackCopy> = { es, en, pt };
