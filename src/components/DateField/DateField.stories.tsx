import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { DateField } from './DateField';

const meta = {
  title: 'Componentes/Formulários/Campo de data',
  component: DateField,
  args: { label: 'Data', helpText: 'Use o formato dia/mês/ano.' },
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Digite DD/MM/AAAA ou abra o calendário pelo ícone. */
export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div className="sb-w320" style={{ minHeight: 440 }}>
        <DateField {...args} calendarProps={{ today: new Date(2026, 10, 3) }} />
      </div>
    </Canvas>
  ),
};

const states = [
  { key: 'Padrão', hover: false, focus: false, props: {} },
  { key: 'Hover', hover: true, focus: false, props: {} },
  { key: 'Foco', hover: false, focus: true, props: {} },
  { key: 'Erro', hover: false, focus: false, props: { error: 'Campo obrigatório.' } },
  { key: 'Desabilitado', hover: false, focus: false, props: { disabled: true } },
];

export const TodosOsEstados: Story = {
  parameters: {
    pseudo: { hover: ['.sb-hover .nds-text-field__control'], focusWithin: ['.sb-focus .nds-text-field__control'] },
  },
  render: () => (
    <Canvas>
      {[false, true].map((filled) => (
        <Section key={String(filled)} title={`Preenchido: ${filled ? 'Sim' : 'Não'}`}>
          {states.map(({ key, hover, focus, props }) => (
            <Cell key={key} label={key} hover={hover} focus={focus} width={320}>
              <DateField
                label="Data"
                helpText="Use o formato dia/mês/ano."
                defaultValue={filled ? new Date(2026, 10, 3) : null}
                {...props}
              />
            </Cell>
          ))}
        </Section>
      ))}
    </Canvas>
  ),
};
