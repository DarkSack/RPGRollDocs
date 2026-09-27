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
} from "../components/ui";
import type { ReactNode } from "react";
import { useI18n, fill } from "../i18n";
import { FURNITURE_COPY } from "./copy/furniture";

const EXAMPLE_YAML =
  "mesita:                               # id del mueble\n" +
  "  category: tables\n" +
  '  name: "&6Mesita de roble"\n' +
  '  lore: ["&7Con un cajón."]\n' +
  "  model: mipack:muebles/mesita        # item_model en tu resource pack\n" +
  "  variants:                           # opcional; la primera es la de por defecto\n" +
  "    roble: { model: mipack:muebles/mesita_roble, recipe: { materials: { OAK_PLANKS: 4 } } }\n" +
  "    roja:  { model: mipack:muebles/mesita_roja, dye: RED }\n" +
  "  placement:\n" +
  "    surfaces: [floor]                 # floor, wall, ceiling\n" +
  "    rotations: 4                      # 4, 8 o 16\n" +
  "    limit: 0                          # por chunk (0 = solo el global)\n" +
  "  hitbox:\n" +
  "    type: barrier                     # o interaction (width, height)\n" +
  '    blocks: ["0,0,0"]\n' +
  "  storage: { rows: 1, title: \"&8Cajón\" }\n" +
  "  shelf:\n" +
  '    - { at: "0,1.01,0", scale: 0.45, flat: true }\n' +
  "  recipe:                             # sin recipe no se fabrica\n" +
  "    station: carpenter\n" +
  "    materials: { OAK_PLANKS: 4, STICK: 2 }\n" +
  "    money: 15\n" +
  "  sounds: { place: block.wood.place, break: block.wood.break }\n";

const LAMP_YAML =
  "lampara:\n" +
  "  category: lighting\n" +
  "  model: mipack:muebles/lampara\n" +
  "  hitbox: { type: interaction, width: 0.6, height: 1.9 }\n" +
  "  light: { level: 15, at: \"0,1,0\" }\n" +
  "  states:\n" +
  "    trigger: click\n" +
  "    list:\n" +
  '      - { id: off, suffix: "", light: 0 }\n' +
  '      - { id: on, suffix: "_on", light: 15, sound: block.lever.click }\n' +
  "  ambient: { particle: SMALL_FLAME, at: \"0,1.6,0\", every: 10, state: on }\n";

export function Furniture({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = FURNITURE_COPY[locale];

  const controls: [string, string][] = [
    [c.ctPlace, c.ctPlaceDo],
    [c.ctUse, c.ctUseDo],
    [c.ctDye, c.ctDyeDo],
    [c.ctShelf, c.ctShelfDo],
    [c.ctRotate, c.ctRotateDo],
    [c.ctBreak, c.ctBreakDo],
  ];

  const catalog: [string, string][] = [
    [c.catSeating, c.catSeatingP],
    [c.catTables, c.catTablesP],
    [c.catStorage, c.catStorageP],
    [c.catBedroom, c.catBedroomP],
    [c.catKitchen, c.catKitchenP],
    [c.catLighting, c.catLightingP],
    [c.catDecoration, c.catDecorationP],
    [c.catGarden, c.catGardenP],
    [c.catWorkshop, c.catWorkshopP],
  ];

  const functions: [string, ReactNode][] = [
    ["seat", c.fnSeat],
    ["storage", c.fnStorage],
    ["trash", c.fnTrash],
    ["light", c.fnLight],
    ["states", c.fnStates],
    ["workstation", c.fnWorkstation],
    ["shelf", c.fnShelf],
    ["ambient", c.fnAmbient],
    ["actions", c.fnActions],
    ["variants", fill(c.fnVariants, { dye: <code>dye: RED</code> })],
  ];

  const commands: [string, string, string][] = [
    ["/muebles", c.cMuebles, "furniture, decoracion"],
    ["/muebles fabricar [estación]", c.cFabricar, ""],
    ["/furnitureadmin give <jugador> <id[:versión]> [cantidad]", c.cGive, "fadmin"],
    ["/furnitureadmin carpenter <jugador> [estación]", c.cCarpenter, ""],
    ["/furnitureadmin list", c.cList, ""],
    ["/furnitureadmin info", c.cInfo, ""],
    ["/furnitureadmin nearby [radio]", c.cNearby, ""],
    ["/furnitureadmin remove [radio]", c.cRemove, ""],
    ["/furnitureadmin reload", c.cReload, ""],
  ];

  const permissions: [string, string, string][] = [
    ["rpgroll.furniture.use", "true", c.pUse],
    ["rpgroll.furniture.catalog", "true", c.pCatalog],
    ["rpgroll.furniture.carpenter.anywhere", "false", c.pAnywhere],
    ["rpgroll.furniture.bypass", "op", c.pBypass],
    ["rpgroll.furniture.admin", "op", c.pAdmin],
  ];

  const config: [string, string, string][] = [
    ["language", "es", c.kLanguage],
    ["categories", "…", c.kCategories],
    ["limits.per-chunk", "64", c.kPerChunk],
    ["protection.owner-only", "true", c.kOwnerOnly],
    ["protection.check-regions", "true", c.kRegions],
    ["controls.rotate-on-sneak-click", "true", c.kRotate],
    ["dye.consume", "true", c.kDye],
    ["seats.height-offset", "0.0", c.kSeat],
    ["ambient.range", "32", c.kAmbient],
    ["resource-pack.register-in-sackresourcepack", "true", c.kPack],
  ];

  return (
    <>
      <PageHeader title={c.title} slug="furniture">
        {c.intro}
      </PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll-Lib]\nsoftdepend: [SackResourcePack, Vault]"} />
      <p>
        {fill(c.reqBody, {
          srp: <strong>SackResourcePack</strong>,
          vault: <strong>Vault</strong>,
          gde: <strong>GeyserDisplayEntity</strong>,
        })}
      </p>

      <SectionHeading id="como-funciona">{c.howTitle}</SectionHeading>
      <p>
        {fill(c.howBody1, {
          display: <code>ItemDisplay</code>,
          barrier: <code>barrier</code>,
          interaction: <code>Interaction</code>,
        })}
      </p>
      <p>{c.howBody2}</p>

      <SectionHeading id="controles">{c.controlsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thAction}</Th>
          <Th>{c.thEffect}</Th>
        </Thead>
        <tbody>
          {controls.map(([action, effect]) => (
            <Tr key={action}>
              <Td>{action}</Td>
              <Td>{effect}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="proteccion">{c.protectTitle}</SectionHeading>
      <p>
        {fill(c.protectBody, {
          ownerOnly: <code>protection.owner-only</code>,
          regions: <code>protection.check-regions</code>,
          perChunk: <code>limits.per-chunk</code>,
          bypass: <code>rpgroll.furniture.bypass</code>,
        })}
      </p>

      <SectionHeading id="catalogo">{c.catalogTitle}</SectionHeading>
      <p>{c.catalogLead}</p>
      <Table>
        <Thead>
          <Th>{c.thCategory}</Th>
          <Th>{c.thPieces}</Th>
        </Thead>
        <tbody>
          {catalog.map(([category, pieces]) => (
            <Tr key={category}>
              <Td>{category}</Td>
              <Td>{pieces}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>{c.catalogVersions}</p>

      <SectionHeading id="carpintero">{c.carpenterTitle}</SectionHeading>
      <p>{fill(c.carpenterBody1, { workstation: <code>workstation: CARPENTER</code> })}</p>
      <p>
        {fill(c.carpenterBody2, {
          station: <code>recipe.station</code>,
          cmd: <Kbd>{"/furnitureadmin carpenter <jugador> [estación]"}</Kbd>,
          anywhere: <code>rpgroll.furniture.carpenter.anywhere</code>,
          muebles: <Kbd>/muebles fabricar</Kbd>,
        })}
      </p>

      <SectionHeading id="obtener">{c.obtainTitle}</SectionHeading>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          {fill(c.obtainGive, {
            cmd: <Kbd>{"/furnitureadmin give <jugador> <id> [cantidad]"}</Kbd>,
            ref: <code>sofa:red</code>,
          })}
        </li>
        <li>
          {fill(c.obtainShop, {
            line: <code>furniture: sofa:red</code>,
            dir: <code>plugins/RPGRoll-Economy/server-shop/</code>,
          })}
        </li>
        <li>{fill(c.obtainApi, { api: <code>FurniturePlugin#createItem("sofa:red", 1)</code> })}</li>
      </ul>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <p>
        {fill(c.yamlLead, {
          file: <code>.yml</code>,
          dir: <code>plugins/RPGRoll-Furniture/furniture/</code>,
          underscore: <code>_</code>,
          ref: <code>_referencia.yml</code>,
          reload: <Kbd>/furnitureadmin reload</Kbd>,
        })}
      </p>
      <CodeBlock language="yaml" filename="furniture/mis-muebles.yml" code={EXAMPLE_YAML} />
      <p>{fill(c.yamlOffsets, { example: <code>"-1,0,0"</code> })}</p>

      <SectionHeading id="funciones">{c.functionsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thKey}</Th>
          <Th>{c.thEffect}</Th>
        </Thead>
        <tbody>
          {functions.map(([key, text]) => (
            <Tr key={key}>
              <Td className="font-mono text-xs">{key}</Td>
              <Td>{text}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <CodeBlock language="yaml" filename="furniture/lamparas.yml" code={LAMP_YAML} />

      <SectionHeading id="bedrock">{c.bedrockTitle}</SectionHeading>
      <p>
        {fill(c.bedrockBody, {
          gde: (
            <a href="https://github.com/GeyserExtensionists/GeyserDisplayEntity" target="_blank" rel="noreferrer">
              GeyserDisplayEntity
            </a>
          ),
          dir: <code>plugins/RPGRoll-Furniture/bedrock/</code>,
        })}
      </p>
      <ol className="list-decimal pl-6 space-y-1">
        <li>
          {fill(c.bedrockStep1, {
            dir: <code>plugins/Geyser-*/extensions/</code>,
            pack: <code>GeyserDisplayEntityPack.mcpack</code>,
            packs: <code>plugins/Geyser-*/packs/</code>,
          })}
        </li>
        <li>
          {fill(c.bedrockStep2, {
            ourPack: <code>Geyser/packs/rpgroll-furniture.mcpack</code>,
            packs: <code>plugins/Geyser-*/packs/</code>,
            mappings: <code>Geyser/custom_mappings/rpgroll-furniture.json</code>,
            mappingsDir: <code>plugins/Geyser-*/custom_mappings/</code>,
          })}
        </li>
        <li>{c.bedrockStep3}</li>
      </ol>
      <p>{fill(c.bedrockNote, { hide: <code>hide-unmapped-vanilla-displays</code> })}</p>

      <SectionHeading id="resource-pack">{c.packTitle}</SectionHeading>
      <p>
        {fill(c.packBody, {
          cmd: <Kbd>/srp rebuild</Kbd>,
          model: <code>rpgroll_furniture:&lt;mueble&gt;/&lt;versión&gt;</code>,
          key: <code>model:</code>,
        })}
      </p>

      <Callout tone="warning" title={c.untestedTitle}>
        {c.untestedBody}
      </Callout>

      <SectionHeading id="comandos">{c.commandsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thDoes}</Th>
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

      <SectionHeading id="permisos">{c.permsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thPermission}</Th>
          <Th>{c.thDefault}</Th>
          <Th>{c.thEffect}</Th>
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
      <p>{fill(c.pPiece, { key: <code>permission:</code> })}</p>

      <SectionHeading id="configuracion">{c.configTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thKey}</Th>
          <Th>{c.thDefault}</Th>
          <Th>{c.thMeaning}</Th>
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

      <SectionHeading id="archivos">{c.filesTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thFile}</Th>
          <Th>{c.thContains}</Th>
        </Thead>
        <tbody>
          {(
            [
              ["config.yml", c.fConfig],
              ["furniture/<categoría>.yml", c.fFurniture],
              ["furniture/_referencia.yml", c.fReference],
              ["bedrock/", c.fBedrock],
              ["lang/<idioma>.yml", c.fLang],
            ] as [string, string][]
          ).map(([file, contains]) => (
            <Tr key={file}>
              <Td className="font-mono text-xs">plugins/RPGRoll-Furniture/{file}</Td>
              <Td>{contains}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <PrevNext current="furniture" onNavigate={onNavigate} />
    </>
  );
}
