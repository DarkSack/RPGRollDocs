import { PageHeader, SectionHeading, Callout, PrevNext } from "../components/ui";
import { TabDesignerTool } from "../components/tabdesigner/TabDesignerTool";
import { TableListIcon } from "../components/icons/Icon";

export function TabDesigner({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Diseñador de TAB" icon={TableListIcon} eyebrow="Herramienta">
        Armá perfiles, contextos, scoreboards, tablists, nametags, belowname, bossbars, sorting, teams y
        animaciones para{" "}
        <button type="button" className="underline" onClick={() => onNavigate("tab")}>
          RPGRoll-TAB
        </button>{" "}
        con formularios en vez de escribir el YAML a mano, y copia o descargá el resultado listo para pegar en el
        servidor — sin instalar nada ni tocar código Java.
      </PageHeader>

      <Callout tone="info" title="100% en el navegador">
        Esta herramienta corre entera acá en la página — no habla con ningún servidor. Lo que produce es texto
        YAML: lo copias o descargas, y lo pegas en la carpeta correspondiente bajo{" "}
        <code>plugins/RPGRoll-TAB/tab/&lt;carpeta&gt;/</code> (ej. <code>profiles/</code>, <code>contexts/</code>,{" "}
        <code>scoreboards/</code>...). Es el mismo formato que ya leen los <code>*Parser.java</code> de cada tipo,
        así que no hace falta cambiar nada del lado del plugin.
      </Callout>

      <SectionHeading id="como-usar">Cómo usarlo</SectionHeading>
      <ol>
        <li>Elegí una pestaña arriba (Perfiles, Contextos, Scoreboards, Tablists...) — cada una es una carpeta distinta de contenido.</li>
        <li>
          Agregá una entrada nueva o elegí una de la lista de la izquierda. Los campos que referencian otro
          contenido (ej. el <code>tablist</code> de un Perfil) tienen autocompletado con los ids que ya creaste en
          esa pestaña.
        </li>
        <li>Completá el formulario — el YAML de la derecha se actualiza solo, con el mismo nombre de archivo esperado.</li>
        <li>Copia o descargá el archivo, y repetí para cada tipo de contenido que necesites.</li>
      </ol>

      <Callout tone="warning" title="No reemplaza ningún editor in-game">
        RPGRoll-TAB no tiene GUI Studio dentro del juego (a diferencia de la mayoría de los otros addons) — esta
        herramienta web es la forma soportada de armar el contenido sin escribir el schema de memoria. Después de
        pegar los archivos, corré <code>/tabadmin reload</code> en el servidor para aplicarlos.
      </Callout>

      <SectionHeading id="herramienta">La herramienta</SectionHeading>
      <TabDesignerTool />

      <SectionHeading id="siguiente-paso">Siguiente paso</SectionHeading>
      <p>
        Con los archivos ya en <code>tab/</code>, corré <code>/tabadmin reload</code> — ver la sección{" "}
        <button
          type="button"
          className="underline"
          onClick={() => {
            onNavigate("tab");
            requestAnimationFrame(() => setTimeout(() => document.getElementById("comandos")?.scrollIntoView(), 60));
          }}
        >
          Comandos
        </button>{" "}
        de la documentación de TAB para el resto de los comandos de administración, y{" "}
        <button
          type="button"
          className="underline"
          onClick={() => {
            onNavigate("tab");
            requestAnimationFrame(() => setTimeout(() => document.getElementById("motor-de-contexto")?.scrollIntoView(), 60));
          }}
        >
          Context Engine
        </button>{" "}
        para entender cómo se elige, entre varios Contextos que matchean, cuál perfil termina aplicado.
      </p>

      <PrevNext current="tab-designer" onNavigate={onNavigate} />
    </>
  );
}
