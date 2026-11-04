import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Section } from '../../docs/story-layout';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Promo } from './Promo';

const meta = {
  title: 'Componentes/Conteúdo/Anúncio',
  component: Promo,
  args: {
    badge: <Badge>Patrocinado</Badge>,
    title: 'Título da chamada',
    children: 'Texto de apoio com uma ou duas linhas descrevendo a oferta ou novidade.',
    action: (
      <Button variant="outline" size="sm">
        Saiba mais
      </Button>
    ),
  },
} satisfies Meta<typeof Promo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div className="sb-w320">
        <Promo {...args} />
      </div>
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Padrão">
        <div className="sb-w320">
          <Promo {...meta.args} />
        </div>
      </Section>
    </Canvas>
  ),
};
