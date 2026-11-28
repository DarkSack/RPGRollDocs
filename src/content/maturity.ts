import { caveats } from "./troubleshooting";
import type { ReleaseStatus } from "./site";

/**
 * Madurez declarada de cada sistema.
 *
 * Vacío a propósito. Qué addon es estable, cuál beta y cuál experimental es
 * un juicio del mantenedor: no se puede deducir del código ni de la
 * documentación, y ponerle "STABLE" a algo sin respaldo sería afirmar algo
 * que nadie verificó.
 *
 * Para usarlo, agregá las entradas que correspondan:
 *
 *   export const pageStatus: Record<string, ReleaseStatus> = {
 *     items: "stable",
 *     magic: "beta",
 *   };
 *
 * `PageHeader` lo lee solo y muestra el indicador en las páginas que figuren
 * acá; el resto queda sin badge, que es lo correcto mientras no haya dato.
 */
export const pageStatus: Record<string, ReleaseStatus> = {};

/**
 * Páginas cuyo propio texto declara funciones verificadas solo por
 * compilación, sin probar contra un servidor real.
 *
 * A diferencia de `pageStatus`, esto no es un juicio: se deriva de los avisos
 * que ya escribió el autor en cada página (ver content/troubleshooting.ts),
 * así que se mantiene solo. El indicador dice exactamente eso —que el addon
 * contiene funciones sin probar en juego— y no que el addon entero sea
 * experimental, que sería exagerar el alcance del aviso.
 */
export const untestedInGame: ReadonlySet<string> = new Set(
  caveats.filter((c) => /verificado por compilaci/i.test(c.title)).map((c) => c.slug),
);
