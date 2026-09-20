/**
 * Marca de RPGRoll.
 *
 * El archivo vive en `public/`, así que la URL se arma con `BASE_URL` en vez
 * de una ruta absoluta: el proyecto compila con `base: "./"` (ver
 * vite.config.ts) para poder servirse desde cualquier subcarpeta, y un
 * `/logo.png` escrito a mano en el JSX no se reescribe en el build.
 */
const LOGO_SRC = `${import.meta.env.BASE_URL}logo.png`;

export function Logo({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={LOGO_SRC}
      // Decorativo: el nombre "RPGRoll" siempre va al lado como texto, así que
      // un alt acá solo duplicaría el anuncio del lector de pantalla.
      alt=""
      width={size}
      height={size}
      decoding="async"
      className={`shrink-0 object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
