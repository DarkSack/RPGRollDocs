/**
 * Captura del juego con pie de foto.
 *
 * Las imágenes viven en `public/capturas/<addon>/` y se piden por ruta
 * absoluta. Si el archivo aún no existe, la imagen se oculta y queda el pie
 * con un marco discreto, para no mostrar el icono de imagen rota.
 */
export function Screenshot({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-6 max-w-3xl">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full rounded-sm border"
        style={{ borderColor: "var(--line-strong)", backgroundColor: "var(--ruby-soft)" }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      {caption && (
        <figcaption className="mt-2 text-[13px] leading-snug" style={{ color: "var(--text-dim)" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
