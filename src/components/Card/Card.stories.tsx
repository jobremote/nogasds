import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { Icon } from '../Icon/Icon';
import { Card } from './Card';

const meta = {
  title: 'Componentes/Conteúdo/Card',
  component: Card,
  args: {
    eyebrow: 'Categoria',
    title: 'Título do card',
    children: 'Descrição curta com uma ou duas linhas de apoio ao título.',
    action: 'Ver detalhes',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div className="sb-w320">
        <Card {...args} interactive />
      </div>
    </Canvas>
  ),
};

const media = <Icon name="image" size={24} />;

export const TodosOsEstados: Story = {
  parameters: { pseudo: { hover: ['.sb-hover .nds-card'] } },
  render: () => (
    <Canvas>
      {[false, true].map((withMedia) => (
        <Section key={String(withMedia)} title={`Imagem: ${withMedia ? 'Sim' : 'Não'}`}>
          <Cell label="Padrão" width={320}>
            <Card interactive {...meta.args} media={withMedia ? media : undefined} />
          </Cell>
          <Cell label="Hover" hover width={320}>
            <Card interactive {...meta.args} media={withMedia ? media : undefined} />
          </Cell>
        </Section>
      ))}
    </Canvas>
  ),
};
