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
  /** Contadores: passe vários `<Stat>`; o componente já os coloca dentro de um `<dl>`. */
  stats?: ReactNode;
  /** Quando informado, o avatar e o nome viram um só link para esse endereço (por exemplo, a página do perfil). */
  href?: string;
  /** Nome acessível do link (padrão: o texto do nome e do identificador). */
  linkLabel?: string;
}

export const ProfileSummary = forwardRef<HTMLElement, ProfileSummaryProps>(function ProfileSummary(
  { name, handle, avatar, bio, stats, href, linkLabel, className, ...rest },
  ref,
) {
  const identity = (
    <>
      <Avatar {...avatar} name={name} size="lg" />
      <div className="nds-profile-summary__names">
        <p className="nds-profile-summary__name">{name}</p>
        {handle ? <p className="nds-profile-summary__handle">{handle}</p> : null}
      </div>
    </>
  );
  return (
    <section {...rest} ref={ref} aria-label={name} className={cx('nds-profile-summary', className)}>
      {href !== undefined ? (
        <a className="nds-profile-summary__identity nds-profile-summary__identity--link" href={href} aria-label={linkLabel}>
          {identity}
        </a>
      ) : (
        <div className="nds-profile-summary__identity">{identity}</div>
      )}
      {bio ? <p className="nds-profile-summary__bio">{bio}</p> : null}
      {stats ? <dl className="nds-profile-summary__stats">{stats}</dl> : null}
    </section>
  );
});
