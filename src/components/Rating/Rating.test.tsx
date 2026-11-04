import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Rating } from './Rating';

describe('Rating', () => {
  it('é um grupo de opções com uma estrela por nota', () => {
    render(<Rating label="Nota" defaultValue={3} />);
    expect(screen.getByRole('radiogroup', { name: 'Nota' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
    expect(screen.getByRole('radio', { name: '3 estrelas' })).toBeChecked();
    expect(screen.getByRole('radio', { name: '1 estrela' })).not.toBeChecked();
  });

  it('escolhe a nota ao clicar e chama onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating label="Nota" onChange={onChange} />);
    await user.click(screen.getByRole('radio', { name: '4 estrelas' }));
    expect(onChange).toHaveBeenCalledWith(4);
    expect(screen.getByRole('radio', { name: '4 estrelas' })).toBeChecked();
  });

  it('clicar na nota atual zera a avaliação', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating label="Nota" defaultValue={2} onChange={onChange} />);
    await user.click(screen.getByRole('radio', { name: '2 estrelas' }));
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('setas mudam a nota e movem o foco', async () => {
    const user = userEvent.setup();
    render(<Rating label="Nota" defaultValue={2} />);
    await user.tab();
    expect(screen.getByRole('radio', { name: '2 estrelas' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('radio', { name: '3 estrelas' })).toBeChecked();
    expect(screen.getByRole('radio', { name: '3 estrelas' })).toHaveFocus();
    await user.keyboard('{ArrowLeft}{ArrowLeft}{ArrowLeft}');
    expect(screen.getByRole('radio', { name: '1 estrela' })).toBeChecked();
  });

  it('somente leitura expõe a nota como imagem', () => {
    render(<Rating label="Nota" value={4} readOnly />);
    expect(screen.getByRole('img', { name: 'Nota: 4 de 5' })).toBeInTheDocument();
    expect(screen.queryAllByRole('radio')).toHaveLength(0);
  });

  it('desabilitado desabilita as estrelas', () => {
    render(<Rating label="Nota" value={4} disabled />);
    screen.getAllByRole('radio').forEach((star) => expect(star).toBeDisabled());
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <Rating label="Interativa" defaultValue={3} />
        <Rating label="Leitura" value={4} readOnly />
        <Rating label="Desabilitada" value={2} disabled />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
