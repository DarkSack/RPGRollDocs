import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Recipes. Ver copy/quickStart.ts para el patrón. */

const es = {
  title: "Recetario (RPGRoll-Recipes)",
  intro:
    "Un recetario al estilo JEI para Paper: busca cualquier objeto y te dice cómo se hace y para qué sirve, con la mesa, el horno o la estación donde se hace. Lee solo las recetas vanilla, las de cualquier plugin que las registre en el servidor y las de las estaciones propias de RPGRoll, sin configurar nada.",

  reqTitle: "Requisitos",
  reqBody:
    "Solo {lib}. Los demás módulos son opcionales: si están, sus recetas salen en el recetario; el orden de carga ({soft}) solo asegura que ya existan cuando se monta el índice.",

  readsTitle: "Qué recetas lee",
  readsLead: "Todo esto sale solo, sin escribir nada:",
  thSource: "Origen",
  thWhat: "Qué aporta",
  srcBukkit: "Registro de recetas del servidor",
  srcBukkitP:
    "Mesa de crafteo (con forma y sin forma), horno, alto horno, ahumador, fogata, cortapiedras y mesa de herrería: las vanilla y las de CUALQUIER plugin que use el sistema de recetas del servidor, las lea de un YAML o las cree en código. Casi todos los plugins de ítems personalizados lo hacen.",
  srcBrewing: "Fermentación vanilla",
  srcBrewingP:
    "Todas las mezclas del soporte para pociones, leídas del propio servidor (una poción nueva en una versión nueva sale sola), más las arrojadizas y persistentes. Si esa lectura falla se usa una tabla fija, y el recetario avisa en el log si la tabla se ha quedado atrás.",
  srcCrafting: "RPGRoll-Crafting",
  srcCraftingP:
    "Estaciones propias, yunque, fermentación, afiladora, cartografía, telar y tratos de aldeano, con tiempo, combustible, coste, probabilidad de fallo y requisitos. Las recetas de una estación con experimentación no salen hasta que el jugador las descubre.",
  srcFurniture: "RPGRoll-Furniture",
  srcFurnitureP: "Lo que fabrica cada carpintero, con su coste en dinero. Los muebles con permiso solo los ve quien lo tiene.",
  srcExtra: "extra/*.yml",
  srcExtraP: "Recetas escritas a mano para plugins que craftean en su propio menú, con un NPC o con un comando.",
  srcApi: "Otros plugins",
  srcApiP: "Cualquier plugin puede publicar sus recetas con la interfaz {api} de RPGRoll-Lib (gratis).",
  readsLimit:
    "Lo que NO se puede leer: las mezclas de pociones que otro plugin añade con {mix} (Paper las guarda sin los ítems) y los crafteos que un plugin hace en su propio menú sin registrar nada. Para esos están {extra} y la API. {sources} dice cuántas recetas aporta cada origen.",

  useTitle: "Usarlo",
  useLead:
    "{cmd}, el alias {jei} o clic derecho con el libro del recetario. El catálogo enseña todos los objetos que aparecen en alguna receta:",
  thAction: "Acción",
  thEffect: "Qué hace",
  uClickLeft: "Clic izquierdo en un objeto",
  uClickLeftDo: "Cómo se hace: sus recetas, una a una, con la estación y sus notas (tiempo, experiencia, coste…).",
  uClickRight: "Clic derecho en un objeto",
  uClickRightDo: "Para qué sirve: las recetas en las que es ingrediente.",
  uIngredient: "Clic en un ingrediente o resultado de una receta",
  uIngredientDo: "Salta a sus recetas, como en JEI. «Volver» deshace el último salto.",
  uInventory: "Clic en un objeto de tu propio inventario",
  uInventoryDo: "Lo mismo, sin tener que buscarlo.",
  uFilters: "Botones de estación y de origen",
  uFiltersDo:
    "Filtran por dónde se hace o qué plugin lo produce (clic izquierdo: siguiente; derecho: anterior; mayúsculas: todos). Enseñan lo que sale de ahí, no las materias primas que usa.",
  uSearch: "Botón de buscar",
  uSearchDo:
    "Se escribe en el chat. Busca en el nombre del objeto, del material y de la estación, sin tildes ni mayúsculas; {at} busca por origen.",
  useRotate: "Los huecos que admiten varias cosas (cualquier tabla, cualquier lana) van rotando cada segundo.",
  useNames:
    "La búsqueda compara con el id del material (en inglés: {torch}) y con los nombres personalizados; los nombres vanilla los traduce el propio juego del jugador y el servidor no los conoce.",

  bookTitle: "El libro",
  bookBody:
    "{cmd} da el libro; se puede dar al entrar por primera vez ({join}) y craftear con un libro y una mesa de crafteo ({recipe}). Se le puede poner un modelo propio con {model}. No sirve como libro normal para librerías ni para el libro y pluma.",

  extraTitle: "Recetas a mano (extra/)",
  extraLead:
    "Para plugins que no registran nada: un {file} en {dir} por plugin. Los que empiezan por {underscore} son de referencia y no se cargan. {reload} para verlo.",

  apiTitle: "Para desarrolladores: RecipeSource",
  apiBody:
    "Si tu plugin craftea en su propio menú, implementa {iface} (de RPGRoll-Lib, que es gratis) y regístrala en el arranque. El recetario la lee cada vez que rehace el índice; si está en tu plugin, lo que edites en caliente sale solo. No hace falta repetir lo que ya registras con {addRecipe}.",

  commandsTitle: "Comandos",
  thCommand: "Comando",
  thDesc: "Qué hace",
  thAliases: "Alias",
  cOpen: "Abre el catálogo. Con texto, lo abre ya buscando.",
  cSearch: "Abre el catálogo buscando ese texto.",
  cHand: "Cómo se hace lo que llevas en la mano.",
  cUses: "Para qué sirve lo que llevas en la mano.",
  cBook: "Te da el libro (a otro jugador, solo admin).",
  cSources: "Cuántas recetas aporta cada origen, si la fermentación se leyó del servidor y errores de otros plugins.",
  cReload: "Recarga config e idioma y rehace el índice.",

  permissionsTitle: "Permisos",
  thPerm: "Permiso",
  thDefault: "Por defecto",
  pUse: "Abrir el recetario, buscar y usar el libro.",
  pBook: "Sacarse un libro con /recetas libro.",
  pAdmin: "Dar libros a otros, /recetas fuentes, /recetas recargar y ver el id de cada receta.",

  configTitle: "Configuración",
  thKey: "Clave",
  kLanguage: "Idioma (es, en, pt_BR).",
  kRefresh:
    "El índice se rehace al abrir el recetario si tiene más de estos minutos (una receta editada desde el menú de Crafting no avisa). También se rehace solo al entrar o salir un plugin. 0 = solo al arrancar y con /recetas recargar. Rehacerlo tarda unos 150-300 ms con ~2000 recetas.",
  kBrewing: "Enseñar la fermentación vanilla.",
  kHide: "Orígenes, estaciones y recetas (con * como comodín, p. ej. {example}) que no se enseñan.",
  kBook: "Material, modelo, brillo, darlo al entrar y receta del libro.",

  filesTitle: "Archivos",
  thFile: "Archivo",
  thContains: "Qué tiene",
  fConfig: "La configuración de arriba.",
  fLang: "Mensajes, nombres de estación y textos del menú.",
  fExtra: "Recetas a mano; _ejemplo.yml es la referencia.",
};

export type RecipesCopy = typeof es;

const en: RecipesCopy = {
  title: "Recipe book (RPGRoll-Recipes)",
  intro:
    "A JEI-style recipe book for Paper: look up any item and it tells you how to make it and what it's used for, with the table, furnace or station it's made at. It reads vanilla recipes, those of any plugin that registers them on the server and RPGRoll's own stations, with nothing to configure.",

  reqTitle: "Requirements",
  reqBody:
    "Only {lib}. The other modules are optional: if they're there, their recipes show up; the load order ({soft}) just makes sure they exist when the index is built.",

  readsTitle: "Which recipes it reads",
  readsLead: "All of this shows up on its own, with nothing written by hand:",
  thSource: "Source",
  thWhat: "What it adds",
  srcBukkit: "The server's recipe registry",
  srcBukkitP:
    "Crafting table (shaped and shapeless), furnace, blast furnace, smoker, campfire, stonecutter and smithing table: vanilla ones and those of ANY plugin that uses the server's recipe system, whether it reads them from a YAML or builds them in code. Nearly every custom-item plugin does.",
  srcBrewing: "Vanilla brewing",
  srcBrewingP:
    "Every brewing stand mix, read from the server itself (a new potion in a new version shows up on its own), plus splash and lingering. If that read fails a fixed table is used, and the recipe book warns in the log if the table has fallen behind.",
  srcCrafting: "RPGRoll-Crafting",
  srcCraftingP:
    "Custom stations, anvil, brewing, grindstone, cartography, loom and villager trades, with time, fuel, cost, failure chance and requirements. Recipes of a station with experimentation stay hidden until the player discovers them.",
  srcFurniture: "RPGRoll-Furniture",
  srcFurnitureP: "What each carpenter makes, with its money cost. Furniture behind a permission is only shown to players who have it.",
  srcExtra: "extra/*.yml",
  srcExtraP: "Hand-written recipes for plugins that craft in their own menu, through an NPC or with a command.",
  srcApi: "Other plugins",
  srcApiP: "Any plugin can publish its recipes with RPGRoll-Lib's {api} interface (free).",
  readsLimit:
    "What can NOT be read: potion mixes another plugin adds with {mix} (Paper stores them without the items) and crafts a plugin does in its own menu without registering anything. {extra} and the API are there for those. {sources} tells you how many recipes each source adds.",

  useTitle: "Using it",
  useLead:
    "{cmd}, the {jei} alias or right click with the recipe book item. The catalog shows every item that appears in some recipe:",
  thAction: "Action",
  thEffect: "What it does",
  uClickLeft: "Left click an item",
  uClickLeftDo: "How to make it: its recipes, one at a time, with the station and its notes (time, experience, cost…).",
  uClickRight: "Right click an item",
  uClickRightDo: "What it's used for: the recipes it's an ingredient of.",
  uIngredient: "Click an ingredient or result of a recipe",
  uIngredientDo: "Jumps to its recipes, like JEI. \"Back\" undoes the last jump.",
  uInventory: "Click an item in your own inventory",
  uInventoryDo: "Same thing, without searching for it.",
  uFilters: "Station and source buttons",
  uFiltersDo:
    "Filter by where it's made or which plugin makes it (left click: next; right: previous; shift: all). They show what comes out of there, not the raw materials it uses.",
  uSearch: "Search button",
  uSearchDo:
    "You type in chat. It looks in the item, material and station names, ignoring accents and case; {at} searches by source.",
  useRotate: "Slots that accept several things (any planks, any wool) rotate every second.",
  useNames:
    "Search compares against the material id ({torch}) and custom names; vanilla names are translated by the player's own game and the server doesn't know them.",

  bookTitle: "The book",
  bookBody:
    "{cmd} gives the book; it can be given on first join ({join}) and crafted from a book and a crafting table ({recipe}). You can give it its own model with {model}. It doesn't work as a normal book for bookshelves or a book and quill.",

  extraTitle: "Hand-written recipes (extra/)",
  extraLead:
    "For plugins that register nothing: one {file} in {dir} per plugin. Files starting with {underscore} are references and aren't loaded. {reload} to see it.",

  apiTitle: "For developers: RecipeSource",
  apiBody:
    "If your plugin crafts in its own menu, implement {iface} (from RPGRoll-Lib, which is free) and register it on enable. The recipe book reads it every time it rebuilds the index; if it's backed by your plugin's live data, hot edits show up on their own. No need to repeat what you already register with {addRecipe}.",

  commandsTitle: "Commands",
  thCommand: "Command",
  thDesc: "What it does",
  thAliases: "Aliases",
  cOpen: "Opens the catalog. With text, it opens already searching.",
  cSearch: "Opens the catalog searching that text.",
  cHand: "How to make what you're holding.",
  cUses: "What what you're holding is used for.",
  cBook: "Gives you the book (to another player, admin only).",
  cSources: "How many recipes each source adds, whether brewing was read from the server, and errors from other plugins.",
  cReload: "Reloads config and language and rebuilds the index.",

  permissionsTitle: "Permissions",
  thPerm: "Permission",
  thDefault: "Default",
  pUse: "Open the recipe book, search and use the book item.",
  pBook: "Get a book with /recetas libro.",
  pAdmin: "Give books to others, /recetas fuentes, /recetas recargar and see each recipe's id.",

  configTitle: "Configuration",
  thKey: "Key",
  kLanguage: "Language (es, en, pt_BR).",
  kRefresh:
    "The index is rebuilt when the recipe book is opened if it's older than this many minutes (a recipe edited from Crafting's menu doesn't notify anyone). It's also rebuilt when a plugin is enabled or disabled. 0 = only on startup and with /recetas recargar. A rebuild takes about 150-300 ms with ~2000 recipes.",
  kBrewing: "Show vanilla brewing.",
  kHide: "Sources, stations and recipes (with * as a wildcard, e.g. {example}) to hide.",
  kBook: "Material, model, glint, give on join and the book's recipe.",

  filesTitle: "Files",
  thFile: "File",
  thContains: "What's in it",
  fConfig: "The configuration above.",
  fLang: "Messages, station names and menu texts.",
  fExtra: "Hand-written recipes; _ejemplo.yml is the reference.",
};

const pt: RecipesCopy = {
  title: "Livro de receitas (RPGRoll-Recipes)",
  intro:
    "Um livro de receitas no estilo JEI para Paper: procure qualquer item e ele diz como fazer e para que serve, com a bancada, fornalha ou estação onde se faz. Lê sozinho as receitas vanilla, as de qualquer plugin que as registre no servidor e as das estações do RPGRoll, sem configurar nada.",

  reqTitle: "Requisitos",
  reqBody:
    "Só {lib}. Os outros módulos são opcionais: se estiverem, as receitas deles aparecem; a ordem de carga ({soft}) só garante que já existam quando o índice é montado.",

  readsTitle: "Que receitas ele lê",
  readsLead: "Tudo isto aparece sozinho, sem escrever nada:",
  thSource: "Origem",
  thWhat: "O que traz",
  srcBukkit: "Registro de receitas do servidor",
  srcBukkitP:
    "Bancada de trabalho (com e sem formato), fornalha, alto-forno, defumador, fogueira, cortador de pedras e mesa de ferraria: as vanilla e as de QUALQUER plugin que use o sistema de receitas do servidor, lendo de um YAML ou criando em código. Quase todos os plugins de itens personalizados fazem isso.",
  srcBrewing: "Poções vanilla",
  srcBrewingP:
    "Todas as misturas do suporte de poções, lidas do próprio servidor (uma poção nova numa versão nova aparece sozinha), mais as arremessáveis e persistentes. Se essa leitura falhar usa-se uma tabela fixa, e o livro avisa no log se a tabela ficou desatualizada.",
  srcCrafting: "RPGRoll-Crafting",
  srcCraftingP:
    "Estações próprias, bigorna, poções, rebolo, cartografia, tear e trocas com aldeões, com tempo, combustível, custo, chance de falha e requisitos. As receitas de uma estação com experimentação só aparecem depois que o jogador as descobre.",
  srcFurniture: "RPGRoll-Furniture",
  srcFurnitureP: "O que cada carpinteiro faz, com o custo em dinheiro. Móveis com permissão só aparecem para quem a tem.",
  srcExtra: "extra/*.yml",
  srcExtraP: "Receitas escritas à mão para plugins que fabricam no próprio menu, com um NPC ou com um comando.",
  srcApi: "Outros plugins",
  srcApiP: "Qualquer plugin pode publicar as receitas com a interface {api} do RPGRoll-Lib (grátis).",
  readsLimit:
    "O que NÃO dá para ler: misturas de poções que outro plugin adiciona com {mix} (o Paper guarda sem os itens) e fabricações que um plugin faz no próprio menu sem registrar nada. Para esses existem {extra} e a API. {sources} diz quantas receitas cada origem traz.",

  useTitle: "Usar",
  useLead:
    "{cmd}, o alias {jei} ou clique direito com o livro de receitas. O catálogo mostra todos os itens que aparecem em alguma receita:",
  thAction: "Ação",
  thEffect: "O que faz",
  uClickLeft: "Clique esquerdo num item",
  uClickLeftDo: "Como fazer: as receitas dele, uma de cada vez, com a estação e as notas (tempo, experiência, custo…).",
  uClickRight: "Clique direito num item",
  uClickRightDo: "Para que serve: as receitas em que ele é ingrediente.",
  uIngredient: "Clique num ingrediente ou resultado de uma receita",
  uIngredientDo: "Pula para as receitas dele, como no JEI. «Voltar» desfaz o último pulo.",
  uInventory: "Clique num item do seu próprio inventário",
  uInventoryDo: "O mesmo, sem precisar procurar.",
  uFilters: "Botões de estação e de origem",
  uFiltersDo:
    "Filtram por onde se faz ou por qual plugin produz (clique esquerdo: próximo; direito: anterior; shift: todos). Mostram o que sai dali, não as matérias-primas que usa.",
  uSearch: "Botão de procurar",
  uSearchDo:
    "Escreve-se no chat. Procura no nome do item, do material e da estação, sem acentos nem maiúsculas; {at} procura por origem.",
  useRotate: "Os espaços que aceitam várias coisas (qualquer tábua, qualquer lã) vão girando a cada segundo.",
  useNames:
    "A busca compara com o id do material (em inglês: {torch}) e com os nomes personalizados; os nomes vanilla são traduzidos pelo jogo do jogador e o servidor não os conhece.",

  bookTitle: "O livro",
  bookBody:
    "{cmd} dá o livro; dá para entregá-lo na primeira entrada ({join}) e fabricá-lo com um livro e uma bancada ({recipe}). Dá para pôr um modelo próprio com {model}. Não serve como livro normal para estantes nem para livro e pena.",

  extraTitle: "Receitas à mão (extra/)",
  extraLead:
    "Para plugins que não registram nada: um {file} em {dir} por plugin. Os que começam com {underscore} são de referência e não carregam. {reload} para ver.",

  apiTitle: "Para desenvolvedores: RecipeSource",
  apiBody:
    "Se o seu plugin fabrica no próprio menu, implemente {iface} (do RPGRoll-Lib, que é grátis) e registre no início. O livro a lê toda vez que refaz o índice; se ela vem dos dados vivos do seu plugin, o que for editado aparece sozinho. Não precisa repetir o que você já registra com {addRecipe}.",

  commandsTitle: "Comandos",
  thCommand: "Comando",
  thDesc: "O que faz",
  thAliases: "Aliases",
  cOpen: "Abre o catálogo. Com texto, já abre procurando.",
  cSearch: "Abre o catálogo procurando esse texto.",
  cHand: "Como fazer o que está na sua mão.",
  cUses: "Para que serve o que está na sua mão.",
  cBook: "Dá o livro a você (a outro jogador, só admin).",
  cSources: "Quantas receitas cada origem traz, se as poções foram lidas do servidor e erros de outros plugins.",
  cReload: "Recarrega config e idioma e refaz o índice.",

  permissionsTitle: "Permissões",
  thPerm: "Permissão",
  thDefault: "Padrão",
  pUse: "Abrir o livro de receitas, procurar e usar o livro.",
  pBook: "Pegar um livro com /recetas libro.",
  pAdmin: "Dar livros a outros, /recetas fuentes, /recetas recargar e ver o id de cada receita.",

  configTitle: "Configuração",
  thKey: "Chave",
  kLanguage: "Idioma (es, en, pt_BR).",
  kRefresh:
    "O índice é refeito ao abrir o livro se tiver mais do que estes minutos (uma receita editada no menu do Crafting não avisa ninguém). Também é refeito quando um plugin liga ou desliga. 0 = só ao iniciar e com /recetas recargar. Refazer leva uns 150-300 ms com ~2000 receitas.",
  kBrewing: "Mostrar as poções vanilla.",
  kHide: "Origens, estações e receitas (com * como curinga, p. ex. {example}) que não aparecem.",
  kBook: "Material, modelo, brilho, entregar na entrada e receita do livro.",

  filesTitle: "Arquivos",
  thFile: "Arquivo",
  thContains: "O que tem",
  fConfig: "A configuração acima.",
  fLang: "Mensagens, nomes de estações e textos do menu.",
  fExtra: "Receitas à mão; _ejemplo.yml é a referência.",
};

export const RECIPES_COPY: Record<Locale, RecipesCopy> = { es, en, pt };
