import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { ItemCard } from './ItemCard';

const meta = {
  title: 'Componentes/Conteúdo/ItemCard (Card de jogo)',
  component: ItemCard,
  args: { title: 'Título do item', detail: 'Linha de apoio', rating: 4 },
} satisfies Meta<typeof ItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div className="sb-w320">
        <ItemCard {...args} />
      </div>
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Nota">
        <Cell label="Com nota" width={240}>
          <ItemCard {...meta.args} />
        </Cell>
        <Cell label="Sem nota" width={240}>
          <ItemCard title="Título do item" detail="Linha de apoio" />
        </Cell>
        <Cell label="Só título" width={240}>
          <ItemCard title="Título do item" />
        </Cell>
      </Section>
    </Canvas>
  ),
};
