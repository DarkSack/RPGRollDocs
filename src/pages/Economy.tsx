import {
  PageHeader,
  SectionHeading,
  Callout,
  CodeBlock,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Kbd,
  Badge,
  PrevNext,
  YamlBuilder,
  type YamlField,
} from "../components/ui";

const currencyFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_moneda", placeholder: "gold" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "Oro" },
  { key: "symbol", label: "Símbolo", type: "string", default: "$" },
  { key: "decimals", label: "Decimales", type: "number", default: "2" },
  { key: "icon", label: "Ícono (Material)", type: "string", default: "SUNFLOWER" },
  { key: "color", label: "Color", type: "string", default: "GOLD" },
  { key: "min-balance", label: "Balance mínimo", type: "number", default: "0" },
  { key: "max-balance", label: "Balance máximo (0 = sin tope)", type: "number", default: "0" },
  { key: "permission", label: "Permiso requerido (vacío = ninguno)", type: "string" },
  { key: "exchange-rate-to-base", label: "Tasa de cambio a la moneda base", type: "number", default: "1.0" },
  { key: "is-base", label: "Es la moneda base", type: "boolean", default: "false" },
];

const marketProductFields: YamlField[] = [
  { key: "id", label: "Id (típicamente un Material)", type: "string", default: "NUEVO_PRODUCTO", placeholder: "IRON_INGOT" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "Lingote de Hierro" },
  { key: "icon", label: "Ícono (Material)", type: "string", default: "PAPER" },
  { key: "currency", label: "Moneda (vacío = la del servidor)", type: "string" },
  { key: "base-price", label: "Precio base", type: "number", default: "10" },
  { key: "min-price", label: "Precio mínimo", type: "number", default: "2" },
  { key: "max-price", label: "Precio máximo", type: "number", default: "50" },
  { key: "supply-weight", label: "Peso de oferta", type: "number", default: "1.0" },
  { key: "demand-weight", label: "Peso de demanda", type: "number", default: "1.0" },
  { key: "volatility", label: "Volatilidad", type: "number", default: "0.25" },
  { key: "recovery-rate", label: "Tasa de recuperación", type: "number", default: "0.02" },
  { key: "category", label: "Categoría", type: "string", default: "misc" },
];

const taxRuleFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_regla", placeholder: "sales_tax" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "IVA" },
  {
    key: "type",
    label: "Tipo",
    type: "select",
    options: ["SALE", "INCOME", "COMPANY", "PROPERTY", "COMMERCIAL", "LUXURY"],
    default: "SALE",
  },
  { key: "rate-percent", label: "Tasa (%)", type: "number", default: "16" },
  { key: "applies-to", label: "Aplica a (ids/categorías, vacío = todo)", type: "list" },
  { key: "enabled", label: "Activa", type: "boolean", default: "true" },
];

export function Economy({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="RPGRoll-Economy" slug="economy">
        El sistema económico avanzado del ecosistema: monedas múltiples, wallets, bancos y préstamos, un{" "}
        <strong>mercado dinámico</strong> con oferta/demanda real, tiendas de jugador, subastas, empresas,
        impuestos, un libro mayor de transacciones y un tracker de inflación. También es el{" "}
        <strong>proveedor del servicio Economy de Vault</strong> — en cuanto está instalado, todo lo demás del
        ecosistema (Jobs, Guilds, Items, Workers) que ya sabía hablar Vault queda funcional sin tocar una línea
        de esos módulos.
      </PageHeader>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <Table>
        <Thead>
          <Th>Plugin</Th>
          <Th>Tipo</Th>
          <Th>Para qué</Th>
        </Thead>
        <tbody>
          <Tr><Td>RPGRoll-Lib</Td><Td><Badge tone="violet">depend</Badge></Td><Td>Framework de GUIs y utilidades compartidas.</Td></Tr>
          <Tr><Td>RPGRoll (core)</Td><Td><Badge>softdepend</Badge></Td><Td>Solo orden de carga: Economy funciona completo sin el core.</Td></Tr>
          <Tr><Td>Vault</Td><Td><Badge>softdepend</Badge></Td><Td>RPGRoll-Economy se registra como <strong>proveedor</strong> del servicio Economy — no lo consume, lo implementa.</Td></Tr>
          <Tr><Td>PlaceholderAPI</Td><Td><Badge>softdepend</Badge></Td><Td>Placeholders <code>%rpgeconomy_...%</code>.</Td></Tr>
          <Tr><Td>RPGRoll-Guilds</Td><Td><Badge>softdepend</Badge></Td><Td>Integración activa: impuesto territorial periódico por guild (ver "Integración activa" más abajo).</Td></Tr>
          <Tr><Td>RPGRoll-Seasons</Td><Td><Badge>softdepend</Badge></Td><Td>Integración activa: modificadores de precio de mercado por estación (ver "Economías regionales" más abajo).</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="monedas">Monedas</SectionHeading>
      <p>
        El servidor puede tener varias monedas (oro, plata, tokens de evento...) — cada una es un{" "}
        <code>Currency</code> con su propio símbolo, decimales, ícono/color para las GUIs, límites de balance,
        permiso opcional para poder tenerla, y una tasa de cambio hacia la moneda marcada <code>is-base</code>{" "}
        (solo informativa; no hay un comando de conversión automática). Exactamente una moneda debería
        ser <code>is-base: true</code>: es la que usa el puente de Vault (ver <code>default-currency</code> en{" "}
        <code>config.yml</code>).
      </p>
      <Callout tone="warning" title="El campo 'permission' no se aplica solo">
        Está en el schema y se puede leer desde otro addon, pero <code>WalletService</code> no lo chequea por sí
        mismo antes de depositar/retirar — es un gancho para que tú (u otro sistema) lo hagas cumplir.
      </Callout>

      <SectionHeading id="wallets">Wallets</SectionHeading>
      <p>
        Cada jugador tiene un <code>Wallet</code> con un saldo independiente por moneda, persistido en{" "}
        <code>plugins/RPGRoll-Economy/wallets/&lt;uuid&gt;.yml</code>. Todo depósito/retiro/transferencia pasa por{" "}
        <code>WalletService</code>, que respeta <code>min-balance</code>/<code>max-balance</code> de cada moneda y
        escribe siempre un registro en el libro mayor. Una transferencia que falla en el depósito (ej. wallet
        destino bloqueado) revierte automáticamente el retiro — nunca queda plata "perdida" a mitad de camino.
      </p>

      <SectionHeading id="bancos-prestamos">Bancos y préstamos</SectionHeading>
      <p>
        A diferencia del wallet (uno por jugador), un jugador puede tener varias <code>BankAccount</code>:
        personales, de una empresa, de una guild, o compartidas con co-titulares explícitos. Los bancos también
        ofrecen crédito: un préstamo (<code>Loan</code>) deposita el monto en la cuenta al instante, acumula
        interés diario sobre el saldo restante (tarea periódica, <code>loan-check-interval-ticks</code>), y se
        paga de a partes hasta llegar a 0.
      </p>
      <Table>
        <Thead>
          <Th>Tipo de cuenta</Th>
          <Th>Para qué</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">PERSONAL</Td><Td>Ahorros propios de un jugador, además de su wallet de uso diario.</Td></Tr>
          <Tr><Td className="font-mono text-xs">COMPANY</Td><Td>La tesorería de una empresa — se crea sola al fundarla.</Td></Tr>
          <Tr><Td className="font-mono text-xs">GUILD</Td><Td>Una etiqueta de tipo de cuenta más — no está vinculada al <code>GuildVault</code> real de RPGRoll-Guilds, que es un balance propio separado (ver "Integración activa" más abajo).</Td></Tr>
          <Tr><Td className="font-mono text-xs">SHARED</Td><Td>Cuenta con una lista explícita de co-titulares autorizados.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="mercado-dinamico">Mercado dinámico</SectionHeading>
      <p>
        El sistema más importante del addon. Cada <code>MarketProduct</code> reacciona a lo que los jugadores
        realmente compran/venden: vender acumula "oferta" y baja el precio, comprar acumula "demanda" y lo sube.
        Sin actividad nueva, una tarea periódica (<code>market-recovery-interval-ticks</code>) decae ambos
        acumuladores un <code>recovery-rate</code> hacia 0, así el precio vuelve solo a <code>base-price</code>{" "}
        con el tiempo.
      </p>
      <CodeBlock
        language="text"
        code={"precio = clamp(base * (1 + presión * volatility), min, max)\n" +
          "presión = (demanda*demand-weight - oferta*supply-weight) / 100"}
      />
      <p>
        100 unidades de oferta/demanda neta equivalen a "una unidad completa" de presión. Con los valores por
        defecto del ejemplo incluido (<code>base-price: 10</code>, <code>volatility: 0.25</code>), vender 250
        unidades netas sin ninguna compra de por medio genera una presión de -2.5 y un precio de{" "}
        <code>10 * (1 - 2.5*0.25) = 3.75</code> (clamped a <code>min-price</code> si fuera menor).
      </p>
      <Callout tone="tip" title="El precio nunca se guarda directamente">
        Se recalcula siempre a partir del estado de oferta/demanda acumulado (persistido en{" "}
        <code>market/_state.yml</code>) + la definición del producto — así nunca puede desincronizarse.
      </Callout>

      <SectionHeading id="economias-regionales">Economías regionales</SectionHeading>
      <p>
        Además del multiplicador de oferta/demanda (global, por producto), <code>MarketEngine.price(producto,
        ubicación)</code> aplica dos multiplicadores más si le pasas una <code>Location</code> — el precio de
        oferta/demanda ya calculado se multiplica por cada uno, en cadena:
      </p>
      <Table>
        <Thead>
          <Th>Multiplicador</Th>
          <Th>De dónde sale</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td>Región (<code>MarketRegion</code>)</Td>
            <Td>
              Una caja (AABB, sin WorldGuard — mismo estilo que <code>SeasonRegion</code>/
              <code>FishingRegion</code>) con <code>category-modifiers</code>/<code>product-modifiers</code> propios.
              Sin ninguna región definida, o fuera de todas, el multiplicador es 1.0 (sin efecto) — el precio es
              el global de siempre.
            </Td>
          </Tr>
          <Tr>
            <Td>Estación (<code>season-modifiers</code> del producto)</Td>
            <Td>
              Si RPGRoll-Seasons está instalado, se busca la <code>Season</code> activa en esa ubicación y se
              multiplica por el modificador de CADA tag de esa estación que el producto tenga definido (ej.{" "}
              <code>harvest: 0.8</code>). Sin Seasons instalado, este paso se salta sin error.
            </Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        El método de un solo argumento (<code>price(producto)</code>, usado por tiendas/subastas hoy) sigue
        devolviendo exactamente lo mismo que antes — regiones y estaciones son puramente opcionales, activadas
        solo cuando quien llama pasa una ubicación.
      </p>
      <CodeBlock
        language="yaml"
        filename="market-regions/reference_full.yml (fragmento)"
        code={
          "id: reference_full_example\n" +
          "world: world\n" +
          "bounds: { min-x: -200, min-y: 0, min-z: -200, max-x: 200, max-y: 255, max-z: 200 }\n" +
          "category-modifiers:\n" +
          "  mineral: 0.7   # más barato en esta región (ej. ciudad minera)\n" +
          "  luxury: 1.4    # más caro\n" +
          "product-modifiers:\n" +
          "  DIAMOND: 0.6   # tiene prioridad sobre category-modifiers si ambos aplican\n"
        }
      />
      <Callout tone="warning" title="Solo verificado por compilación">
        Igual que otras integraciones agregadas recientemente, esto se verificó compilando y con el motor de
        precio ejercitado por lógica, no probado en juego contra un servidor Paper real.
      </Callout>

      <SectionHeading id="integracion-activa">Integración activa: Guilds y Seasons</SectionHeading>
      <p>
        Hasta hace poco, las dependencias de Economy con RPGRoll-Guilds y RPGRoll-Seasons eran solo de
        compilación (<code>compileOnly</code> en <code>build.gradle.kts</code>) — el softdepend estaba
        declarado pero nada en runtime las usaba de verdad. Ahora hay comportamiento real:
      </p>
      <ul>
        <li>
          <strong>Seasons</strong> — ver "Economías regionales" arriba: el precio de un producto puede variar
          según la estación activa donde se cotiza, vía <code>season-modifiers</code>.
        </li>
        <li>
          <strong>Guilds</strong> — una tarea periódica (<code>guild-territory-tax-interval-ticks</code> en{" "}
          <code>config.yml</code>, cada 24000 ticks/1 día por defecto) recorre todas las guilds vía{" "}
          <code>GuildsAPI</code> y les cobra un impuesto <code>PROPERTY</code> por cada <code>GuildTerritory</code>{" "}
          que tengan reclamada, descontado directo de su <code>GuildVault</code>. El monto real depende de que
          exista una <code>TaxRule</code> tipo <code>PROPERTY</code> con <code>applies-to: [guild-territory]</code>{" "}
          (o vacío) — sin esa regla el impuesto es 0 y la tarea no hace nada. Viene un ejemplo{" "}
          <code>tax/guild_territory_tax.yml</code> con <code>enabled: false</code> por defecto.
        </li>
      </ul>
      <Callout tone="info" title="Softdepend real, no solo declarado">
        Ambas integraciones están guardadas con el mismo patrón que el resto del ecosistema (
        <code>Bukkit.getPluginManager().getPlugin("...") != null &amp;&amp; XApi.isReady()</code>) — sin Guilds o
        sin Seasons instalados, Economy funciona exactamente igual que antes, sin errores ni advertencias.
      </Callout>

      <SectionHeading id="tienda-servidor">Tienda del servidor (/tienda)</SectionHeading>
      <p>
        <Kbd>/tienda</Kbd> (alias <Kbd>/shop</Kbd>) abre una portada con una casilla por sección; cada sección es un
        YAML en <code>plugins/RPGRoll-Economy/server-shop/&lt;id&gt;.yml</code> y <Kbd>{"/tienda <id>"}</Kbd> la abre
        directo. Dentro, <strong>clic izquierdo</strong> compra un lote y con shift una pila entera;{" "}
        <strong>clic derecho</strong> vende un lote y con shift todo lo que el jugador lleve encima. Cobra y paga en la
        moneda de la sección (la por defecto si no dice otra), queda en el libro mayor como{" "}
        <code>MARKET_BUY</code>/<code>MARKET_SELL</code> y solo cobra si lo comprado cabe entero en el inventario.
      </p>
      <p>
        Viene con 14 secciones vanilla (bloques, maderas, naturaleza, minerales, comida, granja, botín, redstone,
        herramientas, armaduras, pociones, encantamientos, decoración y utilidades) y una <strong>Premium</strong> con
        los ítems de RPGRoll-Items y los libros de RPGRoll-Enchantments a precios altos. Se recargan con{" "}
        <Kbd>/economyadmin reload</Kbd>.
      </p>
      <Table>
        <Thead>
          <Th>Línea</Th>
          <Th>Entrega</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">material: OAK_LOG</Td><Td>Un ítem vanilla. Es lo único que la tienda le compra al jugador, y solo "limpio": con nombre, encantado o de RPGRoll no cuenta.</Td></Tr>
          <Tr><Td className="font-mono text-xs">item: flame_blade</Td><Td>Un ítem de RPGRoll-Items (necesita ese módulo).</Td></Tr>
          <Tr><Td className="font-mono text-xs">enchant: lifesteal + level</Td><Td>El libro de un encantamiento de RPGRoll-Enchantments, que se aplica en el yunque.</Td></Tr>
          <Tr><Td className="font-mono text-xs">book: mending + level</Td><Td>Un libro encantado vanilla, por la clave del encantamiento.</Td></Tr>
          <Tr><Td className="font-mono text-xs">potion: STRONG_HEALING</Td><Td>Una poción vanilla; <code>form: SPLASH_POTION</code> o <code>LINGERING_POTION</code> para arrojadiza o persistente.</Td></Tr>
        </tbody>
      </Table>
      <CodeBlock
        language="yaml"
        filename="server-shop/minerales.yml"
        code={
          "id: minerales\n" +
          'display-name: "&bMinerales"\n' +
          "icon: DIAMOND\n" +
          "slot: 22                # casilla en la portada (0-44)\n" +
          "premium: false          # true: brillo y marco dorado\n" +
          'permission: ""          # vacío = todos\n' +
          'currency: ""            # vacío = la moneda por defecto\n' +
          "description:\n" +
          '  - "&7Lingotes, gemas y bloques"\n' +
          "items:\n" +
          "  - material: GOLD_INGOT\n" +
          "    amount: 16          # unidades por compra y por venta\n" +
          "    buy: 320            # precio del lote; sin buy no se vende\n" +
          "    sell: 80            # lo que paga por el lote; sin sell no lo compra\n" +
          "  - material: DIAMOND\n" +
          "    market: DIAMOND     # precio del mercado dinámico\n" +
          "  - enchant: lifesteal\n" +
          "    level: 3\n" +
          "    buy: 90000\n" +
          '    name: "&cLifesteal III"\n' +
          '    lore: ["&7Solo esta temporada"]\n'
        }
      />
      <Callout tone="info" title="Sin dinero infinito">
        Una línea con <code>market:</code> se compra al precio de mercado del momento y se vende a{" "}
        <code>server-shop.market-sell-ratio</code> de él (0.4 por defecto, en <code>config.yml</code>); comprar sube
        su demanda y vender su oferta. Con precios fijos, un <code>sell</code> mayor que <code>buy</code> se recorta
        y se avisa en consola: comprar para revender en el acto nunca da dinero. Las secciones incluidas recompran
        solo materias primas, al 25 % de su precio.
      </Callout>

      <SectionHeading id="tiendas">Tiendas de jugador</SectionHeading>
      <p>
        Cada jugador puede abrir una tienda (<code>PlayerShop</code>) desde <Kbd>/economy shop</Kbd>: agrega el
        ítem que tiene en la mano con un precio y un stock (o ilimitado), y otros jugadores compran directo desde
        una GUI de navegación de todas las tiendas abiertas del servidor. El impuesto de venta (<code>SALE</code>)
        configurado se retiene automáticamente en cada compra.
      </p>

      <SectionHeading id="subastas">Subastas</SectionHeading>
      <p>
        La Casa de Subastas cobra la puja en el momento (<em>escrow</em>): al pujar se te retira el monto de la
        billetera al instante, y si alguien te supera, se te devuelve solo. Al vencer la subasta, si hubo puja se
        le paga al vendedor (menos impuesto) y el ítem queda listo para que el ganador lo retire con{" "}
        <Kbd>/economy auction</Kbd> → "Retirar mis ítems/premios" — funciona sin importar si estaba offline
        cuando la subasta terminó. Si nadie pujó, el vendedor recupera su propio ítem de la misma forma.
      </p>

      <SectionHeading id="empresas">Empresas</SectionHeading>
      <p>
        Un jugador puede fundar una <code>Company</code>, que crea automáticamente su propia cuenta bancaria de
        tesorería. El dueño (o un <code>MANAGER</code>) puede contratar empleados con un salario cada uno,
        depositar/retirar de la tesorería, y pagar todos los salarios pendientes con un solo click. No incluye
        acciones ni bolsa de valores en esta versión.
      </p>

      <SectionHeading id="impuestos">Impuestos</SectionHeading>
      <p>
        Cada <code>TaxRule</code> define un <code>type</code>, una tasa (%), y a qué ids/categorías aplica (vacío
        = todo). El monto retenido es un <strong>money sink</strong> puro: sale de circulación, no se deposita en
        ninguna cuenta — solo queda como un registro <code>TAX</code> en el libro mayor para que el admin vea
        cuánto se recaudó.
      </p>
      <Table>
        <Thead>
          <Th>Tipo</Th>
          <Th>¿Se aplica automáticamente hoy?</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">SALE</Td><Td>Sí — tiendas de jugador, subastas y cualquier venta al mercado.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PROPERTY</Td><Td>Sí, si hay una regla con <code>applies-to: [guild-territory]</code> — la tarea de impuesto territorial de guilds (ver "Integración activa" arriba) la dispara periódicamente.</Td></Tr>
          <Tr><Td className="font-mono text-xs">INCOME / COMPANY / COMMERCIAL / LUXURY</Td><Td>No — completamente modeladas y aplicables a mano vía <code>TaxEngine#apply</code> desde otro addon, pero ningún punto de este addon las dispara todavía.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="inflacion">Inflación</SectionHeading>
      <p>
        Una tarea periódica (<code>inflation-snapshot-interval-ticks</code>) suma la masa monetaria total —{" "}
        <strong>todos</strong> los wallets guardados en disco (no solo los cacheados en memoria) más todas las
        cuentas bancarias — por moneda, y la compara contra la foto anterior. Guarda hasta 52 fotos en{" "}
        <code>inflation.yml</code>. <Kbd>/economyadmin inflation</Kbd> muestra el % actual; <Kbd>/economyadmin snapshot</Kbd>{" "}
        fuerza una foto fuera de horario.
      </p>

      <SectionHeading id="libro-mayor">Libro mayor de transacciones</SectionHeading>
      <p>
        Cada movimiento económico (depósito, retiro, venta, impuesto, préstamo, salario...) queda registrado. Para
        no reescribir el archivo del día en disco en cada transacción, los registros nuevos se acumulan primero en
        memoria y se vuelcan a <code>ledger/&lt;yyyy-MM-dd&gt;.yml</code> recién cada 30 segundos (y una vez más al
        apagar el servidor) — la consulta de "historial reciente" siempre lee del buffer en memoria, no del disco.
      </p>

      <SectionHeading id="formato-yaml">Ejemplos de archivo YAML</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="currencies/gold.yml"
        code={
          "id: gold\n" +
          'display-name: "Oro"\n' +
          'symbol: "g"\n' +
          "decimals: 2\n" +
          "icon: SUNFLOWER\n" +
          "color: GOLD\n" +
          "min-balance: 0\n" +
          "max-balance: 0\n" +
          "permission: null\n" +
          "exchange-rate-to-base: 1.0\n" +
          "is-base: true\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="market/iron_ingot.yml"
        code={
          "id: IRON_INGOT\n" +
          'display-name: "Lingote de Hierro"\n' +
          "icon: IRON_INGOT\n" +
          "currency: gold\n" +
          "base-price: 10\n" +
          "min-price: 2\n" +
          "max-price: 50\n" +
          "supply-weight: 1.0\n" +
          "demand-weight: 1.2\n" +
          "volatility: 0.25\n" +
          "recovery-rate: 0.02\n" +
          "category: mining\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="tax/sales_tax.yml"
        code={
          "id: sales_tax\n" +
          'display-name: "IVA"\n' +
          "type: SALE\n" +
          "rate-percent: 16\n" +
          "applies-to: []\n" +
          "enabled: true\n"
        }
      />
      <Callout tone="tip" title="Referencia completa: todos los campos en un solo archivo, por cada tipo de contenido">
        <code>currencies/reference_full.yml</code>, <code>market/reference_full.yml</code> y{" "}
        <code>tax/reference_full.yml</code> (incluidos en el jar) documentan absolutamente todos los campos
        disponibles de cada tipo, con comentarios explicando cada uno.
      </Callout>

      <YamlBuilder title="Constructor visual: Moneda" folder="currencies" fields={currencyFields} />
      <YamlBuilder title="Constructor visual: Producto de mercado" folder="market" fields={marketProductFields} />
      <YamlBuilder title="Constructor visual: Regla tributaria" folder="tax" fields={taxRuleFields} />

      <SectionHeading id="gui">GUI: Economy Studio</SectionHeading>
      <p>
        <Kbd>/economyadmin browser</Kbd> abre un hub que enlaza a 3 navegadores de contenido (Monedas, Mercado,
        Impuestos). Del lado del jugador, <Kbd>/economy bank</Kbd>, <Kbd>/economy shop</Kbd>,{" "}
        <Kbd>/economy auction</Kbd> y <Kbd>/economy company</Kbd> abren sus propias GUIs — depósitos/retiros y
        montos siempre se piden por chat (mismo patrón de <code>ChatPromptManager</code> que el resto del
        ecosistema), no hay un teclado numérico en inventario.
      </p>

      <SectionHeading id="api">API para addons — EconomyAPI</SectionHeading>
      <p>
        <code>EconomyAPI.isReady()</code> / <code>EconomyAPI.get()</code>, mismo patrón que el resto del
        ecosistema. Expone los 4 managers de contenido (<code>currencies()</code>, <code>market()</code>,{" "}
        <code>marketRegions()</code>, <code>taxRules()</code>) y los servicios de runtime: <code>wallet()</code>,{" "}
        <code>bank()</code>, <code>loans()</code>, <code>tax()</code>, <code>marketEngine()</code>,{" "}
        <code>shops()</code>, <code>auctions()</code>, <code>companies()</code>/<code>companyService()</code>,{" "}
        <code>ledger()</code> e <code>inflation()</code>. Un futuro RPGRoll-Farming/Mining/Crafting típicamente
        entra por <code>market().get(id)</code> + <code>marketEngine().price(producto, ubicación)</code> para
        cotizar su producción (con soporte regional/estacional si pasa la ubicación), y por{" "}
        <code>wallet()</code> para acreditarle al jugador.
      </p>

      <SectionHeading id="integracion-vault">Integración con Vault</SectionHeading>
      <p>
        A diferencia de <code>core</code> (que solo <em>consume</em> el servicio Economy de Vault si hay un
        EssentialsX-style instalado), RPGRoll-Economy se registra como <strong>proveedor</strong>{" "}
        (<code>EconomyVaultProvider</code>, prioridad <code>Normal</code>) apenas detecta Vault en{" "}
        <code>onEnable</code>. Opera siempre sobre la moneda marcada <code>is-base: true</code>. No implementa el
        soporte de "bancos" de Vault (es un concepto distinto al banco propio de este addon) — esos métodos
        devuelven <code>NOT_IMPLEMENTED</code>.
      </p>
      <Callout tone="warning" title="Si tienes otro plugin de economía (EssentialsX, CMI) instalado">
        Vault deja el registro de mayor prioridad activo — con la misma prioridad, gana el que se registró
        último. Para que RPGRoll-Economy sea el que manda, desinstalá el otro plugin de economía o subile la
        prioridad acá si hace falta convivir con ambos.
      </Callout>

      <SectionHeading id="placeholders">Placeholders (PlaceholderAPI)</SectionHeading>
      <p>
        Expansión <Badge tone="violet">rpgeconomy</Badge>.
      </p>
      <Table>
        <Thead>
          <Th>Placeholder</Th>
          <Th>Devuelve</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">%rpgeconomy_balance%</Td><Td>Saldo del jugador en la moneda por defecto.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgeconomy_balance_&lt;moneda&gt;%</Td><Td>Saldo en una moneda específica.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgeconomy_bank%</Td><Td>Suma de todas sus cuentas bancarias (moneda por defecto).</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgeconomy_currency%</Td><Td>Nombre de la moneda por defecto.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgeconomy_inflation%</Td><Td>% de inflación de la moneda por defecto.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgeconomy_market_price_&lt;producto&gt;%</Td><Td>Precio actual de mercado.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgeconomy_tax_rate_&lt;tipo&gt;%</Td><Td>% total configurado para ese tipo de impuesto.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
          <Th>Permiso</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/economyadmin browser</Td><Td>Abre el Economy Studio.</Td><Td><Badge tone="violet">rpgrolleconomy.admin.*</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">/economyadmin reload</Td><Td>Recarga monedas/mercado/impuestos.</Td><Td><Badge tone="violet">rpgrolleconomy.admin.*</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/economyadmin give|take <jugador> <moneda> <cant>"}</Td><Td>Ajusta un balance.</Td><Td><Badge tone="violet">rpgrolleconomy.admin.*</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/economyadmin setbalance <jugador> <moneda> <cant>"}</Td><Td>Fija un balance exacto.</Td><Td><Badge tone="violet">rpgrolleconomy.admin.*</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">/economyadmin inflation</Td><Td>Muestra la última foto de inflación.</Td><Td><Badge tone="violet">rpgrolleconomy.admin.*</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">/economyadmin snapshot</Td><Td>Fuerza una foto de masa monetaria.</Td><Td><Badge tone="violet">rpgrolleconomy.admin.*</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/tienda [sección]"}</Td><Td>Abre la tienda del servidor, o una sección directa.</Td><Td><Badge>rpgrolleconomy.servershop</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/economy balance [moneda]"}</Td><Td>Ver tu saldo.</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/economy pay <jugador> <cant> [moneda]"}</Td><Td>Pagarle a otro jugador.</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">/economy bank</Td><Td>Abre tus cuentas bancarias.</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">/economy shop</Td><Td>Navega tiendas de jugador / administra la tuya.</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">/economy auction</Td><Td>Abre la Casa de Subastas.</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">/economy company</Td><Td>Ver/fundar/administrar tus empresas.</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
        </tbody>
      </Table>

      <PrevNext current="economy" onNavigate={onNavigate} />
    </>
  );
}
