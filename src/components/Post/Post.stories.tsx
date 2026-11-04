import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Section } from '../../docs/story-layout';
import { Badge } from '../Badge/Badge';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { Post, PostAction } from './Post';

const common = {
  author: 'Pessoa Exemplo',
  meta: '@pessoa · há 2 h',
  avatar: { tone: 'petrol' as const },
  menu: <IconButton icon="more-horiz" label="Mais opções" size="sm" />,
  tags: (
    <>
      <Badge tone="success">Concluído</Badge>
      <Badge>Assunto</Badge>
    </>
  ),
  actions: (
    <>
      <PostAction icon="favorite" label="Curtir" count={128} />
      <PostAction icon="chat" label="Comentar" count={14} />
      <PostAction icon="share" label="Compartilhar" />
    </>
  ),
  endActions: <IconButton icon="bookmark" label="Salvar" size="sm" />,
};

const text = 'Texto da publicação, com algumas linhas de conteúdo para mostrar como o corpo do post se comporta quando passa de uma linha.';

const meta = {
  title: 'Componentes/Feed/Post',
  component: Post,
  args: { ...common, children: text },
} satisfies Meta<typeof Post>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div style={{ width: 640 }}>
        <Post {...args} />
      </div>
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      {[false, true].map((withMedia) => (
        <Section key={String(withMedia)} title={`Imagem: ${withMedia ? 'Sim' : 'Não'}`}>
          <div style={{ width: 640 }}>
            <Post {...common} media={withMedia ? <Icon name="image" size={24} /> : undefined}>
              {text}
            </Post>
          </div>
        </Section>
      ))}
    </Canvas>
  ),
};
