import { useState } from "react";

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
          <CheckIcon />
          Copiado
        </>
      ) : (
        <>
          <CopyIcon />
          Copiar
        </>
      )}
    </button>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
