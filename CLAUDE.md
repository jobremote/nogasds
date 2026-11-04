# CLAUDE.md

Guia para agentes (e pessoas) que mexem no NogasDS. Idioma de trabalho: **pt-BR** (docs, mensagens de commit, nomes de histórias e rótulos de exemplo). Identificadores de código (props, componentes, arquivos) ficam em inglês.

## O que é

NogasDS é um design system **neutro e coringa** em código (React + TypeScript), que serve a qualquer produto do Leo. Não pertence a nenhum produto.

**Regra de ouro:** nunca coloque nome, texto, regra ou cor de produto em tokens, componentes, exemplos, testes ou docs. Textos de exemplo são genéricos ("Rótulo", "Digite aqui", "Ver detalhes").

## Princípios visuais

- Escuro por padrão, com tema claro. Sistema **quadrado**: raio 0 (`--nds-radius-none`), exceto `--nds-radius-full`.
- Inter com tracking apertado, hairlines (`--nds-stroke-hairline`, 1 px), foco de 2 px (`--nds-stroke-strong`). Base de 4 px.
- Cores de apoio (vinho, petróleo, oliva, rosa, céu) só como apoio, nunca protagonistas.

## Figma é a fonte da verdade

Pasta "NogasDS" no Figma:

| Arquivo | Chave | Conteúdo |
| --- | --- | --- |
| Primitives | `TOvBQ2LciGTyOBWhOcDIxf` | cores (46) e Dimensions |
| Foundations | `hp0rXAR5c4j4jjhLXc5230` | coleção Semantic (modos Escuro e Claro) e 13 text styles |
| Components | `S62S90kVvOdQo25zBvG2Gr` | componentes por página |
| Icons | `hkfQRR9V1xoU2db1uVV9C8` | ícones Material Symbols `icon/<nome>` |

Antes de criar ou alterar token ou componente, leia o Figma (Figma MCP: `get_design_context`, `get_variable_defs`, `get_screenshot`) e compare por captura com o Storybook. Se o Figma tiver uma lacuna ou inconsistência, **não improvise em silêncio**: implemente o mais coerente, documente em "Lacunas" abaixo e avise o Leo.

Regra de camadas: componentes só usam tokens **Semantic** e **Dimensions**, nunca primitivos nem valores soltos.

## Estrutura

```
src/
  styles/tokens.css       Semantic (escuro/claro) e Dimensions
  styles/typography.css   13 text styles de Inter
  components/<Nome>/      <Nome>.tsx, <nome>.css, <Nome>.stories.tsx, <Nome>.test.tsx
  components/Icon/icons.json   `d` dos SVGs exportados do Figma (import: scripts/import-icons.mjs)
  docs/                   páginas MDX do Storybook (Introdução, Fundamentos) e seus blocos; leem os tokens dos CSS, não entram no pacote
  index.ts                API pública (único ponto de entrada)
.storybook/               catálogo (fundo escuro do sistema, alternador de tema)
```

## Convenções

- **Tokens:** variável CSS `--nds-<nome-do-figma-com-hifen>` (`surface/base` → `--nds-surface-base`). Tema claro via `[data-theme='light']`.
- **Estilos:** CSS puro por componente, classes `nds-<componente>`, modificadores `nds-<componente>--<variante>`, elementos `nds-<componente>__<parte>`. Sem Tailwind, CSS-in-JS ou qualquer lib de estilos que obrigue o produto a usar o mesmo. Text styles: `font: var(--nds-type-x); letter-spacing: var(--nds-type-x-tracking);`.
- **Nomes de props:** variantes em inglês (`primary`, `outline`, `md`, `sm`, `error`), mapeadas aos nomes em português do Figma no comentário da prop.
- **Acessibilidade (obrigatória):** rótulo associado (`label`/`htmlFor` ou `aria-labelledby`), foco visível (`:focus-visible`, anel de 2 px), estados `disabled` nativos, erro com `aria-invalid` e mensagem ligada por `aria-describedby`. `forwardRef` nos componentes que envolvem elemento nativo.
- **Estados:** todo estado e variante do Figma tem que existir no código e na história `TodosOsEstados`. Hover e foco aparecem no Storybook pelo addon `storybook-addon-pseudo-states`.
- **Testes:** um `.test.tsx` por componente, com comportamento (clique, teclado, controlado) e `jest-axe` sem violações.
- **Documentação:** páginas em `src/docs/*.mdx`. Os blocos leem os valores de `tokens.css` e `typography.css`, então não repita valores de token à mão. Estilos de bloco ficam prefixados com `.sbdocs-content` para vencer o CSS padrão do Storybook. O tema da interface está em `.storybook/theme.ts`.
- **Ícones:** vêm da biblioteca Icons do Figma, exportados como SVG para `src/components/Icon/icons.json` com `node scripts/import-icons.mjs <pasta>`. Não desenhe ícone solto.

## Comandos

```bash
npm run storybook   # catálogo em :6006
npm run check       # lint + typecheck + testes + build (igual ao CI)
```

## Versionamento e Git

- Semver, uma tag por versão (`vX.Y.Z`). Antes de criar a tag, no mesmo PR: suba `version` no `package.json` (e no lockfile, com `npm install --package-lock-only`) e escreva a seção `
- Commits em branches próprias; PR para `main`. O CI roda lint, tipos, testes e build.
- O repositório é **público**: nunca coloque senha, chave ou token no código.
- **Pergunte ao Leo antes** de: push, abrir PR, publicar no npm ou criar qualquer coisa pública.
- Não publicar no npm ainda (decisão do Leo). Os produtos consomem por dependência do GitHub (por tag) ou vínculo local.

## Dependências: atenção

- Storybook 9 + Vite 7 de propósito: o Storybook 10 depende de `oxc-resolver`, que exige o runtime do Visual C++ no Windows e não carrega em máquinas sem ele. Só suba para Storybook 10 / Vite 8 quando isso não for problema.
- ESLint fica na 9 enquanto `eslint-plugin-jsx-a11y` não suportar a 10.

## Lacunas conhecidas do Figma (não resolvidas aqui)

- **Link Pequeno** usa o mesmo text style do Médio (`Texto/body`). No código, o `sm` usa `Texto/small`. Confirmar com o Leo.
- **Banner** usa glifos de texto (`i`, `✓`, `!`) dentro de um círculo; no código usa os ícones `info`, `check-circle` e `error` da biblioteca (visual equivalente).
- **Checkbox**: não há estado indeterminado, nem Hover/Foco com Erro; o código aplica Erro por cima dos demais estados.
- **Campo de código**: os estados cobrem só a primeira caixa em Foco; o código aplica o foco à caixa ativa. Não há desenho para colar/preenchimento parcial.
- **Contorno** muda de altura entre os estados (46 px com borda, 44 px em foco no Figma); o código mantém a borda, então a altura não muda.
- Ícones: só um subconjunto está exportado para o pacote.
- **Texto e marca de produto no Figma:** Top bar e Top bar mobile trazem a marca de um produto e a busca fala em "jogos e pessoas"; Tab bar tem a aba "Jogos"; Stat, Perfil, Conta sugerida, Anúncio, Criar post, Post e Combo box/Multilinha usam exemplos de um produto. No código tudo isso é slot ou texto genérico. Vale neutralizar os exemplos no Figma.
- **Seletor de data:** o cabeçalho usa os glifos de texto ‹ e ›; o código usa os ícones `chevron-left` e `chevron-right`. Dias desabilitados aparecem só com a cor de texto desabilitado.
- **Tag:** não há desenho de Foco nem de Desabilitado; o código usa o anel de foco padrão e as cores de desabilitado dos demais controles. **Avatar:** o estilo Imagem não tem foto de exemplo.
- **Escala de 4 px:** Top bar usa padding horizontal de 60 px e espaço de 40 px entre marca, busca e ações, fora da escala (`space/*`). O código mantém os valores do Figma.
- **Switch:** o Figma desenha trilho e botão quadrados (sem `radius/full`); o código segue o Figma.
- **Aba selecionada:** 46 px de altura (traço de 2 px por fora) contra 44 px das demais; o código mantém 44 px com o traço dentro.
- **Combo box:** só existe o campo fechado. O código usa o `<select>` nativo.
- **Ações do Post:** os ícones de curtir, comentar e compartilhar aparecem mais apagados no Figma; o código usa a cor do botão Fantasma.
- **Card:** o estado Hover existe no Figma mesmo para card estático; o código só aplica hover com `interactive`.
