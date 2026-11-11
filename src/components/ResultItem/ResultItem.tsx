import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './result-item.css';

export interface ResultItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title'> {
  title: ReactNode;
  /** Linha de apoio (por exemplo, ano e plataformas). */
  detail?: ReactNode;
  /** Capa em miniatura. Sem ela, mostra o espaço reservado. */
  thumbnail?: string;
  /** Ação à direita: um botão "Adicionar" ou um selo de status (Figma: Resultado de jogo). */
  action?: ReactNode;
}

/** Linha de resultado de busca com capa, título, apoio e uma ação. Use dentro de uma lista (`<ul>`). */
export const ResultItem = forwardRef<HTMLLIElement, ResultItemProps>(function ResultItem(
  { title, detail, thumbnail, action, className, ...rest },
  ref,
) {
  return (
    <li {...rest} ref={ref} className={cx('nds-result-item', className)}>
      <div className="nds-result-item__thumbnail" aria-hidden="true">
        {thumbnail ? <img src={thumbnail} alt="" /> : null}
      </div>
      <div className="nds-result-item__text">
        <p className="nds-result-item__title">{title}</p>
        {detail ? <p className="nds-result-item__detail">{detail}</p> : null}
      </div>
      {action ? <div className="nds-result-item__action">{action}</div> : null}
    </li>
  );
});
