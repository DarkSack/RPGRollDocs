import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, Badge, PrevNext } from "../components/ui";
import { placeholders } from "../content/placeholders";
import { useI18n, fill, localizedPlaceholder, localizedCaveatTitle, localizedCaveatBody } from "../i18n";
import { CORE_COPY } from "./copy/core";

export function PlayerSystem({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = CORE_COPY[locale].players;

  // La tabla de placeholders de esta página es la expansión `rpgroll`, que ya
  // está traducida en el registro central — se lee de ahí en vez de duplicarla.
  const corePlaceholders = placeholders.filter((p) => p.expansion === "rpgroll");

  const caveatTitle = "Rendimiento: no todo se guarda a la BD";
  const caveatBody =
    "Las actualizaciones de combate (daño recibido, regeneración pasiva, maná gastado al usar una skill) solo se escriben en PlayerCache, no disparan un UPDATE a SQLite en cada golpe — eso sería un cuello de botella real en el hilo principal del servidor. La persistencia real ocurre al desconectarse (unloadPlayer) o al apagar el servidor (saveAll). Si el servidor crashea sin apagarse limpiamente, se puede perder el progreso de combate desde la última acción “normal” guardada (level up, cambio de raza/clase, etc).";

  return (
    <>
      <PageHeader title={c.title} slug="jugadores">
        {fill(c.intro, { rpgPlayer: <code>RPGPlayer</code> })}
      </PageHeader>

      <SectionHeading id="rpgplayer">RPGPlayer</SectionHeading>
      <p>
        {fill(c.immutableLead, {
          rpgPlayer: <code>RPGPlayer</code>,
          methods: (
            <>
              <code>setRace</code>, <code>addExperience</code>, <code>learnSkill</code>,{" "}
              <code>updateCombatStats</code>…
            </>
          ),
          newInstance: <strong>{c.newInstance}</strong>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thComponent}</Th>
          <Th>{c.thContains}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">PlayerIdentity</Td>
            <Td>{c.identity}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">PlayerStats</Td>
            <Td>{c.stats}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">PlayerProgression</Td>
            <Td>{c.progression}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">PlayerSkills</Td>
            <Td>{c.skills}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">PlayerTraits</Td>
            <Td>{c.traits}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">CombatStats</Td>
            <Td>{c.combat}</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">PlayerJobs</Td>
            <Td>{c.jobs}</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="playermanager">{c.managerTitle}</SectionHeading>
      <p>{c.managerLead}</p>
      <ul>
        <li>
          <strong>PlayerCache</strong> — {fill(c.cacheItem, { map: <code>ConcurrentHashMap</code> })}
        </li>
        <li>
          <strong>PlayerRepository</strong> —{" "}
          {fill(c.repoItem, {
            methods: (
              <>
                <code>save</code>/<code>update</code>/<code>findByUUID</code>
              </>
            ),
          })}
        </li>
      </ul>

      <CodeBlock
        language="text"
        filename={c.flowFile}
        code={`1. ${c.flow1}\n2. ${c.flow2}\n3. ${c.flow3}`}
      />

      <Callout tone="warning" title={localizedCaveatTitle("jugadores", caveatTitle, locale)}>
        {localizedCaveatBody("jugadores", caveatTitle, caveatBody, locale)}
      </Callout>

      <SectionHeading id="ciclo-de-vida">{c.lifecycleTitle}</SectionHeading>
      <p>{fill(c.lifecycleLead, { listener: <code>PlayerEventListener</code> })}</p>
      <ol>
        <li>
          {fill(c.life1, {
            event: <code>PlayerJoinEvent</code>,
            call: <code>playerManager.loadOrCreate(player)</code>,
          })}
        </li>
        <li>{c.life2}</li>
        <li>{fill(c.life3, { event: <code>PlayerQuitEvent</code> })}</li>
      </ol>

      <SectionHeading id="identidad-completa">{c.completeTitle}</SectionHeading>
      <p>
        {fill(c.completeBody, {
          method: <code>RPGPlayer.isCharacterComplete()</code>,
          identity: <code>PlayerIdentity</code>,
          and: <strong>{c.and}</strong>,
          create: <code>/rpg create</code>,
        })}
      </p>

      <SectionHeading id="placeholders">{c.phTitle}</SectionHeading>
      <p>
        {fill(c.phLead, {
          papi: <code>PlaceholderAPI</code>,
          badge: <Badge tone="violet">rpgroll</Badge>,
          rpgPlayer: <code>RPGPlayer</code>,
          dash: <code>-</code>,
        })}
      </p>
      <Table>
        <Thead>
          <Th>{c.thPlaceholder}</Th>
          <Th>{c.thValue}</Th>
        </Thead>
        <tbody>
          {corePlaceholders.map((p) => (
            <Tr key={p.name}>
              <Td className="font-mono text-xs">{p.name}</Td>
              <Td>{localizedPlaceholder(p.name, p.description, locale)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <PrevNext current="jugadores" onNavigate={onNavigate} />
    </>
  );
}
