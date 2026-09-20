import type { Locale } from "../../i18n";

/** Texto de las páginas Placeholders e Integraciones. */

const es = {
  placeholders: {
    title: "Placeholders",
    intro:
      "Todos los placeholders que registra el ecosistema, con la expansión que los expone y el addon que hay que tener instalado.",
    metaPlaceholders: "Placeholders",
    metaExpansions: "Expansiones",
    metaRequires: "Requiere",
    calloutTitle: "PlaceholderAPI es opcional",
    calloutBody:
      "Ningún addon lo exige. Sin PlaceholderAPI instalado todo sigue funcionando: simplemente no se registra ninguna expansión y los tokens se muestran literales en los plugins que los usen. Cada expansión la registra su addon, así que {example} solo existe si RPGRoll-Guilds está instalado.",
    searchTitle: "Buscar",
    searchLabel: "Filtrar placeholders",
    searchPlaceholder: "nivel, guild, balance, helditem…",
    noResults: "Sin coincidencias para",
    registeredBy: "La registra",
    thPlaceholder: "Placeholder",
    thReturns: "Devuelve",
    thCopy: "Copiar",
    argsTitle: "Los argumentos entre <> se reemplazan",
    argsBody:
      "Un token como {token} espera el id del contenido en esa posición: {example}. El botón de copiar entrega el token con el argumento tal cual, para que lo sustituyas.",
  },
  integrations: {
    title: "Integraciones",
    intro:
      "Qué plugins de terceros usa el ecosistema, cuáles son obligatorios, y qué deja de funcionar exactamente si no están instalados.",
    metaIntegrations: "Integraciones",
    metaHard: "Dep. duras de terceros",
    optionalTitle: "Casi todo es opcional",
    optionalBody:
      "Salvo {protocol}, todas las dependencias de terceros son {soft}: el addon carga igual y solo se apaga la función concreta que necesitaba ese plugin. Ningún addon obliga a instalar Vault ni PlaceholderAPI.",
    protocolStrong: "ProtocolLib en RPGRoll-NPCs",
    thAddon: "Addon",
    thType: "Tipo",
    thProvides: "Qué aporta",
    reqRequired: "requerido",
    reqOptional: "opcional",
    reqProvided: "lo provee",
    notTitle: "Lo que NO integra",
    notLead:
      "Estos plugins se dan por supuestos con frecuencia. El ecosistema implementa esa funcionalidad por su cuenta, así que {strong}.",
    notStrong: "no hace falta instalarlos y tampoco van a interoperar",
    thPlugin: "Plugin",
    thWhyNot: "Por qué no",
    graphTitle: "Grafo de dependencias entre addons",
    graphLead:
      "Transcripción del {file} de cada addon. {depend} bloquea la carga si falta; {soft} solo habilita funciones.",
  },
};

export type PlaceholdersIntegrationsCopy = typeof es;

const en: PlaceholdersIntegrationsCopy = {
  placeholders: {
    title: "Placeholders",
    intro:
      "Every placeholder the ecosystem registers, with the expansion that exposes it and the addon you need installed.",
    metaPlaceholders: "Placeholders",
    metaExpansions: "Expansions",
    metaRequires: "Requires",
    calloutTitle: "PlaceholderAPI is optional",
    calloutBody:
      "No addon requires it. Without PlaceholderAPI installed everything still works: no expansion gets registered and the tokens show up literally in whatever plugin uses them. Each expansion is registered by its own addon, so {example} only exists if RPGRoll-Guilds is installed.",
    searchTitle: "Search",
    searchLabel: "Filter placeholders",
    searchPlaceholder: "level, guild, balance, helditem…",
    noResults: "No matches for",
    registeredBy: "Registered by",
    thPlaceholder: "Placeholder",
    thReturns: "Returns",
    thCopy: "Copy",
    argsTitle: "Arguments in <> get replaced",
    argsBody:
      "A token like {token} expects the content id in that position: {example}. The copy button hands you the token with the argument as-is, for you to substitute.",
  },
  integrations: {
    title: "Integrations",
    intro:
      "Which third-party plugins the ecosystem uses, which are mandatory, and exactly what stops working if they are not installed.",
    metaIntegrations: "Integrations",
    metaHard: "Hard 3rd-party deps",
    optionalTitle: "Almost everything is optional",
    optionalBody:
      "Except for {protocol}, every third-party dependency is {soft}: the addon loads anyway and only the specific feature that needed that plugin turns off. No addon forces you to install Vault or PlaceholderAPI.",
    protocolStrong: "ProtocolLib in RPGRoll-NPCs",
    thAddon: "Addon",
    thType: "Type",
    thProvides: "What it adds",
    reqRequired: "required",
    reqOptional: "optional",
    reqProvided: "provides it",
    notTitle: "What it does NOT integrate with",
    notLead:
      "These plugins are frequently assumed. The ecosystem implements that functionality on its own, so {strong}.",
    notStrong: "you do not need to install them and they will not interoperate either",
    thPlugin: "Plugin",
    thWhyNot: "Why not",
    graphTitle: "Dependency graph between addons",
    graphLead:
      "Transcribed from each addon's {file}. {depend} blocks loading when missing; {soft} only enables features.",
  },
};

const pt: PlaceholdersIntegrationsCopy = {
  placeholders: {
    title: "Placeholders",
    intro:
      "Todos os placeholders que o ecossistema registra, com a expansão que os expõe e o addon que é preciso ter instalado.",
    metaPlaceholders: "Placeholders",
    metaExpansions: "Expansões",
    metaRequires: "Requer",
    calloutTitle: "PlaceholderAPI é opcional",
    calloutBody:
      "Nenhum addon o exige. Sem o PlaceholderAPI instalado tudo continua funcionando: simplesmente nenhuma expansão é registrada e os tokens aparecem literais nos plugins que os usem. Cada expansão é registrada pelo seu addon, então {example} só existe se o RPGRoll-Guilds estiver instalado.",
    searchTitle: "Buscar",
    searchLabel: "Filtrar placeholders",
    searchPlaceholder: "nível, guild, saldo, helditem…",
    noResults: "Sem correspondências para",
    registeredBy: "Registrada por",
    thPlaceholder: "Placeholder",
    thReturns: "Devolve",
    thCopy: "Copiar",
    argsTitle: "Os argumentos entre <> são substituídos",
    argsBody:
      "Um token como {token} espera o id do conteúdo nessa posição: {example}. O botão de copiar entrega o token com o argumento como está, para você substituir.",
  },
  integrations: {
    title: "Integrações",
    intro:
      "Quais plugins de terceiros o ecossistema usa, quais são obrigatórios, e o que exatamente deixa de funcionar se não estiverem instalados.",
    metaIntegrations: "Integrações",
    metaHard: "Dep. duras de terceiros",
    optionalTitle: "Quase tudo é opcional",
    optionalBody:
      "Exceto {protocol}, todas as dependências de terceiros são {soft}: o addon carrega mesmo assim e só a função concreta que precisava daquele plugin é desligada. Nenhum addon obriga a instalar Vault nem PlaceholderAPI.",
    protocolStrong: "ProtocolLib no RPGRoll-NPCs",
    thAddon: "Addon",
    thType: "Tipo",
    thProvides: "O que agrega",
    reqRequired: "obrigatório",
    reqOptional: "opcional",
    reqProvided: "fornece",
    notTitle: "O que NÃO integra",
    notLead:
      "Estes plugins são frequentemente dados como certos. O ecossistema implementa essa funcionalidade por conta própria, então {strong}.",
    notStrong: "não é preciso instalá-los e eles também não vão interoperar",
    thPlugin: "Plugin",
    thWhyNot: "Por que não",
    graphTitle: "Grafo de dependências entre addons",
    graphLead:
      "Transcrição do {file} de cada addon. {depend} bloqueia o carregamento se faltar; {soft} só habilita funções.",
  },
};

export const PH_INT_COPY: Record<Locale, PlaceholdersIntegrationsCopy> = { es, en, pt };
