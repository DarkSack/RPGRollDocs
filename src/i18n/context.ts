import { createContext } from "react";
import type { Locale, Strings } from "./strings";

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: Strings;
}

/**
 * Vive en su propio archivo para que LocaleProvider.tsx exporte únicamente el
 * componente: mezclar componentes con otros exports rompe el Fast Refresh.
 */
export const LocaleContext = createContext<LocaleContextValue | null>(null);
