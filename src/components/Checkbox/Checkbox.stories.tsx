import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '../Link/Link';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Componentes/Checkbox',
  component: Checkbox,
  args: { label: 'Rótulo' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="sb-canvas">
      <Checkbox {...args} />
    </div>
  ),
};

/** Marcado × Padrão, Hover, Foco, Erro e Desabilitado. */
export const TodosOsEstados: Story = {
  parameters: {
    pseudo: {
      hover: ['.sb-hover .nds-checkbox__row'],
      focusVisible: ['.sb-focus .nds-checkbox__input'],
    },
  },
  render: () => {
    const states = [
      { key: 'Padrão', cls: '', props: {} },
      { key: 'Hover', cls: 'sb-hover', props: {} },
      { key: 'Foco', cls: 'sb-focus', props: {} },
      { key: 'Erro', cls: '', props: { error: 'Mensagem de erro.' } },
      { key: 'Desabilitado', cls: '', props: { disabled: true } },
    ];
    return (
      <div className="sb-canvas">
        {[false, true].map((checked) => (
          <section className="sb-section" key={String(checked)}>
            <h3>Marcado: {checked ? 'Sim' : 'Não'}</h3>
            <div className="sb-row">
              {states.map(({ key, cls, props }) => (
                <div className={`sb-cell ${cls}`} key={key} style={{ minWidth: 140 }}>
                  <Checkbox label="Rótulo" defaultChecked={checked} {...props} />
                  <small>{key}</small>
                </div>
              ))}
            </div>
          </section>
        ))}
        <section className="sb-section">
          <h3>Rótulo com links</h3>
          <Checkbox
            label={
              <>
                Li e aceito os <Link href="#termos" size="sm">termos de uso</Link> e a{' '}
                <Link href="#privacidade" size="sm">política de privacidade</Link>.
              </>
            }
          />
        </section>
      </div>
    );
  },
};
