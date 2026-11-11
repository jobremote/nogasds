import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { ScreenshotField } from './ScreenshotField';

const file = new File(['x'], 'print.png', { type: 'image/png' });

describe('ScreenshotField', () => {
  it('vazio: mostra o botão de escolher e não mostra o de remover', () => {
    render(<ScreenshotField label="Screenshot" onSelect={() => {}} onRemove={() => {}} />);
    expect(screen.getByRole('group', { name: 'Screenshot' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Escolher imagem' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Remover imagem' })).toBeNull();
  });

  it('com imagem: mostra a prévia, "Trocar imagem" e "Remover imagem"', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const { container } = render(<ScreenshotField label="Screenshot" src="/print.png" onSelect={() => {}} onRemove={onRemove} />);
    expect(container.querySelector('img')).toHaveAttribute('src', '/print.png');
    expect(screen.getByRole('button', { name: 'Trocar imagem' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Remover imagem' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('escolher um arquivo chama onSelect com ele', () => {
    const onSelect = vi.fn();
    render(<ScreenshotField label="Screenshot" onSelect={onSelect} />);
    fireEvent.change(screen.getByTestId('screenshot-input'), { target: { files: [file] } });
    expect(onSelect).toHaveBeenCalledWith(file);
  });

  it('só aceita imagem JPG, PNG e WebP no seletor', () => {
    render(<ScreenshotField label="Screenshot" onSelect={() => {}} />);
    expect(screen.getByTestId('screenshot-input')).toHaveAttribute('accept', 'image/jpeg,image/png,image/webp');
  });

  it('enviando: trava os botões e mostra o texto de envio', () => {
    render(<ScreenshotField label="Screenshot" src="/a.png" uploading onSelect={() => {}} onRemove={() => {}} />);
    expect(screen.getByRole('button', { name: 'Enviando imagem…' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Remover imagem' })).toBeDisabled();
  });

  it('erro substitui o texto de ajuda e fica ligado ao grupo', () => {
    render(<ScreenshotField label="Screenshot" helpText="JPG, PNG ou WebP até 5 MB." error="A imagem passa de 5 MB." onSelect={() => {}} />);
    expect(screen.queryByText('JPG, PNG ou WebP até 5 MB.')).toBeNull();
    expect(screen.getByRole('group', { name: 'Screenshot' })).toHaveAccessibleDescription('A imagem passa de 5 MB.');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <ScreenshotField label="Screenshot" helpText="Ajuda" onSelect={() => {}} />
        <ScreenshotField label="Outra" src="/a.png" alt="Print do jogo" error="Erro" onSelect={() => {}} onRemove={() => {}} />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
