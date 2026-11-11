import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { ResultItem } from './ResultItem';

describe('ResultItem', () => {
  it('mostra título, apoio e ação', () => {
    render(
      <ul>
        <ResultItem title="Hollow Knight" detail="2017 · PC, Switch" action={<Button>Adicionar</Button>} />
      </ul>,
    );
    expect(screen.getByText('Hollow Knight')).toBeInTheDocument();
    expect(screen.getByText('2017 · PC, Switch')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Adicionar' })).toBeInTheDocument();
  });

  it('a capa é decorativa e opcional', () => {
    const { container, rerender } = render(<ul><ResultItem title="A" thumbnail="/capa.jpg" /></ul>);
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
    rerender(<ul><ResultItem title="A" /></ul>);
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('.nds-result-item__action')).toBeNull();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <ul>
        <ResultItem title="A" detail="2017" thumbnail="/a.jpg" action={<Badge tone="success">Zerado</Badge>} />
        <ResultItem title="B" action={<Button>Adicionar</Button>} />
      </ul>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
