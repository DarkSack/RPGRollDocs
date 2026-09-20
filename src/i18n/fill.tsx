import { Fragment, type ReactNode } from "react";

/**
 * Interpola JSX dentro de una frase traducida.
 *
 * Las frases del diccionario llevan marcadores `{clave}` donde va algo que no
 * se traduce (un `<code>`, un link interno, un número). Eso permite que cada
 * idioma coloque esas piezas donde su gramática las necesita, en vez de
 * partir la oración en tres strings y pegarlos en el orden del español — que
 * es lo que rompe al traducir.
 *
 *   fill(t.lead, { jar: <code>RPGRoll.jar</code> })
 *
 * Un marcador sin valor se deja tal cual, para que el faltante se vea en
 * pantalla en vez de desaparecer en silencio.
 */
export function fill(template: string, values: Record<string, ReactNode>): ReactNode {
  const parts = template.split(/(\{[a-zA-Z0-9_]+\})/g);

  return parts.map((part, i) => {
    const match = part.match(/^\{([a-zA-Z0-9_]+)\}$/);
    if (!match) return <Fragment key={i}>{part}</Fragment>;

    const value = values[match[1]];
    return <Fragment key={i}>{value === undefined ? part : value}</Fragment>;
  });
}
