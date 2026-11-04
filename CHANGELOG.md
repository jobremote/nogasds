# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/). Versionamento [semântico](https://semver.org/lang/pt-BR/).

## [0.2.0] - 2026-11-04

### Adicionado
- Componentes que faltavam do Figma: `IconButton`, `Badge`, `TextArea`, `Select`, `DateField`, `DatePicker`, `Rating`, `Radio`, `Switch`, `Tag`, `Avatar`, `MenuItem`, `Tabs`, `TopBar`, `MobileTopBar`, `TabBar`, `SearchField`, `Card`, `Stat`, `ProfileSummary`, `SuggestedAccount`, `Promo`, `PostComposer`, `Post` e `PostAction`.
- Storybook com tema próprio (marca NogasDS), página de Introdução e Fundamentos (Cor, Tipografia, Espaço e forma); histórias agrupadas como as páginas do Figma.
- 29 ícones (eram 16) e `scripts/import-icons.mjs` para importar SVGs do Figma.
- Workflow de release: confere tag, versão e CHANGELOG, roda a verificação e cria a release no GitHub.

### Alterado
- O bundle começa com `"use client"` (necessário no Next.js App Router) e o pacote declara `engines.node >= 20`.
- Os dados dos ícones passam para `icons.json`.

### Corrigido
- O ícone `check-circle` tinha um erro de digitação em um ponto do traçado.

## [0.1.0] - 2026-11-04

Primeira entrega.

### Adicionado
- Tokens como variáveis CSS: Semantic (tema escuro padrão e claro), Dimensions e os 13 text styles de Inter.
- Componentes: `Button`, `TextField`, `Checkbox`, `CodeField`, `Banner`, `Link` e `Icon` (subconjunto da biblioteca de ícones).
- Catálogo no Storybook, testes (Vitest, Testing Library, jest-axe) e CI de verificação em pull request.
