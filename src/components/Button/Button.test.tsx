import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
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

  it('mostra ícone lead antes e trailing depois do texto, sem mudar o nome acessível', () => {
    render(
      <Button leadingIcon={<Icon name="add" />} trailingIcon={<Icon name="chevron-right" />}>
        Continuar
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Continuar' });
    const slots = button.querySelectorAll('.nds-button__icon');
    expect(slots).toHaveLength(2);
    expect(button.firstElementChild).toBe(slots[0]);
    expect(button.lastElementChild).toBe(slots[1]);
    expect(button.textContent).toBe('Continuar');
    button.querySelectorAll('svg').forEach((svg) => expect(svg).toHaveAttribute('aria-hidden', 'true'));
  });

  it('não cria o espaço do ícone quando lead e trailing não são informados', () => {
    render(<Button>Somente texto</Button>);
    expect(screen.getByRole('button').querySelector('.nds-button__icon')).toBeNull();
  });

  it('aceita um Logo colorido como ícone', () => {
    render(
      <Button variant="outline" leadingIcon={<Logo name="google" />}>
        Continuar com Google
      </Button>,
    );
    const paths = screen.getByRole('button', { name: 'Continuar com Google' }).querySelectorAll('svg path');
    expect(paths).toHaveLength(4);
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <Button>Padrão</Button>
        <Button leadingIcon={<Icon name="add" />} trailingIcon={<Icon name="chevron-right" />}>
          Com ícones
        </Button>
        <Button disabled>Desabilitado</Button>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
