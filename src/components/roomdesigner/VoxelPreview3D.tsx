import { useCallback, useEffect, useRef, useState } from "react";
import { renderVoxelScene, DEFAULT_VIEW, type ViewState } from "./voxelRender";
import type { Anchor, Palette, VoxelGrid } from "./types";
import { RotateIcon, LayersIcon, PlusIcon, MinusIcon } from "../icons/Icon";

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
const MIN_SCALE = 4;
const MAX_SCALE = 70;

/**
 * Vista previa 3D con canvas plano (sin WebGL ni librerías): proyección
 * ortográfica propia + culling de caras ocultas + orden pintor por
 * profundidad. Arrastrar rota, la rueda (o pellizcar en touch) hace zoom.
 * <p>
 * El dibujado se dispara por dos vías independientes: cambios de datos
 * (efecto normal) y cambios de TAMAÑO del contenedor (ResizeObserver) —
 * esto último es lo que hacía que en un celular, al rotar la pantalla o
 * cambiar el layout responsivo, el canvas quedara con el tamaño/resolución
 * viejos hasta la próxima pintada. Ambas vías llaman a la misma draw()
 * leyendo el estado más reciente desde un ref, para no duplicar lógica.
 */
export function VoxelPreview3D({ grid, palette, width, height, depth, anchor, currentLayer }: VoxelPreview3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<ViewState>(DEFAULT_VIEW);
  const [onlyUpToLayer, setOnlyUpToLayer] = useState(true);
  const dragState = useRef<{ x: number; y: number } | null>(null);
  const rafId = useRef<number | null>(null);
  const pendingDelta = useRef({ x: 0, y: 0 });
  // Puntos activos por pointerId — cuando hay 2, es un gesto de pellizco (zoom) en vez de arrastre (rotar).
  const activePointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStartDist = useRef<number | null>(null);
  const pinchStartScale = useRef(DEFAULT_VIEW.scale);

  const maxVisibleLayer = onlyUpToLayer ? currentLayer : height - 1;

  const dataRef = useRef({ grid, palette, width, height, depth, anchor, view, maxVisibleLayer });
  dataRef.current = { grid, palette, width, height, depth, anchor, view, maxVisibleLayer };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const d = dataRef.current;
    renderVoxelScene(
      ctx,
      rect.width,
      rect.height,
      d.grid,
      d.palette,
      { width: d.width, height: d.height, depth: d.depth },
      d.anchor,
      d.view,
      d.maxVisibleLayer,
    );
  }, []);

  useEffect(() => {
    draw();
  }, [grid, palette, width, height, depth, anchor, view, maxVisibleLayer, draw]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => draw());
    observer.observe(container);
    // Respaldo: algunos navegadores demoran/agrupan las notificaciones de
    // ResizeObserver cuando el resize viene de rotar el celular o cambiar
    // de ventana — el resize de window siempre dispara, así que redibuja igual.
    window.addEventListener("resize", draw);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", draw);
    };
  }, [draw]);

  function pinchDistance(): number | null {
    const pts = [...activePointers.current.values()];
    if (pts.length < 2) return null;
    const [a, b] = pts;
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    // Si falla (algún navegador raro, o un puntero ya liberado), seguimos
    // igual: no queremos perder el tracking de activePointers por esto.
    try {
      (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointers.current.size >= 2) {
      // Segundo dedo apareció — cortá el arrastre en curso y arrancá el pellizco.
      dragState.current = null;
      pinchStartDist.current = pinchDistance();
      pinchStartScale.current = dataRef.current.view.scale;
    } else {
      dragState.current = { x: e.clientX, y: e.clientY };
    }
  }

  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (activePointers.current.has(e.pointerId)) {
      activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    if (activePointers.current.size >= 2) {
      const dist = pinchDistance();
      if (dist !== null && pinchStartDist.current !== null && pinchStartDist.current > 0) {
        const ratio = dist / pinchStartDist.current;
        setView((v) => ({
          ...v,
          scale: Math.min(MAX_SCALE, Math.max(MIN_SCALE, pinchStartScale.current * ratio)),
        }));
      }
      return;
    }

    if (!dragState.current) return;

    // Acumulá el delta aunque el frame anterior siga pendiente — así un
    // arrastre rápido con varios eventos por frame no pierde movimiento,
    // solo se aplica todo junto en el próximo frame en vez de una vez por evento.
    pendingDelta.current.x += e.clientX - dragState.current.x;
    pendingDelta.current.y += e.clientY - dragState.current.y;
    dragState.current = { x: e.clientX, y: e.clientY };

    if (rafId.current !== null) return;

    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      const { x: dx, y: dy } = pendingDelta.current;
      pendingDelta.current = { x: 0, y: 0 };

      setView((v) => ({
        ...v,
        yaw: v.yaw + dx * 0.01,
        pitch: Math.min(MAX_PITCH, Math.max(MIN_PITCH, v.pitch - dy * 0.01)),
      }));
    });
  }

  function onPointerUp(e: React.PointerEvent<HTMLCanvasElement>) {
    activePointers.current.delete(e.pointerId);
    pinchStartDist.current = null;

    if (activePointers.current.size === 1) {
      // Quedó un dedo — retomá el arrastre normal desde su posición actual.
      const [remaining] = [...activePointers.current.values()];
      dragState.current = remaining;
    } else {
      dragState.current = null;
    }
  }

  function onWheel(e: React.WheelEvent<HTMLCanvasElement>) {
    e.preventDefault();
    setView((v) => ({ ...v, scale: Math.min(MAX_SCALE, Math.max(MIN_SCALE, v.scale - e.deltaY * 0.03)) }));
  }

  function zoomStep(direction: 1 | -1) {
    setView((v) => ({ ...v, scale: Math.min(MAX_SCALE, Math.max(MIN_SCALE, v.scale + direction * (v.scale * 0.2 + 1))) }));
  }

  function rotateStep(direction: 1 | -1) {
    setView((v) => ({ ...v, yaw: v.yaw + direction * (Math.PI / 4) }));
  }

  function resetView() {
    setView(DEFAULT_VIEW);
  }

  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

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
            <span className="hidden sm:inline">{onlyUpToLayer ? "Hasta capa actual" : "Todas las capas"}</span>
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
          <div className="flex items-center overflow-hidden rounded-md border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => zoomStep(-1)}
              className="p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              title="Alejar"
            >
              <MinusIcon size={13} />
            </button>
            <button
              type="button"
              onClick={() => zoomStep(1)}
              className="border-l border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
              title="Acercar"
            >
              <PlusIcon size={13} />
            </button>
          </div>
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
        className="h-64 w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950/60 sm:h-96"
      >
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={onWheel}
          className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
        />
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500">
        Arrastrá para rotar · rueda del mouse (o pellizcá) para zoom · el punto naranja es el ancla
      </p>
    </div>
  );
}
