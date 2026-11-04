import { forwardRef, type InputHTMLAttributes } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon/Icon';
import './search-field.css';

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'aria-label'> {
  /** Nome acessível (o campo não tem rótulo visível). */
  label: string;
  containerClassName?: string;
}

/** Campo de busca com ícone, usado na barra superior. */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { label, containerClassName, className, ...rest },
  ref,
) {
  return (
    <div className={cx('nds-search-field', containerClassName)}>
      <Icon name="search" size={20} className="nds-search-field__icon" />
      <input {...rest} ref={ref} type="search" aria-label={label} className={cx('nds-search-field__input', className)} />
    </div>
  );
});
