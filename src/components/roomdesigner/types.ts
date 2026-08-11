/** Un carácter de paleta ('.' y ' ' están reservados para AIR y no se listan acá). */
export type Symbol = string;

/** Un símbolo de paleta -> nombre de Material (ej. "STONE_BRICKS"). */
export type Palette = Record<Symbol, string>;

/** grid[y][z][x] = símbolo de paleta ('.' = aire). Coincide 1:1 con el schema de StructureParser.java. */
export type VoxelGrid = string[][][];

export interface Anchor {
  x: number;
  y: number;
  z: number;
}

export interface RoomDesign {
  id: string;
  displayName: string;
  description: string;
  icon: string;
  width: number; // X
  height: number; // Y (capas — 0 es el piso)
  depth: number; // Z
  anchor: Anchor;
  palette: Palette;
  grid: VoxelGrid;
}

export const AIR: Symbol = ".";

export const MIN_DIMENSION = 1;
export const MAX_DIMENSION = 16;
