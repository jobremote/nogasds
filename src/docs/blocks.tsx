import type { ReactNode } from 'react';
import { Button } from '../components/Button/Button';
import { colorGroups, colorTokenCount, dimensionTokens, typeStyles } from './tokens';
import './docs.css';

export function Wordmark({ size = 96 }: { size?: number }) {
  return (
    <span className="nds-doc-wordmark" style={{ fontSize: size }} aria-label="NogasDS">
      <span style={{ fontWeight: 300 }}>Nogas</span>
      <span style={{ fontWeight: 700 }}>DS</span>
    </span>
  );
}

export function Hero({ children }: { children: ReactNode }) {
  return (
    <header className="nds-doc-hero">
      <p className="nds-doc-eyebrow">Design system</p>
      <Wordmark />
      <p className="nds-doc-lead">{children}</p>
    </header>
  );
}

export function Stats() {
  const stats: Array<[string, string]> = [
    [String(colorTokenCount()), 'tokens de cor'],
    ['2', 'temas: escuro e claro'],
    [String(typeStyles().length), 'text styles de Inter'],
    ['29', 'componentes'],
  ];
  return (
    <dl className="nds-doc-stats">
      {stats.map(([value, label]) => (
        <div key={label}>
          <dt>{value}</dt>
          <dd>{label}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Principles({ items }: { items: Array<{ title: string; text: string }> }) {
  return (
    <ul className="nds-doc-principles">
      {items.map((item, index) => (
        <li key={item.title}>
          <span className="nds-doc-index">{String(index + 1).padStart(2, '0')}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function Cards({ items }: { items: Array<{ title: string; text: string; href: string }> }) {
  return (
    <ul className="nds-doc-cards">
      {items.map((item) => (
        <li key={item.title}>
          <a href={item.href} target="_parent">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <span aria-hidden="true">Abrir →</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Showcase() {
  return (
    <div className="nds-doc-showcase">
      <div className="nds-doc-showcase__row">
        <Button>Primário</Button>
        <Button variant="secondary">Secundário</Button>
        <Button variant="outline">Contorno</Button>
        <Button variant="ghost">Fantasma</Button>
      </div>
    </div>
  );
}

export function ColorPalette() {
  return (
    <div className="nds-doc-colors">
      {colorGroups().map((group) => (
        <section key={group.title}>
          <h3 className="nds-doc-overline">{group.title}</h3>
          <div className="nds-doc-colors__head" aria-hidden="true">
            <span>Token</span>
            <span>Escuro</span>
            <span>Claro</span>
          </div>
          {group.tokens.map((token) => (
            <div className="nds-doc-colors__row" key={token.css}>
              <div>
                <code>{token.css}</code>
                <small>{token.figma}</small>
              </div>
              <div className="nds-doc-chip">
                <span style={{ background: token.dark }} />
                {token.dark}
              </div>
              <div className="nds-doc-chip">
                <span style={{ background: token.light }} />
                {token.light}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

export function TypeSpecimens() {
  const styles = typeStyles();
  return (
    <div className="nds-doc-types">
      {(['Título', 'Texto', 'Interface'] as const).map((group) => (
        <section key={group}>
          <h3 className="nds-doc-overline">{group}</h3>
          {styles
            .filter((style) => style.group === group)
            .map((style) => (
              <div className="nds-doc-types__row" key={style.name}>
                <div className="nds-doc-types__meta">
                  <code>{style.name}</code>
                  <small>{style.spec}</small>
                </div>
                <p className={`nds-text-${style.name}`}>
                  {style.caps ? 'Contraste por peso' : 'Contraste vem de peso e tracking apertado'}
                </p>
              </div>
            ))}
        </section>
      ))}
    </div>
  );
}

export function SpaceScale() {
  return (
    <div className="nds-doc-space">
      {dimensionTokens('space').map((token) => (
        <div className="nds-doc-space__row" key={token.css}>
          <div className="nds-doc-types__meta">
            <code>{token.css}</code>
            <small>
              {token.figma} · {token.value} (de {token.alias.replace('--nds-', '')})
            </small>
          </div>
          <span className="nds-doc-space__bar" style={{ width: token.px }} />
        </div>
      ))}
    </div>
  );
}

export function ShapeDemo() {
  const radius = dimensionTokens('radius');
  const stroke = dimensionTokens('stroke');
  return (
    <div className="nds-doc-shapes">
      {radius.map((token) => (
        <figure key={token.css}>
          <span className="nds-doc-shape" style={{ borderRadius: `var(${token.css})` }} />
          <figcaption>
            <code>{token.css}</code>
            <small>{token.value === '0' ? '0 · padrão do sistema' : `${token.value} · só formas circulares`}</small>
          </figcaption>
        </figure>
      ))}
      {stroke.map((token) => (
        <figure key={token.css}>
          <span className="nds-doc-shape" style={{ borderWidth: `var(${token.css})` }} />
          <figcaption>
            <code>{token.css}</code>
            <small>
              {token.value} ·{' '}
              {token.figma === 'stroke/focus' ? 'anel de foco' : token.figma === 'stroke/emphasis' ? 'erro e status' : 'bordas e divisórias'}
            </small>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
