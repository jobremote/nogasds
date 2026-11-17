import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Badge } from '../Badge/Badge';
import { IconButton } from '../IconButton/IconButton';
import { PostAction } from '../Post/Post';
import { ActivityGame, ActivityPost } from './ActivityPost';

function sample(props: Partial<React.ComponentProps<typeof ActivityPost>> = {}) {
  return (
    <ActivityPost
      author="Pessoa Exemplo"
      meta="@pessoa · há 2 h"
      menu={<IconButton icon="more-horiz" label="Mais opções" size="sm" />}
      phrase="Zerou"
      game={<ActivityGame href="/jogo/1" title="Elden Ring" meta="2022 · PC (Windows)" detail="38 h · Nota 5 de 5" badge={<Badge>Zerado</Badge>} />}
      actions={<PostAction icon="favorite" label="Curtir" count={12} />}
      {...props}
    />
  );
}

describe('ActivityPost', () => {
  it('mostra autor, frase, card do jogo e ações em um artigo', () => {
    render(sample());
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByText('Pessoa Exemplo')).toBeInTheDocument();
    expect(screen.getByText('Zerou')).toBeInTheDocument();
    expect(screen.getByText('38 h · Nota 5 de 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Curtir' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mais opções' })).toBeInTheDocument();
  });

  it('o card do jogo é um link quando recebe href', () => {
    render(sample());
    expect(screen.getByRole('link', { name: /Elden Ring/ })).toHaveAttribute('href', '/jogo/1');
  });

  it('sem href o card do jogo não é link', () => {
    render(sample({ game: <ActivityGame title="Elden Ring" /> }));
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('texto, trecho de review e imagem só aparecem quando informados', () => {
    const { container, rerender } = render(sample());
    expect(container.querySelector('.nds-activity-post__note')).toBeNull();
    expect(container.querySelector('.nds-activity-post__excerpt')).toBeNull();
    expect(container.querySelector('.nds-activity-post__media')).toBeNull();
    rerender(sample({ note: <p>Melhor jogo do ano.</p>, excerpt: 'Um mundo aberto...', media: <img src="x.png" alt="Screenshot" /> }));
    expect(screen.getByText('Melhor jogo do ano.')).toBeInTheDocument();
    expect(screen.getByText('Um mundo aberto...')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Screenshot' })).toBeInTheDocument();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(sample({ note: <p>Texto</p> }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
