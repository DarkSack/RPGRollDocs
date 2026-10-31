import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Ascension. */

const es = {
  title: "Ascension (RPGRoll-Ascension)",
  intro:
    "Expansión de progresión avanzada por encima del sistema base de razas/clases/niveles: evolución de raza, especialización de clase con árbol de talentos, prestigio, afinidades elementales, y una serie de sistemas de datos (logros, títulos, facciones, legado) para que otros addons construyan mecánicas encima.",

  pillarsTitle: "4 pilares con mecánica real + 6 sistemas de datos",
  pillarsBody:
    "Race Evolution, Class Specialization (+talentos), Prestigio y Afinidades tienen efecto real en el jugador. Job Evolutions, Secretos, Facciones, Logros y Títulos son deliberadamente capas de {data} — la mecánica automática que los aplique queda para otro addon (o para ti). Legado es la excepción: vive junto a los sistemas de datos pero sí tiene un reset real.",
  dataWord: "datos y consulta",

  reqTitle: "Requisitos",
  reqBody:
    "Sin ninguno de los dos, Ascension funciona igual: un talento que otorgaría un encantamiento simplemente no lo aplica, y un requisito de «quest completada» nunca bloquea.",

  raceTitle: "Evolución de raza",
  raceBody:
    "Una {cls} es una variante de la raza base del jugador (ej. Elfo → Alto Elfo): conserva su raza real, pero suma bonos de stats, afinidades, resistencias/debilidades, traits, skills y profesiones desbloqueadas exclusivas.",
  raceCmdBody: "{cmd} falla si la evolución no corresponde a tu raza base, o si no cumples sus {req}.",
  builderRace: "Constructor visual: Race Evolution",
  builderRaceDesc:
    "Arma el YAML de una evolución de raza y descárgalo en evolutions/<id>.yml. El árbol de talentos no aplica aquí — es de Class Specialization.",

  specTitle: "Especialización de clase y árbol de talentos",
  specBody:
    "Una {cls} (ej. Guerrero → Berserker) trae su propio bono de stats y un árbol de talentos propio. {restrictions} y {equipment} son {infoOnly} — otro addon (como RPGRoll-Items) puede leerlos para hacerlos cumplir, pero Ascension no los aplica por sí sola.",
  infoOnly: "solo informativos",
  nodeBody:
    "Cada nodo ({node}) tiene un {cost} en puntos de talento, requisitos de nodos previos ({requires}), un bono de stats aditivo, y opcionalmente otorga una skill, un trait o un encantamiento (uno solo, en general) al desbloquearse. {cmd} valida en este orden: tienes especialización activa → el nodo existe → no lo desbloqueaste ya → tienes todos sus prerrequisitos → tienes puntos suficientes.",
  specWarnTitle: "Cambiar de especialización borra el árbol de talentos",
  specWarnBody: "{cmd} limpia por completo los talentos ya desbloqueados — no hay forma de conservarlos al cambiar de rama.",
  specRefTitle: "Referencia completa: todos los campos en un solo archivo",
  specRefBody: "{file} (incluido en el jar) agrega los campos que los dos ejemplos de arriba no muestran: {fields}.",
  builderSpec: "Constructor visual: Class Specialization",
  builderSpecDesc:
    "Arma la identidad, requisitos, bono de stats, restricciones y equipo exclusivo. El árbol de talentos (talents:) es demasiado anidado para este formulario — cópialo de un ejemplo de arriba y edítalo a mano.",

  prestigeTitle: "Prestigio",
  prestigeBody:
    "Al alcanzar el nivel requerido, {cmd} resetea tu nivel a 1 (conservando evolución, especialización y talentos) a cambio de un bono de experiencia acumulativo entre rangos, más las skills que ese rango otorgue.",
  prestigeBonusBody:
    "El bono se aplica de verdad a toda la XP de personaje que se gana jugando (mobs, misiones, recetas): Ascension lo registra en el {service} del core junto con el bono permanente de legado, y se suma al bono por rango ({perm}). Ver {link}.",
  progressionLink: "Progresión y nivel",
  builderPrestige: "Constructor visual: Prestige Level",
  builderPrestigeDesc: "El id es el número de rango como texto (ej. '1', '2').",

  affTitle: "Afinidades elementales",
  affBody:
    "La única mecánica automática real de este sistema: cada afinidad mapea a una lista de {cause} de Bukkit, y el nivel de afinidad del jugador (experiencia ÷ 100, tope nivel 100) reduce ese daño hasta un {max}. El resto de bonos (a hechizos, ítems, encantamientos) quedan expuestos por API para que otro addon los consulte.",
  affMax: "20 % como máximo",
  affListBody:
    "Hay 8 afinidades de ejemplo: fuego, agua, hielo, electricidad, luz, oscuridad, naturaleza, veneno — cada una opcionalmente con una {opposing} (afinidad contraria, sin efecto mecánico propio, solo referencia).",
  builderAff: "Constructor visual: Affinity",

  legacyTitle: "Legado: el reset definitivo",
  legacyBody:
    "Al llegar al prestigio mínimo de un {tier}, {cmd} hace un reset total: nivel, prestigio, evolución de raza, especialización y todos los talentos vuelven a cero — a cambio de un bono de experiencia {perm} más puntos de stat de regalo.",
  legacyPerm: "permanente y acumulativo entre legados",
  builderLegacy: "Constructor visual: Legacy Tier",
  builderLegacyDesc: "El id es el número de tier como texto (ej. '1', '2').",

  dataTitle: "Sistemas de datos: logros, títulos, facciones, job evolutions, secretos",
  dataBody:
    "Estos cinco quedan deliberadamente sin mecánica automática — son consulta + otorgar/activar manual, para que se construya encima:",
  thSystem: "Sistema",
  thRepresents: "Representa",
  thHowGranted: "Cómo se otorga/activa",
  dAchievements:
    "Logro a nivel de personaje, con una descripción narrativa del bono que otorga (no se aplica automáticamente a las stats).",
  dTitles: "Título cosmético.",
  dTitlesHow: "Otorgado por admin, activado por el jugador con {cmd}",
  dFactions: "Facción/reino con la que acumulas reputación.",
  dFactionsHow: "{cmd} (valida que la facción exista)",
  dJobs: "Rango evolutivo de un trabajo (ej. Minero → Master Miner) que desbloquea recetas/herramientas/quests.",
  dJobsHow: "Solo consulta vía API — sin comando ni mecánica que lo active.",
  dSecrets: "Requisitos para desbloquear una raza/clase/trait «secreta» que ya vive en el core.",
  dSecretsHow: "Solo consulta vía {find} — nada en el código actual lo dispara.",
  idTipBody:
    "{file} es un buen recordatorio de que el {internalId} manda sobre el nombre de archivo: el archivo se llama {name} pero su campo {id} es {value} — el sistema indexa por ese campo, no por el nombre del YAML.",
  internalId: "id interno",

  achTitle: "Achievement",
  builderAch: "Constructor visual: Achievement",
  titleTitle: "Title",
  builderTitle: "Constructor visual: Title",
  facTitle: "Faction",
  builderFac: "Constructor visual: Faction",
  jobTitle: "Job Evolution",
  builderJob: "Constructor visual: Job Evolution",
  secTitle: "Secret Unlock Requirement",
  builderSec: "Constructor visual: Secret Unlock Requirement",

  intTitle: "Integraciones",
  intEnch:
    "{ench} — si un talento tiene {field}, al desbloquearlo se aplica ese encantamiento al ítem en tu mano principal (si el addon está instalado; si no, no pasa nada).",
  intQuests:
    "{quests} — un requisito {field} en evoluciones/especializaciones/secretos se valida contra el estado real de misiones del jugador, si el addon está presente. Sin él, ese requisito nunca bloquea.",

  guiTitle: "GUI: navegador y editor para los 10 tipos de contenido",
  guiBody:
    "{cmd} abre un navegador gráfico con botón «Crear nuevo» para cada uno de los 10 tipos de esta página — {types} (por defecto, sin argumento, abre {def}). Clic sobre un ítem abre su editor: campos simples se editan con clic derecho/izquierdo o un prompt de chat; los mapas (stats, afinidades, resistencias, debilidades, reputación) usan una sintaxis compacta {syntax} por chat.",
  guiWarnTitle: "El árbol de talentos no tiene grilla visual",
  guiWarnBody:
    "{cls} edita sus talentos con una línea de chat compacta ({syntax}) en vez de un editor de árbol — igual que el constructor web de esta página, que directamente no lo expone y te manda a copiar un ejemplo YAML a mano para esa parte.",

  playerCmdsTitle: "Comandos de jugador — /ascend",
  thCommand: "Comando",
  thWhat: "Qué hace",
  pc1: "Evoluciona tu raza si cumples los requisitos.",
  pc2: "Elige una especialización de tu clase (borra talentos previos).",
  pc3: "Desbloquea un nodo del árbol de talentos de tu especialización.",
  pc4: "Reinicia tu nivel a cambio de bono de exp acumulativo.",
  pc5: "Lista tu experiencia y nivel en cada afinidad.",
  pc6: "Lista tu reputación con cada facción.",
  pc7: "Activa un título ya desbloqueado, o lo quita.",
  pc8: "Reset total a cambio de bono permanente (si alcanzas el prestigio mínimo).",
  pc9: "Resumen de tu evolución, especialización, talentos, prestigio, legado y bono de exp total.",

  adminCmdsTitle: "Comandos de administrador — /ascendadmin",
  ac1: "Otorga un logro.",
  ac2: "Otorga un título.",
  ac3: "Suma reputación (valida que la facción exista).",
  ac4: "Abre el navegador gráfico de uno de los 10 tipos de contenido (ver sección GUI arriba).",
  ac5: "Recarga los 10 tipos de contenido: evoluciones, especializaciones, prestigio, legado, logros, títulos, afinidades, job evolutions, secretos y facciones.",
  adminPermBody: "Ambos comandos administrativos requieren {perm} (por defecto: op).",

  phTitle: "Placeholders (PlaceholderAPI)",
  phBody: "Expansión {exp}.",
  thPlaceholder: "Placeholder",
  thValue: "Valor",
  ph1: "Id actual, o {dash} si no eligió ninguna.",
  ph2: "Rangos de prestigio/legado alcanzados.",
  ph3: "% de bono de experiencia total (prestigio + legado).",
  ph4: "Puntos de talento sin gastar.",
  ph5: "Nivel de esa afinidad (0-100).",
  ph6: "Reputación acumulada con esa facción.",
  ph7: "Título activo, o {dash}.",

  // YamlBuilder
  fRequirements: "Requisitos",
  fMinLevel: "Nivel mínimo",
  fMinPrestige: "Prestigio mínimo",
  fTrait: "Trait requerido",
  fQuests: "Misiones completadas",
  fQuestsHelp: "Ids separados por coma (requiere RPGRoll-Quests).",
  fReputation: "Reputación mínima",
  fReputationHelp: "facción=cantidad separado por coma.",
  fId: "Id",
  fBaseRace: "Raza base",
  fDisplayName: "Nombre visible",
  fStats: "Bono de stats",
  fAffinities: "Bono de afinidades",
  fResistances: "Resistencias",
  fWeaknesses: "Debilidades",
  fTraits: "Traits otorgados",
  fSkills: "Skills otorgadas",
  fProfessions: "Profesiones exclusivas",
  fBaseClass: "Clase base",
  fRestrictions: "Restricciones",
  fExclusiveEq: "Equipo exclusivo",
  fIdRank: "Id (número de rango)",
  fReqLevel: "Nivel requerido",
  fExpBonus: "Bono de XP (%)",
  fOpposing: "Afinidad opuesta",
  fResistCauses: "Causas de daño resistidas",
  fIdTier: "Id (número de tier)",
  fReqPrestige: "Prestigio requerido",
  fPermExpBonus: "Bono de XP permanente (%)",
  fBonusPoints: "Puntos de stat de regalo",
  fDescription: "Descripción",
  fBaseJob: "Job base",
  fReqJobLevel: "Nivel de job requerido",
  fRecipes: "Recetas desbloqueadas",
  fTools: "Herramientas desbloqueadas",
  fUnlockedQuests: "Misiones desbloqueadas",
  fTargetType: "Tipo de objetivo",
  fTargetId: "Id real en :core",
  phNewEvolution: "nueva_evolucion",
  phNewSpec: "nueva_especializacion",
  phNewAffinity: "nueva_afinidad",
  phNewAch: "nuevo_logro",
  phNewTitle: "nuevo_titulo",
  phNewFaction: "nueva_faccion",
  phNewJobEvo: "nueva_evolucion_job",
  phNewSecret: "nuevo_secreto",
  phAchDesc: "+3 % daño con espadas (informativo)",
};

export type AscensionCopy = typeof es;

const en: AscensionCopy = {
  title: "Ascension (RPGRoll-Ascension)",
  intro:
    "An advanced progression expansion on top of the base races/classes/levels system: race evolution, class specialization with a talent tree, prestige, elemental affinities, and a set of data systems (achievements, titles, factions, legacy) for other addons to build mechanics on top of.",

  pillarsTitle: "4 pillars with real mechanics + 6 data systems",
  pillarsBody:
    "Race Evolution, Class Specialization (+talents), Prestige and Affinities have a real effect on the player. Job Evolutions, Secrets, Factions, Achievements and Titles are deliberately {data} layers — the automatic mechanic that applies them is left to another addon (or to you). Legacy is the exception: it lives alongside the data systems but does have a real reset.",
  dataWord: "data and lookup",

  reqTitle: "Requirements",
  reqBody:
    "Without either of the two, Ascension works the same: a talent that would grant an enchantment simply does not apply it, and a “quest completed” requirement never blocks.",

  raceTitle: "Race evolution",
  raceBody:
    "A {cls} is a variant of the player's base race (e.g. Elf → High Elf): it keeps their real race, but adds bonuses to stats, affinities, resistances/weaknesses, traits, skills and exclusive unlocked professions.",
  raceCmdBody: "{cmd} fails if the evolution does not match your base race, or if you do not meet its {req}.",
  builderRace: "Visual builder: Race Evolution",
  builderRaceDesc:
    "Build the YAML of a race evolution and download it to evolutions/<id>.yml. The talent tree does not apply here — it belongs to Class Specialization.",

  specTitle: "Class specialization and talent tree",
  specBody:
    "A {cls} (e.g. Warrior → Berserker) brings its own stat bonus and its own talent tree. {restrictions} and {equipment} are {infoOnly} — another addon (such as RPGRoll-Items) can read them to enforce them, but Ascension does not apply them on its own.",
  infoOnly: "informative only",
  nodeBody:
    "Each node ({node}) has a {cost} in talent points, prerequisites on previous nodes ({requires}), an additive stat bonus, and optionally grants a skill, a trait or an enchantment (just one, generally) on being unlocked. {cmd} validates in this order: you have an active specialization → the node exists → you have not unlocked it already → you have all its prerequisites → you have enough points.",
  specWarnTitle: "Changing specialization wipes the talent tree",
  specWarnBody: "{cmd} completely clears the already-unlocked talents — there is no way to keep them when switching branch.",
  specRefTitle: "Full reference: every field in a single file",
  specRefBody: "{file} (included in the jar) adds the fields the two examples above do not show: {fields}.",
  builderSpec: "Visual builder: Class Specialization",
  builderSpecDesc:
    "Build the identity, requirements, stat bonus, restrictions and exclusive equipment. The talent tree (talents:) is too nested for this form — copy it from an example above and edit it by hand.",

  prestigeTitle: "Prestige",
  prestigeBody:
    "On reaching the required level, {cmd} resets your level to 1 (keeping evolution, specialization and talents) in exchange for an experience bonus that accumulates across ranks, plus the skills that rank grants.",
  prestigeBonusBody:
    "The bonus really applies to all the character XP earned by playing (mobs, quests, recipes): Ascension registers it in the core's {service} alongside the permanent legacy bonus, and it adds up with the per-rank bonus ({perm}). See {link}.",
  progressionLink: "Progression and level",
  builderPrestige: "Visual builder: Prestige Level",
  builderPrestigeDesc: "The id is the rank number as text (e.g. '1', '2').",

  affTitle: "Elemental affinities",
  affBody:
    "This system's only real automatic mechanic: each affinity maps to a list of Bukkit {cause}, and the player's affinity level (experience ÷ 100, capped at level 100) reduces that damage by up to {max}. The remaining bonuses (to spells, items, enchantments) are exposed through the API for another addon to query.",
  affMax: "20% at most",
  affListBody:
    "There are 8 example affinities: fire, water, ice, electricity, light, darkness, nature, poison — each one optionally with an {opposing} (the opposite affinity, with no mechanical effect of its own, just a reference).",
  builderAff: "Visual builder: Affinity",

  legacyTitle: "Legacy: the definitive reset",
  legacyBody:
    "On reaching a {tier}'s minimum prestige, {cmd} performs a total reset: level, prestige, race evolution, specialization and every talent go back to zero — in exchange for an experience bonus that is {perm} plus gift stat points.",
  legacyPerm: "permanent and cumulative across legacies",
  builderLegacy: "Visual builder: Legacy Tier",
  builderLegacyDesc: "The id is the tier number as text (e.g. '1', '2').",

  dataTitle: "Data systems: achievements, titles, factions, job evolutions, secrets",
  dataBody:
    "These five are deliberately left without automatic mechanics — they are lookup + manual granting/activation, so that things can be built on top:",
  thSystem: "System",
  thRepresents: "Represents",
  thHowGranted: "How it is granted/activated",
  dAchievements:
    "A character-level achievement, with a narrative description of the bonus it grants (it is not applied automatically to the stats).",
  dTitles: "A cosmetic title.",
  dTitlesHow: "Granted by an admin, activated by the player with {cmd}",
  dFactions: "A faction/kingdom you accumulate reputation with.",
  dFactionsHow: "{cmd} (it validates that the faction exists)",
  dJobs: "A job's evolutionary rank (e.g. Miner → Master Miner) that unlocks recipes/tools/quests.",
  dJobsHow: "Lookup via the API only — with no command or mechanic that activates it.",
  dSecrets: "The requirements to unlock a “secret” race/class/trait that already lives in the core.",
  dSecretsHow: "Lookup via {find} only — nothing in the current code triggers it.",
  idTipBody:
    "{file} is a good reminder that the {internalId} takes precedence over the file name: the file is called {name} but its {id} field is {value} — the system indexes by that field, not by the YAML's name.",
  internalId: "internal id",

  achTitle: "Achievement",
  builderAch: "Visual builder: Achievement",
  titleTitle: "Title",
  builderTitle: "Visual builder: Title",
  facTitle: "Faction",
  builderFac: "Visual builder: Faction",
  jobTitle: "Job Evolution",
  builderJob: "Visual builder: Job Evolution",
  secTitle: "Secret Unlock Requirement",
  builderSec: "Visual builder: Secret Unlock Requirement",

  intTitle: "Integrations",
  intEnch:
    "{ench} — if a talent has {field}, on unlocking it that enchantment is applied to the item in your main hand (if the addon is installed; if not, nothing happens).",
  intQuests:
    "{quests} — a {field} requirement in evolutions/specializations/secrets is validated against the player's real quest state, if the addon is present. Without it, that requirement never blocks.",

  guiTitle: "GUI: browser and editor for the 10 content types",
  guiBody:
    "{cmd} opens a graphical browser with a “Create new” button for each of this page's 10 types — {types} (by default, with no argument, it opens {def}). Clicking an item opens its editor: simple fields are edited with a right/left click or a chat prompt; the maps (stats, affinities, resistances, weaknesses, reputation) use a compact {syntax} syntax in chat.",
  guiWarnTitle: "The talent tree has no visual grid",
  guiWarnBody:
    "{cls} edits its talents with a compact chat line ({syntax}) instead of a tree editor — just like this page's web builder, which does not expose it at all and sends you to copy a YAML example by hand for that part.",

  playerCmdsTitle: "Player commands — /ascend",
  thCommand: "Command",
  thWhat: "What it does",
  pc1: "Evolves your race if you meet the requirements.",
  pc2: "Picks a specialization of your class (it wipes previous talents).",
  pc3: "Unlocks a node of your specialization's talent tree.",
  pc4: "Resets your level in exchange for a cumulative exp bonus.",
  pc5: "Lists your experience and level in each affinity.",
  pc6: "Lists your reputation with each faction.",
  pc7: "Activates an already-unlocked title, or removes it.",
  pc8: "A total reset in exchange for a permanent bonus (if you reach the minimum prestige).",
  pc9: "A summary of your evolution, specialization, talents, prestige, legacy and total exp bonus.",

  adminCmdsTitle: "Admin commands — /ascendadmin",
  ac1: "Grants an achievement.",
  ac2: "Grants a title.",
  ac3: "Adds reputation (it validates that the faction exists).",
  ac4: "Opens the graphical browser of one of the 10 content types (see the GUI section above).",
  ac5: "Reloads the 10 content types: evolutions, specializations, prestige, legacy, achievements, titles, affinities, job evolutions, secrets and factions.",
  adminPermBody: "Both admin commands require {perm} (default: op).",

  phTitle: "Placeholders (PlaceholderAPI)",
  phBody: "The {exp} expansion.",
  thPlaceholder: "Placeholder",
  thValue: "Value",
  ph1: "The current id, or {dash} if none was chosen.",
  ph2: "The prestige/legacy ranks reached.",
  ph3: "The total experience bonus % (prestige + legacy).",
  ph4: "Unspent talent points.",
  ph5: "That affinity's level (0-100).",
  ph6: "The reputation accumulated with that faction.",
  ph7: "The active title, or {dash}.",

  fRequirements: "Requirements",
  fMinLevel: "Minimum level",
  fMinPrestige: "Minimum prestige",
  fTrait: "Required trait",
  fQuests: "Completed quests",
  fQuestsHelp: "Comma-separated ids (requires RPGRoll-Quests).",
  fReputation: "Minimum reputation",
  fReputationHelp: "faction=amount, comma-separated.",
  fId: "Id",
  fBaseRace: "Base race",
  fDisplayName: "Display name",
  fStats: "Stat bonus",
  fAffinities: "Affinity bonus",
  fResistances: "Resistances",
  fWeaknesses: "Weaknesses",
  fTraits: "Granted traits",
  fSkills: "Granted skills",
  fProfessions: "Exclusive professions",
  fBaseClass: "Base class",
  fRestrictions: "Restrictions",
  fExclusiveEq: "Exclusive equipment",
  fIdRank: "Id (rank number)",
  fReqLevel: "Required level",
  fExpBonus: "XP bonus (%)",
  fOpposing: "Opposing affinity",
  fResistCauses: "Resisted damage causes",
  fIdTier: "Id (tier number)",
  fReqPrestige: "Required prestige",
  fPermExpBonus: "Permanent XP bonus (%)",
  fBonusPoints: "Gift stat points",
  fDescription: "Description",
  fBaseJob: "Base job",
  fReqJobLevel: "Required job level",
  fRecipes: "Unlocked recipes",
  fTools: "Unlocked tools",
  fUnlockedQuests: "Unlocked quests",
  fTargetType: "Target type",
  fTargetId: "Real id in :core",
  phNewEvolution: "new_evolution",
  phNewSpec: "new_specialization",
  phNewAffinity: "new_affinity",
  phNewAch: "new_achievement",
  phNewTitle: "new_title",
  phNewFaction: "new_faction",
  phNewJobEvo: "new_job_evolution",
  phNewSecret: "new_secret",
  phAchDesc: "+3% sword damage (informative)",
};

const pt: AscensionCopy = {
  title: "Ascension (RPGRoll-Ascension)",
  intro:
    "Expansão de progressão avançada acima do sistema base de raças/classes/níveis: evolução de raça, especialização de classe com árvore de talentos, prestígio, afinidades elementais, e uma série de sistemas de dados (conquistas, títulos, facções, legado) para que outros addons construam mecânicas em cima.",

  pillarsTitle: "4 pilares com mecânica real + 6 sistemas de dados",
  pillarsBody:
    "Race Evolution, Class Specialization (+talentos), Prestígio e Afinidades têm efeito real no jogador. Job Evolutions, Segredos, Facções, Conquistas e Títulos são deliberadamente camadas de {data} — a mecânica automática que os aplique fica para outro addon (ou para você). Legado é a exceção: vive junto aos sistemas de dados mas tem um reset real.",
  dataWord: "dados e consulta",

  reqTitle: "Requisitos",
  reqBody:
    "Sem nenhum dos dois, o Ascension funciona igual: um talento que concederia um encantamento simplesmente não o aplica, e um requisito de «quest completada» nunca bloqueia.",

  raceTitle: "Evolução de raça",
  raceBody:
    "Uma {cls} é uma variante da raça base do jogador (ex. Elfo → Alto Elfo): conserva a raça real dele, mas soma bônus de stats, afinidades, resistências/fraquezas, traits, skills e profissões desbloqueadas exclusivas.",
  raceCmdBody: "{cmd} falha se a evolução não corresponder à sua raça base, ou se você não cumprir os {req} dela.",
  builderRace: "Construtor visual: Race Evolution",
  builderRaceDesc:
    "Monte o YAML de uma evolução de raça e baixe-o em evolutions/<id>.yml. A árvore de talentos não se aplica aqui — é da Class Specialization.",

  specTitle: "Especialização de classe e árvore de talentos",
  specBody:
    "Uma {cls} (ex. Guerreiro → Berserker) traz o seu próprio bônus de stats e uma árvore de talentos própria. {restrictions} e {equipment} são {infoOnly} — outro addon (como o RPGRoll-Items) pode lê-los para fazê-los cumprir, mas o Ascension não os aplica por si só.",
  infoOnly: "só informativos",
  nodeBody:
    "Cada nó ({node}) tem um {cost} em pontos de talento, requisitos de nós anteriores ({requires}), um bônus de stats aditivo, e opcionalmente concede uma skill, um trait ou um encantamento (só um, em geral) ao ser desbloqueado. {cmd} valida nesta ordem: você tem especialização ativa → o nó existe → você não o desbloqueou já → você tem todos os pré-requisitos dele → você tem pontos suficientes.",
  specWarnTitle: "Trocar de especialização apaga a árvore de talentos",
  specWarnBody: "{cmd} limpa por completo os talentos já desbloqueados — não há forma de conservá-los ao trocar de ramo.",
  specRefTitle: "Referência completa: todos os campos num só arquivo",
  specRefBody: "{file} (incluído no jar) adiciona os campos que os dois exemplos acima não mostram: {fields}.",
  builderSpec: "Construtor visual: Class Specialization",
  builderSpecDesc:
    "Monte a identidade, requisitos, bônus de stats, restrições e equipamento exclusivo. A árvore de talentos (talents:) é aninhada demais para este formulário — copie-a de um exemplo acima e edite-a à mão.",

  prestigeTitle: "Prestígio",
  prestigeBody:
    "Ao alcançar o nível requerido, {cmd} reseta o seu nível para 1 (conservando evolução, especialização e talentos) em troca de um bônus de experiência acumulativo entre ranks, mais as skills que esse rank conceda.",
  prestigeBonusBody:
    "O bônus se aplica de verdade a todo o XP de personagem que se ganha jogando (mobs, missões, receitas): o Ascension o registra no {service} do core junto com o bônus permanente de legado, e soma com o bônus por rank ({perm}). Ver {link}.",
  progressionLink: "Progressão e nível",
  builderPrestige: "Construtor visual: Prestige Level",
  builderPrestigeDesc: "O id é o número do rank como texto (ex. '1', '2').",

  affTitle: "Afinidades elementais",
  affBody:
    "A única mecânica automática real deste sistema: cada afinidade mapeia para uma lista de {cause} do Bukkit, e o nível de afinidade do jogador (experiência ÷ 100, teto nível 100) reduz esse dano até {max}. O resto dos bônus (a feitiços, itens, encantamentos) ficam expostos por API para que outro addon os consulte.",
  affMax: "20 % no máximo",
  affListBody:
    "Há 8 afinidades de exemplo: fogo, água, gelo, eletricidade, luz, escuridão, natureza, veneno — cada uma opcionalmente com uma {opposing} (afinidade contrária, sem efeito mecânico próprio, só referência).",
  builderAff: "Construtor visual: Affinity",

  legacyTitle: "Legado: o reset definitivo",
  legacyBody:
    "Ao chegar ao prestígio mínimo de um {tier}, {cmd} faz um reset total: nível, prestígio, evolução de raça, especialização e todos os talentos voltam a zero — em troca de um bônus de experiência {perm} mais pontos de stat de brinde.",
  legacyPerm: "permanente e acumulativo entre legados",
  builderLegacy: "Construtor visual: Legacy Tier",
  builderLegacyDesc: "O id é o número do tier como texto (ex. '1', '2').",

  dataTitle: "Sistemas de dados: conquistas, títulos, facções, job evolutions, segredos",
  dataBody:
    "Estes cinco ficam deliberadamente sem mecânica automática — são consulta + conceder/ativar manual, para que se construa em cima:",
  thSystem: "Sistema",
  thRepresents: "Representa",
  thHowGranted: "Como é concedido/ativado",
  dAchievements:
    "Conquista a nível de personagem, com uma descrição narrativa do bônus que concede (não é aplicada automaticamente às stats).",
  dTitles: "Título cosmético.",
  dTitlesHow: "Concedido por admin, ativado pelo jogador com {cmd}",
  dFactions: "Facção/reino com a qual você acumula reputação.",
  dFactionsHow: "{cmd} (valida que a facção exista)",
  dJobs: "Rank evolutivo de um trabalho (ex. Minerador → Master Miner) que desbloqueia receitas/ferramentas/quests.",
  dJobsHow: "Só consulta via API — sem comando nem mecânica que o ative.",
  dSecrets: "Requisitos para desbloquear uma raça/classe/trait «secreta» que já vive no core.",
  dSecretsHow: "Só consulta via {find} — nada no código atual o dispara.",
  idTipBody:
    "{file} é um bom lembrete de que o {internalId} manda sobre o nome do arquivo: o arquivo se chama {name} mas o seu campo {id} é {value} — o sistema indexa por esse campo, não pelo nome do YAML.",
  internalId: "id interno",

  achTitle: "Achievement",
  builderAch: "Construtor visual: Achievement",
  titleTitle: "Title",
  builderTitle: "Construtor visual: Title",
  facTitle: "Faction",
  builderFac: "Construtor visual: Faction",
  jobTitle: "Job Evolution",
  builderJob: "Construtor visual: Job Evolution",
  secTitle: "Secret Unlock Requirement",
  builderSec: "Construtor visual: Secret Unlock Requirement",

  intTitle: "Integrações",
  intEnch:
    "{ench} — se um talento tem {field}, ao desbloqueá-lo esse encantamento é aplicado ao item na sua mão principal (se o addon estiver instalado; se não, não acontece nada).",
  intQuests:
    "{quests} — um requisito {field} em evoluções/especializações/segredos é validado contra o estado real de missões do jogador, se o addon estiver presente. Sem ele, esse requisito nunca bloqueia.",

  guiTitle: "GUI: navegador e editor para os 10 tipos de conteúdo",
  guiBody:
    "{cmd} abre um navegador gráfico com botão «Criar novo» para cada um dos 10 tipos desta página — {types} (por padrão, sem argumento, abre {def}). Clique sobre um item abre o editor dele: campos simples são editados com clique direito/esquerdo ou um prompt de chat; os mapas (stats, afinidades, resistências, fraquezas, reputação) usam uma sintaxe compacta {syntax} pelo chat.",
  guiWarnTitle: "A árvore de talentos não tem grade visual",
  guiWarnBody:
    "{cls} edita os seus talentos com uma linha de chat compacta ({syntax}) em vez de um editor de árvore — igual ao construtor web desta página, que diretamente não o expõe e manda você copiar um exemplo YAML à mão para essa parte.",

  playerCmdsTitle: "Comandos de jogador — /ascend",
  thCommand: "Comando",
  thWhat: "O que faz",
  pc1: "Evolui a sua raça se você cumprir os requisitos.",
  pc2: "Escolhe uma especialização da sua classe (apaga talentos anteriores).",
  pc3: "Desbloqueia um nó da árvore de talentos da sua especialização.",
  pc4: "Reinicia o seu nível em troca de bônus de exp acumulativo.",
  pc5: "Lista a sua experiência e nível em cada afinidade.",
  pc6: "Lista a sua reputação com cada facção.",
  pc7: "Ativa um título já desbloqueado, ou o remove.",
  pc8: "Reset total em troca de bônus permanente (se você alcançar o prestígio mínimo).",
  pc9: "Resumo da sua evolução, especialização, talentos, prestígio, legado e bônus de exp total.",

  adminCmdsTitle: "Comandos de administrador — /ascendadmin",
  ac1: "Concede uma conquista.",
  ac2: "Concede um título.",
  ac3: "Soma reputação (valida que a facção exista).",
  ac4: "Abre o navegador gráfico de um dos 10 tipos de conteúdo (ver seção GUI acima).",
  ac5: "Recarrega os 10 tipos de conteúdo: evoluções, especializações, prestígio, legado, conquistas, títulos, afinidades, job evolutions, segredos e facções.",
  adminPermBody: "Os dois comandos administrativos requerem {perm} (padrão: op).",

  phTitle: "Placeholders (PlaceholderAPI)",
  phBody: "Expansão {exp}.",
  thPlaceholder: "Placeholder",
  thValue: "Valor",
  ph1: "Id atual, ou {dash} se não escolheu nenhuma.",
  ph2: "Ranks de prestígio/legado alcançados.",
  ph3: "% de bônus de experiência total (prestígio + legado).",
  ph4: "Pontos de talento sem gastar.",
  ph5: "Nível dessa afinidade (0-100).",
  ph6: "Reputação acumulada com essa facção.",
  ph7: "Título ativo, ou {dash}.",

  fRequirements: "Requisitos",
  fMinLevel: "Nível mínimo",
  fMinPrestige: "Prestígio mínimo",
  fTrait: "Trait requerido",
  fQuests: "Missões completadas",
  fQuestsHelp: "Ids separados por vírgula (requer RPGRoll-Quests).",
  fReputation: "Reputação mínima",
  fReputationHelp: "facção=quantidade separado por vírgula.",
  fId: "Id",
  fBaseRace: "Raça base",
  fDisplayName: "Nome visível",
  fStats: "Bônus de stats",
  fAffinities: "Bônus de afinidades",
  fResistances: "Resistências",
  fWeaknesses: "Fraquezas",
  fTraits: "Traits concedidos",
  fSkills: "Skills concedidas",
  fProfessions: "Profissões exclusivas",
  fBaseClass: "Classe base",
  fRestrictions: "Restrições",
  fExclusiveEq: "Equipamento exclusivo",
  fIdRank: "Id (número de rank)",
  fReqLevel: "Nível requerido",
  fExpBonus: "Bônus de XP (%)",
  fOpposing: "Afinidade oposta",
  fResistCauses: "Causas de dano resistidas",
  fIdTier: "Id (número de tier)",
  fReqPrestige: "Prestígio requerido",
  fPermExpBonus: "Bônus de XP permanente (%)",
  fBonusPoints: "Pontos de stat de brinde",
  fDescription: "Descrição",
  fBaseJob: "Job base",
  fReqJobLevel: "Nível de job requerido",
  fRecipes: "Receitas desbloqueadas",
  fTools: "Ferramentas desbloqueadas",
  fUnlockedQuests: "Missões desbloqueadas",
  fTargetType: "Tipo de objetivo",
  fTargetId: "Id real no :core",
  phNewEvolution: "nova_evolucao",
  phNewSpec: "nova_especializacao",
  phNewAffinity: "nova_afinidade",
  phNewAch: "nova_conquista",
  phNewTitle: "novo_titulo",
  phNewFaction: "nova_faccao",
  phNewJobEvo: "nova_evolucao_job",
  phNewSecret: "novo_segredo",
  phAchDesc: "+3 % de dano com espadas (informativo)",
};

export const ASCENSION_COPY: Record<Locale, AscensionCopy> = { es, en, pt };
