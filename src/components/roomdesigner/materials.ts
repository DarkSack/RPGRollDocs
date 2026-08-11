export interface MaterialInfo {
  name: string;
  label: string;
  color: string;
  /** false = tiene orientación (facing/hinge/half) que el motor CUSTOM no preserva al pegar. */
  orientationSafe: boolean;
}

/**
 * Lista curada de materiales seguros para el formato CUSTOM (sin BlockData
 * de orientación) — la misma restricción que documenta Dungeons.tsx y que
 * respetan las 4 estructuras de ejemplo del addon. No es exhaustiva: el
 * selector también acepta cualquier nombre de Material escrito a mano.
 */
export const CURATED_MATERIALS: MaterialInfo[] = [
  { name: "STONE_BRICKS", label: "Ladrillos de piedra", color: "#8c8c8c", orientationSafe: true },
  { name: "CRACKED_STONE_BRICKS", label: "Ladrillos de piedra agrietados", color: "#7d7d7d", orientationSafe: true },
  { name: "MOSSY_STONE_BRICKS", label: "Ladrillos de piedra musgosos", color: "#707a5c", orientationSafe: true },
  { name: "CHISELED_STONE_BRICKS", label: "Ladrillos de piedra cincelados", color: "#949494", orientationSafe: true },
  { name: "COBBLESTONE", label: "Piedra", color: "#7d7d7d", orientationSafe: true },
  { name: "MOSSY_COBBLESTONE", label: "Piedra musgosa", color: "#6c7a60", orientationSafe: true },
  { name: "DEEPSLATE_BRICKS", label: "Ladrillos de piedra profunda", color: "#3d3d42", orientationSafe: true },
  { name: "DEEPSLATE_TILES", label: "Baldosas de piedra profunda", color: "#34353a", orientationSafe: true },
  { name: "POLISHED_ANDESITE", label: "Andesita pulida", color: "#9a9c9c", orientationSafe: true },
  { name: "POLISHED_DIORITE", label: "Diorita pulida", color: "#e7e3df", orientationSafe: true },
  { name: "GRANITE", label: "Granito", color: "#976653", orientationSafe: true },
  { name: "OAK_PLANKS", label: "Tablones de roble", color: "#b38b53", orientationSafe: true },
  { name: "SPRUCE_PLANKS", label: "Tablones de abeto", color: "#71543a", orientationSafe: true },
  { name: "DARK_OAK_PLANKS", label: "Tablones de roble oscuro", color: "#402c19", orientationSafe: true },
  { name: "BRICKS", label: "Ladrillos", color: "#985943", orientationSafe: true },
  { name: "NETHERRACK", label: "Piedra del Nether", color: "#6b2c28", orientationSafe: true },
  { name: "NETHER_BRICKS", label: "Ladrillos del Nether", color: "#2c1719", orientationSafe: true },
  { name: "BLACKSTONE", label: "Piedra negra", color: "#2b2530", orientationSafe: true },
  { name: "OBSIDIAN", label: "Obsidiana", color: "#160f22", orientationSafe: true },
  { name: "SAND", label: "Arena", color: "#dccf9e", orientationSafe: true },
  { name: "SANDSTONE", label: "Piedra arenisca", color: "#d8ca8e", orientationSafe: true },
  { name: "PACKED_ICE", label: "Hielo compacto", color: "#a4c2e0", orientationSafe: true },
  { name: "SNOW_BLOCK", label: "Bloque de nieve", color: "#f2f8fb", orientationSafe: true },
  { name: "GLOWSTONE", label: "Piedra luminosa", color: "#f2c96a", orientationSafe: true },
  { name: "SEA_LANTERN", label: "Linterna marina", color: "#c4e8db", orientationSafe: true },
  { name: "TORCH", label: "Antorcha (de pie)", color: "#ffcc55", orientationSafe: true },
  { name: "IRON_BLOCK", label: "Bloque de hierro", color: "#e4e4e4", orientationSafe: true },
  { name: "GOLD_BLOCK", label: "Bloque de oro", color: "#f5cc4b", orientationSafe: true },
  { name: "EMERALD_BLOCK", label: "Bloque de esmeralda", color: "#3fcc6e", orientationSafe: true },
  { name: "LAPIS_BLOCK", label: "Bloque de lapislázuli", color: "#2f4d9e", orientationSafe: true },
  { name: "CHEST", label: "Cofre", color: "#9a6a34", orientationSafe: true },
  { name: "BOOKSHELF", label: "Estantería", color: "#7a5a35", orientationSafe: true },
  { name: "COBWEB", label: "Telaraña", color: "#e4e4e4", orientationSafe: true },
  { name: "WATER", label: "Agua", color: "#3f76e4", orientationSafe: true },
  { name: "LAVA", label: "Lava", color: "#e2660b", orientationSafe: true },
];

export const AIR_COLOR = "transparent";

const hashCache = new Map<string, string>();

/** Color determinístico para cualquier Material que no esté en la lista curada. */
export function colorForMaterial(rawName: string): string {
  const name = rawName.trim().toUpperCase();

  if (name === "" || name === "AIR") {
    return AIR_COLOR;
  }

  const curated = CURATED_MATERIALS.find((m) => m.name === name);
  if (curated) {
    return curated.color;
  }

  const cached = hashCache.get(name);
  if (cached) {
    return cached;
  }

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }

  const color = `hsl(${hash % 360}, 42%, 52%)`;
  hashCache.set(name, color);
  return color;
}

export function isOrientationSafe(rawName: string): boolean {
  const name = rawName.trim().toUpperCase();
  const curated = CURATED_MATERIALS.find((m) => m.name === name);

  if (curated) {
    return curated.orientationSafe;
  }

  return !/(DOOR|STAIRS|TRAPDOOR|BED|WALL_TORCH|_WALL_|FENCE_GATE|SIGN|BUTTON|LEVER|RAIL|SLAB)/.test(name);
}

/**
 * Símbolos de paleta autoasignados — excluye '.', ' ' (aire reservado) y
 * comillas (para que la salida YAML nunca necesite escapar la clave).
 */
export const SYMBOL_POOL =
  "#@%&*+=~^$XYZWVUTSRQPONMLKJIHGFEDCBAxyzwvutsrqponmlkjihgfedcba0123456789".split("");
