import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { ItemCard } from '../ItemCard/ItemCard';
import { BoardColumn } from './BoardColumn';

const meta = {
  title: 'Componentes/Conteúdo/BoardColumn (Coluna do Game Shelf)',
  component: BoardColumn,
  args: { title: 'Título da coluna', count: 2, emptyMessage: 'Nenhum item aqui ainda.' },
} satisfies Meta<typeof BoardColumn>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  <ItemCard key="a" title="Título do item" detail="Linha de apoio" rating={4} />,
  <ItemCard key="b" title="Outro item" detail="Linha de apoio" />,
];

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div className="sb-w320">
        <BoardColumn {...args}>{items}</BoardColumn>
      </div>
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Estado">
        <Cell label="Com itens" width={256}>
          <BoardColumn {...meta.args}>{items}</BoardColumn>
        </Cell>
        <Cell label="Vazia" width={256}>
          <BoardColumn {...meta.args} count={0} />
        </Cell>
      </Section>
    </Canvas>
  ),
};
