import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";

export function Api({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="API para addons">
        Punto de entrada único: <code>RPGRollAPI.get()</code>. Superficie estable: paquete{" "}
        <code>com.sack.rpgroll.api</code> y <code>com.sack.rpgroll.api.event</code>.
      </PageHeader>

      <SectionHeading id="setup">Configurar tu addon</SectionHeading>
      <ol>
        <li>
          Declará <code>depend: [RPGRoll]</code> en tu <code>plugin.yml</code>, para garantizar que RPGRoll cargue
          antes que tu addon.
        </li>
        <li>
          Agregá RPGRoll como dependencia <code>compileOnly</code> (vía <code>./gradlew publishToMavenLocal</code>{" "}
          desde el proyecto de RPGRoll, o referenciando el jar compilado directamente).
        </li>
        <li>
          Llamá <code>RPGRollAPI.get()</code> únicamente desde <code>onEnable()</code> en adelante — nunca desde el
          constructor de tu plugin ni desde inicializadores estáticos, porque RPGRoll podría no estar listo
          todavía.
        </li>
      </ol>

      <CodeBlock
        language="java"
        filename="MiAddon.java"
        code={
          "public class MiAddon extends JavaPlugin {\n" +
          "    @Override\n" +
          "    public void onEnable() {\n" +
          "        RPGRollAPI api = RPGRollAPI.get();\n" +
          "        getServer().getPluginManager().registerEvents(new MiListener(api), this);\n" +
          "    }\n" +
          "}\n"
        }
      />

      <Callout tone="warning" title="get() lanza una excepción si RPGRoll no está listo">
        <code>RPGRollAPI.get()</code> lanza <code>IllegalStateException</code> si se llama antes de que RPGRoll
        termine de arrancar. Si tu addon quiere integrarse de forma opcional (sin <code>depend</code> obligatorio),
        usá <code>RPGRollAPI.isReady()</code> para chequear en runtime antes de llamar a <code>get()</code>.
      </Callout>

      <SectionHeading id="metodos">Métodos disponibles</SectionHeading>
      <Table>
        <Thead>
          <Th>Método</Th>
          <Th>Devuelve</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">getPlayer(UUID uuid)</Td><Td>Optional&lt;RPGPlayer&gt;</Td></Tr>
          <Tr><Td className="font-mono text-xs">hasCompletedCharacter(UUID uuid)</Td><Td>boolean — atajo sobre getPlayer().isCharacterComplete()</Td></Tr>
          <Tr><Td className="font-mono text-xs">getPlayerManager()</Td><Td>PlayerManager</Td></Tr>
          <Tr><Td className="font-mono text-xs">getRaceManager()</Td><Td>RaceManager (interfaz pública, módulo api)</Td></Tr>
          <Tr><Td className="font-mono text-xs">getClassManager()</Td><Td>ClassManager (interfaz pública, módulo api)</Td></Tr>
          <Tr><Td className="font-mono text-xs">getSkillManager()</Td><Td>SkillManager</Td></Tr>
          <Tr><Td className="font-mono text-xs">getTraitManager()</Td><Td>TraitManager</Td></Tr>
          <Tr><Td className="font-mono text-xs">getJobManager()</Td><Td>JobManager</Td></Tr>
          <Tr><Td className="font-mono text-xs">getEconomyProvider()</Td><Td>VaultEconomyProvider</Td></Tr>
          <Tr><Td className="font-mono text-xs">getVersion()</Td><Td>String — versión del plugin</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="info">
        <code>RPGPlayer</code>, <code>PlayerManager</code>, <code>JobManager</code>, <code>SkillManager</code> y{" "}
        <code>TraitManager</code> son clases concretas del módulo <code>core</code> (no tienen todavía una interfaz
        propia en <code>api</code>, a diferencia de <code>RaceManager</code>/<code>ClassManager</code>). Tu addon
        va a necesitar depender del jar completo de RPGRoll para usarlas, no solo del módulo <code>api</code>.
      </Callout>

      <SectionHeading id="eventos">Eventos</SectionHeading>
      <Table>
        <Thead>
          <Th>Evento</Th>
          <Th>Cancelable</Th>
          <Th>Se dispara cuando…</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">CharacterCreatedEvent</Td><Td>No</Td><Td>Un jugador termina la creación de personaje (raza + clase elegidas y guardadas).</Td></Tr>
          <Tr><Td className="font-mono text-xs">PlayerLevelUpEvent</Td><Td>No</Td><Td>Un jugador sube de nivel de personaje. Expone el <code>RPGPlayer</code> completo ya actualizado.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PlayerJobLevelUpEvent</Td><Td>No</Td><Td>Un jugador sube de nivel en un trabajo específico.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PlayerJoinJobEvent</Td><Td><strong>Sí</strong></Td><Td>Un jugador intenta unirse a un trabajo — un addon puede cancelarlo (ej. requisito extra que RPGRoll no conoce).</Td></Tr>
          <Tr><Td className="font-mono text-xs">PlayerLeaveJobEvent</Td><Td>No</Td><Td>Un jugador abandona un trabajo.</Td></Tr>
        </tbody>
      </Table>

      <CodeBlock
        language="java"
        filename="MiListener.java — ejemplo cancelando un join a trabajo"
        code={
          "public class MiListener implements Listener {\n\n" +
          "    @EventHandler\n" +
          "    public void onJoinJob(PlayerJoinJobEvent event) {\n" +
          "        if (event.getRpgPlayer().getLevel() < 10) {\n" +
          "            event.setCancelled(true);\n" +
          '            event.getPlayer().sendMessage("Necesitás nivel 10 para este trabajo.");\n' +
          "        }\n" +
          "    }\n\n" +
          "    @EventHandler\n" +
          "    public void onLevelUp(PlayerLevelUpEvent event) {\n" +
          '        Bukkit.broadcastMessage(event.getPlayer().getName() + " alcanzó el nivel " + event.getNewLevel() + "!");\n' +
          "    }\n" +
          "}\n"
        }
      />

      <SectionHeading id="donde-viven">Dónde viven estos archivos, físicamente</SectionHeading>
      <p>
        <code>Race</code>, <code>PlayerClass</code>, <code>RaceManager</code>, <code>ClassManager</code>,{" "}
        <code>StatType</code> y dos de los eventos (<code>CharacterCreatedEvent</code>,{" "}
        <code>PlayerJobLevelUpEvent</code>) viven en el módulo <code>api</code>, sin ninguna dependencia de{" "}
        <code>core</code>. <code>RPGRollAPI</code> y los 3 eventos que exponen <code>RPGPlayer</code> viven
        físicamente en <code>core</code> (para poder usar sus clases concretas), pero conservan el paquete{" "}
        <code>com.sack.rpgroll.api</code> para que el código de tu addon no note la diferencia. Más detalle en{" "}
        <button className="underline" onClick={() => onNavigate("arquitectura")}>
          Arquitectura
        </button>
        .
      </p>

      <PrevNext current="api" onNavigate={onNavigate} />
    </>
  );
}
