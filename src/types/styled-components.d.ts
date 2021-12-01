import { Theme } from '@src/assets/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
