import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon/Icon';
import '../TextField/text-field.css';
import './select.css';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Rótulo visível, associado ao campo. */
  label: ReactNode;
  /** Texto de ajuda, mostrado abaixo do campo. */
  helpText?: ReactNode;
  /** Mensagem de erro. Quando presente, o campo fica inválido (`aria-invalid`). */
  error?: ReactNode;
  /** Texto da opção vazia inicial (Figma: "Selecione"). Use `null` para não mostrar. */
  placeholder?: string | null;
  /** Classe do contêiner externo (o `className` vai para o `<select>`). */
  containerClassName?: string;
}

/**
 * Combo box fechado, feito sobre o `<select>` nativo: teclado, leitor de tela e lista aberta
 * vêm do navegador (a lista aberta ainda não existe no Figma).
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    helpText,
    error,
    placeholder = 'Selecione',
    containerClassName,
    className,
    id: idProp,
    disabled,
    children,
    defaultValue,
    value,
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
  const controlled = value !== undefined;
  const hasPlaceholder = placeholder !== null;

  return (
    <div
      className={cx(
        'nds-text-field',
        'nds-select',
        hasError && 'nds-text-field--invalid',
        disabled && 'nds-text-field--disabled',
        containerClassName,
      )}
    >
      <label className="nds-text-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="nds-text-field__control">
        <select
          {...rest}
          ref={ref}
          id={id}
          disabled={disabled}
          required={rest.required}
          {...(controlled ? { value } : { defaultValue: defaultValue ?? (hasPlaceholder ? '' : undefined) })}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={cx('nds-text-field__input', 'nds-select__input', className)}
        >
          {hasPlaceholder ? (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          ) : null}
          {children}
        </select>
        <Icon name="keyboard-arrow-down" size={24} className="nds-select__arrow" />
      </div>
      {message ? (
        <p id={messageId} className="nds-text-field__message">
          {message}
        </p>
      ) : null}
    </div>
  );
});
