import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { ItemCard } from './ItemCard';

describe('ItemCard', () => {
  it('mostra título e apoio', () => {
    render(<ItemCard title="Título" detail="Apoio" />);
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Apoio')).toBeInTheDocument();
  });

  it('só mostra a nota quando informada, com nome acessível', () => {
    const { rerender } = render(<ItemCard title="T" />);
    expect(screen.queryByLabelText(/Nota/)).toBeNull();
    rerender(<ItemCard title="T" rating={4} />);
    expect(screen.getByLabelText('Nota 4 de 5')).toBeInTheDocument();
  });

  it('só mostra o apoio quando informado', () => {
    const { container } = render(<ItemCard title="T" />);
    expect(container.querySelector('.nds-item-card__detail')).toBeNull();
  });

  it('usa a miniatura quando há imagem', () => {
    const { container } = render(<ItemCard title="T" thumbnail="/m.jpg" />);
    expect(container.querySelector('.nds-item-card__thumbnail img')).toHaveAttribute('src', '/m.jpg');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<ItemCard title="Título" detail="Apoio" rating={5} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
