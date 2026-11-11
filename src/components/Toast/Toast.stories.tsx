import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';

const meta = {
  title: 'Componentes/Feedback/Toast',
  component: Toast,
  args: { title: 'Título', children: 'Descrição', onClose: () => {} },
  argTypes: { variant: { control: 'inline-radio', options: ['info', 'success', 'error'] } },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="sb-canvas">
      <div className="sb-w480">
        <Toast {...args} />
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
            <Toast variant={variant} title="Título" onClose={() => {}}>Descrição</Toast>
            <small>{{ info: 'Informação', success: 'Sucesso', error: 'Erro' }[variant]}</small>
          </div>
        ))}
      </div>
    </div>
  ),
};
