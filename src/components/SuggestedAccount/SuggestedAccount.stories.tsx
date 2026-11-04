import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Section } from '../../docs/story-layout';
import { Button } from '../Button/Button';
import { SuggestedAccount } from './SuggestedAccount';

const meta = {
  title: 'Componentes/Conteúdo/Conta sugerida',
  component: SuggestedAccount,
  args: {
    name: 'Pessoa Exemplo',
    handle: '@pessoa',
    avatar: { tone: 'petrol' },
    action: (
      <Button variant="outline" size="sm">
        Seguir
      </Button>
    ),
  },
} satisfies Meta<typeof SuggestedAccount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div style={{ width: 320 }}>
        <SuggestedAccount {...args} />
      </div>
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Lista">
        <div style={{ width: 320 }}>
          <SuggestedAccount {...meta.args} />
          <SuggestedAccount {...meta.args} name="Outra Pessoa" handle="@outra" avatar={{ tone: 'olive' }} />
          <SuggestedAccount name="Sem ação" handle="@semacao" />
        </div>
      </Section>
    </Canvas>
  ),
};
