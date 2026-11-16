import { render, screen, within } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Badge } from '../Badge/Badge';
import { MediaTag } from '../MediaTag/MediaTag';
import { GroupedTags } from './GroupedTags';

const groups = [
  {
    id: 'a',
    name: 'Grupo A',
    label: <Badge tone="success">Grupo A</Badge>,
    children: (
      <>
        <MediaTag>Item 1</MediaTag>
        <MediaTag>Item 2</MediaTag>
      </>
    ),
  },
  { id: 'b', name: 'Sem selo', children: <MediaTag>Item 3</MediaTag> },
];

describe('GroupedTags', () => {
  it('cria uma linha por grupo, com o selo uma vez e os itens', () => {
    render(<GroupedTags groups={groups} />);
    const rows = screen.getAllByRole('group');
    expect(rows).toHaveLength(2);
    expect(within(rows[0]).getAllByText('Grupo A')).toHaveLength(1);
    expect(within(rows[0]).getByText('Item 1')).toBeInTheDocument();
    expect(within(rows[0]).getByText('Item 2')).toBeInTheDocument();
    expect(within(rows[1]).getByText('Item 3')).toBeInTheDocument();
    expect(within(rows[1]).queryByText('Grupo A')).toBeNull();
  });

  it('usa o nome do grupo como nome acessível', () => {
    render(<GroupedTags groups={groups} />);
    expect(screen.getByRole('group', { name: 'Sem selo' })).toBeInTheDocument();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<GroupedTags groups={groups} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
