import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { MenuItem } from './MenuItem';

const meta = {
  title: 'Componentes/Navegação/Item de menu',
  component: MenuItem,
  args: { icon: 'home', children: 'Início', href: '#' },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div style={{ width: 240 }}>
        <MenuItem {...args} />
      </div>
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  parameters: { pseudo: { hover: ['.sb-hover .nds-menu-item'], focusVisible: ['.sb-focus .nds-menu-item'] } },
  render: () => (
    <Canvas>
      <Section title="Estados">
        <Cell label="Padrão" width={240}>
          <MenuItem icon="home" href="#">Início</MenuItem>
        </Cell>
        <Cell label="Hover" hover width={240}>
          <MenuItem icon="home" href="#">Início</MenuItem>
        </Cell>
        <Cell label="Foco" focus width={240}>
          <MenuItem icon="home" href="#">Início</MenuItem>
        </Cell>
        <Cell label="Ativo" width={240}>
          <MenuItem icon="home" href="#" active>Início</MenuItem>
        </Cell>
      </Section>
      <Section title="Menu">
        <nav aria-label="Principal" style={{ width: 240 }}>
          <MenuItem icon="home" href="#" active>Início</MenuItem>
          <MenuItem icon="search" href="#">Buscar</MenuItem>
          <MenuItem icon="person" href="#">Perfil</MenuItem>
        </nav>
      </Section>
    </Canvas>
  ),
};
