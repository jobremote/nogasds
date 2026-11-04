import tokensCss from '../styles/tokens.css?raw';
import typographyCss from '../styles/typography.css?raw';

/** Lê os tokens direto dos CSS do pacote, para a documentação nunca divergir do código. */

export interface ColorToken {
  /** Nome no Figma, por exemplo `surface/base`. */
  figma: string;
  /** Variável CSS, por exemplo `--nds-surface-base`. */
  css: string;
  dark: string;
  light: string;
}

export interface ColorGroup {
  title: string;
  tokens: ColorToken[];
}

const groupTitles: Array<[string, string]> = [
  ['surface', 'Superfícies'],
  ['border', 'Bordas'],
  ['text', 'Texto'],
  ['action', 'Ação'],
  ['link', 'Link e foco'],
  ['focus', 'Link e foco'],
  ['block', 'Blocos de cor (apoio)'],
  ['accent', 'Acentos (apoio)'],
  ['status', 'Status'],
];

function block(selector: string): Record<string, string> {
  const start = tokensCss.indexOf(selector);
  const open = tokensCss.indexOf('{', start);
  const close = tokensCss.indexOf('\n}', open);
  const body = tokensCss.slice(open + 1, close);
  const out: Record<string, string> = {};
  for (const match of body.matchAll(/(--nds-[\w-]+):\s*([^;]+);/g)) out[match[1]] = match[2].trim();
  return out;
}

export function colorGroups(): ColorGroup[] {
  const dark = block("[data-theme='dark']");
  const light = block("[data-theme='light']");
  const groups = new Map<string, ColorToken[]>();
  for (const [css, darkValue] of Object.entries(dark)) {
    if (!darkValue.startsWith('#')) continue;
    const key = css.replace('--nds-', '').split('-')[0];
    const title = groupTitles.find(([prefix]) => prefix === key)?.[1] ?? 'Outros';
    const token: ColorToken = {
      css,
      figma: css.replace('--nds-', '').replace('-', '/'),
      dark: darkValue,
      light: light[css] ?? darkValue,
    };
    groups.set(title, [...(groups.get(title) ?? []), token]);
  }
  return [...groups].map(([title, tokens]) => ({ title, tokens }));
}

export function colorTokenCount(): number {
  return colorGroups().reduce((total, group) => total + group.tokens.length, 0);
}

export interface DimensionToken {
  css: string;
  figma: string;
  value: string;
  px: number;
}

export function dimensionTokens(prefix: 'space' | 'radius' | 'stroke' | 'layout'): DimensionToken[] {
  const rootBlocks = [...tokensCss.matchAll(/:root\s*\{([\s\S]*?)\n\}/g)].map((m) => m[1]);
  const dims = rootBlocks[rootBlocks.length - 1] ?? '';
  const out: DimensionToken[] = [];
  for (const match of dims.matchAll(/(--nds-([\w]+)-([\w-]+)):\s*([^;]+);/g)) {
    if (match[2] !== prefix) continue;
    const value = match[4].trim();
    out.push({ css: match[1], figma: `${match[2]}/${match[3]}`, value, px: parseFloat(value) || 0 });
  }
  return out;
}

export interface TypeStyle {
  name: string;
  /** Especificação legível, por exemplo `Light 48/48, tracking -8%`. */
  spec: string;
  group: 'Título' | 'Texto' | 'Interface';
  caps: boolean;
}

const weightNames: Record<string, string> = { '300': 'Light', '400': 'Regular', '500': 'Medium', '700': 'Bold' };
const titleStyles = ['display', 'display-forte', 'headline', 'title', 'subtitle'];
const interfaceStyles = ['label', 'label-small', 'overline'];

export function typeStyles(): TypeStyle[] {
  const out: TypeStyle[] = [];
  for (const match of typographyCss.matchAll(/--nds-type-([\w-]+):\s*(\d+)\s+(\d+)px\/(\d+)px[^;]*;/g)) {
    const name = match[1];
    const tracking = typographyCss.match(new RegExp(`--nds-type-${name}-tracking:\\s*(-?[\\d.]+)em`))?.[1] ?? '0';
    const percent = Math.round(parseFloat(tracking) * 100);
    out.push({
      name,
      spec: `${weightNames[match[2]]} ${match[3]}/${match[4]}, tracking ${percent > 0 ? '+' : ''}${percent}%`,
      group: titleStyles.includes(name) ? 'Título' : interfaceStyles.includes(name) ? 'Interface' : 'Texto',
      caps: name === 'title' || name === 'overline',
    });
  }
  return out;
}
