import 'styled-components';
import theme from 'src/constants/theme';
import { SVGProps } from 'react';

type CustomTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
