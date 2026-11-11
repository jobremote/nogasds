import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas } from '../../docs/story-layout';
import { Tag, type TagColor } from '../Tag/Tag';
import { ColorPicker } from './ColorPicker';

const meta = {
  title: 'Componentes/Seleção/ColorPicker (Seletor de cor)',
  component: ColorPicker,
  args: { label: 'Cor', value: 'neutral', onChange: () => {} },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ disabled }: { disabled?: boolean }) {
  const [value, setValue] = useState<TagColor>('wine');
  return (
    <Canvas>
      <div className="sb-w320" style={{ display: 'grid', gap: 16 }}>
        <ColorPicker label="Cor" value={value} onChange={setValue} disabled={disabled} />
        <div>
          <Tag color={value}>Pré-visualização</Tag>
        </div>
      </div>
    </Canvas>
  );
}

export const Playground: Story = { render: () => <Demo /> };
export const Desabilitado: Story = { render: () => <Demo disabled /> };
