import { render, screen, within } from '@testing-library/react';
import { axe } from '../../test/axe';
import { PageFooter } from './PageFooter';

const links = [
  { label: 'Termos', href: '/termos' },
  { label: 'Privacidade', href: '/privacidade' },
];

describe('PageFooter', () => {
  it('é um rodapé (contentinfo) com a atribuição e os links em uma lista nomeada', () => {
    render(<PageFooter attribution={<>Fornecido por <a href="https://exemplo.com">Fonte</a></>} links={links} />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Fonte' })).toHaveAttribute('href', 'https://exemplo.com');
    const nav = screen.getByRole('navigation', { name: 'Links do rodapé' });
    expect(within(nav).getAllByRole('link').map((link) => link.textContent)).toEqual(['Termos', 'Privacidade']);
  });

  it('o ponto separador é decorativo (fora do alcance de leitor de tela) e só aparece entre links', () => {
    const { container } = render(<PageFooter links={links} />);
    const dots = container.querySelectorAll('.nds-page-footer__dot');
    expect(dots).toHaveLength(1);
    expect(dots[0]).toHaveAttribute('aria-hidden', 'true');
  });

  it('só mostra o que foi passado e aceita o nome acessível dos links', () => {
    const { container, rerender } = render(<PageFooter attribution="Crédito" />);
    expect(screen.queryByRole('navigation')).toBeNull();
    expect(screen.getByText('Crédito')).toBeInTheDocument();
    rerender(<PageFooter links={links} linksLabel="Institucional" />);
    expect(screen.getByRole('navigation', { name: 'Institucional' })).toBeInTheDocument();
    expect(container.querySelector('.nds-page-footer__attribution')).toBeNull();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<PageFooter attribution={<>Fornecido por <a href="https://exemplo.com">Fonte</a></>} links={links} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
