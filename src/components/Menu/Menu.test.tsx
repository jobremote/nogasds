import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Menu, MenuOption } from './Menu';

const setup = (onMove = vi.fn()) =>
  render(
    <Menu label="Mais ações" trigger="⋯">
      <MenuOption onClick={onMove}>Mover para Jogando</MenuOption>
      <MenuOption danger>Remover</MenuOption>
    </Menu>,
  );

describe('Menu', () => {
  it('começa fechado e abre pelo botão, com foco na primeira opção', () => {
    setup();
    const button = screen.getByRole('button', { name: 'Mais ações' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).toBeNull();
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menuitem', { name: 'Mover para Jogando' })).toHaveFocus();
  });

  it('escolher uma opção chama a ação e fecha o menu', () => {
    const onMove = vi.fn();
    setup(onMove);
    fireEvent.click(screen.getByRole('button', { name: 'Mais ações' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Mover para Jogando' }));
    expect(onMove).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('Esc fecha e devolve o foco ao botão; setas percorrem as opções', () => {
    setup();
    const button = screen.getByRole('button', { name: 'Mais ações' });
    fireEvent.click(button);
    fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Mover para Jogando' }), { key: 'ArrowDown' });
    expect(screen.getByRole('menuitem', { name: 'Remover' })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Remover' }), { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
    expect(button).toHaveFocus();
  });

  it('clique fora fecha', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Mais ações' }));
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('não tem violações de acessibilidade (aberto)', async () => {
    const { container } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Mais ações' }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
