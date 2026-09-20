/**
 * Datos de la página de Troubleshooting.
 *
 * `diagnostics` son síntomas con su causa probable, deducidos de datos
 * declarados en el repo (grafo de depend/softdepend, integraciones
 * documentadas) o de un aviso explícito de la página correspondiente.
 * No hay errores inventados ni logs simulados.
 *
 * `caveats` se genera a partir de los Callout de tono warning/danger que ya
 * existían repartidos en las páginas: comportamientos reales que sorprenden,
 * con enlace a la página que los explica en contexto.
 */

export interface Diagnostic {
  id: string;
  /** Lo que ve el administrador. */
  symptom: string;
  /** Causas posibles, de la más frecuente a la menos. */
  causes: string[];
  fix: string;
  /** Páginas donde está el detalle. */
  slugs: string[];
}

export const diagnostics: Diagnostic[] = [
  {
    id: "addon-no-carga",
    symptom: "Un addon no aparece en /plugins o no carga al arrancar",
    causes: [
      "Falta el core: todos los addons salvo SackResourcePack declaran depend: [RPGRoll]. Sin RPGRoll.jar en plugins/, Bukkit no carga el addon.",
      "Falta una dependencia dura propia del addon. RPGRoll-NPCs declara depend: [RPGRoll, ProtocolLib] y RPGRoll-Dungeons declara depend: [RPGRoll, RPGRoll-Mobs, RPGRoll-Guilds].",
      "Versión de Java incorrecta: el ecosistema compila contra Java 25.",
    ],
    fix: "Revisá la consola del arranque: Bukkit nombra la dependencia faltante. La lista completa de depend/softdepend por addon está en la página de Integraciones.",
    slugs: ["npcs", "dungeons"],
  },
  {
    id: "placeholders-crudos",
    symptom: "Los placeholders se muestran literales (%rpgroll_level% en vez del valor)",
    causes: [
      "PlaceholderAPI no está instalado. Es softdepend en todos los addons que lo usan: nada deja de funcionar, pero no se registra ninguna expansión.",
      "La expansión corresponde a un addon que no tenés instalado (por ejemplo %rpgrollguilds_* sin RPGRoll-Guilds).",
      "El plugin que muestra el placeholder no resuelve PlaceholderAPI en ese contexto.",
    ],
    fix: "Instalá PlaceholderAPI y el addon dueño de esa expansión. El registro completo, con la expansión y el addon de cada placeholder, está en la página de Placeholders.",
    slugs: ["jugadores"],
  },
  {
    id: "economia-conflicto",
    symptom: "Los saldos no coinciden o otro plugin pisa la economía",
    causes: [
      "Hay otro proveedor de economía instalado (EssentialsX, CMI). RPGRoll-Economy no consume Vault: se registra como proveedor del servicio Economy, así que dos proveedores compiten por el mismo servicio.",
    ],
    fix: "Dejá un solo proveedor de economía registrado en Vault. La página de Economy documenta el comportamiento del puente en detalle.",
    slugs: ["economy"],
  },
  {
    id: "npcs-invisibles",
    symptom: "Los NPCs no aparecen",
    causes: [
      "ProtocolLib no está instalado. Es la única dependencia dura de terceros del ecosistema: los NPCs son entidades simuladas por paquetes, y sin ProtocolLib el addon directamente no carga.",
    ],
    fix: "Instalá ProtocolLib como plugin real en el servidor (no sombreado dentro de un jar).",
    slugs: ["npcs"],
  },
  {
    id: "crates-sin-holograma",
    symptom: "Los crates funcionan pero no se ve el holograma",
    causes: [
      "DecentHolograms no está instalado. Es softdepend: el crate sigue respondiendo al click derecho, la ruleta y las recompensas; solo se ignoran las líneas de holograma.",
    ],
    fix: "Instalá DecentHolograms si querés las líneas flotantes, o quitalas de la configuración del crate.",
    slugs: ["crates"],
  },
  {
    id: "schematic-falla",
    symptom: "Importar un .schem a una sala de dungeon devuelve error",
    causes: [
      "WorldEdit (o FastAsyncWorldEdit) no está instalado. El origen SCHEMATIC usa su API (ClipboardHolder + EditSession) para resolver rotación y espejo.",
    ],
    fix: "Instalá WorldEdit. Sin él, ese flujo puntual devuelve un error claro y el resto de Dungeons sigue funcionando igual: podés usar Structure Blocks vanilla como origen.",
    slugs: ["dungeons"],
  },
  {
    id: "worldguard",
    symptom: "Las regiones de RPGRoll no aparecen en WorldGuard",
    causes: [
      "RPGRoll no integra con WorldGuard. Las regiones de Quests, Mobs, Seasons, Fishing y Economy son cuboides propios (AABB), no regiones de WorldGuard.",
    ],
    fix: "Usá los comandos de región del addon correspondiente. No hay import ni export entre ambos sistemas.",
    slugs: ["quests", "mobs", "seasons", "fishing", "economy"],
  },
  {
    id: "datos-perdidos",
    symptom: "Se pierden cambios recientes al reiniciar de forma abrupta",
    causes: [
      "No todo se escribe a la base de datos en el momento: las actualizaciones de combate (daño recibido, regeneración pasiva, maná gastado) se mantienen en memoria por rendimiento.",
    ],
    fix: "Detené el servidor con stop en vez de matar el proceso. El detalle de qué se persiste y cuándo está en la página de Jugadores.",
    slugs: ["jugadores", "base-de-datos"],
  },
];

export interface Caveat {
  /** Página de origen. */
  slug: string;
  tone: "warning" | "danger";
  title: string;
  body: string;
}

export const caveats: Caveat[] = [
  { slug: "jugadores", tone: "warning", title: "Rendimiento: no todo se guarda a la BD", body: "Las actualizaciones de combate (daño recibido, regeneración pasiva, maná gastado al usar una skill) solo se escriben en PlayerCache, no disparan un UPDATE a SQLite en cada golpe — eso sería un cuello de botella real en el hilo principal del servidor. La persistencia real ocurre al desconectarse (unloadPlayer) o al apagar el servidor (saveAll). Si el servidor crashea sin apagarse limpiamente, se puede perder el progreso de combate desde la última acción \"normal\" guardada (level up, cambio de raza/clase, etc)." },
  { slug: "razas-clases", tone: "warning", title: "passive-traits no se aplica solo", body: "El campo passive-traits se parsea y queda disponible en el objeto Race/ PlayerClass, pero nada en el código actual llama automáticamente a rpgPlayer.acquireTrait(...) con esos IDs al crear personaje. Si lo necesitas, es la primera extensión natural de CharacterCreationFlow.saveCharacter()." },
  { slug: "stats-combate", tone: "warning", title: "maxHealth/maxMana NO se recalculan en cada carga", body: "A propósito: si se recalcularan desde la fórmula en cada login se perdería el crecimiento acumulado por nivel. En cambio se persisten en la BD tal cual, y solo crecen explícitamente vía CombatStats.growHealth()/growMana() (level up, o al invertir un punto en Constitución/Inteligencia). armorRating/evasionChance/criticalChance sí se recalculan libremente, porque no tienen historial propio que perder." },
  { slug: "stats-combate", tone: "danger", title: "Esto es daño duplicado, en dos sistemas distintos", body: "La vida vanilla (corazones) sigue existiendo y sigue causando muerte normal a 0 HP. La salud RPG es un segundo contador independiente. Un jugador puede llegar a 0 salud RPG (y quedar debilitado) sin estar cerca de morir de verdad, o viceversa. Si quieres unificarlos, es la próxima decisión de diseño grande a tomar." },
  { slug: "habilidades-traits", tone: "warning", title: "TraitEffect existe, pero no se aplica automáticamente", body: "La estructura de datos está completa y se parsea desde YAML, pero ningún listener suma estos bonos a las stats reales del jugador cuando adquiere el trait — PlayerTraits.acquire() solo registra que el jugador \"tiene\" el trait." },
  { slug: "trabajos", tone: "warning", title: "El límite de 3 está fijo en código, no en config", body: "gameplay.yml tiene professions.max_per_player: 2, pero el sistema real de Jobs usa la constante PlayerJobs.MAX_ACTIVE_JOBS = 3 y nunca lee esa clave de config. Son dos sistemas de \"profesiones\" que no terminaron de unificarse — la config es efectivamente un residuo de un diseño anterior." },
  { slug: "progresion", tone: "warning", title: "unlocked_skills/unlocked_traits no valida que el contenido exista", body: "El levelup-rewards.yml de ejemplo referencia skills como power_strike, whirlwind y meteor_strike, y traits como warriors_resolve/arcane_master/ legend_of_old — ninguno tiene un archivo YAML real en skills//traits/ todavía. El jugador \"aprende\" el ID igual, pero /rpg use fallará con \"no existe la habilidad\" porque SkillManager no la tiene registrada. Si agregas niveles con contenido nuevo, crea también el YAML correspondiente." },
  { slug: "npcs", tone: "warning", title: "El orden de GIVE_ITEM y TAKE_ITEM importa", body: "Para que una \"compra\" funcione de verdad hacen falta dos condicionales con la misma condición: primero el que entrega el ítem, después el que cobra. Si el cobro fuera primero, el segundo condicional volvería a evaluar HAS_ITEM ya sin el oro recién descontado y nunca llegaría a entregar la espada. No hay una acción de \"transacción atómica\" — son dos chequeos independientes en secuencia." },
  { slug: "items", tone: "warning", title: "Son informativos, no bloquean nada", body: "ItemRequirementChecker solo devuelve la lista de razones incumplidas — el equipo real avisa por chat al equipar un ítem que no cumples, pero no impide equiparlo ni usarlo. El campo completed-quests ni siquiera se evalúa todavía (se parsea del YAML pero ningún código lo consulta)." },
  { slug: "encantamientos", tone: "warning", title: "No pasa por la mesa de encantar, el yunque, ni el grindstone", body: "No hay ningún listener para PrepareItemEnchantEvent, EnchantItemEvent ni PrepareAnvilEvent. Un encantamiento propio solo se aplica de dos formas: con /renchant apply|give, o programáticamente desde otro addon (así lo hace RPGRoll-Items)." },
  { slug: "encantamientos", tone: "warning", title: "apply/remove no pueden fallar por conflicto silenciosamente", body: "Si el encantamiento excede su nivel máximo, choca con uno ya presente en el ítem (vía conflicts), o el ítem no pertenece a una categoría permitida, /renchant apply responde con el motivo exacto en vez de aplicarlo a medias." },
  { slug: "quests", tone: "warning", title: "reload no recarga las regiones", body: "/questadmin reload solo recarga las misiones. Un cambio en regions/*.yml necesita reiniciar el server, o usar el editor gráfico (que sí escribe a disco al instante, aunque no fuerza un reload del resto del server)." },
  { slug: "quests", tone: "warning", title: "COMPLETE_QUEST es solo informativo", body: "Existe como tipo de acción pero no fuerza ningún progreso — solo loguea. Para completar una misión desde afuera (recompensa u otro sistema) hay que usar /questadmin complete o encadenarla vía rewards.quests." },
  { slug: "quests", tone: "warning", title: "El gancho existe, pero nada lo dispara todavía", body: "Quests escucha un evento propio NpcTalkEvent para progresar TALK_TO_NPC y DELIVER_ITEM — pensado para que cualquier sistema de NPCs lo dispare sin acoplarse a él. Al revisar el código de RPGRoll-NPCs, ningún listener llama a este evento todavía: la integración está definida de este lado, pero no conectada del otro." },
  { slug: "quests", tone: "warning", title: "Objetivos y diálogo siguen siendo solo YAML", body: "Ni el editor in-game ni el constructor visual de esta página tocan objectives, dialog ni options de una etapa — son demasiado anidados para un formulario lineal. Para el resto del juego (jugar la misión, ver diálogos, botones de rama) sigue sin haber ningún inventario/menú — todo pasa por /quest y mensajes de chat." },
  { slug: "quests", tone: "warning", title: "track no existe", body: "El plugin.yml anuncia /quest track en su texto de uso, pero el comando no tiene ese subcomando implementado — escribirlo solo te muestra el mensaje de uso." },
  { slug: "ascension", tone: "warning", title: "Cambiar de especialización borra el árbol de talentos", body: "/ascend specialize limpia por completo los talentos ya desbloqueados — no hay forma de conservarlos al cambiar de rama." },
  { slug: "ascension", tone: "warning", title: "El árbol de talentos no tiene grilla visual", body: "ClassSpecialization edita sus talentos con una línea de chat compacta ( id;nombre;costo;requiere1,requiere2;stat=val;skill;trait;encantamiento) en vez de un editor de árbol — igual que el constructor web de esta página, que directamente no lo expone y te manda a copiar un ejemplo YAML a mano para esa parte." },
  { slug: "mobs", tone: "warning", title: "El daño se resuelve un tick después", body: "Cuando un mob recibe daño, el listener ajusta el daño del evento en el momento (esquive/resistencias), pero el chequeo de transición de fase y el trigger DAMAGED se agendan para el próximo tick — recién ahí getHealth() refleja la vida ya restada por Bukkit." },
  { slug: "mobs", tone: "warning", title: "Solo verificado por compilación, no probado en juego", body: "Esta primera versión de las skins no fue probada visualmente contra un cliente real de Minecraft (sin servidor Paper disponible en el entorno de desarrollo) — la lógica de sorteo/montaje/persistencia/limpieza está completa, pero conviene probarla en un server de pruebas antes de usarla en producción." },
  { slug: "mobs", tone: "warning", title: "Sin historial, versionado ni import/export", body: "A diferencia de lo que se planteó originalmente, este editor no guarda versiones anteriores ni permite importar/exportar definiciones — cada \"Guardar\" sobreescribe el YAML en disco directamente." },
  { slug: "guilds", tone: "warning", title: "WIN_WAR no tiene motor de guerra", body: "El tipo WIN_WAR existe en el enum pero no hay ningún sistema de guerra entre guilds implementado que dispare su progreso — quedaría sin completarse nunca si la activas." },
  { slug: "crates", tone: "warning", title: "Un crate necesita al menos 1 recompensa", body: "El compacto constructor de Crate tira IllegalArgumentException si rewards está vacío — no se puede guardar (ni desde YAML ni desde el editor gráfico) un crate sin ninguna recompensa." },
  { slug: "dungeons", tone: "warning", title: "Dos dependencias duras, no soft", body: "A diferencia de casi todos los demás addons de RPGRoll, Dungeons no puede correr sin RPGRoll-Mobs (las oleadas y jefes referencian ids de MobDefinition directamente) ni sin RPGRoll-Guilds (los grupos que entran a una mazmorra se resuelven vía Team). RPGRoll-Items y RPGRoll-Quests sí son opcionales — sin ellos, ciertos tipos de loot/objetivo simplemente no hacen nada." },
  { slug: "dungeons", tone: "warning", title: "Sin BlockData — evitá materiales con orientación", body: "El pegado CUSTOM hace setType() plano, sin facing/hinge/half. Puertas, escaleras, antorchas de pared y camas van a quedar con una orientación por defecto, no la que \"debería\" tener. Los 4 ejemplos de este addon solo usan materiales sin orientación (ladrillos, antorchas de pie, cofres, glowstone) a propósito, para no depender de eso." },
  { slug: "traps", tone: "warning", title: "Sin camuflaje por-jugador", body: "El \"camuflaje\" de este addon es swap de bloque real (TOGGLE_BLOCKS/ disguise), visible igual para todos los jugadores — no hay un sistema de bloques falsos por-paquete (requeriría ProtocolLib + block-change packets, sin precedente en el repo). Igual sirve para la mayoría de los casos: una pared falsa se ve como pared normal hasta que se activa el mecanismo." },
  { slug: "magic", tone: "warning", title: "HOLD es una simulación, no un click-sostenido real", body: "Bukkit no expone un evento de \"sigues apretando click derecho\" sin escuchar paquetes de cliente — en vez de eso, al iniciarse la canalización tienes cast-time ticks para completarla quieto y sin recibir daño. Es la misma simplificación que usan la mayoría de los plugins de RPG/magia sobre Bukkit puro." },
  { slug: "seasons", tone: "warning", title: "La temperatura por bioma es una tabla propia, no un valor real de Bukkit", body: "Bukkit no expone la temperatura interna real de un bioma como un double consultable de forma estable entre versiones — Seasons mantiene su propia tabla aproximada en plugins/RPGRoll-Seasons/biome-temperatures.yml (editable), y cada estación suma un delta por bioma encima de esa base." },
  { slug: "sackresourcepack", tone: "warning", title: "Implementado según spec, no probado contra un bucket real", body: "AwsSignatureV4 sigue al pie de la letra el algoritmo documentado por AWS (canonical request, string-to-sign, clave de firma derivada, firma final), usando solo javax.crypto/ java.security del JDK — sin el SDK de AWS. Pero no hay credenciales de AWS disponibles en el entorno donde se escribió esto: probalo una vez contra tu bucket/endpoint real antes de confiar en esto en producción." },
  { slug: "sackresourcepack", tone: "warning", title: "Preview parcial, no un render real — y sin probar contra un cliente real", body: "Solo funciona con texturas (no con modelos/sonidos/fuentes), requiere que el cliente del jugador pueda alcanzar el host HTTP del plugin por red, y la imagen se distorsiona al envolverse sobre el UV de una cabeza en vez de mostrarse plana. Si el pack se sirve desde una http.public-url externa en vez del host embebido, no hay preview — el explorador cae de vuelta al ícono+lore de siempre. Tampoco se pudo verificar contra un cliente de Minecraft real en el entorno donde se escribió esto." },
  { slug: "ranching", tone: "warning", title: "Solo verificado por compilación, no probado en juego", body: "Igual que en RPGRoll-Mobs, esta primera versión del reskin no fue probada visualmente contra un cliente real (sin servidor Paper disponible en el entorno de desarrollo)." },
  { slug: "ranching", tone: "warning", title: "La 'limpieza' del diseño original no tiene equivalente real en Bukkit", body: "No existe ninguna noción de \"corral sucio\" para medir — ese factor se reemplazó por luz + agua + hacinamiento, que sí son medibles de verdad contra el mundo. Felicidad y salud alimentan directo a fertilidad y producción, así que \"un animal feliz produce más\" sigue siendo literalmente cierto." },
  { slug: "workers", tone: "warning", title: "Solo verificado por compilación, no probado en juego", body: "Igual que en Mobs/Ranching, esta primera versión del reskin no fue probada visualmente contra un cliente real de Minecraft (sin servidor Paper disponible en el entorno de desarrollo)." },
  { slug: "workers", tone: "warning", title: "El pescador NO usa FishingAPI de verdad", body: "FishingAPI.forceCatch(...) exige un Player real (lo necesita para chequear nivel vía RPGRollAPI en peces legendarios), y un worker no es un jugador. Simularlo con un jugador falso sería frágil y engañoso, así que FishingBehavior se queda con una captura vanilla simple en vez de la genética/calidad rica de RPGRoll-Fishing. Una profesión sin ningún behavior registrado sigue \"trabajando\" a efectos de horario/salario/experiencia, solo que sin ninguna interacción física real (fallback silencioso, no un error)." },
  { slug: "economy", tone: "warning", title: "El campo 'permission' no se aplica solo", body: "Está en el schema y se puede leer desde otro addon, pero WalletService no lo chequea por sí mismo antes de depositar/retirar — es un gancho para que tú (u otro sistema) lo hagas cumplir." },
  { slug: "economy", tone: "warning", title: "Solo verificado por compilación", body: "Igual que otras integraciones agregadas recientemente, esto se verificó compilando y con el motor de precio ejercitado por lógica, no probado en juego contra un servidor Paper real." },
  { slug: "economy", tone: "warning", title: "Si tienes otro plugin de economía (EssentialsX, CMI) instalado", body: "Vault deja el registro de mayor prioridad activo — con la misma prioridad, gana el que se registró último. Para que RPGRoll-Economy sea el que manda, desinstalá el otro plugin de economía o subile la prioridad acá si hace falta convivir con ambos." },
  { slug: "crafting", tone: "warning", title: "El slot de salida es de solo-extracción", body: "El jugador puede sacar el resultado terminado, pero no puede insertar ítems ahí a mano — si lo hiciera, rompería el conteo que usa el motor para saber si ya puede colocar el próximo resultado." },
  { slug: "crafting", tone: "warning", title: "Las condiciones solo se aplican en la mesa de crafteo", body: "Bukkit no ofrece un evento de \"previsualización\" para hornos/cortadora/herrería — esas 5 estaciones registran la receta igual, pero sin gating por jugador. En la mesa de crafteo, PrepareItemCraftEvent oculta el resultado si el jugador que la ve no cumple las condiciones." },
  { slug: "crafting", tone: "warning", title: "Dos condiciones siguen exigiendo al jugador conectado", body: "PERMISSION y BIOME dependen de estado que solo existe en un jugador real (su árbol de permisos, su posición) — una receta que las use no puede iniciarse con el dueño offline, y eso es correcto, no un bug." },
  { slug: "tab", tone: "warning", title: "Sobre 'Layout' y columnas", body: "El cliente vanilla decide por su cuenta en cuántas columnas mostrar el tablist (según cantidad de jugadores y tamaño de ventana) — ningún plugin de servidor puede forzar un número de columnas distinto, es puramente client-side. Lo que sí es 100% controlable es el orden (Sorting + Teams) y agrupar visualmente por rango — los \"layouts predefinidos\" (classic/ranked/guild/dungeon/...) son presets de Sorting + Teams, no una grilla arbitraria." },
  { slug: "extras", tone: "warning", title: "No confundir con un valor multiplicador directo", body: "stamina_max: 1.3 NO da 130% — da 1.0 + 1.3 = 230%. El valor correcto para \"130% del máximo\" es 0.3." },
  { slug: "api", tone: "warning", title: "get() lanza una excepción si RPGRoll no está listo", body: "RPGRollAPI.get() lanza IllegalStateException si se llama antes de que RPGRoll termine de arrancar. Si tu addon quiere integrarse de forma opcional (sin depend obligatorio), usá RPGRollAPI.isReady() para chequear en runtime antes de llamar a get()." },
  { slug: "arquitectura", tone: "warning", title: "Antes solo soportaba códigos clásicos", body: "Hasta hace poco, la mayoría de los addons construían su propio LegacyComponentSerializer.legacyAmpersand() local, que no entiende hex — cualquier &#RRGGBB o &x&R&R... se mostraba como texto literal en vez de color. Se corrigió centralizando todo en ComponentUtils, que arma el serializer con .hexColors() — ese único flag ya habilita ambos formatos hex al deserializar (el método .useUnusualXRepeatedCharacterHexFormat() solo afecta cómo se vuelve a serializar, no qué se puede leer)." },
  { slug: "arquitectura", tone: "warning", title: "Bug corregido: reopen() necesita open(), no solo build()", body: "Durante bastante tiempo, el reopen() privado de cada navegador solo llamaba a build() (redibuja el Inventory del navegador, pero ese objeto ya no es el que el jugador está viendo — está viendo el del editor). El resultado: apretar \"Volver\" no hacía nada visible, y además el click-listener seguía apuntando al editor. Se corrigió cambiando esos reopen() para que llamen a open() en vez de build() — open() sí redibuja, re-registra y vuelve a mostrar el inventario correcto. Esto se tocó en 59 archivos a lo largo de todo el ecosistema." },
  { slug: "configuracion", tone: "warning", title: "Claves marcadas con ⚠", body: "Algunas claves de gameplay.yml existen en el archivo pero el código nunca las lee — quedaron de un diseño anterior o anticipan una función no conectada todavía (ver las notas ⚠ en la tabla de gameplay.yml arriba). No asumas que cambiarlas tiene efecto sin verificar contra el código." },
];
