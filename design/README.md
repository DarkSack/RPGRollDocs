# Assets de origen

Archivos fuente en alta resolución. **Esta carpeta no se despliega**: Vite
solo copia `public/` al build, así que lo que vive acá no suma peso al sitio.

| Archivo | Para qué |
| --- | --- |
| `logo-source.png` | Logo original (1310×1161, RGBA). Fuente de las versiones de `public/`. |

Las versiones que sí se sirven se generan desde acá:

```bash
npx --yes sharp-cli -i design/logo-source.png -o public/logo.png \
  resize 128 128 --fit inside -f png --compressionLevel 9 --palette

npx --yes sharp-cli -i design/logo-source.png -o public/logo-32.png \
  resize 32 32 --fit inside -f png --compressionLevel 9 --palette
```

`logo.png` (128px) es la marca que usa el componente `Logo`; `logo-32.png` es
el favicon. Si cambiás el logo, reemplazá `logo-source.png` y volvé a correr
los dos comandos.
