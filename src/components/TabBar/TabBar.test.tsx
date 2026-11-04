import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { TabBar, type TabBarItem } from './TabBar';

const items: TabBarItem[] = [
  { label: 'Início', icon: 'home', href: '#inicio', active: true },
  { label: 'Buscar', icon: 'search', href: '#buscar' },
  { label: 'Perfil', icon: 'person', onClick: () => undefined },
];

describe('TabBar', () => {
  it('é uma navegação nomeada com um item por entrada', () => {
    render(<TabBar label="Principal" items={items} />);
    const nav = screen.getByRole('navigation', { name: 'Principal' });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('href', '#inicio');
    expect(screen.getByRole('link', { name: 'Buscar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Perfil' })).toBeInTheDocument();
  });

  it('o item ativo marca aria-current="page"', () => {
    render(<TabBar label="Principal" items={items} />);
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Buscar' })).not.toHaveAttribute('aria-current');
  });

  it('item sem href dispara onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<TabBar label="Principal" items={[{ label: 'Perfil', icon: 'person', onClick }]} />);
    await user.click(screen.getByRole('button', { name: 'Perfil' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<TabBar label="Principal" items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
