import { useMemo, useState } from "react";
import { PaletteEditor } from "./PaletteEditor";
import { LayerGrid } from "./LayerGrid";
import { VoxelPreview3D } from "./VoxelPreview3D";
import { CodeBlock } from "../ui/CodeBlock";
import { CopyButton } from "../ui/CopyButton";
import { buildStructureYaml, downloadYaml, slugify } from "./yaml";
import { clampAnchor, clearLayer, copyLayer, countBySymbol, createGrid, fillLayer, resizeGrid, setCell } from "./grid";
import { SYMBOL_POOL } from "./materials";
import { AIR, MAX_DIMENSION, MIN_DIMENSION, type Palette, type RoomDesign } from "./types";
import { DownloadIcon } from "../icons/Icon";

const INITIAL_WIDTH = 7;
const INITIAL_HEIGHT = 4;
const INITIAL_DEPTH = 7;

const INITIAL_PALETTE: Palette = { "#": "STONE_BRICKS" };

function initialDesign(): RoomDesign {
  return {
    id: "mi_sala",
    displayName: "Mi Sala",
    description: "",
    icon: "STONE_BRICKS",
    width: INITIAL_WIDTH,
    height: INITIAL_HEIGHT,
    depth: INITIAL_DEPTH,
    anchor: { x: Math.floor(INITIAL_WIDTH / 2), y: 0, z: Math.floor(INITIAL_DEPTH / 2) },
    palette: INITIAL_PALETTE,
    grid: createGrid(INITIAL_WIDTH, INITIAL_HEIGHT, INITIAL_DEPTH),
  };
}

/**
 * Diseñador de salas: pintás capa por capa en una grilla 2D, ves el
 * resultado en 3D en vivo, y del otro lado sale el YAML de
 * structures/<id>.yml listo para copiar/descargar — el mismo formato
 * CUSTOM que lee StructureParser.java, sin que haga falta tocar Java.
 */
export function RoomDesignerTool() {
  const [design, setDesign] = useState<RoomDesign>(initialDesign);
  const [layer, setLayer] = useState(0);
  const [activeBrush, setActiveBrush] = useState<string>("#");
  const [anchorMode, setAnchorMode] = useState(false);

  const usage = useMemo(() => countBySymbol(design.grid), [design.grid]);

  function updateMeta<K extends keyof RoomDesign>(key: K, value: RoomDesign[K]) {
    setDesign((d) => ({ ...d, [key]: value }));
  }

  function updateDimensions(next: { width?: number; height?: number; depth?: number }) {
    setDesign((d) => {
      const width = clamp(next.width ?? d.width);
      const height = clamp(next.height ?? d.height);
      const depth = clamp(next.depth ?? d.depth);

      const grid = resizeGrid(d.grid, { width: d.width, height: d.height, depth: d.depth }, { width, height, depth });
      const anchor = clampAnchor(d.anchor, width, height, depth);

      return { ...d, width, height, depth, grid, anchor };
    });
    setLayer((l) => Math.min(l, clamp(next.height ?? design.height) - 1));
  }

  function clamp(value: number): number {
    return Math.min(MAX_DIMENSION, Math.max(MIN_DIMENSION, Math.round(value) || MIN_DIMENSION));
  }

  function paint(x: number, z: number) {
    setDesign((d) => ({ ...d, grid: setCell(d.grid, x, layer, z, activeBrush) }));
  }

  function addMaterial(material: string) {
    setDesign((d) => {
      const used = new Set(Object.keys(d.palette));
      const symbol = SYMBOL_POOL.find((s) => !used.has(s));
      if (!symbol) return d;

      const nextPalette = { ...d.palette, [symbol]: material };
      setActiveBrush(symbol);
      return { ...d, palette: nextPalette };
    });
  }

  function removeSymbol(symbol: string) {
    setDesign((d) => {
      const { [symbol]: _removed, ...rest } = d.palette;
      const grid = d.grid.map((l) => l.map((row) => row.map((cell) => (cell === symbol ? AIR : cell))));
      return { ...d, palette: rest, grid };
    });
    if (activeBrush === symbol) setActiveBrush(AIR);
  }

  function setAnchorXZ(x: number, z: number) {
    updateMeta("anchor", { x, y: layer, z });
    setAnchorMode(false);
  }

  const yaml = useMemo(() => buildStructureYaml(design), [design]);
  const slug = slugify(design.id, "mi_estructura");

  return (
    <div className="not-prose my-6 space-y-5 rounded-xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <TextField label="Id" value={design.id} onChange={(v) => updateMeta("id", v)} placeholder="mi_sala" />
        <TextField
          label="Nombre visible"
          value={design.displayName}
          onChange={(v) => updateMeta("displayName", v)}
          placeholder="Mi Sala"
        />
        <TextField
          label="Ícono (Material, para la GUI)"
          value={design.icon}
          onChange={(v) => updateMeta("icon", v)}
          placeholder="STONE_BRICKS"
        />
        <TextField
          label="Descripción"
          value={design.description}
          onChange={(v) => updateMeta("description", v)}
          placeholder="Opcional"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <NumberField label="Ancho (X)" value={design.width} onChange={(v) => updateDimensions({ width: v })} />
        <NumberField label="Alto (Y, capas)" value={design.height} onChange={(v) => updateDimensions({ height: v })} />
        <NumberField label="Profundidad (Z)" value={design.depth} onChange={(v) => updateDimensions({ depth: v })} />
      </div>

      <PaletteEditor
        palette={design.palette}
        activeBrush={activeBrush}
        onSelectBrush={setActiveBrush}
        onAddMaterial={addMaterial}
        onRemoveSymbol={removeSymbol}
        usage={usage}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <LayerGrid
          width={design.width}
          depth={design.depth}
          height={design.height}
          layer={layer}
          onLayerChange={setLayer}
          layerRows={design.grid[layer]}
          palette={design.palette}
          onPaint={paint}
          anchor={design.anchor}
          anchorMode={anchorMode}
          onToggleAnchorMode={() => setAnchorMode((v) => !v)}
          onSetAnchorXZ={setAnchorXZ}
          onFillLayer={() => setDesign((d) => ({ ...d, grid: fillLayer(d.grid, layer, activeBrush) }))}
          onClearLayer={() => setDesign((d) => ({ ...d, grid: clearLayer(d.grid, layer) }))}
          onCopyLayerBelow={() => setDesign((d) => ({ ...d, grid: copyLayer(d.grid, layer - 1, layer) }))}
        />

        <VoxelPreview3D
          grid={design.grid}
          palette={design.palette}
          width={design.width}
          height={design.height}
          depth={design.depth}
          anchor={design.anchor}
          currentLayer={layer}
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            structures/{slug}.yml
          </p>
          <CopyButton text={yaml} />
        </div>
        <CodeBlock language="yaml" code={yaml} showLineNumbers={false} />
        <button
          type="button"
          onClick={() => downloadYaml(`${slug}.yml`, yaml)}
          className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-violet-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
        >
          <DownloadIcon size={14} />
          Descargar {slug}.yml
        </button>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-slate-600 dark:text-slate-300">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
      />
    </label>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-slate-600 dark:text-slate-300">
        {label} <span className="text-slate-400">({MIN_DIMENSION}-{MAX_DIMENSION})</span>
      </span>
      <input
        type="number"
        min={MIN_DIMENSION}
        max={MAX_DIMENSION}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
      />
    </label>
  );
}
