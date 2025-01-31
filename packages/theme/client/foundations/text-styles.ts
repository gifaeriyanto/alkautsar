/**
 * Build text style
 * @param fontSize Fontsize in px can convert into rem later
 * @param fontWeight in text like 'bold' or number (100-900)
 * @param lineHeight percent 120% 140%
 * @param letterSpacing percent 1.5% base on figma spacing
 * @returns text-style props
 */
const generateProperty = (
  fontSize: number,
  fontWeight: number | string,
  lineHeight: number,
  letterSpacing = 0
) => {
  return {
    fontSize: `${(fontSize / 16).toFixed(2)}rem`,
    fontWeight,
    lineHeight,
    letterSpacing: `${letterSpacing}px`,
  }
}

export const textStyles = {
  h1: generateProperty(24, 700, 1.2),
  h2: generateProperty(20, 700, 1.2),
  h3: generateProperty(18, 700, 1.2),
  h4: generateProperty(16, 700, 1.2),
  h5: generateProperty(14, 700, 1.2),
  content: generateProperty(16, 400, 1.8),
  small: generateProperty(14, 400, 1.8),
  extraSmall: generateProperty(12, 400, 1.8),
  tag: generateProperty(12, 400, 1.8),
}

export enum TextStyle {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  Content = 'content',
  Small = 'small',
  ExtraSmall = 'extraSmall',
  Tag = 'tag',
}
