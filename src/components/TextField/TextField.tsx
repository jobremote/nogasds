import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './text-field.css';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Rótulo visível, associado ao campo. */
  label: ReactNode;
  /** Texto de ajuda, mostrado abaixo do campo. */
  helpText?: ReactNode;
  /** Mensagem de erro. Quando presente, o campo fica inválido (`aria-invalid`) e a mensagem substitui o texto de ajuda. */
  error?: ReactNode;
  /**
   * Figma: Trailing (booleano) + Ícone trailing. Ícone no fim do campo, de 20 px, na cor secundária:
   * um `<Icon>` decorativo ou um controle com ícone (por exemplo, o botão de mostrar/ocultar senha,
   * que precisa de nome acessível: use `<IconButton size="sm" ... />`).
   */
  trailingIcon?: ReactNode;
  /** Classe do contêiner externo (o `className` vai para o `<input>`). */
  containerClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    label,
    helpText,
    error,
    trailingIcon,
    containerClassName,
    className,
    id: idProp,
    disabled,
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
        hasError && 'nds-text-field--invalid',
        disabled && 'nds-text-field--disabled',
        containerClassName,
      )}
    >
      <label className="nds-text-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="nds-text-field__control">
        <input
          {...rest}
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={cx('nds-text-field__input', className)}
        />
        {trailingIcon ? <span className="nds-text-field__trailing">{trailingIcon}</span> : null}
      </div>
      {message ? (
        <p id={messageId} className="nds-text-field__message">
          {message}
        </p>
      ) : null}
    </div>
  );
});
