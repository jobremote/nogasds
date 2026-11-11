import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Cover } from './Cover';

describe('Cover', () => {
  it('sem imagem é uma faixa de cor sólida, sem ícone', () => {
    const { container } = render(<Cover />);
    expect(container.firstChild).toHaveClass('nds-cover');
    expect(container.firstChild).not.toHaveClass('nds-cover--placeholder');
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('svg')).toBeNull();
  });

  it('com imagem mostra a foto e o texto alternativo', () => {
    render(<Cover src="/capa.jpg" alt="Paisagem" />);
    expect(screen.getByRole('img', { name: 'Paisagem' })).toHaveAttribute('src', '/capa.jpg');
  });

  it('o enquadramento vertical vai de 0 a 100 (padrão 50, centro) e é limitado a essa faixa', () => {
    const { container, rerender } = render(<Cover src="/capa.jpg" />);
    const image = () => container.querySelector('img') as HTMLImageElement;
    expect(image().style.objectPosition).toBe('50% 50%');
    rerender(<Cover src="/capa.jpg" positionY={20} />);
    expect(image().style.objectPosition).toBe('50% 20%');
    rerender(<Cover src="/capa.jpg" positionY={250} />);
    expect(image().style.objectPosition).toBe('50% 100%');
    rerender(<Cover src="/capa.jpg" positionY={-5} />);
    expect(image().style.objectPosition).toBe('50% 0%');
  });

  it('a imagem é decorativa por padrão', () => {
    const { container } = render(<Cover src="/capa.jpg" />);
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('placeholder mostra o espaço da imagem com o ícone', () => {
    const { container } = render(<Cover placeholder />);
    expect(container.firstChild).toHaveClass('nds-cover--placeholder');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('placeholder é ignorado quando há imagem', () => {
    const { container } = render(<Cover src="/capa.jpg" placeholder />);
    expect(container.firstChild).not.toHaveClass('nds-cover--placeholder');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Cover src="/capa.jpg" alt="Paisagem" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
