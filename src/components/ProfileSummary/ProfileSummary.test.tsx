import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Stat } from '../Stat/Stat';
import { ProfileSummary } from './ProfileSummary';

describe('ProfileSummary', () => {
  it('mostra nome, identificador, bio e contadores em uma região nomeada', () => {
    render(
      <ProfileSummary
        name="Maria da Silva"
        handle="@maria"
        bio="Texto de apresentação."
        stats={<Stat value={12} label="Itens" />}
      />,
    );
    expect(screen.getByRole('region', { name: 'Maria da Silva' })).toBeInTheDocument();
    expect(screen.getByText('@maria')).toBeInTheDocument();
    expect(screen.getByText('Texto de apresentação.')).toBeInTheDocument();
    expect(screen.getByText('Itens').tagName).toBe('DT');
  });

  it('o avatar usa o nome e o tamanho grande', () => {
    render(<ProfileSummary name="Maria da Silva" avatar={{ tone: 'wine' }} />);
    const avatar = screen.getAllByRole('img', { name: 'Maria da Silva' })[0];
    expect(avatar).toHaveClass('nds-avatar--lg', 'nds-avatar--wine');
    expect(avatar).toHaveTextContent('MS');
  });

  it('omite as partes opcionais', () => {
    const { container } = render(<ProfileSummary name="Maria" />);
    expect(container.querySelector('.nds-profile-summary__bio')).toBeNull();
    expect(container.querySelector('.nds-profile-summary__stats')).toBeNull();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <ProfileSummary name="Maria da Silva" handle="@maria" bio="Bio." stats={<Stat value={1} label="Itens" />} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
