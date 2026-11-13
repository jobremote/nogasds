import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { MediaTag } from './MediaTag';

describe('MediaTag', () => {
  it('sem href é só um rótulo, com o texto e o espaço da miniatura', () => {
    const { container } = render(<MediaTag>Item de exemplo</MediaTag>);
    expect(screen.getByText('Item de exemplo')).toBeInTheDocument();
    expect(screen.queryByRole('link')).toBeNull();
    expect(container.querySelector('.nds-media-tag__thumbnail')).toBeInTheDocument();
    expect(container.querySelector('img')).toBeNull();
  });

  it('com href vira link e mostra a miniatura', () => {
    const { container } = render(
      <MediaTag href="/item/1" thumbnail="/capa.jpg">
        Item de exemplo
      </MediaTag>,
    );
    expect(screen.getByRole('link', { name: 'Item de exemplo' })).toHaveAttribute('href', '/item/1');
    expect(container.querySelector('img')).toHaveAttribute('src', '/capa.jpg');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <MediaTag>Sem link</MediaTag>
        <MediaTag href="/item/1" thumbnail="/capa.jpg">
          Com link
        </MediaTag>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
