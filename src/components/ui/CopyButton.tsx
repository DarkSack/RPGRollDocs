import { useState } from "react";
import { CopyIcon, CheckIcon } from "../icons/Icon";

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API no disponible (ej. contexto no seguro) — no hacemos nada más.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copiar al portapapeles"
      className={
        "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium " +
        "text-slate-500 hover:bg-slate-200/70 hover:text-slate-800 " +
        "dark:text-slate-400 dark:hover:bg-slate-700/60 dark:hover:text-slate-100 " +
        "transition-colors " +
        className
      }
    >
      {copied ? (
        <>
          <CheckIcon size={14} className="text-emerald-500" />
          Copiado
        </>
      ) : (
        <>
          <CopyIcon size={14} />
          Copiar
        </>
      )}
    </button>
  );
}
