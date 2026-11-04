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
}

export const SuggestedAccount = forwardRef<HTMLDivElement, SuggestedAccountProps>(function SuggestedAccount(
  { name, handle, avatar, action, className, ...rest },
  ref,
) {
  return (
    <div {...rest} ref={ref} className={cx('nds-suggested-account', className)}>
      <Avatar {...avatar} name={name} size="md" />
      <div className="nds-suggested-account__names">
        <p className="nds-suggested-account__name">{name}</p>
        {handle ? <p className="nds-suggested-account__handle">{handle}</p> : null}
      </div>
      {action}
    </div>
  );
});
