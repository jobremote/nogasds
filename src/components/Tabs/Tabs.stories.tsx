import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Canvas, Section } from '../../docs/story-layout';
import { Tabs } from './Tabs';

const items = [
  { value: 'um', label: 'Primeira' },
  { value: 'dois', label: 'Segunda' },
  { value: 'tres', label: 'Terceira' },
];

const meta = {
  title: 'Componentes/Navegação/Abas',
  component: Tabs,
  args: { items, value: 'um', label: 'Exemplo', onChange: () => undefined },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive() {
  const [value, setValue] = useState('um');
  return <Tabs label="Exemplo" items={items} value={value} onChange={setValue} />;
}

/** Interativo: clique ou use as setas, Home e End. */
export const Playground: Story = {
  render: () => (
    <Canvas>
      <div style={{ width: 640 }}>
        <Interactive />
      </div>
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  parameters: { pseudo: { hover: ['.sb-hover .nds-tabs__tab:nth-child(2)'], focusVisible: ['.sb-focus .nds-tabs__tab:nth-child(1)'] } },
  render: () => (
    <Canvas>
      <Section title="Selecionada e padrão">
        <div style={{ width: 640 }}>
          <Tabs label="Exemplo" items={[...items, { value: 'x', label: 'Desabilitada', disabled: true }]} value="um" onChange={() => undefined} />
        </div>
      </Section>
      <Section title="Hover na segunda aba">
        <div className="sb-hover" style={{ width: 640 }}>
          <Tabs label="Hover" items={items} value="um" onChange={() => undefined} />
        </div>
      </Section>
      <Section title="Foco na primeira aba">
        <div className="sb-focus" style={{ width: 640 }}>
          <Tabs label="Foco" items={items} value="um" onChange={() => undefined} />
        </div>
      </Section>
    </Canvas>
  ),
};
