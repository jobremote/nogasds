import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Link } from './Link';

describe('Link', () => {
  it('renderiza um link com destino e tamanho', () => {
    render(<Link href="/detalhes" size="sm">Ver detalhes</Link>);
    const link = screen.getByRole('link', { name: 'Ver detalhes' });
    expect(link).toHaveAttribute('href', '/detalhes');
    expect(link).toHaveClass('nds-link--sm');
  });

  it('é alcançável pelo teclado', async () => {
    const user = userEvent.setup();
    render(<Link href="#a">Ir</Link>);
    await user.tab();
    expect(screen.getByRole('link')).toHaveFocus();
  });

  it('desabilitado marca aria-disabled, remove o destino e ignora cliques', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Link href="/x" disabled onClick={onClick}>Ir</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).not.toHaveAttribute('href');
    await user.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <Link href="#a">Padrão</Link>
        <Link href="#b" disabled>Desabilitado</Link>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
