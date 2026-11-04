import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { Tag } from './Tag';

const meta = {
  title: 'Componentes/Seleção/Tag',
  component: Tag,
  args: { children: 'Rótulo' },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive() {
  const [selected, setSelected] = useState(false);
  return (
    <Tag selected={selected} onClick={() => setSelected((value) => !value)}>
      Alternar
    </Tag>
  );
}

export const Playground: Story = {
  render: () => (
    <Canvas>
      <Interactive />
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  parameters: { pseudo: { hover: ['.sb-hover .nds-tag'] } },
  render: () => (
    <Canvas>
      {[false, true].map((removable) => (
        <Section key={String(removable)} title={`Removível: ${removable ? 'Sim' : 'Não'}`}>
          <Cell label="Padrão">
            <Tag selected={false} onRemove={removable ? () => undefined : undefined}>Rótulo</Tag>
          </Cell>
          <Cell label="Hover" hover>
            <Tag selected={false} onRemove={removable ? () => undefined : undefined}>Rótulo</Tag>
          </Cell>
          <Cell label="Selecionado">
            <Tag selected onRemove={removable ? () => undefined : undefined}>Rótulo</Tag>
          </Cell>
          <Cell label="Desabilitado">
            <Tag selected={false} disabled onRemove={removable ? () => undefined : undefined}>Rótulo</Tag>
          </Cell>
        </Section>
      ))}
    </Canvas>
  ),
};
