import type { ReleaseStatus } from "../../content/site";

/**
 * Color semántico de un estado de release. Devuelve tokens CSS (no clases de
 * Tailwind) para que el mismo valor sirva en `style` de puntos, bordes y
 * fondos, y para que cambiar la identidad siga siendo un solo archivo.
 */
export function statusColor(status: ReleaseStatus): string {
  switch (status) {
    case "stable":
      return "var(--success)";
    case "beta":
      return "var(--gold)";
    case "experimental":
    case "dev":
      return "var(--ruby)";
    case "deprecated":
      return "var(--text-faint)";
  }
}
