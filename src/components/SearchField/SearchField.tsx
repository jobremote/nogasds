import { forwardRef, useCallback, useRef, type InputHTMLAttributes, type MutableRefObject, type Ref } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon/Icon';
import './search-field.css';

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'aria-label'> {
  /** Nome acessível (o campo não tem rótulo visível). */
  label: string;
  /**
   * Mostra o botão **X** de limpar quando o campo tem texto (use com `value`, campo controlado). Ao clicar, chama a
   * função, que deve esvaziar o valor; o foco volta para o campo.
   */
  onClear?: () => void;
  /** Nome acessível do botão de limpar. Padrão: "Limpar busca". */
  clearLabel?: string;
  containerClassName?: string;
}

/** Campo de busca com ícone e, opcionalmente, um X para limpar (Figma: Campo de busca). */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { label, onClear, clearLabel = 'Limpar busca', containerClassName, className, value, ...rest },
  ref,
) {
  const input = useRef<HTMLInputElement | null>(null);
  const setRef = useCallback(
    (node: HTMLInputElement | null) => {
      input.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as MutableRefObject<HTMLInputElement | null>).current = node;
    },
    [ref],
  );
  const hasText = value !== undefined && value !== null && String(value) !== '';

  return (
    <div className={cx('nds-search-field', containerClassName)}>
      <Icon name="search" size={20} className="nds-search-field__icon" />
      <input
        {...rest}
        ref={setRef as Ref<HTMLInputElement>}
        value={value}
        type="search"
        aria-label={label}
        className={cx('nds-search-field__input', className)}
      />
      {onClear && hasText ? (
        <button
          type="button"
          className="nds-search-field__clear"
          aria-label={clearLabel}
          onClick={() => {
            onClear();
            input.current?.focus();
          }}
        >
          <Icon name="close" size={20} />
        </button>
      ) : null}
    </div>
  );
});
