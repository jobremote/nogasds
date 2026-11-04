import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { IconButton } from '../IconButton/IconButton';
import { SearchField } from '../SearchField/SearchField';
import { MobileTopBar, TopBar } from './TopBar';

describe('TopBar', () => {
  it('renderiza marca, busca e ações em um header', () => {
    render(
      <TopBar
        brand="Marca"
        search={<SearchField label="Buscar" />}
        actions={<IconButton icon="notifications" label="Notificações" />}
      />,
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Marca')).toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: 'Buscar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Notificações' })).toBeInTheDocument();
  });

  it('a versão mobile não tem busca', () => {
    render(<MobileTopBar brand="Marca" actions={<IconButton icon="search" label="Buscar" />} />);
    expect(screen.getByRole('banner')).toHaveClass('nds-top-bar--mobile');
    expect(screen.queryByRole('searchbox')).toBeNull();
  });

  it('o campo de busca aceita digitação', async () => {
    const user = userEvent.setup();
    render(<SearchField label="Buscar" placeholder="Buscar no produto" />);
    await user.type(screen.getByRole('searchbox', { name: 'Buscar' }), 'olá');
    expect(screen.getByRole('searchbox')).toHaveValue('olá');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <TopBar
          brand="Marca"
          search={<SearchField label="Buscar" />}
          actions={<IconButton icon="notifications" label="Notificações" />}
        />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
