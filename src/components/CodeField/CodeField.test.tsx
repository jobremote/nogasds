import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { CodeField } from './CodeField';

const boxes = () => screen.getAllByRole('textbox') as HTMLInputElement[];

describe('CodeField', () => {
  it('renderiza 6 caixas dentro de um grupo rotulado', () => {
    render(<CodeField label="Código" />);
    expect(boxes()).toHaveLength(6);
    expect(screen.getByRole('group', { name: 'Código' })).toBeInTheDocument();
    expect(boxes()[0]).toHaveAccessibleName('Dígito 1 de 6');
    expect(boxes()[0]).toHaveAttribute('autocomplete', 'one-time-code');
  });

  it('avança o foco automaticamente a cada dígito e chama onChange e onComplete', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onComplete = vi.fn();
    render(<CodeField label="Código" onChange={onChange} onComplete={onComplete} />);
    await user.click(boxes()[0]);
    await user.keyboard('123');
    expect(boxes().map((b) => b.value).join('')).toBe('123');
    expect(boxes()[3]).toHaveFocus();
    expect(onComplete).not.toHaveBeenCalled();
    await user.keyboard('456');
    expect(onChange).toHaveBeenLastCalledWith('123456');
    expect(onComplete).toHaveBeenCalledWith('123456');
  });

  it('ignora caracteres que não são dígitos', async () => {
    const user = userEvent.setup();
    render(<CodeField label="Código" />);
    await user.click(boxes()[0]);
    await user.keyboard('a-1');
    expect(boxes().map((b) => b.value).join('')).toBe('1');
  });

  it('cola o código inteiro e preenche todas as caixas', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<CodeField label="Código" onComplete={onComplete} />);
    await user.click(boxes()[2]);
    await user.paste('987654');
    expect(boxes().map((b) => b.value)).toEqual(['9', '8', '7', '6', '5', '4']);
    expect(onComplete).toHaveBeenCalledWith('987654');
    expect(boxes()[5]).toHaveFocus();
  });

  it('backspace apaga o dígito e volta para a caixa anterior quando a atual está vazia', async () => {
    const user = userEvent.setup();
    render(<CodeField label="Código" defaultValue="12" />);
    await user.click(boxes()[2]);
    await user.keyboard('{Backspace}');
    expect(boxes().map((b) => b.value).join('')).toBe('1');
    expect(boxes()[1]).toHaveFocus();
    // Caixa 2 vazia de novo: apaga a anterior e volta mais uma.
    await user.keyboard('{Backspace}');
    expect(boxes().map((b) => b.value).join('')).toBe('');
    expect(boxes()[0]).toHaveFocus();
  });

  it('setas movem o foco entre as caixas', async () => {
    const user = userEvent.setup();
    render(<CodeField label="Código" />);
    await user.click(boxes()[1]);
    await user.keyboard('{ArrowRight}');
    expect(boxes()[2]).toHaveFocus();
    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(boxes()[0]).toHaveFocus();
  });

  it('funciona como controlado', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<CodeField label="Código" value="12" onChange={onChange} />);
    expect(boxes().map((b) => b.value).join('')).toBe('12');
    await user.click(boxes()[2]);
    await user.keyboard('3');
    expect(onChange).toHaveBeenCalledWith('123');
    // Sem atualizar o valor, nada muda na tela.
    expect(boxes().map((b) => b.value).join('')).toBe('12');
    rerender(<CodeField label="Código" value="123" onChange={onChange} />);
    expect(boxes().map((b) => b.value).join('')).toBe('123');
  });

  it('erro marca as caixas como inválidas e descreve o grupo', () => {
    render(<CodeField label="Código" error="Código incorreto." />);
    expect(boxes().every((b) => b.getAttribute('aria-invalid') === 'true')).toBe(true);
    expect(screen.getByRole('group')).toHaveAccessibleDescription('Código incorreto.');
  });

  it('desabilitado desabilita todas as caixas', () => {
    render(<CodeField label="Código" disabled />);
    expect(boxes().every((b) => b.disabled)).toBe(true);
  });

  it('autoFocus foca a primeira caixa', () => {
    // eslint-disable-next-line jsx-a11y/no-autofocus
    render(<CodeField label="Código" autoFocus />);
    expect(boxes()[0]).toHaveFocus();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <CodeField label="Padrão" helpText="Ajuda" />
        <CodeField label="Erro" error="Incorreto" defaultValue="123456" />
        <CodeField label="Desabilitado" disabled />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
