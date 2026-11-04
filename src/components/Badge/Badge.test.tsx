import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Badge } from './Badge';

describe('Badge', () => {
  it('mostra o texto e aplica o tom (neutro por padrão)', () => {
    const { rerender } = render(<Badge>Novo</Badge>);
    expect(screen.getByText('Novo')).toHaveClass('nds-badge--neutral');
    rerender(<Badge tone="error">Novo</Badge>);
    expect(screen.getByText('Novo')).toHaveClass('nds-badge--error');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        {(['neutral', 'info', 'success', 'error', 'rose', 'sky'] as const).map((tone) => (
          <Badge key={tone} tone={tone}>
            {tone}
          </Badge>
        ))}
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
