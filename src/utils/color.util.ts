export function getFontColor(color: chroma.Color): string {
  const luminance = color.luminance();
  return luminance > 0.5 ? "black" : "white";
}
