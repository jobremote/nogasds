import type { Decorator, Preview } from '@storybook/react-vite';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '../src/styles/index.css';
import './preview.css';

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  return (
    <div className="sb-canvas">
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Tema do NogasDS',
      toolbar: {
        title: 'Tema',
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Escuro (padrão)' },
          { value: 'light', title: 'Claro' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'dark' },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    controls: { expanded: true },
  },
};

export default preview;
