import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '../Icon/Icon';
import { Menu, MenuOption } from './Menu';

const meta = {
  title: 'Componentes/Navegação/Menu',
  component: Menu,
  args: { label: 'Mais ações', trigger: <Icon name="more-horiz" size={24} />, children: null },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="sb-canvas" style={{ minHeight: 220 }}>
      <Menu {...args}>
        <MenuOption>Mover para Jogando</MenuOption>
        <MenuOption>Mover para Zerado</MenuOption>
        <MenuOption icon="edit">Editar</MenuOption>
        <MenuOption icon="close" danger>Remover da Game Shelf</MenuOption>
      </Menu>
    </div>
  ),
};
