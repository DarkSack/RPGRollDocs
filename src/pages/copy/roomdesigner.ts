import type { Locale } from "../../i18n";

/** Texto de la página del Diseñador de Salas. */

const es = {
  title: "Diseñador de Salas",
  eyebrow: "Herramienta",
  intro:
    "Diseña una estructura CUSTOM para la {library} de RPGRoll-Dungeons pintando capa por capa, mirándola en 3D en vivo, y copiando el YAML ya armado — sin instalar nada ni tocar código Java.",
  libraryLink: "Biblioteca de Estructuras",

  browserTitle: "100% en el navegador",
  browserBody:
    "Esta herramienta corre entera aquí en la página — no habla con ningún servidor. Lo que produce es texto YAML: lo copias o descargas, y lo pegas en {dir} en tu servidor. Es el mismo formato CUSTOM que ya lee {parser}, así que no hace falta cambiar nada del lado del plugin.",

  howTitle: "Cómo usarlo",
  step1:
    "Elige el tamaño (ancho/alto/profundidad) — puedes cambiarlo después, se preserva lo que ya pintaste donde entra.",
  step2:
    "Agrega materiales a la paleta (con el buscador curado o escribiendo cualquier Material a mano) y elige uno como pincel activo.",
  step3:
    "Pinta capa por capa: subes y bajas con las flechas, haces clic y arrastras para pintar varias celdas de una. El piso es la capa y=0.",
  step4:
    "Marca el punto de pegado («Fijar ancla») — normalmente el centro del piso, así al pegar en el juego te paras donde quieres el centro de la sala.",
  step5:
    "Mira el resultado en 3D (arrastrar rota, la rueda hace zoom) y copia o descarga el YAML de abajo.",

  warnTitle: "Sin orientación de bloques",
  warnBody:
    "El motor de pegado CUSTOM hace {setType} plano — puertas, escaleras, antorchas de pared y camas quedan con una orientación por defecto, no la que «deberían» tener. El selector de materiales avisa con ⚠ cuando un material curado tiene este problema; si escribes uno a mano, el aviso no puede detectarlo automáticamente.",

  toolTitle: "La herramienta",

  nextTitle: "Siguiente paso",
  nextBody:
    "Con el archivo ya en {dir}, ejecuta {reload} en el juego y pégala con {browser} — ver la sección {link} de la documentación de Dungeons para el detalle completo (incluye la alternativa con Structure Block vanilla, para construir a mano en el juego en vez de aquí).",
  pasteLink: "Pegar una estructura",
};

export type RoomDesignerCopy = typeof es;

const en: RoomDesignerCopy = {
  title: "Room Designer",
  eyebrow: "Tool",
  intro:
    "Design a CUSTOM structure for RPGRoll-Dungeons' {library} by painting layer by layer, watching it in live 3D, and copying the finished YAML — with nothing to install and no Java code to touch.",
  libraryLink: "Structure Library",

  browserTitle: "100% in the browser",
  browserBody:
    "This tool runs entirely here on the page — it talks to no server. What it produces is YAML text: you copy or download it, and paste it into {dir} on your server. It is the same CUSTOM format {parser} already reads, so nothing needs to change on the plugin's side.",

  howTitle: "How to use it",
  step1:
    "Choose the size (width/height/depth) — you can change it later, and whatever you already painted is preserved where it fits.",
  step2:
    "Add materials to the palette (with the curated search or by typing any Material by hand) and pick one as the active brush.",
  step3:
    "Paint layer by layer: move up and down with the arrows, click and drag to paint several cells at once. The floor is layer y=0.",
  step4:
    "Mark the paste point (“Set anchor”) — usually the centre of the floor, so that when pasting in game you stand where you want the room's centre.",
  step5:
    "Look at the result in 3D (dragging rotates, the wheel zooms) and copy or download the YAML below.",

  warnTitle: "No block orientation",
  warnBody:
    "The CUSTOM pasting engine does a plain {setType} — doors, stairs, wall torches and beds end up with a default orientation, not the one they “should” have. The material picker warns with a ⚠ when a curated material has this problem; if you type one by hand, the warning cannot detect it automatically.",

  toolTitle: "The tool",

  nextTitle: "Next step",
  nextBody:
    "With the file already in {dir}, run {reload} in game and paste it with {browser} — see the {link} section of the Dungeons documentation for the full detail (it includes the vanilla Structure Block alternative, to build by hand in game instead of here).",
  pasteLink: "Pasting a structure",
};

const pt: RoomDesignerCopy = {
  title: "Designer de Salas",
  eyebrow: "Ferramenta",
  intro:
    "Desenhe uma estrutura CUSTOM para a {library} do RPGRoll-Dungeons pintando camada por camada, vendo-a em 3D ao vivo, e copiando o YAML já montado — sem instalar nada nem tocar em código Java.",
  libraryLink: "Biblioteca de Estruturas",

  browserTitle: "100% no navegador",
  browserBody:
    "Esta ferramenta roda inteira aqui na página — não fala com nenhum servidor. O que ela produz é texto YAML: você copia ou baixa, e cola em {dir} no seu servidor. É o mesmo formato CUSTOM que {parser} já lê, então não é preciso mudar nada do lado do plugin.",

  howTitle: "Como usar",
  step1:
    "Escolha o tamanho (largura/altura/profundidade) — você pode mudá-lo depois, e o que já pintou é preservado onde couber.",
  step2:
    "Adicione materiais à paleta (com a busca curada ou escrevendo qualquer Material à mão) e escolha um como pincel ativo.",
  step3:
    "Pinte camada por camada: sobe e desce com as setas, clica e arrasta para pintar várias células de uma vez. O piso é a camada y=0.",
  step4:
    "Marque o ponto de colagem (“Fixar âncora”) — normalmente o centro do piso, assim ao colar no jogo você fica onde quer o centro da sala.",
  step5:
    "Veja o resultado em 3D (arrastar rotaciona, a roda dá zoom) e copie ou baixe o YAML abaixo.",

  warnTitle: "Sem orientação de blocos",
  warnBody:
    "O motor de colagem CUSTOM faz um {setType} simples — portas, escadas, tochas de parede e camas ficam com uma orientação padrão, não a que “deveriam” ter. O seletor de materiais avisa com ⚠ quando um material curado tem esse problema; se você escrever um à mão, o aviso não consegue detectá-lo automaticamente.",

  toolTitle: "A ferramenta",

  nextTitle: "Próximo passo",
  nextBody:
    "Com o arquivo já em {dir}, execute {reload} no jogo e cole-a com {browser} — veja a seção {link} da documentação de Dungeons para o detalhe completo (inclui a alternativa com Structure Block vanilla, para construir à mão no jogo em vez de aqui).",
  pasteLink: "Colar uma estrutura",
};

export const ROOM_DESIGNER_COPY: Record<Locale, RoomDesignerCopy> = { es, en, pt };
