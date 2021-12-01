import baseStyled, { ThemedStyledInterface } from 'styled-components';
import media from './media';

const colors = {
  white: '#ffffff',
  black: '#000000',
};

const fontSizes: string[] = [];

const theme = {
  colors,
  fontSizes,
  media,
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;
