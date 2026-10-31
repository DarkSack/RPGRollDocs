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
import { useI18n, fill } from "../i18n";
import { SACKRESOURCEPACK_COPY } from "./copy/sackresourcepack";

const mono = "font-mono text-xs";

export function SackResourcePack({
  onNavigate,
}: {
  onNavigate: (slug: string) => void;
}) {
  const { locale } = useI18n();
  const c = SACKRESOURCEPACK_COPY[locale];

  return (
    <>
      <PageHeader title={c.title}>{c.intro}</PageHeader>

      <Callout tone="info" title={c.standaloneTitle}>
        {fill(c.standaloneBody, {
          pluginYml: <code>plugin.yml</code>,
          depend: <code>depend</code>,
          softdepend: <code>softdepend</code>,
          compileOnly: <code>compileOnly(paper-api)</code>,
          any: <strong>{c.anyWord}</strong>,
          fx: (
            <a href="/rpgroll-particles" className="text-violet-600 underline dark:text-violet-400">
              RPGRoll-FX
            </a>
          ),
        })}
      </Callout>

      <SectionHeading id="modulos-de-contenido">{c.modulesTitle}</SectionHeading>
      <p>
        {fill(c.modulesBody, {
          dir: <code>content/&lt;id&gt;/</code>,
          packYml: <code>pack.yml</code>,
          assets: <code>assets/&lt;namespace&gt;/...</code>,
          mcmeta: <code>pack.mcmeta</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="content/rpgroll_fishing/pack.yml"
        code={
          "id: rpgroll_fishing\n" +
          'name: "RPGRoll-Fishing"\n' +
          "version: 1.0.0\n" +
          "author: Sack\n" +
          "namespace: rpgroll_fishing\n" +
          "priority: 0\n" +
          "depends: []\n" +
          "optional: [rpgroll_core_textures]\n" +
          'description: "Modelos e íconos de especies, cañas y carnadas."\n'
        }
      />
      <Table>
        <Thead>
          <Th>{c.thField}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>priority</Td><Td>{c.fPriority}</Td></Tr>
          <Tr><Td className={mono}>depends</Td><Td>{c.fDepends}</Td></Tr>
          <Tr><Td className={mono}>optional</Td><Td>{c.fOptional}</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="tip" title={c.refTitle}>
        {fill(c.refBody, {
          path: <code>sackresourcepack/src/main/resources/content/reference_full_example/pack.yml</code>,
          content: <code>content/</code>,
        })}
      </Callout>

      <SectionHeading id="resolucion">{c.resolTitle}</SectionHeading>
      <p>
        {fill(c.resolBody, {
          priority: <code>priority</code>,
          id: <code>id</code>,
          not: <strong>{c.notWord}</strong>,
        })}
      </p>

      <SectionHeading id="fusion">{c.mergeTitle}</SectionHeading>
      <p>
        {fill(c.mergeBody, {
          ogg: <code>.ogg</code>,
          conflicts: <Kbd>/srp conflicts</Kbd>,
          really: <strong>{c.reallyMerge}</strong>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thFile}</Th>
          <Th>{c.thStrategy}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>sounds.json</Td><Td>{c.mSounds}</Td></Tr>
          <Tr><Td className={mono}>lang/*.json</Td><Td>{c.mLang}</Td></Tr>
          <Tr>
            <Td className={mono}>font/*.json</Td>
            <Td>{fill(c.mFont, { providers: <code>providers</code> })}</Td>
          </Tr>
        </tbody>
      </Table>
      <Callout tone="tip" title={c.mcmetaTitle}>
        {fill(c.mcmetaBody, { mcmeta: <code>pack.mcmeta</code> })}
      </Callout>

      <SectionHeading id="custom-model-data">{c.cmdDataTitle}</SectionHeading>
      <p>
        {fill(c.cmdDataBody, {
          key: <code>rpgroll_fishing:fish_salmon</code>,
          cmd: <code>CustomModelData</code>,
          registry: <code>cmd-registry.yml</code>,
          never: <strong>{c.neverReassign}</strong>,
        })}
      </p>

      <SectionHeading id="validacion">{c.valTitle}</SectionHeading>
      <p>{fill(c.valBody, { error: <code>ERROR</code> })}</p>
      <Table>
        <Thead>
          <Th>{c.thCheck}</Th>
          <Th>{c.thSeverity}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td>{fill(c.v1, { imageio: <code>ImageIO</code> })}</Td>
            <Td><Badge tone="red">ERROR</Badge></Td>
          </Tr>
          <Tr>
            <Td>{c.v2}</Td>
            <Td><Badge tone="red">ERROR</Badge></Td>
          </Tr>
          <Tr>
            <Td>{fill(c.v3, { parent: <code>parent</code> })}</Td>
            <Td><Badge tone="amber">WARNING</Badge></Td>
          </Tr>
          <Tr>
            <Td>{fill(c.v4, { soundsJson: <code>sounds.json</code>, ogg: <code>.ogg</code> })}</Td>
            <Td><Badge tone="amber">WARNING</Badge></Td>
          </Tr>
          <Tr>
            <Td>{c.v5}</Td>
            <Td><Badge tone="amber">WARNING</Badge></Td>
          </Tr>
          <Tr>
            <Td>{c.v6}</Td>
            <Td><Badge tone="amber">WARNING</Badge></Td>
          </Tr>
        </tbody>
      </Table>
      <p>{fill(c.valSkipBody, { ns: <code>minecraft:</code>, colon: <code>:</code> })}</p>

      <SectionHeading id="build-cache">{c.buildTitle}</SectionHeading>
      <p>{fill(c.buildBody, { whole: <strong>{c.wholeCache}</strong> })}</p>
      <p>
        {fill(c.buildEventsBody, {
          buildEvent: <Kbd>PackBuildEvent</Kbd>,
          genEvent: <Kbd>PackGeneratedEvent</Kbd>,
        })}
      </p>

      <SectionHeading id="distribucion">{c.distTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thMechanism}</Th>
          <Th>{c.thHowWorks}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td>{c.d1}</Td>
            <Td>{fill(c.d1Body, { httpServer: <code>com.sun.net.httpserver.HttpServer</code> })}</Td>
          </Tr>
          <Tr><Td>{c.d2}</Td><Td>{c.d2Body}</Td></Tr>
          <Tr><Td>{c.d3}</Td><Td>{c.d3Body}</Td></Tr>
          <Tr>
            <Td>{c.d4}</Td>
            <Td>{fill(c.d4Body, { api: <code>Player#setResourcePack(url, sha1, prompt, required)</code> })}</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        {fill(c.modeBody, {
          mode: <code>remote-upload.mode</code>,
          generic: <code>generic</code>,
          s3: <code>s3</code>,
          s3b: <code>s3</code>,
          settings: <code>S3UploadSettings</code>,
          virtual: <code>bucket.endpoint/key</code>,
          pathStyle: <code>endpoint/bucket/key</code>,
        })}
      </p>
      <CodeBlock
        language="java"
        filename={c.sigFile}
        code={
          "// canonical request → string-to-sign → clave de firma derivada por HMAC en cadena → firma\n" +
          'SignedRequest signed = signer.sign("PUT", host, canonicalUri, bytes,\n' +
          '        settings.accessKey(), settings.secretKey(), settings.region(), "s3");\n' +
          "// Authorization: AWS4-HMAC-SHA256 Credential=..., SignedHeaders=..., Signature=...\n"
        }
      />
      <Callout tone="warning" title={c.sigWarnTitle}>
        {fill(c.sigWarnBody, {
          cls: <code>AwsSignatureV4</code>,
          jdk: (
            <>
              <code>javax.crypto</code>/<code>java.security</code>
            </>
          ),
        })}
      </Callout>
      <p>{fill(c.publicUrlBody, { key: <code>http.public-url</code> })}</p>

      <SectionHeading id="datapack">{c.dpTitle}</SectionHeading>
      <p>
        {fill(c.dpBody, {
          assets: <code>assets/</code>,
          dataDir: <code>data/&lt;namespace&gt;/...</code>,
          dpEngine: <code>DatapackMergeEngine</code>,
          mergeEngine: <code>MergeEngine</code>,
          tags: <code>tags/</code>,
          values: <code>values</code>,
        })}
      </p>
      <Callout tone="info" title={c.dpInfoTitle}>
        {fill(c.dpInfoBody, {
          setRP: <code>Player#setResourcePack</code>,
          path: <code>&lt;mundo primario&gt;/datapacks/&lt;nombre&gt;/</code>,
          buildEngine: <code>DatapackBuildEngine</code>,
        })}
      </Callout>
      <p>
        {fill(c.dpApplyBody, {
          build: <Kbd>/srp datapack build</Kbd>,
          dataDir: <code>data/</code>,
          datapacks: <code>datapacks/</code>,
          reload: <Kbd>/srp datapack reload</Kbd>,
          reloadData: <code>Server#reloadData()</code>,
          slashReload: <code>/reload</code>,
          enabled: <code>datapack.enabled: false</code>,
          packFormat: <code>datapack.pack-format</code>,
          packFormat2: <code>pack-format</code>,
          packFormatWord: <code>pack_format</code>,
        })}
      </p>

      <SectionHeading id="packs-externos">{c.extTitle}</SectionHeading>
      <p>
        {fill(c.extBody, {
          content: <code>content/</code>,
          externalPacks: <code>external-packs</code>,
          plugins: <code>plugins/</code>,
          assets: <code>assets/</code>,
          exclude: <code>exclude</code>,
          assets2: <code>assets/</code>,
        })}
      </p>
      <CodeBlock
        language="yaml"
        filename="plugins/SackResourcePack/config.yml"
        code={
          "external-packs:\n" +
          "  - path: FreeMinecraftModels/output/FreeMinecraftModels\n" +
          "    id: freeminecraftmodels\n" +
          "    namespace: freeminecraftmodels\n" +
          "    priority: 20\n" +
          "    exclude:\n" +
          "      - freeminecraftmodels/rspm_bedrock_pack/   # su pack de Bedrock, no va en el de Java\n"
        }
      />
      <p>
        {fill(c.extFmmBody, {
          softdepend: <code>softdepend: [FreeMinecraftModels]</code>,
          fmmReload: <Kbd>/fmm reload</Kbd>,
          srpRebuild: <Kbd>/srp rebuild</Kbd>,
        })}
      </p>

      <SectionHeading id="modo-desarrollo">{c.devTitle}</SectionHeading>
      <p>
        {fill(c.devBody, {
          watch: <code>WatchService</code>,
          content: <code>content/</code>,
          dev: <Kbd>/srp dev</Kbd>,
        })}
      </p>

      <SectionHeading id="assets-api">{c.apiTitle}</SectionHeading>
      <p>{fill(c.apiBody, { content: <code>content/</code> })}</p>
      <CodeBlock
        language="java"
        filename="MiPlugin.java"
        code={
          "public class MiPlugin extends JavaPlugin {\n" +
          "    @Override\n" +
          "    public void onEnable() {\n" +
          "        // Copia el resourcepack/ embebido en el jar de MiPlugin (pack.yml + assets/)\n" +
          "        // hacia content/miplugin/ — idempotente, solo re-copia lo que cambió.\n" +
          "        AssetsAPI.assets().registerPlugin(this);\n" +
          "\n" +
          "        // O registro directo, archivo por archivo:\n" +
          '        AssetsAPI.models().register("miplugin", "miplugin", "item/espada.json", modeloBytes);\n' +
          '        AssetsAPI.textures().register("miplugin", "miplugin", "item/espada.png", texturaBytes);\n' +
          "    }\n" +
          "}\n"
        }
      />
      <p>
        {fill(c.apiConvergeBody, {
          registerPlugin: <code>registerPlugin</code>,
          packYml: <code>pack.yml</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thRegister}</Th>
          <Th>{c.thDest}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className={mono}>models() / textures() / sounds() / particles()</Td>
            <Td>
              <code>models/</code>, <code>textures/</code>, <code>sounds/</code>, <code>particles/</code>
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>fonts() / languages()</Td>
            <Td>
              <code>font/</code>, <code>lang/</code>
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>music()</Td>
            <Td>{fill(c.rMusic, { dir: <code>sounds/music/</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>gui()</Td>
            <Td>{fill(c.rGui, { dir: <code>textures/gui/</code> })}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>
        {fill(c.guiBody, {
          gui: <code>InventoryGUI</code>,
          listener: <code>GUIListener</code>,
          noImport: <strong>{c.noImportWord}</strong>,
          srp: <Kbd>/srp</Kbd>,
        })}
      </p>
      <p>
        {fill(c.guiPngBody, {
          png: <code>.png</code>,
          assetsCtx: <code>/assets/</code>,
          skullFromUrl: <code>ItemBuilder.skullFromUrl(...)</code>,
          profile: <code>PlayerProfile</code>,
          skull: <code>ItemBuilder.skull(...)</code>,
        })}
      </p>
      <Callout tone="warning" title={c.previewWarnTitle}>
        {fill(c.previewWarnBody, { publicUrl: <code>http.public-url</code> })}
      </Callout>

      <SectionHeading id="comandos">{c.cmdsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>/srp</Td><Td>{c.c1}</Td></Tr>
          <Tr><Td className={mono}>/srp reload</Td><Td>{c.c2}</Td></Tr>
          <Tr><Td className={mono}>/srp rebuild</Td><Td>{c.c3}</Td></Tr>
          <Tr><Td className={mono}>/srp validate</Td><Td>{c.c4}</Td></Tr>
          <Tr><Td className={mono}>/srp publish</Td><Td>{c.c5}</Td></Tr>
          <Tr><Td className={mono}>/srp status</Td><Td>{c.c6}</Td></Tr>
          <Tr><Td className={mono}>/srp content</Td><Td>{c.c7}</Td></Tr>
          <Tr><Td className={mono}>/srp conflicts</Td><Td>{c.c8}</Td></Tr>
          <Tr><Td className={mono}>{"/srp models|textures|sounds|fonts"}</Td><Td>{c.c9}</Td></Tr>
          <Tr><Td className={mono}>/srp cache</Td><Td>{c.c10}</Td></Tr>
          <Tr><Td className={mono}>/srp dev</Td><Td>{c.c11}</Td></Tr>
          <Tr>
            <Td className={mono}>/srp datapack build</Td>
            <Td>
              {fill(c.c12, {
                dataDir: <code>data/</code>,
                datapacks: <code>datapacks/</code>,
                enabled: <code>datapack.enabled: true</code>,
              })}
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>/srp datapack reload</Td>
            <Td>{fill(c.c13, { reloadData: <code>Server#reloadData()</code> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>/srp gui</Td>
            <Td>{fill(c.c14, { srp: <code>/srp</code> })}</Td>
          </Tr>
        </tbody>
      </Table>
      <p>{fill(c.permBody, { perm: <Badge tone="amber">sackresourcepack.admin.*</Badge> })}</p>
      <PrevNext current="sackresourcepack" onNavigate={onNavigate} />
    </>
  );
}
