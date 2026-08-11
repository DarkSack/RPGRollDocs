import { AIR, type Anchor, type VoxelGrid } from "./types";

export function createGrid(width: number, height: number, depth: number): VoxelGrid {
  return Array.from({ length: height }, () =>
    Array.from({ length: depth }, () => Array.from({ length: width }, () => AIR)),
  );
}

/** Redimensiona preservando lo ya pintado en la región que se solapa — el resto queda en AIR. */
export function resizeGrid(
  grid: VoxelGrid,
  oldDims: { width: number; height: number; depth: number },
  newDims: { width: number; height: number; depth: number },
): VoxelGrid {
  const next = createGrid(newDims.width, newDims.height, newDims.depth);

  const height = Math.min(oldDims.height, newDims.height);
  const depth = Math.min(oldDims.depth, newDims.depth);
  const width = Math.min(oldDims.width, newDims.width);

  for (let y = 0; y < height; y++) {
    for (let z = 0; z < depth; z++) {
      for (let x = 0; x < width; x++) {
        next[y][z][x] = grid[y][z][x];
      }
    }
  }

  return next;
}

export function clampAnchor(anchor: Anchor, width: number, height: number, depth: number): Anchor {
  return {
    x: Math.min(Math.max(anchor.x, 0), Math.max(width - 1, 0)),
    y: Math.min(Math.max(anchor.y, 0), Math.max(height - 1, 0)),
    z: Math.min(Math.max(anchor.z, 0), Math.max(depth - 1, 0)),
  };
}

export function setCell(grid: VoxelGrid, x: number, y: number, z: number, symbol: string): VoxelGrid {
  const next = grid.map((layer, ly) =>
    ly !== y ? layer : layer.map((row, lz) => (lz !== z ? row : row.map((cell, lx) => (lx === x ? symbol : cell)))),
  );
  return next;
}

export function fillLayer(grid: VoxelGrid, y: number, symbol: string): VoxelGrid {
  return grid.map((layer, ly) =>
    ly !== y ? layer : layer.map((row) => row.map(() => symbol)),
  );
}

export function clearLayer(grid: VoxelGrid, y: number): VoxelGrid {
  return fillLayer(grid, y, AIR);
}

export function copyLayer(grid: VoxelGrid, fromY: number, toY: number): VoxelGrid {
  if (fromY < 0 || fromY >= grid.length) {
    return grid;
  }

  const source = grid[fromY];
  return grid.map((layer, ly) => (ly !== toY ? layer : source.map((row) => [...row])));
}

/** true si no hay ni un solo bloque pintado (todo AIR) en toda la grilla. */
export function isGridEmpty(grid: VoxelGrid): boolean {
  return grid.every((layer) => layer.every((row) => row.every((cell) => cell === AIR)));
}

/** Cuenta de bloques pintados por símbolo — para mostrar uso en la paleta y detectar símbolos huérfanos. */
export function countBySymbol(grid: VoxelGrid): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const layer of grid) {
    for (const row of layer) {
      for (const cell of row) {
        if (cell === AIR) continue;
        counts[cell] = (counts[cell] ?? 0) + 1;
      }
    }
  }

  return counts;
}
