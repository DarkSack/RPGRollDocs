/**
 * Metadata del sistema que consume el chrome (topbar, HUD de página, selector
 * de versión, pie de página).
 *
 * Regla: acá solo entran datos verificables contra el proyecto real. Si algo
 * no está implementado o no se conoce (por ejemplo la versión de Minecraft
 * exacta, que depende del build de Paper), no se inventa un valor — se omite
 * el campo y la UI simplemente no lo muestra.
 */

export const REPO_URL = "https://github.com/DarkSack/RPGRollSack";
export const DOCS_REPO_URL = "https://github.com/DarkSack/RPGRollSack";
export const ISSUES_URL = `${REPO_URL}/issues`;

/** Ruta dentro del repo de docs donde vive cada página, para "Editar esta página". */
export const DOCS_SOURCE_PATH = "src/pages";

export type ReleaseStatus = "stable" | "beta" | "experimental" | "deprecated" | "dev";

export interface DocVersion {
  /** Identificador estable — se guarda en localStorage y se muestra en el selector. */
  id: string;
  label: string;
  status: ReleaseStatus;
  /** Descripción corta para el selector. */
  note?: string;
}

/**
 * Líneas de versión disponibles.
 *
 * Hoy el proyecto no publica releases etiquetados (no hay tags en el repo),
 * así que la única línea real es la rama de desarrollo. Cuando existan
 * releases, agregá acá una entrada por línea (`{ id: "1.0", label: "v1.0.x",
 * status: "stable" }`) y el selector las ofrece sin tocar más código.
 */
export const DOC_VERSIONS: DocVersion[] = [
  { id: "main", label: "main", status: "dev", note: "Rama de desarrollo" },
];

export const CURRENT_VERSION = DOC_VERSIONS[0];

export interface SystemRequirement {
  /** Clave de i18n en `t.meta`, o texto literal si no hay traducción. */
  label: string;
  value: string;
  /** `null` = no aplica el concepto requerido/opcional. */
  requirement: "required" | "optional" | null;
  detail?: string;
}

/**
 * Requisitos del núcleo. Los addons declaran sus propias dependencias blandas
 * en su página; esto es solo lo que necesita `RPGRoll.jar` para arrancar.
 */
export const REQUIREMENTS: SystemRequirement[] = [
  { label: "Paper API", value: "26.1.1", requirement: "required", detail: "Compatible con Bukkit/Spigot" },
  { label: "Java", value: "25", requirement: "required" },
  { label: "SQLite", value: "sqlite-jdbc", requirement: "required", detail: "Embebido, sin servidor externo" },
  { label: "Vault", value: "softdepend", requirement: "optional", detail: "Recompensas en dinero de los trabajos" },
  {
    label: "PlaceholderAPI",
    value: "softdepend",
    requirement: "optional",
    detail: "Placeholders expuestos por varios addons",
  },
];

/** Chips del HUD de cada página: metadata del sistema, no decoración. */
export const SYSTEM_META = {
  system: "RPGRoll",
  platform: "Paper",
  paperApi: "26.1.1",
  java: "25",
  storage: "SQLite",
} as const;
