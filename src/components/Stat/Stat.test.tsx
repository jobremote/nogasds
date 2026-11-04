import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Stat } from './Stat';

describe('Stat', () => {
  it('associa valor e legenda como termo e descrição', () => {
    render(
      <dl>
        <Stat value={12} label="Itens" />
      </dl>,
    );
    expect(screen.getByText('Itens').tagName).toBe('DT');
    expect(screen.getByText('12').tagName).toBe('DD');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <dl>
        <Stat value="1,4 mil" label="Seguidores" />
        <Stat value={96} label="Seguindo" />
      </dl>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
