import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { Badge } from '../Badge/Badge';
import { MediaTag } from './MediaTag';

const meta = {
  title: 'Componentes/Feedback/MediaTag',
  component: MediaTag,
  args: { children: 'Item de exemplo' },
} satisfies Meta<typeof MediaTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <MediaTag {...args} />
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Variações (Figma: Marca de jogo)">
        <Cell label="Sem link">
          <MediaTag>Item de exemplo</MediaTag>
        </Cell>
        <Cell label="Com link">
          <MediaTag href="#item">Item de exemplo</MediaTag>
        </Cell>
        <Cell label="Com status">
          <Badge tone="info">Em andamento</Badge>
          <MediaTag href="#item">Item de exemplo</MediaTag>
        </Cell>
      </Section>
    </Canvas>
  ),
};
