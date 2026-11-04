import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Section } from '../../docs/story-layout';
import { Stat } from '../Stat/Stat';
import { ProfileSummary } from './ProfileSummary';

const stats = (
  <>
    <Stat value={12} label="Itens concluídos" />
    <Stat value={96} label="Seguindo" />
  </>
);

const meta = {
  title: 'Componentes/Conteúdo/Perfil resumido',
  component: ProfileSummary,
  args: {
    name: 'Pessoa Exemplo',
    handle: '@pessoa',
    avatar: { tone: 'wine' },
    bio: 'Texto curto de apresentação, com uma ou duas linhas sobre a pessoa.',
    stats,
  },
} satisfies Meta<typeof ProfileSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div style={{ width: 280 }}>
        <ProfileSummary {...args} />
      </div>
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Completo e mínimo">
        <div style={{ width: 280 }}>
          <ProfileSummary {...meta.args} />
        </div>
        <div style={{ width: 280 }}>
          <ProfileSummary name="Pessoa Exemplo" handle="@pessoa" />
        </div>
      </Section>
    </Canvas>
  ),
};
