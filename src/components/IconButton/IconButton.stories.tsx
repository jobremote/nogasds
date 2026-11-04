import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import type { ButtonSize, ButtonVariant } from '../Button/Button';
import { IconButton } from './IconButton';

const meta = {
  title: 'Componentes/Botões/Botão de ícone',
  component: IconButton,
  args: { icon: 'add', label: 'Adicionar' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline', 'ghost'] },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <IconButton {...args} />
    </Canvas>
  ),
};

const variants: Array<[ButtonVariant, string]> = [
  ['primary', 'Primário'],
  ['secondary', 'Secundário'],
  ['outline', 'Contorno'],
  ['ghost', 'Fantasma'],
];

export const TodosOsEstados: Story = {
  parameters: { pseudo: { hover: ['.sb-hover .nds-button'], focusVisible: ['.sb-focus .nds-button'] } },
  render: () => (
    <Canvas>
      {variants.flatMap(([variant, name]) =>
        (['md', 'sm'] as ButtonSize[]).map((size) => (
          <Section key={`${variant}-${size}`} title={`${name} · ${size === 'md' ? 'Médio' : 'Pequeno'}`}>
            <Cell label="Padrão">
              <IconButton icon="add" label="Adicionar" variant={variant} size={size} />
            </Cell>
            <Cell label="Hover" hover>
              <IconButton icon="add" label="Adicionar" variant={variant} size={size} />
            </Cell>
            <Cell label="Foco" focus>
              <IconButton icon="add" label="Adicionar" variant={variant} size={size} />
            </Cell>
            <Cell label="Desabilitado">
              <IconButton icon="add" label="Adicionar" variant={variant} size={size} disabled />
            </Cell>
          </Section>
        )),
      )}
    </Canvas>
  ),
};
