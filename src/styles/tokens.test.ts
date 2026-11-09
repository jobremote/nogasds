import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Regra de camadas: componentes só usam tokens semânticos (Semantic e Layout), nunca os primitivos de Dimensions.
 * Só `tokens.css` pode referenciar os primitivos (os tokens de Layout apontam para eles).
 */
const primitive = /var\(--nds-(space-\d+|radius-(none|full)|stroke-(hairline|strong)|layout-[\w-]+)\)/;

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sources(path);
    return /\.(css|tsx|ts|mdx)$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : [];
  });
}

describe('camadas de tokens', () => {
  it('nenhum componente, doc ou história usa primitivos de Dimensions', () => {
    const src = join(process.cwd(), 'src');
    const offenders = sources(src)
      .filter((file) => !file.endsWith(join('styles', 'tokens.css')))
      .flatMap((file) =>
        readFileSync(file, 'utf8')
          .split('\n')
          .map((line, i) => ({ file, line: i + 1, text: line }))
          .filter(({ text }) => primitive.test(text))
          .map(({ file: f, line }) => `${f.slice(src.length + 1)}:${line}`),
      );
    expect(offenders).toEqual([]);
  });

  it('tokens.css define todos os tokens semânticos de Layout apontando para primitivos', () => {
    const css = readFileSync(join(process.cwd(), 'src', 'styles', 'tokens.css'), 'utf8');
    const layout = css.slice(css.lastIndexOf(':root'));
    const names = [...layout.matchAll(/--nds-([\w-]+):\s*var\(--nds-[\w-]+\);/g)].map((m) => m[1]);
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];
    expect(names).toEqual([
      ...sizes.map((s) => `space-gap-${s}`),
      ...sizes.map((s) => `space-inset-${s}`),
      'radius-default',
      'radius-round',
      'stroke-default',
      'stroke-focus',
      'stroke-emphasis',
      'size-nav-height',
    ]);
  });
});
