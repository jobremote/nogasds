import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { addMonths, formatDate, monthWeeks, parseDate } from './dates';
import { DatePicker } from './DatePicker';

const today = new Date(2026, 10, 3); // 3 de novembro de 2026 (domingo, 1º de novembro)

describe('dates', () => {
  it('monthWeeks cobre o mês em semanas completas de domingo a sábado', () => {
    const weeks = monthWeeks(new Date(2026, 10, 15));
    expect(weeks).toHaveLength(5);
    expect(weeks[0][0].getDate()).toBe(1);
    expect(weeks[4][6].getDate()).toBe(5); // 5 de dezembro
  });

  it('formatDate e parseDate usam DD/MM/AAAA e rejeitam datas inexistentes', () => {
    expect(formatDate(new Date(2026, 0, 5))).toBe('05/01/2026');
    expect(parseDate('05/01/2026')?.getMonth()).toBe(0);
    expect(parseDate('31/02/2026')).toBeNull();
    expect(parseDate('5/1/2026')).toBeNull();
  });

  it('addMonths não estoura o fim do mês', () => {
    expect(addMonths(new Date(2026, 0, 31), 1).getDate()).toBe(28);
  });
});

describe('DatePicker', () => {
  it('mostra mês e ano, dias da semana e marca hoje e o selecionado', () => {
    render(<DatePicker today={today} defaultValue={new Date(2026, 10, 18)} />);
    expect(screen.getByRole('grid', { name: 'novembro 2026' })).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(7);
    expect(screen.getByRole('button', { name: /(^|, )3 de novembro de 2026/ })).toHaveAttribute('aria-current', 'date');
    expect(screen.getByRole('button', { name: /(^|, )18 de novembro de 2026/ }).closest('td')).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('seleciona um dia ao clicar e chama onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker today={today} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: /(^|, )10 de novembro de 2026/ }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].getDate()).toBe(10);
    expect(screen.getByRole('button', { name: /(^|, )10 de novembro de 2026/ }).closest('td')).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('navega entre meses pelos botões', async () => {
    const user = userEvent.setup();
    render(<DatePicker today={today} />);
    await user.click(screen.getByRole('button', { name: 'Próximo mês' }));
    expect(screen.getByRole('grid', { name: 'dezembro 2026' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Mês anterior' }));
    await user.click(screen.getByRole('button', { name: 'Mês anterior' }));
    expect(screen.getByRole('grid', { name: 'outubro 2026' })).toBeInTheDocument();
  });

  it('move o foco com as setas e PageDown muda de mês', async () => {
    const user = userEvent.setup();
    render(<DatePicker today={today} />);
    screen.getByRole('button', { name: /(^|, )3 de novembro de 2026/ }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: /(^|, )4 de novembro de 2026/ })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('button', { name: /(^|, )11 de novembro de 2026/ })).toHaveFocus();
    await user.keyboard('{PageDown}');
    expect(screen.getByRole('grid', { name: 'dezembro 2026' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /(^|, )11 de dezembro de 2026/ })).toHaveFocus();
  });

  it('dias desabilitados não podem ser escolhidos', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker today={today} onChange={onChange} isDateDisabled={(d) => d.getDate() === 10} />);
    const day = screen.getByRole('button', { name: /(^|, )10 de novembro de 2026/ });
    expect(day).toBeDisabled();
    await user.click(day);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('respeita minDate e maxDate', () => {
    render(<DatePicker today={today} minDate={new Date(2026, 10, 5)} maxDate={new Date(2026, 10, 20)} />);
    expect(screen.getByRole('button', { name: /(^|, )4 de novembro de 2026/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /(^|, )5 de novembro de 2026/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: /(^|, )21 de novembro de 2026/ })).toBeDisabled();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<DatePicker today={today} defaultValue={new Date(2026, 10, 18)} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
