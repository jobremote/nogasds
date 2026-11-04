import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon/Icon';
import './tag.css';

export interface TagProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Texto da tag. */
  children: ReactNode;
  /** Figma: Estado Selecionado. Quando definido, o botão vira um alternador (`aria-pressed`). */
  selected?: boolean;
  /** Figma: Removível. Mostra o botão de remover e chama a função ao ativá-lo. */
  onRemove?: () => void;
  /** Nome acessível do botão de remover. Padrão: "Remover". */
  removeLabel?: string;
}

export const Tag = forwardRef<HTMLButtonElement, TagProps>(function Tag(
  { children, selected, onRemove, removeLabel = 'Remover', className, disabled, type = 'button', ...rest },
  ref,
) {
  return (
    <span className={cx('nds-tag', selected && 'nds-tag--selected', disabled && 'nds-tag--disabled', className)}>
      <button
        {...rest}
        ref={ref}
        type={type}
        disabled={disabled}
        aria-pressed={selected === undefined ? undefined : selected}
        className="nds-tag__button"
      >
        {children}
      </button>
      {onRemove ? (
        <button
          type="button"
          className="nds-tag__remove"
          aria-label={typeof children === 'string' ? `${removeLabel}: ${children}` : removeLabel}
          disabled={disabled}
          onClick={onRemove}
        >
          <Icon name="close" size={16} />
        </button>
      ) : null}
    </span>
  );
});
