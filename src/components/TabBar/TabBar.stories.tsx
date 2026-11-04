import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { TabBar, type TabBarItem } from './TabBar';

const base: TabBarItem[] = [
  { label: 'Início', icon: 'home', href: '#' },
  { label: 'Buscar', icon: 'search', href: '#' },
  { label: 'Itens', icon: 'apps', href: '#' },
  { label: 'Perfil', icon: 'person', href: '#' },
];

const withActive = (index: number) => base.map((item, i) => ({ ...item, active: i === index }));

const meta = {
  title: 'Componentes/Navegação/Barra de abas inferior',
  component: TabBar,
  args: { label: 'Principal', items: withActive(0) },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div style={{ width: 390 }}>
        <TabBar {...args} />
      </div>
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Item ativo">
        {base.map((item, index) => (
          <Cell key={item.label} label={`Ativo: ${item.label}`} width={390}>
            <TabBar label={`Principal ${item.label}`} items={withActive(index)} />
          </Cell>
        ))}
      </Section>
    </Canvas>
  ),
};
