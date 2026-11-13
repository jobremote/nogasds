import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import type { ButtonVariant } from '../Button/Button';
import { ButtonLink } from './ButtonLink';

const meta = {
  title: 'Componentes/Botões/Botão link',
  component: ButtonLink,
  args: { children: 'Ver detalhes', href: '#destino' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'danger-ghost'] },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <ButtonLink {...args} />
    </Canvas>
  ),
};

const variants: Array<[ButtonVariant, string]> = [
  ['primary', 'Primário'],
  ['secondary', 'Secundário'],
  ['outline', 'Contorno'],
  ['ghost', 'Fantasma'],
  ['danger', 'Perigo'],
  ['danger-ghost', 'Perigo fantasma'],
];

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Variantes (mesma aparência do Botão)">
        {variants.map(([variant, label]) => (
          <Cell key={variant} label={label}>
            <ButtonLink href="#destino" variant={variant}>
              Ver detalhes
            </ButtonLink>
          </Cell>
        ))}
      </Section>
      <Section title="Tamanhos">
        <Cell label="Médio">
          <ButtonLink href="#destino" variant="outline">
            Ver detalhes
          </ButtonLink>
        </Cell>
        <Cell label="Pequeno">
          <ButtonLink href="#destino" variant="outline" size="sm">
            Ver detalhes
          </ButtonLink>
        </Cell>
      </Section>
    </Canvas>
  ),
};
