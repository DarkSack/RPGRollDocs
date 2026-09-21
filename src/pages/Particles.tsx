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
import { pageTitle } from "../content/nav";
import { useI18n, fill, localizedPageLabel } from "../i18n";
import { ADDONS_B_COPY, type AddonsBCopy } from "./copy/addonsB";

type FxCopy = AddonsBCopy["fx"];

const effectFields = (c: FxCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: "nuevo_efecto", placeholder: "level_up" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&6¡Subida de nivel!" },
  { key: "description", label: c.fDescription, type: "string" },
];

export function Particles({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = ADDONS_B_COPY[locale].fx;

  const shapes: [string, string, string][] = [
    ["POINT", "—", c.shPoint],
    ["CIRCLE", "radius, points", c.shCircle],
    ["SPHERE", "radius, points", c.shSphere],
    ["LINE", c.pFromTo, c.shLine],
    ["HELIX", "radius, height, turns, points", c.shHelix],
    ["CONE", "radius, length, points", c.shCone],
    ["CUBE_OUTLINE", c.pHalfSide, c.shCube],
    ["BURST", "radius, points", c.shBurst],
  ];

  const commands: [string, string][] = [
    ["/rpgfx browser", c.cBrowser],
    ["/rpgfx reload", c.cReload],
    ["/rpgfx test <id> [jugador]", c.cTest],
  ];

  return (
    <>
      <PageHeader title={c.title} slug="rpgroll-particles">
        {c.intro}
      </PageHeader>

      <Callout tone="info" title={c.confuseTitle}>
        {fill(c.confuseBody1, { render: <strong>{c.confuseRender}</strong> })}{" "}
        <button type="button" className="underline" onClick={() => onNavigate("rpgroll-effects")}>
          {localizedPageLabel("rpgroll-effects", pageTitle("rpgroll-effects"), locale)}
        </button>
        {c.confuseBody2}
      </Callout>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll]"} />
      <p>{fill(c.reqBody, { cm: <code>ContentManager</code> })}</p>

      <SectionHeading id="modelo">{c.modelTitle}</SectionHeading>
      <p>
        {fill(c.modelBody, {
          def: <code>EffectDefinition</code>,
          step: <code>EffectStep</code>,
          type: <code>type</code>,
          delay: <code>delay</code>,
          engine: <code>EffectEngine</code>,
          scheduler: <code>Bukkit.getScheduler().runTaskLater</code>,
        })}
      </p>

      <SectionHeading id="tipos-de-paso">{c.stepsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thType}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">PARTICLE</Td>
            <Td>{fill(c.sParticle, { particle: <code>Particle</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">SOUND</Td>
            <Td>{fill(c.sSound, { sound: <code>Sound</code>, target: <code>target</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">TITLE</Td>
            <Td>{c.sTitle}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">ACTIONBAR</Td>
            <Td>{c.sActionbar}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">BOSSBAR</Td>
            <Td>{c.sBossbar}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">POTION</Td>
            <Td>{fill(c.sPotion, { potion: <code>PotionEffect</code> })}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="formas">{c.shapesTitle}</SectionHeading>
      <p>
        {fill(c.shapesBody, {
          shape: <code>shape</code>,
          particle: <code>PARTICLE</code>,
          shapes: <code>ParticleShapes</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thShape}</Th>
          <Th>{c.thParams}</Th>
          <Th>{c.thDescription}</Th>
        </Thead>
        <tbody>
          {shapes.map(([shape, params, desc]) => (
            <Tr key={shape}>
              <Td className="font-mono text-xs">{shape}</Td>
              <Td className="font-mono text-xs">{params}</Td>
              <Td>{desc}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="targets">{c.targetsTitle}</SectionHeading>
      <p>{fill(c.targetsBody, { target: <code>EffectTarget</code>, context: <code>EffectContext</code> })}</p>
      <Table>
        <Thead>
          <Th>{c.thTarget}</Th>
          <Th>{c.thResolves}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">SELF</Td>
            <Td>{fill(c.tSelf, { caster: <code>caster</code> })}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">TARGET</Td>
            <Td>{c.tTarget}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">LOCATION</Td>
            <Td>{c.tLocation}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">ALL_NEARBY</Td>
            <Td>{fill(c.tNearby, { radius: <code>radius</code>, around: <code>around</code> })}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="formato-yaml">{c.yamlTitle}</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="effects/level_up.yml"
        code={
          "id: level_up\n" +
          'display-name: "&6¡Subida de nivel!"\n' +
          "\n" +
          "steps:\n" +
          "  - type: PARTICLE\n" +
          "    delay: 0\n" +
          "    particle: TOTEM_OF_UNDYING\n" +
          "    shape: SPHERE\n" +
          "    target: SELF\n" +
          "    radius: 1.2\n" +
          "    points: 60\n" +
          "\n" +
          "  - type: SOUND\n" +
          "    delay: 0\n" +
          "    sound: ENTITY_PLAYER_LEVELUP\n" +
          "    target: SELF\n" +
          "    volume: 1.0\n" +
          "    pitch: 1.0\n" +
          "\n" +
          "  - type: TITLE\n" +
          "    delay: 2\n" +
          '    title: "&6&l¡NIVEL SUPERIOR!"\n' +
          "    target: SELF\n" +
          "    fade-in: 5\n" +
          "    stay: 40\n" +
          "    fade-out: 10\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="effects/frost_nova.yml"
        code={
          "id: frost_nova\n" +
          'display-name: "&b&lNova de Escarcha"\n' +
          "\n" +
          "steps:\n" +
          "  - type: PARTICLE\n" +
          "    delay: 0\n" +
          "    particle: SNOWFLAKE\n" +
          "    shape: CIRCLE\n" +
          "    target: SELF\n" +
          "    radius: 0.5\n" +
          "    points: 30\n" +
          "\n" +
          "  - type: BOSSBAR\n" +
          "    delay: 3\n" +
          '    title: "&b❄ Nova de Escarcha"\n' +
          "    color: AQUA\n" +
          "    duration: 60\n" +
          "    target: ALL_NEARBY\n" +
          "    around: SELF\n" +
          "    radius: 6\n" +
          "\n" +
          "  - type: POTION\n" +
          "    delay: 3\n" +
          "    potion: SLOWNESS\n" +
          "    duration: 60\n" +
          "    amplifier: 1\n" +
          "    target: ALL_NEARBY\n" +
          "    around: SELF\n" +
          "    radius: 6\n"
        }
      />
      <Callout tone="tip">
        <code>effects/reference_full.yml</code>{" "}
        {fill(c.refBody, {
          shapes: (
            <>
              <code>LINE</code>, <code>HELIX</code>, <code>CONE</code>, <code>CUBE_OUTLINE</code>
            </>
          ),
          target: <code>TARGET</code>,
        })}
      </Callout>

      <YamlBuilder title={c.builderTitle} description={c.builderDesc} folder="effects" fields={effectFields(c)} />

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>
        {fill(c.guiBody, {
          browser: <Kbd>/rpgfx browser</Kbd>,
          syntax: <code>{"TIPO delay clave=valor,clave2=valor2"}</code>,
        })}
      </p>
      <CodeBlock
        language="text"
        code={
          "PARTICLE 0 particle=FLAME,shape=SPHERE,radius=1.5,points=40\nSOUND 5 sound=ENTITY_BLAZE_SHOOT,volume=1,pitch=1.2"
        }
      />
      <p>{c.guiAfter}</p>

      <SectionHeading id="api">{c.apiTitle}</SectionHeading>
      <p>{fill(c.apiBody, { soft: <Kbd>softdepend: [RPGRoll-FX]</Kbd> })}</p>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={"if (RPGRollFXAPI.isReady()) {\n" + '    RPGRollFXAPI.get().play("level_up", player);\n' + "}\n"}
      />
      <p>{fill(c.apiBuilder, { builder: <code>EffectBuilder</code> })}</p>
      <CodeBlock
        language="java"
        code={
          "RPGRollFXAPI.get().builder()\n" +
          '    .particle(Particle.FLAME).shape("SPHERE").radius(1.5).points(40)\n' +
          "    .then().sound(Sound.ENTITY_BLAZE_SHOOT).volume(1).pitch(1.2)\n" +
          "    .play(caster);\n"
        }
      />

      <SectionHeading id="comandos">{c.cmdTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          {commands.map(([cmd, what]) => (
            <Tr key={cmd}>
              <Td className="font-mono text-xs">{cmd}</Td>
              <Td>{what}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>{fill(c.cmdNote, { perm: <Badge tone="amber">rpgrollfx.admin.*</Badge> })}</p>

      <PrevNext current="rpgroll-particles" onNavigate={onNavigate} />
    </>
  );
}
