import { forwardRef, useRef, useState, type HTMLAttributes, type KeyboardEvent } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon/Icon';
import './rating.css';

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Nome acessível do grupo, por exemplo "Nota". */
  label: string;
  /** Nota de 0 a `max` (controlado). */
  value?: number;
  /** Nota inicial (não controlado). */
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Quantidade de estrelas. Padrão: 5. */
  max?: number;
  /** Só exibe a nota, sem permitir mudança. */
  readOnly?: boolean;
  disabled?: boolean;
  /** Texto acessível de cada estrela. Padrão: "1 estrela", "2 estrelas"... */
  getStarLabel?: (value: number) => string;
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(function Rating(
  {
    label,
    value: valueProp,
    defaultValue = 0,
    onChange,
    max = 5,
    readOnly,
    disabled,
    getStarLabel = (n) => `${n} ${n === 1 ? 'estrela' : 'estrelas'}`,
    className,
    ...rest
  },
  ref,
) {
  const controlled = valueProp !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const value = controlled ? valueProp : inner;
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const stars = Array.from({ length: max }, (_, index) => index + 1);

  const set = (next: number) => {
    if (!controlled) setInner(next);
    onChange?.(next);
  };

  if (readOnly) {
    return (
      <div
        {...rest}
        ref={ref}
        role="img"
        aria-label={`${label}: ${value} de ${max}`}
        className={cx('nds-rating', 'nds-rating--readonly', className)}
      >
        {stars.map((n) => (
          <Icon key={n} name={n <= value ? 'star-fill' : 'star'} size={32} className={cx('nds-rating__star', n <= value && 'nds-rating__star--on')} />
        ))}
      </div>
    );
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, n: number) => {
    const delta = event.key === 'ArrowRight' || event.key === 'ArrowUp' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowDown' ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = Math.min(max, Math.max(1, n + delta));
    set(next);
    buttons.current[next - 1]?.focus();
  };

  const tabbable = value >= 1 ? value : 1;

  return (
    <div
      {...rest}
      ref={ref}
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled || undefined}
      className={cx('nds-rating', disabled && 'nds-rating--disabled', className)}
    >
      {stars.map((n) => (
        <button
          key={n}
          ref={(node) => {
            buttons.current[n - 1] = node;
          }}
          type="button"
          role="radio"
          aria-checked={n === value}
          aria-label={getStarLabel(n)}
          tabIndex={n === tabbable ? 0 : -1}
          disabled={disabled}
          className="nds-rating__button"
          onClick={() => set(n === value ? 0 : n)}
          onKeyDown={(event) => onKeyDown(event, n)}
        >
          <Icon name={n <= value ? 'star-fill' : 'star'} size={32} className={cx('nds-rating__star', n <= value && 'nds-rating__star--on')} />
        </button>
      ))}
    </div>
  );
});
