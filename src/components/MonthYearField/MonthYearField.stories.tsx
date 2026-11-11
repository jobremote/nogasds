import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MonthYearField, type MonthYearValue } from './MonthYearField';

const meta = {
  title: 'Componentes/Formulários/MonthYearField',
  component: MonthYearField,
  args: { label: 'Início', value: { month: null, year: null }, onChange: () => {} },
} satisfies Meta<typeof MonthYearField>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ error, disabled, initial }: { error?: string; disabled?: boolean; initial?: MonthYearValue }) {
  const [value, setValue] = useState<MonthYearValue>(initial ?? { month: null, year: null });
  return (
    <div className="sb-canvas">
      <div className="sb-w480">
        <MonthYearField label="Início" value={value} onChange={setValue} error={error} disabled={disabled} />
      </div>
    </div>
  );
}

export const Playground: Story = { render: () => <Demo /> };

export const Preenchido: Story = { render: () => <Demo initial={{ month: 3, year: 2024 }} /> };

export const ComErro: Story = {
  render: () => <Demo initial={{ month: 1, year: 2023 }} error="O fim não pode ser antes do início." />,
};

export const Desabilitado: Story = { render: () => <Demo disabled initial={{ month: 6, year: 2022 }} /> };
