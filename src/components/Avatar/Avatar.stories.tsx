import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { Avatar, type AvatarSize, type AvatarTone } from './Avatar';

const meta = {
  title: 'Componentes/Avatar/Avatar',
  component: Avatar,
  args: { name: 'Pessoa Exemplo' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['neutral', 'wine', 'petrol', 'olive'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <Avatar {...args} />
    </Canvas>
  ),
};

const tones: Array<[AvatarTone, string]> = [
  ['neutral', 'Neutro'],
  ['wine', 'Vinho'],
  ['petrol', 'Petróleo'],
  ['olive', 'Oliva'],
];
const sizes: Array<[AvatarSize, string]> = [
  ['sm', 'Pequeno · 32'],
  ['md', 'Médio · 40'],
  ['lg', 'Grande · 56'],
];

const photo =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='112' height='112'><rect width='112' height='112' fill='%23595959'/><circle cx='56' cy='44' r='20' fill='%23a8a8a8'/><rect x='20' y='72' width='72' height='40' fill='%23a8a8a8'/></svg>";

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      {tones.map(([tone, label]) => (
        <Section key={tone} title={label}>
          {sizes.map(([size, sizeLabel]) => (
            <Cell key={size} label={sizeLabel}>
              <Avatar name="Pessoa Exemplo" tone={tone} size={size} />
            </Cell>
          ))}
        </Section>
      ))}
      <Section title="Imagem">
        {sizes.map(([size, sizeLabel]) => (
          <Cell key={size} label={sizeLabel}>
            <Avatar name="Pessoa Exemplo" src={photo} size={size} />
          </Cell>
        ))}
      </Section>
    </Canvas>
  ),
};
