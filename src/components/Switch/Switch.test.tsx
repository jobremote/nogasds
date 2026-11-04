import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Switch } from './Switch';

describe('Switch', () => {
  it('expõe role="switch" com o rótulo como nome', () => {
    render(<Switch label="Notificações" />);
    expect(screen.getByRole('switch', { name: 'Notificações' })).not.toBeChecked();
  });

  it('alterna com clique e com a barra de espaço', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Notificações" onChange={onChange} />);
    await user.click(screen.getByText('Notificações'));
    expect(screen.getByRole('switch')).toBeChecked();
    await user.keyboard(' ');
    expect(screen.getByRole('switch')).not.toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('desabilitado não alterna', async () => {
    const user = userEvent.setup();
    render(<Switch label="Notificações" disabled />);
    await user.click(screen.getByText('Notificações'));
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <Switch label="Desligado" />
        <Switch label="Ligado" defaultChecked />
        <Switch label="Desabilitado" disabled />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
