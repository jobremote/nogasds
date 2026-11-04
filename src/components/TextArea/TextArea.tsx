import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { cx } from '../cx';
import '../TextField/text-field.css';
import './text-area.css';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Rótulo visível, associado ao campo. */
  label: ReactNode;
  /** Texto de ajuda, mostrado abaixo do campo. */
  helpText?: ReactNode;
  /** Mensagem de erro. Quando presente, o campo fica inválido (`aria-invalid`). */
  error?: ReactNode;
  /** Classe do contêiner externo (o `className` vai para o `<textarea>`). */
  containerClassName?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    label,
    helpText,
    error,
    containerClassName,
    className,
    id: idProp,
    disabled,
    rows = 4,
    'aria-describedby': describedByProp,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const messageId = `${id}-message`;
  const hasError = Boolean(error);
  const message = hasError ? error : helpText;
  const describedBy = [describedByProp, message ? messageId : undefined].filter(Boolean).join(' ') || undefined;

  return (
    <div
      className={cx(
        'nds-text-field',
        'nds-text-area',
        hasError && 'nds-text-field--invalid',
        disabled && 'nds-text-field--disabled',
        containerClassName,
      )}
    >
      <label className="nds-text-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="nds-text-field__control">
        <textarea
          {...rest}
          ref={ref}
          id={id}
          rows={rows}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={cx('nds-text-field__input', 'nds-text-area__input', className)}
        />
      </div>
      {message ? (
        <p id={messageId} className="nds-text-field__message">
          {message}
        </p>
      ) : null}
    </div>
  );
});
