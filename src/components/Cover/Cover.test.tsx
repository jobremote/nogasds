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
