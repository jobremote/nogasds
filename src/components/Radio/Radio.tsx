import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './radio.css';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Rótulo da opção. */
  label: ReactNode;
  /** Classe do contêiner externo (o `className` vai para o `<input>`). */
  containerClassName?: string;
}

/** Opção de escolha única. Agrupe opções com o mesmo `name` (e um `<fieldset>` com `<legend>`). */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, containerClassName, className, id: idProp, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <div className={cx('nds-radio', disabled && 'nds-radio--disabled', containerClassName)}>
      <label className="nds-radio__row" htmlFor={id}>
        <input {...rest} ref={ref} id={id} type="radio" disabled={disabled} className={cx('nds-radio__input', className)} />
        <span className="nds-radio__circle" aria-hidden="true" />
        <span className="nds-radio__label">{label}</span>
      </label>
    </div>
  );
});
