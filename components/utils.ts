function COMPONENT_TO_HEX(c: number) {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

// https://stackoverflow.com/a/5624139/3416691
export function RGB_TO_HEX(r: number, g: number, b: number) {
  return '#' + COMPONENT_TO_HEX(r) + COMPONENT_TO_HEX(g) + COMPONENT_TO_HEX(b);
}

// https://stackoverflow.com/a/5624139/3416691
export function HEX_TO_RGB(hex: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1]!, 16),
        g: Number.parseInt(result[2]!, 16),
        b: Number.parseInt(result[3]!, 16)
      }
    : null;
}
