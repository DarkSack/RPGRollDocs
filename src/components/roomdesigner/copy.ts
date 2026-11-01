import type { Locale } from "../../i18n";
import type { MaterialCategory } from "./materials";

/** Texto de la interfaz del Diseñador de Salas. */

const es = {
  fId: "Id",
  fDisplayName: "Nombre visible",
  fIcon: "Ícono (Material, para la GUI)",
  fDescription: "Descripción",
  phOptional: "Opcional",
  fWidth: "Ancho (X)",
  fHeight: "Alto (Y, capas)",
  fDepth: "Profundidad (Z)",
  download: "Descargar",

  paletteTitle: "Paleta ({n} materiales curados + cualquier otro a mano)",
  brushAir: "Aire (borrar)",
  addMaterial: "+ Agregar material a la paleta",
  searchPh: "Buscar material curado (ej. cobre, vidrio, roble...)",
  noResults: "Sin resultados para «{q}» — prueba con otro nombre, o escríbelo directo abajo.",
  customPh: "Otro Material exacto (ej. NETHERITE_BLOCK)",
  add: "Agregar",
  maxSymbols: "Llegaste al máximo de {n} materiales distintos en una sola estructura.",
  removeFromPalette: "Quitar de la paleta",
  orientationWarn: "Este material tiene orientación — se pega sin ella",

  floor: "Piso (y=0)",
  ceiling: "Techo (y={y})",
  layerN: "Capa y={y}",
  anchorTitle:
    "Clic en una celda para mover el punto de pegado (anchor) a esa posición, en esta capa",
  anchorSetting: "Clic para fijar ancla…",
  anchorSet: "Fijar ancla",
  copyBelow: "Copiar capa de abajo",
  fillLayer: "Rellenar",
  clearLayer: "Vaciar",
  gridHint: "Toca o haz clic y arrastra para pintar varias celdas · X →, Z ↓ · {w}×{d} en esta capa",
  gridHintScroll: " · desplázate con el dedo si no entra en pantalla",

  preview3d: "Vista previa 3D",
  insideTitle: "Ocultar capas por encima de la que estás editando, para ver el interior",
  upToLayer: "Hasta capa actual",
  allLayers: "Todas las capas",
  rotateLeft: "Girar 45° a la izquierda",
  rotateRight: "Girar 45° a la derecha",
  zoomOut: "Alejar",
  zoomIn: "Acercar",
  reset: "Reset",
  previewHint:
    "Arrastra para rotar · rueda del mouse (o pellizca) para zoom · el punto naranja es el ancla",

  categories: {
    Piedra: "Piedra",
    Madera: "Madera",
    "Nether / End": "Nether / End",
    Coloridos: "Coloridos",
    Vidrio: "Vidrio",
    Naturaleza: "Naturaleza",
    "Metales y gemas": "Metales y gemas",
    Decoración: "Decoración",
  } as Record<MaterialCategory, string>,
};

export type RoomToolCopy = typeof es;

const en: RoomToolCopy = {
  fId: "Id",
  fDisplayName: "Display name",
  fIcon: "Icon (Material, for the GUI)",
  fDescription: "Description",
  phOptional: "Optional",
  fWidth: "Width (X)",
  fHeight: "Height (Y, layers)",
  fDepth: "Depth (Z)",
  download: "Download",

  paletteTitle: "Palette ({n} curated materials + any other one by hand)",
  brushAir: "Air (erase)",
  addMaterial: "+ Add a material to the palette",
  searchPh: "Search a curated material (e.g. copper, glass, oak...)",
  noResults: "No results for “{q}” — try another name, or type it straight in below.",
  customPh: "Another exact Material (e.g. NETHERITE_BLOCK)",
  add: "Add",
  maxSymbols: "You reached the maximum of {n} distinct materials in a single structure.",
  removeFromPalette: "Remove from the palette",
  orientationWarn: "This material has an orientation — it is pasted without it",

  floor: "Floor (y=0)",
  ceiling: "Ceiling (y={y})",
  layerN: "Layer y={y}",
  anchorTitle:
    "Click a cell to move the paste point (anchor) to that position, on this layer",
  anchorSetting: "Click to set the anchor…",
  anchorSet: "Set anchor",
  copyBelow: "Copy the layer below",
  fillLayer: "Fill",
  clearLayer: "Clear",
  gridHint: "Tap or click and drag to paint several cells · X →, Z ↓ · {w}×{d} on this layer",
  gridHintScroll: " · swipe with your finger if it does not fit on screen",

  preview3d: "3D preview",
  insideTitle: "Hide the layers above the one you are editing, to see inside",
  upToLayer: "Up to the current layer",
  allLayers: "All the layers",
  rotateLeft: "Rotate 45° left",
  rotateRight: "Rotate 45° right",
  zoomOut: "Zoom out",
  zoomIn: "Zoom in",
  reset: "Reset",
  previewHint:
    "Drag to rotate · mouse wheel (or pinch) to zoom · the orange dot is the anchor",

  categories: {
    Piedra: "Stone",
    Madera: "Wood",
    "Nether / End": "Nether / End",
    Coloridos: "Colorful",
    Vidrio: "Glass",
    Naturaleza: "Nature",
    "Metales y gemas": "Metals & gems",
    Decoración: "Decoration",
  },
};

const pt: RoomToolCopy = {
  fId: "Id",
  fDisplayName: "Nome visível",
  fIcon: "Ícone (Material, para a GUI)",
  fDescription: "Descrição",
  phOptional: "Opcional",
  fWidth: "Largura (X)",
  fHeight: "Altura (Y, camadas)",
  fDepth: "Profundidade (Z)",
  download: "Baixar",

  paletteTitle: "Paleta ({n} materiais curados + qualquer outro à mão)",
  brushAir: "Ar (apagar)",
  addMaterial: "+ Adicionar material à paleta",
  searchPh: "Buscar material curado (ex. cobre, vidro, carvalho...)",
  noResults: "Sem resultados para “{q}” — tente outro nome, ou escreva-o direto abaixo.",
  customPh: "Outro Material exato (ex. NETHERITE_BLOCK)",
  add: "Adicionar",
  maxSymbols: "Você chegou ao máximo de {n} materiais distintos em uma única estrutura.",
  removeFromPalette: "Remover da paleta",
  orientationWarn: "Este material tem orientação — é colado sem ela",

  floor: "Piso (y=0)",
  ceiling: "Teto (y={y})",
  layerN: "Camada y={y}",
  anchorTitle:
    "Clique em uma célula para mover o ponto de colagem (anchor) para essa posição, nesta camada",
  anchorSetting: "Clique para fixar a âncora…",
  anchorSet: "Fixar âncora",
  copyBelow: "Copiar a camada de baixo",
  fillLayer: "Preencher",
  clearLayer: "Limpar",
  gridHint: "Toque ou clique e arraste para pintar várias células · X →, Z ↓ · {w}×{d} nesta camada",
  gridHintScroll: " · deslize com o dedo se não couber na tela",

  preview3d: "Pré-visualização 3D",
  insideTitle: "Ocultar as camadas acima da que você está editando, para ver o interior",
  upToLayer: "Até a camada atual",
  allLayers: "Todas as camadas",
  rotateLeft: "Girar 45° à esquerda",
  rotateRight: "Girar 45° à direita",
  zoomOut: "Afastar",
  zoomIn: "Aproximar",
  reset: "Reset",
  previewHint:
    "Arraste para rotacionar · roda do mouse (ou pinça) para zoom · o ponto laranja é a âncora",

  categories: {
    Piedra: "Pedra",
    Madera: "Madeira",
    "Nether / End": "Nether / End",
    Coloridos: "Coloridos",
    Vidrio: "Vidro",
    Naturaleza: "Natureza",
    "Metales y gemas": "Metais e gemas",
    Decoración: "Decoração",
  },
};

export const ROOM_TOOL_COPY: Record<Locale, RoomToolCopy> = { es, en, pt };
