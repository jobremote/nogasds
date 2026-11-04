import { create } from 'storybook/theming/create';

/** Tema escuro do NogasDS para a interface do Storybook (valores do tema Escuro do Semantic). */
export default create({
  base: 'dark',
  brandTitle:
    '<span style="font:300 20px/1 Inter,system-ui,sans-serif;letter-spacing:-0.06em;color:#fff">Nogas</span><span style="font:700 20px/1 Inter,system-ui,sans-serif;letter-spacing:-0.06em;color:#fff">DS</span>',
  brandUrl: 'https://github.com/jobremote/nogasds',
  brandTarget: '_blank',

  colorPrimary: '#7cacc4',
  colorSecondary: '#7cacc4',

  appBg: '#171717',
  appContentBg: '#252525',
  appPreviewBg: '#252525',
  appBorderColor: '#333333',
  appBorderRadius: 0,

  textColor: '#ffffff',
  textInverseColor: '#252525',
  textMutedColor: '#a8a8a8',

  barBg: '#171717',
  barTextColor: '#a8a8a8',
  barHoverColor: '#ffffff',
  barSelectedColor: '#ffffff',

  inputBg: '#171717',
  inputBorder: '#858585',
  inputTextColor: '#ffffff',
  inputBorderRadius: 0,

  buttonBg: '#333333',
  buttonBorder: '#404040',
  booleanBg: '#333333',
  booleanSelectedBg: '#7cacc4',

  fontBase: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
});
