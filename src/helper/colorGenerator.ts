type VintageColor = {
  hex: string;
  rgb: string;
};

export const generateVintageColor = (): VintageColor => {
  // Helper to clamp RGB values
  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  // Generate a muted RGB color
  const baseR = Math.floor(Math.random() * 256);
  const baseG = Math.floor(Math.random() * 256);
  const baseB = Math.floor(Math.random() * 256);

  // Apply a vintage "filter" (reduce saturation and add warmth)
  const mutedR = clamp(baseR - Math.random() * 40, 50, 200);
  const mutedG = clamp(baseG - Math.random() * 60, 50, 180);
  const mutedB = clamp(baseB - Math.random() * 80, 50, 160);

  // Convert RGB to HEX
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  const hex = `#${toHex(Math.floor(mutedR))}${toHex(Math.floor(mutedG))}${toHex(
    Math.floor(mutedB)
  )}`;

  return {
    hex,
    rgb: `rgb(${Math.floor(mutedR)}, ${Math.floor(mutedG)}, ${Math.floor(mutedB)})`,
  };
};

export const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(' ');
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();
};
