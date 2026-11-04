import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeField } from './CodeField';

const meta = {
  title: 'Componentes/Campo de código',
  component: CodeField,
  args: { label: 'Código de verificação', helpText: 'Texto de ajuda opcional.' },
} satisfies Meta<typeof CodeField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Interativo: digite, use backspace, setas ou cole o código inteiro. */
export const Playground: Story = {
  render: (args) => (
    <div className="sb-canvas">
      <CodeField {...args} />
    </div>
  ),
};

/** Padrão, Foco, Erro e Desabilitado × Preenchido (Não/Sim). */
export const TodosOsEstados: Story = {
  parameters: {
    pseudo: { focus: ['.sb-focus .nds-code-field__box:first-child'] },
  },
  render: () => {
    const states = [
      { key: 'Padrão', cls: '', props: {} },
      { key: 'Foco', cls: 'sb-focus', props: {} },
      { key: 'Erro', cls: '', props: { error: 'Texto de ajuda opcional.' } },
      { key: 'Desabilitado', cls: '', props: { disabled: true } },
    ];
    return (
      <div className="sb-canvas">
        {[false, true].map((filled) => (
          <section className="sb-section" key={String(filled)}>
            <h3>Preenchido: {filled ? 'Sim' : 'Não'}</h3>
            <div className="sb-row">
              {states.map(({ key, cls, props }) => (
                <div className={`sb-cell ${cls}`} key={key}>
                  <CodeField
                    label="Código de verificação"
                    helpText="Texto de ajuda opcional."
                    defaultValue={filled ? '123456' : ''}
                    {...props}
                  />
                  <small>{key}</small>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  },
};
