#!/usr/bin/env node
// Importa ícones e logos exportados do Figma (SVG).
// Uso: node scripts/import-icons.mjs <pasta-com-svgs>
// - `<nome>.svg` (ícone, uma cor) -> src/components/Icon/icons.json, ex.: `more-horiz.svg` -> `more-horiz`.
//   Guarda só o `d` dos paths; a cor vem do texto (currentColor).
// - `logo-<nome>.svg` (logo de marca, cores fixas) -> src/components/Logo/logos.json, ex.: `logo-google.svg` -> `google`.
//   Guarda cada path com o seu `fill`.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = process.argv[2];
if (!dir) {
  console.error('Uso: node scripts/import-icons.mjs <pasta-com-svgs>');
  process.exit(1);
}

const iconsFile = fileURLToPath(new URL('../src/components/Icon/icons.json', import.meta.url));
const logosFile = fileURLToPath(new URL('../src/components/Logo/logos.json', import.meta.url));
const icons = JSON.parse(readFileSync(iconsFile, 'utf8'));
const logos = JSON.parse(readFileSync(logosFile, 'utf8'));

const sortKeys = (obj) => Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));

for (const file of readdirSync(dir).filter((f) => f.endsWith('.svg'))) {
  const svg = readFileSync(join(dir, file), 'utf8');
  if (!/viewBox="0 0 24 24"/.test(svg)) throw new Error(`${file}: esperado viewBox 0 0 24 24`);
  const name = basename(file, '.svg');
  const tags = [...svg.matchAll(/<path\b[^>]*>/g)].map((m) => m[0]);
  if (tags.length === 0) throw new Error(`${file}: nenhum <path> encontrado`);
  const attr = (tag, key) => tag.match(new RegExp(`\\b${key}="([^"]+)"`))?.[1];

  if (name.startsWith('logo-')) {
    logos[name.slice('logo-'.length)] = tags.map((tag) => {
      const d = attr(tag, 'd');
      const fill = attr(tag, 'fill');
      if (!d || !fill) throw new Error(`${file}: todo <path> de logo precisa de d e fill`);
      return { d, fill };
    });
  } else {
    icons[name] = tags.map((tag) => attr(tag, 'd')).filter(Boolean).join(' ');
  }
}

writeFileSync(iconsFile, JSON.stringify(sortKeys(icons), null, 2) + '\n');
writeFileSync(logosFile, JSON.stringify(sortKeys(logos), null, 2) + '\n');
console.log(`${Object.keys(icons).length} ícones em icons.json, ${Object.keys(logos).length} logos em logos.json`);
