import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { ResultItem } from './ResultItem';

const meta = {
  title: 'Componentes/Dados/ResultItem',
  component: ResultItem,
  args: { title: 'Hollow Knight', detail: '2017 · PC, Switch' },
} satisfies Meta<typeof ResultItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="sb-canvas">
      <ul className="sb-w480" style={{ margin: 0, padding: 0 }}>
        <ResultItem {...args} action={<Button>Adicionar</Button>} />
      </ul>
    </div>
  ),
};

export const AdicionarOuJaNaEstante: Story = {
  render: () => (
    <div className="sb-canvas">
      <ul className="sb-w480" style={{ margin: 0, padding: 0 }}>
        <ResultItem title="Hollow Knight" detail="2017 · PC, Switch" action={<Button>Adicionar</Button>} />
        <ResultItem title="Celeste" detail="2018 · PC, Switch" action={<Badge tone="success">Zerado</Badge>} />
        <ResultItem title="Hades" detail="2020 · PC, Switch" action={<Badge tone="info">Jogando</Badge>} />
      </ul>
    </div>
  ),
};
