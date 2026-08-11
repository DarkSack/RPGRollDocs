import { useRef, useState } from "react";
import { colorForMaterial } from "./materials";
import type { Anchor, Palette } from "./types";
import { AIR } from "./types";
import { ChevronDownIcon, ChevronRightIcon, TargetIcon } from "../icons/Icon";

interface LayerGridProps {
  width: number;
  depth: number;
  height: number;
  layer: number;
  onLayerChange: (layer: number) => void;
  layerRows: string[][]; // grid[layer] — filas por Z, cada una un array de símbolos por X
  palette: Palette;
  onPaint: (x: number, z: number) => void;
  anchor: Anchor;
  anchorMode: boolean;
  onToggleAnchorMode: () => void;
  onSetAnchorXZ: (x: number, z: number) => void;
  onFillLayer: () => void;
  onClearLayer: () => void;
  onCopyLayerBelow: () => void;
}

const CELL_PX = 26;

/**
 * Editor 2D de la capa Y activa — un click (o arrastre) pinta con el pincel
 * seleccionado. Es la vista "de arriba" de esa altura, fila=Z, columna=X,
 * exactamente como layers[y][z][x] en el YAML final.
 */
export function LayerGrid({
  width,
  depth,
  height,
  layer,
  onLayerChange,
  layerRows,
  palette,
  onPaint,
  anchor,
  anchorMode,
  onToggleAnchorMode,
  onSetAnchorXZ,
  onFillLayer,
  onClearLayer,
  onCopyLayerBelow,
}: LayerGridProps) {
  const [painting, setPainting] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  function handleCell(x: number, z: number) {
    if (anchorMode) {
      onSetAnchorXZ(x, z);
      return;
    }
    onPaint(x, z);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onLayerChange(Math.max(0, layer - 1))}
            disabled={layer === 0}
            className="rounded-md border border-slate-200 p-1 text-slate-500 hover:bg-slate-100 disabled:opacity-30 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <ChevronRightIcon size={14} className="-rotate-90" />
          </button>
          <span className="min-w-[7.5rem] text-center text-sm font-medium text-slate-700 dark:text-slate-200">
            {layer === 0 ? "Piso (y=0)" : layer === height - 1 ? `Techo (y=${layer})` : `Capa y=${layer}`}
          </span>
          <button
            type="button"
            onClick={() => onLayerChange(Math.min(height - 1, layer + 1))}
            disabled={layer === height - 1}
            className="rounded-md border border-slate-200 p-1 text-slate-500 hover:bg-slate-100 disabled:opacity-30 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <ChevronDownIcon size={14} className="-rotate-90" />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={onToggleAnchorMode}
            className={
              "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition-colors " +
              (anchorMode
                ? "border-amber-400 bg-amber-50 text-amber-700 dark:border-amber-500/50 dark:bg-amber-500/10 dark:text-amber-300"
                : "border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800")
            }
            title="Click en una celda para mover el punto de pegado (anchor) a esa posición, en esta capa"
          >
            <TargetIcon size={13} />
            {anchorMode ? "Click para fijar ancla…" : "Fijar ancla"}
          </button>
          <button
            type="button"
            onClick={onCopyLayerBelow}
            disabled={layer === 0}
            className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 disabled:opacity-30 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            Copiar capa de abajo
          </button>
          <button
            type="button"
            onClick={onFillLayer}
            className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            Rellenar
          </button>
          <button
            type="button"
            onClick={onClearLayer}
            className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            Vaciar
          </button>
        </div>
      </div>

      <div
        ref={gridRef}
        className="inline-grid select-none gap-px rounded-lg border border-slate-300 bg-slate-300 p-px dark:border-slate-700 dark:bg-slate-700"
        style={{ gridTemplateColumns: `repeat(${width}, ${CELL_PX}px)` }}
        onMouseLeave={() => setPainting(false)}
        onMouseUp={() => setPainting(false)}
      >
        {layerRows.map((r, z) =>
          r.map((symbol, x) => {
            const isAnchorHere = anchor.y === layer && anchor.x === x && anchor.z === z;
            const material = symbol === AIR ? null : palette[symbol];
            const color = material ? colorForMaterial(material) : undefined;

            return (
              <button
                key={`${x}-${z}`}
                type="button"
                onMouseDown={() => {
                  setPainting(true);
                  handleCell(x, z);
                }}
                onMouseEnter={() => painting && !anchorMode && onPaint(x, z)}
                className={
                  "relative flex items-center justify-center bg-white dark:bg-slate-900 " +
                  (symbol === AIR ? "checkerboard-air" : "")
                }
                style={{ width: CELL_PX, height: CELL_PX, backgroundColor: color }}
                title={`x=${x}, z=${z}` + (material ? ` — ${material}` : "")}
              >
                {isAnchorHere && (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full border-2 border-amber-500 bg-amber-400/70" />
                  </span>
                )}
              </button>
            );
          }),
        )}
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500">
        Click y arrastrá para pintar varias celdas · X →, Z ↓ · {width}×{depth} en esta capa
      </p>
    </div>
  );
}
