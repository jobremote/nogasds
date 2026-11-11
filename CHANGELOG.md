# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/). Versionamento [semântico](https://semver.org/lang/pt-BR/).

## [0.11.0] - 2026-11-12

### Adicionado
- `BoardColumn` ganha `action`: espaço no cabeçalho, depois da contagem, para um botão da coluna (por exemplo, "Adicionar jogo").
- `Cover` ganha `positionY` (0 a 100, padrão 50): enquadramento vertical da imagem de capa, para o produto deixar a pessoa posicionar a imagem.

## [0.10.0] - 2026-11-11

### Adicionado
- `ScreenshotField` (Figma: **Área de screenshot**): área para enviar uma imagem, com prévia, "Trocar imagem" e "Remover imagem", estado de envio, texto de ajuda e erro. Só aceita JPG, PNG e WebP no seletor; o envio em si é de quem usa.
- `SpoilerGuard`: esconde um conteúdo com spoiler (imagem ou texto) atrás de um aviso e do botão "Mostrar". Escondido, o conteúdo fica desfocado e fora do alcance de leitor de tela e de foco.

## [0.9.0] - 2026-11-11

### Adicionado
- `Tag` ganha a prop `color` (Figma: **Cor**): Neutro (padrão), Vinho, Petróleo, Oliva, Rosa e Céu. Usa os tokens de bloco e de acento.
- `ColorPicker` (Figma: **Seletor de cor**): escolha única entre as 6 cores de tag, com o nome de cada cor para leitor de tela e setas do teclado. Exporta `COLOR_LABELS`.
- `ItemCard` ganha `tags` (Figma: **Tags** no Card de jogo): etiquetas só de leitura, com cor, abaixo da nota.

## [0.8.0] - 2026-11-11

### Adicionado
- `MonthYearField` (Figma: **Campo de mês/ano**): data só com mês e ano, em dois campos que podem ficar vazios. Com `name`, envia `<name>Month` e `<name>Year`.
- `DurationField` (Figma: **Campo de tempo**): tempo em horas e minutos (minutos até 59). Com `name`, envia `<name>Hours` e `<name>Minutes`.
- `Button` ganha as variantes `danger` (Perigo) e `danger-ghost` (Perigo fantasma), para ações destrutivas. Usam os tokens de status de erro; o sistema ainda não tem tokens próprios de ação de perigo.
- `Tabs`: `filled` em cada aba (Figma: **Preenchido**) mostra um ponto e avisa o leitor de tela ("preenchida").

## [0.7.0] - 2026-11-11

### Adicionado
- `Toast` (Figma: **Toast**): aviso temporário de uma ação, em Informação, Sucesso ou Erro, com botão de fechar opcional (`onClose`). Só desenha o aviso; posição e fechamento automático ficam com quem usa.
- `Menu` e `MenuOption`: botão que abre uma lista de ações. Fecha com Esc, clique fora ou ao escolher uma opção; setas, Home e End percorrem as opções. `MenuOption` aceita ícone e `danger` (ação destrutiva).
- `ResultItem` (Figma: **Resultado de jogo**): linha de resultado de busca com capa, título, apoio e uma ação à direita (botão ou selo de status).
- `Menu` vira folha presa embaixo da tela em telas estreitas (até 640 px), sem ser cortado por áreas com rolagem.
- `ChoiceCard` (Figma: **Opção de status**): escolha única em formato de cartão, com título e descrição.

## [0.6.0] - 2026-11-10

### Adicionado
- `Cover` (Figma: **Capa**): faixa de capa de página ou perfil. Cor sólida por padrão, `src` para a imagem e `placeholder` para o espaço da imagem. 200 px de altura no desktop e 120 px em telas estreitas (até 640 px).
- `ItemCard` (Figma: **Card de jogo**): item compacto com miniatura, título, apoio e nota opcional (1 a 5).
- `BoardColumn` (Figma: **Coluna do Game Shelf**): coluna de quadro kanban, com título, contagem total, itens em lista e mensagem de coluna vazia.
- `Modal` (Figma: **Modal cabeçalho** e **Modal rodapé**): diálogo sobre o conteúdo com o `<dialog>` nativo (foco preso, Esc e clique no fundo chamam `onClose`). Em telas estreitas ocupa a tela inteira.
- `TopBar`: variáveis opcionais `--nds-top-bar-content-width` e `--nds-top-bar-gutter` para alinhar a marca e as ações às bordas da coluna de conteúdo da página (a barra continua em largura total, com a borda inferior de ponta a ponta). Sem elas, as laterais seguem em 60 px, como antes.
- Ícone `edit` (lápis).
- `Stat` ganha a prop `emphasis` (Figma: **Destaque**): `primary` (padrão, igual ao de antes) e `secondary`, com número menor (`lead`), leve e em cor secundária, para contadores de apoio. No Figma, o Stat virou um conjunto de variantes.

## [0.5.0] - 2026-11-09

### Adicionado
- Tokens semânticos de **Layout** (coleção Layout do Foundations no Figma): `--nds-space-gap-*` e `--nds-space-inset-*` (xs a 5xl, 4 a 96 px), `--nds-radius-default` e `--nds-radius-round`, `--nds-stroke-default`, `--nds-stroke-focus` e `--nds-stroke-emphasis`, `--nds-size-nav-height`. Todos apontam para os primitivos de Dimensions.
- Teste de camadas (`src/styles/tokens.test.ts`): barra primitivos de Dimensions em componentes, histórias e docs.
- `TextField` com ícone no fim do campo: prop `trailingIcon`. No Figma, o Campo de texto ganhou o booleano **Trailing** e a troca **Ícone trailing** (padrão `icon/visibility`, 20 px, cor secundária; desabilitado na cor de desabilitado) nas 10 variantes. Para mostrar/ocultar senha, passe um `<IconButton size="sm" />` com nome acessível e `aria-pressed`. Histórias `ComIconeTrailing` e `Senha`.

### Alterado
- Todos os componentes, histórias e docs passam a usar os tokens semânticos de Layout. Nenhuma mudança visual: os valores são os mesmos.
- A página "Espaço e forma" do Storybook mostra os tokens semânticos e o primitivo de origem de cada um.
- Regra de camadas: Primitives, depois Foundations, depois componentes. Os primitivos de Dimensions ficam só em `tokens.css`, como origem dos tokens de Layout.

- **Quebra:** `TextField` troca a prop `endSlot` por `trailingIcon`, alinhada ao Figma (o `endSlot` nasceu só no código). `DateField` já usa a nova prop. Nenhum produto consome o pacote ainda.

### Removido da API de uso
- Quem consome o pacote não deve mais usar `--nds-space-N`, `--nds-radius-none|full`, `--nds-stroke-hairline|strong` nem `--nds-layout-nav-height`. Os nomes continuam existindo em `tokens.css`, mas são primitivos: use os de Layout.

## [0.4.0] - 2026-11-09

### Adicionado
- `Button` aceita ícone antes e depois do texto: props `leadingIcon` e `trailingIcon` (um `<Icon>` ou `<Logo>`). No Figma são os booleanos **Lead** e **Trailing**, com as trocas **Ícone lead** e **Ícone trailing**, nas 32 variantes do Botão. Espaço de 8 px (`space/2`) entre ícone e texto; ícone de 20 px no médio e 16 px no pequeno, herdando a cor do texto (inclusive hover e desabilitado).
- História `ComIcones` no Storybook, com o caso de logo de marca.

## [0.3.0] - 2026-11-09

### Adicionado
- Ícone `visibility-off` (olho riscado), par do `visibility`, para alternar mostrar/ocultar senha.
- Componente `Logo` com o logo `google` (G colorido, cores fixas), vindo de `logo/google` no arquivo Icons do Figma. Logos de marca ficam separados dos ícones porque não herdam a cor do texto.
- `scripts/import-icons.mjs` passa a importar `logo-<nome>.svg` para `src/components/Logo/logos.json`, guardando o `fill` de cada path.

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
