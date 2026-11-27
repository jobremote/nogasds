import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { DataList, DataRow } from './DataList';

describe('DataList', () => {
  it('mostra rótulo e valor como termo e descrição', () => {
    render(
      <DataList>
        <DataRow label="Normal" value="21 h" />
      </DataList>,
    );
    expect(screen.getByText('Normal').tagName).toBe('DT');
    expect(screen.getByText('21 h').tagName).toBe('DD');
  });

  it('linha sem valor não aparece', () => {
    const { container } = render(
      <DataList>
        <DataRow label="A" value={null} />
        <DataRow label="B" />
        <DataRow label="C" value="" />
        <DataRow label="D" value={0} />
      </DataList>,
    );
    expect(container.querySelectorAll('.nds-data-row')).toHaveLength(1);
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <DataList>
        <DataRow label="Rápido" value="10 h" />
        <DataRow label="Normal" value="21 h" />
      </DataList>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
