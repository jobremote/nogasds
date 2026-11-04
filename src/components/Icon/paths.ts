import icons from './icons.json';

/**
 * Ícones do NogasDS (Material Symbols outlined, viewBox 24x24), exportados do
 * arquivo Icons do Figma. Cada valor é o atributo `d` do <path>.
 * Os dados ficam em `icons.json`; para adicionar ícones, exporte os SVGs do Figma e rode
 * `node scripts/import-icons.mjs <pasta>`.
 */
export const iconPaths = icons;

export type IconName = keyof typeof icons;
