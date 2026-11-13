import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Avatar, type AvatarProps } from '../Avatar/Avatar';
import './suggested-account.css';

export interface SuggestedAccountProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  handle?: string;
  /** Propriedades do avatar (estilo, foto...). O tamanho é sempre médio. */
  avatar?: Omit<AvatarProps, 'name' | 'size'>;
  /** Ação à direita, normalmente um `<Button variant="outline" size="sm">`. */
  action?: ReactNode;
  /**
   * Quando informado, o avatar e os nomes viram **um só link** para esse endereço (por exemplo, o perfil da pessoa);
   * a `action` fica de fora do link.
   */
  href?: string;
  /** Nome acessível do link (padrão: o nome da conta). */
  linkLabel?: string;
}

export const SuggestedAccount = forwardRef<HTMLDivElement, SuggestedAccountProps>(function SuggestedAccount(
  { name, handle, avatar, action, href, linkLabel, className, ...rest },
  ref,
) {
  const identity = (
    <>
      <Avatar {...avatar} name={name} size="md" />
      <div className="nds-suggested-account__names">
        <p className="nds-suggested-account__name">{name}</p>
        {handle ? <p className="nds-suggested-account__handle">{handle}</p> : null}
      </div>
    </>
  );
  return (
    <div {...rest} ref={ref} className={cx('nds-suggested-account', className)}>
      {href !== undefined ? (
        <a className="nds-suggested-account__identity nds-suggested-account__identity--link" href={href} aria-label={linkLabel}>
          {identity}
        </a>
      ) : (
        <div className="nds-suggested-account__identity">{identity}</div>
      )}
      {action}
    </div>
  );
});
