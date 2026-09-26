import type { Locale } from "../strings";

/**
 * Traducción de los datos de Troubleshooting.
 *
 * Los diagnósticos se indexan por su `id`. Los comportamientos se indexan por
 * "<slug>::<título en español>", que es la clave estable: el título por sí
 * solo se repite entre páginas ("Solo verificado por compilación, no probado
 * en juego" aparece en tres addons distintos).
 */
type Map_ = Record<string, string>;

/* ---------------------------------------------------------------- inglés */

const diagEn: Record<string, { symptom: string; causes: string[]; fix: string }> = {
  "addon-no-carga": {
    symptom: "An addon does not show up in /plugins or fails to load at startup",
    causes: [
      "RPGRoll-Lib is missing: every addon except SackResourcePack declares depend: [RPGRoll-Lib]. Without RPGRoll-Lib.jar in plugins/, Bukkit will not load the addon.",
      "One of the addon's own hard dependencies is missing. RPGRoll-Ascension and RPGRoll-Magic also need the core (depend: [RPGRoll-Lib, RPGRoll]) and RPGRoll-Dungeons declares depend: [RPGRoll-Lib, RPGRoll-Mobs, RPGRoll-Guilds].",
      "Wrong Java version: the ecosystem compiles against Java 25.",
    ],
    fix: "Check the startup console: Bukkit names the missing dependency. The full depend/softdepend list per addon is on the Integrations page.",
  },
  "placeholders-crudos": {
    symptom: "Placeholders show up literally (%rpgroll_level% instead of the value)",
    causes: [
      "PlaceholderAPI is not installed. It is a softdepend in every addon that uses it: nothing stops working, but no expansion gets registered.",
      "The expansion belongs to an addon you do not have installed (for example %rpgrollguilds_* without RPGRoll-Guilds).",
      "The plugin displaying the placeholder does not resolve PlaceholderAPI in that context.",
    ],
    fix: "Install PlaceholderAPI and the addon that owns that expansion. The full registry, with the expansion and addon for each placeholder, is on the Placeholders page.",
  },
  "economia-conflicto": {
    symptom: "Balances do not match, or another plugin overrides the economy",
    causes: [
      "There is another economy provider installed (EssentialsX, CMI). RPGRoll-Economy does not consume Vault: it registers as the provider of the Economy service, so two providers compete for the same service.",
    ],
    fix: "Leave a single economy provider registered in Vault. The Economy page documents the bridge behaviour in detail.",
  },
  "npcs-invisibles": {
    symptom: "NPCs do not appear",
    causes: [
      "Another plugin cancelled their spawn: WorldGuard (mob-spawning deny with block-plugin-spawning) or another anti-mob plugin. RPGRoll-NPCs undoes that cancellation for its own Mannequins at HIGHEST priority; if something still cancels it, the console warns with «✘ NPC '<id>': otro plugin canceló su aparición».",
      "The chunk is not loaded: NPCs are not saved with the world, they are created when their chunk loads and removed when it unloads.",
    ],
    fix: "Look for the ✘ NPC warning in the console and adjust the region protection or anti-mob plugin for that world. ProtocolLib is no longer needed: NPCs are native server Mannequins.",
  },
  "crates-sin-holograma": {
    symptom: "Crates work but the hologram is missing",
    causes: [
      "DecentHolograms is not installed. It is a softdepend: the crate still responds to right click, the roulette and the rewards; only the hologram lines are ignored.",
    ],
    fix: "Install DecentHolograms if you want the floating lines, or remove them from the crate configuration.",
  },
  "schematic-falla": {
    symptom: "Importing a .schem into a dungeon room returns an error",
    causes: [
      "WorldEdit (or FastAsyncWorldEdit) is not installed. The SCHEMATIC source uses its API (ClipboardHolder + EditSession) to resolve rotation and mirroring.",
    ],
    fix: "Install WorldEdit. Without it that one flow returns a clear error and the rest of Dungeons keeps working: you can use vanilla Structure Blocks as a source.",
  },
  worldguard: {
    symptom: "RPGRoll regions do not show up in WorldGuard",
    causes: [
      "RPGRoll does not integrate with WorldGuard. The regions in Quests, Mobs, Seasons, Fishing and Economy are their own cuboids (AABB), not WorldGuard regions.",
    ],
    fix: "Use the region commands of the relevant addon. There is no import or export between the two systems.",
  },
  "datos-perdidos": {
    symptom: "Recent changes are lost after an abrupt restart",
    causes: [
      "Not everything is written to the database immediately: combat updates (damage taken, passive regeneration, mana spent) are kept in memory for performance.",
    ],
    fix: "Stop the server with stop instead of killing the process. The detail of what gets persisted and when is on the Players page.",
  },
};

const caveatTitlesEn: Map_ = {
  "jugadores::Rendimiento: no todo se guarda a la BD": "Performance: not everything is written to the DB",
  "razas-clases::passive-traits no se aplica solo": "passive-traits is not applied on its own",
  "stats-combate::maxHealth/maxMana NO se recalculan en cada carga":
    "maxHealth/maxMana are NOT recalculated on every load",
  "stats-combate::Esto es daño duplicado, en dos sistemas distintos":
    "This is duplicated damage, across two separate systems",
  "habilidades-traits::TraitEffect existe, pero no se aplica automáticamente":
    "TraitEffect exists, but is not applied automatically",
  "trabajos::El límite de 3 está fijo en código, no en config":
    "The limit of 3 is hardcoded, not configurable",
  "progresion::unlocked_skills/unlocked_traits no valida que el contenido exista":
    "unlocked_skills/unlocked_traits does not validate that the content exists",
  "npcs::El orden de GIVE_ITEM y TAKE_ITEM importa": "The order of GIVE_ITEM and TAKE_ITEM matters",
  "items::Son informativos, no bloquean nada": "They are informational; they block nothing",
  "encantamientos::No pasa por la mesa de encantar, el yunque, ni el grindstone":
    "It does not go through the enchanting table, the anvil or the grindstone",
  "encantamientos::apply/remove no pueden fallar por conflicto silenciosamente":
    "apply/remove cannot fail silently on a conflict",
  "quests::reload no recarga las regiones": "reload does not reload the regions",
  "quests::COMPLETE_QUEST es solo informativo": "COMPLETE_QUEST is informational only",
  "quests::El gancho existe, pero nada lo dispara todavía": "The hook exists, but nothing fires it yet",
  "quests::Objetivos y diálogo siguen siendo solo YAML": "Objectives and dialogue are still YAML-only",
  "quests::track no existe": "track does not exist",
  "ascension::Cambiar de especialización borra el árbol de talentos":
    "Changing specialization wipes the talent tree",
  "ascension::El árbol de talentos no tiene grilla visual": "The talent tree has no visual grid",
  "mobs::El daño se resuelve un tick después": "Damage resolves one tick later",
  "mobs::Solo verificado por compilación, no probado en juego":
    "Verified by compilation only, never tested in game",
  "mobs::Sin historial, versionado ni import/export": "No history, versioning or import/export",
  "guilds::WIN_WAR no tiene motor de guerra": "WIN_WAR has no war engine behind it",
  "crates::Un crate necesita al menos 1 recompensa": "A crate needs at least 1 reward",
  "dungeons::Dos dependencias duras, no soft": "Two hard dependencies, not soft ones",
  "dungeons::Sin BlockData — evitá materiales con orientación":
    "No BlockData — avoid materials with orientation",
  "traps::Sin camuflaje por-jugador": "No per-player camouflage",
  "magic::HOLD es una simulación, no un click-sostenido real":
    "HOLD is a simulation, not a real held click",
  "seasons::La temperatura por bioma es una tabla propia, no un valor real de Bukkit":
    "Per-biome temperature is our own table, not a real Bukkit value",
  "sackresourcepack::Implementado según spec, no probado contra un bucket real":
    "Implemented to spec, never tested against a real bucket",
  "sackresourcepack::Preview parcial, no un render real — y sin probar contra un cliente real":
    "Partial preview, not a real render — and untested against a real client",
  "ranching::Solo verificado por compilación, no probado en juego":
    "Verified by compilation only, never tested in game",
  "ranching::La 'limpieza' del diseño original no tiene equivalente real en Bukkit":
    "The original design's 'cleanliness' has no real equivalent in Bukkit",
  "workers::Solo verificado por compilación, no probado en juego":
    "Verified by compilation only, never tested in game",
  "workers::El pescador NO usa FishingAPI de verdad": "The fisherman does NOT really use FishingAPI",
  "economy::El campo 'permission' no se aplica solo": "The 'permission' field is not enforced on its own",
  "economy::Solo verificado por compilación": "Verified by compilation only",
  "economy::Si tienes otro plugin de economía (EssentialsX, CMI) instalado":
    "If you have another economy plugin (EssentialsX, CMI) installed",
  "crafting::El slot de salida es de solo-extracción": "The output slot is extract-only",
  "crafting::Las condiciones solo se aplican en la mesa de crafteo":
    "Conditions only apply at the crafting table",
  "crafting::Dos condiciones siguen exigiendo al jugador conectado":
    "Two conditions still require the player to be online",
  "tab::Sobre 'Layout' y columnas": "About 'Layout' and columns",
  "extras::No confundir con un valor multiplicador directo":
    "Do not mistake it for a direct multiplier value",
  "api::get() lanza una excepción si RPGRoll no está listo":
    "get() throws if RPGRoll is not ready",
  "arquitectura::Antes solo soportaba códigos clásicos": "It used to support classic codes only",
  "arquitectura::Bug corregido: reopen() necesita open(), no solo build()":
    "Fixed bug: reopen() needs open(), not just build()",
  "configuracion::Claves marcadas con ⚠": "Keys marked with ⚠",
};

const caveatBodiesEn: Map_ = {
  "jugadores::Rendimiento: no todo se guarda a la BD":
    "Combat updates (damage taken, passive regeneration, mana spent on a skill) are only written to PlayerCache; they do not fire an UPDATE to SQLite on every hit — that would be a real bottleneck on the server's main thread. Actual persistence happens on disconnect (unloadPlayer) or on shutdown (saveAll). If the server crashes without shutting down cleanly, combat progress since the last \"normal\" save (level up, race/class change, etc.) can be lost.",
  "razas-clases::passive-traits no se aplica solo":
    "The passive-traits field is parsed and available on the Race/PlayerClass object, but nothing in the current code automatically calls rpgPlayer.acquireTrait(...) with those IDs at character creation. If you need it, that is the natural first extension of CharacterCreationFlow.saveCharacter().",
  "stats-combate::maxHealth/maxMana NO se recalculan en cada carga":
    "On purpose: recalculating them from the formula on every login would lose the growth accumulated per level. Instead they are persisted in the DB as-is, and only grow explicitly via CombatStats.growHealth()/growMana() (level up, or investing a point in Constitution/Intelligence). armorRating/evasionChance/criticalChance are freely recalculated, because they have no history of their own to lose.",
  "stats-combate::Esto es daño duplicado, en dos sistemas distintos":
    "Vanilla health (hearts) still exists and still causes normal death at 0 HP. RPG health is a second, independent counter. A player can reach 0 RPG health (and be weakened) without being anywhere near actual death, or the other way around. Unifying them is the next big design decision to make.",
  "habilidades-traits::TraitEffect existe, pero no se aplica automáticamente":
    "The data structure is complete and parses from YAML, but no listener adds these bonuses to the player's real stats when the trait is acquired — PlayerTraits.acquire() only records that the player \"has\" the trait.",
  "trabajos::El límite de 3 está fijo en código, no en config":
    "gameplay.yml has professions.max_per_player: 2, but the real Jobs system uses the constant PlayerJobs.MAX_ACTIVE_JOBS = 3 and never reads that config key. They are two \"profession\" systems that were never fully unified — the config is effectively a leftover from an earlier design.",
  "progresion::unlocked_skills/unlocked_traits no valida que el contenido exista":
    "The example levelup-rewards.yml references skills like power_strike, whirlwind and meteor_strike, and traits like warriors_resolve/arcane_master/legend_of_old — none of which have a real YAML file under skills/ or traits/ yet. The player \"learns\" the ID anyway, but /rpg use will fail with \"skill does not exist\" because SkillManager has not registered it. If you add levels with new content, create the matching YAML too.",
  "npcs::El orden de GIVE_ITEM y TAKE_ITEM importa":
    "For a \"purchase\" to actually work you need two conditionals with the same condition: first the one that hands over the item, then the one that charges. If charging came first, the second conditional would re-evaluate HAS_ITEM without the gold just deducted and would never hand over the sword. There is no \"atomic transaction\" action — they are two independent checks in sequence.",
  "items::Son informativos, no bloquean nada":
    "ItemRequirementChecker only returns the list of unmet reasons — the real gear warns in chat when you equip an item whose requirements you do not meet, but it does not stop you from equipping or using it. The completed-quests field is not even evaluated yet (it parses from YAML but no code reads it).",
  "encantamientos::No pasa por la mesa de encantar, el yunque, ni el grindstone":
    "There is no listener for PrepareItemEnchantEvent, EnchantItemEvent or PrepareAnvilEvent. A custom enchantment is applied in only two ways: with /renchant apply|give, or programmatically from another addon (which is how RPGRoll-Items does it).",
  "encantamientos::apply/remove no pueden fallar por conflicto silenciosamente":
    "If the enchantment exceeds its maximum level, clashes with one already on the item (via conflicts), or the item is not in an allowed category, /renchant apply responds with the exact reason instead of applying it halfway.",
  "quests::reload no recarga las regiones":
    "/questadmin reload only reloads the quests. A change in regions/*.yml needs a server restart, or the graphical editor (which does write to disk immediately, though it does not force a reload of the rest of the server).",
  "quests::COMPLETE_QUEST es solo informativo":
    "It exists as an action type but forces no progress — it only logs. To complete a quest from outside (a reward or another system) you have to use /questadmin complete or chain it via rewards.quests.",
  "quests::El gancho existe, pero nada lo dispara todavía":
    "Quests listens for its own NpcTalkEvent to progress TALK_TO_NPC and DELIVER_ITEM — designed so any NPC system can fire it without coupling to it. Reviewing the RPGRoll-NPCs code, no listener calls this event yet: the integration is defined on this side, but not wired on the other.",
  "quests::Objetivos y diálogo siguen siendo solo YAML":
    "Neither the in-game editor nor the visual builder on this page touch a stage's objectives, dialog or options — they are too deeply nested for a linear form. For the rest of the game (playing the quest, seeing dialogue, branch buttons) there is still no inventory/menu — everything goes through /quest and chat messages.",
  "quests::track no existe":
    "plugin.yml advertises /quest track in its usage text, but the command has no such subcommand implemented — typing it only shows you the usage message.",
  "ascension::Cambiar de especialización borra el árbol de talentos":
    "/ascend specialize completely clears the talents already unlocked — there is no way to keep them when switching branch.",
  "ascension::El árbol de talentos no tiene grilla visual":
    "ClassSpecialization edits its talents with a compact chat line (id;name;cost;requires1,requires2;stat=val;skill;trait;enchantment) instead of a tree editor — same as the web builder on this page, which does not expose it at all and sends you to copy a YAML example by hand for that part.",
  "mobs::El daño se resuelve un tick después":
    "When a mob takes damage, the listener adjusts the event's damage right away (dodge/resistances), but the phase transition check and the DAMAGED trigger are scheduled for the next tick — only then does getHealth() reflect the health Bukkit already subtracted.",
  "mobs::Solo verificado por compilación, no probado en juego":
    "This first version of the skins was never tested visually against a real Minecraft client (no Paper server available in the development environment) — the roll/assembly/persistence/cleanup logic is complete, but test it on a staging server before using it in production.",
  "mobs::Sin historial, versionado ni import/export":
    "Unlike what was originally proposed, this editor does not keep previous versions nor allow importing/exporting definitions — every \"Save\" overwrites the YAML on disk directly.",
  "guilds::WIN_WAR no tiene motor de guerra":
    "The WIN_WAR type exists in the enum but there is no guild war system implemented to drive its progress — it would simply never complete if you enable it.",
  "crates::Un crate necesita al menos 1 recompensa":
    "The compact Crate constructor throws IllegalArgumentException if rewards is empty — you cannot save a crate with no rewards at all (neither from YAML nor from the graphical editor).",
  "dungeons::Dos dependencias duras, no soft":
    "Unlike almost every other RPGRoll addon, Dungeons cannot run without RPGRoll-Mobs (waves and bosses reference MobDefinition ids directly) nor without RPGRoll-Guilds (the groups entering a dungeon are resolved through Team). RPGRoll-Items and RPGRoll-Quests are optional — without them, certain loot/objective types simply do nothing.",
  "dungeons::Sin BlockData — evitá materiales con orientación":
    "CUSTOM pasting does a flat setType(), with no facing/hinge/half. Doors, stairs, wall torches and beds will end up with a default orientation, not the one they \"should\" have. The 4 examples in this addon deliberately use only orientation-free materials (bricks, standing torches, chests, glowstone) so as not to depend on it.",
  "traps::Sin camuflaje por-jugador":
    "This addon's \"camouflage\" is a real block swap (TOGGLE_BLOCKS/disguise), equally visible to every player — there is no per-packet fake-block system (that would require ProtocolLib + block-change packets, with no precedent in the repo). It still covers most cases: a fake wall looks like a normal wall until the mechanism triggers.",
  "magic::HOLD es una simulación, no un click-sostenido real":
    "Bukkit does not expose a \"you are still holding right click\" event without listening to client packets — instead, once channeling starts you have cast-time ticks to complete it standing still and without taking damage. It is the same simplification most RPG/magic plugins make on plain Bukkit.",
  "seasons::La temperatura por bioma es una tabla propia, no un valor real de Bukkit":
    "Bukkit does not expose a biome's real internal temperature as a double that is stable across versions — Seasons keeps its own approximate table in plugins/RPGRoll-Seasons/biome-temperatures.yml (editable), and each season adds a per-biome delta on top of that base.",
  "sackresourcepack::Implementado según spec, no probado contra un bucket real":
    "AwsSignatureV4 follows the algorithm documented by AWS to the letter (canonical request, string-to-sign, derived signing key, final signature), using only javax.crypto/java.security from the JDK — no AWS SDK. But there were no AWS credentials available in the environment where this was written: test it once against your real bucket/endpoint before trusting it in production.",
  "sackresourcepack::Preview parcial, no un render real — y sin probar contra un cliente real":
    "It only works with textures (not models/sounds/fonts), requires the player's client to be able to reach the plugin's HTTP host over the network, and the image is distorted by being wrapped onto a head's UV instead of shown flat. If the pack is served from an external http.public-url instead of the embedded host, there is no preview — the browser falls back to the usual icon+lore. It also could not be verified against a real Minecraft client in the environment where this was written.",
  "ranching::Solo verificado por compilación, no probado en juego":
    "As in RPGRoll-Mobs, this first version of the reskin was never tested visually against a real client (no Paper server available in the development environment).",
  "ranching::La 'limpieza' del diseño original no tiene equivalente real en Bukkit":
    "There is no notion of a \"dirty pen\" to measure — that factor was replaced by light + water + crowding, which really are measurable against the world. Happiness and health feed straight into fertility and production, so \"a happy animal produces more\" remains literally true.",
  "workers::Solo verificado por compilación, no probado en juego":
    "As in Mobs/Ranching, this first version of the reskin was never tested visually against a real Minecraft client (no Paper server available in the development environment).",
  "workers::El pescador NO usa FishingAPI de verdad":
    "FishingAPI.forceCatch(...) demands a real Player (it needs one to check level via RPGRollAPI on legendary fish), and a worker is not a player. Faking it with a dummy player would be fragile and misleading, so FishingBehavior settles for a simple vanilla catch instead of RPGRoll-Fishing's rich genetics/quality. A profession with no behavior registered still \"works\" for schedule/wage/experience purposes, just without any real physical interaction (silent fallback, not an error).",
  "economy::El campo 'permission' no se aplica solo":
    "It is in the schema and can be read from another addon, but WalletService does not check it by itself before depositing/withdrawing — it is a hook for you (or another system) to enforce.",
  "economy::Solo verificado por compilación":
    "As with other recently added integrations, this was verified by compiling and by exercising the pricing engine through logic, not tested in game against a real Paper server.",
  "economy::Si tienes otro plugin de economía (EssentialsX, CMI) instalado":
    "Vault keeps the highest-priority registration active — at equal priority, the last one registered wins. For RPGRoll-Economy to be the one in charge, uninstall the other economy plugin or raise its priority here if you need both to coexist.",
  "crafting::El slot de salida es de solo-extracción":
    "The player can take the finished result out, but cannot insert items there by hand — doing so would break the count the engine uses to decide whether it can place the next result.",
  "crafting::Las condiciones solo se aplican en la mesa de crafteo":
    "Bukkit offers no \"preview\" event for furnaces/stonecutter/smithing — those 5 stations register the recipe all the same, but with no per-player gating. At the crafting table, PrepareItemCraftEvent hides the result if the player looking at it does not meet the conditions.",
  "crafting::Dos condiciones siguen exigiendo al jugador conectado":
    "PERMISSION and BIOME depend on state that only exists on a real player (their permission tree, their position) — a recipe using them cannot be started with the owner offline, and that is correct, not a bug.",
  "tab::Sobre 'Layout' y columnas":
    "The vanilla client decides on its own how many columns to show the tablist in (based on player count and window size) — no server plugin can force a different column count, it is purely client-side. What is 100% controllable is the order (Sorting + Teams) and grouping visually by rank — the \"predefined layouts\" (classic/ranked/guild/dungeon/…) are Sorting + Teams presets, not an arbitrary grid.",
  "extras::No confundir con un valor multiplicador directo":
    "stamina_max: 1.3 does NOT give 130% — it gives 1.0 + 1.3 = 230%. The correct value for \"130% of the maximum\" is 0.3.",
  "api::get() lanza una excepción si RPGRoll no está listo":
    "RPGRollAPI.get() throws IllegalStateException if called before RPGRoll has finished starting up. If your addon wants to integrate optionally (with no mandatory depend), use RPGRollAPI.isReady() to check at runtime before calling get().",
  "arquitectura::Antes solo soportaba códigos clásicos":
    "Until recently, most addons built their own local LegacyComponentSerializer.legacyAmpersand(), which does not understand hex — any &#RRGGBB or &x&R&R… was shown as literal text instead of colour. It was fixed by centralising everything in ComponentUtils, which builds the serializer with .hexColors() — that single flag already enables both hex formats when deserializing (the .useUnusualXRepeatedCharacterHexFormat() method only affects how it is serialized back, not what can be read).",
  "arquitectura::Bug corregido: reopen() necesita open(), no solo build()":
    "For quite a while, each browser's private reopen() only called build() (which redraws the browser's Inventory, but that object is no longer the one the player is looking at — they are looking at the editor's). The result: pressing \"Back\" did nothing visible, and the click listener still pointed at the editor. It was fixed by changing those reopen() calls to use open() instead of build() — open() does redraw, re-register and show the right inventory again. This was touched in 59 files across the whole ecosystem.",
  "configuracion::Claves marcadas con ⚠":
    "Some gameplay.yml keys exist in the file but the code never reads them — they are left over from an earlier design or anticipate a feature that is not wired up yet (see the ⚠ notes in the gameplay.yml table above). Do not assume changing them has any effect without checking against the code.",
};

/* ------------------------------------------------------------- portugués */

const diagPt: Record<string, { symptom: string; causes: string[]; fix: string }> = {
  "addon-no-carga": {
    symptom: "Um addon não aparece em /plugins ou não carrega ao iniciar",
    causes: [
      "Falta o RPGRoll-Lib: todos os addons exceto SackResourcePack declaram depend: [RPGRoll-Lib]. Sem RPGRoll-Lib.jar em plugins/, o Bukkit não carrega o addon.",
      "Falta uma dependência dura do próprio addon. RPGRoll-Ascension e RPGRoll-Magic precisam também do núcleo (depend: [RPGRoll-Lib, RPGRoll]) e RPGRoll-Dungeons declara depend: [RPGRoll-Lib, RPGRoll-Mobs, RPGRoll-Guilds].",
      "Versão de Java incorreta: o ecossistema compila contra Java 25.",
    ],
    fix: "Verifique o console da inicialização: o Bukkit nomeia a dependência faltante. A lista completa de depend/softdepend por addon está na página de Integrações.",
  },
  "placeholders-crudos": {
    symptom: "Os placeholders aparecem literais (%rpgroll_level% em vez do valor)",
    causes: [
      "O PlaceholderAPI não está instalado. É softdepend em todos os addons que o usam: nada deixa de funcionar, mas nenhuma expansão é registrada.",
      "A expansão pertence a um addon que você não tem instalado (por exemplo %rpgrollguilds_* sem RPGRoll-Guilds).",
      "O plugin que exibe o placeholder não resolve o PlaceholderAPI nesse contexto.",
    ],
    fix: "Instale o PlaceholderAPI e o addon dono dessa expansão. O registro completo, com a expansão e o addon de cada placeholder, está na página de Placeholders.",
  },
  "economia-conflicto": {
    symptom: "Os saldos não batem ou outro plugin atropela a economia",
    causes: [
      "Há outro provedor de economia instalado (EssentialsX, CMI). O RPGRoll-Economy não consome o Vault: registra-se como provedor do serviço Economy, então dois provedores competem pelo mesmo serviço.",
    ],
    fix: "Deixe um único provedor de economia registrado no Vault. A página de Economy documenta o comportamento da ponte em detalhe.",
  },
  "npcs-invisibles": {
    symptom: "Os NPCs não aparecem",
    causes: [
      "Outro plugin cancelou o seu surgimento: WorldGuard (mob-spawning deny com block-plugin-spawning) ou outro anti-mobs. O RPGRoll-NPCs desfaz esse cancelamento para os seus próprios Mannequins com prioridade HIGHEST; se mesmo assim algo o cancelar, o console avisa com «✘ NPC '<id>': otro plugin canceló su aparición».",
      "O chunk não está carregado: os NPCs não são salvos com o mundo, são criados quando o chunk carrega e somem quando ele descarrega.",
    ],
    fix: "Procure o aviso ✘ NPC no console e ajuste a proteção de região ou o anti-mobs desse mundo. O ProtocolLib não é mais necessário: os NPCs são Mannequins nativos do servidor.",
  },
  "crates-sin-holograma": {
    symptom: "Os crates funcionam mas o holograma não aparece",
    causes: [
      "O DecentHolograms não está instalado. É softdepend: o crate continua respondendo ao clique direito, à roleta e às recompensas; só as linhas de holograma são ignoradas.",
    ],
    fix: "Instale o DecentHolograms se quiser as linhas flutuantes, ou remova-as da configuração do crate.",
  },
  "schematic-falla": {
    symptom: "Importar um .schem para uma sala de masmorra devolve erro",
    causes: [
      "O WorldEdit (ou FastAsyncWorldEdit) não está instalado. A origem SCHEMATIC usa a sua API (ClipboardHolder + EditSession) para resolver rotação e espelhamento.",
    ],
    fix: "Instale o WorldEdit. Sem ele esse fluxo específico devolve um erro claro e o resto do Dungeons continua funcionando: você pode usar Structure Blocks vanilla como origem.",
  },
  worldguard: {
    symptom: "As regiões do RPGRoll não aparecem no WorldGuard",
    causes: [
      "O RPGRoll não integra com o WorldGuard. As regiões de Quests, Mobs, Seasons, Fishing e Economy são cuboides próprios (AABB), não regiões do WorldGuard.",
    ],
    fix: "Use os comandos de região do addon correspondente. Não há import nem export entre os dois sistemas.",
  },
  "datos-perdidos": {
    symptom: "Mudanças recentes se perdem após um reinício abrupto",
    causes: [
      "Nem tudo é escrito no banco de dados na hora: as atualizações de combate (dano recebido, regeneração passiva, mana gasta) ficam em memória por desempenho.",
    ],
    fix: "Pare o servidor com stop em vez de matar o processo. O detalhe do que é persistido e quando está na página de Jogadores.",
  },
};

const caveatTitlesPt: Map_ = {
  "jugadores::Rendimiento: no todo se guarda a la BD": "Desempenho: nem tudo é salvo no banco",
  "razas-clases::passive-traits no se aplica solo": "passive-traits não se aplica sozinho",
  "stats-combate::maxHealth/maxMana NO se recalculan en cada carga":
    "maxHealth/maxMana NÃO são recalculados a cada carregamento",
  "stats-combate::Esto es daño duplicado, en dos sistemas distintos":
    "Isto é dano duplicado, em dois sistemas distintos",
  "habilidades-traits::TraitEffect existe, pero no se aplica automáticamente":
    "TraitEffect existe, mas não é aplicado automaticamente",
  "trabajos::El límite de 3 está fijo en código, no en config":
    "O limite de 3 está fixo no código, não na config",
  "progresion::unlocked_skills/unlocked_traits no valida que el contenido exista":
    "unlocked_skills/unlocked_traits não valida se o conteúdo existe",
  "npcs::El orden de GIVE_ITEM y TAKE_ITEM importa": "A ordem de GIVE_ITEM e TAKE_ITEM importa",
  "items::Son informativos, no bloquean nada": "São informativos, não bloqueiam nada",
  "encantamientos::No pasa por la mesa de encantar, el yunque, ni el grindstone":
    "Não passa pela mesa de encantamento, bigorna nem grindstone",
  "encantamientos::apply/remove no pueden fallar por conflicto silenciosamente":
    "apply/remove não podem falhar por conflito em silêncio",
  "quests::reload no recarga las regiones": "reload não recarrega as regiões",
  "quests::COMPLETE_QUEST es solo informativo": "COMPLETE_QUEST é apenas informativo",
  "quests::El gancho existe, pero nada lo dispara todavía": "O gancho existe, mas nada o dispara ainda",
  "quests::Objetivos y diálogo siguen siendo solo YAML": "Objetivos e diálogo continuam só em YAML",
  "quests::track no existe": "track não existe",
  "ascension::Cambiar de especialización borra el árbol de talentos":
    "Trocar de especialização apaga a árvore de talentos",
  "ascension::El árbol de talentos no tiene grilla visual": "A árvore de talentos não tem grade visual",
  "mobs::El daño se resuelve un tick después": "O dano é resolvido um tick depois",
  "mobs::Solo verificado por compilación, no probado en juego":
    "Verificado só por compilação, não testado em jogo",
  "mobs::Sin historial, versionado ni import/export": "Sem histórico, versionamento nem import/export",
  "guilds::WIN_WAR no tiene motor de guerra": "WIN_WAR não tem motor de guerra",
  "crates::Un crate necesita al menos 1 recompensa": "Um crate precisa de pelo menos 1 recompensa",
  "dungeons::Dos dependencias duras, no soft": "Duas dependências duras, não soft",
  "dungeons::Sin BlockData — evitá materiales con orientación":
    "Sem BlockData — evite materiais com orientação",
  "traps::Sin camuflaje por-jugador": "Sem camuflagem por jogador",
  "magic::HOLD es una simulación, no un click-sostenido real":
    "HOLD é uma simulação, não um clique sustentado real",
  "seasons::La temperatura por bioma es una tabla propia, no un valor real de Bukkit":
    "A temperatura por bioma é uma tabela própria, não um valor real do Bukkit",
  "sackresourcepack::Implementado según spec, no probado contra un bucket real":
    "Implementado conforme a spec, não testado contra um bucket real",
  "sackresourcepack::Preview parcial, no un render real — y sin probar contra un cliente real":
    "Preview parcial, não um render real — e sem teste contra um cliente real",
  "ranching::Solo verificado por compilación, no probado en juego":
    "Verificado só por compilação, não testado em jogo",
  "ranching::La 'limpieza' del diseño original no tiene equivalente real en Bukkit":
    "A 'limpeza' do design original não tem equivalente real no Bukkit",
  "workers::Solo verificado por compilación, no probado en juego":
    "Verificado só por compilação, não testado em jogo",
  "workers::El pescador NO usa FishingAPI de verdad": "O pescador NÃO usa a FishingAPI de verdade",
  "economy::El campo 'permission' no se aplica solo": "O campo 'permission' não é aplicado sozinho",
  "economy::Solo verificado por compilación": "Verificado só por compilação",
  "economy::Si tienes otro plugin de economía (EssentialsX, CMI) instalado":
    "Se você tem outro plugin de economia (EssentialsX, CMI) instalado",
  "crafting::El slot de salida es de solo-extracción": "O slot de saída é só de extração",
  "crafting::Las condiciones solo se aplican en la mesa de crafteo":
    "As condições só se aplicam na mesa de crafting",
  "crafting::Dos condiciones siguen exigiendo al jugador conectado":
    "Duas condições ainda exigem o jogador conectado",
  "tab::Sobre 'Layout' y columnas": "Sobre 'Layout' e colunas",
  "extras::No confundir con un valor multiplicador directo":
    "Não confunda com um valor multiplicador direto",
  "api::get() lanza una excepción si RPGRoll no está listo":
    "get() lança uma exceção se o RPGRoll não estiver pronto",
  "arquitectura::Antes solo soportaba códigos clásicos": "Antes só suportava códigos clássicos",
  "arquitectura::Bug corregido: reopen() necesita open(), no solo build()":
    "Bug corrigido: reopen() precisa de open(), não só build()",
  "configuracion::Claves marcadas con ⚠": "Chaves marcadas com ⚠",
};

const caveatBodiesPt: Map_ = {
  "jugadores::Rendimiento: no todo se guarda a la BD":
    "As atualizações de combate (dano recebido, regeneração passiva, mana gasta ao usar uma skill) só são escritas no PlayerCache; não disparam um UPDATE no SQLite a cada golpe — isso seria um gargalo real na thread principal do servidor. A persistência real ocorre ao desconectar (unloadPlayer) ou ao desligar o servidor (saveAll). Se o servidor cair sem desligar corretamente, pode-se perder o progresso de combate desde a última ação \"normal\" salva (level up, troca de raça/classe, etc.).",
  "razas-clases::passive-traits no se aplica solo":
    "O campo passive-traits é parseado e fica disponível no objeto Race/PlayerClass, mas nada no código atual chama automaticamente rpgPlayer.acquireTrait(...) com esses IDs ao criar o personagem. Se você precisar, é a primeira extensão natural de CharacterCreationFlow.saveCharacter().",
  "stats-combate::maxHealth/maxMana NO se recalculan en cada carga":
    "De propósito: se fossem recalculados pela fórmula a cada login, perderia-se o crescimento acumulado por nível. Em vez disso são persistidos no banco como estão, e só crescem explicitamente via CombatStats.growHealth()/growMana() (level up, ou ao investir um ponto em Constituição/Inteligência). armorRating/evasionChance/criticalChance são recalculados livremente, porque não têm histórico próprio a perder.",
  "stats-combate::Esto es daño duplicado, en dos sistemas distintos":
    "A vida vanilla (corações) continua existindo e continua causando morte normal a 0 HP. A vida RPG é um segundo contador independente. Um jogador pode chegar a 0 de vida RPG (e ficar enfraquecido) sem estar perto de morrer de verdade, ou vice-versa. Unificá-los é a próxima grande decisão de design a tomar.",
  "habilidades-traits::TraitEffect existe, pero no se aplica automáticamente":
    "A estrutura de dados está completa e é parseada do YAML, mas nenhum listener soma esses bônus aos stats reais do jogador quando ele adquire o trait — PlayerTraits.acquire() só registra que o jogador \"tem\" o trait.",
  "trabajos::El límite de 3 está fijo en código, no en config":
    "O gameplay.yml tem professions.max_per_player: 2, mas o sistema real de Jobs usa a constante PlayerJobs.MAX_ACTIVE_JOBS = 3 e nunca lê essa chave de config. São dois sistemas de \"profissões\" que nunca foram totalmente unificados — a config é efetivamente um resíduo de um design anterior.",
  "progresion::unlocked_skills/unlocked_traits no valida que el contenido exista":
    "O levelup-rewards.yml de exemplo referencia skills como power_strike, whirlwind e meteor_strike, e traits como warriors_resolve/arcane_master/legend_of_old — nenhum deles tem um arquivo YAML real em skills/ ou traits/ ainda. O jogador \"aprende\" o ID mesmo assim, mas /rpg use vai falhar com \"a habilidade não existe\" porque o SkillManager não a registrou. Se você adicionar níveis com conteúdo novo, crie também o YAML correspondente.",
  "npcs::El orden de GIVE_ITEM y TAKE_ITEM importa":
    "Para que uma \"compra\" funcione de verdade são necessários dois condicionais com a mesma condição: primeiro o que entrega o item, depois o que cobra. Se a cobrança viesse primeiro, o segundo condicional reavaliaria HAS_ITEM já sem o ouro recém-descontado e nunca chegaria a entregar a espada. Não há uma ação de \"transação atômica\" — são duas verificações independentes em sequência.",
  "items::Son informativos, no bloquean nada":
    "O ItemRequirementChecker só devolve a lista de motivos não cumpridos — o equipamento real avisa no chat ao equipar um item cujos requisitos você não cumpre, mas não impede equipá-lo nem usá-lo. O campo completed-quests nem sequer é avaliado ainda (é parseado do YAML mas nenhum código o consulta).",
  "encantamientos::No pasa por la mesa de encantar, el yunque, ni el grindstone":
    "Não há nenhum listener para PrepareItemEnchantEvent, EnchantItemEvent nem PrepareAnvilEvent. Um encantamento próprio só é aplicado de duas formas: com /renchant apply|give, ou programaticamente a partir de outro addon (é assim que o RPGRoll-Items faz).",
  "encantamientos::apply/remove no pueden fallar por conflicto silenciosamente":
    "Se o encantamento exceder o seu nível máximo, conflitar com um já presente no item (via conflicts), ou o item não pertencer a uma categoria permitida, /renchant apply responde com o motivo exato em vez de aplicá-lo pela metade.",
  "quests::reload no recarga las regiones":
    "/questadmin reload só recarrega as missões. Uma mudança em regions/*.yml exige reiniciar o servidor, ou usar o editor gráfico (que escreve em disco na hora, embora não force um reload do resto do servidor).",
  "quests::COMPLETE_QUEST es solo informativo":
    "Existe como tipo de ação mas não força nenhum progresso — só registra no log. Para completar uma missão de fora (recompensa ou outro sistema) é preciso usar /questadmin complete ou encadeá-la via rewards.quests.",
  "quests::El gancho existe, pero nada lo dispara todavía":
    "O Quests escuta um evento próprio NpcTalkEvent para progredir TALK_TO_NPC e DELIVER_ITEM — pensado para que qualquer sistema de NPCs o dispare sem se acoplar a ele. Ao revisar o código do RPGRoll-NPCs, nenhum listener chama esse evento ainda: a integração está definida deste lado, mas não conectada do outro.",
  "quests::Objetivos y diálogo siguen siendo solo YAML":
    "Nem o editor in-game nem o construtor visual desta página tocam em objectives, dialog ou options de uma etapa — são aninhados demais para um formulário linear. Para o resto do jogo (jogar a missão, ver diálogos, botões de ramificação) continua não havendo nenhum inventário/menu — tudo passa por /quest e mensagens de chat.",
  "quests::track no existe":
    "O plugin.yml anuncia /quest track no seu texto de uso, mas o comando não tem esse subcomando implementado — digitá-lo só mostra a mensagem de uso.",
  "ascension::Cambiar de especialización borra el árbol de talentos":
    "/ascend specialize limpa completamente os talentos já desbloqueados — não há forma de conservá-los ao trocar de ramo.",
  "ascension::El árbol de talentos no tiene grilla visual":
    "ClassSpecialization edita os seus talentos com uma linha de chat compacta (id;nome;custo;requer1,requer2;stat=val;skill;trait;encantamento) em vez de um editor de árvore — igual ao construtor web desta página, que nem sequer o expõe e manda você copiar um exemplo YAML à mão para essa parte.",
  "mobs::El daño se resuelve un tick después":
    "Quando um mob recebe dano, o listener ajusta o dano do evento na hora (esquiva/resistências), mas a verificação de transição de fase e o trigger DAMAGED são agendados para o próximo tick — só aí getHealth() reflete a vida já subtraída pelo Bukkit.",
  "mobs::Solo verificado por compilación, no probado en juego":
    "Esta primeira versão das skins não foi testada visualmente contra um cliente real do Minecraft (sem servidor Paper disponível no ambiente de desenvolvimento) — a lógica de sorteio/montagem/persistência/limpeza está completa, mas convém testá-la num servidor de testes antes de usar em produção.",
  "mobs::Sin historial, versionado ni import/export":
    "Ao contrário do que foi proposto originalmente, este editor não guarda versões anteriores nem permite importar/exportar definições — cada \"Salvar\" sobrescreve o YAML em disco diretamente.",
  "guilds::WIN_WAR no tiene motor de guerra":
    "O tipo WIN_WAR existe no enum mas não há nenhum sistema de guerra entre guildas implementado que dispare o seu progresso — ficaria sem se completar nunca se você o ativar.",
  "crates::Un crate necesita al menos 1 recompensa":
    "O construtor compacto de Crate lança IllegalArgumentException se rewards estiver vazio — não é possível salvar um crate sem nenhuma recompensa (nem por YAML nem pelo editor gráfico).",
  "dungeons::Dos dependencias duras, no soft":
    "Ao contrário de quase todos os outros addons do RPGRoll, o Dungeons não roda sem o RPGRoll-Mobs (as ondas e chefes referenciam ids de MobDefinition diretamente) nem sem o RPGRoll-Guilds (os grupos que entram numa masmorra são resolvidos via Team). RPGRoll-Items e RPGRoll-Quests são opcionais — sem eles, certos tipos de loot/objetivo simplesmente não fazem nada.",
  "dungeons::Sin BlockData — evitá materiales con orientación":
    "A colagem CUSTOM faz setType() simples, sem facing/hinge/half. Portas, escadas, tochas de parede e camas vão ficar com uma orientação padrão, não a que \"deveriam\" ter. Os 4 exemplos deste addon usam de propósito apenas materiais sem orientação (tijolos, tochas em pé, baús, glowstone), para não depender disso.",
  "traps::Sin camuflaje por-jugador":
    "A \"camuflagem\" deste addon é troca de bloco real (TOGGLE_BLOCKS/disguise), visível igualmente para todos os jogadores — não há um sistema de blocos falsos por pacote (exigiria ProtocolLib + block-change packets, sem precedente no repositório). Mesmo assim cobre a maioria dos casos: uma parede falsa parece uma parede normal até o mecanismo ser acionado.",
  "magic::HOLD es una simulación, no un click-sostenido real":
    "O Bukkit não expõe um evento de \"você continua apertando o clique direito\" sem escutar pacotes do cliente — em vez disso, ao iniciar a canalização você tem cast-time ticks para completá-la parado e sem receber dano. É a mesma simplificação que a maioria dos plugins de RPG/magia faz sobre Bukkit puro.",
  "seasons::La temperatura por bioma es una tabla propia, no un valor real de Bukkit":
    "O Bukkit não expõe a temperatura interna real de um bioma como um double consultável de forma estável entre versões — o Seasons mantém a sua própria tabela aproximada em plugins/RPGRoll-Seasons/biome-temperatures.yml (editável), e cada estação soma um delta por bioma sobre essa base.",
  "sackresourcepack::Implementado según spec, no probado contra un bucket real":
    "O AwsSignatureV4 segue à risca o algoritmo documentado pela AWS (canonical request, string-to-sign, chave de assinatura derivada, assinatura final), usando só javax.crypto/java.security do JDK — sem o SDK da AWS. Mas não havia credenciais AWS disponíveis no ambiente onde isto foi escrito: teste uma vez contra o seu bucket/endpoint real antes de confiar nisto em produção.",
  "sackresourcepack::Preview parcial, no un render real — y sin probar contra un cliente real":
    "Só funciona com texturas (não com modelos/sons/fontes), exige que o cliente do jogador consiga alcançar o host HTTP do plugin pela rede, e a imagem se distorce ao ser envolvida sobre o UV de uma cabeça em vez de ser mostrada plana. Se o pack for servido a partir de uma http.public-url externa em vez do host embutido, não há preview — o explorador volta ao ícone+lore de sempre. Também não foi possível verificar contra um cliente real do Minecraft no ambiente onde isto foi escrito.",
  "ranching::Solo verificado por compilación, no probado en juego":
    "Igual ao RPGRoll-Mobs, esta primeira versão do reskin não foi testada visualmente contra um cliente real (sem servidor Paper disponível no ambiente de desenvolvimento).",
  "ranching::La 'limpieza' del diseño original no tiene equivalente real en Bukkit":
    "Não existe nenhuma noção de \"curral sujo\" para medir — esse fator foi substituído por luz + água + superlotação, que são de fato mensuráveis contra o mundo. Felicidade e saúde alimentam diretamente a fertilidade e a produção, então \"um animal feliz produz mais\" continua literalmente verdadeiro.",
  "workers::Solo verificado por compilación, no probado en juego":
    "Igual a Mobs/Ranching, esta primeira versão do reskin não foi testada visualmente contra um cliente real do Minecraft (sem servidor Paper disponível no ambiente de desenvolvimento).",
  "workers::El pescador NO usa FishingAPI de verdad":
    "FishingAPI.forceCatch(...) exige um Player real (precisa dele para verificar nível via RPGRollAPI em peixes lendários), e um worker não é um jogador. Simulá-lo com um jogador falso seria frágil e enganoso, então o FishingBehavior fica com uma captura vanilla simples em vez da genética/qualidade rica do RPGRoll-Fishing. Uma profissão sem nenhum behavior registrado continua \"trabalhando\" para efeitos de horário/salário/experiência, só que sem nenhuma interação física real (fallback silencioso, não um erro).",
  "economy::El campo 'permission' no se aplica solo":
    "Está no schema e pode ser lido a partir de outro addon, mas o WalletService não o verifica por conta própria antes de depositar/sacar — é um gancho para que você (ou outro sistema) o faça cumprir.",
  "economy::Solo verificado por compilación":
    "Igual a outras integrações adicionadas recentemente, isto foi verificado compilando e com o motor de preço exercitado por lógica, não testado em jogo contra um servidor Paper real.",
  "economy::Si tienes otro plugin de economía (EssentialsX, CMI) instalado":
    "O Vault mantém ativo o registro de maior prioridade — com a mesma prioridade, ganha o que se registrou por último. Para que o RPGRoll-Economy seja o que manda, desinstale o outro plugin de economia ou aumente a prioridade aqui se precisar conviver com ambos.",
  "crafting::El slot de salida es de solo-extracción":
    "O jogador pode retirar o resultado pronto, mas não pode inserir itens ali à mão — se o fizesse, quebraria a contagem que o motor usa para saber se já pode colocar o próximo resultado.",
  "crafting::Las condiciones solo se aplican en la mesa de crafteo":
    "O Bukkit não oferece um evento de \"pré-visualização\" para fornos/cortadora/bigorna de ferreiro — essas 5 estações registram a receita do mesmo jeito, mas sem gating por jogador. Na mesa de crafting, PrepareItemCraftEvent esconde o resultado se o jogador que a vê não cumpre as condições.",
  "crafting::Dos condiciones siguen exigiendo al jugador conectado":
    "PERMISSION e BIOME dependem de estado que só existe num jogador real (a sua árvore de permissões, a sua posição) — uma receita que as use não pode ser iniciada com o dono offline, e isso é correto, não um bug.",
  "tab::Sobre 'Layout' y columnas":
    "O cliente vanilla decide por conta própria em quantas colunas mostrar a tablist (conforme a quantidade de jogadores e o tamanho da janela) — nenhum plugin de servidor pode forçar um número de colunas diferente, é puramente client-side. O que é 100% controlável é a ordem (Sorting + Teams) e agrupar visualmente por rank — os \"layouts predefinidos\" (classic/ranked/guild/dungeon/…) são presets de Sorting + Teams, não uma grade arbitrária.",
  "extras::No confundir con un valor multiplicador directo":
    "stamina_max: 1.3 NÃO dá 130% — dá 1.0 + 1.3 = 230%. O valor correto para \"130% do máximo\" é 0.3.",
  "api::get() lanza una excepción si RPGRoll no está listo":
    "RPGRollAPI.get() lança IllegalStateException se for chamado antes de o RPGRoll terminar de iniciar. Se o seu addon quiser integrar-se de forma opcional (sem depend obrigatório), use RPGRollAPI.isReady() para verificar em runtime antes de chamar get().",
  "arquitectura::Antes solo soportaba códigos clásicos":
    "Até pouco tempo atrás, a maioria dos addons construía o seu próprio LegacyComponentSerializer.legacyAmpersand() local, que não entende hex — qualquer &#RRGGBB ou &x&R&R… aparecia como texto literal em vez de cor. Corrigiu-se centralizando tudo em ComponentUtils, que monta o serializer com .hexColors() — essa única flag já habilita ambos os formatos hex ao desserializar (o método .useUnusualXRepeatedCharacterHexFormat() só afeta como é serializado de volta, não o que pode ser lido).",
  "arquitectura::Bug corregido: reopen() necesita open(), no solo build()":
    "Durante bastante tempo, o reopen() privado de cada navegador só chamava build() (que redesenha o Inventory do navegador, mas esse objeto já não é o que o jogador está vendo — ele está vendo o do editor). O resultado: apertar \"Voltar\" não fazia nada visível, e além disso o click-listener continuava apontando para o editor. Corrigiu-se mudando esses reopen() para chamar open() em vez de build() — open() redesenha, re-registra e mostra de novo o inventário correto. Isto foi tocado em 59 arquivos ao longo de todo o ecossistema.",
  "configuracion::Claves marcadas con ⚠":
    "Algumas chaves de gameplay.yml existem no arquivo mas o código nunca as lê — sobraram de um design anterior ou antecipam uma função ainda não conectada (veja as notas ⚠ na tabela de gameplay.yml acima). Não assuma que alterá-las tem efeito sem verificar contra o código.",
};

/* ------------------------------------------------------------- búsqueda */

const DIAG: Partial<Record<Locale, typeof diagEn>> = { en: diagEn, pt: diagPt };
const TITLES: Partial<Record<Locale, Map_>> = { en: caveatTitlesEn, pt: caveatTitlesPt };
const BODIES: Partial<Record<Locale, Map_>> = { en: caveatBodiesEn, pt: caveatBodiesPt };

export function localizedDiagnostic(
  id: string,
  fallback: { symptom: string; causes: string[]; fix: string },
  locale: Locale,
): { symptom: string; causes: string[]; fix: string } {
  return DIAG[locale]?.[id] ?? fallback;
}

export function localizedCaveatTitle(slug: string, title: string, locale: Locale): string {
  return TITLES[locale]?.[`${slug}::${title}`] ?? title;
}

export function localizedCaveatBody(slug: string, title: string, body: string, locale: Locale): string {
  return BODIES[locale]?.[`${slug}::${title}`] ?? body;
}
