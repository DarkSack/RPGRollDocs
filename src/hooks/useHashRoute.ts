import { useEffect, useState, useCallback } from "react";

/**
 * Enrutador mínimo basado en el hash de la URL, sin librerías externas —
 * suficiente para un sitio estático de documentación y fácil de mover o
 * embeber en cualquier lado sin dependencias adicionales.
 * <p>
 * Usa el prefijo "#page/<slug>" para no chocar con los anchors de sección
 * dentro de cada página (ej. "#instalacion", generados por SectionHeading),
 * que deben seguir el comportamiento nativo del navegador de scrollear al
 * elemento sin disparar una navegación de página.
 */
const PAGE_PREFIX = "#page/";
const DEFAULT_ROUTE = "inicio";

function readPageRoute(): string | null {
  const hash = window.location.hash;
  return hash.startsWith(PAGE_PREFIX) ? hash.slice(PAGE_PREFIX.length) : null;
}

export function useHashRoute(): [string, (path: string) => void] {
  const [route, setRoute] = useState(() => readPageRoute() ?? DEFAULT_ROUTE);

  useEffect(() => {
    const onHashChange = () => {
      const next = readPageRoute();
      if (next !== null) {
        setRoute(next);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = `${PAGE_PREFIX}${path}`;
    window.scrollTo({ top: 0 });
  }, []);

  return [route, navigate];
}
