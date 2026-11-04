import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { Switch } from './Switch';

const meta = {
  title: 'Componentes/Seleção/Switch',
  component: Switch,
  args: { label: 'Ativar notificações' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <Switch {...args} />
    </Canvas>
  ),
};

const states = [
  { key: 'Padrão', props: {}, hover: false, focus: false },
  { key: 'Hover', props: {}, hover: true, focus: false },
  { key: 'Foco', props: {}, hover: false, focus: true },
  { key: 'Desabilitado', props: { disabled: true }, hover: false, focus: false },
];

export const TodosOsEstados: Story = {
  parameters: { pseudo: { hover: ['.sb-hover .nds-switch__row'], focusVisible: ['.sb-focus .nds-switch__input'] } },
  render: () => (
    <Canvas>
      {[false, true].map((on) => (
        <Section key={String(on)} title={`Ligado: ${on ? 'Sim' : 'Não'}`}>
          {states.map(({ key, props, hover, focus }) => (
            <Cell key={key} label={key} hover={hover} focus={focus} width={200}>
              <Switch label="Ativar notificações" defaultChecked={on} {...props} />
            </Cell>
          ))}
        </Section>
      ))}
    </Canvas>
  ),
};
