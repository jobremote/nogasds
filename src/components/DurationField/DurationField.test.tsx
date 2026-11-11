import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { DurationField, type DurationValue } from './DurationField';

function Controlled({ initial = { hours: null, minutes: null }, error }: { initial?: DurationValue; error?: string }) {
  const [value, setValue] = useState<DurationValue>(initial);
  return (
    <>
      <DurationField label="Tempo de jogo" value={value} onChange={setValue} error={error} name="time" />
      <output>{JSON.stringify(value)}</output>
    </>
  );
}

describe('DurationField', () => {
  it('é um grupo com rótulo e dois campos, horas e minutos', () => {
    render(<Controlled />);
    expect(screen.getByRole('group', { name: 'Tempo de jogo' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Horas' })).toHaveValue(null);
    expect(screen.getByRole('spinbutton', { name: 'Minutos' })).toHaveValue(null);
  });

  it('digitar horas e minutos atualiza o valor; apagar volta a vazio', async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    await user.type(screen.getByRole('spinbutton', { name: 'Horas' }), '12');
    await user.type(screen.getByRole('spinbutton', { name: 'Minutos' }), '30');
    expect(screen.getByRole('status')).toHaveTextContent('{"hours":12,"minutes":30}');
    await user.clear(screen.getByRole('spinbutton', { name: 'Minutos' }));
    expect(screen.getByRole('status')).toHaveTextContent('{"hours":12,"minutes":null}');
  });

  it('minutos acima de 59 viram 59 e valor negativo é ignorado', async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    await user.type(screen.getByRole('spinbutton', { name: 'Minutos' }), '75');
    expect(screen.getByRole('status')).toHaveTextContent('"minutes":59');
    await user.type(screen.getByRole('spinbutton', { name: 'Horas' }), '-3');
    expect(screen.getByRole('status')).not.toHaveTextContent('-3');
  });

  it('com name, os campos entram no formulário como <name>Hours e <name>Minutes', () => {
    const { container } = render(<Controlled />);
    expect(container.querySelector('input[name="timeHours"]')).not.toBeNull();
    expect(container.querySelector('input[name="timeMinutes"]')).not.toBeNull();
  });

  it('mostra a mensagem de erro ligada ao grupo', () => {
    render(<Controlled error="Informe um tempo válido." />);
    expect(screen.getByRole('group', { name: 'Tempo de jogo' })).toHaveAccessibleDescription('Informe um tempo válido.');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Controlled initial={{ hours: 8, minutes: 15 }} error="Erro de exemplo" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
