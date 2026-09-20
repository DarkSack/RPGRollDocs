import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronDownIcon, CheckIcon } from "../icons/Icon";

export interface DropdownOption {
  value: string;
  label: string;
  /** Línea secundaria opcional dentro del menú. */
  hint?: string;
}

interface DropdownProps {
  /** Etiqueta accesible del control (no se dibuja). */
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  /** Contenido del botón; por defecto, la etiqueta de la opción activa. */
  trigger?: ReactNode;
  align?: "left" | "right";
}

/**
 * Menú de selección chico (versión, idioma).
 *
 * Se implementa a mano en vez de usar `<select>` nativo porque el select del
 * sistema ignora el tema oscuro en Windows y no permite la línea secundaria;
 * a cambio, acá hay que sostener el contrato de teclado a mano: flechas para
 * moverse, Enter/Espacio para elegir, Escape para cerrar y foco de vuelta al
 * botón.
 */
export function Dropdown({ label, value, options, onChange, trigger, align = "right" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, options.findIndex((o) => o.value === value)));
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  const current = options.find((o) => o.value === value) ?? options[0];

  function close(refocus = true) {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
  }, [open, options, value]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const option = options[activeIndex];
      if (option) {
        onChange(option.value);
        close();
      }
    } else if (e.key === "Tab") {
      close(false);
    }
  }

  return (
    <div ref={rootRef} className="relative" onKeyDown={onKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors"
        style={{
          borderColor: open ? "var(--line-strong)" : "var(--line)",
          backgroundColor: open ? "var(--surface-2)" : "transparent",
          color: "var(--text-dim)",
        }}
      >
        {trigger ?? current?.label}
        <ChevronDownIcon size={12} className="shrink-0 opacity-60" />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          className={
            "absolute z-40 mt-1 min-w-44 overflow-hidden rounded-sm border py-1 shadow-popover animate-slide-down " +
            (align === "right" ? "right-0" : "left-0")
          }
          style={{ borderColor: "var(--line-strong)", backgroundColor: "var(--surface)" }}
        >
          {options.map((option, i) => {
            const selected = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onMouseMove={() => setActiveIndex(i)}
                  onClick={() => {
                    onChange(option.value);
                    close();
                  }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left"
                  style={{ backgroundColor: i === activeIndex ? "var(--surface-2)" : "transparent" }}
                >
                  <CheckIcon
                    size={13}
                    className="shrink-0"
                    style={{ color: selected ? "var(--ruby)" : "transparent" }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px]" style={{ color: "var(--text)" }}>
                      {option.label}
                    </span>
                    {option.hint && (
                      <span className="block truncate text-[11px]" style={{ color: "var(--text-faint)" }}>
                        {option.hint}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
