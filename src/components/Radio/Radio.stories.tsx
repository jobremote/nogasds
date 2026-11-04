import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { Radio } from './Radio';

const meta = {
  title: 'Componentes/Seleção/Radio',
  component: Radio,
  args: { label: 'Opção', name: 'exemplo' },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'grid', gap: 12 }}>
        <legend className="nds-text-label" style={{ marginBottom: 12 }}>Escolha uma</legend>
        <Radio {...args} value="a" label="Opção A" defaultChecked />
        <Radio {...args} value="b" label="Opção B" />
        <Radio {...args} value="c" label="Opção C" />
      </fieldset>
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
  parameters: { pseudo: { hover: ['.sb-hover .nds-radio__row'], focusVisible: ['.sb-focus .nds-radio__input'] } },
  render: () => (
    <Canvas>
      {[false, true].map((checked) => (
        <Section key={String(checked)} title={`Marcado: ${checked ? 'Sim' : 'Não'}`}>
          {states.map(({ key, props, hover, focus }) => (
            <Cell key={key} label={key} hover={hover} focus={focus} width={140}>
              <Radio label="Opção" name={`estado-${key}-${checked}`} defaultChecked={checked} {...props} />
            </Cell>
          ))}
        </Section>
      ))}
    </Canvas>
  ),
};
