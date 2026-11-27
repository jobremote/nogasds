import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Section } from '../../docs/story-layout';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { DataList, DataRow } from '../DataList/DataList';
import { Thumbnail } from '../Thumbnail/Thumbnail';
import { MediaHero } from './MediaHero';

const pixel = (color: string) =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9"><rect width="16" height="9" fill="${encodeURIComponent(color)}"/></svg>`;

const meta = {
  title: 'Componentes/Conteúdo/Página de mídia',
  component: MediaHero,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Título da mídia',
    meta: '2018 · Plataforma A, Plataforma B',
    credits: 'Criação: Estúdio A · Distribuição: Estúdio B',
  },
} satisfies Meta<typeof MediaHero>;

export default meta;
type Story = StoryObj<typeof meta>;

const badges = (
  <>
    <Badge>Categoria</Badge>
    <Badge>Categoria</Badge>
  </>
);

export const ComImagem: Story = {
  args: {
    backgroundSrc: pixel('#5a1a22'),
    cover: <img src={pixel('#0e3a4a')} alt="Capa" />,
    badges,
    actions: (
      <>
        <Badge tone="success">Status</Badge>
        <Button variant="outline" size="sm">
          Editar
        </Button>
      </>
    ),
  },
};

export const CorSolida: Story = {
  args: { cover: <img src={pixel('#0e3a4a')} alt="Capa" />, badges, actions: <Button>Adicionar</Button> },
};

export const LinhasEMiniaturas: Story = {
  render: () => (
    <Canvas>
      <Section title="DataList (Linha de dado)">
        <DataList style={{ width: 272 }}>
          <DataRow label="Rápido" value="10 h 38 min" />
          <DataRow label="Normal" value="21 h 15 min" />
          <DataRow label="100%" value={null} />
        </DataList>
      </Section>
      <Section title="Thumbnail (Miniatura)">
        <div className="sb-row">
          <Thumbnail style={{ width: 200 }} src={pixel('#0e3a4a')} alt="Imagem" onOpen={() => {}} />
          <Thumbnail style={{ width: 200 }} src={pixel('#0e3a4a')} alt="Imagem com spoiler" spoiler onOpen={() => {}} />
        </div>
      </Section>
    </Canvas>
  ),
};
