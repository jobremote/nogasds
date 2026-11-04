#!/usr/bin/env node
// Importa ícones exportados do Figma (SVG) para src/components/Icon/icons.json.
// Uso: node scripts/import-icons.mjs <pasta-com-svgs>
// O nome do arquivo (sem .svg) vira o nome do ícone, por exemplo `more-horiz.svg` -> `more-horiz`.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = process.argv[2];
if (!dir) {
  console.error('Uso: node scripts/import-icons.mjs <pasta-com-svgs>');
  process.exit(1);
}

const target = fileURLToPath(new URL('../src/components/Icon/icons.json', import.meta.url));
const icons = JSON.parse(readFileSync(target, 'utf8'));

for (const file of readdirSync(dir).filter((f) => f.endsWith('.svg'))) {
  const svg = readFileSync(join(dir, file), 'utf8');
  if (!/viewBox="0 0 24 24"/.test(svg)) throw new Error(`${file}: esperado viewBox 0 0 24 24`);
  const paths = [...svg.matchAll(/<path\b[^>]*?\bd="([^"]+)"/g)].map((m) => m[1]);
  if (paths.length === 0) throw new Error(`${file}: nenhum <path> encontrado`);
  icons[basename(file, '.svg')] = paths.join(' ');
}

const sorted = Object.fromEntries(Object.entries(icons).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(target, JSON.stringify(sorted, null, 2) + '\n');
console.log(`${Object.keys(sorted).length} ícones em icons.json`);
