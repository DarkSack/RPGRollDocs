import { useEffect, useRef, useState } from "react";
import { renderVoxelScene, DEFAULT_VIEW, type ViewState } from "./voxelRender";
import type { Anchor, Palette, VoxelGrid } from "./types";
import { RotateIcon, LayersIcon } from "../icons/Icon";

interface VoxelPreview3DProps {
  grid: VoxelGrid;
  palette: Palette;
  width: number;
  height: number;
  depth: number;
  anchor: Anchor;
  currentLayer: number;
}

const MIN_PITCH = 0.08;
const MAX_PITCH = 1.5;
const MIN_SCALE = 6;
const MAX_SCALE = 70;

/**
 * Vista previa 3D con canvas plano (sin WebGL ni librerías): proyección
 * ortográfica propia + culling de caras ocultas + orden pintor por
 * profundidad. Arrastrar rota, la rueda hace zoom.
 */
export function VoxelPreview3D({ grid, palette, width, height, depth, anchor, currentLayer }: VoxelPreview3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<ViewState>(DEFAULT_VIEW);
  const [onlyUpToLayer, setOnlyUpToLayer] = useState(true);
  const dragState = useRef<{ x: number; y: number } | null>(null);

  const maxVisibleLayer = onlyUpToLayer ? currentLayer : height - 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    renderVoxelScene(ctx, rect.width, rect.height, grid, palette, { width, height, depth }, anchor, view, maxVisibleLayer);
  }, [grid, palette, width, height, depth, anchor, view, maxVisibleLayer]);

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    dragState.current = { x: e.clientX, y: e.clientY };
  }

  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!dragState.current) return;

    const dx = e.clientX - dragState.current.x;
    const dy = e.clientY - dragState.current.y;
    dragState.current = { x: e.clientX, y: e.clientY };

    setView((v) => ({
      ...v,
      yaw: v.yaw + dx * 0.01,
      pitch: Math.min(MAX_PITCH, Math.max(MIN_PITCH, v.pitch - dy * 0.01)),
    }));
  }

  function onPointerUp() {
    dragState.current = null;
  }

  function onWheel(e: React.WheelEvent<HTMLCanvasElement>) {
    e.preventDefault();
    setView((v) => ({ ...v, scale: Math.min(MAX_SCALE, Math.max(MIN_SCALE, v.scale - e.deltaY * 0.03)) }));
  }

  function rotateStep(direction: 1 | -1) {
    setView((v) => ({ ...v, yaw: v.yaw + direction * (Math.PI / 4) }));
  }

  function resetView() {
    setView(DEFAULT_VIEW);
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Vista previa 3D
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setOnlyUpToLayer((v) => !v)}
            className={
              "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition-colors " +
              (onlyUpToLayer
                ? "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-500/50 dark:bg-violet-500/10 dark:text-violet-300"
                : "border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800")
            }
            title="Ocultar capas por encima de la que estás editando, para ver el interior"
          >
            <LayersIcon size={13} />
            {onlyUpToLayer ? "Hasta capa actual" : "Todas las capas"}
          </button>
          <button
            type="button"
            onClick={() => rotateStep(-1)}
            className="rounded-md border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            title="Girar 45° a la izquierda"
          >
            <RotateIcon size={13} className="-scale-x-100" />
          </button>
          <button
            type="button"
            onClick={() => rotateStep(1)}
            className="rounded-md border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            title="Girar 45° a la derecha"
          >
            <RotateIcon size={13} />
          </button>
          <button
            type="button"
            onClick={resetView}
            className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-72 w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950/60 sm:h-96"
      >
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onWheel={onWheel}
          className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
        />
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500">
        Arrastrá para rotar · rueda del mouse para zoom · el punto naranja es el ancla (dónde se pega)
      </p>
    </div>
  );
}
