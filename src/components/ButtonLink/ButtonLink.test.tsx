import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { ButtonLink } from './ButtonLink';

describe('ButtonLink', () => {
  it('é um link de verdade, com a aparência do botão (primário e médio por padrão)', () => {
    render(<ButtonLink href="/destino">Ir para o destino</ButtonLink>);
    const link = screen.getByRole('link', { name: 'Ir para o destino' });
    expect(link).toHaveAttribute('href', '/destino');
    expect(link).toHaveClass('nds-button', 'nds-button--primary', 'nds-button--md');
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('aplica variante e tamanho', () => {
    render(
      <ButtonLink href="/x" variant="outline" size="sm">
        Contorno
      </ButtonLink>,
    );
    expect(screen.getByRole('link')).toHaveClass('nds-button--outline', 'nds-button--sm');
  });

  it('repassa atributos do link (nova aba)', () => {
    render(
      <ButtonLink href="https://exemplo.com" target="_blank" rel="noopener noreferrer">
        Externo
      </ButtonLink>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        {(['primary', 'secondary', 'outline', 'ghost', 'danger', 'danger-ghost'] as const).map((variant) => (
          <ButtonLink key={variant} href="/x" variant={variant}>
            {variant}
          </ButtonLink>
        ))}
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
