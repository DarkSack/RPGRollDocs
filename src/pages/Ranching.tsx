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

const speciesFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_especie", placeholder: "cow" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&fVaca" },
  { key: "icon", label: "Ícono (Material)", type: "string", default: "COW_SPAWN_EGG" },
  { key: "description", label: "Descripción", type: "string" },
  { key: "entity-type", label: "EntityType vanilla", type: "string", default: "COW", help: "COW, CHICKEN, SHEEP, PIG, HORSE..." },
  { key: "product-types", label: "Tipos de producto", type: "list", placeholder: "milk, meat, leather" },
  { key: "base-weight-min", label: "Peso mín. (kg)", type: "number", default: "100" },
  { key: "base-weight-max", label: "Peso máx. (kg)", type: "number", default: "300" },
  { key: "baby-stage-duration-ticks", label: "Duración cría (ticks)", type: "number", default: "6000" },
  { key: "juvenile-stage-duration-ticks", label: "Duración juvenil (ticks)", type: "number", default: "12000" },
  { key: "elder-threshold-ticks", label: "Umbral anciano (ticks)", type: "number", default: "240000" },
  { key: "gestation-duration-ticks", label: "Gestación (ticks, 0 = nace directo)", type: "number", default: "24000" },
  { key: "min-litter-size", label: "Camada mín.", type: "number", default: "1" },
  { key: "max-litter-size", label: "Camada máx.", type: "number", default: "1" },
  { key: "base-fertility", label: "Fertilidad base (0-1)", type: "number", default: "0.5" },
  { key: "diet-tags", label: "Tags de dieta", type: "list", placeholder: "grain, hay" },
];

const geneFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_gen", placeholder: "milk_production" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "Producción de leche" },
  { key: "description", label: "Descripción", type: "string" },
  { key: "attribute-key", label: "attribute-key", type: "string", placeholder: "milk_production" },
  {
    key: "dominance",
    label: "Dominancia",
    type: "select",
    options: ["DOMINANT", "RECESSIVE", "MIXED"],
    default: "MIXED",
  },
  { key: "min-value", label: "Mínimo", type: "number", default: "0" },
  { key: "max-value", label: "Máximo", type: "number", default: "100" },
  { key: "applicable-species", label: "Especies (vacío = cualquiera)", type: "list", placeholder: "cow" },
];

export function Ranching({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Ranching (RPGRoll-Ranching)">
        Ganadería como simulación viva — cada animal tiene su propio ADN, con genes heredables, dominancia real,
        mutaciones raras y un linaje congelado que persigue la endogamia. Criar no es acumular: es seleccionar
        reproductores, mejorar generaciones, y cuidar salud/nutrición/bienestar para que la producción valga la
        pena.
      </PageHeader>

      <Callout tone="info" title="El corazón del addon: Genetics & Bloodline Engine">
        Cada gen es un porcentaje continuo (0-100), no un rasgo discreto "A/a" de libro de texto — más fiel a
        ejemplos como "Producción de leche: 92%" que al cuadro de Punnett clásico. Cada animal tiene DOS alelos
        por gen; la <code>dominance</code> del gen decide cómo se combinan en el valor final expresado.
      </Callout>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll]\nsoftdepend: [SackEffects, RPGRoll-Effects, RPGRoll-Seasons]"} />
      <p>
        Sin{" "}
        <button type="button" onClick={() => onNavigate("seasons")} className="text-violet-600 underline dark:text-violet-400">
          RPGRoll-Seasons
        </button>
        , el factor climático de bienestar/fertilidad/producción simplemente no aplica (el resto funciona igual).
        Ni RPGRoll-Farming, RPGRoll-Cooking, RPGRoll-Alchemy ni RPGRoll-Workers existen todavía — esas
        integraciones del diseño original quedan como métodos genéricos en <code>RanchingAPI</code>, listos para
        cuando esos addons existan.
      </p>

      <SectionHeading id="genetica">Genética: alelos y dominancia</SectionHeading>
      <Table>
        <Thead>
          <Th>Dominancia</Th>
          <Th>Cómo se resuelve el fenotipo</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">DOMINANT</Td><Td>El alelo más alto domina — un solo padre con una copia fuerte alcanza para expresarla.</Td></Tr>
          <Tr><Td className="font-mono text-xs">RECESSIVE</Td><Td>El alelo más bajo domina — hacen falta AMBAS copias fuertes para expresarse del todo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">MIXED</Td><Td>Codominancia/mezcla — el fenotipo es el promedio de los dos alelos.</Td></Tr>
        </tbody>
      </Table>
      <p>
        Tres modos de herencia, elegibles en <code>config.yml</code> (<code>genetics-mode</code>):
      </p>
      <Table>
        <Thead>
          <Th>Modo</Th>
          <Th>Cómo concibe una cría</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">SIMPLE</Td><Td>Promedio de ambos padres +/- una pequeña variación al azar — sin alelos separados.</Td></Tr>
          <Tr><Td className="font-mono text-xs">ADVANCED</Td><Td>Segregación mendeliana real: un alelo al azar de cada padre, resuelto por la dominancia del gen.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PROBABILISTIC</Td><Td>Igual que ADVANCED, pero el Breeding Planner puede simular 500 crías virtuales antes de aparear y mostrar la distribución (mín/prom/máx) por chat.</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="tip" title="Las mutaciones viven DENTRO del gen, no son un tipo de contenido propio">
        Cada <code>Gene</code> puede declarar una lista de <code>mutations</code> — variantes raras
        (<code>MULTIPLY</code> el fenotipo, <code>OVERRIDE</code>lo a un valor fijo, o puramente{" "}
        <code>COSMETIC_TAG</code> como "Lana dorada") con su propia chance. No tienen su propio navegador en el
        Ranch Studio porque no tienen sentido sin el gen al que decoran.
      </Callout>

      <SectionHeading id="linaje">Linaje y endogamia</SectionHeading>
      <p>
        Al nacer, una cría congela una copia (id, nombre, especie) de sus dos padres y de los ancestros que ya
        tenían — <strong>nunca vuelve a resolver un animal real más tarde</strong>, así que el linaje se puede
        mostrar completo incluso mucho después de que un ancestro murió o fue vendido. El Breeding Planner
        chequea <code>inbreeding-warning-generations</code> generaciones hacia atrás antes de aparear y avisa
        (no bloquea) si dos candidatos comparten sangre reciente.
      </p>

      <SectionHeading id="especies-razas">Especies y razas</SectionHeading>
      <p>
        Una <code>Species</code> ata la simulación a un <code>EntityType</code> vanilla real (COW, CHICKEN,
        SHEEP...) y define cuánto pesa, cuánto dura cada etapa de vida, si gesta o no, y qué produce. Una{" "}
        <code>Breed</code> siempre pertenece a una sola especie y aplica multiplicadores sobre esa base
        (producción/peso/fertilidad/resistencia) más un <code>temperament</code> puramente descriptivo.
      </p>
      <Table>
        <Thead>
          <Th>Etapa de vida</Th>
          <Th>Qué la activa</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">BABY → JUVENILE</Td><Td>Pasadas <code>baby-stage-duration-ticks</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">JUVENILE → ADULT</Td><Td>Pasadas <code>juvenile-stage-duration-ticks</code> más.</Td></Tr>
          <Tr><Td className="font-mono text-xs">ADULT → ELDER</Td><Td>Pasado <code>elder-threshold-ticks</code> como adulto — producción y peso caen un poco, la fertilidad baja a 40%.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="reproduccion">Reproducción y embarazo</SectionHeading>
      <Callout tone="tip" title="El apareamiento reutiliza el modo vanilla de siempre">
        Alimentá a dos animales adultos de sexo opuesto y misma especie con su comida de cría (trigo, semillas,
        zanahorias...) — Minecraft ya sabe ponerlos en "modo amor". Ranching intercepta ese resultado
        (<code>EntityBreedEvent</code>), cancela el bebé instantáneo de vanilla, tira la fertilidad de la madre, y
        si prende: nace directo si la especie no gesta (<code>gestation-duration-ticks: 0</code>, ej. gallinas),
        o arranca una gestación real con el tamaño de camada, sexo y genética de la cría <strong>ya congelados</strong>{" "}
        desde el momento de la concepción — el nacimiento no depende de que el padre siga vivo cuando termine.
      </Callout>
      <p>
        Durante la gestación la hembra no produce y su fertilidad recalculada baja a 0 hasta que nace la camada.{" "}
        <strong>Un reinicio del servidor a mitad de gestación cancela el embarazo</strong> (no se persiste el
        estado — una simplificación deliberada para no serializar genotipos/fenotipos de crías pendientes).
      </p>

      <SectionHeading id="bienestar">Nutrición y bienestar</SectionHeading>
      <p>
        Un <code>Feed</code> se da con click derecho y suma salud/felicidad/un bono temporal de producción,
        multiplicado por su <code>quality</code> (Común/Buena/Premium/Orgánica/Legendaria) — si no coincide con
        la dieta de la especie (<code>diet-tags</code>), el efecto se reduce a 40%. El bienestar se recalcula
        solo, acercándose gradualmente a un "objetivo" ambiental:
      </p>
      <Table>
        <Thead>
          <Th>Factor</Th>
          <Th>Cómo se mide</Th>
        </Thead>
        <tbody>
          <Tr><Td>Luz</Td><Td>Nivel de luz del bloque — oscuro penaliza, iluminado da un bono.</Td></Tr>
          <Tr><Td>Agua cercana</Td><Td>Escaneo simple de bloques de agua en un radio chico.</Td></Tr>
          <Tr><Td>Compañía / hacinamiento</Td><Td>Cuenta animales de la misma especie cerca — 1 a 5 da bono, 0 penaliza (soledad), 9+ penaliza (hacinamiento).</Td></Tr>
          <Tr><Td>Clima</Td><Td>Vía RPGRoll-Seasons (si está instalado) — calor/frío extremo penaliza.</Td></Tr>
          <Tr><Td>Salud</Td><Td>Salud baja arrastra la felicidad hacia abajo también.</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title="La 'limpieza' del diseño original no tiene equivalente real en Bukkit">
        No existe ninguna noción de "corral sucio" para medir — ese factor se reemplazó por luz + agua +
        hacinamiento, que sí son medibles de verdad contra el mundo. Felicidad y salud alimentan directo a
        fertilidad y producción, así que "un animal feliz produce más" sigue siendo literalmente cierto.
      </Callout>

      <SectionHeading id="salud">Enfermedades, vacunas y medicina</SectionHeading>
      <p>
        Las enfermedades se contagian entre animales sanos cercanos de la misma especie (chance propia por
        enfermedad, mayor cuanto peor esté la salud del blanco) y también pueden aparecer solas si el bienestar
        de un animal está muy descuidado. Mientras dura, penalizan salud/felicidad/producción por igual en cada
        chequeo periódico. Una <code>Vaccine</code> no da inmunidad binaria: reduce el riesgo de contagio un{" "}
        <code>risk-reduction</code> mientras esté activa (temporal o permanente). Una <code>Medicine</code>{" "}
        (Antibiótico/Vitamina/Analgésico/Antiparasitario) puede curar al instante con una chance, o acortar la
        duración restante si no.
      </p>

      <SectionHeading id="produccion">Producción y calidad</SectionHeading>
      <p>
        Cada especie declara sus productos (<code>product-types</code>) y una cantidad base por unidad
        (<code>base-production</code>). La cantidad y calidad final de cada ordeñada/esquilada/huevo/carne
        dependen de genética (busca un gen cuyo <code>attribute-key</code> contenga el nombre del producto),
        raza, etapa de vida, felicidad, salud, clima y enfermedad activa — tal como pide el diseño original.
      </p>
      <Table>
        <Thead>
          <Th>Producto</Th>
          <Th>Se obtiene reutilizando...</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">milk</Td><Td>Click con balde vacío (<code>PlayerInteractEntityEvent</code>) — entrega un balde de leche con calidad.</Td></Tr>
          <Tr><Td className="font-mono text-xs">wool</Td><Td>Esquilar (<code>PlayerShearEntityEvent</code>) — respeta el color real de la oveja.</Td></Tr>
          <Tr><Td className="font-mono text-xs">eggs</Td><Td>La puesta automática de huevos de una gallina (<code>EntityDropItemEvent</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">meat / leather / etc.</Td><Td>Se agregan como drops extra al morir el animal (<code>EntityDeathEvent</code>), sumados a los drops vanilla normales.</Td></Tr>
        </tbody>
      </Table>
      <p>
        Cada ítem de producción sale etiquetado con su calidad (Común → Buena → Premium → Orgánica →
        Legendaria) en el lore — listo para que un futuro RPGRoll-Cooking le dé un uso real a esa diferencia.
      </p>

      <SectionHeading id="formato-yaml">Ejemplos de archivo YAML</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="species/cow.yml"
        code={
          "id: cow\n" +
          'display-name: "&fVaca"\n' +
          "icon: COW_SPAWN_EGG\n" +
          'description: "Ganado bovino clásico — leche, carne y cuero."\n' +
          "entity-type: COW\n" +
          "product-types: [milk, meat, leather]\n" +
          "base-production:\n" +
          "  milk: 3.0\n" +
          "  meat: 4.0\n" +
          "  leather: 2.0\n" +
          "base-weight-min: 400\n" +
          "base-weight-max: 750\n" +
          "baby-stage-duration-ticks: 6000\n" +
          "juvenile-stage-duration-ticks: 12000\n" +
          "elder-threshold-ticks: 480000\n" +
          "gestation-duration-ticks: 24000\n" +
          "min-litter-size: 1\n" +
          "max-litter-size: 1\n" +
          "base-fertility: 0.5\n" +
          "diet-tags: [grain, hay]\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="genes/milk_production.yml"
        code={
          "id: milk_production\n" +
          'display-name: "Producción de leche"\n' +
          'description: "Qué tan lechera es la vaca — un solo padre con una copia alta alcanza para heredarla."\n' +
          "attribute-key: milk_production\n" +
          "dominance: DOMINANT\n" +
          "min-value: 0\n" +
          "max-value: 100\n" +
          "applicable-species: [cow]\n" +
          "mutations:\n" +
          "  - id: double_production\n" +
          '    display-name: "Producción doble"\n' +
          "    effect-type: MULTIPLY\n" +
          "    effect-value: 2.0\n" +
          "    chance: 0.01\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="breeds/holstein.yml"
        code={
          "id: holstein\n" +
          'display-name: "&fHolstein"\n' +
          'description: "La raza lechera por excelencia — gran producción, temperamento tranquilo."\n' +
          "species: cow\n" +
          "production-multiplier: 1.4\n" +
          "weight-multiplier: 1.1\n" +
          "fertility-multiplier: 1.0\n" +
          "resistance-multiplier: 0.9\n" +
          'temperament: "Calmada"\n'
        }
      />

      <Callout tone="tip" title="Referencia completa: todos los campos en un solo archivo">
        <code>species/reference_full.yml</code> (incluido en el jar) usa todos los campos de una especie con una
        camada múltiple (2 a 6 crías) — la vaca de ejemplo siempre tiene 1, así que no muestra ese caso.
      </Callout>

      <YamlBuilder
        title="Constructor visual: especie"
        description="Identidad, ciclo de vida y reproducción de una especie. 'base-production' (mapa clave=valor) se edita mejor copiando el ejemplo de arriba."
        folder="species"
        fields={speciesFields}
      />
      <YamlBuilder title="Constructor visual: gen" folder="genes" fields={geneFields} />

      <SectionHeading id="gui">GUI: Ranch Studio</SectionHeading>
      <p>
        <Kbd>/ranchingadmin browser</Kbd> abre un hub que enlaza a 7 navegadores de contenido (Especies, Razas,
        Genes, Alimentos, Enfermedades, Vacunas, Medicinas) más el Explorador de Animales, el Planificador de
        Cría, y Veterinaria. El Explorador de Animales lista cada animal rastreado y abre una ficha de solo
        lectura con su genética expresada, linaje y estado. El Planificador de Cría deja elegir dos animales,
        previsualizar la distribución probable de la cría (modo PROBABILISTIC) por chat, y — como atajo
        administrativo — forzar el apareamiento sin pasar por el minijuego de alimentar. Veterinaria lista solo
        los animales enfermos con cura de un click.
      </p>

      <SectionHeading id="api">API para addons — RanchingAPI</SectionHeading>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={
          "// Registrar contenido por código (mismo patrón que cualquier ContentManager#save).\n" +
          "RanchingAPI.get().species().save(nuevaEspecie);\n" +
          "\n" +
          "// Pensado en primer lugar para un futuro RPGRoll-Workers que automatice\n" +
          "// el cuidado diario sin depender de que un jugador haga click derecho.\n" +
          'RanchingAPI.get().feedAnimal(animal, "premium_grain");\n' +
          'RanchingAPI.get().treatAnimal(animal, "antibiotic_shot");\n' +
          'RanchingAPI.get().vaccinateAnimal(animal, "flu_vaccine");\n' +
          "RanchingAPI.get().attemptBreeding(animalA, animalB, location);\n"
        }
      />
      <Callout tone="tip" title="Las acciones de cuidado programáticas no son solo un atajo interno">
        Son la misma lógica que corre cuando un jugador da click derecho con un ítem — expuestas a propósito
        para que un futuro RPGRoll-Workers (pastor/veterinario/alimentador automatizados) las llame directo, sin
        que Ranching necesite saber que "Workers" existe.
      </Callout>

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/ranchingadmin browser</Td><Td>Abre el Ranch Studio.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/ranchingadmin reload</Td><Td>Recarga todas las definiciones desde disco.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/ranchingadmin spawn <especie> [raza]"}</Td><Td>Spawnea un animal fundador (sin padres) en tu ubicación.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/ranching inspect</Td><Td>Abre la ficha del animal al que estás mirando.</Td></Tr>
        </tbody>
      </Table>
      <p>
        <code>/ranchingadmin</code> requiere <Badge tone="amber">rpgrollranching.admin.*</Badge> (default: op);{" "}
        <code>/ranching</code> requiere <Badge tone="blue">rpgrollranching.use</Badge> (default: true).
      </p>

      <SectionHeading id="pendiente">Qué falta (próxima pasada)</SectionHeading>
      <Callout tone="warning" title="Esta pasada es 'Núcleo + genética avanzada y bienestar', no todo el diseño original">
        A propósito, esta versión <strong>no</strong> incluye subastas de animales, exposiciones/torneos
        ganaderos con categorías, ni edificios/corrales/equipamiento como contenido configurable propio.
        Tampoco hay integraciones reales con RPGRoll-Farming/Cooking/Alchemy/Workers — ninguno de esos addons
        existe todavía, así que quedan como métodos genéricos de <code>RanchingAPI</code> listos para cuando
        existan. Lo que sí está completo y estable: el Genetics & Bloodline Engine (dominancia, 3 modos de
        herencia, mutaciones, linaje/endogamia), especies/razas, reproducción con gestación real vía el flujo
        vanilla de cría, nutrición y bienestar, enfermedades/vacunas/medicina, producción con calidad vía los
        mecanismos vanilla de cada recurso, el Ranch Studio completo, la API pública, y contenido de ejemplo (3
        especies, 3 razas, 4 genes, 2 alimentos, 1 enfermedad, 1 vacuna, 1 medicina).
      </Callout>

      <PrevNext current="ranching" onNavigate={onNavigate} />
    </>
  );
}
