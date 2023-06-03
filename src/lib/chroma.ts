export const bgColor = (hue: number, dLight: number = 0, dChroma: number = 0) =>
  `oklch(${85 + dLight}% ${0.18 + dChroma} ${hue})`;
export const bgBorderColor = (hue: number) => `oklch(90% 0.20 ${hue})`;
