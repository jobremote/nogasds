import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ClipboardEvent,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cx } from '../cx';
import './code-field.css';

export interface CodeFieldProps {
  /** Rótulo visível do grupo. */
  label: ReactNode;
  /** Texto de ajuda, mostrado abaixo das caixas. */
  helpText?: ReactNode;
  /** Mensagem de erro. Quando presente, as caixas ficam inválidas (`aria-invalid`) e a mensagem substitui o texto de ajuda. */
  error?: ReactNode;
  /** Quantidade de dígitos (um por caixa). Padrão: 6. */
  length?: number;
  /** Valor controlado (somente dígitos, no máximo `length`). */
  value?: string;
  /** Valor inicial quando não controlado. */
  defaultValue?: string;
  /** Chamado a cada mudança, com os dígitos atuais (de 0 a `length` caracteres). */
  onChange?: (value: string) => void;
  /** Chamado quando todas as caixas ficam preenchidas. */
  onComplete?: (value: string) => void;
  disabled?: boolean;
  /** Foca a primeira caixa ao montar. */
  autoFocus?: boolean;
  /** Nome do campo, para envio em formulários (um `<input type="hidden">` leva o código inteiro). */
  name?: string;
  /** Texto acessível de cada caixa. Padrão: "Dígito 1 de 6". */
  getDigitLabel?: (index: number, length: number) => string;
  className?: string;
  id?: string;
}

export interface CodeFieldHandle {
  focus: () => void;
}

const onlyDigits = (text: string) => text.replace(/\D/g, '');

export const CodeField = forwardRef<CodeFieldHandle, CodeFieldProps>(function CodeField(
  {
    label,
    helpText,
    error,
    length = 6,
    value: valueProp,
    defaultValue = '',
    onChange,
    onComplete,
    disabled,
    autoFocus,
    name,
    getDigitLabel = (index, total) => `Dígito ${index + 1} de ${total}`,
    className,
    id: idProp,
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const labelId = `${id}-label`;
  const messageId = `${id}-message`;
  const controlled = valueProp !== undefined;
  const [inner, setInner] = useState(() => onlyDigits(defaultValue).slice(0, length));
  const value = (controlled ? onlyDigits(valueProp) : inner).slice(0, length);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const hasError = Boolean(error);
  const message = hasError ? error : helpText;

  const focusAt = (index: number) => {
    const target = inputs.current[Math.max(0, Math.min(length - 1, index))];
    target?.focus();
    target?.select();
  };

  useImperativeHandle(ref, () => ({ focus: () => focusAt(Math.min(value.length, length - 1)) }));

  useEffect(() => {
    if (autoFocus) inputs.current[0]?.focus();
    // somente na montagem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const commit = (next: string) => {
    if (!controlled) setInner(next);
    if (next !== value) onChange?.(next);
    if (next.length === length && next !== value) onComplete?.(next);
  };

  const digitAt = (index: number) => value[index] ?? '';

  const replaceFrom = (index: number, digits: string) => {
    // Preenche a partir da caixa `index`, sem deixar lacunas à esquerda.
    const chars = value.padEnd(index, ' ').split('');
    for (let i = 0; i < digits.length && index + i < length; i += 1) chars[index + i] = digits[i];
    const next = chars.join('').slice(0, length);
    // Lacunas viram vazio: o valor só guarda dígitos contíguos a partir da esquerda.
    commit(next.replace(/ /g, ''));
    return Math.min(index + digits.length, length - 1);
  };

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const digits = onlyDigits(event.target.value);
    if (!digits) return;
    // Se a caixa já tinha um dígito, o novo é o que não estava lá.
    const typed = digits.length > 1 ? digits.replace(digitAt(index), '') || digits : digits;
    const nextIndex = replaceFrom(index, typed.slice(-1));
    focusAt(nextIndex === index ? index : nextIndex);
  };

  const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      if (digitAt(index)) {
        commit(value.slice(0, index) + value.slice(index + 1));
      } else if (index > 0) {
        commit(value.slice(0, index - 1) + value.slice(index));
        focusAt(index - 1);
      }
    } else if (event.key === 'Delete') {
      event.preventDefault();
      if (digitAt(index)) commit(value.slice(0, index) + value.slice(index + 1));
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusAt(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusAt(index + 1);
    }
  };

  const handlePaste = (index: number) => (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const digits = onlyDigits(event.clipboardData.getData('text'));
    if (!digits) return;
    // Código inteiro colado: ocupa todas as caixas, não importa onde estava o foco.
    const start = digits.length >= length ? 0 : index;
    const last = replaceFrom(start, digits.slice(0, length));
    focusAt(last);
  };

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      aria-describedby={message ? messageId : undefined}
      className={cx('nds-code-field', hasError && 'nds-code-field--invalid', disabled && 'nds-code-field--disabled', className)}
    >
      <span id={labelId} className="nds-code-field__label">
        {label}
      </span>
      <div className="nds-code-field__boxes">
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(node) => {
              inputs.current[index] = node;
            }}
            className="nds-code-field__box"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={2}
            value={digitAt(index)}
            disabled={disabled}
            aria-label={getDigitLabel(index, length)}
            aria-invalid={hasError || undefined}
            onChange={handleChange(index)}
            onKeyDown={handleKeyDown(index)}
            onPaste={handlePaste(index)}
            onFocus={(event) => event.target.select()}
          />
        ))}
      </div>
      {name ? <input type="hidden" name={name} value={value} /> : null}
      {message ? (
        <p id={messageId} className="nds-code-field__message">
          {message}
        </p>
      ) : null}
    </div>
  );
});
