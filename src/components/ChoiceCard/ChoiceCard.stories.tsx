import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChoiceCard } from './ChoiceCard';

const meta = {
  title: 'Componentes/Formulários/ChoiceCard',
  component: ChoiceCard,
  args: { title: 'Quero jogar', description: 'Jogos que você pretende jogar.', name: 'demo', value: 'a' },
} satisfies Meta<typeof ChoiceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="sb-canvas">
      <div className="sb-w480">
        <ChoiceCard {...args} />
      </div>
    </div>
  ),
};

export const GrupoDeStatus: Story = {
  render: () => (
    <div className="sb-canvas">
      <fieldset className="sb-w480" style={{ border: 0, padding: 0, display: 'grid', gap: 8 }}>
        <legend>Status</legend>
        <ChoiceCard name="status" value="want" title="Quero jogar" description="Jogos que você pretende jogar." defaultChecked />
        <ChoiceCard name="status" value="paused" title="Parado" description="Começou e deixou de lado." />
        <ChoiceCard name="status" value="playing" title="Jogando" description="Em andamento agora." />
        <ChoiceCard name="status" value="done" title="Zerado" description="Terminou o jogo." />
      </fieldset>
    </div>
  ),
};
