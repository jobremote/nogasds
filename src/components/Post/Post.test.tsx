import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Badge } from '../Badge/Badge';
import { Post, PostAction } from './Post';

describe('Post', () => {
  it('mostra autor, meta, selos e corpo em um artigo', () => {
    render(
      <Post author="Maria da Silva" meta="@maria · há 2 h" tags={<Badge>Assunto</Badge>}>
        Texto da publicação.
      </Post>,
    );
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getAllByText('Maria da Silva').length).toBeGreaterThan(0);
    expect(screen.getByText('@maria · há 2 h')).toBeInTheDocument();
    expect(screen.getByText('Assunto')).toBeInTheDocument();
    expect(screen.getByText('Texto da publicação.')).toBeInTheDocument();
  });

  it('só mostra mídia e rodapé quando fornecidos', () => {
    const { container, rerender } = render(<Post author="Maria">Texto</Post>);
    expect(container.querySelector('.nds-post__media')).toBeNull();
    expect(container.querySelector('.nds-post__footer')).toBeNull();
    rerender(
      <Post author="Maria" media={<span>img</span>} actions={<PostAction icon="favorite" label="Curtir" />}>
        Texto
      </Post>,
    );
    expect(container.querySelector('.nds-post__media')).toBeInTheDocument();
    expect(container.querySelector('.nds-post__footer')).toBeInTheDocument();
  });

  it('PostAction tem nome acessível, mostra contador e dispara onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<PostAction icon="favorite" label="Curtir" count={128} onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: 'Curtir' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText('128')).toBeInTheDocument();
  });

  it('PostAction com `pressed` vira alternador', () => {
    const { rerender } = render(<PostAction icon="favorite" label="Curtir" pressed={false} />);
    expect(screen.getByRole('button', { name: 'Curtir' })).toHaveAttribute('aria-pressed', 'false');
    rerender(<PostAction icon="favorite" label="Curtir" pressed />);
    expect(screen.getByRole('button', { name: 'Curtir' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <Post
        author="Maria da Silva"
        meta="@maria"
        tags={<Badge>Assunto</Badge>}
        actions={<PostAction icon="favorite" label="Curtir" count={3} />}
      >
        Texto da publicação.
      </Post>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
