import { colorForMaterial } from "./materials";
import type { Anchor, Palette, VoxelGrid } from "./types";
import { AIR } from "./types";

export interface ViewState {
  yaw: number; // radianes, rotación alrededor de Y
  pitch: number; // radianes, rotación alrededor de X (clamped al llamador)
  scale: number; // px por unidad de bloque
}

export const DEFAULT_VIEW: ViewState = { yaw: Math.PI / 4, pitch: 0.55, scale: 26 };

type Vec3 = [number, number, number];

// Esquinas de un cubo unitario (0..1 en cada eje).
const CORNERS: Vec3[] = [
  [0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1],
  [0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1],
];

// Cada cara: 4 índices de esquina, normal saliente (= dirección del vecino a chequear para culling), sombreado fijo por tipo de cara.
const FACES: { corners: number[]; normal: Vec3; shade: number }[] = [
  { corners: [4, 5, 6, 7], normal: [0, 1, 0], shade: 1.0 }, // top
  { corners: [0, 1, 5, 4], normal: [0, 0, -1], shade: 0.85 }, // front (z=0)
  { corners: [1, 2, 6, 5], normal: [1, 0, 0], shade: 0.78 }, // right (x=1)
  { corners: [3, 2, 6, 7], normal: [0, 0, 1], shade: 0.68 }, // back (z=1)
  { corners: [0, 3, 7, 4], normal: [-1, 0, 0], shade: 0.6 }, // left (x=0)
  { corners: [0, 1, 2, 3], normal: [0, -1, 0], shade: 0.45 }, // bottom
];

function rotate(p: Vec3, yaw: number, pitch: number): Vec3 {
  const [x, y, z] = p;

  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;

  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const y2 = y * cp - z1 * sp;
  const z2 = y * sp + z1 * cp;

  return [x1, y2, z2];
}

/** Oscurece un color (hex o hsl, no importa cuál) superponiendo negro semitransparente al dibujar. */
function darkenOverlay(alpha: number): string {
  return `rgba(0,0,0,${alpha})`;
}

interface FaceDrawItem {
  points: [number, number][];
  color: string;
  shade: number;
  depth: number;
}

export function renderVoxelScene(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  grid: VoxelGrid,
  palette: Palette,
  dims: { width: number; height: number; depth: number },
  anchor: Anchor,
  view: ViewState,
  maxVisibleLayer: number,
): void {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  const { width, height, depth } = dims;
  const pivot: Vec3 = [width / 2, height / 2, depth / 2];
  const cx = canvasWidth / 2;
  const cy = canvasHeight / 2 + 10;

  function project(p: Vec3): { screen: [number, number]; depth: number } {
    const centered: Vec3 = [p[0] - pivot[0], p[1] - pivot[1], p[2] - pivot[2]];
    const [rx, ry, rz] = rotate(centered, view.yaw, view.pitch);
    return { screen: [cx + rx * view.scale, cy - ry * view.scale], depth: rz };
  }

  // Caja contenedora (wireframe) — referencia de tamaño aunque no haya nada pintado todavía.
  ctx.strokeStyle = "rgba(148, 163, 184, 0.45)";
  ctx.lineWidth = 1;
  const boxCorners = CORNERS.map(([x, y, z]): Vec3 => [x * width, y * height, z * depth]);
  const boxEdges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];
  for (const [a, b] of boxEdges) {
    const pa = project(boxCorners[a]).screen;
    const pb = project(boxCorners[b]).screen;
    ctx.beginPath();
    ctx.moveTo(pa[0], pa[1]);
    ctx.lineTo(pb[0], pb[1]);
    ctx.stroke();
  }

  const visibleHeight = Math.min(height, maxVisibleLayer + 1);
  const items: FaceDrawItem[] = [];

  const isSolid = (vx: number, vy: number, vz: number): boolean => {
    if (vx < 0 || vz < 0 || vy < 0 || vx >= width || vz >= depth || vy >= visibleHeight) return false;
    const symbol = grid[vy]?.[vz]?.[vx];
    return !!symbol && symbol !== AIR;
  };

  for (let vy = 0; vy < visibleHeight; vy++) {
    for (let vz = 0; vz < depth; vz++) {
      for (let vx = 0; vx < width; vx++) {
        const symbol = grid[vy]?.[vz]?.[vx];
        if (!symbol || symbol === AIR) continue;

        const material = palette[symbol];
        if (!material) continue;

        const baseColor = colorForMaterial(material);

        for (const face of FACES) {
          const [nx, ny, nz] = face.normal;

          if (isSolid(vx + nx, vy + ny, vz + nz)) continue; // ocluida por el vecino

          const rotatedNormal = rotate(face.normal, view.yaw, view.pitch);
          if (rotatedNormal[2] <= 0) continue; // cara de espaldas a la cámara

          const points: [number, number][] = [];
          let depthSum = 0;

          for (const cornerIndex of face.corners) {
            const [ox, oy, oz] = CORNERS[cornerIndex];
            const world: Vec3 = [vx + ox, vy + oy, vz + oz];
            const { screen, depth: d } = project(world);
            points.push(screen);
            depthSum += d;
          }

          items.push({ points, color: baseColor, shade: face.shade, depth: depthSum / points.length });
        }
      }
    }
  }

  items.sort((a, b) => a.depth - b.depth);

  for (const item of items) {
    ctx.beginPath();
    ctx.moveTo(item.points[0][0], item.points[0][1]);
    for (let i = 1; i < item.points.length; i++) {
      ctx.lineTo(item.points[i][0], item.points[i][1]);
    }
    ctx.closePath();

    ctx.fillStyle = item.color;
    ctx.fill();

    if (item.shade < 1) {
      ctx.fillStyle = darkenOverlay((1 - item.shade) * 0.55);
      ctx.fill();
    }

    ctx.strokeStyle = "rgba(0,0,0,0.18)";
    ctx.lineWidth = 0.75;
    ctx.stroke();
  }

  // Marcador de anclaje (punto de pegado) — esfera simple encima de todo.
  const anchorWorld: Vec3 = [anchor.x + 0.5, anchor.y, anchor.z + 0.5];
  const anchorProjected = project(anchorWorld).screen;
  ctx.beginPath();
  ctx.arc(anchorProjected[0], anchorProjected[1], 5, 0, Math.PI * 2);
  ctx.fillStyle = "#f59e0b";
  ctx.fill();
  ctx.strokeStyle = "#78350f";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}
