import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { LOCALES, STRINGS, type Locale } from "./strings";
import { LocaleContext, type LocaleContextValue } from "./context";

const STORAGE_KEY = "rpgroll-docs-locale";


function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

function getInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // localStorage bloqueado (modo privado / cookies deshabilitadas) — seguimos con el idioma del navegador.
  }
  const preferred = navigator.languages ?? [navigator.language];
  for (const tag of preferred) {
    const base = tag.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }
  return "es";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Sin persistencia: la elección vale para esta sesión y no rompe nada.
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  const value = useMemo<LocaleContextValue>(() => ({ locale, setLocale, t: STRINGS[locale] }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
