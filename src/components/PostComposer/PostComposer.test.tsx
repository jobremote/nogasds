import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { PostComposer } from './PostComposer';

const base = { label: 'Texto da publicação', placeholder: 'No que você está pensando?' };

describe('PostComposer', () => {
  it('tem campo rotulado e botão de publicar desabilitado enquanto vazio', () => {
    render(<PostComposer {...base} />);
    expect(screen.getByRole('textbox', { name: 'Texto da publicação' })).toHaveAttribute(
      'placeholder',
      'No que você está pensando?',
    );
    expect(screen.getByRole('button', { name: 'Publicar' })).toBeDisabled();
  });

  it('habilita ao digitar e envia o texto', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PostComposer {...base} onSubmit={onSubmit} />);
    await user.type(screen.getByRole('textbox'), 'Olá');
    await user.click(screen.getByRole('button', { name: 'Publicar' }));
    expect(onSubmit).toHaveBeenCalledWith('Olá');
  });

  it('com canSubmit habilita o envio sem texto (por exemplo, com imagem anexada)', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PostComposer {...base} canSubmit onSubmit={onSubmit} />);
    await user.click(screen.getByRole('button', { name: 'Publicar' }));
    expect(onSubmit).toHaveBeenCalledWith('');
  });

  it('com canSubmit=false barra o envio mesmo com texto', async () => {
    const user = userEvent.setup();
    render(<PostComposer {...base} canSubmit={false} />);
    await user.type(screen.getByRole('textbox'), 'Olá');
    expect(screen.getByRole('button', { name: 'Publicar' })).toBeDisabled();
  });

  it('só espaços não contam como conteúdo', async () => {
    const user = userEvent.setup();
    render(<PostComposer {...base} />);
    await user.type(screen.getByRole('textbox'), '   ');
    expect(screen.getByRole('button', { name: 'Publicar' })).toBeDisabled();
  });

  it('mostra o contador e respeita o limite', async () => {
    const user = userEvent.setup();
    render(<PostComposer {...base} maxLength={5} />);
    expect(screen.getByText('0/5')).toBeInTheDocument();
    await user.type(screen.getByRole('textbox'), 'abcdefgh');
    expect(screen.getByRole('textbox')).toHaveValue('abcde');
    expect(screen.getByText('5/5')).toBeInTheDocument();
  });

  it('funciona como controlado e chama onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PostComposer {...base} value="abc" onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'd');
    expect(onChange).toHaveBeenCalledWith('abcd');
    expect(screen.getByRole('textbox')).toHaveValue('abc');
  });

  it('desabilitado bloqueia campo e envio', () => {
    render(<PostComposer {...base} defaultValue="texto" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Publicar' })).toBeDisabled();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <PostComposer {...base} avatar={{ name: 'Maria' }} maxLength={1500} defaultValue="texto" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
