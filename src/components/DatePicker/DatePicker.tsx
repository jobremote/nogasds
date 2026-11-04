import { forwardRef, useEffect, useRef, useState, type HTMLAttributes, type KeyboardEvent } from 'react';
import { cx } from '../cx';
import { IconButton } from '../IconButton/IconButton';
import { addDays, addMonths, isSameDay, isSameMonth, monthWeeks, startOfDay } from './dates';
import './date-picker.css';

export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Data selecionada (controlado). */
  value?: Date | null;
  /** Data selecionada inicial (não controlado). */
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  /** Idioma dos nomes de mês e dia da semana. Padrão: `pt-BR`. */
  locale?: string;
  /** Datas que não podem ser escolhidas (Figma: Dia desabilitado). */
  isDateDisabled?: (date: Date) => boolean;
  minDate?: Date;
  maxDate?: Date;
  /** Define o dia de "hoje". Útil em testes e histórias; padrão: a data do sistema. */
  today?: Date;
  /** Rótulos dos botões de navegação. */
  previousMonthLabel?: string;
  nextMonthLabel?: string;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  {
    value: valueProp,
    defaultValue = null,
    onChange,
    locale = 'pt-BR',
    isDateDisabled,
    minDate,
    maxDate,
    today: todayProp,
    previousMonthLabel = 'Mês anterior',
    nextMonthLabel = 'Próximo mês',
    className,
    ...rest
  },
  ref,
) {
  const controlled = valueProp !== undefined;
  const [inner, setInner] = useState<Date | null>(defaultValue);
  const value = controlled ? valueProp : inner;
  const today = startOfDay(todayProp ?? new Date());
  const [focused, setFocused] = useState<Date>(() => startOfDay(value ?? today));
  const wantsFocus = useRef(false);
  const gridRef = useRef<HTMLTableElement>(null);

  const disabled = (date: Date) =>
    Boolean(
      (minDate && date < startOfDay(minDate)) || (maxDate && date > startOfDay(maxDate)) || isDateDisabled?.(date),
    );

  const select = (date: Date) => {
    if (disabled(date)) return;
    if (!controlled) setInner(date);
    onChange?.(date);
  };

  const moveFocus = (date: Date) => {
    wantsFocus.current = true;
    setFocused(date);
  };

  useEffect(() => {
    if (!wantsFocus.current) return;
    wantsFocus.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>('button[tabindex="0"]')?.focus();
  }, [focused]);

  const onKeyDown = (event: KeyboardEvent<HTMLTableElement>) => {
    const moves: Record<string, Date | undefined> = {
      ArrowLeft: addDays(focused, -1),
      ArrowRight: addDays(focused, 1),
      ArrowUp: addDays(focused, -7),
      ArrowDown: addDays(focused, 7),
      Home: addDays(focused, -focused.getDay()),
      End: addDays(focused, 6 - focused.getDay()),
      PageUp: addMonths(focused, event.shiftKey ? -12 : -1),
      PageDown: addMonths(focused, event.shiftKey ? 12 : 1),
    };
    const next = moves[event.key];
    if (next) {
      event.preventDefault();
      moveFocus(next);
    }
  };

  const parts = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).formatToParts(focused);
  const monthName = parts.find((part) => part.type === 'month')?.value ?? '';
  const year = parts.find((part) => part.type === 'year')?.value ?? '';
  const weekdayNarrow = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
  const weekdayLong = new Intl.DateTimeFormat(locale, { weekday: 'long' });
  const dayLabel = new Intl.DateTimeFormat(locale, { dateStyle: 'full' });
  const sunday = new Date(2023, 0, 1); // 1º/jan/2023 foi um domingo

  return (
    <div {...rest} ref={ref} className={cx('nds-date-picker', className)}>
      <div className="nds-date-picker__header">
        <IconButton
          icon="chevron-left"
          label={previousMonthLabel}
          size="md"
          onClick={() => setFocused(addMonths(focused, -1))}
        />
        <span className="nds-date-picker__title" aria-live="polite">
          {monthName} {year}
        </span>
        <IconButton icon="chevron-right" label={nextMonthLabel} size="md" onClick={() => setFocused(addMonths(focused, 1))} />
      </div>
      <table ref={gridRef} role="grid" className="nds-date-picker__grid" onKeyDown={onKeyDown} aria-label={`${monthName} ${year}`}>
        <thead>
          <tr>
            {Array.from({ length: 7 }, (_, index) => {
              const day = addDays(sunday, index);
              return (
                <th key={index} scope="col" abbr={weekdayLong.format(day)} className="nds-date-picker__weekday">
                  {weekdayNarrow.format(day).toUpperCase()}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {monthWeeks(focused).map((week) => (
            <tr key={week[0].getTime()}>
              {week.map((date) => {
                const outside = !isSameMonth(date, focused);
                const selected = isSameDay(date, value);
                const isToday = isSameDay(date, today);
                const off = disabled(date);
                return (
                  <td key={date.getTime()} role="gridcell" aria-selected={selected}>
                    <button
                      type="button"
                      tabIndex={isSameDay(date, focused) ? 0 : -1}
                      disabled={off}
                      aria-label={dayLabel.format(date)}
                      aria-current={isToday ? 'date' : undefined}
                      className={cx(
                        'nds-date-picker__day',
                        outside && 'nds-date-picker__day--outside',
                        selected && 'nds-date-picker__day--selected',
                        isToday && 'nds-date-picker__day--today',
                      )}
                      onClick={() => select(date)}
                    >
                      {date.getDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
