import { forwardRef, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { cx } from '../cx';
import { DatePicker, type DatePickerProps } from '../DatePicker/DatePicker';
import { formatDate, parseDate } from '../DatePicker/dates';
import { Icon } from '../Icon/Icon';
import { TextField, type TextFieldProps } from '../TextField/TextField';
import './date-field.css';

export interface DateFieldProps
  extends Omit<TextFieldProps, 'value' | 'defaultValue' | 'onChange' | 'endSlot' | 'type' | 'label'> {
  label: ReactNode;
  /** Data (controlado). */
  value?: Date | null;
  /** Data inicial (não controlado). */
  defaultValue?: Date | null;
  /** Chamado com a data ao digitar uma data completa e válida (DD/MM/AAAA), ao escolher no calendário ou com `null` ao limpar. */
  onChange?: (date: Date | null) => void;
  /** Opções repassadas ao calendário. */
  calendarProps?: Pick<DatePickerProps, 'locale' | 'isDateDisabled' | 'minDate' | 'maxDate' | 'today'>;
  /** Nome acessível do botão que abre o calendário. */
  openCalendarLabel?: string;
}

export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(function DateField(
  {
    value: valueProp,
    defaultValue = null,
    onChange,
    calendarProps,
    openCalendarLabel = 'Abrir calendário',
    placeholder = 'DD/MM/AAAA',
    containerClassName,
    disabled,
    ...rest
  },
  ref,
) {
  const controlled = valueProp !== undefined;
  const [inner, setInner] = useState<Date | null>(defaultValue);
  const date = controlled ? valueProp : inner;
  const [text, setText] = useState(date ? formatDate(date) : '');
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const popoverId = useId();

  // Mantém o texto em sincronia quando a data muda por fora (modo controlado).
  useEffect(() => {
    if (!controlled) return;
    setText((current) => {
      const parsed = parseDate(current);
      const same = valueProp ? parsed?.getTime() === valueProp.getTime() : parsed === null;
      return same ? current : valueProp ? formatDate(valueProp) : '';
    });
  }, [controlled, valueProp]);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const commit = (next: Date | null) => {
    if (!controlled) setInner(next);
    onChange?.(next);
  };

  return (
    <div ref={root} className={cx('nds-date-field', containerClassName)}>
      <TextField
        {...rest}
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder={placeholder}
        disabled={disabled}
        value={text}
        onChange={(event) => {
          const next = event.target.value;
          setText(next);
          const parsed = parseDate(next);
          if (parsed) commit(parsed);
          else if (next === '' && date) commit(null);
        }}
        endSlot={
          <button
            ref={toggle}
            type="button"
            className="nds-date-field__toggle"
            aria-label={openCalendarLabel}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={open ? popoverId : undefined}
            disabled={disabled}
            onClick={() => setOpen((current) => !current)}
          >
            <Icon name="calendar-today" size={16} />
          </button>
        }
      />
      {open ? (
        <div id={popoverId} role="dialog" aria-label={openCalendarLabel} className="nds-date-field__popover">
          <DatePicker
            {...calendarProps}
            value={date}
            onChange={(picked) => {
              setText(formatDate(picked));
              commit(picked);
              setOpen(false);
              toggle.current?.focus();
            }}
          />
        </div>
      ) : null}
    </div>
  );
});
