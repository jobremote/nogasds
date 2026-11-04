import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Section } from '../../docs/story-layout';
import { Avatar } from '../Avatar/Avatar';
import { IconButton } from '../IconButton/IconButton';
import { SearchField } from '../SearchField/SearchField';
import { MobileTopBar, TopBar } from './TopBar';

const brand = <span style={{ fontWeight: 700 }}>Marca</span>;

const meta = {
  title: 'Componentes/Navegação/Barra superior',
  component: TopBar,
  args: { brand },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const desktop = (
  <TopBar
    aria-label="Barra superior"
    brand={brand}
    search={<SearchField label="Buscar" placeholder="Buscar no produto" />}
    actions={
      <>
        <IconButton icon="notifications" label="Notificações" />
        <Avatar name="Pessoa Exemplo" tone="wine" />
      </>
    }
  />
);

export const Playground: Story = { render: () => <Canvas>{desktop}</Canvas> };

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Desktop · 64 px">
        <div style={{ width: 1440 }}>{desktop}</div>
      </Section>
      <Section title="Mobile · 56 px">
        <div style={{ width: 390 }}>
          <MobileTopBar
            brand={brand}
            actions={
              <>
                <IconButton icon="search" label="Buscar" />
                <IconButton icon="notifications" label="Notificações" />
                <Avatar name="Pessoa Exemplo" tone="wine" size="sm" />
              </>
            }
          />
        </div>
      </Section>
      <Section title="Campo de busca">
        <div style={{ width: 640 }}>
          <SearchField label="Buscar" placeholder="Buscar no produto" />
        </div>
      </Section>
    </Canvas>
  ),
};
