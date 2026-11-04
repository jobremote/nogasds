import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Link } from '../Link/Link';
import { Card } from './Card';

describe('Card', () => {
  it('mostra título como cabeçalho, categoria, descrição e ação', () => {
    render(
      <Card eyebrow="Categoria" title="Título" action={<Link href="#">Ver detalhes</Link>}>
        Descrição curta.
      </Card>,
    );
    expect(screen.getByRole('heading', { level: 3, name: 'Título' })).toBeInTheDocument();
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByText('Descrição curta.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver detalhes' })).toBeInTheDocument();
  });

  it('o nível do título é configurável', () => {
    render(<Card title="Título" headingLevel={2} />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('só renderiza a mídia quando fornecida', () => {
    const { container, rerender } = render(<Card title="T" />);
    expect(container.querySelector('.nds-card__media')).toBeNull();
    rerender(<Card title="T" media={<span>img</span>} />);
    expect(container.querySelector('.nds-card__media')).toBeInTheDocument();
  });

  it('interactive aplica o modificador de hover', () => {
    const { container } = render(<Card title="T" interactive />);
    expect(container.firstChild).toHaveClass('nds-card--interactive');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <Card eyebrow="Categoria" title="Título" media={<span aria-hidden="true" />} action={<Link href="#">Ver</Link>}>
        Descrição.
      </Card>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
