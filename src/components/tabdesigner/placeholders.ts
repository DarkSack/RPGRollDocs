// Placeholders {..} fijos que resuelve PlaceholderEngine/TABPlaceholderRegistry sin depender
// de ningún otro addon — usados como sugerencias (<datalist>) en la herramienta. Cualquier otro
// {palabra} es válido igual (otros addons se registran en runtime), solo que no aparece acá.
export const BUILTIN_PLACEHOLDERS = [
  "{player}",
  "{display_name}",
  "{uuid}",
  "{ping}",
  "{world}",
  "{gamemode}",
  "{health}",
  "{max_health}",
  "{food}",
  "{x}",
  "{y}",
  "{z}",
  "{online}",
  "{max}",
  "{server}",
  "{tps}",
  "{prefix}",
  "{suffix}",
  "{ping_formatted}",
  "{gamemode_formatted}",
];
