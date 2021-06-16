import font from './font';
import { colorTheme } from './colors';
import { ThemeType } from 'grommet';
export { default as GlobalStyle } from './globalStyle';

type AppTheme = ThemeType & {
  colors: any;
};

const theme: ThemeType = {
  global: {
    colors: colorTheme,
    font,
  },
};

function convertGrommetColorsToStyledComponents(grommetTheme: object) {
  const theme = { dark: {}, light: {} };
  for (const colorName in grommetTheme) {
    const value = grommetTheme[colorName];
    if (typeof value === 'string') {
      theme.dark[colorName] = value;
      theme.light[colorName] = value;
    } else {
      theme.light[colorName] = value.light;
      theme.dark[colorName] = value.dark;
    }
  }
  return theme;
}

export default function getTheme(themeMode: string): AppTheme {
  const styledColorTheme = convertGrommetColorsToStyledComponents(colorTheme);
  return { ...theme, colors: styledColorTheme[themeMode] };
}
