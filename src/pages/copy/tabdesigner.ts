import type { Locale } from "../../i18n";

/** Texto de la página del Diseñador de TAB. */

const es = {
  title: "Diseñador de TAB",
  eyebrow: "Herramienta",
  intro:
    "Arma perfiles, contextos, scoreboards, tablists, nametags, belowname, bossbars, sorting, teams y animaciones para {tab} con formularios en vez de escribir el YAML a mano, y copia o descarga el resultado listo para pegar en el servidor — sin instalar nada ni tocar código Java.",

  browserTitle: "100% en el navegador",
  browserBody:
    "Esta herramienta corre entera aquí en la página — no habla con ningún servidor. Lo que produce es texto YAML: lo copias o descargas, y lo pegas en la carpeta correspondiente bajo {dir} (ej. {d1}, {d2}, {d3}...). Es el mismo formato que ya leen los {parser} de cada tipo, así que no hace falta cambiar nada del lado del plugin.",

  howTitle: "Cómo usarlo",
  step1:
    "Elige una pestaña arriba (Perfiles, Contextos, Scoreboards, Tablists...) — cada una es una carpeta distinta de contenido.",
  step2:
    "Agrega una entrada nueva o elige una de la lista de la izquierda. Los campos que referencian otro contenido (ej. el {tablist} de un Perfil) tienen autocompletado con los ids que ya creaste en esa pestaña.",
  step3:
    "Completa el formulario — el YAML de la derecha se actualiza solo, con el mismo nombre de archivo esperado.",
  step4: "Copia o descarga el archivo, y repite para cada tipo de contenido que necesites.",

  warnTitle: "No reemplaza ningún editor in-game",
  warnBody:
    "RPGRoll-TAB no tiene GUI Studio dentro del juego (a diferencia de la mayoría de los otros addons) — esta herramienta web es la forma soportada de armar el contenido sin escribir el schema de memoria. Después de pegar los archivos, ejecuta {reload} en el servidor para aplicarlos.",

  toolTitle: "La herramienta",

  nextTitle: "Siguiente paso",
  nextBody:
    "Con los archivos ya en {dir}, ejecuta {reload} — ver la sección {commands} de la documentación de TAB para el resto de los comandos de administración, y {engine} para entender cómo se elige, entre varios Contextos que coinciden, cuál perfil termina aplicado.",
  commandsLink: "Comandos",
  folderWord: "carpeta",
};

export type TabDesignerCopy = typeof es;

const en: TabDesignerCopy = {
  title: "TAB Designer",
  eyebrow: "Tool",
  intro:
    "Build profiles, contexts, scoreboards, tablists, nametags, belowname, bossbars, sorting, teams and animations for {tab} with forms instead of writing the YAML by hand, and copy or download the result ready to paste on the server — with nothing to install and no Java code to touch.",

  browserTitle: "100% in the browser",
  browserBody:
    "This tool runs entirely here on the page — it talks to no server. What it produces is YAML text: you copy or download it, and paste it into the matching folder under {dir} (e.g. {d1}, {d2}, {d3}...). It is the same format each type's {parser} already reads, so nothing needs to change on the plugin's side.",

  howTitle: "How to use it",
  step1:
    "Pick a tab at the top (Profiles, Contexts, Scoreboards, Tablists...) — each one is a different content folder.",
  step2:
    "Add a new entry or pick one from the list on the left. The fields that reference other content (e.g. a Profile's {tablist}) have autocomplete with the ids you already created in that tab.",
  step3:
    "Fill in the form — the YAML on the right updates by itself, with the expected file name.",
  step4: "Copy or download the file, and repeat for each content type you need.",

  warnTitle: "It replaces no in-game editor",
  warnBody:
    "RPGRoll-TAB has no GUI Studio inside the game (unlike most of the other addons) — this web tool is the supported way to build the content without writing the schema from memory. After pasting the files, run {reload} on the server to apply them.",

  toolTitle: "The tool",

  nextTitle: "Next step",
  nextBody:
    "With the files already in {dir}, run {reload} — see the {commands} section of the TAB documentation for the rest of the admin commands, and {engine} to understand how, among several matching Contexts, the profile that ends up applied is chosen.",
  commandsLink: "Commands",
  folderWord: "folder",
};

const pt: TabDesignerCopy = {
  title: "Designer de TAB",
  eyebrow: "Ferramenta",
  intro:
    "Monte perfis, contextos, scoreboards, tablists, nametags, belowname, bossbars, sorting, teams e animações para {tab} com formulários em vez de escrever o YAML à mão, e copie ou baixe o resultado pronto para colar no servidor — sem instalar nada nem tocar em código Java.",

  browserTitle: "100% no navegador",
  browserBody:
    "Esta ferramenta roda inteira aqui na página — não fala com nenhum servidor. O que ela produz é texto YAML: você copia ou baixa, e cola na pasta correspondente sob {dir} (ex. {d1}, {d2}, {d3}...). É o mesmo formato que os {parser} de cada tipo já leem, então não é preciso mudar nada do lado do plugin.",

  howTitle: "Como usar",
  step1:
    "Escolha uma aba acima (Perfis, Contextos, Scoreboards, Tablists...) — cada uma é uma pasta de conteúdo diferente.",
  step2:
    "Adicione uma entrada nova ou escolha uma da lista da esquerda. Os campos que referenciam outro conteúdo (ex. o {tablist} de um Perfil) têm autocompletar com os ids que você já criou nessa aba.",
  step3:
    "Preencha o formulário — o YAML da direita se atualiza sozinho, com o mesmo nome de arquivo esperado.",
  step4: "Copie ou baixe o arquivo, e repita para cada tipo de conteúdo que precisar.",

  warnTitle: "Não substitui nenhum editor in-game",
  warnBody:
    "O RPGRoll-TAB não tem GUI Studio dentro do jogo (ao contrário da maioria dos outros addons) — esta ferramenta web é a forma suportada de montar o conteúdo sem escrever o schema de memória. Depois de colar os arquivos, execute {reload} no servidor para aplicá-los.",

  toolTitle: "A ferramenta",

  nextTitle: "Próximo passo",
  nextBody:
    "Com os arquivos já em {dir}, execute {reload} — veja a seção {commands} da documentação de TAB para o resto dos comandos de administração, e {engine} para entender como, entre vários Contextos que correspondem, o perfil que acaba aplicado é escolhido.",
  commandsLink: "Comandos",
  folderWord: "pasta",
};

export const TAB_DESIGNER_COPY: Record<Locale, TabDesignerCopy> = { es, en, pt };
