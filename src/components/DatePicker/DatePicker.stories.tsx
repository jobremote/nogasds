import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { DatePicker } from './DatePicker';

const today = new Date(2026, 10, 3);

const meta = {
  title: 'Componentes/Formulários/Seletor de data',
  component: DatePicker,
  args: { today, defaultValue: new Date(2026, 10, 18) },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <DatePicker {...args} />
    </Canvas>
  ),
};

/** Dias: padrão, hover, selecionado, hoje, fora do mês e desabilitado. */
export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Seletor (3 de novembro de 2026 é hoje; 18 está selecionado; 1 e 2 desabilitados)">
        <Cell label="Calendário">
          <DatePicker
            today={today}
            defaultValue={new Date(2026, 10, 18)}
            isDateDisabled={(date) => date.getMonth() === 10 && date.getDate() <= 2}
          />
        </Cell>
      </Section>
    </Canvas>
  ),
};
