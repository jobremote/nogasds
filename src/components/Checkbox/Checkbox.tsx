import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon/Icon';
import './checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Rótulo. Aceita conteúdo rico, inclusive links (`<Link>`). */
  label: ReactNode;
  /** Mensagem de erro. Quando presente, o campo fica inválido (`aria-invalid`). */
  error?: ReactNode;
  /** Classe do contêiner externo (o `className` vai para o `<input>`). */
  containerClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, containerClassName, className, id: idProp, disabled, 'aria-describedby': describedByProp, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const messageId = `${id}-message`;
  const hasError = Boolean(error);
  const describedBy = [describedByProp, hasError ? messageId : undefined].filter(Boolean).join(' ') || undefined;

  return (
    <div
      className={cx(
        'nds-checkbox',
        hasError && 'nds-checkbox--invalid',
        disabled && 'nds-checkbox--disabled',
        containerClassName,
      )}
    >
      <label className="nds-checkbox__row" htmlFor={id}>
        <input
          {...rest}
          ref={ref}
          id={id}
          type="checkbox"
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={cx('nds-checkbox__input', className)}
        />
        <span className="nds-checkbox__box" aria-hidden="true">
          <Icon name="check" size={16} className="nds-checkbox__mark" />
        </span>
        <span className="nds-checkbox__label">{label}</span>
      </label>
      {hasError ? (
        <p id={messageId} className="nds-checkbox__message">
          {error}
        </p>
      ) : null}
    </div>
  );
});
