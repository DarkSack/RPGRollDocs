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
  Screenshot,
} from "../components/ui";
import type { ReactNode } from "react";
import { useI18n, fill } from "../i18n";
import { STRUCTURES_COPY } from "./copy/structures";

const RECIPE_YAML =
  "recipe:\n" +
  '  shape: ["PPP", "CTC", "L L"]\n' +
  "  keys:\n" +
  "    P: minecraft:oak_planks\n" +
  "    C: minecraft:copper_ingot\n" +
  "    T: minecraft:crafting_table\n" +
  "    L: minecraft:oak_log\n";

const TIERS_YAML =
  "tiers:\n" +
  "  ingeniero:\n" +
  "    max-size: {width: 32, height: 32, length: 32}\n" +
  "    upgrade-cost:                    # lo que cuesta llegar a este nivel\n" +
  '      - {item: "minecraft:iron_ingot", amount: 16}\n' +
  '      - {item: "minecraft:redstone", amount: 8}\n' +
  '      - {item: "minecraft:redstone_lamp", amount: 4}\n' +
  "    upgrade-money: 0                 # necesita Vault\n" +
  '    model: ""                        # item_model del pack; vacío = fallback-block\n' +
  "    fallback-block: SMITHING_TABLE\n";

const STORAGE_YAML =
  "type: sqlite                         # o mysql\n" +
  "sqlite:\n" +
  "  file: data.db\n" +
  "mysql:\n" +
  "  host: localhost\n" +
  "  port: 3306\n" +
  "  database: rpgrollstructures\n" +
  "  user: root\n" +
  '  password: ""\n';

export function Structures({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = STRUCTURES_COPY[locale];

  const tiers: [string, string, string, string][] = [
    [c.tConstructor, "16 × 16 × 16", "CRAFTING_TABLE", c.costNone],
    [c.tIngeniero, "32 × 32 × 32", "SMITHING_TABLE", c.costIngeniero],
    [c.tArquitecto, "64 × 96 × 64", "BEACON", c.costArquitecto],
  ];

  const menus: [string, string][] = [
    [c.mCenter, c.mCenterP],
    [c.mUpgrade, c.mUpgradeP],
    [c.mConfirm, c.mConfirmP],
    [c.mAccess, c.mAccessP],
    [c.mHelp, c.mHelpP],
  ];

  const commands: [string, ReactNode, string][] = [
    ["/structures [help|open]", fill(c.cHelp, { open: <code>open</code> }), "es: /estructuras [ayuda|abrir] · pt: /estruturas [ajuda|abrir]"],
    ["/structuresadmin give <jugador> <constructor|ingeniero|arquitecto> [1-64]", c.cGive, ""],
    ["/structuresadmin reload", c.cReload, ""],
  ];

  const permissions: [string, string, string][] = [
    ["rpgrollstructures.use", "true", c.pUse],
    ["rpgrollstructures.workbench.place", "true", c.pPlace],
    ["rpgrollstructures.workbench.break", "true", c.pBreak],
    ["rpgrollstructures.tier.*", "true", c.pTierAll],
    ["rpgrollstructures.tier.1", "true", c.pTier1],
    ["rpgrollstructures.tier.2", "true", c.pTier2],
    ["rpgrollstructures.tier.3", "true", c.pTier3],
    ["rpgrollstructures.bypass", "op", c.pBypass],
    ["rpgrollstructures.admin.give", "op", c.pGive],
    ["rpgrollstructures.admin.reload", "op", c.pReload],
    ["rpgrollstructures.admin", "op", c.pAdmin],
  ];

  const config: [string, string, ReactNode][] = [
    ["language", "es", c.kLanguage],
    ["break-policy", "block", c.kBreak],
    ["menus.pack", '""', c.kPack],
    ["workbench.yml · recipe.shape / recipe.keys", "PPP, CTC, L L", c.kRecipe],
    ["workbench.yml · tiers.<nivel>.max-size", "16 / 32 / 64", c.kSize],
    ["workbench.yml · tiers.<nivel>.upgrade-cost", "[]", c.kCost],
    ["workbench.yml · tiers.<nivel>.upgrade-money", "0", c.kMoney],
    ["workbench.yml · tiers.<nivel>.model", '""', c.kModel],
    ["workbench.yml · tiers.<nivel>.fallback-block", "CRAFTING_TABLE", c.kFallback],
  ];

  const files: [string, string][] = [
    ["config.yml", c.fConfig],
    ["workbench.yml", c.fWorkbench],
    ["storage.yml", c.fStorage],
    ["gui.yml", c.fGui],
    ["lang/<es|en|pt_BR>.yml", c.fLang],
    ["command-words.yml", c.fWords],
  ];

  return (
    <>
      <PageHeader title={c.title} slug="structures">
        {c.intro}
      </PageHeader>

      <Callout tone="info" title={c.soonTitle}>
        {c.soonBody}
      </Callout>
      <p>
        {fill(c.storeBody, {
          link: <a href="https://shop.sackito.online/producto/structures">shop.sackito.online/producto/structures</a>,
        })}
      </p>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        code={
          "depend: [RPGRoll-Lib]\nsoftdepend: [SackResourcePack, WorldEdit, FastAsyncWorldEdit, WorldGuard, GriefPrevention, Vault, floodgate]"
        }
      />
      <p>{fill(c.reqBody, { lib: <strong>RPGRoll-Lib 1.1.13</strong>, soft: <code>softdepend</code> })}</p>

      <SectionHeading id="niveles">{c.tiersTitle}</SectionHeading>
      <p>{c.tiersLead}</p>
      <Table>
        <Thead>
          <Th>{c.thTier}</Th>
          <Th>{c.thSize}</Th>
          <Th>{c.thBlock}</Th>
          <Th>{c.thCost}</Th>
        </Thead>
        <tbody>
          {tiers.map(([tier, size, block, cost]) => (
            <Tr key={tier}>
              <Td>{tier}</Td>
              <Td className="font-mono text-xs">{size}</Td>
              <Td className="font-mono text-xs">{block}</Td>
              <Td>{cost}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>{fill(c.tiersNote, { file: <code>workbench.yml</code> })}</p>
      <CodeBlock language="yaml" filename="workbench.yml" code={TIERS_YAML} />
      <Screenshot src="/capturas/structures/niveles.png" alt={c.altTiers} caption={c.shotTiers} />

      <SectionHeading id="fabricar">{c.craftTitle}</SectionHeading>
      <p>{fill(c.craftBody, { file: <code>workbench.yml</code> })}</p>
      <CodeBlock language="yaml" filename="workbench.yml" code={RECIPE_YAML} />
      <p>
        {c.craftShape}: <code>PPP / CTC / L L</code>. {c.craftKeys}
      </p>

      <SectionHeading id="uso">{c.useTitle}</SectionHeading>
      <Table>
        <tbody>
          {c.useRows.map(([what, text]) => (
            <Tr key={what}>
              <Td>{what}</Td>
              <Td>{fill(text, { bypass: <code>rpgrollstructures.bypass</code> })}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>
        {fill(c.breakPolicy, {
          key: <code>break-policy</code>,
          block: <code>block</code>,
          pause: <code>pause</code>,
          cancel: <code>cancel</code>,
        })}
      </p>

      <SectionHeading id="proteccion">{c.protectTitle}</SectionHeading>
      <p>{c.protectBody}</p>

      <SectionHeading id="menus">{c.menusTitle}</SectionHeading>
      <p>{c.menusLead}</p>
      <Table>
        <Thead>
          <Th>{c.thMenu}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          {menus.map(([menu, what]) => (
            <Tr key={menu}>
              <Td>{menu}</Td>
              <Td>{what}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>{fill(c.menusPackNote, { pack: <code>menus.pack</code> })}</p>

      <SectionHeading id="capturas">{c.shotsTitle}</SectionHeading>
      <div className="grid max-w-3xl gap-x-6 sm:grid-cols-2">
        <Screenshot src="/capturas/structures/centro.png" alt={c.altCenter} caption={c.shotCenter} />
        <Screenshot src="/capturas/structures/mejoras.png" alt={c.altUpgrade} caption={c.shotUpgrade} />
        <Screenshot src="/capturas/structures/confirmar.png" alt={c.altConfirm} caption={c.shotConfirm} />
        <Screenshot src="/capturas/structures/acceso.png" alt={c.altAccess} caption={c.shotAccess} />
        <Screenshot src="/capturas/structures/ayuda.png" alt={c.altHelp} caption={c.shotHelp} />
        <Screenshot src="/capturas/structures/mejoras-arquitecto.png" alt={c.altMax} caption={c.shotMax} />
      </div>
      <p>{c.shotFamilies}</p>
      <div className="grid max-w-3xl gap-x-4 sm:grid-cols-3">
        <Screenshot src="/capturas/structures/centro.png" alt={c.altTaller} caption={c.shotTaller} />
        <Screenshot src="/capturas/structures/centro-ingeniero.png" alt={c.altIngenio} caption={c.shotIngenio} />
        <Screenshot src="/capturas/structures/centro-arquitecto.png" alt={c.altArcano} caption={c.shotArcano} />
      </div>
      <p>{c.shotTips}</p>
      <div className="grid max-w-3xl gap-x-6 sm:grid-cols-2">
        <Screenshot src="/capturas/structures/centro-catalogo.png" alt={c.altCatalog} caption={c.shotCatalog} />
        <Screenshot src="/capturas/structures/ayuda-texto.png" alt={c.altHelpText} caption={c.shotHelpText} />
        <Screenshot src="/capturas/structures/mejoras-falta.png" alt={c.altMissing} caption={c.shotMissing} />
        <Screenshot src="/capturas/structures/mejoras-tiene.png" alt={c.altHave} caption={c.shotHave} />
      </div>

      <SectionHeading id="aspecto">{c.modelTitle}</SectionHeading>
      <p>
        {fill(c.modelBody, {
          fallback: <code>fallback-block</code>,
          model: <code>model</code>,
        })}
      </p>
      <p>{c.modelDefault}</p>
      <div className="grid max-w-3xl gap-x-4 sm:grid-cols-3">
        <Screenshot src="/capturas/structures/modelo-constructor.png" alt={c.altModelC} caption={c.shotModelC} />
        <Screenshot src="/capturas/structures/modelo-ingeniero.png" alt={c.altModelI} caption={c.shotModelI} />
        <Screenshot src="/capturas/structures/modelo-arquitecto.png" alt={c.altModelA} caption={c.shotModelA} />
      </div>
      <Screenshot src="/capturas/structures/modelo-item.png" alt={c.altModelItem} caption={c.shotModelItem} />

      <SectionHeading id="almacenamiento">{c.storageTitle}</SectionHeading>
      <p>
        {fill(c.storageBody, {
          sqlite: <strong>SQLite</strong>,
          file: <code>data.db</code>,
          mysql: <code>mysql</code>,
          type: <code>type: mysql</code>,
        })}
      </p>
      <CodeBlock language="yaml" filename="storage.yml" code={STORAGE_YAML} />

      <SectionHeading id="comandos">{c.commandsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thDesc}</Th>
          <Th>{c.thAliases}</Th>
        </Thead>
        <tbody>
          {commands.map(([cmd, does, aliases]) => (
            <Tr key={cmd}>
              <Td className="font-mono text-xs">{cmd}</Td>
              <Td>{does}</Td>
              <Td className="font-mono text-xs">{aliases}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>
        {fill(c.commandsNote, {
          admin: <Kbd>/structuresadmin</Kbd>,
          player: <Kbd>/structures</Kbd>,
          file: <code>command-words.yml</code>,
        })}
      </p>

      <SectionHeading id="permisos">{c.permissionsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thPerm}</Th>
          <Th>{c.thDefault}</Th>
          <Th>{c.thDesc}</Th>
        </Thead>
        <tbody>
          {permissions.map(([node, def, text]) => (
            <Tr key={node}>
              <Td>
                <Badge>{node}</Badge>
              </Td>
              <Td className="font-mono text-xs">{def}</Td>
              <Td>{text}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="configuracion">{c.configTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thKey}</Th>
          <Th>{c.thDefault}</Th>
          <Th>{c.thDesc}</Th>
        </Thead>
        <tbody>
          {config.map(([key, def, text]) => (
            <Tr key={key}>
              <Td className="font-mono text-xs">{key}</Td>
              <Td className="font-mono text-xs">{def}</Td>
              <Td>{text}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>{fill(c.configNote, { file: <code>workbench.yml</code>, reload: <Kbd>/structuresadmin reload</Kbd> })}</p>

      <SectionHeading id="archivos">{c.filesTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thFile}</Th>
          <Th>{c.thContains}</Th>
        </Thead>
        <tbody>
          {files.map(([file, contains]) => (
            <Tr key={file}>
              <Td className="font-mono text-xs">plugins/RPGRoll-Structures/{file}</Td>
              <Td>{contains}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <PrevNext current="structures" onNavigate={onNavigate} />
    </>
  );
}
