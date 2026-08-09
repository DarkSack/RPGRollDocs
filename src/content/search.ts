import { nav } from "./nav";

export interface SearchEntry {
  /** Slug de página (matchea con el router de hash). */
  slug: string;
  /** Título de la página, tal como aparece en la sidebar. */
  pageTitle: string;
  /** Id de la sección dentro de la página (SectionHeading), si esta entrada es una sub-sección. */
  heading?: string;
  /** Texto visible del heading, si aplica. */
  headingLabel?: string;
}

/**
 * Índice de búsqueda estático: una entrada por página (title) y una entrada por
 * cada SectionHeading dentro de esa página. Se genera a mano a partir de los
 * `id`s reales usados en cada página bajo src/pages — si agregás una
 * SectionHeading nueva, agregá su entrada acá para que sea buscable.
 */
export const searchIndex: SearchEntry[] = [
  ...nav.flatMap((section) => section.items.map((item) => ({ slug: item.slug, pageTitle: item.label }))),

  // Arquitectura
  h("arquitectura", "Los módulos del núcleo", "modulos"),
  h("arquitectura", "Grafo de dependencias", "grafo"),
  h("arquitectura", "Estructura de paquetes (dentro de core)", "paquetes"),
  h("arquitectura", "Arranque (Bootstrap)", "bootstrap"),
  h("arquitectura", "Empaquetado (Shadow)", "empaquetado"),
  h("arquitectura", "Módulos de addon (ej. npcs)", "addons"),
  h("arquitectura", "Colores y formato de texto — ComponentUtils", "componentutils"),
  h("arquitectura", "Tab-completion — TabCompleteUtil", "tabcompleteutil"),
  h("arquitectura", "GUIs: volver al navegador anterior", "gui-back-navigation"),

  // Comandos
  h("comandos", "Comandos de jugador", "jugador"),
  h("comandos", "Comandos de administrador", "admin"),

  // Base de datos
  h("base-de-datos", "Sistema de migraciones", "migraciones"),
  h("base-de-datos", "Esquema actual (tablas principales)", "esquema"),
  h("base-de-datos", "Configuración de conexión", "conexion"),

  // Crates
  h("crates", "Requisitos", "requisitos"),
  h("crates", "Tipo de crate vs. ubicación física", "modelo"),
  h("crates", "Recompensas ponderadas", "recompensas"),
  h("crates", "Ejemplos de archivo YAML", "formato-yaml"),
  h("crates", "GUI: navegador, editor y ruleta", "gui"),
  h("crates", "Comandos", "comandos"),

  // Ascension
  h("ascension", "Requisitos", "requisitos"),
  h("ascension", "Evolución de raza", "race-evolution"),
  h("ascension", "Especialización de clase y árbol de talentos", "specialization"),
  h("ascension", "Prestigio", "prestige"),
  h("ascension", "Afinidades elementales", "affinities"),
  h("ascension", "Legado: el reset definitivo", "legacy"),
  h("ascension", "Sistemas de datos: logros, títulos, facciones, job evolutions, secretos", "datos"),
  h("ascension", "Achievement", "achievements"),
  h("ascension", "Title", "titles-format"),
  h("ascension", "Faction", "factions-format"),
  h("ascension", "Job Evolution", "job-evolutions-format"),
  h("ascension", "Secret Unlock Requirement", "secrets-format"),
  h("ascension", "Integraciones", "integraciones"),
  h("ascension", "GUI: navegador y editor para los 10 tipos de contenido", "gui"),
  h("ascension", "Comandos de jugador — /ascend", "comandos-jugador"),
  h("ascension", "Comandos de administrador — /ascendadmin", "comandos-admin"),
  h("ascension", "Placeholders (PlaceholderAPI)", "placeholders"),

  // RPGRoll-Effects
  h("rpgroll-effects", "Requisitos", "requisitos"),
  h("rpgroll-effects", "Anatomía de un efecto", "modelo"),
  h("rpgroll-effects", "Categorías", "categorias"),
  h("rpgroll-effects", "Componentes — qué hace el efecto", "componentes"),
  h("rpgroll-effects", "Triggers — cuándo dispara cada componente", "triggers"),
  h("rpgroll-effects", "Condiciones — requisitos para aplicarse", "condiciones"),
  h("rpgroll-effects", "Acumulación (stacking)", "stacking"),
  h("rpgroll-effects", "Conflictos e inmunidades", "conflictos-inmunidades"),
  h("rpgroll-effects", "Ejemplos de archivo YAML", "formato-yaml"),
  h("rpgroll-effects", "GUI: Effect Studio", "gui"),
  h("rpgroll-effects", "API para addons — EffectsAPI", "api"),
  h("rpgroll-effects", "Comandos", "comandos"),
  h("rpgroll-effects", "Qué falta (próxima pasada de integración)", "integraciones-pendientes"),

  // API
  h("api", "Configurar tu addon", "setup"),
  h("api", "Métodos disponibles", "metodos"),
  h("api", "Eventos", "eventos"),
  h("api", "Dónde viven estos archivos, físicamente", "donde-viven"),

  // Chat
  h("chat", "Requisitos", "requisitos"),
  h("chat", "Canales (ChatChannel)", "canales"),
  h("chat", "Idiomas", "idiomas"),
  h("chat", "Roles de chat", "roles"),
  h("chat", "Emotes", "emotes"),
  h("chat", "GUI: navegador y editor para los 4 tipos de contenido", "gui"),
  h("chat", "Comandos de jugador", "comandos-jugador"),
  h("chat", "Comandos de administrador", "comandos-admin"),
  h("chat", "Placeholders (PlaceholderAPI)", "placeholders"),

  // Enchantments
  h("encantamientos", "Requisitos", "requisitos"),
  h("encantamientos", "Cómo se guarda un encantamiento en el ítem", "modelo"),
  h("encantamientos", "Categorías y restricción de ítem", "categorias"),
  h("encantamientos", "Niveles: tabla de overrides, no fórmula", "niveles"),
  h("encantamientos", "Triggers", "triggers"),
  h("encantamientos", "Condiciones", "condiciones"),
  h("encantamientos", "Efectos", "efectos"),
  h("encantamientos", "Ejemplos de archivo YAML", "formato-yaml"),
  h("encantamientos", "Integración con RPGRoll-Items", "integracion-items"),
  h("encantamientos", "GUI: navegador y editor", "gui"),
  h("encantamientos", "Comandos", "comandos"),
  h("encantamientos", "Placeholders (PlaceholderAPI)", "placeholders"),

  // Fishing
  h("fishing", "Requisitos", "requisitos"),
  h("fishing", "Especies de peces", "especies"),
  h("fishing", "Peces legendarios", "legendarios"),
  h("fishing", "Cañas y carnadas", "canas-carnadas"),
  h("fishing", "Tesoros y basura", "tesoros-basura"),
  h("fishing", "Regiones de pesca", "regiones"),
  h("fishing", "Minijuego de forcejeo (modo RPG)", "minijuego"),
  h("fishing", "Ejemplos de archivo YAML", "formato-yaml"),
  h("fishing", "GUI: Fishing Studio", "gui"),
  h("fishing", "API para addons — FishingAPI", "api"),
  h("fishing", "Comandos", "comandos"),
  h("fishing", "Qué falta (próxima pasada)", "pendiente"),

  // Dungeons
  h("dungeons", "Requisitos", "requisitos"),
  h("dungeons", "Una mazmorra es una lista de salas", "estructura"),
  h("dungeons", "Dificultades", "dificultades"),
  h("dungeons", "Checkpoints y revivir", "checkpoints"),
  h("dungeons", "Ejemplos de archivo YAML", "formato-yaml"),
  h("dungeons", "GUI: navegador y editor con pantallas dedicadas", "gui"),
  h("dungeons", "Comandos de jugador — /dungeon", "comandos-jugador"),
  h("dungeons", "Comandos de administrador — /dungeonadmin", "comandos-admin"),
  h("dungeons", "Placeholders (PlaceholderAPI)", "placeholders"),

  // Guilds
  h("guilds", "Requisitos", "requisitos"),
  h("guilds", "Teams vs. Guilds", "teams-vs-guilds"),
  h("guilds", "No hay una \"plantilla\" de Guild en YAML", "contenido"),
  h("guilds", "Misiones de guild (GuildQuestDefinition)", "guild-quests"),
  h("guilds", "Roles y permisos dentro de una guild", "roles"),
  h("guilds", "GUI: hub de guild + navegador/editor de misiones", "gui"),
  h("guilds", "Comandos de jugador — /team", "comandos-team"),
  h("guilds", "Comandos de jugador — /guild", "comandos-guild"),
  h("guilds", "Comandos de administrador — /guildadmin", "comandos-admin"),
  h("guilds", "Placeholders (PlaceholderAPI)", "placeholders"),

  // Home
  h("inicio", "¿Para quién es esta documentación?", "para-quien-es"),
  h("inicio", "Stack técnico", "stack"),
  h("inicio", "Instalación rápida", "quick-start"),

  // Jobs
  h("trabajos", "Los 6 trabajos", "trabajos-disponibles"),
  h("trabajos", "Unirse y abandonar", "unirse-abandonar"),
  h("trabajos", "Cómo funciona una recompensa", "recompensas"),
  h("trabajos", "Explorador: un caso especial", "explorador"),
  h("trabajos", "Administración", "admin"),

  // Items
  h("items", "Requisitos", "requisitos"),
  h("items", "Rareza", "rareza"),
  h("items", "Dos sistemas de números: stats propios vs. atributos vanilla", "stats"),
  h("items", "Sockets y gemas", "sockets"),
  h("items", "Skins, mejoras y durabilidad", "skins-mejoras-durabilidad"),
  h("items", "Triggers, habilidades y condiciones", "comportamiento"),
  h("items", "Requisitos de uso", "requisitos-de-uso"),
  h("items", "Recetas", "recetas"),
  h("items", "GUI: navegador y editor", "gui"),
  h("items", "Ejemplos de archivo YAML", "formato-yaml"),
  h("items", "Comandos", "comandos"),
  h("items", "Placeholders (PlaceholderAPI)", "placeholders"),

  // Mobs
  h("mobs", "Requisitos", "requisitos"),
  h("mobs", "Un mob es una composición de sistemas independientes", "filosofia"),
  h("mobs", "IA simulada, no vanilla", "ia"),
  h("mobs", "Motor de combate", "combate"),
  h("mobs", "Fases de jefe", "fases"),
  h("mobs", "Loot", "loot"),
  h("mobs", "Formato del archivo YAML", "formato-yaml"),
  h("mobs", "Skills, triggers y condiciones", "skills"),
  h("mobs", "Reglas de spawn natural", "spawn"),
  h("mobs", "Regiones de mob (MobRegion)", "regiones"),
  h("mobs", "GUI: navegador y editor", "gui"),
  h("mobs", "Comandos", "comandos"),
  h("mobs", "Puntos de extensión documentados, no implementados", "extension"),
  h("mobs", "Placeholders (PlaceholderAPI)", "placeholders"),

  // Magic
  h("magic", "Requisitos", "requisitos"),
  h("magic", "Escuelas y afinidades", "escuelas"),
  h("magic", "Anatomía de un hechizo", "hechizos"),
  h("magic", "Triggers de cast", "triggers"),
  h("magic", "Componentes del pipeline (Spell Engine)", "componentes"),
  h("magic", "Runas", "runas"),
  h("magic", "Catalizadores", "catalizadores"),
  h("magic", "Grimorios", "grimorios"),
  h("magic", "Ejemplos de archivo YAML", "formato-yaml"),
  h("magic", "GUI: Magic Studio", "gui"),
  h("magic", "API para addons — MagicAPI", "api"),
  h("magic", "Comandos", "comandos"),
  h("magic", "Qué falta (próxima pasada)", "pendiente"),

  // NPCs
  h("npcs", "Requisitos", "requisitos"),
  h("npcs", "Cómo funcionan los NPCs", "como-funciona"),
  h("npcs", "Crear y editar un NPC", "crear-npc"),
  h("npcs", "Formato del archivo YAML", "formato-yaml"),
  h("npcs", "Acciones (NpcAction)", "acciones"),
  h("npcs", "CONDITIONAL: sub-acciones y condiciones", "condicionales"),
  h("npcs", "Menús (tiendas)", "menus"),
  h("npcs", "Comandos", "comandos"),

  // Permissions
  h("permisos", "Nodos generales", "wildcards"),
  h("permisos", "Permisos individuales", "individuales"),

  // PlayerSystem
  h("jugadores", "RPGPlayer", "rpgplayer"),
  h("jugadores", "PlayerManager", "playermanager"),
  h("jugadores", "Ciclo de vida: join / quit", "ciclo-de-vida"),
  h("jugadores", "¿Cuándo está \"completo\" un personaje?", "identidad-completa"),
  h("jugadores", "Placeholders (PlaceholderAPI)", "placeholders"),

  // Quests
  h("quests", "Requisitos", "requisitos"),
  h("quests", "Una misión es una lista de etapas", "estructura"),
  h("quests", "Objetivos", "objetivos"),
  h("quests", "Condiciones", "condiciones"),
  h("quests", "Regiones (sin WorldGuard)", "regiones"),
  h("quests", "Recompensas y encadenado", "recompensas"),
  h("quests", "Integración con RPGRoll-NPCs", "npcs"),
  h("quests", "GUI: navegador y editor para Quest y Region", "gui"),
  h("quests", "Ejemplo de archivo YAML", "formato-yaml"),
  h("quests", "Comandos", "comandos"),
  h("quests", "Placeholders (PlaceholderAPI)", "placeholders"),

  // Progression
  h("progresion", "Ganar experiencia", "ganar-xp"),
  h("progresion", "Fórmula de experiencia requerida", "formula"),
  h("progresion", "Qué se aplica exactamente al subir de nivel", "que-pasa"),
  h("progresion", "Recompensas configuradas por defecto", "tabla-rewards"),
  h("progresion", "Comandos relacionados", "comandos-relacionados"),

  // RacesClasses
  h("razas-clases", "Dónde viven los archivos", "donde-viven"),
  h("razas-clases", "Formato de un archivo de raza", "formato-raza"),
  h("razas-clases", "Formato de un archivo de clase", "formato-clase"),
  h("razas-clases", "Referencia de campos", "campos"),
  h("razas-clases", "Modificadores físicos (solo razas)", "modificadores-fisicos"),
  h("razas-clases", "Cómo se aplican los bonos de atributo", "bonos-de-atributo"),
  h("razas-clases", "Cambiar de raza o clase después de creado", "cambio-raza-clase"),

  // Ranching
  h("ranching", "Requisitos", "requisitos"),
  h("ranching", "Genética: alelos y dominancia", "genetica"),
  h("ranching", "Linaje y endogamia", "linaje"),
  h("ranching", "Especies y razas", "especies-razas"),
  h("ranching", "Reproducción y embarazo", "reproduccion"),
  h("ranching", "Nutrición y bienestar", "bienestar"),
  h("ranching", "Enfermedades, vacunas y medicina", "salud"),
  h("ranching", "Producción y calidad", "produccion"),
  h("ranching", "Ejemplos de archivo YAML", "formato-yaml"),
  h("ranching", "GUI: Ranch Studio", "gui"),
  h("ranching", "API para addons — RanchingAPI", "api"),
  h("ranching", "Comandos", "comandos"),
  h("ranching", "Qué falta (próxima pasada)", "pendiente"),

  // SackEffects
  h("sackeffects", "Requisitos", "requisitos"),
  h("sackeffects", "Un efecto es una secuencia de pasos", "modelo"),
  h("sackeffects", "Tipos de paso", "tipos-de-paso"),
  h("sackeffects", "Formas de partícula", "formas"),
  h("sackeffects", "A quién/dónde apunta cada paso", "targets"),
  h("sackeffects", "Ejemplos de archivo YAML", "formato-yaml"),
  h("sackeffects", "GUI: Effect Studio de SackEffects", "gui"),
  h("sackeffects", "API para addons — EffectsAPI y EffectBuilder", "api"),
  h("sackeffects", "Comandos", "comandos"),

  // SackResourcePack
  h("sackresourcepack", "Módulos de contenido", "modulos-de-contenido"),
  h("sackresourcepack", "Resolución de dependencias", "resolucion"),
  h("sackresourcepack", "Motor de fusión", "fusion"),
  h("sackresourcepack", "CustomModelData estable", "custom-model-data"),
  h("sackresourcepack", "Motor de validación", "validacion"),
  h("sackresourcepack", "Build: ZIP + SHA1 + caché incremental", "build-cache"),
  h("sackresourcepack", "Distribución", "distribucion"),
  h("sackresourcepack", "Datapack (data/)", "datapack"),
  h("sackresourcepack", "Modo desarrollo", "modo-desarrollo"),
  h("sackresourcepack", "API para addons — AssetsAPI", "assets-api"),
  h("sackresourcepack", "GUI: Dashboard y Explorador de Assets", "gui"),
  h("sackresourcepack", "Comandos", "comandos"),
  h("sackresourcepack", "Qué falta", "pendiente"),

  // Seasons
  h("seasons", "Requisitos", "requisitos"),
  h("seasons", "Calendarios y estaciones", "calendarios"),
  h("seasons", "Subestaciones", "subestaciones"),
  h("seasons", "Sistema climático y temperatura", "clima"),
  h("seasons", "Vegetación dinámica", "vegetacion"),
  h("seasons", "Mobs y jefe exclusivo de temporada", "mobs-jefes"),
  h("seasons", "Eventos mundiales", "eventos"),
  h("seasons", "Regiones", "regiones"),
  h("seasons", "Ejemplos de archivo YAML", "formato-yaml"),
  h("seasons", "GUI: Season Studio", "gui"),
  h("seasons", "API para addons — SeasonsAPI", "api"),
  h("seasons", "Comandos", "comandos"),
  h("seasons", "Qué falta (próxima pasada)", "pendiente"),

  // Economy
  h("economy", "Requisitos", "requisitos"),
  h("economy", "Monedas", "monedas"),
  h("economy", "Wallets", "wallets"),
  h("economy", "Bancos y préstamos", "bancos-prestamos"),
  h("economy", "Mercado dinámico", "mercado-dinamico"),
  h("economy", "Tiendas de jugador", "tiendas"),
  h("economy", "Subastas", "subastas"),
  h("economy", "Empresas", "empresas"),
  h("economy", "Impuestos", "impuestos"),
  h("economy", "Inflación", "inflacion"),
  h("economy", "Libro mayor de transacciones", "libro-mayor"),
  h("economy", "Ejemplos de archivo YAML", "formato-yaml"),
  h("economy", "GUI: Economy Studio", "gui"),
  h("economy", "API para addons — EconomyAPI", "api"),
  h("economy", "Integración con Vault", "integracion-vault"),
  h("economy", "Placeholders (PlaceholderAPI)", "placeholders"),
  h("economy", "Comandos", "comandos"),
  h("economy", "Qué falta (próxima pasada)", "pendiente"),

  // StatsCombat
  h("stats-combate", "Los 6 atributos", "atributos"),
  h("stats-combate", "CombatStats: el recurso de salud/maná", "combatstats"),
  h("stats-combate", "Puntos de estadística", "puntos-de-stat"),
  h("stats-combate", "Reiniciar atributos (admin)", "respec"),
  h("stats-combate", "Consecuencias reales en combate", "combate-real"),
  h("stats-combate", "Regeneración pasiva", "regeneracion"),
  h("stats-combate", "Indicador en pantalla", "hud"),

  // SkillsTraits
  h("habilidades-traits", "Habilidades (Skills)", "skills"),
  h("habilidades-traits", "Usar una habilidad", "usar-skill"),
  h("habilidades-traits", "Ver tus habilidades", "listar-skills"),
  h("habilidades-traits", "Traits", "traits"),

  // Workers
  h("workers", "Requisitos", "requisitos"),
  h("workers", "IA por reglas", "ia"),
  h("workers", "Necesidades y personalidad", "necesidades-personalidad"),
  h("workers", "Profesiones y habilidades", "profesiones-habilidades"),
  h("workers", "Inventario y logística", "inventario-logistica"),
  h("workers", "Vivienda", "vivienda"),
  h("workers", "Economía: salarios, contratos y moral", "economia"),
  h("workers", "Eventos de worker", "eventos"),
  h("workers", "Ejemplo de archivo YAML", "formato-yaml"),
  h("workers", "GUI: Worker Studio", "gui"),
  h("workers", "API para addons — WorkersAPI", "api"),
  h("workers", "Comandos", "comandos"),
  h("workers", "Qué falta (próxima pasada)", "pendiente"),
];

function h(slug: string, headingLabel: string, heading: string): SearchEntry {
  const pageTitle = nav.flatMap((s) => s.items).find((i) => i.slug === slug)?.label ?? slug;
  return { slug, pageTitle, heading, headingLabel };
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/** Búsqueda simple por substring, priorizando: título de página > heading > coincidencia parcial. */
export function searchDocs(query: string, limit = 8): SearchEntry[] {
  const q = normalize(query.trim());
  if (!q) return [];

  const scored = searchIndex
    .map((entry) => {
      const title = normalize(entry.pageTitle);
      const heading = entry.headingLabel ? normalize(entry.headingLabel) : "";
      let score = -1;

      if (!entry.heading && title === q) score = 100;
      else if (!entry.heading && title.startsWith(q)) score = 90;
      else if (entry.heading && heading.startsWith(q)) score = 80;
      else if (!entry.heading && title.includes(q)) score = 70;
      else if (entry.heading && heading.includes(q)) score = 60;
      else if (normalize(entry.slug).includes(q)) score = 40;

      return { entry, score };
    })
    .filter((r) => r.score >= 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((r) => r.entry);
}
