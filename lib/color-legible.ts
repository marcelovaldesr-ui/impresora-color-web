// Tonos de texto legibles (contraste AA >= 4.5 sobre blanco) para los colores de marca.
// Los colores originales se mantienen en bordes, fondos suaves y adornos.
const LEGIBLE: Record<string, string> = {
  "#E91E8F": "#D11A80",
  "#47B7E8": "#2E7899",
  "#F47A20": "#AF5717",
  "#7DBA2F": "#527A1F",
  "#F5C51B": "#896E0F",
};
export function textoLegible(color: string): string {
  return LEGIBLE[color.toUpperCase()] ?? color;
}
