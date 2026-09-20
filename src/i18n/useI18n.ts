import { useContext } from "react";
import { LocaleContext, type LocaleContextValue } from "./context";

export function useI18n(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useI18n debe usarse dentro de <LocaleProvider>.");
  return ctx;
}
