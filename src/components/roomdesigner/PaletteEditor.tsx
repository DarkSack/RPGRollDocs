import { useState } from "react";
import { CURATED_MATERIALS, colorForMaterial, isOrientationSafe, SYMBOL_POOL } from "./materials";
import type { Palette } from "./types";
import { AIR } from "./types";
import { PlusIcon, TrashIcon, EraserIcon } from "../icons/Icon";

interface PaletteEditorProps {
  palette: Palette;
  activeBrush: string;
  onSelectBrush: (symbol: string) => void;
  onAddMaterial: (material: string) => void;
  onRemoveSymbol: (symbol: string) => void;
  usage: Record<string, number>;
}

/**
 * Administra la paleta símbolo→Material. Los símbolos se asignan solos
 * (SYMBOL_POOL) — el usuario solo elige el Material, nunca piensa en
 * caracteres. AIR (el borrador) siempre está disponible aparte.
 */
export function PaletteEditor({
  palette,
  activeBrush,
  onSelectBrush,
  onAddMaterial,
  onRemoveSymbol,
  usage,
}: PaletteEditorProps) {
  const [customMaterial, setCustomMaterial] = useState("");

  const usedSymbols = new Set(Object.keys(palette));
  const nextSymbol = SYMBOL_POOL.find((s) => !usedSymbols.has(s));

  function addCurated(material: string) {
    if (nextSymbol) onAddMaterial(material);
  }

  function addCustom() {
    const name = customMaterial.trim().toUpperCase();
    if (name && nextSymbol) {
      onAddMaterial(name);
      setCustomMaterial("");
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Paleta</p>

      <div className="flex flex-wrap gap-1.5">
        <BrushSwatch
          symbol={AIR}
          label="Aire (borrar)"
          color="transparent"
          active={activeBrush === AIR}
          onClick={() => onSelectBrush(AIR)}
          icon={<EraserIcon size={13} />}
        />

        {Object.entries(palette).map(([symbol, material]) => (
          <BrushSwatch
            key={symbol}
            symbol={symbol}
            label={material}
            color={colorForMaterial(material)}
            active={activeBrush === symbol}
            onClick={() => onSelectBrush(symbol)}
            count={usage[symbol]}
            onRemove={() => onRemoveSymbol(symbol)}
            warn={!isOrientationSafe(material)}
          />
        ))}
      </div>

      <details className="rounded-lg border border-slate-200 dark:border-slate-700/60">
        <summary className="cursor-pointer select-none px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          + Agregar material a la paleta
        </summary>
        <div className="space-y-3 border-t border-slate-200 p-3 dark:border-slate-700/60">
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {CURATED_MATERIALS.map((m) => (
              <button
                key={m.name}
                type="button"
                disabled={!nextSymbol}
                onClick={() => addCurated(m.name)}
                className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1.5 text-left text-xs text-slate-600 transition-colors hover:border-violet-300 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:border-violet-500/40 dark:hover:bg-violet-500/10"
              >
                <span
                  className="h-3.5 w-3.5 shrink-0 rounded-sm border border-black/10"
                  style={{ backgroundColor: m.color }}
                />
                <span className="truncate">{m.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              value={customMaterial}
              onChange={(e) => setCustomMaterial(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustom()}
              placeholder="Otro Material exacto (ej. NETHERITE_BLOCK)"
              className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <button
              type="button"
              onClick={addCustom}
              disabled={!nextSymbol || !customMaterial.trim()}
              className="inline-flex shrink-0 items-center gap-1 rounded-md bg-violet-600 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <PlusIcon size={13} />
              Agregar
            </button>
          </div>

          {!nextSymbol && (
            <p className="text-xs text-amber-600 dark:text-amber-400">
              Llegaste al máximo de {SYMBOL_POOL.length} materiales distintos en una sola estructura.
            </p>
          )}
        </div>
      </details>
    </div>
  );
}

function BrushSwatch({
  label,
  color,
  active,
  onClick,
  onRemove,
  count,
  icon,
  warn,
}: {
  symbol: string;
  label: string;
  color: string;
  active: boolean;
  onClick: () => void;
  onRemove?: () => void;
  count?: number;
  icon?: React.ReactNode;
  warn?: boolean;
}) {
  return (
    <div
      className={
        "group relative flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition-colors " +
        (active
          ? "border-violet-400 bg-violet-50 dark:border-violet-500/60 dark:bg-violet-500/10"
          : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600")
      }
    >
      <button type="button" onClick={onClick} className="flex items-center gap-1.5" title={label}>
        <span
          className="checkerboard-air flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-black/10 text-[9px] text-slate-500"
          style={{ backgroundColor: color === "transparent" ? undefined : color }}
        >
          {icon}
        </span>
        <span className="max-w-[7rem] truncate font-medium text-slate-700 dark:text-slate-200">{label}</span>
        {typeof count === "number" && count > 0 && (
          <span className="text-slate-400 dark:text-slate-500">×{count}</span>
        )}
        {warn && <span title="Este material tiene orientación — se pega sin ella">⚠</span>}
      </button>

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-slate-300 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100 dark:text-slate-600"
          title="Quitar de la paleta"
        >
          <TrashIcon size={12} />
        </button>
      )}
    </div>
  );
}
