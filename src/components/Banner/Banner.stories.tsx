import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from './Banner';

const meta = {
  title: 'Componentes/Feedback/Banner',
  component: Banner,
  args: { title: 'Título', children: 'Descrição' },
  argTypes: { variant: { control: 'inline-radio', options: ['info', 'success', 'error'] } },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="sb-canvas">
      <div className="sb-w480">
        <Banner {...args} />
      </div>
    </div>
  ),
};

export const TodosOsEstados: Story = {
  render: () => (
    <div className="sb-canvas">
      <div className="sb-row">
        {(['info', 'success', 'error'] as const).map((variant) => (
          <div className="sb-cell sb-w480" key={variant}>
            <Banner variant={variant} title="Título">Descrição</Banner>
            <small>{{ info: 'Informação', success: 'Sucesso', error: 'Erro' }[variant]}</small>
          </div>
        ))}
      </div>
    </div>
  ),
};
