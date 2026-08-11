import type { RoomDesign } from "./types";

export function slugify(raw: string, fallback: string): string {
  const slug = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return slug || fallback;
}

function quoteYaml(raw: string): string {
  return `"${raw.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/** Genera exactamente el schema que lee StructureParser.java (dungeons/structure). */
export function buildStructureYaml(design: RoomDesign): string {
  const id = slugify(design.id, "mi_estructura");
  const displayName = design.displayName.trim() || id;
  const description = design.description.trim();
  const icon = design.icon.trim() || "STONE_BRICKS";

  const lines: string[] = [];

  lines.push(`id: ${id}`);
  lines.push(`display-name: ${quoteYaml(displayName)}`);
  lines.push(`description: ${quoteYaml(description)}`);
  lines.push(`icon: ${icon}`);
  lines.push("source: CUSTOM");
  lines.push("");
  lines.push(`anchor: { x: ${design.anchor.x}, y: ${design.anchor.y}, z: ${design.anchor.z} }`);
  lines.push("");

  const paletteEntries = Object.entries(design.palette);

  if (paletteEntries.length === 0) {
    lines.push("palette: {}");
  } else {
    lines.push("palette:");
    for (const [symbol, material] of paletteEntries) {
      lines.push(`  '${symbol}': ${material}`);
    }
  }

  lines.push("");
  lines.push("layers:");

  for (let y = 0; y < design.height; y++) {
    lines.push(`  - # y=${y}`);
    for (let z = 0; z < design.depth; z++) {
      const row = design.grid[y][z].join("");
      lines.push(`    - ${quoteYaml(row)}`);
    }
  }

  return lines.join("\n") + "\n";
}

export function downloadYaml(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/yaml" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
