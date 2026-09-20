/**
 * Páginas cuyo CONTENIDO está traducido a los tres idiomas.
 *
 * El chrome (navegación, palette, pie) está siempre traducido; el cuerpo de
 * cada página es trabajo aparte y va avanzando de a una. El layout usa esta
 * lista para decidir si muestra el aviso de "todavía en español": sin ella, o
 * bien mentiríamos en las páginas ya traducidas, o bien no avisaríamos en las
 * que faltan.
 *
 * Al traducir una página: mové su texto a src/pages/copy/<pagina>.ts siguiendo
 * el patrón de quickStart.ts, y agregá su slug acá.
 */
export const TRANSLATED_PAGES: ReadonlySet<string> = new Set(["inicio", "primeros-pasos", "requisitos", "comandos", "permisos", "configuracion", "base-de-datos", "placeholders",
  "integraciones",
  "troubleshooting",
  "jugadores",
  "razas-clases",
  "stats-combate",
  "habilidades-traits",
  "trabajos",
  "progresion",
]);
