import { forwardRef, useId, type FieldsetHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Select } from '../Select/Select';
import './month-year-field.css';

export interface MonthYearValue {
  /** 1 a 12, ou `null` quando não escolhido. */
  month: number | null;
  year: number | null;
}

export const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
] as const;

export interface MonthYearFieldProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange' | 'value' | 'defaultValue'> {
  /** Rótulo visível do grupo (por exemplo, "Início"). */
  label: ReactNode;
  value: MonthYearValue;
  onChange: (value: MonthYearValue) => void;
  /** Texto de ajuda abaixo dos campos. */
  helpText?: ReactNode;
  /** Mensagem de erro. Quando presente, o grupo fica inválido e a mensagem substitui o texto de ajuda. */
  error?: ReactNode;
  /** Primeiro e último ano da lista. Padrão: de 1970 até o ano de `maxYear` (o atual). */
  minYear?: number;
  maxYear?: number;
  /** Nomes acessíveis dos dois campos e texto da opção vazia. */
  monthLabel?: string;
  yearLabel?: string;
  /** Com `name`, os campos entram no envio de formulário como `<name>Month` e `<name>Year`. */
  name?: string;
}

/** Campo de data só com mês e ano (Figma: Campo de mês/ano). Cada parte pode ficar vazia. */
export const MonthYearField = forwardRef<HTMLFieldSetElement, MonthYearFieldProps>(function MonthYearField(
  {
    label,
    value,
    onChange,
    helpText,
    error,
    minYear = 1970,
    maxYear = new Date().getFullYear(),
    monthLabel = 'Mês',
    yearLabel = 'Ano',
    name,
    disabled,
    className,
    ...rest
  },
  ref,
) {
  const messageId = useId();
  const hasError = Boolean(error);
  const message = hasError ? error : helpText;
  const years: number[] = [];
  for (let year = maxYear; year >= minYear; year -= 1) years.push(year);
  // Um ano fora da lista (dado antigo) continua aparecendo, em vez de sumir sem aviso.
  if (value.year !== null && !years.includes(value.year)) years.push(value.year);

  const part = (text: string) => <span className="nds-month-year__hidden-label">{text}</span>;

  return (
    <fieldset
      {...rest}
      ref={ref}
      disabled={disabled}
      aria-describedby={message ? messageId : undefined}
      aria-invalid={hasError || undefined}
      className={cx('nds-month-year', hasError && 'nds-month-year--invalid', className)}
    >
      <legend className="nds-month-year__legend">{label}</legend>
      <div className="nds-month-year__row">
        <Select
          label={part(monthLabel)}
          placeholder={null}
          name={name ? `${name}Month` : undefined}
          value={value.month === null ? '' : String(value.month)}
          error={hasError ? ' ' : undefined}
          onChange={(event) => onChange({ ...value, month: event.target.value === '' ? null : Number(event.target.value) })}
        >
          <option value="">{monthLabel}</option>
          {MONTH_NAMES.map((month, index) => (
            <option key={month} value={index + 1}>
              {month}
            </option>
          ))}
        </Select>
        <Select
          label={part(yearLabel)}
          placeholder={null}
          name={name ? `${name}Year` : undefined}
          value={value.year === null ? '' : String(value.year)}
          error={hasError ? ' ' : undefined}
          onChange={(event) => onChange({ ...value, year: event.target.value === '' ? null : Number(event.target.value) })}
        >
          <option value="">{yearLabel}</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </div>
      {message ? (
        <p id={messageId} className="nds-month-year__message">
          {message}
        </p>
      ) : null}
    </fieldset>
  );
});
