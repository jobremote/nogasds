import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Avatar, type AvatarProps } from '../Avatar/Avatar';
import './profile-summary.css';

export interface ProfileSummaryProps extends HTMLAttributes<HTMLElement> {
  name: string;
  /** Identificador exibido abaixo do nome, por exemplo `@usuario`. */
  handle?: string;
  /** Propriedades do avatar (estilo, foto...). O tamanho é sempre grande. */
  avatar?: Omit<AvatarProps, 'name' | 'size'>;
  /** Texto de apresentação. */
  bio?: ReactNode;
  /** Contadores: use vários `<Stat>` dentro de um `<dl>`. */
  stats?: ReactNode;
}

export const ProfileSummary = forwardRef<HTMLElement, ProfileSummaryProps>(function ProfileSummary(
  { name, handle, avatar, bio, stats, className, ...rest },
  ref,
) {
  return (
    <section {...rest} ref={ref} aria-label={name} className={cx('nds-profile-summary', className)}>
      <div className="nds-profile-summary__identity">
        <Avatar {...avatar} name={name} size="lg" />
        <div className="nds-profile-summary__names">
          <p className="nds-profile-summary__name">{name}</p>
          {handle ? <p className="nds-profile-summary__handle">{handle}</p> : null}
        </div>
      </div>
      {bio ? <p className="nds-profile-summary__bio">{bio}</p> : null}
      {stats ? <dl className="nds-profile-summary__stats">{stats}</dl> : null}
    </section>
  );
});
