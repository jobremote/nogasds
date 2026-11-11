import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import type { TagColor } from '../Tag/Tag';
import { ColorPicker } from './ColorPicker';

function Controlled({ initial = 'neutral' }: { initial?: TagColor }) {
  const [value, setValue] = useState<TagColor>(initial);
  return (
    <>
      <ColorPicker label="Cor" value={value} onChange={setValue} name="cor" />
      <output>{value}</output>
    </>
  );
}

describe('ColorPicker', () => {
  it('é um grupo de 6 rádios com os nomes das cores, na ordem do Figma', () => {
    render(<Controlled />);
    expect(screen.getByRole('group', { name: 'Cor' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio').map((radio) => radio.getAttribute('value'))).toEqual(['neutral', 'wine', 'petrol', 'olive', 'rose', 'sky']);
    for (const name of ['Neutro', 'Vinho', 'Petróleo', 'Oliva', 'Rosa', 'Céu']) {
      expect(screen.getByRole('radio', { name })).toBeInTheDocument();
    }
  });

  it('marca a cor atual e muda ao escolher outra', async () => {
    const user = userEvent.setup();
    render(<Controlled initial="wine" />);
    expect(screen.getByRole('radio', { name: 'Vinho' })).toBeChecked();
    await user.click(screen.getByRole('radio', { name: 'Céu' }));
    expect(screen.getByRole('radio', { name: 'Céu' })).toBeChecked();
    expect(screen.getByRole('status')).toHaveTextContent('sky');
  });

  it('setas do teclado percorrem as cores', async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    await user.click(screen.getByRole('radio', { name: 'Neutro' }));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('radio', { name: 'Vinho' })).toBeChecked();
  });

  it('com name, entra no formulário; desabilitado trava tudo', () => {
    const { container, rerender } = render(<Controlled />);
    expect(container.querySelector('input[name="cor"]')).not.toBeNull();
    rerender(<ColorPicker label="Cor" value="rose" onChange={() => {}} disabled />);
    for (const radio of screen.getAllByRole('radio')) expect(radio).toBeDisabled();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Controlled initial="olive" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
