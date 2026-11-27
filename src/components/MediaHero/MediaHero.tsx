import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './media-hero.css';

export interface MediaHeroProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Título da mídia (jogo, filme, livro). */
  title: ReactNode;
  /** Elemento do título. Padrão: `h1`, porque o cabeçalho abre a página. */
  titleAs?: ElementType;
  /** Imagem de fundo (Figma: Fundo = Imagem), com degradê para a cor da página. Sem ela, faixa de cor sólida (Figma: Fundo = Cor sólida). */
  backgroundSrc?: string;
  /** Capa: normalmente um `<img>`. Fica à esquerda no desktop e acima do título no mobile. */
  cover?: ReactNode;
  /** Linha abaixo do título (ano, plataformas). */
  meta?: ReactNode;
  /** Selos de categoria (por exemplo, `Badge`). */
  badges?: ReactNode;
  /** Créditos (quem criou, quem distribuiu). */
  credits?: ReactNode;
  /** Ações (Figma: "Na coleção" com selo e Editar, ou "Adicionar"). */
  actions?: ReactNode;
}

/**
 * Cabeçalho de página de mídia: imagem de fundo com degradê, capa, título, meta, selos, créditos e ações. Ocupa a
 * largura toda; o conteúdo fica numa coluna de até 1040 px. Em telas estreitas, empilha (Figma: Tamanho Mobile).
 */
export const MediaHero = forwardRef<HTMLElement, MediaHeroProps>(function MediaHero(
  { title, titleAs: Title = 'h1', backgroundSrc, cover, meta, badges, credits, actions, className, ...rest },
  ref,
) {
  return (
    <header {...rest} ref={ref} className={cx('nds-media-hero', backgroundSrc && 'nds-media-hero--image', className)}>
      {backgroundSrc ? (
        <div className="nds-media-hero__background" aria-hidden="true">
          <img src={backgroundSrc} alt="" />
        </div>
      ) : null}
      <div className="nds-media-hero__inner">
        {cover ? <div className="nds-media-hero__cover">{cover}</div> : null}
        <div className="nds-media-hero__info">
          <Title className="nds-media-hero__title">{title}</Title>
          {meta ? <p className="nds-media-hero__meta">{meta}</p> : null}
          {badges ? <div className="nds-media-hero__badges">{badges}</div> : null}
          {credits ? <p className="nds-media-hero__credits">{credits}</p> : null}
          {actions ? <div className="nds-media-hero__actions">{actions}</div> : null}
        </div>
      </div>
    </header>
  );
});
