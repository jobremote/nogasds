import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { Badge, type BadgeTone } from './Badge';

const meta = {
  title: 'Componentes/Feedback/Badge',
  component: Badge,
  args: { children: 'Badge' },
  argTypes: { tone: { control: 'select', options: ['neutral', 'info', 'success', 'error', 'rose', 'sky'] } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <Badge {...args} />
    </Canvas>
  ),
};

const tones: Array<[BadgeTone, string]> = [
  ['neutral', 'Neutro'],
  ['info', 'Informação'],
  ['success', 'Sucesso'],
  ['error', 'Erro'],
  ['rose', 'Rosa'],
  ['sky', 'Céu'],
];

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Tipos">
        {tones.map(([tone, label]) => (
          <Cell key={tone} label={label}>
            <Badge tone={tone}>Badge</Badge>
          </Cell>
        ))}
      </Section>
    </Canvas>
  ),
};
