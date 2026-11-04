import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Promo } from './Promo';

describe('Promo', () => {
  it('mostra selo, título, texto e ação', () => {
    render(
      <Promo badge={<Badge>Patrocinado</Badge>} title="Chamada" action={<Button size="sm">Saiba mais</Button>}>
        Texto de apoio.
      </Promo>,
    );
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByText('Patrocinado')).toBeInTheDocument();
    expect(screen.getByText('Chamada')).toBeInTheDocument();
    expect(screen.getByText('Texto de apoio.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Saiba mais' })).toBeInTheDocument();
  });

  it('sem mídia mostra o espaço reservado com ícone', () => {
    const { container } = render(<Promo title="Chamada" />);
    expect(container.querySelector('.nds-promo__media svg')).toBeInTheDocument();
  });

  it('usa a mídia fornecida no lugar do espaço reservado', () => {
    const { container } = render(<Promo title="Chamada" media={<img src="/a.png" alt="" />} />);
    expect(container.querySelector('.nds-promo__media img')).toBeInTheDocument();
    expect(container.querySelector('.nds-promo__media svg')).toBeNull();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <Promo badge={<Badge>Patrocinado</Badge>} title="Chamada" action={<Button size="sm">Saiba mais</Button>}>
        Texto de apoio.
      </Promo>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
