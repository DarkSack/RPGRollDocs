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
import { useI18n, fill } from "../i18n";
import { ECONOMY_COPY, type EconomyCopy } from "./copy/economy";

const mono = "font-mono text-xs";

const currencyFields = (c: EconomyCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewCurrency, placeholder: "gold" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: c.phGold },
  { key: "symbol", label: c.fSymbol, type: "string", default: "$" },
  { key: "decimals", label: c.fDecimals, type: "number", default: "2" },
  { key: "icon", label: c.fIcon, type: "string", default: "SUNFLOWER" },
  { key: "color", label: c.fColor, type: "string", default: "GOLD" },
  { key: "min-balance", label: c.fMinBalance, type: "number", default: "0" },
  { key: "max-balance", label: c.fMaxBalance, type: "number", default: "0" },
  { key: "permission", label: c.fPermission, type: "string" },
  { key: "exchange-rate-to-base", label: c.fRate, type: "number", default: "1.0" },
  { key: "is-base", label: c.fIsBase, type: "boolean", default: "false" },
];

const marketProductFields = (c: EconomyCopy): YamlField[] => [
  { key: "id", label: c.fIdMaterial, type: "string", default: c.phNewProduct, placeholder: "IRON_INGOT" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: c.phIronIngot },
  { key: "icon", label: c.fIcon, type: "string", default: "PAPER" },
  { key: "currency", label: c.fCurrency, type: "string" },
  { key: "base-price", label: c.fBasePrice, type: "number", default: "10" },
  { key: "min-price", label: c.fMinPrice, type: "number", default: "2" },
  { key: "max-price", label: c.fMaxPrice, type: "number", default: "50" },
  { key: "supply-weight", label: c.fSupply, type: "number", default: "1.0" },
  { key: "demand-weight", label: c.fDemand, type: "number", default: "1.0" },
  { key: "volatility", label: c.fVolatility, type: "number", default: "0.25" },
  { key: "recovery-rate", label: c.fRecovery, type: "number", default: "0.02" },
  { key: "category", label: c.fCategory, type: "string", default: "misc" },
];

const taxRuleFields = (c: EconomyCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewRule, placeholder: "sales_tax" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: c.phVat },
  {
    key: "type",
    label: c.fTaxType,
    type: "select",
    options: ["SALE", "INCOME", "COMPANY", "PROPERTY", "COMMERCIAL", "LUXURY"],
    default: "SALE",
  },
  { key: "rate-percent", label: c.fRatePercent, type: "number", default: "16" },
  { key: "applies-to", label: c.fAppliesTo, type: "list" },
  { key: "enabled", label: c.fEnabled, type: "boolean", default: "true" },
];

export function Economy({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = ECONOMY_COPY[locale];

  return (
    <>
      <PageHeader title={c.title} slug="economy">
        {fill(c.intro, { market: <strong>{c.marketWord}</strong>, vault: <strong>{c.vaultWord}</strong> })}
      </PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thPlugin}</Th>
          <Th>{c.thType}</Th>
          <Th>{c.thWhatFor}</Th>
        </Thead>
        <tbody>
          <Tr><Td>RPGRoll-Lib</Td><Td><Badge tone="violet">depend</Badge></Td><Td>{c.rLib}</Td></Tr>
          <Tr><Td>RPGRoll (core)</Td><Td><Badge>softdepend</Badge></Td><Td>{c.rCore}</Td></Tr>
          <Tr>
            <Td>Vault</Td>
            <Td><Badge>softdepend</Badge></Td>
            <Td>{fill(c.rVault, { provider: <strong>{c.providerWord}</strong> })}</Td>
          </Tr>
          <Tr>
            <Td>PlaceholderAPI</Td>
            <Td><Badge>softdepend</Badge></Td>
            <Td>{fill(c.rPapi, { ph: <code>%rpgeconomy_...%</code> })}</Td>
          </Tr>
          <Tr><Td>RPGRoll-Guilds</Td><Td><Badge>softdepend</Badge></Td><Td>{c.rGuilds}</Td></Tr>
          <Tr><Td>RPGRoll-Seasons</Td><Td><Badge>softdepend</Badge></Td><Td>{c.rSeasons}</Td></Tr>
          <Tr>
            <Td>RPGRoll-Furniture</Td>
            <Td><Badge>softdepend</Badge></Td>
            <Td>{fill(c.rFurniture, { furniture: <code>furniture:</code> })}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="monedas">{c.currTitle}</SectionHeading>
      <p>
        {fill(c.currBody, {
          currency: <code>Currency</code>,
          isBase: <code>is-base</code>,
          isBaseTrue: <code>is-base: true</code>,
          defaultCurrency: <code>default-currency</code>,
          config: <code>config.yml</code>,
        })}
      </p>
      <Callout tone="warning" title={c.currWarnTitle}>
        {fill(c.currWarnBody, { walletService: <code>WalletService</code> })}
      </Callout>

      <SectionHeading id="wallets">{c.walletTitle}</SectionHeading>
      <p>
        {fill(c.walletBody, {
          wallet: <code>Wallet</code>,
          path: <code>plugins/RPGRoll-Economy/wallets/&lt;uuid&gt;.yml</code>,
          walletService: <code>WalletService</code>,
          min: <code>min-balance</code>,
          max: <code>max-balance</code>,
        })}
      </p>

      <Callout tone="info" title={c.fixesTitle}>
        {c.fixesBody}
      </Callout>

      <SectionHeading id="bancos-prestamos">{c.bankTitle}</SectionHeading>
      <p>
        {fill(c.bankBody, {
          account: <code>BankAccount</code>,
          loan: <code>Loan</code>,
          interval: <code>loan-check-interval-ticks</code>,
          loans: <code>loans</code>,
          config: <code>config.yml</code>,
          maxAmount: <code>max-amount</code>,
          maxActive: <code>max-active</code>,
          dailyInterest: <code>daily-interest-percent</code>,
          termDays: <code>term-days</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thAccountType}</Th>
          <Th>{c.thWhatFor}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>PERSONAL</Td><Td>{c.aPersonal}</Td></Tr>
          <Tr><Td className={mono}>COMPANY</Td><Td>{c.aCompany}</Td></Tr>
          <Tr>
            <Td className={mono}>GUILD</Td>
            <Td>{fill(c.aGuild, { guildVault: <code>GuildVault</code> })}</Td>
          </Tr>
          <Tr><Td className={mono}>SHARED</Td><Td>{c.aShared}</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="mercado-dinamico">{c.marketTitle}</SectionHeading>
      <p>
        {fill(c.marketBody, {
          product: <code>MarketProduct</code>,
          interval: <code>market-recovery-interval-ticks</code>,
          recovery: <code>recovery-rate</code>,
          base: <code>base-price</code>,
        })}
      </p>
      <CodeBlock language="text" code={c.marketFormula} />
      <p>
        {fill(c.marketExample, {
          base: <code>base-price: 10</code>,
          vol: <code>volatility: 0.25</code>,
          calc: <code>10 * (1 - 2.5*0.25) = 3.75</code>,
          minPrice: <code>min-price</code>,
        })}
      </p>
      <Callout tone="tip" title={c.priceTipTitle}>
        {fill(c.priceTipBody, { state: <code>market/_state.yml</code> })}
      </Callout>

      <SectionHeading id="economias-regionales">{c.regionsTitle}</SectionHeading>
      <p>
        {fill(c.regionsBody, {
          priceCall: <code>MarketEngine.price(producto, ubicación)</code>,
          location: <code>Location</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thMultiplier}</Th>
          <Th>{c.thFrom}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td>{fill(c.mRegion, { cls: <code>MarketRegion</code> })}</Td>
            <Td>
              {fill(c.mRegionBody, {
                seasonRegion: <code>SeasonRegion</code>,
                fishingRegion: <code>FishingRegion</code>,
                catMods: <code>category-modifiers</code>,
                prodMods: <code>product-modifiers</code>,
              })}
            </Td>
          </Tr>
          <Tr>
            <Td>{fill(c.mSeason, { cls: <code>season-modifiers</code> })}</Td>
            <Td>
              {fill(c.mSeasonBody, {
                season: <code>Season</code>,
                example: <code>harvest: 0.8</code>,
              })}
            </Td>
          </Tr>
        </tbody>
      </Table>
      <p>{fill(c.regionsOptionalBody, { call: <code>price(producto)</code> })}</p>
      <CodeBlock
        language="yaml"
        filename={c.regionsFile}
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
      <Callout tone="warning" title={c.compileWarnTitle}>
        {c.compileWarnBody}
      </Callout>

      <SectionHeading id="integracion-activa">{c.activeTitle}</SectionHeading>
      <p>
        {fill(c.activeBody, { compileOnly: <code>compileOnly</code>, gradle: <code>build.gradle.kts</code> })}
      </p>
      <ul>
        <li>
          {fill(c.activeSeasons, {
            seasons: <strong>Seasons</strong>,
            mods: <code>season-modifiers</code>,
          })}
        </li>
        <li>
          {fill(c.activeGuilds, {
            guilds: <strong>Guilds</strong>,
            interval: <code>guild-territory-tax-interval-ticks</code>,
            config: <code>config.yml</code>,
            api: <code>GuildsAPI</code>,
            property: <code>PROPERTY</code>,
            territory: <code>GuildTerritory</code>,
            vault: <code>GuildVault</code>,
            rule: <code>TaxRule</code>,
            property2: <code>PROPERTY</code>,
            appliesTo: <code>applies-to: [guild-territory]</code>,
            example: <code>tax/guild_territory_tax.yml</code>,
            disabled: <code>enabled: false</code>,
          })}
        </li>
      </ul>
      <Callout tone="info" title={c.softTitle}>
        {fill(c.softBody, {
          check: <code>Bukkit.getPluginManager().getPlugin("...") != null &amp;&amp; XApi.isReady()</code>,
        })}
      </Callout>

      <SectionHeading id="tienda-servidor">{c.shopTitle}</SectionHeading>
      <p>
        {fill(c.shopBody, {
          tienda: <Kbd>/tienda</Kbd>,
          shop: <Kbd>/shop</Kbd>,
          path: <code>plugins/RPGRoll-Economy/server-shop/&lt;id&gt;.yml</code>,
          tiendaId: <Kbd>{"/tienda <id>"}</Kbd>,
          left: <strong>{c.leftClick}</strong>,
          right: <strong>{c.rightClick}</strong>,
          buy: <code>MARKET_BUY</code>,
          sell: <code>MARKET_SELL</code>,
        })}
      </p>
      <p>
        {fill(c.shopSectionsBody, {
          premium: <strong>{c.premiumWord}</strong>,
          reload: <Kbd>/economyadmin reload</Kbd>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thLine}</Th>
          <Th>{c.thDelivers}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>material: OAK_LOG</Td><Td>{c.lMaterial}</Td></Tr>
          <Tr><Td className={mono}>item: flame_blade</Td><Td>{c.lItem}</Td></Tr>
          <Tr><Td className={mono}>enchant: lifesteal + level</Td><Td>{c.lEnchant}</Td></Tr>
          <Tr><Td className={mono}>book: mending + level</Td><Td>{c.lBook}</Td></Tr>
          <Tr><Td className={mono}>furniture: sofa:red</Td><Td>{c.lFurniture}</Td></Tr>
          <Tr>
            <Td className={mono}>potion: STRONG_HEALING</Td>
            <Td>
              {fill(c.lPotion, { splash: <code>form: SPLASH_POTION</code>, lingering: <code>LINGERING_POTION</code> })}
            </Td>
          </Tr>
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
      <Callout tone="info" title={c.noMoneyTitle}>
        {fill(c.noMoneyBody, {
          market: <code>market:</code>,
          ratio: <code>server-shop.market-sell-ratio</code>,
          config: <code>config.yml</code>,
          sell: <code>sell</code>,
          buy: <code>buy</code>,
        })}
      </Callout>

      <SectionHeading id="comprador">{c.buyerTitle}</SectionHeading>
      <p>
        {fill(c.buyerBody, { sell: <strong>{c.sellWord}</strong>, tienda: <code>/tienda</code> })}
      </p>
      <p>
        {fill(c.buyerNpcBody, {
          cmd: <code>/economyadmin comprador &lt;jugador&gt;</code>,
          command: <code>COMMAND</code>,
          example: <code>npcs/_ejemplo_comprador.yml</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="npcs/comprador.yml"
        code={
          "id: comprador\n" +
          'display-name: "&6Comprador"\n' +
          "location: {world: world, x: 12.0, y: 65.0, z: 5.0, yaw: 90.0, pitch: 0.0}\n" +
          "actions:\n" +
          "  - type: MESSAGE\n" +
          '    value: "&6¿Qué me traes hoy, {player}?"\n' +
          "  - type: COMMAND\n" +
          '    value: "economyadmin comprador {player}"\n'
        }
      />
      <CodeBlock
        language="yaml"
        filename="config.yml"
        code={
          "buyer:\n" +
          "  value-multiplier: 1.0      # 0.8 = paga un 20 % menos que el valor\n" +
          "  accept-shop-prices: true   # comprar también materiales al precio de venta de /tienda\n"
        }
      />

      <SectionHeading id="tiendas">{c.playerShopsTitle}</SectionHeading>
      <p>
        {fill(c.playerShopsBody, {
          cls: <code>PlayerShop</code>,
          cmd: <Kbd>/economy shop</Kbd>,
          sale: <code>SALE</code>,
        })}
      </p>

      <SectionHeading id="subastas">{c.auctionTitle}</SectionHeading>
      <p>
        {fill(c.auctionBody, {
          subasta: <Kbd>/subasta</Kbd>,
          ah: <Kbd>/ah</Kbd>,
          subastas: <Kbd>/subastas</Kbd>,
          section: <strong>{c.sectionWord}</strong>,
          search: <strong>{c.searchWord}</strong>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thHowList}</Th>
          <Th>{c.thHowBuy}</Th>
        </Thead>
        <tbody>
          <Tr><Td>{c.aFixed}</Td><Td className={mono}>{"/subasta vender <precio>"}</Td><Td>{c.aFixedBuy}</Td></Tr>
          <Tr>
            <Td>{c.aAuction}</Td>
            <Td className={mono}>{"/subasta subastar <inicial> [compra ya]"}</Td>
            <Td>{c.aAuctionBuy}</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.auctionListBody, {
          k: <code>1.5k</code>,
          m: <code>2m</code>,
          escrow: <em>escrow</em>,
        })}
      </p>
      <p>
        {fill(c.auctionBoxBody, {
          box: <strong>{c.boxWord}</strong>,
          cmd: <Kbd>/subasta recoger</Kbd>,
          mine: <Kbd>/subasta mis</Kbd>,
          sale: <code>SALE</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="config.yml"
        code={
          "auction-house:\n" +
          "  aliases: [ah, subastas]\n" +
          "  duration-hours: 48\n" +
          "  max-listings: 5              # 0 = sin límite\n" +
          "  limits:                      # permiso rpgrolleconomy.auction.limit.<nombre>\n" +
          "    vip: 10\n" +
          "    mvp: 20\n" +
          "  min-price: 1\n" +
          "  max-price: 0                 # 0 = sin máximo\n" +
          "  listing-fee-percent: 2       # comisión al publicar (sale de la economía)\n" +
          "  min-bid-increment-percent: 5\n" +
          "  anti-snipe-seconds: 30\n" +
          '  currency: ""                 # vacío = la moneda por defecto\n' +
          "  blacklist: [BEDROCK, BARRIER, COMMAND_BLOCK]\n" +
          '  blocked-data-keys: ["rpgrollextras:backpack_bound", "rpgrollextras:server_menu_item"]\n'
        }
      />
      <Callout tone="info" title={c.blacklistTitle}>
        {fill(c.blacklistBody, {
          blacklist: <code>blacklist</code>,
          keys: <code>blocked-data-keys</code>,
          format: <code>plugin:clave</code>,
          perm: <code>rpgrolleconomy.auction.admin</code>,
        })}
      </Callout>

      <SectionHeading id="empresas">{c.compTitle}</SectionHeading>
      <p>{fill(c.compBody, { company: <code>Company</code>, manager: <code>MANAGER</code> })}</p>

      <SectionHeading id="impuestos">{c.taxTitle}</SectionHeading>
      <p>
        {fill(c.taxBody, {
          rule: <code>TaxRule</code>,
          type: <code>type</code>,
          sink: <strong>{c.sinkWord}</strong>,
          tax: <code>TAX</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thAutoToday}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>SALE</Td><Td>{c.tSale}</Td></Tr>
          <Tr>
            <Td className={mono}>PROPERTY</Td>
            <Td>{fill(c.tProperty, { appliesTo: <code>applies-to: [guild-territory]</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>INCOME / COMPANY / COMMERCIAL / LUXURY</Td>
            <Td>{fill(c.tOthers, { apply: <code>TaxEngine#apply</code> })}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="inflacion">{c.inflTitle}</SectionHeading>
      <p>
        {fill(c.inflBody, {
          interval: <code>inflation-snapshot-interval-ticks</code>,
          all: <strong>{c.allWord}</strong>,
          file: <code>inflation.yml</code>,
          cmd: <Kbd>/economyadmin inflation</Kbd>,
          snapshot: <Kbd>/economyadmin snapshot</Kbd>,
        })}
      </p>

      <SectionHeading id="libro-mayor">{c.ledgerTitle}</SectionHeading>
      <p>{fill(c.ledgerBody, { path: <code>ledger/&lt;yyyy-MM-dd&gt;.yml</code> })}</p>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
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
      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, {
          files: (
            <>
              <code>currencies/reference_full.yml</code>, <code>market/reference_full.yml</code>,{" "}
              <code>tax/reference_full.yml</code>
            </>
          ),
        })}
      </Callout>

      <YamlBuilder title={c.builderCurrency} folder="currencies" fields={currencyFields(c)} />
      <YamlBuilder title={c.builderMarket} folder="market" fields={marketProductFields(c)} />
      <YamlBuilder title={c.builderTax} folder="tax" fields={taxRuleFields(c)} />

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>
        {fill(c.guiBody, {
          browser: <Kbd>/economyadmin browser</Kbd>,
          bank: <Kbd>/economy bank</Kbd>,
          shop: <Kbd>/economy shop</Kbd>,
          auction: <Kbd>/economy auction</Kbd>,
          company: <Kbd>/economy company</Kbd>,
          prompt: <code>ChatPromptManager</code>,
        })}
      </p>

      <SectionHeading id="api">{c.apiTitle}</SectionHeading>
      <p>
        {fill(c.apiBody, {
          isReady: <code>EconomyAPI.isReady()</code>,
          get: <code>EconomyAPI.get()</code>,
          managers: (
            <>
              <code>currencies()</code>, <code>market()</code>, <code>marketRegions()</code>,{" "}
              <code>taxRules()</code>
            </>
          ),
          services: (
            <>
              <code>wallet()</code>, <code>bank()</code>, <code>loans()</code>, <code>tax()</code>,{" "}
              <code>marketEngine()</code>, <code>shops()</code>, <code>auctions()</code>,{" "}
              <code>companies()</code>/<code>companyService()</code>, <code>ledger()</code>,{" "}
              <code>inflation()</code>
            </>
          ),
          entry: (
            <>
              <code>market().get(id)</code> + <code>marketEngine().price(producto, ubicación)</code>
            </>
          ),
          wallet: <code>wallet()</code>,
        })}
      </p>

      <SectionHeading id="wallet-backend">{c.backendTitle}</SectionHeading>
      <p>
        {fill(c.backendBody, {
          dir: <code>wallets/</code>,
          cls: <code>WalletBackend</code>,
          services: <code>ServicesManager</code>,
          fqn: <code>com.sack.rpgroll.economy.api.WalletBackend</code>,
          pay: <code>/pay</code>,
        })}
      </p>
      <p>
        {fill(c.backendImportBody, {
          import: <code>importBalance</code>,
          unavailable: <code>UNAVAILABLE</code>,
          cls: <code>WalletBackend</code>,
        })}
      </p>

      <SectionHeading id="integracion-vault">{c.vaultTitle}</SectionHeading>
      <p>
        {fill(c.vaultBody, {
          core: <code>core</code>,
          consumes: <em>{c.consumesWord}</em>,
          provider: <strong>{c.providerWord}</strong>,
          cls: <code>EconomyVaultProvider</code>,
          normal: <code>Normal</code>,
          onEnable: <code>onEnable</code>,
          isBase: <code>is-base: true</code>,
          notImpl: <code>NOT_IMPLEMENTED</code>,
        })}
      </p>
      <Callout tone="warning" title={c.vaultWarnTitle}>
        {c.vaultWarnBody}
      </Callout>

      <SectionHeading id="placeholders">{c.phTitle}</SectionHeading>
      <p>{fill(c.phBody, { exp: <Badge tone="violet">rpgeconomy</Badge> })}</p>
      <Table>
        <Thead>
          <Th>{c.thPlaceholder}</Th>
          <Th>{c.thReturns}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>%rpgeconomy_balance%</Td><Td>{c.p1}</Td></Tr>
          <Tr><Td className={mono}>%rpgeconomy_balance_&lt;moneda&gt;%</Td><Td>{c.p2}</Td></Tr>
          <Tr><Td className={mono}>%rpgeconomy_bank%</Td><Td>{c.p3}</Td></Tr>
          <Tr><Td className={mono}>%rpgeconomy_currency%</Td><Td>{c.p4}</Td></Tr>
          <Tr><Td className={mono}>%rpgeconomy_inflation%</Td><Td>{c.p5}</Td></Tr>
          <Tr><Td className={mono}>%rpgeconomy_market_price_&lt;producto&gt;%</Td><Td>{c.p6}</Td></Tr>
          <Tr><Td className={mono}>%rpgeconomy_tax_rate_&lt;tipo&gt;%</Td><Td>{c.p7}</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="comandos">{c.cmdsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
          <Th>{c.thPermission}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>/economyadmin browser</Td><Td>{c.c1}</Td><Td><Badge tone="violet">rpgrolleconomy.admin.*</Badge></Td></Tr>
          <Tr><Td className={mono}>/economyadmin reload</Td><Td>{c.c2}</Td><Td><Badge tone="violet">rpgrolleconomy.admin.*</Badge></Td></Tr>
          <Tr><Td className={mono}>{"/economyadmin give|take <jugador> <moneda> <cant>"}</Td><Td>{c.c3}</Td><Td><Badge tone="violet">rpgrolleconomy.admin.*</Badge></Td></Tr>
          <Tr><Td className={mono}>{"/economyadmin setbalance <jugador> <moneda> <cant>"}</Td><Td>{c.c4}</Td><Td><Badge tone="violet">rpgrolleconomy.admin.*</Badge></Td></Tr>
          <Tr><Td className={mono}>/economyadmin inflation</Td><Td>{c.c5}</Td><Td><Badge tone="violet">rpgrolleconomy.admin.*</Badge></Td></Tr>
          <Tr><Td className={mono}>/economyadmin snapshot</Td><Td>{c.c6}</Td><Td><Badge tone="violet">rpgrolleconomy.admin.*</Badge></Td></Tr>
          <Tr><Td className={mono}>{"/economyadmin comprador <jugador>"}</Td><Td>{c.c7}</Td><Td><Badge tone="violet">rpgrolleconomy.admin.*</Badge></Td></Tr>
          <Tr><Td className={mono}>{"/tienda [sección]"}</Td><Td>{c.c8}</Td><Td><Badge>rpgrolleconomy.servershop</Badge></Td></Tr>
          <Tr><Td className={mono}>{"/economy balance [moneda]"}</Td><Td>{c.c9}</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
          <Tr><Td className={mono}>{"/economy pay <jugador> <cant> [moneda]"}</Td><Td>{c.c10}</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
          <Tr><Td className={mono}>/economy bank</Td><Td>{c.c11}</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
          <Tr><Td className={mono}>/economy shop</Td><Td>{c.c12}</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
          <Tr><Td className={mono}>/economy auction</Td><Td>{c.c13}</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
          <Tr><Td className={mono}>/subasta</Td><Td>{c.c14}</Td><Td><Badge>rpgrolleconomy.auction</Badge></Td></Tr>
          <Tr><Td className={mono}>{"/subasta vender <precio>"}</Td><Td>{c.c15}</Td><Td><Badge>rpgrolleconomy.auction.sell</Badge></Td></Tr>
          <Tr><Td className={mono}>{"/subasta subastar <inicial> [compra ya]"}</Td><Td>{c.c16}</Td><Td><Badge>rpgrolleconomy.auction.sell</Badge></Td></Tr>
          <Tr><Td className={mono}>{"/subasta buscar <texto>"}</Td><Td>{c.c17}</Td><Td><Badge>rpgrolleconomy.auction</Badge></Td></Tr>
          <Tr><Td className={mono}>/subasta mis · /subasta recoger</Td><Td>{c.c18}</Td><Td><Badge>rpgrolleconomy.auction</Badge></Td></Tr>
          <Tr><Td className={mono}>/economy company</Td><Td>{c.c19}</Td><Td><Badge>rpgrolleconomy.use</Badge></Td></Tr>
        </tbody>
      </Table>

      <PrevNext current="economy" onNavigate={onNavigate} />
    </>
  );
}
