export type MaterialCategory =
  | "Piedra"
  | "Madera"
  | "Nether / End"
  | "Coloridos"
  | "Vidrio"
  | "Naturaleza"
  | "Metales y gemas"
  | "Decoración";

export interface MaterialInfo {
  name: string;
  label: string;
  color: string;
  category: MaterialCategory;
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
  // --- Piedra ---------------------------------------------------------
  { name: "STONE", label: "Piedra lisa", color: "#8a8a8a", category: "Piedra", orientationSafe: true },
  { name: "STONE_BRICKS", label: "Ladrillos de piedra", color: "#8c8c8c", category: "Piedra", orientationSafe: true },
  { name: "CRACKED_STONE_BRICKS", label: "Ladrillos de piedra agrietados", color: "#7d7d7d", category: "Piedra", orientationSafe: true },
  { name: "MOSSY_STONE_BRICKS", label: "Ladrillos de piedra musgosos", color: "#707a5c", category: "Piedra", orientationSafe: true },
  { name: "CHISELED_STONE_BRICKS", label: "Ladrillos de piedra cincelados", color: "#949494", category: "Piedra", orientationSafe: true },
  { name: "COBBLESTONE", label: "Piedra", color: "#7d7d7d", category: "Piedra", orientationSafe: true },
  { name: "MOSSY_COBBLESTONE", label: "Piedra musgosa", color: "#6c7a60", category: "Piedra", orientationSafe: true },
  { name: "SMOOTH_STONE", label: "Piedra suave", color: "#a3a3a3", category: "Piedra", orientationSafe: true },
  { name: "DEEPSLATE", label: "Piedra profunda", color: "#4a4a4d", category: "Piedra", orientationSafe: true },
  { name: "DEEPSLATE_BRICKS", label: "Ladrillos de piedra profunda", color: "#3d3d42", category: "Piedra", orientationSafe: true },
  { name: "DEEPSLATE_TILES", label: "Baldosas de piedra profunda", color: "#34353a", category: "Piedra", orientationSafe: true },
  { name: "CRACKED_DEEPSLATE_BRICKS", label: "Ladrillos de piedra profunda agrietados", color: "#38383d", category: "Piedra", orientationSafe: true },
  { name: "CHISELED_DEEPSLATE", label: "Piedra profunda cincelada", color: "#404044", category: "Piedra", orientationSafe: true },
  { name: "COBBLED_DEEPSLATE", label: "Piedra profunda tosca", color: "#434346", category: "Piedra", orientationSafe: true },
  { name: "POLISHED_DEEPSLATE", label: "Piedra profunda pulida", color: "#454549", category: "Piedra", orientationSafe: true },
  { name: "TUFF", label: "Toba", color: "#6b6b62", category: "Piedra", orientationSafe: true },
  { name: "TUFF_BRICKS", label: "Ladrillos de toba", color: "#63635a", category: "Piedra", orientationSafe: true },
  { name: "POLISHED_ANDESITE", label: "Andesita pulida", color: "#9a9c9c", category: "Piedra", orientationSafe: true },
  { name: "ANDESITE", label: "Andesita", color: "#888a8a", category: "Piedra", orientationSafe: true },
  { name: "POLISHED_DIORITE", label: "Diorita pulida", color: "#e7e3df", category: "Piedra", orientationSafe: true },
  { name: "DIORITE", label: "Diorita", color: "#d6d3ce", category: "Piedra", orientationSafe: true },
  { name: "GRANITE", label: "Granito", color: "#976653", category: "Piedra", orientationSafe: true },
  { name: "POLISHED_GRANITE", label: "Granito pulido", color: "#a3705d", category: "Piedra", orientationSafe: true },
  { name: "CALCITE", label: "Calcita", color: "#e4e2d8", category: "Piedra", orientationSafe: true },
  { name: "DRIPSTONE_BLOCK", label: "Bloque de espeleotema", color: "#8a6b57", category: "Piedra", orientationSafe: true },
  { name: "BRICKS", label: "Ladrillos", color: "#985943", category: "Piedra", orientationSafe: true },
  { name: "MUD_BRICKS", label: "Ladrillos de barro", color: "#8a7256", category: "Piedra", orientationSafe: true },
  { name: "SANDSTONE", label: "Piedra arenisca", color: "#d8ca8e", category: "Piedra", orientationSafe: true },
  { name: "CHISELED_SANDSTONE", label: "Piedra arenisca cincelada", color: "#d3c586", category: "Piedra", orientationSafe: true },
  { name: "SMOOTH_SANDSTONE", label: "Piedra arenisca suave", color: "#ddd08f", category: "Piedra", orientationSafe: true },
  { name: "RED_SANDSTONE", label: "Piedra arenisca roja", color: "#a3562a", category: "Piedra", orientationSafe: true },
  { name: "SMOOTH_RED_SANDSTONE", label: "Piedra arenisca roja suave", color: "#ab5d2f", category: "Piedra", orientationSafe: true },
  { name: "PRISMARINE", label: "Prismarina", color: "#699e94", category: "Piedra", orientationSafe: true },
  { name: "PRISMARINE_BRICKS", label: "Ladrillos de prismarina", color: "#5fb3a3", category: "Piedra", orientationSafe: true },
  { name: "DARK_PRISMARINE", label: "Prismarina oscura", color: "#3c5c50", category: "Piedra", orientationSafe: true },
  { name: "END_STONE", label: "Piedra del End", color: "#dbdca3", category: "Piedra", orientationSafe: true },
  { name: "END_STONE_BRICKS", label: "Ladrillos de piedra del End", color: "#e2e3ae", category: "Piedra", orientationSafe: true },
  { name: "QUARTZ_BLOCK", label: "Bloque de cuarzo", color: "#ece6dc", category: "Piedra", orientationSafe: true },
  { name: "SMOOTH_QUARTZ", label: "Cuarzo suave", color: "#ede7dd", category: "Piedra", orientationSafe: true },
  { name: "CHISELED_QUARTZ_BLOCK", label: "Cuarzo cincelado", color: "#e6e0d5", category: "Piedra", orientationSafe: true },
  { name: "PACKED_ICE", label: "Hielo compacto", color: "#a4c2e0", category: "Piedra", orientationSafe: true },
  { name: "BLUE_ICE", label: "Hielo azul", color: "#74a9e3", category: "Piedra", orientationSafe: true },
  { name: "SNOW_BLOCK", label: "Bloque de nieve", color: "#f2f8fb", category: "Piedra", orientationSafe: true },

  // --- Madera -----------------------------------------------------------
  { name: "OAK_PLANKS", label: "Tablones de roble", color: "#b38b53", category: "Madera", orientationSafe: true },
  { name: "SPRUCE_PLANKS", label: "Tablones de abeto", color: "#71543a", category: "Madera", orientationSafe: true },
  { name: "BIRCH_PLANKS", label: "Tablones de abedul", color: "#d7c78b", category: "Madera", orientationSafe: true },
  { name: "JUNGLE_PLANKS", label: "Tablones de jungla", color: "#b0805a", category: "Madera", orientationSafe: true },
  { name: "ACACIA_PLANKS", label: "Tablones de acacia", color: "#ba6337", category: "Madera", orientationSafe: true },
  { name: "DARK_OAK_PLANKS", label: "Tablones de roble oscuro", color: "#402c19", category: "Madera", orientationSafe: true },
  { name: "MANGROVE_PLANKS", label: "Tablones de mangle", color: "#7c3131", category: "Madera", orientationSafe: true },
  { name: "CHERRY_PLANKS", label: "Tablones de cerezo", color: "#e5b6a8", category: "Madera", orientationSafe: true },
  { name: "BAMBOO_PLANKS", label: "Tablones de bambú", color: "#c7b34a", category: "Madera", orientationSafe: true },
  { name: "CRIMSON_PLANKS", label: "Tablones carmesí", color: "#7a4257", category: "Madera", orientationSafe: true },
  { name: "WARPED_PLANKS", label: "Tablones distorsionados", color: "#2b6e69", category: "Madera", orientationSafe: true },
  { name: "OAK_LOG", label: "Tronco de roble", color: "#6b542f", category: "Madera", orientationSafe: true },
  { name: "SPRUCE_LOG", label: "Tronco de abeto", color: "#4a3a24", category: "Madera", orientationSafe: true },
  { name: "DARK_OAK_LOG", label: "Tronco de roble oscuro", color: "#38291a", category: "Madera", orientationSafe: true },
  { name: "BOOKSHELF", label: "Estantería", color: "#7a5a35", category: "Madera", orientationSafe: true },
  { name: "CHISELED_BOOKSHELF", label: "Estantería cincelada", color: "#8a6a45", category: "Madera", orientationSafe: false },

  // --- Nether / End -------------------------------------------------------
  { name: "NETHERRACK", label: "Piedra del Nether", color: "#6b2c28", category: "Nether / End", orientationSafe: true },
  { name: "NETHER_BRICKS", label: "Ladrillos del Nether", color: "#2c1719", category: "Nether / End", orientationSafe: true },
  { name: "CRACKED_NETHER_BRICKS", label: "Ladrillos del Nether agrietados", color: "#291517", category: "Nether / End", orientationSafe: true },
  { name: "CHISELED_NETHER_BRICKS", label: "Ladrillos del Nether cincelados", color: "#301a1c", category: "Nether / End", orientationSafe: true },
  { name: "RED_NETHER_BRICKS", label: "Ladrillos rojos del Nether", color: "#480c0e", category: "Nether / End", orientationSafe: true },
  { name: "BASALT", label: "Basalto", color: "#4c4b4f", category: "Nether / End", orientationSafe: true },
  { name: "SMOOTH_BASALT", label: "Basalto suave", color: "#4a494d", category: "Nether / End", orientationSafe: true },
  { name: "BLACKSTONE", label: "Piedra negra", color: "#2b2530", category: "Nether / End", orientationSafe: true },
  { name: "POLISHED_BLACKSTONE", label: "Piedra negra pulida", color: "#3a3440", category: "Nether / End", orientationSafe: true },
  { name: "POLISHED_BLACKSTONE_BRICKS", label: "Ladrillos de piedra negra pulida", color: "#332e38", category: "Nether / End", orientationSafe: true },
  { name: "CHISELED_POLISHED_BLACKSTONE", label: "Piedra negra pulida cincelada", color: "#3d3742", category: "Nether / End", orientationSafe: true },
  { name: "GILDED_BLACKSTONE", label: "Piedra negra dorada", color: "#463829", category: "Nether / End", orientationSafe: true },
  { name: "OBSIDIAN", label: "Obsidiana", color: "#160f22", category: "Nether / End", orientationSafe: true },
  { name: "CRYING_OBSIDIAN", label: "Obsidiana llorosa", color: "#26113a", category: "Nether / End", orientationSafe: true },
  { name: "MAGMA_BLOCK", label: "Bloque de magma", color: "#a24a1e", category: "Nether / End", orientationSafe: true },
  { name: "SOUL_SAND", label: "Arena de las almas", color: "#4f3b2c", category: "Nether / End", orientationSafe: true },
  { name: "SOUL_SOIL", label: "Tierra de las almas", color: "#453324", category: "Nether / End", orientationSafe: true },
  { name: "WARPED_NYLIUM", label: "Nylium distorsionado", color: "#209488", category: "Nether / End", orientationSafe: true },
  { name: "CRIMSON_NYLIUM", label: "Nylium carmesí", color: "#8a1f27", category: "Nether / End", orientationSafe: true },
  { name: "SHROOMLIGHT", label: "Luz de hongo", color: "#f08a3c", category: "Nether / End", orientationSafe: true },
  { name: "PURPUR_BLOCK", label: "Bloque púrpura", color: "#a984aa", category: "Nether / End", orientationSafe: true },
  { name: "PURPUR_PILLAR", label: "Pilar púrpura", color: "#ad8bae", category: "Nether / End", orientationSafe: true },

  // --- Coloridos (concreto / terracota / lana) ---------------------------
  { name: "WHITE_CONCRETE", label: "Concreto blanco", color: "#e4e4e4", category: "Coloridos", orientationSafe: true },
  { name: "LIGHT_GRAY_CONCRETE", label: "Concreto gris claro", color: "#9d9d97", category: "Coloridos", orientationSafe: true },
  { name: "GRAY_CONCRETE", label: "Concreto gris", color: "#3d3d3d", category: "Coloridos", orientationSafe: true },
  { name: "BLACK_CONCRETE", label: "Concreto negro", color: "#080a0e", category: "Coloridos", orientationSafe: true },
  { name: "RED_CONCRETE", label: "Concreto rojo", color: "#8e2121", category: "Coloridos", orientationSafe: true },
  { name: "ORANGE_CONCRETE", label: "Concreto naranja", color: "#e06101", category: "Coloridos", orientationSafe: true },
  { name: "YELLOW_CONCRETE", label: "Concreto amarillo", color: "#f0af15", category: "Coloridos", orientationSafe: true },
  { name: "LIME_CONCRETE", label: "Concreto lima", color: "#5da919", category: "Coloridos", orientationSafe: true },
  { name: "GREEN_CONCRETE", label: "Concreto verde", color: "#495b24", category: "Coloridos", orientationSafe: true },
  { name: "CYAN_CONCRETE", label: "Concreto cian", color: "#157788", category: "Coloridos", orientationSafe: true },
  { name: "LIGHT_BLUE_CONCRETE", label: "Concreto celeste", color: "#2489c7", category: "Coloridos", orientationSafe: true },
  { name: "BLUE_CONCRETE", label: "Concreto azul", color: "#2b3387", category: "Coloridos", orientationSafe: true },
  { name: "PURPLE_CONCRETE", label: "Concreto morado", color: "#64209c", category: "Coloridos", orientationSafe: true },
  { name: "MAGENTA_CONCRETE", label: "Concreto magenta", color: "#a9309f", category: "Coloridos", orientationSafe: true },
  { name: "PINK_CONCRETE", label: "Concreto rosa", color: "#d6658f", category: "Coloridos", orientationSafe: true },
  { name: "BROWN_CONCRETE", label: "Concreto marrón", color: "#603c20", category: "Coloridos", orientationSafe: true },
  { name: "WHITE_TERRACOTTA", label: "Terracota blanca", color: "#d1b2a1", category: "Coloridos", orientationSafe: true },
  { name: "RED_TERRACOTTA", label: "Terracota roja", color: "#8f3d2e", category: "Coloridos", orientationSafe: true },
  { name: "ORANGE_TERRACOTTA", label: "Terracota naranja", color: "#a05426", category: "Coloridos", orientationSafe: true },
  { name: "BROWN_TERRACOTTA", label: "Terracota marrón", color: "#4d3324", category: "Coloridos", orientationSafe: true },
  { name: "CYAN_TERRACOTTA", label: "Terracota cian", color: "#5b7279", category: "Coloridos", orientationSafe: true },
  { name: "BLUE_TERRACOTTA", label: "Terracota azul", color: "#4a3963", category: "Coloridos", orientationSafe: true },
  { name: "BLACK_TERRACOTTA", label: "Terracota negra", color: "#251710", category: "Coloridos", orientationSafe: true },
  { name: "WHITE_WOOL", label: "Lana blanca", color: "#e9e9e9", category: "Coloridos", orientationSafe: true },
  { name: "RED_WOOL", label: "Lana roja", color: "#9c2b27", category: "Coloridos", orientationSafe: true },
  { name: "BLUE_WOOL", label: "Lana azul", color: "#31379b", category: "Coloridos", orientationSafe: true },
  { name: "GREEN_WOOL", label: "Lana verde", color: "#495a24", category: "Coloridos", orientationSafe: true },
  { name: "BLACK_WOOL", label: "Lana negra", color: "#191919", category: "Coloridos", orientationSafe: true },

  // --- Vidrio -------------------------------------------------------------
  { name: "GLASS", label: "Vidrio", color: "#dfefef", category: "Vidrio", orientationSafe: true },
  { name: "WHITE_STAINED_GLASS", label: "Vidrio teñido blanco", color: "#e8e8e8", category: "Vidrio", orientationSafe: true },
  { name: "RED_STAINED_GLASS", label: "Vidrio teñido rojo", color: "#a5322d", category: "Vidrio", orientationSafe: true },
  { name: "ORANGE_STAINED_GLASS", label: "Vidrio teñido naranja", color: "#e5701d", category: "Vidrio", orientationSafe: true },
  { name: "YELLOW_STAINED_GLASS", label: "Vidrio teñido amarillo", color: "#f0c92a", category: "Vidrio", orientationSafe: true },
  { name: "GREEN_STAINED_GLASS", label: "Vidrio teñido verde", color: "#54622a", category: "Vidrio", orientationSafe: true },
  { name: "LIGHT_BLUE_STAINED_GLASS", label: "Vidrio teñido celeste", color: "#3aa8d8", category: "Vidrio", orientationSafe: true },
  { name: "BLUE_STAINED_GLASS", label: "Vidrio teñido azul", color: "#334cb2", category: "Vidrio", orientationSafe: true },
  { name: "PURPLE_STAINED_GLASS", label: "Vidrio teñido morado", color: "#7b2fad", category: "Vidrio", orientationSafe: true },
  { name: "MAGENTA_STAINED_GLASS", label: "Vidrio teñido magenta", color: "#c04cb8", category: "Vidrio", orientationSafe: true },
  { name: "PINK_STAINED_GLASS", label: "Vidrio teñido rosa", color: "#e893b3", category: "Vidrio", orientationSafe: true },
  { name: "BLACK_STAINED_GLASS", label: "Vidrio teñido negro", color: "#1c1c22", category: "Vidrio", orientationSafe: true },
  { name: "TINTED_GLASS", label: "Vidrio ahumado", color: "#2c2933", category: "Vidrio", orientationSafe: true },

  // --- Naturaleza -----------------------------------------------------
  { name: "GRASS_BLOCK", label: "Bloque de hierba", color: "#5a9c3c", category: "Naturaleza", orientationSafe: true },
  { name: "DIRT", label: "Tierra", color: "#7a5a3a", category: "Naturaleza", orientationSafe: true },
  { name: "PODZOL", label: "Podzol", color: "#5a3c22", category: "Naturaleza", orientationSafe: true },
  { name: "MYCELIUM", label: "Micelio", color: "#6b6272", category: "Naturaleza", orientationSafe: true },
  { name: "MOSS_BLOCK", label: "Bloque de musgo", color: "#587a30", category: "Naturaleza", orientationSafe: true },
  { name: "MUD", label: "Barro", color: "#413a35", category: "Naturaleza", orientationSafe: true },
  { name: "OAK_LEAVES", label: "Hojas de roble", color: "#4a7a2e", category: "Naturaleza", orientationSafe: true },
  { name: "SPRUCE_LEAVES", label: "Hojas de abeto", color: "#3e5c34", category: "Naturaleza", orientationSafe: true },
  { name: "AZALEA_LEAVES", label: "Hojas de azalea", color: "#5c8a3a", category: "Naturaleza", orientationSafe: true },
  { name: "SAND", label: "Arena", color: "#dccf9e", category: "Naturaleza", orientationSafe: true },
  { name: "RED_SAND", label: "Arena roja", color: "#a35a2a", category: "Naturaleza", orientationSafe: true },
  { name: "GRAVEL", label: "Grava", color: "#8b857e", category: "Naturaleza", orientationSafe: true },
  { name: "CLAY", label: "Arcilla", color: "#9ea7b1", category: "Naturaleza", orientationSafe: true },
  { name: "ICE", label: "Hielo", color: "#9bc6e8", category: "Naturaleza", orientationSafe: true },
  { name: "WATER", label: "Agua", color: "#3f76e4", category: "Naturaleza", orientationSafe: true },
  { name: "LAVA", label: "Lava", color: "#e2660b", category: "Naturaleza", orientationSafe: true },
  { name: "COBWEB", label: "Telaraña", color: "#e4e4e4", category: "Naturaleza", orientationSafe: true },
  { name: "HAY_BLOCK", label: "Bloque de heno", color: "#c9a028", category: "Naturaleza", orientationSafe: true },
  { name: "MELON", label: "Sandía", color: "#6a9c2c", category: "Naturaleza", orientationSafe: true },
  { name: "PUMPKIN", label: "Calabaza", color: "#c9741a", category: "Naturaleza", orientationSafe: true },
  { name: "JACK_O_LANTERN", label: "Calabaza tallada", color: "#d68420", category: "Naturaleza", orientationSafe: false },

  // --- Metales y gemas --------------------------------------------------
  { name: "IRON_BLOCK", label: "Bloque de hierro", color: "#e4e4e4", category: "Metales y gemas", orientationSafe: true },
  { name: "GOLD_BLOCK", label: "Bloque de oro", color: "#f5cc4b", category: "Metales y gemas", orientationSafe: true },
  { name: "DIAMOND_BLOCK", label: "Bloque de diamante", color: "#6ee8d8", category: "Metales y gemas", orientationSafe: true },
  { name: "EMERALD_BLOCK", label: "Bloque de esmeralda", color: "#3fcc6e", category: "Metales y gemas", orientationSafe: true },
  { name: "LAPIS_BLOCK", label: "Bloque de lapislázuli", color: "#2f4d9e", category: "Metales y gemas", orientationSafe: true },
  { name: "REDSTONE_BLOCK", label: "Bloque de redstone", color: "#a3131a", category: "Metales y gemas", orientationSafe: true },
  { name: "NETHERITE_BLOCK", label: "Bloque de netherita", color: "#463f42", category: "Metales y gemas", orientationSafe: true },
  { name: "COPPER_BLOCK", label: "Bloque de cobre", color: "#c36a4a", category: "Metales y gemas", orientationSafe: true },
  { name: "EXPOSED_COPPER", label: "Cobre expuesto", color: "#a97a5f", category: "Metales y gemas", orientationSafe: true },
  { name: "WEATHERED_COPPER", label: "Cobre erosionado", color: "#6b9a7a", category: "Metales y gemas", orientationSafe: true },
  { name: "OXIDIZED_COPPER", label: "Cobre oxidado", color: "#4f9573", category: "Metales y gemas", orientationSafe: true },
  { name: "CUT_COPPER", label: "Cobre cortado", color: "#c17654", category: "Metales y gemas", orientationSafe: true },
  { name: "AMETHYST_BLOCK", label: "Bloque de amatista", color: "#8d63c9", category: "Metales y gemas", orientationSafe: true },
  { name: "BUDDING_AMETHYST", label: "Amatista germinante", color: "#7e57bb", category: "Metales y gemas", orientationSafe: true },

  // --- Decoración ---------------------------------------------------------
  { name: "GLOWSTONE", label: "Piedra luminosa", color: "#f2c96a", category: "Decoración", orientationSafe: true },
  { name: "SEA_LANTERN", label: "Linterna marina", color: "#c4e8db", category: "Decoración", orientationSafe: true },
  { name: "TORCH", label: "Antorcha (de pie)", color: "#ffcc55", category: "Decoración", orientationSafe: true },
  { name: "SOUL_TORCH", label: "Antorcha de alma (de pie)", color: "#4fc9d6", category: "Decoración", orientationSafe: true },
  { name: "END_ROD", label: "Vara del End", color: "#e8dfd0", category: "Decoración", orientationSafe: false },
  { name: "CHEST", label: "Cofre", color: "#9a6a34", category: "Decoración", orientationSafe: true },
  { name: "ENDER_CHEST", label: "Cofre de ender", color: "#1a3d3a", category: "Decoración", orientationSafe: true },
  { name: "CRAFTING_TABLE", label: "Mesa de crafteo", color: "#8a6540", category: "Decoración", orientationSafe: true },
  { name: "ANVIL", label: "Yunque", color: "#3a3a3a", category: "Decoración", orientationSafe: false },
  { name: "IRON_BARS", label: "Rejas de hierro", color: "#9a9a9a", category: "Decoración", orientationSafe: true },
  { name: "LANTERN", label: "Farol (de pie)", color: "#4a3a24", category: "Decoración", orientationSafe: true },
  { name: "BEACON", label: "Faro", color: "#6ee8d8", category: "Decoración", orientationSafe: true },
  { name: "SPAWNER", label: "Generador de mobs", color: "#1f2b33", category: "Decoración", orientationSafe: true },
  { name: "BARREL", label: "Barril", color: "#6b4e2e", category: "Decoración", orientationSafe: false },
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

  return !/(DOOR|STAIRS|TRAPDOOR|BED|WALL_TORCH|_WALL_|FENCE_GATE|SIGN|BUTTON|LEVER|RAIL|SLAB|ANVIL|BARREL|SPAWNER|SHULKER|FURNACE|SMOKER|END_ROD|CAMPFIRE)/.test(name);
}

export const MATERIAL_CATEGORIES: MaterialCategory[] = [
  "Piedra",
  "Madera",
  "Nether / End",
  "Coloridos",
  "Vidrio",
  "Naturaleza",
  "Metales y gemas",
  "Decoración",
];

/**
 * Símbolos de paleta autoasignados — excluye '.', ' ' (aire reservado) y
 * comillas (para que la salida YAML nunca necesite escapar la clave).
 */
export const SYMBOL_POOL =
  "#@%&*+=~^$XYZWVUTSRQPONMLKJIHGFEDCBAxyzwvutsrqponmlkjihgfedcba0123456789".split("");
