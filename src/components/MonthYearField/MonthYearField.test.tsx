import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { MonthYearField, type MonthYearValue } from './MonthYearField';

function Controlled({ initial = { month: null, year: null }, error }: { initial?: MonthYearValue; error?: string }) {
  const [value, setValue] = useState<MonthYearValue>(initial);
  return <MonthYearField label="Início" value={value} onChange={setValue} minYear={2020} maxYear={2026} error={error} name="started" />;
}

describe('MonthYearField', () => {
  it('é um grupo com rótulo e dois campos, mês e ano', () => {
    render(<Controlled />);
    expect(screen.getByRole('group', { name: 'Início' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Mês' })).toHaveValue('');
    expect(screen.getByRole('combobox', { name: 'Ano' })).toHaveValue('');
  });

  it('lista os 12 meses e os anos do mais recente ao mais antigo', () => {
    render(<Controlled />);
    const months = screen.getByRole('combobox', { name: 'Mês' }).querySelectorAll('option');
    expect(months).toHaveLength(13); // vazia + 12
    expect(months[1]).toHaveTextContent('Janeiro');
    const years = Array.from(screen.getByRole('combobox', { name: 'Ano' }).querySelectorAll('option')).map((o) => o.textContent);
    expect(years).toEqual(['Ano', '2026', '2025', '2024', '2023', '2022', '2021', '2020']);
  });

  it('escolher e limpar cada parte separadamente', async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    await user.selectOptions(screen.getByRole('combobox', { name: 'Mês' }), 'Março');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Ano' }), '2024');
    expect(screen.getByRole('combobox', { name: 'Mês' })).toHaveValue('3');
    expect(screen.getByRole('combobox', { name: 'Ano' })).toHaveValue('2024');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Mês' }), '');
    expect(screen.getByRole('combobox', { name: 'Mês' })).toHaveValue('');
    expect(screen.getByRole('combobox', { name: 'Ano' })).toHaveValue('2024');
  });

  it('um ano fora da lista continua aparecendo', () => {
    render(<Controlled initial={{ month: 1, year: 1999 }} />);
    expect(screen.getByRole('combobox', { name: 'Ano' })).toHaveValue('1999');
  });

  it('com name, os campos entram no formulário como <name>Month e <name>Year', () => {
    const { container } = render(<Controlled initial={{ month: 5, year: 2025 }} />);
    expect(container.querySelector('select[name="startedMonth"]')).not.toBeNull();
    expect(container.querySelector('select[name="startedYear"]')).not.toBeNull();
  });

  it('mostra a mensagem de erro e liga ao grupo', () => {
    render(<Controlled error="O fim não pode ser antes do início." />);
    expect(screen.getByText('O fim não pode ser antes do início.')).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Início' })).toHaveAccessibleDescription('O fim não pode ser antes do início.');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Controlled initial={{ month: 2, year: 2024 }} error="Erro de exemplo" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
