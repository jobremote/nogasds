import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Button } from '../Button/Button';
import { SuggestedAccount } from './SuggestedAccount';

describe('SuggestedAccount', () => {
  it('mostra nome, identificador e avatar médio', () => {
    render(<SuggestedAccount name="Maria da Silva" handle="@maria" />);
    expect(screen.getAllByText('Maria da Silva').length).toBeGreaterThan(0);
    expect(screen.getByText('@maria')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Maria da Silva' })).toHaveClass('nds-avatar--md');
  });

  it('renderiza a ação e ela funciona', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <SuggestedAccount
        name="Maria"
        action={
          <Button size="sm" variant="outline" onClick={onClick}>
            Seguir
          </Button>
        }
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Seguir' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('com href, avatar e nomes viram um só link e a ação fica fora dele', () => {
    render(<SuggestedAccount name="Maria da Silva" handle="@maria" href="/perfil/maria" action={<Button size="sm">Seguir</Button>} />);
    const link = screen.getByRole('link', { name: /Maria da Silva/ });
    expect(link).toHaveAttribute('href', '/perfil/maria');
    expect(within(link).getByText('@maria')).toBeInTheDocument();
    expect(within(link).queryByRole('button')).toBeNull();
    expect(screen.getByRole('button', { name: 'Seguir' })).toBeInTheDocument();
  });

  it('sem href não há link', () => {
    render(<SuggestedAccount name="Maria" action={<Button size="sm">Seguir</Button>} />);
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('linkLabel troca o nome acessível do link', () => {
    render(<SuggestedAccount name="Maria" href="/x" linkLabel="Ver perfil de Maria" />);
    expect(screen.getByRole('link', { name: 'Ver perfil de Maria' })).toBeInTheDocument();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <SuggestedAccount
        name="Maria da Silva"
        handle="@maria"
        action={
          <Button size="sm" variant="outline">
            Seguir
          </Button>
        }
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
