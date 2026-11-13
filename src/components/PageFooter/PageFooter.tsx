import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './page-footer.css';

export interface PageFooterLink {
  label: string;
  href: string;
}

export interface PageFooterProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Linha de atribuição ou crédito, por exemplo `Powered by <a href="…">Fonte</a>`. */
  attribution?: ReactNode;
  /** Links institucionais, separados por um ponto. */
  links?: PageFooterLink[];
  /** Nome acessível da lista de links. Padrão: "Links do rodapé". */
  linksLabel?: string;
}

/** Rodapé da página (Figma: Rodapé da página): atribuição e links institucionais, só texto, centralizados. */
export const PageFooter = forwardRef<HTMLElement, PageFooterProps>(function PageFooter(
  { attribution, links, linksLabel = 'Links do rodapé', className, ...rest },
  ref,
) {
  return (
    <footer {...rest} ref={ref} className={cx('nds-page-footer', className)}>
      {attribution ? <p className="nds-page-footer__attribution">{attribution}</p> : null}
      {links && links.length > 0 ? (
        <nav aria-label={linksLabel}>
          <ul className="nds-page-footer__links">
            {links.map((link, index) => (
              <li key={link.href} className="nds-page-footer__item">
                {index > 0 ? (
                  <span className="nds-page-footer__dot" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <a className="nds-page-footer__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </footer>
  );
});
