import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas } from '../../docs/story-layout';
import { ScreenshotField } from './ScreenshotField';

const meta = {
  title: 'Componentes/Formulários/ScreenshotField (Área de screenshot)',
  component: ScreenshotField,
  args: { label: 'Screenshot', onSelect: () => {} },
} satisfies Meta<typeof ScreenshotField>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ error, uploading }: { error?: string; uploading?: boolean }) {
  const [src, setSrc] = useState<string | undefined>();
  return (
    <Canvas>
      <div className="sb-w480">
        <ScreenshotField
          label="Screenshot"
          src={src}
          alt="Prévia da screenshot"
          helpText="JPG, PNG ou WebP, até 5 MB."
          error={error}
          uploading={uploading}
          onSelect={(file) => setSrc(URL.createObjectURL(file))}
          onRemove={() => setSrc(undefined)}
        />
      </div>
    </Canvas>
  );
}

export const Playground: Story = { render: () => <Demo /> };
export const ComErro: Story = { render: () => <Demo error="A imagem passa de 5 MB." /> };
export const Enviando: Story = { render: () => <Demo uploading /> };
