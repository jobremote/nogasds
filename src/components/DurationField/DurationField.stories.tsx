import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DurationField, type DurationValue } from './DurationField';

const meta = {
  title: 'Componentes/Formulários/DurationField',
  component: DurationField,
  args: { label: 'Tempo de jogo', value: { hours: null, minutes: null }, onChange: () => {} },
} satisfies Meta<typeof DurationField>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ error, disabled, initial }: { error?: string; disabled?: boolean; initial?: DurationValue }) {
  const [value, setValue] = useState<DurationValue>(initial ?? { hours: null, minutes: null });
  return (
    <div className="sb-canvas">
      <div className="sb-w480">
        <DurationField label="Tempo de jogo" value={value} onChange={setValue} error={error} disabled={disabled} />
      </div>
    </div>
  );
}

export const Playground: Story = { render: () => <Demo /> };

export const Preenchido: Story = { render: () => <Demo initial={{ hours: 42, minutes: 30 }} /> };

export const ComErro: Story = { render: () => <Demo initial={{ hours: 0, minutes: 0 }} error="Informe um tempo maior que zero." /> };

export const Desabilitado: Story = { render: () => <Demo disabled initial={{ hours: 12, minutes: 0 }} /> };
