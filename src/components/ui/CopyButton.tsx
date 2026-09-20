import { useEffect, useRef, useState } from "react";
import { CopyIcon, CheckIcon } from "../icons/Icon";
import { useI18n } from "../../i18n";

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Si el componente se desmonta mientras corre el timeout (navegar a otra
  // página justo después de copiar), no queremos un setState sobre un árbol
  // que ya no existe.
  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API no disponible (ej. contexto no seguro) — no hacemos nada más.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={t.actions.copyAria}
      className={
        "inline-flex items-center gap-1.5 rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-colors " +
        className
      }
      style={{
        borderColor: copied ? "var(--success)" : "var(--line)",
        color: copied ? "var(--success)" : "var(--text-faint)",
      }}
    >
      {copied ? (
        <>
          <CheckIcon size={11} />
          {t.actions.copied}
        </>
      ) : (
        <>
          <CopyIcon size={11} />
          {t.actions.copy}
        </>
      )}
    </button>
  );
}
