import { PageHeader, SectionHeading, Callout, PrevNext } from "../components/ui";
import { RoomDesignerTool } from "../components/roomdesigner/RoomDesignerTool";
import { CubeIcon } from "../components/icons/Icon";

export function RoomDesigner({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Diseñador de Salas" icon={CubeIcon} eyebrow="Herramienta">
        Diseñá una estructura CUSTOM para la{" "}
        <button type="button" className="underline" onClick={() => onNavigate("dungeons")}>
          Biblioteca de Estructuras
        </button>{" "}
        de RPGRoll-Dungeons pintando capa por capa, mirándola en 3D en vivo, y copiando el YAML ya armado — sin
        instalar nada ni tocar código Java.
      </PageHeader>

      <Callout tone="info" title="100% en el navegador">
        Esta herramienta corre entera acá en la página — no habla con ningún servidor. Lo que produce es texto
        YAML: lo copiás o descargás, y lo pegás en <code>plugins/RPGRoll-Dungeons/structures/</code> en tu
        servidor. Es el mismo formato CUSTOM que ya lee <code>StructureParser.java</code>, así que no hace falta
        cambiar nada del lado del plugin.
      </Callout>

      <SectionHeading id="como-usar">Cómo usarlo</SectionHeading>
      <ol>
        <li>
          Elegí el tamaño (ancho/alto/profundidad) — podés cambiarlo después, se preserva lo que ya pintaste
          donde entra.
        </li>
        <li>
          Agregá materiales a la paleta (con el buscador curado o escribiendo cualquier Material a mano) y
          elegí uno como pincel activo.
        </li>
        <li>
          Pintá capa por capa: subís/bajás con las flechas, click y arrastrás para pintar varias celdas de una.
          El piso es la capa y=0.
        </li>
        <li>
          Marcá el punto de pegado ("Fijar ancla") — normalmente el centro del piso, así al pegar en el juego te
          parás donde querés el centro de la sala.
        </li>
        <li>Mirá el resultado en 3D (arrastrar rota, la rueda hace zoom) y copiá o descargá el YAML de abajo.</li>
      </ol>

      <Callout tone="warning" title="Sin orientación de bloques">
        El motor de pegado CUSTOM hace <code>setType()</code> plano — puertas, escaleras, antorchas de pared y
        camas quedan con una orientación por defecto, no la que "deberían" tener. El selector de materiales avisa
        con ⚠ cuando un material curado tiene este problema; si escribís uno a mano, el aviso no puede detectarlo
        automáticamente.
      </Callout>

      <SectionHeading id="herramienta">La herramienta</SectionHeading>
      <RoomDesignerTool />

      <SectionHeading id="siguiente-paso">Siguiente paso</SectionHeading>
      <p>
        Con el archivo ya en <code>structures/</code>, corré <code>/dungeonadmin reload</code> en el juego y
        pegala con <code>/dungeonadmin structure browser</code> — ver la sección{" "}
        <button
          type="button"
          className="underline"
          onClick={() => {
            onNavigate("dungeons");
            requestAnimationFrame(() =>
              setTimeout(() => document.getElementById("pegar-estructura")?.scrollIntoView(), 60),
            );
          }}
        >
          Pegar una estructura
        </button>{" "}
        de la documentación de Dungeons para el detalle completo (incluye la alternativa con Structure Block
        vanilla, para construir a mano en el juego en vez de acá).
      </p>

      <PrevNext current="room-designer" onNavigate={onNavigate} />
    </>
  );
}
