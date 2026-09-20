import { useCallback, useEffect, useState } from "react";
import { DOC_VERSIONS } from "../content/site";

const STORAGE_KEY = "rpgroll-docs-version";

function getInitialVersion(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && DOC_VERSIONS.some((v) => v.id === stored)) return stored;
  } catch {
    // Sin localStorage: se usa la línea actual y no se persiste.
  }
  return DOC_VERSIONS[0].id;
}

/**
 * Línea de documentación seleccionada. Hoy el selector tiene una sola opción
 * real (ver DOC_VERSIONS), pero el estado ya vive acá para que agregar
 * versiones publicadas no obligue a tocar el layout.
 */
export function useDocVersion(): [string, (id: string) => void] {
  const [version, setVersion] = useState<string>(getInitialVersion);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, version);
    } catch {
      // Ignorado a propósito: la elección vale para esta sesión.
    }
  }, [version]);

  return [version, useCallback((id: string) => setVersion(id), [])];
}
