/**
 * Datos para buscadores y vistas previas al compartir.
 *
 * Este archivo lo leen dos sitios: la app, que actualiza título, descripción y
 * canónica al navegar, y `scripts/prerender.mjs`, que escribe un `index.html`
 * por página con esos mismos datos. Por eso NO importa nada: el script lo carga
 * con el type stripping de Node, y un import de un `.tsx` lo rompería.
 *
 * Las páginas de addon no están aquí: usan el `blurb` de `addons.ts`, que ya es
 * la descripción de una línea del addon. Duplicarla aquí solo invitaría a que
 * las dos versiones se separaran.
 */

/** Dominio público de la documentación, sin barra final. */
export const SITE_URL = "https://docs.sackito.online";

export const SITE_NAME = "RPGRoll Docs";

/** La tienda: allí están los términos, el aviso de privacidad y el aviso legal. */
export const SHOP_URL = "https://shop.sackito.online";

export const DEFAULT_DESCRIPTION =
  "Documentación de RPGRoll, el framework RPG modular para servidores Paper de Minecraft: núcleo, addons, comandos, permisos, configuración y API.";

/** Descripción de cada página que no es un addon. Entre 110 y 160 caracteres. */
export const pageDescriptions: Record<string, string> = {
  inicio: DEFAULT_DESCRIPTION,
  "primeros-pasos":
    "Instala RPGRoll en un servidor Paper, arráncalo por primera vez, ajusta la configuración y crea tu primer personaje paso a paso.",
  requisitos:
    "Versión de Paper y de Java, dependencias opcionales y recursos que necesita un servidor para correr RPGRoll y sus addons.",
  arquitectura:
    "Cómo está construido RPGRoll: módulos del núcleo, RPGRoll-Lib, grafo de dependencias entre addons, arranque y empaquetado.",
  jugadores:
    "El perfil RPG de cada jugador en RPGRoll: personaje, datos persistentes, eventos y cómo los usan el resto de sistemas.",
  "razas-clases":
    "Crea razas y clases en RPGRoll con bonificaciones, efectos pasivos y habilidades propias, desde YAML o desde el editor en el juego.",
  "stats-combate":
    "Estadísticas, atributos, salud y maná de RPGRoll: cómo se calculan, cómo se reparten puntos y cómo afectan al combate.",
  "habilidades-traits":
    "Habilidades activas y traits pasivos de RPGRoll: formato YAML, enfriamientos, costes, condiciones y efectos disponibles.",
  trabajos:
    "Sistema de trabajos (Jobs) de RPGRoll: profesiones, acciones que dan experiencia, recompensas y configuración por trabajo.",
  progresion:
    "Niveles y experiencia en RPGRoll: curvas de XP, fuentes de experiencia, recompensas por nivel y puntos de atributo.",
  "room-designer":
    "Diseñador de Salas de RPGRoll-Dungeons en el navegador: dibuja salas con formularios y descarga el YAML listo para el servidor.",
  "tab-designer":
    "Diseñador de TAB en el navegador: perfiles, scoreboards, tablists, nametags y bossbars de RPGRoll-TAB, con el YAML exacto.",
  comandos:
    "Todos los comandos de RPGRoll y de cada addon, con su sintaxis, sus argumentos y el permiso que exige cada uno.",
  permisos:
    "Lista completa de permisos de RPGRoll y sus addons, con su valor por defecto, para configurarlos con LuckPerms.",
  configuracion:
    "Referencia del config.yml de RPGRoll: cada opción, su valor por defecto y qué cambia en el servidor al modificarla.",
  placeholders:
    "Placeholders de PlaceholderAPI que expone RPGRoll: nivel, clase, raza, estadísticas, trabajos y datos de cada addon.",
  integraciones:
    "Plugins con los que se integra RPGRoll —Vault, PlaceholderAPI, LuckPerms, DecentHolograms y otros— y qué aporta cada uno.",
  "base-de-datos":
    "Almacenamiento de RPGRoll: SQLite o MySQL, tablas que crea, cómo migrar datos y cómo hacer copias de seguridad.",
  troubleshooting:
    "Soluciones a los problemas más comunes de RPGRoll: errores de arranque, licencia, resource pack, dependencias y rendimiento.",
  api: "API pública de RPGRoll para desarrolladores: cómo depender del módulo api, eventos, servicios y ejemplos de addons propios.",
};

/** URL pública de una página. La portada vive en la raíz. */
export function pagePath(slug: string): string {
  return slug === "inicio" ? "/" : `/${slug}`;
}
