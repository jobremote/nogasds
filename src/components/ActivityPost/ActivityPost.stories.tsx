import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { IconButton } from '../IconButton/IconButton';
import { PostAction } from '../Post/Post';
import { ActivityGame, ActivityPost } from './ActivityPost';

const common = {
  author: 'Marina Rocha',
  meta: '@marinaplays · há 2 h',
  avatar: { tone: 'petrol' as const },
  menu: <IconButton icon="more-horiz" label="Mais opções" size="sm" />,
  actions: (
    <>
      <PostAction icon="favorite" label="Curtir" count={12} />
      <PostAction icon="chat" label="Comentar" count={3} />
    </>
  ),
};

const meta = {
  title: 'Componentes/Feed/ActivityPost',
  component: ActivityPost,
  args: {
    ...common,
    phrase: 'Começou a jogar',
    game: <ActivityGame title="Elden Ring" meta="2022 · PC (Windows)" badge={<Badge>Jogando</Badge>} />,
  },
} satisfies Meta<typeof ActivityPost>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComecouAJogar: Story = {};

export const Zerou: Story = {
  args: {
    phrase: 'Zerou',
    note: <p>Melhor jogo do ano para mim.</p>,
    game: <ActivityGame href="#" title="Elden Ring" meta="2022 · PC (Windows)" detail="38 h · Nota 5 de 5" badge={<Badge>Zerado</Badge>} />,
  },
};

export const Review: Story = {
  args: {
    phrase: 'Escreveu uma review',
    excerpt: 'Um mundo aberto que respeita o seu tempo. A exploração recompensa a curiosidade e os chefes ensinam sem tirar a graça do desafio…',
    game: <ActivityGame href="#" title="Elden Ring" meta="2022 · PC (Windows)" badge={<Badge>Zerado</Badge>} />,
  },
};

export const Screenshot: Story = {
  args: {
    phrase: 'Subiu uma screenshot',
    media: <span>Imagem</span>,
    game: <ActivityGame href="#" title="Elden Ring" meta="2022 · PC (Windows)" badge={<Badge>Jogando</Badge>} />,
  },
};
