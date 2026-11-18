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
  // El primer render coincide con el HTML estático; las preferencias se leen al hidratar.
  const [locale, setLocaleState] = useState<Locale>("es");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocaleState(getInitialLocale());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Sin persistencia: la elección vale para esta sesión y no rompe nada.
    }
  }, [locale, ready]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  const value = useMemo<LocaleContextValue>(() => ({ locale, setLocale, t: STRINGS[locale] }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
