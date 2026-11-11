import { forwardRef, useId, type FieldsetHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './duration-field.css';

export interface DurationValue {
  hours: number | null;
  minutes: number | null;
}

export interface DurationFieldProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange' | 'value' | 'defaultValue'> {
  /** Rótulo visível do grupo (por exemplo, "Tempo de jogo"). */
  label: ReactNode;
  value: DurationValue;
  onChange: (value: DurationValue) => void;
  helpText?: ReactNode;
  /** Mensagem de erro. Quando presente, o grupo fica inválido e a mensagem substitui o texto de ajuda. */
  error?: ReactNode;
  /** Limite de horas. Padrão: 9999. */
  maxHours?: number;
  /** Com `name`, os campos entram no envio de formulário como `<name>Hours` e `<name>Minutes`. */
  name?: string;
}

const toNumber = (text: string, max: number): number | null => {
  if (text.trim() === '') return null;
  const parsed = Math.trunc(Number(text));
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return Math.min(parsed, max);
};

/** Campo de tempo em horas e minutos (Figma: Campo de tempo). Cada parte pode ficar vazia. */
export const DurationField = forwardRef<HTMLFieldSetElement, DurationFieldProps>(function DurationField(
  { label, value, onChange, helpText, error, maxHours = 9999, name, disabled, className, ...rest },
  ref,
) {
  const id = useId();
  const messageId = `${id}-message`;
  const hasError = Boolean(error);
  const message = hasError ? error : helpText;

  const field = (part: 'hours' | 'minutes', text: string, max: number) => (
    <div className="nds-duration__part">
      <input
        id={`${id}-${part}`}
        type="number"
        inputMode="numeric"
        min={0}
        max={max}
        step={1}
        name={name ? `${name}${part === 'hours' ? 'Hours' : 'Minutes'}` : undefined}
        value={value[part] ?? ''}
        placeholder="0"
        aria-label={text}
        aria-invalid={hasError || undefined}
        className="nds-duration__input"
        onChange={(event) => onChange({ ...value, [part]: toNumber(event.target.value, max) })}
      />
      <span className="nds-duration__unit" aria-hidden="true">
        {part === 'hours' ? 'h' : 'min'}
      </span>
    </div>
  );

  return (
    <fieldset
      {...rest}
      ref={ref}
      disabled={disabled}
      aria-describedby={message ? messageId : undefined}
      className={cx('nds-duration', hasError && 'nds-duration--invalid', className)}
    >
      <legend className="nds-duration__legend">{label}</legend>
      <div className="nds-duration__row">
        {field('hours', 'Horas', maxHours)}
        {field('minutes', 'Minutos', 59)}
      </div>
      {message ? (
        <p id={messageId} className="nds-duration__message">
          {message}
        </p>
      ) : null}
    </fieldset>
  );
});
