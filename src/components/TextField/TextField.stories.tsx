import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { TextField } from './TextField';

const meta = {
  title: 'Componentes/Formulários/Campo de texto',
  component: TextField,
  args: { label: 'Rótulo', placeholder: 'Digite aqui', helpText: 'Texto de ajuda opcional.' },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="sb-canvas">
      <div className="sb-w320">
        <TextField {...args} />
      </div>
    </div>
  ),
};

/** Trailing: ícone no fim do campo (no Figma, o booleano Trailing e a troca Ícone trailing). Em todos os estados. */
export const ComIconeTrailing: Story = {
  parameters: {
    pseudo: {
      hover: ['.sb-hover .nds-text-field__control'],
      focusWithin: ['.sb-focus .nds-text-field__control'],
    },
  },
  render: () => {
    const states = [
      { key: 'Padrão', cls: '', props: {} },
      { key: 'Hover', cls: 'sb-hover', props: {} },
      { key: 'Foco', cls: 'sb-focus', props: {} },
      { key: 'Erro', cls: '', props: { error: 'Campo obrigatório.' } },
      { key: 'Desabilitado', cls: '', props: { disabled: true } },
    ];
    return (
      <div className="sb-canvas">
        <section className="sb-section">
          <h3>Trailing com ícone</h3>
          <div className="sb-row">
            {states.map(({ key, cls, props }) => (
              <div className={`sb-cell sb-w320 ${cls}`} key={key}>
                <TextField
                  label="Rótulo"
                  placeholder="Digite aqui"
                  helpText="Texto de ajuda opcional."
                  trailingIcon={<Icon name="visibility" />}
                  {...props}
                />
                <small>{key}</small>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  },
};

/** Mostrar/ocultar senha: o trailing é um botão de ícone com nome acessível e `aria-pressed`. */
export const Senha: Story = {
  render: () => {
    function Password() {
      const [visible, setVisible] = useState(false);
      return (
        <TextField
          label="Senha"
          placeholder="Digite a senha"
          type={visible ? 'text' : 'password'}
          trailingIcon={
            <IconButton
              size="sm"
              icon={visible ? 'visibility-off' : 'visibility'}
              label={visible ? 'Ocultar senha' : 'Mostrar senha'}
              aria-pressed={visible}
              onClick={() => setVisible((v) => !v)}
            />
          }
        />
      );
    }
    return (
      <div className="sb-canvas">
        <div className="sb-w320">
          <Password />
        </div>
      </div>
    );
  },
};

/** Estados × Preenchido (Não/Sim). O placeholder é configurável pela prop `placeholder`. */
export const TodosOsEstados: Story = {
  parameters: {
    pseudo: {
      hover: ['.sb-hover .nds-text-field__control'],
      focusWithin: ['.sb-focus .nds-text-field__control'],
    },
  },
  render: () => {
    const states = [
      { key: 'Padrão', cls: '', props: {} },
      { key: 'Hover', cls: 'sb-hover', props: {} },
      { key: 'Foco', cls: 'sb-focus', props: {} },
      { key: 'Erro', cls: '', props: { error: 'Campo obrigatório.' } },
      { key: 'Desabilitado', cls: '', props: { disabled: true } },
    ];
    return (
      <div className="sb-canvas">
        {[false, true].map((filled) => (
          <section className="sb-section" key={String(filled)}>
            <h3>Preenchido: {filled ? 'Sim' : 'Não'}</h3>
            <div className="sb-row">
              {states.map(({ key, cls, props }) => (
                <div className={`sb-cell sb-w320 ${cls}`} key={key}>
                  <TextField
                    label="Rótulo"
                    placeholder="Digite aqui"
                    helpText="Texto de ajuda opcional."
                    defaultValue={filled ? 'Texto preenchido' : ''}
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
