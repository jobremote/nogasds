import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { MediaHero } from './MediaHero';

describe('MediaHero', () => {
  it('mostra título como h1, meta, selos, créditos e ações', () => {
    render(
      <MediaHero
        title="Título da mídia"
        meta="2018 · Plataforma A"
        badges={<Badge>Categoria</Badge>}
        credits="Criação: Estúdio A"
        actions={<Button>Adicionar</Button>}
      />,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Título da mídia' })).toBeInTheDocument();
    expect(screen.getByText('2018 · Plataforma A')).toBeInTheDocument();
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByText('Criação: Estúdio A')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Adicionar' })).toBeInTheDocument();
  });

  it('sem imagem de fundo usa a cor sólida; com imagem, a imagem é decorativa', () => {
    const { container, rerender } = render(<MediaHero title="A" />);
    expect(container.firstChild).not.toHaveClass('nds-media-hero--image');
    expect(container.querySelector('.nds-media-hero__background')).toBeNull();
    rerender(<MediaHero title="A" backgroundSrc="/arte.jpg" />);
    expect(container.firstChild).toHaveClass('nds-media-hero--image');
    expect(container.querySelector('.nds-media-hero__background')).toHaveAttribute('aria-hidden', 'true');
  });

  it('não renderiza as partes que não recebeu', () => {
    const { container } = render(<MediaHero title="A" titleAs="h2" />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(container.querySelector('.nds-media-hero__meta')).toBeNull();
    expect(container.querySelector('.nds-media-hero__actions')).toBeNull();
    expect(container.querySelector('.nds-media-hero__cover')).toBeNull();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <MediaHero title="Título" backgroundSrc="/arte.jpg" cover={<img src="/capa.jpg" alt="Capa de Título" />} meta="2018" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
