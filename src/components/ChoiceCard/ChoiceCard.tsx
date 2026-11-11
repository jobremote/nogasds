import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './choice-card.css';

export interface ChoiceCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'title'> {
  /** Título da opção (por exemplo, o nome do status). */
  title: ReactNode;
  /** Explicação curta abaixo do título. */
  description?: ReactNode;
  /** Classe do contêiner externo (o `className` vai para o `<input>`). */
  containerClassName?: string;
}

/** Opção de escolha única em formato de cartão (Figma: Opção de status). Agrupe com o mesmo `name`, num `<fieldset>`. */
export const ChoiceCard = forwardRef<HTMLInputElement, ChoiceCardProps>(function ChoiceCard(
  { title, description, containerClassName, className, id: idProp, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <div className={cx('nds-choice-card', disabled && 'nds-choice-card--disabled', containerClassName)}>
      <input {...rest} ref={ref} id={id} type="radio" disabled={disabled} className={cx('nds-choice-card__input', className)} />
      <label className="nds-choice-card__body" htmlFor={id}>
        <span className="nds-choice-card__title">{title}</span>
        {description ? <span className="nds-choice-card__description">{description}</span> : null}
      </label>
    </div>
  );
});
