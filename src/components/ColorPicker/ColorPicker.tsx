import { forwardRef, useId, type FieldsetHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon/Icon';
import type { TagColor } from '../Tag/Tag';
import './color-picker.css';

export const COLOR_LABELS: Record<TagColor, string> = {
  neutral: 'Neutro',
  wine: 'Vinho',
  petrol: 'Petróleo',
  olive: 'Oliva',
  rose: 'Rosa',
  sky: 'Céu',
};

const ORDER: TagColor[] = ['neutral', 'wine', 'petrol', 'olive', 'rose', 'sky'];

export interface ColorPickerProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange' | 'defaultValue'> {
  /** Rótulo visível do grupo (por exemplo, "Cor"). */
  label: ReactNode;
  value: TagColor;
  onChange: (value: TagColor) => void;
  /** Com `name`, a cor escolhida entra no envio de formulário. */
  name?: string;
  /** Nomes das cores (padrão em português). */
  labels?: Record<TagColor, string>;
}

/** Seletor das 6 cores de tag (Figma: Seletor de cor). Escolha única, com seta do teclado entre as cores. */
export const ColorPicker = forwardRef<HTMLFieldSetElement, ColorPickerProps>(function ColorPicker(
  { label, value, onChange, name, labels = COLOR_LABELS, disabled, className, ...rest },
  ref,
) {
  const autoName = useId();
  const group = name ?? autoName;
  return (
    <fieldset {...rest} ref={ref} disabled={disabled} className={cx('nds-color-picker', className)}>
      <legend className="nds-color-picker__legend">{label}</legend>
      <div className="nds-color-picker__options">
        {ORDER.map((color) => (
          <label key={color} className={cx('nds-color-picker__option', `nds-color-picker__option--${color}`)}>
            <input
              type="radio"
              className="nds-color-picker__input"
              name={group}
              value={color}
              checked={value === color}
              disabled={disabled}
              onChange={() => onChange(color)}
            />
            <span className="nds-color-picker__swatch" aria-hidden="true">
              {value === color ? <Icon name="check" size={16} /> : null}
            </span>
            <span className="nds-color-picker__name">{labels[color]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
});
