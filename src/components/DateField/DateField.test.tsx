import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { DateField } from './DateField';

const today = new Date(2026, 10, 3);

describe('DateField', () => {
  it('associa o rótulo e mostra o formato esperado como placeholder', () => {
    render(<DateField label="Data" />);
    expect(screen.getByLabelText('Data')).toHaveAttribute('placeholder', 'DD/MM/AAAA');
  });

  it('mostra a data inicial formatada', () => {
    render(<DateField label="Data" defaultValue={new Date(2026, 10, 3)} />);
    expect(screen.getByLabelText('Data')).toHaveValue('03/11/2026');
  });

  it('chama onChange com a data só quando o texto digitado é uma data válida', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DateField label="Data" onChange={onChange} />);
    await user.type(screen.getByLabelText('Data'), '31/02/2026');
    expect(onChange).not.toHaveBeenCalled();
    await user.clear(screen.getByLabelText('Data'));
    await user.type(screen.getByLabelText('Data'), '15/03/2026');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].getMonth()).toBe(2);
  });

  it('abre o calendário, escolhe um dia, fecha e preenche o campo', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DateField label="Data" onChange={onChange} calendarProps={{ today }} />);
    const toggle = screen.getByRole('button', { name: 'Abrir calendário' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /(^|, )18 de novembro de 2026/ }));
    expect(screen.getByLabelText('Data')).toHaveValue('18/11/2026');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(toggle).toHaveFocus();
    expect(onChange.mock.calls[0][0].getDate()).toBe(18);
  });

  it('Escape fecha o calendário e devolve o foco ao botão', async () => {
    const user = userEvent.setup();
    render(<DateField label="Data" calendarProps={{ today }} />);
    await user.click(screen.getByRole('button', { name: 'Abrir calendário' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Abrir calendário' })).toHaveFocus();
  });

  it('modo controlado acompanha o valor recebido', () => {
    const { rerender } = render(<DateField label="Data" value={new Date(2026, 10, 3)} />);
    expect(screen.getByLabelText('Data')).toHaveValue('03/11/2026');
    rerender(<DateField label="Data" value={new Date(2026, 11, 25)} />);
    expect(screen.getByLabelText('Data')).toHaveValue('25/12/2026');
    rerender(<DateField label="Data" value={null} />);
    expect(screen.getByLabelText('Data')).toHaveValue('');
  });

  it('erro marca aria-invalid; desabilitado desabilita campo e botão', () => {
    const { rerender } = render(<DateField label="Data" error="Campo obrigatório." />);
    expect(screen.getByLabelText('Data')).toHaveAttribute('aria-invalid', 'true');
    rerender(<DateField label="Data" disabled />);
    expect(screen.getByLabelText('Data')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Abrir calendário' })).toBeDisabled();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <DateField label="Padrão" helpText="Use o formato dia/mês/ano." />
        <DateField label="Erro" error="Obrigatório" />
        <DateField label="Desabilitado" disabled />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
