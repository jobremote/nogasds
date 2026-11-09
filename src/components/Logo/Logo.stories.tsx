import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { Icon } from '../Icon/Icon';
import { Logo } from './Logo';

const meta = {
  title: 'Componentes/Base/Logo de marca',
  component: Logo,
  args: { name: 'google', size: 24 },
  argTypes: {
    name: { control: 'inline-radio', options: ['google'] },
    size: { control: { type: 'number', min: 12, max: 96, step: 4 } },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <Logo {...args} label="Google" />
    </Canvas>
  ),
};

export const Tamanhos: Story = {
  render: () => (
    <Canvas>
      <Section title="Logo de marca (cores fixas)">
        {[16, 20, 24, 32, 48].map((size) => (
          <Cell key={size} label={`${size} px`}>
            <Logo name="google" size={size} />
          </Cell>
        ))}
      </Section>
    </Canvas>
  ),
};

export const IconeDeVisibilidade: Story = {
  name: 'Ícones de visibilidade (mostrar/ocultar)',
  render: () => (
    <Canvas>
      <Section title="Herdam a cor do texto">
        <Cell label="visibility">
          <Icon name="visibility" size={32} />
        </Cell>
        <Cell label="visibility-off">
          <Icon name="visibility-off" size={32} />
        </Cell>
      </Section>
    </Canvas>
  ),
};
