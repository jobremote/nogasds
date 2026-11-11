import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas } from '../../docs/story-layout';
import { SpoilerGuard } from './SpoilerGuard';

const meta = {
  title: 'Componentes/Conteúdo/SpoilerGuard',
  component: SpoilerGuard,
  args: { children: null },
} satisfies Meta<typeof SpoilerGuard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Texto: Story = {
  render: () => (
    <Canvas>
      <div className="sb-w320">
        <SpoilerGuard>
          <p style={{ margin: 0, padding: 16 }}>No final, o protagonista descobre que o vilão era o próprio pai e abre mão do trono.</p>
        </SpoilerGuard>
      </div>
    </Canvas>
  ),
};

export const Imagem: Story = {
  render: () => (
    <Canvas>
      <div className="sb-w320">
        <SpoilerGuard>
          <div style={{ height: 180, background: 'linear-gradient(135deg, #44090f, #093145)' }} />
        </SpoilerGuard>
      </div>
    </Canvas>
  ),
};

export const SemProtecao: Story = {
  render: () => (
    <Canvas>
      <div className="sb-w320">
        <SpoilerGuard active={false}>
          <p style={{ margin: 0 }}>Conteúdo sem spoiler.</p>
        </SpoilerGuard>
      </div>
    </Canvas>
  ),
};
