# NogasDS

Design system **neutro e coringa** (tokens e componentes React), pensado para servir a qualquer produto. Escuro por padrão, sistema quadrado (raio 0, exceto `radius/full`), Inter com tracking apertado, hairlines e base de 4 px.

O **Figma é a fonte da verdade**: os tokens e componentes daqui seguem os arquivos do NogasDS no Figma (Primitives, Foundations, Components e Icons).

Versão atual: `0.9.0`. Ainda **não está publicado no npm**.

Catálogo online (Storybook): https://jobremote.github.io/nogasds/

## Componentes

Na `0.9.0` o catálogo cobre todos os componentes do Figma. Nomes e props em inglês; o nome em português do Figma aparece na documentação de cada prop.

| Grupo | Componentes |
| --- | --- |
| Botões | `Button` (6 variantes, incluindo Perigo, × 2 tamanhos, com ícone `leadingIcon` e `trailingIcon` opcionais), `IconButton` |
| Formulários | `TextField`, `TextArea`, `Select` (combo box), `DateField` + `DatePicker`, `MonthYearField`, `DurationField`, `Rating`, `CodeField`, `SearchField` |
| Seleção | `Checkbox`, `Radio`, `ChoiceCard`, `Switch`, `Tag` (com cor), `ColorPicker` |
| Feedback | `Banner`, `Toast`, `Badge`, `Modal` |
| Avatar | `Avatar` |
| Navegação | `Link`, `MenuItem`, `Menu` e `MenuOption`, `Tabs`, `TopBar` e `MobileTopBar`, `TabBar` |
| Conteúdo | `Card`, `Cover`, `ItemCard`, `BoardColumn`, `Stat` (destaque principal ou secundário), `ProfileSummary`, `SuggestedAccount`, `Promo`, `ResultItem` |
| Feed | `PostComposer`, `Post` e `PostAction` |
| Base | `Icon` (subconjunto dos ícones do Figma), `Logo` (logos de marca coloridos, hoje `google`) |

Todos têm os estados e variantes do Figma e foco visível; os de formulário têm rótulo associado, `aria-invalid` e descrição de ajuda ou erro. O catálogo online mostra cada estado.

## Usar em um produto

Enquanto não há publicação no npm, instale direto do GitHub (por tag) ou por vínculo local.

```bash
# Dependência do GitHub, travada em uma versão
npm install github:jobremote/nogasds#v0.5.0
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

[Versionamento semântico](https://semver.org/lang/pt-BR/), com **uma tag por versão** (`v0.2.0`). Enquanto estiver na `0.x`, mudanças incompatíveis sobem a versão menor. Registre as mudanças no [CHANGELOG.md](./CHANGELOG.md). A publicação no npm ainda não existe.

## Lacunas conhecidas

- Os ícones são um subconjunto da biblioteca do Figma (29 de 57); os demais entram sob demanda com `node scripts/import-icons.mjs <pasta>`.
- Os componentes de composição (`TopBar`, `Post`, `PostComposer`, `ProfileSummary`...) usam slots e textos genéricos; conteúdo e marca são do produto.
- `Select` usa o `<select>` nativo (a lista aberta ainda não existe no Figma).
- O `Link` não tem integração com roteadores (por exemplo, o `Link` do Next.js); para navegação no cliente, use o `<a>` do componente dentro do roteador do produto.
