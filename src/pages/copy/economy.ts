import type { Locale } from "../../i18n";

/** Texto de la página de RPGRoll-Economy. */

const es = {
  title: "RPGRoll-Economy",
  intro:
    "El sistema económico avanzado del ecosistema: monedas múltiples, wallets, bancos y préstamos, un {market} con oferta/demanda real, tiendas de jugador, subastas, empresas, impuestos, un libro mayor de transacciones y un tracker de inflación. También es el {vault} — en cuanto está instalado, todo lo demás del ecosistema (Jobs, Guilds, Items, Workers) que ya sabía hablar Vault queda funcional sin tocar una línea de esos módulos.",
  marketWord: "mercado dinámico",
  vaultWord: "proveedor del servicio Economy de Vault",

  reqTitle: "Requisitos",
  thPlugin: "Plugin",
  thType: "Tipo",
  thWhatFor: "Para qué",
  rLib: "Framework de GUIs y utilidades compartidas.",
  rCore: "Solo orden de carga: Economy funciona completo sin el core.",
  rVault: "RPGRoll-Economy se registra como {provider} del servicio Economy — no lo consume, lo implementa.",
  providerWord: "proveedor",
  rPapi: "Placeholders {ph}.",
  rGuilds: "Integración activa: impuesto territorial periódico por guild (ver «Integración activa» más abajo).",
  rSeasons:
    "Integración activa: modificadores de precio de mercado por estación (ver «Economías regionales» más abajo).",
  rFurniture: "Líneas {furniture} de la tienda del servidor (ver «Tienda del servidor»).",

  currTitle: "Monedas",
  currBody:
    "El servidor puede tener varias monedas (oro, plata, tokens de evento…) — cada una es un {currency} con su propio símbolo, decimales, ícono/color para las GUIs, límites de balance, permiso opcional para poder tenerla, y una tasa de cambio hacia la moneda marcada {isBase} (solo informativa; no hay un comando de conversión automática). Exactamente una moneda debería ser {isBaseTrue}: es la que usa el puente de Vault (ver {defaultCurrency} en {config}).",
  currWarnTitle: "El campo 'permission' no se aplica solo",
  currWarnBody:
    "Está en el schema y se puede leer desde otro addon, pero {walletService} no lo chequea por sí mismo antes de depositar/retirar — es un gancho para que tú (u otro sistema) lo hagas cumplir.",

  walletTitle: "Wallets",
  walletBody:
    "Cada jugador tiene un {wallet} con un saldo independiente por moneda, persistido en {path}. Todo depósito/retiro/transferencia pasa por {walletService}, que respeta {min}/{max} de cada moneda y escribe siempre un registro en el libro mayor. Una transferencia que falla en el depósito (ej. wallet destino bloqueado) revierte automáticamente el retiro — nunca queda dinero «perdido» a mitad de camino.",
  fixesTitle: "Correcciones preparadas para la próxima actualización",
  fixesBody:
    "Los abonos que superen el saldo máximo se rechazarán completos; las transferencias fallidas devolverán el dinero al emisor. Una compra en tienda de jugador se cancelará si el vendedor no puede cobrar. En subastas, el pago y el objeto quedarán retenidos hasta poder liquidar la venta, sin volver a cobrar al comprador; tampoco se sustituirá una puja si no se puede devolver la anterior. Al disolver una empresa, la tesorería que no se pueda abonar seguirá guardada para reintentar después de liberar saldo.",

  bankTitle: "Bancos y préstamos",
  bankBody:
    "A diferencia del wallet (uno por jugador), un jugador puede tener varias {account}: personales, de una empresa, de una guild, o compartidas con co-titulares explícitos. Los bancos también ofrecen crédito: un préstamo ({loan}) deposita el monto en la cuenta al instante, acumula interés diario sobre el saldo restante (tarea periódica, {interval}), y se paga de a partes hasta llegar a 0. Los límites van en la sección {loans} del {config}: {maxAmount} (5000 por defecto; 0 = sin tope, no recomendado), {maxActive} (préstamos sin saldar a la vez por jugador), {dailyInterest} y {termDays}. Al vencer se cobra lo que falte, primero de la cuenta y después de la cartera de quien lo pidió; si no alcanza, la deuda sigue y se cobra en cada revisión.",
  thAccountType: "Tipo de cuenta",
  aPersonal: "Ahorros propios de un jugador, además de su wallet de uso diario.",
  aCompany: "La tesorería de una empresa — se crea sola al fundarla.",
  aGuild:
    "Una etiqueta de tipo de cuenta más — no está vinculada al {guildVault} real de RPGRoll-Guilds, que es un balance propio separado (ver «Integración activa» más abajo).",
  aShared: "Cuenta con una lista explícita de co-titulares autorizados.",

  marketTitle: "Mercado dinámico",
  marketBody:
    "El sistema más importante del addon. Cada {product} reacciona a lo que los jugadores realmente compran/venden: vender acumula «oferta» y baja el precio, comprar acumula «demanda» y lo sube. Sin actividad nueva, una tarea periódica ({interval}) decae ambos acumuladores un {recovery} hacia 0, así el precio vuelve solo a {base} con el tiempo.",
  marketFormula:
    "precio = clamp(base * (1 + presión * volatility), min, max)\npresión = (demanda*demand-weight - oferta*supply-weight) / 100",
  marketExample:
    "100 unidades de oferta/demanda neta equivalen a «una unidad completa» de presión. Con los valores por defecto del ejemplo incluido ({base}, {vol}), vender 250 unidades netas sin ninguna compra de por medio genera una presión de -2.5 y un precio de {calc} (recortado a {minPrice} si fuera menor).",
  priceTipTitle: "El precio nunca se guarda directamente",
  priceTipBody:
    "Se recalcula siempre a partir del estado de oferta/demanda acumulado (persistido en {state}) + la definición del producto — así nunca puede desincronizarse.",

  regionsTitle: "Economías regionales",
  regionsBody:
    "Además del multiplicador de oferta/demanda (global, por producto), {priceCall} aplica dos multiplicadores más si le pasas una {location} — el precio de oferta/demanda ya calculado se multiplica por cada uno, en cadena:",
  thMultiplier: "Multiplicador",
  thFrom: "De dónde sale",
  mRegion: "Región ({cls})",
  mRegionBody:
    "Una caja (AABB, sin WorldGuard — mismo estilo que {seasonRegion}/{fishingRegion}) con {catMods}/{prodMods} propios. Sin ninguna región definida, o fuera de todas, el multiplicador es 1.0 (sin efecto) — el precio es el global de siempre.",
  mSeason: "Estación ({cls} del producto)",
  mSeasonBody:
    "Si RPGRoll-Seasons está instalado, se busca la {season} activa en esa ubicación y se multiplica por el modificador de CADA tag de esa estación que el producto tenga definido (ej. {example}). Sin Seasons instalado, este paso se salta sin error.",
  regionsOptionalBody:
    "El método de un solo argumento ({call}, usado por tiendas/subastas hoy) sigue devolviendo exactamente lo mismo que antes — regiones y estaciones son puramente opcionales, activadas solo cuando quien llama pasa una ubicación.",
  regionsFile: "market-regions/reference_full.yml (fragmento)",
  compileWarnTitle: "Solo verificado por compilación",
  compileWarnBody:
    "Igual que otras integraciones agregadas recientemente, esto se verificó compilando y con el motor de precio ejercitado por lógica, no probado en juego contra un servidor Paper real.",

  activeTitle: "Integración activa: Guilds y Seasons",
  activeBody:
    "Hasta hace poco, las dependencias de Economy con RPGRoll-Guilds y RPGRoll-Seasons eran solo de compilación ({compileOnly} en {gradle}) — el softdepend estaba declarado pero nada en runtime las usaba de verdad. Ahora hay comportamiento real:",
  activeSeasons:
    "{seasons} — ver «Economías regionales» arriba: el precio de un producto puede variar según la estación activa donde se cotiza, vía {mods}.",
  activeGuilds:
    "{guilds} — una tarea periódica ({interval} en {config}, cada 24000 ticks/1 día por defecto) recorre todas las guilds vía {api} y les cobra un impuesto {property} por cada {territory} que tengan reclamada, descontado directo de su {vault}. El monto real depende de que exista una {rule} tipo {property2} con {appliesTo} (o vacío) — sin esa regla el impuesto es 0 y la tarea no hace nada. Viene un ejemplo {example} con {disabled} por defecto.",
  softTitle: "Softdepend real, no solo declarado",
  softBody:
    "Ambas integraciones están guardadas con el mismo patrón que el resto del ecosistema ({check}) — sin Guilds o sin Seasons instalados, Economy funciona exactamente igual que antes, sin errores ni advertencias.",

  shopTitle: "Tienda del servidor (/tienda)",
  shopBody:
    "{tienda} (alias {shop}) abre una portada con una casilla por sección; cada sección es un YAML en {path} y {tiendaId} la abre directo. Dentro, {left} compra un lote y con shift una pila entera; {right} vende un lote y con shift todo lo que el jugador lleve encima. Cobra y paga en la moneda de la sección (la por defecto si no dice otra), queda en el libro mayor como {buy}/{sell} y solo cobra si lo comprado cabe entero en el inventario.",
  leftClick: "clic izquierdo",
  rightClick: "clic derecho",
  shopSectionsBody:
    "Viene con 14 secciones vanilla (bloques, maderas, naturaleza, minerales, comida, granja, botín, redstone, herramientas, armaduras, pociones, encantamientos, decoración y utilidades) y una {premium} con los ítems de RPGRoll-Items y los libros de RPGRoll-Enchantments a precios altos. Se recargan con {reload}.",
  premiumWord: "Premium",
  thLine: "Línea",
  thDelivers: "Entrega",
  lMaterial:
    "Un ítem vanilla. Es lo único que la tienda le compra al jugador, y solo «limpio»: con nombre, encantado o de RPGRoll no cuenta.",
  lItem: "Un ítem de RPGRoll-Items (necesita ese módulo).",
  lEnchant: "El libro de un encantamiento de RPGRoll-Enchantments, que se aplica en el yunque.",
  lBook: "Un libro encantado vanilla, por la clave del encantamiento.",
  lFurniture: "Un mueble de RPGRoll-Furniture, con su versión opcional tras los dos puntos (necesita ese módulo).",
  lPotion: "Una poción vanilla; {splash} o {lingering} para arrojadiza o persistente.",
  noMoneyTitle: "Sin dinero infinito",
  noMoneyBody:
    "Una línea con {market} se compra al precio de mercado del momento y se vende a {ratio} de él (0.4 por defecto, en {config}); comprar sube su demanda y vender su oferta. Con precios fijos, un {sell} mayor que {buy} se recorta y se avisa en consola: comprar para revender en el acto nunca da dinero. Las secciones incluidas recompran solo materias primas, al 25 % de su precio.",

  buyerTitle: "El comprador (NPC que compra de todo)",
  buyerBody:
    "Una ventana donde el jugador deja lo que quiera vender y pulsa {sell}. Cada ítem se paga por su valor interno: los peces y los productos del rancho lo llevan dentro (según especie, peso y calidad), y los materiales vanilla limpios (sin nombre ni lore) se pagan a lo que daría {tienda} por ellos. Lo que no compra se devuelve al cerrar; nada se pierde aunque el jugador se desconecte o el servidor se apague con la ventana abierta.",
  sellWord: "Vender",
  buyerNpcBody:
    "Se abre con {cmd}, pensado para la acción {command} de un NPC de RPGRoll-NPCs (o de cualquier plugin de NPCs que ejecute comandos por consola). El plugin de NPCs trae el ejemplo {example}:",

  playerShopsTitle: "Tiendas de jugador",
  playerShopsBody:
    "Cada jugador puede abrir una tienda ({cls}) desde {cmd} y meter en ella el ítem que tiene en la mano, con un precio: el stock es lo que ha metido (si ya vendía ese mismo ítem, se suma y se actualiza el precio), y retirar una línea le devuelve lo que no se vendió. Otros jugadores compran directo desde una GUI de navegación de todas las tiendas abiertas del servidor; si la compra no cabe en el inventario, no se hace. El stock ilimitado queda para las tiendas del servidor. El impuesto de venta ({sale}) configurado se retiene automáticamente en cada compra.",

  auctionTitle: "Casa de Subastas (/subasta)",
  auctionBody:
    "{subasta} (alias {ah} y {subastas}) abre un buscador con todo lo que venden los jugadores: 45 publicaciones por página, filtradas por {section} (ítems especiales de RPGRoll-Items, armas y herramientas, armaduras, libros encantados, pociones, comida, bloques y materiales), ordenadas por más recientes, las que terminan pronto o precio, y con {search} por nombre, material o encantamiento (buscar «mending» encuentra los libros con Reparación). Cada ítem se ve tal cual —encantamientos, nombre y lore— con su precio, vendedor y tiempo restante.",
  sectionWord: "sección",
  searchWord: "búsqueda",
  thHowList: "Cómo se publica",
  thHowBuy: "Cómo se compra",
  aFixed: "Precio fijo",
  aFixedBuy: "Clic → confirmar.",
  aAuction: "Subasta",
  aAuctionBuy: "Clic → escribir la puja; shift-clic compra ya si tiene precio de compra inmediata.",
  auctionListBody:
    "Se publica lo que el jugador tiene en la mano (también desde el botón de la GUI, con clic para precio fijo o clic derecho para subasta). Los precios aceptan {k} o {m}. La puja se cobra en el momento ({escrow}) y, si alguien la supera, se devuelve sola con aviso; subir la propia puja solo cobra la diferencia, y una puja en los últimos segundos alarga la subasta para que nadie gane «robando» al final. Pujar el precio de compra inmediata es comprarla.",
  auctionBoxBody:
    "Todo lo que se cierra va a la {box} ({cmd}): lo comprado, lo ganado y lo que venció sin vender. Lo que no cabe en el inventario se queda en la caja; nunca se tira ni se pierde, y al entrar se avisa si hay algo esperando. En {mine} el vendedor ve lo suyo y lo retira con shift-clic mientras no tenga pujas. Al vender se aplican los impuestos {sale} y el vendedor recibe un aviso con lo cobrado.",
  boxWord: "caja de recogida",
  blacklistTitle: "Qué no se puede vender",
  blacklistBody:
    "Los materiales de {blacklist} y cualquier ítem con una marca de {keys} ({format} de su PersistentDataContainer). Por defecto son las mochilas ligadas y la brújula del menú de RPGRoll-Extras: nadie compra una mochila que no va a poder abrir. Un admin ({perm}) retira cualquier publicación con shift-clic derecho; el ítem vuelve a la caja del vendedor y la puja, a su postor.",

  compTitle: "Empresas",
  compBody:
    "Un jugador puede fundar una {company}, que crea automáticamente su propia cuenta bancaria de tesorería. El dueño (o un {manager}) puede contratar empleados con un salario cada uno, depositar/retirar de la tesorería, y pagar todos los salarios pendientes con un solo clic. No incluye acciones ni bolsa de valores en esta versión.",

  taxTitle: "Impuestos",
  taxBody:
    "Cada {rule} define un {type}, una tasa (%), y a qué ids/categorías aplica (vacío = todo). El monto retenido es un {sink} puro: sale de circulación, no se deposita en ninguna cuenta — solo queda como un registro {tax} en el libro mayor para que el admin vea cuánto se recaudó.",
  sinkWord: "money sink",
  thAutoToday: "¿Se aplica automáticamente hoy?",
  tSale: "Sí — tiendas de jugador, subastas y cualquier venta al mercado.",
  tProperty:
    "Sí, si hay una regla con {appliesTo} — la tarea de impuesto territorial de guilds (ver «Integración activa» arriba) la dispara periódicamente.",
  tOthers:
    "No — completamente modeladas y aplicables a mano vía {apply} desde otro addon, pero ningún punto de este addon las dispara todavía.",

  inflTitle: "Inflación",
  inflBody:
    "Una tarea periódica ({interval}) suma la masa monetaria total — {all} los wallets guardados en disco (no solo los cacheados en memoria) más todas las cuentas bancarias — por moneda, y la compara contra la foto anterior. Guarda hasta 52 fotos en {file}. {cmd} muestra el % actual; {snapshot} fuerza una foto fuera de horario.",
  allWord: "todos",

  ledgerTitle: "Libro mayor de transacciones",
  ledgerBody:
    "Cada movimiento económico (depósito, retiro, venta, impuesto, préstamo, salario…) queda registrado. Para no reescribir el archivo del día en disco en cada transacción, los registros nuevos se acumulan primero en memoria y se vuelcan a {path} recién cada 30 segundos (y una vez más al apagar el servidor) — la consulta de «historial reciente» siempre lee del buffer en memoria, no del disco.",

  yamlTitle: "Ejemplos de archivo YAML",
  refTitle: "Referencia completa: todos los campos en un solo archivo, por cada tipo de contenido",
  refBody:
    "{files} (incluidos en el jar) documentan absolutamente todos los campos disponibles de cada tipo, con comentarios explicando cada uno.",

  builderCurrency: "Constructor visual: Moneda",
  builderMarket: "Constructor visual: Producto de mercado",
  builderTax: "Constructor visual: Regla tributaria",

  guiTitle: "GUI: Economy Studio",
  guiBody:
    "{browser} abre un hub que enlaza a 3 navegadores de contenido (Monedas, Mercado, Impuestos). Del lado del jugador, {bank}, {shop}, {auction} y {company} abren sus propias GUIs — depósitos/retiros y montos siempre se piden por chat (mismo patrón de {prompt} que el resto del ecosistema), no hay un teclado numérico en inventario.",

  apiTitle: "API para addons — EconomyAPI",
  apiBody:
    "{isReady} / {get}, mismo patrón que el resto del ecosistema. Expone los 4 managers de contenido ({managers}) y los servicios de runtime: {services}. Un futuro RPGRoll-Farming/Mining/Crafting típicamente entra por {entry} para cotizar su producción (con soporte regional/estacional si pasa la ubicación), y por {wallet} para acreditarle al jugador.",

  backendTitle: "Saldos compartidos entre servidores — WalletBackend",
  backendBody:
    "Por defecto cada servidor guarda sus saldos en {dir}. Si tienes varios servidores y quieres un solo saldo para todos, otro plugin puede registrar un {cls} en el {services} de Bukkit ({fqn}) y decir qué monedas lleva. Desde ese momento, todo lo que mueve esas monedas en RPGRoll-Economy (tiendas, subastas, {pay}, comandos de admin y lo que otros plugins cobran por Vault) pasa por él; el resto de monedas, los bancos y los préstamos siguen en el servidor.",
  backendImportBody:
    "El saldo que cada jugador ya tuviera en el servidor se traspasa solo, una vez, al entrar ({import}, con un id que se guarda antes de pedirlo para no duplicarlo si el servidor cae a mitad). Si el almacén no responde, la operación devuelve {unavailable} y no se mueve nada. Sin ningún {cls} registrado, todo funciona exactamente como antes.",

  vaultTitle: "Integración con Vault",
  vaultBody:
    "A diferencia de {core} (que solo {consumes} el servicio Economy de Vault si hay un EssentialsX-style instalado), RPGRoll-Economy se registra como {provider} ({cls}, prioridad {normal}) apenas detecta Vault en {onEnable}. Opera siempre sobre la moneda marcada {isBase}. No implementa el soporte de «bancos» de Vault (es un concepto distinto al banco propio de este addon) — esos métodos devuelven {notImpl}.",
  consumesWord: "consume",
  vaultWarnTitle: "Si tienes otro plugin de economía (EssentialsX, CMI) instalado",
  vaultWarnBody:
    "Vault deja el registro de mayor prioridad activo — con la misma prioridad, gana el que se registró último. Para que RPGRoll-Economy sea el que manda, desinstala el otro plugin de economía o súbele la prioridad aquí si hace falta convivir con ambos.",

  phTitle: "Placeholders (PlaceholderAPI)",
  phBody: "Expansión {exp}.",
  thPlaceholder: "Placeholder",
  thReturns: "Devuelve",
  p1: "Saldo del jugador en la moneda por defecto.",
  p2: "Saldo en una moneda específica.",
  p3: "Suma de todas sus cuentas bancarias (moneda por defecto).",
  p4: "Nombre de la moneda por defecto.",
  p5: "% de inflación de la moneda por defecto.",
  p6: "Precio actual de mercado.",
  p7: "% total configurado para ese tipo de impuesto.",

  cmdsTitle: "Comandos",
  thCommand: "Comando",
  thWhat: "Qué hace",
  thPermission: "Permiso",
  c1: "Abre el Economy Studio.",
  c2: "Recarga monedas/mercado/impuestos.",
  c3: "Ajusta un balance.",
  c4: "Fija un balance exacto.",
  c5: "Muestra la última foto de inflación.",
  c6: "Fuerza una foto de masa monetaria.",
  c7: "Abre la ventana del comprador a ese jugador (para NPCs).",
  c8: "Abre la tienda del servidor, o una sección directa.",
  c9: "Ver tu saldo.",
  c10: "Pagarle a otro jugador.",
  c11: "Abre tus cuentas bancarias.",
  c12: "Navega tiendas de jugador / administra la tuya.",
  c13: "Abre la Casa de Subastas.",
  c14: "Abre la Casa de Subastas (alias /ah, /subastas).",
  c15: "Publica lo de la mano a precio fijo.",
  c16: "Lo publica con pujas.",
  c17: "Abre el buscador filtrado.",
  c18: "Tus publicaciones · tu caja de recogida.",
  c19: "Ver/fundar/administrar tus empresas.",

  // YamlBuilder
  fId: "Id",
  fDisplayName: "Nombre visible",
  fSymbol: "Símbolo",
  fDecimals: "Decimales",
  fIcon: "Ícono (Material)",
  fColor: "Color",
  fMinBalance: "Balance mínimo",
  fMaxBalance: "Balance máximo (0 = sin tope)",
  fPermission: "Permiso requerido (vacío = ninguno)",
  fRate: "Tasa de cambio a la moneda base",
  fIsBase: "Es la moneda base",
  fIdMaterial: "Id (típicamente un Material)",
  fCurrency: "Moneda (vacío = la del servidor)",
  fBasePrice: "Precio base",
  fMinPrice: "Precio mínimo",
  fMaxPrice: "Precio máximo",
  fSupply: "Peso de oferta",
  fDemand: "Peso de demanda",
  fVolatility: "Volatilidad",
  fRecovery: "Tasa de recuperación",
  fCategory: "Categoría",
  fTaxType: "Tipo",
  fRatePercent: "Tasa (%)",
  fAppliesTo: "Aplica a (ids/categorías, vacío = todo)",
  fEnabled: "Activa",
  phNewCurrency: "nueva_moneda",
  phGold: "Oro",
  phNewProduct: "NUEVO_PRODUCTO",
  phIronIngot: "Lingote de Hierro",
  phNewRule: "nueva_regla",
  phVat: "IVA",
};

export type EconomyCopy = typeof es;

const en: EconomyCopy = {
  title: "RPGRoll-Economy",
  intro:
    "The ecosystem's advanced economic system: multiple currencies, wallets, banks and loans, a {market} with real supply/demand, player shops, auctions, companies, taxes, a transaction ledger and an inflation tracker. It is also the {vault} — as soon as it is installed, everything else in the ecosystem (Jobs, Guilds, Items, Workers) that already knew how to speak Vault becomes functional without touching a line of those modules.",
  marketWord: "dynamic market",
  vaultWord: "provider of Vault's Economy service",

  reqTitle: "Requirements",
  thPlugin: "Plugin",
  thType: "Type",
  thWhatFor: "What for",
  rLib: "GUI framework and shared utilities.",
  rCore: "Load order only: Economy works in full without the core.",
  rVault: "RPGRoll-Economy registers as the Economy service's {provider} — it does not consume it, it implements it.",
  providerWord: "provider",
  rPapi: "{ph} placeholders.",
  rGuilds: "Active integration: periodic territory tax per guild (see “Active integration” further down).",
  rSeasons:
    "Active integration: market price modifiers per season (see “Regional economies” further down).",
  rFurniture: "{furniture} lines of the server shop (see “Server shop”).",

  currTitle: "Currencies",
  currBody:
    "The server can have several currencies (gold, silver, event tokens…) — each one is a {currency} with its own symbol, decimals, icon/color for the GUIs, balance limits, an optional permission to be able to hold it, and an exchange rate towards the currency marked {isBase} (informative only; there is no automatic conversion command). Exactly one currency should be {isBaseTrue}: it is the one Vault's bridge uses (see {defaultCurrency} in {config}).",
  currWarnTitle: "The 'permission' field is not enforced by itself",
  currWarnBody:
    "It is in the schema and can be read from another addon, but {walletService} does not check it on its own before depositing/withdrawing — it is a hook for you (or another system) to enforce.",

  walletTitle: "Wallets",
  walletBody:
    "Each player has a {wallet} with an independent balance per currency, persisted in {path}. Every deposit/withdrawal/transfer goes through {walletService}, which respects each currency's {min}/{max} and always writes a record in the ledger. A transfer that fails on the deposit (e.g. a locked destination wallet) automatically reverts the withdrawal — money is never left “lost” halfway.",
  fixesTitle: "Fixes prepared for the next update",
  fixesBody:
    "Credits that exceed the maximum balance will be rejected in full; failed transfers will return the money to the sender. A purchase in a player shop will be cancelled if the seller cannot be paid. In auctions, the payment and the item will be held until the sale can be settled, without charging the buyer again; nor will a bid be replaced if the previous one cannot be returned. On dissolving a company, treasury that cannot be credited will stay saved to retry after balance is freed up.",

  bankTitle: "Banks and loans",
  bankBody:
    "Unlike the wallet (one per player), a player can have several {account}: personal, a company's, a guild's, or shared with explicit co-holders. Banks also offer credit: a loan ({loan}) deposits the amount into the account instantly, accrues daily interest on the remaining balance (periodic task, {interval}), and is paid off in parts until it reaches 0. The limits go in the {loans} section of {config}: {maxAmount} (5000 by default; 0 = no cap, not recommended), {maxActive} (unpaid loans at once per player), {dailyInterest} and {termDays}. On expiry whatever is left is charged, first from the account and then from the borrower's wallet; if it is not enough, the debt remains and is charged on every check.",
  thAccountType: "Account type",
  aPersonal: "A player's own savings, besides their day-to-day wallet.",
  aCompany: "A company's treasury — it is created on its own when the company is founded.",
  aGuild:
    "One more account-type label — it is not linked to RPGRoll-Guilds' real {guildVault}, which is a separate balance of its own (see “Active integration” further down).",
  aShared: "An account with an explicit list of authorized co-holders.",

  marketTitle: "Dynamic market",
  marketBody:
    "The addon's most important system. Each {product} reacts to what the players actually buy/sell: selling accumulates “supply” and lowers the price, buying accumulates “demand” and raises it. With no new activity, a periodic task ({interval}) decays both accumulators by a {recovery} towards 0, so the price returns to {base} on its own over time.",
  marketFormula:
    "price = clamp(base * (1 + pressure * volatility), min, max)\npressure = (demand*demand-weight - supply*supply-weight) / 100",
  marketExample:
    "100 units of net supply/demand amount to “one full unit” of pressure. With the included example's default values ({base}, {vol}), selling 250 net units with no purchase in between produces a pressure of -2.5 and a price of {calc} (clamped to {minPrice} if it were lower).",
  priceTipTitle: "The price is never stored directly",
  priceTipBody:
    "It is always recalculated from the accumulated supply/demand state (persisted in {state}) + the product's definition — so it can never go out of sync.",

  regionsTitle: "Regional economies",
  regionsBody:
    "Besides the supply/demand multiplier (global, per product), {priceCall} applies two more multipliers if you pass it a {location} — the already-computed supply/demand price is multiplied by each one, in a chain:",
  thMultiplier: "Multiplier",
  thFrom: "Where it comes from",
  mRegion: "Region ({cls})",
  mRegionBody:
    "A box (AABB, without WorldGuard — the same style as {seasonRegion}/{fishingRegion}) with its own {catMods}/{prodMods}. With no region defined, or outside all of them, the multiplier is 1.0 (no effect) — the price is the usual global one.",
  mSeason: "Season (the product's {cls})",
  mSeasonBody:
    "If RPGRoll-Seasons is installed, the active {season} at that location is looked up and the price is multiplied by the modifier of EACH tag of that season the product has defined (e.g. {example}). Without Seasons installed, this step is skipped without an error.",
  regionsOptionalBody:
    "The single-argument method ({call}, used by shops/auctions today) still returns exactly the same as before — regions and seasons are purely optional, enabled only when the caller passes a location.",
  regionsFile: "market-regions/reference_full.yml (fragment)",
  compileWarnTitle: "Verified by compilation only",
  compileWarnBody:
    "Like other recently added integrations, this was verified by compiling and with the price engine exercised logically, not tested in game against a real Paper server.",

  activeTitle: "Active integration: Guilds and Seasons",
  activeBody:
    "Until recently, Economy's dependencies on RPGRoll-Guilds and RPGRoll-Seasons were compile-only ({compileOnly} in {gradle}) — the softdepend was declared but nothing at runtime really used them. Now there is real behavior:",
  activeSeasons:
    "{seasons} — see “Regional economies” above: a product's price can vary with the active season where it is quoted, via {mods}.",
  activeGuilds:
    "{guilds} — a periodic task ({interval} in {config}, every 24000 ticks/1 day by default) walks every guild via {api} and charges them a {property} tax for each {territory} they have claimed, deducted straight from their {vault}. The actual amount depends on a {rule} of type {property2} existing with {appliesTo} (or empty) — without that rule the tax is 0 and the task does nothing. An example {example} comes with {disabled} by default.",
  softTitle: "A real softdepend, not just declared",
  softBody:
    "Both integrations are guarded with the same pattern as the rest of the ecosystem ({check}) — without Guilds or without Seasons installed, Economy works exactly as before, with no errors or warnings.",

  shopTitle: "Server shop (/tienda)",
  shopBody:
    "{tienda} (alias {shop}) opens a front page with one slot per section; each section is a YAML in {path} and {tiendaId} opens it directly. Inside, {left} buys a batch and with shift a whole stack; {right} sells a batch and with shift everything the player is carrying. It charges and pays in the section's currency (the default one if it does not say otherwise), it is recorded in the ledger as {buy}/{sell} and it only charges if what was bought fits entirely in the inventory.",
  leftClick: "left click",
  rightClick: "right click",
  shopSectionsBody:
    "It comes with 14 vanilla sections (blocks, woods, nature, minerals, food, farm, loot, redstone, tools, armor, potions, enchantments, decoration and utilities) and a {premium} one with RPGRoll-Items' items and RPGRoll-Enchantments' books at high prices. They are reloaded with {reload}.",
  premiumWord: "Premium",
  thLine: "Line",
  thDelivers: "Delivers",
  lMaterial:
    "A vanilla item. It is the only thing the shop buys from the player, and only “clean”: named, enchanted or from RPGRoll does not count.",
  lItem: "An RPGRoll-Items item (needs that module).",
  lEnchant: "The book of an RPGRoll-Enchantments enchantment, which is applied at the anvil.",
  lBook: "A vanilla enchanted book, by the enchantment's key.",
  lFurniture: "An RPGRoll-Furniture piece, with its optional variant after the colon (needs that module).",
  lPotion: "A vanilla potion; {splash} or {lingering} for a splash or lingering one.",
  noMoneyTitle: "No infinite money",
  noMoneyBody:
    "A line with {market} is bought at the market price of the moment and sold at {ratio} of it (0.4 by default, in {config}); buying raises its demand and selling its supply. With fixed prices, a {sell} higher than {buy} is trimmed and a warning is logged: buying to resell on the spot never makes money. The included sections only buy back raw materials, at 25% of their price.",

  buyerTitle: "The buyer (an NPC that buys everything)",
  buyerBody:
    "A window where the player drops whatever they want to sell and presses {sell}. Each item is paid for by its internal value: fish and ranch products carry it inside (by species, weight and quality), and clean vanilla materials (no name, no lore) are paid what {tienda} would give for them. What it does not buy is returned on closing; nothing is lost even if the player disconnects or the server shuts down with the window open.",
  sellWord: "Sell",
  buyerNpcBody:
    "It opens with {cmd}, meant for the {command} action of an RPGRoll-NPCs NPC (or of any NPC plugin that runs console commands). The NPCs plugin ships the example {example}:",

  playerShopsTitle: "Player shops",
  playerShopsBody:
    "Each player can open a shop ({cls}) from {cmd} and put into it the item they are holding, with a price: the stock is what they put in (if they were already selling that same item, it is added up and the price updated), and withdrawing a line returns what was not sold. Other players buy directly from a browsing GUI of every open shop on the server; if the purchase does not fit in the inventory, it does not happen. Unlimited stock is left to the server shops. The configured sale tax ({sale}) is withheld automatically on every purchase.",

  auctionTitle: "Auction House (/subasta)",
  auctionBody:
    "{subasta} (alias {ah} and {subastas}) opens a browser with everything the players are selling: 45 listings per page, filtered by {section} (RPGRoll-Items special items, weapons and tools, armor, enchanted books, potions, food, blocks and materials), sorted by most recent, ending soon or price, and with {search} by name, material or enchantment (searching “mending” finds the books with Mending). Each item is shown as it is — enchantments, name and lore — with its price, seller and remaining time.",
  sectionWord: "section",
  searchWord: "search",
  thHowList: "How it is listed",
  thHowBuy: "How it is bought",
  aFixed: "Fixed price",
  aFixedBuy: "Click → confirm.",
  aAuction: "Auction",
  aAuctionBuy: "Click → type the bid; shift-click buys now if it has a buy-now price.",
  auctionListBody:
    "What the player is holding is listed (also from the GUI button, click for a fixed price or right click for an auction). Prices accept {k} or {m}. The bid is charged at once ({escrow}) and, if someone outbids it, it is returned on its own with a notice; raising your own bid only charges the difference, and a bid in the last seconds extends the auction so nobody wins by “sniping” at the end. Bidding the buy-now price is buying it.",
  auctionBoxBody:
    "Everything that closes goes to the {box} ({cmd}): what was bought, what was won and what expired unsold. What does not fit in the inventory stays in the box; nothing is ever dropped or lost, and on joining you are told if something is waiting. In {mine} the seller sees their own listings and withdraws them with shift-click as long as they have no bids. On selling, {sale} taxes are applied and the seller gets a notice with what they were paid.",
  boxWord: "collection box",
  blacklistTitle: "What cannot be sold",
  blacklistBody:
    "The materials in {blacklist} and any item with a mark from {keys} ({format} of its PersistentDataContainer). By default those are bound backpacks and RPGRoll-Extras' menu compass: nobody buys a backpack they will not be able to open. An admin ({perm}) removes any listing with a right shift-click; the item goes back to the seller's box and the bid to its bidder.",

  compTitle: "Companies",
  compBody:
    "A player can found a {company}, which automatically creates its own treasury bank account. The owner (or a {manager}) can hire employees each with a salary, deposit/withdraw from the treasury, and pay every pending salary with a single click. It does not include shares or a stock market in this version.",

  taxTitle: "Taxes",
  taxBody:
    "Each {rule} defines a {type}, a rate (%), and which ids/categories it applies to (empty = everything). The withheld amount is a pure {sink}: it leaves circulation, it is not deposited into any account — it only remains as a {tax} record in the ledger so the admin can see how much was collected.",
  sinkWord: "money sink",
  thAutoToday: "Applied automatically today?",
  tSale: "Yes — player shops, auctions and any sale to the market.",
  tProperty:
    "Yes, if there is a rule with {appliesTo} — the guild territory tax task (see “Active integration” above) triggers it periodically.",
  tOthers:
    "No — fully modeled and applicable by hand via {apply} from another addon, but no point of this addon triggers them yet.",

  inflTitle: "Inflation",
  inflBody:
    "A periodic task ({interval}) sums the total money supply — {all} the wallets stored on disk (not only those cached in memory) plus every bank account — per currency, and compares it against the previous snapshot. It keeps up to 52 snapshots in {file}. {cmd} shows the current %; {snapshot} forces a snapshot off schedule.",
  allWord: "all",

  ledgerTitle: "Transaction ledger",
  ledgerBody:
    "Every economic movement (deposit, withdrawal, sale, tax, loan, salary…) is recorded. So as not to rewrite the day's file on disk on every transaction, new records are first accumulated in memory and flushed to {path} only every 30 seconds (and once more on server shutdown) — the “recent history” query always reads from the in-memory buffer, not from disk.",

  yamlTitle: "YAML file examples",
  refTitle: "Full reference: every field in a single file, for each content type",
  refBody:
    "{files} (included in the jar) document absolutely every available field of each type, with comments explaining each one.",

  builderCurrency: "Visual builder: Currency",
  builderMarket: "Visual builder: Market product",
  builderTax: "Visual builder: Tax rule",

  guiTitle: "GUI: Economy Studio",
  guiBody:
    "{browser} opens a hub linking to 3 content browsers (Currencies, Market, Taxes). On the player's side, {bank}, {shop}, {auction} and {company} open their own GUIs — deposits/withdrawals and amounts are always asked for in chat (the same {prompt} pattern as the rest of the ecosystem), there is no numeric keypad in an inventory.",

  apiTitle: "API for addons — EconomyAPI",
  apiBody:
    "{isReady} / {get}, the same pattern as the rest of the ecosystem. It exposes the 4 content managers ({managers}) and the runtime services: {services}. A future RPGRoll-Farming/Mining/Crafting typically comes in through {entry} to quote its production (with regional/seasonal support if it passes the location), and through {wallet} to credit the player.",

  backendTitle: "Balances shared between servers — WalletBackend",
  backendBody:
    "By default each server keeps its balances in {dir}. If you have several servers and want a single balance for all of them, another plugin can register a {cls} in Bukkit's {services} ({fqn}) and say which currencies it handles. From then on, everything that moves those currencies in RPGRoll-Economy (shops, auctions, {pay}, admin commands and whatever other plugins charge through Vault) goes through it; the remaining currencies, the banks and the loans stay on the server.",
  backendImportBody:
    "Whatever balance each player already had on the server is transferred on its own, once, on joining ({import}, with an id stored before it is requested so it is not duplicated if the server goes down halfway). If the store does not answer, the operation returns {unavailable} and nothing is moved. With no {cls} registered, everything works exactly as before.",

  vaultTitle: "Vault integration",
  vaultBody:
    "Unlike {core} (which only {consumes} Vault's Economy service if an EssentialsX-style plugin is installed), RPGRoll-Economy registers as a {provider} ({cls}, priority {normal}) as soon as it detects Vault in {onEnable}. It always operates on the currency marked {isBase}. It does not implement Vault's “bank” support (a different concept from this addon's own bank) — those methods return {notImpl}.",
  consumesWord: "consumes",
  vaultWarnTitle: "If you have another economy plugin (EssentialsX, CMI) installed",
  vaultWarnBody:
    "Vault leaves the highest-priority registration active — with the same priority, the last one registered wins. For RPGRoll-Economy to be the one in charge, uninstall the other economy plugin or raise the priority here if you need both to coexist.",

  phTitle: "Placeholders (PlaceholderAPI)",
  phBody: "The {exp} expansion.",
  thPlaceholder: "Placeholder",
  thReturns: "Returns",
  p1: "The player's balance in the default currency.",
  p2: "The balance in a specific currency.",
  p3: "The sum of all their bank accounts (default currency).",
  p4: "The default currency's name.",
  p5: "The default currency's inflation %.",
  p6: "The current market price.",
  p7: "The total % configured for that tax type.",

  cmdsTitle: "Commands",
  thCommand: "Command",
  thWhat: "What it does",
  thPermission: "Permission",
  c1: "Opens the Economy Studio.",
  c2: "Reloads currencies/market/taxes.",
  c3: "Adjusts a balance.",
  c4: "Sets an exact balance.",
  c5: "Shows the latest inflation snapshot.",
  c6: "Forces a money-supply snapshot.",
  c7: "Opens the buyer window for that player (for NPCs).",
  c8: "Opens the server shop, or a section directly.",
  c9: "See your balance.",
  c10: "Pay another player.",
  c11: "Opens your bank accounts.",
  c12: "Browse player shops / manage your own.",
  c13: "Opens the Auction House.",
  c14: "Opens the Auction House (alias /ah, /subastas).",
  c15: "Lists what is in your hand at a fixed price.",
  c16: "Lists it with bids.",
  c17: "Opens the filtered browser.",
  c18: "Your listings · your collection box.",
  c19: "See/found/manage your companies.",

  fId: "Id",
  fDisplayName: "Display name",
  fSymbol: "Symbol",
  fDecimals: "Decimals",
  fIcon: "Icon (Material)",
  fColor: "Color",
  fMinBalance: "Minimum balance",
  fMaxBalance: "Maximum balance (0 = no cap)",
  fPermission: "Required permission (empty = none)",
  fRate: "Exchange rate to the base currency",
  fIsBase: "Is the base currency",
  fIdMaterial: "Id (typically a Material)",
  fCurrency: "Currency (empty = the server's)",
  fBasePrice: "Base price",
  fMinPrice: "Minimum price",
  fMaxPrice: "Maximum price",
  fSupply: "Supply weight",
  fDemand: "Demand weight",
  fVolatility: "Volatility",
  fRecovery: "Recovery rate",
  fCategory: "Category",
  fTaxType: "Type",
  fRatePercent: "Rate (%)",
  fAppliesTo: "Applies to (ids/categories, empty = everything)",
  fEnabled: "Enabled",
  phNewCurrency: "new_currency",
  phGold: "Gold",
  phNewProduct: "NEW_PRODUCT",
  phIronIngot: "Iron Ingot",
  phNewRule: "new_rule",
  phVat: "VAT",
};

const pt: EconomyCopy = {
  title: "RPGRoll-Economy",
  intro:
    "O sistema econômico avançado do ecossistema: várias moedas, wallets, bancos e empréstimos, um {market} com oferta/demanda real, lojas de jogador, leilões, empresas, impostos, um livro-caixa de transações e um rastreador de inflação. Também é o {vault} — assim que está instalado, todo o resto do ecossistema (Jobs, Guilds, Items, Workers) que já sabia falar Vault fica funcional sem tocar numa linha desses módulos.",
  marketWord: "mercado dinâmico",
  vaultWord: "provedor do serviço Economy do Vault",

  reqTitle: "Requisitos",
  thPlugin: "Plugin",
  thType: "Tipo",
  thWhatFor: "Para quê",
  rLib: "Framework de GUIs e utilitários compartilhados.",
  rCore: "Só ordem de carregamento: o Economy funciona completo sem o core.",
  rVault: "O RPGRoll-Economy se registra como {provider} do serviço Economy — não o consome, o implementa.",
  providerWord: "provedor",
  rPapi: "Placeholders {ph}.",
  rGuilds: "Integração ativa: imposto territorial periódico por guild (ver «Integração ativa» mais abaixo).",
  rSeasons:
    "Integração ativa: modificadores de preço de mercado por estação (ver «Economias regionais» mais abaixo).",
  rFurniture: "Linhas {furniture} da loja do servidor (ver «Loja do servidor»).",

  currTitle: "Moedas",
  currBody:
    "O servidor pode ter várias moedas (ouro, prata, tokens de evento…) — cada uma é um {currency} com o seu próprio símbolo, decimais, ícone/cor para as GUIs, limites de saldo, permissão opcional para poder tê-la, e uma taxa de câmbio para a moeda marcada {isBase} (só informativa; não há um comando de conversão automática). Exatamente uma moeda deveria ser {isBaseTrue}: é a que a ponte do Vault usa (ver {defaultCurrency} no {config}).",
  currWarnTitle: "O campo 'permission' não é aplicado sozinho",
  currWarnBody:
    "Está no schema e pode ser lido de outro addon, mas o {walletService} não o verifica por si mesmo antes de depositar/retirar — é um gancho para que você (ou outro sistema) o faça cumprir.",

  walletTitle: "Wallets",
  walletBody:
    "Cada jogador tem um {wallet} com um saldo independente por moeda, persistido em {path}. Todo depósito/retirada/transferência passa pelo {walletService}, que respeita {min}/{max} de cada moeda e sempre escreve um registro no livro-caixa. Uma transferência que falha no depósito (ex. wallet de destino bloqueada) reverte automaticamente a retirada — nunca fica dinheiro «perdido» no meio do caminho.",
  fixesTitle: "Correções preparadas para a próxima atualização",
  fixesBody:
    "Os créditos que superem o saldo máximo serão rejeitados completos; as transferências falhadas devolverão o dinheiro ao emissor. Uma compra em loja de jogador será cancelada se o vendedor não puder receber. Em leilões, o pagamento e o objeto ficarão retidos até ser possível liquidar a venda, sem cobrar o comprador de novo; também não será substituído um lance se não for possível devolver o anterior. Ao dissolver uma empresa, a tesouraria que não puder ser creditada seguirá guardada para tentar de novo depois de liberar saldo.",

  bankTitle: "Bancos e empréstimos",
  bankBody:
    "Diferente da wallet (uma por jogador), um jogador pode ter várias {account}: pessoais, de uma empresa, de uma guild, ou compartilhadas com cotitulares explícitos. Os bancos também oferecem crédito: um empréstimo ({loan}) deposita o valor na conta na hora, acumula juros diários sobre o saldo restante (tarefa periódica, {interval}), e é pago em partes até chegar a 0. Os limites vão na seção {loans} do {config}: {maxAmount} (5000 por padrão; 0 = sem teto, não recomendado), {maxActive} (empréstimos sem quitar ao mesmo tempo por jogador), {dailyInterest} e {termDays}. Ao vencer é cobrado o que falta, primeiro da conta e depois da carteira de quem o pediu; se não der, a dívida continua e é cobrada em cada revisão.",
  thAccountType: "Tipo de conta",
  aPersonal: "Poupança própria de um jogador, além da wallet de uso diário.",
  aCompany: "A tesouraria de uma empresa — é criada sozinha ao fundá-la.",
  aGuild:
    "Mais uma etiqueta de tipo de conta — não está vinculada ao {guildVault} real do RPGRoll-Guilds, que é um saldo próprio separado (ver «Integração ativa» mais abaixo).",
  aShared: "Conta com uma lista explícita de cotitulares autorizados.",

  marketTitle: "Mercado dinâmico",
  marketBody:
    "O sistema mais importante do addon. Cada {product} reage ao que os jogadores realmente compram/vendem: vender acumula «oferta» e baixa o preço, comprar acumula «demanda» e o sobe. Sem atividade nova, uma tarefa periódica ({interval}) decai os dois acumuladores em {recovery} para 0, então o preço volta sozinho a {base} com o tempo.",
  marketFormula:
    "preço = clamp(base * (1 + pressão * volatility), min, max)\npressão = (demanda*demand-weight - oferta*supply-weight) / 100",
  marketExample:
    "100 unidades de oferta/demanda líquida equivalem a «uma unidade completa» de pressão. Com os valores padrão do exemplo incluído ({base}, {vol}), vender 250 unidades líquidas sem nenhuma compra no meio gera uma pressão de -2.5 e um preço de {calc} (limitado a {minPrice} se fosse menor).",
  priceTipTitle: "O preço nunca é salvo diretamente",
  priceTipBody:
    "É sempre recalculado a partir do estado de oferta/demanda acumulado (persistido em {state}) + a definição do produto — assim nunca pode dessincronizar.",

  regionsTitle: "Economias regionais",
  regionsBody:
    "Além do multiplicador de oferta/demanda (global, por produto), {priceCall} aplica dois multiplicadores mais se você passar uma {location} — o preço de oferta/demanda já calculado é multiplicado por cada um, em cadeia:",
  thMultiplier: "Multiplicador",
  thFrom: "De onde sai",
  mRegion: "Região ({cls})",
  mRegionBody:
    "Uma caixa (AABB, sem WorldGuard — mesmo estilo que {seasonRegion}/{fishingRegion}) com {catMods}/{prodMods} próprios. Sem nenhuma região definida, ou fora de todas, o multiplicador é 1.0 (sem efeito) — o preço é o global de sempre.",
  mSeason: "Estação ({cls} do produto)",
  mSeasonBody:
    "Se o RPGRoll-Seasons estiver instalado, é buscada a {season} ativa nessa localização e é multiplicado pelo modificador de CADA tag dessa estação que o produto tenha definido (ex. {example}). Sem o Seasons instalado, este passo é pulado sem erro.",
  regionsOptionalBody:
    "O método de um só argumento ({call}, usado por lojas/leilões hoje) continua devolvendo exatamente o mesmo que antes — regiões e estações são puramente opcionais, ativadas só quando quem chama passa uma localização.",
  regionsFile: "market-regions/reference_full.yml (fragmento)",
  compileWarnTitle: "Só verificado por compilação",
  compileWarnBody:
    "Igual a outras integrações adicionadas recentemente, isto foi verificado compilando e com o motor de preço exercitado por lógica, não testado no jogo contra um servidor Paper real.",

  activeTitle: "Integração ativa: Guilds e Seasons",
  activeBody:
    "Até há pouco, as dependências do Economy com o RPGRoll-Guilds e o RPGRoll-Seasons eram só de compilação ({compileOnly} no {gradle}) — o softdepend estava declarado mas nada em runtime as usava de verdade. Agora há comportamento real:",
  activeSeasons:
    "{seasons} — ver «Economias regionais» acima: o preço de um produto pode variar conforme a estação ativa onde é cotado, via {mods}.",
  activeGuilds:
    "{guilds} — uma tarefa periódica ({interval} no {config}, a cada 24000 ticks/1 dia por padrão) percorre todas as guilds via {api} e cobra delas um imposto {property} por cada {territory} que tenham reivindicado, descontado direto do seu {vault}. O valor real depende de existir uma {rule} tipo {property2} com {appliesTo} (ou vazio) — sem essa regra o imposto é 0 e a tarefa não faz nada. Vem um exemplo {example} com {disabled} por padrão.",
  softTitle: "Softdepend real, não só declarado",
  softBody:
    "As duas integrações estão protegidas com o mesmo padrão que o resto do ecossistema ({check}) — sem Guilds ou sem Seasons instalados, o Economy funciona exatamente igual a antes, sem erros nem avisos.",

  shopTitle: "Loja do servidor (/tienda)",
  shopBody:
    "{tienda} (alias {shop}) abre uma capa com uma casa por seção; cada seção é um YAML em {path} e {tiendaId} a abre direto. Dentro, {left} compra um lote e com shift uma pilha inteira; {right} vende um lote e com shift tudo o que o jogador levar consigo. Cobra e paga na moeda da seção (a padrão se não disser outra), fica no livro-caixa como {buy}/{sell} e só cobra se o comprado couber inteiro no inventário.",
  leftClick: "clique esquerdo",
  rightClick: "clique direito",
  shopSectionsBody:
    "Vem com 14 seções vanilla (blocos, madeiras, natureza, minerais, comida, fazenda, loot, redstone, ferramentas, armaduras, poções, encantamentos, decoração e utilidades) e uma {premium} com os itens do RPGRoll-Items e os livros do RPGRoll-Enchantments a preços altos. São recarregadas com {reload}.",
  premiumWord: "Premium",
  thLine: "Linha",
  thDelivers: "Entrega",
  lMaterial:
    "Um item vanilla. É a única coisa que a loja compra do jogador, e só «limpo»: com nome, encantado ou do RPGRoll não conta.",
  lItem: "Um item do RPGRoll-Items (precisa desse módulo).",
  lEnchant: "O livro de um encantamento do RPGRoll-Enchantments, que é aplicado na bigorna.",
  lBook: "Um livro encantado vanilla, pela chave do encantamento.",
  lFurniture: "Um móvel do RPGRoll-Furniture, com a sua versão opcional depois dos dois pontos (precisa desse módulo).",
  lPotion: "Uma poção vanilla; {splash} ou {lingering} para arremessável ou persistente.",
  noMoneyTitle: "Sem dinheiro infinito",
  noMoneyBody:
    "Uma linha com {market} é comprada ao preço de mercado do momento e vendida a {ratio} dele (0.4 por padrão, no {config}); comprar sobe a demanda dela e vender a oferta. Com preços fixos, um {sell} maior que {buy} é cortado e é avisado no console: comprar para revender na hora nunca dá dinheiro. As seções incluídas recompram só matérias-primas, a 25 % do seu preço.",

  buyerTitle: "O comprador (NPC que compra de tudo)",
  buyerBody:
    "Uma janela onde o jogador deixa o que quiser vender e aperta {sell}. Cada item é pago pelo seu valor interno: os peixes e os produtos do rancho o levam dentro (conforme espécie, peso e qualidade), e os materiais vanilla limpos (sem nome nem lore) são pagos pelo que {tienda} daria por eles. O que não compra é devolvido ao fechar; nada se perde mesmo que o jogador se desconecte ou o servidor desligue com a janela aberta.",
  sellWord: "Vender",
  buyerNpcBody:
    "É aberto com {cmd}, pensado para a ação {command} de um NPC do RPGRoll-NPCs (ou de qualquer plugin de NPCs que execute comandos pelo console). O plugin de NPCs traz o exemplo {example}:",

  playerShopsTitle: "Lojas de jogador",
  playerShopsBody:
    "Cada jogador pode abrir uma loja ({cls}) a partir de {cmd} e colocar nela o item que tem na mão, com um preço: o estoque é o que colocou (se já vendia esse mesmo item, é somado e o preço é atualizado), e retirar uma linha devolve o que não foi vendido. Outros jogadores compram direto de uma GUI de navegação de todas as lojas abertas do servidor; se a compra não couber no inventário, não acontece. O estoque ilimitado fica para as lojas do servidor. O imposto de venda ({sale}) configurado é retido automaticamente em cada compra.",

  auctionTitle: "Casa de Leilões (/subasta)",
  auctionBody:
    "{subasta} (alias {ah} e {subastas}) abre um buscador com tudo o que os jogadores vendem: 45 publicações por página, filtradas por {section} (itens especiais do RPGRoll-Items, armas e ferramentas, armaduras, livros encantados, poções, comida, blocos e materiais), ordenadas por mais recentes, as que terminam logo ou preço, e com {search} por nome, material ou encantamento (buscar «mending» encontra os livros com Remendo). Cada item é visto como está — encantamentos, nome e lore — com o seu preço, vendedor e tempo restante.",
  sectionWord: "seção",
  searchWord: "busca",
  thHowList: "Como é publicado",
  thHowBuy: "Como é comprado",
  aFixed: "Preço fixo",
  aFixedBuy: "Clique → confirmar.",
  aAuction: "Leilão",
  aAuctionBuy: "Clique → escrever o lance; shift-clique compra já se tiver preço de compra imediata.",
  auctionListBody:
    "É publicado o que o jogador tem na mão (também pelo botão da GUI, com clique para preço fixo ou clique direito para leilão). Os preços aceitam {k} ou {m}. O lance é cobrado na hora ({escrow}) e, se alguém o superar, é devolvido sozinho com aviso; subir o próprio lance só cobra a diferença, e um lance nos últimos segundos estende o leilão para que ninguém ganhe «roubando» no final. Dar o lance do preço de compra imediata é comprá-la.",
  auctionBoxBody:
    "Tudo o que fecha vai para a {box} ({cmd}): o comprado, o ganho e o que venceu sem vender. O que não cabe no inventário fica na caixa; nunca é jogado nem perdido, e ao entrar é avisado se há algo esperando. Em {mine} o vendedor vê o que é seu e o retira com shift-clique enquanto não tiver lances. Ao vender são aplicados os impostos {sale} e o vendedor recebe um aviso com o que recebeu.",
  boxWord: "caixa de retirada",
  blacklistTitle: "O que não se pode vender",
  blacklistBody:
    "Os materiais de {blacklist} e qualquer item com uma marca de {keys} ({format} do seu PersistentDataContainer). Por padrão são as mochilas ligadas e a bússola do menu do RPGRoll-Extras: ninguém compra uma mochila que não vai poder abrir. Um admin ({perm}) retira qualquer publicação com shift-clique direito; o item volta para a caixa do vendedor e o lance, para quem o deu.",

  compTitle: "Empresas",
  compBody:
    "Um jogador pode fundar uma {company}, que cria automaticamente a sua própria conta bancária de tesouraria. O dono (ou um {manager}) pode contratar empregados com um salário cada, depositar/retirar da tesouraria, e pagar todos os salários pendentes com um só clique. Não inclui ações nem bolsa de valores nesta versão.",

  taxTitle: "Impostos",
  taxBody:
    "Cada {rule} define um {type}, uma taxa (%), e a quais ids/categorias se aplica (vazio = tudo). O valor retido é um {sink} puro: sai de circulação, não é depositado em nenhuma conta — só fica como um registro {tax} no livro-caixa para que o admin veja quanto foi arrecadado.",
  sinkWord: "money sink",
  thAutoToday: "É aplicado automaticamente hoje?",
  tSale: "Sim — lojas de jogador, leilões e qualquer venda ao mercado.",
  tProperty:
    "Sim, se houver uma regra com {appliesTo} — a tarefa de imposto territorial de guilds (ver «Integração ativa» acima) a dispara periodicamente.",
  tOthers:
    "Não — completamente modeladas e aplicáveis à mão via {apply} de outro addon, mas nenhum ponto deste addon as dispara ainda.",

  inflTitle: "Inflação",
  inflBody:
    "Uma tarefa periódica ({interval}) soma a massa monetária total — {all} as wallets guardadas no disco (não só as que estão em cache na memória) mais todas as contas bancárias — por moeda, e a compara com a foto anterior. Guarda até 52 fotos em {file}. {cmd} mostra o % atual; {snapshot} força uma foto fora de hora.",
  allWord: "todas",

  ledgerTitle: "Livro-caixa de transações",
  ledgerBody:
    "Cada movimento econômico (depósito, retirada, venda, imposto, empréstimo, salário…) fica registrado. Para não reescrever o arquivo do dia no disco em cada transação, os registros novos são acumulados primeiro na memória e despejados em {path} só a cada 30 segundos (e uma vez mais ao desligar o servidor) — a consulta de «histórico recente» sempre lê do buffer na memória, não do disco.",

  yamlTitle: "Exemplos de arquivo YAML",
  refTitle: "Referência completa: todos os campos num só arquivo, por cada tipo de conteúdo",
  refBody:
    "{files} (incluídos no jar) documentam absolutamente todos os campos disponíveis de cada tipo, com comentários explicando cada um.",

  builderCurrency: "Construtor visual: Moeda",
  builderMarket: "Construtor visual: Produto de mercado",
  builderTax: "Construtor visual: Regra tributária",

  guiTitle: "GUI: Economy Studio",
  guiBody:
    "{browser} abre um hub que liga a 3 navegadores de conteúdo (Moedas, Mercado, Impostos). Do lado do jogador, {bank}, {shop}, {auction} e {company} abrem as suas próprias GUIs — depósitos/retiradas e valores são sempre pedidos pelo chat (mesmo padrão de {prompt} que o resto do ecossistema), não há um teclado numérico em inventário.",

  apiTitle: "API para addons — EconomyAPI",
  apiBody:
    "{isReady} / {get}, mesmo padrão que o resto do ecossistema. Expõe os 4 managers de conteúdo ({managers}) e os serviços de runtime: {services}. Um futuro RPGRoll-Farming/Mining/Crafting tipicamente entra por {entry} para cotar a sua produção (com suporte regional/estacional se passar a localização), e por {wallet} para creditar o jogador.",

  backendTitle: "Saldos compartilhados entre servidores — WalletBackend",
  backendBody:
    "Por padrão cada servidor guarda os seus saldos em {dir}. Se você tem vários servidores e quer um só saldo para todos, outro plugin pode registrar um {cls} no {services} do Bukkit ({fqn}) e dizer quais moedas leva. A partir desse momento, tudo o que move essas moedas no RPGRoll-Economy (lojas, leilões, {pay}, comandos de admin e o que outros plugins cobram pelo Vault) passa por ele; o resto das moedas, os bancos e os empréstimos seguem no servidor.",
  backendImportBody:
    "O saldo que cada jogador já tivesse no servidor é transferido sozinho, uma vez, ao entrar ({import}, com um id que é guardado antes de pedi-lo para não duplicá-lo se o servidor cair no meio). Se o armazém não responder, a operação devolve {unavailable} e nada é movido. Sem nenhum {cls} registrado, tudo funciona exatamente como antes.",

  vaultTitle: "Integração com o Vault",
  vaultBody:
    "Diferente do {core} (que só {consumes} o serviço Economy do Vault se houver um plugin estilo EssentialsX instalado), o RPGRoll-Economy se registra como {provider} ({cls}, prioridade {normal}) assim que detecta o Vault no {onEnable}. Opera sempre sobre a moeda marcada {isBase}. Não implementa o suporte de «bancos» do Vault (é um conceito diferente do banco próprio deste addon) — esses métodos devolvem {notImpl}.",
  consumesWord: "consome",
  vaultWarnTitle: "Se você tem outro plugin de economia (EssentialsX, CMI) instalado",
  vaultWarnBody:
    "O Vault deixa o registro de maior prioridade ativo — com a mesma prioridade, ganha o que se registrou último. Para que o RPGRoll-Economy seja o que manda, desinstale o outro plugin de economia ou suba a prioridade aqui se for preciso conviver com os dois.",

  phTitle: "Placeholders (PlaceholderAPI)",
  phBody: "Expansão {exp}.",
  thPlaceholder: "Placeholder",
  thReturns: "Devolve",
  p1: "Saldo do jogador na moeda padrão.",
  p2: "Saldo numa moeda específica.",
  p3: "Soma de todas as suas contas bancárias (moeda padrão).",
  p4: "Nome da moeda padrão.",
  p5: "% de inflação da moeda padrão.",
  p6: "Preço atual de mercado.",
  p7: "% total configurado para esse tipo de imposto.",

  cmdsTitle: "Comandos",
  thCommand: "Comando",
  thWhat: "O que faz",
  thPermission: "Permissão",
  c1: "Abre o Economy Studio.",
  c2: "Recarrega moedas/mercado/impostos.",
  c3: "Ajusta um saldo.",
  c4: "Fixa um saldo exato.",
  c5: "Mostra a última foto de inflação.",
  c6: "Força uma foto de massa monetária.",
  c7: "Abre a janela do comprador para esse jogador (para NPCs).",
  c8: "Abre a loja do servidor, ou uma seção direta.",
  c9: "Ver o seu saldo.",
  c10: "Pagar a outro jogador.",
  c11: "Abre as suas contas bancárias.",
  c12: "Navega lojas de jogador / administra a sua.",
  c13: "Abre a Casa de Leilões.",
  c14: "Abre a Casa de Leilões (alias /ah, /subastas).",
  c15: "Publica o da mão a preço fixo.",
  c16: "O publica com lances.",
  c17: "Abre o buscador filtrado.",
  c18: "As suas publicações · a sua caixa de retirada.",
  c19: "Ver/fundar/administrar as suas empresas.",

  fId: "Id",
  fDisplayName: "Nome visível",
  fSymbol: "Símbolo",
  fDecimals: "Decimais",
  fIcon: "Ícone (Material)",
  fColor: "Cor",
  fMinBalance: "Saldo mínimo",
  fMaxBalance: "Saldo máximo (0 = sem teto)",
  fPermission: "Permissão requerida (vazio = nenhuma)",
  fRate: "Taxa de câmbio para a moeda base",
  fIsBase: "É a moeda base",
  fIdMaterial: "Id (tipicamente um Material)",
  fCurrency: "Moeda (vazio = a do servidor)",
  fBasePrice: "Preço base",
  fMinPrice: "Preço mínimo",
  fMaxPrice: "Preço máximo",
  fSupply: "Peso de oferta",
  fDemand: "Peso de demanda",
  fVolatility: "Volatilidade",
  fRecovery: "Taxa de recuperação",
  fCategory: "Categoria",
  fTaxType: "Tipo",
  fRatePercent: "Taxa (%)",
  fAppliesTo: "Aplica a (ids/categorias, vazio = tudo)",
  fEnabled: "Ativa",
  phNewCurrency: "nova_moeda",
  phGold: "Ouro",
  phNewProduct: "NOVO_PRODUTO",
  phIronIngot: "Barra de Ferro",
  phNewRule: "nova_regra",
  phVat: "ICMS",
};

export const ECONOMY_COPY: Record<Locale, EconomyCopy> = { es, en, pt };
