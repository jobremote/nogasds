import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Section } from '../../docs/story-layout';
import { IconButton } from '../IconButton/IconButton';
import { Switch } from '../Switch/Switch';
import { PostComposer } from './PostComposer';

const tools = (
  <>
    <IconButton icon="image" label="Anexar imagem" size="sm" />
    <Switch label="Marcar como sensível" />
  </>
);

const meta = {
  title: 'Componentes/Feed/Criar post',
  component: PostComposer,
  args: {
    label: 'Texto da publicação',
    placeholder: 'No que você está pensando?',
    avatar: { name: 'Pessoa Exemplo', tone: 'wine' },
    maxLength: 1500,
    tools,
  },
} satisfies Meta<typeof PostComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div style={{ width: 640 }}>
        <PostComposer {...args} />
      </div>
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Vazio, preenchido e desabilitado">
        <div style={{ width: 640 }}>
          <PostComposer {...meta.args} />
        </div>
        <div style={{ width: 640 }}>
          <PostComposer {...meta.args} defaultValue="Um texto de exemplo para a publicação." />
        </div>
        <div style={{ width: 640 }}>
          <PostComposer {...meta.args} disabled />
        </div>
      </Section>
    </Canvas>
  ),
};
