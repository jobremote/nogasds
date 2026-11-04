import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Button } from './Button';

describe('Button', () => {
  it('usa type="button" por padrão e aplica variante e tamanho', () => {
    render(<Button variant="outline" size="sm">Salvar</Button>);
    const button = screen.getByRole('button', { name: 'Salvar' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('nds-button--outline', 'nds-button--sm');
  });

  it('dispara onClick e não dispara quando desabilitado', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Ação</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(<Button onClick={onClick} disabled>Ação</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('é alcançável pelo teclado', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Ação</Button>);
    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalled();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <Button>Padrão</Button>
        <Button disabled>Desabilitado</Button>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
