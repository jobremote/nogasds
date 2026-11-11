import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import { Button, type ButtonSize, type ButtonVariant } from './Button';

const meta = {
  title: 'Componentes/Botões/Botão',
  component: Button,
  args: { children: 'Botão' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'danger-ghost'] },
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
  ['danger', 'Perigo'],
  ['danger-ghost', 'Perigo fantasma'],
];
const sizes: Array<[ButtonSize, string]> = [
  ['md', 'Médio'],
  ['sm', 'Pequeno'],
];

/** Lead e trailing: ícone antes e/ou depois do texto, nas 4 variantes e 2 tamanhos. No Figma são os booleanos Lead e Trailing. */
export const ComIcones: Story = {
  render: () => (
    <div className="sb-canvas">
      {variants.map(([variant, variantLabel]) => (
        <section className="sb-section" key={variant}>
          <h3>{variantLabel}</h3>
          {sizes.map(([size, sizeLabel]) => (
            <div className="sb-row" key={size} style={{ marginBottom: 16 }}>
              <div className="sb-cell">
                <Button variant={variant} size={size} leadingIcon={<Icon name="add" />}>Lead</Button>
                <small>{sizeLabel} · Lead</small>
              </div>
              <div className="sb-cell">
                <Button variant={variant} size={size} trailingIcon={<Icon name="arrow-forward" />}>Trailing</Button>
                <small>{sizeLabel} · Trailing</small>
              </div>
              <div className="sb-cell">
                <Button variant={variant} size={size} leadingIcon={<Icon name="add" />} trailingIcon={<Icon name="chevron-right" />}>
                  Ambos
                </Button>
                <small>{sizeLabel} · Lead e trailing</small>
              </div>
              <div className="sb-cell">
                <Button variant={variant} size={size} leadingIcon={<Icon name="add" />} trailingIcon={<Icon name="chevron-right" />} disabled>
                  Desabilitado
                </Button>
                <small>{sizeLabel} · Desabilitado</small>
              </div>
            </div>
          ))}
        </section>
      ))}
      <section className="sb-section">
        <h3>Com logo de marca</h3>
        <div className="sb-row">
          <div className="sb-cell">
            <Button variant="outline" leadingIcon={<Logo name="google" />}>Continuar com Google</Button>
            <small>Contorno · Médio · Lead com Logo</small>
          </div>
        </div>
      </section>
    </div>
  ),
};

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
