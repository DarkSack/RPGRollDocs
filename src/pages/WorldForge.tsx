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
  PrevNext,
} from "../components/ui";
import { useI18n, fill } from "../i18n";
import { WORLDFORGE_COPY } from "./copy/worldforge";

const PRESET_YAML =
  "schema: 1\n" +
  "id: mi-mundo                 # minúsculas, números, - y _ (hasta 32)\n" +
  "name: Mi mundo\n" +
  "provider: hybrid\n" +
  "seed: 12345                  # opcional; sin semilla, aleatoria\n" +
  "environment: normal          # normal, nether o the_end\n" +
  "structures: true             # estructuras vanilla (vanilla e hybrid)\n" +
  "spawn: {x: 0, y: 70, z: 0}   # opcional\n" +
  "platform: {block: stone, radius: 2, y: 69}   # opcional\n" +
  "biomes: [plains, forest]     # opcional: solo estos biomas existentes\n" +
  "ores:\n" +
  "- id: mas-diamante\n" +
  "  block: deepslate_diamond_ore\n" +
  "  replaces: [deepslate, tuff]\n" +
  "  veins-per-chunk: 2\n" +
  "  size: 6\n" +
  "  min-y: -64\n" +
  "  max-y: -16\n" +
  "  distribution: triangle     # uniform o triangle\n" +
  "player-gravity: 0.5          # opcional: gravedad de los jugadores en este mundo (0.1 a 4)\n" +
  "# provider: terrain  →  terrain: montanas         (un terreno de terrains/)\n" +
  "# provider: plugin   →  generator: Terra:OVERWORLD (como en bukkit.yml)\n" +
  "templates:\n" +
  "- id: mazmorra\n" +
  "  structure: mazmorra        # structures/mazmorra.nbt\n" +
  "  rarity: 40                 # una de cada 40 chunks, de media\n" +
  "  placement: underground     # surface (sobre el suelo) o underground\n" +
  "  min-y: -40\n" +
  "  max-y: 0\n" +
  "  rotation: random           # random o none\n";

const TERRAIN_YAML =
  "id: mio\n" +
  "description: lo que verás en /wf terrain list\n" +
  "base: overworld        # overworld, amplified o large_biomes\n" +
  "height-scale: 1.5      # 0.25 a 3: estira la forma del relieve alrededor de y=64\n" +
  "height-offset: 0       # -96 a 96: sube o hunde toda la tierra\n" +
  "peaks: 1.0             # 0 a 4: picos dentados (0 los quita)\n" +
  "continent-size: 1.0    # 0.25 a 8: continentes y océanos\n" +
  "erosion-size: 1.0      # 0.25 a 8: zonas llanas y escarpadas\n" +
  "ridge-size: 1.0        # 0.25 a 8: crestas y valles\n" +
  "biome-size: 1.0        # 0.25 a 8: zonas de clima (temperatura y humedad)\n" +
  "sea-level: 63\n" +
  "aquifers: true\n" +
  "ore-veins: true\n";

const mono = "font-mono text-xs";

export function WorldForge({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = WORLDFORGE_COPY[locale];

  return (
    <>
      <PageHeader title={c.title} slug="worldforge">
        {c.intro}
      </PageHeader>

      <Callout tone="info" title={c.versionTitle}>
        {fill(c.versionBody, { limits: <a href="#limites">{c.limitsLink}</a> })}
      </Callout>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <Table>
        <tbody>
          <Tr>
            <Td>{c.rServer}</Td>
            <Td>{fill(c.rServerVal, { folia: <a href="#folia">{c.foliaLink}</a> })}</Td>
          </Tr>
          <Tr><Td>{c.rJava}</Td><Td>25</Td></Tr>
          <Tr><Td>{c.rDeps}</Td><Td>{c.rDepsVal}</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="tip" title={c.noLibTitle}>
        {c.noLibBody}
      </Callout>

      <SectionHeading id="instalacion">{c.installTitle}</SectionHeading>
      <ol>
        <li>{fill(c.i1, { jar: <code>RPGRoll-WorldForge-&lt;versión&gt;.jar</code>, dir: <code>plugins/</code> })}</li>
        <li>
          {fill(c.i2, {
            file: <code>plugins/RPGRoll-WorldForge/license.yml</code>,
            prefix: <code>RPGR-</code>,
            placeholder: <code>%%__LICENSE__%%</code>,
          })}
        </li>
        <li>
          {fill(c.i3, {
            files: (
              <>
                <code>config.yml</code>, <code>messages.yml</code>, <code>protections.yml</code>
              </>
            ),
            db: <code>worldforge.db</code>,
            presets: <code>presets/</code>,
            dirs: (
              <>
                <code>drafts/</code>, <code>imports/</code>, <code>exports/</code>
              </>
            ),
            lazy: (
              <>
                <code>structures/</code>, <code>backups/</code>
              </>
            ),
          })}
        </li>
        <li>{fill(c.i4, { cmd: <code>/wf diagnostics</code> })}</li>
      </ol>
      <p>{fill(c.startupBody, { startup: <code>STARTUP</code> })}</p>

      <SectionHeading id="primeros-pasos">{c.firstStepsTitle}</SectionHeading>
      <CodeBlock
        language="text"
        code={
          "/wf preset list                         presets disponibles\n" +
          "/wf world create islas void-platform    un mundo vacío con plataforma\n" +
          "/wf world inspect islas                 qué generador usa, su altura, su aparición…\n" +
          "/wf gui                                 lo mismo con menús"
        }
      />
      <p>{fill(c.mainWorldBody, { main: <strong>{c.mainWorldWord}</strong>, bukkit: <code>bukkit.yml</code> })}</p>
      <CodeBlock language="yaml" filename="bukkit.yml" code={"worlds:\n  world:\n    generator: RPGRoll-WorldForge:void-platform"} />
      <Callout tone="warning" title={c.stopTitle}>
        {fill(c.stopBody, { generator: <code>generator:</code> })}
      </Callout>

      <SectionHeading id="presets">{c.presetsTitle}</SectionHeading>
      <p>
        {fill(c.presetsBody, {
          presets: <code>presets/</code>,
          drafts: <code>drafts/</code>,
          publish: <code>/wf preset publish</code>,
          version: <strong>{c.versionWord}</strong>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thPreset}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          {c.presets.map(([id, what]) => (
            <Tr key={id}><Td className={mono}>{id}</Td><Td>{what}</Td></Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="proveedores" level={3}>{c.providersTitle}</SectionHeading>
      <p>{fill(c.providersBody, { error: <strong>{c.errorWord}</strong> })}</p>
      <Table>
        <Thead>
          <Th>{c.thProvider}</Th>
          <Th>{c.thTerrain}</Th>
          <Th>{c.thOres}</Th>
          <Th>{c.thTemplates}</Th>
          <Th>{c.thBiomes}</Th>
          <Th>{c.thVanillaStructures}</Th>
        </Thead>
        <tbody>
          {c.providers.map(([id, ...cols]) => (
            <Tr key={id}>
              <Td className={mono}>{id}</Td>
              {cols.map((v, i) => <Td key={i}>{v}</Td>)}
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="formato" level={3}>{c.formatTitle}</SectionHeading>
      <CodeBlock language="yaml" filename="presets/mi-mundo.yml" code={PRESET_YAML} />
      <Callout tone="warning">
        {fill(c.newChunksWarn, {
          only: <strong>{c.onlyNewChunks}</strong>,
          regen: <a href="#regeneracion">{c.regenLink}</a>,
        })}
      </Callout>

      <SectionHeading id="editar-exportar" level={3}>{c.editTitle}</SectionHeading>
      <ul>
        <li>
          {fill(c.e1, {
            duplicate: <code>/wf preset duplicate &lt;origen&gt; &lt;nuevo&gt;</code>,
            seed: <code>/wf preset seed &lt;borrador&gt; &lt;número&gt;</code>,
            drafts: <code>drafts/</code>,
            publish: <code>/wf preset publish &lt;borrador&gt;</code>,
          })}
        </li>
        <li>{fill(c.e2, { export: <code>/wf preset export &lt;id&gt;</code>, dir: <code>exports/</code> })}</li>
        <li>
          {fill(c.e3, {
            yml: <code>.yml</code>,
            dir: <code>imports/</code>,
            import: <code>/wf preset import &lt;archivo.yml&gt;</code>,
            always: <strong>{c.alwaysDraft}</strong>,
            config: <code>config.yml</code>,
          })}
        </li>
      </ul>

      <SectionHeading id="varios-mundos">{c.multiTitle}</SectionHeading>
      <CodeBlock
        language="text"
        code={
          "/wf world create minas nether      un Nether aparte (también: end)\n" +
          "/wf world tp minas                 ir a un mundo; /wf world tp minas Ana manda a otro jugador\n" +
          "/wf world import viejo flat        adoptar una carpeta de mundo que WorldForge no creó"
        }
      />
      <ul>
        <li>{c.m1}</li>
        <li>
          {fill(c.m2, {
            import: <code>import</code>,
            path: <code>world/dimensions/minecraft/&lt;nombre&gt;/</code>,
            levelDat: <code>level.dat</code>,
          })}
        </li>
        <li>
          {fill(c.m3, { gravity: <code>player-gravity</code>, players: <strong>{c.playersWord}</strong> })}
        </li>
        <li>
          {fill(c.m4, {
            provider: <code>provider: plugin</code>,
            bukkit: <code>bukkit.yml</code>,
            dashG: <code>-g</code>,
          })}
        </li>
      </ul>

      <SectionHeading id="plantillas">{c.templatesTitle}</SectionHeading>
      <ol>
        <li>
          {fill(c.t1, {
            cmd: <code>{'/data merge block <x> <y> <z> {LootTable:"minecraft:chests/simple_dungeon"}'}</code>,
          })}
        </li>
        <li>
          {fill(c.t2, {
            cmd: <code>{"/wf structure save <nombre> <x1> <y1> <z1> <x2> <y2> <z2> [mundo]"}</code>,
            path: <code>structures/&lt;nombre&gt;.nbt</code>,
            max: <strong>32×64×32</strong>,
          })}
        </li>
        <li>{fill(c.t3, { templates: <code>templates:</code> })}</li>
      </ol>
      <ul>
        <li>{c.tl1}</li>
        <li>{fill(c.tl2, { noOverwrite: <strong>{c.noOverwrite}</strong> })}</li>
        <li>{fill(c.tl3, { nbt: <code>.nbt</code>, dir: <code>structures/</code> })}</li>
        <li>
          {fill(c.tl4, {
            surface: <Kbd>surface</Kbd>,
            underground: <Kbd>underground</Kbd>,
            minY: <code>min-y</code>,
            maxY: <code>max-y</code>,
          })}
        </li>
        <li>{fill(c.tl5, { cmd: <code>/wf world inspect &lt;mundo&gt;</code> })}</li>
        <li>{c.tl6}</li>
      </ul>

      <SectionHeading id="dimensiones">{c.dimTitle}</SectionHeading>
      <CodeBlock language="text" code="/wf dimension create minas tall overworld" />
      <p>
        {fill(c.dimBody, {
          datapack: <code>worldforge</code>,
          onlyOnBoot: <strong>{c.onlyOnBoot}</strong>,
          world: <code>world_worldforge_minas</code>,
          cmd: <code>/execute in worldforge:minas run tp @s 0 100 0</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thHow}</Th>
          <Th>{c.thGenerator}</Th>
          <Th>{c.thGenerates}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>overworld</Td><Td>{c.dOverworld}</Td><Td className={mono}>void</Td><Td>{c.dOverworldGen}</Td></Tr>
          <Tr><Td className={mono}>caves</Td><Td>{c.dCaves}</Td><Td className={mono}>flat</Td><Td>{c.dCavesGen}</Td></Tr>
          <Tr><Td className={mono}>tall</Td><Td>{c.dTall}</Td><Td className={mono}>overworld</Td><Td>{c.dTallGen}</Td></Tr>
          <Tr><Td className={mono}>towering</Td><Td>{c.dTowering}</Td><Td className={mono}>amplified</Td><Td>{c.dToweringGen}</Td></Tr>
          <Tr><Td className={mono}>nether</Td><Td>{c.dNether}</Td><Td className={mono}>nether, end</Td><Td>{c.dNetherGen}</Td></Tr>
          <Tr>
            <Td className={mono}>end</Td>
            <Td>{c.dEnd}</Td>
            <Td className={mono}>{"terrain:<id>"}</Td>
            <Td>{fill(c.dEndGen, { terrain: <a href="#terrenos">{c.terrainLink}</a> })}</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.dimRemoveBody, {
          cmd: <code>/wf dimension remove &lt;id&gt;</code>,
          kept: <strong>{c.folderKept}</strong>,
        })}
      </p>

      <SectionHeading id="terrenos">{c.terrainsTitle}</SectionHeading>
      <p>
        {fill(c.terrainsBody, {
          shape: <strong>{c.shapeWord}</strong>,
          dir: <code>terrains/*.yml</code>,
          cmd: <code>/wf terrain list</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thStock}</Th>
          <Th>{c.thHow}</Th>
          <Th>{c.thType}</Th>
        </Thead>
        <tbody>
          {c.terrains.map(([id, what, type]) => (
            <Tr key={id}><Td className={mono}>{id}</Td><Td>{what}</Td><Td className={mono}>{type}</Td></Tr>
          ))}
        </tbody>
      </Table>
      <CodeBlock language="yaml" filename="terrains/mio.yml" code={TERRAIN_YAML} />

      <SectionHeading id="usar-terrenos" level={3}>{c.useTerrainTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thWhere}</Th>
          <Th>{c.thHowUse}</Th>
          <Th>{c.thGenerates}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td>{c.uNewDim}</Td>
            <Td>{fill(c.uNewDimHow, { cmd: <code>/wf dimension create alpes towering terrain:montanas</code> })}</Td>
            <Td>{c.uNewDimGen}</Td>
          </Tr>
          <Tr>
            <Td>{c.uMain}</Td>
            <Td>{fill(c.uMainHow, { cmd: <code>/wf terrain main montanas</code>, vanilla: <code>vanilla</code> })}</Td>
            <Td>{c.uMainGen}</Td>
          </Tr>
          <Tr>
            <Td>{c.uHot}</Td>
            <Td>{fill(c.uHotHow, { provider: <code>provider: terrain</code>, terrain: <code>terrain: montanas</code> })}</Td>
            <Td>{c.uHotGen}</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.datapackBody, {
          byDatapack: <strong>{c.byDatapack}</strong>,
          noiseRouter: <em>{c.noiseRouter}</em>,
          cmd: <code>/wf dimension create</code>,
        })}
      </p>
      <p>
        {fill(c.heightScaleBody, {
          heightScale: <code>height-scale</code>,
          hs2: <code>height-scale: 2</code>,
          hs3: <code>height-scale: 3</code>,
          offset: <code>height-offset: 96</code>,
          towering: <code>towering</code>,
        })}
      </p>
      <Callout tone="warning" title={c.mainWarnTitle}>
        {fill(c.mainWarnBody, {
          overworld: <code>minecraft:overworld</code>,
          vanilla: <code>vanilla</code>,
          overworldGen: <code>overworld</code>,
        })}
      </Callout>
      <p>
        {fill(c.engineBody, { ownEngine: <strong>{c.ownEngine}</strong>, provider: <code>provider: terrain</code> })}
      </p>
      <p>
        {fill(c.terralithBody, {
          withTerralith: <strong>{c.withTerralith}</strong>,
          overworldGen: <code>overworld</code>,
        })}
      </p>

      <SectionHeading id="regeneracion">{c.regenTitle}</SectionHeading>
      <Callout tone="danger" title={c.regenDangerTitle}>
        {c.regenDangerBody}
      </Callout>
      <ol>
        <li>
          {fill(c.r1, {
            plan: <strong>{c.planWord}</strong>,
            cmd: <code>{"/wf regen plan <mundo> radius <x> <z> <radio>"}</code>,
            area: <code>{"area <x1> <z1> <x2> <z2>"}</code>,
            all: <code>all</code>,
          })}
        </li>
        <li>
          {fill(c.r2, {
            confirm: <strong>{c.confirmWord}</strong>,
            cmd: <code>{"/wf regen confirm <trabajo> <código>"}</code>,
            setting: <code>regeneration.confirm-minutes</code>,
          })}
        </li>
        <li>{fill(c.r3, { backup: <strong>{c.backupWord}</strong>, dir: <code>backups/</code> })}</li>
        <li>
          {fill(c.r4, { exec: <strong>{c.execWord}</strong>, nextBoot: <strong>{c.nextBoot}</strong> })}
        </li>
      </ol>
      <p>{fill(c.undoBody, { cmd: <code>/wf regen restore &lt;trabajo&gt;</code> })}</p>

      <SectionHeading id="zonas-protegidas" level={3}>{c.protTitle}</SectionHeading>
      <p>
        {fill(c.protBody, {
          file: <code>plugins/RPGRoll-WorldForge/protections.yml</code>,
          cmd: <code>/wf protection add|remove|list</code>,
          setting: <code>spawn-radius-chunks</code>,
          blocked: <strong>{c.blockedWord}</strong>,
        })}
      </p>

      <SectionHeading id="recuperacion" level={3}>{c.recoveryTitle}</SectionHeading>
      <p>
        {fill(c.recoveryBody, {
          state: <code>NEEDS_RECOVERY</code>,
          info: <code>/wf regen info &lt;trabajo&gt;</code>,
          restore: <code>/wf regen restore</code>,
          accept: <code>/wf regen accept</code>,
        })}
      </p>

      <SectionHeading id="menu">{c.menuTitle}</SectionHeading>
      <p>
        {fill(c.menuBody, {
          cmd: <code>/wf gui</code>,
          worldImport: <code>world import</code>,
          worldTp: <code>world tp</code>,
        })}
      </p>

      <SectionHeading id="folia">{c.foliaTitle}</SectionHeading>
      <p>{fill(c.foliaBody, { build: <strong>{c.foliaBuild}</strong> })}</p>
      <Table>
        <Thead>
          <Th>{c.thWhatF}</Th>
          <Th>{c.thInFolia}</Th>
        </Thead>
        <tbody>
          {c.folia.map(([what, how]) => (
            <Tr key={what}><Td>{what}</Td><Td>{how}</Td></Tr>
          ))}
        </tbody>
      </Table>
      <p>{fill(c.foliaSaveBody, { saveAll: <code>save-all</code> })}</p>

      <SectionHeading id="comandos">{c.cmdTitle}</SectionHeading>
      <p>
        {fill(c.cmdIntro, { wf: <code>/wf</code>, prefix: <code>worldforge.</code> })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thPermission}</Th>
        </Thead>
        <tbody>
          {c.commands.map(([cmd, perm]) => (
            <Tr key={cmd}><Td className={mono}>{cmd}</Td><Td className={mono}>{perm}</Td></Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="permisos">{c.permTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thPermission}</Th>
          <Th>{c.thAllows}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>worldforge.admin (op)</Td><Td>{c.pAdmin}</Td></Tr>
          <Tr><Td className={mono}>worldforge.operator</Td><Td>{c.pOperator}</Td></Tr>
          <Tr><Td className={mono}>worldforge.viewer</Td><Td>{c.pViewer}</Td></Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.permLooseBody, {
          list: (
            <>
              <code>{"worldforge.worlds.{view,create,manage,teleport,teleport.others}"}</code>,{" "}
              <code>worldforge.terrain.main</code> ({c.adminOnly}),{" "}
              <code>{"worldforge.presets.{view,edit,import,export}"}</code>,{" "}
              <code>{"worldforge.generation.{validate,apply}"}</code>,{" "}
              <code>{"worldforge.regeneration.{view,plan,execute,cancel}"}</code>,{" "}
              <code>{"worldforge.protection.{view,manage}"}</code>, <code>{"worldforge.dimensions.{view,create}"}</code>,{" "}
              <code>{"worldforge.templates.{view,save}"}</code>, <code>worldforge.diagnostics</code>,{" "}
              <code>worldforge.reload</code>
            </>
          ),
        })}
      </p>

      <SectionHeading id="limites">{c.limitsTitle}</SectionHeading>
      <ul>
        <li>{fill(c.l1, { newChunks: <strong>{c.newChunksWord}</strong> })}</li>
        <li>{c.l2}</li>
        <li>{c.l3}</li>
        <li>{fill(c.l4, { rarity: <code>rarity</code> })}</li>
        <li>{fill(c.l5, { locate: <code>/locate</code> })}</li>
        <li>{c.l6}</li>
        <li>{c.l7}</li>
        <li>{c.l8}</li>
      </ul>
      <Callout tone="info" title={c.untestedTitle}>
        {fill(c.untestedBody, {
          provider: <code>provider: plugin</code>,
          terrainMain: <code>terrain main</code>,
          hybrid: <code>hybrid</code>,
        })}
      </Callout>

      <SectionHeading id="problemas">{c.troublesTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thSymptom}</Th>
          <Th>{c.thLook}</Th>
        </Thead>
        <tbody>
          {c.troubles.map(([sym, fix]) => (
            <Tr key={sym}><Td>{sym}</Td><Td>{fix}</Td></Tr>
          ))}
        </tbody>
      </Table>

      <PrevNext current="worldforge" onNavigate={onNavigate} />
    </>
  );
}
