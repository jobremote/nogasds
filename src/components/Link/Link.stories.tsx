import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';

const meta = {
  title: 'Componentes/Navegação/Link',
  component: Link,
  args: { children: 'Ver detalhes', href: '#' },
  argTypes: { size: { control: 'inline-radio', options: ['md', 'sm'] } },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="sb-canvas">
      <Link {...args} />
    </div>
  ),
};

export const TodosOsEstados: Story = {
  parameters: {
    pseudo: { hover: ['.sb-hover .nds-link'], focusVisible: ['.sb-focus .nds-link'] },
  },
  render: () => (
    <div className="sb-canvas">
      {([['md', 'Médio'], ['sm', 'Pequeno']] as const).map(([size, label]) => (
        <section className="sb-section" key={size}>
          <h3>{label}</h3>
          <div className="sb-row">
            <div className="sb-cell">
              <Link href="#" size={size}>Ver detalhes</Link>
              <small>Padrão</small>
            </div>
            <div className="sb-cell sb-hover">
              <Link href="#" size={size}>Ver detalhes</Link>
              <small>Hover</small>
            </div>
            <div className="sb-cell sb-focus">
              <Link href="#" size={size}>Ver detalhes</Link>
              <small>Foco</small>
            </div>
            <div className="sb-cell">
              <Link href="#" size={size} disabled>Ver detalhes</Link>
              <small>Desabilitado</small>
            </div>
          </div>
        </section>
      ))}
    </div>
  ),
};
