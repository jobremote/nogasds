import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('gera as iniciais a partir do nome e expõe o nome como imagem acessível', () => {
    render(<Avatar name="Maria da Silva" />);
    expect(screen.getByRole('img', { name: 'Maria da Silva' })).toHaveTextContent('MS');
  });

  it('usa um só caractere para nome de uma palavra e aceita iniciais explícitas', () => {
    const { rerender } = render(<Avatar name="Maria" />);
    expect(screen.getByRole('img')).toHaveTextContent('M');
    rerender(<Avatar name="Maria" initials="zz" />);
    expect(screen.getByRole('img')).toHaveTextContent('ZZ');
  });

  it('sem nome é decorativo (aria-hidden)', () => {
    const { container } = render(<Avatar initials="AB" />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('mostra a foto no lugar das iniciais', () => {
    const { container } = render(<Avatar name="Maria" src="/foto.png" />);
    expect(container.querySelector('img.nds-avatar__image')).toHaveAttribute('src', '/foto.png');
    expect(container.firstChild).toHaveClass('nds-avatar--image');
  });

  it('aplica tom e tamanho', () => {
    render(<Avatar name="Maria" tone="olive" size="lg" />);
    expect(screen.getByRole('img')).toHaveClass('nds-avatar--olive', 'nds-avatar--lg');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Avatar name="Maria da Silva" tone="wine" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
