import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Comment } from './Comment';

describe('Comment', () => {
  it('mostra autor, meta, texto e ações em um artigo', () => {
    render(
      <Comment author="Pessoa Exemplo" meta="@pessoa · há 1 h" likeCount={3} textAction={<Button variant="ghost" size="sm">Responder</Button>} menu={<IconButton icon="more-horiz" label="Mais opções" size="sm" />}>
        Texto do comentário.
      </Comment>,
    );
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByText('Pessoa Exemplo')).toBeInTheDocument();
    expect(screen.getByText('@pessoa · há 1 h')).toBeInTheDocument();
    expect(screen.getByText('Texto do comentário.')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Responder' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mais opções' })).toBeInTheDocument();
  });

  it('curtir é um alternador: liked liga aria-pressed e troca para o coração preenchido', async () => {
    const user = userEvent.setup();
    const onLike = vi.fn();
    const { rerender, container } = render(<Comment author="Pessoa" likeCount={3} onLike={onLike}>Texto</Comment>);
    const outline = container.querySelector('.nds-comment__actions svg path')!.getAttribute('d');
    expect(screen.getByRole('button', { name: 'Curtir' })).toHaveAttribute('aria-pressed', 'false');
    await user.click(screen.getByRole('button', { name: 'Curtir' }));
    expect(onLike).toHaveBeenCalledTimes(1);
    rerender(<Comment author="Pessoa" likeCount={4} liked onLike={onLike}>Texto</Comment>);
    expect(screen.getByRole('button', { name: 'Curtir' })).toHaveAttribute('aria-pressed', 'true');
    expect(container.querySelector('.nds-comment__actions svg path')!.getAttribute('d')).not.toBe(outline);
    expect(container.querySelector('.nds-post-action__count--pressed')).toHaveTextContent('4');
  });

  it('reply recua o comentário', () => {
    const { container } = render(<Comment author="Pessoa" reply>Texto</Comment>);
    expect(container.querySelector('.nds-comment--reply')).toBeInTheDocument();
  });

  it('hidden mostra só o aviso, sem texto nem ações', () => {
    render(<Comment author="Pessoa" status="hidden" notice="Comentário oculto pelo autor do post.">Texto escondido</Comment>);
    expect(screen.getByText('Comentário oculto pelo autor do post.')).toBeInTheDocument();
    expect(screen.queryByText('Texto escondido')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('deleted mostra só o aviso, sem ações, com texto padrão', () => {
    render(<Comment author="Pessoa" status="deleted" likeCount={2} />);
    expect(screen.getByText('Comentário excluído.')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('hidden-owner mostra o aviso pequeno, o texto e as ações', () => {
    render(
      <Comment author="Pessoa" status="hidden-owner" notice="Oculto para os outros leitores." textAction={<Button variant="ghost" size="sm">Mostrar de novo</Button>}>
        Texto visível ao dono
      </Comment>,
    );
    expect(screen.getByText('Oculto para os outros leitores.')).toBeInTheDocument();
    expect(screen.getByText('Texto visível ao dono')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mostrar de novo' })).toBeInTheDocument();
  });

  it('authorLink troca o texto do nome', () => {
    render(<Comment author="Maria da Silva" authorLink={<a href="/maria">Maria da Silva</a>}>Texto</Comment>);
    expect(screen.getByRole('link', { name: 'Maria da Silva' })).toHaveAttribute('href', '/maria');
  });

  it.each(['default', 'hidden', 'hidden-owner', 'deleted'] as const)('não tem violações de acessibilidade (%s)', async (status) => {
    const { container } = render(<Comment author="Pessoa" meta="@pessoa" status={status} likeCount={1}>Texto</Comment>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
