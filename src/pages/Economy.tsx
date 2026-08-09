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
      <PageHeader title="RPGRoll-Economy">
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
          <Tr><Td>RPGRoll (core)</Td><Td><Badge tone="violet">depend</Badge></Td><Td>Framework de GUIs y utilidades compartidas.</Td></Tr>
          <Tr><Td>Vault</Td><Td><Badge>softdepend</Badge></Td><Td>RPGRoll-Economy se registra como <strong>proveedor</strong> del servicio Economy — no lo consume, lo implementa.</Td></Tr>
          <Tr><Td>PlaceholderAPI</Td><Td><Badge>softdepend</Badge></Td><Td>Placeholders <code>%rpgeconomy_...%</code>.</Td></Tr>
          <Tr><Td>RPGRoll-Guilds</Td><Td><Badge>softdepend</Badge></Td><Td>Compile-time solamente hoy — pensado para que una guild pueda tener su propia cuenta bancaria en una próxima pasada.</Td></Tr>
          <Tr><Td>RPGRoll-Seasons</Td><Td><Badge>softdepend</Badge></Td><Td>Compile-time solamente hoy — pensado para que estaciones/eventos muevan precios de mercado en una próxima pasada.</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title="Guilds y Seasons son dependencias de compilación, no integraciones activas todavía">
        El <code>build.gradle.kts</code> del addon ya las declara <code>compileOnly</code> para dejar el terreno
        preparado, pero ningún código de este addon llama todavía a <code>GuildsAPI</code> ni a{" "}
        <code>SeasonsAPI</code> — ver <a href="#pendiente" onClick={(e) => { e.preventDefault(); document.getElementById("pendiente")?.scrollIntoView(); }}>Qué falta</a>.
      </Callout>

      <SectionHeading id="monedas">Monedas</SectionHeading>
      <p>
        El servidor puede tener varias monedas (oro, plata, tokens de evento...) — cada una es un{" "}
        <code>Currency</code> con su propio símbolo, decimales, ícono/color para las GUIs, límites de balance,
        permiso opcional para poder tenerla, y una tasa de cambio hacia la moneda marcada <code>is-base</code>{" "}
        (solo informativa hoy, no hay un comando de conversión automática todavía). Exactamente una moneda debería
        ser <code>is-base: true</code>: es la que usa el puente de Vault (ver <code>default-currency</code> en{" "}
        <code>config.yml</code>).
      </p>
      <Callout tone="warning" title="El campo 'permission' todavía no se aplica solo">
        Está en el schema y se puede leer desde otro addon, pero <code>WalletService</code> no lo chequea por sí
        mismo antes de depositar/retirar — es un gancho para que vos (u otro sistema) lo hagas cumplir.
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
          <Tr><Td className="font-mono text-xs">GUILD</Td><Td>Pensada para la tesorería de una guild (ver Callout de integraciones pendientes).</Td></Tr>
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
          <Tr><Td className="font-mono text-xs">INCOME / COMPANY / PROPERTY / COMMERCIAL / LUXURY</Td><Td>No — completamente modeladas y aplicables a mano vía <code>TaxEngine#apply</code> desde otro addon, pero ningún punto de este addon las dispara todavía.</Td></Tr>
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
        ecosistema. Expone los 3 managers de contenido (<code>currencies()</code>, <code>market()</code>,{" "}
        <code>taxRules()</code>) y los servicios de runtime: <code>wallet()</code>, <code>bank()</code>,{" "}
        <code>loans()</code>, <code>tax()</code>, <code>marketEngine()</code>, <code>shops()</code>,{" "}
        <code>auctions()</code>, <code>companies()</code>/<code>companyService()</code>, <code>ledger()</code> e{" "}
        <code>inflation()</code>. Un futuro RPGRoll-Farming/Mining/Crafting típicamente entra por{" "}
        <code>market().get(id)</code> + <code>marketEngine().price(producto)</code> para cotizar su producción, y
        por <code>wallet()</code> para acreditarle al jugador.
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
      <Callout tone="warning" title="Si tenés otro plugin de economía (EssentialsX, CMI) instalado">
        Vault deja el registro de mayor prioridad activo — con la misma prioridad, gana el que se registró
        último. Para que RPGRoll-Economy sea el que manda, desinstalá el otro plugin de economía o subile la
        prioridad acá si hace falta convivir con ambos.
      </Callout>

      <SectionHeading id="placeholders">Placeholders (PlaceholderAPI)</SectionHeading>
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
          <Tr><Td className="font-mono text-xs">{"/economy balance [moneda]"}</Td><Td>Ver tu saldo.</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/economy pay <jugador> <cant> [moneda]"}</Td><Td>Pagarle a otro jugador.</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">/economy bank</Td><Td>Abre tus cuentas bancarias.</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">/economy shop</Td><Td>Navega tiendas de jugador / administra la tuya.</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">/economy auction</Td><Td>Abre la Casa de Subastas.</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
          <Tr><Td className="font-mono text-xs">/economy company</Td><Td>Ver/fundar/administrar tus empresas.</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="pendiente">Qué falta (próxima pasada)</SectionHeading>
      <ul className="list-disc space-y-1 pl-6">
        <li>Acciones/bolsa de valores para empresas (comprar/vender <code>shares</code>).</li>
        <li>Contratos estructurados entre jugadores (publicar un pedido, otro lo acepta y entrega).</li>
        <li>NPC Merchants con IA de mercado real (detectar escasez, buscar proveedor, ajustar precios propios).</li>
        <li>Economías regionales independientes (un mismo producto con precio distinto por reino/ciudad).</li>
        <li>Eventos económicos disparados por el servidor (sequía, guerra, festival, descubrimiento minero).</li>
        <li>Integración activa con RPGRoll-Guilds (cuenta bancaria de guild) y RPGRoll-Seasons (estaciones moviendo precios) — hoy son solo dependencias de compilación.</li>
        <li>Sistema de crédito/reputación financiera por jugador (más allá de préstamos activos/vencidos).</li>
        <li><code>/economy trade</code> directo entre dos jugadores online (hoy existe indirectamente vía tiendas/subastas, no una GUI de intercambio cara a cara).</li>
        <li>Tipos de impuesto <code>INCOME</code>/<code>COMPANY</code>/<code>PROPERTY</code>/<code>COMMERCIAL</code>/<code>LUXURY</code> disparados automáticamente (hoy solo <code>SALE</code> lo está).</li>
      </ul>

      <PrevNext current="economy" onNavigate={onNavigate} />
    </>
  );
}
