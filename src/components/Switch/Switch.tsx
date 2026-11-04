import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './switch.css';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'role'> {
  /** Rótulo do interruptor. */
  label: ReactNode;
  /** Classe do contêiner externo (o `className` vai para o `<input>`). */
  containerClassName?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, containerClassName, className, id: idProp, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <div className={cx('nds-switch', disabled && 'nds-switch--disabled', containerClassName)}>
      <label className="nds-switch__row" htmlFor={id}>
        <input
          {...rest}
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          disabled={disabled}
          className={cx('nds-switch__input', className)}
        />
        <span className="nds-switch__track" aria-hidden="true">
          <span className="nds-switch__thumb" />
        </span>
        <span className="nds-switch__label">{label}</span>
      </label>
    </div>
  );
});
