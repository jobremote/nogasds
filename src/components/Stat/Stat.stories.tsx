import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Section } from '../../docs/story-layout';
import { Stat } from './Stat';

const meta = {
  title: 'Componentes/Conteúdo/Stat',
  component: Stat,
  args: { value: 12, label: 'Itens concluídos' },
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <dl style={{ margin: 0 }}>
        <Stat {...args} />
      </dl>
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Grupo de contadores">
        <dl className="sb-row" style={{ margin: 0 }}>
          <Stat value={12} label="Itens concluídos" />
          <Stat value="1,4 mil" label="Seguidores" />
          <Stat value={96} label="Seguindo" />
        </dl>
      </Section>
      <Section title="Destaque">
        <dl className="sb-row" style={{ margin: 0 }}>
          <Stat value={12} label="Principal" />
          <Stat value={12} label="Secundário" emphasis="secondary" />
        </dl>
      </Section>
    </Canvas>
  ),
};
