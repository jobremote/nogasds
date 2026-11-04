import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { MenuItem } from './MenuItem';

describe('MenuItem', () => {
  it('com href vira link; sem href, botão', () => {
    const { rerender } = render(<MenuItem href="/inicio">Início</MenuItem>);
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('href', '/inicio');
    rerender(<MenuItem>Início</MenuItem>);
    expect(screen.getByRole('button', { name: 'Início' })).toHaveAttribute('type', 'button');
  });

  it('o item ativo marca aria-current="page"', () => {
    const { rerender } = render(
      <MenuItem href="#" active>
        Início
      </MenuItem>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
    rerender(<MenuItem href="#">Início</MenuItem>);
    expect(screen.getByRole('link')).not.toHaveAttribute('aria-current');
  });

  it('botão dispara onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<MenuItem onClick={onClick}>Sair</MenuItem>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('mostra o ícone sem expô-lo ao leitor de tela', () => {
    const { container } = render(
      <MenuItem icon="home" href="#">
        Início
      </MenuItem>,
    );
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <nav aria-label="Principal">
        <MenuItem icon="home" href="#" active>
          Início
        </MenuItem>
        <MenuItem icon="person" href="#">
          Perfil
        </MenuItem>
      </nav>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
