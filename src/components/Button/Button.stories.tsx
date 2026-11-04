import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, type ButtonSize, type ButtonVariant } from './Button';

const meta = {
  title: 'Componentes/Botões/Botão',
  component: Button,
  args: { children: 'Botão' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline', 'ghost'] },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="sb-canvas">
      <Button {...args} />
    </div>
  ),
};

const variants: Array<[ButtonVariant, string]> = [
  ['primary', 'Primário'],
  ['secondary', 'Secundário'],
  ['outline', 'Contorno'],
  ['ghost', 'Fantasma'],
];
const sizes: Array<[ButtonSize, string]> = [
  ['md', 'Médio'],
  ['sm', 'Pequeno'],
];

/** Todas as variantes × tamanhos × estados (padrão, hover, foco, desabilitado). */
export const TodosOsEstados: Story = {
  parameters: {
    pseudo: {
      hover: ['.sb-hover .nds-button'],
      focusVisible: ['.sb-focus .nds-button'],
    },
  },
  render: () => (
    <div className="sb-canvas">
      {variants.map(([variant, variantLabel]) => (
        <section className="sb-section" key={variant}>
          <h3>{variantLabel}</h3>
          {sizes.map(([size, sizeLabel]) => (
            <div className="sb-row" key={size} style={{ marginBottom: 16 }}>
              <div className="sb-cell">
                <Button variant={variant} size={size}>Botão</Button>
                <small>{sizeLabel} · Padrão</small>
              </div>
              <div className="sb-cell sb-hover">
                <Button variant={variant} size={size}>Botão</Button>
                <small>{sizeLabel} · Hover</small>
              </div>
              <div className="sb-cell sb-focus">
                <Button variant={variant} size={size}>Botão</Button>
                <small>{sizeLabel} · Foco</small>
              </div>
              <div className="sb-cell">
                <Button variant={variant} size={size} disabled>Botão</Button>
                <small>{sizeLabel} · Desabilitado</small>
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
};
