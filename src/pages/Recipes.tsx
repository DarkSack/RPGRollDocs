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
import { RECIPES_COPY } from "./copy/recipes";

const EXTRA_YAML =
  'source: "MiPlugin"                   # nombre del origen (por defecto, el del archivo)\n' +
  "\n" +
  "stations:                            # opcional; las vanilla ya existen\n" +
  "  forja_enana:\n" +
  '    name: "&6Forja enana"\n' +
  "    icon: ANVIL\n" +
  "\n" +
  "recipes:\n" +
  "  espada_enana:\n" +
  "    station: forja_enana             # o crafting_table, furnace, smithing_table, brewing_stand...\n" +
  '    shape: [" A ", " A ", " B "]      # opcional: sin shape, ingredients es una lista\n' +
  "    ingredients:\n" +
  "      A: IRON_INGOT\n" +
  "      B: STICK\n" +
  "    result:                          # un material, o todo esto\n" +
  "      material: IRON_SWORD\n" +
  '      name: "&bEspada enana"\n' +
  '      model: "miplugin:espada_enana"  # item_model del pack\n' +
  '    notes: ["&7Habla con el herrero enano"]\n' +
  "\n" +
  "  estofado:\n" +
  "    station: campfire\n" +
  '    ingredients: ["BEEF x2", "#minecraft:planks", "CARROT|POTATO"]   # cantidad, tag, alternativas\n' +
  '    result: "RABBIT_STEW x2"\n';

const API_JAVA =
  "public final class MisRecetas implements RecipeSource {\n" +
  "\n" +
  "    @Override public String name() { return \"MiPlugin\"; }\n" +
  "\n" +
  "    @Override public Collection<RecipeEntry> recipes() {\n" +
  "        RecipeStation forja = new RecipeStation(\"miplugin:forja\", \"&6Forja\", new ItemStack(Material.ANVIL));\n" +
  "        return List.of(RecipeEntry.builder(\"espada_runica\", forja)\n" +
  "                .input(new ItemStack(Material.DIAMOND, 2))\n" +
  "                .input(runa())                       // cualquier ItemStack, también personalizados\n" +
  "                .output(espadaRunica())\n" +
  "                .note(\"&7Tiempo: 30 s\")\n" +
  "                .visibleTo(p -> p.hasPermission(\"miplugin.forja\"))\n" +
  "                .build());\n" +
  "    }\n" +
  "}\n" +
  "\n" +
  "// en onEnable (depend o softdepend: RPGRoll-Lib)\n" +
  "RecipeSource.register(this, new MisRecetas());\n";

export function Recipes({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = RECIPES_COPY[locale];

  const sources: [string, ReactNode][] = [
    [c.srcBukkit, c.srcBukkitP],
    [c.srcBrewing, c.srcBrewingP],
    [c.srcCrafting, c.srcCraftingP],
    [c.srcFurniture, c.srcFurnitureP],
    [c.srcExtra, c.srcExtraP],
    [c.srcApi, fill(c.srcApiP, { api: <code>RecipeSource</code> })],
  ];

  const controls: [string, ReactNode][] = [
    [c.uClickLeft, c.uClickLeftDo],
    [c.uClickRight, c.uClickRightDo],
    [c.uIngredient, c.uIngredientDo],
    [c.uInventory, c.uInventoryDo],
    [c.uFilters, c.uFiltersDo],
    [c.uSearch, fill(c.uSearchDo, { at: <code>@crafting</code> })],
  ];

  const commands: [string, string, string][] = [
    ["/recetas [texto]", c.cOpen, "recetario, recipes, jei"],
    ["/recetas buscar <texto>", c.cSearch, ""],
    ["/recetas mano", c.cHand, ""],
    ["/recetas usos", c.cUses, ""],
    ["/recetas libro [jugador]", c.cBook, ""],
    ["/recetas fuentes", c.cSources, ""],
    ["/recetas recargar", c.cReload, ""],
  ];

  const permissions: [string, string, string][] = [
    ["rpgrollrecipes.use", "true", c.pUse],
    ["rpgrollrecipes.book", "true", c.pBook],
    ["rpgrollrecipes.admin", "op", c.pAdmin],
  ];

  const config: [string, string, ReactNode][] = [
    ["language", "es", c.kLanguage],
    ["index.refresh-minutes", "5", c.kRefresh],
    ["brewing", "true", c.kBrewing],
    ["hide.sources / stations / recipes", "[]", fill(c.kHide, { example: <code>minecraft:*_bed</code> })],
    ["book.*", "BOOK", c.kBook],
  ];

  return (
    <>
      <PageHeader title={c.title} slug="recipes">
        {c.intro}
      </PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        code={"depend: [RPGRoll-Lib]\nsoftdepend: [RPGRoll, RPGRoll-Crafting, RPGRoll-Items, RPGRoll-Furniture, RPGRoll-Extras]"}
      />
      <p>{fill(c.reqBody, { lib: <strong>RPGRoll-Lib</strong>, soft: <code>softdepend</code> })}</p>

      <SectionHeading id="que-lee">{c.readsTitle}</SectionHeading>
      <p>{c.readsLead}</p>
      <Table>
        <Thead>
          <Th>{c.thSource}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          {sources.map(([source, what]) => (
            <Tr key={source}>
              <Td>{source}</Td>
              <Td>{what}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <Callout tone="info">
        {fill(c.readsLimit, {
          mix: <code>PotionBrewer#addPotionMix</code>,
          extra: <code>extra/</code>,
          sources: <Kbd>/recetas fuentes</Kbd>,
        })}
      </Callout>

      <SectionHeading id="usar">{c.useTitle}</SectionHeading>
      <p>{fill(c.useLead, { cmd: <Kbd>/recetas</Kbd>, jei: <Kbd>/jei</Kbd> })}</p>
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
      <p>{c.useRotate}</p>
      <p>{fill(c.useNames, { torch: <code>torch</code> })}</p>

      <SectionHeading id="libro">{c.bookTitle}</SectionHeading>
      <p>
        {fill(c.bookBody, {
          cmd: <Kbd>/recetas libro</Kbd>,
          join: <code>book.give-on-first-join</code>,
          recipe: <code>book.recipe</code>,
          model: <code>book.model</code>,
        })}
      </p>

      <SectionHeading id="extra">{c.extraTitle}</SectionHeading>
      <p>
        {fill(c.extraLead, {
          file: <code>.yml</code>,
          dir: <code>plugins/RPGRoll-Recipes/extra/</code>,
          underscore: <code>_</code>,
          reload: <Kbd>/recetas recargar</Kbd>,
        })}
      </p>
      <CodeBlock language="yaml" filename="extra/mi-plugin.yml" code={EXTRA_YAML} />

      <SectionHeading id="api">{c.apiTitle}</SectionHeading>
      <p>
        {fill(c.apiBody, {
          iface: <code>com.sack.rpgroll.common.recipe.RecipeSource</code>,
          addRecipe: <code>Bukkit.addRecipe</code>,
        })}
      </p>
      <CodeBlock language="java" filename="MisRecetas.java" code={API_JAVA} />

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
              ["lang/<idioma>.yml", c.fLang],
              ["extra/*.yml", c.fExtra],
            ] as [string, string][]
          ).map(([file, contains]) => (
            <Tr key={file}>
              <Td className="font-mono text-xs">plugins/RPGRoll-Recipes/{file}</Td>
              <Td>{contains}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <PrevNext current="recipes" onNavigate={onNavigate} />
    </>
  );
}
