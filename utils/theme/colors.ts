import { rgba } from 'polished';

export const baseColors = {
  blue: '#1799CD',
  green: '#3CA876',
  red: '#F44336',
  yellow: '#B9983E',
  teal: '#509DC3',
  purple: '#8C54FF',
  black: '#333333',
  grayDark: '#56596C',
  gray: '#8798AD',
  grayLight: '#BFC5D2',
  grayLighter: '#BFC5D2',
  grayLightest: '#EEF3F5',
  offwhite: '#F4F6FC',
  white: '#FFFFFF',
};

export const transparentColors = {
  blue: rgba(baseColors.blue, 0.2),
  green: rgba(baseColors.green, 0.15),
  red: rgba(baseColors.red, 0.15),
  yellow: rgba(baseColors.yellow, 0.15),
  teal: rgba(baseColors.teal, 0.15),
  purple: rgba(baseColors.purple, 0.15),
};

export const colorTheme = {
  ...baseColors,
  brand: baseColors.blue,
  success: baseColors.green,
  warning: baseColors.yellow,
  error: baseColors.red,
  info: baseColors.teal,
  bg: {
    light: baseColors.white,
    dark: baseColors.black,
  },
  bgSecondary: {
    light: baseColors.offwhite,
    dark: baseColors.grayDark,
  },
  textPrimary: {
    light: baseColors.black,
    dark: baseColors.white,
  },
  textSecondary: {
    light: baseColors.gray,
    dark: baseColors.grayLighter,
  },
  textTertiary: {
    light: baseColors.grayLighter,
  },
  borderSecondary: {
    light: baseColors.grayLighter,
    dark: baseColors.grayDark,
  },
};
