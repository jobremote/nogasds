import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Section } from '../../docs/story-layout';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Comment } from './Comment';

const text = 'Texto do comentário, com uma ou duas linhas para mostrar como o corpo se comporta quando passa da largura disponível.';

const common = {
  author: 'Pessoa Exemplo',
  meta: '@pessoa · há 1 h',
  avatar: { tone: 'petrol' as const },
  likeCount: 3,
  textAction: (
    <Button variant="ghost" size="sm">
      Responder
    </Button>
  ),
  menu: <IconButton icon="more-horiz" label="Mais opções" size="sm" />,
};

const meta = {
  title: 'Componentes/Feed/Comment',
  component: Comment,
  args: { ...common, children: text },
} satisfies Meta<typeof Comment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div style={{ width: 640 }}>
        <Comment {...args} />
      </div>
    </Canvas>
  ),
};

const hiddenOwnerAction = (
  <Button variant="ghost" size="sm">
    Mostrar de novo
  </Button>
);

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      {[false, true].map((reply) => (
        <Section key={String(reply)} title={`Tipo: ${reply ? 'Resposta' : 'Comentário'}`}>
          <div style={{ width: reply ? 640 : 640 }}>
            <Comment {...common} reply={reply}>{text}</Comment>
            <Comment {...common} reply={reply} liked likeCount={4}>{text}</Comment>
            <Comment {...common} reply={reply} status="hidden" notice="Comentário oculto pelo autor do post." />
            <Comment {...common} reply={reply} status="deleted" />
            {!reply ? (
              <Comment {...common} status="hidden-owner" notice="Oculto para os outros leitores. Só você e o autor veem o texto." textAction={hiddenOwnerAction}>
                {text}
              </Comment>
            ) : null}
          </div>
        </Section>
      ))}
    </Canvas>
  ),
};
