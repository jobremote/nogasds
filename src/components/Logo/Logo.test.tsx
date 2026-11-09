import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Icon } from '../Icon/Icon';
import { Logo } from './Logo';

describe('Logo', () => {
  it('é decorativo por padrão e mantém as cores fixas', () => {
    const { container } = render(<Logo name="google" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    const fills = [...svg.querySelectorAll('path')].map((p) => p.getAttribute('fill'));
    expect(fills).toEqual(['#EA4335', '#4285F4', '#FBBC05', '#34A853']);
  });

  it('com label vira imagem acessível e respeita o tamanho', () => {
    render(<Logo name="google" label="Google" size={20} />);
    const img = screen.getByRole('img', { name: 'Google' });
    expect(img).toHaveAttribute('width', '20');
    expect(img).toHaveAttribute('height', '20');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Logo name="google" label="Google" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Icon visibility-off', () => {
  it('existe na biblioteca e herda a cor do texto', () => {
    const { container } = render(<Icon name="visibility-off" />);
    const path = container.querySelector('path')!;
    expect(path.getAttribute('d')).toMatch(/^M15\.725 13\.525/);
    expect(container.querySelector('svg')).toHaveAttribute('fill', 'currentColor');
  });
});
