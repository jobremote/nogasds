import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Thumbnail } from './Thumbnail';

describe('Thumbnail', () => {
  it('sem onOpen mostra só a imagem com o texto alternativo', () => {
    render(<Thumbnail src="/a.jpg" alt="Tela do chefe" />);
    expect(screen.getByRole('img', { name: 'Tela do chefe' })).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('com onOpen vira botão que abre a imagem', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(<Thumbnail src="/a.jpg" alt="Tela do chefe" onOpen={onOpen} />);
    await user.click(screen.getByRole('button', { name: 'Abrir imagem: Tela do chefe' }));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('com spoiler esconde a imagem até a pessoa pedir para ver', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(<Thumbnail src="/a.jpg" alt="Final" spoiler onOpen={onOpen} />);
    expect(screen.getByText('Contém spoiler')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Abrir imagem/ })).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Mostrar' }));
    await user.click(screen.getByRole('button', { name: 'Abrir imagem: Final' }));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <div>
        <Thumbnail src="/a.jpg" alt="A" onOpen={() => {}} />
        <Thumbnail src="/b.jpg" alt="B" spoiler />
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
