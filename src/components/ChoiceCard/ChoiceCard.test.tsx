import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { ChoiceCard } from './ChoiceCard';

const group = (onChange = vi.fn()) =>
  render(
    <fieldset>
      <legend>Status</legend>
      <ChoiceCard name="status" value="want" title="Quero jogar" description="Na fila." onChange={onChange} />
      <ChoiceCard name="status" value="playing" title="Jogando" onChange={onChange} />
    </fieldset>,
  );

describe('ChoiceCard', () => {
  it('é um grupo de rádios com título e descrição', () => {
    group();
    expect(screen.getByRole('radio', { name: /Quero jogar/ })).toBeInTheDocument();
    expect(screen.getByText('Na fila.')).toBeInTheDocument();
  });

  it('escolher uma opção desmarca a outra e avisa a mudança', () => {
    const onChange = vi.fn();
    group(onChange);
    fireEvent.click(screen.getByRole('radio', { name: 'Jogando' }));
    expect(screen.getByRole('radio', { name: 'Jogando' })).toBeChecked();
    expect(screen.getByRole('radio', { name: /Quero jogar/ })).not.toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = group();
    expect(await axe(container)).toHaveNoViolations();
  });
});
