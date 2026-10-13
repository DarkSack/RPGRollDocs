import { useEffect, useState, useCallback } from "react";
import { pagePath } from "../content/seo";

/**
 * Enrutador mínimo basado en la ruta de la URL (`/npcs`), sin librerías.
 * <p>
 * Antes cada página vivía en un hash (`/#page/npcs`). Los buscadores ignoran
 * todo lo que va detrás de `#`, así que para Google el sitio entero era UNA
 * sola URL: solo podía indexar la portada. Con rutas reales cada página tiene
 * su propia URL, su `index.html` prerenderizado (ver `scripts/prerender.mjs`)
 * y su entrada en el sitemap.
 * <p>
 * Los anchors de sección (`/npcs#tiendas`) siguen siendo nativos del navegador.
 * <p>
 * Los enlaces internos son `<a href="/slug">` normales: este hook intercepta
 * el clic para no recargar la página, pero el enlace existe en el HTML, que es
 * lo que sigue un rastreador y lo que abre una pestaña nueva con clic central.
 */
const DEFAULT_ROUTE = "inicio";
const LEGACY_PREFIX = "#page/";

function slugFromPath(pathname: string): string {
  const slug = decodeURIComponent(pathname.replace(/^\/+|\/+$/g, ""));
  return slug === "" ? DEFAULT_ROUTE : slug;
}

/**
 * Los enlaces viejos (`/#page/npcs`) siguen circulando en Discord, en el README
 * del plugin y en la tienda. El servidor nunca ve el hash, así que no puede
 * redirigirlos con un 301: se reescriben aquí, sin añadir una entrada al
 * historial, y conservando el anchor de sección si lo llevaban.
 */
function migrateLegacyHash(): boolean {
  const hash = window.location.hash;
  if (!hash.startsWith(LEGACY_PREFIX)) return false;
  const slug = hash.slice(LEGACY_PREFIX.length).split("#")[0] || DEFAULT_ROUTE;
  window.history.replaceState(null, "", pagePath(slug));
  return true;
}

export function useRoute(): [string, (slug: string) => void] {
  const [route, setRoute] = useState(() => {
    migrateLegacyHash();
    return slugFromPath(window.location.pathname);
  });

  const navigate = useCallback((slug: string, hash = "") => {
    const target = pagePath(slug) + hash;
    if (target !== window.location.pathname + window.location.hash) {
      window.history.pushState(null, "", target);
    }
    setRoute(slug);
    if (!hash) window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const sync = () => setRoute(slugFromPath(window.location.pathname));
    const onHashChange = () => {
      if (migrateLegacyHash()) sync();
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Archivos estáticos (`/logo.png`, `/sitemap.xml`): que los sirva el navegador.
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return;

      event.preventDefault();
      navigate(slugFromPath(url.pathname), url.hash);
    };

    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
  }, [navigate]);

  return [route, navigate];
}
