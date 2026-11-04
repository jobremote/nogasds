# NogasDS

Design system **neutro e coringa** (tokens e componentes React), pensado para servir a qualquer produto. Escuro por padrão, sistema quadrado (raio 0, exceto `radius/full`), Inter com tracking apertado, hairlines e base de 4 px.

O **Figma é a fonte da verdade**: os tokens e componentes daqui seguem os arquivos do NogasDS no Figma (Primitives, Foundations, Components e Icons).

Versão atual: `0.1.0`. Ainda **não está publicado no npm**.

Catálogo online (Storybook): https://jobremote.github.io/nogasds/

## Componentes da 0.1.0

| Componente | Variantes e estados |
| --- | --- |
| `Button` | `primary`, `secondary`, `outline`, `ghost` × `md`, `sm`; padrão, hover, foco, desabilitado |
| `TextField` | rótulo, `placeholder`, `helpText`, `error`, `endSlot`; padrão, hover, foco, erro, desabilitado |
| `Checkbox` | marcado/desmarcado; padrão, hover, foco, erro, desabilitado; rótulo com links |
| `CodeField` | 6 dígitos (configurável); padrão, foco, erro, desabilitado; foco automático, colar código inteiro, backspace voltando |
| `Banner` | `info`, `success`, `error`; título e descrição |
| `Link` | `md`, `sm`; padrão, hover, foco, desabilitado |
| `Icon` | subconjunto dos ícones do Figma (veja `iconPaths`) |

## Usar em um produto

Enquanto não há publicação no npm, instale direto do GitHub (por tag) ou por vínculo local.

```bash
# Dependência do GitHub, travada em uma versão
npm install github:jobremote/nogasds#v0.1.0
```

O pacote é construído na instalação (script `prepare`), então precisa de Node 20+ e das devDependencies do próprio pacote, que o npm instala sozinho para dependências git.

```bash
# Vínculo local, para desenvolver o produto e o design system juntos
cd nogasds && npm install && npm link
cd ../meu-produto && npm link nogasds
```

Importe os estilos **uma vez**, na raiz da aplicação, e use os componentes:

```tsx
import 'nogasds/styles.css';
import { Button, TextField } from 'nogasds';

export function Exemplo() {
  return (
    <form>
      <TextField label="E-mail" type="email" placeholder="voce@exemplo.com" />
      <Button type="submit">Continuar</Button>
    </form>
  );
}
```

`react` e `react-dom` (18 ou superior) são peer dependencies. No Next.js (App Router), os componentes que têm estado (`CodeField`) ou eventos precisam ser usados dentro de componentes de cliente (`'use client'`).

### Temas

O tema escuro é o padrão e vale em `:root`. Para o tema claro, ponha `data-theme="light"` em qualquer ancestral (inclusive `<html>`); `data-theme="dark"` força o escuro em uma área específica.

```html
<html data-theme="light">
```

### Fonte Inter

A fonte **não vem embutida** no pacote. O produto precisa carregar a Inter nos pesos **300, 400, 500 e 700**. Duas opções:

```bash
npm install @fontsource/inter
```

```ts
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
```

Ou pelo Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap`.

A pilha usada é `--nds-font-family: 'Inter', system-ui, ...`; sem a Inter carregada, o sistema cai na fonte do sistema operacional.

### Tokens (variáveis CSS)

Todos os tokens têm o prefixo `--nds-` e saem de `nogasds/styles.css`.

- **Semantic** (mudam com o tema): `--nds-surface-base`, `--nds-text-primary`, `--nds-border-control`, `--nds-focus-ring`, `--nds-status-danger-fg` etc. O nome é o do Figma com `/` virando `-`.
- **Dimensions**: `--nds-space-1…24` (4 a 96 px), `--nds-radius-none`, `--nds-radius-full`, `--nds-stroke-hairline`, `--nds-stroke-strong`, `--nds-layout-nav-height`.
- **Tipografia**: para cada text style, `--nds-type-<nome>` (atalho `font`) e `--nds-type-<nome>-tracking`, mais as classes `.nds-text-<nome>`.

```css
.meu-titulo {
  font: var(--nds-type-headline);
  letter-spacing: var(--nds-type-headline-tracking);
  color: var(--nds-text-primary);
}
```

## Desenvolvimento

Requer Node 20 ou superior (testado com Node 24).

```bash
npm install
npm run storybook      # catálogo em http://localhost:6006
npm run check          # lint + tipos + testes + build (o que o CI roda)
```

| Script | O que faz |
| --- | --- |
| `npm run storybook` | Catálogo visual (fundo escuro do sistema; alternador de tema na barra) |
| `npm run build-storybook` | Gera o catálogo estático em `storybook-static/` |
| `npm run lint` | ESLint (inclui regras de acessibilidade) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest + Testing Library + jest-axe |
| `npm run build` | Gera `dist/` (ESM, CJS, tipos e `nogasds.css`) |

## Contribuir

1. Crie uma branch a partir de `main` (`feat/...`, `fix/...`, `docs/...`).
2. Antes de mexer em token ou componente, confira o Figma: ele manda. Se o código e o Figma divergirem, corrija o código ou registre a lacuna, não invente valor.
3. Componente novo: pasta em `src/components/<Nome>/` com `<Nome>.tsx`, `<nome>.css`, `<Nome>.stories.tsx` (todos os estados) e `<Nome>.test.tsx` (comportamento e acessibilidade); exporte em `src/index.ts`.
4. Rode `npm run check` e abra um pull request. O CI repete lint, tipos, testes e build.
5. Nada de nome, texto, regra ou cor de produto em tokens, componentes, exemplos ou docs. Textos de exemplo são genéricos.

Mais detalhes das convenções em [CLAUDE.md](./CLAUDE.md).

### Versionamento e releases

[Versionamento semântico](https://semver.org/lang/pt-BR/), com **uma tag por versão** (`v0.1.0`). Enquanto estiver na `0.x`, mudanças incompatíveis sobem a versão menor. Registre as mudanças no [CHANGELOG.md](./CHANGELOG.md). A publicação no npm ainda não existe.

## Lacunas conhecidas

- Os ícones são um subconjunto da biblioteca do Figma; os demais entram sob demanda.
- Faltam os demais componentes do NogasDS (Avatar, Tag, Card, navegação e feed).
- O `Link` não tem integração com roteadores (por exemplo, o `Link` do Next.js); para navegação no cliente, use o `<a>` do componente dentro do roteador do produto.
